import {
  ShoppingBag, Zap, Hash, Coffee, Phone, Plane,
  Stethoscope, Briefcase, Landmark, Users2, Tv,
  type LucideIcon,
} from 'lucide-react';

/**
 * Quest formats (taxonomy: LINES · SCENARIO · INTERVIEW · ROOM)
 *  - lines     : fast single-line micro-clips (lowest payout)
 *  - scenario  : solo scripted role, multi-turn, no other live voice
 *  - interview : solo, answering against a pre-recorded question track
 *  - room      : people in one room, one phone, ONE continuous take
 */
export type QuestFormat = 'lines' | 'scenario' | 'interview' | 'room';

export type QuestTag =
  | 'high-demand' | 'bonus' | 'expiring' | 'limited' | 'new' | null;

export interface Quest {
  id: string;
  title: string;
  description: string;
  format: QuestFormat;
  /** The lab / client this coverage feeds. Shown on the quest row. */
  client: string;
  /** A representative excerpt shown in the Brief. */
  excerpt: string;
  /** Scenario/interview — number of your turns / questions. */
  turns?: number;
  /** Interview — number of question stems. */
  questions?: number;
  /** Room — number of people gathered around the one device. */
  speakers?: number;
  /** Interview — presence of a pre-recorded question track. Absent ⇒ disabled. */
  track?: boolean;
  /** False ⇒ "waiting for prompts", card disabled. Defaults to true. */
  available?: boolean;

  /* ── Coverage pay model (same work, same pay — tier changes access/speed only) ──
     total = round(basePay × coverageMult) + bonus */
  /** Flat base for the work itself. */
  basePay: number;
  /** Scarcity multiplier for under-covered demographics/dialects (1.0 = no premium). */
  coverageMult: number;
  /** Fixed quality/completion bonus added on top. */
  bonus: number;
  /** How full this campaign's coverage target is (0–100). */
  coveragePct: number;
  /** Districts still needing this coverage. */
  districtsNeeded: number;
  /** Clips left to close the campaign. */
  clipsToClose: number;

  /** @deprecated derived — use questTotal(). Kept for back-compat; equals total. */
  cashPayout: number;
  xp: number;
  duration: string;
  clips: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  Icon: LucideIcon;
  tag?: QuestTag;
  tagLabel?: string;
  slotsLeft?: number | null;
  /** Minimum standing level required (1 = open to everyone). */
  minTier?: number;
}

/** base × coverage + bonus = total. Single source of truth for pay. */
export function questTotal(q: Pick<Quest, 'basePay' | 'coverageMult' | 'bonus'>): number {
  return Math.round(q.basePay * q.coverageMult) + q.bonus;
}

export const formatMeta: Record<QuestFormat, {
  label: string; short: string; tone: 'neutral' | 'accent' | 'navy';
}> = {
  lines:     { label: 'Quick Lines',   short: 'LINES',     tone: 'neutral' },
  scenario:  { label: 'Solo Scenario', short: 'SCENARIO',  tone: 'accent'  },
  interview: { label: 'Interview',     short: 'INTERVIEW', tone: 'accent'  },
  room:      { label: 'Room Take',     short: 'ROOM',      tone: 'navy'    },
};

/** Helper — set cashPayout from the coverage breakdown so nothing drifts. */
function q(base: Omit<Quest, 'cashPayout'>): Quest {
  return { ...base, cashPayout: questTotal(base) };
}

export const quests: Quest[] = [
  /* ── Quick Lines — fast, small payout. Always ≥1 open LINES row at every tier. ── */
  q({
    id: 'q-lines-1',
    title: 'Hindi — Everyday Phrases',
    description: 'Common Hindi phrases recorded naturally, one line at a time.',
    format: 'lines', client: 'Sarvam AI',
    excerpt: '"नमस्ते, आप कैसे हैं?" · "मुझे एक कप चाय चाहिए।"',
    basePay: 10, coverageMult: 1.0, bonus: 2,
    coveragePct: 74, districtsNeeded: 3, clipsToClose: 180,
    xp: 100, duration: '3 min', clips: 8, difficulty: 'Easy',
    language: 'Hindi', Icon: Zap, tag: 'new', tagLabel: 'New', minTier: 1,
  }),
  q({
    id: 'q-lines-2',
    title: 'Product Names — Marathi',
    description: 'Short product callouts, one line each.',
    format: 'lines', client: 'AI4Bharat',
    excerpt: '"नवीन सॅमसंग गॅलक्सी आता ३०% सूट सह."',
    basePay: 10, coverageMult: 1.0, bonus: 0,
    coveragePct: 68, districtsNeeded: 5, clipsToClose: 240,
    xp: 80, duration: '2 min', clips: 6, difficulty: 'Easy',
    language: 'Marathi', Icon: ShoppingBag, minTier: 1,
  }),
  q({
    id: 'q-lines-3',
    title: 'Numbers, Dates & Money — English',
    description: 'Read out amounts, dates and phone numbers clearly.',
    format: 'lines', client: 'Google',
    excerpt: '"That comes to ₹1,240." · "Your appointment is on the 3rd of March."',
    basePay: 11, coverageMult: 1.0, bonus: 0,
    coveragePct: 81, districtsNeeded: 2, clipsToClose: 120,
    xp: 90, duration: '3 min', clips: 7, difficulty: 'Easy',
    language: 'English', Icon: Hash, minTier: 1,
  }),

  /* ── Solo Scenarios — scripted role, multi-turn ────────────── */
  q({
    id: 'q-scen-1',
    title: 'Ordering at a Café',
    description: 'You play the customer across a 6-turn back-and-forth with a barista — order, ask about milk, pay, react to the wait.',
    format: 'scenario', client: 'Sarvam AI',
    excerpt: 'You walk into a busy café on a Monday morning and you know exactly what you want.',
    turns: 6,
    basePay: 28, coverageMult: 1.6, bonus: 0,
    coveragePct: 62, districtsNeeded: 8, clipsToClose: 427,
    xp: 250, duration: '7 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Coffee, tag: 'high-demand', tagLabel: '427 clips needed', slotsLeft: 18, minTier: 1,
  }),
  q({
    id: 'q-scen-3',
    title: 'Returning a Product',
    description: 'You are returning a defective pair of headphones. Be polite but firm across a 7-turn call with support.',
    format: 'scenario', client: 'Google',
    excerpt: 'Phone call to electronics support. You bought the headphones two weeks ago and one earbud is dead.',
    turns: 7,
    basePay: 55, coverageMult: 1.0, bonus: 0,
    coveragePct: 55, districtsNeeded: 6, clipsToClose: 310,
    xp: 280, duration: '9 min', clips: 1, difficulty: 'Medium',
    language: 'English', Icon: Phone, minTier: 2,
  }),
  q({
    id: 'q-scen-4',
    title: 'Booking a Flight (Frustrated)',
    description: 'The airline has cancelled your flight twice. Convey frustration without raising your voice — 9 turns.',
    format: 'scenario', client: 'Karya',
    excerpt: "It's 9pm. You've been on hold 22 minutes. Your flight tomorrow has just been cancelled — again.",
    turns: 9,
    basePay: 60, coverageMult: 1.2, bonus: 3,
    coveragePct: 47, districtsNeeded: 9, clipsToClose: 520,
    xp: 380, duration: '13 min', clips: 1, difficulty: 'Hard',
    language: 'English', Icon: Plane, tag: 'expiring', tagLabel: 'Closes in 2h', slotsLeft: 7, minTier: 2,
  }),

  /* ── Interviews — solo, answering against a pre-recorded track ── */
  q({
    id: 'q-int-1',
    title: 'Doctor Visit — Symptom Interview',
    description: "You'll hear a doctor's questions, then answer each one as the patient — a 3-day fever, sleep, appetite, medication.",
    format: 'interview', client: 'AI4Bharat',
    excerpt: "You'll hear each question, then it's your turn to answer as the patient.",
    questions: 8, turns: 8, track: true,
    basePay: 50, coverageMult: 1.0, bonus: 15,
    coveragePct: 58, districtsNeeded: 7, clipsToClose: 360,
    xp: 320, duration: '11 min', clips: 8, difficulty: 'Medium',
    language: 'Hindi', Icon: Stethoscope, tag: 'bonus', tagLabel: '+20% Bonus', minTier: 2,
  }),
  q({
    id: 'q-int-2',
    title: 'HR Phone Screen',
    description: "Answer a recruiter's screening questions naturally — your experience, notice period, expectations.",
    format: 'interview', client: 'Sarvam AI',
    excerpt: "A recruiter asks; you answer. You'll hear each question before your turn.",
    questions: 6, turns: 6, track: true,
    basePay: 60, coverageMult: 1.0, bonus: 0,
    coveragePct: 66, districtsNeeded: 4, clipsToClose: 210,
    xp: 300, duration: '9 min', clips: 6, difficulty: 'Medium',
    language: 'English', Icon: Briefcase, minTier: 2,
  }),
  q({
    id: 'q-int-3',
    title: 'Bank KYC Verification Call',
    description: 'A verification-call interview. The question track for this quest is still being prepared.',
    format: 'interview', client: 'RBI Innovation Lab',
    excerpt: 'Prompts for this interview are being recorded — check back soon.',
    questions: 7, turns: 7, track: false, available: false,
    basePay: 50, coverageMult: 1.0, bonus: 0,
    coveragePct: 20, districtsNeeded: 10, clipsToClose: 600,
    xp: 260, duration: '8 min', clips: 7, difficulty: 'Medium',
    language: 'Hindi', Icon: Landmark, minTier: 3,
  }),

  /* ── Room Takes — one room, one phone, one continuous take ── */
  q({
    id: 'q-room-1',
    title: 'Family Dinner Table',
    description: 'Gather 4 people around one phone and play a family at dinner planning a Lucknow wedding. One continuous take — do not stop between lines.',
    format: 'room', client: 'Sarvam AI',
    excerpt: 'Sunday dinner, four people around a table. The eldest just brought up the family wedding in Lucknow.',
    speakers: 4,
    basePay: 130, coverageMult: 1.6, bonus: 12,
    coveragePct: 40, districtsNeeded: 12, clipsToClose: 400,
    xp: 800, duration: '~25 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Users2, tag: 'high-demand', tagLabel: 'Premium · 4 people', slotsLeft: 2, minTier: 3,
  }),
  q({
    id: 'q-room-2',
    title: 'Cricket Watch Party',
    description: 'Three friends watching the last over of a close match on one phone. Overlap, cheer, groan — one take, phone stays put.',
    format: 'room', client: 'Karya',
    excerpt: 'Living room, last over of a tight chase. 8 needed off 6. Everyone is on edge.',
    speakers: 3,
    basePay: 120, coverageMult: 1.2, bonus: 6,
    coveragePct: 52, districtsNeeded: 8, clipsToClose: 300,
    xp: 560, duration: '~18 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Tv, tag: 'limited', tagLabel: '3 slots left', slotsLeft: 3, minTier: 3,
  }),
];

export function getQuest(id: string | undefined): Quest | undefined {
  return quests.find((qq) => qq.id === id);
}

/* Shorter feed for the Home "Picked for you" list — valid ids only. */
export const pickedForYou: Quest[] = [
  quests.find((qq) => qq.id === 'q-scen-1')!,
  quests.find((qq) => qq.id === 'q-int-1')!,
  quests.find((qq) => qq.id === 'q-room-1')!,
];
