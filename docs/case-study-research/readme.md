# Feul ([PRODUCT]) — Case-Study Research Set

> Internal working documentation for building the portfolio case study (the "business study"). Generated 2026-09-16 from the latest code in this repo. Analysis only — no screens or code were changed.

## What's in this folder

| Doc | Contains |
|---|---|
| [01-user-journey-map.md](01-user-journey-map.md) | Contributor day-0→steady journey (10 stages, emotions, pain→answer index), room-take micro-journey, validator journey |
| [02-user-flows.md](02-user-flows.md) | 6 core flows as mermaid diagrams: first earn, record a job, withdraw, rejection loop, room take, validator loop |
| [03-empathy-maps.md](03-empathy-maps.md) | Says/Thinks/Does/Feels for 3 personas (contributor, validator, lab) — **inferred, no user research exists** |
| [04-information-architecture.md](04-information-architecture.md) | Full screen inventory (FEU-00…FEU-59), hierarchy, navigation model, quotable navigation rules |
| [05-state-path-catalog.md](05-state-path-catalog.md) | Every screen/state with transitions: session machine, payout machine, home data-states, C-01…C-23 edge registry, cross-reference |

## How to use the IDs

- **FEU-nn** = canonical screen ID (defined in 04, reused everywhere).
- **C-nn** = the owner's edge-case ledger ID from `plans/03-EDGE-CASES.csv` (design answers included there).
- Every doc cross-links; the state catalog (05) cross-references IA (04) bidirectionally.

## Top case-study-ready insights (quotable)

1. **"Consent is a route, not a sheet"** (owner decision D-3): full-screen native route, deliberately outside the app dock, doubles as the signed-out proof URL — the single sharable design decision in the trust story.
2. **An economy you can read:** pay = base × coverage-multiplier + bonus, shown on every brief; tier changes access + settlement speed, never clip pay ("same work, same pay"). The rarity premium even gets its own honest redirect when your demographic is full (C-02).
3. **23 edge cases designed as first-class screens** (C-01…C-23): each with trigger, UI state, and copy direction — every rejection pairs with a redirect, every failure names its stakes ("₹220 + 4 people's evening"), nothing hides behind a spinner.
4. **A shared rejection taxonomy used in both directions** (validator flags ↔ contributor repair), 8 closed reasons, each = sentence + why + fix, 6 recoverable / 2 structural.
5. **One money machine, two roles:** contributor and validator share `PayoutFlow` and reward-claim with role-aware back-paths; honesty gates (UPI name-match, spoofing hold with appeal) sit before money moves.
6. **Honor economics as product mechanics:** in-flight submissions honoured when campaigns close or labs cancel (C-03/C-16) — platform absorbs lab withdrawal; consent revocation deletes data but never claws back settled money (C-05).

## Positioning alignment (from latest copy outline)

- This is **the business study** (market framing, earning design, unit economics, trust-as-retention, fraud-as-churn, consent as market enabler) — ~3 min read, ~2,000–2,200 words target.
- AI rule: AI appears only as infrastructure (labs need coverage; recording is the job). Never a chatbot.
- Product name deliberately open — `BrandSlot` renders a placeholder; refer to it as codename `[PRODUCT]`.
- Draft to write against: `D:\Portfolio\case-study-copy\feul-copy-v3-OUTLINE.md`.

## Open questions / flags for Rudraksh

1. Screens FEU-19, FEU-20, FEU-25, FEU-27/28, FEU-32/33, FEU-44–46 exist in code but have **no screenshot** in `docs/audit/` — shoot before the case study references them visually.
2. `PRODUCT.md` referenced by the docs chain does not exist at repo root in the latest draft (positioning lives in `PORTFOLIO-DIRECTION.md`).
3. A file named `03-EDGE-CASES.csv` inside `src/imports/` is actually a binary (mislabeled PNG) — the real ledger is in `plans/`.
4. Empathy maps and journey emotions are inferred from the design's own copy — if real user research exists elsewhere, these should be reconciled.
5. Dev-only surfaces (DevPanel FEU-51, grading variants pills/arc/keyboard/binary) are exploration instruments — decide whether the case study shows them as process evidence.
