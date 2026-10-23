import { fermentaryPage, fermentarySignupUrl } from "../../../config/site-data";
import "./fermentary.css";

/** Only a configured video can create a player; an unfilmed video stays a still. */
export function FermentaryVideo({
  youtubeId = fermentaryPage.video.youtubeId,
}: {
  youtubeId?: string;
}) {
  const { video } = fermentaryPage;
  const ready = /^[A-Za-z0-9_-]{11}$/.test(youtubeId);

  return (
    <figure
      className={`fermentary-video${ready ? "" : " fermentary-video-pending"}`}
    >
      {ready ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={video.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <img src={video.poster} alt="" width="640" height="640" />
          <figcaption>
            <strong>{video.pendingTitle}</strong>
            <span>{video.pendingDescription}</span>
          </figcaption>
        </>
      )}
    </figure>
  );
}

export function FermentaryPage() {
  const page = fermentaryPage;
  return (
    <>
      <header className="fermentary-intro">
        <h1>{page.heading}</h1>
        <p className="fermentary-description">{page.introduction}</p>
      </header>

      <FermentaryVideo />

      <div className="fermentary-next">
        <a className="family-button" href={fermentarySignupUrl}>
          {page.cta}
          <span aria-hidden="true"> →</span>
        </a>
      </div>

      <div className="fermentary-founder">
        <img
          src={page.portrait}
          width="88"
          height="88"
          alt="Gustav Anderson"
          loading="lazy"
        />
        <p>{page.founder}</p>
      </div>

      <section
        className="fermentary-method"
        aria-labelledby="fermentary-method-title"
      >
        <h2 id="fermentary-method-title">{page.whyTitle}</h2>
        <p>{page.why}</p>
        <ol>
          {page.steps.map((step, index) => (
            <li key={step.title}>
              <span className="fermentary-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="fermentary-details"
        aria-labelledby="fermentary-included"
      >
        <h2 id="fermentary-included">What you get</h2>
        <ul>
          {page.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>Is it for me?</h2>
        <p>{page.fit}</p>
      </section>

      <section
        className="fermentary-faq"
        aria-labelledby="fermentary-questions"
      >
        <h2 id="fermentary-questions">{page.faqTitle}</h2>
        {page.faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <div className="fermentary-bottom-cta">
        <a className="family-button" href={fermentarySignupUrl}>
          {page.cta}
          <span aria-hidden="true"> →</span>
        </a>
        <p>{page.closing}</p>
      </div>
    </>
  );
}
