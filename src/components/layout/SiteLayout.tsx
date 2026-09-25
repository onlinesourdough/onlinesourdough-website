import { type ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <a className="family-skip" href="#page-content">Skip to content</a>
      <SiteHeader />
      <div id="page-content" tabIndex={-1}>{children}</div>
      <SiteFooter />
    </div>
  );
}
