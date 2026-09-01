import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, Phone, ChevronLeft, Check } from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Button, Amount } from './ui/Primitives';
import { signIn, setProfile } from '../lib/session';

/* ─────────────────────────────────────────────────────────────────────
 * Onboarding sequence (§2A): Market → Auth → OTP → Language → Home(empty).
 * Money is earned before any KYC; the contributor's language is chosen here
 * so consent and the whole UI can speak it. No "instant" claims anywhere.
 * SetupChecklist = Home's empty state; Consent/Mic/Brief live in the Studio.
 * ───────────────────────────────────────────────────────────────────── */

type Step = 'market' | 'otp' | 'language';

const LANGS: { code: string; label: string; native: string }[] = [
  { code: 'hi', label: 'Hindi',    native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi',  native: 'मराठी' },
  { code: 'ta', label: 'Tamil',    native: 'தமிழ்' },
  { code: 'bn', label: 'Bengali',  native: 'বাংলা' },
  { code: 'te', label: 'Telugu',   native: 'తెలుగు' },
  { code: 'en', label: 'English',  native: 'English' },
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
    transition: { duration: 0.28 },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <AnimatePresence mode="wait">
        {step === 'market' && (
          <motion.div key="market" {...slide} className="flex-1 flex flex-col">
            <Market
              onAuth={(m) => { setMethod(m); signIn(m); setStep('otp'); }}
            />
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
                navigate('/contributor');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Market + Auth ─────────────────────────────────────────────────── */

function Market({ onAuth }: { onAuth: (m: 'google' | 'email' | 'phone') => void }) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-full flex flex-col items-center" style={{ maxWidth: 360 }}>
          <div className="mb-10 flex justify-center"><FeulLogo /></div>
          <h1 style={{ fontSize: 38, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
            Record your voice.<br />Get paid in rupees.
          </h1>
          <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, margin: 0 }}>
            Contributors earn{' '}
            <span className="tabular" style={{ fontWeight: 700, color: 'var(--action-primary)' }}>₹10–220</span>{' '}
            per quest. Cash lands in your wallet after a reviewer checks your clips.
          </p>
          {/* District-local social proof */}
          <div style={{
            marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-full)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--state-settled)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>2,400+ contributors near Pune this month</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 pt-2" style={{ background: 'linear-gradient(to top, var(--surface-ground) 60%, transparent)' }}>
        <button
          onClick={() => onAuth('google')}
          style={{
            width: '100%', height: 56, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
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
                flex: 1, height: 52, borderRadius: 'var(--r-full)',
                background: 'var(--surface-raised)', color: 'var(--text-secondary)',
                fontSize: 15, fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Icon style={{ width: 16, height: 16 }} strokeWidth={2} /> {label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
          New here or returning — same button.
        </p>
      </div>
    </>
  );
}

/* ── OTP verify ────────────────────────────────────────────────────── */

function OTPVerify({ method, onBack, onVerified }: { method: string; onBack: () => void; onVerified: () => void }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const filled = digits.every((d) => d !== '');

  const set = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '').slice(-1);
    setDigits((d) => { const n = [...d]; n[i] = clean; return n; });
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <>
      <div className="px-6 pt-14">
        <button onClick={onBack} style={backBtn}><ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} /></button>
      </div>
      <div className="flex-1 px-6 pt-4">
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: '0 0 8px' }}>
          Enter the code
        </h1>
        <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 28px' }}>
          We sent a 4-digit code to your {method === 'email' ? 'email' : 'phone'}. It's just to confirm it's you — takes a moment.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              inputMode="numeric"
              onChange={(e) => set(i, e.target.value)}
              className="tabular"
              style={{
                width: 60, height: 68, textAlign: 'center', fontSize: 28, fontWeight: 700,
                color: 'var(--text-primary)', background: 'var(--surface-raised)',
                border: `1px solid ${d ? 'var(--action-primary)' : 'var(--border-strong)'}`,
                borderRadius: 'var(--r-md)', outline: 'none',
              }}
            />
          ))}
        </div>
        <button style={{ background: 'none', border: 'none', color: 'var(--action-primary)', fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '4px 0' }}>
          Resend code
        </button>
      </div>
      <div className="px-6 pb-10">
        <Button full size="lg" disabled={!filled} onClick={onVerified}>Verify</Button>
      </div>
    </>
  );
}

/* ── Language select — the UI + consent language ───────────────────── */

function LanguageSelect({ onBack, onPick }: { onBack: () => void; onPick: (code: string, label: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);

  return (
    <>
      <div className="px-6 pt-14">
        <button onClick={onBack} style={backBtn}><ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} /></button>
      </div>
      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: '0 0 8px' }}>
          Which language do you speak most?
        </h1>
        <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 24px' }}>
          We'll show the app — and every consent screen — in this language.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {LANGS.map((l) => {
            const active = sel === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setSel(l.code)}
                style={{
                  height: 76, borderRadius: 'var(--r-md)', cursor: 'pointer', padding: '0 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 2,
                  border: `1px solid ${active ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
                  background: active ? 'var(--t-terracotta-50)' : 'var(--surface-raised)',
                  position: 'relative',
                }}
              >
                <span className="font-script" style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 'var(--lh-deva)' }}>{l.native}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>{l.label}</span>
                {active && (
                  <span style={{ position: 'absolute', top: 12, right: 12, color: 'var(--action-primary)' }}>
                    <Check size={18} strokeWidth={3} />
                  </span>
                )}
              </button>
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
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          No payment details needed yet — earn{' '}
          <Amount value={12} size={13} color="var(--text-secondary)" /> first.
        </p>
      </div>
    </>
  );
}

function GoogleG() {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: '50%', background: 'var(--t-bone-0)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 800, color: 'var(--action-primary)',
    }}>G</span>
  );
}

const backBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', background: 'none', border: 'none',
  cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0',
};
