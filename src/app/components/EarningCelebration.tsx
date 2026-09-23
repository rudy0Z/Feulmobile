import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Button, useCountUp } from './ui/Primitives';
import { FIRST_JOB, questTotal } from '../lib/quests';
import { getProfile, setProfile, useSession } from '../lib/session';
import { durations } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * EarningCredited — the quiet award. Light Bone ground (never the dark
 * studio), money as ink typography, one truth line, an arrived pill, a
 * single haptic. No confetti, no loops, no wallpaper.
 * ───────────────────────────────────────────────────────────────────── */

export function EarningCelebration() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const { profile } = useSession();

  const routed = (location.state as { amount?: number; title?: string } | null) ?? {};
  const amount = routed.amount ?? questTotal(FIRST_JOB);
  const jobTitle = routed.title ?? FIRST_JOB.title;

  /* Credit on arrival — exactly once (the stage guard makes a remount or
     refresh harmless), plus one success haptic. */
  useEffect(() => {
    const p = getProfile();
    if (p?.stage !== 'session') return;
    setProfile({ stage: 'credited', walletBalance: p.walletBalance + amount });
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate?.(24); } catch { /* unsupported */ }
    }
  }, [amount]);

  /* Count up to the NEW live wallet value — from whatever it was before. */
  const target = profile?.stage === 'credited' ? profile.walletBalance : 0;
  const shown = useCountUp(target, 900);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Arrived pill — verdigris = settled */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
            background: 'var(--state-settled-container)', borderRadius: 'var(--r-full)',
            padding: 'var(--space-4) var(--space-8)', marginBottom: 'var(--space-11)',
          }}
        >
          <Check style={{ width: 15, height: 15, color: 'var(--state-settled-text)' }} strokeWidth={3} />
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-settled-text)' }}>
            Arrived in your wallet
          </span>
        </motion.div>

        {/* The money — 64px ink tabular, counting up from the live value */}
        <motion.p
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: durations.slow, delay: reduce ? 0 : 0.08 }}
          className="tabular"
          style={{
            fontFamily: 'var(--font-number)', fontSize: 'var(--fs-figure)', fontWeight: 700,
            color: 'var(--money-figure)', lineHeight: 1, letterSpacing: '-0.03em', margin: '0',
          }}
        >
          +₹{Math.round(shown)}
        </motion.p>

        {/* One truth line */}
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-secondary)', margin: '14px 0 0' }}>
          Settled · {jobTitle}
        </p>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: 'var(--space-4) 0 0', lineHeight: 1.5 }}>
          Money paid is never clawed back.
        </p>
      </div>

      <div className="px-6 pb-10">
        <Button full size="lg" icon={<ArrowRight size={18} />} onClick={() => navigate('/contributor')}>
          Back to home
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-3)'}}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/contributor/wallet')}>
            See your wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
