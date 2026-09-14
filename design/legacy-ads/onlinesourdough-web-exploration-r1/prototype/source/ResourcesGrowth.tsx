import { useEffect, useId, useRef, useState } from "react";
import "./design-refinement.css";

const capabilities = [
  { name: "ChatGPT", stage: 0 },
  { name: "Skills", stage: 0.5 },
  { name: "MCPs", stage: 1 },
  { name: "Workflows", stage: 1.6 },
  { name: "Agents", stage: 2.2 },
  { name: "Background agents", stage: 2.7 },
  { name: "Orchestration", stage: 3.3 },
  { name: "AIOS", stage: 4 },
];
const stages = [
  "AI assistant",
  "AI coding",
  "Agent workflows",
  "Orchestration",
  "Business freedom",
];
const locations = [26, 260, 500, 734, 970];

export function ResourcesGrowth() {
  const capture = new URLSearchParams(location.search).has("capture");
  const [selected, setSelected] = useState(capture ? 7 : 0);
  const stage = capabilities[selected].stage;
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shape = useRef(stage / 4);
  const line = useRef<SVGPathElement>(null);
  const area = useRef<SVGPathElement>(null);
  const points = useRef<(SVGRectElement | null)[]>([]);
  const fillId = useId();
  const cancelPending = () => {
    if (pending.current) clearTimeout(pending.current);
    pending.current = null;
  };
  const choose = (index: number) => {
    cancelPending();
    setSelected(index);
  };
  const hover = (index: number) => {
    cancelPending();
    pending.current = setTimeout(() => {
      pending.current = null;
      setSelected(index);
    }, 180);
  };
  useEffect(() => cancelPending, []);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const target = stage / 4;
    let raf = 0,
      last = 0;
    const draw = () => {
      const p = shape.current;
      const y = (x: number) =>
        306 - (28 + 244 * p) * Math.pow((x - 26) / 944, 2.8);
      const path = Array.from({ length: 119 }, (_, i) => {
        const x = 26 + i * 8;
        return `${i ? "L" : "M"}${x},${y(x)}`;
      }).join(" ");
      line.current?.setAttribute("d", path);
      area.current?.setAttribute("d", `${path} L970,326 L26,326 Z`);
      locations.forEach((x, i) => {
        points.current[i]?.setAttribute("x", String(x - 4));
        points.current[i]?.setAttribute("y", String(y(x) - 4));
      });
    };
    const tick = (now: number) => {
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.04);
      last = now;
      shape.current += (target - shape.current) * Math.min(1, dt * 6);
      if (Math.abs(target - shape.current) < 0.0005) shape.current = target;
      draw();
      if (shape.current !== target) raf = requestAnimationFrame(tick);
    };
    const animate = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduced.matches || capture) {
        shape.current = target;
        draw();
      } else raf = requestAnimationFrame(tick);
    };
    animate();
    reduced.addEventListener("change", animate);
    return () => {
      cancelAnimationFrame(raf);
      reduced.removeEventListener("change", animate);
    };
  }, [stage, capture]);

  return (
    <section
      className="da-resource-method"
      aria-labelledby="da-growth-title"
      data-selected={capabilities[selected].name}
    >
      <div className="da-resource-method-copy">
        <h2 id="da-growth-title">
          From one useful change
          <br />
          to more business freedom.
        </h2>
        <p>
          Use the method and resources to solve one real business problem. Build
          on what works, with more of the routine handled by systems you
          understand and own.
        </p>
      </div>
      <div className="da-resource-explorer">
        <div
          className="da-resource-fields"
          role="group"
          aria-label="Explore ways of working with AI"
        >
          {capabilities.map((c, index) => (
            <button
              key={c.name}
              className={`${selected >= index ? "is-reached" : ""} ${selected === index ? "is-selected" : ""}`}
              aria-pressed={selected === index}
              aria-label={`Explore ${c.name}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") hover(index);
              }}
              onPointerLeave={cancelPending}
              onFocus={() => choose(index)}
              onClick={() => choose(index)}
            >
              <span className="da-resource-check" aria-hidden="true">
                {selected >= index ? "✓" : "+"}
              </span>
              {c.name}
            </button>
          ))}
        </div>
        <svg
          className="da-resource-curve"
          viewBox="0 0 1000 345"
          role="img"
          aria-label={`Exploring ${capabilities[selected].name}: ${stages[Math.floor(stage)]}. Illustrative progression.`}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") hover(7);
          }}
          onPointerLeave={cancelPending}
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity=".16" />
              <stop offset="100%" stopColor="currentColor" stopOpacity=".025" />
            </linearGradient>
          </defs>
          <path d="M26,326 H970" className="da-resource-baseline" />
          {locations.map((x) => (
            <path
              key={x}
              d={`M${x},326 v-8`}
              className="da-resource-baseline"
            />
          ))}
          <path ref={area} fill={`url(#${fillId})`} />
          <path
            ref={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {stages.map((label, i) => (
            <rect
              key={label}
              ref={(e) => {
                points.current[i] = e;
              }}
              width="8"
              height="8"
              fill="currentColor"
              opacity={i <= stage ? 1 : 0.28}
            />
          ))}
        </svg>
        <ol
          className="da-resource-stage-labels"
          aria-label="Progression stages"
        >
          {stages.map((label, i) => (
            <li key={label} className={i <= stage ? "is-reached" : ""}>
              <span aria-hidden="true">0{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <span className="sr-only" aria-live="polite">
          {capabilities[selected].name}: {stages[Math.floor(stage)]}
        </span>
      </div>
    </section>
  );
}
