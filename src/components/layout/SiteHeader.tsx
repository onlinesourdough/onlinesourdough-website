import { Link } from "@tanstack/react-router";
import { siteData } from "../../config/site-data";
import { useTheme } from "../../hooks/use-theme";

export function SiteHeader() {
  const { brand, themeStorageKey } = siteData;
  const { theme, toggleTheme } = useTheme(themeStorageKey);

  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" aria-label={`${brand} home`}>
        <span className="brand-loaf" />
      </Link>
      <Link className="brand-name" to="/">
        {brand}
      </Link>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="theme-toggle-icon" />
        </button>
      </div>
    </header>
  );
}
