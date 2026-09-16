# 24 — Visual Improvement Scope (42-Reference Audit · read-only)

Date: 2026-09-16 · Mode: **audit only — zero code changes in this pass**. Every fix below lands later through the normal verification harnesses (smoke / metrics / shots).

## Sources compared

- 42 reference JPGs in `D:\Downloads\Mobile Devices\New folder (2)` (mappings per `plans/08-VISUAL-REFERENCE-MAP.md`) — all viewed this pass. Refs are structure/tone donors, never skins.
- Current-state renders: `docs/audit/` (26), `docs/audit/after/` (8), `docs/audit/taste/` (12). The taste set is the comparison baseline.
- Owner's own phone screenshots (ZIXO finance ×4, Workify onboarding ×1) treated as the personal quality bar: warm-paper restraint, one accent, everything real, one flat illustration style.

## Verdict

Structure and money typography are already at reference level. What still holds perceived quality at ~6/10 is not layout — it is four systemic issues:

1. **Visible placeholders** where refs have real content ("Illustration reserved" dashed box, faint ring art, bare avatar dot).
2. **Accent drift** — terracotta + green + amber + teal co-appearing on single screens.
3. **Dock-zone crowding** — warnings/CTAs clipped under the floating dock on 4+ screens.
4. **Two screens too empty for their moment** — Studio dark field, Credited dead zone.

## Cross-cutting directives (fix once, applies everywhere)

**X1 · Replace every reserved/placeholder art slot with honest data art or owner art — P0**
- Market top: dashed "Illustration reserved" box. Donor: Workify screenshot — 120–140px flat warm-paper illustration, one per screen. Either the owner supplies the illustration set, or the slot is removed and the headline moves up; a production screen must never show a dashed reserved box.
- Jobs coverage hero: concentric rings are too faint to read as intentional. Use the job's real coverage signal (district fill mini-map, or a 24-bar waveform of a sample line) at 2× current contrast.
- Home avatar: bare warm dot reads unfinished. Use initials on a terracotta-tint tile — matches the Profile RM treatment.

**X2 · One accent per screen; semantics second — P1**
- Doctrine: terracotta is THE accent; ink is money; green only for verified/consent states; amber only for flags.
- Home shows teal milestone icon + green amounts; Profile shows green bar + terracotta chip + brown link in one viewport; Dialect carries amber + green + terracotta. Retune: milestone icon to terracotta tint; amber flags to ochre (warmer, bone-adjacent); green stays only where it means verified/consent/paid.

**X3 · Dock-safe bottom rhythm — P0**
- The floating capsule dock (donor: word-bars ref) overlaps content on Home (section title clipped), Wallet (Withdraw under dock), Room consent (warning line + CTA half-covered), Recognition (locked-perk text cut). Reserve a 96–104px bottom inset on every scroll screen; the last interactive element must clear the dock by ≥16px.

**X4 · Money moments stay exact — protect while fixing — P0 (one item)**
- Hero numerals with muted decimals already match the bills/staking donors. One offender: the ₹0 chip in the Studio header — a zero that isn't honest reads as a bug. Show the real earn preview (e.g. ₹12 base for the 8-line set) or remove the chip.

**X5 · The waveform is the brand's honest ornament — P1**
- Feul's one legitimate "illustration" is real audio data. Credited: show the accepted clip's own 24-bar waveform as a small stamp under +₹12 (donor: waveform-play ref). Studio: layer transcript (24) + translation (16) under the orb, per the orange-orb capture ref. Both are real content, not decoration.

**X6 · Type family — owner decision, not a fix item**
- The high-end taste pass would ban the current neutral sans and ask for a characterful grotesque (refs lean characterful; it visibly helps perceived craft). Doctrine locks the scale, not the family. Owner call: keep current family (zero risk) or adopt one characterful display face for 28+ headlines only.

## Per-screen scope

**1 · Market / Auth** — render 01 ↔ login-stack, onboarding, Workify refs
- Good: headline pair, trust pill, Google 56 + Phone/Email 56 stacking, single-CTA discipline.
- Gap: reserved-art box (X1).
- Do: land owner illustration or drop the slot; headline sits at ~34% viewport height.

**2 · Home** — render 02 ↔ to-do/trend, greeting-arc, activity refs
- Good: earned hero (tabular numerals, muted paise), terracotta context CTA, milestone copy.
- Gaps: no greeting moment (refs open with greeting + name/progress); bare avatar (X1); teal drift (X2); "Pick…" clipped by dock (X3); Active/Needs are equal cards — the 2×2 donor wants hierarchy.
- Do: greeting block (14 + 20), initials avatar, accent retune, dock inset, re-weight the two status cards toward "Needs you".

**3 · Wallet** — render 03 ↔ wallet/Add-money ref, ZIXO shots
- Good: Available hero + delta chip, In-review/This-week split, total strip.
- Gaps: mini bar chart is all grey — ZIXO highlights exactly one bar (today/max) in the accent; UPI row cramped ("Name matched" chip crowds); Withdraw under dock (X3).
- Do: single-highlight bar, roomier UPI lockup (check inline), dock inset.

**4 · Jobs** — render 09 ↔ chips/hero ref, priority-list ref, cases ref
- Good: search 52 + chips 44 + filter circle, coverage hero proportions, Quick Lines with real Hindi lines, price right-aligned.
- Gaps: hero art faint (X1); pinned/locked tier rows not verifiable in this render.
- Do: hero art to a real coverage signal at 2× contrast; verify locked-row states against the cases donor next shots pass.

**5 · Brief** — render 11 ↔ scan/stepper ref, start-session ref
- Good: earn table (Base / Quality bonus / You earn), meta row, quote card.
- Gap: "Hear a sample read" pill breaks the card's left edge — the waveform donor keeps the sample-play lockup inside its card with a 24-bar thumb.
- Do: pull the sample chip inside the quote card; attach the 24-bar thumb + 64 play treatment.

**6 · Studio capture** — render 12 ↔ orange-orb capture ref (primary), paused-overlay ref
- Good: orb + rings on #201611, progress pills, 15 cm distance chip.
- Gaps: middle is a void — donor layers transcript 24 + translation 16 under the orb; ₹0 chip (X4).
- Do: transcript/translation layer slots (X5); honest earn chip; keep dark contrast (no grey-on-grey).

**7 · Room consent** — render 06 ↔ sheet refs, privacy-disclosure ref
- Good: explainer card (correct single hero), row anatomy, Waiting state with mic + QR actions.
- Gap: warning line + CTA clipped (X3). Do: dock inset only.

**8 · Silent-room review** — render 07 ↔ timer ref, priority ref
- Good: lane timeline is the most distinctive component in the app; honest money math (₹220 struck → "Can't count").
- Gaps (minor): "Speaker 1" label wraps awkwardly beside the muted-mic icon; timestamp row not tabular-aligned.
- Do: label column width + tabular figures. P2.

**9 · Dialect dispute** — render 08 ↔ privacy-sheet tone
- Good: claim → detected → adjusted narrative; ₹144 struck → ₹90 honesty.
- Gap: amber + green + terracotta trio (X2). Do: ochre retune; green only on the adjusted-payout panel.

**10 · Profile** — render 04 ↔ albums ref, professional-header ref
- Good: flat avatar + verified chip, stats strip, standing copy.
- Gaps: green bar + terracotta chip + brown link in one viewport (X2); Craft rows and Data Vault albums below the fold — verify against the segmented-progress and albums donors next shots pass.
- Do: accent retune; two verification captures (Craft, Vault) next pass.

**11 · Recognition** — render 10 ↔ coverage-context ref
- Good: standing hero, perk anatomy, locked-perk honesty.
- Gaps: locked text clipped by dock (X3); the sparkle section marker is decorative noise — a plain 18 "Perks" matches the refs better.
- Do: dock inset; drop the sparkle.

**12 · Credited** — render 05 ↔ restraint ref, receipt ref, ticket/barcode ref
- Good: centered +₹12, single CTA + text link, honest sub-line.
- Gap: ~400px dead zone mid-screen; the receipt donors earn the moment with an artifact.
- Do (X5): the clip's own waveform stamp under the amount. Alternative: perforated micro-receipt only if the owner wants a payout-style receipt here; default is the waveform stamp.

## Priority matrix

- **P0 — perceived-quality blockers:** X1 placeholder art (market box, hero rings, avatar) · X3 dock insets (4 screens) · X4 ₹0 chip.
- **P1 — temperature & density:** X2 accent retune (Home, Profile, Dialect) · X5 waveform stamps (Credited, Studio layers) · Wallet single-highlight bar · Brief sample chip.
- **P2 — verification & polish:** Jobs locked-row states · Profile Craft/Vault captures · Silent-room label fix · Recognition sparkle.
- **Owner decisions:** X6 type family · market illustration set supply.

## Non-goals this pass

No code changes (owner instruction). No new screens. No palette overhaul — tokens hold; only accent discipline changes. Studio stays #201611. Wallet stays light.

## Expected outcome

With P0+P1 applied, the four systemic issues disappear and perceived quality lands where the structure already earns (~8.5). The two owner screenshots remain the bar: warm restraint, one accent, everything real.
