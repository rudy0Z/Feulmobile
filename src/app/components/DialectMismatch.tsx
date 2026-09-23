import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, AudioLines, MapPin, ShieldCheck, ArrowRight, BadgeCheck } from 'lucide-react';
import { IconButton } from './ui/Primitives';
import { durations } from '../lib/motion';

// C-07 (P0) — Dialect mismatch before payout. A contributor claimed a scarce, high-paying
// dialect ("Vidarbha Marathi · 1.6× bonus") but the acoustic signal and location don't match.
// This is an honest check, NOT an accusation: the clip is still accepted and paid at BASE rate,
// only the rarity bonus is removed, with a clear path to verify dialect for future bonuses.

export function DialectMismatch() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen pb-10"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14">
        <IconButton label="Back" onClick={() => navigate(-1)} variant="surface" style={{ marginBottom: 'var(--space-9)'}}>
        <ChevronLeft style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
      </IconButton>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow }}
        >
          <div
            className="inline-flex items-center gap-2 mb-4"
            style={{
              padding: 'var(--space-3) var(--space-6)', borderRadius: 'var(--r-full)',
              background: 'var(--state-pending-container)', border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 'var(--r-full)', background: 'var(--state-pending)' }} />
            <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-pending)' }}>
              Flagged for review
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.015em', lineHeight: 1.2 }}>
            We paid this at base rate
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 'var(--space-4)', maxWidth: 320 }}>
            Your clip is accepted and paid. The rarity bonus you claimed didn’t match what we
            heard, so we left it off this time — nothing else changes.
          </p>
        </motion.div>
      </div>

      {/* Pay breakdown card — the core */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.enter, delay: 0.06 }}
        className="mx-6 mt-6"
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
           boxShadow: 'var(--e-2)', padding: 'var(--space-9)',
        }}
      >
        {/* Original claim */}
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)'}}>
          <div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Your claim</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
              Base <span style={{ fontFamily: 'var(--font-number)' }}>₹90</span> · Vidarbha Marathi
              <span style={{ fontFamily: 'var(--font-number)' }}> 1.6×</span> bonus
            </p>
          </div>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
            ₹144
          </span>
        </div>

        {/* What we detected */}
        <div
          style={{
            background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 'var(--space-7)', marginBottom: 'var(--space-7)',
          }}
        >
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-pending)', marginBottom: 'var(--space-5)'}}>
            What we detected
          </p>
          <div className="flex items-start gap-3" style={{ marginBottom: 'var(--space-5)'}}>
            <div style={{ width: 28, height: 28, borderRadius: 'var(--r-xs)', background: 'var(--state-pending-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AudioLines className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
            </div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The dialect signal didn’t match Vidarbha Marathi.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div style={{ width: 28, height: 28, borderRadius: 'var(--r-xs)', background: 'var(--state-pending-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
            </div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Your location was inconsistent with the claimed region.
            </p>
          </div>
        </div>

        {/* Adjusted payout */}
        <div
          style={{
            background: 'var(--state-settled-container)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 'var(--space-8)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-settled)' }}>
                Adjusted payout · base rate
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--money-figure)', letterSpacing: '-0.01em' }}>
              ₹90
            </span>
          </div>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 'var(--space-4)'}}>
            The clip is accepted and paid. Only the rarity bonus was removed.
          </p>
        </div>
      </motion.div>

      {/* Verify-for-future card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.enter, delay: 0.12 }}
        className="mx-6 mt-4"
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
           boxShadow: 'var(--e-1)', padding: 'var(--space-9)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--action-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={1.9} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Verify your dialect to earn rarity bonuses
            </p>
          </div>
        </div>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 'var(--space-8)'}}>
          A one-time check — record a short regional phrase and confirm your home location — unlocks
          the multiplier on your future clips.
        </p>
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            width: '100%', height: 48, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', color: 'var(--action-primary)',
            border: '1px solid var(--border-strong)', cursor: 'pointer',
            fontSize: 'var(--fs-secondary)', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
          }}
        >
          Verify my dialect <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Honest footer */}
      <p className="mx-8 mt-5" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', lineHeight: 1.55, textAlign: 'center' }}>
        Rarity pays more only when the rare voice is genuinely there. Verification keeps it fair
        for everyone.
      </p>

      {/* Primary continue */}
      <div className="px-6 mt-6">
        <button
          onClick={() => navigate('/contributor/wallet')}
          style={{
            width: '100%', height: 52, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--fs-body)', fontWeight: 700,
            boxShadow: 'var(--e-2)',
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
