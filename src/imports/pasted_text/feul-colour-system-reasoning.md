# Feul — Colour System & Design Decision Reasoning
## Case Study Documentation

---

## 1. Overview: What This Document Is

This document captures the full rationale behind every colour and design decision made across the Feul mobile application. It is intended for case study use — explaining not just what was built, but *why*, and being honest about where the system has internal contradictions that need to be resolved.

Feul is a premium AI data marketplace with three distinct user types: **Contributors** (who record audio), **Validators** (who grade audio quality), and **Quest Creators** (B2B buyers who commission datasets). The design challenge was to build a single product that felt coherent system-wide while giving each role a distinct enough identity that a user never questions which part of the product they're in.

---

## 2. The Foundation: Why a Design Language Audit Was Needed

The original Feul interface had a single-accent system — everything used terracotta (`#C4622D`) as the sole expressive colour across all three roles. While this created surface-level consistency, it created a serious UX problem: **it made all three roles feel identical**. A Validator grading audio clips and a Contributor recording them were looking at the same visual language, which undermined the product's core proposition that these are meaningfully different roles with different responsibilities, different earnings models, and different power levels within the platform.

The redesign was driven by a single guiding principle: **colour should communicate role identity, not just brand identity.**

---

## 3. The Global Design System (Role-Agnostic)

Before the per-role decisions, the following apply across the entire product regardless of role:

### 3.1 Background: `#F8F9FA` (Cool Off-White)

A near-white with a very slight cool cast. This was chosen over pure white (`#FFFFFF`) because pure white on mobile reads as either clinical or unfinished. The cool off-white creates a sense of depth — white cards sit on top of it and feel elevated without requiring heavy shadows. It also prevents eye fatigue on screens that users will spend extended time on (recording sessions, grading sessions).

### 3.2 Text: `#1C2434` (Deep Charcoal-Slate)

Not pure black. Pure black (`#000000`) on light backgrounds creates too much contrast tension — it's visually loud in a way that competes with expressive accent colours. The deep charcoal-slate sits at approximately 85% perceived darkness, which maintains excellent legibility while allowing accents to breathe. The slight blue undertone in the charcoal harmonises with the cool off-white background.

### 3.3 Secondary Text: `#4A5568` / Muted: `#8896A7`

A three-tier text hierarchy:
- `#1C2434` — primary: names, numbers, headings
- `#4A5568` — secondary: descriptions, body copy
- `#8896A7` — muted: timestamps, metadata, captions

This three-tier system creates scannable information density without requiring font size variation for every level of information.

### 3.4 Deep Ink-Navy: `#1A1F2E` (Hero Surfaces)

The navy was introduced as a second expressive surface colour. Its role is specific and non-negotiable: **navy signals value and status.** It appears on:
- The Contributor's cash balance card (your money is serious)
- The Role Selection screen background (the moment of choosing your role is serious)
- XP/level blocks across all roles (your standing in the system is serious)

Navy is never used decoratively or for secondary information. Its sparingness is what gives it power.

### 3.5 Terracotta: `#C4622D` / `#E06C3A` (Energy and Action)

The primary brand accent. Terracotta was chosen because it sits between orange (energy, warmth, action) and brown (craft, earthiness, authenticity) — which maps perfectly to the product's proposition of turning voice (something human and organic) into economic value. It is energetic without being aggressive, warm without being soft.

The two values serve distinct purposes:
- `#C4622D` — primary: buttons, CTAs, filled interactive elements
- `#E06C3A` — lighter variant: hover states, glow effects, high-energy moments

**Critically:** in the original design spec, terracotta was intended as the Contributor role accent. In implementation, it was incorrectly applied globally across all three roles' navigation bars, which is one of the key consistency problems documented later in this file.

### 3.6 Warm Cream: `#FAF6F0` (Soft Screens)

Used exclusively for screens that benefit from warmth and softness: the onboarding flow. The cream creates a sense of welcome before the user commits to a role. It reads as a warm blank canvas — appropriate for a moment of introduction.

### 3.7 Typography: Plus Jakarta Sans (All Weights, All Sizes)

A single typeface family across the entire product. The decision to use one typeface was intentional: the hierarchy comes from weight and size, not from switching between serif and sans-serif. Plus Jakarta Sans was chosen because it has strong weight differentiation (400 through 800 are all visually distinct), geometric clarity in its letterforms, and a slightly contemporary feel that sits between corporate and consumer.

The three-tier type scale:
- **Level 1 (Hero):** 32–52px, weight 700–800, tracking -0.02em. One per screen. This owns the screen.
- **Level 2 (Section Anchors):** 15–17px, weight 600–700. Divides the screen into scannable zones.
- **Level 3 (Body/Labels):** 12–14px, weight 400–500. Everything else.

### 3.8 Shape Language: Aggressive Pill CTAs

All primary CTAs are `border-radius: 999px` (fully pill-shaped), minimum 56px tall. This was an intentional departure from the softer rounded-rectangle buttons common in most iOS-style apps. The pill shape reads as decisive and modern. The 56px height creates a confident tap target that communicates importance through scale alone.

---

## 4. The Three-Role Colour System

The core design decision was to give each role a distinct colour identity derived from the *metaphor* of their work.

### 4.1 Contributor Identity: Warm Terracotta/Peach/Amber

**Primary Accent:** `#C4622D` (terracotta)  
**Hero Surface:** `#1A1F2E` (shared navy — value signal)  
**Background:** `#F8F9FA` (cool off-white — the shared base)  
**Waveform Variant:** `audio` — organic sine pattern  
**Waveform Colour Range:** warm peach, amber, terracotta

**Reasoning:**

Contributors are the human layer of the product. They speak, they share voice, they create something organic and personal. The terracotta palette was chosen because it evokes warmth (voice, human presence), energy (recording is active and effortful), and the slightly raw, organic quality of audio waveforms. It also evokes the Indian market context — terracotta and peach have strong cultural resonance in South Asian design aesthetics.

The `audio` waveform variant uses an organic sine-wave pattern because it most closely mimics what actual audio visualisers look like. When a Contributor sees the waveform on their screen, it should feel like it could be their voice.

### 4.2 Validator Identity: Forest Teal/Mint/Emerald

**Primary Accent:** `#2D7A4F` (forest green)  
**Bright Accent:** `#4EC992` (mint/emerald — for hero surfaces against dark)  
**Hero Surface:** `#0E2318` (deep forest, not the shared navy)  
**Background:** `#F0F5F2` (cool green-tinted off-white)  
**Waveform Variant:** `precision` — uniform, measured bars  
**Waveform Colour Range:** mint, emerald, jade

**Reasoning:**

Validators perform quality control. Their work is about accuracy, consistency, precision, and judgment. Green was chosen because it carries universal connotations of correctness, approval, and quality verification (think: green checkmarks, quality certifications, "go" signals). It also creates clear visual separation from the Contributor's warm palette — stepping into the Validator flow should feel like stepping into a different professional context.

The `precision` waveform variant uses uniform, even bars rather than the organic sine of the Contributor's audio waveform. This visually communicates the nature of the work: measured, controlled, systematic. The Validator isn't creating something emotional — they're assessing something technical.

The background shifts to `#F0F5F2` — still a near-white, but with a perceptible cool green cast. This means even without looking at buttons or CTAs, a user in the Validator flow feels the system is in a different mode.

The hero surface uses `#0E2318` — a very dark forest green rather than the shared `#1A1F2E` navy. This was chosen deliberately to make the Validator's hero card feel role-specific, not generic. The navy is reserved for shared platform moments (role selection, XP/level status); the deep forest green marks the Validator's unique zone of authority.

### 4.3 Quest Creator Identity: Midnight Indigo/Lavender/Periwinkle

**Primary Accent:** `#6B63D4` (indigo/periwinkle)  
**Bright Accent:** `#8B7FE8` (lavender — for hero surfaces against dark)  
**Hero Surface:** `#0E1130` (midnight indigo)  
**Background:** `#F4F5FA` (cool indigo-tinted off-white)  
**Waveform Variant:** `data` — spiky, asymmetric chart-like bars  
**Waveform Colour Range:** lavender, periwinkle, soft indigo

**Reasoning:**

Quest Creators are the B2B layer of the product — companies, researchers, and AI teams who commission datasets. Their interface is a command centre, not a recording studio or a grading bench. Indigo/purple was chosen because it carries strong associations with analytics, intelligence, data dashboards, and enterprise software (Figma, Linear, Notion, Stripe — all use purple/indigo as a signal of serious tooling).

Critically, indigo sits on the *cool* end of the spectrum, which creates maximum contrast with the Contributor's warm terracotta. The distance between orange-terracotta and cool-indigo on the colour wheel is nearly opposite — making role misidentification visually impossible.

The `data` waveform variant uses spiky, asymmetric peaks that read more like a financial chart or data visualisation than an audio waveform. This is intentional: the Quest Creator isn't looking at audio, they're looking at data. Even the signature visual element shifts in meaning based on who's looking at it.

The background shifts to `#F4F5FA` — a barely-there indigo cast on white. Combined with the indigo accents throughout, the Quest Creator app feels like an analytics product built on top of the Feul platform, which is exactly what it should feel like to a business user.

---

## 5. The Waveform as a Multi-Role Signature

The waveform is Feul's signature visual element. The decision to give it three shapes was one of the more ambitious design choices:

| Variant | Shape | Used For | Metaphor |
|---|---|---|---|
| `audio` | Organic sine curve | Contributor | Voice, human, organic |
| `precision` | Uniform measured bars | Validator | Consistency, quality control |
| `data` | Spiky asymmetric peaks | Quest Creator | Analytics, data, chart-like |

Same visual element, three distinct readings. This allows the waveform to remain a coherent brand element while communicating role context at a glance.

---

## 6. The Role Selection Screen: The Current Mismatch Problem

This is the most important inconsistency to flag in this document.

The Role Selection screen (`RoleSelection.tsx`) currently uses the following border-accent colours for the three role cards:

- **Contributor:** `#C4622D` (terracotta) ✓ Correct
- **Validator:** `#4B6FAE` (slate-blue) ✗ **Wrong — should be `#2D7A4F` (forest teal)**
- **Quest Creator:** `#7A6B2D` (golden-olive) ✗ **Wrong — should be `#6B63D4` (indigo)**

**Why this happened:** The role selection screen was designed in an earlier iteration, where the Validator was imagined as blue/slate and the Quest Creator as golden/amber. Both identities were subsequently changed — Validator became forest-teal (to better represent quality/accuracy), Quest Creator became indigo (to represent analytics/enterprise) — but the Role Selection screen was not updated to match.

**The user-facing problem:** A user taps "Validator" and sees a slate-blue accent on the selection screen, then arrives at a forest-teal environment. A user taps "Quest Creator" and sees golden-olive, then arrives at deep indigo. The selection screen is supposed to be the first moment a user connects colour to role identity. If those colours don't match what they find on the other side, the colour system fails its core job.

**The fix required:** Update `RoleSelection.tsx` role border colours to:
- Contributor: `#C4622D`
- Validator: `#2D7A4F`
- Quest Creator: `#6B63D4`

---

## 7. The Navigation Bar Inconsistency: All Roles Use Orange

Currently all three role apps (`MainApp.tsx`, `ValidatorApp.tsx`, `QuestCreatorApp.tsx`) use `#E06C3A` (terracotta/orange) as the active state colour in their bottom navigation bars.

**The problem:** The Validator and Quest Creator both have established role identities with their own accent colours. Seeing an orange nav indicator when everything else in the Validator flow is teal, or everything in the Quest Creator flow is indigo, creates a jarring visual inconsistency. The navigation bar is present on every screen — it's the most persistent surface in the entire app. If it uses the wrong colour, the role identity effectively doesn't exist on most of the screen real estate.

**What should happen:**
- Contributor nav active state: `#C4622D` (terracotta)
- Validator nav active state: `#2D7A4F` (forest teal)
- Quest Creator nav active state: `#6B63D4` (indigo)

---

## 8. The Onboarding Waveform Colour Problem

The Onboarding screen (`Onboarding.tsx`) cycles through three waveform colours across its three slides:
1. Slide 1: `#C4622D` (terracotta) — maps to Contributor
2. Slide 2: `#4B6FAE` (slate-blue) — **no role uses this colour anymore**
3. Slide 3: `#2D7A4F` (green) — maps to Validator

The intention was to hint at the three roles before the Role Selection screen. The execution partially works — slide 1 and slide 3 now map correctly to Contributor and Validator — but slide 2 uses a colour that belongs to no role in the current system (slate-blue `#4B6FAE` was the original Validator colour before it was changed to forest-teal).

A revised approach would be:
1. Slide 1: `#C4622D` (terracotta / Contributor)
2. Slide 2: `#2D7A4F` (forest-teal / Validator)
3. Slide 3: `#6B63D4` (indigo / Quest Creator)

This turns the onboarding waveform sequence into a preview of the three roles' identities, making the colour work do meaningful narrative work.

---

## 9. The Quest Creator Dashboard: Colour Sprawl Problem

The Quest Creator Dashboard (`QuestCreatorDashboard.tsx`) is the screen with the most significant colour sprawl in the current system. Within a single screen, it uses:

- `#8B7FE8` (lavender) — hero waveform, correct role colour
- `#6B63D4` (indigo) — accent elements, correct role colour
- `#E06C3A` (terracotta/orange) — appearing in the campaign progress bar gradient AND the "Audio Hours" metric card, which is Contributor colour
- `#2D7A4F` (forest-green) — appearing in the "Pass Rate" metric card, which is Validator colour
- `#B8860B` (amber) — campaign progress at mid-levels

**The problem:** The "Audio Hours" metric card uses orange (`#E06C3A`) and the "Pass Rate" card uses forest-green (`#2D7A4F`). These are the primary identity colours of the *other two roles*. On a Quest Creator screen, seeing terracotta and forest-teal doesn't just add noise — it actively suggests that the Quest Creator is looking at a Contributor screen or a Validator screen.

**Why this happened:** The metric cards were colour-coded to be visually distinct from one another. In isolation, orange/green/indigo is a sensible triptych for three data points. In the context of a role-based identity system, it's a conflict.

**The intended logic for the fix:** The Quest Creator dashboard should use a monochromatic indigo range for its data visualisation, with the exception of semantic status colours (green for good pass rate reads as a status signal, which is acceptable if the context is clear enough). The key is that orange should never appear decoratively on a Quest Creator screen, since orange is the Contributor's primary identity.

---

## 10. Semantic Colour vs. Role Colour: The Critical Distinction

The most important rule in this colour system, and the one most frequently violated in the current implementation, is the distinction between **semantic colour** and **role identity colour**.

**Semantic colours** communicate information status:
- Green → approved, good quality, success
- Amber/yellow → pending, warning, mid-level
- Red → rejected, error, failure

**Role identity colours** communicate which part of the product you're in:
- Terracotta → Contributor zone
- Forest-teal → Validator zone
- Indigo → Quest Creator zone

The confusion happens when a role identity colour is also used as a semantic colour in another role's context. For example:
- Forest-teal (`#2D7A4F`) is the Validator's identity colour
- Green also means "approved" or "success" semantically
- When a Contributor sees green in their activity feed ("Approved — ₹15 credited"), they are seeing the Validator's identity colour being used as a semantic status signal

This is actually acceptable — status signals are universal enough that seeing green for "approved" doesn't cause the user to think they're looking at a Validator screen. The visual context (they're in their own Contributor home, surrounded by terracotta CTAs and a navy card) is strong enough to anchor the semantic reading.

The places where this becomes a problem are when role identity colours appear out of context as large decorative elements — like the orange on the Quest Creator dashboard — not as small status chips or progress indicators.

---

## 11. The Recording Screen's Green Checkmark

When a Contributor successfully records a clip, the completion state shows a green checkmark circle (`#2D7A4F`). This is a minor inconsistency: the Contributor's success moment is marked with the Validator's identity colour.

The reasoning for why this was done: green is the most universally understood "success" signal in digital interfaces. Changing it to terracotta (the Contributor's colour) could be read as "record again" or "active state" rather than "completed successfully." The semantic weight of green-for-success is strong enough that it was retained.

However, a more refined solution would be to use a warm amber-gold (closer to `#D4A017`) for Contributor success states — maintaining the warmth of the Contributor palette while clearly signalling completion rather than ongoing action.

---

## 12. The XP Colour: `#8B6914` (Olive/Dark Gold)

XP is deliberately given its own colour (`#8B6914`, olive-gold) that belongs to no role. This was a deliberate design decision driven by the product's economic model: XP is explicitly *not* money. Mixing XP colour with the cash earnings display would suggest they are interchangeable, which they are not.

The olive-gold sits in a different temperature zone from terracotta (warm but more muted, less energetic) and reads distinctly from both earnings values (large, monospaced, terracotta or role-coloured) and from level indicators. Its specific use: small inline XP labels, level progression.

---

## 13. Complete Colour Inventory by Role

### Contributor
| Token | Value | Usage |
|---|---|---|
| Background | `#F8F9FA` | App background |
| Hero surface | `#1A1F2E` | Cash balance card |
| Primary accent | `#C4622D` | CTAs, waveform, active nav |
| Light accent | `#E06C3A` | Progress bar gradient end |
| Waveform | `#E8913A` | Recording screen waveform |
| Achievement card | `#C4622D` | Unlocked badge fill |

### Validator
| Token | Value | Usage |
|---|---|---|
| Background | `#F0F5F2` | App background |
| Hero surface | `#0E2318` | Accuracy/stats card |
| Primary accent | `#2D7A4F` | CTAs, waveform, active nav |
| Bright accent | `#4EC992` | Hero card text/icons against dark |
| Card border | `#D8E8DC` | Teal-tinted borders |
| Batch accent low | `#B8D9C4` | Low-priority batch indicator |

### Quest Creator
| Token | Value | Usage |
|---|---|---|
| Background | `#F4F5FA` | App background |
| Hero surface | `#0E1130` | Dashboard command card |
| Primary accent | `#6B63D4` | CTAs, waveform, active nav |
| Bright accent | `#8B7FE8` | Hero card text/icons against dark |
| Card border | `#E0DDF5` | Indigo-tinted borders |
| Light background | `#EDEAFC` | Avatar circle, tinted cards |

---

## 14. Colours That Should Not Exist in the Current System (But Do)

The following colours appear in the codebase but do not belong to any defined role or semantic token. They represent decisions made in isolation that should be reconciled:

| Colour | Where Used | Problem |
|---|---|---|
| `#4B6FAE` (slate-blue) | Role Selection (Validator border), Onboarding slide 2 | Validator's abandoned previous identity — should be replaced with `#2D7A4F` |
| `#7A6B2D` (golden-olive) | Role Selection (Quest Creator border) | Quest Creator's abandoned previous identity — should be replaced with `#6B63D4` |
| `#B8860B` (amber) | Campaign progress bars (mid-level) | Used decoratively, not as a true status signal — should be reviewed |
| `linear-gradient(90deg, #7B6FE8 0%, #E06C3A 100%)` | Dashboard overall progress bar | Mixes Quest Creator identity (`#7B6FE8`) with Contributor identity (`#E06C3A`) — the gradient spans two role colours |

---

## 15. What the System Gets Right

Despite the inconsistencies, several aspects of the colour system are working well and should be preserved:

1. **The navy hero card pattern** — Applied consistently across Contributor (cash balance) and Validator (accuracy score) and Quest Creator (dashboard progress). The dark hero card anchors every role's home screen with the same gravity, then differentiates through the accent colour and waveform variant inside it.

2. **The tinted background per role** — `#F0F5F2` for Validator and `#F4F5FA` for Quest Creator are subtle but effective. They shift the ambient colour temperature of the entire screen without being loud.

3. **Monospaced numbers for financial data** — All cash amounts (`₹1,250.00`, `+₹254`, etc.) use `var(--font-mono)`. This was a small but meaningful decision: financial figures should feel precise and machine-exact, not warm and humanistic. The monospaced rendering aligns them visually and makes scanning multiple figures fast.

4. **The three waveform variants** — The most conceptually coherent part of the whole system. Audio (organic), Precision (even), Data (spiky) maps elegantly to the three roles' relationships to audio.

5. **Status pill colours** — The approved/pending/rejected status system (green/amber/red pill chips) is consistent across all three roles. Semantic meaning is universal; only identity colour is role-specific.

---

## 16. The Priority Fix List

In order of urgency for design coherence:

1. **Role Selection screen** — Update Validator border to `#2D7A4F`, Quest Creator border to `#6B63D4`. This is the entry point of the entire role system. Colour mismatch here undermines everything downstream.

2. **Navigation bar active states** — All three apps currently use `#E06C3A` for active nav. Change Validator to `#2D7A4F`, Quest Creator to `#6B63D4`.

3. **Onboarding slide 2 waveform** — Change from `#4B6FAE` to `#2D7A4F` so all three slides map to the three current role identities.

4. **Quest Creator dashboard metric cards** — Remove orange (`#E06C3A`) from the "Audio Hours" card. Replace with a neutral or indigo variant.

5. **The overall progress bar gradient** — The `#7B6FE8 → #E06C3A` gradient on the dashboard hero combines two role identity colours. Replace with a single-role indigo progression: `#4A42C0 → #8B7FE8`.

---

## 17. Summary: The Core Design Philosophy

The Feul colour system is built on one idea: **colour does work, not decoration.**

Every colour decision should answer the question: what is this colour telling the user? In Feul, colours tell you:

- **Where you are** (which role's environment)
- **What matters** (navy = value/status, terracotta/teal/indigo = action for your role)
- **What state something is in** (green = approved, amber = pending, red = rejected)

When a colour can't answer that question — when it's just there to add visual interest or differentiate two elements — it adds noise. The current system has some of that noise, primarily from the transitional period where role identities changed but the Role Selection and Onboarding screens weren't updated to match.

Resolving those five priority fixes would bring the system into full internal consistency. The goal is a product where a user, after spending 20 minutes in the Validator flow, could sketch the palette from memory: deep forest green, mint highlights, teal accents on off-white. That kind of memorability is what turns a colour system into a brand.

---

## 18. Session 2: Visual Unification — Killing Role-Specific Colour Overload

### The Problem
The three-role colour identity system (peach/amber/terracotta for Contributors, forest-teal/mint/emerald for Validators, midnight-indigo/lavender for Quest Creators) created a jarring experience when users switched between roles. The design felt like three separate apps stitched together.

### The Decision
Unify all three roles under a single visual DNA:
- **Background:** `#F8F9FA` everywhere
- **Hero surfaces:** `#1A1F2E` ink-navy for all roles
- **CTAs:** `#C4622D` brand orange universally
- **Active nav states:** `#1C2434` charcoal across all bottom bars
- **Card borders:** `#E8EDF3` neutral borders everywhere

**Role differentiation** was reduced to a single subtle pill colour inside hero cards:
- Contributors: `#C4622D` terracotta pill
- Validators: `#5A7B6D` muted sage pill
- Quest Creators: `#6B7394` muted slate pill

**Semantic green** (`#2D7A4F`) preserved only where it carries factual meaning (accuracy scores, pass rates, approved states).

### Why This Works
Users don't care about role branding — they care about what they can do. A unified design language reduces cognitive load during role-switching and makes the product feel like one cohesive platform rather than three separate tools.

---

## 19. Session 3: The Experience Overhaul — From Tool to Earning Engine

### The Core Insight
The app was a functional tool but lacked emotional pull. Zomato makes you hungry when you open it; Feul needed to make users want to earn money the moment they opened it. The difference between a tool and an experience is urgency, immediacy, and dopamine.

### Philosophy: "Make earning feel immediate, visible, and addictive — not procedural."

### 19.1 Scrapping the Role Selection Screen

**Why:** The role selection screen was a dead-end for new users. A first-time user doesn't know what a "Validator" or "Quest Creator" is. Showing them three options before they've experienced the product creates decision paralysis.

**Fix:** All users now enter as Contributors. Validator and Quest Creator roles are aspirational tiers accessible from the Profile menu ("Grow with Feul" section), gated behind application forms. This makes pro roles feel like achievements rather than default options.

**Case study reasoning:** This follows the same pattern as Uber (you use the rider app first, driver is a separate application), Instagram (you consume before you create), and Discord (you join servers before you moderate).

### 19.2 The First Earning Flow

**The Problem:** After onboarding, users landed on a generic dashboard with ₹0 in their wallet. This is the highest-churn moment in any app.

**The Solution — Three new screens:**

1. **FirstEarning.tsx** — Full ink-navy screen with pulsing mic icon and the hook: "Earn ₹50 in 30 seconds." Trust builders (clock icon + "~30 seconds", zap icon + "Instant payout") reduce anxiety. Single CTA: "Start Earning."

2. **VoiceCalibration.tsx** — Three quick prompts ("Say this naturally"). Live earning counter in the header (₹0 → ₹17 → ₹33 → ₹50). Each clip completion shows "+₹17 earned" with a green checkmark. Auto-advances between prompts.

3. **EarningCelebration.tsx** — Full celebration with spring-animated "+₹50" at 72px. XP bonus pill. "What's waiting for you" teaser showing available quest types and price ranges. CTA: "Keep Earning."

**Why this works:** The "Guaranteed Win" pattern. The first quest is impossible to fail, pays out instantly, and creates the dopamine hit of seeing ₹0 become ₹50. This is the same psychology behind Duolingo's first lesson (you can't lose) and Uber's first ride promo.

### 19.3 New User Home — "Locked Potential"

**The Problem:** A returning home screen with ₹1,250 earned feels different than a new user's first real dashboard. The new user needs a distinct experience that shows potential, not history.

**The Solution:** `NewUserHome.tsx` with:
- **Daily earning potential ring** — SVG circle showing ₹50 of ₹350 earned today. The ring is mostly empty, which creates the psychological tension of "I could fill this."
- **"Your first ₹50 is in your wallet"** — Green success banner as proof
- **Recommended quests** — Three easy, short quests matched to calibration, with "₹X in Y min" framing
- **Unlock Milestones** — Three locked achievements (5 quests, 3-day streak, Level 2) with mini progress bars. Gamification hook.
- **Social proof** — "What contributors earn weekly" showing Casual (₹250), Active (₹1,200), Power (₹3,500+)

**Toggle:** A "New user / Returning user" toggle lets case study reviewers see both states.

### 19.4 The Daily Earning Goal Ring

Added to both NewUserHome and the returning user's Home hero card. An animated SVG circle (Motion library) that shows daily earnings progress against a target. Uses `strokeDashoffset` animation with a 1.2-second ease-out to create a satisfying fill effect on page load.

**Why:** Activity rings (Apple Watch, Duolingo) are proven habit-formation UX patterns. The incomplete ring creates tension — users want to complete it.

### 19.5 Money as the Hero — Urgency & Scarcity Design

The returning Home screen was redesigned with:
- **₹ in 42px mono font** as the hero number (was 48px but with daily ring layout changed to 42px)
- **Bonus timer banner** — "+20% bonus active for next 8 min" in amber. Creates time pressure.
- **"Earn Right Now" section** — Quest cards showing "₹15 in 30 sec" instead of just "₹15". This reframes from "task completion" to "earning speed."
- **Urgency tags:** "High Demand", "+20% Bonus", "Expires in 2h"
- **Scarcity indicators:** "12 slots left", "5 slots remaining"

### 19.6 Quest Feed Redesign

Every quest now has:
- **Demand tags** with colour-coded backgrounds (High Demand = peach, Bonus = amber, Expiring = red, Limited = red, New = blue)
- **"₹X in Y minutes" framing** — The earning amount AND the time are always shown together
- **Slot counts** where applicable
- **Card-based layout** instead of divider lists, giving each quest more visual weight

### 19.7 Wallet Empty State — "Locked Potential"

For new users, the wallet shows:
- **Dashed progress ring** with a lock icon and ₹0 — "Unlock your first ₹50"
- **"How Earnings Work"** three-step flow (Record → Validate → Cash)
- **Welcome Bonus teaser** — Peach banner with gift icon
- CTA: "Start Earning Now" → routes to FirstEarning flow

### 19.8 Validator & Quest Creator Application Forms

**ValidatorApplication.tsx:**
- Ink-navy hero explaining the program ("Earn ₹2 per clip reviewed")
- Requirements preview (50+ clips recorded, 5+ hrs/week, 2+ languages)
- Language selector (pill buttons), hours selector, optional motivation textarea
- Success state with "Application Submitted — we'll review in 48 hours"

**QuestCreatorApplication.tsx:**
- B2B-focused hero ("Need audio data for your AI models?")
- Stats (5,000+ contributors, 13+ languages, 98% data quality)
- Company name, work email, website, volume selector, data needs textarea
- Success state with "We'll be in touch within 24 hours"

**Why gating matters:** Making these roles feel like VIP applications rather than checkboxes increases perceived value. It also ensures quality — only experienced contributors become validators, and only real companies create campaigns.

### 19.9 Edge Cases & Failure States

All existing edge cases preserved, with additions:

**Contributor:**
- ✅ Rejected Submission (RejectedTask.tsx — with effort credit, re-record CTA, rejection tags)
- ✅ Empty Quest Feed (language-specific empty state with notification CTA)
- ✅ Pending Submission / Waiting State (under_review and auto_check statuses in activity feed)
- ✅ Offline / Low Connectivity (amber banner in Recording: "You're offline — recordings saved locally, auto-submit when back online")

**Validator:**
- ✅ Consensus Mismatch (bottom sheet modal with "Your grade differs from others" — listen again, keep or change)
- ✅ Empty Batch / All Caught Up (green checkmark, accuracy score, "Add Another Language" CTA)
- ✅ Fraud Detection (dashed flag button: "Flag as Fraud / AI-Generated")

**Quest Creator:**
- ✅ Campaign Underperformance (red-bordered alert card with Bengali Medical Terminology case study — 8% progress in 14 days, 3 contributors, suggested fixes including payout increase and scope expansion)

### 19.10 Micro-Interactions & Animation

- **Nav bar:** Active tab icon scales up with spring animation (stiffness 300, damping 20) and lifts 2px. Label fades in from below.
- **Earning celebration:** Spring-animated numbers (stiffness 150, damping 10) for the "+₹50" hero text
- **Voice calibration:** Auto-advancing prompts with slide animation, per-clip earning counter with scale bounce
- **Daily goal ring:** 1.2s ease-out stroke animation on mount
- **New user quest cards:** Staggered fade-in (100ms delay per card)
- **Recording button:** whileTap scale to 0.92
- **CTA buttons:** whileTap scale to 0.97 on primary actions

---

## 20. Summary: The Complete Feul Design System

The Feul design system evolved across three sessions:

1. **Session 1:** Established the role-specific colour identity system with Contributors (peach), Validators (teal), Quest Creators (indigo)
2. **Session 2:** Unified all roles under a single visual DNA (ink-navy hero, brand orange CTAs, neutral borders) with role identity reduced to a single subtle pill colour
3. **Session 3:** Transformed the product from a tool into an earning experience through urgency design, first-earning flows, empty state strategy, application forms for pro roles, and micro-interactions

The final product follows one guiding philosophy: **every pixel should either make the user want to earn money or help them do it faster.** Colour communicates state, not decoration. Animation communicates progress, not polish. Empty states communicate potential, not absence.