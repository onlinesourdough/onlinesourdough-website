import { useEffect, useRef } from "react";
import "./living-mark.css";

// Keep the original pixel boule, subdivided into the family's 10/13 tile grid.
const rows = [
  "0001111000",
  "0111111110",
  "1111111110",
  "1111111111",
  "1111111111",
  "1111111111",
  "0111111110",
];
const step = 13;
const tileSize = 10;
// The onlinesourdough ramp from Gustav Online, with a few warm accent tiles.
const palettes = {
  light: ["#ece6dc", "#efe4d3", "#e3cfb0", "#c3ad90", "#a98a6b", "#f8d3b2", "#f5aa70"],
  dark: ["#3a332b", "#5f5141", "#89765e", "#a08a6d", "#e8d9c3", "#7a4524", "#b85c26"],
};
function mix(from: string, to: string, amount: number) {
  return `rgb(${[1, 3, 5].map(start => Math.round(
    parseInt(from.slice(start, start + 2), 16) * (1 - amount)
      + parseInt(to.slice(start, start + 2), 16) * amount,
  )).join(",")})`;
}
const finishes = Object.fromEntries(Object.entries(palettes).map(([theme, colors]) => [theme,
  colors.map(color => ({ face: color, side: mix(color, "#2b1b12", 0.18), rim: mix(color, "#fffaf1", 0.3) })),
]));
const inside = (col: number, row: number) =>
  rows[Math.floor(row / 2)]?.[Math.floor(col / 2)] === "1";

/** A warm tile boule with the same travelling crest as Gustav Online's field. */
export function LivingMark() {
  const element = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wake = useRef<() => void>(() => {});
  const clock = useRef(1.5);

  useEffect(() => {
    const host = element.current, surface = canvas.current;
    if (!host || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, visible = false, width = 300, height = 210, scale = 1;
    let last = 0, t = clock.current, wakeAt = -10;
    let pointer: { x: number; y: number } | null = null;
    let previousPointer: { x: number; y: number } | null = null;
    let pointerMoved = false;
    let dark = document.documentElement.dataset.theme === "dark";
    let seedState = 0x9e3779b9;
    const random = () => {
      seedState = (seedState + 0x6d2b79f5) | 0;
      let mixed = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
      mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
      return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
    };
    const cells = Array.from({ length: 20 * 14 }, (_, index) => {
      const col = index % 20, row = Math.floor(index / 20);
      const seed = random(), tone = random();
      const level = tone < 0.9 ? Math.floor(tone / 0.18) : tone < 0.97 ? 5 : 6;
      return { col, row, x: (col - 9.5) * step, y: (row - 6.5) * step,
        seed, level, size: tileSize * (seed < 0.18 ? 0.84 : 0.94 + seed * 0.1),
        offsetX: (random() - 0.5) * 0.8, offsetY: (random() - 0.5) * 0.8,
        energy: 0, pushX: 0, pushY: 0 };
    }).filter(cell => inside(cell.col, cell.row));

    function render(now: number) {
      if (!ctx || !host) return;
      const still = reduced.matches;
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.04);
      last = now;
      if (!still) { t += dt; clock.current = t; }
      const phase = still ? 1.5 : t;
      const age = t - wakeAt;
      const speed = pointer && previousPointer
        ? Math.min(1, Math.hypot(pointer.x - previousPointer.x, pointer.y - previousPointer.y) / 14)
        : 0.4;
      const look = !still && pointer ? Math.max(-1, Math.min(1, Math.round(pointer.x / 95))) : 0;
      const blink = !still && phase % 5.7 > 5.56;
      const colors = finishes[dark ? "dark" : "light"];
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height * 0.47);
      ctx.scale(scale, scale);
      ctx.fillStyle = dark ? "#e0b07c0a" : "#6040260a";
      ctx.beginPath();
      ctx.ellipse(0, 104, 111, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      for (const cell of cells) {
        if (still) cell.energy = cell.pushX = cell.pushY = 0;
        else {
          cell.energy *= Math.exp(-dt * 3.2);
          cell.pushX *= Math.exp(-dt * 3.2);
          cell.pushY *= Math.exp(-dt * 3.2);
          if (pointer && pointerMoved) {
            const dx = cell.x - pointer.x, dy = cell.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const energy = Math.max(0, 1 - distance / 60) * speed;
            cell.energy = Math.max(cell.energy, energy);
            if (energy > 0) {
              cell.pushX = dx / Math.max(1, distance) * energy * 3;
              cell.pushY = dy / Math.max(1, distance) * energy * 3;
            }
          }
          if (age >= 0 && age < 2) {
            const ring = Math.max(0, 1 - Math.abs(Math.hypot(cell.x, cell.y) - age * 120) / 24);
            cell.energy = Math.max(cell.energy, ring * 0.8);
          }
        }
        // Whole missing tiles form eyes; the silhouette remains legible while stirred.
        const eyeColumn = cell.col === 6 + look || cell.col === 7 + look
          || cell.col === 12 + look || cell.col === 13 + look;
        if (eyeColumn && (blink ? cell.row === 7 : cell.row >= 6 && cell.row <= 8)) continue;
        const crest = still ? 0 : Math.max(0, Math.sin(phase * 1.2 - cell.col * 0.33 - cell.row * 0.21)) ** 3;
        const ripple = Math.sin(phase * 0.9 - cell.col * 0.19 + cell.row * 0.42);
        const bob = still ? 0 : (Math.sin(phase * 2.1 + cell.seed * 40) * 0.55 + ripple * 0.45) * 0.4;
        const lift = crest * 0.65 + cell.energy;
        const size = cell.size + lift * 0.8;
        const x = cell.x - size / 2 + cell.pushX + cell.offsetX;
        const y = cell.y - size / 2 - lift * 1.6 + bob + cell.pushY + cell.offsetY;
        const finish = colors[cell.level];
        // Arc'IT's shallow tile edge, shaded from each face rather than a brown outline.
        ctx.fillStyle = finish.side;
        ctx.beginPath(); ctx.roundRect(x + 0.35, y + 1.2, size, size, 1.4); ctx.fill();
        ctx.fillStyle = finish.face;
        ctx.beginPath(); ctx.roundRect(x, y, size, size, 1.4); ctx.fill();
        ctx.fillStyle = `rgba(255,246,226,${0.05 + crest * 0.12 + cell.energy * 0.12})`;
        ctx.fill();
        ctx.strokeStyle = finish.rim; ctx.lineWidth = 0.55;
        ctx.beginPath(); ctx.moveTo(x + 1.5, y + 0.5); ctx.lineTo(x + size - 1.5, y + 0.5); ctx.stroke();
      }
      ctx.restore();
      if (pointerMoved) previousPointer = pointer;
      pointerMoved = false;
      host.dataset.motion = still ? "still" : visible ? "running" : "offscreen";
      if (visible && !still && document.visibilityState === "visible") raf = requestAnimationFrame(render);
    }
    function restart() {
      cancelAnimationFrame(raf);
      last = 0;
      if (document.visibilityState === "visible") raf = requestAnimationFrame(render);
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || reduced.matches) return;
      const rect = surface!.getBoundingClientRect();
      pointer = { x: (event.clientX - rect.left - width / 2) / scale,
        y: (event.clientY - rect.top - height * 0.47) / scale };
      pointerMoved = true;
    }
    function leave() { pointer = previousPointer = null; pointerMoved = false; }
    function visibility() {
      leave();
      if (document.visibilityState === "visible" && visible) restart();
      else cancelAnimationFrame(raf);
    }
    function theme() { dark = document.documentElement.dataset.theme === "dark"; restart(); }
    wake.current = () => { if (!reduced.matches && visible) wakeAt = t; };
    const size = new ResizeObserver(() => {
      const rect = surface!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width; height = rect.height;
      scale = Math.min(width / 290, height / 230);
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface!.width = Math.round(width * ratio);
      surface!.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
      else { cancelAnimationFrame(raf); host!.dataset.motion = "offscreen"; leave(); }
    }, { threshold: 0.05 });
    const themeObserver = new MutationObserver(theme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    size.observe(host); observer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(raf); size.disconnect(); observer.disconnect(); themeObserver.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", restart);
      wake.current = () => {};
    };
  }, []);
  return (
    <div ref={element} className="da-hero-field da-character" data-character="mark" data-body-style="tiles">
      <button type="button" className="da-character-surface" aria-label="Wake the tile sourdough" onClick={() => wake.current()}>
        <canvas ref={canvas} aria-hidden="true" />
      </button>
    </div>
  );
}
