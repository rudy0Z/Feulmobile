 Apply all 
changes below.

---

DESIGN TOKENS (apply globally across all screens)

Background: #FCFBF7 (warm off-white, not pure white)
Surface/Card: #FFFFFF with 1px border #F0EDE6
Primary Accent: #C4622D (burnt orange-brown)
Secondary Accent: #8B6914 (olive/dark gold for XP/points only)
Text Primary: #1A1208 (near black, warm)
Text Secondary: #6B5B45 (warm brown-grey)
Text Muted: #A89880
Success: #2D7A4F
Warning: #B8860B
Error: #C0392B (soft, not harsh red)
Divider: #EDE9E1

Typography:
- Headings: DM Serif Display, sizes 28/24/20px, weight Regular
- Subheadings: DM Sans, 16px, weight SemiBold
- Body: DM Sans, 14px, weight Regular
- Caption/Label: DM Sans, 12px, weight Medium
- Monospace numbers (wallet balance): DM Mono, weight Medium

Border radius: Cards 16px, Buttons 12px, Tags 20px, 
Input fields 10px
Elevation: Cards use box-shadow 0px 2px 8px rgba(26,18,8,0.06)
No harsh drop shadows anywhere.

---

PLATFORM: Design for Android-first (Material You compatible)
- Use Android nav gesture zones (bottom 32px safe area)
- Touch targets minimum 48x48dp
- Bottom navigation bar height: 64dp
- Status bar: transparent, dark icons
- Add note annotation on each screen: 
  "Designed for Android. iOS variant: [swap nav bar style only]"

---

BOTTOM NAVIGATION (apply to Contributor and Validator apps)

Contributor nav tabs (4 items):
1. Home (house icon)
2. Quests (compass icon)  
3. Wallet (wallet icon) ← replaces "Rewards"
4. Profile (person icon)

Active state: Primary accent colour #C4622D + label visible
Inactive state: Text muted #A89880, no label
Remove "Rewards" as a standalone tab entirely. 
Rewards/XP content moves inside Profile tab.

Validator nav tabs (3 items):
1. Home (house icon)
2. Tasks (checklist icon)
3. Profile (person icon)

---

MISSING STATES — build all of the following as new screens:

CONTRIBUTOR — Empty Quest Feed
Screen title: "No quests in your language right now"
Illustration: Simple line illustration, warm tones, 
person with microphone
Body copy: "New quests in Hindi and Marathi are added 
daily. We'll notify you when one matches your profile."
CTA button: "Update Language Preferences" (secondary style)
Secondary CTA: "Browse All Languages" (text link)
Do NOT use generic "Nothing here yet" copy.

CONTRIBUTOR — Empty Wallet (₹0, first time)
Do not show ₹0 as a depressing empty state.
Show: "Your earnings will appear here"
Sub: "Complete your first quest to start earning. 
Most contributors earn ₹50–₹150 in their first session."
CTA: "Find a Quest" (primary button, accent colour)
Below CTA: Small text — "Payouts processed every Monday 
to your UPI ID"

CONTRIBUTOR — Rejected Submission
Card style, soft error (use #FDF3F2 background, 
#C0392B left border 3px)
Header: "This clip wasn't accepted"
Reason field (always populated, never blank):
Example: "Reason: Background traffic noise detected"
Secondary reasons as tags below: 
[Too short] [Background noise] [Clipping detected]
Primary CTA: "Re-record This Clip" (accent button)
Secondary CTA: "Skip to Next" (text link)
Small note below: "Re-recording doesn't affect your 
streak or level"
Partial payout notice: "You'll receive 10% effort 
credit (₹1.50) for this attempt"

CONTRIBUTOR — Pending / Under Review State
Use within the Recent Activity list as a status tag.
States as chips:
- "Auto-check passed" → olive/gold chip
- "Under Validator Review" → muted blue-grey chip  
- "Approved ₹15 credited" → success green chip
- "Rejected — See reason" → soft red chip, tappable
Each chip is 12px DM Sans Medium, 20px border radius.

VALIDATOR — Empty Batch State
"You're all caught up"
Sub: "No clips waiting in your assigned languages. 
Check back in a few hours or pick up a new language batch."
Show accuracy score prominently even on empty state: 
"Your accuracy this week: 94.8%"
CTA: "Add Another Language" (secondary button)

VALIDATOR — Consensus Mismatch State
Trigger: Your grade differs significantly from 
2 other validators on the same clip.
Show as a modal overlay on the grading screen.
Header: "Your grade differs from others"
Body: "You graded this 'Satisfactory'. Two other 
validators graded it 'Not Usable'. Listen again 
and confirm or update your grade."
Show the waveform player again inside the modal.
Two actions: "Keep My Grade" | "Change Grade"
Small note: "Consensus disagreements are reviewed 
by senior validators and don't penalise you."

---