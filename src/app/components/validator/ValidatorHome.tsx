import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../../lib/DevContext';
import { motion } from 'motion/react';
import {
  Play, ChevronRight, CheckCircle2, PlusCircle,
  ShieldCheck, Layers, ArrowUpRight, Activity,
} from 'lucide-react';
import { FeulLogo } from '../ui/FeulLogo';
import { Waveform } from '../ui/Waveform';
import { NotificationsPanel, BellButton } from '../ui/NotificationsPanel';
import { useSession } from '../../lib/session';
import { durations } from '../../lib/motion';

const pendingBatches = [
  { id: 'task-1', title: 'Hindi — Waiter Scenario',   clips: 45, language: 'Hindi',   priority: 'High',   payout: 90 },
  { id: 'task-2', title: 'English — Product Reviews',  clips: 32, language: 'English', priority: 'Medium', payout: 64 },
  { id: 'task-3', title: 'Marathi — Product Reviews',  clips: 28, language: 'Marathi', priority: 'Medium', payout: 56 },
];

const recentGradings = [
  { id: 1, title: 'Morning Conversations', clips: 20, completed: '2 hours ago', earned: 40, accuracy: 96 },
  { id: 2, title: 'Tech Support Dialogue', clips: 15, completed: '5 hours ago', earned: 30, accuracy: 93 },
  { id: 3, title: 'Casual Chat Scripts',   clips: 18, completed: 'Yesterday',   earned: 36, accuracy: 98 },
];

function EmptyBatchState() {
  return (
    <div className="flex flex-col items-center px-8 py-14 relative" style={{ textAlign: 'center' }}>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
        <Waveform color="var(--surface-studio)" opacity={1} height={50} variant="precision" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div style={{
          width: 80, height: 80, borderRadius: 'var(--r-full)',
          background: 'var(--surface-sunken)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-10)',
        }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: 'var(--state-settled)' }} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-5)'}}>
          You're all caught up
        </h2>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 272, marginBottom: 'var(--space-10)'}}>
          No clips waiting in your assigned languages. Check back soon.
        </p>
        <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--state-settled)', marginBottom: 'var(--space-2)'}}>94.8%</p>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 'var(--space-10)'}}>Above top-10% of validators</p>
        <button style={{
          background: 'transparent', border: '1.5px solid var(--action-primary-pressed)',
          color: 'var(--action-primary-pressed)', borderRadius: 'var(--r-full)',
          padding: 'var(--space-6) var(--space-11)', fontSize: 'var(--fs-secondary)', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)', cursor: 'pointer',
        }}>
          <PlusCircle className="w-4 h-4" />
          Add Another Language
        </button>
      </div>
    </div>
  );
}

export function ValidatorHome() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = 1;

  const accuracy = 94.8;
  const clipsGraded = 127;
  const weeklyEarned = 254;

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── WORK HEADER — flat bone. No greeting, no wallpaper waveform:
             the reviewer's screen is a work queue, not a marketing hero. ── */}
      <div
        style={{
          background: 'var(--surface-ground)',
          padding: 'var(--space-14) var(--space-10) var(--space-10)',
          position: 'relative',
        }}
      >
        {/* Logo row */}
        <div className="flex items-center justify-between mb-6">
          <FeulLogo />
          <BellButton unreadCount={unreadCount} onClick={() => setNotifOpen(true)} />
        </div>

        {/* Greeting row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.enter }}
              style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-2)'}}
            >
              Grading queue
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.enter, delay: 0.07 }}
              style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 'var(--space-4)', letterSpacing: '-0.4px' }}
            >
              {profile?.name ?? 'Validator'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.enter, delay: 0.14 }}
              style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              {accuracy >= 95
                ? "Elite accuracy. You're in the top tier."
                : accuracy >= 90
                ? `${accuracy}% accuracy — keep it sharp.`
                : 'Focus on quality today to lift your score.'}
            </motion.p>
          </div>

          {/* Avatar + role badge */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: durations.enter, delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                width: 56, height: 56, borderRadius: 'var(--r-full)',
                background: 'var(--state-settled-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--e-1)',
              }}
            >
              <span style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--state-settled-text)', lineHeight: 1 }}>{(profile?.initials) ?? 'V'}</span>
            </motion.div>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durations.slow, delay: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                background: 'var(--state-settled-container)', borderRadius: 'var(--r-full)',
                padding: 'var(--space-2) var(--space-5)',
                border: '1px solid var(--state-settled-container)',
              }}
            >
              <ShieldCheck className="w-3 h-3" style={{ color: 'var(--state-settled)' }} />
              <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled)' }}>Validator</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── ACCURACY HERO CARD ──────────────────────────────── */}
      <div className="px-5 mt-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.enter, delay: 0.28 }}
          style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--r-lg)',
            padding: 'var(--space-9) var(--space-9)',
            position: 'relative',
            boxShadow: 'var(--e-2)',
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'rgba(var(--bone-0-rgb),0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Accuracy Score
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--state-settled)' }} />
                <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled)' }}>Top 10% of validators</span>
              </div>
            </div>

            <div className="flex items-end gap-5">
              {/* Big accuracy number */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-number)', fontSize: 'var(--fs-figure)', fontWeight: 700,
                  color: 'var(--text-on-studio)', lineHeight: 1, letterSpacing: '-0.02em',
                }}>
                  {accuracy}%
                </p>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.35)', marginTop: 'var(--space-2)'}}>
                  Lifetime accuracy
                </p>
              </div>

              {/* Right mini stats */}
              <div className="flex-1 flex flex-col items-end gap-2 pb-1">
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--action-primary)' }}>+₹{weeklyEarned}</p>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.3)' }}>this week</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="flex items-center justify-end gap-1">
                    <Activity className="w-3 h-3" style={{ color: 'rgba(var(--bone-0-rgb),0.3)' }} />
                    <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'rgba(var(--bone-0-rgb),0.7)' }}>{clipsGraded}</p>
                  </div>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.3)' }}>clips graded</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Secondary stats strip ── */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center"
          style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--e-1)' }}
        >
          {[
            { label: 'Per Clip',      value: '₹2', mono: true },
            { label: 'In Queue',      value: String(pendingBatches.reduce((s, b) => s + b.clips, 0)), mono: false },
            { label: 'Accuracy',      value: '94%', mono: true },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="flex-1 text-center"
              style={{ padding: 'var(--space-7) var(--space-3)', borderRight: idx < 2 ? '1px solid var(--border-subtle)' : 'none' }}
            >
              <p style={{
                fontFamily: stat.mono ? 'var(--font-number)' : 'var(--font-ui)',
                fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 'var(--space-2)',
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {dev.validatorHomeEmpty ? (
        <EmptyBatchState />
      ) : (
        <>
          {/* ── Primary CTA ── */}
          <div className="px-5 mb-5">
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.enter, delay: 0.38 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/validator/grading/${pendingBatches[0].id}`)}
              style={{
                width: '100%', height: 'var(--cta)', borderRadius: 'var(--cta-r)',
                background: 'var(--action-primary)',
                color: 'var(--text-on-accent)',
                fontSize: 'var(--fs-body)', fontWeight: 700, border: 'none', cursor: 'pointer',
                boxShadow: 'var(--e-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-5)',
              }}
            >
              <Play className="w-5 h-5 fill-white" />
              Start Grading — {pendingBatches[0].clips} clips
            </motion.button>
          </div>

          {/* ── Pending Batches ── */}
          <div className="px-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Pending Batches
                </h3>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-0)'}}>
                  Matched to your language profile
                </p>
              </div>
              <button
                onClick={() => navigate('/validator/tasks')}
                className="flex items-center gap-1"
                style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)', padding: 'var(--space-3) 0 var(--space-3) var(--space-6)', minHeight: 44, display: 'flex', alignItems: 'center' }}
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--e-3)' }}>
              {pendingBatches.map((batch, idx) => (
                <motion.div
                  key={batch.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: durations.slow, delay: 0.4 + idx * 0.06 }}
                  onClick={() => navigate(`/validator/grading/${batch.id}`)}
                  style={{
                    padding: 'var(--space-8) var(--space-8)',
                    borderBottom: idx < pendingBatches.length - 1 ? '1px solid var(--divider)' : 'none',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-7)'}}>
                    <div style={{
                      width: 4, height: 36, borderRadius: 'var(--r-full)',
                      background: batch.priority === 'High' ? 'var(--action-primary)' : 'var(--border-subtle)',
                      flexShrink: 0,
                    }} />
                    <div>
                      <h4 style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>
                        {batch.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>{batch.clips} clips</span>
                        <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--action-primary)' }}>
                          ₹{batch.payout}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--r-full)', flexShrink: 0,
                    background: batch.priority === 'High' ? 'var(--action-primary)' : 'var(--surface-sunken)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Play
                      className="w-4 h-4"
                      style={{ color: batch.priority === 'High' ? 'var(--text-on-accent)' : 'var(--text-primary)' }}
                      fill={batch.priority === 'High' ? 'var(--text-on-accent)' : 'var(--text-primary)'}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Recent Activity ── */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Recent Activity
              </h3>
            </div>
            <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--e-3)' }}>
              {recentGradings.map((grading, idx) => (
                <div
                  key={grading.id}
                  style={{
                    padding: 'var(--space-7) var(--space-8)',
                    borderBottom: idx < recentGradings.length - 1 ? '1px solid var(--divider)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>{grading.title}</p>
                    <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>
                      {grading.clips} clips · {grading.completed}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--action-primary)' }}>
                      +₹{grading.earned}
                    </p>
                    <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--state-settled)', marginTop: 'var(--space-1)'}}>
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

