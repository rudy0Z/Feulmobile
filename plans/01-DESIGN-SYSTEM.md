# Design System — [PRODUCT] (Figma Make Source of Truth)

> **This is the single source of truth for how the app looks and behaves in Figma Make.**
> Every value is concrete, every rule is a directive. If a generated screen and this doc disagree, this doc wins.
> **Brand:** placeholder slot only. No name, no wordmark, no logo — see `00-MAKE-CONTEXT.md`. Render the brand slot as an empty geometric mark or literal `[PRODUCT]` in neutral type, never Feul/Grain.
> **Last updated:** 2026-08-31 — cleaned for handover. Supersedes the `theme.css` legacy aliases (`--radius-sm/md/lg`, `--shadow-card/glass`, `--font-sans/display/mono`) which remain in code only for backward compat and must not be referenced by new screens.

---

## 0. One-paragraph brief

A light, warm, honest earning app for Indian voice-data contributors on budget Android phones. It borrows **Revolut's structural discipline** — huge confident numbers, one clear focus per screen, generous negative space, almost no chrome — and renders it entirely in a **warm light palette**, never dark. The **only** dark surface is the recording Studio, where dark is functional (signals "you are recording" and keeps the script legible). Depth comes from **elevation and warmth**, never from glow or gradient fills. Emotional target: **quiet competence**.

**Three forbids (non-negotiable):**
1. No dark theme anywhere except Studio capture
2. No gradient pill buttons, no decorative glows, no emoji as UI
3. No two screens doing the same job — Home ≠ Wallet (see §8)

---

## 1. Color — two layers

**Rule:** Components reference **semantic tokens only**. Never a primitive directly. This is what makes the light/dark swap work without rewriting components.

### 1.1 Primitives (raw values, never used directly)

Warm, oklch-derived ramps. Hex for generator convenience.

```
/* Terracotta — brand. Work in motion, primary action, money moving. */
--t-terracotta-50:  #FBEEE6
--t-terracotta-100: #F6D9C7
--t-terracotta-300: #EFAE86
--t-terracotta-500: #E06C3A   /* BASE */
--t-terracotta-600: #C4622D   /* deep — button fills, pressed */
--t-terracotta-800: #8E4520

/* Carbon — warm near-black. Text on light; Studio ground. */
--t-carbon-900: #201611   /* primary ink */
--t-carbon-700: #5C4A3E   /* secondary ink */
--t-carbon-500: #8A7563   /* muted ink */
--t-carbon-300: #B5A595   /* faint / disabled ink */
--t-carbon-200: #E9E0D6   /* border */
--t-carbon-100: #F1EAE0   /* divider */

/* Bone — warm off-white grounds */
--t-bone-0:   #FFFFFF   /* raised card */
--t-bone-50:  #FAF7F2   /* page ground */
--t-bone-100: #F4EEE5   /* sunken */

/* Verdigris — settled / verified / trust earned over time. Locked 2026-08-27. */
--t-verdigris-50:  #E8F0EC
--t-verdigris-500: #3D6B5E
--t-verdigris-700: #2E5245

/* Ochre — pending / in review. A wait, not a warning. */
--t-ochre-50:  #F6F0DC
--t-ochre-500: #C8922E
--t-ochre-700: #9A6E1E

/* Crimson — error / rejected. Hue ~15, dark, never confusable with terracotta. */
--t-crimson-50:  #F7E4E4
--t-crimson-500: #8E2434
--t-crimson-700: #6E1926
```

> Verdigris note: geometrically ~11° off triadic, chosen for material story — terracotta (fired clay, made permanent by heat) + verdigris (copper, patina earned over time). If revisited, swap this ramp only — semantics don't change.

### 1.2 Semantic tokens (what components use)

```
/* Grounds */
--surface-ground:   var(--t-bone-50)     /* page */
--surface-raised:   var(--t-bone-0)      /* cards */
--surface-sunken:   var(--t-bone-100)    /* insets, script preview wells */
--surface-studio:   var(--t-carbon-900)  /* ONLY Studio capture */

/* Text */
--text-primary:     var(--t-carbon-900)
--text-secondary:   var(--t-carbon-700)
--text-muted:       var(--t-carbon-500)
--text-on-accent:   #FFF6EF
--text-on-studio:   #FBEFE4

/* Action */
--action-primary:         var(--t-terracotta-600)
--action-primary-pressed: var(--t-terracotta-800)
--action-disabled:        var(--t-carbon-200)

/* State — always paired with icon + label, never color alone */
--state-settled:  var(--t-verdigris-500)
--state-pending:  var(--t-ochre-500)
--state-failed:   var(--t-crimson-500)

/* Money — figure is ink, not orange */
--money-figure:   var(--t-carbon-900)
--money-positive: var(--t-verdigris-700)
--money-pending:  var(--t-ochre-700)

/* Structure */
--border-subtle:  var(--t-carbon-200)
--border-strong:  var(--t-carbon-300)
--divider:        var(--t-carbon-100)
--focus-ring:     var(--t-terracotta-500)
```

**Money-color rule:** money figure is ink. Terracotta marks the *action* to earn it and money *in motion*. Settled delta = verdigris, pending = ochre. Keeps orange rare.

### 1.3 60/30/10 discipline

Per light screen: **60% Bone** (ground + surfaces), **30% Carbon** (text, rules, structure), **10% Terracotta** — verdigris/ochre/crimson live *inside* that 10% as small state slices. If orange >10%, wrong.

### 1.4 Contrast floors

| Context | Minimum |
|---|---|
| Recording script | **10:1** — highest in app, non-negotiable |
| Body both grounds | 7:1 |
| Secondary | 4.5:1 |
| Status text on its pair | 4.5:1 |
| Disabled | 3:1 + explanatory label |

* Never encode state in color alone.
* Verify: terracotta vs crimson — small chip (12px), grayscale, deuteranopia/protanopia.

---

## 2. Typography

### 2.1 Families

```
--font-ui:      'Anek Latin', 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;
--font-script:  'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;  /* swap to Mukta only if 20-28px reading underperforms */
--font-number:  'Anek Latin', system-ui, sans-serif;  /* always tabular-nums */
```

Numbers: `font-variant-numeric: tabular-nums` so ledgers align.
Brand slot: if `[PRODUCT]` must be typed, use `--font-ui` at 600 weight, 14-16px, letter-spacing 0 — neutral, not display. No logo lockup.

### 2.2 Scale — cleaned (11 steps, hand-tuned)

*This is the unified scale. `52px` (old DESIGN-SYSTEM.md) and `48px` (MASTER-BRIEF §6.2) are consolidated to `48px hero / 64px money-max` below — matches `UI-REBUILD-PROPOSAL.md:182` and keeps one money moment per screen reachable via `Primitives.tsx`.*

| Token | px | Line-height | Tracking | Use |
|---|---|---|---|---|
| `text-eyebrow` | 11 | 1.4 | +0.09em | uppercase labels |
| `text-caption` | 12 | 1.45 | +0.02em | captions |
| `text-meta` | 14 | 1.5 | +0.01em | secondary/meta |
| `text-body` | **16** | 1.5 | 0 | **base — never smaller, any device** |
| `text-lead` | 18 | 1.5 | 0 | emphasis paragraphs |
| `text-title-card` | 20 | 1.35 | −0.005em | card titles |
| `text-title-section` | 24 | 1.3 | −0.01em | section headings |
| `text-title-screen` | 30 | 1.2 | −0.015em | screen titles |
| `text-display` | 38 | 1.1 | −0.02em | display |
| `text-money-hero` | **48** | 1.0 | −0.025em | **the big earned figure — one per screen max (tabular)** |
| `text-money-max` | **64** | 1.0 | −0.03em | **first-earning celebration only (tabular)** |

### 2.3 Indic rule (do not skip)

Devanagari/Tamil need ~15% more line-height and read 1-2px smaller optically. Per-script tokens:

```
--lh-latin: 1.5;
--lh-deva:  1.72;
--lh-taml:  1.72;
```

Apply `--lh-deva` to every `--font-script` block. Test Tamil ascenders/descenders at 20-28px with no matra clipping.

### 2.4 Responsive — 360 first

| Band | Width | Notes |
|---|---|---|
| Compact | 320-359 | SE, budget Android |
| **Default** | **360-389** | **dominant Indian Android — design here first** |
| Large | 390-429 | iPhone 14/15/16 |
| XL | 430+ | Pro Max |

* No fluid `clamp()` type — half-pixel rendering. Two discrete scales; compact steps **display sizes only**. **Body stays 16px on every device.**
* Spacing flexes; type steps.
* Gutters: 16 / 20 / 24 / 24 across bands.
* Touch targets ≥44px; recording controls ≥72px.

---

## 3. Spacing, radius, elevation

### 3.1 Spacing — 4pt

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72`

Page gutter: 20px default (16 compact, 24 large). Stack rhythm between sections: 32-40px.

### 3.2 Radius — 4 only (cleaned)

```
--r-sm:   8px    /* chips, tags, small controls */
--r-md:   14px   /* cards, inputs, list rows */
--r-lg:   24px   /* THE ONE hero object per screen */
--r-full: 999px  /* pills, avatars, record trigger */
```

**Rule: exactly one `--r-lg` object per screen.** That's how hierarchy returns without shadows. Everything else is `--r-md` or `--r-sm`.

> Legacy note: `theme.css --radius-sm/md/lg/xl/2xl` (8/12/16/20/24) remains aliased for old code. New screens must use `--r-*` above only. `999` for pills stays `999` — never round down.

### 3.3 Elevation — mostly flat, M3-informed

Shadow color is carbon-tinted, never pure black. Two-layer shadows only (key + ambient). On dark ground, elevation is lighter surface, not shadow.

```
--e-0: none                                                        /* default — most rows/cards */
--e-1: 0 1px 2px rgba(32,22,17,.05)                                /* inputs, chips */
--e-2: 0 1px 3px rgba(32,22,17,.06), 0 8px 20px -6px rgba(32,22,17,.08)  /* the one hero object */
--e-3: 0 2px 6px rgba(32,22,17,.08), 0 16px 32px -10px rgba(32,22,17,.12) /* sheets, modals */
--e-glow: 0 0 0 1px rgba(224,108,58,.12), 0 8px 32px rgba(224,108,58,.28) /* Studio trigger ONLY */
```

* Most cards get `--e-0` — separation by 1px `var(--border-subtle)` rule.
* **No gradient fills on buttons.** Flat `--action-primary`, 1px inner top highlight `inset 0 1px 0 rgba(255,255,255,.18)` at most.
* Separation ladder (cheapest first): whitespace → background shift (3-5% tint) → elevation → border last resort. Enforces 167 borders → <15 target.

---

## 4. Motion — springs for touch, fades for the rest

```
--ease: cubic-bezier(0.2, 0, 0, 1);
--d-fast: 120ms;  --d-base: 180ms;  --d-slow: 280ms;
```

| Interaction | Values | Notes |
|---|---|---|
| Bottom sheet (Consent, FilterSheet, WithdrawConfirm, RoomConsentRollCall) | spring `damping 0.8 / response 0.3` | Apple's drawer default, slight settle |
| Record trigger press | `damping 1.0 / instant` on pointer-down | Feedback on press, not release |
| Coverage meter / CraftBar / ProgressRing fill | `damping 1.0 / response 0.4` | Critically damped — trust meter must not overshoot |
| Money count-up on credit | `1.0 / 0.4` | **From live displayed value** if second credit lands mid-animation — never restart from 0 |
| Locked campaign card tapped | `0.8 bounce small / 0.2` | Resistant "no" |
| Tab bar switch | cross-fade `120ms` | No slide — content differs entirely |
| Studio beat transition (Brief→Capture→Review) | cross-fade `180ms + persistent context bar` | Do not hard-cut |
| Press feedback all interactive | `scale .97` on pointer-down | |

**Interruptibility — the rule that matters most:**
* Every sheet/drawer is grabbable + reversible mid-motion. Animate from live on-screen position, never logical target.
* Sheets track pointer 1:1 during drag, rubber-band past bounds, use `setPointerCapture`.
* 2D drags decomposed into independent X/Y springs.

**Direct manipulation:**
* Level meter driven by real mic input, frame-synced — never canned loop during recording.
* No full-viewport moving backgrounds; record glow <<0.2Hz if pulsing.

### Materials — how a layer sits on a ground

* Sheets/scrims are **translucent blurred materials**, not opaque: `backdrop-filter: blur(20px) saturate(140%)` over semi-transparent ground.
* Tab bar is translucent material; content scrolls beneath it.
* Sticky bottom CTA uses **scroll-edge gradient mask** `linear-gradient(to bottom, transparent, ground 30%)` — never 1px hard divider.
* Never stack two translucent surfaces.

### Reduced motion — per-component (not blanket)

| Component | Full | `prefers-reduced-motion: reduce` |
|---|---|---|
| Record trigger glow | continuous pulse | static ring + "Recording" label |
| Coverage/CraftBar fill | animated | instant or short opacity fade |
| Bottom sheets | spring slide-up | opacity cross-fade only, no transform |
| Money count-up | animated count | instant value |
| Studio beat transitions | cross-fade | instant swap |
| Tab switch | cross-fade | unchanged |

---

## 5. Light-only doctrine + the one exception

Every screen uses `--surface-ground` (Bone) **except Studio capture** which uses `--surface-studio` (Carbon). Not a theme toggle — semantic: dark *means* "recording." Consequence: onboarding, home, quests, wallet, profile, validator — all light, one system.

---

## 6. Components — built once, all states, semantic tokens only

**Button** — variants: primary (terracotta flat), secondary (bone+border), ghost (text), destructive (crimson text). Sizes: 44 / 52 / 56px height. States: default / pressed (`--action-primary-pressed`, scale .97) / disabled / loading. No gradient, no glow.

**Card** — flat (`--e-0` + border) / raised (`--e-2`, one per screen) / studio (dark). Radius `--r-md`, hero uses `--r-lg`. Default background transparent; `separated` opt-in for rare real boundary. Remove `borderLeft` prop — no colored strip.

**Amount** — tabular; decimals de-emphasized `₹127` large + `.50` at 0.55× size/opacity. `AmountBreakdown` stacks base × coverage + bonus = total.

**StatusBadge** — settled / pending / failed. **Always icon + color + label together**, never color alone. Pill `--r-full`, tinted 50 bg + 700 text.

**StatTile** (wallet bento) — label (eyebrow) + big tabular number + optional delta. Flat, border, `--r-md`.

**CoverageMeter** — horizontal segmented or continuous fill in terracotta; remaining need stated in text beside it, never implied.

**ProgressPill** — segmented `[▮▮▮▮░░░░] 4/8` for clip/turn progress.

**QuestRow** — **row, not tile**: format eyebrow + client, script excerpt in `--font-script` (the differentiator — give it room), meta (duration · clips · language), pay figure right-aligned, coverage multiplier chip. Locked variant: dimmed, lock icon, exact unlock condition. **Brand slot left empty** beside client name if structurally needed.

**RecordTrigger** — the **only** glowing element, Studio only. ≥72px, `--r-full`, terracotta, ambient pulse when active.

**ScriptDisplay** — Studio only. 20-28px, `--text-on-studio` at ≥10:1, per-script line-height, nothing ever overlapping it.

**Sheet** — translucent blurred scrim, drag 1:1, `--e-3`, rubber-band, interruptible.

**Tab bar** — translucent light material, content beneath, icon + label (never icon-only).

**Separator** — 6px waveform replaces hairline rules where needed.

**MoneyState** — pending vs settled (Wise pattern).

---

## 7. Layout patterns

* **One hero per screen** — one `--r-lg`, one moment of scale. Everything else subordinate.
* **Sticky bottom CTA** — scroll-edge gradient mask behind it, thumb-zone.
* **Section rhythm** — eyebrow + content, 32-40px between sections, breathing room.
* **Brand placeholder** — if present, sits in app bar as empty geometric slot (max 28×28, `--r-sm`, `--t-bone-100` fill), never competes with money figure.

---

## 8. Home ≠ Wallet — enforcement

| Home — "what should I do right now?" | Wallet — "what happened to my money?" |
|---|---|
| Today's earning as emotional hero (one 48px ₹) | Full picture — **no giant hero ₹** |
| Primary record CTA (names job + pay) | Bento: **Available · Pending · This week · Total** |
| 2–3 recommended campaigns (rows) | One weekly earnings bar |
| Needs-attention (rejected clip, missing UPI) | Optional highlight: quality bonus this month |
| Coverage/standing progress toward next unlock | UPI destination + withdraw (exact gap if below ₹100) |
| Recent activity (last 3, compact) | Full ledger, tabs: All / Earnings / Withdrawals |

If both screens have a 48px+ ₹, design is wrong. Wallet's hero is the bento grid, not a number.

---

## 9. System construction order (for Make)

A design system is this, in dependency order:
1. **Primitives** — raw values §1.1, §2, §3
2. **Semantic tokens** — meaning §1.2 (components use *only* these)
3. **Components** — built once, all states §6
4. **Patterns** — how components combine §7-8
5. **Rules** — guardrails §0, §5, money-color rule, one-hero rule

*Components reference semantics, semantics reference primitives* — 80% of what makes it a system.
