// Selected local bread study, migrated into the site's own typed scene model.
export type Point = { x: number; y: number };
export type Agent = "codex" | "claude";
export type FragmentKind = "records" | "lake" | "lakehouse";
export type ContextFragment = Point & { id: number; kind: FragmentKind };
export type PetAction = "idle" | "walk" | "carry" | "collect" | "place" | "thanks";
export type Cell = Point & { id: string; c: number; r: number; color: string; grain: number };
export type Job = { index: number; actor: Agent; fragmentId: number; source: Point; home: Point; pickup: Point; work: Point; start: number; pickupAt: number; carryingAt: number; placeAt: number; end: number; outPath: Point[]; backPath: Point[]; restPath: Point[] };
export type LooseTile = Cell & { job: number; k: number; pile: Point; angle: number; launchAt: number; settleAt: number };
export type Visit = { seed: number; leader: Agent; contextHome: Point; connection: Point[]; fragments: ContextFragment[]; jobs: Job[]; tiles: LooseTile[]; lastArrival: number; duration: number; blinkOffset: number; drift: number };
export type PetPose = Point & { actor: Agent; action: PetAction; phase: number; facing: number; job?: number };
export type Placement = Point & { state: "loose" | "carried" | "placing" | "settled"; angle: number };
export type Eye = { x: number; y: number; rx: number; ry: number; thanks: number; blink: number };
// One seeded visit: random composition once, a finite assembly, a living ending.
export const BG='#F7F3EB', TOTAL=236, FIXED=212;
export const sceneView = { x: 35, y: 120, width: 550, height: 460 };
export const palette=['#5D3E2C','#754D34','#885B3E','#9E6D4D','#B48662','#CFB193'];
export const tileLight='#D1B99F';
export const mask=['0001111000','0111111110','1111111110','1111111111','1111111111','1111111111','0111111110'];
export const clamp=(v: number,a=0,b=1)=>Math.min(b,Math.max(a,v));
export const ease=(value: number)=>{const v=clamp(value);return v*v*(3-2*v);};
export const lerp=(a: number,b: number,t: number)=>a+(b-a)*t;
export function mixColor(a: string,b: string,t: number){const rgb=(c: string)=>c.slice(1).match(/../g)!.map(n=>parseInt(n,16)),from=rgb(a),to=rgb(b);return '#'+from.map((v,i)=>Math.round(lerp(v,to[i],clamp(t))).toString(16).padStart(2,'0')).join('');}
function seeded(seed: number){let s=seed>>>0;return ()=>{s+=0x6D2B79F5;let v=s;v=Math.imul(v^v>>>15,v|1);v^=v+Math.imul(v^v>>>7,v|61);return ((v^v>>>14)>>>0)/4294967296;};}
function shuffle<T>(items: readonly T[],rand: () => number){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const hash=(x: number,y: number)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};
function tileColor(c: number,r: number){const bx=Math.floor(c/2),by=Math.floor(r/2),light=.35+(1-by/7)*.32+(1-bx/10)*.1+(hash(bx,by)-.5)*.3;return mixColor(palette[clamp(Math.floor(light*6),0,5)],hash(c,r)>.5?palette[5]:palette[1],hash(c+21,r+7)*.13);}
export const cells: Cell[]=mask.flatMap((row,by)=>[...row].flatMap((value,bx)=>value==='0'?[]:Array.from({length:4},(_,k)=>{const c=bx*2+k%2,r=by*2+Math.floor(k/2);return {id:`${c}:${r}`,c,r,x:171+c*13,y:160+r*13,color:tileColor(c,r),grain:hash(c+12,r+13)};})));
// Only this upper-right shoulder is incomplete. Keep the entire bottom intact.
export const missingRows: [number, number[]][]=[[2,[15,16,17]],[3,[15,16,17]],[4,[15,16,17]],[5,[16,17]],[6,[17,18,19]],[7,[17,18,19]],[8,[18,19]],[9,[18,19]],[10,[18,19]],[11,[19]]];
export const missingIds=new Set(missingRows.flatMap(([r,cols])=>cols.map(c=>`${c}:${r}`)));
export const homes: Record<Agent, Point>={codex:{x:431,y:503},claude:{x:498,y:508}};
const route=(a: Point,b: Point,lane: number)=>[a,{x:a.x,y:lane},{x:b.x,y:lane},b];
const beside=(a: Point,b: Point,lane: number)=>[a,{x:lane,y:a.y},{x:lane,y:b.y},b];
const innerLane=452;
function along(points: Point[],progress: number): Point{const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y));let distance=ease(progress)*lengths.reduce((a,b)=>a+b,0);for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]||i===lengths.length-1){const p=lengths[i]?clamp(distance/lengths[i]):1;return {x:lerp(points[i].x,points[i+1].x,p),y:lerp(points[i].y,points[i+1].y,p)};}distance-=lengths[i];}return {...points.at(-1)!};}
export function createVisit(seed: number, primary: FragmentKind = "records"): Visit {
  const rand = seeded(seed);
  const leader = rand() < 0.5 ? "codex" : "claude";
  const follower = leader === "codex" ? "claude" : "codex";
  const contextHome = { x: 100 + rand() * 10, y: 250 + rand() * 28 };
  const row = Math.round((contextHome.y - 166) / 13);
  const edge = Math.min(...cells.filter((cell) => cell.r === row).map((cell) => cell.x));
  const connection = [
    { x: contextHome.x + 35, y: contextHome.y },
    { x: 153, y: contextHome.y },
    { x: 153, y: 166 + row * 13 },
    { x: edge - 1, y: 166 + row * 13 },
  ];
  const kinds: Record<FragmentKind, FragmentKind[]> = {
    records: ["records", "lake", "lakehouse"],
    lake: ["lake", "records", "lakehouse"],
    lakehouse: ["records", "lakehouse", "lake"],
  };
  const sourceKinds = shuffle(kinds[primary], rand);
  // Two sources beside the loaf and one below it leave open space between the clusters.
  const fragments: ContextFragment[] = [
    { id: 0, kind: sourceKinds[0], x: 494 + (rand() - 0.5) * 12, y: 165 + (rand() - 0.5) * 8 },
    { id: 1, kind: sourceKinds[1], x: 520 + (rand() - 0.5) * 12, y: 330 + (rand() - 0.5) * 8 },
    { id: 2, kind: sourceKinds[2], x: 200 + (rand() - 0.5) * 16, y: 410 + (rand() - 0.5) * 8 },
  ];
  const order = [...missingRows].reverse().flatMap(([r, cols]) =>
    shuffle(cols, rand).map((c) => cells.find((tile) => tile.id === `${c}:${r}`)!),
  );
  const next = { codex: leader === "codex" ? 1.4 : 2.9, claude: leader === "claude" ? 1.4 : 2.9 };
  const jobs: Job[] = [], tiles: LooseTile[] = [];
  for (const fragment of fragments) {
    for (let packet = 0; packet < 2; packet++) {
      const index = jobs.length;
      const actor = packet === 0 ? leader : follower;
      const source = {
        x: fragment.x + (packet === 0 ? -30 : 10) + (rand() - 0.5) * 4,
        y: fragment.y + 62 + packet * 11 + (rand() - 0.5) * 4,
      };
      const home = homes[actor];
      const pickup = { x: source.x + 7, y: source.y + 57 };
      const work = { x: 447, y: actor === "codex" ? 366 : 405 };
      const tempo = 0.94 + rand() * 0.12;
      const start = next[actor];
      const pickupAt = start + 1.8 * tempo;
      // Gathering is visible before the existing carry/place sequence.
      const carryingAt = pickupAt + 0.8;
      const placeAt = carryingAt + 2.5 * tempo;
      const end = placeAt + 1.5 + 0.8;
      const lane = actor === "codex" ? 510 : 548;
      // The upper source has a direct inner aisle; lower sources use the floor lanes.
      const outPath = fragment.id === 0 ? beside(home, pickup, innerLane) : route(home, pickup, lane);
      const backPath = fragment.id === 0 ? beside(pickup, work, innerLane) : route(pickup, work, lane);
      jobs.push({ index, actor, fragmentId: fragment.id, source, home, pickup, work,
        start, pickupAt, carryingAt, placeAt, end,
        outPath, backPath, restPath: beside(work, home, innerLane) });
      next[actor] = end + 0.4 + rand() * 0.5;
      order.slice(index * 4, index * 4 + 4).forEach((cell, k) => tiles.push({
        ...cell, job: index, k,
        pile: { x: source.x + (k % 2) * 15 + (rand() - 0.5) * 9,
          y: source.y + Math.floor(k / 2) * 15 + (rand() - 0.5) * 7 },
        angle: (rand() - 0.5) * 10,
        launchAt: placeAt + k * 0.23, settleAt: placeAt + k * 0.23 + 0.55,
      }));
    }
  }
  const lastArrival = Math.max(...tiles.map((tile) => tile.settleAt));
  const duration = Math.max(...jobs.map((job) => job.end)) + 1.4;
  return { seed: seed >>> 0, leader, contextHome, connection, fragments, jobs, tiles,
    lastArrival, duration, blinkOffset: rand() * 3, drift: rand() * Math.PI * 2 };
}
export function petAt(visit: Visit,actor: Agent,time: number): PetPose{
 const job=visit.jobs.find(j=>j.actor===actor&&time>=j.start&&time<j.end);
 if(!job)return {...homes[actor],actor,action:time>visit.lastArrival&&time<visit.lastArrival+1.3?'thanks':'idle',phase:time,facing:-1};
 let p: Point,action: PetAction,from: Point,to: Point;
 if(time<job.pickupAt){p=along(job.outPath,(time-job.start)/(job.pickupAt-job.start));action='walk';from=job.home;to=job.pickup;}
 else if(time<job.carryingAt){p=job.pickup;action='collect';from=to=p;}
 else if(time<job.placeAt){p=along(job.backPath,(time-job.carryingAt)/(job.placeAt-job.carryingAt));action='carry';from=job.pickup;to=job.work;}
 else if(time<job.placeAt+1.5){p=job.work;action='place';from=to=p;}
 else {p=along(job.restPath,(time-job.placeAt-1.5)/.8);action='walk';from=job.work;to=job.home;}
 return {...p,actor,action,phase:time-job.start,facing:Math.sign(to.x-from.x)||-1,job:job.index};
}
export function tileAt(visit: Visit,tile: LooseTile,time: number): Placement{
 const job=visit.jobs[tile.job];if(time<job.pickupAt)return {...tile.pile,state:'loose',angle:tile.angle};
 const pet=petAt(visit,job.actor,time),carry={x:pet.x-12+(tile.k%2)*13,y:pet.y-65+Math.floor(tile.k/2)*13};
 if(time<job.carryingAt){const t=ease((time-job.pickupAt)/(job.carryingAt-job.pickupAt));return {x:lerp(tile.pile.x,carry.x,t),y:lerp(tile.pile.y,carry.y,t),state:'carried',angle:tile.angle*(1-t)};}
 if(time<tile.launchAt)return {...carry,state:'carried',angle:0};if(time>=tile.settleAt)return {x:tile.x,y:tile.y,state:'settled',angle:0};
 const t=ease((time-tile.launchAt)/(tile.settleAt-tile.launchAt)),from={x:job.work.x-12+(tile.k%2)*13,y:job.work.y-65+Math.floor(tile.k/2)*13};
 return {x:lerp(from.x,tile.x,t),y:lerp(from.y,tile.y,t)-Math.sin(t*Math.PI)*8,state:'placing',angle:0};
}
export function eyeState(visit: Visit,time: number,ambient=time): Eye{
 const working=visit.jobs.filter(j=>time>=j.carryingAt&&time<j.placeAt+1.5).sort((a,b)=>Math.abs(time-a.placeAt)-Math.abs(time-b.placeAt))[0],pet=working?petAt(visit,working.actor,time):null;
 const gazeX=pet?clamp((pet.x-300)/90,-1,1)*4.2:Math.sin(ambient*.17)*.6;
 const arrivals=visit.jobs.map(j=>Math.max(...visit.tiles.filter(t=>t.job===j.index).map(t=>t.settleAt))),last=Math.max(-100,...arrivals.filter(at=>at<=time)),since=time-last;
 const thanks=since<1.15?Math.sin(clamp(since/1.15)*Math.PI):0,blinkPhase=(ambient+visit.blinkOffset)%6.8,blink=blinkPhase<.22?Math.abs(blinkPhase-.11)/.11:1;
 return {x:gazeX,y:pet?.65:0,rx:11,ry:16*Math.max(.045,thanks>.1?1:blink),thanks,blink};
}
export function eyePath(cx: number,cy: number,eye: Eye){
 // One stepped outline throughout: square gaze, flat blink and a pixel arch for thanks.
 const x=cx+eye.x,y=cy+eye.y,t=eye.thanks,rx=eye.rx;
 const edge=lerp(1,5.5,t),corner=Math.min(1,eye.ry*.35);
 const topOuter=y+lerp(-eye.ry+corner,-3,t),topInner=y+lerp(-eye.ry,-10,t);
 const bottomOuter=y+lerp(eye.ry-corner,4,t),bottomInner=y+lerp(eye.ry,-3,t);
 return `M ${x-rx} ${topOuter} H ${x-rx+edge} V ${topInner} H ${x+rx-edge} V ${topOuter} H ${x+rx} V ${bottomOuter} H ${x+rx-edge} V ${bottomInner} H ${x-rx+edge} V ${bottomOuter} H ${x-rx} Z`;
}
export function frame(visit: Visit,time: number){const positions=visit.tiles.map(t=>({...t,...tileAt(visit,t,time)})),settled=FIXED+positions.filter(t=>t.state==='settled').length;return {time,positions,pets:(['codex','claude'] as const).map(a=>petAt(visit,a,time)),settled,progress:(settled-FIXED)/24};}
export function ambientTile(cell: Pick<Cell, "c" | "r">,seconds: number,energy=0,dx=0,dy=0){
 // A readable travelling lift, using the same phase field as Gustav Online / Arcitai.
 // The broad crest carries the motion; keep independent tile bobbing very small.
 const crest=Math.max(0,Math.sin(seconds*1.2-cell.c*.33-cell.r*.21))**3;
 const ripple=Math.sin(seconds*.9-cell.c*.19+cell.r*.42);
 return {x:ripple*.22+dx*energy*2.4,y:-crest*2.8+ripple*.35+dy*energy*2.4,scale:1+crest*.018+energy*.012,tint:crest*.09+energy*.07};
}
export function clawdParts(pet: PetPose){
 const ox=pet.x-24,oy=pet.y-40,defs=[[3,5,17.998,12.079],[0,10.949,3,3.102],[20.998,10.949,3.002,3.102],...[4.487,7.488,15,18].map(x=>[x,17.079,1.5,2.921])],walking=pet.action==='walk'||pet.action==='carry';
 const parts=defs.map(([x,y,w,h],i)=>({x:ox+x*2,y:oy+y*2-(i>=3&&walking?Math.max(0,Math.sin(pet.phase*15+i*Math.PI/2))*1.2:0)-(i===1&&(pet.action==='place'||pet.action==='thanks')?1.8:0),width:w*2,height:h*2,color:'#D97757'}));
 [6,16.51].forEach(x=>parts.push({x:ox+x*2,y:oy+8.102*2,width:2.98,height:5.694,color:'#3B251C'}));return parts;
}
