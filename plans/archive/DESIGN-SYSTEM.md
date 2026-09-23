# Design System — [PRODUCT] (Feul redesign)

> **This is the single source of truth for how the app looks and behaves.**
> Written to be handed to Figma Make (or any generator) as-is: every value is
> concrete, every rule is a directive. If a screen and this doc disagree, this
> doc wins.
>
> **Name**: OPEN, deferred to last on purpose. "Stoke" was tried and rejected
> 2026-08-27 ("didn't feel fitting"). Working shortlist: GRAIN / FLINT / CORPUS
> — revisit once Tier 1 screens (`EXECUTION-PHASES.md` §Scope triage) are
> built, so the name can be judged against a real product. Use `[PRODUCT]` as
> a literal placeholder everywhere until then.
> **Last updated**: 2026-08-27.

---

## 0. The one-paragraph brief (read first)

A light, warm, honest earning app for Indian voice-data contributors on budget
Android phones. It borrows **Revolut's structural discipline** — huge confident
numbers, one clear focus per screen, generous negative space, almost no chrome —
and renders it entirely in a **warm light palette**, never dark. The **only**
dark surface in the entire app is the recording Studio, where dark is functional
(it signals "you are recording" and keeps the script legible), not decorative.
Depth comes from **elevation and warmth**, never from glow or gradient fills.
The emotional target is **quiet competence** — a person who did honest work and
can see exactly what it earned them.

**Three things this system forbids, because they killed earlier versions:**
1. No dark theme anywhere except the Studio capture screen.
2. No gradient-filled pill buttons, no decorative glows, no emoji as UI.
3. No two screens doing the same job (see §8: Home ≠ Wallet).

---

## 1. Color

Two layers. **Components reference semantic tokens only — never a primitive
directly.** This is what lets the system stay consistent and swap cleanly.

### 1.1 Primitives (raw values, never used directly)

Warm, oklch-derived ramps. Hex given for generator convenience.

```
/* Terracotta — the brand. Work in motion, primary action, money moving. */
--t-terracotta-50:  #FBEEE6
--t-terracotta-100: #F6D9C7
--t-terracotta-300: #EFAE86
--t-terracotta-500: #E06C3A   /* BASE */
--t-terracotta-600: #C4622D   /* deep — button fills, pressed */
--t-terracotta-800: #8E4520

/* Carbon — warm near-black. Text on light; the Studio ground. */
--t-carbon-900: #201611   /* primary ink */
--t-carbon-700: #5C4A3E   /* secondary ink */
--t-carbon-500: #8A7563   /* muted ink */
--t-carbon-300: #B5A595   /* faint / disabled ink */
--t-carbon-200: #E9E0D6   /* border */
--t-carbon-100: #F1EAE0   /* divider */

/* Bone — warm off-white grounds and surfaces. */
--t-bone-0:   #FFFFFF   /* raised card */
--t-bone-50:  #FAF7F2   /* page ground */
--t-bone-100: #F4EEE5   /* sunken */

/* Verdigris — settled / verified / trust earned over time. (cool anchor) */
--t-verdigris-50:  #E8F0EC
--t-verdigris-500: #3D6B5E
--t-verdigris-700: #2E5245

/* Ochre — pending / in review. A wait, not a warning. */
--t-ochre-50:  #F6F0DC
--t-ochre-500: #C8922E
--t-ochre-700: #9A6E1E

/* Crimson — error / rejected. Pushed to hue ~15, dark, so it never reads
   as terracotta. */
--t-crimson-50:  #F7E4E4
--t-crimson-500: #8E2434
--t-crimson-700: #6E1926
```

> ✅ The cool anchor is **verdigris**, locked 2026-08-27 (see EXECUTION-PHASES
> §Phase 0 for the reasoning — "both colors are about material transformation,
> one by fire, one by time"). If it's ever revisited, it's a one-line swap of
> this ramp only — nothing downstream changes, since every component
> references the semantic token, never the hex.

### 1.2 Semantic tokens (this is what components use)

```
/* Grounds & surfaces */
--surface-ground:   var(--t-bone-50)     /* the page */
--surface-raised:   var(--t-bone-0)      /* cards */
--surface-sunken:   var(--t-bone-100)    /* insets, script preview wells */
--surface-studio:   var(--t-carbon-900)  /* ONLY the recording screen */

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

/* State (always paired with an icon + label, never color alone) */
--state-settled:  var(--t-verdigris-500)
--state-pending:  var(--t-ochre-500)
--state-failed:   var(--t-crimson-500)

/* Money */
--money-figure:   var(--t-carbon-900)   /* the number itself is ink, not orange */
--money-positive: var(--t-verdigris-700)
--money-pending:  var(--t-ochre-700)

/* Structure */
--border-subtle:  var(--t-carbon-200)
--border-strong:  var(--t-carbon-300)
--divider:        var(--t-carbon-100)
--focus-ring:     var(--t-terracotta-500)
```

**Money-color rule (important):** the money *figure* is ink (`--text-primary`),
not terracotta. Terracotta marks the *action* to earn it and money *in motion*.
A settled amount is ink; a credited delta is verdigris; a pending amount is
ochre. This keeps orange rare and meaningful.

### 1.3 The 60/30/10 discipline

Per light screen: **60% Bone** (ground + surfaces), **30% Carbon** (text, rules,
structure), **10% Terracotta** — and verdigris/ochre/crimson live *inside* that
10% as small state slices. If a screen is more than ~10% orange, it's wrong.

---

## 2. Typography

### 2.1 Families

```
--font-ui:      'Anek Latin', 'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;
--font-script:  'Anek Devanagari', 'Anek Tamil', system-ui, sans-serif;  /* the read-aloud script; swap to Mukta only if it underperforms at 20-28px */
--font-number:  'Anek Latin', system-ui, sans-serif;  /* always with tabular figures */
```

Numbers always set `font-variant-numeric: tabular-nums` so ledgers align.

### 2.2 Scale (size / line-height / tracking)

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
| `text-money-hero` | 52 | 1.0 | −0.025em | the big earned figure (tabular) |
| `text-money-max` | 64 | 1.0 | −0.03em | first-earning celebration only |

### 2.3 Indic rule (do not skip)

Devanagari and Tamil need **~15% more line-height** than Latin at the same size,
and read ~1–2px smaller optically — bump them up. Implement per-script:

```
--lh-latin: 1.5;
--lh-deva:  1.72;
--lh-taml:  1.72;
```

### 2.4 Responsive

Design at **360px first** (dominant Indian Android). Two discrete scales, no
fluid `clamp()`: at <360, step *display sizes* down one notch only — **body
stays 16px on every device.** Spacing flexes, type steps.

---

## 3. Spacing, radius, elevation

### 3.1 Spacing — 4pt

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72`. Page gutter: 20px (16 at <360,
24 at ≥390).

### 3.2 Radius — 4 only

```
--r-sm:   8px    /* chips, tags, small controls */
--r-md:   14px   /* cards, inputs, list rows */
--r-lg:   24px   /* THE ONE hero object per screen */
--r-full: 999px  /* pills, avatars, record trigger */
```

**Rule: exactly one `--r-lg` object per screen.** This is how hierarchy is
created without shadows. Everything else is `--r-md` or smaller.

### 3.3 Elevation — mostly flat, M3-informed

Depth is surface + subtle two-layer shadow, never a heavy blob. Shadow color is
carbon-tinted, never pure black.

```
--e-0: none                                                        /* default for most rows/cards */
--e-1: 0 1px 2px rgba(32,22,17,.05)                                /* inputs, chips */
--e-2: 0 1px 3px rgba(32,22,17,.06), 0 8px 20px -6px rgba(32,22,17,.08)  /* the one hero object */
--e-3: 0 2px 6px rgba(32,22,17,.08), 0 16px 32px -10px rgba(32,22,17,.12) /* sheets, modals */
```

- Most cards get **`--e-0`** — separation comes from a `--border-subtle` 1px
  rule, not a shadow.
- **No gradient fills on buttons.** Flat `--action-primary`, with a 1px inner
  top highlight (`inset 0 1px 0 rgba(255,255,255,.18)`) at most.
- Depth = warm surfaces layered + one raised hero, not glow.

---

## 4. Motion

Springs for anything the finger touches; short easings for fades only.

```
--ease: cubic-bezier(0.2, 0, 0, 1);
--d-fast: 120ms;  --d-base: 180ms;  --d-slow: 280ms;
```

| Interaction | Spring (damping / response) |
|---|---|
| Bottom sheet (drag, interruptible, rubber-band) | 0.8 / 0.3 |
| Coverage meter / progress fill | 1.0 / 0.4 |
| Money count-up on credit (from live value if re-interrupted) | 1.0 / 0.4 |
| Button/card press feedback (on pointer-**down**) | 1.0 / instant |
| Locked-card tap (small refusal bounce) | 0.8 / 0.2 |
| Tab switch | cross-fade, 120ms (no slide) |

**Rules:** feedback on pointer-down not release; sheets track 1:1 and are
grabbable mid-close; only the Studio record trigger has a continuous ambient
animation; money counts up once, never loops; respect `prefers-reduced-motion`
with a named fallback per component (fills become instant, sheets cross-fade).

---

## 5. The light-only doctrine (and its one exception)

Every screen uses `--surface-ground` (Bone) **except the Studio capture screen**,
which uses `--surface-studio` (Carbon). This is not a theme toggle — it is
**semantic**: dark *means* "recording." The defensible line:

> *"I didn't build a dark mode. I made darkness mean one thing — you're
> recording. If the wallet could also be dark, dark would stop meaning
> anything."*

Consequence: onboarding, home, quests, wallet, profile, validator — all light,
all one system. Do not introduce a second dark surface for "premium feel."

---

## 6. Components

Each is built once with all states, referencing semantic tokens only. Key ones:

**Button** — variants: primary (terracotta fill), secondary (bone + border),
ghost (text), destructive (crimson text). Sizes: 44 / 52 / 56px height. States:
default / pressed (`--action-primary-pressed`, scale .97 on pointer-down) /
disabled / loading. **No gradient. No glow.**

**Card** — flat (`--e-0` + border) / raised (`--e-2`, one per screen) / studio
(dark). Radius `--r-md`, hero uses `--r-lg`.

**Amount** — tabular; decimals de-emphasized (`₹127` large + `.50` at 0.55×
size/opacity). `AmountBreakdown` stacks base × coverage + bonus = total.

**StatusBadge** — settled / pending / failed. **Always icon + color + label
together**, never color alone. Pill, `--r-full`, tinted 50-level bg + 700-level
text.

**StatTile** (wallet bento) — label (eyebrow) + big tabular number + optional
delta. Flat, border, `--r-md`.

**CoverageMeter** — horizontal segmented or continuous fill in terracotta; the
remaining need stated in text beside it, never implied by the bar alone.

**ProgressPill** — segmented `[▮▮▮▮░░░░] 4/8` for clip/turn progress.

**QuestRow** — a **row, not a tile**: format eyebrow + client, script excerpt in
`--font-script` (the differentiator — give it room), meta line (duration ·
clips · language), pay figure right-aligned, coverage multiplier chip. Locked
variant: dimmed, lock icon, exact unlock condition.

**RecordTrigger** — the one glowing element in the app, and only in the Studio.
≥72px, `--r-full`, terracotta, ambient pulse when active.

**ScriptDisplay** — Studio only. 20–28px, `--text-on-studio` at ≥10:1 contrast,
per-script line-height, nothing ever overlapping it.

**Sheet** — translucent blurred scrim (not opaque), drag 1:1, `--e-3`, rubber-
band, interruptible.

**Tab bar** — translucent light material, content scrolls beneath, icon + label
(never icon-only, for low-literacy users).

---

## 7. Layout patterns

- **One hero per screen** — one `--r-lg` object, one moment of scale. Everything
  else subordinate.
- **Sticky bottom CTA** uses a scroll-edge gradient mask
  (`linear-gradient(to bottom, transparent, ground 30%)`) behind it, never a 1px
  hard divider.
- **Section rhythm** — eyebrow label + content, generous vertical space between
  sections (32–40px), Revolut-style breathing room.
- **Touch targets** ≥44px; recording controls ≥72px.

---

## 8. Home ≠ Wallet (no repeated info)

The single most important IA rule. They answer different questions.

| **Home** — "what should I do right now?" | **Wallet** — "what happened to my money?" |
|---|---|
| Today's earning as the emotional hero (one big ₹) | The full financial picture — **no giant hero ₹** |
| Primary record CTA (names the job + pay) | Bento: **Available · Pending · This week · Total** |
| 2–3 recommended campaigns (rows) | One honest weekly earnings bar |
| Needs-attention (rejected clip, missing UPI) | Optional highlight row: quality bonus this month |
| Coverage/standing progress toward next unlock | UPI destination + withdraw (with exact gap if below ₹100) |
| Recent activity (last 3, compact) | Full ledger, tabs: All / Earnings / Withdrawals |

Home shows a **single** today figure. Wallet shows the **breakdown** and never
repeats a giant hero number — its "hero" is the bento grid, not one ₹. If both
screens have a 52px ₹, the design is wrong.

---

## 9. How this doc becomes a design system (for learning)

A design system is exactly this, in order of dependency:
1. **Primitives** — raw values with no meaning (§1.1, §2, §3).
2. **Semantic tokens** — meaning mapped onto primitives (§1.2). Components use
   *only* these, so you can restyle the whole app by editing one layer.
3. **Components** — built once, all states, referencing semantic tokens (§6).
4. **Patterns** — how components combine into screens (§7, §8).
5. **Rules** — the guardrails that keep it coherent (§0, §5, the "money-color
   rule", "one hero per screen").

To make your own: start at the top, never skip to components, and never let a
component hardcode a raw value. That single rule — *components reference
semantics, semantics reference primitives* — is 80% of what makes a design
system a system instead of a pile of styles.
