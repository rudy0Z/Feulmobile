# Feul ([PRODUCT]) — Empathy Maps

> Repo: `D:\portfolio porjects\feul final build\Feulmobile-main` (branch `master`) · Documented 2026-09-16.
> **Basis & honesty note:** no user interviews or research sessions exist in the repo. These maps are **inferred** from the product's own design materials: `PORTFOLIO-DIRECTION.md` (economic thesis, contributor-as-job framing), `plans/03-EDGE-CASES.csv` (the owner's own copy direction for pain states), the pay model in `lib/quests.ts`, and copy in `lib/consentCopy.ts` / `lib/rejectionTaxonomy.ts`. Quotes in "Says" are the voice the design itself writes in — treat as intended persona voice, not field data. Companion: journeys in [01-user-journey-map](01-user-journey-map.md).

## Personas identified from the product design

| Persona | Role | Economic stake | Source of inference |
|---|---|---|---|
| **P1 — The Coverage Contributor** (primary) | Gig earner recording voice clips | ₹ payouts, UPI settlement, standing tier | quests.ts pay model, edge-case ledger copy |
| **P2 — The Quality Validator** | Pro role grading clips | Second income lane, accuracy accountability | validator app + C-17/18/19 |
| **P3 — The AI Lab** (market side, not in-app) | Buys coverage datasets | Speaker × dialect × district × condition coverage | PORTFOLIO-DIRECTION thesis; no lab UI exists |

---

## P1 — The Coverage Contributor (primary persona)

**Context (inferred):** Indian contributor, Hindi + a regional dialect (e.g. Vidarbha Marathi), mid-range Android, shares room with family, treats the app as a job — sessions around daily life, income matters in real rupees.

### Says (the voice the design writes for)
- "Same work, same pay — tier only changes *when* money lands, not how much." (tier contract, `lib/tier.ts`)
- "My Marathi is worth 1.6× because districts still need it." (coverage premium, FEU-18 copy)
- "Your 19-min take is saved. Resume in 24h." (C-04)
- "One speaker didn't speak — this take needs all 4 voices to be valid." (C-08)
- "We only collect real human speech — synthetic audio poisons the dataset." (rejection taxonomy)

### Thinks
- *Is this a scam?* — until the first receipt with a reference number.
- *Did I say it right?* — script deviation fear before every submit.
- *Why locked?* — when a campaign is full (the design answers with a redirect, not a door).
- *Will flagging my dialect cost me money?* — the honesty check (C-07) adjusts pay to base **and says so**.
- *What happens to my voice?* — DPDP consent as its own screen exists to hold this thought.

### Does
- Picks highest-multiplier campaigns first (rarity pricing shapes behavior).
- Gathers 3 family members for room takes; plans around everyone's evening.
- Re-records single failed clips (repair loop) instead of restarting batches.
- Withdraws at first-withdrawal floor minimums until trust builds.
- Checks Wallet ledger before trusting "pending".

### Feels
| High | Low |
|---|---|
| Peak at first credit ("money moved") | Doubt during silent "Clearing" periods |
| Pride when standing tier unlocks access | Deflation at rejection — mitigated by sentence+why+fix |
| Security from in-flight honour (C-03/C-16) | Tension when money is in flight (UPI name-match, spoof hold) |

### Pains / Gains
- **Pains:** silent penalties, locked doors, lost takes, opaque math, fraud fear (both directions).
- **Gains:** visible coverage math, guaranteed open row (C-22), preserved work (C-04/C-11/C-12), receipts, appeal windows, honest redirects.

---

## P2 — The Quality Validator

**Context (inferred):** experienced contributor promoted to pro role; grades others' clips; measured by secret gold-standard agreement (5–10% pre-graded injection).

### Says
- "Under extended review — reviewers disagreed." (C-17 contributor-facing honesty)
- "Queue's empty — go earn on the contributor side." (C-19 cross-subsidize)
- "Your accuracy shifted. Queue is throttled while we check." (C-18, private, never accusing)

### Thinks
- *Grading is judgment under surveillance I can't see* — the design keeps scoring invisible and speaks only through queue speed.
- *My flag moves money* — disagreement escalates to a 3rd reviewer rather than one person deciding pay.
- *Undo exists* — one-tap undo toast lowers the cost of a mistake.

### Does
- Grades in batches from Home (FEU-41); switches instruments only in dev preview (segmented ships).
- Flags rather than rejects (flag path → escalation).
- Crosses to contributor jobs when the queue dries up.

### Feels
| High | Low |
|---|---|
| Authority (judgment trusted, escalated cleanly) | Suspended without accusation — still never told "cheater" |
| Fair process (3rd reviewer, undo) | Invisible scoring = uncertainty by design |

### Pains / Gains
- **Pains:** accountability without visibility; disagreement ambiguity.
- **Gains:** bounded escalation, honest system states, cross-role income resilience.

---

## P3 — The AI Lab (market side; no in-app UI)

### Says (from the design's own thesis)
- "We buy coverage, not hours." (PORTFOLIO-DIRECTION §1)
- "Marathi Vidarbha 45+ needs 400 more · 1.6×." (scarcity language as market signal)

### Thinks
- *Is the dataset honest?* — consent law compliance (DPDP) is the product's answer.
- *Will contributors game rarity?* — dialect checks (C-07) and synthetic holds (C-06) are the answer.

### Does / Feels
- Buys by coverage cell; watches campaigns close with real slot counts (C-21).
- Feels: paying a premium for genuine scarcity feels defensible; fraud-as-churn is the risk the whole trust architecture prices in.

---

## Cross-persona insight (quotable)

The three personas meet in one design sentence: **contributors sell honesty, validators enforce it, labs buy it — and every state that could hide behind a spinner or a silent penalty was instead designed as an honest, named screen.** That is the empathy architecture of this product, and it is visible in the state catalog, not just the copy.
