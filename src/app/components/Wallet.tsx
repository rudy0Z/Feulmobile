import { useState } from 'react';
import { SilverTierReserveDrawer } from './SilverTierReserveDrawer';
import { useNavigate } from 'react-router';
import { useDevContext } from '../lib/DevContext';
import { Wallet as WalletIcon, TrendingUp, Clock, CheckCircle2, Info, Pencil, Zap, ArrowRight, CreditCard, AlertCircle } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { motion } from 'motion/react';
import { Lock, Mic, Gift } from 'lucide-react';

type TxStatus = 'credited' | 'pending' | 'processing' | 'partial';

interface Transaction {
  id: number;
  quest: string;
  date: string;
  amount: number;
  status: TxStatus;
  note?: string;
}

const transactions: Transaction[] = [
  { id: 1, quest: 'Morning News Reading',      date: 'Today, 9:30 AM',      amount: 15.00, status: 'credited'   },
  { id: 2, quest: 'Product Descriptions',      date: 'Today, 7:15 AM',      amount: 25.00, status: 'pending',   note: 'Under validator review' },
  { id: 3, quest: 'Conversational Dialogue',   date: 'Yesterday, 3:00 PM',  amount: 35.00, status: 'credited'   },
  { id: 4, quest: 'Short Story Narration',     date: 'Mon, Feb 24',         amount: 50.00, status: 'credited'   },
  { id: 5, quest: 'Quick Phrases (partial)',   date: 'Mon, Feb 24',         amount: 1.50,  status: 'partial',   note: '10% effort credit — re-record to earn full ₹10' },
  { id: 6, quest: 'Customer Service Dialogue', date: 'Sun, Feb 23',         amount: 20.00, status: 'processing' },
];

const statusConfig: Record<TxStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  credited:   { label: 'Credited',      bg: 'var(--status-success-bg)', text: 'var(--status-success-text)', icon: CheckCircle2 },
  pending:    { label: 'In Review',     bg: 'var(--warning-50)', text: 'var(--status-warning-text)', icon: Clock         },
  processing: { label: 'Processing',    bg: 'var(--status-info-bg)', text: 'var(--status-info-text)', icon: Clock         },
  partial:    { label: 'Effort Credit', bg: 'var(--warning-50)', text: 'var(--status-warning-text)', icon: Info          },
};

const totalBalance   = 127.50;
const pendingBalance = 60.00;

export function Wallet() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const [activeFilter, setActiveFilter]           = useState<'all' | TxStatus>('all');
  const [showReserveDrawer, setShowReserveDrawer] = useState(false);

  const filtered = activeFilter === 'all'
    ? transactions
    : transactions.filter(t => t.status === activeFilter);

  /* ── New User Wallet Empty State ── */
  if (dev.walletEmpty) {
    return (
      <div className="min-h-screen pb-28" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
        <div className="px-6 pt-16 pb-4">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Wallet</h1>
        </div>

        {/* Locked Potential Card */}
        <div className="px-6 mb-5">
          <div style={{
            background: 'var(--navy)', borderRadius: 20, padding: '28px 24px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 20px 20px', opacity: 0.10 }}>
              <Waveform color="#F5C49A" opacity={1} height={60} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Goal ring — empty */}
              <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 20 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeDasharray="8 4" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="var(--accent-primary-deep)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 52 * 0.85 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Lock className="w-5 h-5 mb-1" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                    ₹0
                  </p>
                </div>
              </div>

              <p style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
                Unlock your first ₹50
              </p>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 260 }}>
                Complete the voice calibration to earn your welcome bonus instantly.
              </p>
            </div>
          </div>
        </div>

        {/* What you'll earn section */}
        <div className="px-6 mb-6">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            How Earnings Work
          </h3>
          {[
            { icon: Mic, label: 'Record audio clips', desc: 'Earn ₹10–50 per quest', color: 'var(--accent-primary-deep)' },
            { icon: CheckCircle2, label: 'Clips get validated', desc: 'Auto-check or validator review', color: 'var(--color-success)' },
            { icon: WalletIcon, label: 'Cash hits your wallet', desc: 'Withdraw via UPI anytime', color: 'var(--text-primary)' },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-center gap-4 py-3" style={{
                borderBottom: idx < 2 ? '1px solid var(--card-border)' : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: 'var(--neutral-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{step.label}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Welcome bonus teaser */}
        <div className="px-6">
          <div className="flex items-center gap-3" style={{
            background: 'var(--status-accent-bg)', borderRadius: 14, padding: '14px 18px',
            border: '1px solid var(--accent-200)',
          }}>
            <Gift className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-primary-deep)' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-accent-text)' }}>Welcome Bonus: ₹50</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--accent-primary-deep)' }}>Complete voice calibration to claim</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fixed bottom-16 left-0 right-0 px-6 py-4 z-40" style={{ background: 'linear-gradient(to bottom, transparent, var(--background) 30%)' }}>
          <button
            onClick={() => navigate('/first-earning')}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: 'var(--accent-primary-deep)', color: '#FFFFFF',
              fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196,98,45,0.30)',
            }}
          >
            Start Earning Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Wallet</h1>
      </div>

      {/* Balance Card — NAVY */}
      <div className="px-6 mb-5">
        <div
          style={{
            background: 'radial-gradient(ellipse at 20% 35%, rgba(196,98,45,0.20) 0%, transparent 52%), linear-gradient(150deg, #0F1822 0%, #0A0C10 100%)',
            borderRadius: 20,
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 20px 20px', opacity: 0.10 }}>
            <Waveform color="#F5C49A" opacity={1} height={48} />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Cash Balance
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  ₹{totalBalance.toFixed(2)}
                </p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>
                  Available to withdraw
                </p>
              </div>
              <div
                style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(196,98,45,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <WalletIcon className="w-6 h-6" style={{ color: 'var(--accent-primary-deep)' }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                    Security Reserve
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--warning-700)', fontSize: 16, fontWeight: 600 }}>
                    ₹{pendingBalance.toFixed(2)}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>
                    Clears when you reach Silver
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-primary-deep)' }} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary-deep)' }}>+₹185.00 this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPI linked */}
      <div className="px-6 mb-4">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--card-border)' }}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>alex@upi</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>UPI ID linked · payouts every Monday</p>
            </div>
          </div>
          <button
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-primary-deep)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>
      </div>

      {/* Payout Info — no card wrapper */}
      <div className="px-6 mb-5">
        <div className="flex items-start gap-3 px-1 py-3">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--warning-700)' }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--status-warning-text)', lineHeight: 1.5 }}>
            Minimum withdrawal: <strong style={{ color: 'var(--text-primary)' }}>₹50</strong>. Processing: 2–3 business days after Monday payout cycle.
          </p>
        </div>
      </div>

      {/* XP teaser — naked divider style */}
      <div className="px-6 mb-5">
        <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4" style={{ color: 'var(--warning-700)' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>1,530 reputation · Trusted Contributor</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Unlocks tier perks, not withdrawable</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/contributor/profile')}
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning-700)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Perks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {(['all', 'credited', 'pending', 'partial'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                whiteSpace: 'nowrap', border: '1.5px solid',
                background: activeFilter === f ? 'var(--accent-primary-deep)' : '#FFFFFF',
                borderColor: activeFilter === f ? 'var(--accent-primary-deep)' : 'var(--card-border)',
                color: activeFilter === f ? '#FFFFFF' : 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? 'All' : f === 'credited' ? 'Credited' : f === 'pending' ? 'In Review' : 'Effort Credit'}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Ledger */}
      <div className="px-6">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
          Earnings Ledger
        </h3>

        <div>
          {filtered.map((tx, idx) => {
            const cfg = statusConfig[tx.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={tx.id}
                style={{
                  padding: '14px 0',
                  borderBottom: idx < filtered.length - 1 ? '1px solid var(--card-border)' : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{tx.quest}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{tx.date}</p>
                    {tx.note && (
                      <p style={{ fontSize: 11, fontWeight: 500, color: cfg.text, marginTop: 4, lineHeight: 1.4 }}>
                        {tx.note}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700,
                        color: tx.status === 'credited' ? 'var(--accent-primary-deep)' : tx.status === 'partial' ? 'var(--warning-700)' : 'var(--text-secondary)',
                      }}
                    >
                      {tx.status === 'credited' ? '+' : ''}₹{tx.amount.toFixed(2)}
                    </span>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                        background: cfg.bg, color: cfg.text,
                      }}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Withdraw CTA */}
      <div
        className="fixed bottom-16 left-0 right-0 px-6 py-4 z-40"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background) 30%)' }}
      >
        <button
          style={{
            width: '100%',
            height: 56,
            borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0px 8px 24px rgba(196,98,45,0.38), inset 0px 1px 0px rgba(255,255,255,0.18)',
          }}
          onClick={() => dev.tierLockBypassed ? navigate('/contributor/payout') : setShowReserveDrawer(true)}
        >
          Withdraw Funds
        </button>
      </div>

      {showReserveDrawer && (
        <SilverTierReserveDrawer
          onClose={() => setShowReserveDrawer(false)}
          onStartQuests={() => { setShowReserveDrawer(false); navigate('/contributor/quests'); }}
        />
      )}
    </div>
  );
}