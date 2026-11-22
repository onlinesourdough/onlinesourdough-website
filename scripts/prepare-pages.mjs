import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const isReview = process.argv.includes("--review");
const distUrl = new URL(isReview ? "../output/family-preview/" : "../dist/", import.meta.url);
const indexPath = fileURLToPath(new URL("index.html", distUrl));
const notFoundPath = fileURLToPath(new URL("404.html", distUrl));
const noJekyllPath = fileURLToPath(new URL(".nojekyll", distUrl));
const origin = "https://onlinesourdough.com";
const pages = [
  {
    directory: "",
    title: "Build what your business needs with AI | onlinesourdough",
    description: "For solo founders and small teams. Turn what you know about your business into tools and workflows you can keep improving.",
    body: `<section><h1>Build what your business needs with AI</h1><p>For solo founders and small teams. Turn what you know about your business into tools and workflows you can keep improving.</p><h2>Start with a piece of work you know well</h2><p>Use your business data and context to help AI prepare something useful that you can review, improve and reuse.</p><nav aria-label="Explore onlinesourdough"><ul><li><a href="https://resources.onlinesourdough.com/">Explore guides and resources</a></li><li><a href="/about/">About the method</a></li><li><a href="/fermentary/">Work together in The Fermentary</a></li><li><a href="https://arcitai.com/">Arc’IT AI custom projects</a></li></ul></nav></section>`,
  },
  {
    directory: "fermentary/details",
    title: "The Fermentary — info, terms & pricing | onlinesourdough",
    description: "Get the Fermentary programme details, terms and proposed pricing, and join Gustav’s newsletter.",
    url: `${origin}/fermentary/details/`,
    noindex: true,
    body: `<section><h1>More info, terms &amp; pricing</h1><p>The Fermentary is ongoing 1:1 collaboration for solo founders and small teams. Read the programme details, then email Gustav to agree the session level, start date and practical arrangements.</p><p><a href="/fermentary/">Learn about The Fermentary</a> or return to the <a href="/">onlinesourdough menu</a>.</p></section>`,
  },
  {
    directory: "fermentary",
    title: "The Fermentary | onlinesourdough",
    description: "The Fermentary is an ongoing 1:1 collaboration for solo founders and small teams. Together we map your business, bring its data and context together, and build a foundation in the environment you already use.",
    url: `${origin}/fermentary/`,
    body: `<section><h1>Build something useful with AI. Learn to keep it going.</h1><p>Bring a piece of work you want to improve. In ongoing 1:1 sessions, we organise the data and context AI needs, put it to work in your environment and review the result together.</p><h2>From scattered data to shared context</h2><p>Data is the information in your documents, messages and systems. Context explains what it means in your business: how you work, what matters and why you do things a certain way.</p><ol><li>Map your business and find what is missing.</li><li>Build the foundation in your existing environment.</li><li>Keep it useful with review and documentation.</li></ol><p><a href="/fermentary/details/">More info, terms &amp; pricing</a> · <a href="/about/">About the method</a></p></section>`,
  },
  {
    directory: "newsletter",
    title: "Newsletter | onlinesourdough",
    description: "Ideas, experiments and lessons from putting AI to work with useful business context.",
    url: `${origin}/newsletter/`,
    body: `<section><h1>Notes from the work</h1><p>Ideas, experiments and lessons from putting AI to work with useful business context.</p><p><a href="/">Explore onlinesourdough</a> · <a href="/about/">About the method</a></p></section>`,
  },
  {
    directory: "newsletter/thank-you",
    title: "Newsletter signup | onlinesourdough",
    description: "Your newsletter signup with onlinesourdough.",
    url: `${origin}/newsletter/thank-you/`,
    noindex: true,
    body: `<section><h1>Notes from the work</h1><p>Return to <a href="/">onlinesourdough</a> or revisit <a href="/newsletter/">the newsletter page</a>.</p></section>`,
  },
  {
    directory: "about",
    title: "Useful foundations for working with data and AI | onlinesourdough",
    description: "The thinking behind onlinesourdough: business context, practical AI and ongoing collaboration for solo founders and small teams.",
    url: `${origin}/about/`,
    body: `<section><h1>Useful foundations for working with data and AI.</h1><p>Pick a piece of work you want to improve. Bring the data and what you know about how the work is done, then use AI to help build or improve something you can check yourself.</p><p>Start on your own with <a href="https://resources.onlinesourdough.com/">Resources</a>, or bring the work to <a href="/fermentary/">The Fermentary</a> and we’ll build and review it together.</p><h2>The Onlinesourdough Method</h2><p>Map your business, gather your data, capture your context, build your foundation, put it to work and keep it current.</p><h2>Where Arc’IT AI fits</h2><p><a href="https://arcitai.com/">Arc’IT AI</a> handles custom projects for teams. <a href="/">Return to the onlinesourdough menu</a>.</p></section>`,
  },
];

const indexHtml = await readFile(indexPath, "utf8");
for (const page of pages) {
  const path = page.directory;
  const url = page.url || `${origin}/${path ? `${path}/` : ""}`;
  const html = withPage(indexHtml, page, url);
  const directory = new URL(path ? `${path}/` : "", distUrl);
  if (path) await mkdir(fileURLToPath(directory), { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

await copyFile(indexPath, notFoundPath);
await writeFile(noJekyllPath, "");

function withPage(html, page, url) {
  let result = html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<main id="seo-prerender"[^>]*>[\s\S]*?<\/main>/, `<main id="seo-prerender" aria-label="Site content">${page.body}</main>`);
  result = replaceMeta(result, "name", "description", page.description);
  result = replaceMeta(result, "property", "og:title", page.title);
  result = replaceMeta(result, "property", "og:description", page.description);
  result = replaceMeta(result, "property", "og:url", url);
  result = replaceMeta(result, "property", "og:site_name", "onlinesourdough");
  result = replaceMeta(result, "name", "twitter:title", page.title);
  result = replaceMeta(result, "name", "twitter:description", page.description);
  result = result.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeAttribute(url)}" />`);
  result = result.replace(/\s*<meta name="robots"[^>]*>/, "");
  if (page.noindex) result = result.replace("</head>", '<meta name="robots" content="noindex, follow">\n</head>');
  result = result.replace(/<script id="seo-jsonld"[\s\S]*?<\/script>/, "");
  return result.replace("</head>", `<script id="seo-jsonld" type="application/ld+json">${jsonLd(url, page)}</script>\n</head>`);
}

function replaceMeta(html, attribute, name, content) {
  const key = escapeRegExp(name);
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `${tag}\n</head>`);
}

function jsonLd(url, page) {
  const personId = "https://gustavonline.com/#person";
  const organizationId = `${origin}/#organization`;
  const arcitId = "https://arcitai.com/#organization";
  const graph = [
    {
      "@type": "Person", "@id": personId, name: "Gustav Anderson",
      alternateName: ["gustavonline", "Gustav Online"], url: "https://gustavonline.com/",
      email: "hello@gustavonline.com", jobTitle: "Founder",
      sameAs: ["https://www.youtube.com/@gustavonline", "https://www.linkedin.com/in/gustavandersonn/", "https://x.com/_gustavonline", "https://github.com/gustavonline", `${origin}/`, "https://arcitai.com/"],
      worksFor: [{ "@id": organizationId }, { "@id": arcitId }],
    },
    {
      "@type": "Organization", "@id": organizationId, name: "onlinesourdough",
      url: `${origin}/`, founder: { "@id": personId }, sameAs: ["https://github.com/onlinesourdough"],
    },
    {
      "@type": "Organization", "@id": arcitId, name: "Arc’IT AI",
      url: "https://arcitai.com/", founder: { "@id": personId }, sameAs: ["https://github.com/arcitai"],
    },
    { "@type": "WebSite", "@id": `${origin}/#website`, name: "onlinesourdough", url: `${origin}/`, publisher: { "@id": organizationId } },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": `${origin}/#website` }, publisher: { "@id": organizationId } },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
