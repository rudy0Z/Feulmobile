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
          padding: 'var(--space-5) var(--space-9) var(--space-13)', boxShadow: 'var(--e-3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: 40, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)', margin: '0 auto 24px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-9)'}}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--r-full)', background: 'var(--state-failed-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle style={{ width: 34, height: 34, color: 'var(--state-failed-text)' }} strokeWidth={2} />
          </div>
          <h3 style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', margin: 'var(--space-7) 0 var(--space-3)', letterSpacing: '-0.015em' }}>
            The transfer didn't go through
          </h3>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>
            <Amount value={amount} size={14} color="var(--text-secondary)" /> to {vpa}
          </p>
        </div>

        <div style={{ background: 'var(--state-failed-container)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', marginBottom: 'var(--space-6)'}}>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0'}}>
            The UPI gateway timed out before your bank confirmed. This happens occasionally — it's not something you did wrong.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', background: 'var(--state-settled-container)', borderRadius: 'var(--r-md)', padding: 'var(--space-6) var(--space-8)', marginBottom: 'var(--space-10)'}}>
          <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--state-settled)', flexShrink: 0 }} />
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--state-settled-deep)' }}>
            Your money is still in your wallet — nothing was deducted
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'}}>
          <Button full size="lg" onClick={onRetry} icon={<RefreshCw size={16} />}>Try again</Button>
          <Button full size="md" variant="secondary" onClick={onClose} icon={<MessageCircle size={15} />}>Contact support</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
