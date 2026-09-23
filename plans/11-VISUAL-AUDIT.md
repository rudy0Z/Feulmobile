# 11 — Visual & quality audit

> **Method:** rendered the app in a real Chromium (Playwright, 390×844 @2x) and inspected
> 11 screens at 2× — Market, Consent gate, Home empty, Jobs, Wallet, Home live, Brief,
> Profile, Celebration, Payout, Rewards. Seeded profile + consent state to reach gated screens.
> **Not** a code review — everything below was seen, not inferred.
> **Date:** 2026-09-16.

---

## Headline

**The app was rendering completely blank, and every gate said it was fine.**

`pnpm build` exited 0, all 18 metric rows were green, and the app showed a white screen with
zero nodes. Two independent runtime failures, both invisible to the build.

This is the single most important result of this audit: **the discipline gate measures source
text, and source text cannot tell you whether the app runs.** Everything I did before this —
the type scale, the sweeps, the ratchets — was verified structurally and never once rendered.

---

## CRITICAL — two runtime failures the build did not catch

### C1 · `Cannot access 'durations' before initialization` → **entire app blank**

Introduced by the motion sweep. In `lib/motion.ts`, `springs` read `durations.exit` while
`durations` was declared *below* it:

```ts
export const springs = { …, exit: { duration: durations.exit } };  // reads it here
export const durations = { exit: 0.2 };                            // declared here
```

A `const` referenced before its declaration is a temporal-dead-zone error **at module init**.
`motion.ts` is imported by nearly every screen, so one bad line took the whole app down.

**Fixed** — `durations` and `easings` now precede `springs`.

**Why the build missed it:** Vite/esbuild transpiles per-file and does not typecheck. A TDZ
violation is valid syntax and valid types; it only fails when the module is evaluated.

### C2 · `IconButton is not defined` → crashed `BellButton`, took out Home

Four files used `<IconButton>` without importing it — fallout from the two IconButton sweeps:

```
components/Recording.tsx
components/SpoofingVerificationHold.tsx
components/ui/NotificationsPanel.tsx
components/validator/GradingTask.tsx
```

**Fixed** — imports added. A reusable check was written (`use of a primitive with no import`)
and now returns 0.

**Why the build missed it:** a bare `IconButton` is a *valid identifier* — JavaScript happily
treats it as a global reference. Rollup only errors on a **named import** that doesn't exist
(which is how it caught `IllustrationSlot` earlier). An *absent* import is invisible.

### The lesson, stated plainly

`pnpm build` is not a smoke test. It checks that modules parse and that named imports resolve.
It does not check that the app runs. **Every sweep in this project was verified with the build
and the metrics script, and both are blind to this entire class of failure.** A render pass
belongs in the gate.

### C3 · The browser tab read **"Feul Mobile"** — a banned brand string

`index.html` carried `<title>Feul Mobile</title>` and a meta description still written for the
*previous* product: *"Record short audio clips to train AI while earning points through
**gamified quests** and rewards."* That is three locked-language violations in one line —
a brand name that must never render, "quests" (→ jobs), and "points" (the app pays ₹ rupees).

**Fixed** — title is now deliberately **name-free** ("Voice recording jobs — prototype") with a
comment stating that the naming decision is not to be resolved as a side effect of a session,
per `00-MAKE-CONTEXT`. Meta description rewritten to the current concept.

**Why the metric missed it:** the file walk only matched `\.(tsx|ts|css)$`. **`index.html` was
never scanned at all.** The walk now includes `.html`, and the brand check is HTML-comment-aware
so a note *about* the banned strings doesn't trip it.

A missing favicon also produced the only console error across all 34 routes; suppressed with
`<link rel="icon" href="data:,">`.

### The fix for all of the above: `pnpm smoke`

`scripts/smoke.mjs` renders **every route** in a real browser and fails on any console error,
page error, React error-boundary trip, or an empty `#root`. Added as `pnpm smoke`, with
`playwright-core` as a dev dependency.

```
34/34 routes render clean
```

This is the check that would have caught C1, C2 and C3 before they were ever committed.
**Run it after every sweep, alongside `pnpm metrics`.**

---

## Copy — locked-language violations

`07-CONCEPT-LOCK §2` is explicit: *"quest / quests / Quest tab → job / jobs / Jobs tab"* and
*"Any user-visible string follows the new language immediately."* The tab was migrated. Two
user-facing strings were missed:

| File | String | Fix |
|---|---|---|
| `QuestFeed.tsx:246` | H1 read **"Quests"** while the dock tab beneath it read "Jobs" | → "Jobs" ✅ |
| `Profile.tsx:91` | stat label **"Quests"** | → "Jobs" ✅ |

Internal identifiers (`QuestFeed.tsx`, `Quest` type, `q-lines-1`) are correctly exempt per §2.

---

## Visual defects

### V1 · The Brief rendered the script excerpt twice (LINES jobs)

`briefScene(quest)` falls through to `quest.excerpt` for LINES, and the script-preview block
below it rendered `quest.excerpt` again — so the same two Hindi phrases appeared twice on the
first job's Brief, once joined and once wrapped.

**Fixed** — LINES now uses `quest.description` as the intro, which is distinct from the excerpt
and adds real context ("Common Hindi phrases recorded naturally, one line at a time.").

### V2 · Two stacked placeholders on Market

The Market screen shows a 36px `BrandSlot` **and** the 128px dashed `IllustrationSlot` directly
beneath it — two identical grey dots in two rounded squares, occupying the top third of the
first screen a reviewer sees.

Both are placeholders, so the top of the app currently reads as unfinished twice over. **Not
fixed — this needs the owner's call**, since the illustration slot is deliberately reserved.
Options: drop the `BrandSlot` on Market (the illustration slot already carries the top), or
keep both but make the illustration slot visually distinct from the brand mark.

### V3 · The consent screen's sticky CTA outranks the promise it asks you to accept

On `/contributor/consent`, the sticky "I agree — continue" bar is pinned to the bottom of the
viewport from first paint, while the DPDP verbatim block sits **below the fold**, after the
four facts. The screen's entire purpose is *"the promise is provable before consent"*, and the
visual hierarchy says the opposite: the accept button is always visible, the promise is not.

**Not fixed — design decision.** Options: (a) move the verbatim above the facts, directly under
the pre-mic bar; (b) keep the CTA non-sticky until the promise has been scrolled into view;
(c) repeat the verbatim in the sticky area. I'd pick (a) — it is the cheapest and it puts the
legal line where the eye already is.

### V4 · The primary action is brown, not the brand's terracotta

Every primary CTA in the app renders in `--action-primary` = `terracotta-800` (`#8E4520`) —
a dark brick brown. The brand's own accent is `terracotta-500` (`#E06C3A`), a warm orange that
appears nowhere as a fill.

This is a real conflict, and the contrast maths explains why it happened:

| Fill | Text | Contrast | Verdict |
|---|---|---|---|
| `terracotta-500` `#E06C3A` | `bone-25` `#FFF6EF` | **3.11:1** | fails 4.5:1 for 16px bold labels |
| `terracotta-600` `#C4622D` | `bone-25` | **3.84:1** | still fails |
| `terracotta-800` `#8E4520` | `bone-25` | **6.51:1** | ✅ what ships today |

So the brown was a *correct* accessibility fix. But it costs the brand its warmth on the single
most-repeated element in the product.

**A fourth option preserves both:** `terracotta-500` fill with **ink text** (`carbon-900`)
gives **5.30:1** — on-brand, accessible, and a confident modern look. Worth a side-by-side
before deciding; this is a taste call, not a correctness one.

### V5 · The first-earn celebration does not connect to the actual goal

The Celebration screen shows `+₹12 · Settled` on a very empty canvas. Per §1.6 that is exactly
right — quiet, no confetti, one truth line. But the contributor's actual goal is **₹100 to
withdraw**, and the screen says "Arrived in your wallet" without saying *how far*.

The Home screen promises "Your first 3 jobs pay ₹122 — withdrawal opens at ₹100". The
celebration after job one is the natural place to close that loop. A single line — "₹88 to go
before you can withdraw" — would make the quiet award *motivating* instead of merely *tasteful*.

**Not fixed — product decision.**

### V6 · Sticky CTAs and the last content row

On Wallet, the last ledger row ("Clarity bonus +₹8") sits behind the sticky Withdraw bar at the
fold. Same pattern on Rewards and Jobs. This is standard sticky-footer behaviour and scrolling
reveals it — but the bottom padding must clear the CTA height at the true end of scroll.
**Flagged to verify at 320px**, where the CTA is proportionally taller.

---

## What is genuinely good

Worth stating plainly, because the failures above are the exceptions:

- **Wallet is the strongest screen in the app.** The 2×2 metric tiles, muted paise
  (`₹127.50`), the UPI row with a "Name matched" verdigris badge, the filter chips and the
  ledger rows with `✓ Settled` / `⏱ In review` all read as a real product. Money-as-ink is
  doing exactly what it was designed to do — the figures carry weight without shouting.
- **States as icon + label is working everywhere.** Settled, In review, Name matched, Failed —
  every state I saw pairs a glyph with a word. No colour-only signalling anywhere.
- **The consent gate is coherent and complete.** Step indicator, shield hero, the pre-mic
  promise stated before anything else, a listenable native-language read, four plain-language
  facts, the verbatim in English *and* the chosen language. This is the screen the case study
  will lean on and it holds up.
- **The 8-step type scale reads well.** Hierarchy is coming from weight and space rather than
  from size soup — Home's eyebrow → headline → body → meta ladder is legible at a glance.
- **The Brief's earnings breakdown** (Base ₹10 / Quality bonus +₹2 / **You earn ₹12**) is
  honest, tabular and scannable. "Same work, same base pay" is legible in the UI, not just in
  the doctrine.
- **The Studio's dark ground is unmistakable.** Crossing into `--surface-studio` for capture
  reads instantly as "you are recording now" — the ground change is doing real work.

---

## Prioritised actions

| # | Item | Type | Effort |
|---|---|---|---|
| 1 | ✅ C1 TDZ crash | Bug | done |
| 2 | ✅ C2 missing `IconButton` imports (4 files) | Bug | done |
| 3 | ✅ C3 `index.html` brand string + stale meta | Bug | done |
| 4 | ✅ Copy: 2 × "Quests" → "Jobs" | Bug | done |
| 5 | ✅ V1 duplicated Brief excerpt | Bug | done |
| 6 | ✅ **Render pass added to the gate** — `pnpm smoke`, 34/34 clean | Process | done |
| 7 | ✅ Metric gap closed — `.html` now scanned | Process | done |
| 8 | V3 consent: get the verbatim above the fold | Design | S |
| 9 | V2 Market: resolve the double placeholder | Design | S |
| 10 | V4 primary CTA colour — decide brown vs on-brand terracotta | Design | S |
| 11 | V5 celebration: add the gap-to-₹100 line | Design | S |
| 12 | V6 verify sticky-CTA clearance at 320px | QA | S |

**Items 6 and 7 are the ones that matter most.** Six of the seven defects found here were
invisible to every gate this project had. "All green" now means the app renders *and* the
source text is disciplined — but only because a render pass exists.
