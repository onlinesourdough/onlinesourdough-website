import { Link } from "@tanstack/react-router";
import { heroVariations, siteData } from "../../../config/site-data";
import { localReview } from "../../../family/preview";
import { OfferCard } from "./OfferCard";
import { LivingMark } from "./LivingMark";
import { SourdoughScene } from "./SourdoughScene";
import { BreadTilePreview } from "./BreadTilePreview";
import { BreadSourcePreview } from "./BreadSourcePreview";
import { parseBreadContext } from "./bread-context";

export function LandingPage() {
  const breadPreview = import.meta.env.DEV;
  const query = new URLSearchParams(window.location.search);
  if (breadPreview && query.get("bread") === "compare") return <BreadTilePreview />;
  if (breadPreview && query.get("bread") === "sources") return <BreadSourcePreview />;
  const sourceVariant = breadPreview ? parseBreadContext(query.get("breadSource")) : "records";
  const requestedSize = breadPreview ? Number(query.get("breadSize")) : 2;
  const tilesPerBlock = requestedSize === 1 || requestedSize === 3 ? requestedSize : 2;
  const { page, offers } = siteData;
  const variation = localReview
    ? Number(new URLSearchParams(window.location.search).get("copy"))
    : 0;
  const hero = heroVariations[variation - 1] ?? page.hero;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">{hero.title}</h1>
        <div className="hero-copy">
          <p>{hero.description}</p>
        </div>
      </section>

      <section className="menu-grid" id="menu" aria-label={page.menu.ariaLabel}>
        {offers.map((offer) => (
          <OfferCard key={offer.number} offer={offer} />
        ))}
      </section>

      <section
        className="manifesto"
        id="about"
        aria-labelledby="manifesto-title"
      >
        <div className="manifesto-heading">
          <h2 id="manifesto-title">{page.manifesto.title}</h2>
          {breadPreview && query.has("breadSize") ? <LivingMark tilesPerBlock={tilesPerBlock} /> : <SourdoughScene sourceVariant={sourceVariant} />}
          {breadPreview && query.has("breadSize") && <a className="bread-preview-back" href="/?bread=compare">Sammenlign tile-størrelser ↗</a>}
        </div>
        <div className="manifesto-copy">
          {page.manifesto.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="manifesto-link" to="/about">
            {page.manifesto.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
