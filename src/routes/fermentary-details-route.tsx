import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { FermentarySignupPage } from "../features/fermentary/FermentarySignupPage";
import { usePageMetadata } from "../hooks/use-page-metadata";

export const fermentaryDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fermentary/details",
  component: FermentaryDetailsRoute,
});

function FermentaryDetailsRoute() {
  usePageMetadata({
    title: "The Fermentary — info, terms & pricing | onlinesourdough",
    description: "Get the Fermentary programme details, terms and proposed pricing, and join Gustav’s newsletter.",
    url: "https://onlinesourdough.com/fermentary/details/",
    themeColor: "#f8f2e8",
  });
  return <main id="top" className="family-newsletter-main"><FermentarySignupPage /></main>;
}
