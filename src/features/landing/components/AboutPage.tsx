import { Link } from "@tanstack/react-router";
import { siteData } from "../../../config/site-data";

export function AboutPage() {
  const { about } = siteData.page;

  return (
    <article className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <h1 id="about-title">{about.title}</h1>
        <p>{about.description}</p>
      </section>

      <div className="about-sections">
        {about.sections.map((section) => (
          <section className="about-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <Link className="text-cta" to="/">
        Back to menu
      </Link>
    </article>
  );
}
