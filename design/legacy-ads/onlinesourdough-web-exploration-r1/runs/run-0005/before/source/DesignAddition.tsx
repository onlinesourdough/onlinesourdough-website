import { ParticleFlow } from "./ParticleFlow";
import { ResourcesGrowth } from "./ResourcesGrowth";
const variant =
  new URLSearchParams(window.location.search).get("variant") || "baseline";
export function DesignAddition({ site }: { site: string }) {
  if (variant !== "flow") return null;
  return site === "resources" ? <ResourcesGrowth /> : <ParticleFlow />;
}
