import { type Offer } from "../../../config/site-data";

type SourdoughIconProps = {
  type: Offer["icon"];
  compact?: boolean;
};

export function SourdoughIcon({ type, compact = false }: SourdoughIconProps) {
  return (
    <span className={`sourdough-icon sourdough-icon-${type} ${compact ? "sourdough-icon-compact" : ""}`} aria-hidden="true">
      <span className="icon-mask" />
    </span>
  );
}
