# Feul → [NAME] — Master Redesign Brief

> **Naming status (revised 2026-08-27): OPEN, deferred to last.** "Stoke" was proposed, then rejected by the product owner. Do not build branding, wordmarks, or copy around any candidate name — use `[NAME]` as a literal placeholder everywhere until §4.2 is resolved. See `EXECUTION-PHASES.md` Phase 0 for the current shortlist.

> **Status**: Strategy locked in discussion, awaiting 4 final decisions (§13).
> **Created**: 2026-08-23
> **Supersedes**: `great-understandingof-the-situation-witty-castle.md` (Passes 0–5), `clay-visual-upgrade.md`, `src/imports/pasted_text/feul-ai-upgrade-plan.md`, `src/imports/pasted_text/home-pass-3-amend.md`.
> Those documents remain useful as **history** for the case study (they record why each direction was abandoned). They are no longer the build spec.
>
> **Purpose**: Single source of truth for the full redesign. Written so no context is lost between sessions and so Figma Make prompts can be generated directly from it.

---

## Table of contents

1. [Why this rework exists](#1-why-this-rework-exists)
2. [The core reframe — coverage, not hours](#2-the-core-reframe--coverage-not-hours)
3. [Research evidence](#3-research-evidence)
4. [Brand](#4-brand)
5. [Color system](#5-color-system)
6. [Typography system](#6-typography-system)
7. [Spacing, radius, elevation, motion](#7-spacing-radius-elevation-motion)
8. [Light vs dark — the two-surface doctrine](#8-light-vs-dark--the-two-surface-doctrine)
9. [The economic system](#9-the-economic-system)
10. [Trust design for a first-time earner](#10-trust-design-for-a-first-time-earner)
11. [Roles](#11-roles)
12. [Screen-by-screen scope](#12-screen-by-screen-scope)
13. [Edge case matrix](#13-edge-case-matrix)
14. [Achievements & identity visual system](#14-achievements--identity-visual-system)
15. [Reference library](#15-reference-library)
16. [Case study narrative](#16-case-study-narrative)
17. [Open decisions](#17-open-decisions)
18. [Execution sequence](#18-execution-sequence)

---

## 1. Why this rework exists

### 1.1 The three dead ends

Three visual directions were built and abandoned. Each failed for a *different, nameable* reason — this is case-study material, not embarrassment.

| Generation | Date | What it was | Why it failed |
| --- | --- | --- | --- |
| **G1 — Gamified** | Apr 2026 | Peach wash, navy hero slab, orange progress ring, 👋 emoji, "you're on a roll!", "+20% bonus — 8 min left" | 2023-era gamified fintech. Had *presence* but sold points instead of money. Urgency was fake. |
| **G2 — Clay** | mid-2026 | 3D clay character assets | Dated 2023 trend; made a payments product look like a toy. Also unscalable — every category needed a bespoke 3D asset. |
| **G3 — Sterile** | Aug 2026 | Flat shadcn-ish cards, disciplined tokens, honest copy | Fixed the *system*, lost the *art direction*. Every surface became the same rounded card. Cleaner than G1 and less alive. |

### 1.2 The actual diagnosis

**The product has never had an art direction pass.** It started with zero visual reference and inherited only a brand color. G3 proved that token discipline ≠ visual direction. Both are needed; only one exists.

### 1.3 What is *not* wrong

Do not throw these away — they are the strongest existing assets:

- Payout-architecture-before-screens sequencing
- Repair Studio (partial-work preservation on rejection)
- Honest empty-marketplace state
- DPDP consent + revocation flow
- Spoofing/TTS verification hold
- Wallet-over-Rewards information hierarchy
- The oklch token architecture in `theme.css` (structure is good; values change)

---

## 2. The core reframe — coverage, not hours

> **Labs do not buy audio. They buy coverage.**
> A specific speaker demographic × district/dialect × acoustic condition × conversation type.

This is the single insight that restructures the product.

### 2.1 Why it matters

The old quest model (`Hindi — Everyday Phrases · 8 clips · ₹12`) sells the abundant commodity. Raw hours are cheap and plentiful — AI4Bharat sits on 300,000 raw hours of which only ~6,000 are transcribed. What is *scarce* is a 60-year-old Bhojpuri speaker in Chhapra, recorded in a real kitchen, mid-argument.

### 2.2 What it unlocks

1. **An honest pay multiplier.** Rarity replaces streaks. "Marathi · Vidarbha · 45+ — 6% of target. Pays 1.6×." True, checkable, non-manipulative.
2. **A real reason the platform exists.** Anyone can collect urban Hindi. The business is the long tail.
3. **A retention hook that isn't a streak.** Unfinished *coverage* — "400 Tamil clips still needed, closes Friday" — uses completion psychology on something real.
4. **A technical constraint worth designing around.** Multi-speaker corpora want *separate channels per speaker* (see §3). A 4-person room take on one phone is one channel. This is a genuine design problem to solve visibly.

### 2.3 The central UI object

A **coverage meter** replaces XP/streaks as the emotional core of the app.

```
Sarvam AI · Indic Conversational Corpus
████████████░░░░░░░  62% collected
4,200 hrs target · 189 districts · closes March
Your dialect (Marathi, Vidarbha): 6% covered → 1.6×
```

---

## 3. Research evidence

Real numbers, for realism in the prototype and defensibility in interview.

| Source | Finding | Design implication |
| --- | --- | --- |
| **Indic DiarBench** (Sarvam + AI4Bharat, Interspeech 2026) | 108 hrs across 22 languages — headline stat is **485 speakers from 189 districts** | 108 hrs is publishable *if* spread is right. Speaker/district diversity > volume. |
| **AI4Bharat** | 300,000 hrs raw · 6,000 hrs transcribed · TTS corpus 1,704 hrs from **10,496 speakers** across 22 languages | Raw volume is cheap. Labeled + diverse is the product. |
| **Josh Talks "Human-1"** | 26,000 hrs Hindi · **14,695 speakers** · real 2-person spontaneous conversation · **separate channel per speaker** | Validates ROOM format. Separate channels needed for overlap/turn-taking learning. |
| **Typical corpus composition** | ~70% conversational · ~20% read/scripted · ~10% spontaneous unscripted | Quest taxonomy should mirror this ratio, not be evenly split. |
| **Mercor** | AI video interview (~20 min), weekly pay, hour-tracked, $16–200/hr | Gate-before-work model. Works for scarce expertise. |
| **Outlier / Scale** | Quality score gates queue access; inconsistent work → low-priority queues; generalist rates fell ~$28–35/hr (2025) → ~$18–22/hr (2026) while specialists held | Commodity work commoditizes. Build around scarcity. Quality-gates-access is proven. |

**Links**: [Indic DiarBench](https://www.sarvam.ai/blogs/indic-diarbench) · [AI4Bharat ASR](https://ai4bharat.iitm.ac.in/areas/asr) · [Human-1](https://arxiv.org/abs/2604.23295) · [Scale/Outlier](https://www.aigigjobs.com/platforms/scale-ai) · [Mercor](https://research.contrary.com/company/mercor)

### 3.1 Illustrative client batches

Use real lab names, labelled in the case study as *illustrative, no affiliation*. They carry enormous narrative weight — "recording for Sarvam AI's Indic Conversational Corpus" is a vastly stronger trust signal than "Hindi — Everyday Phrases."

Suggested campaign roster for the prototype:

| Client | Campaign | Format | Why it exists |
| --- | --- | --- | --- |
| Sarvam AI | Indic Conversational Corpus | ROOM / SCENARIO | Full-duplex conversational modelling |
| AI4Bharat | Dialect Benchmark — Vidarbha Marathi | SCENARIO | District coverage gap |
| Bhashini | Government Service Interactions | INTERVIEW | Public-service ASR |
| (Fictional lab) | Code-Switch Corpus (Hinglish) | LINES / SCENARIO | Real, underserved problem |
| (Fictional lab) | Noisy Environment Set — street, kitchen, transit | ROOM | Acoustic condition coverage |

---

## 4. Brand

### 4.1 Rename rationale

"Feul" was the founder's, itself borrowed from David AI (YC, audio datasets). Renaming:
- removes any conflict risk
- makes the "independent continuation" boundary *legible instead of asserted*
- is a case-study beat, not a footnote

**Constraints**: minimal, international, premium, not overtly Indian (avoids forcing an "Indian-themed" visual language), keeps the energy.

### 4.2 Candidates

> ⚠️ **Revised 2026-08-23** — brief updated to preserve the original *fuel* meaning ("fuel for Indian AI"), not replace it.
> ⚠️ **Revised again 2026-08-27** — Stoke was tried, then explicitly rejected as "not fitting compared to Feul." Decision **reopened and deferred to last** — see status note at the top of this document. The two other semantic fields worth fishing in, per the later discussion: fire/ignition (Stoke, Ember, Kiln — keeps the fuel energy) vs. voice/data (Grain, Timbre, Corpus — smarter, more ownable, less collision risk). **Grain** ("the grain of the voice" — the texture unique to one person's voice, and grain as raw material that feeds) is the strongest unexplored candidate and worth sitting with before deciding.

| Name | Case | Risk |
| --- | --- | --- |
| ~~**STOKE**~~ | *To stoke* = to feed fuel to a fire — contributors feed the models. Short, warm, international. | **Rejected 2026-08-27** — didn't feel fitting against the original Feul |
| **GRAIN** | "The grain of the voice" — the unique texture of an individual voice. Also: raw material that feeds something larger. Deep, unusual, defensible, rural-friendly. | Slightly abstract without the tagline explaining it |
| **FLINT** | The stone that makes the spark — contributors are the flint that sparks the models. Hard, tactile, premium. | Less directly "voice" than Grain |
| **CORPUS** | The actual technical term for a speech dataset. Instantly legible to an AI-hiring audience. | Clinical; less warm |
| **OCTANE** | Octane rating is the *quality measure of fuel* — fuel + quality in one word, the product's two axes. | Common in branding |
| **JOULE** | SI unit of energy and work. Premium, clean, and it measures *work* — which is what the platform pays for. | Slightly cold |
| **EMBER** | Fire that persists. Warm, terracotta-native. | Softer, more consumer |
| **KILN** | Where raw earth becomes permanent. Strong metaphor, keeps terracotta literal. | Reads "craft" more than "fuel" |

**Status: ⬜ open, decide last** — after the visual system, screens, and flows are locked and built. Naming the product before the product exists to be named has cost a rewrite once already; don't repeat it.

### 4.3 Brand voice

Unchanged from `PRODUCT.md` principles: truth-first, no hype, name the limits. Specifically:
- Never promise instant money. Say when it lands.
- Never use fake urgency. Only real supply/demand numbers.
- Never call the contributor a "user." They are a **contributor**. The word does work.

---

## 5. Color system

> ⚠️ **Terracotta, Carbon, Bone, and Crimson (error) are locked.** The cool "settled/verified" hue is **pending** — see `EXECUTION-PHASES.md` §Phase 0, "Color research: what should pair with terracotta" for the full color-wheel math and two defensible options (geometric split-complementary teal vs. the narrative-driven Verdigris below). The table below shows Verdigris as the working placeholder until that's decided.

### 5.1 Semantic palette

Every hue means one thing. This is what makes it defensible.

| Token | Value (approx) | Meaning | Usage |
| --- | --- | --- | --- |
| **Terracotta** | `#E06C3A` base / `#C4622D` deep | **Work in motion** | Active record trigger, primary CTA, money moving |
| **Carbon** | `#14100E` | **The record** | Body text, studio ground, ledger rules |
| **Bone** | `#FAF7F2` | **Paper** | Light ground — where money is counted |
| **Verdigris** | `#3D6B5E` | **Settled / verified** | Credited money, passed clips, confirmed consent |
| **Ochre** | `#C8922E` | **Pending** | In review, awaiting settlement. *A wait, not a warning.* |
| **Crimson** | `#8E2434` | **Failed / rejected** | Rejection, payment failure. ⚠️ Revised from "Rust" — pushed to hue ~15 and darker so it cannot be confused with Terracotta. |

### 5.2 The defense

> **Terracotta is fired earth** — raw material made permanent. That is literally the product's function.
> **Verdigris is the patina copper earns over time** — so it marks trust that *accumulated*: settled money, passed work, confirmed consent.
>
> Warm/cool complementary pair, unusual in fintech, and every hue has a reason that isn't "it looked nice."

**Navy is retired.** It was doing generic corporate-fintech work. Verdigris does the cool job with far more character and an actual story.

⚠️ **Rust vs Terracotta must be tested for confusability.** They're adjacent hues. If rejection and CTA read as the same color at a glance, push Rust darker/desaturated further, or use a non-color signal (icon + border) as the primary rejection marker.

### 5.3 60 / 30 / 10 per surface

Same three roles, inverted per ground. **One system, two grounds** — not two design systems.

**Ledger surfaces (light):**
- 60% Bone (ground)
- 30% Carbon (text, rules, structure, secondary surfaces)
- 10% Terracotta — with Verdigris / Ochre / Rust taking small slices *inside* that 10

**Studio surface (dark):**
- 60% Carbon (ground)
- 30% elevated carbon surfaces + Bone text
- 10% Terracotta glow (the record trigger)

### 5.4 Ramp construction

Keep the existing oklch ramp architecture in `src/styles/theme.css` — the structure is good. Replace values:

```
--terracotta-{50…950}   hue ~34    (existing accent ramp, keep)
--carbon-{50…950}       hue ~40, very low chroma, WARM (not the current 70)
--verdigris-{50…950}    hue ~165
--ochre-{50…950}        hue ~75
--rust-{50…950}         hue ~25, lower L than terracotta
```

Retire: `--neutral-*` cool ramp, `--navy`, `--cream`, `--surface-hero*`, all `--accent-xp`, all `--status-info-*` blues.

### 5.5 Contrast requirements

- Body text on Bone: **≥ 7:1** (this audience includes older eyes on cheap screens in daylight)
- Body text on Carbon: **≥ 7:1**
- Recording script text: **≥ 10:1** — highest contrast in the app, non-negotiable
- Any status color used as text: **≥ 4.5:1** on its own background pair
- Never encode state in color alone — always color + icon or color + label

---

## 6. Typography system

### 6.1 Typeface — the highest-leverage decision

> ✅ **Locked 2026-08-23: Anek throughout, with a scoped escape hatch.** Full reasoning and the token architecture that makes the escape hatch cheap: `EXECUTION-PHASES.md` §Phase 0, "Typography decision, with reasoning."

**Anek** (Indian Type Foundry, Google Fonts). Variable superfamily covering Devanagari, Tamil, Latin, Bangla, Telugu, Gujarati, Kannada, Malayalam, Odia, Gurmukhi — **all drawn as one system**, with weight *and* width axes.

Why it wins: a Hindi headline and an English headline will look like the same app. Nothing else free does this across this many scripts.

- `Anek Latin` — UI chrome, body
- `Anek Devanagari` — Hindi/Marathi content
- `Anek Tamil` — Tamil content
- Alternatives if more display character is wanted: **Kohinoor** (ITF, premium, has script siblings), **Mukta** (Ek Type)

**Numerals — drop Space Mono.** A typewriter mono says "developer tool." Money wants a **grotesque with tabular figures** — that says bank statement. Use Anek's tabular figure set, or pair one precise grotesque for numerals only.

### 6.2 Scale

Real systems are hand-tuned, not pure modular (Material, Apple HIG, Polaris all are). Base ≈ 1.25 for display, ≈ 1.15 in text range, then optically adjusted.

| px | Role | Line height | Tracking | Notes |
| --- | --- | --- | --- | --- |
| 11 | Eyebrow / micro label | 1.4 | `+0.08em` | uppercase |
| 12 | Caption | 1.45 | `+0.02em` | |
| 14 | Meta / secondary | 1.5 | `+0.01em` | **not** the base |
| **16** | **Body — BASE** | **1.5** | `0` | never smaller, any device |
| 18 | Lead / emphasis | 1.5 | `0` | |
| 20 | Card title | 1.35 | `-0.005em` | |
| 24 | Section heading | 1.3 | `-0.01em` | |
| 30 | Screen title | 1.2 | `-0.015em` | |
| 38 | Display | 1.1 | `-0.02em` | |
| 48 | Hero number | 1.0 | `-0.02em` | tabular |
| 64 | The money moment | 1.0 | `-0.025em` | tabular, one per screen max |

> ⚠️ **Correction (2026-08-23)**: tracking is size-specific, not one global value — large text reads as too loose at zero tracking (letters spread visually as they grow), small text reads as too tight. The 48–64px hero figures are this app's single most important typographic moment (the money credited to a first-time earner) and previously had no tracking rule at all. Rule of thumb: tighten as size increases past ~20px, loosen slightly below 14px.

**Dynamic Type equivalent**: the layout must survive the user's system font-size setting scaled up ~130–150%, not just the fixed px table above. Use `rem`/`em` for spacing that relates to text, not fixed px, so a larger system font doesn't clip or overlap — worth stating explicitly given the target contributor (§10.3a) skews toward users more likely to run a larger system text size.

> ⚠️ **Correction to earlier assumption**: 14px is *not* the base. iOS body is 17pt; Material body-large is 16sp. 14 is secondary. For contributors reading a script aloud on a budget phone, **16 is the floor and the recording script wants 20–28.**

### 6.3 Indic-specific rules

These get missed and they matter:

- **Devanagari needs ~10–15% more line-height than Latin** at the same size — the shirorekha plus matras above and below collide otherwise.
- **Devanagari reads ~1–2px smaller than Latin** at matched point size. Bump script sizes up optically.
- **Tamil needs generous leading** — tall ascenders and descenders.
- Implement a **per-script line-height token**, not one global value.

```css
--lh-body-latin: 1.5;
--lh-body-deva:  1.7;
--lh-body-taml:  1.7;
```

### 6.4 Responsive — design at 360, not 390

**India's dominant screen is 360×640–800** (Redmi, Samsung A-series). Designing only at 390 is a mistake for this product.

| Band | Width | Devices |
| --- | --- | --- |
| Compact | 320–359 | iPhone SE, budget Android |
| **Default** | **360–389** | **Dominant Indian Android** |
| Large | 390–429 | iPhone 14/15/16 |
| XL | 430+ | Pro Max, large Android |

**Rules:**
- **No fluid `clamp()` type on mobile** — causes half-pixel rendering.
- Two discrete type scales: compact (<360) and default (≥360).
- Compact steps down **display sizes only**. Body never shrinks below 16.
- Let *spacing* flex; keep *type* stepped.
- Touch targets ≥ 44px always; recording controls ≥ 72px.

### 6.5 Language strategy

| Surface | Language | Reason |
| --- | --- | --- |
| UI chrome | English (localizable later) | Acceptable for prototype scope |
| Quest content — script, scenario brief, instructions | **Native** | It's the job |
| **Consent** | **⚠️ NATIVE — mandatory** | You cannot obtain valid informed consent in a language someone doesn't read. DPDP requirement *and* an ethical one. |
| Rejection reasons | **Native** | Feedback the contributor must act on |
| Money amounts | Numerals + native label | |

The consent exception is what makes this decision look considered rather than convenient. **Do not skip it.**

---

## 7. Spacing, radius, elevation, motion

### 7.1 Spacing — 4pt base

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72`

Screen gutter: **20px** at 360 band, 16px at compact, 24px at large.

### 7.2 Radius

Reduce from the current 6 values. The "everything is the same rounded card" problem is partly a radius problem — when every object shares a radius, nothing has hierarchy.

| Token | Value | Use |
| --- | --- | --- |
| `--r-sm` | 8px | chips, tags, inline |
| `--r-md` | 14px | cards, inputs, list rows |
| `--r-lg` | 24px | primary surface objects (money board, campaign hero) |
| `--r-full` | 999px | pills, avatars, record trigger |

**Rule: only ONE `--r-lg` object per screen.** That's how you get hierarchy back.

### 7.3 Elevation

Kill gradient-filled pill CTAs — that specific object is the most dated thing in both G1 and G3.

| Token | Use |
| --- | --- |
| `--e-flat` | no shadow — default for list rows and most cards |
| `--e-raised` | subtle — the one primary surface object |
| `--e-glow-terracotta` | **studio only** — the record trigger's luminance |
| `--e-sheet` | bottom sheets and modals |

Most cards should have **no shadow at all** — separation by rule/border on Bone, by elevated surface on Carbon.

### 7.4 Motion, materials & interaction physics

> ⚠️ **Added 2026-08-23**, after an audit against Apple's fluid-interface principles (*Designing Fluid Interfaces*, WWDC 2018 + *Principles of Great Design*, WWDC 2026). The original version of this section was three duration tokens and a one-line reduced-motion note — not enough to actually build from, for an app whose main interactive surfaces are gesture-driven (sheets, a record trigger, real-time level feedback, drag-to-dismiss).

**The governing idea**: motion should start from the current on-screen value, carry the gesture's velocity, and be interruptible at every point. A fixed-duration CSS transition can't do any of that — it's why springs, not keyframes, drive anything the user can touch.

#### Base tokens

- `--d-fast` 120ms · `--d-base` 180ms · `--d-slow` 280ms — **for non-gestural transitions only** (fades, colour changes, tab switches)
- `--ease-standard` `cubic-bezier(0.2, 0, 0, 1)` — same scope
- Springs (below) drive everything the user's finger can touch or interrupt

#### Spring values — assigned per Feul interaction

| Interaction | Damping | Response | Why |
| --- | --- | --- | --- |
| Bottom sheet (Consent, RoomConsentRollCall, FilterSheet, WithdrawConfirm) | `0.8` | `0.3` | Apple's own drawer default — slight settle, not a hard stop |
| Record trigger press | `1.0` | instant on pointer-down | Feedback lives on press, not release — see §Response |
| Coverage meter / CraftBar / ProgressRing fill | `1.0` | `0.4` | Critically damped — a trust meter overshooting reads as glitchy, not alive |
| Money count-up on credit | `1.0` | `0.4` | Single settle, **starts from the current displayed value** if a second credit lands before the first finishes — never restarts from 0 |
| Locked campaign card, tapped | `0.8` bounce, small amplitude | `0.2` | A tiny resistant "no" — the card refuses, doesn't ignore the tap |
| Tab bar switch (Home/Quests/Wallet/Profile) | n/a — cross-fade | `120ms` | Content differs entirely between tabs; sliding implies false spatial continuity |
| Studio beat transition (Brief → Capture → Review) | n/a — cross-fade + persistent context bar | `180ms` | See §Spatial consistency below — a hard cut here breaks the "one continuous session" feeling |

**Interruptibility — the one rule that matters most:**
- Every sheet, drawer, and drag must be grabbable and reversible mid-motion. A contributor pulling down to dismiss the consent sheet, then changing their mind, must be able to reverse it without waiting for the close animation to finish.
- On interrupt, animate from the **live on-screen position**, never from the logical target. This applies directly to the money count-up (§table above) and to any sheet drag.
- Decompose 2D drags (e.g. dragging a room-consent card) into independent X/Y springs so they don't desync.

**Direct manipulation:**
- Sheets and drawers track the pointer 1:1 during drag — never animate only on release.
- Use Pointer Events with `setPointerCapture` so a drag continues even if the finger leaves the sheet's bounds — realistic given this app's target device is often a smaller, cheaper screen where fingers overshoot.
- Rubber-band at drag boundaries (a sheet dragged past fully-open, or a list pulled past its top) rather than hard-stopping.

**⚠️ Known existing bug, worth fixing regardless of the redesign**: `Rewards.tsx` currently implements its swipe-back gesture with raw `touchstart`/`touchend` listeners and a distance threshold — it fires `navigate(-1)` only on release, with **no tracking or visual feedback during the drag**. That's precisely the "recognizer reports only a final state" anti-pattern this framework warns against. Any swipe-to-dismiss/swipe-back pattern in the rebuild should track 1:1 and commit or snap-back based on release velocity, not a single distance check after the fact.

**Waveform / level meter — causality, not decoration:** the current `Waveform.tsx` is used decoratively (a static pattern behind the Wallet balance card). In the Studio, the level meter **must be driven by real mic input**, frame-synced — a canned looping animation during recording would visibly disagree with what the contributor is actually saying, which breaks trust in the exact screen where trust matters most.

#### Materials — translucency conveys hierarchy, not decoration

The two-surface doctrine (§8) says *where* dark and light apply. This is *how a layer sits on top of either one*.

- **Sheets and scrims are translucent, blurred materials, not opaque overlays** — `backdrop-filter: blur()` over a semi-transparent ground. This matters most on the Studio: a solid black scrim over the dimmed HUD reads as "frozen"; a blurred, translucent one keeps the script's presence felt underneath, which is correct for a screen whose entire thesis is "the script is the job."
- **Material weight signals hierarchy**: heavier blur + deeper shadow for large surfaces (sheets), lighter for small ones (chips, tooltips). Never stack two translucent layers — legibility collapses.
- **The bottom tab bar is a translucent material**, content scrolling underneath it, not an opaque strip the content stops at.
- **Scroll edge effects, not hard dividers.** ✅ Already correct by instinct: `Home.tsx`/`Wallet.tsx`'s sticky CTA uses `linear-gradient(to bottom, transparent, var(--background) 30%)` behind the fixed button instead of a 1px border. Formalizing this as a rule so a future pass doesn't "clean it up" into a hard divider.
- **Materialize sheets on open** — animate blur radius and scale together, so a sheet arrives as a real object, not a plain opacity fade.

#### Reduced motion — per-component, not a blanket statement

| Component | Full motion | `prefers-reduced-motion: reduce` |
| --- | --- | --- |
| Record trigger ambient glow | continuous pulse | static ring, "Recording" label carries the state instead |
| Coverage meter / CraftBar fill | animated fill | instant value, or a single short opacity fade |
| Bottom sheets | spring slide-up | opacity cross-fade only, no transform |
| Money count-up | animated count | value appears directly, no counting |
| Studio beat transitions | cross-fade | instant swap |
| Tab switch | cross-fade (already minimal) | unchanged — already reduced-motion-safe |

Also: no full-viewport moving backgrounds anywhere in the app, and the record trigger's glow must sit well below ~0.2Hz if it pulses at all — a slow, near-imperceptible breathing rate, not a visible strobe.

---

## 8. Light vs dark — the two-surface doctrine

### 8.1 The rule

**Dark is not a preference. It is a mode of operation.**

- **Studio (capture) = Carbon.** Recording only.
- **Ledger (everything else) = Bone.** Home, wallet, quests, profile, validator queue.

### 8.2 The defense (interview-ready)

The studio goes dark for four **functional** reasons — none aesthetic:

1. **Legibility in any lighting** — the script is the job. Low-glare dark ground + high-contrast Bone text survives outdoor sun and a dim room better than white-on-white.
2. **Attention** — a recording screen should have exactly two objects: the words and the trigger. Darkness deletes everything else.
3. **State signalling** — the shift from paper to studio *is* the "you are now recording" feedback, before any red dot.
4. **Battery** — a 25-minute room take on a budget OLED Android. Real constraint for the real user.

> **The line**: *"I didn't build a dark mode toggle. I made darkness mean something. In this app, dark says 'you're recording.' If the wallet could also be dark, it would stop saying anything."*

### 8.3 Why light mode won't be flat

The G3 light mode is mush because it has **no ink** — peach wash + light grey text + orange. Bone paper + near-black Carbon + Terracotta has enormous contrast without a single dark slab.

Reference: CRED's light surfaces are light *and* punchy because the ink is genuinely black and the type is genuinely large.

---

## 9. The economic system

> **This is the section a recruiter will interrogate. It must be airtight.**

### 9.1 The founding principle

> **Same work, same base pay. Always.**
> Tiers never change what a given clip is worth.

The moment a Gold contributor earns more than a Bronze contributor for an identical clip, the honesty thesis is dead. So tiers change **what work you can access** and **how fast you're paid** — never the rate for the same job.

### 9.2 What a contributor is paid — three published components

| Component | Set by | Visible when |
| --- | --- | --- |
| **Base rate** | Campaign — format difficulty × duration | Before you start |
| **Coverage multiplier** | Market scarcity of your profile | Before you start |
| **Quality bonus** | Published band, earned per clip on grade | Band shown before; award shown on grading |

```
₹45  base            Solo Scenario · 6 turns
×1.6 coverage        Marathi · Vidarbha · 6% covered
+₹10 quality bonus   graded 4.5+/5
─────────────────────
₹82  final
```

**Quality bonus rules** (this is what satisfies "quality deserves more pay" without becoming arbitrary):
- Band is **published upfront**, before recording. Never a surprise.
- It is a **bonus, never a deduction**. Base is guaranteed on acceptance.
- Tied to the validator's graded dimensions (audio quality, delivery, script fidelity) — not to tier, not to history.
- Same bonus available to a New contributor as to Elite. **Craft is paid; loyalty is not.**

### 9.3 What tiers change ① — access to better-paying work

*(Contributor's refinement — this is the primary tier benefit.)*

Higher tiers **qualify you for higher-value campaigns**. Not a multiplier on the same job — access to different jobs. Exactly how real labor markets work.

| Standing | Formats unlocked | Typical value |
| --- | --- | --- |
| **New** | LINES | ₹10–25 |
| **Verified** | + SCENARIO | ₹45–65 |
| **Trusted** | + INTERVIEW, ROOM | ₹65–220 |
| **Elite** | + rare-language & priority campaigns, validator eligibility | ₹150–220+, first access |

**Why gating is justified, not gatekeeping**: a failed 25-minute room take wastes four people's evening and a paid slot the lab is waiting on. The gate protects the *contributor* from an expensive failure as much as it protects the dataset.

⚠️ **Cold-start design problem**: a new contributor sees ₹220 they can't touch. That's either motivating or demoralising, and the difference is entirely in how it's rendered.
**Decision: show locked work, visibly, with an exact unlock path.**
> `ROOM · Family Dinner Table · ₹220` · 🔒 *Unlocks at 25 accepted clips — you have 8*

That aspiration **is** the retention engine that replaced the streak. A number you're climbing toward beats a flame you're protecting.

### 9.4 What tiers change ② — settlement speed (the platform's risk)

Trust is expensive to verify. A contributor with 200 accepted clips costs almost nothing to check; a brand-new one needs full human review. Expose that honestly:

| Standing | Review depth | When money lands |
| --- | --- | --- |
| New | 100% human-reviewed | On approval (~24–48h) |
| Verified | 30% sampled | On approval (~12h) |
| Trusted | 10% sampled | **On submit**, reversible 24h |
| Elite | 5% spot-check | **On submit**, final |

> **The line**: *"Tiers don't change what work is worth — that would contradict the product. They change how much it costs us to verify you. A trusted contributor is cheaper to check, so we pay them faster and carry the risk ourselves. That's not a reward, it's the actual economics, shown to the user."*

For someone earning ₹200/day, **faster money is worth more than any badge.**

### 9.5 ❌ Killed: the Security Reserve

✅ **Confirmed present in the build** (2026-08-23): `Wallet.tsx:208` renders "Security Reserve · ₹60.00 · Clears when you reach Silver", and `SilverTierReserveDrawer.tsx` blocks the withdraw button entirely until the tier lock is bypassed. Also wired into `DevPanel` and `DebugGallery`.

**Delete all of it.** It reads as fee-gouging and directly contradicts the honesty thesis. Risk-based settlement (§9.4) achieves the same protection without holding anyone's money.

**This deletion is a case-study beat**: *"I removed a mechanic I had designed myself, because it protected the platform by making the contributor distrust it."*

### 9.6 ❌ Killed: the 5-day streak → +15% payout surge

Two people doing identical work paid differently based on login behaviour. Indefensible on a platform whose thesis is honest pay. Also unrealistic — there may not *be* a matching quest every day.

**Replaced by demand-based surge:**
> `Tamil room audio +15% — Sarvam needs 400 more clips this week`

Real marketplace scarcity, doubles as honest supply information.

### 9.7 The three progression axes

One number cannot carry three meanings. Split them:

**① Standing — reliability**
`New → Verified → Trusted → Elite`
- Earned by: accepted volume × acceptance rate, over time
- **Decays slowly** — one bad day must not wreck it
- Unlocks: format access (§9.3), settlement speed (§9.4), concurrent assignments, validator eligibility

**② Craft — competence, per format × language**
- 0–100 score, e.g. `Hindi · Scenario · 84`
- Earned by: validator quality ratings per dimension
- You can be Trusted at LINES and New at ROOM. Reading clean lines and running a 4-person room take are different skills.
- Drives: quality bonus eligibility, format readiness

**③ Coverage value — market, not merit**
- Language, dialect, district, age band. You don't earn it, you *are* it.
- Drives: rate multiplier
- **Shown transparently before recording.** Never a hidden variable.

Only one of the three is a grind. **None reward logging in.**

### 9.8 The Mercor/Outlier defense

> *"Mercor interviews because they're buying expertise. We're buying coverage. An interview gate would filter out exactly the rural dialect speakers who are the entire reason the platform is valuable — urban, English-fluent users would pass; a 60-year-old Bhojpuri speaker wouldn't. So we assess **after** the work, not before it: machine-check everything, human-review the margin, and let payment speed carry the trust signal."*

Supporting evidence: generalist rates on those platforms fell ~35% from 2025→2026 while specialist rates held. Commodity work commoditizes — more reason to build around scarcity.

---

## 10. Trust design for a first-time earner

> **The persona**: 60-year-old Bhojpuri speaker in Chhapra. Low digital literacy. Has heard of app scams. Has never earned money from an app. May read slowly or not at all.
>
> Because we deliberately removed the interview gate (§9.8), **the trust setup must be flawless.** This section is the compensating design.

### 10.1 ⭐ The withdrawal floor rule

> ⚠️ **Revised 2026-08-23.** An earlier draft said "no minimum, ever." That is exploitable — 100 accounts × ₹25 is a money faucet. Corrected below; full business rules in `EXECUTION-PHASES.md` §Phase 0.

**The governing principle:**

> **The first-withdrawal floor must never exceed what one guided session can earn.**

A contributor who cannot reach the floor in their first sitting must return before ever seeing money leave the app — and that gap is exactly where trust dies. The floor itself isn't the problem; a floor *beyond reach on day one* is.

**Model**: standing floor **₹100**, and guided onboarding is designed to reach ₹100 in the first session (₹50 calibration + ₹50 first real task). Withdraw is **visible but disabled** below the floor, always showing the exact gap — *"₹50 more to withdraw"* — never hidden.

**Fraud controls** (all zero-friction, no ID upload):
1. One account per phone number — UPI is phone-bound anyway
2. ⭐ **UPI VPA name match** — the network returns the registered account-holder name; require it to match the profile. Kills "50 accounts → one UPI" at zero cost to honest users.
3. Welcome earnings conditional on clips **passing auto-check**, not on pressing record
4. Device fingerprint + rate limit on new-account welcome tasks
5. First payout carries a 24h fraud-review hold, shown as *"arriving by tomorrow"* — a delivery estimate, not a punishment

> **The line**: *"A balance you can't withdraw isn't proof that we pay — it's proof that we count. So the floor is set to what one honest first session earns, and the fraud controls sit on identity, not on the contributor's money."*

### 10.2 The trust sequence

> ⚠️ **Corrected 2026-08-27.** The original version of this table sequenced "paid calibration" *before* consent, on the theory that calibration wasn't "real" data collection yet. That distinction doesn't survive contact with DPDP: calibration audio is still a recording of someone's voice, still submitted, still paid — it *is* collection. Consent has to precede it, full stop. The fix below keeps the trust story intact (consent is still fast and still comes before the big financial ask) — it just closes the gap.

| Beat | What happens | Why |
| --- | --- | --- |
| 1 | **Show the market, not a claim** — "Sarvam AI needs 4,200 hrs of Marathi. 62% collected." | A claim ("earn money!") is what every scam says. Live demand is checkable. |
| 2 | **Auth** — one tap, Google/phone | No form, no documents |
| 3 | **Consent** — minimal, native language, one screen, **before any recording happens** | Informed consent has to precede collection, not follow it — no exception for a "calibration" recording |
| 4 | **Paid calibration** — 2 min, ₹25, machine-verified, **credited instantly** | Money lands before anything else is asked of them |
| 5 | **First withdrawal offered immediately, no minimum** | The actual proof (§10.1) |
| 6 | Home | |

**Consent at beat 3, before the mic is ever used. Money at beat 4. Withdrawal at beat 5.** The sequence still front-loads trust over admin — consent is one fast native-language screen, not a KYC form — it just no longer lets a recording happen before the contributor has agreed to it.

### 10.3 What we never ask before the first payment

- ❌ KYC documents
- ❌ Bank account number
- ❌ ID proof
- ❌ Profile photo, bio, language self-assessment
- ❌ Any form longer than one field

**Only language selection and the one-screen native-language consent are asked before the first recording and payment.** Everything else comes after money has landed. Consent is not KYC and does not carry KYC's friction — it's a single fast screen — but it is non-negotiable and it comes first, not "before the *real* submission" (see the correction in §10.2).

### 10.3a Age & audience policy

- **18+ only**, self-declared at signup
- Enforced at withdrawal via **UPI VPA name match** — the receiving account belongs to a named adult
- ❌ **No ID upload.** Not legally required here, and it would destroy the funnel for exactly the rural users the platform needs
- **DPDP**: under-18 requires verifiable parental consent — operationally heavy. Declared **out of scope**, stated in the case study as a scope decision, not an oversight
- ⚠️ **ROOM edge case**: a family dinner take can easily include a minor. The consent roll-call **must ask** whether anyone present is under 18; if yes → exclude that speaker or capture guardian consent on tape

**Target contributor**: 18–55 · smartphone owner (often 360px budget Android) · has UPI · native speaker of a target language.
**Literacy is not assumed** — hence audio playback of every script and instruction (§10.4).

### 10.4 Low-literacy accommodations

- **Audio instructions available on every recording screen** — a speaker icon that reads the brief aloud in the contributor's language. For a voice app, this is thematically perfect and genuinely necessary.
- **Consent readable *and* listenable** in native language.
- **Icons always paired with text labels** — never icon-only navigation.
- **Amounts always in numerals** (₹82), never spelled out.
- Rejection reasons written at a **plain-language reading level**, in native script, with an example.

### 10.5 Honest social proof

Not testimonials. Real, local, checkable numbers:

> `12 contributors in Chhapra were paid ₹4,280 this month`

District-local proof is far more persuasive than a 5-star review, and it's derived from real platform data rather than marketing.

### 10.6 Payment rail

**UPI only.** Familiar, instant, no new account, no card. The contributor already trusts UPI — the app borrows that trust rather than asking for new trust.

---

## 11. Roles

**Scope: two personas.** Contributor and Validator.

**Quest Creator is out of mobile scope** — enterprises buying datasets don't do it on a phone. State this as a scope decision in the case study; do not silently delete it. Optionally show one desktop frame as evidence it was considered.

### 11.1 Contributor

Covered by §9. Primary surfaces: Home, Quests/Campaigns, Studio, Wallet, Profile.

### 11.2 Validator

Currently the thinnest role. Full design:

**How you become one — you don't apply, you qualify.**
- Eligibility is **automatic** at high acceptance rate in a language you actually contribute in
- Then a **calibration set**: grade 20 clips that already have consensus answers
- Your agreement with that gold set is your starting accuracy
- No form, no essay, no interview

**How quality stays honest — gold-standard injection.**
- 5–10% of every validator's queue is **secretly pre-graded**
- Agreement rate tracked continuously
- Rubber-stamp everything → agreement collapses within a day → queue closes
- Invisible to the user by design. Great case-study detail precisely because it's invisible.

**Consensus and disagreement.**
- Every clip graded by **2 validators**
- Disagreement escalates to a **3rd**, or to a senior validator on tight calls
- Contributor sees an **honest state**: *"Under extended review — two reviewers disagreed"*
- ⭐ This screen is worth building. It's the honest version of a loading state.

**Conflict of interest — backend rules, surfaced once.**

*(Per contributor's note: this is algorithmic assignment logic, not a UI feature. Surface it once at role grant as a short "rules of the role" screen, then never again.)*

A validator is never assigned:
1. Their own clips
2. Clips from a campaign they are **actively contributing to** — they'd be grading competitors for scarce slots
3. Clips from anyone in their referral tree

**Validator pay.**
- Per clip graded
- **Held until agreement is confirmed** against consensus
- Lower per-minute than contributing, but steadier and always available
- The honest trade: contributors chase upside, validators get reliability. Someone whose contributor queue is empty can always grade.

**⭐ The loop that closes the system**: the validator's rejection tag **is** Repair Studio's reason. One shared taxonomy, both directions. Currently Repair Studio's reason appears from nowhere — wiring it to the validator makes the whole system click.

**Shared rejection taxonomy** (used by validator grading UI, Repair Studio, and Home activity):
- Background noise above threshold
- Microphone clipping / distortion
- Wrong language or dialect
- Script deviation
- Speaker overlap (where not permitted)
- Duration below minimum
- Suspected synthetic/TTS audio
- Consent missing (room formats)

---

## 12. Screen-by-screen scope

### 12.1 Priority order

The three **system-defining** screens. If these are right, everything else follows mechanically. **Do not prompt Figma Make for anything else until these are locked.**

1. **Home** — light, market + money
2. **Studio (capture)** — dark, script + trigger
3. **Wallet** — light, ledger

Then: Onboarding · Campaign detail/brief · Review & submit · Repair Studio · Validator queue · Validator grading · Profile · Consent · Payout.

### 12.2 Home

**Layout pattern (contributor's reference — validated):** atmospheric gradient header → primary object *overlapping* the boundary → calm content flowing below.

Why it works: it establishes depth **once**, at the top, then the rest of the page is quiet. The G1/G3 failure was dark slabs appearing randomly mid-scroll with no rationale.

**Refinements to the pattern:**
- Gradient is **Terracotta → Bone**, not blue
- The overlapping object is the **money board** (`--r-lg`, the only one on the screen)
- ⭐ The atmospheric zone carries **market state** — what the market needs right now — **not a greeting.** "Good morning, Alex" is not information. "Sarvam needs 400 Tamil clips" is.

**Three data states on one chrome** (keep this from G3 — it was correct):
- `empty` — signed in, nothing submitted
- `pending` — submitted, not yet credited
- `live` — has credited money

The dashboard is **never** replaced by a tutorial or a receipt.

**Content order:**
1. Market/coverage state (atmospheric zone)
2. Money board (overlapping, `--r-lg`)
3. Primary CTA — names the job and the pay
4. Active campaigns — including **visibly locked** higher tiers
5. Recent activity

### 12.3 Studio (capture) — dark

Reference: the "Session paused" screen aesthetic — glowing focal control, huge tabular timer, everything else deleted.

**Non-negotiable: the script is the most readable text in the entire app.**
- 20–28px, native script, `≥10:1` contrast
- Devanagari/Tamil line-height per §6.3
- Audio-playback of the brief available (§10.4)

**Three beats** (keep from existing build — the model is right):
1. **Brief** — context, role, scenario setup, format rules, pay breakdown
2. **Capture** — dimmed HUD, script hero, single luminous trigger, ≥72px, thumb-zone
3. **Review** — playback, per-clip retake, submit

**The trigger** is the only element in the app with a continuous ambient animation and the only user of `--e-glow-terracotta`.

**Also on capture**: live input level, noise-floor warning, clip counter (segmented pill, `[❚❚❚❚░░░░] 4/8`), pause, cancel.

### 12.4 Wallet — light ledger

- Big tabular balance, de-emphasized decimals (`₹127`**`.50`**)
- **Available vs Pending** clearly separated — pending shows *what it's waiting on* ("2 clips under extended review")
- ❌ Security Reserve — **removed** (§9.5)
- Transaction rows: quest, date, amount, state (Verdigris settled / Ochre pending / Rust failed)
- UPI destination, editable
- Withdraw — **no minimum on first withdrawal** (§10.1)
- Quality bonuses shown as separate line items so craft is visibly paid

### 12.5 Profile

Rebuild around the three axes (§9.7):
- **Standing** + exact path to next
- **Craft** per format × language — a skill sheet, not a level bar
- **Coverage value** — your rarity, honestly stated
- Voiceprint identity mark (§14)
- Data Vault & consent management (keep, redesign)
- Validator role entry (if eligible)

❌ Remove: XP number, "XP Rewards Hub" naming, emoji achievements, streak-based unlocks.

### 12.6 Rewards

⚠️ **Currently 100% un-migrated** — still `userXP`, `xpCost`, "Level 5+", "XP Rewards Hub". Must be rebuilt on the new system or removed from scope.

Recommendation: **fold into Profile.** A separate voucher storefront competes with the wallet and re-introduces exactly the "spend points" framing the product is moving away from. Milestone recognition belongs on Profile; money belongs in Wallet.

---

## 13. Edge case matrix

⭐ = build and show in the case study. These are where the product proves it was designed, not decorated.

### 13.1 Contributor

| Case | Design answer | |
| --- | --- | --- |
| **Room-take consent** — 3 non-users recorded | **On-tape consent roll-call** before recording: each person states their name and consents, or scans a QR. Under DPDP each is a data principal. | ⭐⭐ |
| **Coverage full** | *"This campaign already has enough male Hindi speakers, 25–34, in Delhi NCR."* Honest flip side of rarity pricing. | ⭐⭐ |
| **Campaign closes mid-session** | **Submissions in flight are honored and paid.** Make the promise visible. | ⭐⭐ |
| **Interrupted room take** — call at min 19 of 25 | Local persistence + resume. Highest-stakes failure in the app (₹220 + four people's evening). | ⭐ |
| **Consent revoked after payment** | Data deleted. **Money not clawed back.** | ⭐ |
| **Suspected TTS/synthetic submission** | Verification hold, explained, appealable. Promote existing `SpoofingVerificationHold`. | ⭐ |
| Upload failed / offline | Local queue: *"3 clips saved — waiting for network."* Trust moment. | ⭐ |
| Partial rejection | Repair Studio — keep, redesign, wire reason to validator taxonomy. | ⭐ |
| Mic permission denied | Explain why it's needed, path to settings | |
| Noise floor too high mid-record | Pause + guidance, don't discard | |
| Wrong language detected | Flag before submit, offer correct campaign | |
| Daily limit reached | Explain the limit's purpose (quality, not restriction) | |
| Duplicate submission | Reject with reason; flag repeat offenders | |
| UPI transfer failed | Retry + edit VPA, money stays available | |
| Below withdrawal minimum | N/A for first withdrawal (§10.1); thereafter explain and show gap | |
| Minor / guardian consent | Block, explain, no data retained | |
| Battery low during long take | Warn before start if <20% on a ROOM format | |

### 13.2 Validator

| Case | Design answer |
| --- | --- |
| Two validators disagree | Escalate to 3rd; contributor sees *"under extended review — reviewers disagreed"* ⭐ |
| Gold-standard agreement drops | Private warning → queue throttle → suspension |
| Queue empty | Offer contributor work instead — the roles cross-subsidize |
| Corrupted / unplayable clip | Skip without accuracy penalty |
| Offered a language they don't speak | Assignment rule prevents it; manual flag available |
| Suspected collusion | Backend detection; assignment blocks (§11.2) |

### 13.3 Marketplace

| Case | Design answer |
| --- | --- |
| Empty catalogue | Name the supply gap honestly, offer notification. **Keep the existing honest version.** |
| Campaign oversubscribed while browsing | Real-time slot count; graceful "filled" state |
| All campaigns locked by tier | Always guarantee at least one LINES campaign available at every tier |

---

## 14. Achievements & identity visual system

❌ **Kill the emoji badges.** Single most generic thing left in the build.

### 14.1 ⭐ The voiceprint (primary)

Each contributor accumulates a **unique generative mark derived from their own submitted audio** — spectrogram-derived, rendered flat in Terracotta + Carbon. It **densifies as they contribute.**

- It's their identity object on Profile
- It's literally made of their own work
- It is **impossible to call templated** — no two are alike
- It replaces both the avatar-initial circle and the achievement grid

### 14.2 Coverage maps (secondary)

Since coverage *is* the product, milestones render as **filling district/language maps**, not trophies.

> `You're 1 of 12 contributors from Chhapra`

That's a better flex than a crown icon, and it reinforces the core reframe.

### 14.3 Tier naming — resist the theme

Keep plain, comprehensible names: **New / Verified / Trusted / Elite.**

Ceramic-firing names (Greenware → Bisque → Glazed → Vitrified) are cute and obscure — contributors won't understand their own standing. **Let the visual carry the metaphor, not the label.**

That split is itself a discipline point worth stating in the case study.

---

## 15. Reference library

### 15.1 ⭐ The category most designers miss — Indian gig-worker apps

**Study these hardest.** This is the actual user, actual payment psychology, actual device tier. Almost every designer studies consumer-side apps, which is why gig-work design is uniformly bad.

- **Swiggy / Zomato delivery partner apps**
- **Rapido Captain**
- **Uber Driver**
- **Amazon Flex**, Instacart Shopper

Look specifically at: earnings display, pending payouts, tier benefits, daily targets, and how they explain deductions.

### 15.2 Money / ledger

CRED (restraint + typography) · Jupiter · Fi · Slice · Monzo · Revolut · **Wise** (best pending-vs-settled clarity anywhere) · Robinhood (big-number hierarchy)

### 15.3 Recording studio

Ableton Note · AudioPen · Descript mobile · Voice Memos · BIGVU and teleprompter apps (large readable script + capture) · Smule (read-and-perform) · Headspace / Calm session screens (single-purpose dark focus)

### 15.4 Quality feedback

Duolingo's **feedback** design (ignore streaks — the "here's what was wrong" is excellent) · Grammarly

### 15.5 Marketplace / work matching

Upwork · Fiverr

### 15.6 How to pull references

> **Grab states, not screens.** Pending, empty, rejected, disagreement, locked. That's where this app is weak and where nobody posts screenshots.

---

## 16. Case study narrative

### 16.1 The asset most freshers don't have

**Three visual generations of the same product, each with written reasoning for why it was abandoned.** Most portfolios show one artifact and *claim* iteration. This shows the actual product-development cycle.

`G1 Gamified → G2 Clay → G3 Sterile → G4 [current rework]`

### 16.2 The strongest beats

Ranked by how well they survive an interview:

1. **The coverage reframe** — "labs don't buy hours, they buy coverage." Research-backed, changes everything downstream.
2. **Removing my own Security Reserve** — "I deleted a mechanic I designed, because it protected the platform by making the contributor distrust it."
3. **Killing the streak surge** — "It paid people for showing up instead of for working. Demand-based surge is how real marketplaces price scarcity."
4. **No minimum on first withdrawal** — "A balance you can't withdraw isn't proof that we pay. It's proof that we count."
5. **No interview gate** — "An interview would filter out the rural dialect speakers who are the entire reason the platform is valuable."
6. **Tiers change risk and access, not rate** — the economics, honestly exposed.
7. **Room-take consent roll-call** — nobody else has this screen.
8. **Dark means recording** — "I didn't build a dark mode. I made darkness mean something."
9. **Consent in native language** — "You cannot obtain informed consent in a language someone doesn't read."

### 16.3 The positioning line

> The generic version of this product is a **gig work app**.
> The specific version is **the labor market underneath Indian AI** — real labs, real scripts, real consent law, real fraud.
>
> The second one is a portfolio piece.

### 16.4 Case study maintenance debt

⚠️ The current case study at `D:\Portfolio\app\projects\feul\page.tsx` describes flows that no longer exist:
- `/first-earning` — now hard-redirects to `/contributor`
- The "First-Session Trust Loop" prose describes a screen that was collapsed away
- The deployed embed at `public/embed/feul/` is a **4 Aug** build; source has moved well past it

All of this must be rewritten after the redesign. Run `node scripts/sync-embeds.mjs feul` from `D:\Portfolio` when the rebuild is ready.

---

## 17. Open decisions

| # | Decision | Options | Status |
| --- | --- | --- | --- |
| 1 | **Name** | KILN ⭐ / Ember / Timbre / other | ⬜ open |
| 2 | **Second color** | Verdigris ⭐ / alternatives | ⬜ open |
| 3 | **Typeface** | Anek ⭐ / Anek + separate display face / Kohinoor | ⬜ open |
| 4 | **Progression model** | Three-axis + access-gating + risk-settlement | ⬜ needs stress-test |
| 5 | Rewards screen | Fold into Profile ⭐ / rebuild / cut | ⬜ open |
| 6 | ROOM channel problem | Accept single-channel / design multi-device capture | ⬜ open |
| 7 | Quality bonus band | Exact values and grading dimensions | ⬜ open |

### Resolved

- ✅ Kill 5-day streak surge → demand-based surge
- ✅ Kill Security Reserve → risk-based settlement
- ✅ Tiers gate **access** to higher-paying work (primary benefit) + settlement speed (secondary)
- ✅ Quality bonus exists, published upfront, bonus-only, tier-independent
- ✅ No interview/vetting gate — assess after work, not before
- ✅ Quest Creator out of mobile scope
- ✅ Validator conflict-of-interest = backend rule, surfaced once at role grant
- ✅ Two personas only: Contributor, Validator
- ✅ Two-surface doctrine: dark = studio only
- ✅ UI English / content native / **consent native (mandatory)**
- ✅ Design at 360 first
- ✅ Body base 16px, not 14px
- ✅ First withdrawal has no minimum

---

## 18. Execution sequence

> **Do not prompt Figma Make for screens until §18.1 is locked.** Figma Make tokens are limited; generating cards before the campaign data model is decided means paying twice. `Sarvam AI · Indic Conversational Corpus · ₹220 · locked` is a completely different card anatomy from `Hindi — Everyday Phrases · ₹12`.

### 18.1 Foundation (lock first)

1. Name
2. Color tokens — full ramps
3. Typeface + type scale + Indic line-height tokens
4. Spacing / radius / elevation tokens
5. Campaign data model — client, format, coverage, tier gate, pay breakdown

### 18.2 System-defining screens (three only)

6. Home
7. Studio capture
8. Wallet

**Review these three before generating anything else.** If they're right, the rest is mechanical.

### 18.3 Everything else

9. Onboarding (4 beats)
10. Campaign brief + review/submit
11. Repair Studio
12. Validator queue + grading + disagreement
13. Profile + voiceprint
14. Consent (incl. room roll-call)
15. Payout
16. Edge case screens from §13 (⭐ items first)

### 18.4 Integration

17. Rebuild + `node scripts/sync-embeds.mjs feul`
18. Rewrite case study copy against the new system
19. Add the G1→G4 iteration section with real screenshots

### 18.5 Working style

Per `CLAUDE.md`: **one section/component at a time, reviewed live in-browser before moving on.** A past full-speed build-ahead pass was judged "lifeless, 0 pixel perfection." Checkpoint often.

---

## Appendix A — Assets

| Asset | Location |
| --- | --- |
| G1 screenshots (Apr 2026) | `D:\Downloads\new feul\` (59 PNGs) |
| G3 source | `D:\portfolio porjects\feul final build\Feulmobile-main\` |
| Deployed embed (stale, 4 Aug) | `D:\Portfolio\public\embed\feul\` |
| Case study page | `D:\Portfolio\app\projects\feul\page.tsx` |
| Sync script | `D:\Portfolio\scripts\sync-embeds.mjs` |
| Dev server | `npm run dev` → `localhost:5183` |

## Appendix B — Superseded documents

Keep for case-study history. Do not build from them.

- `plans/great-understandingof-the-situation-witty-castle.md` — Passes 0–5 execution plan
- `plans/clay-visual-upgrade.md` — G2 clay direction
- `src/imports/VISUAL-CRAFT-BRIEF.md` — G3 craft brief
- `src/imports/pasted_text/feul-ai-upgrade-plan.md` — gamification→trust migration (partially applied; superseded by §9)
- `src/imports/pasted_text/home-pass-3-amend.md` — Home three-state correction (**still valid**, folded into §12.2)

## Appendix D — Design foundations scorecard

> Added 2026-08-23, from an audit against Apple's eight stated design principles (*Principles of Great Design*, WWDC 2026: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight). Kept as a living artifact — genuinely useful for the case study as evidence of self-critique against an external standard, not just internal taste.

| Foundation | Status | Evidence / gap |
| --- | --- | --- |
| **Purpose** | ✅ Strong | Coverage reframe (§2); Quest Creator explicitly cut from mobile scope, not silently dropped (§11) |
| **Responsibility** | ✅ Strong | DPDP consent + native-language requirement (§6.5, §13); spoof/TTS hold; age policy via UPI name-match, no ID upload (§10.3a) |
| **Familiarity** | ✅ Mostly | UPI as the trusted rail (§10.6); padlock metaphor + exact unlock condition for gated tiers (§9.3) |
| **Simplicity** | ✅ Strong | One `--r-lg` hero object per screen (§7.2); one shared rejection taxonomy across validator, Repair Studio, and Home activity (§11.2) |
| **Agency** | ⚠️ Resolved below | No forgiveness/undo pattern existed. Fixed — see "Agency fixes" |
| **Flexibility** | ⚠️ Resolved below | No personalization, no stated animation budget for the actual target device. Fixed — see "Flexibility fixes" |
| **Craft** | ⚠️ Was the gap | Motion/materials/typography-optical layer — now §7.4 and §6.2 |
| **Delight** | ⚠️ Resolved below | Celebration moments existed (Phase 10.1) but no named emotion. Fixed — see "Delight fix" |

### Agency fixes

- **Cancel before review.** A submitted clip can be pulled back **for a short window** (e.g. 10 minutes) before it enters the validator queue — mirrors email "undo send." After that window, it's committed; the boundary is stated on the review screen, not hidden.
- **Edit UPI without support.** Changing the linked VPA is a self-service flow in Wallet, gated only by a fresh name-match check (§Phase 0) — not a ticket.
- **Confirmation dialogs stay rare.** Reserved for genuinely irreversible actions only — consent revocation (data deletion) and account deletion. Submitting a clip, withdrawing funds, and switching roles do **not** get a confirmation dialog; they get an undo window instead. Overusing confirmations trains people to click through them blind.

### Flexibility fixes

- **Personalization**: a contributor can pin preferred languages and formats in Profile; Home and Quests both respect it as a soft filter (never a hard hide — coverage-critical campaigns outside a preference still surface, clearly marked).
- **Animation performance budget**, stated for the real device (§10.3a: often a budget Android around 360px): animate only `transform` and `opacity` (compositor-friendly); no more than one continuously-animating element on screen at once (the record trigger, when active); sheets and springs must stay smooth on a mid-tier device, not just the design machine.

### Delight fix — the named emotion

> **Every motion, copy, and celebration choice in this app is reinforcing one feeling: quiet competence.**
> Not excitement, not gamified hype — the feeling of a person who did a job well and can see exactly what it earned them.

This is why celebration moments (Phase 10.1) are restrained — no confetti, no trophies, the number and one line of truth. It's a directable standard: any new motion or copy can be checked against it rather than judged on vibes.

## Appendix E — Interaction inventory

Cross-reference for Phase 1–2 implementation. Every gesture-driven component in the screen inventory (Appendix, `EXECUTION-PHASES.md`) mapped to its physics spec in §7.4.

| Component | Spec |
| --- | --- |
| `Sheet` (Consent, RoomConsentRollCall, FilterSheet, WithdrawConfirm) | Drag 1:1, damping 0.8 / response 0.3, rubber-band past bounds, translucent blurred scrim |
| `RecordTrigger` | Feedback on pointer-down; ambient glow only while active; real input-driven level meter, not decorative |
| `CoverageMeter` / `CraftBar` / `ProgressRing` | Damping 1.0 / response 0.4, animates from current value on refresh |
| `Amount` (count-up on credit) | Damping 1.0 / response 0.4, restarts from live value if interrupted by a second credit |
| `TierGate` (locked campaign card) | Small bounce refusal on tap, damping 0.8 / response 0.2 |
| `TabBar` | Cross-fade, 120ms, no slide |
| Studio beat transitions | Cross-fade + persistent context bar, 180ms |
| Bottom tab bar (chrome) | Translucent material, content scrolls beneath |

## Appendix C — Known technical debt

- `color-scheme: light` added to `:root` in `theme.css` — prevents browser forced-dark from repainting the app. **Keep.**
- `Rewards.tsx` — 100% un-migrated XP system (§12.6)
- `Profile.tsx` — streak-based achievements still present ("Week Warrior — 7 days in a row")
- Reputation `1,530` is labelled both "Reputation" (Profile) and "XP" (Rewards link) — two currencies, one number
- `RejectedTask.tsx:214` — copy still references "streak or level"
- `/first-earning`, `/data-consent`, `/voice-calibration` are redirect stubs the case study still describes as live screens
