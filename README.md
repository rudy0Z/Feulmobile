# Feul Mobile — Complete Onboarding Guide

> **Purpose:** Portfolio case study for AI data economy gig platform  
> **Status:** Ready for external builder handoff (v2026-09-16)  
> **Latest Build Direction:** Tier 1 rebuild per MASTER-BLUEPRINT — Onboarding → Home → Studio → Wallet → QuestFeed

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Design system compliance check (required before each PR)
pnpm metrics

# Quick sanity test
pnpm smoke
```

**Dev Server:** Usually `http://localhost:5173` (check terminal output)

---

## 📚 Newhere? Start Here!

### **Primary Entry Point**
**[Click here: plans/08-REDESIGN-HANDOFF-README.md](plans/08-REDESIGN-HANDOFF-README.md)**

This is the master index for external builders. It tells you:
- ✅ What this product is (gig platform for AI voice data collection)
- ✅ Read order (exact sequence of docs to consume)
- ✅ Locked decisions (cannot be reopened mid-build)
- ✅ Token summary (design system overview)
- ✅ Global gates (quality requirements)

---

## 🗂️ Codebase Structure & Documentation Map

### **Root Directory**
| File/Folder | Purpose | For Whom |
|-------------|---------|----------|
| `README.md` | You are here — complete onboarding guide | Everyone |
| `CLAUDE.md` | AI agent behavior rules & skills | Developers using AI tools |
| `package.json` | Dependencies & scripts | DevOps/Developers |
| `visual references/` | **42+ reference images** mapped to screens | Designers/Developers |

### **`/plans` — Master Documentation Hub** ⭐

**Start here for everything:**

#### Core Blueprints (Read in Order)
1. **[00-MAKE-CONTEXT.md](plans/00-MAKE-CONTEXT.md)** — Product memory for Figma Make generation
2. **[MASTER-BLUEPRINT.md](plans/MASTER-BLUEPRINT.md)** — **Single source of truth** (locks all decisions)
3. **[08-REDESIGN-HANDOFF-README.md](plans/08-REDESIGN-HANDOFF-README.md)** — Builder entry point
4. **[08-VISUAL-REFERENCE-MAP.md](plans/08-VISUAL-REFERENCE-MAP.md)** — Maps ALL visual references to screens

#### Build Phases (Tier 1 Production Scope)
- **[08-PHASE-1-ONBOARDING-FIRST-EARN.md](plans/08-PHASE-1-ONBOARDING-FIRST-EARN.md)** — Market → Auth → Consent → First ₹50 credited
- **[08-PHASE-2-WALLET-WITHDRAWAL.md](plans/08-PHASE-2-WALLET-WITHDRAWAL.md)** — Bento wallet + UPI + withdrawal flow
- **[08-PHASE-3-JOBS-STUDIO.md](plans/08-PHASE-3-JOBS-STUDIO.md)** — Quest feed + recording studio (dark mode)
- **[08-PHASE-4-REMAINING.md](plans/08-PHASE-4-REMAINING.md)** — Profile, rewards, edge states, validator lite

#### Authoritative Specs
- **[01-DESIGN-SYSTEM.md](plans/01-DESIGN-SYSTEM.md)** — Full token architecture (color, type, spacing, motion)
- **[03-EDGE-CASES.csv](plans/03-EDGE-CASES.csv)** — 23 edge cases (states_to_generate column)
- **[04-ISSUE-MAP.md](plans/04-ISSUE-MAP.md)** — P0 bug fixes checklist
- **[02-BUILD-SPEC.md](plans/02-BUILD-SPEC.md)** — Detailed tier breakdown + acceptance criteria

#### Quality & Rules
- **[20-ANTISLOP-RULESET.md](plans/20-ANTISLOP-RULESET.md)** — Hard gates, purpose gates, quality locks
- **[24-VISUAL-IMPROVEMENT-SCOPE.md](plans/24-VISUAL-IMPROVEMENT-SCOPE.md)** — Latest visual audit (Sept 16)
- **[design-metrics-baseline.md](plans/design-metrics-baseline.md)** — Metrics targets for `pnpm metrics`

#### Architecture & Strategy
- **[07-CONCEPT-LOCK.md](plans/07-CONCEPT-LOCK.md)** — Job language + lifecycle
- **[19-DESIGN-QUALITY-AUDIT.md](plans/19-DESIGN-QUALITY-AUDIT.md)** — Screen-by-screen audit verdicts
- **[HANDOFF-NEW-SESSION.md](plans/HANDOFF-NEW-SESSION.md)** — Session continuity brief

#### Archive (Historical Only — DO NOT BUILD)
- `/plans/archive/` — Outdated versions (DESIGN-SYSTEM original, clay-upgrade, REDESIGN-MASTER-BRIEF)

---

### **`/src` — Source Code**

#### Components (State Machines by Feature)
| Component | Path | Purpose |
|-----------|------|---------|
| Home | `src/app/components/Home.tsx` | Dashboard (earnings, active tasks, milestones) |
| QuestFeed | `src/app/components/QuestFeed.tsx` | Jobs marketplace with filters |
| Recording | `src/app/components/Recording.tsx` | Studio capture (dark mode only) |
| Wallet | `src/app/components/Wallet.tsx` | Bento layout + ledger + payout |
| Profile | `src/app/components/Profile.tsx` | Standing + craft skills + coverage |
| Rewards | `src/app/components/Rewards.tsx` | Perks & milestones |
| MainApp | `src/app/components/MainApp.tsx` | Tab bar navigation |

#### Edge States (Must All Be Reachable In-Flow)
- `ConsentGate.tsx` / `DPDPConsentRevocation.tsx` — Privacy & consent
- `CoverageFullState.tsx` / `CampaignClosedHonour.tsx` — Coverage logic
- `SessionInterrupted.tsx` / `BatteryWarning.tsx` — Interruption handling
- `QualityGradeDispute.tsx` / `RejectedTask.tsx` — Repair flows
- `RoomConsentRollCall.tsx` / `SilentRoomReview.tsx` — Multi-speaker ROOM takes
- `DevPanel.tsx` — Debug/dev-only tooling

#### UI Primitives (Built Once, Reused Everywhere)
- `ui/Waveform.tsx` — Real-time audio visualization (5 registers)
- `ui/SwipeButton.tsx` — ≥72px record trigger with e-glow
- `ui/Primitives.tsx` — Structure components (Screen, Section, Divider, Sheet, TabBar)
- `ui/BrandSlot.tsx` — Empty geometric slot (no wordmark yet)

#### Utilities & Data
- `lib/quests.ts` / `lib/questContent.ts` — Mock quest data + taxonomy
- `lib/session.ts` — Local persistence (offline queue, resume)
- `lib/tier.ts` — Standing tiers (New/Verified/Trusted/Elite)
- `lib/rejectionTaxonomy.ts` — Validator disagreement reasons
- `lib/useRealMicLevel.ts` — Real mic input hooks (not simulated)

#### Routes & App
- `routes.tsx` — SPA routing (Home, Wallet, Quests, Profile tabs + recording routes)
- `App.tsx` — Root provider + dev chrome gating (`import.meta.env.DEV`)

#### Styles
- `styles/theme.css` — Token values (deprecated aliases exist, prefer `01-DESIGN-SYSTEM.md`)
- `styles/tailwind.css` — Tailwind config (4.x)
- `styles/fonts.css` — Anek superfamily setup

---

### **`/design-audit` — Visual Research & Cartoflow Tooling**

| File | Purpose |
|------|---------|
| `01-ui-benchmark-report.md` | UI component library evaluation |
| `02-visual-audit-report.md` | Visual quality assessment vs refs |
| `03-waveform-visual-language-spec.md` | Waveform identity spec (5 registers) |
| `06-ai-recording-studio-spec.md` | Audio UI design specs |
| `cartoflow/` | YAML-based design spec framework (project structure generator) |

---

### **`/docs/audit` — Screenshot Evidence**

- **Before renders:** `docs/audit/*.png` — Current state screenshots (01-market → 26-credited)
- **After renders:** `docs/audit/after/*.png` — Target improvements (8 screens done)
- **Taste comparisons:** `docs/audit/taste/*.png` — Visual direction validation
- **Reference images:** Competitive apps (ZIXO finance, Workify onboarding, Revolut IA)

---

### **`/archive` — Dead Code (Quarantined)**

- `/archive/dead-code/shadcn-ui/` — ~50 unused shadcn primitives (48 dead files, style contagion risk)
- `/archive/dead-code/unused-components/` — Legacy components not imported anywhere
- `/archive/dead-code/unused-styles/` — Deprecated CSS (globals.css, default theme)

**Do NOT import from here — these are quarantined for history only.**

---

## 🎨 Visual References System

### **Location:** `/visual references/` folder

**You have 55 JPG files** (extra beyond the 42 mapped):

### Reference Categories (Mapped in `plans/08-VISUAL-REFERENCE-MAP.md`)

| Category | Screens Referenced | Examples |
|----------|-------------------|----------|
| **Money** | Wallet / Payout / Home hero | Revolut bills, ZIXO income tracker, receipt templates |
| **Onboarding** | Market / Auth / OTP / Language | Gamma minimal, Speaksy language tiles, Workify illustrations |
| **Home / Lists** | Jobs feed / Profile | DoorDash chips, Performance cards, Memories albums |
| **Studio / Capture** | Brief / Capture / Review | Descript waveform, orange orb capture, ticket barcode pattern |
| **Anti-refs** | N/A | Gradient washes, neon blobs, fake waveforms (DON'T COPY) |

### How To Use Them

1. Open [plans/08-VISUAL-REFERENCE-MAP.md](plans/08-VISUAL-REFERENCE-MAP.md)
2. Find the screen you're building (e.g., "Wallet")
3. Look at the referenced JPG filename (e.g., `HRyIs7SaUAIJ9IP.jpg`)
4. Open that file from `/visual references/` folder
5. Study the structure/tone (NOT the skin colors or branding)
6. Translate to Bone/Carbon tokens (never import as-is)

**Example:**
```
Ref: HRyIs7SaUAIJ9IP.jpg (bills $1,450.05 + negotiation card)
→ Home hero numerals: 40 tabular ink, muted paise, delta +icon
→ Wallet bento: Available line, presets, VPA check rows (56px height)
→ Bottom sheets: r28 + handle + one primary button
```

---

## 🧠 Product Concepts (Quick Summary)

### **What Is Feul?**
Gig earning platform for AI data economy: Indian contributors record voice clips that build datasets for AI labs. The contributor side is **a job, not an app toy**.

### **Core Economics**
- Labs buy **coverage** (speaker × dialect × district × acoustic condition), not hours
- Pay formula: `total = round(base × coverageMult) + bonus`
- Standing changes access + settlement speed, NOT base pay
- **₹100 floor** — reachable in first session (calibration ₹50 + first task ₹50)

### **Key Principles**
- Same work = same base pay always
- Consent precedes ANY mic use (native language, readable + listenable)
- One accent per screen (terracotta primary, money in ink color)
- Home ≠ Wallet (Home has one 48px ₹ hero, Wallet has bento layout)
- Studio = dark only (`#201611` Carbon ground)

### **Name Status**
Deliberately **placeholder slot** ([BrandSlot.tsx](file:///D:/portfolio%20porjects/feul%20final%20build/Feulmobile-main/src/app/components/ui/BrandSlot.tsx)) — no Feul/Grain strings anywhere. Render empty geometric mark or literal `[PRODUCT]`.

---

## 🔧 Development Practices

### **Pre-flight Checks**
- [ ] `pnpm tsc --noEmit` zero errors
- [ ] `pnpm metrics` not worse than baseline
- [ ] Contrast floors pass (script ≥10:1, body ≥7:1, status ≥4.5:1)
- [ ] 320px viewport works (360 default, 390-430 large)
- [ ] Every state reachable in-flow without DevPanel
- [ ] No Feul/Grain strings appear

### **When To Use Which Docs**
- **"How do I start?"** → [plans/08-REDESIGN-HANDOFF-README.md](plans/08-REDESIGN-HANDOFF-README.md)
- **"What's the single source of truth?"** → [plans/MASTER-BLUEPRINT.md](plans/MASTER-BLUEPRINT.md)
- **"Which visual ref do I copy for Wallet?"** → [plans/08-VISUAL-REFERENCE-MAP.md](plans/08-VISUAL-REFERENCE-MAP.md)
- **"What tokens should I use?"** → [plans/01-DESIGN-SYSTEM.md](plans/01-DESIGN-SYSTEM.md)
- **"What edge cases must I cover?"** → [plans/03-EDGE-CASES.csv](plans/03-EDGE-CASES.csv)
- **"What bugs should I fix?"** → [plans/04-ISSUE-MAP.md](plans/04-ISSUE-MAP.md)
- **"I'm doing Phase 2 wallet — where do I read?"** → [plans/08-PHASE-2-WALLET-WITHDRAWAL.md](plans/08-PHASE-2-WALLET-WITHDRAWAL.md)

### **Git Branch Strategy**
```
main                    ← Production-ready (sync with deploy)
master                  ← Active development (current branch)
theme/carbon-design     ← Experimental dark theme work
```

**Commit Rule:** Create NEW commits for every phase completion, never amend published commits.

---

## 📞 Need Help?

### **Common Questions**

**Q: Where does consent happen in the flow?**  
A: [Phase 1 ONBOARDING](plans/08-PHASE-1-ONBOARDING-FIRST-EARN.md) — after language select, BEFORE any mic permission, native language, readable + listenable

**Q: Can I use dark mode everywhere?**  
A: NO — Studio capture ONLY (`#201611` Carbon ground). Everything else stays light Bone (`#FAF7F2`).

**Q: What if `pnpm metrics` fails?**  
A: Check [plans/design-metrics-baseline.md](plans/design-metrics-baseline.md) for targets. Typical failures: too many raw hex values (>0), small touch targets (<44px), too many borders (>15), gradients outside allowed list.

**Q: Should I import from `/archive`?**  
A: NEVER — quarantined dead code. Import from `src/app/components` primitives instead.

**Q: Do I need the visual reference images?**  
A: Yes — they're the design intent source. But remember: structure/tone donors, restyle to your tokens, don't copy skin.

**Q: Can I add brand name/logo now?**  
A: No — placeholder slot is locked decision until last moment. See [BRAND SLOT rule in MASTER-BLUEPRINT](plans/MASTER-BLUEPRINT.md#brand-slot).

---

## 🎯 Next Steps

1. **Clone repo** → `git clone <url>`
2. **Read**: [08-REDESIGN-HANDOFF-README.md](plans/08-REDESIGN-HANDOFF-README.md)
3. **Run**: `pnpm install && pnpm dev`
4. **Explore**: Navigate through existing components while reading docs
5. **Start Phase 1**: Follow [08-PHASE-1-ONBOARDING-FIRST-EARN.md](plans/08-PHASE-1-ONBOARDING-FIRST-EARN.md) exactly
6. **Validate**: Run `pnpm metrics` after every change

---

## 📄 Version History

| Date | Update | Notes |
|------|--------|-------|
| 2026-09-16 | This README created | Complete handoff guide for external builders |
| 2026-09-15 | Plan #24 published | Visual improvement scope audit |
| 2026-09-14 | PORTFOLIO-DIRECTION.md locked | Final product identity |
| 2026-09-07 | Design audit complete | 26-screen review vs refs |

---

> **Last updated:** September 16, 2026  
> **Authority chain:** `MASTER-BLUEPRINT.md` → `HANDOFF-NEW-SESSION.md` → `PORTFOLIO-DIRECTION.md` → Plan series → `archive/*` (history only)
