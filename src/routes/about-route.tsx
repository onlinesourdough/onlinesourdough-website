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
  const { seo } = siteData;

  usePageMetadata({
    title: "About onlinesourdough",
    description: seo.aboutDescription,
    url: `${seo.siteUrl}/about/`,
    themeColor: seo.themeColor,
  });

  return (
    <main id="top" className="about-page">
      <AboutPage />
    </main>
  );
}
