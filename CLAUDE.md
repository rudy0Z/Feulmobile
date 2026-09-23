# CLAUDE.md - AI agent entry point

> Any AI coding agent (Claude Code, Cursor, Copilot, etc.) opens here. This file routes you; the plans/ docs decide.

## What this repo is

Unshipped **portfolio case-study mobile app**: a gig-earning platform where Indian contributors record voice clips that build datasets for AI labs. Stack: **Vite + React + TypeScript + Tailwind v4 + pnpm**. Desktop shows the prototype inside a phone shell; the real design target is a ₹9k Android at 360px, used in daylight.

**The product has no final name.** The brand slot stays an empty placeholder (`BrandSlot` component) or the literal `[PRODUCT]`. **Never render the strings "Feul" or "Grain" in UI.**

## Authority chain (on conflict, higher wins)

1. `plans/MASTER-BLUEPRINT.md` - build authority (locked decisions, screen specs, anti-slop rules, 05-deltas)
2. `plans/HANDOFF-NEW-SESSION.md` - read this FIRST for any build session (Tier 1 scope, build order, gates)
3. `plans/PORTFOLIO-DIRECTION.md` - what the portfolio case study needs
4. `plans/07-CONCEPT-LOCK.md` - product language ("job, not quest"), lifecycle, creator scope marker
5. `plans/01-DESIGN-SYSTEM.md` - token + style source of truth
6. `plans/04-ISSUE-MAP.md` - P0/P1/P2 issue list with file:line evidence
7. `plans/archive/` - **history only, never build input**

Product concept updates: update `07-CONCEPT-LOCK.md` in the same session the owner changes it, then re-check copy surfaces.

## Non-negotiables

- **Semantic tokens only.** Components reference `var(--surface-*)`, `var(--text-*)`, `var(--action-*)`, `var(--state-*)`, `var(--money-*)`, `var(--r-*)`, `var(--e-*)`, `var(--font-ui/script/number)`. No raw hex outside `src/styles/theme.css`. No legacy aliases (purged; do not reintroduce).
- **Grounds:** light Bone everywhere. `--surface-studio` (dark) exists ONLY on the recording Capture screen. Dark is never an emphasis device.
- **One hero per viewport:** exactly one `--r-lg` + `e-2` object per screen; everything else `r-md`/`r-sm` + `e-0/1` + 1px `--border-subtle`.
- **Touch targets >= 44px** everywhere interactive; record trigger 84px. **Body text 16px floor** on every device.
- **Money is ink** (`--money-figure`), never orange. Terracotta = action / money-in-motion, <= 10% of any light screen.
- **State colors never alone:** always icon + label. Contrast floors: script >= 10:1, body >= 7:1, secondary >= 4.5:1, disabled >= 3:1 + reason.
- **Consent before mic:** native-language DPDP consent sheet strictly precedes any microphone use, including calibration. Verbatim: "Under DPDP Act 2023, you can delete your voice data anytime. Money paid is never clawed back."
- **No emoji as UI.** Lucide icons (1.75-2 stroke) with labels; icons never solo for nav/status.
- **No hardcoded data:** no frozen dates (`new Date(2026,2,31)`), no demo personas (Alex/Priya/Ramesh), no magic balances - use session profile + relative dates.
- **Reachability rule:** no state ships unless reachable in-flow without DevPanel.
- **Motion:** springs on touch (sheets 0.8/0.3, meters 1.0/0.4), 120/180/280ms cross-fades elsewhere, press scale .97 on pointer-down, reduced-motion respected per component. Never ambient loops; waveform moves only while sound happens.
- **Real signals only:** mic level comes from the real AnalyserNode (`src/app/lib/useRealMicLevel.ts`) - never a simulated waveform.

## Commands

```
pnpm install            # setup
pnpm dev                # vite dev server (phone shell on desktop)
pnpm build              # production build - must pass before any commit
pnpm metrics            # design-metrics baseline -> plans/design-metrics-baseline.md
```

Run `pnpm build` + `pnpm metrics` after visual changes; keep the baseline trending toward targets (sizes 25 -> 11, <=12px 241 -> ~60, borders 188 -> <15, shadows 116 -> <10, gradients 26 -> 2, raw hex 17 -> 0, targets <44 -> 0).

## Repo map

- `src/styles/theme.css` - THE token source (primitives `--t-*` + semantics). Only file allowed to contain hex.
- `src/app/components/` - screens (Home, QuestFeed->Jobs tab, Wallet, Recording, RejectedTask/Repair, PayoutFlow, Profile, edge states) + `ui/` primitives (Primitives.tsx is the component factory) + `validator/` (Tier 3, `.theme-verdigris` scope).
- `src/app/lib/` - quests data + pay formula (`questTotal` in quests.ts), session, rejection taxonomy, `useRealMicLevel`.
- `scripts/design-metrics.mjs` - discipline metrics (see Commands).
- `plans/` - authority docs. `archive/` - quarantined dead code (shadcn kit, retired screens). **Do not import from archive/.**

## Definition of done for any UI change

- [ ] `pnpm build` exit 0
- [ ] No new raw hex / off-scale type sizes / legacy token references
- [ ] 320px no overflow; 150% text considered; daylight (300-nit) contrast holds
- [ ] Contrast floors verified (DevTools color-contrast + vision-deficiency emulation for terracotta-vs-crimson)
- [ ] `pnpm metrics` run; counts not worse
- [ ] Copy follows `07-CONCEPT-LOCK.md` (job language; brand placeholder)
