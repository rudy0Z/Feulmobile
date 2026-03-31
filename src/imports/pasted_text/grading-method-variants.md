
CORE CHANGE 1 — REMOVE SUBMIT BUTTON

Remove the "Submit Grade" button entirely.

Replace with: auto-advance behaviour. When a validator 
selects a grade, the screen automatically advances to 
the next clip after 400ms.

Add a slim toast notification at the very top of the 
screen (below the progress bar) that appears for 
3 seconds after each grade:

Toast content: "Graded: [selected grade label] · Undo"
- "Undo" is a tappable text link
- Tapping Undo returns to the previous clip with the 
  grade cleared
- Toast dismisses automatically after 3 seconds
- Toast does not block any other UI

---

CORE CHANGE 2 — GRADING METHOD TOGGLE

Add a small toggle button to the top right of the 
grading screen, next to the "Skip" button.

Label: "Grading Style"
Icon: a grid or layout switch icon
Style: match the existing secondary button style 
on the screen

Tapping this button opens a bottom sheet modal with 
the title "Choose Grading Style" and 5 selectable 
options. Currently active method shows a selected 
state (checkmark or filled indicator).

---

THE 5 GRADING METHOD OPTIONS:

Each option in the bottom sheet shows:
- Method name (bold, 14px)
- One line description (12px, muted)
- A small visual preview thumbnail (just a simplified 
  illustration of the control, not functional)

Option 1 — "Segmented Control" (default, currently active)
Description: "Tap 1–5 on a horizontal scale. 
Builds speed with practice."
Preview: horizontal bar with 5 segments, 
colour gradient red to green

Option 2 — "Labelled Pills"
Description: "Five full-width buttons with 
grade labels always visible."
Preview: 5 stacked pill shapes with labels

Option 3 — "Thumb Arc"
Description: "Five grade zones mapped to your 
thumb's natural reach across the screen bottom."
Preview: slight arc of 5 circles across bottom zone

Option 4 — "Keyboard Grade"
Description: "Press 1–5 to grade instantly. 
Colour confirmation flash on each input."
Preview: number keys 1–5 in a row with 
colour indicators

Option 5 — "Binary + Flag"
Description: "Accept or reject only. Flag 
edge cases for senior review."
Preview: two large buttons, accept and reject, 
plus a small flag icon

---

CORE CHANGE 3 — BUILD ALL 5 AS SEPARATE SCREEN VARIANTS

After the bottom sheet, build each grading method 
as a fully designed separate screen variant so all 
5 can be shown side by side in the case study.

For each variant, apply the following rules:
- No submit button on any variant
- Undo toast present on all variants
- Progress bar and clip counter consistent across all
- Transcript and waveform player consistent across all
- Flag as Fraud / AI-Generated button present on all
- Only the grading control section changes per variant

VARIANT 1 — Segmented Control
Horizontal bar, 5 equal segments
Colour gradient: leftmost segment red tones, 
middle neutral, rightmost green tones
Segment labels appear as legend BELOW the bar:
1-Not Usable · 2-Poor · 3-Neutral · 4-Good · 5-Perfect
On tap: selected segment fills with colour, 
unselected segments dim to 30% opacity
Selected grade label shown below legend in larger 
text: "4 — Good"

VARIANT 2 — Labelled Pills
5 stacked full-width pill buttons, 52dp height each
Each pill shows: number on left + grade label centred
Colour per pill matches quality:
1 = muted red tint background
2 = light red tint
3 = neutral/warm grey tint
4 = light green tint
5 = green tint
On tap: pill fills fully with colour, 
others reduce to 20% opacity

VARIANT 3 — Thumb Arc
Place 5 circular tap targets (64dp each) 
across the bottom 100dp of the screen
Arrange in a subtle upward arc 
(centre circle highest, edges lowest)
Each circle: number inside, colour coded 
red to green left to right
No labels on circles — grade name appears 
as large centered text above the arc 
when a circle is tapped
Arc sits above the bottom navigation bar

VARIANT 4 — Keyboard Grade
Show a persistent number row at the bottom 
of the screen: keys 1, 2, 3, 4, 5
Each key: 64dp height, full width divided by 5
When a key is pressed: full screen background 
flashes the corresponding colour for 400ms
(1-2 = red, 3 = amber, 4-5 = green)
Grade label appears as large centered overlay 
text during the flash: "POOR" or "PERFECT" etc.
Flash fades, screen auto-advances

VARIANT 5 — Binary + Flag
Two large buttons side by side, 72dp height:
Left button: "Reject" — muted red
Right button: "Accept" — muted green
Below the two buttons: a smaller full-width 
outlined button "Flag for Senior Review"
Flag button opens a tag selector:
[Wrong Language] [AI Generated] [Fraud Attempt] 
[Needs Context] [Ambiguous Quality]
Selecting a tag auto-submits the flag and advances

---

ANNOTATION LABELS

Add a small annotation pill (top left corner, 
grey background) to each variant screen:
"Method [number]: [method name]"
Example: "Method 1: Segmented Control"
