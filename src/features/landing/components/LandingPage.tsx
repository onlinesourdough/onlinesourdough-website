import { Link } from "@tanstack/react-router";
import { heroVariations, siteData } from "../../../config/site-data";
import { localReview } from "../../../family/preview";
import { OfferCard } from "./OfferCard";
import { LivingMark } from "./LivingMark";

export function LandingPage() {
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
          <LivingMark />
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
