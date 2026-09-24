import { useEffect, useRef } from "react";
import "./living-mark.css";

// A solid glyph body keeps the two eye openings distinct from the static logo’s crust.
const rows = [
  "0001111000",
  "0111111110",
  "1111111110",
  "1111111111",
  "1111111111",
  "1111111111",
  "0111111110",
];

/** Living glyph version of the original pixel boule, with two cut-out eyes. */
export function LivingMark() {
  const element = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wake = useRef<() => void>(() => {});
  const clock = useRef(1.5);
  useEffect(() => {
    const host = element.current,
      surface = canvas.current;
    if (!host || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0,
      visible = false,
      width = 420,
      height = 250,
      scale = 1,
      last = 0,
      t = clock.current;
    let px = 1000,
      py = 1000,
      gazeX = 0,
      gazeY = 0,
      pulse = 0,
      hover = false;
    const glyphs = "·:+x=*@#";
    const cells: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
      seed: number;
    }[] = [];
    for (let y = -110, row = 0; y <= 98; y += 4.6, row++) {
      for (let x = -128, col = 0; x <= 128; x += 4.6, col++) {
        cells.push({
          x,
          y,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
          seed: ((col * 71 + row * 43) % 97) / 97,
        });
      }
    }
    function inside(x: number, y: number) {
      const cx = Math.floor((x + 110) / 22);
      const cy = Math.floor((y + 77) / 22);
      return cy >= 0 && cy < 7 && cx >= 0 && cx < 10 && rows[cy][cx] === "1";
    }
    function render(now: number) {
      if (!ctx || !surface || !host) return;
      const stopped = reduced.matches;
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.04);
      last = now;
      if (!stopped) {
        t += dt;
        clock.current = t;
        pulse *= Math.exp(-dt * 4.5);
      }
      const driftX = stopped ? 0 : Math.sin(t * 0.61) * 3.5;
      const driftY = stopped ? 0 : Math.sin(t * 1.13) * 3;
      const lookX = hover
        ? Math.max(-1, Math.min(1, px / 115))
        : Math.sin(t * 0.43) * 0.35;
      const lookY = hover
        ? Math.max(-1, Math.min(1, py / 90))
        : Math.cos(t * 0.32) * 0.12;
      if (!stopped) {
        gazeX += (lookX * 5 - gazeX) * Math.min(1, dt * 8);
        gazeY += (lookY * 3 - gazeY) * Math.min(1, dt * 8);
      }
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2 + driftX * scale, height * 0.5 + driftY * scale);
      ctx.scale(scale, scale);
      const breathe = stopped
        ? 1
        : 1 + Math.sin(t * 1.4) * 0.012 + pulse * 0.025;
      ctx.scale(breathe, 1 / breathe);
      const dark = document.documentElement.dataset.theme === "dark";
      const ink = dark ? "225,176,126" : "79,43,20";
      const crust = dark ? "193,132,75" : "145,79,31";
      // Warm, faint grounding shadow; no opaque panel behind the character.
      ctx.fillStyle = dark ? "#c6a47a0b" : "#6040260b";
      ctx.beginPath();
      ctx.ellipse(
        0,
        94,
        97,
        5,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '5.7px "Geist Mono",monospace';
      const cycle = t % 5.7,
        blink =
          !stopped && cycle > 5.43 ? Math.abs((cycle - 5.565) / 0.135) : 1;
      const eyeY = 10;
      const eyeGap = 34;
      const eyeH = Math.max(1.4, 21 * Math.min(1, blink));
      let omittedEyeGlyphs = 0;
      for (const cell of cells) {
        if (!inside(cell.x, cell.y)) continue;
        if (!stopped) {
          const dx = cell.x - px,
            dy = cell.y - py,
            d = Math.hypot(dx, dy) || 1;
          const repel = hover ? Math.max(0, 1 - d / 48) * 12 : 0;
          const tx = (dx / d) * repel,
            ty = (dy / d) * repel;
          cell.vx += (tx - cell.dx) * dt * 90;
          cell.vy += (ty - cell.dy) * dt * 90;
          cell.vx *= Math.exp(-dt * 10);
          cell.vy *= Math.exp(-dt * 10);
          cell.dx += cell.vx * dt;
          cell.dy += cell.vy * dt;
        }
        const volume = Math.sqrt(
          Math.max(0, 1 - (cell.x / 135) ** 2 - (cell.y / 125) ** 2),
        );
        const shade = 0.32 + volume * 0.38 + cell.seed * 0.2;
        const warm = cell.seed > 0.77;
        ctx.fillStyle = `rgba(${warm ? crust : ink},${shade})`;
        const shimmer = Math.sin(t * 0.7 + cell.seed * 8) * 0.6;
        const char =
          glyphs[
            Math.max(
              0,
              Math.min(glyphs.length - 1, Math.floor(cell.seed * 7 + shimmer)),
            )
          ];
        const squash =
          Math.sin(cell.x * 0.04 + t * 0.8) * 1.4;
        const drawX = cell.x + cell.dx;
        const drawY = cell.y + cell.dy + (stopped ? 0 : squash);
        const inEyeOpening = [-1, 1].some((sign) => {
          const ex = sign * eyeGap + gazeX;
          const ey = eyeY + gazeY + sign * gazeX * 0.12;
          return ((drawX - ex) / 16) ** 2 + ((drawY - ey) / eyeH) ** 2 < 1;
        });
        if (inEyeOpening) {
          omittedEyeGlyphs++;
          continue;
        }
        ctx.fillText(char, drawX, drawY);
      }
      ctx.restore();
      host.dataset.eyeGlyphsOmitted = String(omittedEyeGlyphs);
      host.dataset.blink = blink < 0.6 ? "closed" : "open";
      host.dataset.motion = stopped
        ? "still"
        : visible
          ? "running"
          : "offscreen";
      if (visible && !stopped && document.visibilityState === "visible")
        raf = requestAnimationFrame(render);
    }
    function restart() {
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(render);
    }
    function move(event: PointerEvent) {
      const rect = surface!.getBoundingClientRect();
      px = (event.clientX - rect.left - width / 2) / scale;
      py = (event.clientY - rect.top - height * 0.5) / scale;
      hover = Math.abs(px) < 140 && Math.abs(py) < 110;
    }
    function leave() {
      hover = false;
      px = py = 1000;
    }
    function visibility() {
      if (document.visibilityState === "visible" && visible) restart();
      else cancelAnimationFrame(raf);
    }
    wake.current = () => {
      if (reduced.matches) return;
      pulse = 1;
      for (const cell of cells) {
        const d = Math.hypot(cell.x, cell.y) || 1;
        cell.vx += (cell.x / d) * 100;
        cell.vy += (cell.y / d) * 100;
      }
    };
    const size = new ResizeObserver(() => {
      const r = surface!.getBoundingClientRect();
      width = r.width;
      height = r.height;
      scale = Math.min(width / 340, height / 230);
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface!.width = Math.round(width * ratio);
      surface!.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) restart();
        else {
          cancelAnimationFrame(raf);
          host!.dataset.motion = "offscreen";
        }
      },
      { threshold: 0.05 },
    );
    const themeObserver = new MutationObserver(restart);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    size.observe(host);
    observer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(raf);
      size.disconnect();
      themeObserver.disconnect();
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", restart);
    };
  }, []);
  return (
    <div
      ref={element}
      className="da-hero-field da-character"
      data-character="mark"
      data-eye-style="glyph-cutout"
      data-body-style="unscored"
    >
      <button
        type="button"
        className="da-character-surface"
        aria-label="Wake the pixel sourdough"
        onClick={() => wake.current()}
      >
        <canvas ref={canvas} aria-hidden="true" />
      </button>
    </div>
  );
}
