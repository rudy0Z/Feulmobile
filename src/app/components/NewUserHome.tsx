import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Mic, Clock, ChevronRight, CheckCircle2, CreditCard, ShieldCheck, ArrowRight,
} from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';
import { useDevContext } from '../lib/DevContext';
import { useSession, type NewUserStage } from '../lib/session';

const FIRST_QUEST = 'q-lines-1';

/**
 * Progressive new-user Home (§6.3). Drives off the profile stage
 * (day-0 → after-first-session → after-credits); DevPanel can override the
 * stage for demo. Day-0 is intentionally sparse: one line + one quest CTA.
 */
export function NewUserHome() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();

  const stage: NewUserStage = dev.isNewUser ? dev.newUserStage : (profile?.stage ?? 'day0');
  const firstName = (profile?.name ?? 'there').split(' ')[0];
  const initials = profile?.initials ?? '?';

  return (
    <div className="min-h-screen pb-10" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-2 flex items-center justify-between">
        <FeulLogo />
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--accent-primary-deep)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>{initials}</span>
        </div>
      </div>

      {stage === 'day0' && <Day0 firstName={firstName} onStart={() => navigate(`/recording/${FIRST_QUEST}`)} />}
      {stage === 'session' && <AfterSession firstName={firstName} onAnother={() => navigate('/contributor/quests')} onWallet={() => navigate('/contributor/wallet')} />}
      {stage === 'credited' && <AfterCredits onWithdraw={() => navigate('/contributor/wallet')} onNext={() => navigate('/contributor/quests')} />}
    </div>
  );
}

/* ── Stage 1: Day 0 — one sentence, one CTA ─────────────────────────── */
function Day0({ firstName, onStart }: { firstName: string; onStart: () => void }) {
  return (
    <div className="px-6 pt-6">
      <motion.h1
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10 }}
      >
        Welcome, {firstName}.<br />Your first ₹50 is one quest away.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
        style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 320, marginBottom: 32 }}
      >
        Read a few short lines out loud. It takes about three minutes.
      </motion.p>

      {/* One primary CTA */}
      <motion.button
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        style={{
          width: '100%', height: 60, borderRadius: 999,
          background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
          color: '#FFFFFF', fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
          boxShadow: '0px 10px 28px rgba(var(--accent-glow-rgb),0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}
      >
        <Mic style={{ width: 20, height: 20 }} />
        Start your first quest
      </motion.button>

      {/* Quiet how-it-works — no cards, no clutter */}
      <div style={{ marginTop: 36 }}>
        {[
          { n: '1', label: 'Record short lines', sub: 'Tap, read, done — no script memorising.' },
          { n: '2', label: 'Clips get reviewed', sub: 'Quality-checked before anything is paid.' },
          { n: '3', label: 'Cash lands in your wallet', sub: 'Withdraw to UPI once approved.' },
        ].map((s, i, arr) => (
          <div key={s.n} className="flex items-start gap-4 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--card-border)' : 'none' }}>
            <span style={{
              width: 26, height: 26, borderRadius: 999, flexShrink: 0,
              background: 'var(--status-accent-bg)', color: 'var(--accent-primary-deep)',
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{s.n}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{s.label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginTop: 1 }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stage 2: after first session — clips pending review ────────────── */
function AfterSession({ firstName, onAnother, onWallet }: { firstName: string; onAnother: () => void; onWallet: () => void }) {
  return (
    <div className="px-6 pt-6">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Nice work, {firstName}.
      </h1>
      <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 320, marginBottom: 24 }}>
        Your first clips are in. Here's what happens next.
      </p>

      {/* Pending card — honest, no fake credit */}
      <div style={{ background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--card-border)', padding: '20px', boxShadow: 'var(--shadow-card)', marginBottom: 20 }}>
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--warning-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock style={{ width: 20, height: 20, color: 'var(--warning-700)' }} />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Under review</p>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>Usually cleared within a day</p>
          </div>
        </div>
        <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--card-border)', paddingTop: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Expected earning</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>₹50.00</span>
        </div>
      </div>

      <button
        onClick={onAnother}
        style={{
          width: '100%', height: 56, borderRadius: 999,
          background: 'var(--accent-primary-deep)', color: '#FFFFFF',
          fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
          boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.30)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12,
        }}
      >
        Record another while you wait <ArrowRight style={{ width: 18, height: 18 }} />
      </button>
      <button onClick={onWallet} style={{ width: '100%', padding: 14, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: 'var(--text-muted)' }}>
        View wallet
      </button>
    </div>
  );
}

/* ── Stage 3: after credits — real ₹, add UPI to withdraw ───────────── */
function AfterCredits({ onWithdraw, onNext }: { onWithdraw: () => void; onNext: () => void }) {
  return (
    <div className="px-6 pt-6">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
        Your first ₹50 is in.
      </h1>

      {/* Credited money card — the one warm surface */}
      <div style={{
        background: 'radial-gradient(ellipse at 20% 35%, var(--surface-hero-accent-glow) 0%, transparent 55%), linear-gradient(150deg, var(--surface-hero) 0%, var(--surface-hero-elevated) 100%)',
        borderRadius: 24, padding: '24px', position: 'relative', overflow: 'hidden',
        boxShadow: 'var(--shadow-floating)', marginBottom: 20,
      }}>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 24px 24px', opacity: 0.10 }}>
          <Waveform color="#FFFFFF" opacity={1} height={44} />
        </div>
        <div className="relative z-10">
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cash balance</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>₹50.00</p>
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>First quest approved & credited</span>
          </div>
        </div>
      </div>

      {/* Add UPI to withdraw — UPI lives in Wallet now */}
      <div
        onClick={onWithdraw}
        style={{ background: 'var(--warning-50)', borderRadius: 16, border: '1px solid var(--warning-200)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 20 }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--warning-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <CreditCard style={{ width: 18, height: 18, color: 'var(--warning-700)' }} />
        </div>
        <div className="flex-1">
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-warning-text)' }}>Add UPI to withdraw</p>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--warning-700)' }}>Link it in your wallet — payouts run every Monday</p>
        </div>
        <ChevronRight style={{ width: 16, height: 16, color: 'var(--warning-700)', flexShrink: 0 }} />
      </div>

      <button
        onClick={onNext}
        style={{
          width: '100%', height: 56, borderRadius: 999,
          background: 'var(--accent-primary-deep)', color: '#FFFFFF',
          fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
          boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.30)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16,
        }}
      >
        Find your next quest <ArrowRight style={{ width: 18, height: 18 }} />
      </button>

      <div className="flex items-center justify-center gap-2">
        <ShieldCheck style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Consent recorded · revoke anytime in Profile</span>
      </div>
    </div>
  );
}
