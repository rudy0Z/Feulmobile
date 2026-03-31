import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Wallet as WalletIcon, TrendingUp, Clock, CheckCircle2, Info, Pencil, Zap, ArrowRight, CreditCard, AlertCircle } from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
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
  credited:   { label: 'Credited',      bg: '#E6F4EC', text: '#1A5C35', icon: CheckCircle2 },
  pending:    { label: 'Pending',       bg: '#FEF7E6', text: '#6B4800', icon: Clock         },
  processing: { label: 'Processing',   bg: '#E8EFF8', text: '#1E3A6E', icon: Clock         },
  partial:    { label: 'Effort Credit', bg: '#FDF5E0', text: '#6B4800', icon: Info          },
};

const totalBalance   = 127.50;
const pendingBalance = 60.00;

export function Wallet() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | TxStatus>('all');
  const [showEmpty, setShowEmpty] = useState(false);

  const filtered = activeFilter === 'all'
    ? transactions
    : transactions.filter(t => t.status === activeFilter);

  /* ── New User Wallet Empty State ── */
  if (showEmpty) {
    return (
      <div className="min-h-screen pb-28" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
        <div className="px-6 pt-8 pb-2 flex items-center justify-between">
          <FeulLogo />
          <button
            onClick={() => setShowEmpty(false)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            Show wallet
          </button>
        </div>

        <div className="px-6 pt-2 pb-4">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>
            Wallet
          </h1>
        </div>

        {/* Locked Potential Card */}
        <div className="px-6 mb-5">
          <div style={{
            background: '#1A1F2E', borderRadius: 20, padding: '28px 24px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
              <Waveform color="#F5C49A" opacity={1} height={60} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Goal ring — empty */}
              <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 20 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeDasharray="8 4" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="#C4622D" strokeWidth="6" strokeLinecap="round"
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
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434', marginBottom: 12 }}>
            How Earnings Work
          </h3>
          {[
            { icon: Mic, label: 'Record audio clips', desc: 'Earn ₹10–50 per quest', color: '#C4622D' },
            { icon: CheckCircle2, label: 'Clips get validated', desc: 'Auto-check or validator review', color: '#2D7A4F' },
            { icon: WalletIcon, label: 'Cash hits your wallet', desc: 'Withdraw via UPI anytime', color: '#1C2434' },
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

        {/* Welcome bonus teaser */}
        <div className="px-6">
          <div className="flex items-center gap-3" style={{
            background: '#FEF0E8', borderRadius: 14, padding: '14px 18px',
            border: '1px solid #F2C4AD',
          }}>
            <Gift className="w-5 h-5 flex-shrink-0" style={{ color: '#C4622D' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#8B3000' }}>Welcome Bonus: ₹50</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#C4622D' }}>Complete voice calibration to claim</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fixed bottom-16 left-0 right-0 px-6 py-4 z-40" style={{ background: 'linear-gradient(transparent, #F8F9FA 30%)' }}>
          <button
            onClick={() => navigate('/first-earning')}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: '#C4622D', color: '#FFFFFF',
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
    <div className="min-h-screen pb-28" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <FeulLogo />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmpty(true)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            Empty state
          </button>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#8896A7' }}>Earnings & Payouts</span>
        </div>
      </div>

      <div className="px-6 pt-2 pb-4">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>
          Wallet
        </h1>
      </div>

      {/* Balance Card — NAVY */}
      <div className="px-6 mb-5">
        <div
          style={{
            background: '#1A1F2E',
            borderRadius: 20,
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
            <Waveform color="#F5C49A" opacity={1} height={60} />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#C4622D', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
                <WalletIcon className="w-6 h-6" style={{ color: '#C4622D' }} />
              </div>
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
                  <TrendingUp className="w-4 h-4" style={{ color: '#C4622D' }} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#C4622D' }}>+₹185.00 this week</p>
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
          style={{ borderBottom: '1px solid #E8EDF3' }}
        >
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

      {/* Payout Info — no card wrapper */}
      <div className="px-6 mb-5">
        <div className="flex items-start gap-3 px-1 py-3">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B8860B' }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B4800', lineHeight: 1.5 }}>
            Minimum withdrawal: <strong style={{ color: '#1C2434' }}>₹50</strong>. Processing: 2–3 business days after Monday payout cycle.
          </p>
        </div>
      </div>

      {/* XP teaser — naked divider style */}
      <div className="px-6 mb-5">
        <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #E8EDF3', borderBottom: '1px solid #E8EDF3' }}>
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4" style={{ color: '#8B6914' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>1,530 XP · Level 3</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>Used for unlocking perks, not withdrawable</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/contributor/profile')}
            className="flex items-center gap-1"
            style={{ fontSize: 12, fontWeight: 700, color: '#8B6914', background: 'none', border: 'none', cursor: 'pointer' }}
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
                background: activeFilter === f ? '#C4622D' : '#FFFFFF',
                borderColor: activeFilter === f ? '#C4622D' : '#E8EDF3',
                color: activeFilter === f ? '#FFFFFF' : '#4A5568',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? 'All' : f === 'credited' ? 'Credited' : f === 'pending' ? 'Pending' : 'Effort Credit'}
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
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>{tx.quest}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{tx.date}</p>
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
                        color: tx.status === 'credited' ? '#C4622D' : tx.status === 'partial' ? '#8B6914' : '#4A5568',
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
          onClick={() => navigate('/contributor/payout')}
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
}