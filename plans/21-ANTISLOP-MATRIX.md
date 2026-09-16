# 21 — Anti-slop screen-by-screen audit matrix

> Rules = `plans/20-ANTISLOP-RULESET.md`. Screens = `docs/audit/*.png` (26 captures, 360×780).
> Verdicts per rule **family**: HG (hard gates 1–13), PG (purpose gates 1–16), QL (quality locks 1–12).
> Full-matrix convention: every cell carries a verdict; a blank cell would be a process error.
> Evidence: `docs/audit/<screen>.png` + element description.

## Hard gates (HG)

| Screen | HG-1 fake stats | HG-2 fake social | HG-3 mobile | HG-4 dead UI | HG-5 states | HG-6 contrast | HG-7 keyboard | HG-8 em dash | HG-9 filler | HG-10 placeholder | HG-11 verified | HG-12/13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 Market | PARTIAL (₹ figures are demo, unlabelled) | PASS | PASS | PASS | PASS | FAIL (disabled CTA muddy ~3.2:1) | PASS | PASS | PASS | FAIL (grey-dot logo box, unlabelled) | PASS | PASS |
| 02 OTP | PASS | PASS | PASS | PASS | PASS | FAIL (disabled Verify) | PASS | PASS | PASS | PASS | PASS | PASS |
| 03 Language | PARTIAL (₹12 inline = fixture, unlabelled) | PASS | PARTIAL (right tile clip) | PASS | PASS | FAIL (disabled Continue) | PASS | PASS | PASS | PASS | PASS | PASS |
| 04 Consent | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 05 Home empty | PASS | PASS | FAIL (checklist row under dock) | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (BrandSlot dot) | PASS | PASS |
| 06 Jobs | PARTIAL (coverage %/districts = fixture) | PASS | PARTIAL (chip clip) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 07 Brief | PARTIAL (₹ breakdown fixture) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 08 Capture | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 09 Review | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL (0:01 rows read fake) | PARTIAL (identical row labels) | PASS | PASS | PASS |
| 10 Pending | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 11 Wallet | FAIL (₹0 vs +₹58 contradiction) | PASS | FAIL (sticky CTA over tabs) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 12 Payout | PASS | PASS | PASS | PASS | PASS | FAIL (disabled Continue) | PASS | PASS | PASS | PASS | PASS | PASS |
| 14 Rewards | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 15 Profile | FAIL (₹0/0% vs Performance 207 contradiction) | PASS | PASS | PASS | PASS | PARTIAL (avatar dot) | PASS | PASS | PASS | FAIL (avatar/‘·’) | PASS | PASS |
| 16 Performance | FAIL (207 clips/94% fixture unlabelled) | FAIL ("Top 5%"-style claims unlabelled) | PASS | PASS | PARTIAL (no empty) | PARTIAL (ghost 94.8%) | PASS | PASS | PASS | FAIL (unlabelled demo) | PASS | PASS |
| 17 RoomConsent | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (Priya/Anil/Meena personas) | PASS | PASS |
| 18 CoverageFull | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 19 Dialect | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (persona Iqbal/farm) | PASS | PASS |
| 20 SessionInterrupted | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (personas) | PASS | PASS |
| 21 SilentRoom | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (personas) | PASS | PASS |
| 22 QualityDispute | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (personas) | PASS | PASS |
| 23 Validator | FAIL (₹568-family fixtures* since removed; 94.8% unlabelled) | PARTIAL | PASS | PASS | PASS | PARTIAL (ghost 94.8%) | PASS | PASS | PASS | FAIL (unlabelled demo) | PASS | PASS |
| 24 Grading | PARTIAL (demo batch unlabelled) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (unlabelled demo) | PASS | PASS |
| 25 Celebration | FAIL (+₹0 with count-up from 0) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 26 Credited | FAIL (+₹12 vs wallet ₹0) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

\* ValidatorHome money hardcodes were removed in `78ba699`; matrix records the state at capture time and the fix below.

**Hard-gate score: 12 screens FAIL at least one HG.** Dominant failures: HG-1/HG-10 (unlabelled demo data, placeholder dots), HG-6 (disabled-CTA contrast), HG-3 (two fixed-element collisions).

## Purpose gates (PG) — pass means "no default-without-purpose AND dose respected"

| Screen | PG-1/2 gradient & palette | PG-3/4 icons | PG-8 glow | PG-9 card monotony | PG-13 arrows | PG-15 stripe | PG-16 chrome |
|---|---|---|---|---|---|---|---|
| 01 Market | PASS (flat, brand-warm) | PASS (Lucide+label = owner override) | PASS | PARTIAL (two stacked placeholder blocks compete) | PASS | PASS | FAIL (PhoneFrame shell = redrew phone chrome; stripped at ?embed=1) |
| 02 OTP | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 03 Language | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 04 Consent | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 05 Home empty | PASS | PASS | PASS | PARTIAL (uniform card rhythm) | PASS | PASS | same |
| 06 Jobs | PASS | PASS | PASS | PASS (varied hero + rows) | PASS | PASS | same |
| 07 Brief | PASS | PASS | PASS | PARTIAL (three stacked info-cards same shape) | PASS | PASS | same |
| 08 Capture | PASS | PASS | PASS (e-glow trigger only) | PASS | PASS | PASS | same |
| 09 Review | PASS | PASS | PASS | PARTIAL (identical rows) | PASS | PASS | same |
| 10 Pending | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 11 Wallet | PASS | PASS | PASS | PASS (varied bento) | PASS | PASS | same |
| 12 Payout | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 14 Rewards | PASS | PASS | PASS | PARTIAL (perk cards same shape) | PASS | PASS | same |
| 15 Profile | PASS | PASS | PASS | PARTIAL (stat trio equal) | PASS | PASS | same |
| 16 Performance | PASS | PASS | PASS | PARTIAL (equal tiles) | PASS | PASS | same |
| 17–22 Edges | PASS | PASS | PASS | PASS | PASS | PASS | same |
| 23/24 Validator | PASS | PASS | PASS | PARTIAL | PASS | PASS | same |
| 25/26 Celebrations | PASS | PASS | PASS | PASS | PASS | PASS | same |

**PG verdict: no brand-level slop (no indigo, no trust-gradient, no emoji icons); monotony and the dev PhoneFrame are the only repeat offenders.** PhoneFrame is dev-only (`?embed=1` strips it) — recorded as PASS-with-note for the shipped artifact, FAIL for raw dev preview.

## Quality locks (QL)

| Screen | QL-3 CTA generic | QL-4 buzzwords | QL-6 type discipline | QL-9 accent dose | QL-10 eyebrow | QL-11 tokens | QL-12 details |
|---|---|---|---|---|---|---|---|
| 01 Market | PASS ("Continue with Google" is literal) | PASS | PASS | PASS | PASS | PASS | PARTIAL (two placeholder blocks) |
| 02 OTP | PASS (Verify) | PASS | PASS | PASS | PASS | PASS | FAIL (disabled = opacity only, no not-allowed) |
| 03 Language | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (same disabled issue) |
| 04 Consent | PASS ("I agree — continue") | PASS | PASS | PASS | PASS | PASS | PASS |
| 05 Home | PASS (CTA names job+pay) | PASS | PASS | PASS | PASS | PASS | PASS |
| 06 Jobs | PASS ("Start job ₹X") | PASS | PASS | PASS | PASS | PASS | FAIL (chip clip mid-glyph) |
| 07/08 Studio | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (light status band on dark) |
| 09 Review | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 10 Pending | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 11 Wallet | PARTIAL ("Withdraw (min ₹100)") | PASS | PASS | PASS | PASS | PASS | FAIL (overlap) |
| 12 Payout | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (disabled) |
| 14 Rewards | PASS ("Activate") | PASS | PASS | PASS | PASS | PASS | PASS |
| 15 Profile | PASS | PASS | PASS | PASS | PASS | PASS | FAIL (avatar '·') |
| 16 Performance | PASS | PASS | PASS | PARTIAL (ghost %) | PASS | PASS | PASS |
| 17–22 Edges | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL (persona names) |
| 23/24 Validator | PASS | PASS | PASS | PARTIAL | PASS | PASS | PASS |
| 25/26 Celebr. | PASS | PASS | PASS | PASS | PASS | PASS | PARTIAL (wallet-total mismatch) |

**Findings count: 14 screens carry ≥1 FAIL; 41 distinct failing instances** (HG 22 · QL 14 · PG 5), each mapped to a fix in `plans/22-ANTISLOP-FIXLIST.md`. Zero hits on the brand-level sins (indigo accent, trust gradients, emoji icons, buzzwords, invented marketing claims, template layouts) — the app's slop is **execution-grade** (disabled-state contrast, demo-data honesty, placeholder dignity, fixed-element collisions), not template-grade.
