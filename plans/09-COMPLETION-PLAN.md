# 09 — Progress Audit + Completion Plan (contributor app → shippable 2026 prototype)

> **Generated:** 2026-09-15 · **Audited against:** `08-REDESIGN-HANDOFF-README.md` → `08-VISUAL-REFERENCE-MAP.md` → `08-PHASE-1..4`
> **Verified mechanically:** `pnpm build` exit 0 · `pnpm metrics` → `plans/design-metrics-baseline.md` (2026-09-15T18:28:53Z)
> **Repo:** 94 files in `src/`, 68 screen components, 15,369 LOC in `src/app`
> **Purpose:** state exactly what is done, what is missing, what blocks progress, and the ordered work to finish all four phases.

---

## Part A — Where the build actually stands

### A.1 Headline

| Phase | Spec | Status | Notes |
|---|---|---|---|
| 1 — Onboarding → Home → First-earn | `08-PHASE-1` | **~75% done** | Screens exist and are largely spec-true. Gate never formally run. |
| 2 — Wallet + Withdrawal | `08-PHASE-2` | **~45% done** | Structure present, craft missing (receipt, varied bento, weekly filter). |
| 3 — Jobs + Studio | `08-PHASE-3` | **~60% done** | Studio is genuinely good (dark-only, real levels, consent-gated). Jobs feed is pre-redesign. |
| 4 — Profile/Rewards/Edges/Validator/Hygiene | `08-PHASE-4` | **~35% done** | Edges exist with violations. Validator not rebuilt. `?embed=1` absent. |
| **Overall** | | **≈ 52%** | Foundation (tokens/primitives) is the strongest layer; chrome hygiene is the weakest. |

### A.2 Phase 1 — item-by-item

| § | Requirement | Verdict | Evidence |
|---|---|---|---|
| 1.1 | Market: BrandSlot 36, reserved illo slot, 38/700 headline, ₹10–220 ink, "Cash lands after reviewer checks" 14, "2,400+ near Pune" dot + 13, Google 56 primary + Phone/Email 56 secondary, "same button" 13 | **DONE** | `Onboarding.tsx:77–136`. Gradient mask on CTA block (`:102`). |
| 1.2 | OTP-6 boxes 60×68, 3+3 split, idle border-strong / filled action / failed crimson, "N tries left", autofill + paste, resend 44 + countdown, Verify disabled until filled, locked cooldown | **DONE** | `Primitives.tsx:435–514` (`maxWidth: 60, height: 68`, split at `:507–511`); error + lock `Onboarding.tsx:179–245`. |
| 1.3 | Language min-height tiles (never fixed), native 20 `lh-deva`, label 13 muted, 3s listen sample, selected `terracotta-50` + action border + Check, CTA disabled until pick, ₹12 inline Amount | **DONE** | `Onboarding.tsx:250–319` (`minHeight: 96`, `fontSize: 20`, `ListenChip`, `Amount`). Telugu wraps by grid reflow, not fixed height. ✔ |
| 1.4 | Consent gate blocks ALL mic incl. calibration; one native screen; readable + speaker-icon listenable; DPDP verbatim; "Listen to how your voice is protected in {language}"; mic prime after (benefit-framed, **Not-now preserves re-ask**, **OS deep link on deny**); proof artifact | **PARTIAL** | Verbatim string correct (`ConsentSheet.tsx:99–100`). Listen chip correct (`:166–172`). Gate correctly precedes mic (`Recording.tsx:58–72` — mic hook only mounts inside `Capture`, `:296`). **Missing:** implemented as a *bottom sheet* not "one native screen"; mic prime has no explicit Not-now affordance (`Recording.tsx:96–98` offers only Allow + back chevron); OS deep link not wired from the prime; no proof artifact committed. |
| 1.5 | Home newcomer empty/pending/live on ONE chrome; market line 16/600 not greeting; bell + unread; empty `r-lg e-1` card + checklist + consent preview; pending BalanceBlock + "12 in review…"; live 48 ink + MiniStats + CTA naming job+pay; Active/Needs-you; Milestone exact path; Picked 2–3 rows; Recent 3 ledger; one `r-lg e-2` hero | **DONE** | `Home.tsx:82–256`. Market line `:50–54`; hero `:105–150`; checklist `:165–195`; milestone `:297–321`; derived money `:31–47` (no magic rupees). |
| 1.6 | Guided first job (calibration folded in, no standalone screen); posture "Keep phone 15cm"; 2-phrase calibration w/ live canvas; full turns → Review → Pending → EarningCredited quiet (48/64 ink, one truth line, no confetti); count-up from live value; chain sums ≥100 via `questTotal()` | **PARTIAL** | Calibration folded in `Recording.tsx:298–302`; posture `:471`; `questTotal` chain `quests.ts:252–258`; `EarningCelebration.tsx` correct tone (light, no confetti, haptic, routes to `/contributor` + wallet). **Missing:** only the 64px step exists — the 48px step (`:67`) is absent; no distinct `EarningCredited` surface; calibration has no live canvas feedback (meter only). |
| Gate | `pnpm build` + `pnpm metrics` not worse; 320 no-overflow; 150% text; contrast floors; consent-gate proof; real-levels proof | **NOT RUN** | Build passes. Metrics **worse than baseline in every category** (see Part B). No 320/150%/contrast evidence. No proof artifacts. |

### A.3 Phase 2 — item-by-item

| § | Requirement | Verdict | Evidence |
|---|---|---|---|
| 2.1 | No hero ₹ (bento is hero) | **DONE** | `Wallet.tsx:73–86` — no large number, title 30/700 + sub. |
| 2.1 | Bento **varied sizes** (hierarchy, not equal 2×2) | **MISSING** | `Wallet.tsx:82` `gridTemplateColumns: '1fr 1fr'` + four identical `BentoCell`s `:83–86`. Equal grid. |
| 2.1 | ZIXO mini-barcode sparkline on This-week | **MISSING** | `:85` plain cell. |
| 2.1 | UPI row: VPA 15/700 + verdigris "Name matched" 11/700 + "2–3 days" 12 + Edit 13 | **DONE** | `:98–115`. |
| 2.1 | Tabs All/Earnings/Withdrawals **40px** | **PARTIAL** | `:122–144` present but ≈30px (`padding: '7px 16px'`, 13px). |
| 2.1 | Weekly 7-pill bar filter | **MISSING** | Not present. |
| 2.1 | Every pending row states wait-reason; bonus separate; failed struck + Re-record | **DONE** | wait-reason `:39–40`, bonus `:41–42`, struck + sheet `:224` — but copy says **"Re-record this quest"** (job language violation). |
| 2.1 | Sticky withdraw: gradient mask (never hard divider) + `aria-disabled` + exact gap `₹X more to withdraw` | **PARTIAL** | Gradient mask `:170` ✔. Gap copy is `Earn ₹X more to withdraw` `:175` — not the exact string. `aria-disabled` absent (`Button` sets only native `disabled`, `Primitives.tsx:663`). |
| 2.2 | Payout 5 steps | **DONE (structure)** | `PayoutFlow.tsx`: AddUPI 60/18 `:67`; NameMatch 84 + ~1400ms `:91,99`; Amount ₹30/700 `:150`; Confirm 48 centre + ochre relative date `:219,234–238`; Success 96 verdigris `:271`. |
| 2.2 | Presets **44**; no `sent to` line; **perforated receipt** w/ mono UTR, NPCI timestamp, From/To, Share-for-WhatsApp | **MISSING** | Presets ≈35px `:172`; forbidden `sent to {vpa}` line `:189`; receipt card absent (only a 2-row Reference/To card `:282–294`). |
| 2.2 | Balances from session, no hardcodes; never INSTANT/IMPS | **PARTIAL** | Hardcoded `balance: 127.5 / 568.0` `:25–26`. No INSTANT/IMPS in copy ✔. |
| 2.2 | Relative dates only | **PARTIAL** | Payout uses `new Date()` `:201,260` ✔ — but `Wallet.tsx:45–46` hardcodes `'Mon · Feb 24'`. |

### A.4 Phase 3 — item-by-item

| § | Requirement | Verdict | Evidence |
|---|---|---|---|
| 3.1 | Title 30/700 `Jobs`; search 48–52; **44 filter circle**; chips **44** (All/LINES/SCENARIO/INTERVIEW/ROOM) | **PARTIAL** | `QuestFeed.tsx`: title says **"Quests"** `:246`; search `height: 48` `:103`; chips `height: 38` `:127,143`; filter chip is a labelled pill, no 44 circle. |
| 3.1 | Sections 20/700 + 13/500 blurb | **DONE** | `:188–191`. |
| 3.1 | Rows: eyebrow 10.5 action + client 12; excerpt 17 script 2-line clamp; meta 12; pay 22 ink right; `×1.6` chip | **PARTIAL** | `Primitives.tsx:682–742` — eyebrow ✔, excerpt 17 ✔ but **`whiteSpace: 'nowrap'` + ellipsis `:714`** (spec: never ellipsis-of-script → needs 2-line clamp), pay 22 ink ✔, coverage chip ✔. |
| 3.1 | One 150px coverage hero max (acoustic art) | **MISSING** | No hero in feed. |
| 3.1 | TierGate dashed aspirational w/ exact path; LOCK_CAP 2; hidden count 14 secondary | **DONE** | `Primitives.tsx:746–766`; `QuestFeed.tsx:178–199`. |
| 3.1 | No `Top pay` **default** sort | **OK (verify)** | Default is `'all'` `:47`. `Top pay` still offered as a filter `:26` — needs owner ruling (see D-4). |
| 3.1 | Honest empty + Notify | **DONE** | `:79–90, 271–285`. |
| 3.2 | Brief: eyebrow/title/AmountBreakdown/meta chips/scene + excerpt + `Hear sample` 44/numbered how-it-works/AI-director stems note/quiet-spot tip/battery warn on ROOM <20%/fixed CTA via gradient mask | **PARTIAL (verify)** | `Recording.tsx:147–253` region contains Brief; `AmountBreakdown` imported. Needs a pass to confirm the AI-director stems note, quiet-spot tip, and ROOM battery warn are all in the Brief body. |
| 3.3 | Capture dark `#201611` **only**; ScriptDisplay 26 bone ≥10:1 `lh-deva`; 7 bars terracotta from real `AnalyserNode` fft128 RMS; timer 26 tabular; telemetry bar; orb 200–220 + 2 rings; trigger 84 `e-glow`; posture 15cm; inline single-turn banner; NoisePause; Room scrolling score + VAD/manual advance only; waveform moves only while sound | **STRONG PARTIAL** | Dark ground ✔ (`--surface-studio`, `Recording.tsx:23–26`). Real levels ✔ (`useRealMicLevel.ts` fft128 RMS, fast-attack/slow-release, **freezes at 0 in silence** `:26–30`). 7 bars ✔ `:395,506,588`. Trigger 84 ✔ (`Primitives.tsx:801–828`). Posture ✔ `:471`. NoisePause ✔ `:414`. **Missing:** telemetry bar (Exit · Turn x/y · ₹ accumulated · mic-distance icon+label) not confirmed; orb 200–220 + 2 rings not confirmed; inline single-turn banner ("Traffic noise on turn 4. Retake turn 4 or submit all?") not confirmed; Room VAD/manual-advance rule not confirmed. |
| 3.4 | Review: 28 title, rows 44 play `terracotta-50` + 15/600 + 13 tabular + settled Check + **static 24px thumbs**, fixed Submit lg + ghost Retake-all 44, submit-once | **PARTIAL** | `Recording.tsx:602–652`. Title ✔ `:611`. **Static 24px thumbs not confirmed.** Submit-once not enforced. |
| 3.4 | Pending: 76 verdigris Check + 28 `Sent for review` + 16/500 reviewer line + ochre `Expected on approval` Amount card | **PARTIAL (verify)** | `Recording.tsx:654+`. |
| 3.5 | Repair: hero `9/10 passed · fix 1 → ₹25` ink (no dark/glow, single border); 5-col matrix `r-sm`; flagged `error-bg` + single border; tip card; "Re-recording doesn't affect standing" 12 muted; 56 flat + Later 44; Appeal 7d | **PARTIAL** | `RejectedTask.tsx` has coherent repair structure but off-scale sizes (13.5/12.5 `:172,176,213`) and **hardcoded `'Feb 24, 2026 at 2:45 PM'` `:16`** + persona **Priya** `:19`. |

### A.5 Phase 4 — item-by-item

| § | Requirement | Verdict | Evidence |
|---|---|---|---|
| 4.1 | Single Standing `r-lg e-2` hero | **DONE** | `Profile.tsx:138–141`. |
| 4.1 | Validator Tier demoted to `r-md` | **VIOLATION** | Still `r-lg` `Profile.tsx:332`. |
| 4.1 | **Craft sheet** (format × language bars + bonus-eligibility note) | **MISSING** | Not present. |
| 4.1 | Coverage-context register | **MISSING** | Not present. |
| 4.1 | Data Vault grouped album blocks + per-item Revoke 1.5px → revocation receipt + struck ledger | **PARTIAL** | Flat single item `:10–12`; Revoke exists `:298–310`. No grouping, no receipt. |
| 4.1 | Avatar flat `bone-100` ink (no gradient) | **VIOLATION** | `linear-gradient` `Profile.tsx:43`. |
| 4.1 | Stats "This month" (not lifetime) | **VIOLATION** | "lifetime figures" `:69` + hardcoded ₹1,250/23/94% `:82–93`. |
| 4.2 | Single hero; perks `e-0`; Activate 44; badges sunk-locked; no streaks | **PARTIAL** | `Rewards.tsx`: hero ✔ `:103–106`; perks `e-1` `:77`; Activate ≈29px `:170–171`; badges ✔ `:210–211`; no streaks ✔. |
| 4.3 | 9 edges reachable in-flow with the specified structure | **PARTIAL** | All 9 route + render. Violations: RoomConsent hero is **dark** `:111` (must be Bone), rows `e-1` `:163`, mic/QR **40×40** `:203–204,220–221`, minor pills **34** `:295`, hard `borderTop` footer `:402` (needs gradient), `e-glow` `:427`; DialectMismatch `e-glow` `:191`; CoverageFull footer 12px `:165`. Back buttons 40×40 in **all 9** files. |
| 4.3 | Plus offline queue row + retry; mic-denied sheet + OS link; spoof-hold card + appeal + timeline; wrong-language / duplicate / limit / UPI-failed inline messages | **PARTIAL** | `MicPermissionDenied.tsx`, `SpoofingVerificationHold.tsx`, `DailyLimitReached.tsx`, `ClipUploadFailed.tsx`, `PaymentFailed.tsx` all exist. In-flow reachability not verified. |
| 4.4 | Validator lite rebuilt on contributor primitives under `.theme-verdigris`; no greeting / Spanish / Lv / gradients / wallpaper waveform | **NOT REBUILT** | `ValidatorHome.tsx`: greeting `:61–67,120`; Spanish batch `:16`; **"Lv 4" `:254`**; **4 gradients `:94,154,188,289`**; wallpaper waveform `:29,101–102,197–198`; and **`profile?.name` `:129` with no `useSession` import → broken reference**. `GradingTask.tsx` partially rebuilt (`theme-verdigris` `:180`) but retains a gradient `:218`, random waveform bars `:272–279,462–469`, legacy `--color-success` alias `:37,397`, raw `rgba()` shadows `:291,453,497`. |
| 4.5 | Light Bone, 48/64 ink tabular, one truth line, arrived pill, count-up, routes Home/Wallet | **PARTIAL** | `EarningCelebration.tsx` — light ✔, 64 ✔, count-up ✔, pill ✔, routes ✔. **48px step missing.** |
| 4.6 | Floating capsule dock: 4 hubs, icon+label always, 64 bar / 44 targets, translucent blur, no border+shadow stack | **PARTIAL** | `MainApp.tsx:27–82` — 4 hubs ✔, labels ✔, 64 ✔, blur ✔, no border ✔. But it is a **full-width bar**, not a floating capsule with sliding active pill. |
| 4.6 | **`?embed=1` strips PhoneFrame/DEV at App level** | **MISSING** | Grep for `embed` returns one comment only (`App.tsx:7`). No implementation. |
| 4.6 | DevPanel gated `import.meta.env.DEV` | **DONE** | `App.tsx:8,15,17`. |
| 4.6 | Creator purge: delete `/quest-creator*` routes + redirects, creator copy, creator assets; grep `creator` returns only archive + note | **NOT DONE** | Routes `routes.tsx:151–153`; copy `Rewards.tsx:28` ("campaign creators"); asset comment `Waveform.tsx:8`; dead brand asset `src/imports/FeulLogo-142-1329.tsx` (raw hex `:5`, imported by `ValidatorHome.tsx:9,107`). |
| 4.6 | Focus-visible 2px + forced-colors fallback; freeze infinite skeleton pulse under reduced-motion | **MISSING** | `QuestFeed.tsx:263–266` `RowSkeleton` pulses `repeat: Infinity` unconditionally. No `:focus-visible` or `forced-colors` rule anywhere. |
| 4.6 | Swipe-teleport: 1:1 track + velocity commit + snap-back, or delete | **UNDECIDED** | `Recording.tsx:38–50` has a crude 72px edge-swipe only. |

---

## Part B — Gate readings and the metric gap

> **Status: all gates green as of 2026-09-16.** Wave 0 closed. The gate itself was
> re-baselined to a **hybrid** model (see D-1/D-2 resolutions in Part C) — borders and
> shadows are now *structural* rules checked per component, not totals summed across
> the app; gradients keep a raised count because masks legitimately repeat on CTAs.

**Before → after (Wave 0 closure):**

| Metric | Before | After | Rule | Verdict |
|---|---|---|---|---|
| Distinct type sizes | 25 | **8** | ≤ 8 (locked scale) | ✔ |
| Raw font-size values | 715 | **0** | 0 (tokens only) | ✔ |
| 12px instances | 239 | **123** | ≤ 150 (chrome only) | ✔ |
| Double border in one style object | — | **0** | 0 | ✔ |
| Screens over 10 borders | — | **0** | 0 | ✔ |
| Components with >1 hero shadow | 4 | **0** | 0 | ✔ |
| gradients | 26 | **24** | ≤ 30 (masks) | ✔ |
| raw hex in components | 17 | **0** | 0 | ✔ |
| literal `rgba()` in components | 151 | **0** | 0 (use `--*-rgb`) | ✔ |
| emoji in code strings | 0 | **0** | 0 | ✔ |
| brand strings (Feul/Grain) | 0 | **0** | 0 | ✔ |
| heuristic targets < 44px | 19 | **0** | 0 | ✔ |

**What the closure actually changed:**
1. **Type scale collapsed 25 sizes → 8 tokens** (`12/14/16/18/20/24/32/48`), swept across
   54 files / 715 call sites. Every `fontSize` now resolves through `--fs-*`; `theme.css`
   is the only file allowed to state a literal size.
2. **`IconButton` primitive created** and 14 hand-rolled icon controls replaced across
   13 screens. The 44px floor now lives in one place and cannot be re-broken per-screen.
   `AppBar` gained a compliant `onBack`. This removed all 19 touch-target violations.
3. **151 literal `rgba()` calls replaced with `--*-rgb` channel tokens.** The hex rule
   never caught these — a genuine blind spot, now closed and enforced by a new gate row.
4. **114 `<p>` elements promoted 12px → 14px.** The principle enforced is "no *prose* at
   12px" — 12px is chrome (eyebrows, pills, timestamps, numeric meta), never body copy.
   At 300 nits in daylight, 12px prose is not readable.
5. **Decorative gradients removed** where they were not masks: the `Profile` avatar wash,
   the `ValidatorProfile` banner wash.
6. **Elevation corrected to one hero per component**: `GradingTask`'s progress chip and
   `ValidatorProfile`'s badge tiles were both carrying `e-2`; demoted to `e-1`.

**Still open (not gated, tracked for later waves):**
- **Hardcoded dates + personas** in `Profile.tsx` / `RejectedTask.tsx` / `Wallet.tsx`
  (`'Jan 12, 2026'`, `'Mon · Feb 24'`, Priya/Anil/Meena/Asha/Ravi/Iqbal) — violates the
  no-hardcodes rule. Wave 1/2 work; the metric script does not yet detect it.
- **`gradients` 24 vs a "masks only" reading** — the raised ceiling of 30 is the agreed
  compromise (D-2). Worth a pass in Wave 3 to confirm each one is a mask, not a wash.

**Resolved since the audit (were real defects):**
- `StatusPill` — deleted. Confirmed dead: its `var(--status-*-bg/-text)` tokens never
  existed in `theme.css`, and nothing imported it. `StatusBadge` (icon + label) covers
  every semantic status.
- `ValidatorHome.tsx` undeclared `profile` — fixed with a real `useSession()` import.
- Raw hex in `DevPanel` (12) and `PhoneFrame` (4) — swept to tokens.
- `src/imports/FeulLogo-142-1329.tsx` — deleted (orphaned, imported by nothing).

---

## Part C — Blocking conflicts (owner decision required)

> Per the build contract: **flag conflicts, never silently decide.** These four block a clean "metrics at target" claim.

### ✅ Resolutions — owner decisions, 2026-09-16

All five conflicts are now decided. Recorded here so no future session re-litigates them.

| # | Decision | Consequence |
|---|---|---|
| **D-1** | **Hybrid gate.** Borders + shadows become *structural* rules (double border in one style object = 0; >1 hero shadow per **component** = 0), not app-wide totals. | Replaces the unreachable `<15` / `<10`. Implemented in `design-metrics.mjs`. |
| **D-2** | **Gradients keep a raised count** (≤ 30) rather than the unreachable `2`. | Masks legitimately repeat on CTAs; a per-screen rule ("≤1 mask per viewport") is the intent but not yet mechanised. |
| **D-3** | **Consent becomes a native route** at `/contributor/consent`, not a lazy sheet. | Makes the consent-gate proof a pasteable URL — the trust story becomes evidence a recruiter can open. Sheet code is retained only if it can deep-link to the same route. |
| **D-4** | **Keep the creator redirects; purge creator UI + copy only.** | Resolved by authority order, not preference: `07-CONCEPT-LOCK §4` (higher authority than `08-PHASE-4`) says creators are "an explicit future direction, not a deleted mechanic" and "do not build creator surfaces in Tier 1; do not contradict the model in copy." So: no creator screens, no "we deleted this" claim. |
| **D-5** | **360px default**, with `?w=320\|360\|390\|430` switcher. | Already implemented. Makes the 320 no-overflow gate a one-click check. |

**Type scale** — locked to the **Utilitarian 8 steps**: `12 / 14 / 16 / 18 / 20 / 24 / 32 / 48`.

**Warm 20%** — the single warm element lives in exactly three places: the **capture halo**,
the **money figure**, and the **payout receipt**. Everywhere else stays Bone / flat / hairline.

---

### D-1 — The border/shadow targets contradict the mandated card treatment ⚠️ **HIGH** — ✅ RESOLVED (see table above)

`CLAUDE.md` (Non-negotiables) says non-hero objects are `r-md`/`r-sm` + `e-0/1` + **1px `--border-subtle`**. `01-DESIGN-SYSTEM` mandates **exactly one `r-lg` + `e-2` hero per viewport**. With **68 screens**, that is a structural minimum of ~68 shadows and ~68 borders — arithmetically incompatible with targets of `< 15` borders and `< 10` shadows.

**Options**
- **A — Re-baseline to density, keep the craft.** Change the metric to *per-viewport density*: borders ≤ 1 per card surface (inputs + flagged states + the hero only), shadows ≤ 1 per viewport, and enforce it by the rule that only the hero may carry `e-2`. Expected landing: borders ~45–60, shadows ~68. Rewrite the target row in `01-DESIGN-SYSTEM` + `04-ISSUE-MAP` + the script's target column.
- **B — Honour the numbers literally.** Strip borders app-wide and separate surfaces **tonally** (bone-50 ground vs bone-0 raised) — a legitimate 2026 move and consistent with the "Bone + white" two-layer ground in the handoff. Shadows collapse to the hero only. Borders → inputs only (~12). Shadows still floor at ~68 (one hero/viewport) unless the hero drops to `e-1`… which then floors at ~68 too.
- **C — Split the target by surface class.** Hero/one-per-view objects exempt; everything else ≤ 1 border + `e-0`. This is A with clearer bookkeeping.

**Decided: A/C hybrid (the "structural rules" model).** The measured distribution
justified it: across 46 screens, borders per screen were median 3, p90 7, max 9 — screens
legitimately stack several cards (`PayoutFlow`'s 5 steps, `Profile`'s sections). The real
"borders inside borders" failure is caught precisely by the double-border rule, which is 0.
A per-file shadow count also produced false positives: `CampaignClosedHonour` holds two
*mutually exclusive* views, each correctly carrying exactly one hero — so the rule now
counts **per component**, not per file.

### D-2 — Gradient target (2) contradicts the mandated gradient-mask CTAs ⚠️ **HIGH**

The spec *requires* gradient masks on: Market CTA (`08-PHASE-1 §1.1` implied), Language CTA, Wallet sticky withdraw (`§2.1`), Brief fixed CTA (`§3.2`), RoomConsent footer (`§4.3`) — that is ≥5 mandated uses. Add the Jobs chip-row fade (`QuestFeed:155`) and that is 6+. Target of **2** cannot hold.

**Options**
- **A (recommended)** — Raise the gradient target to "masks only, ≤ 1 per viewport" and add a lint exception for `linear-gradient(…transparent…)` used as a scroll/CTA mask. Kill the other 20 (validator, SwipeButton, RoleSwitcher, Profile avatar, etc.).
- **B** — Replace masks with `mask-image` / `--e-3` overlap so the literal gradient count stays low. More work, cleaner count, but `mask-image` is not counted either way.

**Recommendation: A**, with all non-mask gradients deleted (target: 26 → ~6).

### D-3 — Consent surface: "one native screen" vs "lazy sheet" ⚠️ **MEDIUM**

`08-PHASE-1 §1.4` says **"One native screen"**. `routes.tsx:48–49` records the opposite decision ("Consent is now a lazy sheet"). Today it is a bottom sheet rendered over an empty ground (`Recording.tsx:59–65`).

**Recommendation:** promote it to a **real full-bleed screen** at `/contributor/consent` (route-addressable, which also makes the *proof* a URL you can paste into the case study: open `/recording/q-lines-1` signed-out → lands on consent, mic never mounts). Then `08-PHASE-1` and `routes.tsx` agree, and the gate evidence becomes trivial. If you prefer the sheet, `08-PHASE-1 §1.4` must be amended — say the word and I'll update it.

### D-4 — Creator purge: delete vs redirect ⚠️ **MEDIUM**

`08-PHASE-4 §4.6` says *delete* `/quest-creator*` routes **and redirects**. `07-CONCEPT-LOCK §4` records the opposite: creators are an "explicit future direction, not a deleted mechanic", and the redirect *is* the recorded decision.

**Recommendation:** keep the three redirects (they are 3 lines, cost nothing, and preserve the future-direction story), but satisfy the *spirit* of the purge: delete the dead brand asset `src/imports/FeulLogo-142-1329.tsx`, remove the "campaign creators" phrasing from `Rewards.tsx:28` → "the labs that commission the work", fix the `Waveform.tsx:8` comment, and make `grep -ri creator src/` return **only** `routes.tsx` + a note. This clears the 17-hex and creator-copy items without contradicting `07`.

### D-5 — 360 default vs the 390px phone shell ⚠️ **LOW**

Target is **360 default (320 compact, 390–430 large)**, but `PhoneFrame` renders a fixed **412×868 body / 390×844 screen** (`PhoneFrame.tsx:245,257`). There is no way to *prove* 360 or 320 today.

**Recommendation:** add a width switcher (dev-only, or `?w=320|360|390|430`) that sets the screen width, and make 360 the default. This turns the "320 no-overflow" gate from an assertion into a 10-second check. Pair it with `?embed=1` in the same change — both are App-level chrome work.

---

## Part D — The completion plan

Six waves. Each wave ends with a gate. **Do not start a wave before the previous gate passes** (per the handoff contract). Effort is sized **S / M / L** (relative, not time).

### Wave 0 — Foundation lock (prerequisite for everything) — ✅ **CLOSED 2026-09-16**

| # | Task | Status | Outcome |
|---|---|---|---|
| 0.1 | Collapse the type scale | ✅ **DONE** | 25 sizes → **8 tokens** (`12/14/16/18/20/24/32/48`), swept across 54 files / 715 call sites. Owner chose the *Utilitarian* scale over the 11-step proposal — 8 steps, not 11. |
| 0.2 | Spacing / row / CTA tokens | ✅ **DONE** | `--row 68`, `--cta 56` (r28), `--chip 36`, `--search 52`, `--filter 44`, `--sheet-top 28`, `--gutter 16`, `--card-pad 14`, `--gap 12`, `--tap 44`, `--trigger 84`. |
| 0.3 | Fix `Button` | ✅ **DONE** | `aria-disabled` + stays focusable (native `disabled` hid the reason text from keyboard users); `r28` CTA; `focus-visible` 2px ring. |
| 0.4 | Delete or fix `StatusPill` | ✅ **DONE** | Deleted. Confirmed dead — its `--status-*` tokens never existed. |
| 0.5 | Border / shadow discipline | ✅ **DONE** | Re-scoped per D-1 to *structural* rules. Double border in one style object **0**; components with >1 hero shadow **0** (was 4). |
| 0.6 | Gradient discipline | ⚠️ **PARTIAL** | 26 → **24**. Ceiling raised to 30 per D-2. Two decorative washes removed (`Profile` avatar, `ValidatorProfile` banner). A mask-vs-wash audit of the remaining 24 belongs in Wave 3. |
| 0.7 | Purge raw hex | ✅ **DONE** | 17 → **0**. `DevPanel` (12) + `PhoneFrame` (4) swept to tokens; `src/imports/FeulLogo-142-1329.tsx` deleted. |
| 0.8 | Fix all sub-44 targets | ✅ **DONE** | 19 → **0**. Built the `IconButton` primitive and replaced 14 hand-rolled controls across 13 screens; `AppBar` gained a compliant `onBack`. |
| 0.9 | Reduced-motion + a11y floors | ✅ **DONE** | Global `prefers-reduced-motion`, `:focus-visible`, `forced-colors`; `RowSkeleton` frozen under reduced-motion. |
| 0.10 | Update the metrics target column | ✅ **DONE** | Rewritten as the **hybrid gate** — token-aware (resolves `--fs-*` to px), structural for borders/shadows, plus a new `rgba()` row. |
| 0.11 | `?embed=1` + `?w=` switcher | ✅ **DONE** | `src/app/lib/chrome.ts`; `App.tsx` strips `PhoneFrame` + DEV at App level; 360 default, 320/390/430 presets. |

**Added during closure (not in the original Wave 0):**
- **`rgba()` blind spot closed** — 151 literal `rgba()` calls across 23 files replaced with new `--*-rgb` channel tokens (`--bone-0-rgb`, `--studio-ink-rgb`, `--terracotta-50/500/600-rgb`, `--scrim-rgb`). The hex rule never caught these; a gate row now does.
- **114 `<p>` elements promoted 12px → 14px.** Principle: no *prose* at 12px — 12px is chrome only. 12px instances 239 → **123**.

**Gate 0: ✅ PASSED.** `pnpm build` exit 0 · **all 12 metric rows green** (was 9 rows; `rgba()` and `raw font-size` added).

---

### Wave 1 — Finish Phase 1 (onboarding → Home → first earn) — **M**

| # | Task | Files |
|---|---|---|
| 1.1 | Resolve **D-3**: promote consent to a real screen at `/contributor/consent`; make `/recording/:id` redirect there when unconsented. Commit the **consent-gate proof** (`docs/proof/consent-gate.md`: route, screenshot, the assertion that `useRealMicLevel` never mounts). | `ConsentSheet.tsx`, `routes.tsx`, `Recording.tsx` |
| 1.2 | Mic prime: add explicit **"Not now"** (keeps `micPrimed=false` so it re-asks), and wire **OS deep-link guidance on deny** from the prime (reuse `MicPermissionDenied`). | `Recording.tsx:79–101` |
| 1.3 | First-earn: add the **48px step** to `EarningCelebration` (48 when it is a mid-session credit, 64 for the session total) and split a distinct `EarningCredited` surface for the quiet in-flow award. | `EarningCelebration.tsx` |
| 1.4 | Calibration: give the 2-phrase calibration **live canvas feedback** (real `useRealMicLevel` trace), not just the bar meter. | `Recording.tsx:298–302` + new `CalibrationTrace` |
| 1.5 | Jobs language sweep on Home: "Picked for you" sub → job copy; remove `quest` from every user-visible string. | `Home.tsx` |
| 1.6 | **Proof pack** `docs/proof/phase-1.md`: real-levels proof (silence freezes at 0 — screenshot of the meter at rest), consent-gate proof, 320/150%/contrast captures, `questTotal` chain arithmetic printed (₹12 + ₹45 + ₹65 = ₹122 ≥ ₹100). | new |

**Gate 1:** OTP 6 + all error states reachable · language tiles wrap at 320 · consent proof committed · empty/pending/live on one chrome · chain ≥ ₹100 computed · 44px clean · metrics not worse.

---

### Wave 2 — Phase 2 (Wallet + Withdrawal) — **M**

| # | Task | Files |
|---|---|---|
| 2.1 | **Varied-size bento**: Available large (24 tabular ink + verdigris delta), In-review (ochre dot + wait-reason), This-week neutral + **ZIXO mini-barcode sparkline**, Total quiet. Replace the equal 2×2 grid. | `Wallet.tsx:81–86` |
| 2.2 | Tabs → **40px**; add **weekly 7-pill bar filter** driving the ledger below. | `Wallet.tsx:122–144` |
| 2.3 | Exact-gap copy `₹X more to withdraw`; add `aria-disabled` + reason. | `Wallet.tsx:170–181` |
| 2.4 | Remove hardcoded dates `'Mon · Feb 24'` → relative; "Re-record this quest" → "Re-record this job". | `Wallet.tsx:45–46, 224` |
| 2.5 | Payout: presets → **44**; delete the forbidden `sent to {vpa}` line; make balances **session-derived** (delete `127.5 / 568.0`). | `PayoutFlow.tsx:172, 189, 25–26` |
| 2.6 | **Build the perforated receipt** (new `ReceiptCard`): notches + dashed rule + mono UTR + NPCI timestamp + From/To + Share-for-WhatsApp, from the `FUL-` ref. Reuse on Wallet settled detail. | new + `PayoutFlow.tsx:282–294` |

**Gate 2:** no hero ₹ (bento only) · bonus separate · UTR in settled detail · gap exact · relative dates only · 40–44px controls · metrics not worse.

---

### Wave 3 — Phase 3 (Jobs + Studio) — **L**

| # | Task | Files |
|---|---|---|
| 3.1 | **Rename the surface**: title `Jobs`, tab already `Jobs`; sweep `quest` out of all user-visible copy (keep internal ids per `07 §2`). | `QuestFeed.tsx:246`, `MainApp.tsx:7` |
| 3.2 | Search → **52**; chips → **44**; add the **44 filter circle**; add the **150px coverage hero** (acoustic art, right cutout, `×1.6` pill). | `QuestFeed.tsx:101–156` |
| 3.3 | Row: replace `nowrap` ellipsis with a **2-line clamp** on the script excerpt (never ellipsis-of-script). | `Primitives.tsx:712–715` |
| 3.4 | Brief pass: confirm + add the **AI-director stems note** (pre-recorded track + VAD cue, never chat UI), quiet-spot tip, ROOM battery warn <20%, numbered how-it-works, mandatory sample playback. | `Recording.tsx:147–253` |
| 3.5 | Capture: add the **telemetry bar** (Exit · Turn x/y · ₹ accumulated · mic-distance icon+label), **orb 200–220 + 2 rings** behind the trigger zone, and the **inline single-turn banner** ("Traffic noise on turn 4. Retake turn 4 or submit all?"). | `Recording.tsx:286–430` |
| 3.6 | Room: **scrolling score** (active 22 bone `Now: who`, past .3, future .5) and **VAD/manual advance only** — kill any timer-forced cue. | `Recording.tsx:528–598` |
| 3.7 | Review: add **static 24px thumbs** (Chill ref) + enforce **submit-once**. | `Recording.tsx:602–652` |
| 3.8 | Pending: confirm 76 verdigris Check + 28 + ochre `Expected on approval` card. | `Recording.tsx:654+` |
| 3.9 | **Repair** (`RejectedTask`): hero `9/10 passed · fix 1 → ₹25` ink, 5-col `r-sm` matrix, flagged `error-bg` + single border, tip card, "Re-recording doesn't affect standing" 12 muted, 56 flat + Later 44, Appeal 7d; remove the hardcoded date + persona. | `RejectedTask.tsx:16,19,172,176,213` |

**Gate 3:** Studio reachable **only** via a job (no tab) · real levels freeze in silence (proof) · VAD/manual advance proven · thumbs playable · repair single-retake preserves accepted clips · metrics not worse.

---

### Wave 4 — Phase 4 (Profile, Rewards, edges, validator, celebration, hygiene) — **L**

| # | Task | Files |
|---|---|---|
| 4.1 | Profile: demote Validator Tier to `r-md`; **add the Craft sheet** (format × language bars + bonus-eligibility note); **add the coverage-context register**; group Data Vault into album blocks + per-item Revoke → **revocation receipt + struck ledger**; avatar → flat `bone-100` ink (kill the gradient); stats → **This month**, session-derived (kill the hardcoded ₹1,250/23/94%). | `Profile.tsx:43,69,82–93,298–310,332` |
| 4.2 | Rewards: perks `e-1` → `e-0`; Activate → **44**. | `Rewards.tsx:77,170–171` |
| 4.3 | Edge violations: RoomConsent hero → **Bone** (kill `--surface-studio`), rows → `e-0`, mic/QR → **44**, minor pills → **44**, footer → **gradient** (kill the hard divider), kill `e-glow`; DialectMismatch kill `e-glow`; CoverageFull footer → 13. All 9 back buttons → the 44 `IconButton`. | 9 edge files |
| 4.4 | **Rebuild validator lite** on contributor primitives under `.theme-verdigris`: batch queue, waveform scrub + transcription aid, Accept/Flag/Reject + taxonomy tag, consensus/gold-standard, accuracy + compensation. Delete greeting, Spanish batch, "Lv 4", all gradients, wallpaper waveform, random bars, legacy aliases. **Fix the undefined `profile` reference.** Exclude from the demo until rebuilt. | `validator/*` (10 files) |
| 4.5 | Celebration: add the 48 step (see 1.3). | `EarningCelebration.tsx` |
| 4.6 | **Floating capsule dock** — replace the full-width bar with a floating translucent capsule + sliding active pill (icon 10 inactive, pill + terracotta active, 64 bar / 44 targets). | `MainApp.tsx:27–82` |
| 4.7 | **Chrome hygiene**: finish **D-4** creator purge; confirm `?embed=1` strips all chrome (from 0.11); decide swipe-teleport (implement 1:1 + velocity commit + snap-back, or delete). | `routes.tsx`, `Rewards.tsx:28`, `Waveform.tsx:8`, `App.tsx` |

**Gate 4 (= Tier 1 DoD):** zero P0 · `tsc` zero · 320 + 150% + keyboard-only pass · every pending state states a wait-reason · metrics at the (re-baselined) targets · `?embed=1` renders zero chrome.

---

### Wave 5 — Portfolio packaging — **M**

The artefact is a **case study**, so the evidence is half the deliverable.

| # | Task |
|---|---|
| 5.1 | **Proof pack** `docs/proof/`: consent gate · real levels (freeze in silence) · 320/360/390/430 captures · 150% text · 300-nit contrast checks (script 10:1, body 7:1, secondary 4.5:1, disabled 3:1 + reason) · terracotta-vs-crimson vision-deficiency emulation |
| 5.2 | **Before/after metric table** (baseline → shipped) with the `pnpm metrics` output pasted verbatim |
| 5.3 | **Screenshot set** for the 42 refs → the screens they informed, as a side-by-side sheet |
| 5.4 | **`?embed=1` live build** — the URL the case study embeds; verify zero chrome + no DEV panel in the production bundle |
| 5.5 | **State-coverage matrix**: every lifecycle state (Available → In-progress → In-review → Settled) × every reachable surface, with the in-flow path that reaches it (Reachability rule) |
| 5.6 | Copy the final `design-metrics-baseline.md` + this plan into the case-study folder |

---

## Part E — Execution order

```
Wave 0  Foundation lock ─────────────► Gate 0   (blocks everything; do not skip)
   │
Wave 1  Phase 1 finish ──────────────► Gate 1   (consent proof + real-levels proof)
   │
Wave 2  Phase 2 Wallet/Withdraw ─────► Gate 2
   │
Wave 3  Phase 3 Jobs/Studio ─────────► Gate 3
   │
Wave 4  Phase 4 rest + hygiene ──────► Gate 4   (= Tier 1 DoD)
   │
Wave 5  Portfolio packaging ─────────► ship
```

**Why Wave 0 first:** the type/border/shadow/gradient sweep touches all 68 screens. Doing it after the phase work means doing the phase work twice. The handoff's phase order is preserved *from Wave 1 onward*.

**Decisions needed before Wave 0 can finish:** **D-1** (border/shadow target) and **D-2** (gradient target) — they change what "done" means for tasks 0.5, 0.6 and 0.10. **D-3** is needed before Wave 1. **D-4** before Wave 4. **D-5** is bundled into 0.11 and can proceed on the recommendation.

---

## Part F — Definition of done (whole app)

- [ ] `pnpm build` exit 0 · `tsc --noEmit` zero
- [ ] `pnpm metrics` at the **re-baselined** targets, every row equal-or-better than baseline
- [ ] 320 / 360 (default) / 390 / 430 render with no horizontal overflow
- [ ] 150% browser text: no clipped labels, no overlapping rows
- [ ] Contrast: script ≥10:1 · body ≥7:1 · secondary ≥4.5:1 · disabled ≥3:1 + stated reason
- [ ] Zero raw hex outside `theme.css` · zero off-scale type sizes · zero legacy token aliases
- [ ] Money always ink; terracotta ≤10% of any light screen; one `r-lg`+`e-2` hero per viewport
- [ ] Every state colour paired with icon **and** label
- [ ] Every interactive target ≥44px; record trigger 84px
- [ ] No emoji as UI; Lucide + label always
- [ ] No hardcoded dates, balances, or demo personas — session profile + relative dates only
- [ ] No `Feul` / `Grain` in UI; brand slot is a placeholder
- [ ] Consent strictly precedes any mic (route-provable) · levels from `useAnalyserNode` only, frozen in silence
- [ ] Every state reachable in-flow without DevPanel
- [ ] `?embed=1` strips PhoneFrame + DEV chrome entirely
- [ ] Motion: springs on touch, 120/180/280 fades, press .97, reduced-motion honoured per component, no ambient loops

---

## Part G — Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Wave 0 sweep regresses screens visually | High | One commit per metric category; re-run metrics + eyeball 4 canonical screens (Home, Jobs, Wallet, Capture) after each |
| Metrics targets stay contradictory | High | Resolve **D-1**/**D-2** *before* 0.10; update `01-DESIGN-SYSTEM` + `04-ISSUE-MAP` + script together |
| Validator rebuild expands scope | Medium | Hold to the lite spec; if it slips, **exclude from the demo** (spec already sanctions this) rather than shipping two visual languages |
| Type-scale collapse breaks Indic line-height | Medium | Keep `--lh-deva 1.72` on every `.font-script` / `:lang()`; re-check Telugu at 320 after 0.1 |
| 68 screens × manual border removal is error-prone | Medium | Do it as a codemod where possible; verify with the metric after each batch of 10 files |
| Proof pack left to the end | Medium | Capture each phase's proof **at its gate**, not in Wave 5 |
| `?embed=1` + `?w=` land late | Medium | Pull forward into Wave 0 (task 0.11) — they are App-level and independent of screen work |

---

## Part H — Session recovery log (2026-09-15)

An assistant error (`git checkout -- .` run while the Phase 1 work was still
uncommitted) reverted 12 files to `HEAD`. This is the record of what was lost,
what was recovered, and what is still missing.

### H.1 What was recovered

The full pre-revert contents survived in the session transcript
(`~/.workbuddy-ai/projects/d-portfolio porjects-feul final build-Feulmobile-main/<session>.jsonl`),
because every file read before the revert was logged with its text. Cutting at
the revert timestamp (`1789497483286`) gave verbatim copies of 41 files.

| File | Recovered | Method |
|---|---|---|
| `EarningCelebration.tsx` | 95 lines (was reverted to 152) | verbatim from transcript |
| `MainApp.tsx` | 85 lines (was reverted to 86) | verbatim from transcript |
| `lib/quests.ts` | 263 lines (was reverted to 236) | verbatim from transcript |
| `Onboarding.tsx` · `Home.tsx` · `ui/ConsentSheet.tsx` | unchanged | already correct |
| `lib/session.ts` · `routes.tsx` · 22 edge-case screens | unchanged | never diverged |

`EarningCelebration.tsx` mattered most: the reverted copy had a hardcoded
`+₹50`, the dark `--surface-studio` ground, and raw `rgba()` — all three
violations the WIP had already fixed (`FIRST_JOB`, `questTotal()`,
`--surface-ground`, `useCountUp`).

`lib/quests.ts` mattered second: it is the single source of truth for the
session-one promise (`FIRST_JOB_ID`, `FIRST_JOB`, `WITHDRAW_MIN`,
`newcomerChain`, `newcomerChainTotal`, `withdrawGap`). Without it, `Home.tsx`
does not compile — it imports all nine symbols.

### H.2 Rebuilt, not recovered

| File | Action |
|---|---|
| `ui/BrandSlot.tsx` | `IllustrationSlot` export had to be rewritten to spec — it is the reserved 120–140px onboarding image slot (`08-PHASE-1`). **The original body was never read; this is a spec-faithful rebuild, not the owner's code.** Confirm the visual intent. |

The revert had left `Onboarding.tsx` importing `IllustrationSlot` from a module
that no longer exported it — a hard build failure, not just a cosmetic gap.

### H.3 Still missing — needs owner input

| File | State | What is gone |
|---|---|---|
| `components/Recording.tsx` | `HEAD` (719 lines) | The WIP (~855 lines). Only lines 1–145 and 254–314 were ever read, so only the head is knowable. |
| `lib/questContent.ts` | `HEAD` (183 lines) | The WIP (192 lines) — adds `CALIBRATION_LINES`, which the WIP `Recording.tsx` imports. |
| `ui/BrandSlot.tsx` | `HEAD` + rebuild | The original `IllustrationSlot` body (see H.2). |

The recovered `Recording.tsx` head shows exactly what the WIP added on top of
`HEAD`. Re-apply these five deltas when the file is rebuilt:

1. `lucide-react` import gains `Mic`
2. `../lib/quests` import gains `questTotal, FIRST_JOB_ID`
3. `../lib/questContent` import gains `CALIBRATION_LINES`
4. `const [firstSubmit, setFirstSubmit] = useState(false)` — set alongside
   `advanceStage('session')` when the stage was `day0`
5. `<Pending quest={quest} first={firstSubmit} onHome={…} />` — and `Pending`
   must accept `first` to render the first-earn treatment

Plus, in `StepCapture`: `const calibLines = CALIBRATION_LINES[quest.id]` and a
`calibrated` state gated on `quest.id === FIRST_JOB_ID && getStage() === 'day0'`,
so the first-ever LINES capture folds calibration in rather than adding a screen.

**Check IDE local history** for `Recording.tsx`, `questContent.ts` and
`BrandSlot.tsx` before re-writing them by hand — those three may still exist there.

### H.4 Gates after recovery

`pnpm build` → exit 0 · `pnpm metrics` → raw hex **0**, brand strings **0**,
emoji **0**. The restored WIP also nudged `≤12px` 240 → 237 and `box-shadow`
116 → 115.

---

## Appendix — Command reference

```bash
pnpm install          # setup
pnpm dev              # vite dev server (phone shell on desktop)
pnpm build            # production build — must exit 0
pnpm metrics          # discipline metrics → plans/design-metrics-baseline.md
```
