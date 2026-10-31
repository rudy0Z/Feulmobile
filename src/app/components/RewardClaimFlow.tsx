import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Perk activation — NOT a store checkout. A perk is unlocked by Standing;
 * activating it simply turns it on. There is no currency spent, nothing
 * deducted, and nothing that converts to or from the ₹ wallet.
 */

export interface ActivatablePerk {
  id: string;
  name: string;
  description: string;
}

function getRole(pathname: string): 'contributor' | 'validator' {
  return pathname.startsWith('/validator') ? 'validator' : 'contributor';
}

const roleBackPaths = {
  contributor: '/contributor/rewards',
  validator: '/validator/rewards',
};

/* ── Step 1 — Confirm activation ──────────────────── */
function StepConfirm({
  perk,
  onConfirm,
  onBack,
}: {
  perk: ActivatablePerk;
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="step-confirm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Activate perk
        </h1>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>You unlocked this through your standing.</p>
      </div>

      {/* Perk hero card — one r-lg object */}
      <div className="px-6 mb-6">
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
          padding: '28px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 'var(--r-lg)',
            background: 'var(--t-terracotta-50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 18,
          }}>
            <Sparkles className="w-8 h-8" style={{ color: 'var(--action-primary)' }} strokeWidth={1.75} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            {perk.name}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {perk.description}
          </p>
        </div>
      </div>

      {/* Honest note */}
      <div className="px-6 mb-auto">
        <div style={{
          background: 'var(--surface-sunken)',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-subtle)',
          padding: '14px 16px',
        }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Turning this on costs nothing and takes nothing from your wallet. It stays active as long as you keep your standing.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-8">
        <button
          onClick={onConfirm}
          style={{
            width: '100%', height: 56, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Turn on {perk.name}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Step 2 — Activated ───────────────────────────── */
function StepSuccess({ perk, role }: { perk: ActivatablePerk; role: 'contributor' | 'validator' }) {
  const navigate = useNavigate();
  const backPath = roleBackPaths[role];

  return (
    <motion.div
      key="step-success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          style={{
            width: 96, height: 96, borderRadius: 'var(--r-full)',
            background: 'var(--t-terracotta-50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <CheckCircle2 className="w-11 h-11" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--state-settled)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Now active
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10, maxWidth: 300, letterSpacing: '-0.01em' }}>
            {perk.name}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: 300 }}>
            {perk.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 pb-12"
      >
        <button
          onClick={() => navigate(backPath)}
          style={{
            width: '100%', height: 56, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Back to Recognition
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Main export ────────────────────────────────────── */
export function RewardClaimFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = getRole(location.pathname);

  const perk = (location.state as { perk?: ActivatablePerk })?.perk;

  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const fallbackPerk: ActivatablePerk = {
    id: 'fallback',
    name: 'Early access to campaigns',
    description: 'See and claim new high-coverage campaigns a day before they open widely.',
  };
  const activePerk = perk ?? fallbackPerk;

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <StepConfirm
          key="1"
          perk={activePerk}
          onConfirm={() => setStep(2)}
          onBack={() => navigate(roleBackPaths[role])}
        />
      )}
      {step === 2 && (
        <StepSuccess key="2" perk={activePerk} role={role} />
      )}
    </AnimatePresence>
  );
}
