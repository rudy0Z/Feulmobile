You are fixing critical UX logic errors in the Feul.AI 
contributor and validator mobile screens. This platform's 
core design principle is: INR cash is the primary signal. 
XP/Points are secondary behavioral boosters only. 
Every fix below enforces this principle.

---

FIX 1 — CONTRIBUTOR HOME SCREEN: Hero Card

Current (wrong): Large card shows "1,530 Points" as 
the primary number with points icon.

Fix:
Split into TWO stacked values inside the hero card:

Primary (large, DM Mono 32px, #1A1208):
₹1,250.00
Label below in 12px muted: "Available to withdraw"

Secondary (small, 16px, muted colour #A89880, 
separated by a thin divider line):
1,530 XP  •  Level 3
Label: "Used to unlock multipliers — not withdrawable"

Card background: #C4622D (accent)
Primary ₹ value: #FFFFFF
XP line: rgba(255,255,255,0.6)

Add a "Withdraw" button (small, pill-shaped, 
white outline) inside the card, bottom right.
Withdraw button disabled state: greyed out with 
tooltip "Minimum ₹500 to withdraw"

Remove the "+380 points this week" growth indicator 
from the hero card entirely. 
Move it to a small line in the Recent Activity section.

---

FIX 2 — QUEST CARDS: Payout Display

Current (wrong): "⚡ 150 pts (≈ ₹15)"
Points are the lead. INR is the qualifier.

Fix all quest cards to this structure:

Payout line:
₹15  (DM Mono, 16px, #2D7A4F success green, bold)
+ 150 XP  (DM Sans, 12px, #A89880 muted, regular weight)

The ₹ amount must always be the first number the 
eye hits. XP is subscript-level importance visually.

Apply to: Quest Feed cards, Featured Quest card, 
Quest Detail screen, Post-submission confirmation.

---

FIX 3 — QUEST FEED: Navigation Tab

Current (wrong): Bottom nav = Home, Quests, Rewards, Profile
"Rewards" as a primary tab elevates gamification 
to core product.

Fix:
Replace "Rewards" tab with "Wallet" tab.
Wallet icon: a simple wallet/card icon (not a gift/trophy).
Wallet tab content: 
- Available balance (hero)
- Withdrawal history
- Pending earnings (with status chips)
- TDS deduction transparency line: 
  "10% TDS auto-deducted on payouts above ₹30,000/year"
- UPI ID linked (edit option)

Move all XP Rewards / voucher redemption content 
into Profile tab, under a section called 
"Perks & Multipliers" — collapsed by default, 
user must tap to expand. This signals it is 
supplementary, not core.

---

FIX 4 — VALIDATOR GRADING CONTROL

Current (wrong): Vertical list of 5 radio-button 
style options (Perfect, Satisfactory, Neutral, 
Not Satisfactory, Not Usable). Forces read-select 
per clip. Too slow for batch work.

Fix: Replace with horizontal segmented control.

Layout: Full-width horizontal bar, 5 equal segments
Labels (short, shown below the bar as a legend, 
not on the bar itself):
1 = Not Usable
2 = Poor  
3 = Neutral
4 = Good
5 = Perfect

Bar interaction:
- Default state: all segments #EDE9E1 (unselected)
- Selected segment: fills with colour gradient
  1-2: #C0392B (red end)
  3: #B8860B (neutral amber)  
  4-5: #2D7A4F (green end)
- Selected segment shows number large (20px DM Mono) 
  inside the filled segment

Below the bar, show the full label of selected grade:
"4 — Good quality, minor issues acceptable"
(14px DM Sans, #6B5B45)

Keyboard shortcut hint (shown once, then dismissible):
"Tip: Press 1–5 to grade faster"

After selecting, "Submit Grade" button activates 
(was disabled/greyed before selection).
Submit button: full width, 48dp height, 
accent colour #C4622D, DM Sans SemiBold 16px.

Swipe to next clip gesture: swipe left after 
submitting auto-advances to next clip with 
a brief success micro-animation (green checkmark, 
200ms, then next clip loads).

---

GLOBAL RULE FOR ALL FIXES:
Wherever XP/Points appear alongside INR:
- INR always appears first, larger, darker
- XP always appears second, smaller, muted (#A89880)
- Never use the word "earn" for XP. Use "unlock" or "gain"
- Never use the word "earn" for INR without specifying ₹
  Example: "Earn ₹15" not "Earn 150 points"