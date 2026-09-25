import { useRouterState } from "@tanstack/react-router";
import { FamilyFooter } from "../../family/Family";
import { siteData } from "../../config/site-data";
import { FamilyMark } from "../../family/FamilyMark";
export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";
  return <footer className={isHome ? "family-osd-footer" : "family-simple-footer"}>
    {isHome && <a className="family-signature" href="#top">
      <FamilyMark brand="onlinesourdough" />{siteData.brand}
    </a>}
    <FamilyFooter brand="onlinesourdough" />
  </footer>;
}
