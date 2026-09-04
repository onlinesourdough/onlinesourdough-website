import { createRoute } from "@tanstack/react-router";
import { siteData } from "../config/site-data";
import { AgentWorkReviewPage } from "../features/agent-work-review/components/AgentWorkReviewPage";
import { usePageMetadata } from "../hooks/use-page-metadata";
import { rootRoute } from "./root-route";

export const agentWorkReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agent-work-review",
  component: AgentWorkReviewRoute,
});

function AgentWorkReviewRoute() {
  const { seo } = siteData;

  usePageMetadata({
    title: seo.agentWorkReviewTitle,
    description: seo.agentWorkReviewDescription,
    url: `${seo.siteUrl}/agent-work-review/`,
    themeColor: seo.themeColor,
    ogTitle: seo.agentWorkReviewTitle,
    ogDescription: seo.agentWorkReviewDescription,
  });

  return (
    <main id="top" className="review-page">
      <AgentWorkReviewPage />
    </main>
  );
}
