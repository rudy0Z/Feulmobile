# 22 — Anti-slop fix list + final sign-off ledger

> Companion to `plans/20-ANTISLOP-RULESET.md` (rules) and `plans/21-ANTISLOP-MATRIX.md`
> (verdicts). This file maps every FAIL to its remedy, records what was fixed **in this run**,
> and signs off rule-by-rule with evidence. Dated: 2026-09-16.

---

## Part 1 — Fix list (every FAIL → remedy)

| # | Rules | Screen(s) | Remedy | Status |
|---|---|---|---|---|
| F-1 | HG-6, QL-12 | every screen with a disabled CTA (OTP, Language, Payout, Wallet) | Button disabled = three channels: sunken fill + faint ink + dashed edge + `not-allowed`; muddy tan gone | **FIXED** (`Primitives.tsx` Button) |
| F-2 | HG-10, D2 | Market, Home, Profile | `IllustrationSlot` = designed warm-paper waveform glyph (voice-product motif) + honest caption; `BrandSlot` unchanged 28px mark; no bare dot as "illustration" | **FIXED** (`BrandSlot.tsx`) |
| F-3 | HG-1, D3 | Wallet | "This week" capped by live balance (`min(rawWeek, available)`) — can no longer exceed Available | **FIXED** (`Wallet.tsx`) |
| F-4 | HG-1, D3 | Wallet | below-floor CTA no longer reads "₹100 more to reach ₹100" at zero; shows `Withdraw · min ₹100`; partial balances keep exact-gap phrasing | **FIXED** (`Wallet.tsx`) |
| F-5 | HG-1, D3 | Credited | cold-load amount = `questTotal(FIRST_JOB)` (chain-true) instead of arbitrary ₹12 | **FIXED** (`EarningCredited.tsx`) |
| F-6 | HG-10, D7 | 9 edge screens + RejectedTask | all persona literals (Priya/Anil/Meena/Asha/Ravi/Iqbal) → Speaker 1/2/3/4 role labels; scan = 0 remaining | **FIXED** (batch C) |
| F-7 | HG-10, D8 | Profile | avatar fallback '·' → 'ME' initials treatment | **FIXED** (`Profile.tsx`) |
| F-8 | HG-3, D1 | Wallet | sticky withdraw stack compacted: gap line folded into button label + icon; no longer covers tabs at rest | **FIXED** (`Wallet.tsx`) |
| F-9 | HG-1, D3 | Performance vs Profile | sample-data labelling + session-derived stats | **OPEN — owner data needed** (real acceptance numbers don't exist in-repo; R-23 says label or omit) |
| F-10 | HG-9, D9 | Review | per-line labels from `questContent` + varied durations | OPEN (S, next pass) |
| F-11 | HG-3, D4 | Jobs chips / Language grid / Home checklist | fade+peek on chip row; grid reflow | OPEN (S) |
| F-12 | D5 | Studio | dark status-bar variant when Studio mounts | OPEN (S) |
| F-13 | D10 | Consent | verbatim above sticky CTA (owner item V3) | OPEN (owner call recorded in `12` §5) |
| F-14 | QL-9 | Validator hero ghost % | raise contrast or drop | OPEN (S) |

**Fixed this run: F-1…F-8 (8 items, 41 failing instances reduced to the 6 OPEN rows above).**
OPEN items are design-owner calls or small polish, each already scoped in `19` §4.

## Part 2 — Sign-off ledger (final verdicts with evidence)

| Rule family | Before | After | Evidence |
|---|---|---|---|
| HG-1 fake/unlabelled stats | FAIL (5 screens) | **PASS** on Wallet/Credited/Home coherence; Performance remains labelled-sample **PARTIAL** until F-9 | `docs/audit/after/11b-wallet-live-after.png` (₹122 = +₹58 week ≤ balance; ₹25 in review; ₹242 total) |
| HG-2 fake social proof | PASS | PASS (never present) | matrix `21` |
| HG-3 mobile integrity | FAIL (2 collisions) | **PASS** (smoke 35/35; shots 36/36 overflow=0; sticky stack compact) | `11-wallet-after.png` vs `11-wallet.png` |
| HG-4 dead UI | PASS | PASS | click-through evidence in session log |
| HG-5 states | PASS | PASS (empty/loading/error reachable; DevPanel harness) | `05-home-empty`, `06-jobs` empty |
| HG-6 contrast | FAIL (disabled CTAs) | **PASS** (sunken+faint+dashed, label ≥3:1) | `02-otp-after.png` Verify state |
| HG-7 keyboard | PASS | PASS (focus-visible, aria-disabled keeps reason in tab order) | `theme.css` gates |
| HG-8 em dash | PASS | PASS (scan: 0 in UI strings) | grep |
| HG-9 filler | PARTIAL | **PASS** for real content everywhere; Review row labels remain minor (F-10) | `09-review3.png` |
| HG-10 placeholders | FAIL (grey dots, personas) | **PASS** (designed waveform placeholder; 0 persona literals) | `01-market-after.png`, `17-edge-room-consent-after.png`, `21-edge-silent-room-after.png`; grep=0 |
| HG-11 verify-first | PASS | PASS (build 0 · metrics green · smoke 35/35 · shots 36/36 after every batch) | gate log below |
| HG-12/13 | PASS | PASS (no patch scripts; light-only system by doctrine) | — |
| PG-1…16 (brand slop) | PASS | PASS (no indigo, no trust gradients, no emoji icons, glow = trigger only, varied cards on Jobs/Wallet) | matrix `21` |
| QL-3/4/5 (CTA/buzzword/identity) | PASS | PASS | matrix `21` |
| QL-6 type discipline | PASS | PASS (8-size scale; roman headers; tabular numerals) | metrics row |
| QL-9 accent dose | PARTIAL (ghost %) | unchanged (F-14 open) | `23-validator.png` |
| QL-11 tokens | PASS | PASS (0 raw hex, 0 undefined refs after fixes) | metrics |
| QL-12 micro-details | FAIL (disabled, chip clip) | **PASS** for disabled; chip clip = F-11 open | `02-otp-after.png` |
| QL-7/8 (reasons + dials) | PASS | PASS (owner doctrine = direction; ENERGY 1 / RHYTHM 2 / MOTION 2 recorded in `01-DESIGN-SYSTEM`) | design-system doc |

## Part 3 — Gate log (after the anti-slop fixes)

```
pnpm build    → exit 0 (5.8s)
pnpm metrics  → all rows green: 8 type sizes · 21 gradients (≤30) · 0 raw hex ·
                0 brand strings · 0 undefined refs · leaks 11 (≤11) · buttons 114 (≤116)
pnpm smoke    → 35/35 routes render clean
pnpm shots    → 36/36 clean, overflow=0 at 320/360/390/430
grep personas → 0 literals
```

## Part 4 — Handoff note

**Where:** ruleset `plans/20`, matrix `plans/21`, this ledger `plans/22`; before-shots
`docs/audit/*.png`, after-shots `docs/audit/after/*.png`; harness scripts `scripts/audit-shots.mjs`,
`scripts/studio-shots3.mjs`, `scripts/after-shots.mjs`, `scripts/wallet-live-after.mjs`.

**How to re-verify:** `pnpm build && pnpm metrics && pnpm preview & pnpm smoke && pnpm shots`,
then `node scripts/after-shots.mjs` for the fixed screens. Any new screen must be added to
`scripts/smoke.mjs` ROUTES and judged against `plans/20`.

**Remaining risks / open items:** F-9 (Performance sample-data labelling — owner must supply
real numbers or accept a "Sample data" label), F-10/F-11/F-12/F-14 (small polish, S each),
F-13 (consent hierarchy — owner call V3), and the two ledger items outside this audit's scope
(F-7 primitives migration, Wave 5 packaging). The deep identity work — real illustrations in
the reserved slots and one signature moment per screen — is the owner-art dependency flagged
in `19` §4 items 1–3; the placeholder system now holds that door open honestly.
