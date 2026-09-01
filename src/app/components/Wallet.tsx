import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Pencil, Info, CheckCircle2 } from 'lucide-react';
import {
  Amount, StatTile, LedgerRow, Button, Sheet, StatusBadge, AmountBreakdown,
  useCountUp, type StatusKind,
} from './ui/Primitives';
import { useDevContext } from '../lib/DevContext';
import { useSession } from '../lib/session';

/* ═══════════════════════════════════════════════════════════════════
   Wallet — the LEDGER, not the hero. Home has the one 48px ₹; the
   Wallet is a bento of four figures + an honest, tabbed ledger. Every
   pending amount says what it waits on. No Security Reserve, no
   XP-as-money. Withdrawal floor is ₹100, stated as an exact gap.
   ═══════════════════════════════════════════════════════════════════ */

const WITHDRAW_FLOOR = 100;

type LedgerKind = 'earning' | 'withdrawal';
interface Entry {
  id: number;
  kind: LedgerKind;
  title: string;
  date: string;
  amount: number;
  status: StatusKind;
  /** Honest note: what a pending amount is waiting on, or a bonus reason. */
  note?: string;
  /** A quality bonus rendered as its own line item. */
  bonus?: { label: string; amount: number };
  quest?: string;
  breakdown?: { basePay: number; coverageMult: number; bonus: number };
}

const LEDGER: Entry[] = [
  { id: 1, kind: 'earning', title: 'Morning news reading', quest: 'q-lines-1', date: 'Today · 9:30 AM', amount: 15, status: 'settled',
    breakdown: { basePay: 15, coverageMult: 1, bonus: 0 } },
  { id: 2, kind: 'earning', title: 'Product descriptions', quest: 'q-lines-2', date: 'Today · 7:15 AM', amount: 25, status: 'pending',
    note: 'Waiting on a validator to review 2 clips', breakdown: { basePay: 25, coverageMult: 1, bonus: 0 } },
  { id: 3, kind: 'earning', title: 'Clarity bonus', date: 'Yesterday · 6:00 PM', amount: 8, status: 'settled',
    note: 'Top-quartile clarity on 5 clips', bonus: { label: 'Clarity bonus', amount: 8 } },
  { id: 4, kind: 'earning', title: 'Conversational dialogue', quest: 'q-scen-1', date: 'Yesterday · 3:00 PM', amount: 35, status: 'settled',
    breakdown: { basePay: 22, coverageMult: 1.4, bonus: 4 } },
  { id: 5, kind: 'withdrawal', title: 'Withdrawal to alex@okaxis', date: 'Mon · Feb 24', amount: 120, status: 'settled' },
  { id: 6, kind: 'earning', title: 'Quick phrases', quest: 'q-lines-3', date: 'Mon · Feb 24', amount: 0, status: 'failed',
    note: 'Background noise on all clips — re-record to earn ₹10' },
];

export function Wallet() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const [tab, setTab] = useState<'all' | 'earning' | 'withdrawal'>('all');
  const [detail, setDetail] = useState<Entry | null>(null);

  const empty = dev.walletEmpty;

  /* Live figures — bento cells, animated from the previous value. */
  const available = empty ? 0 : 127.5;
  const pending   = empty ? 0 : 25;
  const thisWeek  = empty ? 0 : 91;
  const total     = empty ? 0 : 208.5;

  const belowFloor = available < WITHDRAW_FLOOR;
  const gap = Math.max(0, WITHDRAW_FLOOR - available);

  const entries = LEDGER.filter((e) => tab === 'all' || e.kind === tab);

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-16 pb-3">
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Wallet
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>
          {empty ? 'Your earnings will appear here after your first review.' : 'Everything you have earned and withdrawn.'}
        </p>
      </div>

      {/* Bento — four figures, no hero */}
      <div className="px-6 mb-5" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <BentoCell label="Available" value={available} tone="positive" />
        <BentoCell label="In review" value={pending} tone="pending" />
        <BentoCell label="This week" value={thisWeek} tone="neutral" />
        <BentoCell label="Total earned" value={total} tone="neutral" />
      </div>

      {/* UPI destination + name-match */}
      <div className="px-6 mb-5">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--r-md)', padding: '14px 16px',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                {profile?.upiId || 'alex@okaxis'}
              </span>
              {(profile?.upiNameMatched ?? true) && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: 'var(--t-verdigris-700)' }}>
                  <CheckCircle2 size={13} strokeWidth={2.5} /> Name matched
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>
              Payouts arrive 2–3 working days after you withdraw
            </p>
          </div>
          <button
            onClick={() => navigate('/contributor/payout')}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', fontSize: 13, fontWeight: 700 }}
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>

      {/* Ledger */}
      <div className="px-6">
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {([
            { id: 'all', label: 'All' },
            { id: 'earning', label: 'Earnings' },
            { id: 'withdrawal', label: 'Withdrawals' },
          ] as const).map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '7px 16px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', border: '1px solid',
                  background: active ? 'var(--action-primary)' : 'var(--surface-raised)',
                  borderColor: active ? 'var(--action-primary)' : 'var(--border-subtle)',
                  color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {entries.length === 0 ? (
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', padding: '28px 4px', textAlign: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, justifyContent: 'center' }}>
            <Info size={14} style={{ color: 'var(--money-pending)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              Earn <Amount value={gap} size={13} color="var(--text-primary)" /> more to withdraw
            </span>
          </div>
        )}
        <Button
          full size="lg"
          disabled={belowFloor}
          onClick={() => navigate('/contributor/payout')}
        >
          {belowFloor ? `Withdraw (min ₹${WITHDRAW_FLOOR})` : 'Withdraw'}
        </Button>
      </div>

      {/* Transaction detail */}
      <Sheet open={!!detail} onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{detail.title}</h3>
              <StatusBadge
                kind={detail.status}
                label={detail.kind === 'withdrawal' ? 'Withdrawn' : undefined}
              />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', margin: '0 0 14px' }}>{detail.date}</p>

            {detail.kind === 'withdrawal' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderTop: '1px solid var(--divider)' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>Sent to {profile?.upiId || 'alex@okaxis'}</span>
                <Amount value={detail.amount} size={22} />
              </div>
            ) : detail.breakdown ? (
              <AmountBreakdown {...detail.breakdown} />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderTop: '1px solid var(--divider)' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>Amount</span>
                <Amount value={detail.amount} size={22} color={detail.status === 'failed' ? 'var(--text-muted)' : 'var(--money-figure)'} />
              </div>
            )}

            {detail.note && (
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 14 }}>
                {detail.note}
              </p>
            )}

            {detail.status === 'failed' && detail.quest && (
              <div style={{ marginTop: 16 }}>
                <Button full size="md" variant="secondary" onClick={() => { setDetail(null); navigate(`/recording/${detail.quest}`); }}>
                  Re-record this quest
                </Button>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
}

function BentoCell({ label, value, tone }: { label: string; value: number; tone: 'neutral' | 'positive' | 'pending' }) {
  const shown = useCountUp(value);
  const color = tone === 'positive' ? 'var(--money-positive)'
    : tone === 'pending' ? 'var(--money-pending)' : 'var(--money-figure)';
  return (
    <StatTile label={label} tone={tone} value={<Amount value={shown} size={24} color={color} />} />
  );
}
