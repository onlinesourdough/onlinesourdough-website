import { siteData } from "../../config/site-data";

export function SiteFooter() {
  const { footer } = siteData;

  return (
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
  );
}
