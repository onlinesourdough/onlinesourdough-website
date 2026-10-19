import { Link } from "@tanstack/react-router";
import { siteData } from "../../../config/site-data";
import { OfferCard } from "./OfferCard";
import { LivingMark } from "./LivingMark";

export function LandingPage() {
  const { page, offers } = siteData;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">{page.hero.title}</h1>
        <LivingMark />
        <div className="hero-copy">
          <p>{page.hero.description}</p>
        </div>
      </section>

      <section className="menu-grid" id="menu" aria-label={page.menu.ariaLabel}>
        {offers.map((offer) => (
          <OfferCard key={offer.number} offer={offer} />
        ))}
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
