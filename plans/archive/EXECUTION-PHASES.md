# Execution Phases — Feul → [NAME] Redesign

> **Naming status (2026-08-27): OPEN, deferred to last.** Stoke was rejected. Use `[NAME]` as a literal placeholder in every prompt and every screen until it's decided — see Phase 0 below.

> **Companion to** `REDESIGN-MASTER-BRIEF.md` (the *what* and *why*).
> **This document is the *how* and *in what order*.**
>
> Every phase has: objective · exact deliverables · acceptance criteria · what to hand Figma Make.
> **Do not start a phase until the previous one passes its acceptance criteria.**
>
> Created 2026-08-23.

---

## Phase map

| # | Phase | Blocks everything after it? | Est. |
| --- | --- | --- | --- |
| **0** | Decisions lock | ✅ yes | 2h |
| **1** | Design system foundation | ✅ yes | 1 day |
| **2** | Primitive component library | ✅ yes | 1 day |
| **3** | Onboarding → first earning | | 1 day |
| **4** | Home | | 1 day |
| **5** | Marketplace (Quests) | | 0.5 day |
| **6** | Studio (recording) | | 1 day |
| **7** | Wallet + payout | | 0.5 day |
| **8** | Profile + progression | | 0.5 day |
| **9** | Validator | | 0.5 day |
| **10** | States & edge cases | | 1 day |
| **11** | Integration & case study | | 1 day |

---

## ⚠️ Scope triage — the phase map above is ~9 days of work, not one

Added 2026-08-27, from a senior-design-audit pass on this plan. The phase map's own estimates add up to roughly nine working days. That's the honest scope of the full system. It is **not** what gets built before a one-day deadline, and pretending otherwise is the actual risk right now — not any individual design decision.

Below is the real triage: what must exist and work end-to-end, what strengthens the story if time allows, and what stays a **documented, designed, not-built** roadmap item. All three tiers are legitimate to show in a case study — "here's what I shipped, here's what I designed and sequenced next" is a real, defensible scoping signal. Thirty half-finished screens is not.

**Tier 1 — ships tomorrow, walkable end to end (build these, in order):**
1. Onboarding sequence: Market → Auth → Language → **Consent** → Guided first task → Earning credited (see Phase 3 — this is one continuous flow, cheap to build once the tokens exist)
2. Home (three data states on one chrome)
3. Studio — Brief → Capture → Review, one quest, fully wired
4. Wallet (the bento + ledger, no giant hero ₹)
5. Quest feed — enough rows to make Home's "Picked for you" link to something real

**Tier 2 — build if Tier 1 lands with time to spare:**
6. Campaign detail (one, e.g. the locked ₹220 Room take, to show tier-gating)
7. Repair Studio (the single strongest piece of product thinking in the app — high value for the time it costs)
8. Profile, simple version (Standing + Craft only, skip the detail sub-pages)
9. Add UPI / withdraw confirm

**Tier 3 — documented and sequenced, not built for tomorrow. State this plainly in the case study rather than skipping it silently:**
- The entire Validator system (§11.2, Phase 9)
- Deep progression detail pages (StandingDetail, CraftDetail, CoverageDetail)
- Most of the edge-case matrix (§13) beyond what Repair Studio already covers
- The voiceprint/coverage-map achievement visuals (§14)
- Quest Creator (already out of mobile scope — no change)

If the deadline moves or more time appears, work down from Tier 2, never sideways into Tier 3 novelties before Tier 1 is solid.

---

# PHASE 0 — Decisions lock

**Objective**: eliminate every variable that would force a rebuild later. Nothing gets prompted until this table is filled.

| Decision | Options | Chosen |
| --- | --- | --- |
| Product name | See §Name candidates below | ⬜ **OPEN — deferred to last, on purpose** |
| Brand accent | Terracotta `#E06C3A` (keep) | ✅ locked |
| Dark ground | Carbon warm `#14100E` (Studio only — see visual-system lock below) | ✅ locked |
| Success/settled hue | See §Color research below | ✅ **Verdigris `#3D6B5E` — forced 2026-08-27, see note** |
| Error hue | Crimson `#8E2434` — pushed away from terracotta, see §1.2 | ✅ locked |
| Typeface | See §Typography research below | ✅ **Anek throughout, with a scoped escape hatch** |
| Numeral face | Anek tabular figures | ✅ locked |
| First-withdrawal rule | ₹100 floor, reachable in one guided session | ✅ locked |
| Minimum age | 18+ self-declared, enforced via UPI VPA name-match | ✅ locked |
| Verification model | Tiered to money at risk — see §Verification model below | ✅ locked |
| Light/dark split | Light everywhere; dark **only** in Studio capture | ✅ locked |

> ⚠️ **Color forced 2026-08-27.** This decision sat open across three separate rounds of discussion while everything downstream of it kept moving — that's a process risk in its own right one day from deadline. Locking to **Verdigris**, my own earlier recommendation (§Color research: "the two colors are both about material transformation, one by fire and one by time" — a stronger interview line than "I used a split-complementary wheel"). **This is a forcing function, not a closed door** — if it doesn't sit right, say so and it changes in one line; every downstream token references it symbolically, not by hex.

### 2026-08-23 — Typography decision, with reasoning

**Locked: Anek throughout the entire system — UI, content, and the recording script — with one architectural safeguard.**

The 2026 typography consensus is explicit on this: [modern practice favors one versatile variable-font family across UI, web, and branding rather than switching typefaces per context](https://www.designmonks.co/blog/typography-trends-2026), because a variable font's weight/width axes can flex to do a reading face's job without becoming a second font file, a second license, and a second set of metrics to keep in sync across nine scripts. Switching families per surface is exactly the kind of inconsistency that made the current build read as assembled rather than designed.

**But the same research names the real risk directly**: *"a typeface that feels calm and clear in interface labels can become tiring in long paragraphs."* The recording script is precisely that case — the single longest, highest-stakes, read-aloud-under-pressure text in the app. Picking Anek for that screen without acknowledging the risk would be exactly the kind of decision that doesn't survive an interview follow-up.

**The resolution — architect the exception in from day one, don't leave it to a real rewrite**: the type-token layer gets a **separate semantic token for extended reading**, distinct from general UI text, both defaulting to Anek:

```css
--font-ui: 'Anek Latin', 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;
--font-script-reading: 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif; /* same family today */
```

If real-device testing on the Capture screen (Phase 6) shows Anek underperforming at 20–28px sustained reading, the fix is a **one-line token swap to Mukta** — [built specifically for long-form Devanagari body reading, versus Anek's own positioning as a brand/design-system face](https://fiveelements.org.in/best-hindi-fonts-for-2026/) — with zero impact on the rest of the app, because nothing else references `--font-script-reading`.

That's the actual industry pattern for apps spanning UI and long-form Indic reading: [Noto Sans Devanagari, Hind, and Mukta are the names that keep surfacing specifically for readable long-form digital content](https://www.hindicheck.in/blogs/best-hindi-fonts-for-websites), while Anek and its ITF siblings are named for brand and design-system work — two different jobs, historically two different font choices. The token architecture above gets the 2026-standard "one system" simplicity now, while keeping the specific, well-documented reading-face swap cheap if testing says it's needed. Decide once, verify once, change one line if wrong — not a redesign.

### 2026-08-23 — Color research: what should pair with terracotta

Terracotta sits at roughly **hue 34°** (orange) on a standard color wheel. The math that actually generates defensible pairings from that:

| Scheme | Second hue | What it looks like | The defense |
| --- | --- | --- | --- |
| **Complementary** | ~214° (azure blue) | Strong, high-tension contrast | [Fintech convention pairs blue=trust with orange=action](https://www.onething.design/post/split-complementary-color-scheme) — but this is the exact navy-adjacent territory just retired from the build. Reintroducing it undoes that decision. |
| **Split-complementary, near side** | ~184° (teal-cyan) | Cooler, more "tech," still high contrast | Reads clean and modern; less warmth-story than the others below |
| **Split-complementary, far side** | ~244° (blue-violet) | Deep, premium, closer to navy again | Same risk as complementary — too close to what was retired |
| **Triadic** | ~154° (green) | Even three-way tension, most "balanced" on paper | Risks reading as generic "success-green" — the universal checkmark colour, low distinctiveness |
| **Verdigris** (originally proposed) | ~165° | Sits *between* triadic green and split-comp teal | Not a textbook harmony — a **deliberate off-triadic pick**, chosen for material meaning over pure geometry (see below) |

**Two honest paths, both defensible — your call:**

**A. Geometrically correct: split-complementary teal (~184°).** The textbook-correct choice for a warm-orange base — strong contrast, quiet harmony, and it's the scheme [explicitly named as the fintech-appropriate structure](https://www.onething.design/post/split-complementary-color-scheme) (swap their "blue" role for this teal, keep terracotta as the "orange" action colour their own example describes). This is the answer if you want to be able to say "I used a split-complementary scheme" and have it be literally true.

**B. Narratively correct: verdigris (~165°), off the wheel on purpose.** The color-theory case is weaker — it's not a named harmony — but the *material* case is what I'd actually lead with in an interview: verdigris is the patina copper earns over years of oxidation, which is a story about **trust built over time**, exactly what "settled money" and "passed work" represent in this app. Terracotta (fired clay, made permanent by heat) and verdigris (copper, changed slowly by time) are both metaphors about *materials transformed by exposure* — fire for one, time for the other. That's a stronger case-study paragraph than "I used a split-complementary wheel," even though the wheel math is slightly looser.

**✅ Forced 2026-08-27: B — Verdigris.** A recruiter can look up split-complementary in five seconds; nobody else in your interview will have *"the two colors are both about material transformation, one by fire and one by time."* The geometric imperfection is small (11° off triadic) and invisible to the eye — the story is what's memorable, and it's still nowhere near confusable with terracotta or with the retired navy. This was the one decision still open after three rounds of discussion while everything downstream kept moving — locked now as a forcing function, not a closed door; say the word and it's a one-line swap since every token references it symbolically.

### Name candidates — "fuel for Indian AI" — ⬜ OPEN, decide last

⚠️ **Stoke was tried and rejected 2026-08-27** — "didn't feel fitting compared to Feul." Reopened deliberately; do not re-lock a name until the visual system and Tier 1 screens (§Scope triage) are built, so the name can be judged against a real product instead of a mood.

| Name | Why | Notes |
| --- | --- | --- |
| **GRAIN** | "The grain of the voice" — the texture unique to one person's voice. Also: raw material that feeds. Warm, rural-friendly, unusual. | Slightly abstract without a tagline |
| **FLINT** | The stone that makes the spark — contributors spark the models. Hard, tactile, premium. | Less directly about voice than Grain |
| **CORPUS** | The actual technical term for a speech dataset — instantly legible to an AI-hiring audience. | Clinical, less warm |
| ~~STOKE~~ | To feed fuel to a fire — contributors feed the models. | **Rejected** — didn't sit right against the original |
| OCTANE | Octane rating = the quality measure of fuel. | Common in branding |
| JOULE | SI unit of energy/work; measures the *work* the platform pays for. | Slightly cold |
| EMBER | Fire that persists. Warm, terracotta-native. | Softer, more consumer |
| KILN | Where raw earth becomes permanent. | Reads "craft" more than "fuel" |

**No recommendation locked.** Grain, Flint, and Corpus are the live shortlist — revisit once Tier 1 is built and there's a real product to name.

### Business rules — first withdrawal

⚠️ **Correcting the master brief.** "No minimum, ever" is exploitable: 100 accounts × ₹25 = a money faucet.

**The governing principle:**

> **The first-withdrawal floor must never exceed what one guided session can earn.**

If a contributor cannot reach the floor in their first sitting, they must return before ever seeing money leave the app — and that gap is exactly where trust dies.

**Chosen model:**

- Standing withdrawal floor: **₹100** (one clean rule, always true)
- Guided onboarding is designed to reach **₹100 in the first session** (e.g. ₹50 calibration + ₹50 first real task)
- Withdraw button is **visible but disabled** below the floor, with the exact gap shown: *"₹50 more to withdraw"* — never hidden

**Fraud controls that make this safe** (all zero-friction, no ID upload):

1. **One account per phone number.** UPI is phone-bound in India anyway.
2. ⭐ **UPI VPA name match.** When a VPA is entered, the payment network returns the registered account-holder name. Require it to match the profile name. This single control makes "50 accounts → one UPI" impossible, costs nothing, and adds no friction for honest users.
3. Welcome earnings are **conditional on clips passing auto-check** — not on merely pressing record.
4. Device fingerprint + rate limit on new-account welcome tasks.
5. First payout carries a **24h fraud-review hold**, presented as *"arriving by tomorrow"* — a delivery estimate, not a punishment.

### Verification model — tiered to money at risk (2026-08-26)

Researched against Indian KYC rules ([RBI/PMLA](https://www.messagecentral.com/blog/rbi-kyc-compliance-india-guide-2026)). The platform pays people for work — it is **not** a wallet, card, or PPI, so full KYC-at-signup does **not** apply. Verification escalates with payout volume, never at the door:

| Stage | Required | Why |
| --- | --- | --- |
| Sign up + earn | **T&C acceptance + DPDP data consent** | Standard; consent mandatory for voice-data collection anyway |
| First withdrawal | **UPI VPA name-match** (penny-drop) | Confirms a real named person owns the payout account — "KYC-lite" |
| Above a cumulative earnings threshold | **PAN** | TDS/tax on contractor payouts, not identity paranoia |
| High earners only | Full KYC | Rare; most contributors never hit it |

⚠️ **Do NOT copy card-issuer ID flows** (passport + selfie, like the Kit reference). Those are PPI/card requirements; replicating them here is over-compliance that kills the rural funnel. Case-study line: *"I gated verification to money at risk, not signup — that's both how the compliance scales and the only way the funnel survives for low-literacy users."*

### Visual system — locked (2026-08-26)

- **Light-only across the entire app.** The only dark surface is the Studio capture screen (dark = "recording", functional). No dark onboarding, no dark "premium" screens. One consistent warm-light system everywhere else.
- **"Warm Revolut"**: Revolut's structure (big numbers, one focus per screen, negative space, minimal chrome) in Feul's warm palette. Not Revolut's dark theme.
- **Home ≠ Wallet** (see DESIGN-SYSTEM.md §8): Home has the single TODAY earning figure + action; Wallet has the bento dashboard (Available/Pending/This-week/Total) + weekly bar + ledger, and no giant hero ₹.
- Full system: **DESIGN-SYSTEM.md** is now the source of truth for all tokens/components.

### Age & audience policy

*(Fills the gap flagged in master brief §10.3.)*

- **18+ only**, self-declared at signup.
- Enforced at withdrawal via **UPI VPA name match** — the receiving account belongs to a named adult.
- ❌ **No ID upload.** Not legally required here, and it would destroy the funnel for exactly the rural users the platform needs.
- **DPDP**: under-18 requires verifiable parental consent — operationally heavy. Declared **out of scope**, stated explicitly in the case study as a scope decision rather than an oversight.
- ⚠️ **ROOM edge case**: a family dinner take can easily include a minor. The consent roll-call **must ask** whether anyone present is under 18; if yes → exclude that speaker or capture guardian consent on tape.

**Target contributor**: 18–55 · owns a smartphone (often 360px-wide budget Android) · has UPI · speaks a target language natively.
**Literacy is not assumed** — hence audio playback of every script and instruction.

### ✅ Phase 0 acceptance

- [ ] Every row in the decisions table is filled
- [ ] Name is locked and will not change again
- [ ] Withdrawal floor and fraud controls agreed
- [ ] Age policy agreed

---

# PHASE 1 — Design system foundation

**Objective**: a token architecture that is responsive by construction, so no screen ever hardcodes a value.

> **This is the phase that decides whether the redesign looks designed or assembled.** Do not rush it.

## 1.1 Two-layer token architecture

**Primitives** — raw values, no meaning, never used directly in a component.

```
--t-terracotta-50 … 950     (hue ~34)
--t-carbon-50 … 950         (hue ~40, very low chroma, WARM)
--t-bone-50 … 950
--t-verdigris-50 … 950      (hue ~165)
--t-ochre-50 … 950          (hue ~75)
--t-crimson-50 … 950        (error — see 1.2)

--t-space-1 … 10
--t-size-11 … 64
--t-radius-1 … 4
--t-dur-1 … 3
```

**Semantics** — meaning, mapped from primitives. **Components use only these.**

```
--surface-ground / -raised / -sunken / -inverse
--text-primary / -secondary / -muted / -on-accent / -on-inverse
--action-primary / -primary-hover / -primary-pressed / -disabled
--state-settled / -pending / -failed / -review
--border-subtle / -default / -strong / -focus
--money-positive / -pending / -negative
--record-idle / -active / -glow
```

**Rule**: a component that references a primitive directly is a bug. This is what makes the light/dark surface swap possible without rewriting components.

## 1.2 ⚠️ Color risk to resolve first

**Terracotta `#E06C3A` and a rust error color are the same hue family.** If "record" and "rejected" read as the same colour at a glance, the system fails.

**Fix**: push error to a **deep crimson** (`~#8E2434`, hue ~15, low L) — clearly cooler and darker than terracotta. Then verify:

- [ ] Terracotta vs error, side by side, at 12px chip size
- [ ] Both tested in greyscale (they must differ in *value*, not just hue)
- [ ] Both tested under simulated deuteranopia and protanopia
- [ ] Never encode state in colour alone — **always colour + icon + label**

**Honest note on the palette**: the *structure* (one meaning per hue, 60/30/10, two grounds) will hold. The specific hex values are starting points that must be verified against real contrast and real adjacency. Expect to tune them once rendered.

## 1.3 Contrast floors

| Context | Minimum |
| --- | --- |
| Recording script | **10:1** — highest in the app, non-negotiable |
| Body text (both grounds) | 7:1 |
| Secondary text | 4.5:1 |
| Status text on its pair | 4.5:1 |
| Disabled | 3:1 and always paired with an explanatory label |

## 1.4 Elevation & materials — M3-informed

Follow Material 3's model: **elevation is mostly surface-tint, shadow is minimal.** Heavy drop shadows are the most dated thing in the current build.

| Token | Shadow | Use |
| --- | --- | --- |
| `--e-0` | none | **default for most cards and rows** |
| `--e-1` | `0 1px 2px rgba(20,16,14,.05)` | subtle lift — inputs, chips |
| `--e-2` | `0 1px 3px rgba(20,16,14,.06), 0 4px 8px rgba(20,16,14,.04)` | the ONE primary surface object per screen |
| `--e-3` | `0 2px 6px rgba(20,16,14,.08), 0 12px 24px rgba(20,16,14,.06)` | bottom sheets, modals |
| `--e-glow` | `0 0 0 1px terracotta/12, 0 8px 32px terracotta/28` | **studio record trigger only** |

**Rules:**
- Two-layer shadows only (key light + ambient) — never a single blurry blob.
- Shadow colour is **tinted with carbon**, never pure black.
- ❌ **No gradient-filled pill CTAs.** That single object is the most dated element in both G1 and G3.
- On the dark ground, elevation is expressed by **lighter surface**, not by shadow.
- Separation on Bone comes from **1px rules**, not shadows, in the majority of cases.

Reference: [Material 3 elevation](https://m3.material.io/styles/elevation/overview).

### Materials — how a layer sits on top of a ground

*(Added after the Apple-design audit — see `REDESIGN-MASTER-BRIEF.md` §7.4 for the full reasoning.)*

- `--material-scrim`: `backdrop-filter: blur(20px) saturate(140%)` over a semi-transparent ground colour — **used by every sheet, drawer, and the notification panel.** No component gets a flat opaque overlay.
- The Studio's dimmed HUD state and any pause/consent overlay over it use the **dark** material variant — blurred, not solid black, so the script stays felt underneath.
- The bottom tab bar is a translucent material; screen content scrolls beneath it, not up to a hard edge.
- Sticky bottom CTAs use a **scroll-edge gradient mask** (already correct by instinct in current `Home.tsx`/`Wallet.tsx` — `linear-gradient(to bottom, transparent, ground 30%)`), never a 1px hard border.
- Never stack two translucent surfaces — legibility collapses. If a sheet opens over another sheet, the parent becomes opaque/pushed-back first.

## 1.5 Responsive architecture

| Band | Width | Notes |
| --- | --- | --- |
| Compact | 320–359 | budget Android, iPhone SE |
| **Default** | **360–389** | ⭐ **dominant Indian screen — design here first** |
| Large | 390–429 | iPhone 14/15/16 |
| XL | 430+ | Pro Max |

**Rules:**
- ❌ No fluid `clamp()` type on mobile — half-pixel rendering.
- Two discrete type scales: compact and default.
- Compact steps down **display sizes only**. **Body never goes below 16px on any device.**
- Spacing flexes; type steps.
- Gutter: 16 / 20 / 24 / 24 across the four bands.
- Touch targets ≥44px; recording controls ≥72px.

## 1.6 ⭐ Dev-mode viewport harness

*(Contributor's idea — build it, it demonstrates system thinking to recruiters.)*

Extend the existing `DevPanel` with a **viewport switcher** that renders the current screen inside device frames:

- 320 (SE) · 360 (Redmi/Galaxy A) · 390 (iPhone 15) · 430 (Pro Max)
- Side-by-side comparison mode showing the same screen at 2+ widths simultaneously
- A visible readout of which type scale is active

This turns "my design is responsive" from a claim into a demonstration, inside the prototype itself.

## 1.7 Typography

**Recommendation: Anek superfamily** (Indian Type Foundry) — Devanagari, Tamil, Latin, Bangla, Telugu, Gujarati, Kannada, Malayalam, Odia, Gurmukhi, all drawn as one system with weight + width axes. Positioned explicitly [for brand systems, design systems and tech products](https://fiveelements.org.in/best-hindi-fonts-for-2026/).

**Honest caveats:**
- The **recording script is long-form reading under pressure** — a different job from UI labels. If Anek underperforms at 20–28px in real reading, swap the script face to **Mukta** (recommended for long-form Devanagari) or **Noto Sans Devanagari UI** (the neutral, maximally reliable choice). Test before committing.
- **Noto is the safe fallback** for any script Anek doesn't cover cleanly.

**What industry apps actually do**: most Indian consumer apps use a licensed or custom *Latin* face and fall back to **system Indic fonts** (Noto on Android). Very few do matched Indic typography properly — which is exactly why doing it well is a visible differentiator here. The bar is low.

**Numerals**: drop Space Mono. A typewriter mono says "developer tool"; money wants a **grotesque with tabular figures** — that says bank statement.

Full scale, line heights, and per-script line-height tokens: see master brief §6.

## ✅ Phase 1 acceptance

- [ ] Primitives and semantics are separate layers; no component references a primitive
- [ ] Same component renders correctly on Bone and Carbon with **zero component-level changes**
- [ ] Error vs terracotta verified: greyscale, colourblind sim, 12px chip
- [ ] All contrast floors pass, script text at ≥10:1
- [ ] Type renders correctly in Latin + Devanagari + Tamil with per-script line heights
- [ ] Dev viewport harness works at all four widths
- [ ] Screen at 320 has no clipping, no body text below 16px

---

# PHASE 2 — Primitive component library

**Objective**: every component built once, correctly, before any screen is assembled.

> Screens assembled from ad-hoc components is exactly how G3 became "every surface is the same rounded card."

## 2.1 Components

**Structure**: `Screen` · `Section` · `Divider` · `Sheet` · `TabBar` · `AppBar` · `SafeArea`

**Content**: `Card` (3 variants: flat / raised / hero — **only one hero per screen**) · `ListRow` · `StatBlock` · `EmptyState` · `Callout`

**Money**: `Amount` (tabular, de-emphasised decimals) · `AmountBreakdown` (base × coverage + bonus) · `LedgerRow` · `BalanceBlock`

**Action**: `Button` (primary / secondary / ghost / destructive · 3 sizes) · `IconButton` · `Chip` · `FilterChip` · `Switch` · `Stepper`

**Status**: `StatusBadge` (settled / pending / review / failed — **colour + icon + label, always all three**) · `ProgressPill` (segmented `[❚❚❚❚░░░░]`) · `ProgressRing` · `CoverageMeter`

**Progression**: `StandingBadge` · `CraftBar` · `TierGate` (the locked-work treatment) · `MilestoneMark`

**Audio**: `RecordTrigger` · `LevelMeter` · `Waveform` · `ClipRow` · `PlaybackScrubber` · `ScriptDisplay`

**Input**: `TextField` · `Select` · `SearchField` · `LanguagePicker` · `OTPField`

## 2.2 Component rules

- Every component takes semantic tokens only
- Every component has: default / pressed / disabled / loading / error states
- Every component tested on **both grounds**
- Every interactive component ≥44px touch target
- Every component tested at 320 and 430

## ✅ Phase 2 acceptance

- [ ] Component gallery screen renders every component in every state
- [ ] Gallery renders identically correct on Bone and Carbon
- [ ] No component hardcodes a colour, size, or radius
- [ ] `Amount` handles ₹0 · ₹12 · ₹1,250 · ₹12,500.50 without layout shift
- [ ] `Sheet` can be grabbed and reversed mid-close without waiting for the animation to finish
- [ ] `Sheet` tracks the pointer 1:1 during drag, rubber-bands past its bounds, uses the blurred material scrim (§1.4)
- [ ] Every gesture-driven component has a named `prefers-reduced-motion` alternative (master brief §7.4 table) — not just "respects the media query"

---

# PHASE 3 — Onboarding → first earning

**Objective**: get a first-time, low-trust user from install to **money in their UPI app**, in one session.

## 3.1 The flow

*(Reconciles the contributor's monday.com-checklist model with the money-first principle.)*

> ⚠️ **Corrected 2026-08-27 — consent sequencing bug.** This table previously had no consent screen at all, while §3.3 below required one "before first real submission." Step 5 (Guided first task) is a real recording — it's the same task that gets credited in step 7 — so under DPDP, consent has to precede it, not follow it. Fixed by inserting Consent as its own step, after the checklist shell but strictly before the mic is ever used.

| # | Screen | Notes |
| --- | --- | --- |
| 1 | **Market** | *"Sarvam AI needs 4,200 hrs of Marathi. 62% collected. 189 districts."* Live demand, not a claim. |
| 2 | **Auth** | One tap — Google / phone OTP. No form. |
| 3 | **Language select** | ⚠️ Must come before task 1 — you cannot serve a script without it. Native script, large targets. |
| 4 | **Home — setup checklist** | monday.com pattern. ⭐ **Item 1 is the paid task, not profile setup.** No recording happens on this screen — it's a dashboard shell, so consent can still come after it. |
| 5 | **Consent** | ⭐ **One screen, native language, before any recording** — including the calibration task in step 6. Not KYC-weight; a single clear screen, not a form. |
| 6 | **Guided first task** | Mic permission requested **here, in context** — never upfront. This is the first moment audio is captured, and consent (step 5) has already happened. |
| 7 | **Earning credited** | The celebration moment. ₹ lands. |
| 8 | **Wallet — add UPI** | Now motivated: they have money to move. |
| 8 | **Withdraw** | Enabled at ₹100 (§Phase 0). Gap shown if short. |

**Checklist ordering** (this is the key correction — money before admin):

```
✅ 1. Record your first clip          → ₹50   [DONE]
   2. Add your UPI to get paid                 ← next
   3. Complete your profile           → +₹50 task unlocked
   4. Turn on alerts for new campaigns
```

## 3.2 Screens to build

`Market` · `Auth` · `OTPVerify` · `LanguageSelect` · `SetupChecklist` (home empty state) · **`Consent`** · `MicPermissionPrime` · `GuidedTaskIntro` · `EarningCredited` · `AddUPI` · `UPINameMatch` · `FirstWithdrawSuccess`

## 3.3 Trust requirements

- [ ] Money credited **before** any profile/KYC ask
- [ ] Nothing requested before first payment except language and consent
- [ ] Consent shown in the **contributor's language**, one screen, **before the mic is used even once** — including the calibration task, not just "the real submission"
- [ ] Audio playback available on every instruction screen
- [ ] District-local social proof: *"12 contributors in Chhapra were paid ₹4,280 this month"*

## ✅ Phase 3 acceptance

- [ ] A first-time user reaches credited money in **under 4 minutes**
- [ ] Nothing but language is asked before the first payment
- [ ] Withdraw gap is always visible and exact
- [ ] Every screen works at 320px

---

# PHASE 4 — Home

**Objective**: a dashboard that is *yours*, distinct from the marketplace.

## 4.1 ⚠️ The Home vs Quests problem

The contributor flagged this correctly. The split:

| Home = **your state** | Quests = **the market** |
| --- | --- |
| Today / this week earnings | Search: company, language, keyword |
| ⭐ Active assignments — resume in progress | Filters: language, format, pay range, duration, eligible-only |
| ⭐ Needs your attention (rejected clip, missing UPI, pending consent) | Sort: pay, newest, closing soon, coverage multiplier |
| ⭐ Next milestone — *"12 more accepted → Verified → unlocks SCENARIO"* | Browse by client / lab |
| ⭐ Your coverage value — your rarity, stated honestly | Locked campaigns with unlock paths |
| 2–3 recommended campaigns only | Saved / bookmarked |
| Recent activity | Full catalogue |

If Home only shows a campaign list, it *is* Quests. The five ⭐ items are what make it a dashboard.

## 4.2 Layout

**Pattern** (validated from the contributor's reference): atmospheric gradient header → primary object **overlapping** the boundary → calm content below.

- Gradient: **Terracotta → Bone**
- Overlapping object: the **money board** (the screen's only `--r-lg` / `--e-2`)
- ⭐ The atmospheric zone carries **market state**, not a greeting. "Good morning, Alex" is not information.

**Three data states on one chrome** (retained from G3 — this was correct):
`empty` · `pending` · `live`. The dashboard is never replaced by a tutorial or a receipt.

## ✅ Phase 4 acceptance

- [ ] Home and Quests share no more than 2 component types in common
- [ ] All three data states render on identical chrome
- [ ] The five ⭐ dashboard-only items are present
- [ ] Exactly one hero object on the screen

---

# PHASE 5 — Marketplace (Quests)

**Objective**: make browsing feel like a real market, not a static list.

## 5.1 Additions the contributor asked for

- `SearchField` — company, language, keyword
- Filters: language · format · pay range · duration · **eligible-only toggle**
- Sort: pay · newest · closing soon · coverage multiplier
- ⭐ **Client/lab profile pages** — who is buying, what they build, what they've collected so far. Big trust lever.
- Campaign detail with full pay breakdown before you commit
- Locked campaigns visible with exact unlock path
- Saved campaigns

## 5.2 Screens

`QuestFeed` · `SearchResults` · `FilterSheet` · `CampaignDetail` · `ClientProfile` · `SavedCampaigns` · `EmptyResults` · `CoverageFullState`

## ✅ Phase 5 acceptance

- [ ] Every campaign card shows: client, format, language, pay breakdown, coverage multiplier, tier state
- [ ] Locked cards state the exact unlock condition and current progress
- [ ] Filters and search have real empty states

---

# PHASE 6 — Studio (recording)

**Objective**: the most refined screen in the app. **Readability above everything.**

## 6.1 Three beats

1. **Brief** — context, role, scenario setup, format rules, **full pay breakdown**, audio playback of the brief
2. **Capture** — dimmed HUD, script hero, single luminous trigger
3. **Review** — playback, per-clip retake, submit

## 6.2 Non-negotiables

- Script at **20–28px**, native script, **≥10:1 contrast**
- Per-script line-height tokens applied (Devanagari +10–15%)
- Record trigger ≥72px, thumb-zone, the **only** element with ambient animation and the only user of `--e-glow`
- Live input level + noise-floor warning
- Segmented clip progress `[❚❚❚❚░░░░] 4/8`
- Pause / cancel always reachable
- ⚠️ **Never let a UI element overlap the script.** Ever.

## 6.3 Screens

`Brief` · `ConsentSheet` · `RoomConsentRollCall` ⭐ · `Capture` · `NoisePause` · `Review` · `ClipRetake` · `SubmitConfirm` · `UploadQueue` · `SessionInterrupted` ⭐

## ✅ Phase 6 acceptance

- [ ] Script readable in bright sunlight simulation at 320px
- [ ] Devanagari and Tamil render with no matra clipping at every size
- [ ] Trigger reachable one-handed at 430px height
- [ ] A 25-min room take survives an interrupting phone call and resumes
- [ ] Record trigger shows feedback on pointer-**down**, not on release
- [ ] Level meter is driven by real mic input, not a decorative loop — verify it visibly disagrees with silence and responds to actual speech
- [ ] Brief → Capture → Review transitions cross-fade with a persistent context bar, not a hard cut
- [ ] Ambient glow degrades to a static ring + "Recording" label under reduced motion

---

# PHASE 7 — Wallet + payout

**Objective**: money that can be inspected and trusted.

- Big tabular balance, de-emphasised decimals — `₹127`**`.50`**
- **Available vs Pending** separated; pending states *what it waits on* ("2 clips under extended review")
- ❌ **Security Reserve removed** — confirmed present at `Wallet.tsx:208` + `SilverTierReserveDrawer`. Delete both.
- Ledger rows: quest · date · amount · state (settled / pending / failed)
- ⭐ Quality bonuses as **separate line items** so craft is visibly paid
- UPI destination with name-match verification
- Withdraw with exact gap when below floor

**Screens**: `Wallet` · `WalletEmpty` · `TransactionDetail` · `AddUPI` · `UPINameMatch` · `WithdrawConfirm` · `WithdrawSuccess` · `WithdrawFailed` · `PayoutHistory` · `PayoutReceipt`

## ✅ Phase 7 acceptance

- [ ] No mechanic anywhere holds the contributor's money
- [ ] Every pending amount says what it is waiting on
- [ ] Withdrawal gap always exact and visible
- [ ] The balance `Amount` count-up starts from its live displayed value if a second credit lands mid-animation — never restarts from 0
- [ ] `Security Reserve` and `SilverTierReserveDrawer` are fully removed from code, not just hidden

---

# PHASE 8 — Profile + progression

**Objective**: make the three axes legible.

- **Standing** + exact path to next
- ⭐ **Craft per format × language** — a skill sheet. *(Reference: Elevate's pictogram ranking bars — one row per skill, filled proportionally. Far better than a single level bar.)*
- **Coverage value** — your rarity, honestly stated
- Voiceprint identity mark (§9)
- Data Vault & consent management (keep, redesign)
- Validator role entry if eligible

❌ Remove: XP number · "XP Rewards Hub" · emoji achievements · streak unlocks
⚠️ `Rewards.tsx` is 100% un-migrated (still `userXP`, `xpCost`, "Level 5+"). **Fold into Profile** — a separate voucher storefront re-introduces the "spend points" framing the product is moving away from.

**Screens**: `Profile` · `StandingDetail` · `CraftDetail` · `CoverageDetail` · `Milestones` · `DataVault` · `ConsentRevoke` · `Settings` · `Help` · `Referral`

---

# PHASE 9 — Validator

**Objective**: turn the thinnest role into a real system.

**Screens**: `ValidatorEligible` · `CalibrationTest` ⭐ · `RulesOfTheRole` (COI surfaced once) · `ValidatorHome` · `GradingQueue` · `GradingTask` · `DisagreementEscalation` ⭐ · `AccuracyDashboard` · `AccuracyWarning` · `ValidatorWallet` · `QueueEmpty`

Full system design: master brief §11.2.

## ✅ Phase 9 acceptance

- [ ] Validator rejection tags use the **same taxonomy** Repair Studio displays
- [ ] Disagreement produces an honest contributor-facing state
- [ ] Empty queue offers contributor work

---

# PHASE 10 — States & edge cases

**Objective**: the phase that makes it a product instead of a demo.

> **Insight from the contributor's reference pull**: every screen they collected was a **completion / celebration / progression moment** — Revolut's earn-confirm, Truebill's activation, Speak's session summary, Numo's level-up, Brilliant's lesson-complete.
>
> **The current app has none of these.** It is 100% utility screens. That absence is a major reason it feels lifeless — more than colour or type. Reward moments are not decoration here; they are the missing half of the product.

## 10.1 Celebration moments to add ⭐

`FirstEarningCredited` · `MilestoneReached` · `StandingPromoted` · `CraftLevelUp` · `FirstWithdrawSuccess` · `CampaignCompleted` · `CoverageContribution` (*"you're 1 of 12 from Chhapra"*)

**Restraint rule**: no confetti, no trophies, no mascots. The celebration is **the number, large, and one line of plain truth.** Reference Revolut's earn-confirm, not Duolingo's chest-opening.

## 10.2 Edge cases

Build the ⭐ items from master brief §13 first:
`RoomConsentRollCall` · `CoverageFull` · `CampaignClosedMidSession` · `SessionInterrupted` · `ConsentRevokedPostPayment` · `SpoofHold` · `UploadQueueOffline` · `RepairStudio`

Then the standard set: mic denied · noise floor · wrong language · daily limit · duplicate · UPI failed · below minimum · minor detected · battery low.

## ✅ Phase 10 acceptance

- [ ] Every tab has a real empty state
- [ ] Every failure names what happened, why, and what to do
- [ ] Every celebration is legible in one glance and contains no fake enthusiasm

---

# PHASE 11 — Integration & case study

> ⚠️ **Added 2026-08-27 — integration strategy was missing.** The live codebase already has working, tested logic worth keeping: `Home.tsx`'s three-data-state model (empty/pending/live on one chrome), the quest format taxonomy in `lib/quests.ts`, the `DevContext` state-override panel, and the existing framer-motion primitives (earning celebration, count-ups, `whileTap`). Figma Make output is **markup and styling only** — it does not know any of this exists. Treat step 1 below as a merge, not a replacement:

1. **Import Figma Make output as markup/style reference, not as a drop-in file.** Port its tokens, layout, and visual treatment *into* the existing component — the three-data-state logic, `DevContext` hooks, and quest data model stay; only their rendering changes. Never overwrite `Home.tsx`/`Wallet.tsx`/etc. wholesale with generated output.
2. Clean tokens → reconcile against `DESIGN-SYSTEM.md` → extract components
3. `npx tsc --noEmit` → zero errors
4. Rebuild + `node scripts/sync-embeds.mjs feul` from `D:\Portfolio` (embed is stale since **4 Aug**)
5. Rewrite `D:\Portfolio\app\projects\feul\page.tsx` — currently describes `/first-earning`, which now redirects
6. Add the **G1 → G4 iteration section** with real screenshots
7. Update deep-linked prototype routes in the case study
8. State the Tier 3 items (§Scope triage) honestly as "designed, sequenced, not yet built" — do not imply they're live if they aren't

---

# Appendix — Screen inventory

## Exists today
Onboarding · EarningCelebration · Home · QuestFeed · Wallet · Rewards · Profile · Recording · RejectedTask · Performance · RoleSelection · ValidatorApplication · PayoutFlow · RewardClaimFlow · ValidatorHome/Tasks/Profile/Wallet/Rewards · GradingTask · QuestCreator×3

## Missing — to build

**Onboarding**: Market · OTPVerify · LanguageSelect · SetupChecklist · MicPermissionPrime · GuidedTaskIntro · AddUPI · UPINameMatch

**Marketplace**: SearchResults · FilterSheet · CampaignDetail · ClientProfile ⭐ · SavedCampaigns · EmptyResults · CoverageFull ⭐

**Studio**: RoomConsentRollCall ⭐ · UploadQueue · SessionInterrupted ⭐ · ClipRetake · SubmitConfirm

**Wallet**: TransactionDetail · WithdrawConfirm/Success/Failed · PayoutHistory · PayoutReceipt · EditUPI · UPINameMatchRetry

**Agency** *(new, from the design-foundations audit — master brief Appendix D)*: SubmissionUndoWindow ⭐ · LanguageFormatPreferences

**Progression**: StandingDetail · CraftDetail ⭐ · CoverageDetail ⭐ · Milestones

**Celebration**: MilestoneReached · StandingPromoted · CraftLevelUp · FirstWithdrawSuccess · CampaignCompleted ⭐

**Validator**: ValidatorEligible · CalibrationTest ⭐ · RulesOfTheRole · DisagreementEscalation ⭐ · AccuracyDashboard · AccuracyWarning · QueueEmpty

**System**: Settings · Help · Referral · NotificationCentre · offline states · per-tab empty states

**Cut**: QuestCreator × 3 (desktop scope — state as a decision, don't delete silently)

---

# Appendix — Visual asset strategy

**Answering "how do we make the achievement assets?"**

⭐ **Everything is code. No asset library needed.** This is both the fastest route and the most distinctive one — and it suits a Figma Make workflow, which outputs code rather than images.

| Asset | How |
| --- | --- |
| **Voiceprint identity mark** | Pure SVG algorithm — radial waveform generated from a per-user seed. Densifies with contribution count. Unique per user, impossible to call templated. |
| **Coverage maps** | India district GeoJSON is freely available open data (e.g. the `datameet/maps` community dataset). Render as SVG paths, fill by contribution. |
| **Standing marks** | Flat geometric SVG, two colours, no gradient, no 3D. |
| **Functional icons** | Keep Lucide (already in the build). Consistent stroke weight, never icon-only. |

❌ **Do not** import a Figma Community badge/illustration pack. That is precisely how the app ends up looking like every other app — it's the same failure mode as the emoji badges, one level up.

---

# Appendix — Reference pull list

**The contributor runs this** — Mobbin is auth-gated and cannot be browsed from here. Shot list, in priority order:

1. ⭐ **Indian gig-worker apps** — Swiggy/Zomato partner, Rapido Captain, Uber Driver. Pull: earnings display, pending payouts, tier benefits, payout receipts, deduction explanations. **Highest value, least-studied category.**
2. **Pending vs settled money** — Wise, Monzo, Revolut
3. **Earn-confirm moments** — Revolut (the reference already pulled is the right model)
4. **Skill/competence display** — Elevate rankings (maps directly onto Craft score)
5. **Setup checklists** — monday.com (already pulled), Notion, Linear onboarding
6. **Recording/teleprompter** — Ableton Note, AudioPen, BIGVU, Descript mobile
7. **Search + filter in a marketplace** — Upwork, Airbnb

**Pull states, not screens**: pending · empty · rejected · locked · disagreement. That is where this app is weak and where nobody posts screenshots.
