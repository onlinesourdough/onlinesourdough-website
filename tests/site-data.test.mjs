import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getExternalLinkAttributes } from "../src/components/link-attributes";
import { siteData } from "../src/config/site-data";

describe("production copy and approved local family navigation", () => {
  it("keeps the four approved deliveries in their canonical order", () => {
    expect(
      siteData.offers.map(({ number, title, cta, status }) => ({ number, title, cta, status })),
    ).toEqual([
      { number: "01", title: "Content", cta: "Explore content", status: "Public" },
      { number: "02", title: "Resources", cta: "Open library", status: "DIY" },
      {
        number: "03",
        title: "The Fermentary",
        cta: "Work with me",
        status: "DWY",
      },
      { number: "04", title: "Complete Bake", cta: "Start a project", status: "DFY" },
    ]);
  });

  it("keeps the homepage metadata consistent with visible copy and the static fallback", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    expect(siteData.seo.title).toBe(`${siteData.page.hero.title} | onlinesourdough`);
    expect(siteData.page.hero.description).toContain(siteData.seo.description);
    expect(siteData.seo.ogTitle).toBe(siteData.seo.title);
    expect(siteData.seo.ogDescription).toBe(siteData.seo.description);
    expect(html).toContain(`<title>${siteData.seo.title}</title>`);
    expect(html).toContain(`content="${siteData.seo.description}"`);
  });

  it("keeps direct About metadata and section anchors consistent", () => {
    const preparePages = readFileSync(new URL("../scripts/prepare-pages.mjs", import.meta.url), "utf8");
    expect(preparePages).toContain(siteData.seo.aboutTitle);
    expect(preparePages).toContain(siteData.seo.aboutDescription);
    const ids = siteData.page.about.sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
  });

  it("excludes retired labels and unsupported commercial or delivery claims", () => {
    const publicCopy = JSON.stringify({
      seo: siteData.seo,
      page: siteData.page,
      offers: siteData.offers.map(({ number, title, description, cta, status, href }) => ({
        number,
        title,
        description,
        cta,
        status,
        href,
      })),
      studioOffers: siteData.studioOffers,
    }).toLowerCase();

    for (const retiredLabel of [
      "inner circle",
      "business freedom ecosystem",
      "ai workspace",
      "blueprint",
      "guided bake",
      "course",
      "classroom",
      "ebook",
      "template library",
      "slack",
      "3 month",
      "6 month",
      "12 month",
      "open now",
      "limited availability",
      "by request",
    ]) {
      expect(publicCopy).not.toContain(retiredLabel);
    }
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
    expect(siteData.offers.find((offer) => offer.title === "The Fermentary")?.href).toBe(
      "https://app.notion.com/p/3be6d2e17f5680d9958bcf322dcef181",
    );
    expect(siteData.offers.at(-1)?.href).toBe("https://arcitai.com");
  });

  it("configures the accessible GitHub footer destination safely", () => {
    expect(siteData.footer.github).toEqual({
      label: "GitHub",
      href: "https://github.com/gustavonline",
    });
    expect(getExternalLinkAttributes(siteData.footer.github.href)).toEqual({
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("opens every configured external HTTP(S) destination safely", () => {
    const externalHrefs = [
      ...siteData.offers.map((offer) => offer.href),
      ...siteData.studioOffers.filter((offer) => !offer.current).map((offer) => offer.href),
      ...siteData.footer.links.map((link) => link.href),
      siteData.footer.github.href,
    ];

    for (const href of externalHrefs) {
      expect(href).toMatch(/^https?:\/\//i);
      expect(getExternalLinkAttributes(href)).toEqual({
        target: "_blank",
        rel: "noopener noreferrer",
      });
    }

    for (const href of ["#menu", "/about", "/#menu", "/"]) {
      expect(getExternalLinkAttributes(href)).toEqual({});
    }
  });

  it("contains no machine-local paths or decorative em dashes", () => {
    const publicData = JSON.stringify(siteData);

    expect(publicData).not.toMatch(/\/Users\/|Downloads|saas-template/);
    expect(publicData.replaceAll("Factory — Software & Defence", "Factory")).not.toContain("—");
  });
});
