# Contributor section — handoff note (2026-09-16)

## What shipped this session
1. **Safety first** — the ~3,600 lines that were uncommitted since `e8f0bc3` are now two
   commits: `e4a710e` (checkpoint of Wave 0–2) and `328c6f3` (this session's build). Working
   tree clean. (Resolves audit finding **R-1**.)
2. **Correctness (13-AUDIT §4)** — **F-1** weekly filter now renders only days that carry
   entries (kills a false affordance); **F-2** withdrawal floor single-sourced from
   `lib/quests` (kills a silent-drift bug); **F-3** "this week" money derives from a `band`
   field, not a regex over display copy; **F-4** comment corrected; **F-5** `empty` guard added.
3. **Wave 1 completion** — new quiet in-flow award surface **`EarningCredited`** at
   `/contributor/credited` (distinct from the session-total `EarningCelebration`).
4. **Wave 3 (partial)** — Jobs title/controls: search `--search` (52), 44px filter circle
   (icon-only + aria), 44px chips; script excerpt is now a **2-line clamp**, never
   ellipsis-of-script.
5. **Wave 4 (partial)** — Profile stats session-derived + no invented fallbacks + Validator
   card demoted to `--r-md`; Rewards perks `--e-0` and Activate ≥44; **floating translucent
   capsule dock** in `MainApp`; creator-copy hygiene; brand strings **0**.
6. **Gates**: `build` 0 · `metrics` all-green · `smoke` **35/35** (new route added to the
   smoke list). A real smoke regression (on-mount haptic) was caught and fixed.

## What remains (dependency-ordered — full list in `14-CONSOLIDATED-AUDIT.md` §2)
| # | Item | Files |
|---|---|---|
| 1 | **Studio completion** — telemetry bar, orb + rings, single-turn banner, static thumbs, submit-once, Room scrolling score + VAD rule | `Recording.tsx` |
| 2 | **Profile deep section** — Craft sheet, coverage register, Data Vault grouping + revocation receipt | `Profile.tsx`, `DPDPConsentRevocation.tsx` |
| 3 | **Validator-lite rebuild** under `.theme-verdigris` | `validator/*` |
| 4 | **Component migration (F-7)** — 113 hand-rolled `<button>` + 362 containers | app-wide |
| 5 | Mic-prime "Not now" + OS deep-link on deny; coverage hero; Brief pass; edge polish | see §2 |
| 6 | Proof pack + before/after table + screenshot sheet (Wave 5) | `docs/proof/*` |
| 7 | Owner decisions V2–V6 + swipe-teleport | — |

## How to extend (run order — keep it green)
```bash
pnpm build     # must exit 0
pnpm metrics   # all rows green (exit 0)
pnpm preview & # then
pnpm smoke     # 35/35 routes render clean (exit 0)
```
Run **all three** after every change — `build`+`metrics` prove the source is disciplined,
`smoke` proves the app runs. Add any new screen to `scripts/smoke.mjs` `ROUTES`.

## Conventions that must hold
- Tokens only; one `--r-lg`+`--e-2` hero per viewport; ≥44px targets; money = ink.
- No hard-coded dates, balances, or personas — derive from `lib/session`.
- Every status = icon **+** label. Consent strictly precedes any mic (route-provable).
- A new preference: put the design detail in `theme.css` + `Primitives.tsx`, never inline.
