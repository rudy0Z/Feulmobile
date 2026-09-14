# 07 - Concept Lock - [PRODUCT] (2026-09-14)

> **Status:** Product-language authority, locked by the owner 2026-09-14. The owner has reserved the right to revisit the concept; if it changes, this file is updated the same session.
> **Authority order:** MASTER-BLUEPRINT.md (build) -> HANDOFF-NEW-SESSION.md (session entry) -> PORTFOLIO-DIRECTION.md (portfolio scope) -> THIS FILE (product language + lifecycle). plans/archive is history, never build input.
> **Naming:** product name remains unset. The brand slot stays an empty placeholder; the strings Feul / Grain never render in UI.

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
- Recording formats: solo LINES (read speech), guided scenario, interview against pre-recorded track, ROOM one-take.
- Visual doctrine: Bone/Carbon grounds, semantic tokens, one hero per viewport, acoustic instruments, quiet competence.

## 2. Language decisions (user-facing copy)

| Old (user-facing) | New (user-facing) |
|---|---|
| quest / quests / QuestFeed | job / jobs / job feed |
| Apply/start quest | Apply for job (one tap) |
| Quest states (open/locked etc.) | Job lifecycle: Available -> In-progress -> In-review -> Settled |

Rules:
- INTERNAL identifiers (route paths /recording/:id, file names QuestFeed.tsx, ids q-lines-1, function names) MAY stay as-is short-term for build stability; rename in a dedicated refactor commit, never mixed with copy changes. Any user-visible string must follow the new language immediately.
- The word interview as a RECORDING FORMAT stays (it names a format: performing an interview against a pre-recorded track). The concept's no interviews means no job-application interviews - never conflate the two in copy.

## 3. Lifecycle (governs Home/JobFeed/Wallet states)

Job states: Available -> In-progress -> In-review -> Settled.
- In-progress must support 24h resume (session-interrupted path already specced - extend to all jobs, not just interruptions).
- One-tap apply gate: language (already set) + standing check (pass) + mic check (real, silent) - then straight into Brief. No proposal/interview/hourly-log steps may appear in the apply flow.
- In-review maps to the existing pending-review surfaces. Settled maps to credited/settled money states.

## 4. Creator note (scope marker, not Tier 1)

The concept reintroduces creators as the lab-side authors (situation + targeting + acceptance criteria: duration, SNR, transcript match) with AI generating stems/turns/questions. This is OUT of Tier 1 scope (matches the retired Quest Creator -> redirect decision) but is now an explicit future direction, not a deleted mechanic. Do not build creator surfaces in Tier 1; do not contradict the model in copy (campaigns may reference who set the situation without implying an in-app creator tool).

## 5. Drift risk acknowledged

Owner will revisit this concept. When they do: update this file in the same session, run scripts/design-metrics.mjs, and check copy surfaces against the new language before any screen work.
