import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const template = await readFile(join(dist, "index.html"), "utf8");
const meta = JSON.parse(
  await readFile(join(root, "..", "src", "data", "routeMeta.json"), "utf8"),
);
const origin = "https://dimensional-memory-encoding.vercel.app";
const ogImage = `${origin}/og-preview.png`;

function htmlFor(path, values) {
  const canonical = `${origin}${path === "/" ? "/" : path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": path === "/paper" ? "ScholarlyArticle" : "WebSite",
    name: values.title,
    url: canonical,
    description: values.description,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "Satyajit Beura",
      url: "https://orcid.org/0009-0006-4471-2845",
      identifier: "https://orcid.org/0009-0006-4471-2845",
    },
    publisher: { "@type": "Person", name: "Satyajit Beura" },
    license: "https://opensource.org/license/mit",
    version: path === "/paper" ? "3.0" : undefined,
    datePublished: path === "/paper" ? "2026-08-03" : undefined,
    codeRepository:
      "https://github.com/SatyajitBeura2468/dimensional-memory-encoding",
    sameAs: ["https://doi.org/10.5281/zenodo.17943112"],
  };
  const tags = `
    <title>${values.title}</title>
    <meta name="description" content="${values.description}" />
    <meta name="robots" content="${values.robots}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${values.title}" />
    <meta property="og:description" content="${values.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="${path === "/paper" ? "article" : "website"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${values.title}" />
    <meta name="twitter:description" content="${values.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  const removeMeta = (attribute, value) =>
    new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*>`, "gi");
  return template
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(removeMeta("name", "description"), "")
    .replace(removeMeta("name", "robots"), "")
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, "")
    .replace(removeMeta("property", "og:title"), "")
    .replace(removeMeta("property", "og:description"), "")
    .replace(removeMeta("property", "og:type"), "")
    .replace(removeMeta("property", "og:image"), "")
    .replace(removeMeta("property", "og:url"), "")
    .replace(removeMeta("name", "twitter:card"), "")
    .replace(removeMeta("name", "twitter:title"), "")
    .replace(removeMeta("name", "twitter:description"), "")
    .replace(removeMeta("name", "twitter:image"), "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "")
    .replace("</head>", `${tags}\n  </head>`);
}

for (const [path, values] of Object.entries(meta)) {
  const target =
    path === "/"
      ? join(dist, "index.html")
      : join(dist, path.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, htmlFor(path, values));
  if (path !== "/")
    await writeFile(join(dist, `${path.slice(1)}.html`), htmlFor(path, values));
}

await cp(join(dist, "index.html"), join(dist, "404.html"));
const notFound = htmlFor("/404", meta["/404"]);
await writeFile(join(dist, "404.html"), notFound);
