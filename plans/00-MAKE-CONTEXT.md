# [PRODUCT] — Figma Make Context Brief

> **Paste this once, at the start of the Figma Make project. It is not a screen. It is the system prompt that makes every later prompt short.**
> **Do not generate a name, wordmark, or logo.** The product has no final name.

---

## Brand slot — intentionally empty

* The app has no branding baked in anywhere.
* Feul (original) and Grain (candidate) are **set aside** — do not use either in UI, copy, or wordmark.
* Everywhere a name would appear, render `[PRODUCT]` as a literal placeholder in a neutral, unlabeled lockup — or leave the wordmark slot **empty** (preferred). Use a simple geometric mark if a mark is structurally required, not a typed name.
* Do not invent a name, tagline, or logo around the placeholder. The placeholder must survive every screen as a visible empty slot, not as styled text.

**Copy rule:** never write "Feul" or "Grain" in UI. Use `[PRODUCT]` only in comments/specs if a name is structurally unavoidable.

---

## What it is

A mobile marketplace where Indian contributors record their voice to build datasets for AI labs. Two roles: **Contributor** (records paid voice clips) and **Validator** (grades submitted clips). Portfolio case study, built to production rigor — not shipped, no real payment rails, no live marketplace.

Illustrative lab names (no affiliation, for realism only): **Sarvam AI, AI4Bharat, Bhashini**.

---

## Core product idea — coverage, not hours

The platform does not sell hours of audio. It sells **coverage**: a specific speaker demographic × dialect × district × acoustic condition that is scarce.

This shapes everything:

* Campaigns are framed as coverage targets: `62% collected · 400 Tamil clips still needed to close the benchmark Friday`
* Pay includes a **coverage-scarcity multiplier** (honest, checkable, shown before recording)
* Retention comes from finishing real gaps, never streaks or fake urgency

**Research backing (for copy realism, not decoration):**
* AI4Bharat: 300,000 raw hours, ~6,000 transcribed
* Indic DiarBench: 485 speakers from 189 districts — diversity > volume
* Josh Talks Human-1: separate channel per speaker for conversational training

---

## Trust principle — non-negotiable

**Same work, same base pay. Always.**

Tiers never change what a given clip is worth. They change:

1. **What work you can access** — higher-value campaigns unlock as you build a track record
2. **How fast you are paid** — higher trust = less review = faster settlement, the platform carries risk

Never show a Gold contributor earning more than Bronze for an identical clip.

---

## Target user

* 18–55, owns a budget Android phone — **design at 360px width first** (Redmi, Galaxy A), not 390+
* Has UPI (phone-bound), may have low digital literacy, may be reading a script aloud for the first time
* First-time earner who has never trusted an app with their money before
* Must work on cheap screens in daylight and on OLED at night

**Literacy is not assumed** — every script/instruction has audio playback. No ID upload, no KYC form before first earning (see verification below).

---

## Visual direction — warm Revolut, light-only

Borrow **Revolut's structure** — huge confident numbers, one clear focus per screen, generous negative space, almost no chrome — rendered entirely in a **warm light palette**.

* **Not** a dark premium app. The **only** dark surface in the entire product is the Studio capture screen, where dark is functional.
* Depth from warm layered surfaces + subtle elevation, **never** glow or gradient fills.
* Emotional target: **quiet competence** — a person who did honest work and can see exactly what it earned them.

**Tone:** honest, calm, plain language. No fake urgency, no gamified hype, no emoji as UI. Numbers do the talking.

---

## Light vs dark — the one rule

* **Light (Bone)** = everything: onboarding, home, quests, wallet, profile, validator
* **Dark (Carbon)** = **Studio capture only** — recording state

> I didn't build a dark mode. I made darkness mean one thing — you're recording. If the wallet could also be dark, dark would stop meaning anything.

---

## Three things the system forbids

1. No dark theme anywhere except Studio capture
2. No gradient-filled pill buttons, no decorative glows, no emoji as UI
3. No two screens doing the same job — Home ≠ Wallet (see below)

---

## Home ≠ Wallet — critical IA

| Home — "what should I do now?" | Wallet — "what happened to my money?" |
|---|---|
| Single big TODAY earning figure | **No giant hero number** — bento: Available · Pending · This week · Total |
| Primary record CTA (names job + pay) | One honest weekly earnings bar |
| 2–3 recommended campaigns (rows) | UPI destination + withdraw (with exact gap if below ₹100) |
| Needs-attention (rejected clip, missing UPI) | Full ledger: All / Earnings / Withdrawals |
| Coverage/standing progress toward next unlock | Quality bonuses as separate line items |
| Recent activity (last 3, compact) |  |

If both screens show a 52px rupee figure, the design is wrong.

---

## Verification model — tiered to money at risk

| Stage | Required | Why |
|---|---|---|
| Sign up + earn | Phone + language + T&C + **DPDP data consent — in native language, before any recording** | Standard; consent mandatory |
| First withdrawal | **UPI VPA name-match** (penny-drop, no document) | Confirms named person owns payout account |
| Above cumulative earnings threshold | PAN | TDS/tax, not identity paranoia |
| High earners only | Full KYC | Rare |

Never a passport/selfie flow — this is a work-payout app, not a card issuer.

---

## Withdrawal floor — the governing rule

> The first-withdrawal floor must never exceed what one guided session can earn.

* Standing floor: **₹100** (one clean rule, always true)
* Guided onboarding designed to reach ₹100 in first session (₹50 calibration + ₹50 first real task)
* Withdraw visible but **disabled below floor** with exact gap: `₹50 more to withdraw` — never hidden
* Fraud controls on identity (one account per phone, VPA name-match, auto-check pass required, device fingerprint), not on the contributor's money

---

## Economic honesty

* **Security Reserve — deleted.** No mechanic holds contributor money. Risk-based settlement replaces it.
* **Streak surge — deleted.** Replaced by demand-based signal: `Tamil room audio +15% — Sarvam needs 400 more clips this week` — real supply information.
* **Progression — two axes for the user, not three:** Standing (reliability, earns access + speed) + Craft (competence per format×language). Coverage value is **market context** (you are it, you don't earn it) — rendered in a different visual register, never as a third bar to fill.

---

## How to work

I will prompt you screen-group by screen-group. Confirm you've absorbed this context, then wait for the first request. Every screen you generate must follow `01-DESIGN-SYSTEM.md` exactly — no new colors, sizes, or radii.

