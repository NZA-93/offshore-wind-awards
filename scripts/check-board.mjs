import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

const boardCode = fs.readFileSync(path.join(root, "data/board.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(boardCode, sandbox);
const board = sandbox.window.BOARD;

if (!board) fail("BOARD missing");

const expected = {
  "uk-ar4": ["A", "award", "GO", "37.35 £2012/MWh", "gbp-fixed", 37.35],
  "uk-ar5": ["A", "null", "GO", "No offshore award", null, null],
  "uk-ar6": ["A", "award", "GO", "58.87 £2012/MWh", "gbp-fixed", 58.87],
  "uk-ar6-permitted": ["A", "variant", "GO", "54.23 £2012/MWh", null, null],
  "fr-ao4": ["A", "award", "GO", "44.90 €2022/MWh", "eur-fixed", 44.9],
  "fr-ao8": ["A", "award", "WEAK", "66.00 €/MWh", "eur-fixed", 66],
  "ie-oress1": ["A", "award", "WEAK", "86.05 €/MWh", "eur-fixed", 86.05],
  "fr-ao7": ["A", "null", "GO", "No award (no bids)", null, null],
  "fr-ao5": ["B", "award", "GO", "86.45 €2023/MWh", "eur-float", 86.45],
  "fr-ao6-high": ["B", "award", "GO", "92.70 €2024/MWh", "eur-float", 92.7],
  "fr-ao6-low": ["B", "award", "GO", "85.90 €2024/MWh", "eur-float", 85.9],
  "uk-ar6-float": ["B", "award", "GO", "139.93 £2012/MWh", "gbp-float", 139.93],
  "uk-ar4-float": ["B", "award", "GO", "87.30 £2012/MWh", "gbp-float", 87.3],
  "it-ceiling": ["C", "ceiling", "WEAK", "185 €/MWh base d’asta", null, null],
  "pl-phase1": ["D", "award", "WEAK", "319.60 PLN/MWh", "pln", 319.6],
  "pl-2025-a": ["D", "award", "WEAK", "476.88 PLN/MWh", "pln", 476.88],
  "pl-2025-b": ["D", "award", "WEAK", "489.00 PLN/MWh", "pln", 489],
  "pl-2025-c": ["D", "award", "WEAK", "492.32 PLN/MWh", "pln", 492.32],
  "de-2023": ["E", "context", "GO", "1.56–2.07 mn €/MW paid to the state", null, null],
  "de-2024": ["E", "context", "GO", "1.305 mn €/MW and 1.065 mn €/MW, paid to the state", null, null],
  "de-2025": ["E", "null", "GO", "No bids", null, null],
  "nl-alpha": ["E", "context", "GO", "> ~€1 million/year × 40 years", null, null],
  "nl-beta": ["E", "context", "GO", "€20 million/year × 40 years", null, null],
  "dk-thor": ["E", "context", "GO", "0.01 øre/kWh bid floor; expected DKK 2.8 billion to the state", null, null],
  "dk-6gw": ["E", "null", "GO", "No award", null, null],
  "be-gap": ["gap", "gap", null, "Coverage gap — no published price", null, null],
  "es-gap": ["gap", "gap", null, "Coverage gap — no published price", null, null]
};

const rows = board.rows || [];
const ids = rows.map((row) => row.id);
if (new Set(ids).size !== ids.length) fail("duplicate row ids");
const expectedIds = Object.keys(expected);
for (const id of expectedIds) {
  if (!ids.includes(id)) fail("missing row " + id);
}
for (const id of ids) {
  if (!expected[id]) fail("unexpected row " + id);
}

const mwhAxes = new Set(["eur-fixed", "eur-float", "gbp-fixed", "gbp-float", "pln"]);

for (const row of rows) {
  const [band, kind, sign, price, axis, value] = expected[row.id];
  if (row.band !== band) fail(row.id + " band");
  if (row.kind !== kind) fail(row.id + " kind");
  if (row.sign !== sign) fail(row.id + " sign");
  if (row.priceText !== price) fail(row.id + " priceText: " + row.priceText);
  const chartAxis = row.chart ? row.chart.axis : null;
  const chartValue = row.chart ? row.chart.value : null;
  if (chartAxis !== axis) fail(row.id + " axis");
  if (chartValue !== value) fail(row.id + " chart value");
  if (row.sign && row.sign !== "GO" && row.sign !== "WEAK") fail(row.id + " bad sign " + row.sign);
  if (row.band === "E" && row.chart) fail(row.id + " Band E must not be charted");
  if ((row.kind === "null" || row.kind === "gap" || row.kind === "ceiling" || row.kind === "variant") && row.chart) {
    fail(row.id + " should not be a chart bar");
  }
  if (row.kind === "award" && row.priceText.includes("185")) fail(row.id + " award mentions 185");
  if (/^0(?:\.0+)?$/.test(row.priceText.trim())) fail(row.id + " price is a bare zero");
  for (const link of row.links || []) {
    if (!link.href || !link.href.startsWith("https://")) fail(row.id + " bad link");
  }
  if (row.chart && row.chart.display && !row.priceText.startsWith(row.chart.display)) {
    fail(row.id + " chart display does not match priceText");
  }
}

const italy = rows.find((row) => row.id === "it-ceiling");
if (!italy || italy.kind !== "ceiling" || italy.chart) fail("Italy ceiling row is wrong");
if (board.ceilingCard.figure !== "185") fail("ceiling card figure");
if (!/not an award/i.test(board.ceilingCard.badge)) fail("ceiling badge");
if (!board.ceilingCard.points.some((point) => point.includes("181.3") && /not a published clear/i.test(point))) {
  fail("181.3 must stay a scheme rule, not a clear");
}

for (const axis of board.axes) {
  const plotted = rows.filter((row) => row.chart && row.chart.axis === axis.id);
  if (!plotted.length) fail("axis has no rows " + axis.id);
  for (const row of plotted) {
    if (row.chart.value > axis.max) fail(row.id + " exceeds axis max");
    if (row.band === "E") fail("Band E on axis " + axis.id);
  }
  if (axis.id === "eur-fixed" || axis.id === "eur-float") {
    if (axis.ceiling !== 185) fail(axis.id + " ceiling");
    if (!/not an Italian award|not an Italian clear/i.test(axis.caption)) fail(axis.id + " caption");
  } else if (axis.ceiling != null) {
    fail(axis.id + " should not carry the euro ceiling");
  }
  if (!mwhAxes.has(axis.id)) fail("unknown axis " + axis.id);
}

const deNlDk = ["de-2023", "de-2024", "de-2025", "nl-alpha", "nl-beta", "dk-thor", "dk-6gw"];
for (const id of deNlDk) {
  const row = rows.find((item) => item.id === id);
  if (!row || row.band !== "E" || row.chart) fail(id + " left Band E");
}

const years = new Set(board.timeline.map((event) => event.year));
for (const year of ["2021", "2022", "2023", "2024", "2025", "2026"]) {
  if (!years.has(year)) fail("timeline missing " + year);
}

const sourceNumbers = [];
const hrefs = new Set();
for (const group of board.sources) {
  for (const item of group.items) {
    sourceNumbers.push(item.n);
    if (item.href) hrefs.add(item.href);
  }
}
for (const item of board.alsoCited) hrefs.add(item.href);
const uniqueNumbers = [...new Set(sourceNumbers)].sort((a, b) => a - b);
if (uniqueNumbers.length !== 36 || uniqueNumbers[0] !== 1 || uniqueNumbers[35] !== 36) {
  fail("sources must be numbered 1 through 36");
}

for (const row of rows) {
  for (const link of row.links || []) {
    if (!hrefs.has(link.href)) fail("unlisted href on " + row.id + ": " + link.href);
  }
}
for (const link of board.ceilingCard.links) {
  if (!hrefs.has(link.href)) fail("unlisted ceiling href");
}

const plnCallout = board.axes.find((axis) => axis.id === "pln").callout.text;
if (!/Indicative only/i.test(plnCallout) || !plnCallout.includes("112–116") || !plnCallout.includes("4.26")) {
  fail("Poland indicative euro wording");
}
if (plnCallout.includes("185")) fail("do not put 185 on the zloty callout");

const banned = [/scam/i, /cartel/i, /collusion/i, /€95/, /~€95/, /EUR\s*95/];
const publicFiles = [
  "index.html",
  "assets/app.js",
  "assets/styles.css",
  "data/board.js",
  "README.md"
];
for (const file of publicFiles) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) fail(file + " matches " + pattern);
  }
  if (file !== "README.md" && /\bALERT\b/.test(text) && file !== "index.html") {
    fail(file + " uses ALERT");
  }
}

const locked = {
  headline: "Italy has no published offshore award price yet — €185/MWh is a policy ceiling, not a strike.",
  subhead: "Public CfD and auction results across EU peers (≈2021–2026), original units, split by scheme type. Critic: ALERT none. Italy E-1 opacity = WEAK, not inflated awards.",
  italy: "Italy FER 2 — ceiling only (not an award) — dashed/hatched 185, never in strike series",
  fixed: "Fixed-bottom CfD clears (original units) — UK axis: £2012 real; no EU average",
  floating: "Floating offshore — separate cohort",
  poland: "Poland CfD — PLN band (own pane)",
  capacity: "DE · NL · DK — not €/MWh strikes",
  timeline: "Award & scheme timeline ≈2021–2026",
  sources: "Primary sources"
};
if (!board.copy) fail("board.copy missing");
for (const key of Object.keys(locked)) {
  if (key === "headline" || key === "subhead") continue;
  if (board.copy[key] !== locked[key]) fail("copy." + key + " is not the locked string");
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!index.includes("<h1>" + locked.headline + "</h1>")) fail("hero headline is not the locked string");
if (!index.includes("<p class=\"deck\">" + locked.subhead + "</p>")) fail("hero subhead is not the locked string");
const required = [
  "base d’asta",
  "not an awarded Italian strike",
  "ALERT none",
  "WEAK",
  "185",
  "like with like",
  "no single EU average",
  "not an Italian strike",
  "coverage gaps, not zeroes"
];
for (const phrase of required) {
  if (!index.includes(phrase) && !index.toLowerCase().includes(phrase.toLowerCase())) {
    const footerAndHero = index;
    if (!footerAndHero.includes(phrase)) fail("index missing: " + phrase);
  }
}
if (!index.includes('href="assets/styles.css"') || !index.includes('src="data/board.js"')) {
  fail("index should use relative asset paths");
}
if (index.includes('src="/') || index.includes('href="/')) fail("root-absolute asset path");

if ((index.match(/ALERT(?! none)/g) || []).length) fail("index uses ALERT outside “ALERT none”");
if (!index.includes("Critic: ALERT none.")) fail("subhead critic line");

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
if (!readme.includes("https://nza-93.github.io/offshore-wind-awards/")) fail("README missing Pages URL");
if (!readme.includes("data/board.js")) fail("README missing update path");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("board check ok:", rows.length, "rows,", board.sources.reduce((n, group) => n + group.items.length, 0), "sources");
