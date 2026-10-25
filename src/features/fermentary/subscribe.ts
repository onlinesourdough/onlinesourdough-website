import { fermentaryFormAction } from "../../config/site-data";

/** Kit's public HTML-form endpoint, from the account's existing embed. No API key or new form. */
export async function postFermentarySignup(email: string, fetcher: typeof fetch = fetch) {
  const body = new FormData();
  body.set("email_address", email.trim());
  body.set("host", "https://onlinesourdough.com/fermentary/details/");
  body.set("ckjs_version", "6");
  const response = await fetcher(fermentaryFormAction, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
    credentials: "omit",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error("Fermentary signup unavailable");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("status" in result) || result.status !== "success") {
    throw new Error("Fermentary signup not acknowledged");
  }
  // Never skip an additional consent step or mistake an anti-abuse challenge for success.
  if ("consent" in result && result.consent && typeof result.consent === "object"
      && "enabled" in result.consent && result.consent.enabled) {
    throw new Error("Fermentary signup requires additional consent");
  }
}
