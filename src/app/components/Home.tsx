import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Flame, TrendingUp, Mic, ArrowRight, Clock, AlertCircle,
  ArrowUpRight, Zap, Timer, Users, ChevronRight,
} from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';
import { NewUserHome } from './NewUserHome';
import { NotificationsPanel, BellButton } from './ui/NotificationsPanel';
import { tierName, nextTierName } from '../lib/tier';

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
  auto_check:   { label: () => 'Auto-check passed',      bg: '#F5F0DC', text: '#6B4F00', icon: Clock       },
  under_review: { label: () => 'Under Validator Review', bg: '#E8EFF8', text: '#1E3A6E', icon: Clock       },
  approved:     { label: (c) => `+₹${c} credited`,       bg: '#E6F4EC', text: '#1A5C35', icon: TrendingUp  },
  rejected:     { label: () => 'Rejected — See reason',  bg: '#FDE8E8', text: '#8B0000', icon: AlertCircle, tappable: true },
};

const recentActivity: Activity[] = [
  { id: 1, quest: 'Morning News Reading',    cash: 15,   date: 'Today, 9:30 AM',     status: 'approved'     },
  { id: 2, quest: 'Product Review',          cash: null, date: 'Today, 7:15 AM',     status: 'under_review' },
  { id: 3, quest: 'Quick Phrases',           cash: null, date: 'Today, 6:00 AM',     status: 'auto_check'   },
  { id: 4, quest: 'Conversational Dialogue', cash: null, date: 'Yesterday, 3:00 PM', status: 'rejected', reason: 'Background noise' },
];

const urgentQuests = [
  {
    id: 'uq-1', title: 'Hindi — Waiter Dialogue',
    cash: 15, duration: '30 sec', clips: 3,
    tag: 'high-demand', tagLabel: '427 Hindi clips needed',
    slotsLeft: 12, emoji: '🍽️',
  },
  {
    id: 'uq-2', title: 'English — Quick Phrases',
    cash: 10, duration: '2 min', clips: 5,
    tag: 'bonus', tagLabel: '+20% Bonus',
    slotsLeft: null, emoji: '💬',
  },
  {
    id: 'uq-3', title: 'Marathi — Product Reviews',
    cash: 25, duration: '8 min', clips: 10,
    tag: 'expiring', tagLabel: 'Closes in 2h',
    slotsLeft: 5, emoji: '🛒',
  },
];

const tagStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'high-demand': { bg: '#FEF0E8', text: '#8B3000', dot: 'oklch(0.63 0.25 34)' },
  'bonus':       { bg: '#F5F0DC', text: '#6B4800', dot: '#8B6914' },
  'expiring':    { bg: '#FDE8E8', text: '#8B0000', dot: '#C0392B' },
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Hey, night owl';
}

function getMotivationalLine(todayEarned: number): string {
  if (todayEarned === 0) return 'Ready to start earning today?';
  if (todayEarned < 100) return `₹${todayEarned} earned today. Keep going!`;
  if (todayEarned < 300) return 'Great momentum — you\'re on a roll!';
  return 'Outstanding day. You\'re crushing it! 🔥';
}

export function Home() {
  const navigate = useNavigate();
  const [streak] = useState(5);
  const [isNewUser, setIsNewUser] = useState(false);
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
        <div className="px-6 pt-16 flex justify-end" style={{ background: '#F8F9FA' }}>
          <button
            onClick={() => setIsNewUser(false)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            Returning user
          </button>
        </div>
        <NewUserHome />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: '#F4F6F8', fontFamily: 'var(--font-sans)' }}>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── WARM GREETING HERO ──────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(175deg, #FFF6EF 0%, #FFF1E8 40%, #F4F6F8 100%)',
          padding: '64px 24px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative waveform in background */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            opacity: 0.04, pointerEvents: 'none',
          }}
        >
          <Waveform color="oklch(0.63 0.25 34)" opacity={1} height={60} />
        </div>

        {/* Logo row */}
        <div className="flex items-center justify-between mb-6">
          <FeulLogo />
          <div className="flex items-center gap-2">
            <BellButton unreadCount={unreadCount} onClick={() => setNotifOpen(true)} />
            <button
              onClick={() => setIsNewUser(true)}
              style={{ fontSize: 10, fontWeight: 600, color: '#B0BBCA', border: '1px solid #E8EDF3', borderRadius: 8, padding: '3px 8px' }}
            >
              New user
            </button>
          </div>
        </div>

        {/* Greeting row: text + avatar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Time-based greeting */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.63 0.25 34)', marginBottom: 4, letterSpacing: '0.01em' }}
            >
              {greeting} 👋
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 }}
              style={{
                fontSize: 26, fontWeight: 800, color: '#1C2434',
                lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.4px',
              }}
            >
              Alex Johnson
            </motion.h1>

            {/* Motivational line */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}
            >
              {getMotivationalLine(todayEarned)}
            </motion.p>
          </div>

          {/* Avatar + streak badge */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8743F 0%, #C4622D 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 6px 20px rgba(224,108,58,0.35)',
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>A</span>
            </motion.div>

            {/* Streak — subtle, secondary signal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex items-center gap-1"
              style={{ opacity: 0.55 }}
            >
              <Flame className="w-3 h-3" style={{ color: '#8896A7' }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: '#8896A7' }}>{streak}d</span>
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
            background: 'radial-gradient(ellipse at 20% 35%, rgba(224,108,58,0.17) 0%, transparent 55%), linear-gradient(150deg, #0F1822 0%, #0A0C10 100%)',
            borderRadius: 24,
            padding: '20px 22px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          {/* Waveform bg */}
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.05 }}>
            <Waveform color="#FFFFFF" opacity={1} height={70} />
          </div>

          <div className="relative z-10">
            {/* Top row: label + weekly gain */}
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Today's Progress
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'oklch(0.63 0.25 34)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'oklch(0.63 0.25 34)' }}>+₹254 this week</span>
              </div>
            </div>

            {/* Main row: ring + totals */}
            <div className="flex items-center gap-5">
              {/* Goal ring */}
              <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="33" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5.5" />
                  <motion.circle
                    cx="40" cy="40" r="33" fill="none"
                    stroke="url(#ringGrad)" strokeWidth="5.5" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 33}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 33 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 33 * (1 - progressPct / 100) }}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: 0.4 }}
                    transform="rotate(-90 40 40)"
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E8743F" />
                      <stop offset="100%" stopColor="#FF9D6C" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                    ₹{todayEarned}
                  </p>
                  <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                    / ₹{dailyGoal}
                  </p>
                </div>
              </div>

              {/* Total + nudge */}
              <div className="flex-1">
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700,
                  color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em',
                }}>
                  ₹{totalEarned.toLocaleString()}
                </p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginTop: 5, lineHeight: 1.4 }}>
                  Total earned lifetime
                </p>

                {/* Progress bar */}
                <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 4 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                    style={{ background: 'linear-gradient(90deg, oklch(0.63 0.25 34), #FF9D6C)', borderRadius: 999, height: 4 }}
                  />
                </div>
                <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {Math.round(progressPct)}% of daily goal
                </p>
              </div>
            </div>

            {/* Daily clips goal — completion motivation */}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                  Daily clips goal
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                  {clipsToday} / {clipsGoal}
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 4 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${clipsPct}%` }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.65 }}
                  style={{ background: 'linear-gradient(90deg, #5A7B6D, #6FAF92)', borderRadius: 999, height: 4 }}
                />
              </div>
              <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>
                {clipsGoal - clipsToday} clips left to finish today's goal
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BONUS TIMER ─────────────────────────────────────── */}
      <div className="px-5 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #FFFBEF 0%, #FFF7E0 100%)',
            borderRadius: 16, padding: '12px 16px',
            border: '1px solid #F0DFA0',
            boxShadow: '0px 2px 8px rgba(184,134,11,0.08)',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #F5D060, #D4A017)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Timer className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: '#6B4800' }}>
              +20% bonus active — 8 min left
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8B6914' }}>
              Complete any quest now to earn extra
            </p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#B8860B' }} />
        </motion.div>
      </div>

      {/* ── PRIMARY CTA ─────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/recording/sample-quest')}
          style={{
            width: '100%', height: 62, borderRadius: 999,
            background: 'linear-gradient(160deg, #E8743F 0%, #C4622D 100%)',
            color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 10px 28px rgba(224,108,58,0.42), inset 0px 1px 0px rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic className="w-5 h-5" />
          Start Earning Now
        </motion.button>
      </div>

      {/* ── QUESTS FOR YOU ──────────────────────────────────── */}
      <div className="px-5 mb-5">
        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
              Picked for you
            </h3>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 1 }}>
              Matches your voice profile
            </p>
          </div>
          <button
            onClick={() => navigate('/contributor/quests')}
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 700, color: 'oklch(0.63 0.25 34)' }}
          >
            See all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {urgentQuests.map((quest, i) => {
            const ts = tagStyles[quest.tag];
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.42 + i * 0.07 }}
                onClick={() => navigate(`/recording/${quest.id}`)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid #EDF0F5',
                  padding: '16px 18px',
                  cursor: 'pointer',
                  boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                {/* Quest emoji icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `${ts.bg}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {quest.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                      background: ts.bg, color: ts.text,
                    }}>
                      {quest.tagLabel}
                    </span>
                    {quest.slotsLeft && (
                      <span className="flex items-center gap-0.5" style={{ fontSize: 10, fontWeight: 600, color: '#C0392B' }}>
                        <Users className="w-2.5 h-2.5" />
                        {quest.slotsLeft} left
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', lineHeight: 1.3 }}>
                    {quest.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>
                      <Clock className="w-3 h-3" /> {quest.duration}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#C8CDD6' }}>·</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>{quest.clips} clips</span>
                  </div>
                </div>

                {/* Earning */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'oklch(0.63 0.25 34)', lineHeight: 1 }}>
                    ₹{quest.cash}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#B0BBCA', marginTop: 2 }}>earn now</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── RECENT ACTIVITY ─────────────────────────────────── */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
            Recent Activity
          </h3>
          <button className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'oklch(0.63 0.25 34)' }}>
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #EDF0F5', overflow: 'hidden', boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)' }}>
          {recentActivity.map((activity, idx) => {
            const cfg = statusConfig[activity.status];
            const StatusIcon = cfg.icon;
            const label = cfg.label(activity.cash);
            return (
              <div
                key={activity.id}
                onClick={cfg.tappable ? () => navigate(`/rejected/${activity.id}`) : undefined}
                style={{
                  padding: '14px 18px',
                  borderBottom: idx < recentActivity.length - 1 ? '1px solid #F2F5F9' : 'none',
                  cursor: cfg.tappable ? 'pointer' : 'default',
                  background: cfg.tappable ? 'rgba(253,232,232,0.25)' : 'transparent',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>
                      {activity.quest}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>{activity.date}</p>
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
              </div>
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
          onClick={() => navigate('/contributor/performance')}
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #EDF0F5',
            padding: '18px',
            cursor: 'pointer',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #FFF0C0, #F5D060)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#8B6914' }} />
              </div>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>{tierName(3)}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginLeft: 6 }}>470 to {nextTierName(3)}</span>
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#8B6914',
              background: '#FFF3D6', padding: '3px 10px', borderRadius: 999,
            }}>
              1,530 / 2,000 reputation
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ background: '#F0F4F8', borderRadius: 999, height: 7 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '76%' }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.6 }}
              style={{
                background: 'linear-gradient(90deg, oklch(0.63 0.25 34), #FF9D6C)',
                borderRadius: 999, height: 7,
              }}
            />
          </div>

          <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 9, lineHeight: 1.5 }}>
            Reach <span style={{ color: '#1C2434', fontWeight: 700 }}>{nextTierName(3)}</span> to unlock{' '}
            <span style={{ color: 'oklch(0.63 0.25 34)', fontWeight: 700 }}>higher-paying campaigns</span>
            {' '}& instant approvals.
          </p>
        </motion.div>
      </div>
    </div>
  );
}