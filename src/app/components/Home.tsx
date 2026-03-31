import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Flame, TrendingUp, Mic, ArrowRight, Clock, AlertCircle, ArrowUpRight, Zap, Timer, Users } from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';
import { NewUserHome } from './NewUserHome';

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
  auto_check:   { label: () => 'Auto-check passed',       bg: '#F5F0DC', text: '#6B4F00', icon: Clock       },
  under_review: { label: () => 'Under Validator Review',  bg: '#E8EFF8', text: '#1E3A6E', icon: Clock        },
  approved:     { label: (c) => `Approved ${c ? `₹${c} credited` : ''}`, bg: '#E6F4EC', text: '#1A5C35', icon: TrendingUp },
  rejected:     { label: () => 'Rejected — See reason',   bg: '#FDE8E8', text: '#8B0000', icon: AlertCircle, tappable: true },
};

const recentActivity: Activity[] = [
  { id: 1, quest: 'Morning News Reading',    cash: 15,   date: 'Today, 9:30 AM',      status: 'approved'     },
  { id: 2, quest: 'Product Review',          cash: null, date: 'Today, 7:15 AM',      status: 'under_review' },
  { id: 3, quest: 'Quick Phrases',           cash: null, date: 'Today, 6:00 AM',      status: 'auto_check'   },
  { id: 4, quest: 'Conversational Dialogue', cash: null, date: 'Yesterday, 3:00 PM',  status: 'rejected',    reason: 'Background noise' },
];

/* Urgency quests — the "earn now" cards */
const urgentQuests = [
  {
    id: 'uq-1', title: 'Hindi — Waiter Dialogue',
    cash: 15, duration: '30 sec', clips: 3,
    tag: 'high-demand', tagLabel: 'High Demand',
    slotsLeft: 12,
  },
  {
    id: 'uq-2', title: 'English — Quick Phrases',
    cash: 10, duration: '2 min', clips: 5,
    tag: 'bonus', tagLabel: '+20% Bonus',
    slotsLeft: null,
  },
  {
    id: 'uq-3', title: 'Marathi — Product Reviews',
    cash: 25, duration: '8 min', clips: 10,
    tag: 'expiring', tagLabel: 'Expires in 2h',
    slotsLeft: 5,
  },
];

const tagStyles: Record<string, { bg: string; text: string }> = {
  'high-demand': { bg: '#FEF0E8', text: '#8B3000' },
  'bonus':       { bg: '#F5F0DC', text: '#6B4800' },
  'expiring':    { bg: '#FDE8E8', text: '#8B0000' },
};

export function Home() {
  const navigate = useNavigate();
  const [streak] = useState(5);
  const [isNewUser, setIsNewUser] = useState(false);
  const totalEarned = 1250;
  const dailyGoal = 500;
  const todayEarned = 185;

  if (isNewUser) {
    return (
      <div>
        {/* Toggle header */}
        <div className="px-6 pt-2 flex justify-end" style={{ background: '#F8F9FA' }}>
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
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header with streak ── */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <FeulLogo />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            {isNewUser ? 'Returning user' : 'New user'}
          </button>
          <div className="flex items-center gap-2" style={{
            background: '#FFF0E8', borderRadius: 999, padding: '5px 12px',
          }}>
            <Flame className="w-4 h-4" style={{ color: '#E06C3A' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E06C3A' }}>{streak} day streak</span>
          </div>
        </div>
      </div>

      {/* ── Earnings Hero — Money is THE hero ── */}
      <div className="px-6 mb-2">
        <div
          style={{
            background: 'var(--navy)',
            borderRadius: 24,
            padding: '24px 24px 20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
            <Waveform color="#FFFFFF" opacity={1} height={80} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-6">
              {/* Daily Goal Ring */}
              <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <motion.circle
                    cx="48" cy="48" r="40" fill="none"
                    stroke="#E06C3A" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - todayEarned / dailyGoal) }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                    ₹{todayEarned}
                  </p>
                  <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    of ₹{dailyGoal}
                  </p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Total Earnings
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 700,
                  color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em',
                }}>
                  ₹{totalEarned.toLocaleString()}
                </p>
                <p className="flex items-center gap-1.5 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: '#E06C3A' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#E06C3A' }}>
                    +₹254 this week
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bonus Timer Banner ── */}
      <div className="px-6 mb-5">
        <div className="flex items-center gap-3" style={{
          background: '#FEF7E6', borderRadius: 14, padding: '12px 16px',
          border: '1px solid #F5E4B8',
        }}>
          <Timer className="w-5 h-5 flex-shrink-0" style={{ color: '#8B6914' }} />
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: '#6B4800' }}>
              +20% bonus active for next 8 min
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8B6914' }}>
              Complete any quest now to earn extra
            </p>
          </div>
        </div>
      </div>

      {/* ── Earn Right Now — Urgency Cards ── */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434' }}>
            Earn Right Now
          </h3>
          <button
            onClick={() => navigate('/contributor/quests')}
            className="flex items-center gap-1"
            style={{ fontSize: 13, fontWeight: 700, color: '#E06C3A' }}
          >
            See All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {urgentQuests.map((quest) => {
            const ts = tagStyles[quest.tag];
            return (
              <div
                key={quest.id}
                onClick={() => navigate(`/recording/${quest.id}`)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid #E8EDF3',
                  padding: '20px',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 12px rgba(28,36,52,0.02)',
                }}
              >
                {/* Tags row */}
                <div className="flex items-center gap-2 mb-3">
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                    background: ts.bg, color: ts.text,
                  }}>
                    {quest.tagLabel}
                  </span>
                  {quest.slotsLeft && (
                    <span className="flex items-center gap-1" style={{
                      fontSize: 11, fontWeight: 600, color: '#8B0000',
                    }}>
                      <Users className="w-3 h-3" />
                      {quest.slotsLeft} slots left
                    </span>
                  )}
                </div>

                {/* Title + earning */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1C2434', marginBottom: 4 }}>
                      {quest.title}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                        <Clock className="w-3.5 h-3.5" /> {quest.duration}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                        {quest.clips} clips
                      </span>
                    </div>
                  </div>

                  {/* Earning — the hook */}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#E06C3A', lineHeight: 1 }}>
                      ₹{quest.cash}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', marginTop: 2 }}>
                      in {quest.duration}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Primary CTA ── */}
      <div className="px-6 mb-8">
        <button
          onClick={() => navigate('/recording/sample-quest')}
          style={{
            width: '100%', height: 62, borderRadius: 999,
            background: '#E06C3A', color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 8px 24px rgba(224,108,58,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic className="w-5 h-5" />
          Start Earning Now
        </button>
      </div>

      {/* ── Recent Activity ── */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434' }}>
            Recent Activity
          </h3>
          <button className="flex items-center gap-1" style={{ fontSize: 13, fontWeight: 700, color: '#E06C3A' }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8EDF3', padding: '0 20px' }}>
          {recentActivity.map((activity, idx) => {
            const cfg = statusConfig[activity.status];
            const StatusIcon = cfg.icon;
            const label = cfg.label(activity.cash);
            return (
              <div
                key={activity.id}
                onClick={cfg.tappable ? () => navigate(`/rejected/${activity.id}`) : undefined}
                style={{
                  padding: '18px 0',
                  borderBottom: idx < recentActivity.length - 1 ? '1px solid #E8EDF3' : 'none',
                  cursor: cfg.tappable ? 'pointer' : 'default',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>
                      {activity.quest}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{activity.date}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{
                      fontSize: 11, fontWeight: 600,
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

      {/* ── Level Progress ── */}
      <div className="px-6">
        <div style={{
          background: '#FFFFFF', borderRadius: 20,
          border: '1px solid #E8EDF3', padding: '20px',
        }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: '#E06C3A' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>Level 3</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>1,530 / 2,000 XP</span>
          </div>
          <div style={{ background: '#F0F4F8', borderRadius: 999, height: 8 }}>
            <div style={{ background: '#E06C3A', borderRadius: 999, height: 8, width: '76%' }} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 10 }}>
            Reach Level 4 to unlock <span style={{ color: '#E06C3A', fontWeight: 700 }}>1.2× payout multiplier</span>
          </p>
        </div>
      </div>
    </div>
  );
}