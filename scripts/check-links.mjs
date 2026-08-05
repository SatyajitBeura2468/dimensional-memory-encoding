const urls = [
  "https://doi.org/10.5281/zenodo.17943112",
  "https://zenodo.org/records/17943112",
  "https://orcid.org/0009-0006-4471-2845",
  "https://github.com/SatyajitBeura2468/dimensional-memory-encoding",
  "https://dimensional-memory-encoding.vercel.app",
  "https://dimensional-memory-encoding.vercel.app/paper",
  "https://dimensional-memory-encoding.vercel.app/evidence",
  "https://dimensional-memory-encoding.vercel.app/lab",
  "https://dimensional-memory-encoding.vercel.app/history",
];

async function check(url) {
  if (url.startsWith("https://doi.org/")) {
    if (!/^https:\/\/doi\.org\/10\.5281\/zenodo\.\d+$/.test(url)) {
      throw new Error("DOI format is invalid");
    }
    console.log(
      `ok ${url} (format validated; redirect endpoint may rate-limit CI)`,
    );
    return;
  }
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
      });
      if (response.ok || [403, 405].includes(response.status)) return;
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
    } finally {
      clearTimeout(timer);
    }
  }
}

const failures = [];
for (const url of urls) {
  try {
    await check(url);
    console.log(`ok ${url}`);
  } catch (error) {
    failures.push(`${url}: ${error.message}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
