import { useEffect, useRef, useState } from "react";
import { siteData } from "../../config/site-data";
import { getExternalLinkAttributes } from "../link-attributes";

type OfferSwitcherProps = {
  currentHref: string;
};

export function OfferSwitcher({ currentHref }: OfferSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !isOpen;

    const syncBodyLock = () => {
      document.body.classList.toggle("offers-open", isOpen && window.innerWidth <= 620);
    };

    syncBodyLock();
    window.addEventListener("resize", syncBodyLock);

    return () => {
      window.removeEventListener("resize", syncBodyLock);
      document.body.classList.remove("offers-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeyDown);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        className="studio-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="studio-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {siteData.navigation.offers}
      </button>
      <div ref={menuRef} className="studio-menu" id="studio-menu" aria-hidden={!isOpen}>
        <div className="studio-paths">
          {siteData.studioOffers.map((offer) => {
            const href = offer.current ? currentHref : offer.href;

            return (
              <a
                className={`studio-path${offer.current ? " current" : ""}`}
                href={href}
                {...getExternalLinkAttributes(href)}
                aria-current={offer.current ? "page" : undefined}
                key={offer.title}
                onClick={() => setIsOpen(false)}
              >
                <span className="path-number">{offer.label}</span>
                <strong>{offer.title}</strong>
                <small>{offer.description}</small>
                <span className="path-action">{offer.action}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
