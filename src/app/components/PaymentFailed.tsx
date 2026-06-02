import { motion, AnimatePresence } from 'motion/react';
import { XCircle, RefreshCw, MessageCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
  onRetry: () => void;
}

const FAILURE_REASONS = [
  { code: 'BANK_DECLINED', label: 'Bank declined transaction', detail: 'Your bank rejected the UPI transfer. This can happen due to daily limits or security holds.' },
  { code: 'UPI_TIMEOUT',   label: 'UPI gateway timeout',      detail: 'The payment request timed out after 30 seconds. No amount was debited from Feul.' },
  { code: 'VPA_INVALID',   label: 'VPA not registered',       detail: 'The UPI ID linked to your account returned an invalid response. Please relink it in Profile.' },
];

export function PaymentFailed({ onClose, onRetry }: Props) {
  const reason = FAILURE_REASONS[1]; // UPI timeout as default demo

  return (
    <AnimatePresence>
      <motion.div
        key="pay-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,17,23,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />
      <motion.div
        key="pay-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
          background: '#0F1117',
          borderRadius: '28px 28px 0 0',
          padding: '28px 24px 44px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: 36, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.1)', margin: '0 auto 28px' }} />

        {/* Failure icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <motion.div
            initial={{ scale: 0.5 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <XCircle style={{ width: 64, height: 64, color: '#F87171' }} />
          </motion.div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
            color: '#FFFFFF', margin: '16px 0 6px', textAlign: 'center',
          }}>
            Payment Failed
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            ₹127.50 withdrawal to <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>arjun@oksbi</span>
          </p>
        </div>

        {/* Error code */}
        <div style={{
          background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.18)',
          borderRadius: 14, padding: '14px 16px', marginBottom: 16,
        }}>
          <div style={{ display: 'flex', items: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: '#F87171', letterSpacing: '0.08em' }}>
              {reason.code}
            </span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
            {reason.detail}
          </p>
        </div>

        {/* Confirmation */}
        <div style={{
          background: 'rgba(45,122,79,0.08)', border: '1px solid rgba(45,122,79,0.18)',
          borderRadius: 12, padding: '12px 16px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#4EC992', flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
            No amount was deducted from your Feul wallet
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onRetry}
            style={{
              width: '100%', height: 52, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              color: '#FFFFFF', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0px 8px 24px rgba(196,98,45,0.3)',
            }}
          >
            <RefreshCw style={{ width: 16, height: 16 }} />
            Try Again
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', height: 48, borderRadius: 999,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <MessageCircle style={{ width: 15, height: 15 }} />
            Contact Support
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
