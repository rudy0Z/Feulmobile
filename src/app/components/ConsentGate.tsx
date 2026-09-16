import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, Mic, Check, ChevronLeft, Settings } from 'lucide-react';
import { Button, ListenChip, IconButton } from './ui/Primitives';
import { recordConsent, primeMic, useSession } from '../lib/session';
import { durations, easings } from '../lib/motion';
import {
  COPY, FACTS, FACT_ICONS, VERBATIM_NATIVE, DPDP_VERBATIM,
  LANG_NAME, LANG_BCP, spokenConsent,
} from '../lib/consentCopy';

/* ═══════════════════════════════════════════════════════════════════════
   Consent gate — a NATIVE ROUTE at /contributor/consent.

   Why a route and not the sheet (owner decision D-3, 2026-09-16): the
   product's core trust claim is "consent is provably taken before the mic
   is ever used". A sheet is a state — it cannot be linked to, screenshotted
   as a URL, or reopened on demand. A route can. That turns the claim from
   something we assert into something a reviewer can open and check.

   The sheet still exists for in-flow re-consent; both read the same copy
   from lib/consentCopy.ts, so the legal promise has exactly one definition.

   Two steps, one screen:
     1 · what we record, who sees it, how long, how to get out + the verbatim
     2 · the mic prime — benefit-framed, and "Not now" never burns the ask

   Each step is its own component. That keeps one hero per step (the rule
   is per viewport, and the two steps are mutually exclusive viewports),
   and keeps the shell free of step-specific layout.
   ═══════════════════════════════════════════════════════════════════════ */

type Step = 'consent' | 'prime';

export function ConsentGate() {
  const navigate = useNavigate();
  const { profile } = useSession();

  const lang = profile?.consentLang ?? 'en';
  const [step, setStep] = useState<Step>('consent');
  const [micDenied, setMicDenied] = useState(false);

  const t = COPY[lang] ?? COPY.en;

  const agree = () => {
    recordConsent();
    setStep('prime');
  };

  const allowMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((tr) => tr.stop());   // release at once — this is a check, not a capture
      primeMic();
      navigate('/contributor');
    } catch {
      setMicDenied(true);
    }
  };

  /* "Not now" leaves `micPrimed` false, so the in-context prime re-asks at
     the start of the first job rather than being spent here. */
  const notNow = () => navigate('/contributor');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      <div
        className="flex items-center gap-3"
        style={{ padding: 'var(--space-15) var(--gutter) var(--space-6)' }}
      >
        <IconButton
          label={step === 'prime' ? 'Back to consent' : 'Back to sign in'}
          onClick={() => (step === 'prime' ? setStep('consent') : navigate('/'))}
          variant="plain"
          style={{ marginLeft: 'calc(var(--space-2) * -1)' }}
        >
          <ChevronLeft size={22} strokeWidth={2.25} aria-hidden />
        </IconButton>
        <span style={{ font: 'var(--type-secondary)', color: 'var(--text-muted)' }}>
          {step === 'consent' ? 'Step 1 of 2 · Consent' : 'Step 2 of 2 · Mic check'}
        </span>
      </div>

      <div className="flex-1" style={{ padding: '0 var(--gutter) var(--space-6)' }}>
        {step === 'consent' ? <ConsentStep lang={lang} /> : <PrimeStep denied={micDenied} />}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.fast, ease: easings.decelerate }}
        style={{
          position: 'sticky', bottom: 0,
          padding: 'var(--space-5) var(--gutter) var(--space-13)',
          background: 'linear-gradient(to top, var(--surface-ground) 62%, transparent)',
        }}
      >
        {step === 'consent' ? (
          <Button full size="lg" onClick={agree}>I agree — continue</Button>
        ) : micDenied ? (
          <Button full size="lg" onClick={notNow}>Browse jobs</Button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Button full size="lg" onClick={allowMic}>Allow microphone</Button>
            <Button full size="lg" variant="secondary" onClick={notNow}>Not now</Button>
          </div>
        )}
        <p style={{ font: 'var(--type-caption)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', margin: 'var(--space-4) 0 0' }}>
          {t.revoke}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Step 1 · Consent. One hero: the shield. ─────────────────────── */

function ConsentStep({ lang }: { lang: string }) {
  const t = COPY[lang] ?? COPY.en;
  const facts = (FACTS[lang] ?? FACTS.en).map((f, i) => ({ ...f, icon: FACT_ICONS[i] }));
  const isLatin = lang === 'en';
  const verbatimNative = VERBATIM_NATIVE[lang];
  const scriptClass = isLatin ? undefined : 'font-script';

  return (
    <>
      <div
        style={{
          width: 64, height: 64, borderRadius: 'var(--r-md)',
          background: 'var(--state-settled-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 'var(--space-6)', boxShadow: 'var(--e-2)',
        }}
      >
        <ShieldCheck size={30} style={{ color: 'var(--state-settled-text)' }} strokeWidth={2} aria-hidden />
      </div>

      <h1 className={scriptClass} style={{ font: 'var(--type-title)', letterSpacing: 'var(--type-title-track)', color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>
        {t.title}
      </h1>
      <p className={scriptClass} style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', margin: '0 0 var(--space-7)' }}>
        {t.intro}
      </p>

      {/* The pre-mic promise, stated before anything else on the screen. */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
          padding: 'var(--space-6)', background: 'var(--surface-raised)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <Mic size={18} style={{ color: 'var(--action-primary)', flexShrink: 0 }} aria-hidden />
        <span className={scriptClass} style={{ font: 'var(--type-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>
          {t.beforeMic}
        </span>
      </div>

      {/* Listenable — the whole promise read aloud in the chosen language. */}
      <div style={{ marginBottom: 'var(--space-7)' }}>
        <ListenChip
          speaker
          text={spokenConsent(lang)}
          lang={LANG_BCP[lang] ?? 'en-IN'}
          label={`Listen to how your voice is protected in ${LANG_NAME[lang] ?? 'English'}`}
          playingLabel="Playing…"
        />
      </div>

      {/* The four facts — always open on a native screen; there is room. */}
      <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              style={{
                padding: 'var(--space-7) var(--space-8)',
                borderBottom: i < facts.length - 1 ? '1px solid var(--divider)' : 'none',
                display: 'flex', gap: 'var(--space-6)',
              }}
            >
              <Icon size={17} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 'var(--space-1)' }} strokeWidth={2} aria-hidden />
              <div>
                <p className={scriptClass} style={{ font: 'var(--type-secondary)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 var(--space-1)' }}>{f.title}</p>
                <p className={scriptClass} style={{ font: 'var(--type-secondary)', fontWeight: 500, color: 'var(--text-secondary)', margin: '0'}}>{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* THE legal promise. Verbatim English always; native alongside. */}
      <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', marginBottom: 'var(--space-6)' }}>
        <p style={{ font: 'var(--type-secondary)', fontWeight: 700, color: 'var(--text-primary)', margin: '0'}}>
          {DPDP_VERBATIM}
        </p>
        {verbatimNative && (
          <p className="font-script" style={{ font: 'var(--type-secondary)', fontWeight: 500, color: 'var(--text-secondary)', margin: 'var(--space-3) 0 0' }}>
            {verbatimNative}
          </p>
        )}
      </div>

      {t.dpdpAct && (
        <p className={scriptClass} style={{ font: 'var(--type-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '0'}}>
          {t.dpdp}{' '}
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.dpdpAct}</span>
        </p>
      )}
    </>
  );
}

/* ─── Step 2 · Mic prime. One hero: the mic. ──────────────────────── */

function PrimeStep({ denied }: { denied: boolean }) {
  return (
    <>
      <div
        style={{
          width: 64, height: 64, borderRadius: 'var(--r-md)',
          background: 'var(--action-primary-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 'var(--space-6)', boxShadow: 'var(--e-2)',
        }}
      >
        <Mic size={30} style={{ color: 'var(--action-primary)' }} strokeWidth={2} aria-hidden />
      </div>

      <h1 style={{ font: 'var(--type-title)', letterSpacing: 'var(--type-title-track)', color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>
        One quick mic check
      </h1>
      <p style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', margin: '0 0 var(--space-7)' }}>
        We check your microphone works before a job starts, so you never lose a take to a muted phone.
        Nothing is recorded during the check.
      </p>

      {denied ? (
        <div style={{ background: 'var(--state-failed-container)', borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)' }}>
          <p style={{ font: 'var(--type-secondary)', fontWeight: 700, color: 'var(--state-failed-text)', margin: '0 0 var(--space-2)' }}>
            Your phone blocked the mic
          </p>
          <p style={{ font: 'var(--type-secondary)', fontWeight: 500, color: 'var(--text-secondary)', margin: '0'}}>
            You can still browse jobs. When you are ready, allow the microphone for this site in your phone
            settings — we will ask again at the start of your first job.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            <Settings size={14} style={{ color: 'var(--state-failed-text)' }} aria-hidden />
            <span style={{ font: 'var(--type-caption)', fontWeight: 700, color: 'var(--state-failed-text)' }}>
              Settings → Site settings → Microphone
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[
            'The check takes under a second.',
            'You can skip it — we will ask again before your first job.',
            'Your audio is never stored during a check.',
          ].map((line) => (
            <div key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <Check size={16} style={{ color: 'var(--state-settled-text)', flexShrink: 0, marginTop: 'var(--space-1)' }} strokeWidth={2.5} aria-hidden />
              <span style={{ font: 'var(--type-secondary)', color: 'var(--text-secondary)' }}>{line}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
