import { useEffect, useRef, useState, type FormEvent } from "react";
import { fermentaryBrochureUrl } from "../../config/site-data";
import { postFermentarySignup } from "./subscribe";
import "./signup.css";

export function FermentarySignupPage() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const confirmation = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!done) return;
    confirmation.current?.focus();
    const timer = window.setTimeout(() => window.location.assign(fermentaryBrochureUrl), 3500);
    return () => window.clearTimeout(timer);
  }, [done]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError("");
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    try {
      await postFermentarySignup(email);
      setDone(true);
    } catch {
      submitting.current = false;
      setPending(false);
      setError("Your signup could not be completed. Your email is still here — please try again.");
    }
  }

  return <section className="fermentary-signup" aria-labelledby="details-title">
    <a className="fermentary-signup-back" href="/fermentary">← The Fermentary</a>
    {done ? <>
      <h1 id="details-title" ref={confirmation} tabIndex={-1}>Thank you.<br />Your details are ready.</h1>
      <p role="status">Taking you to the programme details in Notion. Check your inbox for the confirmation email and a link back.</p>
      <a className="family-button" href={fermentaryBrochureUrl}>Open the details in Notion <span aria-hidden="true">→</span></a>
    </> : <>
      <img className="fermentary-signup-art" src="/assets/inner-circle-lofi-v3-transparent.png" alt="" width="180" height="140" />
      <h1 id="details-title">More info,<br />terms &amp; pricing</h1>
      <p>The approach, how we work together and the proposed pricing and terms — in one place.</p>
      <form className="family-signup" onSubmit={submit} aria-busy={pending}>
        <label htmlFor="fermentary-email">Email address</label>
        <input id="fermentary-email" name="email" type="email" required autoComplete="email" maxLength={254}
          placeholder="you@example.com" readOnly={pending} aria-describedby="fermentary-consent fermentary-status" />
        <p id="fermentary-consent">Sign up for Gustav’s newsletter and receive the Fermentary details in Notion. Unsubscribe anytime.</p>
        <button className="family-button" type="submit" disabled={pending}>{pending ? "Sending…" : "Send me the details"} <span aria-hidden="true">→</span></button>
        <p id="fermentary-status" role="status">{error}</p>
      </form>
    </>}
  </section>;
}
