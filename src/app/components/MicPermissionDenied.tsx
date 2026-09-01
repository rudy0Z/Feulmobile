import { motion, AnimatePresence } from 'motion/react';
import { MicOff, ExternalLink, RefreshCw } from 'lucide-react';

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
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--navy)' }}
      />
      <motion.div
        key="mic-content"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 201,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '32px 28px',
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
          style={{
            width: 88, height: 88, borderRadius: 24,
            background: 'rgba(var(--crimson-rgb),0.12)',
            border: '1.5px solid rgba(var(--crimson-rgb),0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <MicOff style={{ width: 40, height: 40, color: 'var(--state-failed)' }} />
        </motion.div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
          color: 'var(--t-bone-0)', textAlign: 'center', marginBottom: 12, lineHeight: 1.2,
        }}>
          Microphone Access Blocked
        </h2>
        <p style={{
          fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
          textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: 32,
        }}>
          Feul needs microphone access to record your voice clips. Your browser has blocked this permission.
        </p>

        {/* Steps card */}
        <div style={{
          width: '100%', maxWidth: 340,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)',
          padding: '20px',
          marginBottom: 28,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            How to fix this
          </p>
          {[
            'Open your browser Settings',
            'Go to Site Settings → Microphone',
            'Find Feul and set to Allow',
            'Return here and tap Retry',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < 3 ? 12 : 0 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(var(--accent-glow-rgb),0.15)', border: '1px solid rgba(var(--accent-glow-rgb),0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: 'var(--accent-primary)',
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, paddingTop: 2 }}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onRetry}
            style={{
              width: '100%', height: 52, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              color: 'var(--t-bone-0)', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0px 8px 24px rgba(var(--accent-deep-rgb),0.35)',
            }}
          >
            <RefreshCw style={{ width: 16, height: 16 }} />
            Retry Microphone Access
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 999,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>

        {/* OS hint */}
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ExternalLink style={{ width: 12, height: 12, color: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
            browser.settings → site-permissions → microphone
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
