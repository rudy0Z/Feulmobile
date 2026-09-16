import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Pencil, Info, CheckCircle2, TrendingUp } from 'lucide-react';
import {
  Amount, LedgerRow, Button, Sheet, StatusBadge, AmountBreakdown, ReceiptCard,
  type StatusKind,
} from './ui/Primitives';
import { useDevContext } from '../lib/DevContext';
import { useSession } from '../lib/session';
import { WITHDRAW_MIN, withdrawGap } from '../lib/quests';

/* ═══════════════════════════════════════════════════════════════════
   Wallet — the LEDGER, not the hero. Home has the one 48px ₹; the
   Wallet is a varied bento + an honest, tabbed, week-filterable ledger.
   Every pending amount says what it waits on. No Security Reserve, no
   XP-as-money. Withdrawal floor is ₹100, stated as an exact gap.
   ═══════════════════════════════════════════════════════════════════ */

type LedgerKind = 'earning' | 'withdrawal';
interface Entry {
  id: number;
  kind: LedgerKind;
  title: string;
  date: string;
  /** Weekday key for the weekly filter pills (Mon–Sun). */
  dayKey?: string;
  amount: number;
  status: StatusKind;
  /** Honest note: what a pending amount is waiting on, or a bonus reason. */
  note?: string;
  /** A quality bonus rendered as its own line item. */
  bonus?: { label: string; amount: number };
  quest?: string;
  breakdown?: { basePay: number; coverageMult: number; bonus: number };
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const LEDGER: Entry[] = [
  { id: 1, kind: 'earning', title: 'Morning news reading', quest: 'q-lines-1', date: 'Today · 9:30 AM', dayKey: 'Mon', amount: 15, status: 'settled',
    breakdown: { basePay: 15, coverageMult: 1, bonus: 0 } },
  { id: 2, kind: 'earning', title: 'Product descriptions', quest: 'q-lines-2', date: 'Today · 7:15 AM', dayKey: 'Mon', amount: 25, status: 'pending',
    note: 'Waiting on a validator to review 2 clips', breakdown: { basePay: 25, coverageMult: 1, bonus: 0 } },
  { id: 3, kind: 'earning', title: 'Clarity bonus', date: 'Yesterday · 6:00 PM', dayKey: 'Sun', amount: 8, status: 'settled',
    note: 'Top-quartile clarity on 5 clips', bonus: { label: 'Clarity bonus', amount: 8 } },
  { id: 4, kind: 'earning', title: 'Conversational dialogue', quest: 'q-scen-1', date: 'Yesterday · 3:00 PM', dayKey: 'Sun', amount: 35, status: 'settled',
    breakdown: { basePay: 22, coverageMult: 1.4, bonus: 4 } },
  { id: 5, kind: 'withdrawal', title: 'Withdrawal to your UPI', date: 'Last week', dayKey: 'Mon', amount: 120, status: 'settled' },
  { id: 6, kind: 'earning', title: 'Quick phrases', quest: 'q-lines-3', date: 'Last week', dayKey: 'Mon', amount: 0, status: 'failed',
    note: 'Background noise on all clips — re-record to earn ₹10' },
];

export function Wallet() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const [tab, setTab] = useState<'all' | 'earning' | 'withdrawal'>('all');
  const [detail, setDetail] = useState<Entry | null>(null);
  const [weekDay, setWeekDay] = useState<string | null>(null);

  const empty = dev.walletEmpty;

  /* Live figures — derived, never hardcoded.
     Available comes from the session wallet; the rest aggregate the ledger. */
  const available = empty ? 0 : (profile?.walletBalance ?? 0);
  const pending = empty ? 0
    : LEDGER.filter((e) => e.status === 'pending').reduce((s, e) => s + e.amount, 0);
  const thisWeek = empty ? 0
    : LEDGER.filter((e) => e.kind === 'earning' && e.status === 'settled' && /^(Today|Yesterday)/.test(e.date))
        .reduce((s, e) => s + e.amount, 0);
  const withdrawn = LEDGER.filter((e) => e.kind === 'withdrawal').reduce((s, e) => s + e.amount, 0);
  const total = empty ? 0 : available + withdrawn;

  const belowFloor = available < WITHDRAW_MIN;
  const gap = withdrawGap(available);

  const entries = LEDGER.filter((e) => (tab === 'all' || e.kind === tab) && (!weekDay || e.dayKey === weekDay));

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-16 pb-3">
        <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0'}}>
          Wallet
        </h1>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 'var(--space-2)'}}>
          {empty ? 'Your earnings will appear here after your first review.' : 'Everything you have earned and withdrawn.'}
        </p>
      </div>

      {/* Bento — the ONE hero of this screen. Varied sizes, no hero ₹. */}
      <div className="px-6 mb-5" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)',
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--e-2)', overflow: 'hidden',
      }}>
        {/* Available — spans both columns, large ink figure + verdigris delta */}
        <div style={{ gridColumn: '1 / -1', padding: 'var(--space-9) var(--space-9) var(--space-7)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Available</span>
            {thisWeek > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled-deep)' }}>
                <TrendingUp size={12} strokeWidth={2.5} /> +₹{thisWeek.toFixed(0)} this week
              </span>
            )}
          </div>
          <div className="tabular" style={{ fontSize: 'var(--fs-figure)', fontWeight: 700, color: 'var(--money-figure)', lineHeight: 1.1, marginTop: 'var(--space-2)' }}>
            ₹{available.toFixed(2)}
          </div>
        </div>
        {/* In review */}
        <div style={{ padding: 'var(--space-7) var(--space-9)', borderTop: '1px solid var(--divider)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--money-pending)' }} />
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>In review</span>
          </div>
          <div className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'var(--space-2)' }}>₹{pending.toFixed(2)}</div>
          <p style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)', lineHeight: 1.4 }}>Waits on a reviewer</p>
        </div>
        {/* This week + ZIXO mini-barcode sparkline */}
        <div style={{ padding: 'var(--space-7) var(--space-9)', borderTop: '1px solid var(--divider)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>This week</span>
          <div className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'var(--space-2)' }}>₹{thisWeek.toFixed(2)}</div>
          <Barcode />
        </div>
        {/* Total earned — quiet, spans both columns */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-9)', borderTop: '1px solid var(--divider)', background: 'var(--surface-sunken)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)' }}>Total earned</span>
          <span className="tabular" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-secondary)' }}>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* UPI destination + name-match */}
      <div className="px-6 mb-5">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)'}}>
              <span style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {profile?.upiId || 'yourname@bank'}
              </span>
              {(profile?.upiNameMatched ?? true) && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled-deep)' }}>
                  <CheckCircle2 size={13} strokeWidth={2.5} /> Name matched
                </span>
              )}
            </div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
              Payouts arrive 2–3 working days after you withdraw
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/contributor/payout')} style={{ color: 'var(--action-primary)', gap: 'var(--space-2)' }}>
            <Pencil size={14} /> Edit
          </Button>
        </div>
      </div>

      {/* Ledger */}
      <div className="px-6">
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)'}}>
          {([
            { id: 'all', label: 'All' },
            { id: 'earning', label: 'Earnings' },
            { id: 'withdrawal', label: 'Withdrawals' },
          ] as const).map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant={tab === t.id ? 'primary' : 'secondary'}
              onClick={() => setTab(t.id)}
              style={{ borderRadius: 'var(--r-full)', fontWeight: 700 }}
            >
              {t.label}
            </Button>
          ))}
        </div>

        {/* Weekly 7-pill filter — drives the ledger below */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-7)', overflowX: 'auto', paddingBottom: 'var(--space-1)' }}>
          {WEEKDAYS.map((d) => (
            <Button
              key={d}
              size="sm"
              variant={weekDay === d ? 'primary' : 'secondary'}
              onClick={() => setWeekDay(weekDay === d ? null : d)}
              style={{ flexShrink: 0, minWidth: 44, height: 44, borderRadius: 'var(--r-full)', fontWeight: 700, fontSize: 'var(--fs-caption)' }}
            >
              {d}
            </Button>
          ))}
        </div>

        {entries.length === 0 ? (
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', padding: 'var(--space-11) var(--space-2)', textAlign: 'center' }}>
            Nothing here yet.
          </p>
        ) : (
          entries.map((e) => (
            <LedgerRow
              key={e.id}
              title={e.title}
              sub={e.note ? `${e.date} · ${e.note}` : e.date}
              amount={e.amount}
              kind={e.status}
              debit={e.kind === 'withdrawal'}
              statusLabel={e.kind === 'withdrawal' ? 'Withdrawn' : e.status === 'failed' ? 'Rejected' : undefined}
              struck={e.status === 'failed'}
              onClick={() => setDetail(e)}
            />
          ))
        )}
      </div>

      {/* Sticky withdraw */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 z-40"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-ground) 34%)' }}>
        {belowFloor && !empty && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', justifyContent: 'center' }}>
            <Info size={14} style={{ color: 'var(--money-pending)' }} />
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              ₹{gap.toFixed(0)} more to withdraw
            </span>
          </div>
        )}
        <Button
          full size="lg"
          disabled={belowFloor}
          onClick={() => navigate('/contributor/payout')}
        >
          {belowFloor ? `Withdraw (min ₹${WITHDRAW_MIN})` : 'Withdraw'}
        </Button>
      </div>

      {/* Transaction detail */}
      <Sheet open={!!detail} onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)'}}>
              <h3 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)', margin: '0'}}>{detail.title}</h3>
              <StatusBadge
                kind={detail.status}
                label={detail.kind === 'withdrawal' ? 'Withdrawn' : undefined}
              />
            </div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '0 0 14px' }}>{detail.date}</p>

            {detail.kind === 'withdrawal' ? (
              <ReceiptCard
                refNum={`FUL-${String(detail.id).padStart(6, '0')}`}
                to={profile?.upiId || 'yourname@bank'}
                amount={detail.amount}
                date={detail.date}
              />
            ) : detail.breakdown ? (
              <AmountBreakdown {...detail.breakdown} />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 'var(--space-5) 0', borderTop: '1px solid var(--divider)' }}>
                <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>Amount</span>
                <Amount value={detail.amount} size={22} color={detail.status === 'failed' ? 'var(--text-muted)' : 'var(--money-figure)'} />
              </div>
            )}

            {detail.note && (
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 'var(--space-7)'}}>
                {detail.note}
              </p>
            )}

            {detail.status === 'failed' && detail.quest && (
              <div style={{ marginTop: 'var(--space-8)'}}>
                <Button full size="md" variant="secondary" onClick={() => { setDetail(null); navigate(`/recording/${detail.quest}`); }}>
                  Re-record this job
                </Button>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
}

function Barcode() {
  const bars = [3, 5, 2, 6, 4, 3, 5, 2, 6, 3, 4, 5, 2, 6];
  return (
    <div aria-hidden style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-1)', height: 18, marginTop: 'var(--space-3)' }}>
      {bars.map((h, i) => (
        <span key={i} style={{ width: 2, height: `${h * 3}px`, background: 'var(--border-strong)', borderRadius: 'var(--r-full)', opacity: 0.85 }} />
      ))}
    </div>
  );
}
