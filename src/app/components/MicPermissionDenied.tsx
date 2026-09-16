import { motion, AnimatePresence } from 'motion/react';
import { MicOff, ExternalLink, RefreshCw } from 'lucide-react';
import { durations } from '../lib/motion';

interface Props {
  onClose: () => void;
  onRetry: () => void;
}

export function MicPermissionDenied({ onClose, onRetry }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key="mic-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--surface-studio)' }}
      />
      <motion.div
        key="mic-content"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ delay: 0.05, duration: durations.slow }}
        style={{
          position: 'fixed', inset: 0, zIndex: 201,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--space-12) var(--space-11)',
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
          style={{
            width: 88, height: 88, borderRadius: 'var(--r-lg)',
            background: 'rgba(var(--crimson-rgb),0.12)',
            border: '1.5px solid rgba(var(--crimson-rgb),0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 'var(--space-11)',
          }}
        >
          <MicOff style={{ width: 40, height: 40, color: 'var(--state-failed)' }} />
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800,
          color: 'var(--text-on-dark)', textAlign: 'center', marginBottom: 'var(--space-6)', lineHeight: 1.2,
        }}>
          Microphone Access Blocked
        </h2>
        <p style={{
          fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.5)',
          textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: 'var(--space-12)',
        }}>
          This app needs microphone access to record your voice clips. Your browser has blocked this permission.
        </p>

        {/* Steps card */}
        <div style={{
          width: '100%', maxWidth: 340,
          background: 'rgba(var(--bone-0-rgb),0.05)',
          borderRadius: 'var(--r-md)', border: '1px solid rgba(var(--bone-0-rgb),0.08)',
          padding: 'var(--space-9)',
          marginBottom: 'var(--space-11)',
        }}>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'rgba(var(--bone-0-rgb),0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-7)'}}>
            How to fix this
          </p>
          {[
            'Open your browser Settings',
            'Go to Site Settings → Microphone',
            'Find this site and set microphone to Allow',
            'Return here and tap Retry',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', marginBottom: i < 3 ? 12 : 0 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(var(--terracotta-500-rgb),0.15)', border: '1px solid rgba(var(--terracotta-500-rgb),0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--fs-caption)', fontWeight: 800, color: 'var(--action-primary)',
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.65)', lineHeight: 1.5, paddingTop: 'var(--space-1)'}}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'}}>
          <button
            onClick={onRetry}
            style={{
              width: '100%', height: 52, borderRadius: 'var(--r-full)',
              background: 'linear-gradient(160deg, var(--action-accent) 0%, var(--action-primary-pressed) 100%)',
              color: 'var(--text-on-dark)', fontSize: 'var(--fs-body)', fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
              boxShadow: '0px 8px 24px rgba(var(--terracotta-600-rgb),0.35)',
            }}
          >
            <RefreshCw style={{ width: 16, height: 16 }} />
            Retry Microphone Access
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--r-full)',
              background: 'rgba(var(--bone-0-rgb),0.06)', border: '1px solid rgba(var(--bone-0-rgb),0.1)',
              color: 'rgba(var(--bone-0-rgb),0.5)', fontSize: 'var(--fs-secondary)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>

        {/* OS hint */}
        <div style={{ marginTop: 'var(--space-9)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
          <ExternalLink style={{ width: 12, height: 12, color: 'rgba(var(--bone-0-rgb),0.2)' }} />
          <span style={{ fontSize: 'var(--fs-caption)', color: 'rgba(var(--bone-0-rgb),0.25)', fontFamily: 'var(--font-number)' }}>
            browser.settings → site-permissions → microphone
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
