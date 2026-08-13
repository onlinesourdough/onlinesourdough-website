import { Link } from "@tanstack/react-router";
import { siteData } from "../../../config/site-data";
import { OfferCard } from "./OfferCard";

export function LandingPage() {
  const { page, offers } = siteData;
  const primaryOffers = offers.slice(0, 2);
  const secondaryOffers = offers.slice(2);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">{page.hero.title}</h1>
        <div className="hero-copy">
          <p>{page.hero.description}</p>
        </div>
      </section>

      <section className="menu-grid" id="menu" aria-label={page.menu.ariaLabel}>
        <div className="menu-stage menu-stage-primary">
          <div className="menu-label">{page.menu.label}</div>
          <div className="menu-row menu-row-primary">
            {primaryOffers.map((offer) => (
              <OfferCard key={offer.number} offer={offer} />
            ))}
          </div>
        </div>

        <div className="menu-stage menu-stage-secondary">
          <div className="menu-row menu-row-secondary">
            {secondaryOffers.map((offer) => (
              <OfferCard key={offer.number} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto" id="about" aria-labelledby="manifesto-title">
        <h2 id="manifesto-title">{page.manifesto.title}</h2>
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
