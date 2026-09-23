import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Users, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { IconButton } from './ui/Primitives';
import { durations } from '../lib/motion';

// C-02 (P0) — Contributor opens a campaign whose demographic quota their profile already
// satisfies. Instead of a generic "not eligible" wall, name the honest reason (coverage is
// full for their bucket) AND redirect to campaigns where their voice is scarce and pays a
// multiplier. Always pair a rejection with a redirect.

interface Redirect {
  language: string;
  region: string;
  age: string;
  needLine: string;
  multiplier: string;
}

const REDIRECTS: Redirect[] = [
  { language: 'Marathi', region: 'Vidarbha', age: '45+', needLine: 'needs 400 more voices', multiplier: '1.6×' },
  { language: 'Bhojpuri', region: 'Rural', age: 'any age', needLine: 'needs 220 more voices', multiplier: '1.4×' },
];

export function CoverageFullState() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen pb-12"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <IconButton label="Go back" onClick={() => navigate(-1)} variant="surface">
        <ChevronLeft style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
      </IconButton>
      </div>

      {/* 1 — Coverage-full explanation card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, ease: 'easeOut' }}
        className="px-6"
      >
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--e-2)',
            padding: 'var(--space-10)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--state-settled-container)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Users className="w-5 h-5" style={{ color: 'var(--state-settled)' }} strokeWidth={1.9} />
            </div>
            <span style={{
              fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase',
              color: 'var(--state-settled)',
            }}>
              Coverage full
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 'var(--space-5)'}}>
            This campaign has enough Hindi · Delhi · 25–34 voices.
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 'var(--space-9)'}}>
            Quotas keep the dataset balanced, so this one’s full for your profile. It’s not about
            you — your bucket is already well covered here.
          </p>

          {/* Coverage bar sitting at 100% / full */}
          <div style={{
            background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)',
            padding: 'var(--space-7) var(--space-8)', border: '1px solid var(--divider)',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)' }}>
                Hindi · Delhi · 25–34
              </span>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-settled)', fontFamily: 'var(--font-number)' }}>
                100%
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 'var(--r-full)', background: 'var(--state-settled-container)', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: 'var(--r-full)', background: 'var(--state-settled)' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2 — Redirect cards: where your voice IS scarce */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, ease: 'easeOut', delay: 0.08 }}
        className="px-6 mt-7"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--action-primary)' }} strokeWidth={2} />
          <h2 style={{ fontSize: 'var(--fs-body)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.005em' }}>
            Your voice is scarce here — and pays more
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {REDIRECTS.map((r) => (
            <button
              key={`${r.language}-${r.region}`}
              onClick={() => navigate('/contributor/quests')}
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: 'var(--surface-raised)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-8)',
                display: 'flex', alignItems: 'center', gap: 'var(--space-7)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--action-primary-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={1.9} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} strokeWidth={2} />
                  <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {r.language} · {r.region} · {r.age}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {r.needLine} ·{' '}
                  <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: 'var(--action-primary)' }}>
                    {r.multiplier}
                  </span>{' '}
                  pay
                </p>
              </div>

              <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-faint)', flexShrink: 0 }} strokeWidth={2} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* 3 — Quiet footer reinforcing the honest logic */}
      <div className="px-6 mt-7">
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', lineHeight: 1.5, textAlign: 'center' }}>
          Rarity pays more because balance is scarce — the buckets that need you most earn the
          biggest multiplier.
        </p>
      </div>
    </div>
  );
}
