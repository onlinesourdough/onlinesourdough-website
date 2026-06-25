import { createRoute } from "@tanstack/react-router";
import { siteData } from "../config/site-data";
import { AboutPage } from "../features/landing/components/AboutPage";
import { usePageMetadata } from "../hooks/use-page-metadata";
import { rootRoute } from "./root-route";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutRoute,
});

function AboutRoute() {
  const { brand, page, seo } = siteData;
  const title = `About onlinesourdough | ${brand}`;
  const description = page.about.description;

  usePageMetadata({
    title,
    description,
    url: `${seo.siteUrl}/about/`,
    themeColor: seo.themeColor,
  });

  return (
    <main id="top" className="main-panel main-panel-about">
      <AboutPage />
    </main>
  );
}
