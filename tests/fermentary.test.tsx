import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FermentaryPage,
  FermentaryVideo,
} from "../src/features/landing/components/FermentaryPage";
import { fermentarySignupUrl, fermentaryContactUrl } from "../src/config/site-data";

describe("Fermentary video and brochure path", () => {
  it("offers the native signup before and after the details, even without a video", () => {
    const html = renderToStaticMarkup(<FermentaryPage />);
    const links = (html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? []).filter((link) => link.includes('class="family-button"'));
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toContain(`href="${fermentarySignupUrl}"`);
      expect(link).not.toContain("target=");
      expect(link).toContain("More info, terms &amp; pricing");
    }
    expect(html).not.toContain("<form");
    expect(html).not.toContain("<script");
    expect(html).toContain("Video coming soon");
    expect(html).not.toContain("<iframe");
  });

  it("opens an email draft with the pre-onboarding questions", () => {
    const link = new URL(fermentaryContactUrl);
    expect(link.protocol).toBe("mailto:");
    expect(link.pathname).toBe("hello@gustavonline.com");
    expect(link.searchParams.get("subject")).toBe("The Fermentary");
    expect(link.searchParams.get("body")).toContain("1. My business");
    expect(link.searchParams.get("body")).toContain("2. The tools");
    expect(link.searchParams.get("body")).toContain("3. The session level and start date");
    const html = renderToStaticMarkup(<FermentaryPage />);
    expect(html).toContain("Email me about The Fermentary");
    expect(html).not.toContain("calendar.notion.so");
  });

  it("embeds only a configured YouTube ID, without autoplay or watch gating", () => {
    const html = renderToStaticMarkup(
      <FermentaryVideo youtubeId="abcdefghijk" />,
    );
    expect(html).toContain(
      'src="https://www.youtube-nocookie.com/embed/abcdefghijk?rel=0"',
    );
    expect(html).toContain(
      'title="The Fermentary: making data and AI useful in your business"',
    );
    expect(html).not.toContain("autoplay");
    expect(html).not.toContain("Video coming soon");
  });

  it("does not embed an arbitrary URL or malformed video ID", () => {
    for (const id of [
      "",
      "bad-id",
      "https://example.com/video",
      "abcdefghijk?autoplay=1",
    ]) {
      const html = renderToStaticMarkup(<FermentaryVideo youtubeId={id} />);
      expect(html).not.toContain("<iframe");
      expect(html).toContain("Video coming soon");
    }
  });
});
