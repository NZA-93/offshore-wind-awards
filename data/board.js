/* Public price board data. Edit this file only when a primary source changes.
   Research date 2026-09-21. Do not add prices that are not in the Scout tables
   or the briefing. Italy 185 is a ceiling (kind: "ceiling"), never an award.
   Run: node scripts/check-board.mjs
*/
window.BOARD = {
  researchDate: "2026-09-21",
  timezone: "Europe/Berlin",
  pagesUrl: "https://nza-93.github.io/offshore-wind-awards/",
  repoUrl: "https://github.com/NZA-93/offshore-wind-awards",

  copy: {
    italy: "Italy FER 2 — ceiling only (not an award) — dashed/hatched 185, never in strike series",
    fixed: "Fixed-bottom CfD clears (original units) — UK axis: £2012 real; no EU average",
    floating: "Floating offshore — separate cohort",
    poland: "Poland CfD — PLN band (own pane)",
    capacity: "DE · NL · DK — not €/MWh strikes",
    timeline: "Award & scheme timeline ≈2021–2026",
    sources: "Primary sources"
  },

  comeFunziona: {
    itTitle: "Come funziona (asta → bolletta)",
    enTitle: "How it works (award → bill)",
    itBody: "L’asta fissa un prezzo-obiettivo per MWh. L’impianto vende sul mercato. Se il mercato è più basso, un fondo pubblico integra; se è più alto, il produttore restituisce (strip). In bolletta arriva solo il saldo netto (in Italia: oneri / ASOS; in UK: Supplier Obligation) — non “185 € a kWh”. I 185 €/MWh FER 2 offshore sono ancora solo base d’asta / tetto, non un premio assegnato (nessuna graduatoria E-1 pubblicata).",
    enBody: "The auction sets a target £/€ per MWh. The plant still sells on the wholesale market. Market low → public top-up; market high → plant pays back (strip). Bills see only the net levy (IT ASOS / UK Supplier Obligation) — not “€185 per kWh.” Italy’s €185/MWh offshore figure remains FER 2’s base d’asta / ceiling only — no published E-1 award yet."
  },

  ceilingCard: {
    showOn: ["all", "C"],
    figure: "185",
    unit: "€/MWh",
    badge: "2024 base d’asta · Allegato 1 · not an award",
    points: [
      "No E-1 graduatoria is published. GSE rankings in this window cover other technology groups, not offshore wind.",
      "3,800 MW is the 2024–2028 contingent, not a volume awarded in a round.",
      "Plants above 300 kW must bid at least 2% under the reference. If that reference stayed unchanged, the effective maximum award would be ≤ ~181.3 €/MWh. That is a scheme rule, not a published clear.",
      "The reference is reduced by 3% a year from 2025 (from 2026 for plants at or below 300 kW). Later-year reference levels are not listed here: the decree states the rule, and no E-1 clear has used it.",
      "Offshore wind’s conventional life in Allegato 1 is 25 years. Article 12 allows an optional capital grant up to 40% if the tariff is removed. There is no ranking yet on which to read that stack.",
      "FER X results in this window are onshore technologies. Offshore wind stays under FER 2."
    ],
    links: [
      { n: 1, label: "MASE FER 2 decree", href: "https://www.mase.gov.it/portale/documents/d/guest/dm_19-06-2024_fer2-pdf" },
      { n: 4, label: "GSE graduatorie", href: "https://www.gse.it/servizi-per-te/fonti-rinnovabili/fer2/graduatorie" }
    ]
  },

  axes: [
    {
      id: "eur-fixed",
      group: "fixed",
      showOn: ["all", "A", "C"],
      kicker: "Euro",
      caption: "Published fixed-bottom clears in euro, as awarded. The dashed mark is Italy’s 2024 base d’asta ceiling at 185 €/MWh. It is not an Italian award. Sterling, zloty, and floating clears are not on this chart. The scale runs from 0 to 200.",
      whenC: "These bars are French and Irish awards. Italy is only the dashed ceiling.",
      max: 200,
      ticks: [0, 50, 100, 150, 185],
      ceiling: 185,
      tone: "a"
    },
    {
      id: "gbp-fixed",
      group: "fixed",
      showOn: ["all", "A"],
      kicker: "£2012 real",
      caption: "Official CfD convention: real 2012 £ per MWh. The Italian reference is a euro ceiling, so it is not drawn on this sterling axis. No euro rebase is shown.",
      max: 80,
      ticks: [0, 20, 40, 60, 80],
      ceiling: null,
      tone: "a",
      callout: {
        kicker: "No euro conversion",
        text: "These clears stay in real 2012 pounds, as published. A euro rebase would be indicative only and would need a dated consumer-price path and an exchange-rate date. This board does not plot one."
      },
      aside: "In the register, not drawn as a headline bar: AR6 permitted reduction, 54.23 £2012/MWh, for 1,578.51 MW. The fixed-bottom clear for the round is 58.87."
    },
    {
      id: "eur-float",
      group: "floating",
      showOn: ["all", "B"],
      kicker: "Euro",
      caption: "Floating clears only. They sit above fixed-bottom prices with a technology reason. The dashed mark repeats the Italian ceiling at 185 €/MWh so the headroom is visible. That mark is not a floating award and not an Italian clear. Scale 0 to 200, same endpoints as the fixed-bottom euro chart.",
      max: 200,
      ticks: [0, 50, 100, 150, 185],
      ceiling: 185,
      tone: "b"
    },
    {
      id: "gbp-float",
      group: "floating",
      showOn: ["all", "B"],
      kicker: "£2012 real",
      caption: "Separate from the fixed-bottom pound chart. AR4’s floating pot is 32 MW; AR6’s is 400 MW. No euro ceiling is drawn on a sterling axis.",
      max: 160,
      ticks: [0, 40, 80, 120, 160],
      ceiling: null,
      tone: "b",
      callout: {
        kicker: "No euro conversion",
        text: "Floating sterling clears stay in real 2012 pounds. They are not converted, and they are not averaged with the fixed-bottom pot."
      }
    },
    {
      id: "pln",
      group: "poland",
      showOn: ["all", "D"],
      kicker: "",
      caption: "Own band. Phase I is administrative; the 2025 auction is competitive. The Italian ceiling is in euro and is not drawn on a zloty axis. The scale runs from 0 to 600.",
      max: 600,
      ticks: [0, 200, 400, 600],
      ceiling: null,
      tone: "d",
      callout: {
        kicker: "Indicative euro — not plotted",
        text: "Indicative only, and not an official euro clear: the three 2025 strikes are about 112–116 €/MWh if divided by ~4.26 zloty per euro (September 2025 NBP, about 4.26). Phase I is a different mode and a different year. The tight 2025 range is a transparency watch. It is not treated here as anything beyond the published bids."
      }
    }
  ],

  rows: [
    {
      id: "uk-ar4",
      band: "A",
      kind: "award",
      year: "2022",
      country: "United Kingdom",
      round: "CfD Allocation Round 4, fixed-bottom",
      priceText: "37.35 £2012/MWh",
      capacity: "6,994.34 MW fixed offshore",
      sign: "GO",
      note: "Multi-winner competitive clear for the fixed-bottom pot. The briefing rounds this pot to 6,994 MW, about 7 GW. Real 2012 pounds, CPI-indexed under CfD rules. Winners include Hornsea 3, Norfolk Boreas phase 1, East Anglia 3 phase 1, Inch Cape phase 1, and Moray West.",
      chart: { axis: "gbp-fixed", value: 37.35, name: "UK AR4", sub: "2022 · fixed-bottom", display: "37.35", unit: "£2012/MWh" },
      links: [
        { n: 8, label: "AR4 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-4-results/contracts-for-difference-cfd-allocation-round-4-results-accessible-webpage" }
      ]
    },
    {
      id: "uk-ar5",
      band: "A",
      kind: "null",
      year: "2023",
      country: "United Kingdom",
      round: "CfD Allocation Round 5",
      priceText: "No offshore award",
      capacity: "None awarded (briefing: 0 MW offshore)",
      sign: "GO",
      note: "No offshore wind award. The briefing records capacity 0 because nothing was awarded. The ceiling bound the round. That is market discipline, not a price of zero, and not an input to an average.",
      chart: null,
      links: [
        { n: 9, label: "AR5 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-5-results/contracts-for-difference-cfd-allocation-round-5-results-accessible-webpage" },
        { label: "Commons briefing PDF", href: "https://researchbriefings.files.parliament.uk/documents/CBP-9871/CBP-9871.pdf" }
      ]
    },
    {
      id: "uk-ar6",
      band: "A",
      kind: "award",
      year: "2024",
      country: "United Kingdom",
      round: "CfD Allocation Round 6, fixed-bottom",
      priceText: "58.87 £2012/MWh",
      capacity: "3,363.07 MW fixed offshore",
      sign: "GO",
      note: "Competitive fixed-bottom clear after the AR5 null. Real 2012 pounds. The briefing rounds capacity to 3,363 MW. The permitted-reduction strike of 54.23 £2012/MWh is a separate register row, not this bar. Floating is Band B.",
      chart: { axis: "gbp-fixed", value: 58.87, name: "UK AR6", sub: "2024 · fixed-bottom", display: "58.87", unit: "£2012/MWh" },
      links: [
        { n: 10, label: "AR6 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-6-results/contracts-for-difference-cfd-allocation-round-6-results-accessible-webpage" },
        { n: 11, label: "AR6 PDF", href: "https://assets.publishing.service.gov.uk/media/66d6ad7c6eb664e57141db4b/Contracts_for_Difference_Allocation_Round_6_results.pdf" }
      ]
    },
    {
      id: "uk-ar6-permitted",
      band: "A",
      kind: "variant",
      year: "2024",
      country: "United Kingdom",
      round: "CfD Allocation Round 6, permitted reduction",
      priceText: "54.23 £2012/MWh",
      capacity: "1,578.51 MW",
      sign: "GO",
      note: "Published permitted-reduction strike. Not the headline fixed-bottom clear, which is 58.87 £2012/MWh. Kept in the register so the figure is not dropped. Not drawn as a second headline bar.",
      chart: null,
      links: [
        { n: 10, label: "AR6 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-6-results/contracts-for-difference-cfd-allocation-round-6-results-accessible-webpage" }
      ]
    },
    {
      id: "fr-ao4",
      band: "A",
      kind: "award",
      year: "2023",
      country: "France",
      round: "AO4 Centre Manche 1",
      priceText: "44.90 €2022/MWh",
      capacity: "~1,500 MW (band)",
      sign: "GO",
      note: "Competitive CRE path. Nominal as awarded, in 2022 euro. A later indexed quotation near 43.8 €2024 is not the figure used here. Winner: Éoliennes en Mer Manche Normandie. The direct CRE PDF is not in the source list; the link is the secondary cross-check.",
      chart: { axis: "eur-fixed", value: 44.9, name: "FR AO4", sub: "2023 · fixed-bottom", display: "44.90", unit: "€2022/MWh" },
      links: [
        { n: 30, label: "AO4 cross-check", href: "https://www.eoliennesenmer.fr/facades-maritimes-en-france/facade-manche-mer-du-nord/projet-centre-manche/centre-manche-1" }
      ]
    },
    {
      id: "fr-ao8",
      band: "A",
      kind: "award",
      year: "2025",
      country: "France",
      round: "AO8 Centre Manche 2",
      priceText: "66.00 €/MWh",
      capacity: "1,400–1,600 MW (band)",
      sign: "WEAK",
      signHint: "process",
      note: "Published offer, under a 70 €/MWh cap. The minister selected the second-ranked bid rather than the CRE preference. The critic sign is WEAK for that process. Winner: a TotalEnergies-led group.",
      chart: { axis: "eur-fixed", value: 66, name: "FR AO8", sub: "2025 · fixed-bottom · WEAK process", display: "66.00", unit: "€/MWh" },
      links: [
        { n: 27, label: "CRE AO7/AO8 instruction", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2025/250624_2025-165_Instruction_AO8.pdf" },
        { n: 29, label: "TotalEnergies note", href: "https://totalenergies.com/newsroom/france-totalenergies-selected-state-operator-countrys-largest-renewable-energy/?lang=eng" }
      ]
    },
    {
      id: "ie-oress1",
      band: "A",
      kind: "award",
      year: "2023",
      country: "Ireland",
      round: "ORESS 1 final auction results",
      priceText: "86.05 €/MWh",
      capacity: "3,074 MW",
      sign: "WEAK",
      signHint: "transparency",
      note: "DEQ-weighted average of successful offers. Individual strikes are not published in OR1FAR, so transparency is WEAK. Competitive round. The max offer safeguard was 150 €/MWh and is not a clear. Winners: Dublin Array, Sceirde Rocks, NISA, and Codling.",
      chart: { axis: "eur-fixed", value: 86.05, name: "IE ORESS 1", sub: "2023 · weighted average · WEAK transparency", display: "86.05", unit: "€/MWh" },
      links: [
        { n: 34, label: "EirGrid OR1FAR", href: "https://cms.eirgrid.ie/sites/default/files/publications/ORESS-1-Final-Auction-Results-%28OR1FAR%29.pdf" }
      ]
    },
    {
      id: "fr-ao7",
      band: "A",
      kind: "null",
      year: "2025",
      country: "France",
      round: "AO7 Oléron",
      priceText: "No award (no bids)",
      capacity: "—",
      sign: "GO",
      note: "No bids. The cap constrained the round. Not a price of zero, and not an input to an average. Recorded in the CRE instruction that also covers AO8.",
      chart: null,
      links: [
        { n: 27, label: "CRE AO7/AO8 instruction", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2025/250624_2025-165_Instruction_AO8.pdf" },
        { n: 28, label: "CRE news", href: "https://www.cre.fr/actualites/toute-lactualite/la-cre-publie-les-deliberations-relatives-a-son-instruction-des-procedures-concurrentielles-ao7-et-ao8-portant-sur-des-installations-deoliennes-en-mer-posees-respectivement-au-large-de-lile-doleron-et-au-sein-de-la-zone-centre-manche.html" }
      ]
    },
    {
      id: "fr-ao5",
      band: "B",
      kind: "award",
      year: "2024",
      country: "France",
      round: "AO5 Bretagne Sud (floating)",
      priceText: "86.45 €2023/MWh",
      capacity: "~250 MW",
      sign: "GO",
      note: "Floating. Nominal as awarded, in 2023 euro. Higher than fixed-bottom clears, with a technology reason. Not a fixed-bottom peer. The CRE AO6 deliberation cites this 86.45 figure; the WindEurope note is a summary of the official result.",
      chart: { axis: "eur-float", value: 86.45, name: "FR AO5", sub: "2024 · floating", display: "86.45", unit: "€2023/MWh" },
      links: [
        { n: 26, label: "CRE AO6 deliberation (cites AO5)", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2024/241129_2024-211_Instruction_AO6.pdf" },
        { label: "WindEurope summary", href: "https://windeurope.org/news/french-auction-results-are-not-the-new-benchmark-for-floating-wind-in-europe/" }
      ]
    },
    {
      id: "fr-ao6-high",
      band: "B",
      kind: "award",
      year: "2024",
      country: "France",
      round: "AO6 Méditerranée floating, published offer",
      priceText: "92.70 €2024/MWh",
      capacity: "~250 MW (one of two sites)",
      sign: "GO",
      note: "Floating, nominal 2024 euro. One of the two published offers (92.70 and 85.90). About 250 MW for the site. Proposed laureates are named as a pair; this board does not split the company names across the two prices.",
      chart: { axis: "eur-float", value: 92.7, name: "FR AO6", sub: "2024 · floating · offer", display: "92.70", unit: "€2024/MWh" },
      links: [
        { n: 26, label: "CRE AO6 deliberation", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2024/241129_2024-211_Instruction_AO6.pdf" }
      ]
    },
    {
      id: "fr-ao6-low",
      band: "B",
      kind: "award",
      year: "2024",
      country: "France",
      round: "AO6 Méditerranée floating, published offer",
      priceText: "85.90 €2024/MWh",
      capacity: "~250 MW (one of two sites)",
      sign: "GO",
      note: "Floating, nominal 2024 euro. The other of the two published offers (92.70 and 85.90). About 250 MW for the site. Same CRE deliberation as the paired offer.",
      chart: { axis: "eur-float", value: 85.9, name: "FR AO6", sub: "2024 · floating · offer", display: "85.90", unit: "€2024/MWh" },
      links: [
        { n: 26, label: "CRE AO6 deliberation", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2024/241129_2024-211_Instruction_AO6.pdf" }
      ]
    },
    {
      id: "uk-ar6-float",
      band: "B",
      kind: "award",
      year: "2024",
      country: "United Kingdom",
      round: "CfD Allocation Round 6, floating",
      priceText: "139.93 £2012/MWh",
      capacity: "400 MW",
      sign: "GO",
      note: "Floating pot. Real 2012 pounds. Technology cohort, separate from the 58.87 fixed-bottom clear.",
      chart: { axis: "gbp-float", value: 139.93, name: "UK AR6 floating", sub: "2024 · 400 MW", display: "139.93", unit: "£2012/MWh" },
      links: [
        { n: 10, label: "AR6 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-6-results/contracts-for-difference-cfd-allocation-round-6-results-accessible-webpage" }
      ]
    },
    {
      id: "uk-ar4-float",
      band: "B",
      kind: "award",
      year: "2022",
      country: "United Kingdom",
      round: "CfD Allocation Round 4, floating",
      priceText: "87.30 £2012/MWh",
      capacity: "32 MW",
      sign: "GO",
      note: "Floating pot recorded beside the AR4 fixed-bottom clear of 37.35. Real 2012 pounds. Small volume, 32 MW. Not part of the fixed-bottom clear.",
      chart: { axis: "gbp-float", value: 87.3, name: "UK AR4 floating", sub: "2022 · 32 MW", display: "87.30", unit: "£2012/MWh" },
      links: [
        { n: 8, label: "AR4 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-4-results/contracts-for-difference-cfd-allocation-round-4-results-accessible-webpage" }
      ]
    },
    {
      id: "it-ceiling",
      band: "C",
      kind: "ceiling",
      year: "2024",
      country: "Italy",
      round: "FER 2 Procedure E-1, Allegato 1",
      priceText: "185 €/MWh base d’asta",
      capacity: "3,800 MW contingent, 2024–2028 (not awarded)",
      sign: "WEAK",
      signHint: "no award",
      note: "Reference ceiling only (base d’asta). Not an awarded strike. No E-1 winners and no published clearing. The critic sign is WEAK because the award is unpublished. If the reference were unchanged, a minimum 2% discount would mean an effective maximum award ≤ ~181.3 €/MWh — still not a clear. The reference moves −3% a year from 2025.",
      chart: null,
      links: [
        { n: 1, label: "MASE FER 2 decree", href: "https://www.mase.gov.it/portale/documents/d/guest/dm_19-06-2024_fer2-pdf" },
        { n: 4, label: "GSE graduatorie", href: "https://www.gse.it/servizi-per-te/fonti-rinnovabili/fer2/graduatorie" }
      ]
    },
    {
      id: "pl-phase1",
      band: "D",
      kind: "award",
      year: "2021",
      country: "Poland",
      round: "Offshore Act Phase I, administrative",
      priceText: "319.60 PLN/MWh",
      capacity: "Multi-GW administrative path (not one auction volume)",
      sign: "WEAK",
      signHint: "thin source",
      note: "Reported support price on an administrative path, not a competitive auction. The secondary article is thin; the URE BIP decision PDF was not in this pass. Verify that primary before any stronger reading. Named projects include Baltica 2/3 and peers.",
      chart: { axis: "pln", value: 319.6, name: "PL Phase I", sub: "2021 · administrative · WEAK source", display: "319.60", unit: "PLN/MWh" },
      links: [
        { n: 33, label: "Secondary report", href: "https://offshorewindpoland.pl/prezes-ure-wydal-decyzje-dot-ceny-wsparcia-dla-morskich-farm-baltyk-2-i-3/" }
      ]
    },
    {
      id: "pl-2025-a",
      band: "D",
      kind: "award",
      year: "2025",
      country: "Poland",
      round: "AMFW/1/2025, published clear",
      priceText: "476.88 PLN/MWh",
      capacity: "Part of 3,435 MW (round total)",
      sign: "WEAK",
      signHint: "tight range",
      note: "Competitive Phase II auction. One of three published clears, listed in source order with Baltic East (Orlen Neptun VIII), Baltica 9, and Bałtyk I. This board does not assert a company for each price beyond that order. 25-year negative-balance CfD. Primary URE record exists. Indicative euro is not plotted; see the chart note.",
      chart: { axis: "pln", value: 476.88, name: "PL 2025", sub: "AMFW/1/2025 · competitive", display: "476.88", unit: "PLN/MWh" },
      links: [
        { n: 31, label: "URE news", href: "https://www.ure.gov.pl/en/communication/news/486,Offshore-First-auction-for-offshore-wind-farms-concluded.html" },
        { label: "URE results PDF", href: "https://www.ure.gov.pl/download/9/15907/InformacjawynikiaukcjiAMWF12025.pdf" }
      ]
    },
    {
      id: "pl-2025-b",
      band: "D",
      kind: "award",
      year: "2025",
      country: "Poland",
      round: "AMFW/1/2025, published clear",
      priceText: "489.00 PLN/MWh",
      capacity: "Part of 3,435 MW (round total)",
      sign: "WEAK",
      signHint: "tight range",
      note: "Second of the three published competitive clears in AMFW/1/2025, in source order. Same round total, 3,435 MW. Same URE sources. Indicative euro is not plotted.",
      chart: { axis: "pln", value: 489, name: "PL 2025", sub: "AMFW/1/2025 · competitive", display: "489.00", unit: "PLN/MWh" },
      links: [
        { n: 31, label: "URE news", href: "https://www.ure.gov.pl/en/communication/news/486,Offshore-First-auction-for-offshore-wind-farms-concluded.html" },
        { label: "URE results PDF", href: "https://www.ure.gov.pl/download/9/15907/InformacjawynikiaukcjiAMWF12025.pdf" }
      ]
    },
    {
      id: "pl-2025-c",
      band: "D",
      kind: "award",
      year: "2025",
      country: "Poland",
      round: "AMFW/1/2025, published clear",
      priceText: "492.32 PLN/MWh",
      capacity: "Part of 3,435 MW (round total)",
      sign: "WEAK",
      signHint: "tight range",
      note: "Third of the three published competitive clears in AMFW/1/2025, in source order. The three strikes sit close together. That is a watch on the critic memo, and this board stops at the published bids.",
      chart: { axis: "pln", value: 492.32, name: "PL 2025", sub: "AMFW/1/2025 · competitive", display: "492.32", unit: "PLN/MWh" },
      links: [
        { n: 31, label: "URE news", href: "https://www.ure.gov.pl/en/communication/news/486,Offshore-First-auction-for-offshore-wind-farms-concluded.html" },
        { label: "URE results PDF", href: "https://www.ure.gov.pl/download/9/15907/InformacjawynikiaukcjiAMWF12025.pdf" }
      ]
    },
    {
      id: "de-2023",
      band: "E",
      kind: "context",
      year: "2023",
      country: "Germany",
      round: "BNetzA dynamic auction (not centrally pre-investigated)",
      priceText: "1.56–2.07 mn €/MW paid to the state",
      capacity: "7,000 MW",
      sign: "GO",
      note: "Developers pay the state. Dynamic bids after 0 ct/kWh energy offers. The scout note records an average around €1.8 million per MW. Not an energy strike, and not on the €/MWh charts. The briefing’s 2023–24 dynamic span is about 1.06–2.07 mn €/MW. Winners: bp and North Sea / Baltic Sea offshore vehicles.",
      chart: null,
      links: [
        { n: 15, label: "BNetzA PDF", href: "https://www.bundesnetzagentur.de/SharedDocs/Downloads/EN/BNetzA/PressSection/PressReleases/2023/20231207_OffshoreResults.pdf?__blob=publicationFile&v=1" },
        { n: 13, label: "BNetzA EN press", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2023/20230712_OffshoreResults.html" }
      ]
    },
    {
      id: "de-2024",
      band: "E",
      kind: "context",
      year: "2024",
      country: "Germany",
      round: "BNetzA dynamic auction",
      priceText: "1.305 mn €/MW and 1.065 mn €/MW, paid to the state",
      capacity: "Sites N-11.2 and N-12.3",
      sign: "GO",
      note: "Paid to the state, with 0 ct/kWh energy bids. Two published dynamic bids. Proceeds €3.0225 billion. The briefing rounds this pair to about 1.07–1.31 mn €/MW. Winners: Offshore Wind One and EnBW Offshore PG 1. Sites are not split per bid here. Not a €/MWh strike.",
      chart: null,
      links: [
        { label: "BNetzA EN press", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240613_BK6_Offshore.html" },
        { n: 16, label: "BNetzA DE press", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2024/20240621_OffshoreBK6.html?nn=659670" }
      ]
    },
    {
      id: "de-2025",
      band: "E",
      kind: "null",
      year: "2025",
      country: "Germany",
      round: "BNetzA centrally pre-investigated sites",
      priceText: "No bids",
      capacity: "2,500 MW offered",
      sign: "GO",
      note: "No bids. A failed tender is not a zero and is not a high award. No primary URL was captured in this pass; the scout note points at a secondary account of the BNetzA outcome. Thin source.",
      chart: null,
      links: []
    },
    {
      id: "nl-alpha",
      band: "E",
      kind: "context",
      year: "2024",
      country: "Netherlands",
      round: "IJmuiden Ver Alpha, permit",
      priceText: "> ~€1 million/year × 40 years",
      capacity: "≥2,000 MW",
      sign: "GO",
      note: "Permit comparison, not an energy CfD. Annual site payment. Round winners are published as Noordzeker (SSE/ABP/APG) and Zeevonk II (Vattenfall/CIP) for Alpha and Beta. This row is the Alpha payment only.",
      chart: null,
      links: [
        { n: 19, label: "RVO letter", href: "https://english.rvo.nl/sites/default/files/2024-06/Letter-to-Parliament-Result-permit-round-IJmuiden-Ver-Alpha-Beta.pdf" },
        { n: 20, label: "Rijksoverheid", href: "https://www.rijksoverheid.nl/actueel/nieuws/2024/06/11/noordzeker-en-zeevonk-ii-winnen-tenders-windparken-op-zee-ijmuiden-ver-alpha-en-beta" }
      ]
    },
    {
      id: "nl-beta",
      band: "E",
      kind: "context",
      year: "2024",
      country: "Netherlands",
      round: "IJmuiden Ver Beta, permit",
      priceText: "€20 million/year × 40 years",
      capacity: "≥2,000 MW",
      sign: "GO",
      note: "Site payment, plus about €20 million of studies. Not a €/MWh strike. Same permit round as Alpha.",
      chart: null,
      links: [
        { n: 19, label: "RVO letter", href: "https://english.rvo.nl/sites/default/files/2024-06/Letter-to-Parliament-Result-permit-round-IJmuiden-Ver-Alpha-Beta.pdf" }
      ]
    },
    {
      id: "dk-thor",
      band: "E",
      kind: "context",
      year: "2021",
      country: "Denmark",
      round: "Thor concession",
      priceText: "0.01 øre/kWh bid floor; expected DKK 2.8 billion to the state",
      capacity: "~1,000 MW",
      sign: "GO",
      note: "Bid floor 0.01 øre/kWh, which is 0.0001 DKK/kWh, plus an expected payment to the state. Effectively ~zero energy support. Winner: Thor Wind Farm I/S (RWE). Not plotted as a €/MWh strike.",
      chart: null,
      links: [
        { n: 22, label: "Danish Energy Agency", href: "https://ens.dk/en/press/thor-wind-farm-build-thor-offshore-wind-farm-following-historically-low-bid-price" },
        { n: 23, label: "Agency MyNewsDesk", href: "https://www.mynewsdesk.com/danish-energy-agency/pressreleases/thor-wind-farm-i-skraastreg-s-to-build-thor-offshore-wind-farm-following-a-historically-low-bid-price-3148017" }
      ]
    },
    {
      id: "dk-6gw",
      band: "E",
      kind: "null",
      year: "2024–25",
      country: "Denmark",
      round: "6 GW package",
      priceText: "No award",
      capacity: "≥6,000 MW planned",
      sign: "GO",
      note: "Cancelled or moved to a retender (Hesselø, Kriegers Flak II, Kattegat, and others). Not a zero price. Later discussion of CfD caps had not produced a clearing by the research date.",
      chart: null,
      links: [
        { label: "Danish Energy Agency, tender launch", href: "https://ens.dk/en/press/denmarks-largest-tendering-procedure-offshore-wind-power-launched" }
      ]
    },
    {
      id: "be-gap",
      band: "gap",
      kind: "gap",
      year: "—",
      country: "Belgium",
      round: "Princess Elisabeth Zone",
      priceText: "Coverage gap — no published price",
      capacity: "—",
      sign: null,
      note: "The zone was cancelled and relaunched. No award price in this pass. A coverage gap is not a zero.",
      chart: null,
      links: [
        { n: 35, label: "Relaunch report", href: "https://www.offshorewind.biz/2026/07/24/belgium-approves-new-tender-framework-for-first-princess-elisabeth-zone-offshore-wind-site/" }
      ]
    },
    {
      id: "es-gap",
      band: "gap",
      kind: "gap",
      year: "—",
      country: "Spain",
      round: "Commercial offshore",
      priceText: "Coverage gap — no published price",
      capacity: "—",
      sign: null,
      note: "No commercial offshore clearing price was located in this pass. A coverage gap is not a zero.",
      chart: null,
      links: []
    }
  ],

  timeline: [
    { year: "2021", text: "Denmark, Thor. Near-zero energy support and a pay-to-state path.", bands: ["E"] },
    { year: "2021", text: "Poland Phase I, administrative CfD. Reported 319.60 PLN/MWh. Thin secondary source.", bands: ["D"] },
    { year: "2022", text: "UK AR4. Fixed offshore clear 37.35 £2012/MWh, about 7 GW.", bands: ["A"] },
    { year: "2023", text: "UK AR5. No offshore award.", bands: ["A", "N"] },
    { year: "2023", text: "France AO4. 44.90 €2022/MWh.", bands: ["A"] },
    { year: "2023", text: "Ireland ORESS 1. Weighted average 86.05 €/MWh.", bands: ["A"] },
    { year: "2023", text: "Germany, BNetzA dynamic. Pay-to-state about 1.56–2.07 mn €/MW.", bands: ["E"] },
    { year: "2024", text: "UK AR6, fixed-bottom. 58.87 £2012/MWh.", bands: ["A"] },
    { year: "2024", text: "UK AR6, floating. 139.93 £2012/MWh.", bands: ["B"] },
    { year: "2024", text: "France AO5 and AO6, floating. About 86–93 €/MWh.", bands: ["B"] },
    { year: "2024", text: "Netherlands, IJmuiden Ver Alpha and Beta. Site payments, not energy strikes.", bands: ["E"] },
    { year: "2024", text: "Italy. FER 2 in force in August. E-1 ceiling 185 €/MWh. GSE operating rules in December 2024.", bands: ["C"] },
    { year: "2024", text: "Germany, 2024 dynamic. About 1.07–1.31 mn €/MW paid to the state.", bands: ["E"] },
    { year: "2025", text: "France AO7. No award.", bands: ["A", "N"] },
    { year: "2025", text: "France AO8. 66 €/MWh. The minister selected the second-ranked bid; the price is under the cap.", bands: ["A"] },
    { year: "2025", text: "Poland AMFW/1/2025. 476.88–492.32 PLN/MWh, 3,435 MW.", bands: ["D"] },
    { year: "2025", text: "Germany and Denmark. Failed or cancelled packages. Not awards.", bands: ["E", "N"] },
    { year: "2025", text: "Italy. Still no E-1 graduatoria.", bands: ["C"] },
    { year: "2026", text: "Italy. The E-1 offshore ranking is still unpublished as of the research date. FER X results are onshore technologies only.", bands: ["C"] }
  ],

  sources: [
    {
      group: "Italy",
      items: [
        { n: 1, title: "MASE — Decreto FER 2, 19 June 2024 (Allegato 1 tariffs)", href: "https://www.mase.gov.it/portale/documents/d/guest/dm_19-06-2024_fer2-pdf" },
        { n: 2, title: "GSE — FER 2 overview", href: "https://www.gse.it/servizi-per-te/fonti-rinnovabili/fer2" },
        { n: 3, title: "GSE — Accesso agli incentivi FER 2", href: "https://www.gse.it/servizi-per-te/fonti-rinnovabili/fer2/accesso-agli-incentivi" },
        { n: 4, title: "GSE — Graduatorie FER 2 (Gruppo A and D only, as of the research date)", href: "https://www.gse.it/servizi-per-te/fonti-rinnovabili/fer2/graduatorie" },
        { n: 5, title: "GSE — News on the second-round rankings (biogas, biomass, inland floating PV)", href: "https://www.gse.it/servizi-per-te/news/fer-2-pubblicate-le-graduatorie-del-secondo-bando" },
        { n: 6, title: "GSE mirror PDF of the FER 2 decree", href: "https://www.gse.it/documenti_site/Documenti%20GSE/Servizi%20per%20te/FER2/Normativa/DM%20FER%202%2019-06-2024.pdf" },
        { n: 7, title: "Secondary scheme explainer (not an award price)", href: "https://www.wfw.com/articles/italys-new-fer-2-decree-focusses-on-the-incentives-for-offshore-wind-projects/" }
      ]
    },
    {
      group: "United Kingdom",
      items: [
        { n: 8, title: "DESNZ — CfD Allocation Round 4 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-4-results/contracts-for-difference-cfd-allocation-round-4-results-accessible-webpage" },
        { n: 9, title: "DESNZ — CfD Allocation Round 5 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-5-results/contracts-for-difference-cfd-allocation-round-5-results-accessible-webpage" },
        { n: 10, title: "DESNZ — CfD Allocation Round 6 results", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-6-results/contracts-for-difference-cfd-allocation-round-6-results-accessible-webpage" },
        { n: 11, title: "DESNZ — Allocation Round 6 results PDF", href: "https://assets.publishing.service.gov.uk/media/66d6ad7c6eb664e57141db4b/Contracts_for_Difference_Allocation_Round_6_results.pdf" },
        { n: 12, title: "DESNZ — Allocation Round 5 administrative strike price methodology note", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-5-administrative-strike-prices-methodology-note/contracts-for-difference-methodology-used-to-set-administrative-strike-prices-for-cfd-allocation-round-5" }
      ]
    },
    {
      group: "Germany",
      items: [
        { n: 13, title: "BNetzA — English press, 12 July 2023, dynamic bidding", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2023/20230712_OffshoreResults.html" },
        { n: 14, title: "BNetzA — German press, 12 July 2023", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2023/20230712_OffshoreErgebnisse.html" },
        { n: 15, title: "BNetzA — English press PDF, 7 December 2023", href: "https://www.bundesnetzagentur.de/SharedDocs/Downloads/EN/BNetzA/PressSection/PressReleases/2023/20231207_OffshoreResults.pdf?__blob=publicationFile&v=1" },
        { n: 16, title: "BNetzA — German press, 21 June 2024, dynamic results", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2024/20240621_OffshoreBK6.html?nn=659670" },
        { n: 17, title: "BNetzA — English press, 12 August 2024, centrally pre-investigated sites (prices not published)", href: "https://www.bundesnetzagentur.de/1021936" }
      ]
    },
    {
      group: "Netherlands",
      items: [
        { n: 18, title: "RVO — Letter to Parliament, Hollandse Kust (west) Site VII. Not used as a price on this board.", href: "https://english.rvo.nl/sites/default/files/2023-07/Letter%20to%20parliament%20announcement%20winner%20Hollandse%20Kust%20west%20site%20VII.pdf" },
        { n: 19, title: "RVO — Letter to Parliament, IJmuiden Ver Alpha and Beta", href: "https://english.rvo.nl/sites/default/files/2024-06/Letter-to-Parliament-Result-permit-round-IJmuiden-Ver-Alpha-Beta.pdf" },
        { n: 20, title: "Rijksoverheid — IJmuiden Ver winners", href: "https://www.rijksoverheid.nl/actueel/nieuws/2024/06/11/noordzeker-en-zeevonk-ii-winnen-tenders-windparken-op-zee-ijmuiden-ver-alpha-en-beta" },
        { n: 21, title: "RVO — IJmuiden Ver page", href: "https://english.rvo.nl/subsidies-financing/offshore-wind-energy/ijmuiden-ver" }
      ]
    },
    {
      group: "Denmark",
      items: [
        { n: 22, title: "Energistyrelsen — Thor winner (English)", href: "https://ens.dk/en/press/thor-wind-farm-build-thor-offshore-wind-farm-following-historically-low-bid-price" },
        { n: 23, title: "Danish Energy Agency via MyNewsDesk — Thor bid", href: "https://www.mynewsdesk.com/danish-energy-agency/pressreleases/thor-wind-farm-i-skraastreg-s-to-build-thor-offshore-wind-farm-following-a-historically-low-bid-price-3148017" },
        { n: 24, title: "European Commission state-aid excerpt on the Thor design", href: "https://ec.europa.eu/competition/state_aid/cases1/202111/291899_2254450_111_2.pdf" },
        { n: 25, title: "Secondary note on a 2024 no-bid and redesign (thin)", href: "https://www.renewable-ei.org/en/activities/column/REupdate/20260402.php" }
      ]
    },
    {
      group: "France",
      items: [
        { n: 26, title: "CRE — deliberation of 29 November 2024, AO6 instruction (cites AO5)", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2024/241129_2024-211_Instruction_AO6.pdf" },
        { n: 27, title: "CRE — deliberation of 24 June 2025, AO7 and AO8 instruction", href: "https://www.cre.fr/fileadmin/Documents/Deliberations/2025/250624_2025-165_Instruction_AO8.pdf" },
        { n: 28, title: "CRE — news, AO7 without bids and AO8 laureate", href: "https://www.cre.fr/actualites/toute-lactualite/la-cre-publie-les-deliberations-relatives-a-son-instruction-des-procedures-concurrentielles-ao7-et-ao8-portant-sur-des-installations-deoliennes-en-mer-posees-respectivement-au-large-de-lile-doleron-et-au-sein-de-la-zone-centre-manche.html" },
        { n: 29, title: "TotalEnergies — Centre Manche 2 note", href: "https://totalenergies.com/newsroom/france-totalenergies-selected-state-operator-countrys-largest-renewable-energy/?lang=eng" },
        { n: 30, title: "Secondary cross-check for AO4, 44.90 €/MWh", href: "https://www.eoliennesenmer.fr/facades-maritimes-en-france/facade-manche-mer-du-nord/projet-centre-manche/centre-manche-1" }
      ]
    },
    {
      group: "Poland",
      items: [
        { n: 31, title: "URE — first competitive offshore auction (English)", href: "https://www.ure.gov.pl/en/communication/news/486,Offshore-First-auction-for-offshore-wind-farms-concluded.html" },
        { n: 32, title: "Equinor — Phase I announcement. Not the source of the 319.60 figure on this board.", href: "https://www.equinor.com/news/archive/20210412-breakthrough-polish-wind" },
        { n: 33, title: "Secondary Phase I report, 319.60 PLN/MWh (verify against URE BIP)", href: "https://offshorewindpoland.pl/prezes-ure-wydal-decyzje-dot-ceny-wsparcia-dla-morskich-farm-baltyk-2-i-3/" }
      ]
    },
    {
      group: "Ireland",
      items: [
        { n: 34, title: "EirGrid — ORESS 1 Final Auction Results (OR1FAR)", href: "https://cms.eirgrid.ie/sites/default/files/publications/ORESS-1-Final-Auction-Results-%28OR1FAR%29.pdf" }
      ]
    },
    {
      group: "Belgium and Spain",
      items: [
        { n: 35, title: "Secondary note on the Belgian Princess Elisabeth Zone relaunch (no award price)", href: "https://www.offshorewind.biz/2026/07/24/belgium-approves-new-tender-framework-for-first-princess-elisabeth-zone-offshore-wind-site/" },
        { n: 36, title: "Spain — no primary commercial offshore clearing price located in this pass", href: null }
      ]
    }
  ],

  alsoCited: [
    { title: "DESNZ — AR4 results collection (briefing link)", href: "https://www.gov.uk/government/publications/contracts-for-difference-cfd-allocation-round-4-results" },
    { title: "UK Parliament briefing on Allocation Round 5 (scout link for the null round)", href: "https://researchbriefings.files.parliament.uk/documents/CBP-9871/CBP-9871.pdf" },
    { title: "BNetzA — English press used as the scout link for the 2024 dynamic auction", href: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240613_BK6_Offshore.html" },
    { title: "URE — AMFW/1/2025 results PDF (briefing and scout)", href: "https://www.ure.gov.pl/download/9/15907/InformacjawynikiaukcjiAMWF12025.pdf" },
    { title: "WindEurope — summary citing the AO5 floating result (scout link)", href: "https://windeurope.org/news/french-auction-results-are-not-the-new-benchmark-for-floating-wind-in-europe/" },
    { title: "Danish Energy Agency — launch of the large offshore tender later recorded as the 6 GW package with no award", href: "https://ens.dk/en/press/denmarks-largest-tendering-procedure-offshore-wind-power-launched" }
  ]
};
