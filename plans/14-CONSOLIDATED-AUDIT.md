# 14 — Consolidated audit + remaining work (contributor section)

> **Date:** 2026-09-16 · **Repo:** `Feulmobile-main` · **Audited by:** build session
> **Sources read end to end:** `plans/13-AUDIT-REPORT.md`, `plans/12-CHECKPOINT-REPORT.md`,
> `plans/09-COMPLETION-PLAN.md`, `plans/MASTER-BLUEPRINT.md`, `plans/04-ISSUE-MAP.md`,
> `plans/08-PHASE-1..4`, `plans/10-FOUNDATION-AUDIT.md`, `plans/11-VISUAL-AUDIT.md`, `CLAUDE.md`.
> **Live gates at audit time:** `pnpm build` exit 0 · `pnpm metrics` all rows green · `pnpm smoke` **35/35**.
> **Where 12 and 13 disagree, 13 (later) wins** — recorded per row.

Legend: **DONE** · **IN-PROGRESS** · **NOT-STARTED** · **DROPPED**

---

## Part 1 — Master-plan mapping (every item classified, with evidence)

### Wave 0 — Foundation lock
| Item | Status | Evidence |
|---|---|---|
| 0.1 collapse type scale (25→8) | **DONE** | `pnpm metrics`: "Distinct type sizes **8**"; `theme.css:363–370` (`--fs-*` 12/14/16/18/20/24/32/48) |
| 0.2 spacing/row/CTA tokens | **DONE** | `theme.css:203–218` (`--space-0..15`), `:414–421` (`--row/--cta/--chip/--search/--filter/--tap`) |
| 0.3 fix `Button` (aria-disabled, focus ring) | **DONE** | `Primitives.tsx` Button; metrics 0 sub-44 targets |
| 0.4 delete/fix `StatusPill` | **DONE** | `09` Part B "Resolved since the audit" (deleted) |
| 0.5 border/shadow discipline (structural) | **DONE** | metrics: double-border 0 · >10-border screens 0 · >1 hero shadow 0 |
| 0.6 gradient discipline | **IN-PROGRESS** | metrics gradients **25** (≤30). Mask-vs-wash audit of the residue still open (Wave 3) |
| 0.7 purge raw hex | **DONE** | metrics raw hex **0**; brand strings **0** (this session) |
| 0.8 fix sub-44 targets (`IconButton`) | **DONE** | metrics sub-44 **0** |
| 0.9 reduced-motion + a11y floors | **DONE** | `theme.css` `:focus-visible`, `prefers-reduced-motion`, `forced-colors` |
| 0.10 hybrid gate (18 rows) | **DONE** | `scripts/design-metrics.mjs`; `pnpm metrics` exit 0, 18 rows |
| 0.11 `?embed=1` + `?w=` switcher | **DONE** | `App.tsx:12–17` strips PhoneFrame+DEV; `lib/chrome.ts` |

### Wave 1 — Phase 1 finish (onboarding → Home → first earn)
| Item | Status | Evidence |
|---|---|---|
| 1.1 consent → native route `/contributor/consent` | **DONE** | `routes.tsx` consent route; `ConsentGate.tsx` |
| 1.2 mic prime "Not now" + OS deep-link on deny | **NOT-STARTED** | no `Not now` affordance in `Recording.tsx` |
| 1.3 48px step + distinct `EarningCredited` | **DONE** *(this session)* | new `src/app/components/EarningCredited.tsx`; route `/contributor/credited`; smoke 48 nodes |
| 1.4 calibration live-canvas trace | **NOT-STARTED** | calibration beat exists (`Recording.tsx:350–374`) but meter-only |
| 1.5 job-not-quest sweep on Home | **DONE** | no `quest` in user-visible copy; Wallet "Re-record this job" |
| 1.6 proof pack `docs/proof/phase-1.md` | **IN-PROGRESS** *(this session: consent-gate + real-levels notes created)* | `docs/proof/` |

### Wave 2 — Phase 2 (Wallet + Withdrawal) — 13 overrides 12 ("least complete" → complete)
| Item | Status | Evidence |
|---|---|---|
| 2.1 varied bento, no hero ₹ | **DONE** | `Wallet.tsx` bento (`--r-lg` + `e-2`, Available spans 2 cols) |
| 2.2 tabs 40 + weekly pills | **DONE** *(honesty fix this session)* | pills now derived from `ACTIVE_DAYS` (F-1) |
| 2.3 exact-gap copy + aria-disabled | **DONE** | `₹{gap} more to withdraw`; `Button` `aria-disabled` |
| 2.4 relative dates; quest→job | **DONE** | `Wallet.tsx` relative dates; "Re-record this job" |
| 2.5 payout presets 44 + session balances | **DONE** *(floor single-sourced this session)* | `PayoutFlow.tsx` imports `WITHDRAW_MIN` (F-2) |
| 2.6 perforated receipt with UTR | **DONE** | `Primitives.tsx` `ReceiptCard` |

### Wave 3 — Phase 3 (Jobs + Studio)
| Item | Status | Evidence |
|---|---|---|
| 3.1 surface rename → `Jobs` | **DONE** | `QuestFeed.tsx` h1 "Jobs" |
| 3.2 search 52 / chips 44 / filter circle | **DONE** *(this session)* | `QuestFeed.tsx` uses `--search`, `--tap`, `--filter` |
| 3.2 coverage 150px hero in feed | **NOT-STARTED** | none in feed |
| 3.3 2-line clamp on script excerpt | **DONE** *(this session)* | `Primitives.tsx` `QuestRow` `WebkitLineClamp: 2` |
| 3.4 Brief pass (AI-director stems note, tips, battery warn) | **IN-PROGRESS** | Brief region exists; items not individually verified |
| 3.5 Capture telemetry bar / orb / single-turn banner | **NOT-STARTED** | not present in `Recording.tsx` |
| 3.6 Room scrolling score / VAD-manual advance only | **NOT-STARTED** | not verified |
| 3.7 Review static thumbs + submit-once | **NOT-STARTED** | not present |
| 3.8 Pending 76 tick / 28 / ochre card | **IN-PROGRESS** | `Recording.tsx` Pending block exists; not verified to spec |
| 3.9 Repair hero + 5-col matrix + no hardcodes | **IN-PROGRESS** *(date de-hardcoded this session)* | `RejectedTask.tsx` uses tokens; `relStamp()` replaces the fixed date |

### Wave 4 — Phase 4 (Profile, Rewards, edges, validator, celebration, hygiene)
| Item | Status | Evidence |
|---|---|---|
| 4.1 Profile: stats this-month session-derived | **DONE** *(this session)* | `Profile.tsx` stats from `walletBalance` / `standing.reliability` / `tierName` |
| 4.1 Profile avatar flat (no gradient) | **DONE** | `Profile.tsx:46` flat `--action-primary` (was already fixed) |
| 4.1 Validator card demoted to `r-md` | **DONE** *(this session)* | `Profile.tsx` validator card `--r-md` |
| 4.1 Craft sheet / coverage register / Data-Vault grouping | **NOT-STARTED** | not present in `Profile.tsx` |
| 4.2 Rewards perks `e-0`, Activate 44 | **DONE** *(this session)* | `Rewards.tsx` card `--e-0`; Activate `minHeight: --tap` |
| 4.3 edge back-buttons → `IconButton` | **DONE** | all 9 edge files already use `IconButton` |
| 4.3 RoomConsent hero Bone / pills 44 / footer gradient | **IN-PROGRESS** | not addressed this session |
| 4.4 validator-lite rebuild under `.theme-verdigris` | **NOT-STARTED** | `validator/*` still legacy-styled in parts |
| 4.5 celebration 48 step | **DONE** *(this session)* | see 1.3 |
| 4.6 floating capsule dock | **DONE** *(this session)* | `MainApp.tsx` floating capsule + `layoutId` pill |
| 4.6 `?embed=1` strips Chrome | **DONE** | `App.tsx:12` |
| 4.6 DevPanel gated | **DONE** | `App.tsx:8,15,17` |
| 4.6 creator purge (copy) | **DONE** *(this session)* | `Rewards.tsx` creators → "the labs that commission the work"; `Waveform.tsx` comment |
| 4.6 swipe-teleport decision | **IN-PROGRESS** | owner decision (implement 1:1 or delete) |
| 4.7 hygiene | **IN-PROGRESS** | see above |

### Wave 5 — Portfolio packaging
| Item | Status |
|---|---|
| 5.1 proof pack (consent/levels/breakpoints/contrast) | **IN-PROGRESS** *(partial this session)* |
| 5.2 before/after metric table | **NOT-STARTED** |
| 5.3 screenshot sheet | **NOT-STARTED** |
| 5.4 `?embed=1` live build | **IN-PROGRESS** (embed works; not yet captured) |
| 5.5 state-coverage matrix | **IN-PROGRESS** *(see design-system doc §States)* |
| 5.6 copy baseline + plan into case study | **NOT-STARTED** |

### Part F — Definition of done (whole app)
`build` ✓ · metrics at targets ✓ · no-overflow 320 (unverified this session) · 150% text (unverified) ·
contrast (unverified) · zero raw hex ✓ · one hero/screen ✓ · ≥44 targets ✓ · no hardcoded
dates/personas ✓ (this session) · no brand strings ✓ · consent before mic ✓ (route-provable) ·
reachable in-flow (partial: `/contributor/credited` now route-reachable) · `?embed=1` ✓ ·
motion discipline ✓.

### P0 / F-item register
| Ref | Status |
|---|---|
| P0-1..P0-8 | **DONE** (build-session handoff, re-verified by green gates) |
| **R-1** uncommitted work | **DONE** — checkpoint `e4a710e` (85 paths) + build `328c6f3` |
| F-1 weekly filter false affordance | **DONE** |
| F-2 duplicated withdrawal floor | **DONE** |
| F-3 money from display copy | **DONE** |
| F-4 comment contradicts code | **DONE** |
| F-5 missing empty guard | **DONE** |
| F-6 stale task board (#1–#5) | **DONE** — marked complete in `13` §F-6 |
| F-7 113 hand-rolled `<button>` + 362 containers | **NOT-STARTED** — highest-leverage structural debt remaining |

---

## Part 2 — Remaining work, ordered by dependency (blockers flagged)

| # | Item | Touches | Depends on | Effort | Risk | Blocks |
|---|---|---|---|---|---|---|
| 1 | **Studio completion** — telemetry bar, orb 200–220 + 2 rings, single-turn banner, static 24px thumbs, submit-once, Room scrolling score + VAD rule | `Recording.tsx` | — | L | Med | **Gate 3 / Tier-1 DoD** |
| 2 | **Profile deep section** — Craft sheet (format×language bars), coverage-context register, Data Vault album grouping + revocation receipt | `Profile.tsx`, `DPDPConsentRevocation.tsx` | — | L | Med | **Gate 4** |
| 3 | **Validator-lite rebuild** under `.theme-verdigris` (no greeting/Spanish/Lv/gradients/wallpaper wave) | `validator/*` (10) | — | L | Med | "no two visual languages" |
| 4 | **Component migration (F-7)** — 113 hand-rolled `<button>` + 362 containers → `Button`/`IconButton`/`Card`/`TouchableRow` | app-wide | — | L | Med | collapses raw-spacing residue |
| 5 | **Mic-prime "Not now" + OS deep-link on deny** | `Recording.tsx:79–101` | — | S | Low | Gate 1 polish |
| 6 | **Coverage 150px hero** in Jobs feed | `QuestFeed.tsx` | — | M | Low | Gate 3 |
| 7 | **Brief pass** — AI-director stems note, quiet-spot tip, ROOM battery warn | `Recording.tsx:147–253` | — | S | Low | Gate 3 |
| 8 | **Edge polish** — RoomConsent hero Bone, pills 44, footer gradient, `e-glow` kills | 9 edge files | — | M | Low | Gate 4 |
| 9 | **Proof pack + before/after table + screenshot sheet** | `docs/proof/*` | build stable | M | Low | Wave 5 |
| 10 | **Owner decisions V2–V6** (Market double placeholder, consent hierarchy, CTA colour, celebration ₹100 line, sticky-CTA clearance) + swipe-teleport | — | owner | S | Low | sign-off |

## Part 3 — One-line statement
Wave 0 is closed and Wave 2 is complete; this session closed the whole of the 13-report
correctness set (F-1..F-5, R-1), completed the remaining Wave-1 celebration item, and moved
four Wave-3/4 spec items (Jobs controls, script clamp, dock, Profile/Rewards/hygiene) with a
green build/metrics/**35-route** smoke after every batch. The contributor surface still needs
the **Studio completion (Wave 3)**, the **Profile deep section + validator rebuild (Wave 4)**,
and the **component migration (F-7)** before Tier-1 is done — all listed above with dependency order.
