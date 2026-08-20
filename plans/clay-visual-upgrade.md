# Feul — Clay Visual Upgrade Spec & Plan

Status: **rev 3 — infrastructure + placeholders BUILT. Awaiting real renders.**

### What is built (placeholders live now)
- Step 0 tokens added (`--surface-hero`, `--surface-hero-elevated`,
  `--surface-hero-accent-glow`); ALL raw hero hex across components tokenized.
- `src/app/lib/clayAssets.ts` — asset registry + per-asset generation prompts +
  quest→prop map. Set an entry's `src` to activate a real render.
- `src/app/components/ui/ClayAsset.tsx` — placeholder-or-render, fixed footprint.
- `src/app/components/ui/TierBadge.tsx` — tier level → clay medallion.
- Slots wired: Wallet (corner), EarningCelebration (reward object),
  DailyLimitReached (rest object), Profile (tier badge), QuestCard `featured`
  variant + one featured card in the scenario feed.
- `src/app/assets/clay/` drop-zone created (see its README).

### Handover loop
Drop PNG in `src/app/assets/clay/`, import it in `clayAssets.ts`, set `src`.
Placeholder swaps to the render at the identical size — no layout change.

Stance: **Soft semi-3D / clay** (rounded, dimensional, tactile "reward & identity" objects)
Quest visuals: **Clay props on FEATURED cards only** (no full character/mascot art)
Production method: **SVG "clay-look" authored in-repo** (see §2.1)

---

## 1. Goal

Add visual imagery to an app that is currently 100% component-driven, to make it feel
more human and less dashboard-like — **without** fracturing the design system, breaking
layouts, or degrading high-clarity surfaces. Every visual decision must be systematic,
token-coherent, and rolled out behind approval gates. No image is ever dropped into
existing flow — each surface is re-composed with a designed slot + empty/loading state.

## 2. Core tension we are solving

Clay/semi-3D is **dimensional and light-aware** (soft shadows, highlights, rounded volume).
The Feul system is **flat and token-driven**. These fight each other. Resolution:

- Clay objects carry baked internal shading; the app palette gains **no new colors** —
  every clay fill references an existing (or newly-formalized, see §5) token value.
- **One lighting rule** for every asset — ~80% of clay coherence.

### 2.1 Production method (IMPORTANT — tooling reality)

There is **no raster/3D image generator available in this environment.** Available sources
are Unsplash (photos — unusable for clay) and the `icon-illustration` skill (SVG vectors).

Therefore clay is authored as **SVG "clay-look"**: layered radial/linear gradients + soft
inner highlight + ambient drop-shadow, with gradient stops referencing token values.
This is the chosen method because it is:
- token-coherent by construction, crisp at any size (critical for 24–32px badges),
- tiny, no import-pipeline risk, fully controllable to match existing hero gradients.

Tradeoff: reads as soft/dimensional, NOT photoreal claymation — which is the correct
amount for UI at these sizes. **True raster clay would have to be supplied externally
by the user;** otherwise everything is executed in SVG in-repo.

## 3. Material law (applies to EVERY asset, no exceptions)

- Light: single soft source, top-left, ~35°. No harsh speculars.
- Surface: matte clay, slight subsurface softness. **No gloss/plastic.**
- Rounding: generous, uniform corner-radius language.
- Shadow: soft ambient occlusion, low opacity, warm-neutral — **never pure black**.

## 4. Palette (sourced ONLY from tokens — formalized in §5)

| Clay family   | Source token (post-§5)            |
|---------------|-----------------------------------|
| Navy clay     | `--surface-hero` / `--surface-hero-elevated` |
| Orange clay   | `--accent-500` / `--surface-hero-accent-glow` |
| Neutral clay  | surface neutrals / `--text-muted` |
| State accents | only where a token authorizes (success / warn on badges) |

## 5. STEP 0 — Token pre-work (HARD PREREQUISITE, before any asset)

The spec previously referenced `--surface-hero`, which **does not exist**. The live dark
surfaces use `--navy` (= `--neutral-950`) plus **raw hex gradients** hardcoded in
`Wallet.tsx` (`#0F1822 → #0A0C10`, `rgba(196,98,45,…)`) and `Home.tsx`
(`#0F1822 → var(--navy)`, `rgba(224,108,58,…)`).

Before generating a single asset:
1. Add tokens, backed by values already in use (so nothing shifts visually):
   - `--surface-hero`            ← `#0F1822` (top of existing gradient)
   - `--surface-hero-elevated`   ← `#0A0C10` (bottom of existing gradient)
   - `--surface-hero-accent-glow`← existing `rgba(224,108,58,…)` orange glow
2. Refactor `Wallet.tsx` + `Home.tsx` to consume these tokens instead of raw hex.
3. Derive ALL clay renders from these approved source values.

Only then is "token-coherent" literally true.

## 6. Asset families & placement rules

### 6.1 Wallet clay object — REFERENCE, NOT HERO
The live `Wallet.tsx` is a high-clarity financial surface (big balance, reserve state,
weekly earned, subtle waveform) and MUST stay the visual center. Therefore:
- The wallet render is the **material-language reference** (approved first).
- On the live wallet screen it is at most a **small supporting corner/edge asset** — the
  balance never wraps around it.
- The **large clay reward object appears only at achievement moments:**
  first earning · earning celebration · empty wallet ("unlock your first ₹50") · tier advancement.

### 6.2 Tier badges — SILHOUETTE-FIRST ICONS, not miniature 3D scenes
At 24–32px, shading/detail vanish. Rules:
- One unmistakable form per tier: **seed → flame → shield → crown-medallion.**
- Must work in **flat monochrome** at small size.
- Clay depth is a **secondary enhancement layer**, added only for larger placements.

### 6.3 Empty-state spots
One clay object per empty concept, matched lighting. Drops into already-reserved area.

### 6.4 Quest props — FEATURED cards only, gated by scenario richness
Do NOT make every quest card taller. Two variants:
- **`standard`** — the current compact text-and-metadata card (default, no illustration).
  Preserves scan speed + payout hierarchy (`QuestCard.tsx`).
- **`featured`** — ONE promotional / high-demand / group quest with clay prop + env tint.

Props attach to **scenario richness, not category.** Gate test:
- Earns a prop: "Ordering at a Café", "Doctor Visit", "Family Dinner Table".
- Does NOT: "Hindi — Everyday Phrases".

Reference prop vocabulary (used only where a scenario justifies it): speech-bubble/
mic-and-cup, open book/script card, keypad/dial, face-expression token, location pin/
scene object, globe/flag-tag, generic mic (fallback).

### Where clay is BANNED
Recording screen, live waveforms, dense-data/tables. Clay = reward + identity only.

## 7. Layout redline (each surface RE-COMPOSED, never drop-in)

Rule for every insertion: fixed slot dimensions + safe-area, defined reflow, and a
designed empty/loading state so the layout is balanced whether the asset is present,
loading, or absent.

| Area                     | Layout impact                                              | Risk   |
|--------------------------|------------------------------------------------------------|--------|
| Tier badges              | Icon into existing slots; near-zero                        | Low    |
| Empty states             | Into reserved empty area                                   | Low    |
| Home progress/calendar   | Spacing/grouping polish + milestone-only slot              | Low    |
| Achievement moments      | New designed reward-object slots (not on live wallet)      | Low-Med|
| Wallet (live)            | Small corner asset only; balance stays hero                | Low    |
| Recording (non-clay)     | Record control → bottom thumb-zone; navy-dark continuous   | Medium |
| Quest FEATURED variant   | New variant only; standard card unchanged                  | Medium |

### Recording screen (separate, non-clay track)
- **Button placement:** move primary record control to **bottom thumb-zone** (bottom-center).
- **Theme:** keep dark, but **navy-dark from `--surface-hero`**, NOT pure `#000`; carry
  orange accent as record/active state; animate light→dark transition (mode, not teleport).
- **Assets:** restraint — waveform is the hero; at most subtle ambient bg + clear state icons.

## 8. Coherence guardrails

1. Fixed asset budget & render sizes per family, up front.
2. **Wallet render is the single reference** — approved first; everything judged against it.
3. Assets imported as ES modules + `<ImageWithFallback>`, never inline path strings
   (only relevant if raster assets are supplied externally; SVG-in-repo avoids this).
4. No clay in dense-data / focus contexts.

## 9. Rollout sequence & approval gates

0. **Token pre-work (§5)** — add hero tokens, refactor raw hex. HARD PREREQUISITE.
1. Generate **only the wallet reference render** → sign off material language on one object.
2. Then each as its own reviewable step:
   1. Tier badges (validate small-size monochrome read)
   2. Empty states
   3. Home milestone / calendar polish
   4. Achievement-moment reward objects
   5. Recording re-layout + navy-dark (parallel, non-clay)
   6. Quest FEATURED variant (last)

**Nothing is generated at scale until token pre-work is done AND the wallet render passes.**
```
```
### Open decision for the user
- SVG clay-look (default, in-repo) vs. user-supplied raster clay (external). See §2.1.
