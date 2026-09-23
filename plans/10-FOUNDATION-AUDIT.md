# 10 — Foundation audit (design-system review)

> **Reviewed:** `src/styles/theme.css` (the single token source), `src/app/components/ui/Primitives.tsx`,
> and token consumption across all 68 screens.
> **Benchmarked against:** Material Design 3 (`md.ref` → `md.sys` → `md.comp`) and Meta's Astryx.
> **Date:** 2026-09-16.

---

## Verdict

The token file is a genuinely good *document*. It is not yet a *system*, because four of its
five axes are defined but not enforced — components bypass them.

**Measured adoption — tokens defined vs. tokens actually used:**

| Axis | Tokens defined | Real usages | Raw bypasses | Adoption |
|---|---|---|---|---|
| Type | 8 | 717 | **0** | **100%** (locked 2026-09-16) |
| Colour (semantic) | 28 | 1,498 | 289 primitive leaks | ~84% |
| Radius | 4 | 296 | 92 raw + 18 `'50%'` | ~73% |
| **Motion** | 9 | **3** | 63 raw `duration:` | **~2%** |
| **Spacing** | 10 | **4** | **582 raw numbers** | **~0.7%** |

A token scale that is 0.7% adopted is not a scale — it is a comment. This is the same failure
mode that produced 25 type sizes, caught one axis earlier this time.

---

## What is genuinely strong (keep, do not touch)

1. **Three-layer intent is correct.** `LAYER 1 — PRIMITIVES` / `LAYER 2 — SEMANTIC` mirrors
   M3's `ref` → `sys` tiers, and it is the right call. M3 and Astryx both converge on this.
2. **Semantic colour naming is disciplined** (`--surface-*`, `--text-*`, `--action-*`,
   `--state-*`, `--money-*`, `--border-*`) and 1,498 call sites use it. Colour is the
   best-adopted axis and it is well-named.
3. **`--money-figure` is ink, not orange.** This is a real design decision encoded as a token,
   not a comment. Astryx's "guidance over enforcement" principle says opinions belong in docs —
   but an opinion that *can* be a token should be one. This is the model to copy.
4. **Elevation is carbon-tinted** (`rgba(32,22,17,…)`) rather than neutral black. M3 tints
   elevation too; Feul gets there by a different route and it is correct for a warm ground.
5. **Contrast floors are baked into the values** (`--action-primary` is terracotta-**800**, not
   500, precisely to clear 6.51:1). That is a design system doing its job.

---

## Findings, ranked by consequence

### F1 — The semantic layer is missing its container/tint half → 289 primitive leaks ⚠️ **HIGH**

This is the root cause, not a symptom. The semantic layer defines **28 tokens and zero
container variants** — no `--state-settled-container`, no `--action-primary-soft`, no
`--surface-container-*` ladder.

So when a screen needs "the settled tint" it cannot ask for it semantically and reaches
straight past the layer boundary:

| Leaked primitive | Count | What was actually wanted |
|---|---|---|
| `--t-verdigris-50` | 48 | `--state-settled-container` |
| `--t-bone-0` | 38 | `--surface-raised` (exists! — copy-paste drift) |
| `--t-verdigris-700` | 32 | `--state-settled-text` |
| `--t-terracotta-50` | 28 | `--action-primary-soft` |
| `--t-ochre-50` | 24 | `--state-pending-container` |
| `--t-bone-100` | 23 | `--surface-sunken` (exists! — copy-paste drift) |

M3 solves this with a **role + `on-role` + container ladder**. Every colour role has a
container pair; that is why Material components never reach for a palette value. Feul has the
role half and is missing the container half — so 289 leaks are structural, not sloppiness.
Note that 61 of the 289 leak to tokens that *already have* a semantic equivalent, which is
plain drift and should be zero.

### F2 — The spacing scale is off-grid with the design it governs ⚠️ **HIGH**

The scale is a clean 4pt ladder (`4/8/12/16/20/24/32/40/56/72`). The design does not use it:

```
actual values in use:  14 (card pad) · 22 · 20 · 18 · 10 · 6 · 3 · 2 · 1
on the 4pt grid:       12 · 24 · 20 · 16 · 8
```

`--card-pad: 14` is a deliberate, locked choice — and **14 cannot be expressed by a 4pt
scale**. So the scale was unadoptable from the day it was written, which is exactly why it
has 4 usages. This is not an implementation failure; it is a **specification failure**: the
scale was derived from a theory (4pt grid) instead of from the design.

Two honest resolutions:
- **(a) Re-derive the scale from reality** — `2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 20 / 24 / 32 / 40 / 56` — then adopt it. Includes the real values, so adoption is mechanical.
- **(b) Delete `--space-*`** and rely on the component geometry tokens (`--gutter`, `--card-pad`, `--gap`, `--row`, `--cta`…), which *are* adopted and are genuinely semantic.

**Recommendation: (a), plus keep the geometry tokens.** Geometry tokens answer "how tall is a
row"; a spacing scale answers "how much air between two things". They are different questions
and both are legitimate.

### F3 — Motion scale is 2% adopted and contains dead + invalid values ⚠️ **MEDIUM**

9 tokens, 3 usages, 63 raw `duration:` literals. Specific defects:

- **Three exact duplicate aliases**: `--duration-fast` ≡ `--d-fast` (120ms), `--duration-base` ≡ `--d-base` (180ms), `--duration-slow` ≡ `--d-slow` (280ms). Six tokens, three values, zero usages on the `--duration-*` set.
- **`--ease-standard` duplicates `--ease`** — both `cubic-bezier(0.2, 0, 0, 1)`.
- **`--ease-emphasized: cubic-bezier(0.2, 0, 0, 1.2)` is out of range.** The y-axis of a cubic-bezier control point must be in `[0,1]` for a well-behaved curve; `1.2` produces an overshoot that is not the intended "emphasized" feel. M3's emphasized curve is `cubic-bezier(0.2, 0, 0, 1)` for the on-screen case and `(0.05, 0.7, 0.1, 1)` decelerate.
- **No exit/enter distinction.** M3 pairs duration *with* direction (enter = decelerate, exit = accelerate). Feul has 3 durations and no directional pairing, so every animation is hand-tuned at the call site — hence the 63 literals.

### F4 — Elevation tokens hardcode raw `rgba()` inside the token file ⚠️ **MEDIUM**

`theme.css:182–185` — `--e-1`, `--e-2`, `--e-3` use `rgba(32,22,17,…)` and `--e-glow` uses
`rgba(224,108,58,…)`, even though `--carbon-rgb` and `--terracotta-500-rgb` exist for exactly
this. The metric script exempts `theme.css` (correctly — it is the token source), so this was
never caught. **This is an inconsistency introduced by the 2026-09-16 rgba sweep**: 151
component call sites were fixed, the token source was not.

### F5 — Raw hex sits inside the semantic layer ⚠️ **MEDIUM**

`LAYER 2` is documented as "what components reference — maps to Layer 1". Four tokens violate
that contract by holding literals:

- `--text-on-accent: #FFF6EF` · `--text-on-studio: #FBEFE4`
- `--secondary-foreground: #FFFFFF` · `--destructive-foreground: #FFFFFF`

A semantic layer that contains raw values cannot be re-themed by swapping Layer 1 — which is
the entire point of having layers. M3's `on-primary` maps to `ref.palette.primary100`; it never
holds a literal.

### F6 — Type tokens are size-only, so a "style" is not a token ⚠️ **MEDIUM**

`--fs-*` carries size and nothing else. Weight, line-height and tracking are re-decided at
every call site. M3's `md.sys.typescale.title-medium` bundles **five axes** (font, weight,
size, line-height, tracking) as one role.

This is why 25 sizes accumulated: there was no such thing as "a heading" to reach for, only
"a number", so each screen invented one. The 8-step scale fixes the *symptom*; composite
tokens prevent the *cause*.

Feul also has the harder problem M3 does not: **two scripts with different line-heights**
(`--lh-latin 1.5` vs `--lh-deva 1.72`). A composite type token must be script-aware, which is
a genuine improvement on M3's model rather than a copy of it.

### F7 — Dead scaffolding ⚠️ **LOW**

Empty section headers with no tokens: "LEGACY RAMPS" (5 sub-sections), "Legacy radius aliases",
"Legacy shadow aliases", "Status surface pairs". Plus `--text-on-navy` (an alias to
`--text-on-studio` for a navy that no longer exists) and `--font-size: 16px` (a shadcn leftover,
unrelated to the scale). Roughly 20 lines of structure describing a system that is not there.

### F8 — No component-token tier, and no gate on any of this ⚠️ **MEDIUM**

M3 has `md.comp.*`; Feul goes primitive → semantic → component code. At 68 screens that is
defensible — but the *reason* it is defensible is that component-level decisions (row height,
card padding, trigger size) were already promoted to geometry tokens. The gap is that nothing
enforces it, and the metrics script has **no row for spacing, motion, radius, or primitive
leaks** — which is precisely why four axes rotted unnoticed.

---

## Comparison to the references

| Dimension | M3 | Astryx | Feul | Verdict |
|---|---|---|---|---|
| Token tiers | 3 (`ref`/`sys`/`comp`) | theme = CSS custom property overrides | 2 (primitive/semantic) | Feul is 1 tier short; acceptable at this scale, but container roles are missing (F1) |
| Colour roles | role + `on-role` + container ladder | themed per brand | role only | **Gap — F1** |
| Type | 15 roles × 5 axes, +15 emphasized | — | 8 sizes, 1 axis | **Gap — F6** |
| Shape | 10 stops (0→48 + full) | — | 4 stops (8/14/24/999) | Off-grid but deliberate; fine |
| Elevation | tonal surface colour; shadow only when floating over busy content | — | shadow-only, 4 levels | Feul has tonal grounds *and* shadows but does not link them |
| Motion | 16 durations × 6 easings, directional pairs, springs | — | 3 durations × 3 easings, 2 dead | **Gap — F3** |
| Theming | swap system tokens | CSS custom property overrides | same approach | ✔ correct architecture |
| Enforcement | — | "guidance over enforcement" | metrics script | ✔ ahead of both on enforcement |

**Where Feul is genuinely ahead:** it is the only one of the three with a *mechanical discipline
gate*. Astryx explicitly chooses "guidance over enforcement". Feul has both a written doctrine
and a script that checks it. That is the right instinct — it just needs the script to cover
more axes (F8).

---

## Remediation plan

| # | Fix | Effort | Why now |
|---|---|---|---|
| R1 | Add container/tint semantic tokens (`--state-*-container`, `--state-*-text`, `--action-primary-soft`, `--surface-container-*`), then repoint the 289 leaks | M | Kills the structural cause; unblocks every later screen |
| R2 | Re-derive `--space-*` from real values; add a gate row for raw spacing | M | 582 bypasses is the largest single drift |
| R3 | Fix motion: delete 3 duplicate aliases, repair `--ease-emphasized`, add enter/exit pairs, add a gate row | S | 63 literals, and one invalid value ships today |
| R4 | Retrofit `--e-1/2/3/glow` to `var(--*-rgb)` | S | Closes the sweep's own gap |
| R5 | Move the 4 raw hex values out of Layer 2 into Layer 1 | S | Restores the layer contract |
| R6 | Add composite, script-aware type tokens (`--type-*` with size/line-height/weight) | M | Prevents the 25-size failure recurring |
| R7 | Delete dead scaffolding (~20 lines) | S | Removes false signals |
| R8 | Extend `design-metrics.mjs` with rows for spacing, motion, radius, primitive leaks | M | Without this, R1–R6 rot again |

**Sequence:** R4, R5, R7 (cheap, no behaviour change) → R1, R3 → R6 → R2 → R8.

---

## Remediation applied — 2026-09-16

| # | Status | Outcome |
|---|---|---|
| R1 | ✅ **DONE** | Added 13 container/emphasis tokens (`--state-settled/pending/failed-container`, `-text`, `-deep`, `-on-studio`, `--action-primary-soft`, `--action-accent`, `--text-on-dark`). **Primitive leaks 289 → 11 (−96%).** Every repoint was value-identical, so not one rendered pixel changed — only the layer boundary moved. |
| R2 | ✅ **DONE** | `--space-*` re-derived as a **2pt micro-grid** matching the design (0/2/4/6/8/10/12/14/16/20/24/28/32/40/56/80). Ratchet row added at 620. |
| R3 | ✅ **DONE** | Removed 3 duplicate `--d-*` aliases; repaired `--ease-emphasized` (was an out-of-range control point); added directional easing pairs (`--ease-decelerate` / `--ease-accelerate`). Ratchet row added at 63. |
| R4 | ✅ **DONE** | `--e-1/2/3/glow` now compose from `--carbon-rgb` / `--terracotta-500-rgb`. |
| R5 | ✅ **DONE** | Added `--t-bone-25` / `--t-studio-0` primitives; `--text-on-accent`, `--text-on-studio`, `--secondary-foreground`, `--destructive-foreground` now map to Layer 1. Consolidated three near-duplicate warm whites that had drifted 2–6 units apart. |
| R6 | ✅ **DONE** | Nine composite `--type-*` roles (size + line-height + weight + typeface) plus `--type-*-track`. **Script-aware** via a `.font-script` scope that re-resolves every role to the Indic leading and typeface — the piece M3 does not need and Feul cannot do without. |
| R7 | ✅ **DONE** | Removed the empty LEGACY RAMPS scaffolding, dead radius/shadow alias headers, unused `--text-on-navy`, and the shadcn `--font-size` leftover. |
| R8 | ✅ **DONE** | Gate extended from 12 → **17 rows**: added raw-spacing / raw-duration / raw-radius ratchets, primitive-token leaks, and an **undefined-token check** (every `var()` must resolve). |

### Two live bugs the audit found

**B1 — `--t-verdigris-600` was never defined, but was used 7× across 6 screens.**
`Home` (×3), `EarningCelebration` (×2), `Recording`, and the **DPDP consent shield** in
`ConsentSheet`. Every one of those declarations was silently dropped by the browser, so the
settled/success marks rendered in whatever colour they inherited. Fixed by defining the stop
(`#35604F`, 6.74:1 on bone-50) and repointing the call sites to `--state-settled-text`.
The new undefined-token gate row makes this class of bug impossible to ship again.

**B2 — the spacing re-derivation broke 4 call sites.**
`--space-3` (was 12px, now 6px) and `--space-5` (was 20px, now 10px) had 4 live usages in
`Primitives.tsx`. Caught before shipping and repointed to `--space-6` / `--space-9` so the
resolved values are unchanged. *Any* renumbering of a scale must be checked against its call
sites first — the numbers moved, the meaning did not.

### Gate after remediation — all 17 rows green

`pnpm build` exit 0. Type sizes 8 · raw font-size 0 · 12px 123 · double-border 0 · >10 borders 0 ·
>1 hero shadow 0 · gradients 24 · hex 0 · literal rgba 0 · emoji 0 · brand 0 · sub-44px 0 ·
undefined tokens **0**. Ratchets set at measured baselines: spacing 620, duration 63, radius 105,
primitive leaks 11.

### Residue (deliberately left, with reasons)

- **11 primitive leaks** — 6 × `--t-bone-100` used as warm ink on the studio ground, and
  5 decorative accent tints (`--t-terracotta-100/300`). Neither has a clean semantic home yet;
  inventing one would be worse than the leak. Revisit when the Studio and celebration screens
  are rebuilt in Wave 3/4.
- **620 raw spacing values** — the scale is now *adoptable* (it contains the real values), but
  adoption is a screen-by-screen pass, not a blind codemod: rounding `3 → 4` and `7 → 8`
  changes layout, and that needs eyes on it. Ratcheted so it cannot grow.
- **105 raw radius values** — same reasoning; `--r-sm/md/lg/full` are only 4 stops and the raw
  values include deliberate one-offs.

---

## The honest summary

The foundation is roughly **one half built**: colour and type are real systems, spacing and
motion are decoration, and the semantic layer is missing the container half that would let
components stop reaching past it.

None of that is wasted work — the naming is right, the layers are right, and the discipline
gate is an idea neither M3 nor Astryx ships. But "the tokens exist" and "the tokens are used"
are different claims, and only the second one is a design system. The fix is not to add more
tokens; it is to **close the layer and make the gate cover every axis** so this cannot recur.
