import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle2, Users, ArrowRight, ChevronLeft, Lock, Info } from 'lucide-react';

// C-03 + C-16 (P0) — The campaign closes while the contributor is mid-flow:
// either another contributor filled the last slots (C-03), or the lab withdrew the
// campaign after the contributor already submitted (C-16). Either way, we make the
// platform's PROMISE visible: in-flight work is honoured and paid, and the platform —
// not the contributor — absorbs the lab's withdrawal. This is what reduces commit anxiety.

type Scenario = 'filled' | 'withdrawn';

export function CampaignClosedHonour() {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<Scenario>('filled');

  return (
    <div
      className="min-h-screen pb-10"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            width: 40, height: 40, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: 'var(--e-1)',
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
        </button>

        {/* Segmented toggle between the two closure scenarios */}
        <div
          className="flex gap-1 mt-6 p-1"
          style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-full)', border: '1px solid var(--border-subtle)' }}
        >
          {([
            ['filled', 'Slots filled'],
            ['withdrawn', 'Lab withdrew'],
          ] as [Scenario, string][]).map(([key, label]) => {
            const active = scenario === key;
            return (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className="flex-1"
                style={{
                  height: 40, borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700,
                  background: active ? 'var(--action-primary)' : 'transparent',
                  color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 mt-7">
        {scenario === 'filled' ? <FilledView navigate={navigate} /> : <WithdrawnView navigate={navigate} />}

        {/* Shared CTAs — both paths end reassured */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.3 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate('/contributor/quests')}
            style={{
              width: '100%', height: 52, borderRadius: 'var(--r-full)',
              background: 'var(--action-primary)', color: 'var(--text-on-accent)',
              border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: 'var(--e-glow)',
            }}
          >
            Find another campaign <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/contributor/wallet')}
            style={{
              width: '100%', marginTop: 12, background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)',
            }}
          >
            View my submissions
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function FilledView({ navigate: _navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Toast-style strip */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-2 mb-6 px-4 py-3"
        style={{
          background: 'var(--t-verdigris-50)', borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          Filled while you were reading — anything you already submitted is safe.
        </p>
      </motion.div>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8 }}>
        This campaign just filled.
      </h1>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 22 }}>
        Another contributor took the last open slots. No slots left to record — but nothing you
        did here is lost.
      </p>

      {/* Campaign card flipped to Filled */}
      <div
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-2)', padding: 20,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-3">
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              Tamil weather phrases
            </p>
            <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-muted)', marginTop: 3 }}>
              40 takes · ₹6 each
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5"
            style={{ background: 'var(--t-ochre-50)', borderRadius: 'var(--r-full)' }}
          >
            <Users className="w-3.5 h-3.5" style={{ color: 'var(--state-pending)' }} strokeWidth={2.2} />
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--state-pending)' }}>Filled</span>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--divider)', margin: '16px 0' }} />

        {/* Honour notice */}
        <div className="flex items-start gap-3">
          <div
            style={{
              width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--t-verdigris-50)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <CheckCircle2 className="w-4.5 h-4.5" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
              Started or submitted a take? It's still counted and paid.
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.5 }}>
              Your work reaches your wallet just like any other take.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WithdrawnView({ navigate: _navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div
        className="flex items-center gap-2 mb-6 px-4 py-3"
        style={{ background: 'var(--t-ochre-50)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)' }}
      >
        <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          The lab pulled this campaign — that's on us to absorb, not on you.
        </p>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8 }}>
        The lab closed this campaign.
      </h1>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 22 }}>
        The lab withdrew after you'd already submitted. The platform absorbs that — you're still
        paid for what you recorded. There's no clawback.
      </p>

      {/* Ledger-style status row */}
      <div
        style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-2)', overflow: 'hidden',
        }}
      >
        <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'var(--surface-sunken)' }}>
          <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--state-pending)' }} strokeWidth={2.2} />
          <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            Campaign closed — your submission is still under review
          </p>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} strokeWidth={2} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' }}>
              Pending payout
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-number)', fontSize: 20, fontWeight: 800, color: 'var(--money-pending)' }}>
            ₹180
          </span>
        </div>

        <div style={{ height: 1, background: 'var(--divider)' }} />

        <div className="flex items-start gap-3 px-5 py-4">
          <ShieldCheck className="w-4.5 h-4.5 shrink-0" style={{ color: 'var(--state-settled)', marginTop: 1 }} strokeWidth={2} />
          <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            The platform covers this — your review continues and your ₹180 lands in your wallet.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
