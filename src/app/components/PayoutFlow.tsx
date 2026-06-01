import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, CheckCircle2, Clock,
  Wallet, ChevronRight, ChevronLeft, Copy, Zap, TrendingUp, ShieldCheck,
} from 'lucide-react';
import { Waveform } from './ui/Waveform';

/* ── helpers ────────────────────────────────────────── */
function getRole(pathname: string): 'contributor' | 'validator' {
  return pathname.startsWith('/validator') ? 'validator' : 'contributor';
}

const roleConfig = {
  contributor: {
    balance: 127.50,
    minWithdraw: 50,
    upi: 'alex@upi',
    weeklyLabel: '+₹185.00 this week',
    backPath: '/contributor/wallet',
    nextPath: '/contributor/quests',
    nextLabel: 'Find More Quests',
    teasers: [
      { label: 'Hindi Quests',   amount: '₹15–50' },
      { label: 'Quick Phrases',  amount: '₹10'    },
      { label: 'High Demand',    amount: '₹35+'   },
    ],
  },
  validator: {
    balance: 568.00,
    minWithdraw: 100,
    upi: 'alex@upi',
    weeklyLabel: '+₹254.00 this week',
    backPath: '/validator/wallet',
    nextPath: '/validator/tasks',
    nextLabel: 'Keep Grading',
    teasers: [
      { label: 'Hindi Batch',    amount: '₹90'   },
      { label: 'English Batch',  amount: '₹64'   },
      { label: 'Accuracy Bonus', amount: '+20%'  },
    ],
  },
};

const PRESETS_CONTRIB  = [50, 100, 200];
const PRESETS_VALID    = [100, 200, 500];

/* ── Step components ────────────────────────────────── */

/* STEP 1 — Select Amount */
function StepAmount({
  role,
  amount,
  setAmount,
  onNext,
  onBack,
}: {
  role: 'contributor' | 'validator';
  amount: string;
  setAmount: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const cfg      = roleConfig[role];
  const presets  = role === 'validator' ? PRESETS_VALID : PRESETS_CONTRIB;
  const numeric  = parseFloat(amount) || 0;
  const invalid  = numeric < cfg.minWithdraw || numeric > cfg.balance;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      key="step-amount"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Withdraw Funds
        </h1>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>Step 1 of 3 · Select amount</p>
      </div>

      {/* Balance card — compact navy */}
      <div className="px-6 mb-6">
        <div style={{
          background: 'var(--navy)', borderRadius: 18, padding: '18px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 18px 18px', opacity: 0.10 }}>
            <Waveform color="#FFFFFF" opacity={1} height={48} variant="precision" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Available Balance
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                ₹{cfg.balance.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary-deep)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary-deep)' }}>{cfg.weeklyLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount input */}
      <div className="px-6 mb-5">
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Enter Amount
        </p>
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            background: '#FFFFFF', borderRadius: 16, border: `2px solid ${!amount || !invalid ? 'var(--accent-primary)' : 'var(--card-border)'}`,
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'text',
            boxShadow: '0px 2px 8px rgba(28,36,52,0.04)',
            transition: 'border-color 0.15s',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--text-muted)' }}>₹</span>
          <input
            ref={inputRef}
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          />
          {amount && (
            <button
              onClick={() => setAmount('')}
              style={{ background: 'var(--neutral-100)', borderRadius: '50%', width: 22, height: 22, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1 }}>×</span>
            </button>
          )}
        </div>

        {amount && invalid && (
          <p style={{ fontSize: 12, fontWeight: 500, color: '#D94F4F', marginTop: 6 }}>
            {numeric < cfg.minWithdraw
              ? `Minimum withdrawal is ₹${cfg.minWithdraw}`
              : `Exceeds available balance (₹${cfg.balance.toFixed(2)})`}
          </p>
        )}
      </div>

      {/* Quick presets */}
      <div className="px-6 mb-8">
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Quick Select
        </p>
        <div className="flex gap-2 flex-wrap">
          {presets.map(p => (
            <button
              key={p}
              onClick={() => setAmount(String(p))}
              style={{
                padding: '9px 20px', borderRadius: 999,
                border: `1.5px solid ${amount === String(p) ? 'var(--accent-primary)' : 'var(--card-border)'}`,
                background: amount === String(p) ? 'var(--accent-50)' : '#FFFFFF',
                color: amount === String(p) ? 'var(--accent-primary-deep)' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              ₹{p}
            </button>
          ))}
          <button
            onClick={() => setAmount(cfg.balance.toFixed(2))}
            style={{
              padding: '9px 20px', borderRadius: 999,
              border: `1.5px solid ${amount === cfg.balance.toFixed(2) ? 'var(--accent-primary)' : 'var(--card-border)'}`,
              background: amount === cfg.balance.toFixed(2) ? 'var(--accent-50)' : '#FFFFFF',
              color: amount === cfg.balance.toFixed(2) ? 'var(--accent-primary-deep)' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            Full ₹{cfg.balance.toFixed(2)}
          </button>
        </div>
      </div>

      {/* UPI preview */}
      <div className="px-6 mb-auto">
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--card-border)', padding: '14px 18px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{cfg.upi}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Funds will be sent to this UPI ID</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-8">
        <button
          disabled={!amount || invalid}
          onClick={onNext}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: !amount || invalid ? 'var(--card-border)' : 'var(--accent-primary-deep)',
            color: !amount || invalid ? 'var(--text-muted)' : '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none',
            cursor: !amount || invalid ? 'not-allowed' : 'pointer',
            boxShadow: !amount || invalid ? 'none' : '0px 4px 20px rgba(196,98,45,0.30)',
            transition: 'all 0.2s',
          }}
        >
          Continue to Review
        </button>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
          No fees · Minimum ₹{cfg.minWithdraw} · Paid out Monday
        </p>
      </div>
    </motion.div>
  );
}

/* STEP 2 — Review & Confirm */
function StepConfirm({
  role,
  amount,
  onConfirm,
  onBack,
}: {
  role: 'contributor' | 'validator';
  amount: string;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const cfg     = roleConfig[role];
  const numeric = parseFloat(amount) || 0;

  // Next Monday calculation
  const today = new Date(2026, 2, 31); // March 31 2026 (Tuesday)
  const daysToMonday = (7 - today.getDay() + 1) % 7 || 7;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysToMonday);
  const arrivalDate = nextMonday.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <motion.div
      key="step-confirm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Review Withdrawal
        </h1>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>Step 2 of 3 · Confirm details</p>
      </div>

      {/* Big amount */}
      <div className="px-6 mb-6 text-center pt-4">
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Withdrawing
        </p>
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 58, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          ₹{numeric.toFixed(2)}
        </motion.p>
      </div>

      {/* Summary card */}
      <div className="px-6 mb-5">
        <div style={{ background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--card-border)', overflow: 'hidden', boxShadow: '0px 4px 16px rgba(28,36,52,0.04)' }}>
          {[
            { label: 'Amount',       value: `₹${numeric.toFixed(2)}`,       mono: true,  color: 'var(--text-primary)'  },
            { label: 'Processing Fee', value: '₹0.00 (Free)',              mono: true,  color: 'var(--color-success)'  },
            { label: 'You Receive',  value: `₹${numeric.toFixed(2)}`,       mono: true,  color: 'var(--accent-primary-deep)'  },
            { label: 'To',           value: cfg.upi,                         mono: false, color: 'var(--text-primary)'  },
            { label: 'Method',       value: 'UPI',                           mono: false, color: 'var(--text-primary)'  },
          ].map((row, idx, arr) => (
            <div
              key={row.label}
              className="flex items-center justify-between"
              style={{
                padding: '14px 20px',
                borderBottom: idx < arr.length - 1 ? '1px solid var(--card-border)' : 'none',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{row.label}</span>
              <span style={{
                fontSize: 13, fontWeight: 700, color: row.color,
                fontFamily: row.mono ? 'var(--font-mono)' : 'var(--font-sans)',
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrival timeline */}
      <div className="px-6 mb-5">
        <div style={{
          background: 'var(--accent-50)', borderRadius: 16, border: '1px solid #F2C4AD', padding: '16px 18px',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-primary-deep)' }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-accent-text)', marginBottom: 3 }}>
              Expected Arrival: {arrivalDate}
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent-primary-deep)', lineHeight: 1.5 }}>
              Payouts process every Monday. Allow 2–3 business days after initiation.
            </p>
          </div>
        </div>
      </div>

      {/* Balance after */}
      <div className="px-6 mb-auto">
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--card-border)', padding: '14px 18px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 4 }}>Remaining Balance After Withdrawal</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            ₹{(cfg.balance - numeric).toFixed(2)}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-8">
        <button
          onClick={onConfirm}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 4px 20px rgba(196,98,45,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Wallet className="w-5 h-5" />
          Confirm Withdrawal
        </button>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
          Funds cannot be recalled after confirmation
        </p>
      </div>
    </motion.div>
  );
}

/* STEP 3 — Success */
function StepSuccess({
  role,
  amount,
}: {
  role: 'contributor' | 'validator';
  amount: string;
}) {
  const navigate  = useNavigate();
  const cfg       = roleConfig[role];
  const numeric   = parseFloat(amount) || 0;
  const refNum    = `FUL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const [copied, setCopied] = useState(false);

  const today = new Date(2026, 2, 31);
  const daysToMonday = (7 - today.getDay() + 1) % 7 || 7;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysToMonday);
  const arrivalDate = nextMonday.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleCopy = () => {
    navigator.clipboard.writeText(refNum).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Waveform bg */}
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
        <Waveform color="#FFFFFF" opacity={1} height={200} variant="precision" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(196,98,45,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
            style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'var(--accent-primary-deep)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0px 12px 40px rgba(196,98,45,0.4)',
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.75} />
          </motion.div>
        </motion.div>

        {/* Amount */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="text-center"
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Withdrawal Initiated
          </p>
          <motion.p
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 10, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 68, fontWeight: 700,
              color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.03em',
            }}
          >
            ₹{numeric.toFixed(2)}
          </motion.p>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>
            Arriving by {arrivalDate}
          </p>
        </motion.div>

        {/* Details card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          style={{
            marginTop: 28, width: '100%', background: 'rgba(255,255,255,0.05)',
            borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>Reference</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{refNum}</span>
              {copied
                ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--color-success)' }} />
                : <Copy className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />}
            </button>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>To</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{cfg.upi}</span>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '14px 18px' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>Status</span>
            <span className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 700, color: '#B8860B' }}>
              <Clock className="w-3.5 h-3.5" />Processing
            </span>
          </div>
        </motion.div>

        {/* XP / earn more teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-8 text-center w-full"
        >
          <div className="flex items-center gap-2 justify-center mb-3">
            <Zap className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Keep earning while you wait
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            {cfg.teasers.map(t => (
              <div key={t.label} style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                padding: '10px 14px', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent-primary-deep)', marginBottom: 2 }}>{t.amount}</p>
                <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>{t.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.45 }}
        className="px-6 pb-12 flex flex-col gap-3 relative z-10"
      >
        <button
          onClick={() => navigate(cfg.nextPath)}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 6px 28px rgba(196,98,45,0.4)',
          }}
        >
          {cfg.nextLabel}
        </button>
        <button
          onClick={() => navigate(cfg.backPath)}
          style={{
            width: '100%', height: 48, borderRadius: 999,
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)',
            fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
          }}
        >
          Back to Wallet
        </button>
      </motion.div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────── */
export function PayoutFlow() {
  const location = useLocation();
  const navigate  = useNavigate();
  const role      = getRole(location.pathname);
  const cfg       = roleConfig[role];

  const [step, setStep]     = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState('');

  // Reset scroll on step change
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <StepAmount
          key="1"
          role={role}
          amount={amount}
          setAmount={setAmount}
          onNext={() => setStep(2)}
          onBack={() => navigate(cfg.backPath)}
        />
      )}
      {step === 2 && (
        <StepConfirm
          key="2"
          role={role}
          amount={amount}
          onConfirm={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepSuccess key="3" role={role} amount={amount} />
      )}
    </AnimatePresence>
  );
}
