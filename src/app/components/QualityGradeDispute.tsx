import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Scale,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  FileSearch,
  Gavel,
} from 'lucide-react';
import { IconButton } from './ui/Primitives';
import { durations } from '../lib/motion';

// C-09 (P2) — Quality grade dispute. A validator graded a clip at 4.3, just under the 4.5
// quality-bonus threshold, so the contributor's ₹15 bonus wasn't applied. The contributor
// disagrees. This is a bounded, time-boxed appeal path: one request sends the clip to a 3rd
// reviewer whose decision — either direction — is final. Same accountability class as the
// validator disagreement flow. Never adversarial toward the validator or the contributor.

type Stage = 'open' | 'under' | 'result';

const CARD: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface-raised)',
  borderRadius: 'var(--r-md)',
  border: '1px solid var(--border-subtle)',
  padding: 'var(--space-9)',
  textAlign: 'left',
};

export function QualityGradeDispute() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('open');

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <header className="px-6 pt-14 pb-4">
        <IconButton label="Go back" onClick={() => navigate(-1)} variant="surface">
        <ChevronLeft style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
      </IconButton>
      </header>

      <main className="px-6 pb-40">
        {stage === 'open' && <OpenStage onRequest={() => setStage('under')} />}
        {stage === 'under' && <UnderStage />}
        {stage === 'result' && <ResultStage onBack={() => navigate('/contributor/wallet')} />}
      </main>

      {/* Preview switcher — lets all three states be viewed inline */}
      <nav
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--surface-raised)',
          borderTop: '1px solid var(--divider)',
          padding: '12px 16px calc(12px + env(safe-area-inset-bottom))',
          display: 'flex',
          gap: 'var(--space-4)',
        }}
      >
        {([
          ['open', 'Open appeal'],
          ['under', 'Under review'],
          ['result', 'Result'],
        ] as [Stage, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStage(key)}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 'var(--r-full)',
              border: stage === key ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
              background: stage === key ? 'var(--surface-sunken)' : 'transparent',
              color: stage === key ? 'var(--text-primary)' : 'var(--text-muted)',
              fontSize: 'var(--fs-caption)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ── Stage 1: appeal available ─────────────────────────────── */

function OpenStage({ onRequest }: { onRequest: () => void }) {
  return (
    <motion.div
      key="open"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.slow }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--r-md)',
            background: 'var(--state-pending-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Scale className="w-5 h-5" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
        </div>
        <div>
          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Disagree with this grade?
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
            You can ask for one more listen.
          </p>
        </div>
      </div>

      {/* Graded clip + pay delta */}
      <div style={{ ...CARD, background: 'var(--state-pending-container)', border: '1px solid var(--state-pending)' }}>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-3)'}}>
          Clip #4821 · Marathi weather script
        </p>
        <div className="flex items-baseline gap-2">
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-display)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            4.3
          </span>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-muted)' }}>
            / 5
          </span>
        </div>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 'var(--space-3)', lineHeight: 1.5 }}>
          Just under the{' '}
          <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: 'var(--text-primary)' }}>4.5</span>{' '}
          quality threshold, so the bonus wasn’t applied.
        </p>
        <div
          style={{
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Quality bonus not added</span>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 800, color: 'var(--money-pending)' }}>
            ₹15
          </span>
        </div>
      </div>

      {/* Appeal window countdown */}
      <div
        style={{
          ...CARD,
          padding: 'var(--space-7)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
        }}
      >
        <Clock className="w-4 h-4" style={{ color: 'var(--state-pending)', flexShrink: 0 }} strokeWidth={2} />
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-primary)' }}>
          <span style={{ fontFamily: 'var(--font-number)' }}>6</span> days left to appeal
        </p>
        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          7-day window
        </span>
      </div>

      {/* What a 3rd reviewer re-checks */}
      <div style={CARD}>
        <div className="flex items-center gap-2 mb-3">
          <FileSearch className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.9} />
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>What a 3rd reviewer re-checks</p>
        </div>
        <ul className="flex flex-col gap-2" style={{ margin: '0', padding: '0', listStyle: 'none' }}>
          {[
            ['Audio clarity', 'Whether the recording is clean and easy to hear.'],
            ['Script match', 'Whether the words spoken match the script you were given.'],
          ].map(([title, body]) => (
            <li
              key={title}
              style={{
                background: 'var(--surface-sunken)',
                borderRadius: 'var(--r-xs)',
                padding: 'var(--space-5) var(--space-6)',
              }}
            >
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-0)', lineHeight: 1.45 }}>
                {body}
              </p>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', marginTop: 'var(--space-6)', lineHeight: 1.5 }}>
          The result can go either way, and a 3rd reviewer’s decision is final.
        </p>
      </div>

      <button
        onClick={onRequest}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 'var(--r-full)',
          background: 'var(--action-primary)',
          color: 'var(--text-on-accent)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--fs-body)',
          fontWeight: 700,
          boxShadow: 'var(--e-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
        }}
      >
        Request a 3rd review <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ── Stage 2: under appeal ─────────────────────────────────── */

function UnderStage() {
  const steps: [string, string, 'done' | 'active' | 'todo'][] = [
    ['Submitted', 'Your appeal is in.', 'done'],
    ['Assigned', 'A 3rd reviewer is taking another listen.', 'active'],
    ['Decision', 'Final result, either way.', 'todo'],
  ];

  return (
    <motion.div
      key="under"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.slow }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--r-md)',
            background: 'var(--surface-sunken)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Users className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.9} />
        </div>
        <div>
          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            A 3rd reviewer is taking another listen.
          </h1>
        </div>
      </div>

      {/* Status timeline */}
      <div style={CARD}>
        <div className="flex flex-col">
          {steps.map(([title, body, state], i) => (
            <div key={title} className="flex gap-3">
              {/* rail */}
              <div className="flex flex-col items-center">
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 'var(--r-full)',
                    background: state === 'todo' ? 'var(--surface-sunken)' : 'var(--state-pending)',
                    border: state === 'todo' ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {state === 'done' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--text-on-accent)' }} strokeWidth={2.4} />
                  ) : (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 'var(--r-full)',
                        background: state === 'active' ? 'var(--text-on-accent)' : 'var(--text-faint)',
                      }}
                    />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <span style={{ width: 2, flex: 1, minHeight: 26, background: 'var(--divider)' }} />
                )}
              </div>
              {/* label */}
              <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0 }}>
                <p
                  style={{
                    fontSize: 'var(--fs-secondary)',
                    fontWeight: 700,
                    color: state === 'todo' ? 'var(--text-muted)' : 'var(--text-primary)',
                  }}
                >
                  {title}
                </p>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-0)', lineHeight: 1.45 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected timeline */}
      <div style={{ ...CARD, padding: 'var(--space-7)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)'}}>
        <Clock className="w-4 h-4" style={{ color: 'var(--text-secondary)', flexShrink: 0 }} strokeWidth={2} />
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          A decision usually lands within{' '}
          <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: 'var(--text-primary)' }}>48</span>{' '}
          hours.
        </p>
      </div>

      {/* Reassurance */}
      <div style={{ ...CARD, background: 'var(--surface-sunken)', boxShadow: 'none' }}>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          Nothing else changes while you wait — your other clips and your standing are unaffected.
        </p>
      </div>
    </motion.div>
  );
}

/* ── Stage 3: result ───────────────────────────────────────── */

function ResultStage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.slow }}
      className="flex flex-col gap-4"
    >
      {/* Hero confirmation */}
      <div
        style={{
          width: '100%',
          background: 'var(--state-settled-container)',
          border: '1px solid var(--state-settled)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--e-2)',
          padding: 'var(--space-10)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--r-full)',
            background: 'var(--state-settled)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Gavel className="w-8 h-8" style={{ color: 'var(--text-on-accent)' }} strokeWidth={1.8} />
        </div>
        <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          The 3rd reviewer agreed
        </h1>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 'var(--space-4)', lineHeight: 1.55 }}>
          Your appeal was upheld in your favour. Your bonus has been released.
        </p>
        <div
          style={{
            marginTop: 'var(--space-8)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-full)',
            padding: 'var(--space-5) var(--space-8)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--state-settled)' }} strokeWidth={2.2} />
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Bonus released</span>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 800, color: 'var(--money-positive)' }}>
            +₹15
          </span>
        </div>
      </div>

      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', textAlign: 'center', lineHeight: 1.5, padding: '0 12px' }}>
        Appeals can go either way, and a 3rd reviewer’s decision is final.
      </p>

      <button
        onClick={onBack}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 'var(--r-full)',
          background: 'var(--action-primary)',
          color: 'var(--text-on-accent)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--fs-body)',
          fontWeight: 700,
          boxShadow: 'var(--e-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
        }}
      >
        Back to wallet <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
