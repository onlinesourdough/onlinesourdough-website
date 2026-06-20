import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { siteData, type Offer } from "./site-data";
import "./styles.css";

function App() {
  const { brand, footer, page, seo, themeStorageKey } = siteData;
  const offers: Offer[] = siteData.offers;
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const subscriberBadges = useSubscriberBadges(offers);
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme(themeStorageKey));
  const isAboutPage = currentPath === "/about";

  function navigateTo(path: string) {
    window.history.pushState({}, "", path);
    setCurrentPath(normalizePath(path));
    window.scrollTo({ top: 0 });
  }

  function handleInternalLink(event: React.MouseEvent<HTMLAnchorElement>, path: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo(path);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme, themeStorageKey]);

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(getCurrentPath());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    setSelectedOffer(null);
  }, [currentPath]);

  useEffect(() => {
    const pageTitle = isAboutPage ? `About onlinesourdough | ${brand}` : seo.title;
    const pageDescription = isAboutPage ? page.about.description : seo.description;
    const pageUrl = `${seo.siteUrl}${isAboutPage ? "/about/" : "/"}`;

    document.title = pageTitle;
    setMetaContent("description", pageDescription);
    setMetaContent("theme-color", seo.themeColor);
    setMetaContent("twitter:card", "summary");
    setMetaContent("twitter:title", pageTitle);
    setMetaContent("twitter:description", pageDescription);
    setMetaProperty("og:title", isAboutPage ? pageTitle : seo.ogTitle);
    setMetaProperty("og:description", isAboutPage ? pageDescription : seo.ogDescription);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:url", pageUrl);
    setCanonicalUrl(pageUrl);
  }, [brand, isAboutPage, page.about.description, seo]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-mark" href="/" aria-label={`${brand} home`} onClick={(event) => handleInternalLink(event, "/")}>
          <span className="brand-loaf" />
        </a>
        <a className="brand-name" href="/" onClick={(event) => handleInternalLink(event, "/")}>
          {brand}
        </a>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle light and dark mode"
          >
            <span className="theme-toggle-icon" />
          </button>
        </div>
      </header>

      <main id="top" className={`main-panel ${isAboutPage ? "main-panel-about" : ""}`}>
        {isAboutPage ? (
          <AboutPage onNavigateHome={(event) => handleInternalLink(event, "/")} />
        ) : (
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
                <a className="text-cta" href={page.manifesto.cta.href} target="_blank" rel="noopener noreferrer">
                  {page.manifesto.cta.label}
                </a>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <span>{footer.copyright}</span>
        </div>
        <nav aria-label="Footer links">
          {footer.links.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </footer>

      {selectedOffer ? <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} /> : null}
    </div>
  );
}

function useSubscriberBadges(offers: Offer[]) {
  const [badges, setBadges] = useState<Record<string, string>>({});

  useEffect(() => {
    const offersWithBadges = offers.filter((offer) => offer.subscriberBadge);
    if (offersWithBadges.length === 0) return;

    const controller = new AbortController();

    async function fetchBadges() {
      const response = await fetch("/stats.json", {
        cache: "no-cache",
        signal: controller.signal,
      });
      if (!response.ok) return;

      const data = (await response.json()) as {
        badges?: Record<string, number | string | null>;
      };
      const entries = offersWithBadges.flatMap((offer) => {
        const id = offer.subscriberBadge?.id;
        const value = id ? data.badges?.[id] : null;
        const label = formatBadgeValue(value);

        return label ? [[offer.title, label] as const] : [];
      });

      if (controller.signal.aborted) return;
      setBadges(Object.fromEntries(entries));
    }

    fetchBadges().catch(() => {
      if (!controller.signal.aborted) setBadges({});
    });

    return () => controller.abort();
  }, [offers]);

  return badges;
}

function formatBadgeValue(value: number | string | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) return formatSubscriberCount(value);
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function formatSubscriberCount(count: number) {
  if (count < 1000) return String(count);

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}

function OfferCard({
  offer,
  subscriberBadge,
  onSelect,
}: {
  offer: Offer;
  subscriberBadge?: string;
  onSelect: (offer: Offer) => void;
}) {
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

function getInitialTheme(themeStorageKey: string): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem(themeStorageKey);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getCurrentPath() {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

function normalizePath(path: string) {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function AboutPage({ onNavigateHome }: { onNavigateHome: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const { about } = siteData.page;

  return (
    <article className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <h1 id="about-title">{about.title}</h1>
        <p>{about.description}</p>
      </section>

      <div className="about-sections">
        {about.sections.map((section) => (
          <section className="about-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <a className="text-cta" href="/" onClick={onNavigateHome}>
        Back to menu
      </a>
    </article>
  );
}

function OfferModal({ offer, onClose }: { offer: Offer; onClose: () => void }) {
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

function SourdoughIcon({ type, compact = false }: { type: Offer["icon"]; compact?: boolean }) {
  return (
    <span className={`sourdough-icon sourdough-icon-${type} ${compact ? "sourdough-icon-compact" : ""}`} aria-hidden="true">
      <span className="icon-mask" />
    </span>
  );
}

function setMetaContent(name: string, content: string) {
  const meta = getOrCreateMeta("name", name);
  meta.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  const meta = getOrCreateMeta("property", property);
  meta.setAttribute("content", content);
}

function getOrCreateMeta(attribute: "name" | "property", value: string) {
  const selector = `meta[${attribute}="${value}"]`;
  const existingMeta = document.querySelector<HTMLMetaElement>(selector);
  if (existingMeta) return existingMeta;

  const meta = document.createElement("meta");
  meta.setAttribute(attribute, value);
  document.head.append(meta);
  return meta;
}

function setCanonicalUrl(url: string) {
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.append(canonicalLink);
  }

  canonicalLink.setAttribute("href", url);
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
