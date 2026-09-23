# 13 — Audit: changes & completed work

**Date:** 2026-09-16 · **Scope:** everything changed since `e8f0bc3` (Wave 0 → Wave 2)
**Method:** re-ran all three gates on the current tree, then read the Wave 2 source rather
than trusting the session summary. Every claim below has file:line evidence.

---

## §0 Verdict

**The build is healthy and the work is real.** All three gates pass together on the current
tree: `build` exit 0, `metrics` 18 rows green (one known residue), `smoke` 34/34 clean.
Wave 2 (Wallet + Withdrawal) is genuinely complete and spec-true.

**But the audit surfaced seven issues the gates cannot see** — the gates check tokens and
rendering, not whether a control promises data it doesn't have, or whether a business rule
is declared twice. Those are in §4.

**The most urgent item is not a design issue at all (§5/R-1):** 84 files and ~3,600 lines of
work are sitting uncommitted, in the same repo where a `git checkout -- .` already destroyed
a session's work once.

---

## §1 Gate status — re-verified this session, not carried over

| Gate | Command | Result |
|---|---|---|
| Build | `pnpm build` | **exit 0**, 2081 modules, dist emitted |
| Metrics | `pnpm metrics` | **exit 0**, 18 rows |
| Smoke | `pnpm smoke` | **34/34 routes render clean**, real Chromium @390×844 |

### Metrics detail

| Row | Value | Rule |
|---|---|---|
| Distinct type sizes | 8 | ≤ 8 (locked scale) ✅ |
| Raw font-size | 0 | 0 ✅ |
| 12px instances | 127 | ≤ 150 ✅ |
| Double border in one style object | 0 | 0 ✅ |
| Screens over 10 borders | 0 | 0 ✅ |
| Components with >1 hero shadow | 0 | 0 ✅ |
| Gradients | 25 | ≤ 30 (masks) ✅ |
| Raw hex in components | 0 | 0 ✅ |
| Literal `rgba()` | 0 | 0 ✅ |
| Emoji | 0 | 0 ✅ |
| **Brand strings** | **2** | **0 — ⚠️ OVER (known residue, pre-existing)** |
| Heuristic targets < 44px | 0 | 0 ✅ |

**Ratchets:** raw spacing **0** ✅ · raw duration **0** ✅ · raw borderRadius **0** ✅ ·
primitive-token leaks **11** (≤11) ✅ · hand-rolled `<button>` **113** (≤116) ✅ ·
undefined token references **0** ✅

The only OVER is `brand strings`, which is the product's own name ("Feul Payouts" on the
receipt, "Feul payout …" in the share text). It is **not** a Wave 2 regression — it is
structurally tolerated by the script. Accept as documented residue, or allowlist
product-name strings so the row can go green honestly.

---

## §2 Change inventory

**84 changed files, all uncommitted.** Last commit `e8f0bc3`. Diffstat: 69 files,
**+3,639 / −2,579**.

Largest by churn:

| File | Δ | What |
|---|---|---|
| `ui/Primitives.tsx` | 524 | `IconButton`, `Card` fix, `ReceiptCard`, `Button` `style`/aria-disabled |
| `styles/theme.css` | 355 | 8-step type scale, spacing/radius/motion re-derivation, a11y guards |
| `Wallet.tsx` | 212 | Wave 2 bento rewrite |
| `ui/ConsentSheet.tsx` | 169 | DPDP verbatim + consent copy |
| `RoomConsentRollCall.tsx` | 158 | sweep fallout |
| `validator/GradingTask.tsx` | 145 | elevation + sweep |
| `validator/ValidatorWallet.tsx` | 136 | sweep |
| `scripts/design-metrics.mjs` | — | hybrid gate, 12 → 18 rows |

---

## §3 Wave 2 acceptance — verified against source, not the summary

Wave 2's stated gate: *no hero ₹ outside the bento · UTR in settled detail · gap exact ·
relative dates only · 40–44px controls · metrics not worse.*

| # | Requirement | Evidence | ✅ |
|---|---|---|---|
| 2.1 | Varied-size bento, one hero | `Wallet.tsx:91–130` — `--r-lg` + `var(--e-2)`, Available spans 2 cols, In review / This week half, Total earned quiet row | ✅ |
| 2.2 | Tabs 40px + weekly 7-pill filter | Tabs `Button size="sm"` `:168–177`; pills `minWidth:44, height:44` `:188` | ✅ |
| 2.3 | Exact-gap copy + aria-disabled | `₹{gap.toFixed(0)} more to withdraw` `:223`; `Button` primitive uses `aria-disabled` | ✅ |
| 2.4 | No hardcoded dates; "quest" → "job" | `'Today · 9:30 AM'`, `'Yesterday'`, `'Last week'` `:40–50`; "Re-record this job" `:274` | ✅ |
| 2.5 | Payout presets 44 + session balances | `minHeight:44` on presets; `balance = role==='contributor' ? profile.walletBalance : VALIDATOR_BALANCE` `PayoutFlow.tsx:341` | ✅ |
| 2.6 | Perforated receipt with UTR | `ReceiptCard` `Primitives.tsx:970–1017`; used in `Wallet:250` and `PayoutFlow:302` | ✅ |

Money is session-derived everywhere (`Wallet.tsx:65` `profile?.walletBalance ?? 0`), never
hardcoded. Metrics did not worsen: spacing/duration/radius held at 0, leaks held at 11,
buttons 113 (was 116).

---

## §4 Findings — what the gates cannot see

### F-1 · Medium — the weekly filter has 5 dead days

`Wallet.tsx:37` renders all seven `WEEKDAYS`, but the ledger only carries two distinct
`dayKey` values: **`'Mon'`** (entries 1, 2, 5, 6) and **`'Sun'`** (3, 4). Tue/Wed/Thu/Fri/Sat
render "Nothing here yet."

A 7-pill control that yields content on 2 of 7 days is a **false affordance** — it advertises
a week of data the demo doesn't have. Pick one: seed entries across all seven days, render
only days that have entries, or dim/disable empty days so the emptiness reads as intentional.

### F-2 · Medium — the withdrawal floor is declared twice

`PayoutFlow.tsx:19` declares `const WITHDRAW_FLOOR = 100;` while `quests.ts:244` already
exports `WITHDRAW_MIN = 100`. `Wallet.tsx:10` correctly imports `WITHDRAW_MIN`;
`PayoutFlow` re-declares it. **Two sources of truth for one business rule** — if the floor
ever moves, the payout screen drifts silently while the wallet screen follows.
*Fix:* `import { WITHDRAW_MIN } from '../lib/quests'` and delete the local const.

### F-3 · Low — money is derived from display copy

`Wallet.tsx:68–70` computes `thisWeek` by regexing the human-readable date string:
`/^(Today|Yesterday)/.test(e.date)`. That couples a **money figure to wording**. Reword a
date to "Earlier today" and the arithmetic silently changes. Derive from a timestamp or the
existing `dayKey`, never from display text.

### F-4 · Low — comment contradicts the code it describes

`Wallet.tsx:13` says *"Home has the one 48px ₹"* and `:90` says *"no hero ₹"*, yet `:106`
renders Available at `var(--fs-figure)` — **48px**. The bento *is* correctly the single hero
(`--r-lg` + `e-2`), so this is a documentation defect, not a visual one. But the comment
should say what is true: the only figure-size ₹ on this screen lives inside the bento.

### F-5 · Low — inconsistent `empty` guard

`Wallet.tsx:71` computes `withdrawn` **without** the `empty` guard, while `available`,
`pending`, `thisWeek` and `total` all have it. Harmless today because `withdrawn` only feeds
`total` (which *is* gated) — but it's a latent bug the moment `withdrawn` is surfaced on its
own in the empty state.

### F-6 · Info — the task ledger is stale

Tasks **#1–#5** (Wave 0) still read `pending`/`in_progress`, but **every one is verifiably
complete**:

| Task | Claim | Verified |
|---|---|---|
| #1 purge raw hex / dead code | done | metrics: raw hex **0**; `FeulLogo-142-1329.tsx` deleted (−11) ✅ |
| #2 `?embed=1` + `?w=` | done | `App.tsx:12`, `lib/chrome.ts:23`, `PhoneFrame.tsx:187–190` (`320/360/390/430`) ✅ |
| #3 Button / a11y guards | done | `theme.css:722` `:focus-visible`, `:728` `prefers-reduced-motion`, `:738` `forced-colors` ✅ |
| #4 type scale + spacing tokens | done | metrics: **8 distinct sizes**; `--space-1…N` on a 2pt grid ✅ |
| #5 border/shadow/gradient/44px sweep | done | 0 over-10 screens · 0 multi-hero · gradients 25≤30 · sub-44px **0** ✅ |

Recommended: mark #1–#5 complete so the board reflects reality.

### F-7 · Info — the 113 hand-rolled `<button>` is still the biggest debt

Unchanged from 116 → 113. Combined with the already-diagnosed **362 hand-built containers**
and `Card`/`TouchableRow` at ~0 usages, this remains the highest-leverage work: it is what
collapses raw values structurally rather than by sweep.

---

## §5 Risk

### R-1 · 🔴 Uncommitted work — the same trap that already fired once

**84 files / ~3,600 lines are uncommitted**, and nothing has been committed since `e8f0bc3`.
This repo's own standing rule (from the 2026-09-15 incident) is *never run
`git checkout -- .`* because it reverted 12 files of uncommitted work. Every byte of
Wave 0, Wave 1 and Wave 2 is currently exposed to that same command.

**Recommendation: commit a checkpoint now** — before starting Wave 1. It costs one command
and removes the single largest risk to the project.

---

## §6 Recommended order

1. **Commit a checkpoint** (R-1) — do this first.
2. **F-2** — single-source the withdrawal floor (2-minute fix, prevents a real drift bug).
3. **F-1** — make the weekly filter honest (visible on the main wallet screen).
4. **F-3 / F-4 / F-5** — small correctness + doc hygiene.
5. **Wave 1 (Gate 1):** 48px celebration step, distinct `EarningCredited` surface, phase-1
   proof pack — and per the owner's accepted sequencing, **3 hero screens to portfolio-shot
   quality before backfilling the rest**.
6. **113 hand-rolled `<button>` + container migration** (F-7) — the structural debt.

Still awaiting owner decisions: **V2–V6** (Market double placeholder, consent verbatim below
fold, CTA colour, celebration → ₹100 line, sticky-CTA clearance).

---

## §7 One-line statement

*Gates green (build 0 · metrics 18 rows · smoke 34/34); Wave 2 complete and spec-true; seven
issues found that no gate can catch — one a duplicated business rule, one a filter promising
data it doesn't have — and ~3,600 lines of uncommitted work that should be committed before
anything else.*
