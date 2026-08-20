import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, ChevronLeft, Moon } from 'lucide-react';

interface Props {
  onClose: () => void;
  onViewEarnings: () => void;
}

export function DailyLimitReached({ onClose, onViewEarnings }: Props) {
  const resetHour = '12:00 AM';
  const nextDate = 'Tomorrow, Jun 3';

  return (
    <AnimatePresence>
      <motion.div
        key="limit-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'var(--surface-sunken)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 28,
        }}
      >
        {/* Back */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 56, left: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
          }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} />
          Tasks
        </button>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.05 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <Moon style={{ width: 44, height: 44, color: 'var(--text-muted)' }} strokeWidth={1.5} />
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
          color: 'var(--text-primary)', textAlign: 'center', marginBottom: 12, lineHeight: 1.2,
        }}>
          Daily Limit Reached
        </h2>
        <p style={{
          fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
          textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: 32,
        }}>
          You've completed all available clips for today. Quality caps exist to ensure fair distribution across contributors.
        </p>

        {/* Stats card */}
        <div style={{
          width: '100%', maxWidth: 340,
          background: '#FFFFFF',
          borderRadius: 16, border: '1px solid var(--card-border)',
          boxShadow: '0px 4px 16px rgba(28,36,52,0.06)',
          padding: '18px 20px', marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Today's Summary
          </div>

          {[
            { label: 'Clips recorded', value: '24 / 24' },
            { label: 'Earnings today',  value: '+₹216.00', accent: true },
            { label: 'Accuracy rate',   value: '97.2%' },
            { label: 'Streak',          value: '🔥 6 days' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{r.label}</span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: r.accent ? 'var(--color-success)' : 'var(--text-primary)',
                fontFamily: r.accent ? 'var(--font-mono)' : undefined,
              }}>
                {r.value}
              </span>
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--card-border)', margin: '12px 0' }} />

          {/* Reset countdown */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Resets at</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                color: 'var(--text-muted)',
              }}>
                {nextDate} · {resetHour}
              </span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onViewEarnings}
            style={{
              width: '100%', height: 52, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              color: '#FFFFFF', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0px 8px 24px rgba(var(--accent-deep-rgb),0.28)',
            }}
          >
            <TrendingUp style={{ width: 16, height: 16 }} />
            View Today's Earnings
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 999,
              background: 'transparent', border: '1.5px solid var(--card-border)',
              color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
