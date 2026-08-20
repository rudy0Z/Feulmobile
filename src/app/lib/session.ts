import { useEffect, useState } from 'react';

/**
 * Lightweight client-side session/profile store (no backend — Pass 1 auth is stubbed).
 * Backed by localStorage with a window event for cross-component reactivity.
 */

export type NewUserStage = 'day0' | 'session' | 'credited';

export interface FeulProfile {
  name: string;
  initials: string;
  languages: string[];
  upiId: string;
  upiLinked: boolean;
  /** Progressive journey stage — maps to Home data state: day0→empty, session→pending, credited→live. */
  stage: NewUserStage;
  walletBalance: number;
}

const PROFILE_KEY = 'feul_profile';
const CONSENT_KEY = 'feul_consent';
const EVENT = 'feul:session';

function emit() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENT));
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('') || '?';
}

export function getProfile(): FeulProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as FeulProfile) : null;
  } catch {
    return null;
  }
}

export function setProfile(patch: Partial<FeulProfile>) {
  const current = getProfile();
  const next: FeulProfile = {
    name: 'there',
    initials: '?',
    languages: [],
    upiId: '',
    upiLinked: false,
    stage: 'day0',
    walletBalance: 0,
    ...current,
    ...patch,
  };
  if (patch.name) next.initials = getInitials(patch.name);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  emit();
  return next;
}

/** Stubbed auth — records a signed-in profile and starts the day-0 journey. */
export function signIn(_method: 'google' | 'email' | 'phone', name = 'Alex Johnson') {
  return setProfile({
    name,
    initials: getInitials(name),
    stage: 'day0',
    walletBalance: 0,
  });
}

export function advanceStage(stage: NewUserStage) {
  return setProfile({ stage });
}

export function hasConsented(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === '1';
  } catch {
    return false;
  }
}

export function recordConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, '1');
  } catch {
    /* ignore */
  }
  emit();
}

/** Reactive read of the whole session (profile + consent). Re-renders on any change. */
export function useSession() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const on = () => setTick((t) => t + 1);
    window.addEventListener(EVENT, on);
    window.addEventListener('storage', on);
    return () => {
      window.removeEventListener(EVENT, on);
      window.removeEventListener('storage', on);
    };
  }, []);
  // tick forces recompute
  void tick;
  return {
    profile: getProfile(),
    consented: hasConsented(),
  };
}
