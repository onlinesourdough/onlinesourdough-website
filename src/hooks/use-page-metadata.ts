import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
  url: string;
  themeColor: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function usePageMetadata({ title, description, url, themeColor, ogTitle, ogDescription }: PageMetadata) {
  useEffect(() => {
    document.title = title;
    setMetaContent("description", description);
    setMetaContent("theme-color", themeColor);
    setMetaContent("twitter:card", "summary");
    setMetaContent("twitter:title", title);
    setMetaContent("twitter:description", description);
    setMetaProperty("og:title", ogTitle ?? title);
    setMetaProperty("og:description", ogDescription ?? description);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:url", url);
    setCanonicalUrl(url);
  }, [description, ogDescription, ogTitle, themeColor, title, url]);
}

function setMetaContent(name: string, content: string) {
  const meta = getOrCreateMeta("name", name);
  meta.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  const meta = getOrCreateMeta("property", property);
  meta.setAttribute("content", content);
}

function getOrCreateMeta(attribute: "name" | "property", value: string) {
  const selector = `meta[${attribute}="${value}"]`;
  const existingMeta = document.querySelector<HTMLMetaElement>(selector);
  if (existingMeta) return existingMeta;

  const meta = document.createElement("meta");
  meta.setAttribute(attribute, value);
  document.head.append(meta);
  return meta;
}

function setCanonicalUrl(url: string) {
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.append(canonicalLink);
  }

  canonicalLink.setAttribute("href", url);
}
