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
    title: seo.aboutTitle,
    description: seo.aboutDescription,
    url: `${seo.siteUrl}/about/`,
    themeColor: seo.themeColor,
    ogTitle: seo.aboutTitle,
    ogDescription: seo.aboutDescription,
  });

  return (
    <main id="top" className="about-page">
      <AboutPage />
    </main>
  );
}
