import { describe, expect, it } from "vitest";
import { parseStatsContract } from "../shared/contracts/stats";
import { buildSubscriberBadges, formatBadgeValue } from "../src/services/subscriber-badges";

describe("subscriber badges", () => {
  it("formats numeric subscriber counts as compact labels", () => {
    expect(formatBadgeValue(980)).toBe("980");
    expect(formatBadgeValue(13250)).toBe("13.3K");
  });

  it("maps valid stats values to offers that request badges", () => {
    const stats = parseStatsContract({
      badges: {
        "gustavonline-youtube": 1200,
        ignored: { nested: true },
      },
      updatedAt: "2026-06-25T00:00:00.000Z",
    });

    expect(
      buildSubscriberBadges(
        [
          { title: "Content", subscriberBadge: { id: "gustavonline-youtube" } },
          { title: "Resources" },
        ],
        stats,
      ),
    ).toEqual({
      Content: "1.2K",
    });
  });

  it("ignores missing, empty, and invalid badge values", () => {
    const stats = parseStatsContract({
      badges: {
        empty: "",
        missing: null,
        invalid: ["not-valid"],
      },
    });

    expect(
      buildSubscriberBadges(
        [
          { title: "Empty", subscriberBadge: { id: "empty" } },
          { title: "Missing", subscriberBadge: { id: "missing" } },
          { title: "Invalid", subscriberBadge: { id: "invalid" } },
        ],
        stats,
      ),
    ).toEqual({});
  });
});
