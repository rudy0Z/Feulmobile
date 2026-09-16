import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, CheckCircle2, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { SpoofingVerificationHold } from './SpoofingVerificationHold';
import { PaymentFailed } from './PaymentFailed';
import { Amount, Button, IconButton, ReceiptCard } from './ui/Primitives';
import { useDevContext } from '../lib/DevContext';
import { getProfile, setProfile } from '../lib/session';
import { durations } from '../lib/motion';

/* ═══════════════════════════════════════════════════════════════════
   Payout — the honest withdrawal path. First-ever withdrawal links a
   UPI VPA and verifies the holder's name matches; every withdrawal has
   a ₹100 floor; the money is never described as "instant". Bank-layer
   failure is a real, reachable branch (money stays in the wallet).
   ═══════════════════════════════════════════════════════════════════ */

const WITHDRAW_FLOOR = 100;

function getRole(pathname: string): 'contributor' | 'validator' {
  return pathname.startsWith('/validator') ? 'validator' : 'contributor';
}

const VALIDATOR_BALANCE = 568.0; // validators have no session wallet in Pass 1
const roleConfig = {
  contributor: { backPath: '/contributor/wallet', nextPath: '/contributor/quests', nextLabel: 'Find more jobs', presets: [100, 200] },
  validator:   { backPath: '/validator/wallet',    nextPath: '/validator/tasks',    nextLabel: 'Keep grading',      presets: [100, 200, 500] },
};

type Step = 'add-upi' | 'name-match' | 'amount' | 'confirm' | 'success';

const shell: React.CSSProperties = { background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' };
const stepAnim = (reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: reduce ? undefined : { opacity: 0, x: -32 },
  transition: { duration: durations.slow },
});

function Header({ title, sub, onBack }: { title: string; sub: string; onBack: () => void }) {
  return (
    <div className="px-6 pt-14 pb-4">
      <IconButton
        label="Go back"
        onClick={onBack}
        variant="plain"
        style={{ marginBottom: 'var(--space-3)', marginLeft: 'calc(var(--space-5) * -1)' }}
      >
        <ChevronLeft size={22} strokeWidth={2.5} aria-hidden />
      </IconButton>
      <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0'}}>{title}</h1>
      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-2)'}}>{sub}</p>
    </div>
  );
}

/* ── AddUPI — first withdrawal only ──────────────────────── */
function AddUPI({ onNext, onBack }: { onNext: (vpa: string) => void; onBack: () => void }) {
  const [vpa, setVpa] = useState('');
  const valid = /^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa.trim());
  return (
    <motion.div key="add-upi" {...stepAnim(useReducedMotion())} className="flex flex-col min-h-screen" style={shell}>
      <Header title="Where should we send it?" sub="One-time setup · Add your UPI ID" onBack={onBack} />
      <div className="flex-1 px-6">
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-9)'}}>
          Enter the UPI ID where you want your rupees. We'll check the account name matches yours before anything is sent.
        </p>
        <input
          value={vpa}
          onChange={(e) => setVpa(e.target.value)}
          placeholder="yourname@okbank"
          autoCapitalize="none"
          style={{
            width: '100%', height: 60, padding: '0 var(--space-8)', fontSize: 'var(--fs-subhead)', fontWeight: 600,
            color: 'var(--text-primary)', background: 'var(--surface-raised)',
            border: `1px solid ${vpa && !valid ? 'var(--state-failed)' : valid ? 'var(--action-primary)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--r-md)', outline: 'none',
          }}
        />
        {vpa && !valid && (
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--state-failed)', marginTop: 'var(--space-4)'}}>
            That doesn't look like a UPI ID yet — it should read like name@bank.
          </p>
        )}
      </div>
      <div className="px-6 pb-10">
        <Button full size="lg" disabled={!valid} onClick={() => onNext(vpa.trim())}>Continue</Button>
      </div>
    </motion.div>
  );
}

/* ── UPINameMatch — verify VPA holder name ───────────────── */
function UPINameMatch({ vpa, name, onMatched, onBack }: { vpa: string; name: string; onMatched: () => void; onBack: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<'checking' | 'matched'>('checking');
  useEffect(() => {
    const t = setTimeout(() => setPhase('matched'), reduce ? 0 : 1400);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <motion.div key="name-match" {...stepAnim(reduce)} className="flex flex-col min-h-screen" style={shell}>
      <Header title="Checking the name" sub="One-time setup · UPI verification" onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div style={{ width: 84, height: 84, borderRadius: 'var(--r-full)', background: phase === 'matched' ? 'var(--state-settled-container)' : 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-9)'}}>
          {phase === 'matched'
            ? <ShieldCheck style={{ width: 38, height: 38, color: 'var(--state-settled-deep)' }} strokeWidth={2} />
            : <motion.span animate={reduce ? undefined : { rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-flex' }}><Loader2 style={{ width: 34, height: 34, color: 'var(--text-muted)' }} /></motion.span>}
        </div>
        <p style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          {phase === 'matched' ? 'Name matched' : 'Verifying with your bank…'}
        </p>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300 }}>
          {phase === 'matched'
            ? <>The account behind <strong style={{ color: 'var(--text-primary)' }}>{vpa}</strong> belongs to <strong style={{ color: 'var(--text-primary)' }}>{name}</strong>. Safe to send.</>
            : <>Making sure {vpa} is registered to you.</>}
        </p>
      </div>
      <div className="px-6 pb-10">
        <Button full size="lg" disabled={phase !== 'matched'} onClick={onMatched}>
          {phase === 'matched' ? 'Looks right — continue' : 'Verifying…'}
        </Button>
      </div>
    </motion.div>
  );
}

/* ── StepAmount ──────────────────────────────────────────── */
function StepAmount({ balance, vpa, presets, amount, setAmount, onNext, onBack }: {
  balance: number; vpa: string; presets: number[]; amount: string;
  setAmount: (v: string) => void; onNext: () => void; onBack: () => void;
}) {
  const numeric = parseFloat(amount) || 0;
  const belowFloor = numeric < WITHDRAW_FLOOR;
  const overBalance = numeric > balance;
  const invalid = belowFloor || overBalance;
  const gap = Math.max(0, WITHDRAW_FLOOR - numeric);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div key="amount" {...stepAnim(useReducedMotion())} className="flex flex-col min-h-screen" style={shell}>
      <Header title="Withdraw" sub="Step 1 of 2 · Choose an amount" onBack={onBack} />

      <div className="px-6 mb-5">
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: 'var(--space-8) var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)' }}>Available</span>
          <Amount value={balance} size={22} color="var(--money-positive)" />
        </div>
      </div>

      <div className="px-6 mb-4">
        <div
          onClick={() => inputRef.current?.focus()}
          style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: `1px solid ${amount && invalid ? 'var(--state-failed)' : 'var(--action-primary)'}`, padding: 'var(--space-8) var(--space-9)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', cursor: 'text' }}
        >
          <span className="tabular" style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-muted)' }}>₹</span>
          <input
            ref={inputRef} type="number" inputMode="decimal" value={amount}
            onChange={(e) => setAmount(e.target.value)} placeholder="0"
            className="tabular"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)' }}
          />
        </div>
        {amount && invalid && (
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: belowFloor ? 'var(--text-secondary)' : 'var(--state-failed)', marginTop: 'var(--space-4)'}}>
            {belowFloor ? <><Amount value={gap} size={13} color="var(--text-primary)" /> more to reach the ₹{WITHDRAW_FLOOR} minimum</>
              : `That's more than your ₹${balance.toFixed(2)} balance`}
          </p>
        )}
      </div>

      <div className="px-6 mb-auto">
        <div className="flex gap-2 flex-wrap">
          {presets.filter((p) => p <= balance).map((p) => (
            <button key={p} onClick={() => setAmount(String(p))}
              className="tabular"
              style={{
                minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: 'var(--space-4) var(--space-9)', borderRadius: 'var(--r-full)', fontSize: 'var(--fs-secondary)', fontWeight: 700, cursor: 'pointer',
                border: `1px solid ${amount === String(p) ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
                background: amount === String(p) ? 'var(--action-primary-soft)' : 'var(--surface-raised)',
                color: amount === String(p) ? 'var(--action-primary)' : 'var(--text-secondary)',
              }}>₹{p}</button>
          ))}
          <button onClick={() => setAmount(balance.toFixed(2))}
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4) var(--space-9)', borderRadius: 'var(--r-full)', fontSize: 'var(--fs-secondary)', fontWeight: 700, cursor: 'pointer',
              border: `1px solid ${amount === balance.toFixed(2) ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
              background: amount === balance.toFixed(2) ? 'var(--action-primary-soft)' : 'var(--surface-raised)',
              color: amount === balance.toFixed(2) ? 'var(--action-primary)' : 'var(--text-secondary)' }}>All</button>
        </div>
      </div>

      <div className="px-6 py-8">
        <Button full size="lg" disabled={!amount || invalid} onClick={onNext}>Review</Button>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-5)'}}>
          No fees · minimum ₹{WITHDRAW_FLOOR} · arrives in 2–3 days
        </p>
      </div>
    </motion.div>
  );
}

/* ── StepConfirm ─────────────────────────────────────────── */
function StepConfirm({ balance, vpa, amount, onConfirm, onBack }: {
  balance: number; vpa: string; amount: string; onConfirm: () => void; onBack: () => void;
}) {
  const numeric = parseFloat(amount) || 0;
  const today = new Date(); // relative - never a frozen demo date
  const daysToMonday = (7 - today.getDay() + 1) % 7 || 7;
  const nextMonday = new Date(today); nextMonday.setDate(today.getDate() + daysToMonday);
  const arrival = nextMonday.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const rows = [
    ['Amount', <Amount key="a" value={numeric} size={15} />],
    ['Fee', <span key="f" style={{ color: 'var(--state-settled-deep)', fontWeight: 700, fontSize: 'var(--fs-secondary)' }}>Free</span>],
    ['To', <span key="t" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 'var(--fs-secondary)' }}>{vpa}</span>],
    ['Balance after', <Amount key="b" value={balance - numeric} size={15} color="var(--text-secondary)" />],
  ] as const;

  return (
    <motion.div key="confirm" {...stepAnim(useReducedMotion())} className="flex flex-col min-h-screen" style={shell}>
      <Header title="Review withdrawal" sub="Step 2 of 2 · Confirm" onBack={onBack} />

      <div className="px-6 mb-6 text-center pt-2">
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-5)'}}>Withdrawing</p>
        <Amount value={numeric} size={48} align="center" />
      </div>

      <div className="px-6 mb-5">
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          {rows.map(([label, val], i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-7) var(--space-8)', borderBottom: i < rows.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</span>
              {val}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mb-auto">
        <div style={{ background: 'var(--state-pending-container)', borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', display: 'flex', gap: 'var(--space-6)'}}>
          <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-pending-deep)' }} />
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0'}}>
            Expected by <strong style={{ color: 'var(--text-primary)' }}>{arrival}</strong>. Payouts settle after the Monday cycle — allow 2–3 working days.
          </p>
        </div>
      </div>

      <div className="px-6 py-8">
        <Button full size="lg" onClick={onConfirm}>Confirm withdrawal</Button>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-5)'}}>
          Funds can't be recalled once sent
        </p>
      </div>
    </motion.div>
  );
}

/* ── StepSuccess (light) ─────────────────────────────────── */
function StepSuccess({ amount, vpa, nextPath, nextLabel, backPath }: {
  amount: number; vpa: string; nextPath: string; nextLabel: string; backPath: string;
}) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const refNum = useRef(`FUL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`).current;
  const today = new Date(); // relative - never a frozen demo date
  const daysToMonday = (7 - today.getDay() + 1) % 7 || 7;
  const nextMonday = new Date(today); nextMonday.setDate(today.getDate() + daysToMonday);
  const arrival = nextMonday.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const shareReceipt = () => {
    const text = `Feul payout ${refNum} — ₹${amount} to ${vpa}`;
    if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ text }).catch(() => {});
    else if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(refNum).catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col" style={shell}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ width: 96, height: 96, borderRadius: 'var(--r-full)', background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-11)'}}
        >
          <CheckCircle2 style={{ width: 46, height: 46, color: 'var(--state-settled-deep)' }} strokeWidth={2} />
        </motion.div>

        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-5)'}}>On its way</p>
        <Amount value={amount} size={48} align="center" />
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 'var(--space-6)'}}>
          Expected by <strong style={{ color: 'var(--text-primary)' }}>{arrival}</strong>
        </p>

        <div style={{ marginTop: 'var(--space-11)', width: '100%', maxWidth: 340 }}>
          <ReceiptCard refNum={refNum} to={vpa} amount={amount} date={arrival} onShare={shareReceipt} />
        </div>
      </div>

      <div className="px-6 pb-12 flex flex-col gap-3">
        <Button full size="lg" onClick={() => navigate(nextPath)}>{nextLabel}</Button>
        <Button full size="md" variant="secondary" onClick={() => navigate(backPath)}>Back to wallet</Button>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export function PayoutFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const dev = useDevContext();
  const role = getRole(location.pathname);
  const cfg = roleConfig[role];

  const profile = getProfile();
  const balance = role === 'contributor' ? (profile?.walletBalance ?? 0) : VALIDATOR_BALANCE;
  const isContributor = role === 'contributor';
  const linked = isContributor ? (profile?.upiLinked ?? false) : true;
  const name = profile?.name ?? '';

  const [vpa, setVpa] = useState(isContributor ? (profile?.upiId || '') : '');
  const [step, setStep] = useState<Step>(linked ? 'amount' : 'add-upi');
  const [amount, setAmount] = useState('');
  const [showSpoof, setShowSpoof] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const numeric = parseFloat(amount) || 0;
  const failNext = dev.activeOverlay === 'payment-failed'; // reviewer-flippable failure branch

  const afterVerify = () => {
    setShowSpoof(false);
    if (failNext) setShowFailed(true);
    else setStep('success');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {step === 'add-upi' && (
          <AddUPI key="add-upi" onBack={() => navigate(cfg.backPath)}
            onNext={(v) => { setVpa(v); setStep('name-match'); }} />
        )}
        {step === 'name-match' && (
          <UPINameMatch key="name-match" vpa={vpa} name={name} onBack={() => setStep('add-upi')}
            onMatched={() => { setProfile({ upiId: vpa, upiLinked: true, upiNameMatched: true }); setStep('amount'); }} />
        )}
        {step === 'amount' && (
          <StepAmount key="amount" balance={balance} vpa={vpa} presets={cfg.presets}
            amount={amount} setAmount={setAmount}
            onNext={() => setStep('confirm')} onBack={() => (linked ? navigate(cfg.backPath) : setStep('name-match'))} />
        )}
        {step === 'confirm' && (
          <StepConfirm key="confirm" balance={balance} vpa={vpa} amount={amount}
            onConfirm={() => setShowSpoof(true)} onBack={() => setStep('amount')} />
        )}
        {step === 'success' && (
          <StepSuccess key="success" amount={numeric} vpa={vpa}
            nextPath={cfg.nextPath} nextLabel={cfg.nextLabel} backPath={cfg.backPath} />
        )}
      </AnimatePresence>

      {showSpoof && (
        <SpoofingVerificationHold onClose={() => setShowSpoof(false)} onVerified={afterVerify} />
      )}

      {showFailed && (
        <PaymentFailed
          amount={numeric} vpa={vpa}
          onClose={() => { setShowFailed(false); navigate(cfg.backPath); }}
          onRetry={() => { setShowFailed(false); setStep('confirm'); }}
        />
      )}
    </>
  );
}
