# Offshore wind public-award price board

A free static site comparing Italy’s FER 2 offshore **reference ceiling** with EU peer clears from 2021 to 2026. Scheme types stay in separate bands. Prices stay in the units in which they were published.

**Live site:** https://nza-93.github.io/offshore-wind-awards/

GitHub Pages serves this repository from the **main** branch, **root** folder (`/`). The Pages URL above is the project site for `NZA-93/offshore-wind-awards`.

## What the board shows

Italy has **no published E-1 (offshore) clearing** in 2021–2026. **€185/MWh is the FER 2 Allegato 1 base d’asta** — a reference ceiling, not an awarded strike. The critic sign on that gap is **WEAK** (opacity). **ALERT none.**

| Band | What it is | Where it sits |
| --- | --- | --- |
| A | Fixed-bottom energy CfD (UK AR4/AR5/AR6, France AO4/AO8, Ireland ORESS 1) | Own charts. UK in real 2012 £. Euro peers on a separate euro chart. |
| B | Floating CfD (France AO5/AO6, UK AR6 floating, plus the small UK AR4 floating pot) | Separate charts. Not mixed into Band A. |
| C | Italy scheme reference | Ceiling card and a dashed mark. Never a bar, never labelled as a strike. |
| D | Poland PLN CfD | Zloty chart. Indicative euro is labelled and not plotted. |
| E | Germany €/MW pay-to-state, Netherlands site €/year, Denmark Thor and the failed 6 GW package | Separate panel. Not on any €/MWh chart. |

Null rounds (UK AR5, France AO7, Germany 2025, Denmark’s 6 GW package) are market discipline, not zeroes. Belgium and Spain are coverage gaps, not zeroes.

Charts are HTML bars, not a canvas, so every price is text in the page. Data lives in one file.

## Update the figures

1. Edit [`data/board.js`](data/board.js) only. Do not type a new price into `index.html` or `assets/app.js`.
2. Keep Italy’s row at `kind: "ceiling"` and `chart: null`. The euro charts read the ceiling from `axes[].ceiling` (185) and draw a dashed mark, not a bar.
3. Keep UK rows in real 2012 pounds. Do not add a euro rebase unless it is explicitly marked indicative and carries the CPI and FX date. Do not treat an indicative rebase as an official clear.
4. Do not put Germany, the Netherlands, or Denmark on an `axis` of `eur-fixed`, `eur-float`, `gbp-fixed`, `gbp-float`, or `pln`.
5. Leave failed rounds as `kind: "null"` with a words price such as `No award`. Do not use `0` as the price.
6. Run the lock check:

```bash
node scripts/check-board.mjs
```

7. Commit to `main`. Pages republishes the root on the next build.

Preview locally from the repository root:

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/ . Filters are `?band=A` through `?band=E`, plus `?band=N` for nulls and gaps.

## Pages setup

The site is the repository root (`index.html`, `assets/`, `data/`). `.nojekyll` stops Jekyll from touching those paths.

In the repository: **Settings → Pages → Build and deployment → Deploy from a branch → Branch: `main` / Folder: `/ (root)` → Save.**

The published URL is https://nza-93.github.io/offshore-wind-awards/ .

## Hard rules for the next edit

- Never label €185/MWh as an awarded Italian strike.
- Do not add an alert claim. WEAK is allowed when it is a process, source, or opacity note.
- Do not average bands into one EU €/MWh.
- Do not invent prices. The research date on the current figures is 2026-09-21.
