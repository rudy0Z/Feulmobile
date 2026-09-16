import { useNavigate } from 'react-router';
import { Users, MicOff, AlertTriangle, RotateCcw, UserMinus, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { IconButton } from './ui/Primitives';
import { durations } from '../lib/motion';

// C-08 (P1) — Silent-room review. A 4-person ROOM take was submitted but one speaker
// (Meena) never spoke (0s). A room take needs all 4 voices to validate. Name the problem
// plainly, show the pay consequence (full ₹220 can't count), and offer an honest choice:
// retake with everyone, or drop to a 3-person take at lower pay (₹165). Non-accusatory.

type Segment = { start: number; width: number };

type Lane = {
  name: string;
  color: string;
  segments: Segment[];
  empty?: boolean;
};

// Shared timeline ~25:00. Positions are % of the track width.
const LANES: Lane[] = [
  { name: 'You', color: 'var(--action-primary)', segments: [
    { start: 2, width: 14 }, { start: 22, width: 10 }, { start: 40, width: 18 }, { start: 74, width: 12 },
  ] },
  { name: 'Priya', color: 'var(--state-settled)', segments: [
    { start: 8, width: 10 }, { start: 34, width: 8 }, { start: 58, width: 16 }, { start: 88, width: 8 },
  ] },
  { name: 'Anil', color: 'var(--state-settled-deep)', segments: [
    { start: 18, width: 9 }, { start: 46, width: 12 }, { start: 66, width: 7 }, { start: 82, width: 11 },
  ] },
  { name: 'Meena', color: 'var(--state-pending)', segments: [], empty: true },
];

const TICKS = ['00:00', '06:15', '12:30', '18:45', '25:00'];

export function SilentRoomReview() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen pb-12"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14">
        <IconButton label="Back" onClick={() => navigate(-1)} variant="surface" style={{ marginBottom: 'var(--space-9)'}}>
        <ChevronLeft style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
      </IconButton>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.enter }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-5)'}}>
            <Users className="w-4 h-4" style={{ color: 'var(--text-muted)' }} strokeWidth={2} />
            <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Room take · review
            </span>
          </div>
          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, letterSpacing: '-0.015em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            One voice is missing from this take.
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 'var(--space-4)', maxWidth: 330 }}>
            Three of four speakers are on tape. One person stayed silent the whole time.
          </p>
        </motion.div>
      </div>

      {/* 4-lane speaker timeline */}
      <div className="px-6" style={{ marginTop: 'var(--space-10)'}}>
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
          padding: 'var(--space-8) var(--space-8) var(--space-7)',
        }}>
          {/* Timeline scale */}
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)', paddingLeft: 'var(--space-15)'}}>
            {TICKS.map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-faint)' }}>
                {t}
              </span>
            ))}
          </div>

          {/* Lanes */}
          <div className="flex flex-col" style={{ gap: 'var(--space-5)'}}>
            {LANES.map((lane, li) => (
              <div key={lane.name} className="flex items-center" style={{ gap: 'var(--space-6)'}}>
                <div style={{ width: 66, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                  {lane.empty && (
                    <MicOff className="w-3.5 h-3.5" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
                  )}
                  <span style={{
                    fontSize: 'var(--fs-secondary)', fontWeight: 700,
                    color: lane.empty ? 'var(--state-pending)' : 'var(--text-primary)',
                  }}>
                    {lane.name}
                  </span>
                </div>

                <div style={{
                  position: 'relative', flex: 1, height: 30,
                  borderRadius: 'var(--r-xs)',
                  background: lane.empty ? 'var(--state-pending-container)' : 'var(--surface-sunken)',
                  border: lane.empty ? '1.5px dashed var(--state-pending)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                }}>
                  {lane.empty ? (
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--state-pending)',
                    }}>
                      no speech detected · <span style={{ fontFamily: 'var(--font-number)', marginLeft: 'var(--space-2)'}}>0:00</span>
                    </div>
                  ) : (
                    lane.segments.map((seg, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: durations.slow, delay: 0.15 + li * 0.08 + si * 0.05 }}
                        style={{
                          position: 'absolute', top: 6, bottom: 6,
                          left: `${seg.start}%`, width: `${seg.width}%`,
                          background: lane.color, borderRadius: 'var(--r-full)',
                          transformOrigin: 'left',
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consequence card */}
      <div className="px-6" style={{ marginTop: 'var(--space-8)'}}>
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--e-1)',
          padding: 'var(--space-8)',
        }}>
          <div className="flex items-start gap-3">
            <div style={{
              width: 38, height: 38, borderRadius: 'var(--r-md)', flexShrink: 0,
              background: 'var(--state-pending-container)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                A room take needs all 4 voices.
              </p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 'var(--space-2)'}}>
                As is, this take can’t be validated.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--divider)', margin: '14px 0' }} />

          <div className="flex items-center justify-between">
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Full room take
            </span>
            <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
              ₹220
            </span>
          </div>
          <div className="flex items-center justify-between" style={{ marginTop: 'var(--space-3)'}}>
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              With one voice missing
            </span>
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-pending)' }}>
              Can’t count
            </span>
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="px-6" style={{ marginTop: 'var(--space-9)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)'}}>
        <button
          onClick={() => navigate('/recording/q-room-1')}
          style={{
            width: '100%', minHeight: 54, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--fs-body)', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
            boxShadow: 'var(--e-glow)',
          }}
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2} />
          Retake with everyone
        </button>

        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: '100%', borderRadius: 'var(--r-md)',
            background: 'var(--surface-raised)', border: '1px solid var(--border-strong)',
            cursor: 'pointer', padding: 'var(--space-7) var(--space-8)', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
          }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 'var(--r-md)', flexShrink: 0,
            background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <UserMinus className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Remove Meena & submit as a 3-person take
            </p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 'var(--space-1)'}}>
              This changes the format. A 3-person take pays{' '}
              <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: 'var(--text-secondary)' }}>₹165</span>.
            </p>
          </div>
        </button>
      </div>

      {/* Honest footer */}
      <div className="px-6" style={{ marginTop: 'var(--space-9)'}}>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', lineHeight: 1.6, textAlign: 'center' }}>
          Everyone on tape has to genuinely take part. That’s what makes room data worth
          recording — and worth paying for.
        </p>
      </div>
    </div>
  );
}
