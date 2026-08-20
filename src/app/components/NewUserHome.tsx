/**
 * DEPRECATED (§ amended Pass 3).
 *
 * NewUserHome was a separate sparse "tutorial" screen that gated the real Home
 * behind `profile.stage !== 'credited'`. That was a product failure: new users
 * never reached the actual dashboard. "Empty state" means EMPTY DATA on the FULL
 * dashboard — not a wizard.
 *
 * There is now ONE Home (`Home.tsx`) with three DATA states (empty / pending /
 * live) sharing the same chrome. This module is intentionally left as an inert
 * stub (the sandbox blocks file deletion) and is imported by nothing.
 */
export function NewUserHome() {
  return null;
}
