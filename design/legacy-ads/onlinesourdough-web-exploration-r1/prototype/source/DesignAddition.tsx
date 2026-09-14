import { ParticleFlow } from "./ParticleFlow";
import { ResourcesGrowth } from "./ResourcesGrowth";
export function DesignAddition({ site }: { site: string }) {
  const variant = new URLSearchParams(location.search).get("variant");
  if (!["flow", "combined", "vsl"].includes(variant || "")) return null;
  return site === "resources" ? <ResourcesGrowth /> : <ParticleFlow />;
}
