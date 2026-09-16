import type { Transition } from 'motion/react';

/* ── Durations, in SECONDS — the JS mirror of the CSS motion tokens ────
   theme.css defines --duration-fast/base/slow/enter as
   `120ms`/`200ms`/`300ms`/`400ms`. This file is the JS side of the same
   scale, and the duplication is unavoidable: CSS custom properties are
   strings, and the animation library wants a number of seconds. Naming
   them identically and keeping them in ONE place beats every screen
   inventing its own 0.2.

   This file is treated as a motion token source by the metrics script —
   raw `duration:` literals are allowed here and nowhere else.

   MUST be declared before `springs`, which reads `durations.exit`. A
   `const` referenced before its declaration is a temporal-dead-zone error
   at module init, and because Vite does not typecheck, `pnpm build`
   passed while the whole app rendered blank. Found in the visual audit. */
export const durations = {
  fast:  0.12,   // == --duration-fast   press
  base:  0.2,    // == --duration-base   quick state change
  slow:  0.3,    // == --duration-slow   the workhorse
  enter: 0.4,    // == --duration-enter  enter/exit, sheets
  exit:  0.2,
} as const;

/* ── Easings — the JS mirror of the CSS directional pairs ─────────────
   Decelerate for entering the screen, accelerate for leaving. */
export const easings = {
  standard:   [0.2, 0, 0, 1],
  decelerate: [0.05, 0.7, 0.1, 1],
  accelerate: [0.3, 0, 0.8, 0.15],
} as const;

/**
 * Motion presets — every screen pulls from here so feel stays consistent.
 *
 *   tap     — primary press feedback on cards, rows, buttons
 *   tapHard — punchier press for solid CTAs / nav icons
 *   enter   — element entering view (lists, page sections)
 *   exit    — element leaving view
 *   pulse   — slow breathing loop (waveforms, ambient)
 *   layout  — shared-layout transitions (active nav pill)
 */

export const springs = {
  tap:     { type: 'spring', stiffness: 400, damping: 30 } satisfies Transition,
  tapHard: { type: 'spring', stiffness: 500, damping: 26 } satisfies Transition,
  enter:   { type: 'spring', stiffness: 280, damping: 22 } satisfies Transition,
  exit:    { duration: durations.exit, ease: 'easeIn' } satisfies Transition,
  layout:  { type: 'spring', stiffness: 380, damping: 30 } satisfies Transition,
} as const;

export const whileTap = {
  card:   { scale: 0.985, y: 0.5 },
  row:    { scale: 0.985, backgroundColor: 'rgba(var(--carbon-rgb),0.03)' },
  button: { scale: 0.96 },
  icon:   { scale: 0.9 },
} as const;

export const pulseOpacity = (min = 0.08, max = 0.14, durationSec = 4.5) => ({
  animate:    { opacity: [min, max, min] },
  transition: { duration: durationSec, repeat: Infinity, ease: 'easeInOut' as const },
});

export const enterStagger = (i: number, baseDelay = 0.05) => ({
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: durations.slow, delay: baseDelay + i * 0.06 },
});
