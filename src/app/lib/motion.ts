import type { Transition } from 'motion/react';

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
  exit:    { duration: 0.18, ease: 'easeIn' } satisfies Transition,
  layout:  { type: 'spring', stiffness: 380, damping: 30 } satisfies Transition,
} as const;

export const whileTap = {
  card:   { scale: 0.985, y: 0.5 },
  row:    { scale: 0.985, backgroundColor: 'rgba(28,36,52,0.03)' },
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
  transition: { duration: 0.35, delay: baseDelay + i * 0.06 },
});
