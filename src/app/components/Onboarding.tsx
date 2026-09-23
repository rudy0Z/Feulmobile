import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, Phone, ChevronLeft, Check } from 'lucide-react';
import { BrandSlot, IllustrationSlot } from './ui/BrandSlot';
import { Button, Amount, OtpInput, ListenChip } from './ui/Primitives';
import { FIRST_JOB, questTotal } from '../lib/quests';
import { signIn, setProfile, hasConsented } from '../lib/session';
import { durations } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * Onboarding sequence (08 Phase 1): Market → OTP-6 → Language → Consent
 * gate → Home(empty). Money is earned before any KYC; the contributor's
 * language is chosen here so consent and job content can speak it. No
 * "instant" claims anywhere. UI chrome stays English; vernacular lives in
 * job content and samples.
 * ───────────────────────────────────────────────────────────────────── */

type Step = 'market' | 'otp' | 'language';

const LANGS: { code: string; bcp: string; label: string; native: string; sample: string }[] = [
  { code: 'hi', bcp: 'hi-IN', label: 'Hindi',   native: 'हिन्दी',  sample: 'नमस्ते! आप कैसे हैं?' },
  { code: 'mr', bcp: 'mr-IN', label: 'Marathi', native: 'मराठी',   sample: 'नमस्कार! तुम्ही कसे आहात?' },
  { code: 'ta', bcp: 'ta-IN', label: 'Tamil',   native: 'தமிழ்',   sample: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?' },
  { code: 'bn', bcp: 'bn-IN', label: 'Bengali', native: 'বাংলা',   sample: 'নমস্কার! আপনি কেমন আছেন?' },
  { code: 'te', bcp: 'te-IN', label: 'Telugu',  native: 'తెలుగు',  sample: 'నమస్కారం! మీరు ఎలా ఉన్నారు?' },
  { code: 'en', bcp: 'en-IN', label: 'English', native: 'English', sample: 'Hello! How are you today?' },
];

export function Onboarding() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>('market');
  const [method, setMethod] = useState<'google' | 'email' | 'phone'>('phone');

  const slide = {
    initial: reduce ? false : { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: -24 },
    transition: { duration: durations.slow },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <AnimatePresence mode="wait">
        {step === 'market' && (
          <motion.div key="market" {...slide} className="flex-1 flex flex-col">
            <Market onAuth={(m) => { setMethod(m); signIn(m); setStep('otp'); }} />
          </motion.div>
        )}
        {step === 'otp' && (
          <motion.div key="otp" {...slide} className="flex-1 flex flex-col">
            <OTPVerify method={method} onBack={() => setStep('market')} onVerified={() => setStep('language')} />
          </motion.div>
        )}
        {step === 'language' && (
          <motion.div key="language" {...slide} className="flex-1 flex flex-col">
            <LanguageSelect
              onBack={() => setStep('otp')}
              onPick={(code, label) => {
                setProfile({ consentLang: code, languages: [label] });
                /* Language sets the CONSENT language, then consent is taken
                   on its own route — never as a step inside the app we are
                   asking the contributor to trust (Phase 1 §1.3 → §1.4). */
                navigate(hasConsented() ? '/contributor' : '/contributor/consent');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Market + Auth — one CTA emphasis, benefit headline, trust line ── */

function Market({ onAuth }: { onAuth: (m: 'google' | 'email' | 'phone') => void }) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center" style={{ paddingTop: 'var(--space-14)'}}>
        <div className="w-full flex flex-col items-center" style={{ maxWidth: 360 }}>
          <div className="mb-6 flex justify-center"><BrandSlot size={36} /></div>
          {/* Owner-supplied illustration drops into this reserved slot later */}
          <div className="mb-8 w-full flex justify-center"><IllustrationSlot height={128} /></div>
          <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 14px' }}>
            Record your voice.<br />Get paid in rupees.
          </h1>
          <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, margin: '0'}}>
            Earn{' '}
            <span className="tabular" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹10–220</span>{' '}
            per job.
          </p>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 0' }}>
            Cash lands after a reviewer checks your clips.
          </p>
          {/* District-local social proof */}
          <div style={{
            marginTop: 'var(--space-9)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-7)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-full)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--state-settled)' }} />
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>2,400+ contributors near Pune</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 pt-2" style={{ background: 'linear-gradient(to top, var(--surface-ground) 60%, transparent)' }}>
        <button
          onClick={() => onAuth('google')}
          style={{
            width: '100%', height: 56, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            fontSize: 'var(--fs-body)', fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(var(--bone-0-rgb),.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-5)',
          }}
        >
          <GoogleG /> Continue with Google
        </button>
        <div className="flex gap-3 mt-3">
          {([
            { id: 'phone', label: 'Phone', Icon: Phone },
            { id: 'email', label: 'Email', Icon: Mail },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => onAuth(id)}
              style={{
                flex: 1, height: 56, borderRadius: 'var(--r-full)',
                background: 'var(--surface-raised)', color: 'var(--text-primary)',
                fontSize: 'var(--fs-body)', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
              }}
            >
              <Icon style={{ width: 18, height: 18 }} strokeWidth={2} /> {label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-8)', lineHeight: 1.5 }}>
          New here or returning — same button.
        </p>
      </div>
    </>
  );
}

/* ── OTP-6 — six boxes 3+3, error with tries-left, resend countdown ── */

const OTP_MAX_TRIES = 3;
const OTP_RESEND_WAIT = 30;
const OTP_LOCK_WAIT = 60;

function OTPVerify({ method, onBack, onVerified }: { method: string; onBack: () => void; onVerified: () => void }) {
  const [code, setCode] = useState('');
  const [triesLeft, setTriesLeft] = useState(OTP_MAX_TRIES);
  const [error, setError] = useState(false);
  const [lockedFor, setLockedFor] = useState(0);
  const [resendIn, setResendIn] = useState(0);

  const filled = code.length === 6;
  const locked = lockedFor > 0;

  useEffect(() => {
    if (lockedFor <= 0) return;
    const t = setInterval(() => setLockedFor((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [lockedFor > 0]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn > 0]);

  useEffect(() => {
    if (lockedFor === 0 && error && triesLeft === 0) {
      // Cooldown over — fresh code, fresh tries.
      setError(false);
      setTriesLeft(OTP_MAX_TRIES);
      setCode('');
    }
  }, [lockedFor, error, triesLeft]);

  /* Stubbed verifier for the prototype: any mixed 6-digit code passes.
     An all-same-digit code (000000, 111111…) is the reachable wrong-code
     path — it fails with tries-left, three fails lock with a cooldown. */
  const verify = () => {
    if (!filled || locked) return;
    const allSame = /^(\d)\1{5}$/.test(code);
    if (!allSame) { onVerified(); return; }
    const left = triesLeft - 1;
    setError(true);
    setTriesLeft(left);
    if (left <= 0) setLockedFor(OTP_LOCK_WAIT);
  };

  const resend = () => {
    if (resendIn > 0 || locked) return;
    setResendIn(OTP_RESEND_WAIT);
    setError(false);
    setTriesLeft(OTP_MAX_TRIES);
    setCode('');
  };

  return (
    <>
      <div className="px-6 pt-14">
        <button onClick={onBack} style={backBtn} aria-label="Back"><ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} /></button>
      </div>
      <div className="flex-1 px-6 pt-4">
        <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: '0 0 var(--space-4)', textAlign: 'center' }}>
          Enter the code
        </h1>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 var(--space-11)', textAlign: 'center' }}>
          We sent a 6-digit code to your {method === 'email' ? 'email' : 'phone'}. It only confirms it's you.
        </p>

        <OtpInput value={code} onChange={(v) => { setCode(v); if (error && triesLeft > 0) setError(false); }} error={error} disabled={locked} />

        <div style={{ minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'var(--space-6)'}}>
          {locked ? (
            <p className="tabular" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--state-failed)', margin: '0', textAlign: 'center' }}>
              Too many incorrect codes. Try again in {fmtClock(lockedFor)}.
            </p>
          ) : error ? (
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--state-failed)', margin: '0', textAlign: 'center' }}>
              Incorrect code — {triesLeft} {triesLeft === 1 ? 'try' : 'tries'} left.
            </p>
          ) : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={resend}
            disabled={resendIn > 0 || locked}
            style={{
              background: 'none', border: 'none', minHeight: 44, padding: '0 var(--space-6)',
              color: resendIn > 0 || locked ? 'var(--text-muted)' : 'var(--action-primary)',
              fontSize: 'var(--fs-secondary)', fontWeight: 700, cursor: resendIn > 0 || locked ? 'default' : 'pointer',
            }}
          >
            {resendIn > 0 ? <span className="tabular">Resend code in {fmtClock(resendIn)}</span> : 'Resend code'}
          </button>
        </div>
      </div>
      <div className="px-6 pb-10">
        <Button full size="lg" disabled={!filled || locked} onClick={verify}>Verify</Button>
      </div>
    </>
  );
}

/* ── Language — min-height tiles (Telugu wraps at 320), listen sample ── */

function LanguageSelect({ onBack, onPick }: { onBack: () => void; onPick: (code: string, label: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);

  return (
    <>
      <div className="px-6 pt-14">
        <button onClick={onBack} style={backBtn} aria-label="Back"><ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} /></button>
      </div>
      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: '0 0 8px' }}>
          Which language do you speak most?
        </h1>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 24px' }}>
          Consent and your first jobs use this language.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)'}}>
          {LANGS.map((l) => {
            const active = sel === l.code;
            return (
              <div
                key={l.code}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => setSel(l.code)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(l.code); } }}
                style={{
                  minHeight: 96, borderRadius: 'var(--r-md)', cursor: 'pointer', padding: 'var(--space-6) var(--space-6) var(--space-6) var(--space-8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
                  border: `1px solid ${active ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
                  background: active ? 'var(--action-primary-soft)' : 'var(--surface-raised)',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', minWidth: 0 }}>
                  <span className="font-script" style={{ fontSize: 'var(--fs-section)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 'var(--lh-deva)' }}>{l.native}</span>
                  <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)' }}>{l.label}</span>
                </div>
                <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <ListenChip text={l.sample} lang={l.bcp} label="Listen" playingLabel="Playing…" />
                </div>
                {active && (
                  <span style={{
                    position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 'var(--r-full)',
                    background: 'var(--action-primary)', color: 'var(--text-on-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-6 pb-10 pt-2" style={{ background: 'linear-gradient(to top, var(--surface-ground) 60%, transparent)' }}>
        <Button
          full size="lg" disabled={!sel}
          onClick={() => { const l = LANGS.find((x) => x.code === sel)!; onPick(l.code, l.label); }}
        >
          Start earning
        </Button>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)'}}>
          No payment details needed yet — earn{' '}
          <Amount value={questTotal(FIRST_JOB)} size={13} color="var(--text-secondary)" /> first.
        </p>
      </div>
    </>
  );
}

function GoogleG() {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: '50%', background: 'var(--surface-raised)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 'var(--fs-secondary)', fontWeight: 800, color: 'var(--action-primary)',
    }}>G</span>
  );
}

function fmtClock(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const backBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', background: 'none', border: 'none',
  cursor: 'pointer', color: 'var(--action-primary)', padding: 'var(--space-6) 0', minHeight: 44,
};
