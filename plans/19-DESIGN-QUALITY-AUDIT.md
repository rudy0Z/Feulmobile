# 19 — Design-quality audit (visual, vs. docs + 42 refs)

> **Date:** 2026-09-16 · **Method:** rendered the real app in Chromium at 360×780, captured 26
> screens/states (`docs/audit/*.png`), reviewed each against `08-VISUAL-REFERENCE-MAP.md`,
> `08-PHASE-1..4`, and the handoff brief. Written because the owner called the current look
> "AI slop, 0 quality" — this doc takes that seriously and answers with specifics.

---

## §0 Verdict

**The owner is right, and the earlier green gates were measuring the wrong thing.**
`build`/`metrics`/`smoke`/`shots` prove the app is *disciplined* (tokens, touch targets, no
overflow, renders clean). None of them measure whether it is *good*. Looked at as pictures,
the screens are structurally faithful to the phase docs but visually sterile: no imagery, no
warmth, placeholder dots on the three most-seen screens, several fold-collision artifacts, and
demo data that contradicts itself across surfaces. That combination is exactly what reads as
"AI-generated."

**Grades (honest):**

| Axis | Grade | Why |
|---|---|---|
| IA / spec compliance (4 phase docs) | **8.5/10** | Nearly every specced element exists and is reachable; states are real |
| Discipline (tokens, a11y, gates) | **9/10** | 8-size scale, 0 raw hex, 44px floor, 36/36 no-overflow |
| Typography | **7/10** | Locked scale reads clean; disabled CTAs are muddy tan; ghost numbers borderline |
| **Visual richness / art direction** | **3.5/10** | Zero illustrations, zero warm moments, grey placeholder dots dominate first impressions |
| Demo-data coherence | **5/10** | Surfaces contradict each other (₹0 available vs +₹58 week; New/0 profile vs Trusted/207 performance) |
| Perceived finish | **5/10** | Sticky-CTA overlap on Wallet, hard-clipped chips/tiles, light status bar on the dark Studio |
| **Overall perceived quality vs. refs** | **≈ 5.5–6 / 10** | "Correct skeleton, missing soul" |

**Where the design is genuinely good (not slop):** the Studio (`08-capture3` — #201611,
telemetry, orb+rings, big bone script), Jobs (`06` — hero, script rows, ink pay), Brief
(`07`), the silent-room speaker timeline (`21`), the dialect trust story (`19`), session-
interrupted (`20`), validator after de-legacy (`23/24`). These prove the system *can* look
right when a screen has one strong idea.

---

## §1 Where it went wrong — root causes, tied to the docs

1. **The refs were used as skeleton donors only.** The brief says "structure/tone donors —
   restyle to tokens, never import skins." The build took that as *borrow layout, ignore
   tone*. The refs' actual tone — Wise/Revolut big-number confidence, ZIXO restraint-with-one-
   -highlight, warm-paper illustrations — never made it in. Result: faithful wireframes.
2. **The reserved image slots render as grey dots.** `08-VISUAL-REFERENCE-MAP` earmarked the
   Workify ref: *"small 120–140px flat warm-paper illo, one per screen. Owner image slots
   later."* No screen has any illustration; Market's most prominent element is a dashed
   "Illustration reserved" box, and `BrandSlot` renders a grey square/circle on Market, Home
   and Profile. First impressions are literally placeholder glyphs.
3. **Austerity decisions compounded.** Owner-locked choices — terracotta-800 CTAs for contrast
   (V4), warm 20% in only three places, gradients banned except masks, Bone-everything — are
   *correct for trust* and together they sand off all personality. What's left is cream + white
   cards + dark-brick buttons on every screen. The docs allowed "one highlight per screen";
   the build often delivers zero.
4. **Gates can't see composition.** `overflow=0` means the *document* doesn't scroll
   sideways; it says nothing about content pinned under the fixed dock/CTA at rest, or a chip
   row clipping mid-glyph. Several "looks broken" artifacts pass every gate.
5. **Demo states were optimized for honesty, not storytelling.** Session-derived zeros are
   truthful, but Wallet shows ₹0.00 available next to "+₹58 this week" (ledger const), Credited
   says "+₹12 … wallet total ₹0", Performance claims Trusted/207 while Profile says New/0. Each
   defensible; together incoherent.
6. **Half-finished sweeps.** Personas were purged from Wallet/Profile/RejectedTask but still
   live in the edge screens (Priya, Anil, Asha, Ravi, Meena, Iqbal). The no-persona rule is
   documented; execution stopped halfway.

---

## §2 Defect list (evidence = `docs/audit/*.png`)

| # | Sev | Defect | Evidence | Where |
|---|---|---|---|---|
| D1 | **High** | Wallet: sticky withdraw stack (gap line + button) renders **on top of** the All/Earnings/Withdrawals tabs at rest; reads as broken overlap | `11-wallet.png`, `11b-wallet-live.png` | `Wallet.tsx` sticky block vs tabs order |
| D2 | **High** | No illustration/warm moment anywhere; dashed "Illustration reserved" dominates Market; `BrandSlot` grey dot on Market/Home/Profile | `01-market.png`, `05-home-empty.png`, `15-profile.png` | `BrandSlot.tsx`, Onboarding/Home/Profile |
| D3 | **High** | Demo-data contradictions: wallet ₹0 available vs ₹58 week; Credited "+₹12 / total ₹0"; Performance Trusted/207 vs Profile New/0 | `11-wallet.png`, `26-credited.png`, `16-performance.png` vs `15-profile.png` | Wallet LEDGER consts, Performance static copy |
| D4 | Med | Hard clipping at edges: Jobs chips ("Interv…"), Language tiles right column, Home checklist third row behind dock | `06-jobs.png`, `03-language.png`, `05-home-empty.png` | chip row fade, language grid, checklist |
| D5 | Med | Light status-bar band on the dark Studio kills the mood in every capture | `08-capture3.png` | `PhoneFrame.tsx` IOSStatusBar |
| D6 | Med | Disabled CTAs are muddy tan (Verify, Start earning, Continue) — reads washed-out, not "off" | `02-otp.png`, `03-language.png`, `12-payout-amount.png` | `Button` disabled variant |
| D7 | Med | Personas remain in edge screens (Priya/Anil/Asha/Ravi/Meena/Iqbal) against the no-persona rule | `17`, `20`, `21` | 9 edge files |
| D8 | Low | Profile avatar fallback is a big terracotta circle with a tiny dot (initials '·'); title "Your profile" generic | `15-profile.png` | `Profile.tsx` avatar/name fallbacks |
| D9 | Low | Review rows all "Line N / 0:01" in capture flow — monotony + reads fake | `09-review3.png` | Review labels/durations |
| D10 | Low | Consent sticky CTA visible over the fold while DPDP verbatim sits below (open item V3) | `04-consent.png` | `ConsentGate.tsx` |
| D11 | Low | Validator ghost "94.8%" very low contrast (decorative, borderline) | `23-validator.png` | `ValidatorHome.tsx` hero |

---

## §3 State audit (end-to-end) — what exists vs what's missing

**Built and verified rendering (26 captures):** Market · OTP-6 · Language · Consent (route +
sheet) · Mic prime · Home empty/pending/live · Jobs (+locked TierGates, empty via DevPanel) ·
Brief → Capture (calibration + main) → Review → Pending → Repair (`/rejected`) · Wallet
empty/live, ledger tabs, week filter, detail sheet · Payout (UPI → name-match → amount →
confirm → success receipt) · Rewards locked/unlocked · Profile (stats, Standing, Craft sheet
empty, Data Vault albums + revocation receipt) · Performance · 9 edges (room-consent partial
state included) · Validator home/queue-empty/grading (+4 grading variants in dev) ·
Celebration · Credited · Notifications empty.

**States implemented but not yet visually captured:** 150% browser text, keyboard-only
focus-ring pass, `?w=320` full sweep (shots cover 320 but not 150% zoom), reduced-motion
diff, forced-colors.

**States that exist but read wrong (the real gap):** the fresh-session zeros (celebration
+₹0, credited wallet ₹0, wallet ₹0 + this-week ₹58) and mid-scroll chrome collisions —
i.e., the states are *reachable*, they're just not *directed*.

---

## §4 De-slop plan (prioritized; improving later is cheap as the owner said)

| # | Fix | Effort | Unblocks |
|---|---|---|---|
| 1 | **Drop the owner's onboarding art into the reserved slots** (Market illo, Home hero accent, Profile avatar block). Until art exists, replace `BrandSlot`'s bare dot with a designed warm-paper placeholder (tinted tile + acoustic-line glyph) so nothing renders as "missing" | S | kills the #1 slop signal on 3 screens |
| 2 | **Wallet fold fix**: move tabs *below* the sticky stack's breathing room or make the stack collapse the gap-line into the button on scroll; verify at rest | S | removes the worst artifact (D1) |
| 3 | **One signature moment per screen** (the ZIXO rule): Home = milestone progress bar with exact path; Profile = craft bars (already good) + named greeting; Market = the illo. No new tokens needed — compose existing ones | M | de-templates Home/Profile/Market |
| 4 | **Demo-data director**: one seeded "demo session" story (₹122 chain → in-review ₹25 → credited) used consistently by Wallet/Home/Credited; Performance switches to session-derived or is labeled "sample data" | M | coherence across surfaces (D3) |
| 5 | **Edge clipping**: give chip rows a visible fade + peek; language grid → 1-col at 360 or horizontally-centered 2-col; ensure checklist clears the dock | S | D4 |
| 6 | **Dark chrome**: dark status-bar variant when the Studio mounts | S | D5 |
| 7 | **Disabled button redesign**: `--surface-sunken` fill + `--text-faint` label + dashed border option; kill the muddy tan | S | D6 |
| 8 | **Finish the persona purge** in the 9 edge files → neutral names ("Guest", "Speaker 2") or session-derived | S | D7 |
| 9 | **Profile identity**: name-first header, initials avatar with proper fallback, "Your profile" only when truly anonymous | S | D8 |
| 10 | Review rows: real per-line labels from `questContent` + varied durations in the demo flow | S | D9 |

Items 1–3 change perceived quality the most per hour spent; 4–10 are hygiene.

---

## §5 One-line statement

*Every gate I celebrated measured discipline, and the app is disciplined — but the owner's
eyes are also a gate, and on that gate the build scores ~6/10: structurally faithful to the
phase docs, visually starved by empty art slots, card monotony, fold collisions, and
incoherent demo zeros. The fix list above is small, concrete, and mostly composition — not a
rebuild.*
