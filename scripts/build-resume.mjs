// Builds public/resume.pdf from the same JSON data the site renders, so the two stay in sync.
// Usage: npm run resume (set CHROME_PATH if Chrome is not in the default macOS location).
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file) =>
  JSON.parse(readFileSync(join(root, "src/data", file), "utf8"));

const resume = readJson("resume.json");
const { career } = readJson("career.json");
const { education } = readJson("education.json");
const { socials } = readJson("socials.json");

const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const output = join(root, "public/resume.pdf");

const escape = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const link = (href, label) =>
  href && href !== "#"
    ? `<a href="${escape(href)}">${escape(label)}</a>`
    : escape(label);

// "Feb 2024" -> "2024"; the resume shows years only
const year = (date) => (date === "Present" ? date : date?.split(" ").pop());

function period({ start, end }) {
  const [from, to] = [year(start), year(end)];
  if (!from) return to ?? "";
  return !to || from === to ? from : `${from} – ${to}`;
}

// resume.json "omit" lists bullet prefixes per company that the site shows but the resume leaves out
function resumeBullets({ name, description = [] }) {
  const omitted = resume.omit?.[name] ?? [];
  const stale = omitted.filter(
    (prefix) => !description.some((line) => line.startsWith(prefix)),
  );
  if (stale.length) {
    throw new Error(
      `resume.json omit entries for "${name}" match no bullet in career.json: ${stale.join("; ")}`,
    );
  }
  return description.filter(
    (line) => !omitted.some((prefix) => line.startsWith(prefix)),
  );
}

function entry(item) {
  const location = resume.locations[item.name];
  const heading = location ? `${item.name}, ${location}` : item.name;
  const bullets = resumeBullets(item)
    .map((line) => `<li>${escape(line)}</li>`)
    .join("");

  return `
    <section class="entry">
      <div class="entry-head">
        <div class="entry-name">${link(item.href, heading)}</div>
        <div class="entry-period">${escape(period(item))}</div>
      </div>
      <div class="entry-title">${escape(item.title)}</div>
      ${bullets ? `<ul>${bullets}</ul>` : ""}
    </section>`;
}

const contactLinks = [
  ...socials.map((social) =>
    social.name === "Email"
      ? link(social.href, social.href.replace("mailto:", ""))
      : link(social.href, social.name),
  ),
  link(resume.website, resume.website.replace("https://", "")),
].join(" • ");

const photo = readFileSync(join(root, "public/ivan.jpg")).toString("base64");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escape(resume.name)} CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
  @page {
    size: A4;
    margin: 12mm 16mm 14mm;
    @bottom-right {
      content: "Page " counter(page) " | " counter(pages);
      font: 8pt Inter, sans-serif;
      color: #6b7280;
    }
  }
  :root { --accent: #1d5b8c; --muted: #4b5563; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 9.5pt/1.3 Inter, sans-serif;
    color: #111827;
  }
  a { color: inherit; text-decoration: none; }
  header {
    display: flex;
    gap: 14px;
    align-items: center;
    padding-left: 10px;
    border-left: 4px solid var(--accent);
  }
  header img { width: 78px; height: 78px; border-radius: 6px; object-fit: cover; }
  .identity { flex: 1; }
  .identity h1 { margin: 0; font-size: 22pt; line-height: 1.1; color: var(--accent); }
  .identity .role { font-size: 11pt; color: var(--accent); }
  .contact { text-align: right; color: var(--accent); font-size: 8.5pt; line-height: 1.6; }
  .contact a { text-decoration: underline; }
  .summary { margin: 12px 0 0; color: var(--accent); }
  h2 {
    margin: 14px 0 6px;
    font-size: 13pt;
    color: var(--accent);
    break-after: avoid;
  }
  table.proficiencies { border-collapse: collapse; }
  .proficiencies th {
    padding: 2px 24px 2px 0;
    text-align: left;
    font-weight: 600;
    color: var(--accent);
    white-space: nowrap;
  }
  .proficiencies td { padding: 2px 0; }
  .entry { margin-bottom: 8px; break-inside: avoid; }
  .entry-head {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: var(--accent);
  }
  .entry-title { color: var(--accent); }
  ul { margin: 4px 0 0; padding-left: 18px; }
  li { margin-bottom: 1px; break-inside: avoid; }
</style>
</head>
<body>
  <header>
    <img src="data:image/jpeg;base64,${photo}" alt="">
    <div class="identity">
      <h1>${escape(resume.name)}</h1>
      <div class="role">${escape(resume.title)}</div>
    </div>
    <div class="contact">
      <div>${escape(resume.location)} • ${escape(resume.phone)}</div>
      <div>${contactLinks}</div>
      <div>${escape(resume.birth)} • ${escape(resume.nationality)}</div>
    </div>
  </header>

  <p class="summary">${escape(resume.summary)}</p>

  <h2>Technical Proficiencies</h2>
  <table class="proficiencies">
    ${resume.proficiencies
      .map(
        ({ label, items }) =>
          `<tr><th>${escape(label)}:</th><td>${items.map(escape).join(" | ")}</td></tr>`,
      )
      .join("")}
  </table>

  <h2>Career Experience</h2>
  ${career.map(entry).join("")}

  <h2>Education</h2>
  ${education.map(entry).join("")}
</body>
</html>`;

const workdir = mkdtempSync(join(tmpdir(), "resume-"));
try {
  const page = join(workdir, "resume.html");
  writeFileSync(page, html);
  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      `--user-data-dir=${join(workdir, "profile")}`,
      `--print-to-pdf=${output}`,
      `file://${page}`,
    ],
    { stdio: "ignore" },
  );
} finally {
  rmSync(workdir, { recursive: true, force: true });
}

console.log(`Wrote ${output}`);
