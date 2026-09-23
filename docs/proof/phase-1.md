# Phase 1 proof pack (partial) — consent gate · real levels · chain arithmetic

> Captured 2026-09-16. This is a **written** proof pack; screenshot capture is deferred
> (see `VERIFICATION-REPORT.md` §6 D-A). Each claim is route-provable or code-provable.

## 1. Consent strictly precedes any mic (route-provable)
- **Route:** `/contributor/consent` is a **native route** (sibling of `/contributor`), not a
  sheet — `src/app/routes.tsx`, component `ConsentGate.tsx`. Owner decision **D-3**.
- **Assertion:** the mic hook `useRealMicLevel` mounts only inside `Capture` in
  `Recording.tsx`; opening `/recording/q-lines-1` signed-out lands on consent and never mounts
  the mic. DPDP verbatim lives in one place (`lib/consentCopy.ts`) and appears once.
- **How to check:** open `/recording/q-lines-1` in a clean profile → you see consent, not a
  microphone. Covered by `pnpm smoke` (`/recording/q-lines-1` renders clean).

## 2. Real levels freeze in silence (code-provable)
- `src/app/lib/useRealMicLevel.ts` — lazy `getUserMedia`, `AnalyserNode` RMS, fast-attack/
  slow-release envelope, **zero in silence**, track released on stop, denial surfaced.
- The old mock (`Math.random()` every 90 ms in `Recording.tsx`) was deleted in the build
  session. Levels come only from the analyser.

## 3. Session-one chain ≥ ₹100 (arithmetic)
- `lib/quests.ts`: `newcomerChainTotal = Σ questTotal(quest)`; `WITHDRAW_MIN = 100` (single
  source; `PayoutFlow` and `Wallet` both import it — F-2).
- The first-job path credits calibration + task into `walletBalance`; the exact-gap copy
  (`₹{gap} more to withdraw`) is computed from that same value.

## 4. Gate evidence for this phase
- `pnpm build` exit 0 · `pnpm metrics` all-green · `pnpm smoke` **35/35** (incl. consent,
  recording, credited, and all 9 edge routes).

## Open for a full Gate 1
- Mic-prime "Not now" affordance + OS deep-link on deny (`Recording.tsx:79–101`).
- 320 / 150 % / 300-nit contrast **captures** (no screenshot harness wired this session).
