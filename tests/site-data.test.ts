import { describe, expect, it } from "vitest";
import { getExternalLinkAttributes } from "../src/components/link-attributes";
import { siteData } from "../src/config/site-data";

describe("approved public site data", () => {
  it("keeps the four approved deliveries in their canonical order", () => {
    expect(
      siteData.offers.map(({ number, title, cta, status }) => ({ number, title, cta, status })),
    ).toEqual([
      { number: "01", title: "Content", cta: "Explore content", status: "Public" },
      { number: "02", title: "Resources", cta: "Open library", status: "DIY" },
      {
        number: "03",
        title: "The Fermentary",
        cta: "Work together",
        status: "DWY",
      },
      { number: "04", title: "Complete Bake", cta: "Start a project", status: "DFY" },
    ]);
  });

  it("protects the approved hero, SEO, and six-paragraph method copy", () => {
    const title = "Build the business you want to run.";
    const description =
      "onlinesourdough helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.";

    expect(siteData.page.hero.title).toBe(title);
    expect(siteData.page.hero.description).toBe(
      `${description} Use the resources, work through it with me, or have the solution delivered.`,
    );
    expect(siteData.seo.title).toBe(`${title} | onlinesourdough`);
    expect(siteData.seo.description).toBe(description);
    expect(siteData.seo.ogTitle).toBe(`${title} | onlinesourdough`);
    expect(siteData.seo.ogDescription).toBe(description);
    expect(siteData.page.manifesto.title).toBe("From business problem to working solution.");
    expect(siteData.page.manifesto.paragraphs).toEqual([
      "Every business has work that takes too much time, costs too much, leads to mistakes, or makes the next step harder than it should be.",
      "onlinesourdough helps you make that problem clear, choose the smallest useful change, and turn it into something that works.",
      "Sometimes the answer is a simpler process. Sometimes it is automation, an AI agent, a connection between existing tools, or software. The right solution depends on the business.",
      "When something needs to be built, it should be understandable, maintainable, and owned by the business.",
      "AIOS gives the work a home on your computer. It brings together your business context and the way you work with AI, agents, automation, software, and documentation, so you and your tools do not start from scratch every time.",
      "The goal is more control over time, costs, capacity, and direction.",
    ]);
  });

  it("keeps the About model and higher-touch Resources language canonical", () => {
    expect(siteData.seo.aboutTitle).toBe("The onlinesourdough Method | onlinesourdough");
    expect(siteData.seo.aboutDescription).toBe(
      "The onlinesourdough Method helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.",
    );
    expect(siteData.page.about.title).toBe("The onlinesourdough Method");
    expect(siteData.page.about.paragraphs.join(" ")).toContain("AIOS gives the work a home on your computer");
    expect(siteData.page.about.sections.at(2)?.title).toBe("Use AI where it helps");
    expect(siteData.page.about.sections.at(-1)?.paragraphs.at(-1)).toContain("Resources (DIY)");
    expect(siteData.page.about.sections.at(-1)?.paragraphs.at(-1)).toContain("The Fermentary (DWY)");
    expect(siteData.page.about.sections.at(-1)?.paragraphs.at(-1)).toContain("Complete Bake (DFY)");
    expect(siteData.page.about.sections.at(-1)?.paragraphs.at(-1)).toContain("relevant Resources");
    expect(siteData.studioOffers.find((offer) => offer.current)?.description).toBe(
      "Use the onlinesourdough Method through Resources, or work through the current problem with direct guidance.",
    );
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
      href: "https://github.com/onlinesourdough",
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

  it("contains no machine-local paths or customer-facing em dashes", () => {
    const publicData = JSON.stringify(siteData);

    expect(publicData).not.toMatch(/\/Users\/|Downloads|saas-template/);
    expect(publicData).not.toContain("—");
  });
});
