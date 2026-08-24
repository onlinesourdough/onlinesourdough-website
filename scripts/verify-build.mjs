import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const distUrl = new URL("../dist/", import.meta.url);
const expectedFiles = [
  "index.html",
  "about/index.html",
  "404.html",
  ".nojekyll",
  "CNAME",
  "assets/onlinesourdough-mark-large-pixel-v3.svg",
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

const [indexHtml, aboutHtml, cname] = await Promise.all([
  readFile(new URL("index.html", distUrl), "utf8"),
  readFile(new URL("about/index.html", distUrl), "utf8"),
  readFile(new URL("CNAME", distUrl), "utf8"),
]);

assertIncludes(indexHtml, '<link rel="canonical" href="https://onlinesourdough.com/"');
assertIncludes(indexHtml, 'href="/assets/onlinesourdough-mark-large-pixel-v3.svg"');
assertIncludes(aboutHtml, '<link rel="canonical" href="https://onlinesourdough.com/about/"');
assertIncludes(aboutHtml, "<title>The onlinesourdough Method | onlinesourdough</title>");

if (indexHtml.includes("/src/main.tsx")) {
  throw new Error("Production HTML still references the Vite source entrypoint.");
}

if (cname.trim() !== "onlinesourdough.com") {
  throw new Error(`Unexpected CNAME: ${JSON.stringify(cname.trim())}`);
}

console.log(`Verified ${expectedFiles.length} GitHub Pages build artifacts.`);

function assertIncludes(value, expected) {
  if (!value.includes(expected)) {
    throw new Error(`Build output did not include ${JSON.stringify(expected)}.`);
  }
}
