import { createRoute } from "@tanstack/react-router";
import { siteData } from "../config/site-data";
import { LandingPage } from "../features/landing/components/LandingPage";
import { useInitialHashScroll } from "../hooks/use-initial-hash-scroll";
import { usePageMetadata } from "../hooks/use-page-metadata";
import { rootRoute } from "./root-route";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeRoute,
});

function HomeRoute() {
  const { seo } = siteData;

  useInitialHashScroll();

  usePageMetadata({
    title: seo.title,
    description: seo.description,
    url: `${seo.siteUrl}/`,
    themeColor: seo.themeColor,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
  });

  return (
    <main id="top" className="main-panel">
      <LandingPage />
    </main>
  );
}
