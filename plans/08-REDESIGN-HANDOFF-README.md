# 08 — Redesign Handoff README (contributor rebuild, external build)

> **Status:** handoff index, 2026-09-15. Read this file first, then phases in order.
> **Scope:** contributor only. Creator wizard is dropped everywhere (routes, copy, docs) — do not build, do not reference. Validator lite stays (Phase 4).
> **Authority:** `MASTER-BLUEPRINT.md` (incl. §10) → `HANDOFF-NEW-SESSION.md` → `PORTFOLIO-DIRECTION.md` → `07-CONCEPT-LOCK.md` → this 08 series → `01-DESIGN-SYSTEM.md` → `03-EDGE-CASES.csv` → `04-ISSUE-MAP.md`. `archive/` never build input.
> **UI language:** English only. Vernacular lives inside job content (scripts, samples, consent audio), never chrome.
> **Onboarding visual:** owner supplies image later — build with `BrandSlot` + layout slot reserved, do not block Phase 1 on it.

## Read order for the external builder

1. This file (scope + gates + tokens summary)
2. `08-VISUAL-REFERENCE-MAP.md` — all 42 refs mapped to screens (file names verbatim)
3. `08-PHASE-1-ONBOARDING-FIRST-EARN.md` — Market → Auth → OTP-6 → Language → Consent gate → Home newcomer → first-earn hook + awards animation
4. `08-PHASE-2-WALLET-WITHDRAWAL.md` — Wallet bento + ledger + payout 5 steps + receipt
5. `08-PHASE-3-JOBS-STUDIO.md` — Jobs feed + Brief → Capture → Review → Pending + Repair
6. `08-PHASE-4-REMAINING.md` — Profile-lite, Rewards, 9 edges, validator lite, celebration, DevPanel/embed hygiene
7. Then authoritative specs: `07-CONCEPT-LOCK.md` (job language + lifecycle), `01-DESIGN-SYSTEM.md`, `04-ISSUE-MAP.md`, `03-EDGE-CASES.csv`

## Locked product concept (do not reopen)

Gig-job marketplace: Indians earn rupees performing real situations AI labs need for coverage (speaker × dialect × district × acoustic). Job-not-quest, one-tap apply (language + standing + mic check), single session, 24h resume. States: Available → In-progress → In-review → Settled. Pay `total = round(base × coverageMult) + bonus`, standing changes access + settlement only, ₹100 floor in session one. AI as director (stems/turns/pre-recorded track), humans perform LINES / scenario / interview-track / ROOM one-take. Trust = money movement: DPDP consent verbatim strictly before any mic, auto-check + validator taxonomy, in-flight honoured, exact-gap withdraw, relative dates, UTR receipts, revocation ledger.

## Token + craft summary (new system, same grammar)

Keep token names (`--surface/--text/--action/--state/--money/--r/--e/--font`), replace values per refs: Bone `#FAF7F2` + white, ink money 40-48 tabular with muted paise, terracotta action ≤10%, verdigris/ochre-800/crimson icon+label only, Studio `#201611` only dark. Type 11 steps body-16 floor `lh-deva 1.72`. Spacing 16 outer / 14 card / 12 gap / 68 rows / 56 CTA r28 / 36 chips / 52 search pill + 44 filter / 28 sheet-top. r 8/14/24/999, one `r-lg e-2` hero per viewport. Springs on touch, 120/180/280 fades, press .97, reduced-motion per component. Lucide 1.75-2 + label always. 44px targets, 84 trigger. Full scale in `01-DESIGN-SYSTEM.md`; enforcement via `pnpm metrics` (targets: sizes 11, ≤12px ~60, borders <15, shadows <10, gradients 2, hex 0, <44px 0).

## Global gates (every phase)

- `pnpm build` exit 0 + `pnpm metrics` not worse; baseline `plans/design-metrics-baseline.md`
- 360 default, 320 no-overflow, 390-430 large; 150% text; daylight 300-nit contrast (script ≥10:1, body 7:1, secondary 4.5:1, disabled 3:1 + reason)
- No raw hex / off-scale sizes / legacy aliases; money ink; state icon+label; no emoji UI; no Feul/Grain strings; job language per `07 §2`
- Reachability rule: every state reachable in-flow without DevPanel; `?embed=1` strips PhoneFrame/DEV chrome
- Consent precedes any mic (prove by navigating to Studio signed-out); levels from `useRealMicLevel.ts` only, freeze in silence
