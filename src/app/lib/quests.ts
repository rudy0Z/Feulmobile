import {
  BookOpen, MessageCircle, Package, Sparkles, Zap, Users2,
  Utensils, ShoppingBag, Stethoscope, Plane, Phone, Coffee,
  type LucideIcon,
} from 'lucide-react';

/**
 * Quest formats
 *  - lines    : 1–2 line micro-clips (fastest, lowest payout)
 *  - scenario : a situational script — you play a role across multiple turns
 *               with surrounding context. Higher cognitive load, bigger payout.
 *  - group    : multi-speaker session — book a slot, record full scenario
 *               with other contributors. Highest payout, scheduled.
 */
export type QuestFormat = 'lines' | 'scenario' | 'group';

export type QuestTag =
  | 'high-demand' | 'bonus' | 'expiring' | 'limited' | 'new' | null;

export interface Quest {
  id: string;
  title: string;
  description: string;
  format: QuestFormat;
  /** A representative excerpt — for `lines` a sample line, for `scenario`
   *  a setup + first turn, for `group` the situation framing. */
  excerpt: string;
  /** Scenario/group only — total speaker turns or beats. */
  turns?: number;
  /** Group only — number of speakers in the session. */
  speakers?: number;
  /** Group only — scheduled session window. */
  sessionAt?: string;
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
}

export const formatMeta: Record<QuestFormat, {
  label: string; short: string; tone: 'neutral' | 'accent' | 'navy';
}> = {
  lines:    { label: 'Quick Lines',    short: 'LINES',    tone: 'neutral' },
  scenario: { label: 'Solo Scenario',  short: 'SCENARIO', tone: 'accent'  },
  group:    { label: 'Group Session',  short: 'GROUP',    tone: 'navy'    },
};

export const quests: Quest[] = [
  /* ── Quick Lines — fast, small payout ──────────────────────── */
  {
    id: 'q-lines-1',
    title: 'Hindi — Everyday Phrases',
    description: 'Common Hindi phrases recorded naturally.',
    format: 'lines',
    excerpt: '"नमस्ते, आप कैसे हैं?" · "मुझे एक कप चाय चाहिए।"',
    cashPayout: 12, xp: 100, duration: '3 min', clips: 8, difficulty: 'Easy',
    language: 'Hindi', Icon: Zap, tag: 'new', tagLabel: 'New',
  },
  {
    id: 'q-lines-2',
    title: 'Product Names — Marathi',
    description: 'Short product callouts, 1 line each.',
    format: 'lines',
    excerpt: '"नवीन सॅमसंग गॅलक्सी आता ३०% सूट सह."',
    cashPayout: 10, xp: 80, duration: '2 min', clips: 6, difficulty: 'Easy',
    language: 'Marathi', Icon: ShoppingBag,
  },

  /* ── Solo Scenarios — bigger context, multi-turn ───────────── */
  {
    id: 'q-scen-1',
    title: 'Ordering at a Café',
    description: 'You play the customer. 6-turn back-and-forth with a barista — order, ask about milk options, pay, react to the wait time.',
    format: 'scenario',
    excerpt: 'SETUP: You walk into a busy café on a Monday morning.\nTURN 1 — YOU: "Hi, can I get a large oat milk latte and one almond croissant, please?"',
    turns: 6,
    cashPayout: 45, xp: 250, duration: '7 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Coffee, tag: 'high-demand', tagLabel: '427 clips needed', slotsLeft: 18,
  },
  {
    id: 'q-scen-2',
    title: 'Doctor Visit — Describing Symptoms',
    description: 'Patient role. Describe a 3-day fever, answer follow-up questions about medication, sleep, appetite. Natural, slightly unsure tone.',
    format: 'scenario',
    excerpt: 'SETUP: General physician\'s clinic, late afternoon. You\'ve had a fever for 3 days.\nTURN 1 — YOU: "Doctor, mujhe pichhle teen din se bukhar hai, aur sar bhi bahut bhaari lag raha hai..."',
    turns: 8,
    cashPayout: 65, xp: 320, duration: '11 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Stethoscope, tag: 'bonus', tagLabel: '+20% Bonus',
  },
  {
    id: 'q-scen-3',
    title: 'Returning a Product',
    description: 'You\'re returning a defective pair of headphones. Be polite but firm across a 7-turn exchange with customer service.',
    format: 'scenario',
    excerpt: 'SETUP: Phone call to electronics store support. You bought the headphones two weeks ago.\nTURN 1 — YOU: "Hi, I bought a pair of headphones from your Pune store on the 14th, and the left earbud has completely stopped working."',
    turns: 7,
    cashPayout: 55, xp: 280, duration: '9 min', clips: 1, difficulty: 'Medium',
    language: 'English', Icon: Phone,
  },
  {
    id: 'q-scen-4',
    title: 'Booking a Flight (Frustrated)',
    description: 'Travel agent has cancelled your flight twice. Convey frustration without raising your voice — 9 turns.',
    format: 'scenario',
    excerpt: 'SETUP: It\'s 9pm, you\'ve been on hold for 22 minutes. Your flight to Bengaluru tomorrow has just been cancelled — for the second time this week.\nTURN 1 — YOU: "I\'ve been waiting on this line for almost half an hour, and this is the second cancellation in three days..."',
    turns: 9,
    cashPayout: 75, xp: 380, duration: '13 min', clips: 1, difficulty: 'Hard',
    language: 'English', Icon: Plane, tag: 'expiring', tagLabel: 'Closes in 2h', slotsLeft: 7,
  },

  /* ── Group Sessions — local multi-speaker, everyone gathers around one device ── */
  {
    id: 'q-group-1',
    title: 'Family Dinner Table',
    description: '4-speaker session. Gather 4 people around one device and play family members at dinner discussing weekend plans, school, and the upcoming wedding in Lucknow. Free-flowing, overlapping conversation welcome.',
    format: 'group',
    excerpt: 'SCENE: Sunday dinner, four people around a table. The eldest just brought up the upcoming family wedding in Lucknow. Conversation drifts naturally — agreement, mild disagreement, jokes, plans.',
    turns: 24, speakers: 4,
    cashPayout: 220, xp: 800, duration: '25 min', clips: 1, difficulty: 'Medium',
    language: 'Hindi', Icon: Users2, tag: 'high-demand', tagLabel: 'Premium · 4 speakers', slotsLeft: 2,
  },
  {
    id: 'q-group-2',
    title: 'Restaurant Booking Dispute',
    description: '3-speaker session: a host, a customer, and the customer\'s partner. Gather 3 people, pass the device, and negotiate the double-booked reservation calmly.',
    format: 'group',
    excerpt: 'SCENE: Saturday night, 8:15 PM, busy restaurant lobby. You arrive for a 8 PM reservation only to find the table given to another party.',
    turns: 18, speakers: 3,
    cashPayout: 165, xp: 600, duration: '20 min', clips: 1, difficulty: 'Hard',
    language: 'English', Icon: Utensils, tag: 'limited', tagLabel: '3 slots left', slotsLeft: 3,
  },
];

/* Shorter feed for the Home "Picked for you" list */
export const pickedForYou: Quest[] = [quests[2], quests[5], quests[3]];
