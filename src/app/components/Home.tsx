import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Mic, ArrowRight, ChevronRight, TrendingUp } from 'lucide-react';
import { BrandSlot } from './ui/BrandSlot';
import { NotificationsPanel, BellButton } from './ui/NotificationsPanel';
import {
  Amount, BalanceBlock, QuestRow, LedgerRow, StatTile, Button,
  type StatusKind,
} from './ui/Primitives';
import { pickedForYou, quests } from '../lib/quests';
import { useDevContext } from '../lib/DevContext';
import { useSession } from '../lib/session';

/* ─────────────────────────────────────────────────────────────────────
 * ONE Home, three DATA states on the same chrome — never a tutorial, never
 * a receipt. Home ≠ Wallet: Home carries exactly ONE 48px hero ₹ (earned
 * today) and a market-state header; the ledger lives in Wallet.
 *   empty   = signed in, nothing submitted
 *   pending = first session submitted, not credited
 *   live    = has credited ₹
 * ───────────────────────────────────────────────────────────────────── */

type DataState = 'empty' | 'pending' | 'live';

const FIRST_QUEST_ID = 'q-lines-1';
const FIRST_QUEST = quests.find((q) => q.id === FIRST_QUEST_ID)!;

interface Activity { title: string; sub: string; amount: number; kind: StatusKind; }
const liveActivity: Activity[] = [
  { title: 'Ordering at a Café — Hindi',    sub: 'Today · Sarvam AI',       amount: 45, kind: 'settled' },
  { title: 'Family Dinner Table — Hindi',   sub: 'In review · Sarvam AI',   amount: 92, kind: 'pending' },
  { title: 'Doctor Visit — Hindi',          sub: 'Rejected · background noise', amount: 65, kind: 'failed' },
];

/* Market-state line — the header carries demand, not a greeting. */
const MARKET_LINE: Record<DataState, string> = {
  empty:   'Sarvam AI needs 427 more Hindi café clips this week.',
  pending: 'Your clips are queued behind 180 others — usually cleared within a day.',
  live:    'AI4Bharat just opened 360 Hindi symptom-interview clips.',
};

export function Home() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const reduce = useReducedMotion();
  const [notifOpen, setNotifOpen] = useState(false);

  const state: DataState =
    dev.homeState !== 'auto' ? dev.homeState
    : profile?.stage === 'credited' ? 'live'
    : profile?.stage === 'session' ? 'pending'
    : 'empty';

  const firstName = (profile?.name ?? 'there').split(' ')[0];
  const unread = state === 'live' ? 3 : state === 'pending' ? 1 : 0;

  const earnedToday = state === 'live' ? 185 : 0;
  const heroCaption = state === 'live' ? 'Earned today' : state === 'pending' ? 'Clearing' : 'Ready to start';

  const activity: Activity[] =
    state === 'live' ? liveActivity
    : state === 'pending' ? [{ title: FIRST_QUEST.title, sub: 'In review · Sarvam AI', amount: 12, kind: 'pending' }]
    : [];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── Header: brand + bell, then the market-state line ── */}
      <div style={{ padding: '56px 20px 20px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div className="flex items-center gap-2.5">
            <BrandSlot size={36} />
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>Hi, {firstName}</span>
          </div>
          <BellButton unreadCount={unread} onClick={() => setNotifOpen(true)} />
        </div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4, letterSpacing: '-0.005em', margin: 0 }}
        >
          {MARKET_LINE[state]}
        </motion.p>
      </div>

      {/* ── The hero money object. Empty state reserves the 48px ₹ for a
           real balance and shows a lighter start-earning card instead. ── */}
      {state === 'empty' ? (
        <div className="px-5 mb-4">
          <div style={{
            background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-1)', padding: '20px 22px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Ready to start
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
              Earn your first ₹ today
            </p>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Jobs pay <span className="tabular" style={{ fontWeight: 700, color: 'var(--action-primary)' }}>₹12–220</span> each. Your first one takes about three minutes.
            </p>
          </div>
        </div>
      ) : (
      <div className="px-5 mb-4">
        <BalanceBlock amount={earnedToday} caption={heroCaption}>
          {state === 'pending' && (
            <div className="flex items-center gap-2">
              <Amount value={12} size={16} color="var(--money-pending)" />
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
                in review — usually cleared within a day
              </span>
            </div>
          )}
          {state === 'live' && (
            <div style={{ display: 'flex', gap: 24 }}>
              <MiniStat label="This week" value="₹1,240" />
              <MiniStat label="In review" value="₹92" tone="pending" />
            </div>
          )}
        </BalanceBlock>
      </div>
      )}

      {/* ── Primary CTA — names the job ── */}
      <div className="px-5 mb-6">
        <Button
          full size="lg"
          icon={<ArrowRight size={18} />}
          onClick={() => navigate(`/recording/${state === 'live' ? pickedForYou[0].id : FIRST_QUEST_ID}`)}
        >
          <Mic size={18} />
          {state === 'empty' ? 'Record Hindi phrases · ₹12'
            : state === 'pending' ? 'Record another while you wait'
            : 'Start a job'}
        </Button>
      </div>

      {/* ── Dashboard strip — five glanceable, dashboard-only items ── */}
      {state !== 'empty' && (
        <div className="px-5 mb-7">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <StatTile label="Active" value={state === 'live' ? '2' : '1'} delta="assignments in flight" />
            <StatTile label="Needs you" value={state === 'live' ? '1' : '0'} tone={state === 'live' ? 'pending' : 'neutral'} delta={state === 'live' ? '1 clip to re-record' : 'all clear'} />
          </div>
          <MilestoneRow state={state} onClick={() => navigate('/contributor/rewards')} />
        </div>
      )}

      {/* ── Picked for you — the shop window, always present, as ROWS ── */}
      <div className="px-5 mb-7">
        <SectionHead
          title="Picked for you"
          sub="Real jobs you can record right now"
          onSeeAll={() => navigate('/contributor/quests')}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pickedForYou.map((q, i) => (
            <motion.div
              key={q.id}
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
            >
              <QuestRow quest={q} onClick={() => navigate(`/recording/${q.id}`)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Recent activity — a short panel, the full ledger lives in Wallet ── */}
      <div className="px-5">
        <SectionHead
          title="Recent activity"
          onSeeAll={state === 'live' ? () => navigate('/contributor/wallet') : undefined}
        />
        <div style={{
          background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
          border: '1px solid var(--border-subtle)', padding: '4px 16px',
        }}>
          {activity.length === 0 ? (
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', padding: '22px 0', margin: 0 }}>
              Your recordings will show up here.
            </p>
          ) : (
            activity.map((a) => (
              <LedgerRow
                key={a.title}
                title={a.title} sub={a.sub} amount={a.amount} kind={a.kind}
                struck={a.kind === 'failed'}
                onClick={a.kind === 'failed' ? () => navigate('/rejected/1') : undefined}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone?: 'pending' }) {
  return (
    <div>
      <p className="tabular" style={{ fontSize: 18, fontWeight: 700, color: tone === 'pending' ? 'var(--money-pending)' : 'var(--money-figure)', margin: 0 }}>{value}</p>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', margin: '2px 0 0' }}>{label}</p>
    </div>
  );
}

function MilestoneRow({ state, onClick }: { state: DataState; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 16, cursor: 'pointer',
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', textAlign: 'left',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-full)', flexShrink: 0,
        background: 'var(--t-verdigris-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <TrendingUp size={18} style={{ color: 'var(--t-verdigris-600)' }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>Next milestone</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0' }}>
          {state === 'live' ? '8 accepted clips to Trusted standing' : 'First accepted clip unlocks Verified'}
        </p>
      </div>
      <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
    </button>
  );
}

function SectionHead({ title, sub, onSeeAll }: { title: string; sub?: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-end justify-between" style={{ marginBottom: 12, gap: 12 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{sub}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-1" style={{ fontSize: 13, fontWeight: 600, color: 'var(--action-primary)', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer' }}>
          See all <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
