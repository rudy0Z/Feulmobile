FEUL — prerequisite + amended Pass 3
Read this before touching Home or Wallet. This supersedes Pass 1 item 7, brief §6.3, and the Pass 3 “Light Home” paragraph in plans/great-understandingof-the-situation-witty-castle.md. Pass 0–2 stay. Recording stays.

════════════════════════════════════════
0. YOU MISREAD “EMPTY STATE.” THAT IS WHY HOME IS BROKEN.
════════════════════════════════════════

“Empty” never meant a blank screen, a tutorial, or a landing page inside the tab bar.

It meant EMPTY DATA on a FULL PRODUCT.

A new user has no earnings, no streak, no activity, no UPI. They still walk into an APP:
- a welcome (Good evening, Alex — this is not optional)
- a dashboard-shaped Home (the same house they will live in later)
- how to get started ON that dashboard
- work on the shelf (quest cards with ₹)
- a till that reads ₹0, not “we hid the till”

Familiar entry. Not a wizard. Not a Notion page. Not three how-it-works rows as the whole UI.

What you built in Pass 1 (NewUserHome) is the opposite:
- Day-0: headline + 1-2-3 list + one button on white. That is onboarding again.
- After submit: “Nice work / Under review / ₹50 expected” as a different layout. That is a receipt, not Home.
- Credited: another special layout.
You gated the real Home.tsx behind `profile.stage !== 'credited'`, and credited is never set, so nobody reaches the actual product. That is a product failure, not “progressive disclosure.”

Brief §6.3 and Pass 1.7 said “one sentence + one quest CTA” and “three NewUserHome stages.” That wording was wrong. It was meant to BAN dumping languages + UPI + fake milestones + social proof on day 0. It was NOT permission to delete the dashboard. Treat §6.3 / Pass 1.7 as VOID.

If a first-landing screenshot could be mistaken for an onboarding slide, it fails. Rebuild.

════════════════════════════════════════
1. BEFORE PASS 3 — do this first
════════════════════════════════════════

1. Delete NewUserHome as a destination.
   - Remove the branch in Home.tsx (`isNewUser` / `stage !== 'credited'` → <NewUserHome />).
   - Delete or stop importing src/app/components/NewUserHome.tsx.
   - After auth, `/contributor` always renders the real Home.

2. One Home file. Three DATA states, not three layouts.
   Drive off profile/session (and DevPanel):
   - empty  = just signed in, nothing submitted
   - pending = first session submitted, not credited yet
   - live   = has credited ₹ (established / demo)
   Same chrome, same modules, different numbers and copy inside them.

3. Wire the states for real:
   - sign-in → empty
   - Recording submit (already calls advanceStage('session')) → pending
   - DevPanel must switch Empty / Pending / Live on THIS Home. Do not keep a “new user layout” toggle that hides the dashboard.
   - Optional: a DevPanel control to jump to live/credited for demo. The product does not need a fourth screen.

4. Keep auth as the one promise screen. Consent stays the lazy sheet before first capture. UPI stays in Wallet. Do not bring back the 10-tap funnel.

5. Do not start the Wallet bake-off until Home is the real Home again. If you skip (1–4), Pass 3 will decorate the tutorial.

════════════════════════════════════════
2. PASS 3 — what still holds vs what changes
════════════════════════════════════════

STILL HOLDS
- Wallet header bake-off A/B/C/D on a dev-only route; pick one; apply to Wallet header ONLY; then delete harness.
- Wallet hierarchy: available ₹ huge → pending secondary → Withdraw thumb-zone → UPI at first withdraw → ledger → XP mute.
- No clay, no Carbon dark theme, no waveform as wallpaper, no mesh on every card.
- Streak as Duolingo week is banned on Home. Sparkline of ₹ credited/day OR move to Profile.
- De-slab Performance / Profile / Rejected / Celebration if they still use the navy brick. Validator only if free. Skip quest-creator dashboard.
- One money-atmosphere recipe in the app = Wallet winner. Recording studio is a different dim mode.

PATCHED — Light Home (§6 / Pass 3 item 3)

Throw out: “greeting (quiet) + one ₹185 line + CTA + short list” if that produces a white void with text.

Replace with: the EXISTING Home.tsx STACK, redesigned in place.

Source of truth for structure is the established Home (the one currently hidden), not NewUserHome:

  [Warm greeting hero — welcome]
  [Today / Get started BOARD — the dashboard widget]
  [Primary CTA]
  [Picked for you — 2–3 quest cards, ALWAYS visible]
  [Activity PANEL — always a panel]
  [tabs already in MainApp]

You are not inventing a new IA. You are emptying the DATA in that IA and giving the board real material so the screen is not white-on-white.

PATCHED — brief §13.4 “Home must not invent a replacement brick”

Corrected meaning: do not put a SECOND navy Wallet clone on Home. Home MAY have one composed Today/Get-started module with weight (soft wash or light ledger panel, big type). That module is “today + start,” not “available to withdraw.” Wallet remains the till.

PATCHED — “starve” does not mean “delete modules.”
Starve = no fake lifetime+weekly+ring+streak+bonus timer+XP bar+fake activity all screaming at once.
It does not mean remove welcome, remove the board, remove quests, remove activity.

════════════════════════════════════════
3. HOME — what to actually build
════════════════════════════════════════

CANVAS
Stop using cool hospital `--background` as the only field. Home sits on warm paper (`--cream` / accent-50 mist). Restore and turn UP the existing greeting wash (terracotta into page). Quiet craft still has a hero moment. If the screenshot looks like a settings doc, it fails.

WELCOME (all states)
Logo + bell (empty on empty state — no fake 3 unread).
Greeting + name is mandatory: “Good evening, Alex.”
One short line that changes with data:
- empty: “Your first rupees are one recording away.” (not a 3-step essay)
- pending: “First clips are in — still under review.”
- live: skip the pep talk; the ₹ is enough.

TODAY / GET STARTED BOARD (the thing that was the navy brick — rebuild, don’t delete)
This is the dashboard object. Same widget, three fillings:

EMPTY (new user, no data)
- Huge ₹0 (tabular). Quiet caption: ₹12–220 a quest.
- How to get started LIVES HERE, not instead of Home: the first job named in the board
  `Hindi — Everyday Phrases · 3 min · ₹12` + Record.
- Do not fake ₹185, daily goal, % ring, weekly total, 5-day streak.

PENDING (after first submit)
- Same board. ₹0 available. Second line: ₹xx under review (the quest they just did).
- CTA: Record another / open quests.
- Do NOT navigate to a “Nice work Alex” full-screen. Pending is a row/state of this board + activity.

LIVE
- One number: ₹185 today (or available — pick one, not both). No goal denominator, no ring, no weekly on the same object.
- CTA: real quest id.

Weight: this board needs SURFACE (Option B-soft wash at low occupancy, or a light ledger card with generous padding and 40–48px ₹). Not body text on white. Not the tall navy “Today’s Progress” gym brick with ring + weekly + glow + waveform.

KILL ON HOME (all states)
- Duolingo week + flame streak by the avatar
- +20% bonus 8-min chip competing with the CTA
- XP / Silver tier bar (Profile)
- Fake activity of café/group/doctor the user never recorded
- Waveform wallpaper
- A second how-it-works list below the board (auth + the board already start them)

QUEST CARDS — NON-NEGOTIABLE ON FIRST LANDING
Picked for you stays on empty Home. Café / Interview / Room with real ₹. This is the shop window. Hiding cards “until they have data” is how you ruined sell. Pass 4 will starve card anatomy later; Pass 3 may keep current cards. Do not remove the section.

ACTIVITY — A PANEL, NOT A PAGE
- empty: the panel still exists. One line inside: “Your recordings will show up here.”
- pending: one real row (that quest · under review · expected ₹)
- live: a few real rows. Rejected still tappable to Repair.

CTA
Name the job on empty: “Record Hindi phrases · ₹12” not generic “Start Earning Now.” Route `q-lines-1` (already fixed). Thumb-reachable orange pill — the one primary CTA.

════════════════════════════════════════
4. WALLET (after Home is the real Home)
════════════════════════════════════════

Bake-off first, as the plan says: A light ledger / B soft wash / C ink strip / D type-only. Same content: ₹127.50 available, ₹60 pending labeled Pending, one Withdraw. No clay, no waveform. Dev-only route. Judge, apply winner to Wallet header only, delete losers.

Empty wallet = SAME header with ₹0 (and pending if any). Not a “locked potential” navy poster, not a different empty-wallet product. UPI nudge when they try to withdraw or after first credit — not a pre-Home wall.

Hierarchy as planned. Home’s board ≠ Wallet’s header. If both are identical dark rectangles, fail.

════════════════════════════════════════
5. DEVPANEL
════════════════════════════════════════

Replace “new user on/off + day0/session/credited as other UIs” with:
Empty Home / Pending Home / Live Home
Empty Wallet / Funded Wallet
Same screens. Different data.

════════════════════════════════════════
6. VERIFY
════════════════════════════════════════

- Fresh signup → dashboard Home with welcome + board + how-to-start on the board + quest cards. Not NewUserHome.
- Complete a quest → same Home, pending on the board + one activity row. Not “Nice work” as a route.
- DevPanel Live → same Home with ₹ filled in.
- Home and Wallet distinguishable; Wallet is the money atmosphere; Home still has a weighted Today board.
- Canvas is warm, not void-white. ₹ contrast ≥ 4.5:1. Reduced-motion freezes wash.
- No isNewUser branch that hides Home.tsx.

════════════════════════════════════════
7. DO NOT
════════════════════════════════════════

- Keep NewUserHome as the signed-in default
- Interpret “empty” as sparse / tutorial / 1-2-3 page
- Interpret “light quiet” as white background + only text
- Fake a rich contributor life on day 0
- Dump languages, UPI, milestones, weekly social proof on Home
- Put clay, 3D, mascot, or waveform wallpaper back
- Run Pass 4/5 in this pass
- Redesign recording except free tidy (studio enter transition) if it does not delay Home