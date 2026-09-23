# Feul Mobile — Full Issue Map (Design)

> **Purpose:** single list of everything to fix in the app's design before any fix work starts. No fixes in this doc — map first, discuss, then sequence.
> **Sources:** direct reads of `src/styles/theme.css`, `src/app/components/ui/Primitives.tsx`, `Home/Wallet/Recording/QuestFeed/Onboarding/Profile/RejectedTask/Rewards/PayoutFlow/RoomConsentRollCall/CoverageFullState/DialectMismatch/MainApp/PhoneFrame/validator/ValidatorHome`, `lib/quests.ts`, `routes.tsx` at `e352a79`, plus static sweeps (118 tsx: 25 type sizes / 250 ≤12px / 116 boxShadow / 187 1px-solid / 27 gradients / 49 raw hex).
> **Brand rule for all fixes:** placeholder slot only — no Feul/Grain rendering (`00-MAKE-CONTEXT.md`). `FeulLogo` instances flagged below are part of the map.
> **How to read:** P0 = trust-breaking / illegible / promise-without-proof (fix or don't demo). P1 = system discipline (spec exists, code violates it). P2 = screen-level craft. P3 = 2026 bar / polish. Each item has file:line + what-good-looks-like. Counts are measured, not estimated.

---

## P0 — Do not demo until fixed (8)

### P0-1 Fake mic signal in the Studio
- **Where:** `src/app/components/Recording.tsx:264-273` `useMicLevel Math.random every 90ms`, `Recording.tsx:368,456` `LevelMeter bars 7`, `Recording.tsx:233-236` `PlaybackButton fake 2400ms playing`
- **Why P0:** voice app whose waveform dances in silence. Destroys the core trust claim on first tap. Brief `§7.4` already forbids canned loops.
- **Good:** `AnalyserNode → rAF → canvas/bars`, frozen at 0 in silence; `prefers-reduced-motion` freezes to static thumbnail. Playback button plays real clip or is removed.

### P0-2 Button + pending + muted text fail contrast
- **Where:** primary `FFF6EF on C4622D = 3.83` (`Primitives.tsx:516`, `PayoutFlow` buttons, all `Button primary`); pending `C8922E on white = 2.76` (`Primitives.tsx:328-330 StatusBadge`, `Home.tsx:121 MiniStat`, `MoneyState`); muted `8A7563 on Bone = 4.09` (`theme.css:62`, used at 11-14px across Home/QuestFeed/Profile)
- **Measured:** `Carbon-900 16.59 ✅ / Carbon-700 7.85 ✅ / muted 4.09 ❌ / terracotta-600 on white 4.09 ❌ / button text 3.83 ❌ / ochre-500 2.76 ❌ / ochre-700 on ochre-50 3.98 ❌`
- **Good:** button fill → `terracotta-800` for text or lighten text + darken fill until ≥4.5; pending text → `ochre-800 #6B4C15`-darker; `<14px` secondary → `carbon-700`, reserve `muted` for ≥14px or non-essential only.

### P0-3 Repair Studio dark hero + invisible-text bug + glow misuse
- **Where:** `RejectedTask.tsx:56-64` `surface-studio r-lg e-3` hero (dark = recording only, violated); `RejectedTask.tsx:67,72` money `₹25 terracotta` on dark (money must be ink/bone); `RejectedTask.tsx:76` `rgba(var(--carbon-rgb),0.0)` alpha-0 textHack; `RejectedTask.tsx:146-153` `border + borderLeft 3px` triple-encode; `RejectedTask.tsx:227-240` CTA `e-glow` (glow = Studio trigger only)
- **Good:** hero Bone `r-lg e-2`, money bone/ink 48, CTA flat `action-primary`, single border (drop `borderLeft`), delete alpha-0 line.

### P0-4 First-session ₹100 promise has no arithmetic
- **Where:** `00-MAKE-CONTEXT.md` floor ₹100 = ₹50+₹50; `Home.tsx:59` `earnedToday 185` hardcoded; `Wallet.tsx:60-63` `127.5/25/91/208.5` hardcoded; `PayoutFlow.tsx:24-27` `balance 127.5/568.0` hardcoded; `quests.ts:88-100` `q-lines-1 base 10 ×1 +2 = 12`
- **Why P0:** gap line `₹X more to withdraw` (`Wallet.tsx:171-177`) is a promise the data model can't produce in one session.
- **Good:** one quest chain sums to exactly ≥100 in code (no hardcodes), `questTotal()` is single source, empty→pending→live states derive from it.

### P0-5 Rarity gaming unsolved (multiplier worth lying for)
- **Where:** `quests.ts:43-44` `coverageMult 1.0-1.6`, `QuestRow.tsx:583-588` `×coverage chip`, `DialectMismatch.tsx:1-199` exists as screen but `QuestFeed.tsx:57-61` search is string-only, no dialect/district facet, no verification wiring
- **Good:** decide + show: self-report → acoustic/location/validator check → `DialectMismatch` adjust-to-base path reachable from Review, not just a route. Currently a screen without a transition.

### P0-6 Edge states exist but aren't reachable in-flow
- **Where:** `routes.tsx:81-90` 9 contributor edge routes + `routes.tsx:125-137` 3 validator routes exist; only `/rejected/:questId` has in-flow entry (`Home.tsx:193`, `Wallet` failed row). Rest reachable via `DevPanel/DebugGallery` only.
- **Rule to adopt:** no state ships unless reachable without DevPanel. Gate `DevPanel` (`App.tsx` ungated, `PhoneFrame.tsx:5-46` DEV button `z 9999`) behind `import.meta.env.DEV` and strip from embeds.

### P0-7 Brand placeholder violated
- **Where:** `Home.tsx:75`, `Onboarding.tsx:78`, `Recording.tsx:89 Let Feul use your mic`, `Profile.tsx:318 Grow with Feul`, `validator/ValidatorHome.tsx:107` `<FeulLogo/>`
- **Good:** empty geometric slot (`28×28 r-sm bone-100`) or literal `[PRODUCT]` neutral type. Zero `Feul/Grain` strings in UI per `00 §Brand slot`.

### P0-8 Frozen demo date + hardcoded personas will rot
- **Where:** `PayoutFlow.tsx:201,260` `new Date(2026,2,31)` arrival math; `Home.tsx:56,67` `Alex/AJ`, `Wallet.tsx:99 alex@okaxis`, `ValidatorHome.tsx:129 Priya Sharma`, `RoomConsentRollCall.tsx:42 You (Ramesh)`
- **Good:** relative dates (`+2-3 working days from today`), persona via `session` only, no hardcoded names in UI strings.

---

## P1 — System discipline (spec exists, code violates it) (10)

### P1-1 Two design systems compiled into one file
- **Where:** `theme.css:6-86` new two-layer system ✅ vs `theme.css:88-195` legacy ramps (`accent/neutral/success/warning/error/background/navy/cream`) + `theme.css:220-247` legacy radius/shadow + `theme.css:309-312` font aliases; `Primitives.tsx:35-41` `Card flat|card|glass|floating` reads legacy `shadow-card/glass/floating`; `TagPill.tsx:139-143` reads `neutral-100/accent-100/navy`
- **Good:** delete or `DEPRECATED` legacy block, `Card → flat|raised|hero → e-0|e-1|e-2`, no component reads legacy.

### P1-2 Type scale: 25 sizes shipped, 11 specced, 16px floor inverted
- **Measured:** `9×11, 10×32, 11×73, 12×134, 13×142, 14×96, 15×65, 16×37` — 250 ≤12px, 3 ≥40px. Base `p/input/button 16` (`theme.css:579-599`) correct, inline overrides kill it (`Home 11/22/14`, `QuestFeed section 20/13`, `Profile 28/22/10.5`, `Primitives StatBlock 18/22/28 label 10.5`)
- **Good:** codemod `10.5/11/13/15/17/22/26 → 12/14/16/18/20/24` tokens; all money via `Amount`; `StatBlock/EarningFigure lg 28` → allow 48 or deprecate in favour of `Amount/BalanceBlock`.

### P1-3 Card factory bakes in slop
- **Where:** `Primitives.tsx:58-64` `border 1px + boxShadow + borderLeft 3px` in one base; `TouchableRow.tsx:221-246` `divider=true` default
- **Good:** base `transparent + r-md + e-0`, opt-in `separated`, delete `borderLeft` prop, `divider` default false. Targets `187 borders → <15, 116 shadows → <10`.

### P1-4 One-hero-per-screen broken (4 screens)
- **Where:** `Profile.tsx:135-199` Standing `r-lg e-2` + `Profile.tsx:325-354` Validator Tier `r-lg e-1`; `RoomConsentRollCall.tsx:108-115` dark `r-lg e-2` (also wrong ground); `RejectedTask` dark `r-lg` (P0-3); `Rewards.tsx:99-133` Standing `r-lg e-2` ✅ single — keep as reference
- **Good:** exactly one `r-lg` per scroll viewport; everything else `r-md/sm`.

### P1-5 Dark used as emphasis, not state
- **Where:** `RejectedTask hero`, `RoomConsent hero` (above) — `surface-studio` outside capture. `ValidatorHome.tsx:187-199` navy hero `surface-hero → elevated + waveform 0.05` decorative.
- **Good:** Bone everywhere except `Studio Capture` (`StudioShell.tsx:581`). Consent/repair/validator heroes rebuild Bone.

### P1-6 Tab bar hides labels + adds triple separation
- **Where:** `MainApp.tsx:27-36` `borderTop + e-2 + blur 16px`; `MainApp.tsx:69-78` label only when active (icon-only inactive violates low-literacy rule)
- **Good:** translucent material, content beneath, no border/shadow, **always** icon+label (10px label inactive, pill + terracotta active).

### P1-7 Touch targets under 44px
- **Where:** `QuestFeed chips/filter 38px` (`QuestFeed.tsx:123-143`), `RoomConsent Yes/No 34px` (`RoomConsentRollCall.tsx:284-309`), `Payout presets ~36px` (`PayoutFlow.tsx:169-182`), `Wallet tabs ~32px` (`Wallet.tsx:133-140`), `KeepRetake Retake ~36px` (`Recording.tsx:615`), `RejectedTask secondary no min-height` (`RejectedTask.tsx:241-252`)
- **Good:** ≥44px all interactive; recording controls ≥72px (already ✅ `RecordTrigger 84px`).

### P1-8 Swipe-back teleports without tracking
- **Where:** `Recording.tsx:37-49`, `RejectedTask.tsx:32-39`, `Rewards.tsx:53-63` raw `touchstart/touchend >72px → navigate(-1)`
- **Good:** 1:1 track + velocity commit + snap-back per `01 §4`, or delete gesture (back button suffices).

### P1-9 Sticky footers use hard divider, not scroll-edge mask
- **Where:** `RoomConsentRollCall.tsx:400-403` `borderTop divider`; spec `01 §5` demands `linear-gradient transparent→ground` mask (Wallet `Wallet.tsx:170` and Brief `Recording.tsx:221` already correct — copy that)
- **Good:** gradient mask everywhere sticky; never `borderTop divider` under CTA.

### P1-10 Raw hex + raw radii alive alongside tokens
- **Where:** 49 distinct hex (`#F87171, #ccc, #CA8A04, #E53E3E` etc), raw `16×15, 12×12, 24×7, 6×4` radii, `50%` avatars `×24` vs `r-full`
- **Good:** zero raw hex outside `theme.css` primitives; `50% → r-full`; radii only `8/14/24/999`.

---

## P2 — Screen-level craft (12)

1. **Onboarding:** OTP 4-digit (India UPI norm 6) `Onboarding.tsx:141-189`, no wrong-code error state; Google 56px vs Phone/Email 52px mismatch; language cards fixed `76px` truncate Telugu on 320px → min-height; no consent preview before Home.
2. **Home:** empty state hides money (`Ready to start` card instead of `₹0` large + gap-to-100); `MiniStat 18px` competes with 48 hero; `MilestoneRow → /rewards` links to killed streak surface; `₹12-220 terracotta` inside sentence breaks money-ink rule.
3. **QuestFeed:** `Top pay` sorts by `questTotal` (rewards rarity while browsing — contradicts same-pay mental model); `hiddenLocked` line 13px muted should be 14 secondary + exact clips-to-unlock; excerpt `17px nowrap ellipsis` truncates native script differentiator on 320px → 2-line clamp, no ellipsis of script.
4. **Studio Brief:** `briefCard e-1` should be `e-0` (static); orange hits ~5 before capture (over 10% rule); `How it works` good. **Capture:** `Room cue auto-advance 3.4s` forces pace — advance on VAD/silence or manual `Next`, not timer; `Retake` 36px → 44px. **Review:** no waveform thumbnails (only `Check` icon) — can't judge audio without playing each; add static 24px amplitude thumb per clip.
5. **Wallet:** ledger tabs 32px → 40px; disabled Withdraw `opacity .5` needs `aria-disabled` + reason (gap line exists — good, wire it); `2-3 working days` copy contradicts Trusted on-submit promise — pick one settlement story per tier and show it.
6. **Repair (see P0-3):** matrix `5-col r-sm success/error` is best density in app — keep; fix hero/CTA/borderLeft only.
7. **Payout Confirm:** `Withdrawing 48 center` hero is correct exception to Wallet-no-hero — document it as the one allowed second hero in flow; remove frozen date.
8. **RoomConsent:** minor toggle + consent mic/QR `40px` → 44px; disabled Start uses `text-faint` (~2.1 contrast) → `text-muted` + keep `blockingLine`; hero to Bone (P1-5).
9. **CoverageFull:** keep as reference for honest-rejection; footer `12 faint center` → `13 secondary`.
10. **DialectMismatch:** keep adjustment hierarchy (`₹144 struck muted` vs `₹90 26/800 ink`); remove CTA glow; verify-dialect button correct secondary.
11. **Profile:** avatar gradient → flat `bone-100` + initials ink; stats `₹1,250 lifetime` → `This month` or remove (competes with Wallet); add missing Craft skill sheet (Standing exists, Craft absent, Coverage absent) — the §9.7 core is unbuilt on the very screen that should carry it; Validator Tier second hero → `r-md`.
12. **Rewards/Recognition:** `r-lg e-2` single hero ✅; perks `e-1` every card → `e-0`; badges `opacity .6` locked + `surface-sunken` good; `Activate` primary `7px/16px` pill ~32px → 44px min-height.

---

## P3 — Validator + chrome + 2026 bar (7)

1. **ValidatorHome unmigrated:** legacy `background/surface/card-border/shadow-card`, greeting + `Hey night owl`, `Spanish` quest, `Lv 4`, gradient CTA + glow, decorative Waveform `0.04-0.05` ×3. Either rebuild under `.theme-verdigris` (`theme.css:328-350` exists for this) with contributor primitives, or exclude from Tier 1 demo. Demoing two visual languages reads AI-generated.
2. **PhoneFrame embed hygiene:** `PhoneFrame.tsx:5-46` DEV button `fixed z 9999`, `IOSStatusBar #1C2434`, `Dynamic Island`, `412×868` shell must be stripped at `?embed=1` — portfolio must never show DEV chrome.
3. **Focus + forced-colors:** add `:focus-visible 2px offset 2px` using `focus-ring` token (currently unused), `forced-colors: active` fallback (button borders). Keyboard path currently invisible.
4. **Reduced-motion:** freeze `RowSkeleton pulse Infinity` (`QuestFeed.tsx:263-266`), degrade `RecordTrigger boxShadow array` (`Primitives.tsx:672-676`) to opacity/scale (GPU-cheap on budget Android).
5. **Container queries:** `QuestRow` excerpt + `Home BalanceBlock` + bento should use `cqi` so Make variable-frame preview doesn't break at 320 vs 430. Viewport bands alone insufficient.
6. **Identity risk:** all-Anek everywhere = clean but ownable-nowhere. Reserve one display contrast (serif/grotesk) for `EarningCredited 64` only — one memorable moment, system stays calm.
7. **Copy hygiene:** `Let Feul use your mic`, `Grow with Feul`, `Hey night owl`, `Spanish — Customer Service`, `alex@okaxis`, `You (Ramesh)` — replace with placeholder/neutral/session-driven strings before portfolio sync (`sync-embeds.mjs feul` stale since 4 Aug).

---

## Appendix — where to start discussing (not fixing yet)

**My suggested discussion order:**
1. P0-4 + P0-5 + marketplace viability — if first-session math and rarity verification have no answer, pixel fixes don't matter.
2. P0-2 + P1-2 + P1-3 — contrast + type + Card factory are one combined tokens PR; everything visual depends on it.
3. P1-6 + P1-7 + P1-8 + focus — navigation + touch + gesture is one interaction PR.
4. Screen heroes (P0-3, P1-4, P1-5) — one hierarchy pass across Repair/RoomConsent/Profile/Validator.
5. Validator scope + embed hygiene — decide what demos, then `sync-embeds`.

**Counts to track:** type 25→11, ≤12px 250→~60 (captions only), borders 187→<15, shadows 116→<10, gradients 27→2, raw hex 49→0 (outside theme), touch <44 →0, `r-lg` per viewport →1.
