import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const distUrl = new URL("../dist/", import.meta.url);
const expectedFiles = [
  "index.html",
  "about/index.html",
  "fermentary/index.html",
  "fermentary/details/index.html",
  "newsletter/index.html",
  "newsletter/thank-you/index.html",
  "404.html",
  ".nojekyll",
  "CNAME",
  "favicon.ico",
  "assets/onlinesourdough-mark-large-pixel-v3.svg",
  "assets/fermentary-mark-v2.svg",
  "assets/fermentary-table-icon-v4.png",
  "assets/fermentary-table-icon-dark-v4.png",
  "assets/fermentary-table-minimal-v5.svg",
  "assets/fermentary-table-minimal-v5-light.svg",
  "assets/fermentary-table-minimal-v5-dark.svg",
  "assets/fermentary-cover-v3.png",
  "assets/gustav-linkedin-portrait.jpg",
  "assets/content-lofi-v3-transparent.png",
  "assets/resources-lofi-v3-transparent.png",
  "assets/inner-circle-lofi-v3-transparent.png",
  "assets/complete-bake-lofi-v3-transparent.png",
  "assets/fonts/geist-sans-variable.woff2",
  "assets/fonts/geist-mono-variable.woff2",
  "assets/fonts/geist-pixel-square.woff2",
  "assets/fonts/LICENSE.txt",
];

await Promise.all(expectedFiles.map((path) => access(fileURLToPath(new URL(path, distUrl)))));

const [indexHtml, aboutHtml, sitemap, cname] = await Promise.all([
  readFile(new URL("index.html", distUrl), "utf8"),
  readFile(new URL("about/index.html", distUrl), "utf8"),
  readFile(new URL("sitemap.xml", distUrl), "utf8"),
  readFile(new URL("CNAME", distUrl), "utf8"),
]);

assertIncludes(indexHtml, '<link rel="canonical" href="https://onlinesourdough.com/"');
assertIncludes(indexHtml, 'href="/assets/onlinesourdough-mark-large-pixel-v3.svg"');
assertIncludes(aboutHtml, '<link rel="canonical" href="https://onlinesourdough.com/about/"');
assertIncludes(aboutHtml, "<title>Useful foundations for working with data and AI | onlinesourdough</title>");
assertExcludes(sitemap, "https://onlinesourdough.com/agent-work-review/");
assertExcludes(sitemap, "https://onlinesourdough.com/agent-work-review.md");
for (const path of ["agent-work-review/index.html", "agent-work-review.md"]) {
  const exists = await access(new URL(path, distUrl)).then(() => true, () => false);
  if (exists) throw new Error(`Retired artifact is still published: ${path}`);
}

if (indexHtml.includes("/src/main.tsx")) {
  throw new Error("Production HTML still references the Vite source entrypoint.");
}

if (cname.trim() !== "onlinesourdough.com") {
  throw new Error(`Unexpected CNAME: ${JSON.stringify(cname.trim())}`);
}

const fermentaryHtml = await readFile(new URL("fermentary/index.html", distUrl), "utf8");
assertIncludes(fermentaryHtml, '<link rel="canonical" href="https://onlinesourdough.com/fermentary/"');
assertIncludes(fermentaryHtml, '<title>The Fermentary | onlinesourdough</title>');
assertExcludes(fermentaryHtml, 'noindex');

console.log(`Verified ${expectedFiles.length} GitHub Pages build artifacts.`);

function assertIncludes(value, expected) {
  if (!value.includes(expected)) {
    throw new Error(`Build output did not include ${JSON.stringify(expected)}.`);
  }
}

function assertExcludes(value, unexpected) {
  if (value.includes(unexpected)) {
    throw new Error(`Build output unexpectedly included ${JSON.stringify(unexpected)}.`);
  }
}
