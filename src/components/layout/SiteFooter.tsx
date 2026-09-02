import { useRouterState } from "@tanstack/react-router";
import { siteData } from "../../config/site-data";
import { getExternalLinkAttributes } from "../link-attributes";

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
              <a href={link.href} {...getExternalLinkAttributes(link.href)} key={link.href}>
                {link.label}
              </a>
            ))}
            <a
              className="footer-icon-link"
              href={footer.github.href}
              aria-label={footer.github.label}
              {...getExternalLinkAttributes(footer.github.href)}
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.11.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.4-2.72 5.38-5.3 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
