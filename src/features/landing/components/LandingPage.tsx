import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { siteData, type Offer } from "../../../config/site-data";
import { useSubscriberBadges } from "../hooks/use-subscriber-badges";
import { OfferCard } from "./OfferCard";
import { OfferModal } from "./OfferModal";

export function LandingPage() {
  const { page } = siteData;
  const offers: Offer[] = siteData.offers;
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const subscriberBadges = useSubscriberBadges(offers);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">{page.hero.title}</h1>
        <p>{page.hero.description}</p>
      </section>

      <section className="menu-grid" aria-label={page.menu.ariaLabel}>
        <div className="menu-label">{page.menu.label}</div>
        {offers.map((offer) => (
          <OfferCard
            key={offer.title}
            offer={offer}
            subscriberBadge={subscriberBadges[offer.title]}
            onSelect={setSelectedOffer}
          />
        ))}
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div>
          <h2 id="manifesto-title">{page.manifesto.title}</h2>
        </div>
        <div className="manifesto-copy">
          {page.manifesto.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-cta" to="/about">
            {page.manifesto.cta.label}
          </Link>
        </div>
      </section>

      {selectedOffer ? <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} /> : null}
    </>
  );
}
