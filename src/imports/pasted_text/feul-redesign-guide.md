Redesign the entire Feul Mobile system with the following direction. 
Apply changes globally across all screens unless a screen is specified.

━━━ VISUAL LANGUAGE SHIFT ━━━

Move away from "Dribbble clean" toward "production real." 
This means:
- Vary card density intentionally. Not every card should be the same height or padding.
- Break the rhythm occasionally. Let one section feel tighter, another more spacious.
- Mix surface types: some information lives in cards, some lives directly on the background 
  without a card container, some lives in a full-bleed colored band.
- Reduce the number of bordered white cards. Reserve card containers for interactive 
  or tappable objects only. Use naked type + dividers for lists and secondary info.

━━━ COLOUR SYSTEM EXPANSION ━━━

The current terracotta (#C4622D) stays as the primary accent but it cannot be the only 
expressive colour. Introduce:

- A deep ink-navy (#1A1F2E) as a second expressive surface. Use it for the wallet 
  balance card, the XP block, the featured quest card, and the enterprise plan badge. 
  This creates a two-tone personality: terracotta for energy and action, 
  navy for value and status.
- Warm cream (#FAF6F0) as an alternate background surface instead of pure white 
  for screens that need softness (onboarding, empty states, profile).
- Keep green and amber only for status signals (credited, pending, rejected). 
  Do not use them decoratively.

━━━ TYPOGRAPHY AGGRESSION ━━━

Every screen needs a clear three-level type hierarchy enforced:

Level 1 — Screen hero: 28–32px, weight 700–800, tight tracking (-0.02em). 
          One per screen. No exceptions. This is the number, the name, 
          the state, the one thing that owns the screen.
Level 2 — Section anchors: 15–17px, weight 600, normal tracking. 
          These divide the screen into scannable zones.
Level 3 — Body/labels: 13–14px, weight 400–500.

The cash balance (₹1,250.00), the XP value (2,840 XP), the accuracy score (94.8%) 
should all be rendered at 36–40px bold. They are the hero of their respective 
sections and should read from across the room.

━━━ ONE DOMINANT ACTION PER SCREEN ━━━

Audit every screen and enforce a single primary CTA:

- Contributor Home → "Start Recording" is the only full-width high-contrast button. 
  "Browse Quests" becomes a ghost/outline button, visually subordinate.
- Quests screen → "Start" on the featured card is the dominant tap target. 
  List items below have minimal secondary play buttons.
- Validator Home → "Resume Grading" is the one button. Stats are informational only.
- Wallet → "Withdraw" is full-width terracotta at the bottom, always visible.
- Quest Recording → "Submit" is the only CTA visible. "Retry" is text-only, no button border.

Make primary CTAs taller: 56px height minimum, full rounded pill shape, weight 700.

━━━ SIGNATURE VISUAL ELEMENT ━━━

On every screen, reserve a 40x40px space in the top-left of the navigation bar 
for the Feul wordmark/logo. Leave it as a placeholder rectangle with label 
"[LOGO]" for now — do not fill it with text or icon. 

Additionally: every screen should carry one organic waveform shape — a single soft 
horizontal audio waveform graphic used as a decorative background texture on the 
hero section. On the contributor home, it sits faintly behind the cash balance card. 
On the quest recording screen, it is the dominant visual behind the transcript. 
This is Feul's signature visual — voice = waveform. 
Make it subtle (8–10% opacity) where decorative, prominent where functional.

━━━ SCREEN-SPECIFIC FIXES ━━━

ROLE SELECTION SCREEN:
Tear it down and rebuild with emotional pull.
- Full-bleed dark navy background (#1A1F2E).
- Large headline centered: "How will you shape AI?" — 32px, white, weight 700.
- Three role cards stacked, each with a distinct coloured left-border accent 
  (terracotta for Contributor, slate-blue for Validator, golden-olive for Quest Creator).
- Each card shows: role name large (18px bold), one-line tagline in orange/accent, 
  2-line description in muted white.
- Bottom: "Already have an account? Sign In" in small muted text.
- Remove the generic microphone icon from the header. No illustration.
- The screen should feel like a product with a point of view, not a sign-up form.

ONBOARDING SLIDES ("You are the source"):
- Keep the strong copy. Make it bigger — headline at 36px, weight 800.
- Replace the soft circle icon with the waveform signature element in full colour.
- The continue button should be full-width, 56px, terracotta pill.
- The pagination dots should be terracotta, not grey.

EMPTY STATE (No quests available):
- Replace the generic message with: "Your languages are resting."
  Subtext: "New quests in Hindi and Marathi drop soon. You'll be the first to know."
- Add a faint waveform background texture in terracotta at 12% opacity.
- One CTA: "Update Language Preferences" — outlined button, terracotta.
- No checkmark icon. No generic illustration.

PROFILE SCREEN:
- Move the avatar to the left and make the name+level the dominant header element.
- The XP block should be navy background (#1A1F2E), white text, terracotta progress bar. 
  This should feel like a status symbol, not a widget.
- Earned badges: increase icon size to 48x48px, add a subtle terracotta glow 
  on unlocked badges. Locked badges should be clearly greyed.
- Data Vault section: give it its own card with a light amber background (#FDF8E8) 
  and an amber left-border to signal it is a different category of information 
  (consent / ownership). This section has legal weight — it should look different.

ENTERPRISE CAMPAIGN MANAGER:
- The campaign cards need density variation. Large active campaigns get expanded cards 
  showing contributor count, quality %, and days remaining. Paused campaigns collapse 
  to a single row with a resume button.
- The progress bar colour should follow campaign health: 
  above 80% = terracotta, 50–80% = amber, below 50% = grey.
- "Create New Campaign" button: navy background with white text. 
  This is the B2B power action — it should not share visual language with 
  the contributor-side orange CTAs.

GAMIFICATION / ACHIEVEMENT BADGES:
- "Consistent" and "Expert" achievement badges must not look like error chips.
  Redesign as 64x64px cards with: large icon top-center, badge name bold at bottom, 
  terracotta background for earned, neutral grey for unearned.
- The XP level block: navy card, large XP number at 36px white bold, 
  level label in muted terracotta, lightning bolt icon in terracotta.

VALIDATOR GRADING SCREEN:
- This screen is already the strongest. Keep the labelled pill rating system.
- Only change: increase the waveform player height to 96px and make the 
  waveform bars terracotta (#C4622D) on a dark (#1A1F2E) player background. 
  This makes grading feel like a professional audio tool, not a generic player.

━━━ EMOTIONAL LAYER ━━━

This product is "earn money with your voice." Every screen should carry 
a low-level sense of reward anticipation. Achieve this through:

- Earnings numbers in large bold terracotta wherever they appear inline 
  (activity feed, quest cards, wallet).
- Status labels: "Approved ✓" in green, "Under Review" in amber, "Rejected" in red — 
  these should be pill-shaped with coloured backgrounds, not plain text.
- The contributor home "This Week" earnings delta (+₹254) should be 
  in large terracotta with an upward arrow icon. Make it feel like a win.
- Micro-copy on the recording completion screen: change "Recording complete!" 
  to "Clip submitted. Your voice just trained an AI." 
  This is the emotional payoff of the entire contribution flow.

━━━ WHAT NOT TO CHANGE ━━━

- The grading pill system (1–5, color coded) — keep exactly as is.
- The quest card metadata format (time / clips / language / pay) — keep as is.
- The earnings ledger structure on the wallet screen — keep as is.
- The onboarding copy ("You are the source. Feul is your refinery.") — keep exactly.