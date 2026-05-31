import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Gift, Award, Lock, Check, Zap, ArrowLeft,
  ShieldCheck, Star, Target, Clock, Sparkles,
} from 'lucide-react';

// Validator XP Rewards Hub
// Sage-green (#5A7B6D) accent for all validator-XP elements (distinct from contributor gold)

const rewardCategories = [
  { id: 'all',       label: 'All'          },
  { id: 'vouchers',  label: 'Vouchers'     },
  { id: 'perks',     label: 'Validator Perks' },
  { id: 'exclusive', label: 'Exclusive'    },
];

interface RewardItem {
  id: string;
  name: string;
  description: string;
  xpCost: number;
  emoji: string;
  category: string;
  available: boolean;
  redeemed: boolean;
}

const rewards: RewardItem[] = [
  // Vouchers (same marketplace, validators earn same vouchers)
  { id: 'v-1', name: '₹500 Swiggy Voucher',    description: 'Food delivery credit',                         xpCost: 5000, emoji: '🍔', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-2', name: '₹200 Amazon Gift Card',  description: 'Shop anything on Amazon',                      xpCost: 2000, emoji: '🛒', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-3', name: '₹100 BookMyShow',         description: 'Movie tickets & events',                       xpCost: 1000, emoji: '🎬', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-4', name: '₹300 Flipkart Voucher',  description: 'Electronics & fashion deals',                  xpCost: 3000, emoji: '🛍️', category: 'vouchers', available: true,  redeemed: false },
  // Validator-specific perks
  { id: 'p-1', name: 'Priority Batch Access',  description: 'Pick high-payout batches before anyone else',  xpCost: 800,  emoji: '⚡', category: 'perks',    available: true,  redeemed: true  },
  { id: 'p-2', name: 'Language Pack Unlock',   description: 'Add a new language to your grading queue',     xpCost: 1200, emoji: '🌐', category: 'perks',    available: true,  redeemed: false },
  { id: 'p-3', name: 'Streak Shield',          description: 'Protect a daily streak miss — used once',      xpCost: 600,  emoji: '🛡️', category: 'perks',   available: true,  redeemed: false },
  { id: 'p-4', name: 'XP Multiplier (3 days)', description: '2× XP on all batches graded for 3 days',       xpCost: 1500, emoji: '🔥', category: 'perks',    available: true,  redeemed: false },
  // Exclusive (gated)
  { id: 'e-1', name: 'Validator Gold Badge',   description: 'Prestigious gold badge on your profile (Lv 6+)', xpCost: 10000, emoji: '🏅', category: 'exclusive', available: false, redeemed: false },
  { id: 'e-2', name: 'Direct Hire Unlock',     description: 'Get recruited by data buyers directly (Lv 8+)',  xpCost: 20000, emoji: '🤝', category: 'exclusive', available: false, redeemed: false },
];

const validatorXP   = 2840;
const validatorLevel = 4;
const nextLevelXP   = 3500;

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 16,
  border: '1px solid #E8EDF3',
  boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
};

export function ValidatorRewards() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const canAfford = (xp: number) => validatorXP >= xp;

  const handleRedeem = (item: RewardItem) => {
    navigate('/validator/rewards/claim', {
      state: {
        reward: {
          id: item.id,
          name: item.name,
          description: item.description,
          xpCost: item.xpCost,
          emoji: item.emoji,
          category: item.category,
          isValidator: true,
        },
      },
    });
  };

  const visible = activeCategory === 'all'
    ? rewards
    : rewards.filter(r => r.category === activeCategory);

  const voucherList   = visible.filter(r => r.category === 'vouchers');
  const perkList      = visible.filter(r => r.category === 'perks');
  const exclusiveList = visible.filter(r => r.category === 'exclusive');

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-16 pb-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/validator/profile')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FFFFFF', border: '1px solid #E8EDF3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em', marginBottom: 2 }}>
            XP Rewards Hub
          </h1>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568' }}>Spend your Validator XP on perks &amp; vouchers</p>
        </div>
      </div>

      {/* XP Balance Card — sage-green accent */}
      <div className="px-6 mb-4">
        <div style={{
          ...cardStyle,
          padding: '20px 24px',
          borderLeft: '4px solid #5A7B6D',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#8896A7', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Validator XP
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: '#1A3A2F', lineHeight: 1 }}>
                {validatorXP.toLocaleString()} XP
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 6 }}>
                Earned through grading accuracy · never expires
              </p>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: '#E8F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap className="w-7 h-7" style={{ color: '#5A7B6D' }} />
            </div>
          </div>

          {/* Level progress */}
          <div style={{ borderTop: '1px solid #E8EDF3', paddingTop: 14 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#5A7B6D' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1A3A2F' }}>
                  Level {validatorLevel} Validator
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                Lv {validatorLevel + 1} at {nextLevelXP.toLocaleString()} XP
              </span>
            </div>
            <div style={{ background: '#E8EDF3', borderRadius: 999, height: 6, overflow: 'hidden' }}>
              <div style={{
                background: '#5A7B6D',
                borderRadius: 999, height: 6,
                width: `${(validatorXP / nextLevelXP) * 100}%`,
                transition: 'width 0.6s ease',
              }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 6 }}>
              {nextLevelXP - validatorXP} XP to next level
            </p>
          </div>
        </div>
      </div>

      {/* How to earn XP */}
      <div className="px-6 mb-5">
        <div style={{ background: '#F0F6F4', borderRadius: 14, padding: '14px 16px', border: '1px solid #C9DDD8' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#1A3A2F', marginBottom: 8 }}>How you earn XP</p>
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { icon: Check,  label: '+5 XP',   desc: 'per clip'         },
              { icon: Target, label: '+50 XP',  desc: 'accuracy bonus'   },
              { icon: Star,   label: '+100 XP', desc: 'streak milestone' },
              { icon: Clock,  label: '+200 XP', desc: 'daily goal'       },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: '#5A7B6D' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#1A3A2F' }}>{item.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#5A7B6D' }}>{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {rewardCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '7px 18px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', border: '1.5px solid',
              background: activeCategory === cat.id ? '#5A7B6D' : '#FFFFFF',
              borderColor: activeCategory === cat.id ? '#5A7B6D' : '#E8EDF3',
              color: activeCategory === cat.id ? '#FFFFFF' : '#4A5568',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Partner Vouchers ── */}
      {voucherList.length > 0 && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-4 h-4" style={{ color: '#5A7B6D' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Partner Vouchers</h3>
          </div>
          <div className="space-y-3">
            {voucherList.map((voucher) => {
              const affordable = canAfford(voucher.xpCost);
              return (
                <div
                  key={voucher.id}
                  style={{
                    ...cardStyle, padding: '16px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    borderColor: affordable ? '#C9DDD8' : '#E8EDF3',
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#E8F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {voucher.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>{voucher.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{voucher.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#5A7B6D' }}>
                      <Zap className="w-3 h-3" />{voucher.xpCost.toLocaleString()}
                    </span>
                    <button
                      disabled={!affordable}
                      onClick={() => affordable && handleRedeem(voucher)}
                      style={{
                        fontSize: 12, fontWeight: 700,
                        padding: '5px 14px', borderRadius: 999, border: 'none',
                        background: affordable ? '#5A7B6D' : '#F0F4F8',
                        color: affordable ? '#FFFFFF' : '#8896A7',
                        cursor: affordable ? 'pointer' : 'not-allowed',
                      }}
                    >
                      {affordable ? 'Redeem' : 'Need more XP'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Validator Perks ── */}
      {perkList.length > 0 && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: '#5A7B6D' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Validator Perks</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {perkList.map((perk) => {
              const affordable = canAfford(perk.xpCost);
              const { redeemed } = perk;
              return (
                <div
                  key={perk.id}
                  style={{
                    ...cardStyle, padding: '16px',
                    opacity: redeemed ? 0.65 : 1,
                    borderColor: redeemed ? '#E8EDF3' : affordable ? '#C9DDD8' : '#E8EDF3',
                    background: redeemed ? '#F0F4F8' : '#FFFFFF',
                  }}
                >
                  {redeemed && (
                    <div className="flex justify-end mb-2">
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check className="w-3 h-3" style={{ color: '#5A7B6D' }} />
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 10 }}>{perk.emoji}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 4 }}>{perk.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#4A5568', marginBottom: 12, lineHeight: 1.45 }}>{perk.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#5A7B6D' }}>
                      <Zap className="w-3 h-3" />{perk.xpCost.toLocaleString()}
                    </span>
                    {redeemed
                      ? <span style={{ fontSize: 11, fontWeight: 600, color: '#5A7B6D' }}>Active</span>
                      : (
                        <button
                          disabled={!affordable}
                          onClick={() => affordable && handleRedeem(perk)}
                          style={{
                            fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: 'none',
                            background: affordable ? '#5A7B6D' : '#F0F4F8',
                            color: affordable ? '#FFFFFF' : '#8896A7',
                            cursor: affordable ? 'pointer' : 'not-allowed',
                          }}
                        >
                          {affordable ? 'Redeem' : 'Locked'}
                        </button>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Exclusive ── */}
      {exclusiveList.length > 0 && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4" style={{ color: '#5A7B6D' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Exclusive</h3>
          </div>
          <div className="space-y-3">
            {exclusiveList.map((item) => (
              <div key={item.id} style={{ ...cardStyle, padding: '18px', opacity: 0.7 }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434' }}>{item.name}</p>
                      <Lock className="w-3.5 h-3.5" style={{ color: '#8896A7' }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#4A5568', marginBottom: 4 }}>{item.description}</p>
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#5A7B6D' }}>
                      <Zap className="w-3 h-3" />{item.xpCost.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Gain More XP CTA ── */}
      <div className="px-6">
        <div style={{
          background: '#E8F2EE',
          borderRadius: 20,
          border: '1.5px solid #C9DDD8',
          padding: '24px',
          textAlign: 'center',
        }}>
          <ShieldCheck className="w-10 h-10 mx-auto mb-3" style={{ color: '#5A7B6D' }} strokeWidth={1.5} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 800, color: '#1A3A2F', marginBottom: 8 }}>
            Grade more, earn more XP
          </h3>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#2C5F4A', marginBottom: 20 }}>
            High accuracy earns bonus XP. Unlock exclusive validator perks.
          </p>
          <button
            onClick={() => navigate('/validator/tasks')}
            style={{
              background: '#5A7B6D', color: '#FFFFFF',
              padding: '12px 32px', borderRadius: 999,
              fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Open Tasks
          </button>
        </div>
      </div>
    </div>
  );
}