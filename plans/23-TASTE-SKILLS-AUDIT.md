# 23 — Taste-skills audit & fixes (emil-design-eng · react-native-patterns · impeccable · gpt-taste)

> Skills read in full this session from `~/.agents/skills/`: `emil-design-eng` (28 KB),
> `impeccable` (+ `reference/craft-floor.md`), `react-native-patterns` (20 KB), `gpt-taste` (8 KB).
> Applied against the Feul mobile app; fixes shipped in code; every claim below is re-checked by
> `scripts/verify-taste.mjs` + `scripts/verify-chrome.mjs` + the three gates.

## §0 Transfer decision (each skill, honestly)

| Skill | Verdict | Why |
|---|---|---|
| **emil-design-eng** | **Applies fully** | Interaction/animation craft is framework-agnostic. Every rule inspected: scale entries, easing, durations, transition property discipline, press feedback, popover origin, reduced motion. |
| **impeccable** | **Applies, with craft-floor overrides** | Its craft floor is the strongest signal in the set. 3 overrides recorded: Feul's locked `r-lg=24` (floor prefers 12–16), the mandated Lucide icon set (floor prefers purpose-chosen icons), and the dark Studio (floor: pick light/dark from the use scene — Feul does; the Studio IS the recording scene). Everything else enforced. |
| **react-native-patterns** | **Partially applies (adapted)** | Feul is a **web React** prototype styled as a phone, not React Native — so Expo/router/nativewind guidance is N/A. Its transferable core was enforced: device chrome/safe-area theming, 44pt targets, press states, list perf, keyboard-safe forms. |
| **gpt-taste** | **Partially applies (explicitly bounded)** | It is authored for scroll-driven marketing pages (AIDA, GSAP pinning, marquee, parallax, hero H1 max-w). Adding those to a task/earnings app would be the slop it warns about. Carried over: no meta-kickers, no emoji, button contrast, gapless lists, generous vertical rhythm, no cloned L/R blocks. **Not carried over, by design:** GSAP/pinning/parallax/marquee (documented as anti-patterns for this product). |

## §1 Findings & fixes (emil's required table format)

| Before | After | Why |
|---|---|---|
| `initial={{ scale: 0, opacity: 0 }}` (PayoutFlow, RewardClaimFlow) | `initial={{ scale: 0.96, opacity: 0 }}` | Nothing in the real world appears from nothing |
| `initial={{ scale: 0.5 / 0.7 / 0.8, opacity: 0 }}` (GradingTask, ValidatorHome, MicPermissionDenied, BatchExpired, DailyLimitReached, Recording, ValidatorApplication) | `initial={{ scale: 0.96, opacity: 0 }}` | Below 0.9 the element reads as spawning, not arriving |
| `transition: 'all 0.2s'` ×13 (BinaryFlag, KeyboardGrade, GradingTask, ValidatorTasks/Wallet/Application, ClipUploadFailed, DevPanel) | `transition: 'background-color .2s ease-out, border-color .2s ease-out, color .2s ease-out, transform .2s ease-out'` | Specify exact properties; `all` animates layout and costs frames |
| `exit: { ease: 'easeIn' }` (motion.ts) | `exit: { ease: easings.decelerate }` | `ease-in` starts slow; the moment the user watches most |
| `border: '1px solid var(--border-subtle)'` **and** `boxShadow: 'var(--e-1)'` on the same card (33 occurrences, 32 files) | One declaration: hairline keeps the border, hero keeps the shadow | Craft floor: "Declare elevation once, border or shadow" — the pair is the ghost card |
| `borderLeft: '4px solid …'` (ValidatorRewards, RoleSelection; Card prop default `width ?? 3`) | `1px solid` | Craft floor bans colored left/right stripes above 1px |
| Eyebrow kicker `READY TO START` above the Home hero h1 | Removed; the h1 carries it | Craft floor: "A kicker or eyebrow above a heading… no brief earns it back" |
| Eyebrow kicker `REVIEW` above the Review h1 | Removed | Same ban |
| Nested card: `surface-sunken` + border box inside the Profile hero card | `borderTop: 1px solid var(--divider)` section | Craft floor: nested cards are always wrong |
| Status bar stayed dark ink over the dark Studio (`--text-device-chrome` hard-coded, inline) | `<html data-studio>` set by StudioShell; `.statusbar` colour resolved in CSS (`rgba(bone-0,.92)` on dark) | Chrome must re-theme with the surface beneath it (RNP safe-area rule); inline styles also beat the class, so both colours live in CSS |

**Verified after the fixes** (`scripts/verify-taste.mjs`, `scripts/verify-chrome.mjs`):

```
brief   →   statusbar colour rgb(32, 22, 17)      (dark ink on light)   data-studio: null
capture →   statusbar colour rgba(255,255,255,.92) (light ink on dark)   data-studio: "1"
ghostCards (border+shadow elements on Wallet) ...... 0
eyebrow kickers before any h1 (Wallet) ............. []
persona literals in components .................... 0
semantic/size bans left from the earlier slop sweep . 0
```

## §2 What the skills confirmed was already right

- Press feedback: `whileTap` scale .96–.985 on every control (emil: `:active` scale .95–.98 ✓)
- Exit faster than enter (`durations.exit` 0.2 vs `enter` 0.4) ✓
- Reduced motion: `prefers-reduced-motion` + `useReducedMotion` honoured in every beat ✓
- 44px floor, focus-visible ring, `aria-disabled` keeps the disabled reason in tab order ✓
- One authored motion moment per screen (celebration count-up); no decorative marquees/parallax ✓
- Money in tabular numerals; no gradient text; no emoji icons; no indigo; no glass stacks ✓

## §3 Open items (scoped, honest)

| Item | Skill source | Note |
|---|---|---|
| Sheet/popover `transform-origin` audit | emil | Feul sheets rise from the bottom edge; a full origin pass across `Sheet` + DevPanel is a small follow-up |
| Stagger list entrances | emil | `enterStagger` exists in `motion.ts` but is applied inconsistently |
| Spring params normalised to `{duration, bounce}` | emil | Currently stiffness/damping; equivalent, but the durable form is easier to reason about |
| `@starting-style` for entry | emil | Modern replacement for the mount-effect pattern; needs the browser-support call |
| Real-device keyboard avoidance | RNP | N/A inside the desktop phone-frame demo; matters only for a real device build |

## §4 Gate log after all taste fixes

```
pnpm build   → exit 0
pnpm metrics → 8 type sizes · 21 gradients (≤30) · 0 raw hex · 0 undefined refs · leaks 11 (≤11) · buttons 114 (≤116)
pnpm smoke   → 35/35 routes render clean
pnpm shots   → 36/36 clean, overflow=0 at 320/360/390/430
verify-taste → ghost 0 · kickers [] · personas 0
verify-chrome→ light→dark status bar flip confirmed
```

Evidence screenshots: `docs/audit/taste/*.png` (12 captures incl. the Studio chrome proof).
