import type { AnchorHTMLAttributes } from "react";

type LinkAttributes = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">;

export function getExternalLinkAttributes(href: string): LinkAttributes {
  return /^https?:\/\//i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
