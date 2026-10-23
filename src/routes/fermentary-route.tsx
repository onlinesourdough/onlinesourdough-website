import { createRoute } from "@tanstack/react-router";
import { fermentaryPage, siteData } from "../config/site-data";
import { FermentaryPage } from "../features/landing/components/FermentaryPage";
import { usePageMetadata } from "../hooks/use-page-metadata";
import { rootRoute } from "./root-route";

export const fermentaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fermentary",
  component: FermentaryRoute,
});

function FermentaryRoute() {
  usePageMetadata({
    title: fermentaryPage.title,
    description: fermentaryPage.introduction,
    url: `${siteData.seo.siteUrl}/fermentary/`,
    themeColor: siteData.seo.themeColor,
  });
  return (
    <main id="top" className="fermentary-page">
      <FermentaryPage />
    </main>
  );
}
