# Design metrics baseline

Generated: 2026-09-16T13:28:43.548Z

Gate: hybrid (structural for borders/shadows, count for gradients).

| Metric | Count | Rule |
|---|---|---|
| Distinct type sizes | 8 | <= 8 (locked scale) |
| Raw font-size values | 0 | 0 (tokens only) |
| 12px instances (chrome) | 144 | <= 150 |
| Double border in one style object | 0 | 0 |
| Screens over 10 borders | 1 | 0  <-- OVER |
| Components with >1 hero shadow | 3 | 0  <-- OVER |
| gradients | 21 | <= 30 (masks) |
| raw hex in components | 0 | 0 |
| literal rgba() in components | 0 | 0 (use --*-rgb) |
| emoji in code strings | 0 | 0 |
| brand strings (Feul/Grain) | 0 | 0 |
| heuristic targets < 44px | 0 | 0 |

**Adoption ratchets** — raw values are tokens the design has not adopted yet. These can only go down.

| Metric | Count | Ratchet (baseline 2026-09-16) |
|---|---|---|
| raw spacing values | 1 | <= 0  <-- OVER |
| raw duration values | 0 | <= 0 |
| raw borderRadius values | 0 | <= 0 |
| primitive-token leaks | 11 | <= 11 |
| hand-rolled <button> elements | 114 | <= 116 |
| undefined token references | 0 | 0 |

Type tokens resolved from theme.css: caption=12, secondary=14, body=16, subhead=18, section=20, title=24, display=32, figure=48

Sizes in use: 12px x144, 14px x382, 16px x105, 18px x24, 20px x16, 24px x58, 32px x23, 48px x5

## Screens over border density
- src/app/components/Profile.tsx (11)

## Components with more than one hero shadow
- src/app/components/DialectMismatch.tsx — DialectMismatch() has 2
- src/app/components/RoomConsentRollCall.tsx — RoomConsentRollCall() has 2
- src/app/components/validator/ValidatorHome.tsx — ValidatorHome() has 2

## Examples: brand strings

## Examples: emoji

## Examples: raw hex

## Examples: literal rgba()

## Examples: raw font-size values

## Examples: double border style objects

## Examples: small targets

## Examples: raw spacing values
- src/app/components/Wallet.tsx:92 paddingBottom: 200

## Examples: raw duration values

## Examples: raw borderRadius values

## Examples: primitive-token leaks
- src/app/components/Recording.tsx:419 var(--t-terracotta-300)
- src/app/components/Recording.tsx:440 var(--t-terracotta-300)
- src/app/components/Recording.tsx:526 var(--t-terracotta-300)
- src/app/components/ui/Primitives.tsx:169 var(--t-bone-100)
- src/app/components/ui/Primitives.tsx:170 var(--t-terracotta-100)
- src/app/components/ui/Primitives.tsx:171 var(--t-bone-100)
- src/app/components/ui/RoleSwitcher.tsx:27 var(--t-terracotta-100)
- src/app/components/ui/RoleSwitcher.tsx:155 var(--t-bone-100)
- src/app/components/validator/grading-variants/SegmentedControl.tsx:11 var(--t-bone-100)
- src/app/components/validator/ValidatorTasks.tsx:21 var(--t-bone-100)
- src/app/components/validator/ValidatorTasks.tsx:22 var(--t-bone-100)

## Examples: UNDEFINED token references