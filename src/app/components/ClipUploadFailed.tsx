import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudOff, RefreshCw, Save, Check, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onRetry: () => void;
  onSaveDraft: () => void;
}

export function ClipUploadFailed({ onClose, onRetry, onSaveDraft }: Props) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => { setRetrying(false); onRetry(); }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="upload-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(var(--carbon-rgb),0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />
      <motion.div
        key="upload-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
          background: 'var(--surface-studio)',
          borderRadius: '28px 28px 0 0',
          padding: '28px 24px 44px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: 36, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.1)', margin: '0 auto 24px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, flexShrink: 0,
            background: 'rgba(var(--crimson-rgb),0.12)', border: '1px solid rgba(var(--crimson-rgb),0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CloudOff style={{ width: 24, height: 24, color: 'var(--state-failed)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t-bone-0)', margin: 0, fontFamily: 'var(--font-display)' }}>
              Upload Failed
            </h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '3px 0 0', fontFamily: 'var(--font-mono)' }}>
              ERR_NETWORK_TIMEOUT · clip_8af3c2.wav
            </p>
          </div>
        </div>

        {/* Error detail card */}
        <div style={{
          background: 'rgba(var(--crimson-rgb),0.07)',
          border: '1px solid rgba(var(--crimson-rgb),0.15)',
          borderRadius: 16, padding: '14px 16px', marginBottom: 20,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
            Your clip was recorded successfully but couldn't be uploaded. This is usually caused by a weak connection or server timeout. <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Your recording is saved locally</strong> and won't be lost.
          </p>
        </div>

        {/* Status row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Recorded', ok: true },
            { label: 'Validated', ok: true },
            { label: 'Uploaded', ok: false },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, padding: '10px 8px', borderRadius: 12, textAlign: 'center',
              background: s.ok ? 'var(--status-success-bg)' : 'var(--status-error-bg)',
              border: `1px solid ${s.ok ? 'var(--t-verdigris-300)' : 'var(--t-crimson-500)'}`,
            }}>
              <div className="flex items-center justify-center" style={{ marginBottom: 3, height: 18 }}>
                {s.ok
                  ? <Check className="w-4 h-4" strokeWidth={2.75} style={{ color: 'var(--status-success-text)' }} />
                  : <X className="w-4 h-4" strokeWidth={2.75} style={{ color: 'var(--status-error-text)' }} />}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: s.ok ? 'var(--status-success-text)' : 'var(--status-error-text)', fontFamily: 'var(--font-mono)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleRetry}
            disabled={retrying}
            style={{
              width: '100%', height: 52, borderRadius: 999,
              background: retrying ? 'rgba(255,255,255,0.06)' : 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              color: retrying ? 'rgba(255,255,255,0.4)' : 'var(--t-bone-0)',
              fontSize: 15, fontWeight: 700, border: 'none', cursor: retrying ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
          >
            <RefreshCw style={{ width: 16, height: 16, animation: retrying ? 'spin 0.8s linear infinite' : 'none' }} />
            {retrying ? 'Retrying Upload…' : 'Retry Upload'}
          </button>
          <button
            onClick={onSaveDraft}
            style={{
              width: '100%', height: 48, borderRadius: 999,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Save style={{ width: 15, height: 15 }} />
            Save as Draft — Upload Later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
