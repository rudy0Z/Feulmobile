# Build ledger — contributor + validator surfaces

> Live status of every part. Evidence = commit + gate run. Update this file every session.
> Gates: `pnpm build` (exit 0) · `pnpm metrics` (all rows green) · `pnpm smoke` (35/35) ·
> `pnpm shots` (36/36, no overflow) · `scripts/dockcheck.mjs` · `scripts/scrollcheck.mjs`.

## Phase ledger

| Part | Scope | Status | Evidence |
|---|---|---|---|
| Wave 0 — foundation lock | type scale 8, tokens, IconButton, a11y floors | **DONE** | metrics 8 sizes / 0 raw hex / 0 sub-44 |
| Wave 1 — onboarding→Home→first earn | consent route, calibration beat, EarningCredited | **DONE** | smoke 35/35 incl. `/contributor/credited` |
| Wave 1 — mic prime "Not now" | explicit decline + re-ask copy | **DONE** | `bec6c5c` |
| Wave 2 — wallet + withdrawal | bento, receipt, payout, F-1..F-5 | **DONE** | `74bf70c`; scrollcheck clears=true |
| Wave 3 — Jobs surface | title, search 52, chips 44, filter circle, 2-line clamp | **DONE** | `328c6f3`; shot `320-jobs.png` |
| Wave 3 — coverage hero (150px) | highest-coverage open job, CSS-only art | **DONE** | `bec6c5c`; shot `360-jobs.png` |
| Wave 3 — Studio telemetry + orb + banner | ₹ accrued, mic hint, halo rings, single-turn flag | **DONE** | `bec6c5c` |
| Wave 3 — review thumbs + submit-once | 24px static marks; double-submit blocked | **DONE** | `bec6c5c` |
| Wave 4 — Profile/Rewards/dock | session stats, r-md validator, e-0 perks, floating capsule dock | **DONE** | `328c6f3` + `74bf70c`; dockcheck 4/4 |
| Wave 4 — edge polish | RoomConsent bone hero, footer mask, e-glow purge | **DONE** | `bec6c5c` |
| **Wave 4 — Craft sheet** | format × language bars from session `craft`; bonus-eligibility note; honest empty state | **DONE** | `78ba699`; shot `360-profile.png` |
| **Wave 4 — coverage-context register** | quiet market-context chips (labs' open gaps), no bars-to-fill | **DONE** | `78ba699` |
| **Wave 4 — Data Vault albums + receipt** | grouped per-dataset blocks, per-album revoke → struck row + dashed revocation receipt | **DONE** | `78ba699` |
| **Wave 4 — validator de-legacy** | flat bone header (no greeting hero), wallpaper waveforms removed, radial/linear gradients removed, `Lv 4`/`₹568/32` hardcodes removed, Spanish→Marathi batch, `--color-success`→state tokens, initials avatar | **DONE** | `78ba699`; legacy-scan hits: 0 in ValidatorHome/GradingTask |
| F-7 — hand-rolled `<button>` migration (114 remaining) + container adoption | app-wide primitives | **PLANNED** | ratchet held at 114 (≤116) |
| Wave 5 — portfolio packaging | before/after metric table, screenshot sheet, embed capture | **PLANNED** | after F-7 or as needed |
| Full backend/payments/store deploy | real server, money rails, app stores | **DESCOPED** | `00-MAKE-CONTEXT`: unshipped portfolio prototype, no payment rails by design; store release needs owner accounts |

## Latest gate snapshot (2026-09-16, after `78ba699`)

| Gate | Result |
|---|---|
| `pnpm build` | exit 0, 4.3s |
| `pnpm metrics` | 8 sizes · 21 gradients (≤30) · 0 raw hex · 0 brand · 0 undefined refs · leaks 11 (≤11) · buttons 114 (≤116) |
| `pnpm smoke` | 35/35 routes render clean |
| `pnpm shots` | 36/36 clean, overflow=0 at 320/360/390/430 |
| dockcheck | profile 762 / rewards 672 / jobs 713 / home 697 — all ≤ 764 dock top |

## Session commit chain
`e4a710e` checkpoint → `328c6f3` contributor build → `e7aab71` docs → `74bf70c` visual-pass
fixes → `bec6c5c` studio+jobs → `642c66a` ledger → `78ba699` profile+validator. Working tree clean.
