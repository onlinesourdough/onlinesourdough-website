import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root-route";
import { homeRoute } from "./routes/home-route";
import { aboutRoute } from "./routes/about-route";

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
