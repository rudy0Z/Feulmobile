# PORTFOLIO-DIRECTION.md — [PRODUCT] (voice-data earning platform)

> **What this doc is:** the portfolio-level direction for this product, written into the repo so every future session knows what it *finally is*, what scope it serves, and what the portfolio case study needs from it.
> **Status:** v1 — 2026-09-14. Build authority inside this repo remains `plans/MASTER-BLUEPRINT.md` (with `plans/HANDOFF-NEW-SESSION.md` as the session entry). Strategy authority is `D:\Portfolio\POSITIONING.md`.
> **Naming:** the product has **no final name by design** — Feul and Grain are set aside; the brand slot stays `[PRODUCT]`/empty per `plans/00-MAKE-CONTEXT.md`. Portfolio copy refers to it as a codename until the name decision lands. Do not resolve the name as a side effect of any session here.

---

## 1. What this product finally is

A **gig earning platform for the AI data economy**: Indian contributors record voice clips that build datasets for AI labs — real labs, real dialects, real consent law, real fraud. The contributor side is **a job, not an app toy**; the contributors are the *human infrastructure* of AI. The economic thesis is locked: **labs buy coverage (speaker × dialect × district × acoustic condition), not hours**, and everything in the product — campaigns as coverage targets, the rarity multiplier, retention through real gaps — follows from that.

**The one-line portfolio identity:** *the study about everything a product designer does around AI — market design, earning psychology, trust engineering — where the AI itself is just infrastructure.*

## 2. Its role in the portfolio (POSITIONING.md §1)

| Question | Answer |
| --- | --- |
| Which layer of the AI-product problem? | **The business.** |
| Role in the lineup | **The business study.** empathy + business + market design, in ~3 minutes. |
| What it must prove | Does this person think like a product owner — coverage economics, payout architecture as trust, contributor empathy, concept exploration from ground up? |
| What it is deliberately NOT about | AI-as-conversationalist. **AI stays a supporting mention, never the headline.** No chat/copilot features belong in this product. |

## 3. Scope — what this repo is for now

**In scope (first-class):**
- The **Tier 1 rebuild** per `plans/MASTER-BLUEPRINT.md` / `plans/02-BUILD-SPEC.md` (Onboarding → Home → Studio → Wallet → QuestFeed), built to the locked decisions in `HANDOFF-NEW-SESSION.md` §2 (Bone/Carbon grounds, Home ≠ Wallet, waveform identity, consent-before-mic, same-work-same-base-pay, ₹100 first-session path).
- **P0 demo-killer fixes** (`plans/04-ISSUE-MAP.md`): real mic levels, contrast floors, brand-string purge, reachability rule (no state ships unless reachable without DevPanel).
- Business-evidence surfaces the case study quotes: coverage meter/context, rarity multiplier shown before recording, wallet bento with exact-gap withdraw, deleted-mechanics record (Security Reserve, streaks) for the "three generations" case-study section.
- Embed re-sync (`sync-embeds.mjs`) **only after Tier 1** — the current embed is a 4 Aug build the source has moved past.

**Out of scope:**
- Any conversational-AI or copilot surface (the portfolio deliberately minimizes AI here).
- Naming/branding decisions inside the repo (see header).
- Fintech drift: this is gig/labour work with a payment layer, not a finance app — no trading/market/wealth language or patterns.
- Validator parity and Quest-Creator revival unless the portfolio case study's scope triage explicitly calls for them (creator is retired → redirect; validator is scope-reduced).

## 4. What the portfolio case study needs from this repo

1. **A walkable ₹100 first session** (calibration + task, real sums, <4 min) — it is the case study's "how a user starts earning" proof.
2. **Reachable failure/edge states** (the 23 cases in `plans/03-EDGE-CASES.csv`) — the trust stories (repair, room consent, coverage-full, dialect mismatch) are case-study beats, so DevPanel-only reachability disqualifies them.
3. **The deleted-mechanics record** kept somewhere quotable (Reserve, streaks) — "I deleted a mechanic I designed" is the centerpiece decision story and needs its receipts.
4. **Honest labels** — no payment rails, no live marketplace; boundaries in UI stay consistent with the case study's boundary line.

## 5. Alignment rules for future sessions

- On conflict: `plans/MASTER-BLUEPRINT.md` (incl. §10 deltas) → `plans/HANDOFF-NEW-SESSION.md` → this doc → `plans/archive/*` (history, never build input).
- The case-study copy (`D:\Portfolio\case-study-copy\feul-copy-v3-OUTLINE.md`) is written against the **locked** model above; if a locked decision changes, update the copy doc in the same session.
- Do not invent market-size, payout-volume, or lab-partnership claims anywhere — illustrative lab names (Sarvam AI / AI4Bharat / Bhashini) stay "no affiliation" per `00-MAKE-CONTEXT.md`.
