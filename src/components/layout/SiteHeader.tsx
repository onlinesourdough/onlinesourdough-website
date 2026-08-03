import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { siteData } from "../../config/site-data";
import { useTheme } from "../../hooks/use-theme";
import { OfferSwitcher } from "./OfferSwitcher";

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("");
  const { brand, assets, navigation, themeStorageKey } = siteData;
  const { theme, toggleTheme } = useTheme(themeStorageKey);

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
    <header className="site-header">
      <a className="brand-name" href={isHome ? "#top" : "/"} aria-label={`${brand}, ${isHome ? "top" : "menu"}`}>
        <img className="os-mark" src={assets.logo} alt="" aria-hidden="true" />
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
          aria-current={isHome ? (activeSection === "about" ? "location" : undefined) : "page"}
        >
          {navigation.about}
        </a>
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        <span aria-hidden="true">◐</span>
      </button>
    </header>
  );
}
