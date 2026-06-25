import { type Offer } from "../../../config/site-data";
import { SourdoughIcon } from "./SourdoughIcon";

type OfferCardProps = {
  offer: Offer;
  subscriberBadge?: string;
  onSelect: (offer: Offer) => void;
};

export function OfferCard({ offer, subscriberBadge, onSelect }: OfferCardProps) {
  const content = (
    <>
      <SourdoughIcon type={offer.icon} />
      <span className="offer-title">{offer.title}</span>
      <span className="offer-description">{offer.description}</span>
      <span className="offer-cta">
        <span>{offer.cta}</span>
        {subscriberBadge ? <span className="offer-cta-badge">{subscriberBadge}</span> : null}
        {offer.icon === "proofing" ? <img className="offer-cta-slack" src="/icons/slack-mark.svg" alt="" /> : null}
      </span>
    </>
  );

  if (offer.external) {
    return (
      <a className="offer-card offer-card-external" href={offer.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className="offer-card" type="button" onClick={() => onSelect(offer)}>
      {content}
    </button>
  );
}
