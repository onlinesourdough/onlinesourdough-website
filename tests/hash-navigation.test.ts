import { describe, expect, it } from "vitest";
import { decodeHashTarget } from "../src/hooks/use-initial-hash-scroll";

describe("hash navigation", () => {
  it("decodes normal section targets", () => {
    expect(decodeHashTarget("#menu")).toBe("menu");
    expect(decodeHashTarget("#about%20section")).toBe("about section");
  });

  it("keeps malformed user-supplied hashes safe", () => {
    expect(decodeHashTarget("#%")).toBe("%");
    expect(decodeHashTarget("#%E0%A4%A")).toBe("%E0%A4%A");
  });
});
