# Visual Craft & AI Workflow Research — [PRODUCT] (Feul rebuild)

> **Status:** Research reference, 2026-09-14. Written to answer three questions: what the current craft bar for consumer mobile apps actually is, how people build high-quality "vibecoded" apps that stay consistent, and which free tools / MCPs fit this repo.
> **Authority:** none. Build authority stays with `MASTER-BLUEPRINT.md` → `HANDOFF-NEW-SESSION.md` → `PORTFOLIO-DIRECTION.md`. This doc informs **workflow only** — every locked decision stays locked.
> **Constraint honored:** every recommended tool is free or has a usable free tier (checked 2026-09-14; sources in §7). No Mobbin required.
> **Scope decision 2026-09-14:** Figma MCP / Figma bridge is **deferred** — not part of the current build. Everything Figma-related below is kept as future reference only and marked `[DEFERRED]`.

---

## 1. The craft bar — what "beautiful" means for consumer mobile apps in 2025/26

The market did not move toward more decoration. It moved toward **confidence and restraint executed precisely**. Eight signals separate portfolio-grade consumer apps from AI-default ones:

1. **Typography carries the design.** A real scale with intent (display → body floor), tight tracking on large sizes, tabular numerals for any money/data column. 2026 trend reports converge on bold, expressive, oversized type with generous white space — not more chrome.
2. **Air is a material.** Fewer modules per viewport, bigger gaps between sections. Negative space reads as confidence; density reads as dashboard.
3. **One focal point per screen.** One huge number or one action. Two focal points = zero focal points.
4. **Depth from layering discipline, not decoration.** One hero radius per screen, one elevated object, separation by whitespace/tint first, borders last.
5. **Motion that answers touch.** Springs on interactive elements, feedback on press (not release), interruptible sheets, reduced-motion respected. Motion confirms actions; it never decorates.
6. **Honesty as aesthetics.** Real states (empty/loading/error/pending), no fake metrics, no fake urgency. In 2025/26, trust design IS visual design — reviewers and users both pattern-match slop instantly.
7. **Custom detail as brand.** The memorable apps own one or two specific details (a numeral treatment, a script pairing, an instrument-like meter) instead of a generic kit look.
8. **Color discipline.** ~60/30/10 structure, accent scarce, state colors never used as decoration. The AI-default palette (blue/purple gradients, glow) is now a negative signal.

**What this means for Feul:** the locked doctrine (Bone daylight trust, Carbon Studio-only, money-as-ink typography, acoustic instruments, quiet competence) is *on-trend, not behind it*. The 2026 craft bar rewards exactly what the blueprint already specifies. The gap is not direction — it is **execution distance between spec and code** (25 type sizes shipped vs 11 specced, 49 raw hex, 187 borders — per `04-ISSUE-MAP.md`).

**Feul's ownable beauty levers** (where craft investment pays the most):
- **The Studio screen is the one dramatic moment.** Dark ground, 26px bone script at ≥10:1, real mic-driven waveform, glow only on the trigger. This is the case-study screenshot; it deserves the deepest polish.
- **Money typography as the brand.** Tabular ink numerals, one 48 hero per screen, exact-gap withdraw line. Revolut-structure, warm rendering.
- **Indic script craft as differentiation.** `lh-deva/taml 1.72`, native-script language tiles, per-script optical sizing. Most AI-built apps fail this entirely; for an Indian-market product this is portfolio gold.
- **The warm palette itself.** Terracotta/bone/verdigris is inherently anti-slop in a blue/purple AI market.
- **Coverage meter + rarity multiplier as data-infographic moments.** Asset strategy B (acoustic telemetry + data infographics) gives Feul two genuinely custom instruments nobody else has.

---

## 2. How good vibecoded apps stay good — the seven practices

Synthesis of current practitioner workflow (Cursor rules ecosystem, DESIGN.md pattern, design-tokens-for-AI threads — sources §7):

1. **Spec-first, single authority chain.** A locked DESIGN.md/rules file the agent must obey, with an explicit "on conflict, X wins" order. The emerging standard is literally a `DESIGN.md` in the project root that every AI tool reads before generating.
2. **Token-only styling, enforced mechanically.** Semantic token names (meaning-based: `color/action/primary`, not `blue-500`) — vague names produce generic output; machines and humans both read names first. Crucially, the good teams **lint** this: raw hex / off-scale values fail the build. Without enforcement, every AI session re-drifts.
3. **Gallery-first build order.** Primitives + all states rendered and approved **before** any screen. (Industry equivalent: Storybook.) Screens composed only from approved parts.
4. **Screenshot-driven verification loop.** Every change is verified visually — screenshots at the real breakpoints, critique, fix. Code review does not catch visual drift; pixels do.
5. **Single-writer rule.** During a build phase, exactly one tool/session owns writes; everything else reads. Round-tripping the whole app through multiple generators is the #1 drift amplifier.
6. **Small diffs, checkpoint per pass.** Commit after each coherent pass so any regression is one revert away.
7. **The final 20% ritual.** States, microcopy, focus-visible, reduced-motion, colorblind check, daylight/320px walk — a deliberate final pass that separates "generated" from "designed".

### 2.1 Diagnosis: mapping Feul's five drift causes to practices

| Your diagnosis | Reality in this repo | Missing piece |
|---|---|---|
| 1. Tokens not named well | Two-layer semantic system already exists and is well-named (`01-DESIGN-SYSTEM.md`) | Figma-side naming contract + lint enforcement (§4, §6) |
| 2. Components not structured for reuse | Issue map already locates the rot (Card factory, legacy reads) | A real, always-reachable primitives gallery + state coverage |
| 3. Figma ↔ code connection | Direction correctly decided (build clean → import once) | The concrete bridge pipeline (§5 Phase 3) — tokens.json → Figma Variables, MCP capture |
| 4. Nothing for AI to read | **Docs are actually strong** — better than most teams | A root-level AI entry point: no `CLAUDE.md`/`.cursorrules` exists; `guidelines/Guidelines.md` is an empty template |
| 5. Nobody owns it | Solo = you + the machine | Ownership made mechanical: metrics script, lint CI, weekly counts ritual, decision log (§5 Phase 4) |

**The core insight:** Feul's specs are senior; the workflow around them is the junior part. Drift happened because nothing enforces the spec between sessions — 15 of 17 commits in this repo's history are bulk "Update files from Figma Make" re-imports, each one rewriting the whole app and re-introducing divergence. The fix is not more documents; it is **one authority, one writer, mechanical enforcement, and measured "done"**.

---

## 3. Free tool stack for Feul

### 3.1 Design ↔ code bridge — `[DEFERRED, not current scope]`

Decided 2026-09-14: no Figma tooling in the current build. For future reference only (when the clean build is done and the Figma import actually starts): the Figma MCP server (remote, free during beta, works with Claude Code/Cursor/VS Code) can read Figma files as structured context and capture live web UI back into Figma layers; Tokens Studio's free JSON import can turn a `tokens.json` export into Figma Variables; Style Dictionary can transform tokens to any platform. None of this is set up now — the code repo stays the single source of truth for the entire rebuild.

### 3.2 Enforcement & QA (the missing "owner")

| Tool | Free status | What it does for Feul |
|---|---|---|
| **Stylelint** | Open source | Custom rules: no raw hex outside `theme.css`, only `--r-*` radii, ban deprecated legacy aliases (`--radius-sm`, `--shadow-card`, `--accent-*` ramps...). Violations fail the build → drift becomes impossible to merge. |
| **Metrics script** (Node, ~50 lines) | Free | Counts what `04-ISSUE-MAP.md` tracks: type sizes in use, ≤12px text instances, 1px borders, box-shadows, gradients, raw hex, sub-44px controls. Run per commit → "done" becomes a number, not a feeling. |
| **Chrome DevTools** | Free, built-in | Contrast checker (point-and-click), CSS Overview, device toolbar (320/360/430 + 150% text), Rendering tab → **emulate vision deficiencies (deuteranopia/protanopia)** — exactly the terracotta-vs-crimson check the issue map requires — and forced-colors emulation. |
| **WebAIM Contrast Checker** | Free web tool | The token-pair matrix (script ≥10:1, body 7:1, secondary 4.5:1) done once per palette change. |
| **axe DevTools** (browser extension) | Free tier | Accessibility tree + contrast audits on the running app. |
| **Lighthouse** | Free, in Chrome | Quick a11y pass on the deployed build. |
| **Playwright** | Open source | Optional, later: automated screenshots of every route at 320/360/430 for the verification loop. |

### 3.3 Reference libraries (Mobbin replacements)

- **Refero** — large free mobile/web pattern library.
- **Screenlane** — free tier, screens + patterns.
- **UX Archive / Pageflows** — flow-based browsing.
- **Design Spells** — micro-interaction details (what the polish pass needs).
- **Growth.design Case Studies + Checklist Design** — UX patterns with rationale, free.
- **Banani References** — positions itself as a free Mobbin competitor (save/copy UI screens).
- **Figma Community** — free audit templates, variable kits, case-study frames.
- **The unbeatable free one: install the actual apps.** For Feul's context: Revolut (structure ref per blueprint), Urban Company partner app + Swiggy delivery-partner app (real Indian gig-earner patterns — money legibility, trust, low-literacy handling), PhonePe/Paytm (UPI flows, name-match ceremony), Cred (craft benchmark only). Study them on a real budget Android, in daylight — that IS the design research.

### 3.4 Assets

- **Lucide** (already in) — keep, 1.75–2 stroke, icon+label always.
- **Google Fonts** — Anek Latin/Devanagari/Tamil + Mukta fallback (already chosen, free).
- **Iconify** — free icon aggregation if a missing glyph ever appears.

---

## 4. Concrete gaps found in this repo (2026-09-14 audit)

1. **No AI entry point at repo root.** No `CLAUDE.md`, no `.cursorrules`, no `.cursor/`. `guidelines/Guidelines.md` is Figma Make's empty template. Every AI tool that opens this repo starts blind or reads history first. *This is the highest-leverage 30-minute fix available* — a root `CLAUDE.md` that states the authority chain, the non-negotiables (semantic tokens only, no new hues, 44px targets, one hero, consent-before-mic, brand slot empty), and points to `plans/` in read order.
2. **No enforcement layer.** 49 raw hex and 25 type sizes exist because nothing fails when they appear.
3. **Multi-tool write paths.** 15/17 commits are whole-app Figma Make re-imports. Each pass re-imports drift.
4. **Uncommitted quarantine.** The working tree holds the quarantined shadcn/legacy deletions (git status shows dozens of deleted files, uncommitted). One careless discard — or another tool's bulk commit — loses the quarantine rationale. Commit it first, with a message referencing `04-ISSUE-MAP.md`.
5. **Gallery not a real route.** `DebugGallery` was quarantined; `HANDOFF-NEW-SESSION.md` Phase 1–2 correctly plans a tokens page + primitives gallery, but it must ship as a first-class, non-DevPanel screen this time (also satisfies the reachability rule).
6. **"Done" is unmeasured.** Issue-map targets (type 25→11, borders 187→<15, shadows 116→<10, gradients 27→2, raw hex 49→0, <44px →0) are not counted anywhere per commit.
7. **Figma bridge** — deferred by decision (2026-09-14). When it reopens: tokens.json generation, variable naming, component↔primitive mapping, MCP capture flow.

---

## 5. Recommended build pipeline (phases with gates)

**Phase 0 — Foundation lock (before any screen work)**
- 0.1 Commit the quarantine deletions (single commit, message references issue map).
- 0.2 Root `CLAUDE.md` (+ `.cursorrules` if Cursor stays in the loop) — authority chain + non-negotiables + read order. Figma Make's `guidelines/Guidelines.md` gets the same pointer (it's the file Make actually reads).
- 0.3 Purge legacy token aliases (`theme.css:88-195, 220-247, 309-312`) — one focused commit; retarget the few component reads (`Card`, `TagPill`).
- 0.4 Stylelint config + metrics script + `pnpm check:design`. Record baseline numbers in this file's successor (a `06-...` build log).
- 0.5 System gallery route: tokens on both grounds, every primitive × all states (default/pressed/disabled/loading/error), 5 waveform registers, telemetry bar.
- **Gate:** zero legacy refs; baseline metrics recorded; gallery renders clean at 320 and 430.

**Phase 1 — P0 demo-killers** (in `04-ISSUE-MAP.md` order): contrast pass (button/pending/muted), real mic levels via AnalyserNode, Repair hero rebuild, ₹100 first-session math in code (no hardcodes), edge-state reachability in-flow, brand-string purge, relative dates + session personas.
- **Gate:** all 8 P0 closed, verified in-browser with DevTools contrast + vision-deficiency simulation.

**Phase 2 — Screen craft passes** (`MASTER-BLUEPRINT.md` §6, screen by screen) with the screenshot loop: 320/360/430, 150% text, colorblind sim, daylight walk on device.
- **Gate:** UI check clean; issue-map counts at or trending to target.

**Phase 3 — Figma import — `[DEFERRED, not current scope]`**

Deferred with the user's decision on 2026-09-14. When the clean build is finished and this reopens, the sequence is: generate `tokens.json` from `theme.css` → import to Figma as Variables (Tokens Studio free JSON import) → capture screens via MCP "Send UI to Figma" or per-screen exports → rebuild core primitives as Figma components with variants matching code props 1:1 (naming contract in §6) → round-trip proof via MCP read-back. Until then: **the code repo is the single source of truth; no Figma work in the rebuild loop.**

**Phase 4 — Ownership ritual (solo, permanent)**
- Weekly: run metrics, log counts, log decisions ("changed X because Y" one-liners), keep P0 list at zero.
- Roadmap = what the case study needs (`PORTFOLIO-DIRECTION.md` §4). The system serves the story.

---

## 6. Naming contract — `[reference for the deferred Figma import; code rules apply now]`

The code-side rules apply from day one: semantic tokens only in components, primitives never referenced directly, one naming scheme everywhere in code. The Figma-column mapping below is kept for the future import so names line up when that work starts.

Same string, both sides, semantic only in components:

| Category | Code | Figma variable |
|---|---|---|
| Color primitive | `--t-terracotta-500` | `terracotta/500` (collection: Primitives) |
| Color semantic | `--action-primary` | `action/primary` (collection: Semantics) |
| Text | `--text-primary` | `text/primary` |
| Type step | `text-body` (16/1.5/0) | `type/body` (size 16, line-height 1.5) |
| Radius | `--r-lg` | `radius/lg` |
| Elevation | `--e-2` | `elevation/2` |
| Component | `<Amount/>` | Component `Amount` |

Component ↔ variant mapping (build once in Phase 3.4): `Button` (variant: primary/secondary/ghost/destructive × size: 44/52/56 × state: default/pressed/disabled/loading), `StatusBadge` (state: settled/pending/failed × size), `Sheet`, `QuestRow`, `Amount` (size: sm/md/hero/max). Rule: **if the name differs between Figma and code, the AI drifts** — this contract is the whole point of the import.

---

## 7. Sources (searched / opened 2026-09-14)

**Figma ↔ AI toolchain**
- Figma Help — Guide to the Figma MCP server (opened): remote server on all seats and plans, free during beta, clients (Claude Code, Cursor, VS Code, Windsurf, Codex), "Send UI to Figma", agent Skills. https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server
- Figma MCP Catalog — https://www.figma.com/mcp-catalog/
- Figma Help — Claude Code and Figma: MCP setup — https://help.figma.com/hc/en-us/articles/39888612464151
- Builder.io — Claude Code + Figma MCP Server — https://www.builder.io/blog/claude-code-figma-mcp-server
- intoDesignSystems — Connect Claude Code to Figma without MCP (free-account Chrome DevTools route) — https://www.intodesignsystems.com/blog/claude-code-figma-no-mcp
- r/FigmaDesign — MCP free vs paid nuance for editing — reddit.com/r/FigmaDesign/comments/1to66dp

**Tokens & consistency**
- zeroheight — Exporting design tokens from Figma (formats, tools, workflows) — https://zeroheight.com/learn/exporting-design-tokens-from-figma-formats-tools-and-workflows/
- Tokens Studio docs — Style Dictionary transforms — https://docs.tokens.studio/transform-tokens/style-dictionary
- Tokens Studio on Figma Community — https://www.figma.com/community/plugin/843461159747178978
- UX Planet — 6 design tokens tools — https://uxplanet.org/6-design-tokens-tools-to-manage-the-connection-between-design-and-code-better-a4f2dd966bd5
- Medium (Design Bootcamp) — semantic token naming over raw names — https://medium.com/design-bootcamp/design-tokens-the-foundation-of-scalable-design-systems-b880c9d78579
- Wezom — Mobile app design best practices (AI enforcing consistency via tokens) — https://wezom.com/blog/mobile-app-design-best-practices-in-2025

**Vibecoding quality**
- r/vibecoding — "How do I make an AI-generated frontend NOT look generic" — reddit.com/r/vibecoding/comments/1oy2f95
- Medium (Aashari) — Getting better results from Cursor with rules — https://medium.com/@aashari/getting-better-results-from-cursor-ai-with-simple-rules-cbc87346ad88
- Cursor Forum — structured .mdc rule files — https://forum.cursor.com/t/80199
- kirill-markin.com — Cursor IDE rules for AI — https://kirill-markin.com/articles/cursor-ide-rules-for-ai/

**Craft bar / trends**
- Fuselab — Mobile app design trends (bold type, whitespace) — https://fuselabcreative.com/mobile-app-design-trends-for-2025/
- Mockplus — App design trends (expressive typography) — https://www.mockplus.com/blog/post/app-design-trends-2025
- Droids on Roids — Mobile UI design guide — https://www.thedroidsonroids.com/blog/mobile-app-ui-design-guide
- Muzli — Mobile UI/UX inspiration — https://muz.li/inspiration/mobile-app-design-inspiration/

**Free reference libraries (Mobbin alternatives)**
- Medium (vpznc) — Free Mobbin/Appshots alternatives (Banani, UX Archive, Screenlane, Design Spells, UI Sources, Handheld) — https://medium.com/@vpznc/free-mobbin-and-appshots-alternatives-for-ui-references-990d10f9e01
- Product Hunt — Mobbin alternatives (Refero, UX Archive, Growth.Design, Checklist Design) — https://www.producthunt.com/products/mobbin/alternatives
- InspoAI — Mobbin alternatives (SaaSUI, Land-book, Lapa Ninja, Behance, Figma Community free; Cosmos/Savee free tiers) — https://www.inspoai.io/blogs/mobbin-alternatives
- Banani References — https://www.banani.co/references

**QA / contrast**
- WebAIM Contrast Checker — https://webaim.org/resources/contrastchecker/
- Accessible Web — WCAG Color Contrast Checker — https://accessibleweb.com/color-contrast-checker/
- TPGI/Vispero — Colour Contrast Analyser — https://vispero.com/resources/accessibility-testing-tools/
- r/accessibility — axe + Chrome DevTools built-in contrast — reddit.com/r/accessibility/comments/1frd6q3
