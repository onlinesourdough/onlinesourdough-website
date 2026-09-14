import { useEffect, useRef, useState } from "react";
import "./design-addition.css";

type Character = "mark" | "dough" | "starter";
const characters: Character[] = ["mark", "dough", "starter"];
const rows = [
  "0001111000",
  "0111111110",
  "1110110110",
  "1101101101",
  "1111111111",
  "1111111111",
  "0111111110",
];

/** Original sourdough characters. Brand silhouette comes from the owner's pixel boule. */
export function HeroField({ kind }: { kind?: Character }) {
  const query = new URLSearchParams(location.search);
  const active = Boolean(kind) || query.get("variant") === "hero";
  const requested = query.get("character") as Character;
  const character =
    kind || (characters.includes(requested) ? requested : "mark");
  const element = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wake = useRef<() => void>(() => {});
  const clock = useRef(1.5);
  const sound = useRef<AudioContext | null>(null);
  const audible = useRef(false);
  const lastNote = useRef(-Infinity);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundUnavailable, setSoundUnavailable] = useState(false);

  function boop(strength = 1, position = 0, immediate = false) {
    const ac = sound.current;
    if (
      !ac ||
      !audible.current ||
      ac.state !== "running" ||
      (!immediate && ac.currentTime - lastNote.current < 0.095)
    )
      return;
    lastNote.current = ac.currentTime;
    const oscillator = ac.createOscillator(),
      gain = ac.createGain();
    const now = ac.currentTime,
      pitch =
        (character === "starter" ? 640 : character === "dough" ? 360 : 480) *
        (1 + Math.max(-1, Math.min(1, position)) * 0.2);
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(pitch, now);
    oscillator.frequency.exponentialRampToValueAtTime(pitch * 0.7, now + 0.085);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09 * strength, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    oscillator.connect(gain).connect(ac.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.14);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }
  async function toggleSound() {
    if (soundOn) {
      audible.current = false;
      setSoundOn(false);
      return;
    }
    try {
      sound.current ||= new AudioContext();
      await sound.current.resume();
      audible.current = true;
      setSoundOn(true);
      setSoundUnavailable(false);
      boop(0.8, 0, true);
    } catch {
      setSoundUnavailable(true);
    }
  }
  useEffect(
    () => () => {
      audible.current = false;
      void sound.current?.close();
    },
    [],
  );

  useEffect(() => {
    const host = element.current,
      surface = canvas.current;
    if (!active || !host || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const capture = query.has("capture");
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
    function inside(x: number, y: number, time: number) {
      if (character === "mark") {
        const gx = (x + 110) / 22,
          gy = (y + 77) / 22,
          cx = Math.floor(gx),
          cy = Math.floor(gy);
        return (
          cy >= 0 &&
          cy < 7 &&
          cx >= 0 &&
          cx < 10 &&
          rows[cy][cx] === "1" &&
          gx - cx < 0.86 &&
          gy - cy < 0.86
        );
      }
      if (character === "starter")
        return (
          Math.abs(x) < 69 &&
          y > -40 + Math.sin(x * 0.047 + time) * 4 &&
          y < 76 &&
          (y < 64 || Math.abs(x) < 58)
        );
      const angle = Math.atan2(y / 78, x / 111);
      const edge =
        1 +
        0.025 * Math.sin(angle * 3 + time * 0.7) +
        0.025 * Math.cos(angle * 5 - time * 0.5);
      const ellipse = (x * x) / (111 * 111) + ((y - 4) * (y - 4)) / (78 * 78);
      if (ellipse > edge) return false;
      // Three small score cuts make the form read as a boule.
      return !(
        y < -19 &&
        y > -57 &&
        [-42, -6, 30].some((c) => Math.abs(x - c + (y + 38) * 0.58) < 3.2)
      );
    }
    function render(now: number) {
      if (!ctx || !surface || !host) return;
      const stopped = paused || reduced.matches || capture;
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
      const ink = dark ? "223,208,186" : "70,45,26";
      const crust = dark ? "211,159,108" : "154,96,49";
      // Warm, faint grounding shadow; no opaque panel behind the character.
      ctx.fillStyle = dark ? "#c6a47a0b" : "#6040260b";
      ctx.beginPath();
      ctx.ellipse(
        0,
        94,
        character === "starter" ? 72 : 97,
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
      const eyeY = character === "mark" ? 28 : character === "starter" ? 0 : 13;
      const eyeGap = character === "starter" ? 27 : 34;
      const eyeH = Math.max(1.4, 18 * Math.min(1, blink));
      let omittedEyeGlyphs = 0;
      for (const cell of cells) {
        if (!inside(cell.x, cell.y, t)) continue;
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
          character === "starter"
            ? Math.sin(cell.x * 0.04 + t) * 0.6
            : Math.sin(cell.x * 0.04 + t * 0.8) * 1.4;
        const drawX = cell.x + cell.dx;
        const drawY = cell.y + cell.dy + (stopped ? 0 : squash);
        const inEyeOpening = [-1, 1].some((sign) => {
          const ex = sign * eyeGap + gazeX;
          const ey = eyeY + gazeY + sign * gazeX * 0.12;
          return ((drawX - ex) / 13) ** 2 + ((drawY - ey) / eyeH) ** 2 < 1;
        });
        if (inEyeOpening) {
          omittedEyeGlyphs++;
          continue;
        }
        ctx.fillText(char, drawX, drawY);
      }
      if (character === "starter") {
        ctx.strokeStyle = `rgba(${ink},.28)`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(-62, -85);
        ctx.lineTo(-62, -65);
        ctx.quadraticCurveTo(-78, -56, -78, -43);
        ctx.lineTo(-78, 65);
        ctx.quadraticCurveTo(-78, 87, -58, 87);
        ctx.lineTo(58, 87);
        ctx.quadraticCurveTo(78, 87, 78, 65);
        ctx.lineTo(78, -43);
        ctx.quadraticCurveTo(78, -56, 62, -65);
        ctx.lineTo(62, -85);
        ctx.stroke();
        ctx.strokeRect(-66, -90, 132, 8);
        ctx.strokeStyle = `rgba(${crust},.38)`;
        ctx.beginPath();
        ctx.moveTo(-79, 43);
        ctx.lineTo(79, 43);
        ctx.stroke();
        for (let b = 0; b < 11; b++) {
          const phase = (t * 0.11 + b * 0.17) % 1,
            x = Math.sin(b * 2.1) * 52,
            y = 55 - phase * 118,
            r = 1.6 + (b % 3) * 1.4;
          ctx.strokeStyle = `rgba(${crust},${0.18 + (1 - phase) * 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
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
      if (hover) boop(0.75, px / 130);
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
      boop(1, px === 1000 ? 0 : px / 130, true);
      if (paused || reduced.matches) return;
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
    size.observe(host);
    observer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(raf);
      size.disconnect();
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", restart);
    };
  }, [active, paused, character]);
  if (!active) return null;
  return (
    <div
      ref={element}
      className="da-hero-field da-character"
      data-character={character}
      data-eye-style="glyph-cutout"
    >
      <button
        type="button"
        className="da-character-surface"
        aria-label={`Wake the ${character === "mark" ? "pixel sourdough" : character === "dough" ? "sourdough character" : "bubbling starter"}`}
        onClick={() => wake.current()}
      >
        <canvas ref={canvas} aria-hidden="true" />
      </button>
      <div className="da-character-controls">
        <button
          type="button"
          aria-label={
            paused ? "Play character animation" : "Pause character animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          type="button"
          aria-pressed={soundOn}
          disabled={soundUnavailable}
          onClick={() => void toggleSound()}
        >
          {soundUnavailable
            ? "Sound unavailable"
            : soundOn
              ? "Sound on"
              : "Enable sound"}
        </button>
      </div>
    </div>
  );
}

export function HeroLab() {
  const concepts = [
    {
      kind: "mark" as Character,
      title: "01 · The living mark",
      body: "Your pixel boule comes to life. It breathes, blinks, and reacts to your cursor.",
    },
    {
      kind: "dough" as Character,
      title: "02 · A little dough",
      body: "A softer sourdough character. Curious eyes, a gentle wobble, and a springy response.",
    },
    {
      kind: "starter" as Character,
      title: "03 · The starter",
      body: "A small living culture. Bubbles rise through the jar while the eyes follow you.",
    },
  ];
  return (
    <section className="da-hero-lab">
      <div className="da-lab-intro">
        <h1>
          A little life.
          <br />
          Still onlinesourdough.
        </h1>
        <p>
          Three character studies. Move through the figures or give them a
          click. Choose “Enable sound” to hear their response.
        </p>
      </div>
      <div className="da-character-studies">
        {concepts.map((c) => (
          <article key={c.kind}>
            <HeroField kind={c.kind} />
            <h2>{c.title}</h2>
            <p>{c.body}</p>
            <div className="da-study-links">
              <a href={`/?variant=hero&character=${c.kind}`}>Main website ↗</a>
              <a
                href={`http://localhost:53672/?variant=hero&character=${c.kind}`}
              >
                Resources ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="da-lab-footnote">
        In these studies, the main header keeps the wordmark and gives the
        character its own space in the hero.{" "}
        <a href="/?variant=flow">Compare the version without a character ↗</a>
      </p>
    </section>
  );
}
