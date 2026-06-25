import { useEffect } from "react";
import { siteData, type Offer } from "../../../config/site-data";
import { SourdoughIcon } from "./SourdoughIcon";

type OfferModalProps = {
  offer: Offer;
  onClose: () => void;
};

export function OfferModal({ offer, onClose }: OfferModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-backdrop" type="button" aria-label={siteData.page.modal.closeLabel} onClick={onClose} />
      <article className="modal-panel">
        <button className="modal-close" type="button" aria-label={siteData.page.modal.closeLabel} onClick={onClose}>
          x
        </button>
        <div className="modal-label">
          <SourdoughIcon type={offer.icon} compact />
          <span>{offer.status}</span>
        </div>
        <h2 id="modal-title">{offer.title}</h2>
        <p>{offer.details}</p>
        <section>
          <h3>{siteData.page.modal.bestForLabel}</h3>
          <p>{offer.bestFor}</p>
        </section>
        <ul>
          {offer.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href={offer.href} target="_blank" rel="noopener noreferrer">
          {offer.cta}
        </a>
      </article>
    </div>
  );
}
