import { useEffect, useRef } from "react";
import "./living-mark.css";

const step = 11.5;
const tileSize = 10.3;
// Crust, toasted grain and flour from the sourdough illustrations in the menu.
const palettes = {
  light: ["#79502f", "#925b34", "#a66b3d", "#b8804d", "#ca945c", "#d9ac76", "#e6c28d", "#efdab8"],
  dark: ["#815230", "#995f37", "#ad7243", "#c18a53", "#d29e64", "#dfb57e", "#e9c997", "#f0d9b5"],
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
const smooth = (value: number) => {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
};

/** A warm tile boule with the same travelling crest as Gustav Online's field. */
export function LivingMark() {
  const element = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wake = useRef<() => void>(() => {});
  const clock = useRef(1.5);
  const formed = useRef(0);

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
    let gazeX = 0, gazeY = 0;
    let dark = document.documentElement.dataset.theme === "dark";
    let seedState = 0x9e3779b9;
    const random = () => {
      seedState = (seedState + 0x6d2b79f5) | 0;
      let mixed = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
      mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
      return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
    };
    const cells = Array.from({ length: 25 * 21 }, (_, index) => {
      const col = index % 25, row = Math.floor(index / 25);
      const x = (col - 12) * step, y = (row - 10) * step;
      const nx = (x - 3 * Math.sin(y / 44)) / 136;
      const ny = y / (y < 0 ? 111 : 101);
      const angle = Math.atan2(ny, nx);
      const radius = Math.hypot(nx, ny);
      const edge = 1 + 0.025 * Math.sin(3 * angle + 1.2) + 0.018 * Math.cos(5 * angle);
      const seed = random(), tone = random();
      // Broad warm shading, mixed through the loaf rather than a dark perimeter.
      const light = 0.52 - ny * 0.14 - nx * 0.09 + (tone - 0.5) * 0.48;
      const scoreY = -57 - 14 * (1 - (x / 80) ** 2) + x * 0.12;
      const score = Math.abs(x) < 83 && Math.abs(y - scoreY) < 5.8;
      const flour = y < -48 && tone > 0.95;
      const level = score || flour ? 7 : Math.max(0, Math.min(6, Math.round(light * 6)));
      return { col, row, x, y, inside: radius < edge && y < 98,
        seed, level, size: tileSize * (0.96 + seed * 0.07),
        delay: ((x + 0.55 * y + 200) / 400) * 1.05 + seed * 0.12,
        offsetX: (random() - 0.5) * 0.65, offsetY: (random() - 0.5) * 0.65,
        energy: 0, pushX: 0, pushY: 0 };
    }).filter(cell => cell.inside);

    function render(now: number) {
      if (!ctx || !host) return;
      const still = reduced.matches;
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.04);
      last = now;
      if (!still) { t += dt; clock.current = t; }
      if (still) formed.current = 2;
      else if (visible) formed.current = Math.min(2, formed.current + dt);
      const phase = still ? 1.5 : t;
      const age = t - wakeAt;
      const speed = pointer && previousPointer
        ? Math.min(1, Math.hypot(pointer.x - previousPointer.x, pointer.y - previousPointer.y) / 14)
        : 0.4;
      const gazeEase = still ? 1 : 1 - Math.exp(-dt * 9);
      gazeX += ((!still && pointer ? Math.max(-2.8, Math.min(2.8, pointer.x / 40)) : 0) - gazeX) * gazeEase;
      gazeY += ((!still && pointer ? Math.max(-2, Math.min(2, pointer.y / 50)) : 0) - gazeY) * gazeEase;
      const blinkPhase = phase % 6.4;
      const eyeOpen = still || blinkPhase < 6.22 ? 1 : 1 - Math.sin((blinkPhase - 6.22) / 0.18 * Math.PI) * 0.94;
      const colors = finishes[dark ? "dark" : "light"];
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height * 0.49);
      ctx.scale(scale, scale);
      ctx.fillStyle = dark ? "#e0b07c0d" : "#60402610";
      ctx.beginPath();
      ctx.ellipse(0, 111, 105, 5, 0, 0, Math.PI * 2);
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
        const reveal = still ? 1 : smooth((formed.current - cell.delay) / 0.55);
        if (!reveal) continue;
        const crest = still ? 0 : Math.max(0, Math.sin(phase * 1.2 - cell.col * 0.33 - cell.row * 0.21)) ** 3;
        const ripple = Math.sin(phase * 0.9 - cell.col * 0.19 + cell.row * 0.42);
        const bob = still ? 0 : (Math.sin(phase * 2.1 + cell.seed * 40) * 0.55 + ripple * 0.45) * 0.4;
        const lift = crest * 0.65 + cell.energy;
        const size = (cell.size + lift * 0.8) * (0.82 + reveal * 0.18);
        const x = cell.x - size / 2 + cell.pushX + cell.offsetX;
        const y = cell.y - size / 2 - lift * 1.6 + bob + cell.pushY + cell.offsetY + (1 - reveal) * 5;
        const finish = colors[cell.level];
        ctx.globalAlpha = reveal;
        // Arc'IT's shallow tile edge, shaded from each face rather than a brown outline.
        ctx.fillStyle = finish.side;
        ctx.beginPath(); ctx.roundRect(x + 0.3, y + 1, size, size, 1.8); ctx.fill();
        ctx.fillStyle = finish.face;
        ctx.beginPath(); ctx.roundRect(x, y, size, size, 1.8); ctx.fill();
        ctx.fillStyle = `rgba(255,246,226,${0.05 + crest * 0.12 + cell.energy * 0.12})`;
        ctx.fill();
        ctx.strokeStyle = finish.rim; ctx.lineWidth = 0.55;
        ctx.beginPath(); ctx.moveTo(x + 1.5, y + 0.5); ctx.lineTo(x + size - 1.5, y + 0.5); ctx.stroke();
      }
      // Eyes sit on a complete tile surface: warm whites, pupils and a small glint.
      ctx.globalAlpha = still ? 1 : smooth((formed.current - 1.2) / 0.4);
      for (const x of [-32, 32]) {
        ctx.save(); ctx.translate(x, 12); ctx.scale(1, eyeOpen);
        ctx.fillStyle = "#6b4227";
        ctx.beginPath(); ctx.ellipse(0, 0.8, 10, 13, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff0d2";
        ctx.beginPath(); ctx.ellipse(0, 0, 9, 12, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#382619";
        ctx.beginPath(); ctx.ellipse(gazeX, gazeY + 1, 4.8, 7.4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff9ec";
        ctx.beginPath(); ctx.ellipse(gazeX - 1.5, gazeY - 2, 1.7, 2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      ctx.restore();
      if (pointerMoved) previousPointer = pointer;
      pointerMoved = false;
      host.dataset.motion = still ? "still" : visible ? "running" : "offscreen";
      host.dataset.formation = formed.current >= 1.8 ? "complete" : "forming";
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
        y: (event.clientY - rect.top - height * 0.49) / scale };
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
      scale = Math.min(width / 304, height / 248);
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
