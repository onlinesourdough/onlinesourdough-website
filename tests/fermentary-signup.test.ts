import { describe, expect, it, vi } from "vitest";
import { postFermentarySignup } from "../src/features/fermentary/subscribe";
import { fermentaryFormAction, fermentarySignupUrl } from "../src/config/site-data";

describe("the native Fermentary signup", () => {
  it("keeps visitors on our site until they submit the existing form", async () => {
    expect(fermentarySignupUrl).toBe("/fermentary/details");
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ status: "success" })));
    await postFermentarySignup(" reader@example.com ", fetcher);
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toBe(fermentaryFormAction);
    expect(options?.method).toBe("POST");
    expect(options?.body).toBeInstanceOf(FormData);
    expect((options?.body as FormData).get("email_address")).toBe("reader@example.com");
    expect(options?.credentials).toBe("omit");
  });

  it.each([
    [503, { status: "success" }],
    [200, { status: "error", errors: { messages: ["Invalid email"] } }],
    [200, { status: "quarantined", url: "https://example.com/challenge" }],
    [200, { status: "success", consent: { enabled: true } }],
    [200, {}], [200, null],
  ])("does not show thanks or redirect for an unacknowledged signup (%s)", async (status, body) => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(body), { status }));
    await expect(postFermentarySignup("reader@example.com", fetcher)).rejects.toThrow();
  });

  it("surfaces network failures instead of treating them as subscriptions", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Network failed"));
    await expect(postFermentarySignup("reader@example.com", fetcher)).rejects.toThrow();
  });
});
