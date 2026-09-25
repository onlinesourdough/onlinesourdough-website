import { getExternalLinkAttributes } from "../../../components/link-attributes";
import { siteData, type AboutBlock } from "../../../config/site-data";

function Emphasis({ text }: { text: string }) {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
  );
}

function AboutContent({ block, headingId }: { block: AboutBlock; headingId: string }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p><Emphasis text={block.text} /></p>
      );
    case "heading":
      return <h3>{block.text}</h3>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}><Emphasis text={item} /></li>
          ))}
        </ul>
      );
    case "links":
      return (
        <p className="about-links">
          {block.links.map((link) => (
            <a key={link.href} href={link.href} {...getExternalLinkAttributes(link.href)}>
              {link.label}
            </a>
          ))}
        </p>
      );
    case "facts":
      return (
        <table className="about-facts" aria-labelledby={headingId}>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>
                  {row.href ? (
                    <a href={row.href} {...getExternalLinkAttributes(row.href)}>
                      {row.value}
                    </a>
                  ) : row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}

export function AboutPage() {
  const { about } = siteData.page;

  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <p>{about.eyebrow}</p>
        <h1 id="about-title">{about.title}</h1>
        <div className="about-intro">
          <p className="about-tagline">{about.tagline}</p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="about-sections">
        {about.sections.map((section, index) => (
          <section
            className="about-section"
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            key={section.id}
          >
            <header className="about-heading">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
            </header>
            <div className="about-copy">
              {section.blocks.map((block, blockIndex) => (
                <AboutContent key={blockIndex} block={block} headingId={`${section.id}-title`} />
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
