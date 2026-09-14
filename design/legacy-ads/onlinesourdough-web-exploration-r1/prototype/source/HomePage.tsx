import "../design-refinement.css";
import { HeroField } from "../HeroField";
import { DesignAddition } from "../DesignAddition";
import { ArrowIcon } from "../components/AppIcons";
import { CollectionFolder } from "../components/CollectionFolder";
import { resourcePreviewCategories } from "../config/resource-preview";
import { siteConfig } from "../config/site";

export function HomePage({
  onNavigate,
}: {
  onNavigate: (href: string) => void;
}) {
  const variant = new URLSearchParams(location.search).get("variant");
  const videoFirst = variant === "vsl";
  const refined = videoFirst || variant === "flow";
  return (
    <article
      className={`resources-home ${refined ? "da-resources-refined" : ""} ${videoFirst ? "da-video-first" : ""}`}
      aria-labelledby="resources-home-title"
    >
      {videoFirst ? (
        <h1 className="sr-only" id="resources-home-title">
          Resources
        </h1>
      ) : (
        <header className="resources-hero">
          <HeroField />
          <h1 id="resources-home-title">{siteConfig.copy.heroTitle}</h1>
          <p>{siteConfig.copy.heroDescription}</p>
          <div className="resources-hero-actions">
            <a
              className="primary-button"
              href="/collection/explore/start-here"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/collection/explore/start-here");
              }}
            >
              Start Here <ArrowIcon />
            </a>
            <a className="text-cta" href="#collections">
              See what’s inside
            </a>
          </div>
        </header>
      )}

      <section className="resources-vsl" aria-labelledby="resources-vsl-title">
        <h2 className="sr-only" id="resources-vsl-title">
          Resources motion preview
        </h2>
        <figure className="resources-vsl-media">
          <div className="resources-vsl-window">
            {!refined && (
              <div className="resources-vsl-chrome" aria-hidden="true">
                <span className="resources-vsl-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>resources.onlinesourdough / method preview</span>
                <span>v2 / 6 sec</span>
              </div>
            )}
            {new URLSearchParams(location.search).has("capture") ? (
              <img
                className="resources-vsl-video"
                src="/assets/resources-hero-agentic-v2.png"
                alt="Resources workspace video poster"
              />
            ) : (
              <video
                className="resources-vsl-video"
                controls
                playsInline
                preload="metadata"
                poster="/assets/resources-hero-agentic-v2.png"
                aria-label="A six-second motion preview of the Resources workspace"
              >
                <source
                  src="/assets/resources-vsl-motion-preview-v2.mp4"
                  type="video/mp4"
                />
                Your browser does not support the Resources motion preview.
              </video>
            )}
          </div>
        </figure>
      </section>

      <section
        className="resources-folder-section"
        id="collections"
        aria-labelledby="collections-title"
      >
        <div className="resources-section-heading">
          <h2 id="collections-title">Choose where to start</h2>
        </div>
        <div className="collection-folder-grid">
          {resourcePreviewCategories.map((category) => (
            <CollectionFolder
              key={category.id}
              category={category}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
      <DesignAddition site="resources" />
    </article>
  );
}
