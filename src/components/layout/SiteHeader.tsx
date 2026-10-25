import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { siteData } from "../../config/site-data";
import { useTheme } from "../../hooks/use-theme";
import { OfferSwitcher } from "./OfferSwitcher";
import { FamilyMark } from "../../family/FamilyMark";
import { useNavigationOverlay } from "../../hooks/use-navigation-overlay";

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const comparison = import.meta.env.DEV && ["compare", "sources"].includes(new URLSearchParams(window.location.search).get("bread") ?? "");
  const isHome = pathname === "/" && !comparison;
  const isAbout = pathname === "/about" || pathname === "/about/";
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useNavigationOverlay(mobileOpen, overlayRef);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const { brand, navigation, themeStorageKey } = siteData;
  const { theme, toggleTheme } = useTheme(themeStorageKey);

  useEffect(() => {
    const screen = matchMedia("(max-width: 900px)");
    const close = () => setMobileOpen(false);
    screen.addEventListener("change", close);
    return () => screen.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const outside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMobileOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      mobileTrigger.current?.focus();
    };
    const onPopState = () => setMobileOpen(false);
    window.addEventListener("popstate", onPopState);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    document.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sectionIds = ["menu", "about"];
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const marker = Math.min(window.innerHeight * 0.32, 240);
      let nextSection = "";

      for (const section of targets) {
        if (section.getBoundingClientRect().top <= marker) nextSection = section.id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        nextSection = targets.at(-1)?.id ?? "";
      }

      setActiveSection(nextSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="navigation-overlay" ref={overlayRef} role={mobileOpen ? "dialog" : undefined} aria-modal={mobileOpen ? true : undefined} aria-label={mobileOpen ? "Site navigation" : undefined}>
      <a className="brand-name" href={isHome ? "#top" : "/"} aria-label={`${brand}, ${isHome ? "top" : "menu"}`} onClick={() => setMobileOpen(false)}>
        <FamilyMark brand="onlinesourdough" />
        <span>{brand}</span>
      </a>
      <nav className="header-actions" aria-label="Primary navigation">
        <OfferSwitcher currentHref={isHome ? "#top" : "/"} />
        <a
          className="menu-shortcut"
          href={isHome ? "#menu" : "/#menu"}
          aria-current={isHome && activeSection === "menu" ? "location" : undefined}
        >
          {navigation.menu}
        </a>
        <a
          className="menu-shortcut menu-shortcut-about"
          href={isHome ? "#about" : "/about"}
          aria-current={
            isHome
              ? activeSection === "about"
                ? "location"
                : undefined
              : isAbout
                ? "page"
                : undefined
          }
        >
          {navigation.about}
        </a>
      </nav>
      <div className="header-utilities">
      <a className="newsletter-link" href="/newsletter">Newsletter</a>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        <span className="theme-toggle-icon" aria-hidden="true" />
      </button>
      <button ref={mobileTrigger} className="mobile-menu-trigger" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((open) => !open)}>
        <span className="mobile-menu-lines" aria-hidden="true" />
      </button>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!mobileOpen} onClick={(event) => {
        const link = event.target instanceof Element ? event.target.closest("a") : null;
        if (!link) return;
        setMobileOpen(false);
        if (link.hash && link.pathname === pathname) {
          const target = document.getElementById(link.hash.slice(1));
          if (target) {
            requestAnimationFrame(() => {
              target.tabIndex = -1;
              target.focus({ preventScroll: true });
            });
          }
        }
      }}>
        <a href={isHome ? "#menu" : "/#menu"}>Explore the menu <span aria-hidden="true">↓</span></a>
        <a href={isHome ? "#about" : "/about"}>About the method <span aria-hidden="true">{isHome ? "↓" : "→"}</span></a>
        <a href="/newsletter">Newsletter <span aria-hidden="true">→</span></a>
        <div className="mobile-offers">
          <p>Work together</p>
          <a href="/fermentary">The Fermentary <span aria-hidden="true">→</span></a>
          <a href={siteData.studioOffers.find((offer) => !offer.current)!.href}>Custom projects <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
      </div>
    </header>
  );
}
