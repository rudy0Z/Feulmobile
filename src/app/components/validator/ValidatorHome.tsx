import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Play, ChevronRight, CheckCircle2, PlusCircle,
  ShieldCheck, Layers, ArrowUpRight, Activity,
} from 'lucide-react';
import { FeulLogo } from '../ui/FeulLogo';
import { Waveform } from '../ui/Waveform';

/* ─── Mock data ─────────────────────────────────────────── */
const pendingBatches = [
  { id: 'task-1', title: 'Hindi — Waiter Scenario',    clips: 45, language: 'Hindi',   priority: 'High',   payout: 90 },
  { id: 'task-2', title: 'English — Product Reviews',   clips: 32, language: 'English', priority: 'Medium', payout: 64 },
  { id: 'task-3', title: 'Spanish — Customer Service',  clips: 28, language: 'Spanish', priority: 'Medium', payout: 56 },
];

const recentGradings = [
  { id: 1, title: 'Morning Conversations', clips: 20, completed: '2 hours ago', earned: 40, accuracy: 96 },
  { id: 2, title: 'Tech Support Dialogue', clips: 15, completed: '5 hours ago', earned: 30, accuracy: 93 },
  { id: 3, title: 'Casual Chat Scripts',   clips: 18, completed: 'Yesterday',   earned: 36, accuracy: 98 },
];

/* ─── Empty state ───────────────────────────────────────── */
function EmptyBatchState() {
  return (
    <div className="flex flex-col items-center px-8 py-14 relative" style={{ textAlign: 'center' }}>
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <Waveform color="#1C2434" opacity={0.04} height={80} variant="precision" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: '#F0F4F8',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
        }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: '#2D7A4F' }} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434', marginBottom: 10 }}>
          You're all caught up
        </h2>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', lineHeight: 1.65, maxWidth: 272, marginBottom: 24 }}>
          No clips waiting in your assigned languages. Check back soon.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: '#2D7A4F', marginBottom: 4 }}>94.8%</p>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginBottom: 24 }}>Above top-10% of validators</p>
        <button style={{
          background: 'transparent', border: '1.5px solid #C4622D',
          color: '#C4622D', borderRadius: 999,
          padding: '13px 28px', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        }}>
          <PlusCircle className="w-4 h-4" />
          Add Another Language
        </button>
      </div>
    </div>
  );
}

/* ─── Main screen ───────────────────────────────────────── */
export function ValidatorHome() {
  const navigate  = useNavigate();
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <FeulLogo />
        <button
          onClick={() => setShowEmpty(!showEmpty)}
          style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
        >
          {showEmpty ? 'Show tasks' : 'Empty state'}
        </button>
      </div>

      {/* ── Hero — Ink-Navy Surface (same as Contributor) ── */}
      <div className="px-6 mb-6">
        <div style={{
          background: '#1A1F2E',
          borderRadius: 22,
          padding: '24px 24px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Waveform texture — white, same as contributor */}
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.08 }}>
            <Waveform color="#FFFFFF" opacity={1} height={96} variant="precision" />
          </div>

          <div className="relative z-10">
            {/* Role pill — muted sage, the ONLY role-specific color */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#5A7B6D' }} strokeWidth={2} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#5A7B6D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Validator
              </span>
            </div>

            {/* Accuracy — hero number */}
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Accuracy Score
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 52,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              94.8%
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
              You're in the top 10% of all validators
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '16px 0' }} />

            {/* Weekly stats row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" style={{ color: '#C4622D' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#C4622D' }}>
                  +₹254 this week
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
                  127 clips graded
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Secondary stats strip ── */}
      <div className="px-6 mb-6">
        <div
          className="flex items-center gap-0"
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E8EDF3',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Cash Earned',    value: '₹568',  mono: true,  color: '#1C2434' },
            { label: 'Batches Done',   value: '32',    mono: false, color: '#1C2434' },
            { label: 'Level',          value: 'Lv 4',  mono: true,  color: '#1C2434' },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="flex-1 text-center"
              style={{
                padding: '14px 6px',
                borderRight: idx < 2 ? '1px solid #E8EDF3' : 'none',
              }}
            >
              <p style={{
                fontFamily: stat.mono ? 'var(--font-mono)' : 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 700,
                color: stat.color,
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#8896A7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showEmpty ? (
        <EmptyBatchState />
      ) : (
        <>
          {/* ── Primary CTA — Start Grading (brand orange) ── */}
          <div className="px-6 mb-6">
            <button
              onClick={() => navigate(`/validator/grading/${pendingBatches[0].id}`)}
              style={{
                width: '100%', height: 58, borderRadius: 999,
                background: '#C4622D',
                color: '#FFFFFF',
                fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
                boxShadow: '0px 6px 24px rgba(196,98,45,0.30)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <Play className="w-5 h-5 fill-white" />
              Start Grading — {pendingBatches[0].clips} clips
            </button>
          </div>

          {/* ── Pending Batches ── */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" style={{ color: '#1C2434' }} strokeWidth={1.75} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
                  Pending Batches
                </h3>
              </div>
              <button
                onClick={() => navigate('/validator/tasks')}
                className="flex items-center gap-1"
                style={{ fontSize: 13, fontWeight: 700, color: '#C4622D' }}
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3', overflow: 'hidden' }}>
              {pendingBatches.map((batch, idx) => (
                <div
                  key={batch.id}
                  onClick={() => navigate(`/validator/grading/${batch.id}`)}
                  style={{
                    padding: '16px 18px',
                    borderBottom: idx < pendingBatches.length - 1 ? '1px solid #E8EDF3' : 'none',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {/* Priority accent dot */}
                    <div style={{
                      width: 4, height: 36, borderRadius: 99,
                      background: batch.priority === 'High' ? '#C4622D' : '#E8EDF3',
                      flexShrink: 0,
                    }} />
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>
                        {batch.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{batch.clips} clips</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#C4622D' }}>
                          ₹{batch.payout}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: batch.priority === 'High' ? '#C4622D' : '#F0F4F8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Play
                      className="w-4 h-4"
                      style={{ color: batch.priority === 'High' ? '#FFFFFF' : '#1C2434' }}
                      fill={batch.priority === 'High' ? '#FFFFFF' : '#1C2434'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Recent Activity ── */}
          <div className="px-6">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434', marginBottom: 14 }}>
              Recent Activity
            </h3>
            <div>
              {recentGradings.map((grading, idx) => (
                <div
                  key={grading.id}
                  style={{
                    padding: '13px 0',
                    borderBottom: idx < recentGradings.length - 1 ? '1px solid #E8EDF3' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>{grading.title}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                      {grading.clips} clips · {grading.completed}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#C4622D' }}>
                      +₹{grading.earned}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#2D7A4F', marginTop: 2 }}>
                      {grading.accuracy}% acc
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
