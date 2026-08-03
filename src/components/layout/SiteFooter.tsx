import { useRouterState } from "@tanstack/react-router";
import { siteData } from "../../config/site-data";

export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";
  const { assets, brand, footer } = siteData;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href={isHome ? "#top" : "/"} aria-label={`${brand}, ${isHome ? "top" : "menu"}`}>
          <img className="os-mark" src={assets.logo} alt="" aria-hidden="true" />
          <span>{brand}</span>
        </a>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <nav className="footer-links" aria-label="Ecosystem links">
            {footer.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
