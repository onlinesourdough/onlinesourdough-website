import { useEffect, useRef, useState } from "react";
import "./design-addition.css";
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
const locations = [125, 330, 530, 725, 950];
export function ResourcesGrowth() {
  const initial = new URLSearchParams(location.search).has("capture")
    ? capabilities.length - 1
    : 0;
  const [selected, setSelected] = useState(initial);
  const stage = capabilities[selected].stage;
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const choose = (index: number) => {
    if (pending.current) clearTimeout(pending.current);
    setSelected(index);
  };
  useEffect(
    () => () => {
      if (pending.current) clearTimeout(pending.current);
    },
    [],
  );
  const shape = useRef(stage / 4);
  const line = useRef<SVGPathElement>(null),
    area = useRef<SVGPathElement>(null);
  const points = useRef<(SVGGElement | null)[]>([]);
  const chart = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    const target = stage / 4;
    const draw = () => {
      const p = shape.current;
      const y = (x: number) =>
        315 - (30 + 250 * p) * Math.pow((x - 20) / 940, 1.4 + 1.3 * p);
      const path = Array.from({ length: 119 }, (_, i) => {
        const x = 20 + i * 8;
        return `${i ? "L" : "M"}${x} ${y(x)}`;
      }).join(" ");
      line.current?.setAttribute("d", path);
      line.current?.setAttribute("opacity", String(0.4 + p * 0.5));
      area.current?.setAttribute("d", path + " L964 330 L20 330 Z");
      area.current?.setAttribute("opacity", String(0.06 + p * 0.12));
      locations.forEach((x, i) => {
        points.current[i]?.setAttribute("transform", `translate(${x},${y(x)})`);
        points.current[i]?.setAttribute("opacity", i <= stage ? "1" : "0");
      });
    };
    const tick = (now: number) => {
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.04);
      last = now;
      shape.current += (target - shape.current) * Math.min(1, dt * 5);
      draw();
      if (Math.abs(target - shape.current) > 0.0008)
        raf = requestAnimationFrame(tick);
    };
    if (reduced.matches) {
      shape.current = target;
      draw();
    } else {
      draw();
      raf = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(raf);
  }, [stage]);
  return (
    <section
      className="da-section da-growth da-capability-growth"
      aria-labelledby="da-growth-title"
    >
      <div className="da-heading-row">
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
      <div className="da-growth-explorer">
        <div
          className="da-capability-fields"
          aria-label="Explore ways of working with AI"
        >
          {capabilities.map((c, index) => (
            <button
              key={c.name}
              className={selected >= index ? "da-capability-active" : ""}
              aria-pressed={selected >= index}
              aria-label={`Explore ${c.name}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") {
                  if (pending.current) clearTimeout(pending.current);
                  pending.current = setTimeout(() => setSelected(index), 220);
                }
              }}
              onPointerLeave={() => {
                if (pending.current) clearTimeout(pending.current);
              }}
              onFocus={() => choose(index)}
              onClick={() => choose(index)}
            >
              <span className="da-capability-check" aria-hidden="true">
                {selected >= index ? "✓" : "+"}
              </span>
              {c.name}
            </button>
          ))}
        </div>
        <svg
          ref={chart}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") {
              if (pending.current) clearTimeout(pending.current);
              pending.current = setTimeout(
                () => setSelected(capabilities.length - 1),
                220,
              );
            }
          }}
          onPointerLeave={() => {
            if (pending.current) clearTimeout(pending.current);
          }}
          className="da-capability-curve"
          viewBox="0 0 1000 375"
          role="img"
          aria-label={`Exploring ${stages[Math.floor(stage)]}. Illustrative capability progression, not measured growth.`}
        >
          <path ref={area} fill="currentColor" />
          <path
            ref={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          {stages.map((label, i) => (
            <g
              key={label}
              ref={(e) => {
                points.current[i] = e;
              }}
              className="da-growth-point"
            >
              <rect
                width="7"
                height="7"
                x="-3.5"
                y="-3.5"
                fill="currentColor"
              />
              <text
                className="da-growth-stage"
                x={i === 4 ? -12 : 12}
                y={i === 4 ? -12 : 23}
                textAnchor={i === 4 ? "end" : "start"}
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
        <div className="da-mobile-growth-label" aria-live="polite">
          {stages[Math.floor(stage)]}
        </div>
      </div>
    </section>
  );
}
