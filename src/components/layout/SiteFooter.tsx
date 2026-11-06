import { useRouterState } from "@tanstack/react-router";
import { FamilyFooter } from "../../family/Family";
import { siteData } from "../../config/site-data";

export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const fermentary = pathname === "/fermentary" || pathname.startsWith("/fermentary/");
  return <footer className="family-simple-footer">
    <FamilyFooter brand="onlinesourdough" credit={fermentary ? siteData.footer.fermentaryCredit : siteData.footer.menuCredit} />
  </footer>;
}
