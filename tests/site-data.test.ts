import { describe, expect, it } from "vitest";
import { siteData } from "../src/config/site-data";

describe("approved public site data", () => {
  it("keeps the four approved deliveries in their canonical order", () => {
    expect(
      siteData.offers.map(({ number, title, cta, status }) => ({ number, title, cta, status })),
    ).toEqual([
      { number: "01", title: "Content", cta: "Explore content", status: "Open now" },
      { number: "02", title: "Resources", cta: "Open library", status: "Open now" },
      {
        number: "03",
        title: "Inner Circle",
        cta: "Work together",
        status: "Limited availability",
      },
      { number: "04", title: "Complete Bake", cta: "Start a project", status: "By request" },
    ]);
  });

  it("loads only selected root-relative design assets", () => {
    expect([siteData.assets.logo, ...siteData.offers.map((offer) => offer.image.src)]).toEqual([
      "/assets/onlinesourdough-mark-large-pixel-v3.svg",
      "/assets/content-lofi-v3-transparent.png",
      "/assets/resources-lofi-v3-transparent.png",
      "/assets/inner-circle-lofi-v3-transparent.png",
      "/assets/complete-bake-lofi-v3-transparent.png",
    ]);

    for (const assetPath of [siteData.assets.logo, ...siteData.offers.map((offer) => offer.image.src)]) {
      expect(assetPath).toMatch(/^\/assets\//);
      expect(assetPath).not.toMatch(/(?:-v1|-v2|-v4|\.avif$|Downloads)/);
    }
  });

  it("keeps the shared offer switcher and production destinations explicit", () => {
    expect(siteData.studioOffers.map((offer) => offer.title)).toEqual(["Arc'IT AI", "onlinesourdough"]);
    expect(siteData.studioOffers.find((offer) => offer.current)?.href).toBe("/");
    expect(siteData.offers.at(-1)?.href).toBe("https://arcitai.com");
  });

  it("contains no machine-local paths or customer-facing em dashes", () => {
    const publicData = JSON.stringify(siteData);

    expect(publicData).not.toMatch(/\/Users\/|Downloads|saas-template/);
    expect(publicData).not.toContain("—");
  });
});
