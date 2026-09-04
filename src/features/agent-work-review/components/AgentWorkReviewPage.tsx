import { useState } from "react";
import { getExternalLinkAttributes } from "../../../components/link-attributes";
import { siteData } from "../../../config/site-data";

type CopyState = "idle" | "copied" | "failed";

export function AgentWorkReviewPage() {
  const { agentWorkReview } = siteData.page;
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const copyInstruction = async () => {
    try {
      await navigator.clipboard.writeText(agentWorkReview.runbook.instruction);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const copyLabel =
    copyState === "copied"
      ? agentWorkReview.runbook.copiedLabel
      : copyState === "failed"
        ? agentWorkReview.runbook.copyFailedLabel
        : agentWorkReview.runbook.copyLabel;

  return (
    <>
      <section className="review-hero" aria-labelledby="agent-work-review-title">
        <p>{agentWorkReview.eyebrow}</p>
        <h1 id="agent-work-review-title">{agentWorkReview.title}</h1>
        <div className="review-intro">
          {agentWorkReview.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="review-runbook" aria-labelledby="review-runbook-title">
        <header>
          <p>{agentWorkReview.runbook.label}</p>
          <h2 id="review-runbook-title">{agentWorkReview.runbook.title}</h2>
          <p>{agentWorkReview.runbook.description}</p>
        </header>
        <div className="review-runbook-card">
          <div className="review-instruction" tabIndex={0}>
            <code>{agentWorkReview.runbook.instruction}</code>
          </div>
          <div className="review-runbook-actions">
            <button type="button" onClick={copyInstruction}>
              {copyLabel}
            </button>
            <a href={agentWorkReview.runbook.href}>
              {agentWorkReview.runbook.openLabel} <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="review-copy-status" role="status" aria-live="polite">
            {copyState === "copied" ? agentWorkReview.runbook.copiedLabel : ""}
          </p>
          <p className="review-compatibility">{agentWorkReview.runbook.compatibility}</p>
        </div>
      </section>

      <section className="review-method" aria-labelledby="review-method-title">
        <header className="review-section-heading">
          <h2 id="review-method-title">{agentWorkReview.method.title}</h2>
          <p>{agentWorkReview.method.description}</p>
        </header>
        <ol className="review-stages">
          {agentWorkReview.method.stages.map((stage, index) => (
            <li key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="review-evidence" aria-labelledby="review-evidence-title">
        <header className="review-section-heading">
          <h2 id="review-evidence-title">{agentWorkReview.evidence.title}</h2>
          <p>{agentWorkReview.evidence.description}</p>
        </header>
        <div className="review-evidence-grid">
          {agentWorkReview.evidence.categories.map((category) => (
            <article key={category.title}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="review-privacy" aria-labelledby="review-privacy-title">
        <h2 id="review-privacy-title">{agentWorkReview.privacy.title}</h2>
        <div>
          {agentWorkReview.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="review-next" aria-labelledby="review-next-title">
        <div>
          <h2 id="review-next-title">{agentWorkReview.next.title}</h2>
          <p>{agentWorkReview.next.description}</p>
        </div>
        <nav aria-label="Optional next steps">
          <a
            href={agentWorkReview.next.resourcesHref}
            {...getExternalLinkAttributes(agentWorkReview.next.resourcesHref)}
          >
            {agentWorkReview.next.resourcesLabel}
          </a>
          <a
            href={agentWorkReview.next.conversationHref}
            {...getExternalLinkAttributes(agentWorkReview.next.conversationHref)}
          >
            {agentWorkReview.next.conversationLabel}
          </a>
        </nav>
      </section>
    </>
  );
}
