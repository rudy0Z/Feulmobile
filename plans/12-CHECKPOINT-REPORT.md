# 12 — Checkpoint report (end-of-session status)

> **Date:** 2026-09-16 · **Verified live at:** 21:40 GMT · **Author:** WorkBuddy AI audit pass
> **Status:** ✅ **CHECKPOINT GREEN** — build clean, all 18 discipline rows green, 34/34 routes render clean.
> **Companion docs:** `09-COMPLETION-PLAN.md` (the 6-wave roadmap), `10-FOUNDATION-AUDIT.md`
> (design-systems review + R1–R8 remediation), `11-VISUAL-AUDIT.md` (render-based QA).
> This file is the **consolidated checkpoint** — read it first, the others for depth.

---

## 0 · Checkpoint status (verified by running the gates, not asserted)

| Gate | Command | Result (21:40 GMT) |
|---|---|---|
| Production build | `pnpm build` | ✅ exit 0 — 2081 modules, `dist/` emitted |
| Discipline metrics | `pnpm metrics` | ✅ exit 0 — **18/18 rows green** |
| Render smoke | `pnpm smoke` | ✅ **34/34 routes render clean** (real Chromium) |

**This is the first time all three have been run together and passed.** Before this session
the app shipped a *completely blank screen* while `build` exited 0 and the metrics were green
(see §4 — C1). "Green" now means the source is disciplined **and** the app actually runs.

The 18 metric rows:

```
Discipline (12):       Adoption (6):
  distinct type sizes        8   (<=8)      raw spacing values         0   (<=0)
  raw font-size              0   (0)        raw duration values        0   (<=0)
  12px instances            123  (<=150)    raw borderRadius           0   (<=0)
  double border              0   (0)        primitive-token leaks     11  (<=11)
  screens >10 borders        0   (0)        hand-rolled <button>     116  (<=116)
  >1 hero shadow / component 0   (0)        undefined token refs       0   (0)
  gradients                 25   (<=30)
  raw hex                    0   (0)
  literal rgba()            0   (0)
  emoji                      0   (0)
  brand strings             0   (0)
  sub-44px targets          0   (0)
```

The 11 primitive leaks and 116 hand-rolled buttons are **ratcheted ceilings**, not failures —
they are known residue documented in §5.

---

## 1 · What this session delivered (the "big chunk of work")

Five pillars, in the order they landed. Each is recorded in depth in `09/10/11`.

| # | Pillar | Outcome | Where |
|---|---|---|---|
| A | **Wave 0 — Foundation lock** | Type scale 25→8, `IconButton` primitive, rgba blind-spot closed, 44px floor, hybrid gate | `09` Part D.0 |
| B | **Design-systems audit + remediation (R1–R8)** | Semantic container layer, re-derived spacing/motion/radius scales, composite script-aware type, gate extended 12→18 | `10` |
| C | **Phase 1 completion** | Consent is a native route (`/contributor/consent`); first-job calibration beat built; flow wired Market→OTP→Lang→consent→Home | `09` D-3 / D-1 |
| D | **Big mechanical sweeps** | Every raw spacing/duration/radius value → 0; motion scale re-derived to 120/200/300/400ms | `10-R2/R3` + log |
| E | **Visual & quality audit (render-based)** | 3 critical runtime bugs found + fixed; render pass added as a permanent gate | `11` |

---

## 2 · Pillar A — Wave 0 foundation lock (closed)

Owner accepted five recommendations and made four calls (type scale, D-3 consent, warm-20%,
metrics hybrid, D-4 creator). All five original conflicts (D-1…D-5) resolved — recorded in
`09` Part C so no future session re-litigates them.

Headline moves:
- **Type scale collapsed 25 sizes → 8 tokens** (`12/14/16/18/20/24/32/48`), swept across 54
  files / 715 call sites. `theme.css` is now the only file allowed a literal size.
- **`IconButton` primitive** — 44px floor in one place; 14 hand-rolled controls replaced across
  13 screens; `AppBar` gained a compliant `onBack`. Touch-target violations **19 → 0**.
- **`rgba()` blind spot closed** — 151 literal calls across 23 files → `--*-rgb` channel tokens.
- **114 `<p>` promoted 12px → 14px** (principle: no *prose* at 12px; 12px is chrome only).
- **Elevation corrected** to one hero per component.

---

## 3 · Pillar B — Foundation audit + remediation (R1–R8, all done)

Benchmarked against **M3** (`ref`/`sys`/`comp`) and **Meta's Astryx**. The headline finding:
*the token file was a good document, not a system* — four of five axes had rotted because the
gate only checked colour and type.

| # | Fix | Result |
|---|---|---|
| R1 | Add 13 container/emphasis semantic tokens; repoint leaks | **289 → 11 leaks (−96%)**, value-identical so zero pixels changed |
| R2 | Re-derive `--space-*` as a 2pt micro-grid matching reality | adoptable (was on an unbuildable 4pt grid) |
| R3 | Fix motion: drop 3 duplicate aliases, repair `--ease-emphasized` (was `1.2`, out of range), add directional pairs | JS mirror (`durations`/`easings`) added so call sites stop guessing units |
| R4 | Retrofit `--e-1/2/3/glow` to `var(--*-rgb)` | closes the sweep's own gap |
| R5 | Move raw hex out of Layer 2 into Layer 1 | restores the layer contract |
| R6 | 9 composite, **script-aware** `--type-*` roles + `.font-script` scope | Indic leading 1.72 — the piece M3 doesn't need and Feul can't do without |
| R7 | Delete dead scaffolding | removes false signals |
| R8 | Gate 12 → **18 rows** (spacing/duration/radius ratchets, primitive leaks, **undefined-token check**) | without this, R1–R6 rot again |

**Two live bugs the audit found:**
- **B1** — `--t-verdigris-600` was never defined but used 7× (incl. the DPDP consent shield);
  silently dropped by the browser. Defined + repointed; the new undefined-token row makes this
  unshippable.
- **B2** — the spacing re-derivation moved `--space-3` (12→6) and `--space-5` (20→10); 4 live
  call sites in `Primitives.tsx` broke. Repointed. Lesson: renumbering a scale must be checked
  against its call sites first.

---

## 4 · Pillar E — Visual & quality audit: the blank-screen story

**The most important result of the session.** Rendering the app in real Chromium showed a white
screen with zero nodes while `build` exited 0 and all 18 rows were green. Three independent
runtime failures, all invisible to the build:

| # | Bug | Why the build missed it | Fix |
|---|---|---|---|
| **C1** | `Cannot access 'durations' before initialization` → **entire app blank** | `springs` read `durations.exit` before `durations` declared — a TDZ error at module init; valid syntax + valid types, fails only at evaluation | Reordered `durations`/`easings` above `springs` in `lib/motion.ts` |
| **C2** | `IconButton is not defined` in 4 files → took out Home | A bare `IconButton` is a valid global identifier; Rollup only errors on a *named import that doesn't exist* | Added the 4 imports; new check returns 0 |
| **C3** | `index.html` `<title>Feul Mobile</title>` — a banned brand — plus stale meta for the *old* product | The metric walk only matched `tsx|ts|css`; **`index.html` was never scanned** | Name-free title ("Voice recording jobs — prototype"), meta rewritten, favicon 404 suppressed; walk now includes `.html` |

**The lesson, stated once:** `pnpm build` is not a smoke test. Every sweep in this project had
been verified with the build + metrics, and both are blind to this class of failure. **A render
pass belongs in the gate** — so `pnpm smoke` now exists and is the third gate.

Other audit fixes: **2 × "Quests" → "Jobs"** (direct `07 §2` violation), **duplicated Brief
excerpt** on LINES jobs (now uses `quest.description` as the intro).

### What is genuinely good (audited, not assumed)
- **Wallet** is the strongest screen — muted paise, Name-matched badge, ledger states icon+label.
- **States as icon + label everywhere** — no colour-only signalling found.
- **The consent gate** is coherent and complete; the DPDP verbatim is a single source
  (`consentCopy.ts`) that appears exactly once in the bundle.
- **The 8-step type scale reads well**; hierarchy from weight + space, not size soup.
- **The Studio's dark ground** reads instantly as "recording now."

---

## 5 · Open items (deliberately left, with reasons — not silent debt)

**Design calls needing the owner (from `11`, items 8–12):**

| # | Item | Why it's open |
|---|---|---|
| V2 | Market shows `BrandSlot` 36px **and** the dashed `IllustrationSlot` 128px stacked — two grey dots in the top third of the first screen | Owner will decide what fills the reserved illustration slot (carried over from the pre-build recommendation #5) |
| V3 | Consent's sticky "I agree" bar is visible from first paint while the DPDP verbatim sits below the fold | The screen exists to prove the promise precedes consent; the hierarchy says the opposite. Recommended: move verbatim directly under the pre-mic bar |
| V4 | Every primary CTA is `terracotta-800` (#8E4520, a dark brick brown); the brand's warm orange appears nowhere as a fill | Correct contrast fix (500 = 3.11:1 fails; 800 = 6.51:1). Option that keeps both: `terracotta-500` fill + ink text = **5.30:1** — taste call, not correctness |
| V5 | Celebration shows `+₹12` with no link to the ₹100 withdrawal goal | One line ("₹88 to go before you can withdraw") would make the quiet award motivating. Product decision |
| V6 | Sticky CTAs overlap the last ledger row at the fold | Verify bottom padding clears the CTA at 320px |

**Known residue (ratcheted, tracked):**
- **11 primitive leaks** — 6 × `--t-bone-100` as warm ink on studio + 5 decorative accent tints
  (`--t-terracotta-100/300`). No clean semantic home yet; inventing one would be worse.
- **116 hand-rolled `<button>` elements** — the `<44px` heuristic reads only inline styles, so a
  button sized by a shared const slips past it. Migration is the highest-leverage next work.
- **Market headline is 32px** (`--fs-display`) vs the spec's 38 — **the spec is stale** (38 isn't
  on the locked 8-step scale). Update the spec, not the code.
- **Hardcoded dates + personas** (`Profile` / `RejectedTask` / `Wallet`) not yet detected by the
  metric script — add a row in Wave 4.
- **Gradient mask audit** — 25 remain; confirm each is a mask, not a wash (Wave 3).

---

## 6 · Where this sits in the roadmap (`09`)

```
Wave 0  Foundation lock        ✅ CLOSED  (this session)
Wave 1  Phase 1 finish         ▶ NEXT — consent route done; calibration beat done;
                                first-earn 48px step + proof pack remain
Wave 2  Phase 2 Wallet/Withdraw ▢ least complete (~45%) — biggest product gap
Wave 3  Phase 3 Jobs/Studio     ▢
Wave 4  Phase 4 rest + hygiene  ▢
Wave 5  Portfolio packaging     ▢
```

**Phase 1 status:** onboarding → consent route → Home → first-earn is **structurally complete**.
The consent gate and calibration beat are built. Remaining for a clean Gate 1: the 48px
celebration step, the distinct `EarningCredited` surface, and the phase-1 proof pack
(`docs/proof/phase-1.md`).

**The highest-leverage next work** (from the radius/component-layer analysis): finish migrating
the **116 hand-rolled `<button>`** and the **362 hand-built containers** to `Button` / `IconButton`
/ `Card` / `TouchableRow`. This is what collapses the raw-spacing residue and is the real
component-layer strength the screens need.

---

## 7 · How to keep this green (run order)

```bash
pnpm build      # must exit 0
pnpm metrics    # all 18 rows green (exit 0)
pnpm smoke      # 34/34 routes render clean (exit 0) — needs `pnpm preview` on :4173
```

Run **all three** after every sweep. `build` + `metrics` prove the source is disciplined;
`smoke` proves the app runs. Either one alone is insufficient — this session proved that.

---

## 8 · One-line checkpoint statement

> The Feul Mobile foundation is now a *real* system, not a document: the token layer is closed,
> every axis is gate-covered, Phase 1 is structurally complete, and for the first time the app
> is proven to both build clean **and** render on all 34 routes. The remaining work is screen
> craft (Phase 2 wallet) and component-layer migration — not foundation.
