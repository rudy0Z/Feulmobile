# Feul → UI Rebuild Proposal

**Date:** 2026-08-31
**Status:** Proposal. Nothing in this file has been implemented.
**Scope:** The visual/UI layer only. Product, economics, and trust decisions stay in the master brief.

---

## 0. What this file is

This file **supplements** the existing plans. It does not replace them. It exists because a
full audit of the shipped code (30–31 Aug 2026) produced findings that need to live next to
the plan rather than inside it.

| File | Status | Authoritative for |
| --- | --- | --- |
| `REDESIGN-MASTER-BRIEF.md` | **Unchanged — stays authoritative** | Product reframe, economics (§9), trust design (§10), roles (§11), screen scope (§12), edge cases (§13), case-study beats (§16) |
| `EXECUTION-PHASES.md` | **Unchanged** | Sequencing and scope triage |
| `DESIGN-SYSTEM.md` | **Partly superseded** — see §4 | Colour, type, spacing intent |
| `FIGMA-MAKE-PROMPTS.md` | **Amended** — see §10 | Build tooling |
| `clay-visual-upgrade.md` | Retired (G2 dead end, §1.1) | — |
| **This file** | **New** | Plan→code gap analysis, component-layer rebuild, audio identity, and the decisions made in the 30–31 Aug design review |

**How to read it:** §1 is the finding that matters most. §2–§6 are the proposals. §7 records
decisions already locked. §8 lists what still blocks. §9 is the order of work.

---

## 1. The headline finding — the plan was right, the code ignored it

The single most useful thing to come out of the audit: **`REDESIGN-MASTER-BRIEF.md` already
specifies almost everything we spent two days rediscovering.** The problem is not plan
quality. It is plan→code fidelity.

| Plan says | Code actually does | Gap |
| --- | --- | --- |
| §6.2 — body base is **16px**, "never smaller, any device"; 14px is *not* the base | 12px × 163, 14px × 93, 16px × 49 | **Inverted.** 3.3× more 12px text than 16px |
| §6.2 — **48px hero number**, **64px "the money moment"**, one per screen max | Only 2 declarations ≥40px in the whole app: `RewardClaimFlow.tsx:303` (40px, screen slated for deletion) and `KeyboardGrade.tsx:47` (48px, a validator variant) | **The plan's most important typographic object does not exist in the contributor app** |
| §6.2 — 11-step hand-tuned scale | 902 declarations across **32 distinct sizes**; 15 sizes used only 1–3 times each | No scale implemented |
| §6.3 — per-script line-height tokens | ✅ **Implemented** (`--lh-deva`, `--lh-latin`, `--lh-taml`) | — |
| §7.1 — 4pt spacing scale | ✅ Tokens exist (`--space-1` … `--space-9`) — but **77 off-grid declarations** (3, 5, 7, 9, 11, 13, 15px) | Partly honoured |
| §7.2 — "only ONE `--r-lg` object per screen" | `Home.tsx` alone has **16 `borderRadius` declarations** | Not honoured |
| §7.3 — "most cards should have no shadow at all" | **122 `boxShadow` declarations**; the `Card` component hardcodes one | Directly contradicted |
| §7.4 — springs, not keyframes | ✅ **Implemented** (`motion/react`, `springs.tap`) | — |

**Summary: 3 of 8 honoured, 5 not.** And the two that were ignored hardest — the 16px body
floor and the 48/64px money moment — are the exact two the brief calls out as
highest-leverage.

### Correction to an earlier claim

During the audit I stated that "the token layer has no type scale and no spacing scale."
**That was wrong about the plan, and partly wrong about the code.** The spacing scale does
exist (`--space-1…9`). What is missing is a *type scale* as tokens. The plan specifies one
(§6.2) and the code uses 32 ad-hoc sizes instead. Corrected here so it doesn't propagate.

---

## 2. Where the "AI look" actually comes from

The brief §1.2 diagnosis was *"token discipline ≠ visual direction. Both are needed; only one
exists."* The audit confirms this and locates it precisely.

### 2.1 Measured tells

| Tell | Count in `src` | Verdict |
| --- | --- | --- |
| `1px solid` borders | **167** | Worst offender |
| `boxShadow` | **122** | Contradicts §7.3 |
| gradients | **61** | — |
| Inter / Geist / Poppins | **0** | ✅ Clean — Anek throughout |
| emoji | **44** | Concentrated in gamification surfaces (see §2.4) |

### 2.2 The smoking gun — `Primitives.tsx`

`src/app/components/ui/Primitives.tsx` is the real design system (7 primitives). The `Card`
component, lines 30–37:

```js
const base: CSSProperties = {
  background,                            // separation rung 2
  border: `1px solid ${borderColor}`,    // separation rung 4
  boxShadow: elevationShadow[elevation], // separation rung 3
  ...(borderLeft ? { borderLeft: `${borderLeft.width ?? 3}px solid …` } : {})
};
```

**All three separation mechanisms are hardcoded into one component.** That is where 167
borders and 122 shadows come from — not 167 individual decisions, but one decision repeated.

It also ships a **`borderLeft` prop defaulting to 3px**. The "coloured 3–4px left-border
strip" — on every published AI-slop tell list — is implemented as a *supported feature* of
the design system.

`TouchableRow` is the second factory: `divider = true` by default, so every list row gets a
`borderBottom`.

### 2.3 The primitives cap the hierarchy

`StatBlock` and `EarningFigure` both top out at **28px** on `lg`. `SectionHeading` display
variant is 22px at **weight 800**.

Consequence: §6.2's 48/64px money moment is **not reachable through the existing component
API**. You cannot build the brief's most important object with the brief's own components.

(Weight 800 on a display face at 22px is itself a slop tell — heavy weights at small sizes.)

### 2.4 A dead UI kit is sitting in the repo

**All 48 shadcn primitives in `app/components/ui/` are unused.** Zero importers outside that
folder — verified two ways, including a full `grep -rn "components/ui"` scan. They include
`sidebar.tsx` and `menubar.tsx`: desktop components, in a mobile app.

Why this matters beyond dead code: **shadcn's defaults are the slop** (`rounded-lg border
bg-card shadow-sm`). Dead or not, that is the reference material in your component folder,
and it is what any AI reads first when it opens this repo. Style contagion.

Meanwhile the components that *are* used are the custom ones: `Waveform` (18 files),
`RoleSwitcher` (6), `FeulLogo` (5), `Primitives` (2).

### 2.5 Corrections to the earlier audit

Two things I got wrong, recorded so they don't propagate:

1. **"Coverage model = 0 in source"** (29 Aug drift report) — wrong. `Home.tsx:267–319` has
   the district coverage meter. My grep missed it because the comment says `COVERAGE` and the
   label says `Coverage`.
2. **"emoji = 0"** (30 Aug) — wrong. True count is **44**, across 20+ files. Only 2 are in
   `Home.tsx` (⚡); the rest cluster in `Rewards`, `ValidatorRewards`, `DailyLimitReached`
   ("🔥 6 days"), `RewardClaimFlow` — i.e. exactly the gamification surfaces §9.5/§9.6 kill.

---

## 3. Positioning — what kind of app this is

This determines every reference and every aesthetic decision, so it goes before the visuals.

**Feul is not fintech.** It is gig/labour work with a payment layer. Premium-fintech
restraint (CRED, Jupiter) sells aspiration to urban, English-literate users who already
trust institutions. To a user who has heard of scams, restraint reads as **empty** — and
empty and cold look identical on a phone screen.

The design brief for this app is **density of proof**, not absence of decoration: settlement
states, pending amounts, why a clip was rejected.

### Reference tiers

| Tier | References | Borrow what |
| --- | --- | --- |
| **1 — the real peers** | Swiggy/Zomato Delivery Partner, Rapido Captain, Uber Driver, Amazon Flex | One dominant number per screen; earnings-first hierarchy |
| **2 — borrow narrowly** | **Wise** (pending vs settled) · **Robinhood** (big-number hierarchy) | Trust through state transparency. **Not** CRED or Jupiter |
| **3 — capture surface** | Voice Memos, BIGVU/teleprompter, Smule, Headspace | Prompt readability while performing; calm without emptiness |
| **4 — gap in the plan** | Aadhaar/UMANG/DigiLocker · PhonePe/GPay regional-language UPI | §10.4 low-literacy accommodations have **no visual reference anywhere in the plan**. Fix this |

### No mascot

A mascot was considered and rejected. The reason is not build time — it is that **a character
injects play into a financial relationship with a user servicing debt.** Duolingo's owl works
because the stakes are a streak.

The substitute is not a character, it is a **material**: the voiceprint (§14.1). See §5.

---

## 4. Design direction

### 4.1 Separation hierarchy — pick the cheapest rung

The card is the default container for everything in the current build. Replace with a
ladder; only escalate when the cheaper rung fails.

1. **Whitespace** — free. Default.
2. **Background shift** — 3–5% tint.
3. **Elevation** — costs a shadow.
4. **Border** — last resort, only if all three fail.

Targets: borders 167 → under 15 · shadows 122 → under 10 · gradients 61 → 0–2.

### 4.2 Implement §6.2 as tokens — do not invent a new scale

Use the brief's existing scale. It is already hand-tuned and better than anything I'd
propose: 11 · 12 · 14 · **16 (base)** · 18 · 20 · 24 · 30 · 38 · **48 (hero)** · **64 (money
moment)**.

Two non-negotiables from §6.2 worth restating because they are the ones violated:
- **16px is the floor, never smaller.** The recording script wants 20–28.
- **One 64px money moment per screen, maximum.**

### 4.3 Spacing — enforce §7.1, don't rewrite it

Tokens already exist. The work is snapping **77 off-grid declarations** (3, 5, 7, 9, 11, 13,
15px) onto `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72`. Mostly mechanical.

### 4.4 Elevation — enforce §7.3

Four tokens, and **most cards get none**. In practice: reserve shadows for transient
surfaces (sheets, popovers, the recording overlay). Static content cards get nothing.

### 4.5 Palette discipline

Terracotta + bone + one accent, at 60/30/10. Already in G4. Keep.

---

## 5. Audio identity — three registers

One accent colour, three jobs. Do not pick one trick.

| Register | What it shows | Assigned to | Why |
| --- | --- | --- | --- |
| **Waveform** | Amplitude over time | **Live capture** — recording screen, list rows | Reads instantly, animates cheap. Weakness: every audio app has one, so it cannot be *the* identity |
| **Voiceprint** | Frequency over time (§14.1) | **Identity** — profile, consent sheet, first-earning moment | **Unique per speaker.** The same phrase renders differently for every person |
| **Separation** | Many voices, untangled | **The signature** — hero payoff, ROOM quest | Grounded in our own research: Josh Talks Human-1 uses a separate channel per speaker; Indic DiarBench has 485 speakers from 189 districts. **No other audio app can claim this** |

### The blur rule

A blurred gradient layer is acceptable **only if the signal causes it**.

- A blurred render of the user's own voiceprint → **material**. Defensible.
- A pretty gradient painted behind the waveform → **decoration**. On every slop list.

Same visual result, opposite meaning. Borrowing film's term: the blur must be **diegetic**.

### The animation rule

Motion must be **event-driven, not ambient.** The waveform moves when the user speaks; it
does not loop when idle.

- It is a *work* app — people complete 40 clips in a session.
- Budget Android — continuous animation costs battery and jank.
- Honour `prefers-reduced-motion`.
- **Perf:** live `backdrop-filter` blur is expensive on low-end GPUs. Blur once, cache the
  raster. Do not blur per frame.

---

## 6. Component plan — `Primitives.tsx`

| Primitive | Change |
| --- | --- |
| **`Card`** | Remove `border` and `boxShadow` from base. **Delete the `borderLeft` prop.** Default `background` to transparent. Opt-in `separated` for the rare real boundary. |
| **`TouchableRow`** | `divider` default `false`. Keep press feedback — that part is good. |
| **`EarningFigure`** | Add `xl` = **48** and `money` = **64** per §6.2. Re-map sm 16 / md 20 / lg 24 / xl 48 / money 64. |
| **`StatBlock`** | Cap at 32 — secondary to the earning figure. Label 10.5 → 12px, tracking 0.08em → 0.06em. |
| **`SectionHeading`** | display 22 → 30, body 17 → 20. **Weight 800 → 500/600.** Drop negative tracking below 16px. |
| **`TagPill` / `StatusPill`** | 11/10.5 → 12px, weight 700 → 500, padding `3px 10px` → `4px 12px`. |
| **`Waveform`** | Promote to first-class primitive with a 6/24/56/96 size prop. Already used by 18 files. |

**Two additions:**
- `Separator` — a 6px waveform replacing hairline rules.
- `MoneyState` — pending vs settled (the Wise pattern). §10 needs this and no component
  implements it.

---

## 7. Decisions locked in the 30–31 Aug review

**Product / trust**
- **Withdrawal (§10.1):** keep the ₹100 floor, do **not** return to a free ₹50 instant
  withdrawal. Free ₹50 is the most farmable mechanic possible, proves "we give money away"
  (the scam trust-building move), and is CAC on a download with no lab revenue attached.
  Instead: **the floor becomes a promise, not a gate** — design session one to earn ₹100; if
  it falls short, top up to the floor and let them withdraw. Bounded: one-time, ≤₹50, only
  after completed work. Plus **first task pays on-submit** (one-task exception to §9.4).
- **Deletions:** present each in four steps — (1) what the mechanic did well, (2) what it
  cost this specific user, (3) what replaces it, (4) **the business cost of deleting.** Step
  4 is what makes it a senior decision.
  - *Security Reserve:* job = wallet feels safe to leave money in · cost = withholds money
    from someone who took a loan to buy the device · replaced by pending→settled · business
    cost = lower float, more frequent payouts.
  - *Streak surge:* job = come back tomorrow · cost = pays for presence not work, punishes
    the 95-hour week · replaced by district demand pulse · business cost = lose a retention
    curve you were retaining the wrong behaviour with.

**Scope**
- **Quest Creator: dropped** (not mobile-app scope).
- **Validator: stays**, but rebuilt (see below).
- **ROOM: kept.** The payoff is that the quest model reads as a **format system, not four
  features**. Walk through LINES and SCENARIO only; show ROOM as one screen plus the consent
  roll-call, and state multi-device as an **open problem you haven't solved**.

**Validator — the better setup**
Currently a reskinned contributor app. A validator's job is **a queue and a judgement**, not
an earnings journey:
- Dense list, one decision per item, no celebration, no progression.
- Metrics are **agreement rate and throughput**, not earnings.
- Validator must **not** see contributor identity or earnings history — it biases grading.
- Dual-role users need a **hard mode switch**: contributor wants encouragement, validator
  wants to reject. One app, two incompatible moods.
- *Primer (GitHub) is a legitimate reference for this surface specifically* — dense,
  authoritative, functional.

**Case study**
- Argument: **"building a gig earning platform with trust for Indian users."** Not a
  marketplace — for the user it isn't one.
- Portfolio triptych: **Sentinel = authority · LokAI = refusal · Feul = payment.**
- Must be about **design process and product design**, not prototype or dev build quality.
- Title candidates: **₹100 of trust** (recommended) / *Earning, not engaging* / *The app that
  pays before it earns trust* / *Same work, same pay.*
  Dek: *Designing a gig-earning app for Indian voice contributors who have been paid late
  before.*
- Part 6 of the 30 Aug audit (failure states) is approved content — include as light-touch
  moments, not heavy narrative.

---

## 8. Open decisions — these block

| # | Decision | Why it blocks |
| --- | --- | --- |
| 1 | **What is Home's hero?** It currently shows both a district coverage meter and earnings | Can't size a 64px money moment without knowing which one dominates |
| 2 | **Hero alignment** — `EarningFigure` defaults right-aligned (a spreadsheet convention) | Affects the whole number layout |
| 3 | **Body size: 14 or 16?** §6.2 says 16; the code is built around 12 | Bumping 14→16 risks overflow inside `PhoneFrame.tsx`, which constrains width |
| 4 | **Keep `glass` elevation?** | Glassmorphism is a named slop tell; §7.3 has no glass token |
| 5 | **Delete or quarantine the 48 dead shadcn files?** | Recommendation: delete |
| 6 | **Keep the G4 radius scale, or pull radii in?** | §7.2 wants 4 tokens and one `--r-lg` per screen; G4 shipped a wider scale |

---

## 9. Order of work

**Phase 0 — Delete first.** Screens the plan already kills or rewrites hold **272 of 902
type declarations (30%)**. Pure deletions (gamification + quest-creator) remove **201 — 22%
of the debt**, and it is the worst 22%:

| Screen | Type decls |
| --- | --- |
| `ValidatorWallet.tsx` | 38 |
| `quest-creator/QuestCreatorDashboard.tsx` | 34 |
| `ValidatorRewards.tsx` | 33 |
| `Wallet.tsx` | 33 |
| `RewardClaimFlow.tsx` | 30 |
| `Rewards.tsx` | 27 |
| `QuestCreatorApplication.tsx` | 22 |
| + 4 more | 55 |

Normalising type before deleting wastes that work.

**Phase 1 — Land §6.2 as tokens.** Type scale in `theme.css`. This is the gap with the
widest blast radius and the smallest diff.

**Phase 2 — `Primitives.tsx`.** The seven diffs in §6. Removing `Card`'s border and shadow
propagates instantly; expect screens to look unstructured until spacing is re-tuned. That is
normal — it is the whitespace-separation adjustment.

**Phase 3 — Audio identity.** `Waveform` size prop → `Voiceprint` → `Separation`.

**Phase 4 — Per-screen.** Nominate the 64px money moment, snap spacing to §7.1, raise body
text. **This is the long pole** — the type fix is *semantic, not mechanical*: every 14px
string must be re-read as "do they read this" (→16) or "scan this" (→12). ~37 screens remain
after Phase 0.

**Phase 5 — Validator rebuild.** Its own kit, per §7.

---

## 10. Build tooling — amendment to `FIGMA-MAKE-PROMPTS.md`

If this is rebuilt in Figma Make, **do not start from a community UI kit.**

- **Make Kits** (shipped 2 Apr 2026) is the right mechanism: it packages npm packages +
  published Figma Libraries (Variables/Styles) + a Markdown guidelines doc, and once
  published, every Make prompt starts from that context.
- **Make Attachments** binds PRD/Markdown, CSV/JSON, and screenshots as persistent project
  memory. §13's 17-row edge-case matrix should go in **as CSV** so generated screens carry
  real contributor cases.
- Attachments auto-generate an `Attributions.md` that ships inside the prototype. Paid
  resources don't appear in Community search.
- If a community kit is wanted regardless: **Material 3 Design Kit, "Variables + Properties"
  build** (Figma Community `1349722805300238798`) — free, variable-based, and M3 is the
  native literacy of a budget Android phone in India. Use it as a **component checklist**,
  not the look.

**Best input is already on disk:** `theme.css` (G4 tokens) as the guidelines doc,
`REDESIGN-MASTER-BRIEF.md` as the PRD, current screens as reference shots.

---

## Appendix A — Measurements

| Metric | Value |
| --- | --- |
| Type declarations | 902 total, **32 distinct sizes** |
| Type at ≤12px | 376 (**42%**) |
| Type at >32px | 21 (2.3%) |
| Sizes used 1–3 times | 15 |
| Spacing declarations | 1895 total, 32 distinct values |
| Off-grid spacing | 77 |
| `1px solid` borders | 167 |
| `boxShadow` | 122 |
| gradients | 61 |
| Unused shadcn primitives | **48 of 48** |
| `Home.tsx` type | max 22px, median 11px, n=35 |
| Type debt in deletion candidates | 272 of 902 (30%) |
| References (§3 research) | AI4Bharat 300,000h raw / 6,000h transcribed · Indic DiarBench 485 speakers, 189 districts · Josh Talks Human-1 separate channel per speaker |
| Contributor economics (IDInsight, Jan 2026) | avg age 28 · 51% migrants · half took a loan for the device, ~⅓ of borrowers missed a repayment · ₹170/h gross → ₹115/h net → ₹75/h consistent vs ₹62.3/h casual labour |

Reproduce with `.workbuddy-ai/layout-audit.py` in the portfolio workspace (font-size,
spacing, and per-file hierarchy histograms).

## Appendix B — Corrections made during this audit

1. "Coverage = 0 in source" — **wrong**, it exists at `Home.tsx:267–319`. Lesson: grep
   ALL-CAPS + Title + lower before claiming absence.
2. "emoji = 0" — **wrong**, 44 across 20+ files, clustered in gamification surfaces.
3. "Token layer has no type scale and no spacing scale" — **wrong about the plan**; the
   spacing scale exists as tokens and §6.2 specifies the type scale. The gap is
   implementation, not specification.
4. Minified identifiers in shipped bundles (LokAI) return 0 for component names — probe with
   user-visible copy instead, not component names.
