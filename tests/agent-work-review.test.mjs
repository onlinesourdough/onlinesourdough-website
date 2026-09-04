import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { siteData } from "../src/config/site-data";
import { router } from "../src/router";
import { agentWorkReviewPin } from "../scripts/agent-work-review-pin-config.mjs";

describe("Agent Work Review publishing contract", () => {
  it("registers the human route", () => {
    expect(router.routesByPath["/agent-work-review"]).toBeDefined();
  });

  it("keeps the local-first copy and evidence distinctions explicit", () => {
    const review = siteData.page.agentWorkReview;
    const publicCopy = JSON.stringify(review);

    expect(review.runbook.href).toBe("/agent-work-review.md");
    expect(review.runbook.instruction).toContain(
      "https://onlinesourdough.com/agent-work-review.md",
    );
    expect(publicCopy).toContain("Four stages, not one score");
    expect(publicCopy).toContain("Owner-led practice");
    expect(publicCopy).toContain("System-led control");
    expect(publicCopy).toContain("Missing opportunity");
    expect(publicCopy).toContain("Unavailable evidence");
    expect(publicCopy).toContain("Independent verification");
    expect(publicCopy).toContain("Nothing is uploaded, analyzed by this website, or sent anywhere automatically");
    expect(publicCopy).toContain("exact, explicit permission");
    expect(publicCopy).toContain("The free local result comes first");
    expect(publicCopy).not.toMatch(/affiliat/i);
  });

  it("publishes the exact pinned canonical Markdown bytes", async () => {
    const runbook = await readFile(new URL("../public/agent-work-review.md", import.meta.url));

    expect(createHash("sha256").update(runbook).digest("hex")).toBe(agentWorkReviewPin.sha256);
    expect(runbook.toString("utf8")).toContain("This runbook has no upload endpoint");
    expect(runbook.toString("utf8")).toMatch(
      /The card has no\s+configured destination or transmission logic\./,
    );
  });

  it("includes both public entry points in the sitemap", async () => {
    const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");

    expect(sitemap).toContain("https://onlinesourdough.com/agent-work-review/");
    expect(sitemap).toContain("https://onlinesourdough.com/agent-work-review.md");
  });

  it("adds no collection or submission implementation", async () => {
    const implementation = await Promise.all(
      [
        "../src/features/agent-work-review/components/AgentWorkReviewPage.tsx",
        "../src/routes/agent-work-review-route.tsx",
      ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
    );

    expect(implementation.join("\n")).not.toMatch(
      /<form|fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|action=|method=/i,
    );
  });
});
