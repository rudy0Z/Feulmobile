# Implementation Plan: Elevating Feul Mobile to 2026 Modern Design & UX Standards

This implementation plan details the technical steps required to address the aesthetic and functional friction points identified in the design audit of **Feul Mobile**. The plan establishes a dual-typeface system, imports Oklch color gradients, and implements interactive mobile-first patterns (Swipe-to-Approve, dynamic voice coaching, selective prompt repairs, and validator triage).

---

## User Review Required

> [!IMPORTANT]
> **Typographic System Upgrades**: We will import `Bricolage Grotesque` (display headers) and `Space Mono` (bank-ledger style financial metrics) alongside `PlusJakartaSans` (body) from Google Fonts. Please verify if you would prefer alternative visual typefaces (e.g., `Outfit` or `JetBrains Mono`).

> [!WARNING]
> **Behavioral Reframing of Bronze Held Balance**: In `Wallet.tsx`, first-time Bronze contributors are held to a 60% cash ratio (40% held to prevent sign-up gaming). 
> *   We propose **exempting the initial calibration ₹50 hook** so it is 100% withdrawable immediately, acting as a high-trust loss leader.
> *   For subsequent earnings, we will reframe the held balance in the UI as a **"Security Verification Reserve"** instead of "Platform Credit" to avoid looking like fee gouging. Please confirm if this security reserve logic is aligned with your system constraints.

---

## Open Questions

> [!QUESTION]
> **Real-time Edge Audio Validation**: The design includes a visual voice coach during recording that detects when a user is speaking too softly or in a high-noise environment. Currently, this will be implemented as a high-end **local audio client-side simulation** using the browser's Web Audio API. Will your server-side ML model also validate these parameters asynchronously once uploaded, or should the client-side validation act as the absolute guardian?

---

## Proposed Changes

### Component 1: Theme & Visual Tokens (Visual Layer)
We will introduce dual-typeface styling, Oklch luminance gradients, and frosted glass shadow utilities to build visual depth.

#### [MODIFY] [fonts.css](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/styles/fonts.css)
*   Update Google Fonts import to fetch `Bricolage Grotesque` (heading-weight display) and `Space Mono` (tabular figures).

#### [MODIFY] [theme.css](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/styles/theme.css)
*   Map `--font-display` to Bricolage Grotesque and `--font-mono` to Space Mono.
*   Upgrade orange values to luminous Oklch scales: `--accent-primary: oklch(0.63 0.25 34)` and introduce glassmorphic variables.
*   Update core base elements (`h1`, `h2`, `h3`, `.font-mono`) to automatically inherit their corresponding font family tokens.

---

### Component 2: Onboarding & Trust Activation (Contributor Flow)
We will create a swipe-to-approve gesture block to convert legal checkboxes into high-fidelity tactile actions, and secure onboarding exits.

#### [NEW] [SwipeButton.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/ui/SwipeButton.tsx)
*   Create a premium mobile-first **Swipe-to-Approve track component** utilizing framer-motion (`motion.div` dragging constraints).
*   Provide real-time visual progress (expanding green tracking glow) and taptic emulation as the slider progress crosses the 95% threshold.

#### [MODIFY] [DataConsent.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/DataConsent.tsx)
*   Import `SwipeButton` and replace the checkbox interface.
*   Refactor safety state controls: when swiped successfully, trigger seamless progression to guideline stages.

#### [MODIFY] [Onboarding.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/Onboarding.tsx) and [FirstEarning.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/FirstEarning.tsx)
*   Replace standard right-header text "Skip" with structured bottom session restoration controls: *"Returning User? Log In"*.
*   On new user calibration exits, launch a bottom drawer reminding them of the calibration reward: *"Don't leave ₹50 on the table"*.

---

### Component 3: Earning Hub & Monospaced Wallet Balance (Contributor Home)
We will restructure the Home Dashboard to focus strictly on active earnings, moving leveling/XP to Profile, and clean up payment cliffs.

#### [MODIFY] [Home.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/Home.tsx)
*   Refactor structural layout: render lifetime currency ledger in high-contrast monospaced font styles.
*   Consolidate UI clutter: Move the level progress ring and XP stats out of `Home.tsx` and place them directly in the user Profile card layout.
*   Create a gestural vertical card-sliding container for Picked Quests. Drag up from the bottom boundary to expand a full-screen Quest Feed, keeping the balance hero perfectly visible.

#### [MODIFY] [Wallet.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/Wallet.tsx)
*   Introduce exception rules for Calibration rewards: enable full withdrawable permission for the initial ₹50.
*   Rename held balance descriptors: render the 40% Bronze hold-back state as *"Security Verification Reserve"* rather than "Platform Credit" inside ledgers.

---

### Component 4: Recording Engine & Vocal Feedback visualizer
We will build real-time visual sound coaching to prevent low-quality submissions before they reach validators, and implement repair states.

#### [NEW] [VoiceVisualizer.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/ui/VoiceVisualizer.tsx)
*   Create a canvas-based dynamic audio waveform using standard Web Audio APIs.
*   Integrate instant peak visual indicators highlighting: *Too Quiet*, *Ideal range*, and *Clipping/Background noise*.

#### [MODIFY] [Recording.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/Recording.tsx)
*   Integrate the real-time audio coach within the recording prompt layout.
*   Support single-prompt repairs: allow users to jump into the recording deck focusing on a *single flagged prompt* rather than overriding the entire dataset.

#### [MODIFY] [RejectedTask.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/RejectedTask.tsx)
*   Redesign the static rejection screen into a **Repair Studio**.
*   Render a matrix of the user's completed audio prompts (e.g. 10 slots). Highlight valid items in green (checked) and flagged items in red, with a primary call to action: *"Re-record prompt 4 (₹25 pending)"*.

---

### Component 5: Validator Grading Triage Loop
We will simplify grading metrics to prevent validator decision fatigue.

#### [MODIFY] [GradingTask.tsx](file:///d:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/validator/GradingTask.tsx)
*   Replace standard 5-point quality sliding controls with a rapid **Triage Swipe interface**: Swipe Left to Flag/Reject, Swipe Right to Pass/Approve.
*   Provide a micro tag selection menu underneath to specify reject reasons (e.g., `[Noise]`, `[Dialect Deviation]`, `[Silence]`) only on left swipes.

---

## Verification Plan

### Automated Tests
- Run structural build sanity tests to verify TypeScript compilation and Tailwind base theme integration:
  ```powershell
  npm run build
  ```

### Manual Verification
1.  **Typographic and Color Contrast**: Launch local server using `npm run dev` and visually verify that header labels use Grotesque styles, currency figures render in monospaced grids, and active glowing strokes display satin glass aesthetics.
2.  **Consent Slider Interaction**: Test the drag physics on the Swipe Consent track, verifying that release points below 95% elastic snap back, and swiping past 95% transitions seamlessly.
3.  **Visual sound coach test**: Trigger recording and verify that the canvas amplitude waveform pulses in real-time, displaying appropriate coaching alerts based on voice sound metrics.
4.  **Selective Repair Loop test**: Navigate to a rejected quest and verify that only the single invalid prompt is flagged for recording, preserving other successful records.
