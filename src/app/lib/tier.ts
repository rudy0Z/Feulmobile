/**
 * Standing tiers. A tier changes ACCESS (which campaigns open to you) and
 * SETTLEMENT SPEED — never a clip's pay. Same work, same pay, every tier.
 * (Fixed: the old list duplicated "Elite" at indices 4 and 5.)
 */
export const TIER_NAMES = [
  'New Contributor',
  'Verified Contributor',
  'Trusted Contributor',
  'Elite Contributor',
] as const;

export function tierName(level: number): string {
  const idx = Math.max(1, Math.min(level, TIER_NAMES.length)) - 1;
  return TIER_NAMES[idx];
}

/** Name of the next tier up, or the current top tier if already Elite. */
export function nextTierName(level: number): string {
  return tierName(level + 1);
}

/** Is the contributor already at the highest tier? */
export function isTopTier(level: number): boolean {
  return level >= TIER_NAMES.length;
}
