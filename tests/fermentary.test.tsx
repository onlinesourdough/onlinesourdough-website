import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FermentaryPage,
  FermentaryVideo,
} from "../src/features/landing/components/FermentaryPage";
import { fermentarySignupUrl } from "../src/config/site-data";

describe("Fermentary video and brochure path", () => {
  it("offers the native signup before and after the details, even without a video", () => {
    const html = renderToStaticMarkup(<FermentaryPage />);
    const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
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
