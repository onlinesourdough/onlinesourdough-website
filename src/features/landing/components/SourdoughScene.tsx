import { useEffect, useId, useRef, useState } from "react";
import {
  ambientTile, cells, clawdParts, clamp, createVisit, eyePath, eyeState,
  frame, missingIds, mixColor, palette, sceneView, tileLight, type Cell, type Placement,
} from "./bread-scene";
import "./sourdough-scene.css";
import { drawContextFragment, drawNotionPeer, type BreadContextVariant } from "./bread-context";

const fixedCells = cells.filter((cell) => !missingIds.has(cell.id));
// Sparse, stepped falloff softens the silhouette without drawing a rectangular panel.
const haloCells = Array.from({ length: 30 * 20 }, (_, index) => {
  const c = index % 30 - 5, r = Math.floor(index / 30) - 3;
  if (cells.some((cell) => cell.c === c && cell.r === r)) return null;
  const distance = Math.min(...cells.map((cell) => Math.hypot(cell.c - c, cell.r - r)));
  const grain = Math.abs(Math.sin(c * 127.1 + r * 311.7));
  return distance < 3.6 && grain > 0.28 + distance * 0.12 ? { x: 171 + c * 13, y: 160 + r * 13, distance, grain } : null;
}).filter((cell) => cell !== null);
type Trace = { energy: number; dx: number; dy: number };
// Clustered pigment, sampled once per tile, follows the coarse marks in the menu art.
// The same finish travels with a loose tile and never flickers between frames.
const tileFinish = new Map(cells.map((cell) => {
  const random = (offset: number) => {
    const value = Math.sin(cell.c * 127.1 + cell.r * 311.7 + offset * 73.3) * 43758.5453;
    return value - Math.floor(value);
  };
  const x = -4 + Math.floor(random(1) * 5), y = -4 + Math.floor(random(2) * 5);
  const flourX = -4 + Math.floor(random(3) * 8), flourY = -4 + Math.floor(random(4) * 7);
  return [cell.id, {
    shade: mixColor(cell.color, palette[0], 0.22 + random(5) * 0.16),
    flour: mixColor(cell.color, tileLight, 0.16 + random(6) * 0.14),
    patches: [
      { x, y, w: 3, h: 2, light: false },
      { x: x + 1, y: y + 2, w: 2, h: 1, light: false },
      { x: flourX, y: flourY, w: 2, h: 2, light: true },
      { x: flourX + 2, y: flourY + 1, w: 1, h: 1, light: true },
      ...(random(7) > 0.55 ? [{ x: -4 + Math.floor(random(8) * 8), y: 3, w: 1, h: 1, light: false }] : []),
    ],
  }] as const;
}));

/** The selected tile loaf and helpers, sized for the manifesto's illustration column. */
export function SourdoughScene({ sourceVariant = "records" }: { sourceVariant?: BreadContextVariant }) {
  const captionId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replay = useRef<() => void>(() => {});
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const seed = () => crypto.getRandomValues(new Uint32Array(1))[0];
    let visit = createVisit(seed(), sourceVariant), time = 0, ambient = 0;
    let started = false, ratio = 0, visible = false, raf = 0, previous = 0;
    let wasComplete = false;
    let scale = 1, dark = document.documentElement.dataset.theme === "dark";
    let pointer: { x: number; y: number } | null = null;
    let moved = false, speed = 0, gazeX = 0, gazeY = 0;
    const traces = new Map<string, Trace>();
    const sprite = new Image();
    sprite.src = "/assets/agents/codex-spritesheet-v4.webp";
    const notion = new Image();
    notion.src = "/assets/context/notion.svg";

    function haze(x: number, y: number, rx: number, ry: number, color: string, opacity: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(rx, ry);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, `${color}00`);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = gradient;
      ctx.fillRect(-1, -1, 2, 2);
      ctx.restore();
    }

    function tile(cell: Cell, pos: Cell | Placement, dt: number, animate: boolean) {
      const old = traces.get(cell.id) ?? { energy: 0, dx: 0, dy: 0 };
      const distance = pointer ? Math.hypot(pointer.x - pos.x - 6, pointer.y - pos.y - 6) : Infinity;
      const impulse = moved && distance < 70
        ? Math.max(0, 1 - distance / 70) ** 2 * Math.min(1, speed / 15) * 0.8
        : 0;
      const energy = animate ? Math.min(1, old.energy * Math.exp(-dt * 3.5) + impulse) : 0;
      const dx = impulse && pointer ? (pos.x + 6 - pointer.x) / (distance || 1) : old.dx;
      const dy = impulse && pointer ? (pos.y + 6 - pointer.y) / (distance || 1) : old.dy;
      traces.set(cell.id, { energy, dx, dy });
      const motion = animate ? ambientTile(cell, ambient, energy, dx, dy) : { x: 0, y: 0, scale: 1, tint: 0 };
      ctx.save();
      ctx.translate(pos.x + motion.x + 6, pos.y + motion.y + 6);
      ctx.rotate(("angle" in pos ? pos.angle : 0) * Math.PI / 180);
      ctx.scale(motion.scale, motion.scale);
      // Crumb-toned seams keep the loaf dense like the pixel illustrations;
      // paper-white gaps and a continuous bevel read as glazed ceramic.
      ctx.fillStyle = mixColor(cell.color, palette[0], 0.22);
      ctx.fillRect(-6, -6, 13, 13);
      ctx.fillStyle = mixColor(cell.color, tileLight, motion.tint);
      ctx.fillRect(-6, -6, 12, 12);
      const finish = tileFinish.get(cell.id)!;
      for (const patch of finish.patches) {
        ctx.fillStyle = patch.light ? finish.flour : finish.shade;
        ctx.fillRect(patch.x, patch.y, patch.w, patch.h);
      }
      ctx.restore();
    }

    function render(dt = 0) {
      // Owner choice: brand animation remains enabled with OS reduced motion.
      const animate = started && visible;
      const state = frame(visit, time);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.restore();
      const drift = animate ? ambient : 0;
      const strength = dark ? 1.4 : 1.15;
      haze(265 + Math.sin(drift * 0.09) * 10, 290, 210, 160, "#9A7458", (0.14 - state.progress * 0.045) * strength);
      haze(410 + Math.sin(drift * 0.07 + 1) * 20, 290, 145, 160, "#7393BD", (0.055 + state.progress * 0.13) * strength);
      haze(300 + Math.sin(drift * 1.2 - 0.6) * 35, 280 + Math.sin(drift * 0.9) * 12, 200, 150, "#C6B4A2", (0.06 + (Math.sin(drift * 1.2) + 1) * 0.02) * strength);
      haze(220 + Math.sin(drift * 0.12) * 12, 455, 110, 90, "#9A8067", (0.065 - state.progress * 0.025) * strength);
      ctx.save();
      ctx.fillStyle = dark ? "#C6AF94" : "#9E8064";
      for (const cell of haloCells) {
        ctx.globalAlpha = (1 - cell.distance / 3.6) ** 2 * (dark ? 0.065 : 0.085);
        const size = 4 + Math.floor(cell.grain * 4);
        ctx.fillRect(cell.x + 3, cell.y + 3, size, size);
      }
      ctx.restore();
      drawNotionPeer(ctx, visit.contextHome, visit.connection, notion, dark);
      for (const fragment of visit.fragments) {
        const collectedAt = Math.max(...visit.jobs.filter((job) => job.fragmentId === fragment.id).map((job) => job.carryingAt));
        const sourceProgress = clamp((time - collectedAt) / 0.7);
        drawContextFragment(ctx, fragment.x, fragment.y, fragment.kind, fragment.id % 2, dark, sourceProgress);
      }
      ctx.fillStyle = dark ? "#A98B7018" : "#6040260B";
      ctx.fillRect(196, 353, 208, 3);
      ctx.fillRect(183, 356, 234, 3);
      ctx.fillRect(211, 359, 178, 3);

      const eye = eyeState(visit, time, animate ? ambient : 3.5);
      if (animate) {
        const amount = 1 - Math.exp(-dt * 5);
        gazeX += (eye.x - gazeX) * amount;
        gazeY += (eye.y - gazeY) * amount;
      } else { gazeX = eye.x; gazeY = eye.y; }
      eye.x = gazeX; eye.y = gazeY;
      ctx.save();
      ctx.translate(0, animate ? Math.sin(ambient * 0.67 + visit.drift) * 0.65 : 0);
      const face = new Path2D();
      face.rect(0, 80, 650, 500);
      face.addPath(new Path2D(eyePath(264, 258, eye)));
      face.addPath(new Path2D(eyePath(336, 258, eye)));
      ctx.clip(face, "evenodd");
      for (const cell of fixedCells) tile(cell, cell, dt, animate);
      for (const moving of state.positions) tile(moving, moving, dt, animate);
      ctx.restore();

      const pet = state.pets[0];
      const walking = pet.action === "walk" || pet.action === "carry";
      const waving = pet.action === "place" || pet.action === "thanks";
      const row = walking ? (pet.facing > 0 ? 1 : 2) : waving ? 3 : 0;
      const column = walking ? Math.floor(ambient * 7) % 8 : waving ? Math.floor(ambient * 3) % 4 : 0;
      if (sprite.complete && sprite.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, column * 192, row * 208, 192, 208, pet.x - 24, pet.y - 52, 48, 52);
      }
      for (const part of clawdParts(state.pets[1])) {
        ctx.fillStyle = part.color;
        ctx.fillRect(part.x, part.y, part.width, part.height);
      }
      host!.dataset.seed = String(visit.seed);
      host!.dataset.time = time.toFixed(3);
      host!.dataset.settled = String(state.settled);
      host!.dataset.state = !started ? "waiting" : time >= visit.duration ? "complete" : visible ? "playing" : "paused";
      const finished = time >= visit.duration;
      if (finished !== wasComplete) { wasComplete = finished; setComplete(finished); }
      moved = false;
    }

    function tick(now: number) {
      if (!visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
      if (previous && now - previous < 1000 / 30) return;
      const dt = previous ? Math.min((now - previous) / 1000, 0.08) : 0;
      previous = now;
      ambient += dt;
      time = Math.min(visit.duration, time + dt);
      render(dt);
    }
    function sync() {
      cancelAnimationFrame(raf);
      previous = 0;
      visible = ratio > 0.08 && !document.hidden;
      if (!started && ratio >= 0.45 && !document.hidden) started = true;
      render();
      if (visible && started) raf = requestAnimationFrame(tick);
    }
    replay.current = () => {
      if (time < visit.duration) return;
      visit = createVisit(seed(), sourceVariant); time = 0; ambient = 0;
      started = ratio >= 0.45; gazeX = 0; gazeY = 0; traces.clear();
      sync();
    };
    function move(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = sceneView.x + (event.clientX - rect.left) / scale;
      const y = sceneView.y + (event.clientY - rect.top) / scale;
      speed = pointer ? Math.hypot(x - pointer.x, y - pointer.y) : 12;
      pointer = { x, y }; moved = true;
    }
    function leave() { pointer = null; moved = false; }
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      scale = rect.width / sceneView.width;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(rect.width * dpr));
      canvas!.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, -sceneView.x * dpr * scale, -sceneView.y * dpr * scale);
      sync();
    }
    const size = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => {
      ratio = entry.intersectionRatio;
      sync();
    }, { threshold: [0, 0.08, 0.45, 1] });
    const theme = new MutationObserver(() => {
      dark = document.documentElement.dataset.theme === "dark";
      render();
    });
    size.observe(canvas);
    observer.observe(host);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerdown", move, { passive: true });
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointercancel", leave);
    document.addEventListener("visibilitychange", sync);

    sprite.onload = () => render();
    notion.onload = () => render();
    resize();
    return () => {
      cancelAnimationFrame(raf);
      size.disconnect(); observer.disconnect(); theme.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", sync);

      sprite.onload = null;
      notion.onload = null;
      replay.current = () => {};
    };
  }, [sourceVariant]);

  return (
    <div ref={hostRef} className="sourdough-scene" data-source={sourceVariant}>
      <button type="button" aria-label="Replay the tile sourdough and its helpers" aria-disabled={!complete} title={complete ? "Replay the animation" : "The helpers are gathering context"} aria-describedby={captionId} onClick={() => replay.current()}>
        <canvas ref={canvasRef} aria-hidden="true" />
      </button>
      <p id={captionId} className="sourdough-caption"><span>OSM · Data &amp; context</span><span aria-hidden="true">→</span><span>Your business ↔ Notion</span></p>
    </div>
  );
}
