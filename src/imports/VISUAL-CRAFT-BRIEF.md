# Feul — Visual Craft Upgrade Brief

**Status:** Decisions locked from design review (Aug 2026). Ready for Figma Make exploration and implementation.  
**Audience:** Figma Make + implementation. Treat this file as the source of truth for the upgrade.  
**Do not:** revive the discarded Carbon dark theme, or generate a clay/3D object kit.

---

## 0. How to use this file

1. Read §1–§2 (what is wrong, what the product actually is).
2. Treat §3 as **locked direction** (clay is out; craft is system + session + scarce 2D marks).
3. Implement in the **pass order** in §12. Do not skip to illustrations.
4. §13 (navy slab replacement) is the remaining visual decision. Explore options there; do not default to “mesh gradient everywhere.”

---

## 1. Diagnosis — why the current app feels junior

### 1.1 What is actually strong (do not throw away)

The **product thesis is senior**:

- A new voice-data platform has to prove it pays before it asks for more work.
- Wallet and rupees lead; XP/points are secondary.
- Recording → **pending review** → credited (not fake instant cash).
- Repair Studio preserves accepted clips on partial rejection.
- Consent is a contract, not a checkbox.

Keep these. Visual work must serve them.

### 1.2 What is actually weak

The **visual system is junior**. Recruiters in 2026 judge craft as: type, spacing, restraint, one owned material, screens that look *decided*. Feul currently looks **assembled, not designed** — Figma Make / component-kit residue:

| Symptom | Where it shows | Why it reads junior |
|---|---|---|
| Stack of modules, no composition | Home, new-user Home, Wallet | Every block is a card dropped in a column |
| Navy “premium” rectangle overused | Home progress, new-user wallet, Wallet, First Earning, Recording, Repair Studio, celebration | When everything important is a dark slab, nothing is |
| Too many numbers in one brick | Home “Today’s Progress” (daily ₹, goal, lifetime, weekly, %) | Dashboard, not a consumer home |
| Full screens, no air | Quest cards, Home, Wallet | Negative space treated as unused inventory |
| Orange on everything important | CTAs, tags, streak, XP, rings, links | Accent has no meaning |
| Mixed picture language | Lucide outlines + emoji + waveform wallpaper + (trial) clay stickers | No one object system |
| Waveform as brand texture | Home header, navy cards, celebration | Wallpaper, not “sound is happening” |
| 999px pills, 16–20px cards, identical elevation | Almost every screen | Default kit, not a designed radius/elevation scale |
| Extra hues in components | Consent indigo `#4F46E5`, ring `#FF9D6C`, `#E8913A`, `#0F1822` vs token navy | Two palettes living together |
| Long activation funnel | 3 marketing slides → first-earn navy page → consent → guidelines → calibration → celebration → 3-step profile | Explaining instead of starting work |

**Hiring-bar sentence:** A 90-second reviewer should feel “this person designed the session and the ledger, then added a restrained mark language.” They must not feel “lots of objects, still a karaoke recorder, still three dark blocks and a Duolingo week.”

### 1.3 Clay experiment — rejected

A clay / semi-3D kit was generated (Gemini/Firefly: navy discs, terracotta symbols, chunky wallet, scene props). A wallet mock put the clay bifold **on the right of the same navy slab**.

**Why it fails in 2026:**

- Craft ≠ “has 3D objects.” Linear / Arc / Raycast / Apple Wallet / current fintech: flat or barely dimensional, custom 2D, light atmosphere, huge type, empty air.
- The set looks **generated**: same extrusion, same rimmed disc, same lighting on seed/flame/shield/crown.
- Tone is **toy-like** (kids’ banking), not “I recorded my voice and I want rupees.”
- It did not replace the slab; it **accessorized** it.
- Claymorphism is a 2023–24 fashion. In 2026 it reads dated on purpose.

**Locked:** no clay, no 3D titled objects, no mascot. If custom marks cannot be drawn well, ship **no objects** until type and space are right. Empty craft beats a generated kit.

---

## 2. What Feul is (category)

**Feul is not a fintech product.** It is a **voice-data contributor marketplace** (gig earning) with a **financial trust surface**.

| It is | It is not |
|---|---|
| Marketplace for recorded voice work | Bank, UPI super-app, investing, lending |
| Money exists because a new platform must prove it pays | Money is the product |

**Interview line:** *“It’s a contributor marketplace. The financial layer exists because a new platform has to prove it pays. I designed the wallet to the standard of a money app, not because I was building a neobank.”*

Recruiters will still **score the wallet like fintech** because ₹ is on screen. That one surface needs money-app polish. The rest of the app should feel like a recording job, not Groww.

Quest-creator / B2B campaign builder is **out of original scope** (companies buying data would get a desktop platform). Do not expand it in this upgrade.

---

## 3. Locked visual direction (2026 craft)

**Light, quiet UI. One warm atmospheric money surface. Custom 2D marks, scarce. Recording is a studio mode, not a theme.**

Not: clay kit, mesh-gradient wallpaper on every card, product-wide dark mode, waveform as logo.

### 3.1 Three surfaces only

| Surface | Token job | Where it may appear |
|---|---|---|
| **Page** | Warm off-white / `--background` | Default for almost all screens |
| **Card** | White, 1px border, quiet shadow | Lists, quests, settings |
| **Money atmosphere** | One recipe (see §13) | **Wallet header only** (and maybe first-earn celebration — one moment) |
| **Studio** | Dimmed, derived from money navy/ink | **Capture phase of recording only** |

Home progress, new-user welcome, Repair Studio, onboarding must **not** be a fourth dark brick.

### 3.2 Type

- **Display** (Bricolage): screen titles + the one huge rupee.
- **Sans**: everything else.
- Stop mixing `font-serif` / `font-display` / `font-sans` on the same class of heading.
- Rupee: tabular numerals, mono or tabular sans.

### 3.3 Controls (four kinds, documented)

1. Primary pill — accent, one per screen.
2. Secondary outline.
3. Ghost / text.
4. **Record control** — ≥72px, bottom-center, thumb zone. Not a random mid-canvas 80px blob.

Recording hides the tab bar (it is a mode).

### 3.4 Card anatomy (one)

Eyebrow (optional) → title → one meta line → trailing ₹.  
Quest, activity, and campaign inherit this. If a card needs a subtitle *and* a chip *and* an icon *and* a helper, delete two.

### 3.5 Picture language (after layout is good)

- **6–8 flat two-color marks** (navy + terracotta), drawn as a small icon set, not extruded 3D.
- Used in: empty wallet, empty quests, maybe wallet header, 3 format marks (lines / scenario / group).
- **Not** on every quest card unless the card has already been starved of info.
- **Waveform only while sound is happening.** Never as card wallpaper.

### 3.6 Layout / density laws

- **One screen, one number allowed to be huge.**
- Home: today’s ₹ *or* next action — not a dashboard plus CTA plus feed all screaming.
- Negative space is a material. Increase padding between sections; fewer modules per viewport.
- 8pt spacing scale only (`--space-*`). No ad-hoc 11/13/14px gaps mixed without a scale.
- Shadows: one card shadow, one floating (withdraw bar). No glow on every pill.

---

## 4. Colour — keep the hues, discipline the use

Colours started from the **web MVP**. That is allowed if the emotion is owned, not inherited.

### 4.1 The set (do not add hues)

A tight app: **1 brand + 1 neutral + 3 status**.

| Role | Hue | Emotion / job |
|---|---|---|
| **Terracotta / burnt orange** (`--accent-*`, hue ~34) | Fuel, voice as heat, earning as energy. Warm, Indian, not tech-purple. **Cash-in-motion and primary action only.** |
| **Ink / near-black navy** (`--navy` / `--neutral-950`) | Trust, ledger, “this is real rupees.” Type + **one** money surface. Not half the app’s background. |
| **Warm off-white page** | Human, paper. Pick **one** base — either cool `--neutral-100` *or* warm cream `--cream: #FAF6F0`, not both fighting. Prefer **warm off-white** to match terracotta. |
| Success / warning / error | State only. Never decoration. |

### 4.2 Kill or demote

| Extra | Why it hurts |
|---|---|
| **Info blue** (`--info-*`) | Fifth hue. “Under review” → warning or mute neutral. Blue = SaaS dashboard. |
| Dual bases (cool grey + cream) | Two products. |
| Hardcoded `#0F1822`, `#000` vs token navy | Every “premium” block is a different black. |
| Accent leakage (`#FF9D6C`, `#E8913A`, `rgba(196,98,45)`, `rgba(224,108,58)`) | Four oranges besides `--accent-primary`. |
| Consent indigo `#4F46E5` | Sixth hue for one icon. |

**Rule:** orange = money in motion + the one primary CTA. XP, streaks, tags, secondary links must not all be orange. If orange is cash, XP is mute.

### 4.3 Interview — why not other palettes

- **Green** — UPI / WhatsApp / Paytm. Wallet clone; voice disappears.
- **Purple** — 2023–25 “AI product.” Opposite of anti-slop.
- **Gold/black** — casino. Wrong for a ₹50 first earn.
- **Saffron + green** — nation-as-decoration (already rejected on LokAI).
- **Cool fintech blue** — bank. Feul is work + voice, not savings.

No new hues for “premium.” Atmosphere comes from **blur, type size, and air**, not a sixth color.

---

## 5. Quest cards — starve them

Cards already carry: format eyebrow, tag, Lucide icon, title, quoted excerpt, duration, clips, language, slots, ₹. Adding any illustration without deleting layers makes a Dribbble grid.

**Feed card (locked target):**

- Title
- ₹ (large, tabular)
- **One** meta line: `Hindi · 2 min` (language + duration). Add `3 left` only if scarcity changes the tap.
- Optional single status if it changes the decision: expiring / bonus — not both plus “high demand” plus “new.”

**Move off the feed:**

- Excerpt / script preview → **quest brief** (pre-record screen)
- Clip count, turn count, format essay → brief
- Lucide scene icon → optional tiny format mark *after* cards are simple; not required in v1

Format (lines / scenario / group) can be a 10px eyebrow, not a color system of three chip recipes.

---

## 6. Home — less dashboard, progressive fill

### 6.1 Regular Home (returning user)

Remove the navy progress brick as the “premium essence.” Home is light.

**Keep:** greeting (quiet), **one** money signal (today’s ₹ or available-to-withdraw, not lifetime + weekly + % + ring), one primary CTA, a short “picked for you” list.

**Kill or move:**

- Lifetime + daily goal + weekly + ring + bar on one card
- Waveform behind the greeting
- Streak as a second orange fire next to the avatar

**Primary CTA** must point at a **real quest id**, not `/recording/sample-quest`.

### 6.2 Streak widget

Current 7 checkmarks = Duolingo, and it fights “wallet over points.”

**If it stays on Home:** 7-day **earnings sparkline** — bar height = ₹ **credited** that day, not app opens. Empty mark = ₹0. Today = accent. Caption: `₹X this week` not `5-day streak`.

**Better:** move streak to Rewards/Profile; Home stays money + next task.

### 6.3 New-user / first-day Home

After auth, Home **is** the first-earn empty state — good. Then it should **progress**, not jump to the fully loaded dashboard.

| Stage | Home contains |
|---|---|
| Day 0 (just signed in) | One sentence + one quest CTA (calibration as first task) |
| After first session | Pending ₹ + “next 2 min task” |
| After a few credits | Quiet ₹ + short list |

Do **not** dump languages, UPI, locked milestones, and “what contributors earn weekly” on day 0. New-user Home currently still does this.

---

## 7. Activation — auth, consent, calibration, UPI

Current path before Home (~10 explanation taps):

1. 3 marketing slides  
2. First-earning navy hook  
3. Data consent  
4. Submission guidelines  
5. Voice calibration (only real work)  
6. Celebration  
7. Profile setup × 3 (name, languages, UPI)

The three slides repeat the hook. “Earn instantly” fights “credited after validator review.” Guidelines + calibration content overflow (user must scroll).

### 7.1 Locked sequence

**Login first, then consent.** Consent without an account is empty (who withdraws it?).

1. **Screen 1 — product + auth**  
   Top: one sentence + one number. *“Record your voice. Get paid in rupees.”*  
   Bottom: Google / email / phone.  
   One line of product, not three manifesto slides. Startup story → Profile footer link later, not onboarding.

2. **Home** (first-earn prompt). Optional 10-second “you’re in” — not another navy marketing page.

3. First tap on a task → **OS mic permission** at the moment of need.

4. If consent not yet accepted → **one swipe sheet** (not a long page). Guidelines = two lines + expand.

5. **Calibration = first recording**, not a separate chapter. Compact: ~3 phrases, no scroll novel. Same capture chrome as any lines quest.

6. **UPI only on Wallet** when they attempt withdraw (or a Wallet empty-state nudge). Not in onboarding.

Name can be progressive (or from Google). Languages = chip row on Home/Profile, not a dedicated step.

### 7.2 Why the startup still gets one beat

A startup can say what the app is. It does not get three “You are the source / Feul is your refinery” slides. Profile can hold “About Feul” / site link.

---

## 8. Recording session — the highest craft gap

Clay will not fix this. The session model is karaoke-on-a-dark-screen.

### 8.1 What’s broken

- Record control sits in the **content column**, not the thumb zone; tab bar still owns the bottom.
- Lines: no brief; drop into navy + prompt.
- Scenario: paragraph of setup, then the same mic UI; previous turns + current line + visualizer + controls = overloaded working memory.
- Group: **pass the phone** per turn — slow, breaks continuity, workshop demo not product.
- Jump to `--navy` / near-black without a mode transition feels like a different app.
- No full-session **review before submit** (per-clip retake ≠ pack review).
- Home CTA can hit a non-existent quest id (fallback lines).

### 8.2 Three beats (all formats)

1. **Brief (light)** — ~10s. Where, who you are, tone, duration, ₹, “quiet room, mic ~15cm.” Scene establishment lives here. Tab bar visible.
2. **Capture (studio)** — dim UI, **tab bar gone**. Current prompt 28–32px. Waveform is the only motion. Control **bottom-center, ≥72px, above home indicator**. During capture: **only the current line**. Other character’s line = quiet read-only context. Sticky one-liner: `Café · Turn 3 of 6 · You`.
3. **Review (light or studio-lite)** — play / keep / retake per clip, then **session review**: all clips, submit. Then existing **pending-review** screen (expected credit, not instant `+₹`).

**Hold-to-record** for short lines (fewer mis-taps) **or** tap start/stop for long scenario turns — pick per format, don’t mix five states on one blob.

### 8.3 Why studio (dim) is allowed without app-wide dark mode

**Interview line:** *“The app is light. Capture is a mode. We dim the UI so the prompt and the mic are the only objects, and so the contributor isn’t hit with a white flash in a dark room.”*

Must have a visible 180–240ms transition (entered a studio, not teleported). Studio colour is **token ink**, never `#000`. Rest of app never randomly goes navy.

Banned in capture: clay, scene illustration over the waveform, extra chrome.

### 8.4 Group — rethink (pick one, commit)

Pass-the-device is rejected.

| Option | Model |
|---|---|
| **A. One take** | Whole scene, one file; speakers in the room; capturing a conversation |
| **B. Async parts** | You record *your* lines against playback of others; no physical pass |
| **C. Facilitator** | One person runs device; UI says “now: Priya” without handing the phone |

Portfolio: **A or B**. Same capture chrome as solo; only the brief and “who speaks” change.

---

## 9. Wallet (money surface)

Wallet is the **only** everyday screen that may use the money atmosphere (§13).

Hierarchy:

1. Available ₹ (huge)
2. Pending ₹ (legible, secondary)
3. Withdraw (primary CTA, thumb zone)
4. UPI (setup/edit — first-time withdraw lives here)
5. Ledger
6. XP / perks — visually mute, not equal to cash

Do not put XP in the same optical weight as available balance. Do not duplicate Home’s navy brick here *and* on Home.

---

## 10. Marks / illustrations (only after Pass 0–2)

Budget if custom 2D is actually good: **6–8**

1. Wallet mark (header or empty)
2. Empty wallet
3. Empty quests (mic)
4. Format: lines
5. Format: scenario
6. Format: group  
Optional: one first-earn mark on celebration — **same** wallet/mic, not a new kit.

Onboarding does **not** get a separate illustration set. Reuse one mark.

Import as ES modules + `ImageWithFallback` if they enter code (Vite hashing). Figma Make: keep a single component set, two colours only.

---

## 11. Explicitly out of scope

- Carbon / full-app dark theme (`theme/carbon-design`)
- Clay / 3D / titled “semi-3D” objects
- Quest-creator desktop platform
- Mesh gradient on every card “because 2026”
- Inventing `--surface-hero` as a new hue — it must alias existing ink/navy
- Stock 3D icon packs

---

## 12. Implementation order (do not reorder)

Skipping to pictures while layout is still a kit is how the app stays junior.

**Pass 0 — System (no pictures)**  
Spacing scale, one hero per view, one CTA, kill extra hues, orange = cash-in-motion only. Unify type roles. Tokens for any remaining hero colour (`--surface-hero` = existing navy/ink, `--accent-glow`).

**Pass 1 — Activation**  
Auth + promise screen. Delete 3-slide onboarding + extra navy hook page (or collapse into screen 1). Consent sheet. Calibration = first quest. UPI at wallet. Mic permission at first record.

**Pass 2 — Recording**  
Brief → capture (thumb zone, hide tabs) → clip review → session review → pending. Fix CTA routes. Group = A or B.

**Pass 3 — Home + Wallet surfaces**  
Light Home. Money atmosphere **once** on Wallet (§13). Streak = sparkline or leave Home. Progressive new-user Home.

**Pass 4 — Starve cards**  
Quest card as in §5.

**Pass 5 — Marks (optional)**  
6–8 flat two-color. If they look generated, ship without them.

---

## 13. OPEN DECISION — replacing the navy slab

This is the remaining visual decision. The slab is **chunky, solid, overused, and boring**. It was doing three jobs at once (premium, money, “this screen matters”). Those jobs must be split.

### 13.1 Why the slab happened

- Dark = “serious money” (CRED-ish instinct).
- Figma Make / kit: one high-contrast rounded rectangle = instant hierarchy.
- Waveform overlay tried to make it “audio brand.”
- Result: Home, wallet, onboarding, celebration, recording, repair all use the same brick. Premium became a **background habit**.

### 13.2 Jobs to separate

| Job | Should live on |
|---|---|
| “This is real rupees” | Wallet — large type, available vs pending, not a wallpaper |
| “This screen is important” | Size, isolation, one CTA — not a fill colour |
| “We do audio” | Motion **during** recording only |
| “Premium / 2026” | Air, type, one atmospheric material — not navy fill |

### 13.3 Options (explore in Figma Make — pick one money recipe)

**Do not apply the winner to Home and Wallet and celebration.** Winner = **Wallet header**. Home stays light. Recording studio is a **different** dim recipe (mode), not the same component.

#### Option A — Light ledger (most “2026 quiet craft”)

Wallet header is a **light** card: huge black/ink ₹, small “available,” pending as a second line in mute. No fill hero. Withdraw button is the only orange field.

- **Pros:** Matches Linear/Apple restraint; kills chunky; easiest colour harmony; Home and Wallet finally share a world.
- **Cons:** Can feel like a settings page if type isn’t large enough; less “wow” in a 5-second scroll.
- **When it wins:** If type is 40–48px tabular and padding is generous. If type stays 24px, it will look empty-cheap, not premium.

#### Option B — Soft wash (recommended default to explore first)

One **low-contrast** atmospheric field behind the ₹ only: terracotta into warm ink, heavy blur, slow drift (optional, reduced-motion: static). The rupee stays **high contrast** (white or ink depending on wash). Almost no inner chrome (no waveform, no icon tile, no extra stats).

- **Pros:** Answers “startup premium” without 2021 Stripe mesh wallpaper; still one money moment; can animate quietly.
- **Cons:** Easy to overdo (rainbow blob, noise, high saturation). Must be **one hue family** (orange/ink), occupancy ~30–40% of the card, rest quiet.
- **Rules:** No second blob on Home. No animation faster than ~8–12s loop. Contrast of ₹ vs wash ≥ 4.5:1. Reduced `prefers-reduced-motion`: freeze.

#### Option C — Ink strip, not a brick

A **thin** horizontal ink band (not a tall rounded rectangle): ₹ sits in the band; pending and UPI sit on **page** below in light. Brick becomes a **bar**.

- **Pros:** Keeps “money is dark” without eating half the viewport; Home can use a *tiny* strip or none.
- **Cons:** Can look like a site header; less room for pending on the same field.

#### Option D — Typography-only money (no field)

No card. ₹ is the first element under “Wallet,” 56px, then pending, then withdraw. Like a receipt.

- **Pros:** Maximum air; strongest anti-kit statement.
- **Cons:** Hardest to make feel “safe” for rupees; withdraw CTA must carry all affordance.

#### Rejected

- Clay object on the same navy brick (already tried).
- Mesh/aurora on every hero.
- Glassmorphism cards.
- Keeping `#0F1822` gradient + waveform as the signature.

### 13.4 Home after the slab is gone

Home must not invent a replacement brick.

- **Today’s money:** one line in the header (`₹185 today`) or a small light row — not a second atmosphere.
- **CTA:** “Start earning” / next quest — orange pill, thumb reachable.
- **List:** starved quest cards.

Celebration (`+₹50`) can use **Option B once** (same wash as Wallet) or stay light with huge type. Do not introduce a third recipe.

### 13.5 Figma Make exploration brief (navy replacement)

Produce **four Wallet headers** (A/B/C/D) at the same content (₹127.50 available, ₹60 pending, withdraw). Same type scale. No clay. No waveform.

Then **one Home** using the winning Wallet language without duplicating the hero field.

Success criteria:

- Recruiter can tell Wallet from Home at a glance without both being dark.
- ₹ is the first thing read.
- Pending is unambiguous (not “security reserve” jargon unless the product still needs that state — label **Pending**).
- Feels like 2026 craft: air, blur-or-type, not a filled rounded rect.

---

## 14. Copy / product honesty (do not regress)

- First earn: **pending until review**, not “instant payout” / “credited instantly” if validators exist.
- Calibration copy must match pending-review screen.
- Consent: voice data, who can reach it, deletion — short.
- No fake metrics.

---

## 15. Case study impact (portfolio)

If activation moves to Home-first, the case study walkthrough becomes:

**Home states the contract → first quest is calibration → wallet shows pending.**

That is more honest than a seven-step funnel. Stakeholder framing (founder brief vs payout-first trajectory) stays a writing task; this upgrade should make the **prototype** match that story.

---

## 16. Current code anchors (so Figma Make doesn’t invent routes)

| Flow | Routes / files |
|---|---|
| Onboarding slides | `/` → `Onboarding.tsx` |
| First earn hook | `/first-earning` |
| Consent → guidelines → calibration → celebration → profile | `/data-consent` → `/submission-guidelines` → `/voice-calibration` → `/earning-celebration` → `/profile-setup` |
| Home / quests / wallet | `/contributor`, `/contributor/quests`, `/contributor/wallet` |
| Record | `/recording/:questId` (`q-lines-1`, `q-scen-1`, `q-group-1`, …) |
| Repair | `/rejected/:questId` |
| Tokens | `src/styles/theme.css` — accent hue ~34, navy = `--neutral-950` |
| Quest data | `src/app/lib/quests.ts` — formats `lines` \| `scenario` \| `group` |

Embed: `?embed=1` must not draw fake iOS chrome or DEV tools.

---

*End of brief. Next conversation: choose §13 option for the money surface and prototype it before any illustration work.*
