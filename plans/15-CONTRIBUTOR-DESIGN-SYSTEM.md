# Contributor section — design system reference

> **Audience:** any team extending the Feul contributor surface.
> **Source of truth:** `src/styles/theme.css` (tokens) + `src/app/components/ui/Primitives.tsx`
> (components). This document describes the shipped implementation; where it and the code
> disagree, **the code wins**. No component in the contributor section may hard-code a value
> that exists as a token — the discipline gate (`pnpm metrics`) fails if it does.

---

## 1. Foundations (shared — the contributor section extends, never forks)

### 1.1 Colour
Two-layer ground: a warm **Bone** daylight ground for every light screen, and a single
functional **Carbon Studio** ground for recording only. Colour is semantic, never literal.

| Family | Tokens (examples) | Use |
|---|---|---|
| Ground | `--surface-ground`, `--surface-raised`, `--surface-sunken` | page / card / inset |
| Text | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-faint`, `--text-on-accent`, `--text-on-dark` | 4-level hierarchy |
| Action | `--action-primary`, `--action-primary-soft` | CTAs (terracotta-800, 6.51:1) |
| Money | `--money-figure`, `--money-positive`, `--money-pending` | settled / pending ink |
| State | `--state-settled[-container/-text/-deep]`, `--state-pending`, `--state-failed[-container]` | icon **+ label** always |
| Border | `--border-subtle`, `--border-strong`, `--divider` | 1px discipline |
| RGB channels | `--*-rgb` (bone-0, carbon, terracotta-50/500/600, studio-ink, scrim) | alpha without literal `rgba()` |

**Rule:** money is always ink typography. Terracotta ≤ 10 % of any light screen. Status is
never colour-only — every state carries an icon **and** a label.

### 1.2 Type scale (locked — 8 steps, the only sizes allowed)
`--fs-caption 12 · --fs-secondary 14 · --fs-body 16 · --fs-subhead 18 · --fs-section 20 ·
--fs-title 24 · --fs-display 32 · --fs-figure 48`
- 12px is **chrome only** (eyebrows, pills, timestamps) — never prose.
- `--fs-figure` (48) is the single money figure per screen.
- `--lh-deva` (1.72) applies to every `.font-script` / Indic surface.
- `theme.css` is the only file permitted a literal `font-size`.

### 1.3 Spacing — a 2pt micro-grid
`--space-0 0 · 1 2 · 2 4 · 3 6 · 4 8 · 5 10 · 6 12 · 7 14 · 8 16 · 9 20 · 10 24 · 11 28 ·
12 32 · 13 40 · 14 56 · 15 80`. Named aliases: `--gap 12`, `--gutter 16`, `--card-pad 14`,
`--sheet-top 28`.

### 1.4 Radius · Elevation · Motion
- Radius: `--r-xs 8 · --r-sm 12 · --r-md 14 · --r-lg 24 (THE ONE hero) · --r-full`.
  **Exactly one `--r-lg` + `--e-2` hero per viewport.**
- Elevation: `--e-0 none · --e-1 hairline · --e-2 hero · --e-3 overlay · --e-glow` (capture halo only).
- Motion: `durations` `120/200/300/400ms` (mirrored in `lib/motion.ts`), `easings` directional
  pairs, `springs.tap/tapHard/enter/exit/layout`, `whileTap.*`. Press scale `.97–.985`.

### 1.5 Layout tokens
`--row 68 · --cta 56 (r28) · --chip 36 · --search 52 · --filter 44 · --tap 44 · --trigger 84`.
Every interactive target ≥ `--tap` (44px); the record trigger is 84px.

---

## 2. Components (primitives the section composes from)

| Component | Key props / variants | States | Tokens consumed |
|---|---|---|---|
| `Button` | `variant` primary/secondary/ghost · `size` lg/md/sm · `full` · `icon` · `disabled`/`aria-disabled` | default, hover, focus-visible, active (whileTap), disabled (aria + reason) | `--cta`, `--r-full`, `--action-primary`, `--text-on-accent`, `--fs-secondary` |
| `IconButton` | `label` (required, a11y) · `variant` surface/plain | default, hover, focus-visible, active | `--tap`, `--r-full`, `--border-subtle` |
| `Card` | `elevation` 0/1/2 · `radius` sm/md/lg | default, hover, focus (when interactive) | `--surface-raised`, `--border-subtle`, `--r-*`, `--e-*` |
| `TouchableRow` | row shell | default, press (`whileTap.row`), disabled | `--row`, `--space-*` |
| `QuestRow` | `quest`, `locked`, `unlockHint`, `onClick` | open, locked (72 % opacity + gate), press; **script excerpt 2-line clamp** | `--r-md`, `--fs-subhead`, `--font-script`, `--action-primary-soft` |
| `TierGate` | `title`, `unlockHint` | dashed aspirational | `--surface-sunken`, dashed `--border-strong` |
| `Amount` | `value`, `size`, `color` | ink figure | `--font-number`, `--fs-*`, `--money-*` |
| `AmountBreakdown` | `basePay`, `coverageMult`, `bonus` | BASE / COVERAGE / BONUS rows; bonus is its own line | `--font-number`, `--divider` |
| `StatusBadge` | `kind` settled/pending/failed, `label` | icon **+ label** | `--state-*` |
| `TagPill` | `tone` neutral/accent/inverted | default | `--t-*` (documented primitive leaks) |
| `ReceiptCard` | `refNum`, `to`, `amount`, `date`, `onShare` | default, share | notches, dashed rule, `--font-number`, mono UTR |
| `Sheet` | `open`, `onClose`, `title` | enter/exit (`durations.enter`), scrim | `--sheet-top`, `--scrim-rgb` |
| `EmptyState` | `title`, `body`, `cta`, `onCta` | empty; honest, offers a way out | `--text-muted`, `--space-*` |
| `useCountUp(target, ms)` | hook | animates a live money value | `--font-number` |
| **`EarningCelebration`** | session total (route `/earning-celebration`) | count-up, arrived pill, one truth line | `--fs-figure`, `--state-settled-container` |
| **`EarningCredited`** *(new)* | quiet mid-session credit (route `/contributor/credited`) | credited pill, count-up, next-job CTA | same tokens; haptic on tap only |

---

## 3. State coverage (contributor surfaces)

Every component must be reachable in these states. ✅ implemented · ◻ documented-only / remaining.

| Surface | default | hover | focus-visible | active | loading | empty | error | partial | long-content |
|---|---|---|---|---|---|---|---|---|---|
| Wallet ledger | ✅ | ✅ | ✅ | ✅ | ✅ (`RowSkeleton`) | ✅ (`walletEmpty`) | ✅ (failed row) | ✅ (pending) | ✅ |
| Jobs feed | ✅ | ✅ | ✅ | ✅ | ✅ (`RowSkeleton`) | ✅ (`EmptyState`) | ✅ (`EmptyState`) | ✅ (locked gates) | ✅ (2-line clamp) |
| Job row (`QuestRow`) | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| Home | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (newcomer) | — | ✅ (pending) | ✅ |
| Payout flow | ✅ | ✅ | ✅ | ✅ | ✅ (name-match) | — | ✅ (`PaymentFailed`) | ✅ | ✅ |
| Profile | ✅ | ✅ | ✅ | ✅ | — | — | — | ◻ | ✅ |
| Rewards | ✅ | ✅ | ✅ | ✅ | — | — | — | ✅ (locked perks) | ✅ |
| Capture/Studio | ✅ | ✅ | ✅ | ✅ | ✅ (real levels) | — | ✅ (`MicPermissionDenied`) | ✅ | ✅ |
| Edges (9) | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ◻ | ✅ |

Reachability rule: **no state ships unless it is reachable without the DevPanel.** The DevPanel
is gated behind `import.meta.env.DEV` and stripped under `?embed=1`.

---

## 4. Accessibility notes
- `:focus-visible` = 2px ring, 2px offset, `focus-ring` token; `forced-colors: active` fallback.
- `prefers-reduced-motion`: springs → fades; `RowSkeleton` pulse frozen.
- Landmarks: nav has `aria-label="Primary"`; active tab carries `aria-current="page"`.
- Headings: one `h1` per screen; section titles are `h3` under it.
- Forms (UPI, payout amount): label + `name@bank` error line, disabled buttons stay focusable
  via `aria-disabled` so the reason text is announced.
- Contrast floor: script ≥10:1 · body ≥7:1 · secondary ≥4.5:1 · disabled ≥3:1 + reason.

## 5. Do / Don't
- **Do** derive money from the session; **Don't** hard-code a balance, date, or persona.
- **Do** keep one `--r-lg`+`--e-2` hero per screen; **Don't** stack two heroes (Validator card
  was demoted to `--r-md` for exactly this).
- **Do** show every status as icon + label; **Don't** signal with colour alone.
- **Do** clamp script text to 2 lines; **Don't** ellipsis a script excerpt mid-sentence.
- **Do** reference tokens; **Don't** introduce a one-off value (the gate fails).

## 6. Token dependencies added this session
**None.** `EarningCredited` and all fixes compose only from existing tokens — no new token was
invented, so the shared system is unchanged and no off-scale value was introduced.
