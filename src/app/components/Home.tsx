import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../lib/DevContext';
import { motion, useReducedMotion } from 'motion/react';
import {
  TrendingUp, Mic, ArrowRight, Clock, AlertCircle, ChevronRight,
} from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { NotificationsPanel, BellButton } from './ui/NotificationsPanel';
import { QuestCard } from './ui/QuestCard';
import { SectionHeading } from './ui/Primitives';
import { pickedForYou } from '../lib/quests';
import { whileTap } from '../lib/motion';
import { useSession } from '../lib/session';

/* ─────────────────────────────────────────────────────────────────────
 * ONE Home. Three DATA states on the same chrome (§ amended Pass 3):
 *   empty   = signed in, nothing submitted
 *   pending = first session submitted, not credited
 *   live    = has credited ₹ (established / demo)
 * The dashboard never gets replaced by a tutorial or a receipt.
 * ───────────────────────────────────────────────────────────────────── */

type DataState = 'empty' | 'pending' | 'live';

type ActivityStatus = 'auto_check' | 'under_review' | 'approved' | 'rejected';
interface Activity { id: number; quest: string; cash?: number | null; date: string; status: ActivityStatus; }

const statusConfig: Record<ActivityStatus, {
  label: (cash?: number | null) => string;
  bg: string; text: string; icon: React.ElementType; tappable?: boolean;
}> = {
  auto_check:   { label: () => 'Auto-check passed',      bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)', icon: Clock      },
  under_review: { label: () => 'Under review',           bg: 'var(--status-info-bg)',    text: 'var(--status-info-text)',    icon: Clock      },
  approved:     { label: (c) => `+₹${c} credited`,       bg: 'var(--status-success-bg)', text: 'var(--status-success-text)', icon: TrendingUp },
  rejected:     { label: () => 'Rejected — see reason',  bg: 'var(--status-error-bg)',   text: 'var(--status-error-text)',   icon: AlertCircle, tappable: true },
};

/* Real activity only appears once there's a contributor life to show (live). */
const liveActivity: Activity[] = [
  { id: 1, quest: 'Ordering at a Café',       cash: 45,   date: 'Today, 9:30 AM',     status: 'approved'     },
  { id: 2, quest: 'Family Dinner Table',      cash: null, date: 'Today, 7:15 AM',     status: 'under_review' },
  { id: 3, quest: 'Hindi — Everyday Phrases', cash: 12,   date: 'Yesterday, 6:00 PM', status: 'approved'     },
  { id: 4, quest: 'Doctor Visit Interview',   cash: null, date: 'Yesterday, 3:00 PM', status: 'rejected'     },
];

const FIRST_QUEST_ID = 'q-lines-1';
const FIRST_QUEST = { title: 'Hindi — Everyday Phrases', meta: '3 min · ₹12', pay: 12 };

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Hey, night owl';
}

export function Home() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const [greeting, setGreeting] = useState(getGreeting());
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  /* Data state: DevPanel override wins; otherwise derive from the profile. */
  const state: DataState =
    dev.homeState !== 'auto' ? dev.homeState
    : profile?.stage === 'credited' ? 'live'
    : profile?.stage === 'session' ? 'pending'
    : 'empty';

  const firstName = (profile?.name ?? 'there').split(' ')[0];
  const initials = profile?.initials ?? 'A';
  const unread = state === 'live' ? 3 : state === 'pending' ? 1 : 0;

  /* Live demo figures — only meaningful in the live state. */
  const todayEarned = 185;

  const heroLine =
    state === 'empty'   ? 'Your first rupees are one recording away.'
    : state === 'pending' ? 'First clips are in — still under review.'
    : null;

  const activity: Activity[] =
    state === 'live' ? liveActivity
    : state === 'pending' ? [{ id: 1, quest: FIRST_QUEST.title, cash: FIRST_QUEST.pay, date: 'Just now', status: 'under_review' }]
    : [];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── WELCOME HERO — warm paper wash, all states ─────────── */}
      <div style={{
        background: 'linear-gradient(178deg, var(--accent-100) 0%, var(--accent-50) 34%, var(--background) 100%)',
        padding: '60px 22px 28px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="flex items-center justify-between mb-6">
          <FeulLogo />
          <BellButton unreadCount={unread} onClick={() => setNotifOpen(true)} />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 4 }}
            >
              {greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              {profile?.name ?? 'Welcome'}
            </motion.h1>
            {heroLine && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.14 }}
                style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 8, maxWidth: 300 }}
              >
                {heroLine}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              width: 52, height: 52, borderRadius: 999, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0px 6px 18px rgba(var(--accent-glow-rgb),0.30)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-on-accent)', lineHeight: 1 }}>{initials}</span>
          </motion.div>
        </div>
      </div>

      {/* ── TODAY / GET STARTED BOARD — the weighted dashboard object ── */}
      <div className="px-5 -mt-2 mb-5">
        <TodayBoard state={state} todayEarned={todayEarned} onStart={() => navigate(`/recording/${FIRST_QUEST_ID}`)} />
      </div>

      {/* ── PRIMARY CTA — one orange pill, names the job ──────── */}
      <div className="px-5 mb-7">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/recording/${state === 'live' ? pickedForYou[0].id : FIRST_QUEST_ID}`)}
          style={{
            width: '100%', height: 58, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: 'var(--text-on-accent)',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 10px 26px rgba(var(--accent-glow-rgb),0.34)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic className="w-5 h-5" />
          {state === 'empty' ? 'Record Hindi phrases · ₹12'
            : state === 'pending' ? 'Record another while you wait'
            : 'Start a quest'}
        </motion.button>
      </div>

      {/* ── PICKED FOR YOU — the shop window, ALWAYS visible ──── */}
      <div className="px-5 mb-7">
        <SectionHeading
          variant="display"
          subtitle="Real quests you can record right now"
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
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
            >
              <QuestCard quest={quest} onClick={() => navigate(`/recording/${quest.id}`)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITY — always a panel, never a page ───────────── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Recent activity
          </h3>
          {state === 'live' && (
            <button className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '6px 0 6px 12px', minHeight: 44, display: 'flex', alignItems: 'center' }}>
              View all <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--card-border)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          {activity.length === 0 ? (
            <div style={{ padding: '26px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Your recordings will show up here.
              </p>
            </div>
          ) : (
            activity.map((a, idx) => {
              const cfg = statusConfig[a.status];
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={a.id}
                  whileTap={cfg.tappable ? whileTap.row : undefined}
                  onClick={cfg.tappable ? () => navigate(`/rejected/${a.id}`) : undefined}
                  style={{
                    padding: '14px 18px',
                    borderBottom: idx < activity.length - 1 ? '1px solid var(--divider)' : 'none',
                    cursor: cfg.tappable ? 'pointer' : 'default',
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{a.quest}</p>
                      <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>{a.date}</p>
                    </div>
                    <span className="inline-flex items-center gap-1" style={{
                      fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 999,
                      background: cfg.bg, color: cfg.text, whiteSpace: 'nowrap',
                    }}>
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label(a.cash)}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * TODAY / GET STARTED BOARD — one soft-wash surface, three fillings.
 * Weight without a second navy till; big tabular ₹, generous padding.
 * ═══════════════════════════════════════════════════════════════════ */

function TodayBoard({ state, todayEarned, onStart }: { state: DataState; todayEarned: number; onStart: () => void }) {
  const reduce = useReducedMotion();

  const amount = state === 'live' ? todayEarned : 0;
  const caption =
    state === 'live' ? 'earned today'
    : state === 'pending' ? 'available now' : 'in your wallet';

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      style={{
        background: 'radial-gradient(ellipse at 12% 0%, rgba(var(--accent-glow-rgb),0.16) 0%, transparent 58%), linear-gradient(160deg, var(--accent-50) 0%, var(--surface) 72%)',
        borderRadius: 24, padding: '22px 22px 20px',
        border: '1px solid var(--accent-100)',
        boxShadow: 'var(--shadow-card)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {state === 'empty' ? 'Get started' : 'Today'}
        </p>
      </div>

      {/* Big money figure */}
      <div className="flex items-end gap-2">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 46, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
          ₹{amount}
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>{caption}</p>
      </div>

      {/* State-specific second line */}
      {state === 'empty' && (
        <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 8 }}>
          Quests pay <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary-deep)' }}>₹12–220</span> each — the first one takes ~3 minutes.
        </p>
      )}
      {state === 'pending' && (
        <div className="flex items-center gap-2 mt-3" style={{ padding: '10px 12px', background: 'var(--status-info-bg)', borderRadius: 12 }}>
          <Clock style={{ width: 15, height: 15, color: 'var(--status-info-text)' }} strokeWidth={2} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--status-info-text)' }}>
            ₹{FIRST_QUEST.pay} under review — usually cleared within a day
          </span>
        </div>
      )}

      {/* Empty state hosts the first job right here on the board */}
      {state === 'empty' && (
        <button
          onClick={onStart}
          style={{
            width: '100%', marginTop: 16, padding: '13px 14px', borderRadius: 14,
            background: 'var(--surface)', border: '1px solid var(--card-border)',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Mic style={{ width: 18, height: 18, color: 'var(--accent-primary-deep)' }} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Your first job</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{FIRST_QUEST.title}</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{FIRST_QUEST.meta}</p>
          </div>
          <ChevronRight style={{ width: 18, height: 18, color: 'var(--text-muted)', flexShrink: 0 }} />
        </button>
      )}
    </motion.div>
  );
}
