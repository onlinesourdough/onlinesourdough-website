import { access, readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { siteData } from "../src/config/site-data";
import { router } from "../src/router";

describe("Agent Work Review migration contract", () => {
  it("keeps the retired human route as a compatibility redirect", () => {
    expect(router.routesByPath["/agent-work-review"]).toBeDefined();
    expect(siteData.redirects.agentWorkReview.destination).toBe(
      "https://resources.onlinesourdough.com/agent-work-review",
    );
    expect(siteData.redirects.agentWorkReview.markdownDestination).toBe(
      "https://resources.onlinesourdough.com/agent-work-review.md",
    );
  });

  it("publishes only a small Markdown migration pointer", async () => {
    const pointer = await readFile(
      new URL("../public/agent-work-review.md", import.meta.url),
      "utf8",
    );

    expect(pointer).toContain("https://resources.onlinesourdough.com/agent-work-review.md");
    expect(pointer).not.toContain("# Agent Work Review runbook");
    expect(pointer.length).toBeLessThan(700);
  });

  it("removes both retired main-site entry points from the sitemap", async () => {
    const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");

    expect(sitemap).not.toContain("https://onlinesourdough.com/agent-work-review/");
    expect(sitemap).not.toContain("https://onlinesourdough.com/agent-work-review.md");
  });

  it("removes the old page implementation and keeps only local redirect behavior", async () => {
    const route = await readFile(
      new URL("../src/routes/agent-work-review-route.tsx", import.meta.url),
      "utf8",
    );

    await expect(
      access(
        new URL(
          "../src/features/agent-work-review/components/AgentWorkReviewPage.tsx",
          import.meta.url,
        ),
      ),
    ).rejects.toBeDefined();
    expect(route).toContain("window.location.replace(agentWorkReview.destination)");
    expect(route).not.toMatch(
      /<form|fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|action=|method=/i,
    );
  });
});
