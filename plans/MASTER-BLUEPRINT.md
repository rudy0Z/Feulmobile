# Feul — Ground-0 Master Blueprint (Single Source of Truth)

> **Status:** LOCKED for build. Replaces all prior `plans/` docs as build input. Those remain in `/plans/_archive-reference` as history only — do not attach to Make.
> **Brand:** placeholder slot only. No Feul/Grain wordmark, logo, or copy in UI. Empty geometric slot (`28×28 r-sm bone-100`) or literal `[PRODUCT]` neutral type.
> **Target:** ₹9,000 Redmi/Realme/Galaxy A, 300-nit LCD, 38°C Maharashtra daylight, greasy glass — AND iPhone. One IA, one token system, adaptive render (flat/static low-end vs blur/spring/haptic high-end).
> **Doctrine in one line:** Warm Bone daylight trust, Carbon Studio-only recording meaning, coverage-not-hours economics, acoustic instruments not illustrations, quiet competence.

---

## 0. What you need BEFORE you start (prerequisites)

### Locked decisions (do not reopen mid-build)
1. Ground Bone `#FAF7F2`, Studio Carbon `#12100E` only. No full dark, no Hearth charcoal object.
2. Asset strategy B: acoustic telemetry + data infographics. No cartoons, no stock, no 3D per-category.
3. Home hero = conditional: active session resume when in flight, else today-figure + next job. Never waveform/voiceprint hero on Home.
4. Economics: same work same base pay. Tiers change access + settlement speed only. No Reserve, no streak surge. ₹100 floor = one guided session.
5. Consent native-language one screen BEFORE any mic, including calibration. Mic prime in-context after consent.
6. Type scale `11/12/14/16/18/20/24/30/38/48/64`, body floor 16, per-script `lh-deva/taml 1.72`, tabular numerals.
7. Radius `8/14/24/999` one `r-lg` per viewport. Elevation `e-0/e-1/e-2/e-3/e-glow` carbon-tinted two-layer, glow Studio-trigger-only.
8. Waveform identity: 5 registers (Live/Scrub/Thumb/Separator/Lanes+Voiceprint). Event-driven, never ambient loop. ElevenLabs patterns restyled, never imported.

### Tools + attachments for Make (4 files, in order)
1. This file = project memory (paste once).
2. `01-DESIGN-SYSTEM.md` cleaned = Guidelines doc for Make Kits (Variables: Primitives/Semantics collections, Light mode only).
3. `03-EDGE-CASES.csv` (23 rows) = CSV Attachment. `states_to_generate` col is what to render.
4. `04-ISSUE-MAP.md` = do-not-regress checklist (P0 must pass before demo).
- New Make project, no community UI kit base. If kit wanted: Material 3 Variables build as checklist only.
- `theme.css` legacy aliases (`radius-sm/md`, `shadow-card/glass`, `font-sans/display/mono`, `neutral/accent` ramps) are DEPRECATED — `01-*` wins on conflict.

### Reference discipline
- Revolut = structure only (one number, one focus, negative space, pending-vs-settled, quiet earn-confirm). Never skin, never dark premium, never blue accent.
- Better-design = engineering precision (spacing, 4-state matrices, review rules `get-ui-principle` + `get-review-rules`). Use Airbnb / Precision Light / Minimal Light as code ref. Never Linear/Stripe dark.
- Jony pipeline = process discipline (`ux-design/*.md` artifacts, copy caps titles ≤20 / body ≤60 / CTA ≤15 / toast ≤40, 44pt targets, bottom-CTA, safe-area, checkpoint per step). Adapt templates to Vite React (not Flutter).
- ElevenLabs UI = Studio interaction patterns only (orb states → trigger, scrolling wave → scrubber, realtime follow → Room cue, voice-fill → later). Restyle Bone/Carbon, canvas not blur-per-frame.
- Dribbble/neon/3D/crypto/banking cards = reject unless survives flat + Bone + ink + 1px rule.

### Performance + device budget
- Low-end default: `e-0`, no `backdrop-blur`, static thumbs, instant values, no per-frame glow. Must run on 2GB RAM, 300-nit LCD, 150% text, 320px width.
- High-end enhancement: blurred sheet `blur(20px) saturate(140%)`, spring interruptible sheets, count-up from live value, haptics (press light 10ms / success pattern / blocked error). Same layout, different render cost.
- Fonts: Anek Latin/Devanagari/Tamil + system-ui fallback. No Jakarta in new screens. Preload 400/700 only, swap Mukta for `--font-script` only if 20-28px reading fails on device.

---

## 1. Product definition

Marketplace where Indian contributors record voice to build datasets for AI labs (illustrative Sarvam AI / AI4Bharat / Bhashini, no affiliation). Two roles ship: Contributor (records paid clips), Validator (grades, scope-reduced Tier 3). Quest Creator retired → redirect to contributor (scope decision, not silent delete).

Core reframe: labs buy **coverage** (speaker × dialect × district × acoustic condition), not hours. Campaigns as coverage targets (`62% collected · 400 clips to close Friday`), pay = `round(base × coverageMult) + bonus`, retention = finishing real gaps, never streaks.

Trust principle: same work same base pay always. Standing (New/Verified/Trusted/Elite) changes access + settlement speed. Craft per format×language drives bonus eligibility. Coverage value is market context (you are it), never a third bar to fill.

Verification tiered to money at risk: signup phone+language+T&C+DPDP consent → first withdrawal UPI VPA name-match (no docs) → PAN above tax threshold → full KYC high earners only. 18+ self-declared, VPA-enforced, ROOM minor gate (exclude or guardian-on-tape, nothing retained).

---

## 2. Users

Primary: 18-55 gig looker, ₹9k Android, UPI holder, low digital literacy possible, scam-wary, first-time earner, reads slowly or not at all, uses 360px default (320 compact, 390-430 large). Needs: legible money, honest states, audio playback of every script/instruction, icons always with labels, numerals not words, plain-language native rejection reasons with example.

Secondary: iPhone trier expecting premium feel — same IA, enhanced motion/blur/haptics, no separate skin.

Out of scope stated: under-18 (DPDP parental-consent heavy), desktop quest creation, full KYC at signup.

---

## 3. Information architecture (final)

```
 / (Market → Auth → OTP → Language → Home-empty)
 /contributor (MainApp tabs: Home / Quests / Wallet / Profile)
   /contributor → Home (your state)
   /contributor/quests → QuestFeed + FilterSheet + Search
   /contributor/wallet → Wallet bento + ledger tabs + TransactionDetail sheet
   /contributor/profile → Profile (Standing+Craft+Coverage context + Data Vault + role entry)
   /contributor/rewards/claim, /contributor/payout (AddUPI → NameMatch → Amount → Confirm → Success)
   /contributor/performance (Tier 2)
 /recording/:questId → Brief → Capture (Studio dark) → Review → Pending
 /rejected/:questId → Repair Studio (Tier 2 builds full, Tier 1 specs)
 Edge routes (P0 wired): /room-consent, /coverage-full, /campaign-closed, /dialect-mismatch,
   /session-interrupted, /silent-room, /campaign-oversubscribed, /quality-dispute, /battery-warning
 /validator/* scope-reduced Tier 3 (one GradingTask ref only, .theme-verdigris)
 Retired → /contributor: /first-earning, /data-consent, /submission-guidelines, /voice-calibration,
   /profile-setup, /quest-creator/*
```

Tab bar: translucent light material, content beneath, always icon+label (10px inactive, pill+terracotta active), 64px bar, 44px targets. No hard border+shadow stack.

---

## 4. User journeys (happy + edge)

### J1 First session (<4 min, Tier 1 must walk)
Market (`Sarvam needs 427 Hindi café clips`) → Auth one-tap Google/phone/email → OTP 6-box (resend, wrong-code error) → Language grid (native script large, sets consent lang) → Home-empty checklist (`1 Record first clip →₹12 [next] / 2 Add UPI / 3 Profile → +task / 4 Alerts`) → ConsentSheet native readable+listenable BEFORE mic → MicPrime in-context → Brief (pay breakdown `base×coverage+bonus`, scene, how-it-works, sample playback, quiet-spot tip, battery <20% warn on ROOM) → Capture dark (script 20-28 ≥10:1, trigger 84 thumb-zone pointer-down, live level real, noise-pause, segmented `[▮▮▮▮░░░░]`, pause/cancel) → Review (playback per-clip, static thumbs, keep/retake, submit) → Pending (`Expected on approval`, ochre Amount, Back home) → EarningCredited quiet (48/64 ink, one truth line) → Wallet AddUPI → NameMatch penny-drop → Withdraw (gap exact if <100, first task on-submit exception).

### J2 Returning daily
Home (market line, one 48 today hero OR resume card if in-flight, 2-3 QuestRow rows, needs-attention rejected/missing-UPI, milestone `8 clips → Trusted`, coverage context, recent 3 LedgerRow) ↔ Quests (search + chips + FilterSheet, sections LINES/SCENARIO/INTERVIEW/ROOM, TierGate aspirational `Unlocks at X — you have Y`, LOCK_CAP 2 + hidden count, honest empty + notify) ↔ Studio ↔ Wallet (bento Available/In review/This week/Total, UPI name-matched, ledger All/Earnings/Withdrawals, pending says what-it-waits-on, bonus separate line, withdraw gap exact).

### J3 Room high-stakes (₹220, 4 people, one take)
QuestFeed locked ROOM row → CampaignDetail (Tier 2, full breakdown before commit) → BatteryWarning if <20% → RoomConsentRollCall (each consents on-tape/QR, minor gate Yes/No → guardian-on-tape or remove-speaker nothing-kept, blocking line, Start disabled until ready `text-muted` not faint) → RoomCapture (scrolling score, `Now: who` active 22 bone vs dim past, VAD-advance not 3.4s timer, phone-stays-put, end-take) → SilentRoomReview lanes (4 lanes one empty → retake-all vs adjust, pay consequence shown) → Review/Submit → Pending. Interruption (call at 19min) → SessionInterrupted local persist + resume 24h from Home active row.

### J4 Failure/repair loop
Rejected row (struck + Rejected badge) → Repair Studio (Bone hero `9/10 passed fix 1 → ₹25`, 5-col matrix success/error, flagged detail taxonomy sentence+why+fix + native example, tip card, `Re-recording doesn't affect standing`, primary Re-record + text Later) → Studio single clip → Pending. Dispute path bounded 7d → 3rd reviewer → honest result. Dialect mismatch → paid base, bonus off, verify-dialect CTA. Campaign closed mid-session / cancelled after submit → in-flight honoured + paid, platform absorbs (visible promise). Offline → persistent queue `3 clips saved — waiting`, retry from Home. Spoof hold → explained + appealable + timeline.

---

## 5. Onboarding + greeting spec (how new users are greeted)

No tutorial replacing dashboard. Three data states one chrome (`empty/pending/live`).

* Market screen: `Record your voice. Get paid in rupees. 38/700 -0.025em`, `₹10–220 per quest` tabular terracotta (action), `Cash lands after reviewer checks` (no instant claims), social proof `2,400+ near Pune` dot+13px. Auth: Google 56 primary flat + Phone/Email 52 secondary (equal heights — fix 4px mismatch), `New or returning — same button` 13 muted.
* OTP: `Enter the code 30/700`, `4-digit → change to 6-digit boxes 60×68`, border-strong idle / action-primary filled / failed red + `name@bank`-style error line, Resend text-button 44px, Verify disabled until filled.
* Language: `Which language do you speak most? 30/700`, `App + consent in this language 16/500`, grid min-height (not fixed 76px) native 20 `lh-deva` + label 13 muted, selected `terracotta-50 + action border + Check`, CTA `Start earning` disabled until pick + `No payment yet — earn ₹12 first` with inline Amount.
* Home-empty: lightweight `r-lg e-1` card (reserves 48 for real balance): `Ready to start 11/800 uppercase`, `Earn your first ₹ today 22/700`, `Quests ₹12–220 · first ~3 min 14/1.5` (money ink, not orange). Checklist monday pattern below. No voice-data contract hidden — consent preview line links to sheet.
* Consent: one screen native, readable + speaker-icon listenable, what-recorded / who-accesses / how-withdrawal, plain language, DPDP valid. Mic prime immediately after, benefit-framed, OS deep link on deny.

---

## 6. Screen styles + what every screen must have

Global chrome: `20px gutter (16 compact, 24 large)`, `32-40px section rhythm`, eyebrow (`11/800 0.09em uppercase muted`) + content, one `r-lg e-2` hero max per viewport, everything else `r-md/sm e-0` + 1px `border-subtle`, sticky CTA gradient mask (`transparent→ground 30-34%`) never hard divider, 44px targets (72 record), back `ChevronLeft 22 action` + 44px hit.

* **Home:** market line 16/600 secondary (not greeting), hero conditional (resume card OR BalanceBlock 48 ink + caption + MiniStats), CTA `lg 56` naming job+pay, dashboard strip (Active/Needs you StatTile + MilestoneRow), Picked rows (QuestRow), Recent 3 LedgerRow panel. States empty/pending/live same chrome. Must have: market state, one hero, exact unlock path on locked, activity tappable to repair when failed.
* **Quests:** title `30/700` + sub `Same work same pay… 15/500`, search 48 `r-full`, chips 44 (fix 38), sections `20/700 + 13/500 blurb`, rows `QuestRow` (eyebrow 10.5 action + client 12 muted, excerpt 17 script 2-line clamp no ellipsis-of-script, meta 12 secondary, pay 22 ink right, coverage chip `×1.6 terracotta-50/800`), TierGate dashed aspirational, `LOCK_CAP 2` + hidden count 14 secondary + clips-to-unlock, empty honest + Notify.
* **Studio Brief (light):** eyebrow `10.5/800 0.12em action` format·client, title `30/700`, `AmountBreakdown` card, meta chips (Clock/Volume), scene card 16/1.7 secondary + excerpt 18 script + `Hear sample` 40 pill, How-it-works numbered (13 action number + 15 secondary), quiet-spot tip, fixed CTA gradient. Must have: full breakdown, sample playback, battery warn on ROOM.
* **Studio Capture (dark `surface-studio` ONLY dark):** sticky `13/600 DIM` context + ProgressPill, script `ScriptDisplay 26 bone ≥10:1 lh-deva` nothing overlapping, interview stem 16 DIM + `Listen…/Your answer 11 terracotta-300`, level 7 bars terracotta real, timer 26 tabular bone, trigger 84 `e-glow` pointer-down + reduced `REC` label, dock hints 14 FAINT center, Keep (`Keep & next/review` lg + `15/600 bone recorded` + Retake 44 text). Room variant scrolling score (active 22 bone `Now: who` terracotta-300 vs past 0.3 / future 0.5 16 DIM), one-take hint. Must have: real levels, pointer-down feedback, pause/cancel always, noise-pause overlay (guidance + resume, no discard).
* **Review (light):** `Review 10.5 eyebrow`, `28/700` title (`N clips ready` / `Listen back`), rows `44 play terracotta-50 + 15/600 label + 13 tabular time + settled Check`, fixed Submit lg + ghost Retake-all 44. Must have: static thumbs (add), play any, submit-once.
* **Pending:** `76 verdigris-50 Check 38`, `28/700 Sent for review`, `16/500 reviewer-checks…within a day`, `Expected on approval 11 uppercase + Amount 38 pending` card. No instant-credit copy.
* **Wallet (no hero number):** title `30/700` + sub, bento 2×2 `StatTile 14/16 24 Amount` (Available positive / In review pending / This week neutral / Total neutral), UPI row (`15/700 VPA + 11/700 verdigris Name matched + 12 muted 2-3 days + Edit 13 action`), tabs `All/Earnings/Withdrawals` 40px pills (fix 32), `LedgerRow 15/600 + 13 sub + 16 tabular + StatusBadge`, notes (`Waiting on validator…`, `Top-quartile clarity…`), failed struck + `Re-record` in sheet, sticky withdraw gradient + gap `13/600 + Amount 13` + `Withdraw (min ₹100)` disabled `aria-disabled`. Must have: every pending says wait-reason, bonus separate line, no Reserve.
* **Payout flow:** AddUPI 60px 18/600 input + `name@bank` error, NameMatch 84 verdigris ceremony, Amount `₹ 30/700` + Available 22 positive + presets 44 pills + gap exact, Confirm `Withdrawing 12 uppercase + Amount 48 center` (allowed hero exception) + rows + ochre `Expected by [relative date]` (fix frozen 2026-03-31), Success `96 verdigris + 48 + ref copy + To VPA`. No fees/minimum/`sent to` line. Spoof hold + PaymentFailed reachable branches (money stays).
* **Repair:** Bone hero (fix dark), `9/10 passed fix 1 → ₹25` (money ink), matrix 5-col `r-sm` success/error + numbers, flagged `error-bg + single border` (drop borderLeft), sentence 13.5/600 + why 12.5/500 + re-record excerpt 13/1.65 native, tip card, `doesn't affect standing` 12 muted centered, primary 56 flat + Later text 44. Must have: shared taxonomy reason + example + single-retake.
* **RoomConsent:** Bone hero (fix dark) `Who's in room? 24/800`, rows `r-md e-0` (fix e-1) avatar 40 tint + name 15/700 + status 12/600 + mic/QR 44 (fix 40) / settled 28 check, minor toggle 44 pills (fix 34) + branch `crimson-50` guardian-on-tape 48 primary + remove 48 secondary, footer gradient (fix borderTop) + blocking line 13/600 + Start 56 disabled `surface-sunken + text-muted` (fix faint).
* **CoverageFull / Dialect / Dispute / Interrupted / Silent / Oversubscribed / Battery:** per `03-EDGE-CASES.csv states_to_generate`. CoverageFull `r-lg e-2` hero + 100% verdigris bar + redirect `r-md e-0` rows + footer 13 secondary (fix faint) = reference. Dialect keep struck-vs-ink hierarchy, drop glow CTA. All footers ≥13 secondary, all disabled ≥44 + reason.
* **Profile:** avatar flat `bone-100 ink` (fix gradient), stats `This month` not lifetime (fix `₹1,250 lifetime` competing Wallet), Standing `r-lg e-2` single hero (demote Validator Tier to `r-md`), Reliability 78% settled 10px bar, unlock preview sunk, add missing Craft skill sheet per format×language + Coverage context register (core §9.7 unbuilt), Data Vault real items + Revoke 1.5px caution, menu naked dividers. Must have: Standing + Craft + Coverage-distinct, Data Vault + revoke.
* **Rewards:** single `r-lg e-2` Standing hero ✅ keep; perks `e-0` (fix e-1), `Activate 44` (fix 32), badges sunk-locked correct.
* **Validator (Tier 3 scope-reduced):** rebuild under `.theme-verdigris` with contributor primitives or exclude from Tier 1 demo. Current `ValidatorHome` legacy (greeting, Spanish, Lv 4, gradient CTA, decorative Waveform) must not demo alongside contributor.

---

## 7. Design system (build tokens)

* **Color:** primitives terracotta/carbon/bone/verdigris/ochre/crimson hex + oklch twins for `color-mix` pressed/hover. Semantics only in components. Money ink, terracotta action-in-motion, verdigris settled, ochre pending (text duties to darker ochre-800 for 4.5), crimson failed. 60/30/10 per light screen, orange ≤10%. Contrast: script 10:1, body 7:1 (move <14px secondary to carbon-700), status 4.5:1 + icon+label always, disabled 3:1 + label. Verify terracotta-vs-crimson chip/grayscale/deutan/protan.
* **Type:** Anek UI/script/number tabular, `11 eyebrow 0.09em /12 caption /14 meta /16 body floor /18 lead /20 card /24 section /30 screen /38 display /48 hero one-per-viewport /64 celebration-only`, per-script `lh-deva/taml 1.72`, tighten ≥20, loosen <14. 360 default (320 compact display-step-down only, body stays 16; 390/430 gutters 24). No `clamp()`. Reserve serif/display contrast for `EarningCredited 64` only.
* **Spacing/radius/elevation:** 4pt `4-72` + gutters 16/20/24/24 + section 32-40. Radius `8/14/24/999` one `r-lg` per viewport, pills stay 999. Elevation carbon-tinted two-layer `e-0 none default / e-1 inputs-chips / e-2 one hero / e-3 sheets / e-glow trigger-only`. Separation ladder whitespace → tint (3-5%) → elevation → border last. No gradient pill CTAs (flat + inset 1px highlight max), dark elevation = lighter surface.
* **Motion/materials:** springs touch (`sheet 0.8/0.3, meter/craft 1.0/0.4, count-up 1.0/0.4 from live value, locked bounce 0.8/0.2, press scale .97 pointer-down`), fades 120/180/280 `cubic(0.2,0,0,1)` non-touch, tab cross-fade 120 no slide, beat cross-fade 180 + persistent bar (+ `view-transition-name: studio-beat` where supported). Sheets 1:1 `setPointerCapture` rubber-band interruptible from live pos, X/Y split. Sheets/scrims/tab translucent `blur(20px) saturate(140%) color-mix 88-92%`, never stacked, sticky CTA gradient mask. Reduced-motion per-component table (glow→static+label, fills→instant, sheets→fade, count→instant). No full-viewport motion, glow <<0.2Hz. Haptics: press light, success pattern, blocked error. Perf: canvas live wave, SVG static/voiceprint/separator, cache blur raster once, no backdrop-per-frame.
* **Waveform identity (5):** Live (Studio, real mic, 7 bars + timer) / Scrub (Review interactive + playhead) / Thumb (24px static per clip) / Separator (6px divider, 1/viewport max) / Lanes (Room 4-lane hero) + Voiceprint (seeded radial SVG, Profile/consent/first-earn, densifies). Diegetic blur only (own voiceprint → material; pretty gradient → banned). Never wallpaper, never loop idle, never wave alone (always timer/tabular beside).
* **Icons/components:** Lucide consistent stroke, never icon-only nav/status. Primitives built once all states (default/pressed/disabled/loading/error) both grounds 320+430: Screen/Section/Divider/Sheet/TabBar/AppBar(brand slot)/SafeArea; Card flat/raised/hero; ListRow; StatTile; EmptyState; Callout; Amount/Breakdown/LedgerRow/BalanceBlock/MoneyState; Button 44/52/56 primary-flat/secondary/ghost/destructive; Chip/FilterChip/Switch/Stepper; StatusBadge/Pill/ProgressPill segmented/CoverageMeter/Ring; StandingBadge/CraftBar/TierGate aspirational/MilestoneMark; Trigger/Level/Waveform/ClipRow/Scrubber/ScriptDisplay; TextField/Select/Search/LanguagePicker/OTP 6-box.

---

## 8. Anti-AI-slop rules (must pass before demo)

1. No `borderLeft 3px` strip, no `divider=true` default, no `rounded-lg border bg-card shadow-sm` shadcn defaults (48 dead files quarantined, not imported).
2. No gradient pill CTA, no decorative glow (glow = trigger only), no emoji as UI (`Rewards 🔥`, header `⚡` as text — replace with icon+label).
3. No full-screen waveform/blur wallpaper, no canned loop motion, no `borderTop divider` under sticky CTA.
4. No second `r-lg` hero, no dark slab for emphasis, no orange money figure, no color-alone state.
5. No magic type (`10.5/13/15/17/22/26` → tokens), no raw hex/radii outside theme, no hardcoded personas/balances/dates (`Alex 185 / 127.5 / 2026-03-31` → session/relative).
6. No unreachable state (reachable without DevPanel or don't ship), no `Feul/Grain` strings, no `Hey night owl` / `Spanish` / `Lv 4` leftovers.
7. No icon-only tabs, no <44px controls, no invisible focus, no infinite skeleton pulse without reduced-motion freeze.
8. No fake levels/playback timers, no swipe teleport without tracking, no timer-forced Room cue (VAD/manual only).

---

## 9. Pre-start checklist (gates)

- [ ] Decisions §0 locked + placeholder slot renders empty everywhere.
- [ ] Attachments ready: this file + `01-*` Variables + `03-*.csv` + `04-ISSUE-MAP.md` P0 list. No archive docs attached.
- [ ] Phase 0 acceptance (`02-BUILD-SPEC.md`): no Reserve/streak, consent precedes mic, gap exact, Verdigris locked, Anek + tabular.
- [ ] Contrast re-measure after P0-2 palette tweak (button/pending/muted ≥4.5, script ≥10:1, chip/grayscale/colourblind).
- [ ] DevPanel gated `import.meta.env.DEV`, `?embed=1` strips PhoneFrame/DEV chrome.
- [ ] Tier 1 walkable `<4min` at 320px + 150% text + daylight simulation before Tier 2.
- [ ] `tsc --noEmit` zero, `sync-embeds.mjs feul` only after Tier 1 lands (embed stale 4 Aug until then).

---

## 10. Deltas adopted from `05-FINAL-ARCHITECTURE-AND-SPEC.md` (audit 2026-09-07)

> 05 is stronger on geometry/copy, weaker on system discipline. Adopt below; conflicts resolved explicitly. 05 remains reference — this section is authoritative on any disagreement.

### Adopted (build these)
1. **Waveform geometry:** pill bars 3px width + 3px gap (1:1), radius 999, 4px resting floor (mic-alive signal, never 0), 32px peak cap. Color states: resting carbon-700 / active terracotta-500 / crest ochre-500 / clipping crimson + `step 15cm back` guidance / validated verdigris. Engine: `AnalyserNode fftSize=128` RMS smoothing, single 2D canvas, no DOM thrash.
2. **Teleprompter default:** `text-prompt-studio 26/700 lh-deva` bone (`#FBEFE4`) as Studio default size (inside 20-28 range). Verify ≥10:1 on built Studio ground before demo.
3. **Studio telemetry bar:** `[Exit] · TURN x OF y · [₹ accumulated] · [mic-distance OK]` — distance as icon+label token state (no emoji dot), derived from input RMS + clipping detector (>85dB → crimson + guidance).
4. **Inline repair banner (in addition to NoisePause overlay):** discreet Studio banner `Traffic noise on turn 4. Retake turn 4 or submit all?` — avoids modal for single-turn faults; overlay reserved for sustained floor breach.
5. **Calibration posture guide:** `Keep phone 15cm from mouth` visual + 2-phrase calibration with live canvas feedback in guided first task.
6. **DPDP notice verbatim (consent sheet):** `Under DPDP Act 2023, you can delete your voice data anytime. Money paid is never clawed back.` + audio playback toggle `Listen to how your voice is protected in {language}.`
7. **Wallet weekly bar filters ledger:** 7 pill bars Mon-Sun, tapping a bar filters ledger below; TransactionDetail shows UTR for settled withdrawals.
8. **Journey mermaid (build order poster):** Onboarding/Consent → Calibration (₹50) → Home conditional (resume vs today+CTA) → Studio → Review/Repair → Home; Home → Wallet / Quests. Keep J1-J4 prose (§4) as acceptance detail.
9. **Language tiles:** min touch height 56px (current min-height 76px already complies — keep min-height, never fixed height for Telugu wrap).

### Conflicts resolved (05 loses — do not build as written)
- **C1 Studio ground `#12100E` (05 §2-3) vs `#201611` (theme `t-carbon-900`):** KEEP `#201611` until a daylight A/B proves otherwise. 05's near-black crushes on 300-nit LCD. If revisited, one-token swap + re-verify script contrast.
- **C2 `e-1` redefinition (05 §2.3):** KEEP `01-*` `e-1: 0 1px 2px rgba(32,22,17,.05)`. 05's doubled shadow is heavier than inputs/chips want.
- **C3 `WITHDRAW VIA INSTANT IMPS` (05 §5.4) vs settlement tiers + first-payout hold:** REJECT instant label. Copy stays `Expected by [relative date] · 2-3 working days`, Trusted on-submit exception stated per tier. No IMPS promise on first withdrawal.
- **C4 Emoji in spec (🎙️💬👥🎧 §5.2, 🟢 §5.3):** STRIP. Icons = Lucide 1.75-2 stroke + label, never emoji (`04 P1-10`, §8 rule 2).
- **C5 Bento `borderless white` (05 §5.2) vs `e-0 + 1px border`:** KEEP bordered `e-0`. Borderless white on Bone washes in daylight.
- **C6 Copy caps literal (`titles ≤20 / CTA ≤15`, 05 §6) vs job-naming CTAs:** caps apply to nav labels/short actions only. Primary job CTAs MUST name job+pay (`Record Marathi Phrases · ₹15`, 27 chars) — exempt by rule, truncated never.
- **C7 Button `52px` (05 §5.2 hero) vs `44/52/56` scale:** KEEP scale; hero CTA = `lg 56`.
- **C8 What's missing in 05 (no regression):** P0 contrast math, 44px enforcement list, placeholder-slot ban, reachability rule, Craft sheet, focus/forced-colors/reduced-motion/container-queries, frozen-date/hardcode ban — all stay per `04-ISSUE-MAP.md` + §8. 05's pre-flight checklist is necessary but not sufficient.
