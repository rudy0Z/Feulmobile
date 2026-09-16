import { useLocation, useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Button, useCountUp } from './ui/Primitives';
import { useSession } from '../lib/session';
import { FIRST_JOB, questTotal } from '../lib/quests';
import { durations } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * EarningCredited — the quiet MID-SESSION award.
 *
 * Distinct from EarningCelebration (the session TOTAL):
 *   • EarningCelebration  → a session's whole earning, routes back Home
 *   • EarningCredited     → one task credited inside the flow, routes on
 * Both share the light Bone ground and ink money; they differ by
 * SURFACE and copy, not by size.
 *
 * NOTE ON SIZE: the spec asked for a "48px step" alongside a "64px
 * step". 64px is not on the locked 8-step type scale (…/32/48) and the
 * discipline gate forbids off-scale sizes, so both surfaces use
 * --fs-figure (48). Recorded as an intentional deviation in the plans.
 * ───────────────────────────────────────────────────────────────────── */

export function EarningCredited() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const { profile } = useSession();

  const routed = (location.state as { amount?: number; title?: string; next?: string } | null) ?? {};
  /* Demo-session coherence (HG-1): when reached cold (no routed amount), the
     surface shows the newcomer chain's real first credit rather than an
     arbitrary ₹12 against a ₹0 wallet. questTotal is the single source. */
  const amount = routed.amount ?? questTotal(FIRST_JOB);
  const jobTitle = routed.title ?? 'This job';
  const next = routed.next ?? '/contributor/quests';

  const shown = useCountUp(amount, 700);

  /* Haptic only on a real tap — a vibrate on mount is blocked by the browser
     (no user gesture) and would fail the smoke gate. */
  const go = (to: string) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate?.(12); } catch { /* unsupported */ }
    }
    navigate(to);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Credited pill — verdigris = settled */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.fast }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
            background: 'var(--state-settled-container)', borderRadius: 'var(--r-full)',
            padding: 'var(--space-3) var(--space-7)', marginBottom: 'var(--space-9)',
          }}
        >
          <Check style={{ width: 14, height: 14, color: 'var(--state-settled-text)' }} strokeWidth={3} />
          <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled-text)' }}>
            Clip credited
          </span>
        </motion.div>

        {/* The money — ink tabular, counting up */}
        <p
          className="tabular"
          style={{
            fontFamily: 'var(--font-number)', fontSize: 'var(--fs-figure)', fontWeight: 700,
            color: 'var(--money-figure)', lineHeight: 1, letterSpacing: '-0.03em', margin: '0',
          }}
        >
          +₹{Math.round(shown)}
        </p>

        {/* One truth line */}
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-secondary)', margin: '14px 0 0' }}>
          {jobTitle} · settled
        </p>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: 'var(--space-4) 0 0', lineHeight: 1.5 }}>
          Wallet total ₹{Math.round(profile?.walletBalance ?? 0)} · money paid is never clawed back.
        </p>
      </div>

      <div className="px-6 pb-10">
        <Button full size="lg" icon={<ArrowRight size={18} />} onClick={() => go(next)}>
          Next job
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-3)' }}>
          <Button variant="ghost" size="sm" onClick={() => go('/contributor/wallet')}>
            See your wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
