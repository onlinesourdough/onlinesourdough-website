import { siteData } from "../../../config/site-data";

export function AboutPage() {
  const { about } = siteData.page;

  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <p>{about.eyebrow}</p>
        <h1 id="about-title">{about.title}</h1>
        <div className="about-intro">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="about-sections">
        {about.sections.map((section, index) => (
          <section className="about-section" key={section.title}>
            <header className="about-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
            </header>
            <div className="about-copy">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <a className="back-link" href="/#menu">
        {about.backLabel} <span aria-hidden="true">→</span>
      </a>
    </>
  );
}
