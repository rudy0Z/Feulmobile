# Feul — Visual Craft Upgrade: Phase-wise Execution Plan

## Context

Feul's **product thesis is senior** (wallet-over-XP, pending-review over fake instant
cash, consent-as-contract, Repair Studio) but its **visual system reads junior** —
assembled from a component kit, not designed. A 20-day design review (captured in
`VISUAL-CRAFT-BRIEF.md` (repo root)) diagnosed the specifics and locked a 2026-craft
direction: *light quiet UI, one warm money surface, recording as a studio mode, custom
2D marks used scarcely — and explicitly NO clay/3D/mascot kit.*

This supersedes the clay-asset direction we began building. The clay experiment
(`ClayAsset`, `TierBadge`, `clayAssets.ts`, wired into 5 screens) is rejected by the
brief (§1.3, §11) and is torn out first. The **token pre-work** we did (`--surface-hero`
aliasing real ink, raw-hex → token refactors) is aligned with the brief and is KEPT.

Outcome intended: an app a 90-second reviewer reads as "this person designed the session
and the ledger, then added a restrained mark language" — not "lots of objects, still a
karaoke recorder, three dark blocks and a Duolingo week."

Evidence gathered (grep/read, current state): ~25 distinct border-radius values (999 used
175×); ~96 off-token color literals (heaviest `rgba(196,98,45)` in 24 files,
`rgba(224,108,58)` in 18 files); info-blue in 8 files; `--font-serif` used for headings in
26 files (already aliases Bricolage display); the navy slab on 8 screens; broken CTA routes
falling back to placeholder Lines content; recording control inline (not thumb-zone) with
no session review.

---

## Locked decisions (from review + this session)

- **Clay:** full teardown; keep only the token work.
- **Money surface (§13):** build all four Wallet headers (A/B/C/D) side-by-side in a
  dev-only harness, judge them AFTER Pass 0, then commit one to Wallet header only.
- **Recording formats (§8.4):** the catalogue keeps **multiple** formats. LINES and
  SCENARIO stay as-is; the old pass-the-phone GROUP is reworked into **ROOM** (one
  continuous take); **INTERVIEW** (solo, against a pre-recorded track) is added as a new
  format. Prototype taxonomy = **LINES · SCENARIO · INTERVIEW · ROOM**. No pass-the-phone.
- **Auth:** stubbed/mocked (no backend). "Login first" = a promise+auth screen that
  fakes success; PureFrontend. No Supabase in this upgrade.
- **Sequence:** brief §12 pass order is authoritative; do not skip to pictures.
- **Execution:** ONE pass per checkpoint, then **stop for review**. Explicitly:
  **T → stop. Pass 0 → stop. Pass 1 → stop.** Do not chain 0–5 in a single run. Pass 5
  stays optional; if the marks look generated, ship none.

### Recording format taxonomy (`format: 'lines' | 'scenario' | 'interview' | 'room'`)

| Format | Model | Card label | Capture | Review |
|---|---|---|---|---|
| **LINES** | fast single-line micro-clips | `Lines · Hindi · 3 min · ₹12` | hold-to-record short lines | per-clip keep/retake → session review |
| **SCENARIO** | solo scripted role, multi-turn, no other voice | `Scenario · 6 turns · 7 min · ₹45` | scripted turns, you read your side; light brief → capture → review | per-turn keep/retake → session review → pending |
| **INTERVIEW** | solo, against a pre-recorded track (question stems) | `Interview · 8 questions · ₹65 · against track` | play question (other voice) → "your turn" → tap/hold record YOUR answer; sticky `Clinic · Q 3 of 8 · You`; other line = audio + one quiet text line | per-answer play/keep/retake → session review → pending. **If no track: quest disabled ("waiting for prompts") — NO fallback capture.** |
| **ROOM** | people in one room, one phone, ONE continuous take; mapping off-device | `Room · 4 people · ~25 min · ₹220 · one take` | one giant ≥72px thumb-zone control; sticky `Dinner table · Room take · Rec`; script = quiet scrolling score / "now: Dada ji" cue; phone stays put | play whole tape → Retake entire take OR Submit → pending. **No per-turn keep/retake, no speaker-mapping UI.** |

**SCENARIO** keeps the current solo capture flow (rebuilt into the three-beat chrome);
**INTERVIEW** and **ROOM** are the two new studio flows the latest spec defined.

### Prototype quest content list (`src/app/lib/quests.ts`)

Keep the existing LINES + SCENARIO quests; convert the two GROUP quests to ROOM; add
INTERVIEW quests (one with a track, one disabled to demo "waiting for prompts").

| id | Format | Title | Lang | Key meta | ₹ | Tag |
|---|---|---|---|---|---|---|
| `q-lines-1` | lines | Hindi — Everyday Phrases | Hindi | 8 clips · 3 min | 12 | New |
| `q-lines-2` | lines | Product Names — Marathi | Marathi | 6 clips · 2 min | 10 | — |
| `q-lines-3` | lines | Numbers, Dates & Money — English | English | 7 clips · 3 min | 11 | — |
| `q-scen-1` | scenario | Ordering at a Café | Hindi | 6 turns · 7 min | 45 | high-demand |
| `q-scen-3` | scenario | Returning a Product | English | 7 turns · 9 min | 55 | — |
| `q-scen-4` | scenario | Booking a Flight (Frustrated) | English | 9 turns · 13 min | 75 | expiring |
| `q-int-1` | interview | Doctor Visit — Symptom Interview | Hindi | 8 questions · 11 min · against track | 65 | bonus |
| `q-int-2` | interview | HR Phone Screen | English | 6 questions · 9 min · against track | 60 | — |
| `q-int-3` | interview | Bank KYC Verification Call | Hindi | waiting for prompts (no track → **disabled**) | 50 | — |
| `q-room-1` | room | Family Dinner Table | Hindi | 4 people · ~25 min · one take | 220 | high-demand |
| `q-room-2` | room | Cricket Watch Party | Hindi | 3 people · ~18 min · one take | 150 | limited |

New quest fields: `track?` (interview stem marker — **mocked, not a real wav**; drives a
"play stem → your turn" UI state; absent ⇒ disabled), `available?` (false ⇒ "waiting for
prompts"), and `questions?`/`speakers?` reused for the meta line. `q-int-3` is the ONLY
disabled card; the other interviews just mock the play-stem beat.
`formatMeta` gains `interview` + `room`; `pickedForYou` re-points to valid ids.

---

## Phase T — Teardown + documentation (prerequisite)

**Remove:** `src/app/lib/clayAssets.ts`, `src/app/components/ui/ClayAsset.tsx`,
`src/app/components/ui/TierBadge.tsx`, `src/app/assets/clay/`,
`plans/clay-visual-upgrade.md`.

**Revert the 5 wired slots** to a clean/neutral state (NOT the pre-clay original where
Pass 3 will redesign anyway):
- `Wallet.tsx` — remove `<ClayAsset>` corner (leave a plain state; §9/§13 redesigns it).
- `ui/QuestCard.tsx` — remove `featured` prop + featured band (Pass 4 starves cards).
- `QuestFeed.tsx` — drop `featured={i===0}`.
- `Profile.tsx` — restore `ShieldCheck` tier glyph (Pass 3 revisits).
- `EarningCelebration.tsx` — remove reward-coins asset; leave the hero **plain** (do NOT
  re-add a navy brick — Pass 3 de-slabs it, don't kill it twice).
- `DailyLimitReached.tsx` — remove daily-limit asset; leave **plain** (no navy disc back).
- `Wallet.tsx` corner — leave **plain**; Pass 3 redesigns the header.

**Keep:** `--surface-hero*` tokens and all raw-hex→token refactors already applied.

**Docs:** the canonical brief is the existing **`VISUAL-CRAFT-BRIEF.md` at the repo root** —
do NOT fork or duplicate it into `plans/`. Track pass progress in THIS plan file only.

*Verify:* app builds, no dangling imports (grep `ClayAsset|TierBadge|clayAssets`), all
screens render without the removed components.

---

## Pass 0 — System / token discipline (no pictures)

Goal: a system to design *within*. All in `src/styles/theme.css` + mechanical component
sweeps.

1. **Radius:** reconcile the two conflicting definitions (px scale lines 133–143 vs the
   `@theme inline` shadcn calc at 337–340). Commit to ~4 steps + pill
   (`sm 8 / md 12 / lg 16 / pill 999`), map `xl/2xl` onto these or drop. **Pill (`999`)
   stays `999` — do NOT round pills down.** Sweep only the card/step literals: `14 → 16`
   and odd one-offs → nearest step. Leave every `999` untouched (pills, chips, avatars).
2. **Hues:** delete the `--info-*` ramp + `--status-info-*`; retarget "Under review" to
   warning/mute-neutral across the 8 files that use it (Home, NewUserHome, Performance,
   Profile, Wallet, ui/NotificationsPanel, ui/QuestCard, validator/ValidatorWallet).
   Route the off-token literals to tokens: `#4F46E5` (DataConsent), `#FF9D6C`, `#E8913A`,
   `#818CF8`, and the two heavy ones `rgba(196,98,45)` (24 files) / `rgba(224,108,58)`
   (18 files) → `--accent-*` / `--surface-hero-accent-glow`.
3. **Type roles:** retire `--font-serif` → `--font-display` (Bricolage) — mechanical
   find/replace across 26 files + theme.css h1/h2/h3 rules (lines 366/375/384). No font
   loading changes (serif already aliases display). Rupee stays mono/tabular.
4. **Orange discipline (§4):** orange = cash-in-motion + the one primary CTA per screen.
   Demote XP/streak/tags/secondary links off accent to mute/neutral.
5. **Elevation/spacing:** one card shadow + one floating shadow; kill per-pill glows.
   Enforce `--space-*`; remove ad-hoc `3/5/7/9/13px` gaps.

*Verify:* grep shows 0 `--info-`, 0 of the listed literals, 0 `--font-serif`; radius set
is ≤5 values; visual smoke-test of Home/Wallet/QuestFeed/Profile.

---

## Pass 1 — Activation (auth → Home-first)

Current: `/` Onboarding (3 slides) → `/first-earning` (navy hook) → `/data-consent` →
`/submission-guidelines` (heaviest) → `/voice-calibration` → `/earning-celebration` →
`/profile-setup` (3 steps). ~10 explanation taps; "instant payout" copy contradicts
pending-review; RoleSelection orphaned; NewUserHome is a DevPanel toggle only.

1. **Screen 1 = product + auth** (`Onboarding.tsx`): one sentence + one number
   ("Record your voice. Get paid in rupees."), Google/email/phone (stubbed). Collapse the
   3 marketing slides + the `/first-earning` navy hook into this one light screen. Startup
   story → Profile "About" link, not onboarding.
2. **Home-first:** after auth go to `/contributor` (Home = first-earn prompt), not the
   funnel. Delete/redirect `/first-earning`.
3. **Consent as a swipe sheet** (not a full page): 2 lines + expand; keep DPDP facts.
   Trigger lazily (before first submit) rather than as a mandatory pre-Home wall.
4. **Calibration = first quest:** fold `VoiceCalibration.tsx` behavior into the standard
   LINES capture chrome (~3 phrases, no scroll novel); drop it as a separate chapter.
5. **UPI moves to Wallet** (withdraw attempt / empty-state nudge) — remove from
   `ProfileSetup`. Name progressive (from auth). Languages = chip row on Profile.
6. **Copy honesty (§14):** replace all "instant/credited instantly" (Onboarding step 3,
   FirstEarning, EarningCelebration) with pending-until-review; align calibration copy.
7. **Progressive new-user Home (§6.3):** drive NewUserHome stages off real profile state
   (day-0 → after-first-session → after-credits), keep DevPanel toggle for demo. Day-0
   shows one sentence + one quest CTA — not languages+UPI+milestones+social-proof.

*Verify:* fresh run reaches Home in ≤2 taps; no "instant" copy remains; consent still
reachable and recorded; UPI absent from onboarding.

---

## Pass 2 — Recording (three beats; LINES · SCENARIO · INTERVIEW · ROOM)

**SCENARIO is in scope for this pass.** Café / Return / Flight must be rebuilt into
brief → studio → per-turn review → session review → pending like the others — if SCENARIO
is skipped, those three stay karaoke.

Restructure `Recording.tsx` (and quest data) into **Brief → Capture → Review** for all
formats. Route `/recording/:questId` stays top-level (tab bar already structurally absent).

1. **Data model** (`src/app/lib/quests.ts`): extend `format` union to
   `'lines' | 'scenario' | 'interview' | 'room'` (keep LINES + SCENARIO). Convert the two
   GROUP quests to ROOM (drop `pass-the-phone`, add continuous-take framing/score); add the
   INTERVIEW quests with a `track?` ref + `available?` flag (trackless ⇒ **disabled**,
   "waiting for prompts"). Seed the full content list above; update `formatMeta` and
   `pickedForYou`.
2. **Fix routing + kill the fallback hack:** guard invalid `questId` (no silent
   `FALLBACK_LINES`); fix `Home.tsx:374` `/recording/sample-quest`,
   `NewUserHome.tsx:263` `sq-1/2/3`, `RejectedTask.tsx:220` `rejected-redo` → real ids.
3. **Beat 1 — Brief (light, ~10s):** scene/role/tone/duration/₹, mic guidance; tab bar
   visible. ROOM shows the role "score" + "bring 3 others, one phone, don't stop between
   lines". INTERVIEW shows "you'll hear them, then answer".
4. **Beat 2 — Capture (studio):** 180–240ms transition into dim (token ink, never `#000`);
   current prompt 28–32px; waveform only while sound happens; **record control
   bottom-center, ≥72px, above home indicator** (replaces the inline 80px mic). Sticky
   one-liner per format. Only the current line prominent; other voice = audio + one quiet
   text line. ROOM = single continuous take, one control. INTERVIEW = play-stem → "your
   turn" → record answer.
5. **Beat 3 — Review:** LINES/INTERVIEW = per-clip play/keep/retake then **session review**
   (all clips, submit). ROOM = play whole tape → Retake-all OR Submit (no per-turn). Then
   the existing pending-review screen (expected ₹, not instant `+₹`).
6. **Remove** pass-the-phone (`GroupRecording` baton, pass interstitial), the simulated
   coaching pill overload, and karaoke stacking. Reuse `ui/SwipeButton.tsx` (currently
   unused) for swipe-to-submit if desired; `ui/VoiceVisualizer` / `ui/Waveform` for the
   during-sound motion only.

*Verify:* each format runs Brief→Capture→Review→pending; control is thumb-reachable; a
trackless interview quest shows disabled state; no route resolves to FALLBACK_LINES.

---

## Pass 3 — Home + Wallet surfaces (money atmosphere, once)

1. **Wallet header bake-off:** build A/B/C/D (light ledger / soft wash / ink strip /
   type-only) in a **dev-only side-by-side harness route**, same content (₹127.50
   available, ₹60 pending labeled **Pending**, one Withdraw), same type scale, no clay/no
   waveform. Judge, pick one, apply to **Wallet header only**; delete the losers + harness.
2. **Wallet hierarchy (§9):** available ₹ huge → pending legible-secondary → Withdraw
   (thumb-zone primary) → UPI (first withdraw here) → ledger → XP/perks visually mute.
   Remove the duplicated navy brick.
3. **Light Home (§6):** remove the navy progress brick; keep greeting (quiet) + ONE money
   signal (`₹185 today` line, not lifetime+weekly+%+ring) + one primary CTA (real quest
   id) + short "picked for you". Streak → 7-day **earnings sparkline** (₹ credited/day,
   today=accent) or move to Profile.
4. **De-slab the in-scope screens** currently using `--surface-hero`: NewUserHome,
   Performance, Profile, RejectedTask, and EarningCelebration — replace the dark brick with
   light composition + size/isolation for importance. Do `validator/ValidatorHome` **only
   if free** (same brick pattern). **Skip `quest-creator/QuestCreatorDashboard`** — quest
   creation is still out of the original scope. Celebration may reuse the winning wash
   **once**.

*Verify:* Home and Wallet are distinguishable without both being dark; ₹ is first-read;
one money atmosphere in the whole app; ₹-vs-surface contrast ≥4.5:1; reduced-motion freezes
any wash animation.

---

## Pass 4 — Starve the cards (§5)

`ui/QuestCard.tsx`: reduce to **title · ₹ (large tabular) · one meta line
(`Hindi · 2 min`)**, plus at most one decision-changing status (expiring/bonus — not four
tags). Move excerpt/turns/clip-count/format-essay to the pre-record **Brief**. Format
(lines/interview/room) becomes a 10px eyebrow, not three chip-color recipes. Apply the same
one-anatomy card to activity + campaign lists.

*Verify:* feed scans fast; no card carries >1 status; excerpt appears only in Brief.

---

## Pass 5 — Marks (optional, only if genuinely good)

Budget **6–8 flat two-color (navy + terracotta) 2D marks**, drawn as one icon set, NOT
extruded/clay: wallet, empty-wallet, empty-quests (mic), format marks (lines/interview/
room), optional one first-earn mark reusing the wallet/mic. Import via ES modules +
`ImageWithFallback` (Vite hashing). **If they look generated, ship none** — empty craft
beats a generated kit. Waveform never returns as card wallpaper.

*Verify:* marks read as one owned set; used only in the budgeted slots; app still passes
Pass 0 discipline.

---

## Global verification

- Dev server already running (do NOT run `vite build` / `npm run dev`). Smoke-test in the
  preview surface per pass, on the phone frame.
- After each pass: grep-based token checks (Pass 0 gates), and a click-through of the
  affected flow. `?embed=1` must not draw fake iOS chrome or DEV tools.
- **Hard approval gate after every pass — I stop and wait, I do not auto-continue.**
  Begin with Phase T, stop; then Pass 0, stop; then Pass 1, stop; and so on.

## Key file anchors

- Tokens: `src/styles/theme.css`, `src/styles/fonts.css`
- Routes: `src/app/routes.tsx`; shell/tab bar: `src/app/components/MainApp.tsx`
- Activation: `Onboarding/FirstEarning/DataConsent/SubmissionGuidelines/VoiceCalibration/
  EarningCelebration/ProfileSetup/NewUserHome.tsx`; toggle in `src/app/lib/DevContext.tsx`
- Recording: `src/app/components/Recording.tsx`; quest data `src/app/lib/quests.ts`;
  `ui/VoiceVisualizer.tsx`, `ui/Waveform.tsx`, `ui/SwipeButton.tsx`
- Wallet/Home/cards: `Wallet.tsx`, `Home.tsx`, `QuestFeed.tsx`, `ui/QuestCard.tsx`
- Teardown targets: `ui/ClayAsset.tsx`, `ui/TierBadge.tsx`, `lib/clayAssets.ts`,
  `assets/clay/`
