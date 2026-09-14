// ─── Shared rejection taxonomy ──────────────────────────────────────────────
// One source of truth for why a clip fails, used in BOTH directions:
//   • Validator grading flags a clip with one of these reasons.
//   • Contributor Repair Studio explains the same reason back, in plain language.
//
// Design contract (03-EDGE-CASES.csv C-12): every rejection is one clear
// sentence + why + a corrective action. No silent penalties, no jargon.
// Keep this list closed — new reasons get added here, never inlined per-screen.

import type { LucideIcon } from 'lucide-react';
import {
  Volume2, AudioWaveform, Languages, FileText,
  Users, Timer, Bot, ShieldOff,
} from 'lucide-react';

export type RejectionReasonId =
  | 'noise'
  | 'clipping'
  | 'wrong-language'
  | 'script-deviation'
  | 'overlap'
  | 'duration'
  | 'synthetic'
  | 'consent-missing';

export interface RejectionReason {
  id: RejectionReasonId;
  /** Short chip label — sentence case, no period. */
  label: string;
  /** One clear sentence: what was detected. Shown to the contributor. */
  sentence: string;
  /** Why it matters for the dataset — the honest "why". */
  why: string;
  /** The corrective action the contributor should take. */
  fix: string;
  icon: LucideIcon;
  /** true = a re-record fixes it; false = structural (needs consent / new take). */
  recoverable: boolean;
}

export const REJECTION_REASONS: Record<RejectionReasonId, RejectionReason> = {
  noise: {
    id: 'noise',
    label: 'Background noise',
    sentence: 'Background sound was loud enough to sit on top of your voice.',
    why: 'Models learn the noise along with the words, which weakens every clip in the batch.',
    fix: 'Move to a quieter room and keep the mic 6–8 inches from your mouth, then re-record.',
    icon: Volume2,
    recoverable: true,
  },
  clipping: {
    id: 'clipping',
    label: 'Clipping',
    sentence: 'The audio peaked and distorted — the waveform hit the ceiling.',
    why: 'Clipped peaks lose the real sound of the word and can’t be recovered by processing.',
    fix: 'Hold the phone a little further away or lower your volume, then re-record.',
    icon: AudioWaveform,
    recoverable: true,
  },
  'wrong-language': {
    id: 'wrong-language',
    label: 'Wrong language',
    sentence: 'The speech didn’t match the language this campaign collects.',
    why: 'Each campaign is filling one specific language — a mismatch can’t count toward it.',
    fix: 'Check the campaign language at the top of the brief and re-record in that language.',
    icon: Languages,
    recoverable: true,
  },
  'script-deviation': {
    id: 'script-deviation',
    label: 'Script deviation',
    sentence: 'The words spoken drifted away from the prompt on screen.',
    why: 'The transcript has to match the audio exactly, or the pair can’t be used for training.',
    fix: 'Read the prompt line as written — a paraphrase counts as a different line.',
    icon: FileText,
    recoverable: true,
  },
  overlap: {
    id: 'overlap',
    label: 'Overlapping speech',
    sentence: 'Two voices spoke at the same time over part of the clip.',
    why: 'Overlap makes it impossible to attribute words to a single speaker cleanly.',
    fix: 'Take turns so each speaker has clear air, then re-record the affected part.',
    icon: Users,
    recoverable: true,
  },
  duration: {
    id: 'duration',
    label: 'Duration',
    sentence: 'The clip was too short (or too long) for what the prompt asked.',
    why: 'Length that falls outside the window usually means a line was cut off or padded.',
    fix: 'Read the full line at a natural pace — no long pauses at the start or end.',
    icon: Timer,
    recoverable: true,
  },
  synthetic: {
    id: 'synthetic',
    label: 'Synthetic voice',
    sentence: 'The audio carried signatures of text-to-speech rather than a live voice.',
    why: 'We only collect real human speech — synthetic audio poisons the dataset.',
    fix: 'This one needs a genuine recording. If this is a mistake, you can appeal the flag.',
    icon: Bot,
    recoverable: false,
  },
  'consent-missing': {
    id: 'consent-missing',
    label: 'Consent missing',
    sentence: 'A voice in the take never gave recorded consent.',
    why: 'Under the DPDP Act every person on tape must consent — no exceptions.',
    fix: 'Re-record with an on-tape consent roll-call, or remove the speaker who didn’t consent.',
    icon: ShieldOff,
    recoverable: false,
  },
};

/** Stable display order (most common → most structural). */
export const REJECTION_ORDER: RejectionReasonId[] = [
  'noise', 'clipping', 'wrong-language', 'script-deviation',
  'overlap', 'duration', 'synthetic', 'consent-missing',
];

export const rejectionReason = (id: RejectionReasonId): RejectionReason =>
  REJECTION_REASONS[id];
