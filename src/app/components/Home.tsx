import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Mic, ArrowRight, ChevronRight, TrendingUp, Check, ShieldCheck, Wallet as WalletIcon, type LucideIcon } from 'lucide-react';
import { BrandSlot } from './ui/BrandSlot';
import { NotificationsPanel, BellButton } from './ui/NotificationsPanel';
import { ConsentSheet } from './ui/ConsentSheet';
import {
  Amount, BalanceBlock, QuestRow, LedgerRow, StatTile, Button, Card,
  type StatusKind,
} from './ui/Primitives';
import {
  pickedForYou, quests, questTotal,
  FIRST_JOB, FIRST_JOB_ID, newcomerChain, newcomerChainTotal, WITHDRAW_MIN, withdrawGap,
} from '../lib/quests';
import { useDevContext } from '../lib/DevContext';
import { useSession } from '../lib/session';
import { durations } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * ONE Home, three DATA states on the same chrome — never a tutorial, never
 * a receipt. Home ≠ Wallet: Home carries exactly ONE 48px hero ₹ (earned
 * today) and a market-state header; the ledger lives in Wallet.
 *   empty   = signed in, nothing submitted
 *   pending = first session submitted, not credited
 *   live    = has credited ₹
 * The header carries a market line — never a "Hi, {name}" greeting.
 * ───────────────────────────────────────────────────────────────────── */

type DataState = 'empty' | 'pending' | 'live';

const firstJobTotal = questTotal(FIRST_JOB);
const chainNext = newcomerChain[1]; // first acceptance unlocks Verified → this opens

/* Every money figure below is derived from quest data — no magic rupees. */
const ALL_TOTALS = quests.map(questTotal);
const MIN_PAY = Math.min(...ALL_TOTALS);
const MAX_PAY = Math.max(...ALL_TOTALS);

interface Activity { title: string; sub: string; amount: number; kind: StatusKind; }
const roomJob = quests.find((q) => q.id === 'q-room-1')!;
const liveActivity: Activity[] = [
  { title: chainNext.title,            sub: `Today · ${chainNext.client}`,            amount: questTotal(chainNext),          kind: 'settled' },
  { title: roomJob.title,              sub: `In review · ${roomJob.client}`,          amount: questTotal(roomJob),            kind: 'pending' },
  { title: newcomerChain[2].title,     sub: 'Rejected · background noise',            amount: questTotal(newcomerChain[2]),   kind: 'failed'  },
];
const settledToday = liveActivity.filter((a) => a.kind === 'settled').reduce((s, a) => s + a.amount, 0);
const inReviewTotal = liveActivity.filter((a) => a.kind === 'pending').reduce((s, a) => s + a.amount, 0);

/* Market-state line — the header carries demand, not a greeting. */
const MARKET_LINE: Record<DataState, string> = {
  empty:   'Sarvam AI needs 427 more Hindi café clips this week.',
  pending: 'Your clips are queued behind 180 others — usually cleared within a day.',
  live:    'AI4Bharat just opened 360 Hindi symptom-interview clips.',
};

export function Home() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile, consented } = useSession();
  const reduce = useReducedMotion();
  const [notifOpen, setNotifOpen] = useState(false);
  const [consentPreview, setConsentPreview] = useState(false);

  const state: DataState =
    dev.homeState !== 'auto' ? dev.homeState
    : profile?.stage === 'credited' ? 'live'
    : profile?.stage === 'session' ? 'pending'
    : 'empty';

  const unread = state === 'live' ? 3 : state === 'pending' ? 1 : 0;

  const earnedToday = state === 'live' ? Math.max(profile?.walletBalance ?? 0, settledToday) : 0;
  const heroCaption = state === 'live' ? 'Earned today' : state === 'pending' ? 'Clearing' : 'Ready to start';

  const activity: Activity[] =
    state === 'live' ? liveActivity
    : state === 'pending' ? [{ title: FIRST_JOB.title, sub: `In review · ${FIRST_JOB.client}`, amount: firstJobTotal, kind: 'pending' }]
    : [];

  const ctaQuest = state === 'empty' ? FIRST_JOB : state === 'pending' ? chainNext : pickedForYou[0];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      {consentPreview && (
        <ConsentSheet preview onComplete={() => setConsentPreview(false)} onCancel={() => setConsentPreview(false)} />
      )}

      {/* ── Header: brand + bell, then the market-state line ── */}
      <div style={{ padding: '56px 20px 20px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-9)'}}>
          <BrandSlot size={36} />
          <BellButton unreadCount={unread} onClick={() => setNotifOpen(true)} />
        </div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: durations.enter }}
          style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4, letterSpacing: '-0.005em', margin: '0'}}
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
            border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-1)', padding: 'var(--space-9) var(--space-9)',
          }}>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Ready to start
            </p>
            <p style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 var(--space-3)', letterSpacing: '-0.01em' }}>
              Earn your first ₹ today
            </p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', margin: '0', lineHeight: 1.5 }}>
              Jobs pay <span className="tabular" style={{ fontWeight: 700, color: 'var(--money-figure)' }}>₹{MIN_PAY}–{MAX_PAY}</span> each. Your first one takes about {FIRST_JOB.duration}.
            </p>
            {/* Exact-gap promise: the newcomer chain provably clears the withdrawal floor. */}
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: 'var(--space-5) 0 0', lineHeight: 1.5 }}>
              Your first {newcomerChain.length} jobs pay <span className="tabular" style={{ fontWeight: 700, color: 'var(--money-figure)' }}>₹{newcomerChainTotal}</span> — withdrawal opens at <span className="tabular" style={{ fontWeight: 700 }}>₹{WITHDRAW_MIN}</span>.
            </p>
          </div>
        </div>
      ) : (
      <div className="px-5 mb-4">
        <BalanceBlock amount={earnedToday} caption={heroCaption}>
          {state === 'pending' && (
            <div>
              <div className="flex items-center gap-2">
                <Amount value={firstJobTotal} size={16} color="var(--money-pending)" />
                <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  in review — usually cleared within a day
                </span>
              </div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: 'var(--space-4) 0 0', lineHeight: 1.5 }}>
                <span className="tabular" style={{ fontWeight: 700 }}>₹{withdrawGap(firstJobTotal)}</span> to your first withdrawal once this clears.
              </p>
            </div>
          )}
          {state === 'live' && (
            <div style={{ display: 'flex', gap: 'var(--space-10)'}}>
              <MiniStat label="This week" value={`₹${settledToday}`} />
              <MiniStat label="In review" value={`₹${inReviewTotal}`} tone="pending" />
            </div>
          )}
        </BalanceBlock>
      </div>
      )}

      {/* ── Primary CTA — names the job and the pay ── */}
      <div className="px-5 mb-6">
        <Button
          full size="lg"
          icon={<ArrowRight size={18} />}
          onClick={() => navigate(`/recording/${ctaQuest.id}`)}
        >
          <Mic size={18} />
          {state === 'pending' ? `Next: ${ctaQuest.title} · ₹${questTotal(ctaQuest)}` : `${ctaQuest.title} · ₹${questTotal(ctaQuest)}`}
        </Button>
      </div>

      {/* ── Get set up — newcomer checklist (empty state only) ── */}
      {state === 'empty' && (
        <div className="px-5 mb-7">
          <SectionHead title="Get set up" sub="Three quick things to start earning" />
          <Card padding="4px 16px" borderColor={null}>
            <ChecklistRow
              icon={Mic}
              title="Record your first job"
              sub={`${FIRST_JOB.title} · ${FIRST_JOB.duration} · ₹${firstJobTotal}`}
              done={profile?.stage !== 'day0' && profile?.stage != null}
              onClick={() => navigate(`/recording/${FIRST_JOB_ID}`)}
            />
            <ChecklistRow
              icon={WalletIcon}
              title="Add your UPI ID"
              sub="So what you earn can reach you"
              done={profile?.upiLinked ?? false}
              onClick={() => navigate('/contributor/wallet')}
            />
            <ChecklistRow
              icon={ShieldCheck}
              title="See how your voice is protected"
              sub={consented ? 'Consent recorded — revoke anytime in Profile' : 'Read the terms before any recording'}
              done={consented}
              onClick={() => setConsentPreview(true)}
            />
          </Card>
        </div>
      )}

      {/* ── Dashboard strip — five glanceable, dashboard-only items ── */}
      {state !== 'empty' && (
        <div className="px-5 mb-7">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginBottom: 'var(--space-5)'}}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)'}}>
          {pickedForYou.map((q, i) => (
            <motion.div
              key={q.id}
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.slow, delay: 0.1 + i * 0.06 }}
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
        <Card padding="4px 16px" elevation="flat">
          {activity.length === 0 ? (
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-9) 0', margin: '0'}}>
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
        </Card>
      </div>
    </div>
  );
}

function ChecklistRow({ icon: Icon, title, sub, done, onClick }: {
  icon: LucideIcon; title: string; sub: string; done: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-6) 0', minHeight: 56,
        background: 'none', border: 'none',
        cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: done ? 'var(--state-settled-container)' : 'var(--surface-sunken)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: done ? 'var(--state-settled-text)' : 'var(--text-secondary)' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', margin: '0'}}>{title}</p>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: 'var(--space-1) 0 0', lineHeight: 1.4 }}>{sub}</p>
      </div>
      {done
        ? <Check size={18} style={{ color: 'var(--state-settled-text)', flexShrink: 0 }} strokeWidth={2.6} />
        : <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
    </button>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone?: 'pending' }) {
  return (
    <div>
      <p className="tabular" style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: tone === 'pending' ? 'var(--money-pending)' : 'var(--money-figure)', margin: '0'}}>{value}</p>
      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', margin: '2px 0 0' }}>{label}</p>
    </div>
  );
}

function MilestoneRow({ state, onClick }: { state: DataState; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-8)', cursor: 'pointer',
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', textAlign: 'left',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-full)', flexShrink: 0,
        background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <TrendingUp size={18} style={{ color: 'var(--state-settled-text)' }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0'}}>Next milestone</p>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0' }}>
          {state === 'live' ? '8 accepted clips to Trusted standing' : 'First accepted clip unlocks Verified'}
        </p>
      </div>
      <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
    </button>
  );
}

function SectionHead({ title, sub, onSeeAll }: { title: string; sub?: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-end justify-between" style={{ marginBottom: 'var(--space-6)', gap: 'var(--space-6)'}}>
      <div>
        <h2 style={{ fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)', margin: '0'}}>{title}</h2>
        {sub && <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{sub}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-1" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--action-primary)', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer' }}>
          See all <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
