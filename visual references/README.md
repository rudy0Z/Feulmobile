# Visual Reference Images — Feul Mobile Design System

## Overview
This folder contains **55 reference screenshots** from competitive and inspirational apps, used as structure/tone donors for Feul's design system.

---

## 📋 How These Are Organized

### Mapped Documentation
All images are referenced in **[plans/08-VISUAL-REFERENCE-MAP.md](../plans/08-VISUAL-REFERENCE-MAP.md)** which maps each filename to specific Feul screens with implementation guidance.

**Example mapping entry:**
```markdown
- HRyIs7SaUAIJ9IP.jpg (bills $1,450.05 + negotiation card) → Home hero numerals, Wallet bento rows, bottom sheet pattern
```

---

## 🎨 Reference Categories

### **Money / Finance Apps**
→ Used for: Wallet layout, payout flows, earnings displays, receipt patterns  
**Examples:** Revolut bills, ZIXO finance tracker, Wise transfer confirmations

### **Onboarding / First-time User Flows**  
→ Used for: Market screen, auth stack, OTP verification, language selection, consent disclosure  
**Examples:** Gamma minimal onboarding, Workify illustrations, Speaksy language tiles

### **Marketplace / Job Lists**  
→ Used for: QuestFeed rows, Jobs filtering, coverage indicators, locked tier gates  
**Examples:** DoorDash chips, Upwork job rows, Airbnb filters

### **Recording / Audio UI**
→ Used for: Studio capture (dark mode), waveform visualization, playback scrubber  
**Examples:** Descript mobile, BIGVU teleprompter, ElevenLabs orb capture

### **Profile / Standing Systems**  
→ Used for: Standing badges, Craft skill bars, milestone progress, Data Vault albums  
**Examples:** Elevate rankings, LinkedIn skills, Apple Health achievements

---

## ⚠️ Important Rules

### ✅ DO:
- Study **structure/tone/layout** patterns
- Translate colors to Bone/Carbon tokens (`#FAF7F2` bone ground, `#E06C3A` terracotta accent)
- Use typography scale from [plans/01-DESIGN-SYSTEM.md](../plans/01-DESIGN-SYSTEM.md)
- Extract spacing rhythm (16px outer, 14px cards, 68px rows)
- Note interaction patterns (sheet dismissible, button states)

### ❌ DON'T:
- Copy brand wordmarks/logos (Feul has placeholder slot only)
- Import decorative gradients/neon effects
- Use dark mode outside Studio capture
- Replicate emoji-as-UI or icon-only navigation
- Adopt full fintech blue palettes or crypto green fades

---

## 📁 File Naming Convention

Files use original export names from source apps:
- Screenshot captures: `Screenshot_YYYY-MM-DD-HH-mm-ss...jpg`
- App exports: `HR[letters][numbers].jpg` (from mobile device screenshots)
- Example: `HQHWJMEa0AArxG8.jpg`, `Screenshot_2026-09-15-14-22-18...jpg`

These match verbatim in [08-VISUAL-REFERENCE-MAP.md](../plans/08-VISUAL-REFERENCE-MAP.md).

---

## 🔗 Where To Find More

### Additional References
- [/docs/audit/](../docs/audit/) — Before/after comparison screenshots of current Feul state
- `/docs/audit/taste/` — Taste exploration comparisons
- `/design-audit/09-references-analysis.md` — Deep dive into reference patterns

### Competitive Analysis Targets
| Category | Primary Refs | What We're Stealing |
|----------|--------------|---------------------|
| Pending vs Settled Money | Revolut, Wise, Monzo | "One number, one focus" discipline |
| Onboarding Simplicity | Workify, Linear, Notion | Single-CTA flow, dots pagination |
| Job Marketplace Structure | Upwork, Airbnb, Uber Driver | Chip filters, priority lists, locked tiers |
| Recording UI | Descript, BIGVU, ElevenLabs | Orb trigger, script display, live level |
| Setup Checklists | monday.com, Trello, Asana | Checklist items as paid tasks, not profile fields |

---

## 🎯 Using References Effectively

### For New Builders
1. Open [plans/08-VISUAL-REFERENCE-MAP.md](../plans/08-VISUAL-REFERENCE-MAP.md)
2. Navigate to the screen you're building (e.g., "Wallet")
3. Find the reference filename listed
4. Open that JPG from this folder
5. Ask: "What's the underlying structure?" (not "what color is it?")
6. Map that structure to Bone/Carbon tokens

### For Experienced Developers
If you recognize a pattern you've seen elsewhere:
- Does it fit the **quiet competence** aesthetic?
- Does it work at 320px width?
- Does it pass contrast at 300-nit daylight simulation?
- If YES to all three, consider adapting it (document your reasoning)

---

## 📊 Folder Stats

- **Total files:** 55 JPGs
- **Size range:** ~80KB - ~460KB per image
- **Date range:** Aug 2026 - Sep 2026 (captures latest app states)
- **Sources:** Mobile device screenshots, web app captures, competitor analysis

---

## 💡 Pro Tips

1. **Create side-by-side comparisons**: Open reference + current implementation simultaneously
2. **Extract components**: Notice how ZIXO does weekly ledger bar vs Feul's flat version
3. **Track evolution**: Some screens have multiple ref versions (early → late iteration)
4. **Don't force fit**: If no matching ref exists, default to minimal restraint (bone ground, terracotta accent, ink money)

---

## 🔄 Updating This Folder

When adding new references:
1. Export/screenshot high-quality image (1080p+ for details)
2. Name descriptively if taking yourself: `CATEGORY_purpose_DATE.jpg`
3. Add entry to [plans/08-VISUAL-REFERENCE-MAP.md](../plans/08-VISUAL-REFERENCE-MAP.md)
4. Update counts/stats above

**Note:** Keep folder lean — relevance > quantity. Delete unused refs after phase complete.

---

> **Last updated:** September 16, 2026  
> **Maintained by:** External builder handoff package  
> **Cross-references:** All mapped in `plans/08-VISUAL-REFERENCE-MAP.md`
