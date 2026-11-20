import { access, readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { router } from "../src/router";

describe("withdrawn review entry points", () => {
  it("does not register or distribute the withdrawn feature", async () => {
    expect(Object.keys(router.routesByPath)).not.toContain("/agent-work-review");
    for (const path of ["public/agent-work-review.md", "src/routes/agent-work-review-route.tsx"]) {
      await expect(access(new URL(`../${path}`, import.meta.url))).rejects.toMatchObject({ code: "ENOENT" });
    }
    const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
    expect(sitemap).not.toContain("agent-work-review");
  });
});
