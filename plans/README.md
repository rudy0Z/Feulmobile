# Plans — index for Figma Make handover

> **For production:** attach only the `00-*` bundle to Figma Make. Everything else is archive / internal audit.

## Bundle to attach (4 files — in this order)

1. `00-MAKE-CONTEXT.md` — paste **once** as Make project memory. Sets product idea, coverage reframe, trust rule, 360-first, warm Revolut, Home≠Wallet, verification model, placeholder slot. **Branding:** placeholder slot only — no Feul/Grain anywhere in UI. Make must leave the wordmark slot empty or render literal `[PRODUCT]` in neutral type.
2. `01-DESIGN-SYSTEM.md` — **Guidelines doc** for Make Kits. Two-layer tokens, cleaned scale 11/12/14/16/18/20/24/30/38/48/64, radius `8/14/24/999`, elevation `e-0/e-1/e-2/e-3/e-glow`, motion springs, light-only + Studio dark. **Authoritative over `theme.css` legacy aliases.**
3. `02-BUILD-SPEC.md` — **Tier 1 build spec.** Phases 0-2 + 3/4/6/7/5 trimmed to Tier 1 (walkable end-to-end). Tier 2/3 sequenced in appendix as designed-not-built. Phases run in order; each has acceptance checklist. Tier 1 = Onboarding→Home→Studio→Wallet→QuestFeed(rows).
4. `03-EDGE-CASES.csv` — **CSV Attachment** for Make. 23 cases (master brief §13 + 4 NEW: rarity gaming, silent room participant, quality-grade dispute, campaign-cancelled-after-submission). Column `states_to_generate` is what Make must render.
5. `05-FINAL-ARCHITECTURE-AND-SPEC.md` — **Master Architecture & Screen Specification.** The locked 2026 engineering and UX blueprint covering the anti-slop rules, Revolut IA, acoustic waveform engine, and "One App, Two Devices" adaptive rendering.
6. `SESSION-HANDOFF-2026-09-07.md` — **Session Handoff & Continuity Brief.** Current repo state, bug inventory, and the step-by-step implementation sequence.

**How to attach in Make:** Use **Make Kits** (npm + Figma Library + guidelines doc = `01-DESIGN-SYSTEM.md`) + **Make Attachments** for `00-*` + `03-*.csv` + a `theme.css` token reference *only if* needed as secondary — `01-*` wins on any conflict. `02-*` prompts are the per-phase paste sequence.

Make then runs per `FIGMA-MAKE-PROMPTS.md` Phase 1 → Phase 2 → Tier 1 screens, one phase at a time, checkpointed.

---

## Prompts

* `FIGMA-MAKE-PROMPTS.md` — the exact paste prompts for Phase 1 (tokens page) and Phase 2 (component gallery). Phases 3+ use the template at the bottom filled from `02-BUILD-SPEC.md` Tier 1 — draft with me when ready for each one so it reflects the previous phase's tuning.

---

## Archive — do NOT attach to Make

These remain the strategic record and case-study lineage. They contradict the bundle if attached together.

| File | Why not attached |
|---|---|
| `REDESIGN-MASTER-BRIEF.md` | Full strategy (850 lines) — superset of `00-*`. Keep as the authoritative *why*; Make gets the 1-page digest instead |
| `EXECUTION-PHASES.md` | Full 11-phase 9-day plan — superset of `02-*` Tier 1. Keep as roadmap; Make gets Tier 1 slice only |
| `DESIGN-SYSTEM.md` (original) | Superseded by `01-DESIGN-SYSTEM.md` (cleaned scale 48/64, radius/elevation de-duplicated, brand slot). Keep as draft history |
| `UI-REBUILD-PROPOSAL-2026-08-31.md` | Internal audit: plan→code gap (902 decls, 167 borders, 122 shadows, Primitives cap). Findings **merged** into `01-*`/`02-*` — don't ship audit as prompt (audit warns itself that dead shadcn 48 files are style contagion: `UI-REBUILD-PROPOSAL.md:110-116`) |
| `great-understandingof-the-situation-witty-castle.md` | G3-era Pass T-5 plan with `LINES/SCENARIO/INTERVIEW/ROOM` + `ClayAsset` wiring — retired by master brief `§1.1` / `EXECUTION-PHASES.md` scope triage. Contains quest seed that conflicts with Bento |
| `clay-visual-upgrade.md` | G2 clay spec — dated 3D trend, retired mid-2026. Keep in `/_archive` for case-study G2 screenshot only |
| `AUDIT-FEUL-2026-08-30.md` (in `D:\Portfolio`) | Product embed vs plan drift audit that generated the `DevPanel` reachability finding (9/10 failure states only via debug) — merged into `03-*.csv` via the 4 NEW cases |
| `theme.css` (`src/styles/theme.css`) | Code tokens with legacy aliases `theme.css:138-158` (`--radius-sm/md/lg`, `--shadow-card/glass`) — do not attach as guidelines doc alongside `01-*`; `01-*` is authoritative; `theme.css` if attached is secondary reference only |

---

## Decisions locked for this bundle

* Name = placeholder slot (empty geometric mark or literal `[PRODUCT]`), Feul/Grain set aside per your call — deferred to last on purpose
* Verdigris `#3D6B5E` locked (forced 2026-08-27), one-line swappable
* Type scale unified to 11/12/14/16/18/20/24/30/38/**48**/**64** — `52` vs `48` consolidated to `48 hero`
* Radius `8/14/24/999` only; elevation `e-0/-1/-2/-3/-glow` only; legacy `--shadow-card/glass/floating` deprecated for new screens
* Home has one 48px hero ₹, Wallet has bento not hero — enforced via `02-*` Phase 4/7 acceptance
* Consent before any mic use (native language, one screen), ₹100 floor with exact gap, Security Reserve deleted, streaks deleted — see `02-*` Phase 0

---

## Preflight before first Make prompt

- [ ] New Make project — do **not** reuse a community UI kit as base. If kit wanted, Material 3 Variables build only as checklist (`FIGMA-MAKE-PROMPTS.md:369-372`)
- [ ] Attach order per Make: Guidelines=`01-*`, Attachments=`00-*` + `03-*.csv`
- [ ] Verify brand slot renders empty/placeholder on every generated screen — regenerate any screen that invents a name
- [ ] Phase 0 checklist passes (no Reserve, no streak, consent precedes recording)

