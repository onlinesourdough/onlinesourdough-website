import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const isReview = process.argv.includes("--review");
const distUrl = new URL(isReview ? "../output/family-preview/" : "../dist/", import.meta.url);
const indexPath = fileURLToPath(new URL("index.html", distUrl));
const notFoundPath = fileURLToPath(new URL("404.html", distUrl));
const noJekyllPath = fileURLToPath(new URL(".nojekyll", distUrl));

const directPages = [
  {
    directory: "fermentary/details",
    title: "The Fermentary — info, terms & pricing | onlinesourdough",
    description: "Get the Fermentary programme details, terms and proposed pricing, and join Gustav’s newsletter.",
    url: "https://onlinesourdough.com/fermentary/details/",
    noindex: true,
  },
  {
    directory: "fermentary",
    title: "The Fermentary | onlinesourdough",
    description: "The Fermentary is an ongoing 1:1 collaboration for solo founders and small teams. Together we map your business, bring its data and context together, and build a foundation in the environment you already use.",
    url: "https://onlinesourdough.com/fermentary/",
  },
  {
    directory: "newsletter",
    title: "Newsletter | onlinesourdough",
    description: "Ideas, experiments and lessons from putting AI to work with useful business context.",
    url: "https://onlinesourdough.com/newsletter/",
  },
  {
    directory: "newsletter/thank-you",
    title: "Newsletter signup | onlinesourdough",
    description: "Your newsletter signup with onlinesourdough.",
    url: "https://onlinesourdough.com/newsletter/thank-you/",
    noindex: true,
  },
  {
    directory: "about",
    title: "Useful foundations for working with data and AI | onlinesourdough",
    description:
      "The thinking behind onlinesourdough: business context, practical AI and ongoing collaboration for solo founders and small teams.",
    url: "https://onlinesourdough.com/about/",
  },
  {
    directory: "agent-work-review",
    title: "Agent Work Review has moved | onlinesourdough",
    description: "Agent Work Review now lives in onlinesourdough Resources.",
    url: "https://resources.onlinesourdough.com/agent-work-review",
    redirect: "https://resources.onlinesourdough.com/agent-work-review",
  },
];

const indexHtml = await readFile(indexPath, "utf8");
for (const page of directPages) {
  const directoryUrl = new URL(`${page.directory}/`, distUrl);
  await mkdir(fileURLToPath(directoryUrl), { recursive: true });
  let pageHtml = withPageMetadata(indexHtml, page).replace(
    /<head>/,
    page.noindex ? '<head>\n<meta name="robots" content="noindex, follow">' : '<head>',
  );
  if (page.noCanonical) {
    pageHtml = pageHtml.replace(/\s*<link\s+rel="canonical"[^>]*>/, "");
  }
  await writeFile(
    new URL("index.html", directoryUrl),
    page.redirect ? withExternalRedirect(pageHtml, page.redirect) : pageHtml,
  );
}
await copyFile(indexPath, notFoundPath);
await writeFile(noJekyllPath, "");

function withPageMetadata(html, page) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${escapeAttribute(page.url)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.url)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`);
}

function withExternalRedirect(html, destination) {
  const refresh = `<meta http-equiv="refresh" content="0;url=${escapeAttribute(destination)}">`;
  return html.replace("<head>", `<head>\n    ${refresh}`);
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
