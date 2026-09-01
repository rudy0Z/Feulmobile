import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BatteryLow, BatteryCharging, Users, Clock, AlertTriangle, ChevronLeft, Zap } from 'lucide-react';
import { motion } from 'motion/react';

// C-15 (P2) — Pre-start battery guard for a long ROOM take. A 25-min take is the
// highest-stakes format: if the phone dies mid-take, four people's time is lost. We warn
// honestly BEFORE the take starts and let the user plug in and proceed, or bow out. Rendered
// as a Brief-style screen; room takes go through consent first once the user is charging.

export function BatteryWarning() {
  const navigate = useNavigate();
  const [pluggedIn, setPluggedIn] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div className="px-6 pt-14">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            width: 40, height: 40, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
        </button>
      </div>

      <div className="px-6" style={{ paddingTop: 20, paddingBottom: 40 }}>
        {/* 1 — Compact campaign brief summary (context) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-1)',
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Family Dinner Table
          </p>
          <div className="flex items-center gap-3" style={{ marginTop: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Room take</span>
            <span style={{ color: 'var(--divider)' }}>·</span>
            <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>
              <Users className="w-3.5 h-3.5" strokeWidth={1.9} /> 4 people
            </span>
            <span style={{ color: 'var(--divider)' }}>·</span>
            <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>
              <Clock className="w-3.5 h-3.5" strokeWidth={1.9} />
              <span style={{ fontFamily: 'var(--font-number)' }}>~25 min</span>
            </span>
            <span style={{ color: 'var(--divider)' }}>·</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-number)' }}>₹220</span>
          </div>
        </motion.div>

        {/* 2 & 3 — Battery warning banner (the focus), flips to charging state */}
        <motion.div
          key={pluggedIn ? 'charging' : 'low'}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: 'var(--r-lg)',
            background: pluggedIn ? 'var(--t-verdigris-50)' : 'var(--t-ochre-50)',
            border: `1px solid ${pluggedIn ? 'var(--state-settled)' : 'var(--state-pending)'}`,
            boxShadow: 'var(--e-2)',
            padding: '22px',
            marginBottom: 20,
          }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--r-md)',
              background: 'var(--surface-raised)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {pluggedIn
                ? <BatteryCharging className="w-6 h-6" style={{ color: 'var(--state-settled)' }} strokeWidth={1.9} />
                : <BatteryLow className="w-6 h-6" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />}
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {pluggedIn ? 'Charging — you’re good to go' : 'Battery low'}
              </p>
              <p style={{
                fontSize: 22, fontWeight: 800, marginTop: 2,
                fontFamily: 'var(--font-number)',
                color: pluggedIn ? 'var(--state-settled)' : 'var(--state-pending)',
              }}>
                {pluggedIn ? 'Charging' : '18%'}
              </p>
            </div>
          </div>

          {pluggedIn ? (
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              You’re on power now. The take can run its full length without cutting out — go ahead
              when everyone’s ready.
            </p>
          ) : (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: 8 }}>
                A 25-minute room take may not survive this. Plug in before you start.
              </p>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--state-pending)', flexShrink: 0, marginTop: 2 }} strokeWidth={2} />
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  If the phone dies mid-take, the recording is lost — and so is four people’s time
                  sitting down together. Long takes can’t be picked up where they broke off.
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Plug-in toggle */}
        {!pluggedIn && (
          <button
            onClick={() => setPluggedIn(true)}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--r-full)',
              background: 'var(--surface-raised)', border: '1px solid var(--border-strong)',
              color: 'var(--text-primary)', cursor: 'pointer', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginBottom: 12, boxShadow: 'var(--e-1)',
            }}
          >
            <Zap className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
            I’ve plugged in
          </button>
        )}

        {/* 4 — Primary CTA (disabled until plugged in) */}
        <button
          onClick={() => { if (pluggedIn) navigate('/contributor/room-consent'); }}
          disabled={!pluggedIn}
          style={{
            width: '100%', height: 52, borderRadius: 'var(--r-full)',
            background: pluggedIn ? 'var(--action-primary)' : 'var(--surface-sunken)',
            color: pluggedIn ? 'var(--text-on-accent)' : 'var(--text-muted)',
            border: 'none',
            cursor: pluggedIn ? 'pointer' : 'not-allowed',
            fontSize: 15, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: pluggedIn ? 'var(--e-glow)' : 'none',
            marginBottom: 8,
          }}
        >
          Start the room take
        </button>

        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: '100%', height: 44, background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)',
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
