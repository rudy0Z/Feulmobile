import { motion, AnimatePresence } from 'motion/react';
import { XCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { Amount, Button } from './ui/Primitives';

interface Props {
  amount: number;
  vpa: string;
  onClose: () => void;
  onRetry: () => void;
}

/* A withdrawal can fail at the bank/UPI layer even after identity checks
   pass. The one promise that matters: the money is still yours. */
export function PaymentFailed({ amount, vpa, onClose, onRetry }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key="pay-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(var(--carbon-rgb),0.42)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />
      <motion.div
        key="pay-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
          padding: '10px 20px 40px', boxShadow: 'var(--e-3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: 40, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)', margin: '0 auto 24px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--r-full)', background: 'var(--t-crimson-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle style={{ width: 34, height: 34, color: 'var(--t-crimson-700)' }} strokeWidth={2} />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 6px', letterSpacing: '-0.015em' }}>
            The transfer didn't go through
          </h3>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>
            <Amount value={amount} size={14} color="var(--text-secondary)" /> to {vpa}
          </p>
        </div>

        <div style={{ background: 'var(--t-crimson-50)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '14px 16px', marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            The UPI gateway timed out before your bank confirmed. This happens occasionally — it's not something you did wrong.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--t-verdigris-50)', borderRadius: 'var(--r-md)', padding: '12px 16px', marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--state-settled)', flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t-verdigris-700)' }}>
            Your money is still in your wallet — nothing was deducted
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button full size="lg" onClick={onRetry} icon={<RefreshCw size={16} />}>Try again</Button>
          <Button full size="md" variant="secondary" onClick={onClose} icon={<MessageCircle size={15} />}>Contact support</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
