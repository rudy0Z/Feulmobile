# Feul — Full Contextual Handoff → Build Session

> **For:** a fresh session (no prior chat) tasked with building Tier 1 from the locked plan.
> **Read order:** this file → `MASTER-BLUEPRINT.md` → `01-DESIGN-SYSTEM.md` → `03-EDGE-CASES.csv` → `04-ISSUE-MAP.md`.
> **Authority rule:** on any conflict between docs, `MASTER-BLUEPRINT.md` (incl. §10 deltas from 05 audit) wins. Archive docs are history, never build input.

---

## 1. Project in one paragraph

Feul is an unshipped portfolio case-study app: Indian gig contributors record voice clips to build AI datasets for labs (illustrative Sarvam AI / AI4Bharat / Bhashini, no affiliation). Thesis: labs buy **coverage** (speaker × dialect × district × acoustic condition), not hours. Economics: same work = same base pay (`total = round(base × coverageMult) + bonus`); standing (New/Verified/Trusted/Elite) changes access + settlement speed only. No Security Reserve, no streak surge. ₹100 withdrawal floor reachable in session one. Consent (native-language, DPDP-valid, with verbatim `Under DPDP Act 2023, you can delete your voice data anytime. Money paid is never clawed back.`) strictly before any mic use. Target: ₹9,000 Redmi/Realme/Galaxy A, 360px default (320 compact, 390-430 large), 300-nit LCD, 38°C daylight, greasy glass — plus iPhone via progressive enhancement (same IA/layout, flat/static low-end vs blur/spring/haptic high-end). Doctrine: Bone daylight trust, Carbon Studio-only recording meaning, acoustic instruments not illustrations, quiet competence.

## 2. What has been decided (locked — do not reopen)

1. Ground Bone `#FAF7F2`, Studio Carbon `#201611` (`t-carbon-900`). No full dark, no Hearth charcoal object. (05 proposed `#12100E` — rejected: crushes on LCD.)
2. Asset strategy B: acoustic telemetry + data infographics. Zero decorative illustration/mascot/stock/3D. Functional icons: Lucide 1.75-2 stroke, never icon-only for nav/status.
3. Home hero conditional: active-session resume card when in flight, else one 48 ink today-figure + next-job CTA. Never waveform/voiceprint hero on Home.
4. Type `11/12/14/16/18/20/24/30/38/48/64` (body floor 16, tabular numerals, `lh-deva/taml 1.72`); teleprompter default 26. Radius `8/14/24/999` one `r-lg` per viewport. Elevation `e-0/e-1/e-2/e-3/e-glow` carbon-tinted two-layer (`e-1` single-shadow version stands); glow = Studio trigger only.
5. Waveform identity (5 registers, one family): Live (Studio, real mic) / Scrub (Review interactive) / Thumb (24px static per clip) / Separator (6px divider, 1/viewport) / Lanes (Room 4-lane) + seeded radial Voiceprint (Profile/consent/first-earn). Geometry: 3px bar + 3px gap, r-full caps, 4px resting floor, 32px cap. States: resting carbon-700 / active terracotta-500 / crest ochre-500 / clipping crimson + `step 15cm back` / validated verdigris. Engine `AnalyserNode fft128` RMS, single 2D canvas. Event-driven only.
6. Studio additions: telemetry bar (Exit · Turn x/y · ₹ accumulated · mic-distance OK as icon+label), inline single-turn repair banner + NoisePause overlay for sustained breach, posture guide `Keep phone 15cm`, VAD/manual Room cue advance (never 3.4s timer).
7. Wallet: bento not hero, weekly bar tappable filters ledger, UTR in settled detail, exact-gap withdraw, `Expected by [relative date] · 2-3 days` (never INSTANT IMPS).
8. Brand placeholder slot only: empty `28×28 r-sm bone-100` geometric or literal `[PRODUCT]` neutral type. Zero Feul/Grain strings in UI.
9. Copy: job-naming primary CTAs exempt from ≤15 caps (`Record Marathi Phrases · ₹15` stays, never truncated). Nav/short actions obey Jony caps.
10. Process: Jony artifact discipline + checkpoints; better-design precision/review rules; ElevenLabs interaction patterns restyled (never imported); Revolut structure only (never skin).

## 3. Repo map (where things live at `e352a79`)

- `src/styles/theme.css:1-615` — two-layer tokens (Layer 1 primitives `12-46`, Layer 2 semantics `53-86`) BUT legacy aliases alive `88-195,220-247,309-312` (deprecated — do not reference). Radii `215-218`, elevation `236-240`, fonts `305-317`, validator scope `.theme-verdigris 328-350`.
- `src/app/components/ui/Primitives.tsx:1-821` — `Card 43-64` (still has `borderLeft` + legacy elevations — must fix), `Amount/Breakdown 253-322`, `StatusBadge 326`, `QuestRow 544-605`, `RecordTrigger 662-691` (84px, pointer-down), `Sheet 769-802` (blur 88%), `BalanceBlock 746-767` (48 hero).
- `src/app/components/Home.tsx:1-252`, `Wallet.tsx:1-242`, `Recording.tsx:1-711` (fake `useMicLevel 264-273` must go), `QuestFeed.tsx:1-285`, `Onboarding.tsx:1-265`, `Profile.tsx:19-395`, `RejectedTask.tsx:1-257` (alpha-0 bug `:76`, dark hero, glow CTA), `Rewards.tsx`, `PayoutFlow.tsx:1-374` (frozen `2026-03-31` dates `:201,260`, hardcoded balances `:24-27`), `RoomConsentRollCall.tsx`, `CoverageFullState.tsx`, `DialectMismatch.tsx`, `MainApp.tsx:27-78` (icon-only inactive tabs — must fix), `PhoneFrame.tsx:5-46` (DEV chrome — gate/strip), `validator/ValidatorHome.tsx` (unmigrated — exclude or rebuild `.theme-verdigris`), `lib/quests.ts` (pay single source `questTotal`), `routes.tsx:1-159` (9 edge routes live, retired redirects, creator retired).
- `src/app/lib/quests.ts:70-72` pay formula; `pickedForYou` valid ids only.

## 4. Information architecture + journeys (condensed)

IA: `/` Market→Auth→OTP→Language→Home-empty; `/contributor` tabs Home/Quests/Wallet/Profile; `/recording/:id` Brief→Capture(dark)→Review→Pending; `/rejected/:id` Repair; 9 edge routes (`room-consent, coverage-full, campaign-closed, dialect-mismatch, session-interrupted, silent-room, campaign-oversubscribed, quality-dispute, battery-warning`); validator scope-reduced; creator retired → redirect.

J1 first session <4min → ₹100 path (₹50 calibration + ₹50 task). J2 returning loop Home↔Quests↔Studio↔Wallet. J3 Room high-stakes (consent roll-call + minor gate → one-take → lanes review → resume on interrupt). J4 repair/dispute/offline/spoof with in-flight-honoured promise. Full prose: `MASTER §4`; poster: `MASTER §10.8`.

## 5. What each Tier 1 screen must have (acceptance pointers)

Home: market line (not greeting), conditional hero (resume vs 48 today), CTA names job+pay, 2-3 QuestRow rows, needs-attention, milestone with exact path, coverage context, recent 3. Quests: search 48, chips 44, sections, QuestRow 2-line script clamp, TierGate aspirational + LOCK_CAP 2, honest empty. Brief: full breakdown, sample playback, battery warn. Capture: 26 script ≥10:1 nothing overlapping, real levels, telemetry, inline banner, 84 trigger pointer-down, pause/cancel. Review: static thumbs + play any. Pending: expected-on-approval ochre. Wallet: bento, filtering weekly bar, UTR detail, gap-exact withdraw. Payout: 6-box OTP-style rigor, NameMatch ceremony, relative-date expectation. Repair/RoomConsent/Coverage/Dialect per `03 states_to_generate`. Profile: Standing + Craft sheet + Coverage-context (Craft currently missing — must add). Full spec: `MASTER §6`.

## 6. Gating issues (demo killers — `04-ISSUE-MAP.md`)

P0: fake mic levels; button 3.83 / pending 2.76 / muted-11px 4.09 contrast; Repair dark hero + alpha-0 + glow; ₹100 math unproven in code; rarity-gaming unwired; edge states DevPanel-only; brand strings (`FeulLogo`, `Let Feul…`, `Grow with Feul`, `Hey night owl`, `Spanish`, hardcoded `Alex/127.5/2026-03-31`); reachability rule (no state ships unless reachable without DevPanel). P1: legacy aliases, 25→11 type, Card factory, double heroes, dark-as-emphasis, icon-only tabs, <44px controls (chips 38, Yes/No 34, presets ~36, ledger tabs 32), swipe teleport, hard-divider footers, raw hex/radii. Fix P0 before any demo; P1 in same tokens/interaction PRs.

## 7. Build order for this session (Tier 1, checkpointed)

1. Phase 1 tokens page (both grounds, no screens) → gate: no legacy refs, contrast re-measured.
2. Phase 2 gallery: all primitives + 5 waveform variants + telemetry bar + inline banner (as components).
3. Onboarding → consent-gate proof (mic unreachable until consent).
4. Home conditional hero → Studio (real AnalyserNode) → Review → Pending.
5. Wallet + payout → QuestFeed → Profile Craft sheet.
6. `tsc --noEmit` zero → 320px/150%/daylight walk → DevPanel gate → `sync-embeds` (embed stale since 4 Aug — only after Tier 1).

## 8. First three prompts to use

1. `Build from MASTER-BLUEPRINT.md §0-§2 + Phase 1 only. Tokens page, both grounds, no screens. Pass §9 gates before Phase 2. MASTER §10 wins on conflict.`
2. `Phase 2 gallery per MASTER §6-§7: every primitive in all states (default/pressed/disabled/loading/error), both grounds, 320+430. All 5 waveform registers + telemetry bar + inline banner as components. No screens.`
3. `Tier 1 Onboarding per MASTER §5 + J1: Market→OTP-6→Language(min-height)→checklist→Consent-before-mic gate (prove mic unreachable until consent). 360 default, 320 no-overflow, 44px targets, placeholder slot empty.`

## 9. Risks + open questions for builder to flag (not silently decide)

- Studio ground `#201611` vs `#12100E`: keep `#201611`; flag if device test proves otherwise (one-token swap + contrast re-proof).
- `ochre-800` pending-text ramp value: darken until 4.5 on `ochre-50` + white; report chosen hex.
- Room cue advance: VAD/silence vs manual — implement one, state which and why.
- Validator: exclude from Tier 1 demo XOR rebuild under `.theme-verdigris` — do not demo two visual languages.
- Any `03` row whose `states_to_generate` needs a new component: propose the component (semantic tokens only) before building the screen.

## 10. Definition of done (Tier 1)

Fresh user install → credited ≥₹100 path with real sums (no hardcodes) <4min; consent precedes any mic (provable by navigating to Studio signed-out); Studio levels move with real mic and freeze in silence; every pending states its wait-reason; withdraw gap exact; no P0 open; `tsc` zero; 320px + 150% text + keyboard-only pass; `?embed=1` shows zero DEV/PhoneFrame chrome.
