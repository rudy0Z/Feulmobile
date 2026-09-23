# Visual Assets Specification — [PRODUCT] (Feul Redesign)

> **Source of Truth for Icons, Illustrations, and Visual Assets**  
> Companion to `01-DESIGN-SYSTEM.md` and `02-BUILD-SPEC.md`.  
> Created: 2026-09-07.  
> Providers: **Icons8 (`icons8mcp`)**, **IconScout (`iconscout`)**, **Kitbitz (`Kitbitz`)**.

---

## 1. Guiding Asset Doctrine: Tactile Acoustic Craft, Never Clay Toys

To prevent the visual system from relapsing into **2023 3D clay slop** or **2018 wireframe clinic**, every graphic asset in the product must satisfy three criteria:

1. **Acoustic & Hardware Fidelity**: Icons represent precision audio engineering (condenser capsules, binaural meters, frequency waveforms, monitor cans) rather than generic office stationery.
2. **Monochromatic & Duotone Discipline**: Icons inherit the semantic token palette (`--t-carbon-900`, `--t-carbon-700`, `--t-terracotta-600`, `--t-verdigris-700`). No multi-colored rainbow fills.
3. **Editorial Vernacular Reality**: Illustrations are flat, graphic, and culturally grounded in modern Indian environments (tea stalls, family rooms, clinic desks) without patronizing caricatures.

---

## 2. The 3-Layer Visual Asset Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                     THE 3-LAYER VISUAL ASSET SYSTEM                    │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: ACOUSTIC & HARDWARE ASSETS (Icons8)                           │
│ Precision 24px/32px line icons for recording controls & format cards.  │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: CONVERSATIONAL & EDITORIAL CONTEXT (IconScout & Kitbitz)      │
│ Human recording postures, distance guidance, and setting vignettes.   │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: FINTECH & NPCI TRUST TOKENS (IconScout & Icons8)              │
│ Verified UPI VPA seals, Rupee currency marks, DPDP compliance shields. │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Curated Master Asset Catalog

### Layer 1: Acoustic & Audio Engineering Primitives

| Token / Usage | Provider | Asset Name / ID | Format | Role in Interface |
| :--- | :--- | :--- | :--- | :--- |
| `icon-mic-studio` | Icons8 | `Micro` (`#2830`) | SVG Line | **Home 2x2 Bento**: "Short Lines" (₹15) format card. Precision studio condenser badge. |
| `icon-recorder-tape` | Icons8 | `Voice Recorder` (`#imgrmHfl237W`) | SVG Line | **Active Mission Hero**: Signals live in-progress recording session. |
| `icon-soundwave-live` | Icons8 | `Audio Wave` (`#1893`) | SVG Line | **Studio HUD Telemetry**: Dynamic soundwave bars below active teleprompter text. |
| `icon-headphones-monitor`| Icons8 | `Headphones` (`#2768`) | SVG Line | **Validator Queue**: Quality audit tile on Home and Validator application screen. |
| `icon-audio-slice` | Icons8 | `Audio Skimming` (`#7Rdd6flxlSvx`)| SVG Line | **Repair Studio**: Isolate, edit, and re-record a single rejected turn. |

---

### Layer 2: Conversational & Editorial Metaphors

| Token / Usage | Provider | Asset Name / Slug | Format | Role in Interface |
| :--- | :--- | :--- | :--- | :--- |
| `illus-mic-posture` | IconScout | `lady-podcasting-with-smartphone-mic-2183071` | Flat SVG | **Onboarding / Studio Setup**: Guides contributor to hold phone 15cm from chin. Prevents breath popping. |
| `icon-dialogue-duo` | Icons8 | `Interview` (`#dB4iK1t3nr4r`) | SVG Line | **Scenario Roleplay (₹45)**: 2-person conversation icon for customer-barista or doctor scenarios. |
| `icon-room-360` | Icons8 | `Radio Studio` (`#U6inJDoPag0I`) | SVG Line | **Room Take (₹220)**: Multi-speaker omnidirectional table take with lock badge. |

---

### Layer 3: Fintech, Banking & Institutional Trust Tokens

| Token / Usage | Provider | Asset Name / ID | Format | Role in Interface |
| :--- | :--- | :--- | :--- | :--- |
| `icon-rupee-currency` | Icons8 | `Rupee` (`#23661`) | SVG Tabular | **Wallet Cashout Card**: High-contrast Indian Rupee mark for ₹100 floor milestone. |
| `illus-wallet-vault` | IconScout | `e-wallet-3312781` | Flat Dualtone | **Wallet Header Cockpit**: Visual anchor for "Available vs. Under 24h Review" balance. |
| `icon-upi-settle` | Icons8 | `Dollar Rupee Exchange` (`#7tcWMKX09BJ-`) | SVG Line | **Transaction Audit Ledger**: Line-item indicator for instant IMPS bank disbursements. |
| `icon-shield-trust` | Icons8 | `Shield Check` | SVG Line | **DPDP & Verification**: NPCI VPA penny-drop match badge and DPDP 2023 compliance seal. |

---

## 4. Screen-by-Screen Integration Rules

### 1. Onboarding Flow
* **Hero Visual**: Render `illus-mic-posture` (editorial flat SVG) on the calibration step, visually grounding phone distance (15cm) and quiet room conditions.
* **Trust Badges**: Display `icon-shield-trust` alongside the plain-language DPDP consent sheet in Hindi/Marathi.

### 2. Home Screen
* **Active Mission Hero**: Include `icon-recorder-tape` on the top client tag (`⚡ SARVAM AI · MARATHI`).
* **2x2 Bento Formats**:
  * Tile 1 (Lines): `icon-mic-studio`
  * Tile 2 (Scenario): `icon-dialogue-duo`
  * Tile 3 (Room): `icon-room-360`
  * Tile 4 (Validator): `icon-headphones-monitor`

### 3. Recording Studio HUD
* **Acoustic Waveform**: Dynamic audio telemetry powered by `icon-soundwave-live` reacting to microphone input.
* **Noise Warning**: If ambient room noise exceeds threshold, show `AcousticNoisePause` with phone positioning guide.

### 4. Wallet & Ledger
* **Balance Cards**: Accent with `illus-wallet-vault` and `icon-rupee-currency`.
* **Audit Ledger**: Use `icon-upi-settle` on completed bank transfer rows with UTR numbers.
