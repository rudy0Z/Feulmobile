# Build Spec — Tier 1 Production Scope

> **Scope:** Tier 1 only — walkable end-to-end for Figma Make. Tier 2/3 are sequenced in the appendix as designed-not-built.
> **Brand:** placeholder slot only — see `00-MAKE-CONTEXT.md`. No Feul/Grain rendering.
> **Source docs:** this file is the *how/order* for Make. It replaces the full `EXECUTION-PHASES.md` Phases 3-11 for production; the full document remains in `/_archive` as the roadmap record.

**Companion docs (attach all 4 to Make):**
1. `00-MAKE-CONTEXT.md` — product context (paste first, as Make project memory)
2. `01-DESIGN-SYSTEM.md` — single source of truth for tokens/components (Make Guidelines doc)
3. `02-BUILD-SPEC.md` — this file
4. `03-EDGE-CASES.csv` — edge cases as CSV (Make Attachment)

---

## Tier map — what Makes learns

| Tier | Scope | Status in Make |
|---|---|---|
| **Tier 1 — ships** | Onboarding flow → Home → Studio 3 beats → Wallet bento → QuestFeed (rows) | **Build these, in order, fully wired** |
| Tier 2 — strengthen if Tier 1 lands | Campaign detail (locked ₹220), Repair Studio, Profile (Standing+Craft), Add UPI / withdraw confirm | Built only after Tier 1 is solid, never sideways |
| Tier 3 — designed, sequenced, not built | Validator system, deep progression pages, coverage maps/voiceprints, most edge matrix beyond Repair Studio, Quest Creator | **Do not build in Make.** State as roadmap in case study |

**Do not start a phase until the previous one passes its acceptance checklist.**

---

# PHASE 0 — Decisions lock (2h — must pass before any screen)

| Decision | Chosen — authoritative for Make |
|---|---|
| Product name | **Placeholder slot.** Render `[PRODUCT]` literal or empty geometric mark. **Do not design a wordmark, logo, or copy around Feul/Grain.** Final name deferred to last — see `00-MAKE-CONTEXT.md` Brand slot |
| Brand accent | Terracotta `#E06C3A` base / `#C4622D` deep — locked |
| Dark ground | Carbon warm `#14100E` (`--t-carbon-900`) — **Studio only** |
| Success/settled hue | Verdigris `#3D6B5E` — **locked 2026-08-27, forced, one-line swappable** |
| Error hue | Crimson `#8E2434` — hue ~15, dark, never confusable with terracotta — locked |
| Typeface | **Anek superfamily** throughout — locked, with scoped escape hatch (see below) |
| Numeral face | Anek tabular figures (`tabular-nums`) — locked |
| First-withdrawal rule | **₹100 floor, reachable in one guided session** — locked. Visible but disabled below floor with exact gap |
| Minimum age | 18+ self-declared, enforced via UPI VPA name-match — locked |
| Verification model | Tiered to money at risk — locked (see 00 §Verification) |
| Light/dark split | Light everywhere; dark **only** Studio capture — locked |

### Typography escape hatch (locked architecture)

```css
--font-ui: 'Anek Latin', 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;
--font-script: 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif; /* same family today */
```
If real-device reading at 20-28px underperforms in Studio, one-line swap `--font-script` to **Mukta** (designed for long-form Devanagari) — zero impact elsewhere. Do not pre-swap for Make.

### Business rules — first withdrawal (Make must implement exactly this)

* Floor: **₹100** (one clean rule, always true)
* Guided onboarding reaches **₹100 in first session** (₹50 calibration + ₹50 first real task)
* Withdraw button **visible but disabled below floor**, exact gap: `₹50 more to withdraw` — never hidden
* Fraud controls (zero-friction, no ID upload): one account per phone; **UPI VPA name-match** (kills 50-accounts→one-UPI); welcome earnings conditional on auto-check pass; device fingerprint + rate limit; first payout 24h fraud hold shown as `arriving by tomorrow`

### Color risk — resolve first in Make preview

Push error to deep crimson, verify side-by-side:
- [ ] Terracotta vs crimson at 12px chip
- [ ] Both in grayscale (must differ in *value*)
- [ ] Both under deuteranopia/protanopia
- [ ] Never color alone — always color + icon + label

### Phase 0 acceptance

- [ ] Placeholder slot renders (no Feul/Grain appears anywhere)
- [ ] No Security Reserve or streak logic in any screen
- [ ] Consent is its own screen before any recording, in native language
- [ ] Withdrawal gap always exact and visible

---

# PHASE 1 — Design system foundation (1 day — most important)

> The phase that decides whether the rebuild looks designed or assembled. Do not rush it.

## 1.1 Two-layer tokens

See `01-DESIGN-SYSTEM.md §1` for exact values. Make must output a **token reference page** (not a UI screen) swatched and labelled:

* Primitives: `--t-terracotta-*`, `--t-carbon-*`, `--t-bone-*`, `--t-verdigris-*`, `--t-ochre-*`, `--t-crimson-*`
* Semantics: `--surface-*`, `--text-*`, `--action-*`, `--state-*`, `--money-*`, `--border-*`, `--record-*`
* Show semantics swatched **on both Bone and Carbon grounds side-by-side** — same token works on both without redefinition
* Token ramp: oklch-derived, 50-950 — show mapping primitive → semantic explicitly

## 1.2 Typography specimen

Live rendered text, English **and** Hindi (Devanagari) side-by-side per size, Anek:

```
11 eyebrow UPR +0.09em 1.4
12 caption +0.02 1.45
14 meta +0.01 1.5
16 body BASE 0 1.5 — floor, never smaller
18 lead 0 1.5
20 card title -0.005 1.35
24 section -0.01 1.3
30 screen title -0.015 1.2
38 display -0.02 1.1
48 money-hero -0.025 1.0 tabular — one per screen max
64 money-max -0.03 1.0 tabular — celebration only
```

Label Devanagari +10-15% line-height difference explicitly. Show `tabular-nums` ledger alignment.

## 1.3 Spacing / radius / elevation

* Spacing 4pt ruler: `4/8/12/16/20/24/32/40/56/72` + gutters 16/20/24/24
* Radius discipline demo: screen mockup with **one 24px hero + everything else 14px/8px**, annotated — `§3.2`
* Elevation: 5 tokens `--e-0/-1/-2/-3/-glow` shown on both grounds — on Carbon, elevation = lighter surface, not shadow

## 1.4 Responsive harness (build for demo)

Extend DevPanel with viewport switcher inside device frames: 320 / 360 (default, dominant Indian) / 390 / 430 — side-by-side comparison + active scale readout. Attach as `Make Kits` resource if using Kits.

### Phase 1 acceptance

- [ ] Primitives/semantics separate — no component references primitive
- [ ] Same component renders correctly on Bone and Carbon, zero component changes
- [ ] Error vs terracotta passes chip/grayscale/colourblind
- [ ] All contrast floors pass, script ≥10:1
- [ ] Devanagari/Tamil render with no matra clipping
- [ ] No clipping at 320, body never <16px

---

# PHASE 2 — Primitive component library (1 day)

> Every component built once, correctly, before any screen is assembled. Screens from ad-hoc components is how G3 became "every card the same."

## 2.1 Components to generate as a gallery page (not real screens)

**Structure:** `Screen` · `Section` · `Divider` · `Sheet` · `TabBar` (translucent, content beneath) · `AppBar` (with empty brand slot) · `SafeArea`

**Content:** `Card` (flat / raised / hero — **only one hero per screen**) · `ListRow` · `StatBlock` · `EmptyState` · `Callout`

**Money:** `Amount` (tabular, decimals `₹127` + `.50` at 0.55×) · `AmountBreakdown` (base × coverage + bonus = total) · `LedgerRow` (quest · date · amount · state) · `BalanceBlock`

**Action:** `Button` (primary terracotta flat / secondary bone+border / ghost / destructive · 3 sizes 44/52/56) · `IconButton` · `Chip` · `FilterChip` · `Switch` · `Stepper`

**Status (always icon + color + label together):** `StatusBadge` (settled pending review failed) · `ProgressPill` `[▮▮▮▮░░░░]` · `ProgressRing` · `CoverageMeter` (`62% collected` + remaining in text)

**Progression:** `StandingBadge` (New/Verified/Trusted/Elite — plain text, no cute labels) · `CraftBar` (per format×language skill sheet, e.g. Elevate pictogram bars, not one level) · `TierGate` (locked campaign: dimmed pay + lock icon + exact unlock `Unlocks at 25 accepted clips — you have 8`, aspirational not just disabled) · `MilestoneMark`

**Audio:** `RecordTrigger` (≥72px, `--r-full`, `--e-glow` only here, idle vs pulsing active) · `LevelMeter` (real mic, not loop) · `Waveform` · `ClipRow` (duration + retake) · `PlaybackScrubber` · `ScriptDisplay` (20-28px, ≥10:1, per-script LH, nothing overlapping)

**Input:** `TextField` · `Select` · `SearchField` · `LanguagePicker` (shows script in its own script, e.g. `हिन्दी`) · `OTPField` (segmented)

**Add per UI-REBUILD-PROPOSAL §6:** `Separator` (6px waveform) · `MoneyState` (pending vs settled, Wise pattern)

## 2.2 Rules

* Every component takes semantic tokens only — no primitive direct, no hard-coded hex/size/radius
* Every component has: default / pressed (scale .97 on pointer-down) / disabled / loading / error
* Tested on **both grounds** and at **320 and 430**
* Every interactive ≥44px; recording controls ≥72px
* No `borderLeft` colored strip prop on Card; no `divider` default on rows

### Phase 2 acceptance

- [ ] Gallery renders every component in every state
- [ ] No component hardcodes colour/size/radius
- [ ] `Amount` handles ₹0 · ₹12 · ₹1,250 · ₹12,500.50 without shift
- [ ] `AmountBreakdown` shows `₹45 base × 1.6 coverage + ₹10 bonus = ₹82`
- [ ] `Sheet` is grabbable/reversible mid-close, tracks 1:1, rubber-bands, blurred scrim
- [ ] Locked TierGate looks aspirational (visible pay, exact path)
- [ ] Every gesture-driven component has named `prefers-reduced-motion` alternative per `01-DESIGN-SYSTEM.md §4`
- [ ] No gradient pill CTA, no emoji, no borderLeft strip anywhere

---

# PHASE 3 — Onboarding → first earning (1 day) [TIER 1 CORE]

> Get a first-time, low-trust user from install to **money in their wallet**, one session. Corrected 2026-08-27: consent must precede any recording, full stop.

## 3.1 The flow — exactly this sequence

| # | Screen | Notes — implement exactly as written |
|---|---|---|
| 1 | **Market** | `Sarvam AI needs 4,200 hrs of Marathi. 62% collected. 189 districts. 380 more Vidarbha clips to close Friday.` Live demand, not claim. No brand wordmark — placeholder slot only |
| 2 | **Auth** | One tap — Google / phone OTP. No form, no documents |
| 3 | **Language select** | Native script, large targets. Must come before any task — you cannot serve a Devanagari script without knowing language |
| 4 | **Home — setup checklist** | monday.com pattern. Item 1 = paid task, not profile. `✅ 1. Record your first clip → ₹50 [next]` / `2. Add UPI to get paid` / `3. Complete profile → +₹50 task unlocked` / `4. Turn on alerts`. No recording happens on this screen — it's a dashboard shell, so consent can still come after it |
| 5 | **Consent** | **One screen, native language, before ANY recording** including calibration (step 6). Single clear screen, not a form — readable *and* listenable (audio playback). DPDP valid |
| 6 | **Guided first task** | Mic permission requested **here in context**, never upfront. First moment audio is captured; consent (step 5) has already happened. Use standard LINES capture chrome (~3 phrases), not a separate tutorial chapter |
| 7 | **Earning credited** | Celebration moment — quiet, not confetti. The number large (48 or 64), one line of plain truth. `₹50` lands |
| 8 | **Wallet — add UPI** | Now motivated: they have money to move |
| 9 | **Withdraw** | Enabled at ₹100, gap shown if short. First task credited on-submit (one-task exception to review delay) |

## 3.2 Screens to generate

`Market` · `Auth` · `OTPVerify` · `LanguageSelect` · `SetupChecklist` (home empty state) · **`ConsentSheet`** · `MicPermissionPrime` (in-context) · `GuidedTaskIntro` (Brief) · `EarningCredited` · `AddUPI` · `UPINameMatch` (penny-drop) · `FirstWithdrawSuccess`

## 3.3 Trust requirements — must be visible in Make output

- [ ] Money credited **before** any profile/KYC ask
- [ ] Nothing requested before first payment except language + consent
- [ ] Consent in contributor's language, one screen, **before mic is used even once**
- [ ] Audio playback icon on every instruction screen (never icon-only nav)
- [ ] District-local social proof: `12 contributors in Chhapra were paid ₹4,280 this month`
- [ ] Withdraw gap always exact and visible

### Phase 3 acceptance

- [ ] Fresh user reaches credited money in <4 min
- [ ] No `instant/credited instantly` copy — pending-until-review language
- [ ] Every screen works at 320px
- [ ] No Feul/Grain appears

---

# PHASE 4 — Home (1 day) [TIER 1 CORE]

> A dashboard that is *yours*, distinct from the marketplace. If Home is just a campaign list, it *is* Quests.

## 4.1 Home vs Quests — enforce the split

| Home = **your state** | Quests = **the market** (Phase 5 — minimal for Tier 1: just a browsable feed) |
|---|---|
| Today / this week earnings (single hero ₹48) | Search + filters + full catalogue |
| Active assignments — resume in progress | Locked campaigns with unlock paths |
| Needs your attention (rejected clip, missing UPI) |  |
| Next milestone — `12 more → Verified → unlocks SCENARIO` |  |
| Your coverage value — stated honestly |  |
| 2–3 recommended campaigns only (rows, not tiles) |  |
| Recent activity (last 3, compact) |  |

The five `⭐` items above are what make Home a dashboard — if absent, it's a duplicate marketplace.

## 4.2 Layout

* Pattern: atmospheric header (Terracotta → Bone gradient, subtle, not slop) → primary money object **overlapping** boundary → calm content below. Only **one** `--r-lg` / `--e-2` on screen (the money board)
* Atmospheric zone carries **market state** (`Sarvam needs 400 Tamil clips`), not greeting `Good morning, Alex`
* **Three data states on one chrome:** `empty` · `pending` · `live`. Dashboard never replaced by tutorial or receipt

### Phase 4 acceptance

- [ ] Home and Quests share ≤2 component types
- [ ] All three states render on identical chrome
- [ ] Five dashboard-only items present
- [ ] Exactly one hero object, one 48px ₹ on screen
- [ ] Coverage meter presentational (`62% collected` + horizontal fill), multiplier stated in text
- [ ] Bento kept to minimal Tier 1: hero + 2-3 rows + activity — not the full 2×2 Explore Formats grid (that belongs to Phase 5 marketplace browse)

---

# PHASE 6 — Studio (recording) (1 day) [TIER 1 CORE]

> The most refined screen in the app. Readability above everything.

## 6.1 Three beats — exactly this

1. **Brief** — context, role, scenario setup, format rules, **full pay breakdown** (`₹45 base × 1.6 + ₹10 bonus = ₹82`), audio playback of brief
2. **Capture** — dimmed HUD (token ink `var(--surface-studio)`, never `#000`), script hero (20-28px, native script, ≥10:1, per-script LH), single luminous trigger (≥72px, thumb-zone, the **only** element with ambient animation and only user of `--e-glow`). Live input level + noise-floor warning + segmented pill progress `[▮▮▮▮░░░░] 4/8` + pause/cancel always reachable
3. **Review** — playback, per-clip retake, submit

## 6.2 Non-negotiables

* Script at 20-28px native script, `--text-on-studio` at ≥10:1, `var(--lh-deva/taml)` applied — **never let any UI overlap the script**
* Trigger feedback on pointer-**down**, not release; ≥72px, above home indicator
* Screens: `Brief` · `Capture` · `NoisePause` · `Review` · `SubmitConfirm` · `UploadQueue` (offline) · `SessionInterrupted` (format-aware resume)

### Phase 6 acceptance

- [ ] Script readable in bright sunlight simulation at 320px
- [ ] Devanagari/Tamil render with no matra clipping at every size
- [ ] Trigger reachable one-handed at 430px height
- [ ] Record trigger shows feedback on pointer-down
- [ ] Level meter driven by real mic input, not decorative loop — visibly different in silence vs speech
- [ ] Brief→Capture→Review cross-fade with persistent context bar, not hard cut
- [ ] Ambient glow degrades to static ring + "Recording" label under reduced motion
- [ ] A 25-min Room take interruption is specified (resume) even if Tier 1 builds only LINES/SCENARIO — see §10
- [ ] No brand name in script or header

---

# PHASE 7 — Wallet + payout (0.5 day) [TIER 1 CORE]

> Money that can be inspected and trusted. No Reserve.

* Big tabular balance, de-emphasized decimals — `₹127` **`.50`**
* **Available vs Pending** separated; pending states *what it waits on* (`2 clips under extended review`, `arriving by tomorrow`)
* **Security Reserve deleted** — `Wallet.tsx:208` / `SilverTierReserveDrawer` must not be reintroduced. No mechanic holds contributor money.
* Ledger rows: quest · date · amount · state (Verdigris settled / Ochre pending / Crimson failed — always icon+color+label)
* Quality bonuses as **separate line items** so craft is visibly paid
* UPI destination with VPA name-match verification shown
* Withdraw with exact gap when below floor, thumb-zone primary button

Screens: `Wallet` (bento: Available/Pending/This-week/Total + weekly bar + ledger, **no giant hero ₹**) · `WalletEmpty` · `TransactionDetail` · `AddUPI` · `UPINameMatch` · `WithdrawConfirm` · `WithdrawSuccess` · `WithdrawFailed` · `PayoutHistory`

### Phase 7 acceptance

- [ ] No Security Reserve anywhere
- [ ] Every pending amount says what it waits on
- [ ] Withdrawal gap always exact and visible
- [ ] Balance count-up starts from live displayed value if second credit lands mid-animation — never restarts from 0
- [ ] No 48px+ hero ₹ on Wallet (bento is the hero)
- [ ] `theme.css` legacy `--shadow-card/glass` not used

---

# PHASE 5 — Marketplace (Quests) — Tier 1 minimal (0.5 day)

> Minimal browsable feed to make Home's "Picked for you" link to something real. Full marketplace is Tier 2.

**Tier 1 build only:**
* `QuestFeed` (rows, not tiles): client, format, language, pay breakdown, coverage multiplier, tier lock state. One Room locked card `₹220 · 4 people · ~25 min · one take — Unlocks at 25 accepted clips — you have 8` — aspirational, exact path. Format eyebrow (10.5px) not three chip recipes
* `FilterSheet` (bottom sheet: language · format · pay · duration · eligible-only toggle) + `SearchField`
* Real empty state: honest gap `No Marathi tasks matching your filter` + notify option, never spinner
* Client attribution: lab name on every row (trust lever) — no separate profile page in Tier 1

Full `ClientProfile`, browse by lab, saved, coverage-full state, sort → Tier 2

### Phase 5 acceptance (Tier 1)

- [ ] Every row shows client + format + language + pay + multiplier + lock state
- [ ] Locked cards state exact unlock condition + progress
- [ ] Filters and search have real empty states
- [ ] Format is 10.5px eyebrow, not chip color recipe

---

# Post-Tier-1 integration — Make → code

> Make output is **markup and styling only** — it does not know existing route logic. Treat as merge, not replacement.

1. **Port tokens/layout/visual treatment into existing component** — `Home.tsx` three-data-state logic, `DevContext` hooks, `lib/quests.ts` taxonomy stay; only rendering changes. Never overwrite `Home.tsx`/`Wallet.tsx` wholesale
2. Clean tokens → reconcile against `01-DESIGN-SYSTEM.md` → extract components
3. `npx tsc --noEmit` → zero errors
4. Rebuild + `node scripts/sync-embeds.mjs feul` from `D:\Portfolio` (embed stale since 4 Aug)
5. Gate `DevPanel` behind `import.meta.env.DEV` — must not ship adjacent to product in portfolio embed

---

# Appendix A — Sequenced, not built (Tier 2/3 roadmap — do not generate in Tier 1 Make project)

**Tier 2 (build if Tier 1 lands with time):**
* Campaign detail (one, e.g. locked ₹220 Room take, full pay breakdown before commit)
* Repair Studio (partial-work preservation — strongest product thinking, high value for time)
* Profile simple (Standing + Craft skill sheet per Elevate pictogram bars, skip detail sub-pages)
* Add UPI / withdraw confirm polish + payout receipt

**Tier 3 (documented, not built — state plainly in case study, do not imply live):**
* Entire Validator system (`/validator/*` 11 files currently built — scope-reduce, keep one `GradingTask` as reference if needed)
* Quest Creator (`/quest-creator/*` 4 files — out of mobile scope, optionally one desktop frame as scope decision)
* Deep progression pages (StandingDetail/CraftDetail/CoverageDetail), coverage maps, voiceprint identity mark (SVG seeded waveform), achievement marks
* Full edge matrix beyond what Repair Studio covers, celebration moments (`FirstEarningCredited`, `MilestoneReached`, `StandingPromoted`, `CoverageContribution`)
* Voiceprint/coverage-map SVG generation (see `EXECUTION-PHASES.md` Appendix — Voiceprint = seeded radial waveform)

**Cut:** QuestCreator ×3 desktop scope — state as decision, don't delete silently

---

# Appendix B — Component inventory (exists today vs. Tier 1 missing)

**Exists today (modify, don't duplicate):** Onboarding, EarningCelebration, Home, QuestFeed, Wallet, Rewards, Profile, Recording, RejectedTask, Performance, RoleSelection, ValidatorApplication, QuestCreator

**Missing — Tier 1 to build in Make:** Market, OTPVerify, LanguageSelect, SetupChecklist, ConsentSheet, MicPermissionPrime, GuidedTaskIntro, EarningCredited, AddUPI, UPINameMatch, Brief/Capture/Review refinements, TransactionDetail, WithdrawConfirm/Success/Failed, PayoutReceipt, SessionInterrupted

**Remove from Make consideration:** `Plans/clay-visual-upgrade.md` assets, `theme.css` legacy aliases, 48 shadcn primitives in `app/components/ui/` (zero importers — dead, style contagion: `rounded-lg border bg-card shadow-sm`)

---

# Appendix C — Visual asset strategy (for Make)

*Everything is code, no library.* Figma Make outputs code, not images.

| Asset | How |
|---|---|
| Voiceprint mark | Pure SVG seeded radial waveform — densifies with contributions, unique per user. Do not use emoji/badge packs |
| Coverage maps | India district GeoJSON (datameet/maps) → SVG paths, fill by contribution |
| Standing marks | Flat geometric SVG, two colours (terracotta + verdigris), no gradient/3D |
| Functional icons | Lucide only (already in build), consistent stroke, never icon-only |
| Brand mark | Empty geometric slot or `[PRODUCT]` literal — never Feul/Grain rendering |

If SVG marks look generated, ship none — empty craft beats generated kit. Waveform never returns as card wallpaper.

---

# Appendix D — Reference pull (if expanding Tier 2)

1. Indian gig-worker apps — Swiggy/Zomato partner, Rapido Captain, Uber Driver (earnings, pending vs settled, tier benefits)
2. Pending vs settled money — Wise, Monzo, Revolut
3. Skill/competence display — Elevate rankings (→ Craft score)
4. Setup checklists — monday.com, Notion, Linear
5. Recording/teleprompter — BIGVU, Descript mobile, Voice Memos
6. Search+filter — Upwork, Airbnb

**Pull states, not screens:** pending · empty · rejected · locked · disagreement — where this app is weak.

---

# Appendix E — Decisions log (locked for Tier 1)

* Unified coverage reframe, two-layer tokens, light-only + Studio dark, Home≠Wallet, same-work-same-pay, no Reserve, no streak surge, VPA name-match, 18+ without ID, 360-first, one hero per screen, flat buttons, springs for touch — see Phase 0 table + `00-MAKE-CONTEXT.md`.
* Rejected: dark theme outside Studio, gradient pill CTAs, emoji badges, borderLeft strip, divider-default rows, multi-device Room (deferred — see edge-case #6, single-channel continuous take for Tier 1 with multi-device as open problem stated once, not built)
