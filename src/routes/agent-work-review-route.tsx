import { createRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { siteData } from "../config/site-data";
import { usePageMetadata } from "../hooks/use-page-metadata";
import { rootRoute } from "./root-route";

export const agentWorkReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agent-work-review",
  component: AgentWorkReviewRoute,
});

function AgentWorkReviewRoute() {
  const { agentWorkReview } = siteData.redirects;

  usePageMetadata({
    title: agentWorkReview.title,
    description: agentWorkReview.description,
    url: agentWorkReview.destination,
    themeColor: siteData.seo.themeColor,
  });

  useEffect(() => {
    window.location.replace(agentWorkReview.destination);
  }, [agentWorkReview.destination]);

  return (
    <main id="top" className="about-page">
      <section className="about-hero" aria-labelledby="agent-work-review-moved-title">
        <p>{agentWorkReview.eyebrow}</p>
        <h1 id="agent-work-review-moved-title">{agentWorkReview.heading}</h1>
        <p>{agentWorkReview.body}</p>
        <a
          className="back-link"
          href={agentWorkReview.destination}
        >
          {agentWorkReview.linkLabel}
        </a>
      </section>
    </main>
  );
}
