# Build ledger — contributor section

> Live status of every part. Evidence = commit + gate run. Update this file every session.
> Gates: `pnpm build` (exit 0) · `pnpm metrics` (all rows green) · `pnpm smoke` (35/35) ·
> `pnpm shots` (36/36, no overflow) · `scripts/dockcheck.mjs` (dock clearance) ·
> `scripts/scrollcheck.mjs` (sticky CTA clearance).

## Phase ledger

| Part | Scope | Status | Evidence |
|---|---|---|---|
| Wave 0 — foundation lock | type scale 8, tokens, IconButton, a11y floors | **DONE** | metrics 8 sizes / 0 raw hex / 0 sub-44; commits `e4a710e`.. |
| Wave 1 — onboarding→Home→first earn | consent route, calibration beat, EarningCredited | **DONE** | smoke 35/35 incl. `/contributor/credited` |
| Wave 1 — mic prime "Not now" | explicit decline + re-ask copy | **DONE** | `Recording.tsx` MicPermissionPrime ghost action; commit `bec6c5c` |
| Wave 2 — wallet + withdrawal | bento, receipt, payout, F-1..F-5 | **DONE** | `74bf70c` + scrollcheck clears=true |
| Wave 3 — Jobs surface | title, search 52, chips 44, filter circle, 2-line clamp | **DONE** | `328c6f3`; shot `320-jobs.png` |
| Wave 3 — coverage hero (150px) | highest-coverage open job, CSS-only art | **DONE** | commit `bec6c5c`; shot `360-jobs.png` |
| Wave 3 — Studio telemetry | ₹ accrued + mic-distance hint in the dark shell | **DONE** | commit `bec6c5c` |
| Wave 3 — trigger orb | 200px + 2 rings behind the trigger (borders, no gradient) | **DONE** | commit `bec6c5c` |
| Wave 3 — single-turn noise banner | inline flag + retake action after NoisePause | **DONE** | commit `bec6c5c` |
| Wave 3 — review static thumbs | 24px muted waveform marks per clip | **DONE** | commit `bec6c5c` |
| Wave 3 — submit-once guard | Button disabled + "Submitting…" on first submit | **DONE** | commit `bec6c5c` |
| Wave 4 — Profile/Rewards/dock | stats session-derived, r-md validator, e-0 perks, 44 Activate, floating capsule dock | **DONE** | `328c6f3` + `74bf70c`; dockcheck 4/4 clears=true |
| Wave 4 — edge polish | RoomConsent hero → Bone, footer gradient mask, e-glow → e-2 ×2 | **DONE** | commit `bec6c5c` |
| Wave 4 — Craft sheet (format×language bars) | Profile deep section | **PLANNED** | next session |
| Wave 4 — coverage-context register | Profile deep section | **PLANNED** | next session |
| Wave 4 — Data Vault grouping + revocation receipt | Profile + DPDPConsentRevocation | **PLANNED** | next session |
| Wave 4 — validator-lite rebuild under `.theme-verdigris` | `validator/*` (10 files) | **PLANNED** | next session |
| F-7 — 113 hand-rolled `<button>` + 362 containers migration | app-wide primitives adoption | **PLANNED** | highest-leverage structural debt |
| Wave 5 — portfolio packaging | before/after table, screenshot sheet, embed build | **PLANNED** | after Craft sheet |

## Latest gate snapshot (2026-09-16, after `bec6c5c`)

| Gate | Result |
|---|---|
| `pnpm build` | exit 0, 6.4s |
| `pnpm metrics` | 8 type sizes · 0 raw hex · 0 brand · 0 undefined refs · gradients 26 ≤ 30 |
| `pnpm smoke` | 35/35 routes render clean |
| `pnpm shots` | 36/36 clean, overflow=0 at 320/360/390/430 |
| dockcheck | profile 632 / rewards 663 / jobs 745 / home 689 — all ≤ 764 dock top |
