import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Offer = {
  title: string;
  kicker: string;
  description: string;
  cta: string;
  icon: "starter" | "recipe" | "proofing" | "bake";
  details: string;
  bestFor: string;
  includes: string[];
};

const offers: Offer[] = [
  {
    title: "Starter Culture",
    kicker: "Learn the culture",
    description: "Understand AI-first software before you pour it into every workflow.",
    cta: "Start feeding",
    icon: "starter",
    details:
      "A practical entry layer for people who want better instincts before they build. The goal is not to make you a full-time developer. It is to help you see what is happening when software, automation and AI enter the room.",
    bestFor: "Founders and operators who want sharper technical taste before spending serious money.",
    includes: ["Plain-language technical maps", "AI-first architecture notes", "Reusable prompts, patterns and checklists"],
  },
  {
    title: "Recipe Library",
    kicker: "Use the recipes",
    description: "Frameworks, agents and small systems you can adapt across different business recipes.",
    cta: "Open recipes",
    icon: "recipe",
    details:
      "Sourdough does not replace every ingredient. It improves the recipe when used with judgment. This library is built the same way: useful AI-first patterns you can sprinkle into the places where they actually improve the system.",
    bestFor: "People who want reusable building blocks without drowning in tool hype.",
    includes: ["Workflow recipes", "Agent and automation patterns", "Small implementation playbooks"],
  },
  {
    title: "Proofing Room",
    kicker: "Work side by side",
    description: "Private review, pair programming and technical direction before the structure collapses.",
    cta: "Book proofing",
    icon: "proofing",
    details:
      "Most software problems look fine on the outside until you cut into them. Proofing Room is for working through architecture, product decisions and AI-first implementation before the inside turns gummy.",
    bestFor: "Teams and founders who can build parts themselves, but want technical judgment close to the process.",
    includes: ["Architecture review", "Pair programming", "Debugging, workflow critique and decision support"],
  },
  {
    title: "Finished Bake",
    kicker: "Ship the loaf",
    description: "Done-for-you software when the business need is clear and it needs to be healthy inside.",
    cta: "Start project",
    icon: "bake",
    details:
      "For projects where the recipe is clear enough to build. I help turn the idea into a working system with documentation, handover and maintenance thinking included from day one.",
    bestFor: "Businesses with more urgency than learning time, and a problem worth building properly.",
    includes: ["Project estimate", "AI-first app, tool or automation build", "Documentation, handover and support path"],
  },
];

function App() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Online Sourdough home">
          <span>OS</span>
        </a>
        <a className="brand-name" href="#top">
          Online Sourdough
        </a>
        <a className="header-link" href="mailto:hello@arcitai.com?subject=Online%20Sourdough">
          inquire
        </a>
      </header>

      <main id="top" className="main-panel">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">AI-first software culture</p>
          <h1 id="hero-title">Software needs a starter, not just a starter kit.</h1>
          <p>
            Software and sourdough both look simple from the outside. Then you learn the culture: feed it, proof it,
            shape it, and use it in the right recipes. Online Sourdough is for building AI-first business systems that
            can keep living after the first bake.
          </p>
        </section>

        <section className="menu-grid" aria-label="Online Sourdough menu">
          <div className="menu-label">menu</div>
          {offers.map((offer) => (
            <button className="offer-card" type="button" key={offer.title} onClick={() => setSelectedOffer(offer)}>
              <SourdoughIcon type={offer.icon} />
              <span className="offer-kicker">{offer.kicker}</span>
              <span className="offer-title">{offer.title}</span>
              <span className="offer-description">{offer.description}</span>
              <span className="offer-cta">{offer.cta}</span>
            </button>
          ))}
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div>
            <p className="eyebrow">why it exists</p>
            <h2 id="manifesto-title">Do not replace the cinnamon bun. Improve the dough.</h2>
          </div>
          <div className="manifesto-copy">
            <p>
              AI should not replace every ingredient in your business. Used well, it behaves more like a good starter:
              a living culture that makes the recipe healthier, easier to repeat and more interesting.
            </p>
            <p>
              The boring supermarket starter kit is fine when you need speed. But in software it often looks like this:
              spin up Next.js, Vercel and Supabase, vibe-code the app, and hope the inside is as healthy as the outside.
              Online Sourdough is a push toward better taste, better structure and less guilt after shipping.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>onlinesourdough.com</span>
        <span>Built for AI-first software that can keep rising.</span>
      </footer>

      {selectedOffer ? <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} /> : null}
    </div>
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
      <button className="modal-backdrop" type="button" aria-label="Close details" onClick={onClose} />
      <article className="modal-panel">
        <button className="modal-close" type="button" aria-label="Close details" onClick={onClose}>
          x
        </button>
        <div className="modal-label">
          <SourdoughIcon type={offer.icon} compact />
          <span>{offer.kicker}</span>
        </div>
        <h2 id="modal-title">{offer.title}</h2>
        <p>{offer.details}</p>
        <section>
          <h3>Best for</h3>
          <p>{offer.bestFor}</p>
        </section>
        <ul>
          {offer.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href={`mailto:hello@arcitai.com?subject=Online%20Sourdough%20-%20${encodeURIComponent(offer.title)}`}>
          ask about this
        </a>
      </article>
    </div>
  );
}

function SourdoughIcon({ type, compact = false }: { type: Offer["icon"]; compact?: boolean }) {
  return (
    <span className={`sourdough-icon sourdough-icon-${type} ${compact ? "sourdough-icon-compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" focusable="false">
        {type === "starter" ? (
          <>
            <path className="icon-glass" d="M51 42h58l-7 88H58L51 42Z" />
            <path className="icon-fill-green" d="M57 85c12-9 20 8 32 0 7-5 12-4 18 1l-4 44H58l-4-39 3-6Z" />
            <path className="icon-line" d="M48 42h64M59 34h42M59 63h42" />
            <circle className="icon-bubble" cx="72" cy="98" r="4" />
            <circle className="icon-bubble" cx="92" cy="112" r="3" />
            <circle className="icon-bubble" cx="84" cy="91" r="2.6" />
          </>
        ) : null}

        {type === "recipe" ? (
          <>
            <path className="icon-paper" d="M43 36h70c6 0 11 5 11 11v72c0 5-4 9-9 9H47c-7 0-12-5-12-12V44c0-5 3-8 8-8Z" />
            <path className="icon-line" d="M52 55h45M52 72h55M52 89h38" />
            <path className="icon-fill-green" d="M101 96c8-6 15-15 18-25 7 13 1 31-13 39l-13 7 2-14c1-3 3-5 6-7Z" />
          </>
        ) : null}

        {type === "proofing" ? (
          <>
            <path className="icon-bowl" d="M32 86c14-22 82-22 96 0 3 19-16 39-48 39S29 105 32 86Z" />
            <path className="icon-line" d="M43 88c13 13 61 14 74 0M52 77c15 7 41 7 56 0M66 70c9 3 19 3 28 0" />
            <path className="icon-line" d="M45 42c12 2 17 10 17 22M115 42c-12 2-17 10-17 22" />
          </>
        ) : null}

        {type === "bake" ? (
          <>
            <path className="icon-fill-crust" d="M34 88c7-29 85-29 92 0 5 25-16 43-46 43S29 113 34 88Z" />
            <path className="icon-line" d="M52 91c16 14 40 14 56 0M66 74c-8 14-9 25-3 36M81 70c-5 17-4 29 4 39M97 75c-2 15 1 25 10 32" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
