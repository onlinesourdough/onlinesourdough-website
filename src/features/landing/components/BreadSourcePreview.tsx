import { SourdoughScene } from "./SourdoughScene";
import { breadContextVariants } from "./bread-context";
import "./bread-tile-preview.css";

/** Local comparison only; every option uses the real page's loaf and animation. */
export function BreadSourcePreview() {
  return (
    <div className="bread-preview bread-sources-preview">
      <header>
        <p className="bread-preview-eyebrow">Lokalt design-preview</p>
        <h1>Tre tilfældige opstillinger.</h1>
        <p>Notion står ved siden af brødet med en fast forbindelse. Hjælperne samler de løse tiles fra filer, data og kontekst omkring og under brødet. Placeringerne varierer fra gang til gang.</p>
      </header>
      <div className="bread-preview-grid">
        {breadContextVariants.map((variant) => (
          <section className="bread-preview-variant" key={variant.id} aria-labelledby={`source-${variant.id}`}>
            <h2 id={`source-${variant.id}`}>{variant.title}</h2>
            <SourdoughScene sourceVariant={variant.id} />
            <a href={`/?breadSource=${variant.id}#about`}>Se på hele siden <span aria-hidden="true">→</span></a>
          </section>
        ))}
      </div>
      <p className="bread-preview-footnote">Kun lokale variationer. Intet er publiceret.</p>
    </div>
  );
}
