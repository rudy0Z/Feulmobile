import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, CheckCircle2, Copy, ShieldCheck, ArrowRight,
  Sparkles, Lock, ChevronLeft,
} from 'lucide-react';
import { Waveform } from './ui/Waveform';

/* ── Types ───────────────────────────────────────────── */
export interface ClaimableReward {
  id: string;
  name: string;
  description: string;
  xpCost: number;
  emoji: string;
  category: 'vouchers' | 'perks' | 'exclusive';
  isValidator?: boolean;
}

function getRole(pathname: string): 'contributor' | 'validator' {
  return pathname.startsWith('/validator') ? 'validator' : 'contributor';
}

const roleXP = { contributor: 1530, validator: 2840 };

const roleBackPaths = {
  contributor: '/contributor/rewards',
  validator: '/validator/rewards',
};

/* mock voucher codes */
const generateVoucherCode = () =>
  Array.from({ length: 4 }, () =>
    Math.random().toString(36).slice(2, 6).toUpperCase()
  ).join('-');

/* ── Step 1 — Confirm Redemption ──────────────────── */
function StepConfirm({
  reward,
  role,
  onConfirm,
  onBack,
}: {
  reward: ClaimableReward;
  role: 'contributor' | 'validator';
  onConfirm: () => void;
  onBack: () => void;
}) {
  const xp      = roleXP[role];
  const xpAfter = xp - reward.xpCost;
  const accentColor = role === 'validator' ? 'var(--success-700)' : 'var(--warning-700)';
  const accentBg    = role === 'validator' ? '#E8F2EE' : '#FFF3D6';
  const accentText  = role === 'validator' ? '#1A3A2F' : '#4A3200';

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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Redeem Reward
        </h1>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>Step 1 of 3 · Confirm redemption</p>
      </div>

      {/* Reward hero card */}
      <div className="px-6 mb-6">
        <div style={{
          background: '#FFFFFF', borderRadius: 20,
          border: `2px solid ${accentColor}22`,
          boxShadow: '0px 6px 24px rgba(28,36,52,0.06)',
          padding: '28px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: accentBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42, marginBottom: 16,
          }}>
            {reward.emoji}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            {reward.name}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.5 }}>
            {reward.description}
          </p>
          {/* XP cost badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: accentBg, borderRadius: 999,
            padding: '8px 18px', border: `1px solid ${accentColor}40`,
          }}>
            <Zap className="w-4 h-4" style={{ color: accentColor }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: accentText }}>
              {reward.xpCost.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* XP balance impact */}
      <div className="px-6 mb-5">
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E8EDF3' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>XP Impact</p>
          </div>
          <div className="flex items-center" style={{ padding: '16px 20px', gap: 12 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 4 }}>Current XP</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
                {xp.toLocaleString()}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 4 }}>After Redemption</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: xpAfter < 0 ? '#D94F4F' : accentColor }}>
                {xpAfter.toLocaleString()}
              </p>
            </div>
          </div>
          <div style={{ padding: '10px 20px', background: accentBg, borderTop: '1px solid #E8EDF3' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: accentText }}>
              {reward.category === 'vouchers' ? '📧 Voucher code will be sent instantly' : '✅ Perk activates immediately upon redemption'}
            </p>
          </div>
        </div>
      </div>

      {/* Irreversible note */}
      <div className="px-6 mb-auto">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
            Redemptions are final and cannot be reversed.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-8">
        <button
          onClick={onConfirm}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: accentColor, color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: `0px 4px 20px ${accentColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Sparkles className="w-5 h-5" />
          Redeem {reward.xpCost.toLocaleString()} XP
        </button>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
          This will deduct {reward.xpCost.toLocaleString()} XP from your balance
        </p>
      </div>
    </motion.div>
  );
}

/* ── Step 2 — Processing ──────────────────────────── */
function StepProcessing({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}
    >
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.05 }}>
        <Waveform color="#FFFFFF" opacity={1} height={200} variant="precision" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing ring */}
        <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 32 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(var(--accent-deep-rgb),0.3)',
              }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(var(--accent-deep-rgb),0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '3px solid transparent',
                borderTopColor: 'var(--accent-primary-deep)',
              }}
            />
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}
        >
          Activating your reward…
        </motion.p>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
          Checking XP balance &amp; issuing reward
        </p>
      </div>
    </div>
  );
}

/* ── Step 3 — Success ─────────────────────────────── */
function StepSuccess({
  reward,
  role,
}: {
  reward: ClaimableReward;
  role: 'contributor' | 'validator';
}) {
  const navigate    = useNavigate();
  const backPath    = roleBackPaths[role];
  const accentColor = role === 'validator' ? 'var(--success-700)' : 'var(--warning-700)';
  const xp          = roleXP[role];
  const xpAfter     = xp - reward.xpCost;

  const isVoucher = reward.category === 'vouchers';
  const [voucherCode] = useState(generateVoucherCode);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(voucherCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Waveform texture */}
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
        <Waveform color="#FFFFFF" opacity={1} height={200} variant="precision" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          style={{
            width: 120, height: 120, borderRadius: '50%',
            background: `${accentColor}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
            style={{
              width: 88, height: 88, borderRadius: '50%',
              background: accentColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0px 12px 40px ${accentColor}55`,
            }}
          >
            <span style={{ fontSize: 40 }}>{reward.emoji}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-center mb-8"
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: accentColor, marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {isVoucher ? 'Voucher Issued!' : 'Perk Activated!'}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, maxWidth: 280 }}>
            {reward.name}
          </p>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 8, lineHeight: 1.5 }}>
            {reward.description}
          </p>
        </motion.div>

        {/* Voucher code reveal — tap to reveal */}
        {isVoucher && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            style={{ width: '100%', marginBottom: 20 }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Your Voucher Code
            </p>
            <div
              onClick={() => !revealed && setRevealed(true)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)',
                padding: '22px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: revealed ? 'default' : 'pointer',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div
                    key="blurred"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div style={{ filter: 'blur(8px)', fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.1em' }}>
                      XXXX-XXXX-XXXX-XXXX
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>Tap to reveal code</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="flex items-center justify-between w-full"
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em' }}>
                      {voucherCode}
                    </span>
                    <button
                      onClick={handleCopy}
                      style={{
                        background: accentColor, borderRadius: 12, padding: '8px 14px',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        flexShrink: 0, marginLeft: 12,
                      }}
                    >
                      {copied
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <Copy className="w-4 h-4 text-white" />}
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Perk activated confirmation */}
        {!isVoucher && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            style={{
              width: '100%', marginBottom: 20,
              background: `${accentColor}18`,
              borderRadius: 16, border: `1px solid ${accentColor}40`,
              padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            {role === 'validator'
              ? <ShieldCheck className="w-6 h-6 flex-shrink-0" style={{ color: accentColor }} />
              : <Sparkles className="w-6 h-6 flex-shrink-0" style={{ color: accentColor }} />}
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginBottom: 3 }}>Perk is now active</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.45 }}>
                {reward.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* XP deducted pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 999, padding: '8px 18px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Zap className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
            -{reward.xpCost.toLocaleString()} XP · Balance: {xpAfter.toLocaleString()} XP
          </span>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.45 }}
        className="px-6 pb-12 flex flex-col gap-3 relative z-10"
      >
        <button
          onClick={() => navigate(backPath)}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: accentColor, color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: `0px 6px 28px ${accentColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Back to Rewards
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────── */
export function RewardClaimFlow() {
  const location = useLocation();
  const navigate  = useNavigate();
  const role      = getRole(location.pathname);

  // Reward passed via navigate state
  const reward = (location.state as { reward?: ClaimableReward })?.reward;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  // Fallback if no reward in state — show default
  const fallbackReward: ClaimableReward = {
    id: 'fallback',
    name: '₹200 Amazon Gift Card',
    description: 'Shop anything on Amazon',
    xpCost: 2000,
    emoji: '🛒',
    category: 'vouchers',
  };
  const activeReward = reward ?? fallbackReward;

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <StepConfirm
          key="1"
          reward={activeReward}
          role={role}
          onConfirm={() => setStep(2)}
          onBack={() => navigate(roleBackPaths[role])}
        />
      )}
      {step === 2 && (
        <StepProcessing key="2" onDone={() => setStep(3)} />
      )}
      {step === 3 && (
        <StepSuccess key="3" reward={activeReward} role={role} />
      )}
    </AnimatePresence>
  );
}
