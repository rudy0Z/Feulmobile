# Figma Make Prompt Guide — [PRODUCT NAME] Redesign

> ⚠️ **Naming status (2026-08-27): OPEN, deferred to last.** "Stoke" was tried and rejected. Every prompt below uses `[PRODUCT NAME]` as a literal placeholder — paste it as-is, or substitute a real name only once one is locked. Do not let Figma Make invent a name, wordmark, or logo around the placeholder.

> **Companion to** `REDESIGN-MASTER-BRIEF.md` (the *what/why*) and `EXECUTION-PHASES.md` (the *how/order*).
> **This document is what you actually paste into Figma Make.**
>
> Created 2026-08-23. Phases are only written out here once their Phase 0 dependency is locked — see the status table below. Writing full prompts for unlocked phases would go stale (they'd need to be redone once the second color is decided), so this doc grows phase by phase as you complete each one, not all at once.

---

## How to use this

1. **Paste the Context Brief once**, at the start of the Figma Make project — it's not a screen, it's the system prompt that makes every later prompt short.
2. **Run Phase 1 and Phase 2 exactly as written below.** They're ready now.
3. **Stop after Phase 2 and review in-browser** before touching Phase 3 — per your own working style in `CLAUDE.md`: one section at a time, checkpointed, not build-ahead.
4. For Phase 3 onward, use the **repeatable template** at the bottom, filled from the matching section of `EXECUTION-PHASES.md`. Come back here and I'll draft the exact prompt with you when you're ready for each one — that way it reflects whatever got tuned in the phase before it, not a guess made today.

---

## Status

| Phase | Ready to prompt? | Blocked by |
| --- | --- | --- |
| Context brief | ✅ yes | — |
| 1 — Foundation | ✅ yes | — |
| 2 — Components | ✅ yes | Phase 1 output |
| 3 — Onboarding | ⬜ not yet | Phase 2 output + final second color |
| 4 — Home | ⬜ not yet | Phase 2 output |
| 5–11 | ⬜ not yet | earlier phases |

✅ **The second/cool color is locked: Verdigris `#3D6B5E`** — forced 2026-08-27 after sitting open across three rounds of discussion (see `EXECUTION-PHASES.md` §Phase 0 for the reasoning). Every reference to it below is symbolic, not hardcoded — if it changes later it's still a one-line swap.

---

## Context Brief — paste this first, once

```
I'm designing [PRODUCT NAME] (name not yet finalized — use this literal
placeholder, do not invent a name, wordmark, or logo), a mobile marketplace
app where Indian contributors record
their voice to build datasets for AI labs (illustrative examples: Sarvam AI,
AI4Bharat, Bhashini — no real affiliation, used for realism only). Two user
roles: Contributor (records paid voice clips) and Validator (grades submitted
clips for quality). This is a portfolio case-study project, not a production
app, but it should be built to real production-app rigor.

CORE PRODUCT IDEA: the platform doesn't sell "hours of audio" — it sells
COVERAGE. A specific speaker demographic × dialect × district × acoustic
condition is what's scarce and valuable, not raw volume. This shapes
everything: campaigns are framed as coverage targets ("62% collected, 400
Tamil clips still needed"), pay includes a coverage-scarcity multiplier, and
retention comes from finishing real coverage gaps — never streaks, never
fake urgency.

TRUST PRINCIPLE (non-negotiable, reflect this in every screen you generate):
same work always pays the same base rate, regardless of the contributor's
tier. Tiers change what work you can ACCESS (higher-value campaigns unlock
as you build a track record) and how FAST you get paid (higher trust =
less review = faster settlement) — never the rate for identical work.

TARGET USER: 18-55, owns a budget Android phone (design for 360px width as
the primary target, not 390+), has UPI, may have low digital literacy or be
reading a script aloud for the first time. Money must be legible and honest
above all else — this is a first-time earner who has never trusted an app
with their money before.

VISUAL DIRECTION — "warm Revolut, light-only":
Borrow Revolut's STRUCTURE — huge confident numbers, one clear focus per
screen, generous negative space, almost no chrome — but render it entirely in
a WARM LIGHT palette. This is NOT a dark premium app. The ONLY dark screen in
the entire product is the voice-recording (Studio) capture screen, where dark
is functional: it signals "you are recording" and keeps the script legible.
Everywhere else — onboarding, home, quests, wallet, profile — is one
consistent warm-light system. Do not switch themes per screen. Depth comes
from warm layered surfaces + subtle elevation, NEVER from glow or gradient
fills. Start warm and characterful, then strip to only what's meaningful.

DESIGN SYSTEM: follow DESIGN-SYSTEM.md exactly — it has every token, size,
radius, shadow, and component spec. Do not invent alternatives. The essentials:
- Two-layer tokens: components reference SEMANTIC tokens only, never raw values
- Light "Bone" ground (#FAF7F2) everywhere; dark "Carbon" (#201611) ONLY in
  the Studio capture screen
- One brand hue: Terracotta (#E06C3A / deep #C4622D) — primary actions and
  money IN MOTION only. The money FIGURE itself is ink, not orange. Keep
  orange under ~10% of any screen.
- Verdigris (#3D6B5E, locked) = settled/verified. Ochre (#C8922E) = pending. Crimson
  (#8E2434) = error — kept dark and away from terracotta so "recording" and
  "rejected" never look alike.
- Anek superfamily across Latin/Devanagari/Tamil, one type system. Devanagari
  and Tamil get ~15% more line-height. Body floor 16px, any device.
- Radius 8/14/24/999 — exactly ONE 24px hero object per screen.
- Elevation mostly flat: most cards get NO shadow, separated by a 1px warm
  border. Buttons are FLAT terracotta — no gradient pills, no glow.
- Springs for anything the finger touches (sheets drag 1:1 and are
  interruptible); short fades otherwise. Only the Studio record trigger has a
  continuous ambient pulse.

TWO SCREENS MUST NOT REPEAT (critical): HOME answers "what do I do now?" — a
single big TODAY earning figure + record CTA + opportunity. WALLET answers
"what happened to my money?" — a bento of Available/Pending/This-week/Total +
a weekly earnings bar + the transaction ledger, and NO giant hero ₹. If both
screens show a 52px rupee figure, it's wrong.

VERIFICATION MODEL (tiered to money at risk, not front-loaded): sign up +
earn needs only phone + language + T&C/data-consent. First withdrawal needs
UPI name-match (no document upload). PAN only above a tax threshold. Never a
passport/selfie flow — this is a work-payout app, not a card issuer.

TONE: honest, calm, plain language. No fake urgency, no gamified hype, no
emoji-badge achievements. Numbers do the talking — real coverage percentages,
real pay breakdowns, real district/speaker counts. Emotional target for every
screen: QUIET COMPETENCE, not excitement.

I will prompt you screen-group by screen-group. Confirm you've absorbed this
context, then wait for the first request.
```

---

## Phase 1 — Design system foundation

**Goal**: tokens only. No screens yet.

```
Generate the [PRODUCT NAME] design system foundation as a token reference page —
not a UI screen, a documentation/style-guide page showing every token
swatched and labeled.

COLOR — two-layer architecture:
Primitive ramps (10 steps, 50-950, oklch-based for perceptual uniformity):
- Terracotta: base #E06C3A (hue ~34)
- Carbon (warm near-black, hue ~40, very low chroma): ground #14100E
- Bone (warm off-white): ground #FAF7F2
- Verdigris (settled/verified): base #3D6B5E (hue ~165)
- Ochre (pending): base #C8922E (hue ~75)
- Crimson (error/rejected): base #8E2434 (hue ~15) — verify this reads as
  CLEARLY distinct from Terracotta at small chip size, in grayscale, and
  under a colorblindness simulation. Flag if they're too close.

Semantic tokens mapped from primitives (show the mapping explicitly):
surface-ground / surface-raised / surface-sunken / surface-inverse
text-primary / text-secondary / text-muted / text-on-accent / text-on-inverse
action-primary / action-primary-hover / action-primary-pressed / action-disabled
state-settled / state-pending / state-failed / state-review
border-subtle / border-default / border-strong / border-focus
money-positive / money-pending / money-negative
record-idle / record-active / record-glow

Show two swatched versions of every semantic token: on the Bone ground and
on the Carbon ground, side by side, so it's visible that the SAME semantic
token pair works on both grounds without redefinition.

TYPOGRAPHY — show the full scale as live rendered text, in English AND in
Hindi (Devanagari) side by side for each size, using Anek:
11px eyebrow (uppercase, +0.08em tracking, 1.4 line-height)
12px caption (+0.02em, 1.45)
14px meta (+0.01em, 1.5)
16px body BASE (0 tracking, 1.5) — mark this as the floor, never smaller
18px lead (0, 1.5)
20px card title (-0.005em, 1.35)
24px section heading (-0.01em, 1.3)
30px screen title (-0.015em, 1.2)
38px display (-0.02em, 1.1)
48px hero number (-0.02em, 1.0, tabular figures)
64px money moment (-0.025em, 1.0, tabular figures) — this is the largest
  text in the app, used once per screen maximum, for a just-credited
  amount

Show the Devanagari versions with 10-15% MORE line-height than the Latin
versions at the same pixel size — label this difference explicitly on the
page so it's clear it's intentional, not an inconsistency.

SPACING: 4pt scale — 4/8/12/16/20/24/32/40/56/72, shown as a ruler.

RADIUS: 4 tokens only — 8px (chips/tags), 14px (cards/inputs/rows), 24px
(ONE hero object per screen, reserved), 999px (pills/avatars). Show an
example of the radius-discipline rule: a screen mockup with one 24px hero
card and everything else at 14px or 8px, annotated to show why only one
large-radius object exists.

ELEVATION: 5 tokens, mostly flat —
e-0 (none, default for most surfaces)
e-1 (subtle, inputs/chips)
e-2 (the ONE primary object per screen)
e-3 (sheets/modals)
e-glow (terracotta glow, RESERVED for the recording trigger only)
Show these on both Bone and Carbon grounds — note that on Carbon, elevation
should read as a LIGHTER surface tone, not a shadow.

Render this as one clean documentation page, organized in the sections
above, so I can review every token before any screen gets built on top
of them.
```

---

## Phase 2 — Component library

**Run only after reviewing Phase 1's output.**

```
Using the exact tokens from the design system foundation you just built
(don't introduce new colors, sizes, or radii), generate a component
gallery page showing every component below in every listed state. This is
a reference page, not a real screen.

STRUCTURE
Screen frame · Section divider · Bottom sheet (show both closed and
mid-drag, with a peek of translucent blurred scrim behind it — NOT solid
opaque) · Tab bar (as a translucent material with content implied
scrolling beneath it) · App bar

CONTENT
Card — 3 variants: flat (no shadow, just 1px border), raised (e-1), hero
  (e-2, only one per screen rule noted)
List row (default / pressed states)
Stat block (label + big tabular number)
Empty state (icon + message + optional action)
Callout (informational banner)

MONEY
Amount — tabular figures, de-emphasized decimals: show "₹127" large and
  ".50" smaller/lighter right after it, NOT the same weight
Amount breakdown — show a stacked breakdown: base rate, × coverage
  multiplier, + quality bonus, = total, each line legible
Ledger row — quest name, date, amount, status badge
Balance block — the large hero money display

ACTION
Button — primary (terracotta fill), secondary (outline), ghost (text
  only), destructive (crimson) — each in 3 sizes, each with default/
  pressed/disabled states. NO gradient fills on any button — flat color
  only, this is a deliberate rule.
Icon button, Chip, Filter chip (default + selected), Switch, Stepper

STATUS — critical rule: every status indicator must combine an ICON +
  COLOR + TEXT LABEL together, never color alone
Status badge — settled (verdigris) / pending (ochre) / review (neutral) /
  failed (crimson) — show all 4 side by side
Progress pill — segmented style like [▮▮▮▮░░░░] 4/8, not a smooth bar
Progress ring — circular, for a coverage percentage
Coverage meter — a horizontal bar showing "62% collected" with the
  remaining target stated in text next to it

PROGRESSION
Standing badge — plain text tier name (New / Verified / Trusted / Elite),
  no cute renamed labels
Craft bar — one row per skill (e.g. "Hindi · Scenario"), filled
  proportionally, multiple rows stacked (like a skill sheet, not one
  overall level number)
Tier gate — a LOCKED campaign card: show the pay amount visible but
  dimmed/locked, with an exact unlock condition stated ("Unlocks at 25
  accepted clips — you have 8"), and a small lock icon. This must look
  aspirational, not just disabled.

AUDIO
Record trigger — a large circular button, ≥72px, with the terracotta glow
  token applied, shown in idle and active/recording states (active state
  should look like it's gently pulsing, described as an ambient glow, not
  a hard blink)
Level meter — a simple bar or waveform showing audio input level
Waveform — for playback scrubbing
Clip row — a recorded clip in a list, with duration and a retake icon
Script display — this is the most important text component in the app:
  large (20-28px), maximum contrast against the Carbon ground, generous
  line-height for Devanagari, must remain clearly legible with nothing
  overlapping it

INPUT
Text field, Select, Search field (with icon), Language picker (shows
  script name in its own script, e.g. "हिन्दी"), OTP field (segmented
  digit boxes)

Render every component so state (default/pressed/disabled/loading/error)
is visible without me having to imagine it, and show every component
rendered on BOTH Bone and Carbon grounds to confirm nothing breaks moving
between them.
```

---

## Template for Phases 3–11

Once Phases 1–2 are reviewed and approved, generate each subsequent phase's prompt using this shape. I'll draft the actual filled-in version with you when you get there — this is the skeleton so you know what it will need:

```
Using the exact design system tokens and components from the foundation
and component library already built (reference them, do not reinvent),
generate the [SCREEN NAME(S)] screen(s) for the [PRODUCT NAME] contributor app.

CONTEXT: [1-2 sentences — what this screen is for, from EXECUTION-PHASES.md]

CONTENT/DATA: [the exact copy, numbers, and states — pull from the phase's
"screens to build" list and any example data in the master brief, e.g. real
campaign names, real pay breakdowns]

STATES REQUIRED: [list every state this screen must handle — empty,
loading, error, the specific edge cases from master brief §13 that apply]

INTERACTION NOTES: [pull from REDESIGN-MASTER-BRIEF.md §7.4 spring table —
e.g. "this is a bottom sheet: damping 0.8, response 0.3, must be draggable
and interruptible" or "this has a locked-card tap: small bounce refusal,
damping 0.8, response 0.2"]

ACCEPTANCE: [copy the phase's ✅ checklist items from EXECUTION-PHASES.md
so Figma Make knows what "done" looks like]
```

**Why this template and not pre-written prompts for every phase**: campaign card anatomy depends on the final second color and on how the coverage-meter component actually renders once built — generating Phase 4's exact prompt today would mean redoing it once Phase 1–2 are real. The template turns "write phase 4's prompt" into a 5-minute fill-in-the-blanks exercise using docs that already exist, rather than new thinking each time.

---

## After each Figma Make phase

1. Export/copy the generated code
2. `npx tsc --noEmit` — zero errors before moving on
3. Check it in-browser against the phase's ✅ acceptance checklist in `EXECUTION-PHASES.md`
4. Only then move to the next phase's prompt
