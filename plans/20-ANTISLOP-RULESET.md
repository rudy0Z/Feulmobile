# 20 — Master anti-slop ruleset (consolidated from 3 sources)

> **Sources (verified public, read in full this session):**
> - **[H]** [nutlope/hallmark](https://github.com/nutlope/hallmark) — `skills/hallmark/SKILL.md` (6 disciplines), `references/slop-test.md` (58 gates), `references/anti-patterns.md` (Critical/Major/Micro/Minor tiers). MIT.
> - **[N]** [nexu-io/open-design → craft/anti-ai-slop.md](https://github.com/nexu-io/open-design/blob/main/craft/anti-ai-slop.md) — 7 cardinal sins (P0), soft tells (P1), polish tells (P2), "add soul" 80/20. MIT, adapted from refero_skill.
> - **[A]** [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) — `antislop.md` (38 rules R-01…R-38 in 3 tiers, Craftsmanship Standard C-1…C-5, Part-1 diagnostic patterns, Part-3 Liveliness Toolkit + 3 dials, Delivery Gate), `skills/antislop-copywriting/SKILL.md`. Rules quoted by ID; nothing reworded to change meaning.

---

## A. Hard gates (absolute — break any = FAIL regardless of purpose)

| ID | Rule (consolidated) | Source |
|---|---|---|
| **HG-1** | No fabricated numbers/stats ("10× faster", "99.9% uptime", "trusted by 50,000+"). No source → show no number, or a labelled placeholder. A stat is never the hero's sole headline. | A R-17, R-36 · N sin 6 · H gate 46 |
| **HG-2** | No fake testimonials/avatars/random names/fictional reviews or fabricated trust claims ("SOC 2", "Top 10%…") without verifiable evidence. | A R-18, R-36 · H gate 46 |
| **HG-3** | Mobile must be perfect: no horizontal overflow, no text escaping containers, no colliding/clipped cards, ≥44px tap targets, consistent spacing. | A R-03 · H gates 34/49–57 · N P1 "broken mobile" |
| **HG-4** | Every interactive element has real behavior; no dead buttons; nav links only to things that exist. | A R-24, R-26 · H gate (audit verb) · N "non-functional" |
| **HG-5** | Data UIs ship ≥3 states: empty, loading, error. Happy-path-only = not ready. | A R-27 · H C-4 |
| **HG-6** | WCAG AA contrast (4.5:1 body, 3:1 large/icons/focus); no ink-on-ink; button text ≠ button fill (within 5% lightness & 0.05 chroma = fail); accent-ink must exist on accent fills. | A R-25 · H gates 40–41 |
| **HG-7** | Keyboard accessible: logical tab order, Enter/Space activation, Escape closes dialogs, visible focus indicator (never bare `outline:none`). | A R-32 · H gate 26 |
| **HG-8** | No em dash (—) in UI copy. Comma/period/colon/parens instead. | A R-02 · copywriting skill §Em Dashes |
| **HG-9** | No template FAQs, no filler copy (lorem, "feature one/two/three"), no invented features. Empty section > fabricated section. | A R-28, R-38 · N sin 7 |
| **HG-10** | Clear placeholders, never disguised as final: `[REAL DATA]`, "Coming soon", initial-avatars, product-name-as-logo. No assumed logos/photos/assets. | A R-23, R-38 |
| **HG-11** | Verify before delivery: run it, click every element, record the click-through as evidence; check console. | A R-35 · A Delivery Gate |
| **HG-12** | No CSS/feature patching via external string-replace scripts; features live in source. | A R-33 |
| **HG-13** | Both themes (if toggled) fully work; no shipping a broken mode. | A R-34, R-21 |

## B. Purpose gates (technique allowed ONLY with a written purpose; dose caps)

| ID | Rule | Source |
|---|---|---|
| **PG-1** | No default blue→purple/cyan/pink gradients, rainbow, purple-black, neon, glow backgrounds — unless brand identity/hierarchy reason is written. Flat + intentional type beats hero gradient. | A R-01 · N sin 2 · H gate 2 |
| **PG-2** | No default Tailwind indigo accent set (`#6366f1` `#4f46e5` `#4338ca` `#3730a3` `#8b5cf6` `#7c3aed` `#a855f7`). Use the system's accent token. | N sin 1 |
| **PG-3** | No emoji as feature/step icons (✨🚀⚡🔥🎯). Monoline SVG or none. | N sin 3 · H gate 30 · A R-04 |
| **PG-4** | No generic AI icons (sparkle/magic/orb/robot) or icon-set-chosen-for-its-own-look; icons must be content-relevant, reason written. | A R-04 · H anti-pattern "AI-illustration look" |
| **PG-5** | No eyebrow-capsule badges ("AI Powered", "Beta", "New") without functional need; avoid capsule+border+glow+dot+uppercase stack. | A R-09 · H anti-patterns |
| **PG-6** | Glassmorphism accent-only (≤1–2 elements; never nav+cards+modal+sidebar at once). | A R-10 |
| **PG-7** | Shadows = elevation markers only, not float-everything. | A R-12 |
| **PG-8** | Glow ≤1–2 focus elements; never card+button+badge+icon+bg together. | A R-13 |
| **PG-9** | No copy-paste identical feature cards; variation must reflect hierarchy (reason written). Not everything is a card. | A R-14 · H gate 3 · N P1 |
| **PG-10** | Animations need a written UX purpose; no default FadeUp+Float+Scale+Bounce everywhere; reduced-motion fallback for every motion. | A R-19 · H gate 27 |
| **PG-11** | No Undraw/Storyset/3D-blob generic illustration; must connect to product or use real screenshot/none. | A R-22 |
| **PG-12** | No grid/blueprint/dot backgrounds by default. | A R-07 |
| **PG-13** | Button arrows (→/↗) not on every CTA; proportion + purpose. | A R-08 · N P1 |
| **PG-14** | Serif-bound seeds must use `--font-display` on h1/h2 (no hardcoded Inter/Roboto/system on display). | N sin 4 |
| **PG-15** | No rounded-card-with-colored-left-stripe (the "AI dashboard tile"). Drop radius or stripe. | N sin 5 · H gate 5 |
| **PG-16** | No re-drawn browser/phone/terminal/IDE chrome. | H gate 47 · A R-23-adjacent |

## C. Quality locks (consistency/identity)

| ID | Rule | Source |
|---|---|---|
| **QL-1** | No AI-template layouts (Hero+3 cards, always-3-steps How-it-works, bento-by-default, 3-tier pricing, trusted-by bar, 4-col footer); composition follows content needs. | A R-05 · N P1 · H gate 8 |
| **QL-2** | Radius consistent with system; not everything pill-shaped. | A R-11 · N P1 "excessive radius" |
| **QL-3** | CTAs specific to product ("Get Started/Learn More/Try Now/Explore/Discover" forbidden as defaults). | A R-15 |
| **QL-4** | No buzzwords (AI Powered, Seamless, Revolutionary, Cutting Edge…); specific language, evidence over claims. | A R-16 · N P1 |
| **QL-5** | Strong visual identity: swap-the-logo test — would it still feel unique? Palette ≤2–3 core + 1 accent; no 5+ colors. | A R-20, R-29, R-30 · N "soul" 80/20 |
| **QL-6** | Typography: ≤3 families (2+1), roman headers (no italic display), no mono-as-aesthetic, uppercase+tracking used sparingly; display line-height ≥1.0 when uppercase. | H gates 37/38/38a/55 · A R-06 |
| **QL-7** | Every decision has a one-line written reason (keystone). | A R-31 · H pre-emit critique |
| **QL-8** | Liveliness dials set (ENERGY/RHYTHM/MOTION 1–3) and held; ~80% proven + ~20% distinctive (one bold move, voice, one micro-interaction, one product-born detail). | A Part 3 · N "soul" |
| **QL-9** | Accent ≤~5% of any viewport; ≤2 visible accent uses per screen (nexu: 6+ var(--accent) uses in body = tell). | H gate 23 · N P1 |
| **QL-10** | Eyebrow discipline: default OFF; when used, stacked above heading in same column, never side-by-side columns; no eyebrow+heading multi-col wrapper. | H gate 54 · H anti-pattern "Eyebrow on every section" |
| **QL-11** | Tokens locked: no mid-render hex/oklch/font-family outside the token block. | H gate 48 · N P1 ">12 raw hex outside :root" |
| **QL-12** | Details: tabular-nums on data, focus rings instant, no transition:all, no hover:scale-105-everywhere, no bouncy UI easings, tooltips hover≠focus delay, no celebratory toasts for visible effects, decorative SVGs aria-hidden. | H gates 10–18, 33 · H Major tier |

## Documented conflicts (not silently merged)

1. **Lucide icons.** [A R-04/H] flags "icon set chosen for its library look" as a tell; **Feul's owner docs mandate "Lucide + label always"** (locked design system). Owner doctrine wins for this product; recorded as an owner override, applied consistently.
2. **Dark surfaces.** [A R-21] bans dark-by-default; Feul's Studio is dark **by function** (recording = dark), mandated by owner docs. Passes the purpose test; documented.
3. **Pill CTAs.** [A R-11] warns pill-everything; Feul's system uses r-full only for chips/CTAs and r-md/r-lg for cards (deliberate, documented scale). Passes.
4. **Waveform/glow.** [PG-8] caps glow; Feul allows e-glow on the record trigger only (capture halo is one of the three sanctioned warm elements). Passes with written reason.

## Audit basis

Screens in scope: the 26 captured renders under `docs/audit/` (01-market … 26-credited), the
same set reviewed in `19-DESIGN-QUALITY-AUDIT.md`. Verdicts: **PASS / FAIL / PARTIAL** per
rule family per screen; every non-PASS cites rule ID + exact element. Demo-data fixtures are
judged under HG-1/HG-2/HG-10 with the R-23 carve-out: a portfolio prototype may use fixture
data **only if clearly labelled as sample**.
