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
          borderRadius: 'var(--sheet-top) var(--sheet-top) 0 0',
          padding: 'var(--space-11) var(--space-10) var(--space-13)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: 36, height: 3, borderRadius: 'var(--r-full)', background: 'rgba(var(--bone-0-rgb),0.1)', margin: '0 auto 24px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-7)', marginBottom: 'var(--space-9)'}}>
          <div style={{
            width: 52, height: 52, borderRadius: 'var(--r-md)', flexShrink: 0,
            background: 'rgba(var(--crimson-rgb),0.12)', border: '1px solid rgba(var(--crimson-rgb),0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CloudOff style={{ width: 24, height: 24, color: 'var(--state-failed)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 800, color: 'var(--text-on-dark)', margin: '0', fontFamily: 'var(--font-ui)' }}>
              Upload Failed
            </h3>
            <p style={{ fontSize: 'var(--fs-secondary)', color: 'rgba(var(--bone-0-rgb),0.4)', margin: 'var(--space-1) 0 0', fontFamily: 'var(--font-number)' }}>
              ERR_NETWORK_TIMEOUT · clip_8af3c2.wav
            </p>
          </div>
        </div>

        {/* Error detail card */}
        <div style={{
          background: 'rgba(var(--crimson-rgb),0.07)',
          border: '1px solid rgba(var(--crimson-rgb),0.15)',
          borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', marginBottom: 'var(--space-9)',
        }}>
          <p style={{ fontSize: 'var(--fs-secondary)', color: 'rgba(var(--bone-0-rgb),0.55)', lineHeight: 1.65, margin: '0'}}>
            Your clip was recorded successfully but couldn't be uploaded. This is usually caused by a weak connection or server timeout. <strong style={{ color: 'rgba(var(--bone-0-rgb),0.8)' }}>Your recording is saved locally</strong> and won't be lost.
          </p>
        </div>

        {/* Status row */}
        <div style={{ display: 'flex', gap: 'var(--space-5)', marginBottom: 'var(--space-10)'}}>
          {[
            { label: 'Recorded', ok: true },
            { label: 'Validated', ok: true },
            { label: 'Uploaded', ok: false },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, padding: 'var(--space-5) var(--space-4)', borderRadius: 'var(--r-sm)', textAlign: 'center',
              background: s.ok ? 'var(--state-settled-container)' : 'var(--state-failed-container)',
              border: `1px solid ${s.ok ? 'var(--state-settled-on-studio)' : 'var(--state-failed)'}`,
            }}>
              <div className="flex items-center justify-center" style={{ marginBottom: 'var(--space-1)', height: 18 }}>
                {s.ok
                  ? <Check className="w-4 h-4" strokeWidth={2.75} style={{ color: 'var(--money-positive)' }} />
                  : <X className="w-4 h-4" strokeWidth={2.75} style={{ color: 'var(--state-failed)' }} />}
              </div>
              <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: s.ok ? 'var(--money-positive)' : 'var(--state-failed)', fontFamily: 'var(--font-number)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'}}>
          <button
            onClick={handleRetry}
            disabled={retrying}
            style={{
              width: '100%', height: 52, borderRadius: 'var(--r-full)',
              background: retrying ? 'rgba(var(--bone-0-rgb),0.06)' : 'linear-gradient(160deg, var(--action-accent) 0%, var(--action-primary-pressed) 100%)',
              color: retrying ? 'rgba(var(--bone-0-rgb),0.4)' : 'var(--text-on-dark)',
              fontSize: 'var(--fs-body)', fontWeight: 700, border: 'none', cursor: retrying ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
              transition: 'background-color 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <RefreshCw style={{ width: 16, height: 16, animation: retrying ? 'spin 0.8s linear infinite' : 'none' }} />
            {retrying ? 'Retrying Upload…' : 'Retry Upload'}
          </button>
          <button
            onClick={onSaveDraft}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--r-full)',
              background: 'rgba(var(--bone-0-rgb),0.05)', border: '1px solid rgba(var(--bone-0-rgb),0.1)',
              color: 'rgba(var(--bone-0-rgb),0.55)', fontSize: 'var(--fs-secondary)', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
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
