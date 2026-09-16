# Feul ([PRODUCT]) — Information Architecture

> Repo: `D:\portfolio porjects\feul final build\Feulmobile-main` (branch `master`) · Documented 2026-09-16 from latest code.
> Evidence basis: `src/app/routes.tsx`, `src/app/components/*`, `src/app/lib/*`, `plans/03-EDGE-CASES.csv`, `PORTFOLIO-DIRECTION.md`, `docs/audit/*.png`.
> Companion docs: [02-user-flows](02-user-flows.md) · [05-state-path-catalog](05-state-path-catalog.md) · [01-user-journey-map](01-user-journey-map.md) · [03-empathy-maps](03-empathy-maps.md)

## 1. What this app is

A **gig earning platform for the AI data economy**: Indian contributors record voice clips (LINES · SCENARIO · INTERVIEW · ROOM formats) that build datasets for AI labs. Two in-app roles — **Contributor** (earns by recording) and **Validator** (earns by grading) — plus shared payout/reward infrastructure. The economic thesis: *labs buy coverage (speaker × dialect × district × acoustic condition), not hours*; rarity pricing, standing tiers, and consent law (DPDP) are product mechanics, not decoration. AI itself is infrastructure — never a chatbot. Product name deliberately open (`BrandSlot` component; codename `[PRODUCT]`).

**Stack (observed):** React 19 + Vite + react-router 7 (browser router, flat route table), Tailwind + Radix + MUI + motion. **No backend** — session/consent/wallet are localStorage stubs (`src/app/lib/session.ts`); auth is a Pass-1 stub (`signIn()`).

## 2. Top-level structure

```
[PRODUCT] app
├── Entry / Auth
│   ├── Onboarding (market → OTP → language) … FEU-00..02
│   └── Consent Gate (native full-screen route, D-3) … FEU-03
├── Contributor app  (/contributor  · docked: Home, Jobs, Wallet, Profile)
│   ├── Home — 1 dashboard, 3 data states … FEU-04..06
│   ├── Quest Feed (Jobs) … FEU-07
│   ├── Recording machine (/recording/:questId) … FEU-08..15
│   ├── Post-submission: Rejected/Repair … FEU-16 · Credited FEU-39 · Celebration FEU-40
│   ├── Edge-case states (P0/P1 ledger C-xx) … FEU-17..25
│   ├── Wallet → Payout machine … FEU-26..33
│   ├── Rewards + claim flow … FEU-34..35
│   ├── Profile → Performance / Validator application … FEU-36..38
│   └── Overlays: noise pause, upload failed, mic denied, DPDP revocation,
│       collision lockout, batch expired, daily limit … FEU-53..59
├── Validator app  (/validator  · docked: Home, Tasks, Wallet, Profile)
│   ├── Validator Home / Tasks / Grading … FEU-41..43
│   ├── Disagreement escalation · Accuracy warning · Queue empty … FEU-44..46
│   └── Wallet / Rewards / Profile … FEU-47..49
├── Shared: Role Selection FEU-50 · Payout machine (role-aware) · Reward claim (role-aware)
└── Dev-only: Dev Panel FEU-51 (overlays launcher, state toggles, grading-variant preview)
```

## 3. Screen inventory (complete, code-traced)

IDs are canonical across all docs in this set. "Shot" = matching `docs/audit/NN-*.png`.

### Entry / auth / consent
| ID | Screen | Route / source | Purpose | Shot |
|---|---|---|---|---|
| FEU-00 | Market / sign-in | `/` · `Onboarding.tsx` (step `market`) | Product intro + auth method (Google/email/phone — stubbed) | 01-market |
| FEU-01 | OTP verify | Onboarding step `otp` | Verification step (input-otp) | 02-otp |
| FEU-02 | Language select | Onboarding step `language` | UI/consent language pick (consentLang) | 03-language |
| FEU-03 | Consent Gate | `/contributor/consent` · `ConsentGate.tsx` | **Native route, not a sheet** (owner decision D-3): mic prime → DPDP consent; proof URL signed-out | 04-consent, 07a-consent-sheet |

### Contributor core
| ID | Screen | Route / source | Purpose | Shot |
|---|---|---|---|---|
| FEU-04 | Home — empty (day 0) | `/contributor` · `Home.tsx` state `empty` | "Ready to start" hero, first-job CTA (FIRST_JOB) | 05-home-empty |
| FEU-05 | Home — pending (in review) | Home state `pending` | "Clearing" hero, first submission in review, chain-next CTA | 05b (live variant) |
| FEU-06 | Home — live (earning) | Home state `live` | "Earned today" hero, live activity feed, milestones | 05b-home-live |
| FEU-07 | Quest Feed (Jobs) | `/contributor/quests` · `QuestFeed.tsx` | Campaign list; format/coverage economics on rows; room → roll-call, else → recording | 06-jobs |
| FEU-08 | Recording — Brief | `/recording/:questId` beat `brief` | Job brief: excerpt, pay breakdown (base × coverage mult + bonus), battery pre-check (C-15) | 07-brief/2/3 |
| FEU-09 | Consent Sheet (in-flow) | `ui/ConsentSheet.tsx` in Recording | Per-session consent before capture (skip if already consented) | 07a |
| FEU-10 | Mic Permission Prime | Recording guard (`MicPermissionPrime`) | Once-ever, in-context permission rationale (persisted `micPrimed`) | 07c-mic-prime |
| FEU-11 | Recording — Capture | beat `capture` | Live recording, waveform, real mic level (`useRealMicLevel`), noise pause trigger (C-14) | 08-capture/2/3 |
| FEU-12 | Recording — Review | beat `review` | Clip review, retake-all or submit; room: silent-speaker review (C-08) | 09-review/2/3 |
| FEU-13 | Recording — Pending | beat `pending` | Submitted state; exit to Home | 10-pending/2/3 |
| FEU-14 | Waiting for Prompts | Recording guard (`WaitingForPrompts`) | Quest present but `available=false` — honest disabled card | — |
| FEU-15 | Recording — Not Found | Recording guard (`NotFound`) | Bad questId fallback → back to Jobs | — |
| FEU-16 | Rejected Task / Repair | `/rejected/:questId` · `RejectedTask.tsx` | Rejection explained via shared taxonomy (sentence + why + fix); re-record CTA | 22-adjacent |
| FEU-39 | Earning Credited | `/contributor/credited` | Quiet in-flow award — one task credited mid-session | 26-credited |
| FEU-40 | Earning Celebration | `/earning-celebration` | Session-total celebration | 25-celebration |

### Contributor edge-case states (routes exist; ledger = `plans/03-EDGE-CASES.csv`)
| ID | Screen | Route | Ledger | Shot |
|---|---|---|---|---|
| FEU-17 | Room Consent Roll Call | `/contributor/room-consent` | C-01/C-10 (on-tape consent, under-18 gate) | 17-edge-room-consent |
| FEU-18 | Coverage Full | `/contributor/coverage-full` | C-02 (honest rejection + redirect to scarce campaign) | 18-edge-coverage-full |
| FEU-19 | Campaign Closed (honour) | `/contributor/campaign-closed` | C-03/C-16 (filled view / withdrawn view; in-flight honoured) | — |
| FEU-20 | Campaign Oversubscribed | `/contributor/campaign-oversubscribed` | C-21 (live slot count → filled) | — |
| FEU-21 | Dialect Mismatch | `/contributor/dialect-mismatch` | C-07 (rarity-gaming check; pay adjusts to base, honest) | 19-edge-dialect |
| FEU-22 | Session Interrupted | `/contributor/session-interrupted` | C-04 (19-min take saved, resume 24h) | 20-edge-session-interrupted |
| FEU-23 | Silent Room Review | `/contributor/silent-room` | C-08 (4-lane timeline, one empty) | 21-edge-silent-room |
| FEU-24 | Quality Grade Dispute | `/contributor/quality-dispute` | C-09 (7-day appeal → 3rd reviewer) | 22-edge-quality-dispute |
| FEU-25 | Battery Warning | `/contributor/battery-warning` | C-15 (ROOM take risk pre-check) | — |

### Money
| ID | Screen | Route / source | Purpose | Shot |
|---|---|---|---|---|
| FEU-26 | Wallet | `/contributor/wallet` · `Wallet.tsx` | Balance, ledger, in-review total; empty state toggle (dev) | 11/11b-wallet |
| FEU-27 | Payout — Add UPI | `/contributor/payout` step `add-upi` (`PayoutFlow.tsx`, role-aware) | First-withdrawal VPA entry | — |
| FEU-28 | Payout — UPI Name Match | step `name-match` | VPA-holder name vs profile name (fraud check; sets `upiNameMatched`) | — |
| FEU-29 | Payout — Amount | step `amount` | Withdrawal amount (12-payout-amount) | 12-payout-amount |
| FEU-30 | Payout — Confirm | step `confirm` | Review + confirm; spoofing overlay trigger | — |
| FEU-31 | Payout — Success/Receipt | step `success` | Receipt card (ref, VPA, amount, date) + share | — |
| FEU-32 | Payment Failed | `PaymentFailed.tsx` overlay | Retry path; money stays available (C-23) | — |
| FEU-33 | Spoofing Verification Hold | `SpoofingVerificationHold.tsx` (overlay) | C-06: TTS flag → explained hold + appeal + timeline | — |

### Growth / profile
| ID | Screen | Route | Purpose | Shot |
|---|---|---|---|---|
| FEU-34 | Rewards | `/contributor/rewards` · `Rewards.tsx` | Milestones/badges (tier context: access + settlement speed, never clip pay) | 14-rewards |
| FEU-35 | Reward Claim Flow | `/contributor/rewards/claim` (role-aware) | Claim steps | — |
| FEU-36 | Profile | `/contributor/profile` · `Profile.tsx` | Identity, languages, UPI, standing/craft, links out | 15-profile |
| FEU-37 | Performance | `/contributor/performance` · `Performance.tsx` | Quality/acceptance stats | 16-performance |
| FEU-38 | Validator Application | `/validator-apply` · `ValidatorApplication.tsx` | Pro-role application from Profile | — |

### Validator app
| ID | Screen | Route | Purpose | Shot |
|---|---|---|---|---|
| FEU-41 | Validator Home | `/validator` · `ValidatorHome.tsx` | Pending batches → grading; empty toggle (dev) | 23-validator |
| FEU-42 | Validator Tasks | `/validator/tasks` · `ValidatorTasks.tsx` | Grading queue | — |
| FEU-43 | Grading Task | `/validator/grading/:taskId` · `GradingTask.tsx` | Grade a clip; 5 instrument variants (`grading-variants/`: segmented ships; pills/arc/keyboard/binary = dev preview; also `UndoToast`) | 24-validator-grading |
| FEU-44 | Disagreement Escalation | `/validator/disagreement/:taskId?` | C-17: 3rd-reviewer escalation, honest pending state | — |
| FEU-45 | Accuracy Warning | `/validator/accuracy-warning` | C-18: private gold-standard drift warning → throttle → suspension | — |
| FEU-46 | Validator Queue Empty | `/validator/queue-empty` | C-19: cross-subsidize → offers contributor work | — |
| FEU-47 | Validator Wallet | `/validator/wallet` | Validator earnings + payout entry | — |
| FEU-48 | Validator Rewards | `/validator/rewards` | Validator milestones | — |
| FEU-49 | Validator Profile | `/validator/profile` | Validator identity/settings | — |

### Shared / chrome / dev
| ID | Screen | Source | Purpose |
|---|---|---|---|
| FEU-50 | Role Selection | `/role-selection` · `RoleSelection.tsx` | Role router (contributor / validator) |
| FEU-51 | Dev Panel | `DevPanel.tsx` (mounted outside router) | Overlay launcher, state toggles (homeState, wallet/quest empties, tier bypass), grading-variant preview |
| FEU-52 | Notifications Panel | `ui/NotificationsPanel.tsx` | In-app notifications (badge unread: 3 live / 1 pending / 0 empty) |
| FEU-53 | Acoustic Noise Pause | `AcousticNoisePause.tsx` (overlay) | C-14: pause + level meter + guidance, never discard |
| FEU-54 | Batch Expired | `BatchExpired.tsx` (overlay) | Campaign batch expiry notice |
| FEU-55 | Clip Upload Failed | `ClipUploadFailed.tsx` (overlay) | C-11: local queue keeps clips, retry |
| FEU-56 | Mic Permission Denied | `MicPermissionDenied.tsx` (overlay) | C-13: rationale + OS settings deep link |
| FEU-57 | DPDP Consent Revocation | `DPDPConsentRevocation.tsx` | C-05: revoke post-payment; data deleted, money not clawed back, ledger row struck |
| FEU-58 | Role Collision Lockout | `RoleCollisionLockout.tsx` (overlay) | Same-person contributor/validator integrity lock |
| FEU-59 | Daily Limit Reached | `DailyLimitReached.tsx` (overlay) | Explain limit purpose (C-23) |

**Retired routes (observed, kept as redirects):** `/first-earning`, `/data-consent`, `/submission-guidelines`, `/voice-calibration`, `/profile-setup` → Home/consent/recording; `/quest-creator*` → contributor (dropped from scope 2026-08-31); `/app/*` → contributor; `*` → `/`.

## 4. Hierarchy & navigation model

```
/ (Onboarding FEU-00..02)
└─→ /contributor/consent (FEU-03, gate) ─→ /contributor (dock)
    /contributor ─┬─ Home FEU-04..06 ─→ /recording/:id · /rejected/1 · /contributor/wallet · /contributor/rewards
                  ├─ Jobs FEU-07 ─→ room ? FEU-17 : /recording/:id
                  ├─ Wallet FEU-26 ─→ /contributor/payout (FEU-27..31) · /recording/:id (from ledger detail)
                  └─ Profile FEU-36 ─→ FEU-37 performance · FEU-34 rewards · FEU-38 validator-apply
    /recording/:id [guards: FEU-15 notfound · FEU-14 waiting · FEU-09 consent · FEU-10 mic prime]
                  beats: brief FEU-08 → capture FEU-11 → review FEU-12 → pending FEU-13 → Home
    edge states FEU-17..25 ← reached from Jobs/Home/recording contexts (also dev launcher)
    /validator-apply FEU-38 → (approval) → /validator dock
    /validator ─┬─ Home FEU-41 ─→ /validator/grading/:id FEU-43 ─→ disagreement FEU-44 (flag path)
                ├─ Tasks FEU-42 ─→ grading FEU-43
                ├─ Wallet FEU-47 ─→ /validator/payout (shared machine) · rewards FEU-48
                └─ Profile FEU-49
    shared: /role-selection FEU-50 · RoleSwitcher (chrome, 180 ms delay nav) · reward claim FEU-35 (both roles)
```

**Navigation mechanisms (observed):** flat `createBrowserRouter` table (no nested layout beyond the two docked apps); bottom dock = 4 tabs (`MainApp.tsx`: Home, Jobs, Wallet, Profile — Rewards is *not* a tab); back = `navigate(-1)` buttons + left-swipe gesture (>72 px from left edge) on Performance/Rewards/RejectedTask/ValidatorApplication/validator sub-screens; session object (`session.ts`) drives Home data-state derivation + consent + mic-prime persistence; DevPanel can deep-jump any route (`router.navigate`) and force any toggleable state.

**Redirects with intent:** retired funnel steps fold into Home-first; calibration folded into LINES capture (`/voice-calibration` → `/recording/q-lines-1`).

## 5. Navigation rules worth quoting in a case study

1. **Consent is a route, not a sheet** (D-3): full-screen sibling of `/contributor`, deliberately outside the dock — "consent must not look like a step inside the app you are being asked to trust"; signed-out proof URL.
2. **Every edge state is a real route** — C-01…C-23 states are smoke-testable URLs, not buried branches; honesty states get first-class design (Coverage Full pairs every rejection with a redirect).
3. **Two docks, one economy**: contributor and validator share the payout machine and reward-claim flow but keep separate docks; queue-empty cross-subsidizes roles (C-19).
4. **Money screens share one machine** (`PayoutFlow`) with role-aware back-paths — one tested withdrawal pattern serves both sides of the marketplace.

*Everything above is observed in code; nothing invented. Screens without an audit shot exist in code but were never screenshotted in `docs/audit/` (flagged `—`).*
