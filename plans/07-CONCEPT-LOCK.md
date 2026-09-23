# 07 - Concept Lock - [PRODUCT] (2026-09-14)

> **Status:** Product-language authority, locked by the owner 2026-09-14. The owner reserved the right to revisit; update this file in the same session when that happens.
> **Authority order:** MASTER-BLUEPRINT.md (build) -> HANDOFF-NEW-SESSION.md (session entry) -> PORTFOLIO-DIRECTION.md (portfolio scope) -> THIS FILE (product language + lifecycle). plans/archive is history, never build input.
> **Naming:** product name remains unset. Brand slot stays an empty placeholder (BrandSlot component); the strings Feul / Grain never render in UI.

---

## The locked concept (verbatim, owner 2026-09-14)

**Feul - final product concept**

A gig-job marketplace where Indians earn rupees by performing real situations AI labs need for coverage - speaker x dialect x district x acoustic condition.

- **Job, not quest:** one-tap apply (language + standing + mic check), single session, 24h resume. No interviews, no proposals, no hourly log. States: Available -> In-progress -> In-review -> Settled.
- **Coverage pay:** same work = same base. total = round(base x coverageMult) + bonus. Standing unlocks access + faster settlement, never changes base. Rs 100 floor reachable in session one (calibration + first job).
- **AI as director:** creators set situation + targeting + acceptance criteria (duration, SNR, transcript match). AI generates stems/turns/questions. Humans perform solo (LINES read speech), guided scenario, interview against pre-recorded track, or ROOM one-take.
- **Trust = money movement:** native-language DPDP consent with verbatim delete-without-clawback strictly before any mic. Auto-check (silence/clipping) + validator review (Accept/Flag/Reject with taxonomy tag). In-flight honoured if campaign closes. Exact-gap withdraw, relative-date expectation, UTR receipts, revocation ledger.

---

## 1. What this confirms (no change - already locked)

- Economics: total = round(base x coverageMult) + bonus; same work same base pay; standing changes access + settlement speed only.
- Rs 100 withdrawal floor reachable in session one (calibration + first job).
- Consent: native-language DPDP consent, verbatim delete-without-clawback line, strictly before any mic access (including calibration).
- Trust surfaces: in-flight honoured if campaign closes; exact-gap withdraw; relative-date expectation; UTR receipts; revocation ledger; auto-check (silence/clipping) + validator review with taxonomy tags.
- Recording formats: solo LINES (read speech), guided scenario, interview against pre-recorded track, ROOM one-take. The word "interview" as a RECORDING FORMAT stays; the concept's "no interviews" means no job-application interviews - never conflate in copy.
- Visual doctrine: Bone/Carbon grounds, semantic tokens, one hero per viewport, acoustic instruments, quiet competence.

## 2. Language decisions (user-facing copy)

| Old (user-facing) | New (user-facing) |
|---|---|
| quest / quests / Quest tab | job / jobs / Jobs tab |
| Apply/start quest | Apply for job (one tap) |
| Quest states | Job lifecycle: Available -> In-progress -> In-review -> Settled |

Rules:
- INTERNAL identifiers (route paths `/recording/:id`, file names `QuestFeed.tsx`, ids `q-lines-1`, lib exports) MAY stay as-is for build stability; rename in a dedicated refactor commit, never mixed with copy changes. Any user-visible string follows the new language immediately.
- Done so far (verified): tab bar, Home copy, QuestFeed search/empty/filter, NotificationsPanel, EarningCelebration, PayoutFlow next-step label.

## 3. Lifecycle (governs Home/JobFeed/Wallet states)

Job states: Available -> In-progress -> In-review -> Settled.
- In-progress supports 24h resume (session-interrupted path - extend to all jobs).
- One-tap apply gate: language (set) + standing (pass) + mic check (real, silent) -> straight into Brief. No proposal/interview/hourly-log steps in the apply flow.
- In-review maps to existing pending-review surfaces; Settled maps to credited/settled money states.

## 4. Creator note (scope marker, not Tier 1)

Creators as lab-side authors (situation + targeting + acceptance criteria: duration, SNR, transcript match) with AI generating stems/turns/questions are OUT of Tier 1 scope (matches the retired Quest Creator -> redirect decision) but are now an explicit future direction, not a deleted mechanic. Do not build creator surfaces in Tier 1; do not contradict the model in copy.

## 5. Build-session deltas applied (2026-09-15)

- P0-1 real mic levels (AnalyserNode), P0-2 contrast (action 6.5:1, pending text 7.9:1), P0-3 repair hero on Bone, P0-6 DevPanel gated, P0-7 brand placeholder everywhere, P0-8 relative dates + session personas.
- `scripts/design-metrics.mjs` + `pnpm metrics` = mechanical discipline check; `CLAUDE.md` = AI entry doc. Baseline recorded in `plans/design-metrics-baseline.md`.

## 6. Drift risk acknowledged

Owner will revisit this concept. When they do: update this file in the same session, run `pnpm metrics`, and re-check copy surfaces against the new language before any screen work.
