import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Offer } from "../../../config/site-data";
import "./offer-scene.css";

function Codex({ working = false }: { working?: boolean }) {
  return (
    <svg width="96" height="104" viewBox="0 0 192 208" overflow="hidden">
      <image
        className={working ? "scene-codex-work" : "scene-codex-idle"}
        href="/assets/agents/codex-spritesheet-v4.webp"
        width="1536"
        height="1872"
        y={working ? -1456 : 0}
      />
    </svg>
  );
}

function Starter() {
  return (
    <g shapeRendering="crispEdges">
      <path fill="#9a643a" d="M5 0H43V7H48V57H43V63H5V57H0V7H5Z" />
      <path fill="#d9b484" d="M5 9H43V54H38V58H10V54H5Z" />
      <path fill="#f5dfae" d="M6 29H14V25H25V28H43V54H38V58H10V54H6Z" />
      <path fill="#fff0cd" d="M5 0H43V7H5Z" />
      <path fill="#f8e6bf" opacity=".8" d="M8 11H12V26H8Z" />
      <g fill="#ad7948" className="starter-bubbles">
        <rect x="14" y="39" width="3" height="3" />
        <rect x="29" y="44" width="4" height="4" />
        <rect x="24" y="32" width="3" height="3" />
        <rect x="18" y="50" width="3" height="3" />
      </g>
      <path fill="#e7c794" d="M0 19H48V22H0Z" />
    </g>
  );
}

function Claude({ task = "sort" }: { task?: "sort" | "stir" | "check" }) {
  return (
    <g fill="#D97757" shapeRendering="crispEdges">
      {/* Same Lobe Icons silhouette and segmented animation as the Factory. */}
      <path d="M3 5H20.998V17.079H3ZM0 10.949H3V14.051H0Z" />
      <g className="scene-claude-arm">
        <path d="M20.998 10.949H24V14.051H20.998Z" />
        {task === "stir" && (
          <path d="M24 11L31 0" stroke="#705033" strokeWidth="1.4" />
        )}
        {task === "sort" && (
          <rect
            x="23"
            y="8"
            width="5"
            height="5"
            fill="#f5aa70"
            stroke="#87451f"
            strokeWidth=".6"
          />
        )}
        {task === "check" && (
          <path
            d="M24 11L28 7M27 5V8H30V5"
            fill="none"
            stroke="#705033"
            strokeWidth="1.4"
          />
        )}
      </g>
      {[4.487, 7.488, 15, 18].map((x) => (
        <rect key={x} x={x} y="17.079" width="1.5" height="2.921" />
      ))}
      <g fill="#3b251c" className="scene-claude-eyes">
        <rect x="6" y="8.102" width="1.488" height="2.847" />
        <rect x="16.51" y="8.102" width="1.49" height="2.847" />
      </g>
    </g>
  );
}

/** The same square proportions and orange levels as Gustav Online's field. */
function DataTiles({
  rows = 2,
  offset = 0,
}: {
  rows?: number;
  offset?: number;
}) {
  const colors = ["#f8d3b2", "#f5aa70", "#ee7f3c", "#d4621f"];
  return (
    <g transform="matrix(1 .06 -.4 .5 0 0)">
      {Array.from({ length: rows * 6 }, (_, i) => (
        <g
          key={i}
          transform={`translate(${(i % 6) * 31.2} ${Math.floor(i / 6) * 31.2})`}
        >
          <g className={`desk-tile desk-tile-${i % 4}`}>
            <rect x="1" y="4" width="24" height="24" rx="1.5" fill="#9a592b" />
            <rect
              width="24"
              height="24"
              rx="1.5"
              fill={colors[(i + offset) % 4]}
            />
            <path
              d="M2 22V2H22"
              fill="none"
              stroke="#fff1dd"
              strokeOpacity=".6"
            />
          </g>
        </g>
      ))}
    </g>
  );
}

export function OfferScene({ offer }: { offer: Offer }) {
  const element = useRef<SVGSVGElement>(null);
  const [running, setRunning] = useState(false);
  const eager = offer.number === "01" || offer.number === "02";
  const [loaded, setLoaded] = useState(false);
  const id = useId();
  // Sample once per visit. Repaints and visibility changes retain the same story.
  const [variation] = useState(() => ({
    codex: -Math.random() * 11,
    claude: -Math.random() * 17,
    tiles: -Math.random() * 19,
    duration: 15 + Math.random() * 5,
    palette: Math.floor(Math.random() * 4),
    peek: -Math.random() * 30,
    peekDuration: 28 + Math.random() * 8,
  }));
  useEffect(() => {
    const node = element.current;
    if (!node || eager) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoaded(true);
        observer.disconnect();
      },
      { rootMargin: "320px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    let visible = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setRunning(visible && !document.hidden && !reduced.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <svg
      ref={element}
      className={`offer-scene offer-scene-${offer.number}`}
      viewBox="0 0 640 640"
      role="img"
      aria-label={offer.image.alt}
      data-running={running}
      style={
        {
          "--codex-delay": `${variation.codex}s`,
          "--claude-delay": `${variation.claude}s`,
          "--tile-delay": `${variation.tiles}s`,
          "--tile-duration": `${variation.duration}s`,
          "--peek-offset": `${variation.peek}s`,
          "--peek-duration": `${variation.peekDuration}s`,
        } as CSSProperties
      }
    >
      <defs>
        <clipPath id={`${id}-screen`}>
          <rect x="76" y="289" width="90" height="60" rx="1" />
        </clipPath>
        <clipPath id={`${id}-oven`}>
          <path d="M482 366V348C482 326 496 310 517 310S552 327 552 348V366Z" />
        </clipPath>
        <clipPath id={`${id}-camera`}>
          <path d="M432 268H578V402H432Z" />
        </clipPath>
        <clipPath id={`${id}-jar`}>
          <path d="M48 398H152V506H48Z" />
        </clipPath>
        <clipPath id={`${id}-laptop`}>
          <path d="M256 234H384V346H256Z" />
        </clipPath>
        <clipPath id={`${id}-camera-peek`}>
          <path d="M432 160H578V305H432Z" />
        </clipPath>
        <clipPath id={`${id}-laptop-peek`}>
          <path d="M256 140H384V288H256Z" />
        </clipPath>
        <clipPath id={`${id}-starter-peek`}>
          <path d="M130 200H246V306H130Z" />
        </clipPath>
      </defs>
      {offer.number === "02" && (
        <>
          <g transform="translate(414 22) scale(1.2)">
            <g className="scene-peek peek-codex resource-peek">
              <Codex />
            </g>
          </g>
          <g transform="translate(164 48)">
            <g className="scene-peek peek-claude resource-claude-peek">
              <g transform="scale(4.4)">
                <Claude task="check" />
              </g>
            </g>
          </g>
        </>
      )}
      {offer.number === "04" && (
        <g transform="translate(290 210)">
          <g className="scene-peek peek-claude bake-claude-peek">
            <g transform="scale(2.8)">
              <Claude task="check" />
            </g>
          </g>
        </g>
      )}
      <image
        href={eager || loaded ? offer.image.src : undefined}
        width="640"
        height="640"
      />
      {offer.number === "01" && (
        <>
          <g transform="translate(226 492)">
            <DataTiles offset={variation.palette} />
          </g>
          <g transform="translate(69 435)">
            <g className="scene-peek peek-claude content-claude-peek">
              <g transform="scale(3)">
                <Claude />
              </g>
            </g>
          </g>
          <g clipPath={`url(#${id}-camera-peek)`}>
            <g transform="translate(470 290)">
              <g className="scene-peek peek-codex content-codex-peek">
                <g transform="scale(.9)">
                  <Codex working />
                </g>
              </g>
            </g>
          </g>
          <image
            href={offer.image.src}
            width="640"
            height="640"
            clipPath={`url(#${id}-camera)`}
          />
          <image
            href={offer.image.src}
            width="640"
            height="640"
            clipPath={`url(#${id}-jar)`}
          />
        </>
      )}
      {offer.number === "03" && (
        <>
          <g clipPath={`url(#${id}-starter-peek)`}>
            <g transform="translate(150 298)">
              <g className="scene-peek peek-claude fermentary-claude-peek">
                <g transform="scale(2.6)">
                  <Claude task="stir" />
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(150 282) scale(1.15)">
            <Starter />
          </g>
          <g clipPath={`url(#${id}-laptop-peek)`}>
            <g transform="translate(280 232)">
              <g className="scene-peek peek-codex fermentary-codex-peek">
                <g transform="scale(.8)">
                  <Codex working />
                </g>
              </g>
            </g>
          </g>
          <image
            href={loaded ? offer.image.src : undefined}
            width="640"
            height="640"
            clipPath={`url(#${id}-laptop)`}
          />
          <g transform="translate(220 526)">
            <DataTiles rows={1} offset={variation.palette} />
          </g>
        </>
      )}
      {offer.number === "04" && (
        <>
          <g clipPath={`url(#${id}-oven)`}>
            <ellipse
              className="oven-glow"
              cx="517"
              cy="343"
              rx="50"
              ry="54"
              fill="#ffbb46"
            />
            <path
              className="oven-flame"
              d="M486 366V351H491V339H496V350H502V356H508V339H513V326H519V348H524V354H530V341H535V357H547V366Z"
              fill="#ffd974"
            />
          </g>
          <g clipPath={`url(#${id}-screen)`}>
            <rect x="76" y="289" width="90" height="60" fill="#202c3d" />
            <g transform="translate(91 287)">
              <g className="scene-peek peek-codex bake-codex-peek">
                <g transform="scale(.62)">
                  <Codex working />
                </g>
              </g>
            </g>
            <path d="M81 339H94M81 333H90" stroke="#f5aa70" strokeWidth="2" />
          </g>
        </>
      )}
    </svg>
  );
}
