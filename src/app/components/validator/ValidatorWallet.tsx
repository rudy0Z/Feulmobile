import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Wallet as WalletIcon, TrendingUp, Clock, CheckCircle2,
  Info, Pencil, Zap, ArrowRight, CreditCard, ShieldCheck,
  Star, ArrowUpRight, Target,
} from 'lucide-react';

import { Waveform } from '../ui/Waveform';
import { motion } from 'motion/react';
import { Lock, Gift } from 'lucide-react';

type TxStatus = 'credited' | 'pending' | 'processing' | 'bonus';

interface Transaction {
  id: number;
  batch: string;
  date: string;
  clips: number;
  amount: number;
  status: TxStatus;
  accuracyPct?: number;
  note?: string;
}

const transactions: Transaction[] = [
  { id: 1, batch: 'Hindi — Waiter Scenario',     date: 'Today, 10:15 AM',     clips: 45, amount: 90.00,  status: 'credited',   accuracyPct: 96   },
  { id: 2, batch: 'English — Product Reviews',   date: 'Today, 8:40 AM',      clips: 32, amount: 64.00,  status: 'pending',    note: 'Under quality audit — credited within 24 h' },
  { id: 3, batch: 'Accuracy Streak Bonus',       date: 'Yesterday, 11:00 PM', clips: 0,  amount: 25.00,  status: 'bonus',      note: '5-day streak · 95%+ daily accuracy' },
  { id: 4, batch: 'Tech Support Dialogue',        date: 'Yesterday, 3:20 PM',  clips: 15, amount: 30.00,  status: 'credited',   accuracyPct: 93   },
  { id: 5, batch: 'Casual Chat Scripts',          date: 'Mon, Feb 24',         clips: 18, amount: 36.00,  status: 'credited',   accuracyPct: 98   },
  { id: 6, batch: 'Spanish — Customer Service',  date: 'Sun, Feb 23',         clips: 28, amount: 56.00,  status: 'processing'  },
  { id: 7, batch: 'Top Validator Bonus',          date: 'Sun, Feb 23',         clips: 0,  amount: 50.00,  status: 'bonus',      note: 'Top 10% validator this week' },
  { id: 8, batch: 'Morning Conversations',        date: 'Sat, Feb 22',         clips: 20, amount: 40.00,  status: 'credited',   accuracyPct: 96   },
];

const statusConfig: Record<TxStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  credited:   { label: 'Credited',   bg: '#E6F4EC', text: '#1A5C35', icon: CheckCircle2 },
  pending:    { label: 'Pending',    bg: '#FEF7E6', text: '#6B4800', icon: Clock        },
  processing: { label: 'Processing', bg: '#E8EFF8', text: '#1E3A6E', icon: Clock        },
  bonus:      { label: 'Bonus',      bg: '#EFF6E8', text: '#2C5F1A', icon: Star         },
};

const totalBalance   = 568.00;
const pendingBalance = 64.00;
const weeklyEarned   = 254.00;
const perClipRate    = 2.00;

export function ValidatorWallet() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | TxStatus>('all');
  const [showEmpty, setShowEmpty] = useState(false);

  const filtered = activeFilter === 'all'
    ? transactions
    : transactions.filter(t => t.status === activeFilter);

  /* ── Empty / New Validator State ── */
  if (showEmpty) {
    return (
      <div className="min-h-screen pb-28" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
        <div className="px-6 pt-16 pb-4 flex items-center justify-between">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>Earnings</h1>
          <button
            onClick={() => setShowEmpty(false)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            Show wallet
          </button>
        </div>

        {/* Locked Potential Card */}
        <div className="px-6 mb-5">
          <div style={{
            background: '#1A1F2E', borderRadius: 20, padding: '28px 24px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.07 }}>
              <Waveform color="#FFFFFF" opacity={1} height={60} variant="precision" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 20 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeDasharray="8 4" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="#5A7B6D" strokeWidth="6" strokeLinecap="round"
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
                Grade your first batch
              </p>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 260 }}>
                Complete a grading batch to unlock your first earnings. Each clip pays ₹{perClipRate.toFixed(2)}.
              </p>
            </div>
          </div>
        </div>

        {/* How earnings work */}
        <div className="px-6 mb-6">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434', marginBottom: 12 }}>
            How Grading Pay Works
          </h3>
          {[
            { icon: ShieldCheck, label: 'Grade audio clips',     desc: `₹${perClipRate.toFixed(2)} per clip graded`, color: '#5A7B6D' },
            { icon: Target,      label: 'Hit accuracy targets',  desc: 'Earn accuracy bonuses for 95%+', color: '#C4622D'  },
            { icon: WalletIcon,  label: 'Cash hits your wallet', desc: 'Withdraw via UPI every Monday',  color: '#1C2434'  },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-center gap-4 py-3" style={{
                borderBottom: idx < 2 ? '1px solid #E8EDF3' : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: '#F0F4F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>{step.label}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* First batch bonus teaser */}
        <div className="px-6">
          <div className="flex items-center gap-3" style={{
            background: '#EFF6E8', borderRadius: 14, padding: '14px 18px',
            border: '1px solid #C3DDBA',
          }}>
            <Gift className="w-5 h-5 flex-shrink-0" style={{ color: '#2C5F1A' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A3A0F' }}>First Batch Bonus: ₹25</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#3D7A28' }}>Complete any grading batch to claim</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fixed bottom-16 left-0 right-0 px-6 py-4 z-40" style={{ background: 'linear-gradient(transparent, #F8F9FA 30%)' }}>
          <button
            onClick={() => navigate('/validator/tasks')}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: '#C4622D', color: '#FFFFFF',
              fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196,98,45,0.30)',
            }}
          >
            Start Grading Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>Earnings</h1>
        <button
          onClick={() => setShowEmpty(true)}
          style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
        >
          Empty state
        </button>
      </div>

      {/* Balance Card — ink-navy */}
      <div className="px-6 mb-5">
        <div style={{
          background: '#1A1F2E',
          borderRadius: 20,
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.07 }}>
            <Waveform color="#FFFFFF" opacity={1} height={60} variant="precision" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#5A7B6D', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Grading Balance
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  ₹{totalBalance.toFixed(2)}
                </p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>
                  Available to withdraw
                </p>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(90,123,109,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck className="w-6 h-6" style={{ color: '#5A7B6D' }} />
              </div>
            </div>

            {/* Per-clip rate pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.05)', borderRadius: 999,
              padding: '5px 12px', marginBottom: 14,
            }}>
              <Target className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.35)' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
                ₹{perClipRate.toFixed(2)} per clip · accuracy bonuses apply
              </span>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>Pending</p>
                  <p style={{ fontFamily: 'var(--font-mono)', color: '#B8860B', fontSize: 16, fontWeight: 600 }}>
                    ₹{pendingBalance.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4" style={{ color: '#C4622D' }} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#C4622D' }}>+₹{weeklyEarned.toFixed(2)} this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy bonus strip */}
      <div className="px-6 mb-4">
        <div style={{
          background: '#EFF6E8', borderRadius: 14, padding: '12px 16px',
          border: '1px solid #C3DDBA',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4" style={{ color: '#2C5F1A' }} strokeWidth={2} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A3A0F' }}>Accuracy Bonus Active</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#3D7A28' }}>94.8% avg · +20% on next batch</p>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#2C5F1A' }}>
            +20%
          </div>
        </div>
      </div>

      {/* UPI linked */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #E8EDF3' }}>
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4" style={{ color: '#2D7A4F' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1C2434' }}>alex@upi</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>UPI ID linked · payouts every Monday</p>
            </div>
          </div>
          <button
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 600, color: '#C4622D', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>
      </div>

      {/* Payout Info */}
      <div className="px-6 mb-5">
        <div className="flex items-start gap-3 px-1 py-3">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B8860B' }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B4800', lineHeight: 1.5 }}>
            Minimum withdrawal: <strong style={{ color: '#1C2434' }}>₹100</strong>. Bonus credits are released after 48 h quality audit passes.
          </p>
        </div>
      </div>

      {/* XP teaser */}
      <div className="px-6 mb-5">
        <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #E8EDF3', borderBottom: '1px solid #E8EDF3' }}>
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4" style={{ color: '#5A7B6D' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>2,840 XP · Level 4 Validator</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>Used for unlocking perks · not withdrawable</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/validator/rewards')}
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 700, color: '#5A7B6D', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Perks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {(['all', 'credited', 'bonus', 'pending'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                whiteSpace: 'nowrap', border: '1.5px solid',
                background: activeFilter === f ? '#C4622D' : '#FFFFFF',
                borderColor: activeFilter === f ? '#C4622D' : '#E8EDF3',
                color: activeFilter === f ? '#FFFFFF' : '#4A5568',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? 'All' : f === 'credited' ? 'Credited' : f === 'bonus' ? 'Bonuses' : 'Pending'}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Ledger */}
      <div className="px-6">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434', marginBottom: 14 }}>
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
                  borderBottom: idx < filtered.length - 1 ? '1px solid #E8EDF3' : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>{tx.batch}</p>
                    <div className="flex items-center gap-2">
                      <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{tx.date}</p>
                      {tx.clips > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#8896A7' }}>· {tx.clips} clips</span>
                      )}
                    </div>
                    {tx.note && (
                      <p style={{ fontSize: 11, fontWeight: 500, color: cfg.text, marginTop: 4, lineHeight: 1.4 }}>
                        {tx.note}
                      </p>
                    )}
                    {tx.accuracyPct && (
                      <p style={{ fontSize: 11, fontWeight: 600, color: '#2D7A4F', marginTop: 4 }}>
                        {tx.accuracyPct}% accuracy
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700,
                      color: tx.status === 'credited' ? '#C4622D'
                           : tx.status === 'bonus'    ? '#2C5F1A'
                           : '#4A5568',
                    }}>
                      {(tx.status === 'credited' || tx.status === 'bonus') ? '+' : ''}₹{tx.amount.toFixed(2)}
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
        style={{ background: 'linear-gradient(transparent, #F8F9FA 30%)' }}
      >
        <button
          style={{
            width: '100%',
            height: 56,
            borderRadius: 999,
            background: '#C4622D',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0px 4px 16px rgba(196,98,45,0.30)',
          }}
          onClick={() => navigate('/validator/payout')}
        >
          Withdraw ₹{totalBalance.toFixed(2)}
        </button>
      </div>
    </div>
  );
}