import { createRouter, createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routes/root-route";
import { homeRoute } from "./routes/home-route";
import { aboutRoute } from "./routes/about-route";
import { fermentaryRoute } from "./routes/fermentary-route";
import { fermentaryDetailsRoute } from "./routes/fermentary-details-route";

import { NewsletterPage } from "./family/NewsletterPage";
const newsletterRoute = createRoute({ getParentRoute: () => rootRoute, path: "/newsletter", component: NewsletterPage });
const thankYouRoute = createRoute({ getParentRoute: () => rootRoute, path: "/newsletter/thank-you", component: NewsletterPage });
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, newsletterRoute, thankYouRoute, fermentaryRoute, fermentaryDetailsRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
