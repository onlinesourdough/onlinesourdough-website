import { FounderSignature } from "../../../FounderSignature";
import { HeroField, HeroLab } from "../../../HeroField";
import { DesignAddition } from "../../../DesignAddition";
import { Link } from "@tanstack/react-router";
import { siteData } from "../../../config/site-data";
import { OfferCard } from "./OfferCard";

export function LandingPage() {
  const { page, offers } = siteData;
  const merged = new URLSearchParams(location.search).get("variant") === "flow";
  const primaryOffers = offers.slice(0, 2);
  const secondaryOffers = offers.slice(2);

  if (new URLSearchParams(location.search).get("variant") === "hero-lab")
    return <HeroLab />;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroField />
        <h1 id="hero-title">{page.hero.title}</h1>
        <div className="hero-copy">
          <p>{page.hero.description}</p>
        </div>
        {["flow", "hero"].includes(
          new URLSearchParams(location.search).get("variant") || "",
        ) && <FounderSignature />}
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

      <section
        className={`manifesto ${merged ? "da-merged-method" : ""}`}
        id="about"
        aria-labelledby="manifesto-title"
      >
        <h2 id="manifesto-title">{page.manifesto.title}</h2>
        <div className="manifesto-copy">
          {(merged
            ? page.manifesto.paragraphs.slice(0, 2)
            : page.manifesto.paragraphs
          ).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {!merged && (
            <Link className="manifesto-link" to="/about">
              {page.manifesto.cta} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        {merged && (
          <>
            <DesignAddition site="main" />
            <Link className="manifesto-link da-method-link" to="/about">
              {page.manifesto.cta} <span aria-hidden="true">→</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}
