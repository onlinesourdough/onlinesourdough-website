import { type Offer } from "../../../config/site-data";
import { getExternalLinkAttributes } from "../../../components/link-attributes";

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <a className="offer-card" href={offer.href} {...getExternalLinkAttributes(offer.href)}>
      <span className="book-stage">
        <span className="book">
          <span className="book-head">
            <span className="book-number">{offer.number}</span>
            <span>{offer.status}</span>
          </span>
          <span className="book-title">{offer.title}</span>
          <span className="offer-description">{offer.description}</span>
          <span className="book-rule" />
          <span className="book-image">
            <img src={offer.image.src} alt={offer.image.alt} />
          </span>
        </span>
        <span className="book-sleeve" aria-hidden="true" />
      </span>
      <span className="offer-cta">
        {offer.cta}<span className="offer-arrow" aria-hidden="true">→</span>
      </span>
    </a>
  );
}
