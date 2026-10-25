import { LivingMark } from "./LivingMark";
import "./bread-tile-preview.css";

const variants = [
  { divisions: 3, title: "Mellem", note: "En finere overflade" },
  { divisions: 2, title: "Store", note: "Det aktuelle forslag" },
  { divisions: 1, title: "Ekstra store", note: "Færrest og tydeligst" },
] as const;

/** A local comparison canvas; the production page never renders this view. */
export function BreadTilePreview() {
  return (
    <div className="bread-preview">
      <header>
        <p className="bread-preview-eyebrow">Lokalt design-preview</p>
        <h1>Samme brød. Tre tile-størrelser.</h1>
        <p>Den oprindelige form, brune nuancer og bevægelse. Før musen over brødet, eller klik for at vække det.</p>
      </header>
      <div className="bread-preview-grid">
        {variants.map(({ divisions, title, note }) => (
          <section className="bread-preview-variant" key={divisions} aria-labelledby={`bread-${divisions}`}>
            <h2 id={`bread-${divisions}`}>{title}</h2>
            <p>{note} · {59 * divisions ** 2} tiles</p>
            <LivingMark tilesPerBlock={divisions} />
            <a href={`/?breadSize=${divisions}#about`}>Se på siden <span aria-hidden="true">↗</span></a>
          </section>
        ))}
      </div>
      <p className="bread-preview-footnote">Kun preview — intet er publiceret.</p>
    </div>
  );
}
