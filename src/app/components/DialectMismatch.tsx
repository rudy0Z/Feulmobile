import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, AudioLines, MapPin, ShieldCheck, ArrowRight, BadgeCheck } from 'lucide-react';

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
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          style={{
            width: 40, height: 40, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: 20,
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="inline-flex items-center gap-2 mb-4"
            style={{
              padding: '6px 12px', borderRadius: 'var(--r-full)',
              background: 'var(--t-ochre-50)', border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 'var(--r-full)', background: 'var(--state-pending)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--state-pending)' }}>
              Flagged for review
            </span>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.015em', lineHeight: 1.2 }}>
            We paid this at base rate
          </h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 8, maxWidth: 320 }}>
            Your clip is accepted and paid. The rarity bonus you claimed didn’t match what we
            heard, so we left it off this time — nothing else changes.
          </p>
        </motion.div>
      </div>

      {/* Pay breakdown card — the core */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="mx-6 mt-6"
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-2)', padding: 20,
        }}
      >
        {/* Original claim */}
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Your claim</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>
              Base <span style={{ fontFamily: 'var(--font-number)' }}>₹90</span> · Vidarbha Marathi
              <span style={{ fontFamily: 'var(--font-number)' }}> 1.6×</span> bonus
            </p>
          </div>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 17, fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
            ₹144
          </span>
        </div>

        {/* What we detected */}
        <div
          style={{
            background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 14, marginBottom: 14,
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--state-pending)', marginBottom: 10 }}>
            What we detected
          </p>
          <div className="flex items-start gap-3" style={{ marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: 'var(--t-ochre-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AudioLines className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The dialect signal didn’t match Vidarbha Marathi.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: 'var(--t-ochre-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Your location was inconsistent with the claimed region.
            </p>
          </div>
        </div>

        {/* Adjusted payout */}
        <div
          style={{
            background: 'var(--t-verdigris-50)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 16,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--state-settled)' }}>
                Adjusted payout · base rate
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-number)', fontSize: 26, fontWeight: 800, color: 'var(--money-figure)', letterSpacing: '-0.01em' }}>
              ₹90
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 8 }}>
            The clip is accepted and paid. Only the rarity bonus was removed.
          </p>
        </div>
      </motion.div>

      {/* Verify-for-future card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="mx-6 mt-4"
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-1)', padding: 20,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--t-terracotta-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={1.9} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              Verify your dialect to earn rarity bonuses
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 16 }}>
          A one-time check — record a short regional phrase and confirm your home location — unlocks
          the multiplier on your future clips.
        </p>
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            width: '100%', height: 48, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', color: 'var(--action-primary)',
            border: '1px solid var(--border-strong)', cursor: 'pointer',
            fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Verify my dialect <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Honest footer */}
      <p className="mx-8 mt-5" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-faint)', lineHeight: 1.55, textAlign: 'center' }}>
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
            border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700,
            boxShadow: 'var(--e-glow)',
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
