import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, PhoneOff, Users, Clock, Play, RotateCcw, Save } from 'lucide-react';
import { IconButton } from './ui/Primitives';
import { durations } from '../lib/motion';

// C-04 (P1) — A long multi-person ROOM recording was interrupted at 19:04 of ~25:00
// (a call came in / app backgrounded). Four people gave up their evening and ₹220 is at
// stake. The take was saved locally. This screen names the STAKES, not the tech, and offers
// a resume path within 24h — after which the local copy is cleared. Also surfaced on Home as
// an active-assignment row.

const PARTICIPANTS = ['Asha', 'Ravi', 'Meena', 'Iqbal'];
const PRESERVED_PCT = (19 * 60 + 4) / (25 * 60); // 19:04 of ~25:00

export function SessionInterrupted() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <IconButton label="Go back" onClick={() => navigate(-1)} variant="surface">
        <ChevronLeft style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
      </IconButton>
      </div>

      {/* Reassurance hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.enter, ease: 'easeOut' }}
        className="mx-6 mt-3"
        style={{
          background: 'var(--surface-studio)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--space-11) var(--space-10)',
          boxShadow: 'var(--e-3)',
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: 'var(--r-full)',
          background: 'var(--state-settled-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-8)',
        }}>
          <Save className="w-7 h-7" style={{ color: 'var(--state-settled)' }} strokeWidth={1.8} />
        </div>
        <h1 style={{
          fontSize: 'var(--fs-title)', fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.2,
          color: 'var(--text-on-studio)', marginBottom: 'var(--space-5)',
        }}>
          Your 19-minute take is saved.
        </h1>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, lineHeight: 1.55, color: 'var(--text-on-studio)', opacity: 0.82 }}>
          A call came in and the recording stopped early — but nothing is lost. Every minute
          you all recorded is safe on this phone.
        </p>
      </motion.div>

      {/* Preserved-take card */}
      <div
        className="mx-6 mt-4"
        style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 20px 18px' }}>
          {/* Interruption cause — plain */}
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-8)'}}>
            <PhoneOff className="w-4 h-4" style={{ color: 'var(--text-muted)' }} strokeWidth={1.9} />
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)' }}>
              Interrupted at minute 19 — a call came in.
            </span>
          </div>

          {/* Duration preserved */}
          <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-4)'}}>
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Preserved</span>
            <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>
              19:04 <span style={{ color: 'var(--text-faint)', fontWeight: 500 }}>of ~25:00</span>
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            width: '100%', height: 8, borderRadius: 'var(--r-full)',
            background: 'var(--surface-sunken)', overflow: 'hidden', marginBottom: 'var(--space-9)',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${PRESERVED_PCT * 100}%` }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              style={{ height: '100%', borderRadius: 'var(--r-full)', background: 'var(--state-settled)' }}
            />
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)'}}>
            <Users className="w-4 h-4" style={{ color: 'var(--text-muted)' }} strokeWidth={1.9} />
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              4 people in this take
            </span>
          </div>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-2)'}}>
            {PARTICIPANTS.map((name) => (
              <span
                key={name}
                style={{
                  fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-secondary)',
                  background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--r-full)', padding: 'var(--space-2) var(--space-6)',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Money at stake */}
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: '1px solid var(--divider)',
            background: 'var(--state-settled-container)',
            padding: 'var(--space-7) var(--space-9)',
          }}
        >
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Riding on this take
          </span>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-subhead)', fontWeight: 800, color: 'var(--money-pending)' }}>
            ₹220
          </span>
        </div>
      </div>

      {/* Expiry notice */}
      <div
        className="mx-6 mt-4 flex items-start gap-3"
        style={{
          background: 'var(--state-pending-container)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--space-8) var(--space-8)',
        }}
      >
        <Clock className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--state-pending)', marginTop: 'var(--space-0)'}} strokeWidth={1.9} />
        <div>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>
            Resume within 24 hours
          </p>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: 'var(--state-pending)' }}>23h 41m left</span>
            {' '}— after that, this phone clears the local copy to free up space.
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="mx-6 mt-6">
        <motion.button
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/recording/q-room-1')}
          style={{
            width: '100%', height: 54, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--fs-body)', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
            boxShadow: 'var(--e-glow)',
          }}
        >
          <Play className="w-5 h-5" strokeWidth={2.2} /> Resume the take
        </motion.button>

        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: '100%', marginTop: 'var(--space-7)', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)',
          }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.9} /> Discard and start over
        </button>
      </div>

      {/* Home note */}
      <p
        className="mx-6 mt-6 text-center"
        style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, lineHeight: 1.5, color: 'var(--text-faint)', paddingBottom: 'var(--space-13)'}}
      >
        You’ll also find this waiting as an active-assignment row on your Home.
      </p>
    </div>
  );
}
