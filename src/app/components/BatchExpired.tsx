import { motion, AnimatePresence } from 'motion/react';
import { Timer, RotateCcw, ChevronLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
  onPickNew: () => void;
}

export function BatchExpired({ onClose, onPickNew }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key="batch-overlay"
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
            width: 96, height: 96, borderRadius: 24,
            background: 'var(--t-ochre-50)',
            border: '1.5px solid rgba(var(--ochre-rgb),0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <Timer style={{ width: 46, height: 46, color: 'var(--t-ochre-700)' }} />
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-ui)', fontSize: 26, fontWeight: 800,
          color: 'var(--text-primary)', textAlign: 'center', marginBottom: 12, lineHeight: 1.2,
        }}>
          Batch Session Expired
        </h2>
        <p style={{
          fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
          textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: 32,
        }}>
          This grading session was held for too long and was released back to the pool. Your progress on graded clips has been saved and credited.
        </p>

        {/* Progress saved */}
        <div style={{
          width: '100%', maxWidth: 340,
          background: 'var(--t-bone-0)',
          borderRadius: 16, border: '1px solid var(--border-subtle)',
          boxShadow: '0px 4px 16px rgba(var(--carbon-rgb),0.06)',
          padding: '18px 20px', marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Session Summary
          </div>
          {[
            { label: 'Clips graded', value: '2 / 3', accent: false },
            { label: 'Earnings saved', value: '+₹42.00', accent: true },
            { label: 'Accuracy tracked', value: '94.6%', accent: false },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{r.label}</span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: r.accent ? 'var(--color-success)' : 'var(--text-primary)',
                fontFamily: r.accent ? 'var(--font-number)' : undefined,
              }}>
                {r.value}
              </span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '12px 0' }} />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            The ungraded clip has been reassigned to another validator.
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onPickNew}
            style={{
              width: '100%', height: 52, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--t-terracotta-500) 0%, var(--action-primary-pressed) 100%)',
              color: 'var(--t-bone-0)', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0px 8px 24px rgba(196, 98, 45,0.28)',
            }}
          >
            <RotateCcw style={{ width: 16, height: 16 }} />
            Pick a New Batch
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 999,
              background: 'transparent', border: '1.5px solid var(--border-subtle)',
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
