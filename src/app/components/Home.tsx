import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../lib/DevContext';
import { motion } from 'motion/react';
import {
  Flame, TrendingUp, Mic, ArrowRight, Clock, AlertCircle,
  ArrowUpRight, Zap, Timer, Check,
} from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { NewUserHome } from './NewUserHome';
import { NotificationsPanel, BellButton } from './ui/NotificationsPanel';
import { QuestCard } from './ui/QuestCard';
import { SectionHeading } from './ui/Primitives';
import { tierName, nextTierName } from '../lib/tier';
import { pickedForYou } from '../lib/quests';
import { springs, whileTap } from '../lib/motion';
import { useSession } from '../lib/session';

type ActivityStatus = 'auto_check' | 'under_review' | 'approved' | 'rejected';

interface Activity {
  id: number;
  quest: string;
  cash?: number | null;
  date: string;
  status: ActivityStatus;
  reason?: string;
}

const statusConfig: Record<ActivityStatus, {
  label: (cash?: number | null) => string;
  bg: string; text: string;
  icon: React.ElementType;
  tappable?: boolean;
}> = {
  auto_check:   { label: () => 'Auto-check passed',      bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)', icon: Clock       },
  under_review: { label: () => 'Under Validator Review', bg: 'var(--status-info-bg)',    text: 'var(--status-info-text)',    icon: Clock       },
  approved:     { label: (c) => `+₹${c} credited`,       bg: 'var(--status-success-bg)', text: 'var(--status-success-text)', icon: TrendingUp  },
  rejected:     { label: () => 'Rejected — See reason',  bg: 'var(--status-error-bg)',   text: 'var(--status-error-text)',   icon: AlertCircle, tappable: true },
};

const recentActivity: Activity[] = [
  { id: 1, quest: 'Ordering at a Café (Scenario)', cash: 45,   date: 'Today, 9:30 AM',     status: 'approved'     },
  { id: 2, quest: 'Family Dinner Table (Group)',   cash: null, date: 'Today, 7:15 AM',     status: 'under_review' },
  { id: 3, quest: 'Hindi — Everyday Phrases',      cash: null, date: 'Today, 6:00 AM',     status: 'auto_check'   },
  { id: 4, quest: 'Doctor Visit (Scenario)',       cash: null, date: 'Yesterday, 3:00 PM', status: 'rejected', reason: 'Background noise' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Hey, night owl';
}

function getMotivationalLine(todayEarned: number): string {
  if (todayEarned === 0) return 'Ready to start earning today?';
  if (todayEarned < 100) return 'Good start — keep the momentum going.';
  if (todayEarned < 300) return 'Great momentum — you\'re on a roll!';
  return 'Outstanding day. You\'re crushing it!';
}

export function Home() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const [streak] = useState(5);
  // Home-first: a freshly-authed profile lands on the progressive new-user
  // experience; the rich dashboard is the established/no-profile default.
  const isNewUser = dev.isNewUser || !!profile;
  const [greeting, setGreeting] = useState(getGreeting());
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = 3;

  const totalEarned = 1250;
  const dailyGoal   = 500;
  const todayEarned = 185;
  const progressPct = Math.min((todayEarned / dailyGoal) * 100, 100);

  const clipsToday  = 7;
  const clipsGoal   = 10;
  const clipsPct    = Math.min((clipsToday / clipsGoal) * 100, 100);

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (isNewUser) {
    return (
      <div>
        <div className="px-6 pt-16" style={{ background: 'var(--background)' }}>
        </div>
        <NewUserHome />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── WARM GREETING HERO ──────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(175deg, var(--accent-50) 0%, color-mix(in oklch, var(--accent-100) 50%, white) 40%, var(--background) 100%)',
          padding: '64px 24px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <FeulLogo />
          <BellButton unreadCount={unreadCount} onClick={() => setNotifOpen(true)} />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-primary)', marginBottom: 4, letterSpacing: '0.01em' }}
            >
              {greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
                color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.02em',
              }}
            >
              Alex Johnson
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              {getMotivationalLine(todayEarned)}
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...springs.enter, delay: 0.1 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 6px 20px rgba(var(--accent-glow-rgb),0.35)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>A</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex items-center gap-1"
            >
              <Flame className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{streak}d</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TODAY'S PROGRESS ────────────────────────────────── */}
      <div className="px-5 mt-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          style={{
            background: 'radial-gradient(ellipse at 15% 40%, var(--surface-hero-accent-glow) 0%, transparent 52%), radial-gradient(ellipse at 85% 10%, rgba(var(--accent-glow-rgb),0.10) 0%, transparent 45%), linear-gradient(150deg, var(--surface-hero) 0%, var(--navy) 100%)',
            borderRadius: 24,
            padding: '20px 22px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glass)',
          }}
        >

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Today's Progress
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                  +₹254 this week
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Today's earnings — single focused hero metric */}
              <div className="flex-1">
                <div className="flex items-end gap-1.5">
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700,
                    color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
                  }}>
                    ₹{todayEarned}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.28)', marginBottom: 6, fontVariantNumeric: 'tabular-nums' }}>
                    / ₹{dailyGoal}
                  </p>
                </div>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.38)', marginTop: 6, letterSpacing: '0.01em' }}>
                  earned today
                </p>
              </div>

              {/* Completion ring — compact visual indicator, secondary */}
              <div style={{ position: 'relative', width: 76, height: 76, flexShrink: 0 }}>
                <svg width="76" height="76" viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="31" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
                  <motion.circle
                    cx="38" cy="38" r="31" fill="none"
                    stroke="url(#ringGrad)" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 31}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 31 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 31 * (1 - progressPct / 100) }}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: 0.4 }}
                    transform="rotate(-90 38 38)"
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'var(--accent-primary)' }} />
                      <stop offset="100%" style={{ stopColor: 'var(--accent-primary-light)' }} />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(progressPct)}%
                  </p>
                  <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>
                    of goal
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ── STAT CHIPS — clips + lifetime, context without cluttering the card ── */}
      {/* ── WEEKLY ACTIVITY STRIP ──────────────────────────── */}
      <div className="px-5 mt-2 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.38 }}
          style={{
            background: 'var(--surface)', borderRadius: 16,
            padding: '14px 16px', border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Day dots row */}
          <div className="flex items-end justify-between mb-3">
            {[
              { label: 'TUE', status: 'missed'    },
              { label: 'WED', status: 'completed' },
              { label: 'THU', status: 'completed' },
              { label: 'FRI', status: 'completed' },
              { label: 'SAT', status: 'completed' },
              { label: 'SUN', status: 'completed' },
              { label: 'MON', status: 'today'     },
            ].map((day) => (
              <div key={day.label} className="flex flex-col items-center gap-1.5">
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: day.status === 'completed'
                    ? 'var(--accent-primary)'
                    : day.status === 'today'
                    ? 'var(--accent-50)'
                    : 'var(--neutral-100)',
                  border: day.status === 'today'
                    ? '2px solid var(--accent-primary)'
                    : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {day.status === 'completed' && (
                    <Check style={{ width: 13, height: 13, color: '#FFFFFF' }} strokeWidth={2.5} />
                  )}
                  {day.status === 'today' && (
                    <motion.div
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent-primary)' }}
                    />
                  )}
                </div>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                  color: day.status === 'today' ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}>
                  {day.label}
                </p>
              </div>
            ))}
          </div>

          {/* Streak + weekly clips summary */}
          <div className="flex items-center gap-2 pt-2.5" style={{ borderTop: '1px solid var(--divider)' }}>
            <Flame className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
              {streak}-day streak
            </span>
            <span style={{ fontSize: 12, color: 'var(--neutral-300)' }}>·</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
              32 clips this week
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── BONUS TIMER — amber/warning palette so it doesn't compete with primary CTA ── */}
      <div className="px-5 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center gap-3"
          whileTap={whileTap.card}
          style={{
            background: 'var(--warning-50)',
            borderRadius: 16, padding: '11px 14px',
            border: '1px solid var(--warning-200)',
            boxShadow: 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--warning-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Timer className="w-3.5 h-3.5" style={{ color: 'var(--warning-700)' }} strokeWidth={2.25} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--warning-700)' }}>
              +20% bonus active — 8 min left
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>
              Complete any quest now to earn extra
            </p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--warning-500)' }} />
        </motion.div>
      </div>

      {/* ── PRIMARY CTA ─────────────────────────────────────── */}
      <div className="px-5 mb-6">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/recording/sample-quest')}
          style={{
            width: '100%', height: 62, borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 10px 28px rgba(var(--accent-glow-rgb),0.42), inset 0px 1px 0px rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic className="w-5 h-5" />
          Start Earning Now
        </motion.button>
      </div>

      {/* ── QUESTS FOR YOU ──────────────────────────────────── */}
      <div className="px-5 mb-6">
        <SectionHeading
          variant="display"
          subtitle="Scenarios matched to your voice profile"
          action={
            <button
              onClick={() => navigate('/contributor/quests')}
              className="flex items-center gap-1"
              style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '6px 0 6px 12px', minHeight: 44, display: 'flex', alignItems: 'center' }}
            >
              See all <ArrowRight className="w-3 h-3" />
            </button>
          }
        >
          Picked for you
        </SectionHeading>

        <div className="space-y-3">
          {pickedForYou.map((quest, i) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.42 + i * 0.07 }}
            >
              <QuestCard quest={quest} onClick={() => navigate(`/recording/${quest.id}`)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── RECENT ACTIVITY ─────────────────────────────────── */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
            color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Recent Activity
          </h3>
          <button className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '6px 0 6px 12px', minHeight: 44, display: 'flex', alignItems: 'center' }}>
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div style={{
          background: 'var(--surface)', borderRadius: 20,
          border: '1px solid var(--card-border)', overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}>
          {recentActivity.map((activity, idx) => {
            const cfg = statusConfig[activity.status];
            const StatusIcon = cfg.icon;
            const label = cfg.label(activity.cash);
            return (
              <motion.div
                key={activity.id}
                whileTap={cfg.tappable ? whileTap.row : undefined}
                onClick={cfg.tappable ? () => navigate(`/rejected/${activity.id}`) : undefined}
                style={{
                  padding: '14px 18px',
                  borderBottom: idx < recentActivity.length - 1 ? '1px solid var(--divider)' : 'none',
                  cursor: cfg.tappable ? 'pointer' : 'default',
                  background: 'transparent',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                      {activity.quest}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>{activity.date}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{
                      fontSize: 10, fontWeight: 600,
                      padding: '4px 10px', borderRadius: 999,
                      background: cfg.bg, color: cfg.text,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── TRUST TIER PROGRESS ─────────────────────────────── */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          whileTap={whileTap.card}
          onClick={() => navigate('/contributor/performance')}
          style={{
            background: 'var(--surface)',
            borderRadius: 20,
            border: '1px solid var(--card-border)',
            padding: '18px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--accent-primary-light), var(--accent-primary-deep))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 3px 8px rgba(var(--accent-glow-rgb),0.28)',
              }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} fill="currentColor" />
              </div>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{tierName(3)}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 6 }}>
                  470 to {nextTierName(3)}
                </span>
              </div>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              76%
            </span>
          </div>

          <div style={{ background: 'var(--neutral-100)', borderRadius: 999, height: 7 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '76%' }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.6 }}
              style={{
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-primary-light))',
                borderRadius: 999, height: 7,
              }}
            />
          </div>

          <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginTop: 9, lineHeight: 1.5 }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>470 XP to {nextTierName(3)}</span>
            {' '}— unlocks higher-paying campaigns &amp; faster reviews.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
