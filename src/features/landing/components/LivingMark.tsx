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
const palettes = {
  light: ["#f3dcc0", "#e6b98a", "#c98d55", "#9c5f2e"],
  dark: ["#785536", "#a37348", "#c99a69", "#e0b07c"],
};
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
    const cells = Array.from({ length: 20 * 14 }, (_, index) => {
      const col = index % 20, row = Math.floor(index / 20);
      const seed = ((col * 71 + row * 43) % 97) / 97;
      const edge = !inside(col - 1, row) || !inside(col + 1, row)
        || !inside(col, row - 1) || !inside(col, row + 1);
      return { col, row, x: (col - 9.5) * step, y: (row - 6.5) * step,
        seed, level: edge ? 3 : Math.floor(seed * 3), energy: 0, pushX: 0, pushY: 0 };
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
      const colors = palettes[dark ? "dark" : "light"];
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
        const size = tileSize + lift * 0.8;
        const x = cell.x - size / 2 + cell.pushX;
        const y = cell.y - size / 2 - lift * 1.6 + bob + cell.pushY;
        ctx.fillStyle = dark ? "#3f2a1b" : "#85552f";
        ctx.beginPath(); ctx.roundRect(x, y + 1.4, size, size, 1.4); ctx.fill();
        ctx.fillStyle = colors[cell.level];
        ctx.beginPath(); ctx.roundRect(x, y, size, size, 1.4); ctx.fill();
        ctx.fillStyle = `rgba(255,246,226,${0.05 + crest * 0.12 + cell.energy * 0.12})`;
        ctx.fill();
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
