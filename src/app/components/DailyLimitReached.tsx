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
          padding: 'var(--space-11)',
        }}
      >
        {/* Back */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 56, left: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)',
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
            marginBottom: 'var(--space-11)',
          }}
        >
          <Moon style={{ width: 44, height: 44, color: 'var(--text-muted)' }} strokeWidth={1.5} />
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800,
          color: 'var(--text-primary)', textAlign: 'center', marginBottom: 'var(--space-6)', lineHeight: 1.2,
        }}>
          Daily Limit Reached
        </h2>
        <p style={{
          fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)',
          textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: 'var(--space-12)',
        }}>
          You've completed all available clips for today. Quality caps exist to ensure fair distribution across contributors.
        </p>

        {/* Stats card */}
        <div style={{
          width: '100%', maxWidth: 340,
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)',
          boxShadow: '0px 4px 16px rgba(var(--carbon-rgb),0.06)',
          padding: 'var(--space-8) var(--space-9)', marginBottom: 'var(--space-11)',
        }}>
          <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-6)'}}>
            Today's Summary
          </div>

          {[
            { label: 'Clips recorded', value: '24 / 24' },
            { label: 'Earnings today',  value: '+₹216.00', accent: true },
            { label: 'Accuracy rate',   value: '97.2%' },
            { label: 'Standing',        value: 'Trusted' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)'}}>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>{r.label}</span>
              <span style={{
                fontSize: 'var(--fs-secondary)', fontWeight: 700,
                color: r.accent ? 'var(--color-success)' : 'var(--text-primary)',
                fontFamily: r.accent ? 'var(--font-number)' : undefined,
              }}>
                {r.value}
              </span>
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '12px 0' }} />

          {/* Reset countdown */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', fontWeight: 500 }}>Resets at</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
              <span style={{
                fontFamily: 'var(--font-number)', fontSize: 'var(--fs-caption)', fontWeight: 700,
                color: 'var(--text-muted)',
              }}>
                {nextDate} · {resetHour}
              </span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'}}>
          <button
            onClick={onViewEarnings}
            style={{
              width: '100%', height: 52, borderRadius: 'var(--r-full)',
              background: 'linear-gradient(160deg, var(--action-accent) 0%, var(--action-primary-pressed) 100%)',
              color: 'var(--text-on-dark)', fontSize: 'var(--fs-body)', fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
              boxShadow: '0px 8px 24px rgba(var(--terracotta-600-rgb),0.28)',
            }}
          >
            <TrendingUp style={{ width: 16, height: 16 }} />
            View Today's Earnings
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--r-full)',
              background: 'transparent', border: '1.5px solid var(--border-subtle)',
              color: 'var(--text-muted)', fontSize: 'var(--fs-secondary)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
