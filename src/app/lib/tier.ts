export const TIER_NAMES = [
  'New Contributor',
  'Verified Contributor',
  'Trusted Contributor',
  'Elite Contributor',
  'Elite Contributor',
] as const;

export function tierName(level: number): string {
  const idx = Math.max(1, Math.min(level, TIER_NAMES.length)) - 1;
  return TIER_NAMES[idx];
}

export function nextTierName(level: number): string {
  return tierName(level + 1);
}
