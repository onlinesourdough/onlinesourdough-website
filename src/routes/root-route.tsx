import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "../components/layout/SiteLayout";

export const rootRoute = createRootRoute({
  component: RootRoute,
});

function RootRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
