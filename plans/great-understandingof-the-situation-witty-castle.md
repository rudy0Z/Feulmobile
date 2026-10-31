# Feul — Full Redesign (Warm-Revolut / Coverage Marketplace): Milestone Execution Plan

> This plan **supersedes** the prior "Visual Craft Upgrade" (Pass T–5) that lived in this
> file. The imported bundle (`src/imports/00-MAKE-CONTEXT.md`, `01-DESIGN-SYSTEM.md`,
> `02-BUILD-SPEC.md`, `03-EDGE-CASES.csv`, `README.md`) is the new source of truth. Where
> the two disagree, the imports win — except the deliberate deviations listed below.

---

## Context

The app's **product thesis is strong** (coverage-not-hours, wallet-over-XP, pending-review
honesty, consent-as-contract) but the current build carries three problems the imported
spec exists to fix:

1. **The visual system is the wrong one.** Current tokens are an oklch *vermillion + cool-ish
   warm-neutral* system with a coexisting stock-shadcn contract, ~40 dead shadcn primitives,
   radius/shadow largely hardcoded (~10 radius values, 20+ raw shadows), and a
   Bricolage/Jakarta/Space-Mono type stack. The spec calls for a disciplined **two-layer warm
   palette** (terracotta / carbon / bone / verdigris / ochre / crimson), **Anek** superfamily
   with Indic line-height rules, radius `8/14/24/999`, elevation `e-0…e-glow`, and
   **light-everywhere except the Studio capture screen**.
2. **Core mechanics contradict the thesis.** A **Security Reserve** holds contributor money;
   **streaks** and **XP-as-status** are scattered through the UI; pay is a **flat `cashPayout`**
   with no coverage/scarcity model; the withdrawal floor is ₹50 with **no exact-gap** copy;
   consent is **English-only** and fires *inside* recording rather than provably before the
   mic; there is **no UPI VPA name-match**; and "approved instantly" copy still exists.
3. **The IA has gaps.** Home and Wallet are not yet cleanly differentiated (Home≠Wallet);
   quest cards are **tiles, not rows**, with the script excerpt in a Latin font; and ~15
   spec'd screens are missing (Market, OTPVerify, LanguageSelect, SetupChecklist,
   MicPermissionPrime, GuidedTaskIntro, EarningCredited, AddUPI, UPINameMatch,
   TransactionDetail, and the edge-case matrix).

**Intended outcome:** a single, coherent, honest earning app that reads as *"someone designed
the session, the ledger, and the marketplace as one warm system"* — Revolut's structural
discipline in a warm light palette, with darkness reserved to mean exactly one thing
("you're recording"). Full scope: Tier 1 + Tier 2 + Tier 3 (Validator retokened/redesigned) +
the full 23-case edge matrix.

> **Scope revision (user, 2026-08-31):** Quest-Creator is **dropped entirely**. The app scopes
> to **two roles only — contributors and validators.** Cramming quest creation, contribution,
> and validation into one app is the wrong shape; quest creation belongs in a separate surface
> and is out of scope here. All `quest-creator/*` work is retired from the plan (see M4).

---

## Locked decisions (this planning session)

- **Scope:** everything — Tier 1 + 2 + 3 + full edge-case matrix (user, 2026-08-31).
- **Roles: two only — contributor + validator.** Quest-Creator is dropped (user, 2026-08-31).
- **Branding:** **keep "Feul" for now.** The imports' `[PRODUCT]` placeholder / empty-slot
  mandate is **intentionally NOT applied** — the name decision is deferred. `FeulLogo`,
  `feul_*` storage keys, and "Feul" copy stay. (Deliberate deviation from `00/01/02`.)
- **Cadence:** **milestone checkpoints**, not per-phase. Stop and wait for review at the end
  of each of the 5 milestones below. (Foundation is the one place a wrong call poisons
  everything downstream, so it is its own first milestone.)
- **Integration model:** **in-place merge, not a fresh Make project.** Port tokens / layout /
  visual treatment into existing components; keep `Home.tsx` three-data-state logic,
  `DevContext` hooks, `lib/quests.ts` taxonomy, `lib/questContent.ts`. Never overwrite
  `Home.tsx` / `Wallet.tsx` wholesale.
- **Preserved as logic (spec-endorsed):** the 4-format taxonomy
  `lines | scenario | interview | room` and per-quest `questContent.ts` stay; only rendering
  and the *pay model* change.

### My inputs / improvements layered onto the spec
- **Build-safety token contract:** the new two-layer palette is mapped **onto** the existing
  shadcn/Tailwind contract (`--background`, `--foreground`, `--border`, `--primary`, the
  `@theme inline` block) so `index.css`'s `@apply` and `rounded-*` utilities keep compiling.
  Legacy aliases (`--radius-sm/md/lg`, `--shadow-card/glass`, `--font-sans/display/mono`,
  `--navy`, `--cream`, `--accent-*`) are **retargeted to the new primitives** rather than
  deleted, so straggler references resolve during the sweep instead of throwing.
- **Studio dark ≠ `.dark` class.** The stock greyscale `.dark` block is unused and stays for
  shadcn compat only; Studio uses `--surface-studio` explicitly. No app-wide dark theme.
- **Fix `tier.ts` bug:** indices 4 and 5 are both "Elite" — collapse to New/Verified/Trusted/
  Elite and make `nextTierName` correct.
- **Coverage as a real data model** in `quests.ts` (not just copy): `basePay`, `coverageMult`,
  `bonus`, derived `total`, plus `client` (lab), `coveragePct`, `districtsNeeded`,
  `clipsToClose` — so `AmountBreakdown` (`₹45 base × 1.6 + ₹10 = ₹82`) and coverage meters are
  driven, not faked. Same-work-same-pay is enforced: tier changes *access + settlement speed*,
  never a clip's `total`.
- **Radius migration map:** old `12/16/20 → 14 (--r-md)`, `24 → 24 (--r-lg, one per screen)`,
  `8 → 8`, `999 → 999`. Enforce **exactly one `--r-lg` hero object per screen**.
- **DevPanel gated** behind `import.meta.env.DEV` (currently always mounted) so the portfolio
  embed never ships debug tools.

---

## Verification harness (all milestones)

- **No `tsc`/`npx` available.** Transpile-check touched files with the sandbox esbuild:
  `node node_modules/.pnpm/esbuild@0.25.10/node_modules/esbuild/lib/main.js <file> --loader=tsx --jsx=automatic --format=esm >/dev/null`.
- **Dev server is already running** — do NOT run `vite build` / `npm run dev`.
- **`rm` is blocked** — retire files by stubbing (`export const X = null` / `return null`) or
  emptying, and remove imports; never shell-delete.
- **Grep gates per milestone** (examples): no raw `oklch(`/off-token hex in touched files; no
  `SilverTierReserve`/`reserve`; no `streak`/flame on contributor surfaces; no "instant"
  credit copy; radius set ≤ `8/14/24/999`; `import.meta.env.DEV` guards DevPanel.
- **Design floors:** script contrast ≥10:1, body ≥16px at 320px, one 48px ₹ on Home / none on
  Wallet, per-script line-height on Devanagari/Tamil, reduced-motion alternatives present.

---

# MILESTONE 1 — Foundation (design system + data model)  ⟶ STOP

> The phase that decides "designed vs assembled." Everything downstream references it.

### 1A. Token system (`src/styles/theme.css`)
- Add **primitives** (§1.1): `--t-terracotta-*`, `--t-carbon-*`, `--t-bone-*`, `--t-verdigris-*`,
  `--t-ochre-*`, `--t-crimson-*` (hex, from spec).
- Add **semantics** (§1.2): `--surface-{ground,raised,sunken,studio}`, `--text-*`,
  `--action-*`, `--state-{settled,pending,failed}`, `--money-{figure,positive,pending}`,
  `--border-{subtle,strong}`, `--divider`, `--focus-ring`.
- **Retarget the shadcn contract + legacy aliases** to the new semantics so the build stays
  green (`--background→surface-ground`, `--foreground→text-primary`, `--primary→action-primary`,
  `--navy→carbon-900`, `--accent-*` families → terracotta, status pairs → verdigris/ochre/
  crimson, etc.). Update `@theme inline` re-exports to match.
- **Radius** → `--r-sm 8 / --r-md 14 / --r-lg 24 / --r-full 999`; keep legacy `--radius-*`
  aliased onto these. **Elevation** → `--e-0…--e-3 + --e-glow` (carbon-tinted, glow = Studio
  only); alias `--shadow-*` onto them. **Motion** springs/durations per §4. Add per-script
  line-heights `--lh-latin/deva/taml`.

### 1B. Typography (`src/styles/fonts.css`, `theme.css` `@layer base`)
- Load **Anek Latin + Anek Devanagari + Anek Tamil** (Google Fonts); set
  `--font-ui/-script/-number` (tabular-nums). Retire Bricolage/Jakarta/Space-Mono imports
  (leave `--font-sans/display/mono` aliased to Anek for stragglers).
- Rework `@layer base` h1–p to the **11-step scale** (11/12/14/16/18/20/24/30/38/48/64); body
  floor 16px; apply Indic line-height to script blocks.

### 1C. Primitive component library (`ui/Primitives.tsx` + new files) → render in `DebugGallery`
- Extend/rebuild: `Amount` (₹127 + `.50` at 0.55×), `AmountBreakdown`, `LedgerRow`,
  `BalanceBlock`, `StatTile`, `StatusBadge` (icon+color+label), `ProgressPill`, `ProgressRing`,
  `CoverageMeter`, `QuestRow` (row, native-script excerpt), `StandingBadge`, `CraftBar`,
  `TierGate` (aspirational lock), `RecordTrigger` (≥72px, `--e-glow`), `LevelMeter`,
  `ScriptDisplay` (20–28px ≥10:1), `Sheet` (translucent, drag 1:1, interruptible), `TabBar`
  (translucent), `AppBar` (brand slot = current FeulLogo), `Button` (flat, 44/52/56),
  `MoneyState`. All **semantic-token only**, all states, both grounds, 320 + 430.
- Build the **responsive/token/type/component specimen** into `DebugGallery.tsx` (spec Phase
  1/2 "gallery page") with a 320/360/390/430 viewport switcher in DevPanel.

### 1D. Data-model + cleanup
- `quests.ts`: add coverage model fields + `client`; derive `total`; keep taxonomy + tags.
- `session.ts`: add **Standing** (reliability→access+speed) + **Craft** (per format×language)
  axes; add `consentLang`, `upiNameMatched`, verification stage; remove reserve/streak-derived
  fields. Fix `tier.ts` duplicate "Elite".
- **Delete (stub) dead code:** ~40 unused shadcn `ui/*` (clay direction dropped —
  its files are already stubbed empty). **Gate `DevPanel` + `DevOverlayHost` behind
  `import.meta.env.DEV`** in `App.tsx`.

**Checkpoint 1 acceptance:** primitives/semantics separated; one component renders on Bone and
Carbon unchanged; terracotta vs crimson passes chip/grayscale/colourblind; script ≥10:1;
Devanagari renders without matra clipping; radius set = 4; DevPanel gated; esbuild clean.

---

# MILESTONE 2 — Contributor core flows (Onboarding → Home → Studio → Quests)  ⟶ STOP

### 2A. Onboarding → first earning (`routes.tsx` + new screens)
Sequence (spec §3.1): **Market → Auth → OTPVerify → LanguageSelect → SetupChecklist (Home
empty) → ConsentSheet (native language, before ANY mic) → MicPermissionPrime (in-context) →
GuidedTaskIntro (Brief) → EarningCredited → AddUPI → UPINameMatch → FirstWithdrawSuccess.**
- New: `Market`, `OTPVerify`, `LanguageSelect`, `SetupChecklist`, `MicPermissionPrime`,
  `GuidedTaskIntro`, `EarningCredited`. Reuse/refit `Onboarding` (→ Market+Auth), the existing
  `ui/ConsentSheet` (make it native-language + provably pre-mic), `EarningCelebration`.
- Enforce: money credited before any profile/KYC; consent in contributor's language, one
  screen, before the mic is used even once; audio-playback affordance on instruction screens;
  district-local social proof; **no "instant" copy** (sweep `SubmissionGuidelines` et al.).

### 2B. Home (Home ≠ Wallet)
- Atmospheric header carrying **market state** (`Sarvam needs 400 Tamil clips`), not a greeting;
  one **48px hero ₹**; single `--r-lg`/`--e-2` money object overlapping the boundary; the five
  dashboard-only items (today/week, active assignments, needs-attention, next-milestone,
  coverage value); 2–3 recommended **rows**; recent activity (3). Keep the existing
  **three-data-state** logic (empty/pending/live) — rendering only.

### 2C. Studio (recording)
- Three beats **Brief → Capture → Review**, dark **only** here (`--surface-studio`).
  Brief shows full `AmountBreakdown` + audio playback. Capture: `ScriptDisplay` 20–28px native
  script ≥10:1, single `RecordTrigger` ≥72px (feedback on pointer-**down**, only `--e-glow`
  user), real-mic `LevelMeter`, `ProgressPill`, always-reachable pause/cancel. Cross-fade beats
  with persistent context bar; reduced-motion → static ring + "Recording". Retoken the existing
  format-aware capture (lines/scenario/interview/room).

### 2D. Quests marketplace → **rows**
- `QuestCard` → `QuestRow`: format eyebrow (10.5px), client/lab, script excerpt in
  `--font-script`, meta (duration·clips·language), right-aligned pay, coverage-multiplier chip;
  aspirational `TierGate` locked row with exact unlock path; **guarantee ≥1 open LINES row**.
  `FilterSheet` + `SearchField` + honest empty states.

**Checkpoint 2 acceptance:** fresh user reaches credited money <4 min at 320px, consent before
mic, no "instant" copy; Home has exactly one 48px ₹ + five dashboard items + 3 states; Studio
script readable/one-handed with real level meter; Quests are rows with client+multiplier+lock.

---

# MILESTONE 3 — Money (Wallet + payout, no Reserve)  ⟶ STOP

- `Wallet` → **bento** (Available · Pending · This week · Total), **no giant hero ₹**; weekly
  earnings bar; ledger tabs (All/Earnings/Withdrawals) with icon+color+label states; quality
  **bonuses as separate line items**; UPI destination with **VPA name-match** shown; withdraw
  with **exact gap** below the **₹100** floor (`₹50 more to withdraw`).
- **DELETE the Security Reserve:** stub `SilverTierReserveDrawer`, remove from `Wallet.tsx`,
  `DevPanel`, `DebugGallery`, and the `DPDPConsentRevocation` "Reserve Deduction" line. Remove
  contributor streak/XP-as-money surfaces.
- New/refit: `TransactionDetail`; wire `PayoutFlow` into `WithdrawConfirm/Success/Failed`
  (route `PaymentFailed` into the real path). Money **count-up from live value**, never restart
  from 0. `WalletEmpty` = same bento at ₹0.

### 3E. Audit-derived additions (from the post-M2 review, 2026-08-31)
Confirmed by two read-only audits (flow/routing + token/visual). Folded in here:

- **Withdrawal floor is actually ₹50, not ₹100.** `PayoutFlow.tsx:19` `minWithdraw: 50` and
  `:47` `PRESETS_CONTRIB=[50,100,200]` must both move to ₹100 (presets `[100,200,500]` or
  similar). The exact-gap copy hangs off this.
- **AddUPI + UPINameMatch don't exist** (spec expected them in the payout flow). `PayoutFlow`
  hardcodes `upi:'alex@upi'` (`:20/:34`). Build: `AddUPI` (enter VPA) → `UPINameMatch` (name
  verification shown) → confirm. First-withdraw path shows these; returning path skips to amount.
- **No payment-failure branch.** `PaymentFailed.tsx` exists but is unwired; the only interstitial
  is `SpoofingVerificationHold` (success-or-dismiss only). Route `PaymentFailed` into the real
  `WithdrawFailed` path with a corrective CTA.
- **Rewards economy decision (cross-cutting, blocks clean M3):** `Rewards.tsx` and
  `RewardClaimFlow.tsx` are **100% XP-as-money** — the exact anti-pattern M3 removes. Removing
  XP-as-currency means these two screens + the Rewards concept get **reconceived or retired**,
  not just retoken'd. `RewardClaimFlow` also carries "sent instantly / activates immediately"
  copy (`:137`). This ripples into M4 (validator/creator reuse `RewardClaimFlow`).
  **DECIDED (user, 2026-08-31): option (b) — reframe as non-monetary recognition.** XP-as-money
  is removed everywhere; rewards become **perks / early-access / badges that unlock via Standing
  and are explicitly NOT withdrawable** and never compete with the ₹ wallet. `Rewards.tsx` is
  reconceived as a recognition surface (not a store); `RewardClaimFlow` becomes a perk-activation
  flow (no "redeem XP", no "instantly/immediately" copy, no rupee/XP balance). Fix the missing
  bottom-nav discoverability (keep the surface, so give it a reachable entry). Portfolio framing:
  "kept the honest motivation (mastery, recognition), cut the extractive currency."
- **MainApp nav retoken (the seam):** `#8896A7` inactive icons → `--text-muted`;
  `rgba(255,255,255,.94)` bg → `--surface-raised`; cool border → `--border-subtle`; shadow →
  `--e-2`; `--font-sans`→`--font-ui`; `--accent-primary`→`--action-primary`. Also drop unused
  `Repeat2`/`RoleSwitcher` imports. Small but it wraps every warm screen — do it early in M3.
- **EarningCelebration / streak-flame / reputation-as-money copy sweep** (in-scope screens):
  RejectedTask `:214` "doesn't affect your streak", EarningCelebration `Flame` + "+100
  reputation" (`:86/:88`), Profile streak achievements + reputation hero, Wallet XP teaser.
- **Waveform default color prop** uses `--accent-primary-deep` (`:11/:87`) — one-line swap to a
  warm token (shared by Wallet/PayoutFlow/EarningCelebration/RewardClaimFlow).
- **Orphan cleanup (stub, don't shell-delete):** `ui/QuestCard`→`ui/FeulSkeleton`
  (dead chain), `NewUserHome`, retired funnel screens
  (`FirstEarning`/`DataConsent`/`SubmissionGuidelines`/`VoiceCalibration`/`ProfileSetup`),
  `DebugGallery`↔`SystemSpecimen` pair. Do opportunistically as their tokens would otherwise rot.

### 3F. M2 polish carried forward (visual/hierarchy nits found in review)
- **Home empty state**: the 48px ₹0 reads as deflating — swap to a smaller "start earning"
  treatment when `earnedToday === 0` (reserve the 48px hero for a real balance).
- **Home market-state line** (20px bold) competes with the hero for first read — demote weight.
- **QuestFeed at standing 1** renders interview+room as walls of locked `TierGate`s — cap to
  1–2 teaser locked rows per fully-locked section, or collapse with a "N more unlock at …".
- **MicPermissionPrime resets every quest** (per-mount state) — persist once-ever in
  `session.ts` (e.g. `micPrimed` flag) so it primes once, not per-recording.
- **ConsentSheet DPDP facts still English** in native-language mode — localize the 4 facts
  (partial localization is a coherence gap in the consent-as-contract promise).

**Checkpoint 3 acceptance:** no Reserve anywhere; every pending amount states what it waits on;
withdraw floor = ₹100 with exact gap visible; AddUPI + UPINameMatch present on first withdraw;
payment-failure path reachable; rewards-economy decision made + executed; MainApp nav on warm
tokens; no 48px+ ₹ on Wallet; count-up preserves live value; legacy `--shadow-card/glass`
unused on new Wallet.

---

# MILESTONE 4 — Validator (retoken + redesign)  ⟶ STOP

> **Quest-Creator dropped (user, 2026-08-31).** The app scopes to two roles — contributor and
> validator. Quest-Creator is out of scope; M4 is now validator-only.

- Retoken **all `validator/*` (14 files)** to the new system; apply one-hero / Home≠Wallet /
  rows discipline; remove validator streak/XP-as-money framing to match contributor honesty
  (keep Craft/accuracy as competence, not money).
- Validator states worth building: `DisagreementEscalation` (C-17), `AccuracyWarning` +
  throttled queue (C-18), **queue-empty cross-subsidy** to contributor feed (C-19), grading
  variants retoken.

### 4R. Retire Quest-Creator (stub, don't shell-delete)
- **Do not retoken or redesign `quest-creator/*` (4 files)** — retire them. Stub each screen
  (`export default () => null`) and remove all imports/routes/nav entries that reach them.
- Remove the **quest-creator role** from the role switcher / `RoleSwitcher`, `DevPanel` role
  toggles, `session.ts` role enum, and any onboarding/role-select copy that offers "create
  quests." App presents exactly two roles.
- Reuse of `RewardClaimFlow` etc. that assumed a creator path: drop the creator branch.
- Grep gate: no live import of `quest-creator/*`; no "quest creator" / "create a quest" role
  copy on shipping surfaces; role enum has 2 members.

**Checkpoint 4 acceptance:** validator renders entirely on new tokens (no old oklch/hex, no
navy brick); disagreement/accuracy/empty states present; no money-by-streak; quest-creator
screens/role fully retired (stubbed, unrouted, unreachable) with only two roles selectable.

---

# MILESTONE 5 — Full edge-case matrix (23 cases)  ⟶ STOP (final)

Build/refresh every `03-EDGE-CASES.csv` case and make each **reachable in a real flow**, not
only via DevPanel:
- **P0:** `RoomConsentRollCall` + minor gate (C-01/C-10), `CoverageFullState` + redirect
  (C-02), campaign-closes-mid-session honour + in-flight-paid (C-03/C-16), dialect-mismatch
  pay-adjust (C-07).
- **P1:** `SessionInterrupted` resume-from-Home (C-04), `ConsentRevokedPostPayment` ledger
  strike + settled retained (C-05), `SpoofingVerificationHold` + appeal (C-06), silent-room
  4-lane review (C-08), offline **UploadQueue** (C-11), **Repair Studio** partial rejection +
  shared taxonomy (C-12), `MicPermissionDenied` (C-13, refit), `NoisePause` (C-14, refit),
  empty catalogue (C-20), oversubscribed→Filled (C-21), tier-locked guarantee one open LINES
  (C-22), standard checks inline (C-23).
- **P2:** battery warning at Brief (C-15), quality-grade dispute appeal window (C-09).

**Checkpoint 5 acceptance:** all 23 cases render their `states_to_generate`; P0 cases are
reachable in normal flow; shared rejection taxonomy used both directions; each error = one
clear sentence + why + corrective CTA.

### 5X. Execution log (done 2026-08-31)
- **Shared taxonomy:** `src/app/lib/rejectionTaxonomy.ts` — 8 canonical reasons (noise,
  clipping, wrong-language, script-deviation, overlap, duration, synthetic, consent-missing),
  each `sentence + why + fix`. Consumed BOTH directions: contributor `RejectedTask` (Repair
  Studio, retokened warm) and validator `grading-variants/BinaryFlag` flag picker.
- **New screens (routed + DevPanel launch row each):** `RoomConsentRollCall` (C-01/C-10),
  `CoverageFullState` (C-02), `CampaignClosedHonour` (C-03/C-16), `DialectMismatch` (C-07),
  `SessionInterrupted` (C-04), `SilentRoomReview` (C-08), `CampaignOversubscribed` (C-21),
  `QualityGradeDispute` (C-09), `BatteryWarning` (C-15). All warm-token, no raw hex/oklch.
- **Normal-flow reachability:** QuestFeed → a ROOM-format quest routes through
  `/contributor/room-consent` before recording (consent gate, C-01/C-10). C-20 empty catalogue
  = QuestFeed EmptyState (names supply gap + waiting count + notify). C-22 = 3 LINES quests all
  `minTier:1` → ≥1 open row at every standing; locked rows are capped aspirational TierGates.
- **Existing overlays cover:** C-05 `DPDPConsentRevocation`, C-06 `SpoofingVerificationHold`,
  C-11 `ClipUploadFailed` (+save-draft), C-13 `MicPermissionDenied`, C-14 `AcousticNoisePause`
  (live in Recording), C-23 `DailyLimitReached`/`PaymentFailed` + taxonomy wrong-language.
- **Validator (M4):** C-17 `DisagreementEscalation`, C-18 `AccuracyWarning`, C-19
  `ValidatorQueueEmpty`.
- **Deferred niceties (states render via overlay; extras not built):** C-11 dedicated Home
  offline-queue row (overlay + save-draft stand in); C-23 duplicate-submission inline check.
- **Gates:** every touched/new file passes esbuild transpile; token-hygiene grep clean (only
  false positive: clip-ID string `#4821`). DevPanel navigates via `router.navigate` (mounted
  outside RouterProvider, so `useNavigate` is unavailable there).

---

## Key file anchors

- Tokens/type: `src/styles/theme.css`, `src/styles/fonts.css`, `src/styles/index.css`
- Primitives/gallery: `src/app/components/ui/Primitives.tsx`, `.../DebugGallery.tsx`
- Routes/shell: `src/app/routes.tsx`, `src/app/components/MainApp.tsx`, `App.tsx`,
  `components/PhoneFrame.tsx`
- Data/logic: `src/app/lib/{quests.ts,questContent.ts,session.ts,tier.ts,DevContext.tsx,motion.ts}`
- Contributor: `Home.tsx`, `QuestFeed.tsx`, `ui/QuestCard.tsx`→`QuestRow`, `Recording.tsx`,
  `Wallet.tsx`, `PayoutFlow.tsx`, `Profile.tsx`, `Performance.tsx`, onboarding set
- Validator: `validator/*` (+ `grading-variants/*`)
- Retire (stub/unroute, don't shell-delete): `quest-creator/*` (4 files) + quest-creator role
  wiring in `RoleSwitcher`, `DevPanel`, `session.ts` role enum, routes/nav
- Edge cases: `SilverTierReserveDrawer` (delete), `AcousticNoisePause`, `MicPermissionDenied`,
  `ClipUploadFailed`, `SpoofingVerificationHold`, `DPDPConsentRevocation`, `RejectedTask`,
  `DailyLimitReached`, `BatchExpired`, `PaymentFailed`, `RoleCollisionLockout`
- Delete/stub: dead `ui/*` shadcn set (clay direction dropped — files already stubbed empty)

## Global verification
Per milestone: esbuild transpile-check touched files; grep gates (tokens, no Reserve, no
streak/instant, radius ≤4, DevPanel gated); click-through of the affected flow at 360px in the
phone frame; contrast/reduced-motion/Indic checks. **Hard stop at each milestone — wait for
review before the next.**
