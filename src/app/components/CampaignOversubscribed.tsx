import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Users, Zap, CheckCircle2, ArrowRight, ChevronLeft, RotateCcw } from 'lucide-react';

// C-21 (P1, marketplace) — Campaign oversubscribed while browsing. Slots fill in real time and
// the featured card flips from "3 slots left" to "Filled" — a graceful, honest state, not an
// error. Reinforces that the marketplace is live. Rendered inside Router; useNavigate is fine.

export function CampaignOversubscribed() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState(3);
  const filled = slots <= 0;

  useEffect(() => {
    if (filled) return;
    const t = setTimeout(() => setSlots((s) => s - 1), 1800);
    return () => clearTimeout(t);
  }, [slots, filled]);

  const reset = () => setSlots(3);

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div className="px-6 pt-14">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          style={{
            width: 40, height: 40, borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: 'var(--e-1)',
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
        </button>

        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 20, maxWidth: 320 }}>
          Popular campaigns fill fast — here's what that looks like.
        </p>
      </div>

      {/* Featured campaign card */}
      <div className="px-6" style={{ marginTop: 20 }}>
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          border: `1px solid ${filled ? 'var(--border-subtle)' : 'var(--border-strong)'}`,
          boxShadow: filled ? 'var(--e-1)' : 'var(--e-2)',
          padding: 20,
          opacity: filled ? 0.92 : 1,
          transition: 'opacity 400ms ease, box-shadow 400ms ease',
        }}>
          <div className="flex items-start justify-between gap-3">
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Featured campaign
              </p>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginTop: 6 }}>
                Marathi · Customer Service
              </p>
              <div className="flex items-center gap-1.5" style={{ marginTop: 8 }}>
                <Zap className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={2} fill="var(--state-pending)" />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span style={{ fontFamily: 'var(--font-number)' }}>1.4×</span> pay
                </span>
              </div>
            </div>

            {/* Live slot chip — swaps state via key + motion */}
            {filled ? (
              <motion.div
                key="filled"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-1.5"
                style={{
                  padding: '7px 12px', borderRadius: 'var(--r-full)',
                  background: 'var(--t-verdigris-50)', flexShrink: 0,
                }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--state-settled)' }} strokeWidth={2} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--state-settled)' }}>Filled</span>
              </motion.div>
            ) : (
              <motion.div
                key={slots}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5"
                style={{
                  padding: '7px 12px', borderRadius: 'var(--r-full)',
                  background: 'var(--t-ochre-50)', flexShrink: 0,
                }}
              >
                <Users className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--state-pending)' }}>
                  <span style={{ fontFamily: 'var(--font-number)' }}>{slots}</span> slots left
                </span>
              </motion.div>
            )}
          </div>

          {/* CTA */}
          <button
            disabled={filled}
            onClick={() => !filled && navigate('/contributor/quests')}
            style={{
              width: '100%', height: 48, borderRadius: 'var(--r-full)', marginTop: 18,
              background: filled ? 'var(--surface-sunken)' : 'var(--action-primary)',
              color: filled ? 'var(--text-muted)' : 'var(--text-on-accent)',
              border: 'none', cursor: filled ? 'default' : 'pointer',
              fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: filled ? 'none' : 'var(--e-glow)',
              transition: 'background 400ms ease, color 400ms ease',
            }}
          >
            {filled ? 'Filled — no slots left' : (<>Join this campaign <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </div>
      </div>

      {/* Reset demo */}
      <div className="px-6" style={{ marginTop: 14 }}>
        <button
          onClick={reset}
          className="flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={2} /> Reset demo
        </button>
      </div>

      {/* Graceful redirect — revealed only when filled */}
      {filled && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-6"
          style={{ marginTop: 24 }}
        >
          <div style={{
            background: 'var(--surface-sunken)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            padding: 20,
          }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
              This one's full — and that's fine.
            </p>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 8 }}>
              Getting here first is luck, not standing. Similar campaigns are open right now and
              pay the same way.
            </p>
            <button
              onClick={() => navigate('/contributor/quests')}
              style={{
                width: '100%', height: 48, borderRadius: 'var(--r-full)', marginTop: 16,
                background: 'var(--action-primary)', color: 'var(--text-on-accent)',
                border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: 'var(--e-glow)',
              }}
            >
              Find similar campaigns <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Honest footer */}
      <div className="px-6" style={{ marginTop: 24, paddingBottom: 40 }}>
        <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-faint)', lineHeight: 1.55 }}>
            Slot counts are live. We never show a slot that's already gone.
          </p>
        </div>
      </div>
    </div>
  );
}
