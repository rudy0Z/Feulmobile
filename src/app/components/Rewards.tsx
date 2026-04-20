import { useNavigate } from 'react-router';
import { Gift, Award, Sparkles, Lock, Check, Zap, ShoppingBag, ArrowLeft } from 'lucide-react';

// XP-only rewards hub — cash is never shown here
// Secondary accent #8B6914 (olive/dark gold) for all XP elements

const rewardCategories = [
  { id: 'all',       label: 'All'         },
  { id: 'vouchers',  label: 'Vouchers'    },
  { id: 'perks',     label: 'Perks'       },
  { id: 'exclusive', label: 'Exclusive'   },
];

const partnerVouchers = [
  { id: 'v-1', name: '₹500 Swiggy Voucher',   description: 'Food delivery credit',          xpCost: 5000, emoji: '🍔', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-2', name: '₹200 Amazon Gift Card',  description: 'Shop anything on Amazon',       xpCost: 2000, emoji: '🛒', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-3', name: '₹100 BookMyShow',        description: 'Movie tickets & events',        xpCost: 1000, emoji: '🎬', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-4', name: '₹300 Flipkart Voucher',  description: 'Electronics & fashion deals',   xpCost: 3000, emoji: '🛍️', category: 'vouchers', available: true,  redeemed: false },
  { id: 'p-1', name: 'Premium Badge',          description: 'Exclusive gold badge on profile', xpCost: 500, emoji: '🏆', category: 'perks',  available: true,  redeemed: true  },
  { id: 'p-2', name: 'Early Access Pass',      description: 'Get early access to high-paying quests', xpCost: 1500, emoji: '🎫', category: 'perks', available: true, redeemed: false },
  { id: 'p-3', name: 'Priority Queue',         description: 'Skip the wait on popular quests for 7 days', xpCost: 800, emoji: '⚡', category: 'perks', available: true, redeemed: false },
  { id: 'e-1', name: 'Custom Voice Avatar',    description: 'Personalised AI voice avatar (Level 5+)', xpCost: 8000, emoji: '🎭', category: 'exclusive', available: false, redeemed: false },
];

const userXP = 1530;

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 16,
  border: '1px solid #E8EDF3',
  boxShadow: '0px 4px 12px rgba(28,36,52,0.04)',
};

export function Rewards() {
  const navigate  = useNavigate();
  const canAfford = (xp: number) => userXP >= xp;

  const handleRedeem = (voucher: typeof partnerVouchers[0]) => {
    navigate('/contributor/rewards/claim', {
      state: {
        reward: {
          id: voucher.id,
          name: voucher.name,
          description: voucher.description,
          xpCost: voucher.xpCost,
          emoji: voucher.emoji,
          category: voucher.category,
        },
      },
    });
  };

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-16 pb-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FFFFFF', border: '1px solid #E8EDF3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 4px 12px rgba(28,36,52,0.04)', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em', marginBottom: 2 }}>
            XP Rewards Hub
          </h1>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568' }}>Spend your XP on vouchers, perks &amp; more</p>
        </div>
      </div>

      {/* XP Balance — white card with olive accent */}
      <div className="px-6 mb-6">
        <div
          style={{
            ...cardStyle,
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderLeft: '4px solid #8B6914',
          }}
        >
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#8896A7', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Your XP Balance</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: '#4A3200', lineHeight: 1 }}>
              {userXP.toLocaleString()} XP
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 6 }}>
              Gained by completing quests · never expires
            </p>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: '#FFF3D6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap className="w-7 h-7" style={{ color: '#8B6914' }} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-4" style={{ scrollbarWidth: 'none' }}>
        {rewardCategories.map((cat, idx) => (
          <button
            key={cat.id}
            style={{
              padding: '7px 18px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', border: '1.5px solid',
              background: idx === 0 ? '#8B6914' : '#FFFFFF',
              borderColor: idx === 0 ? '#8B6914' : '#E8EDF3',
              color: idx === 0 ? '#FFFFFF' : '#4A5568',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Partner Vouchers ────────────────────────────────────────────────── */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-4 h-4" style={{ color: '#8B6914' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Partner Vouchers</h3>
        </div>
        <div className="space-y-3">
          {partnerVouchers.filter(v => v.category === 'vouchers').map((voucher) => {
            const affordable = canAfford(voucher.xpCost);
            return (
              <div
                key={voucher.id}
                style={{
                  ...cardStyle, padding: '16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  borderColor: affordable ? '#F0DFA8' : '#E8EDF3',
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FFF3D6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {voucher.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1C2434', marginBottom: 2 }}>{voucher.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{voucher.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#8B6914' }}>
                    <Zap className="w-3 h-3" />{voucher.xpCost.toLocaleString()}
                  </span>
                  <button
                    disabled={!affordable}
                    onClick={() => affordable && handleRedeem(voucher)}
                    style={{
                      fontSize: 12, fontWeight: 700,
                      padding: '5px 14px', borderRadius: 999, border: 'none',
                      background: affordable ? '#8B6914' : '#F0F4F8',
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

      {/* ── Perks & Boosts ─────────────────────────────────────────────────── */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4" style={{ color: '#8B6914' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Perks &amp; Boosts</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {partnerVouchers.filter(v => v.category === 'perks').map((perk) => {
            const affordable = canAfford(perk.xpCost);
            const { redeemed } = perk;
            return (
              <div
                key={perk.id}
                style={{
                  ...cardStyle, padding: '16px',
                  opacity: redeemed ? 0.65 : 1,
                  borderColor: redeemed ? '#E8EDF3' : affordable ? '#F0DFA8' : '#E8EDF3',
                  background: redeemed ? '#F0F4F8' : '#FFFFFF',
                }}
              >
                {redeemed && (
                  <div className="flex justify-end mb-2">
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E6F4EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check className="w-3 h-3" style={{ color: '#2D7A4F' }} />
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 10 }}>{perk.emoji}</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 4 }}>{perk.name}</p>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#4A5568', marginBottom: 12, lineHeight: 1.45 }}>{perk.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#8B6914' }}>
                    <Zap className="w-3 h-3" />{perk.xpCost.toLocaleString()}
                  </span>
                  {redeemed
                    ? <span style={{ fontSize: 11, fontWeight: 600, color: '#2D7A4F' }}>Redeemed</span>
                    : (
                      <button
                        disabled={!affordable}
                        onClick={() => affordable && handleRedeem(perk)}
                        style={{
                          fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: 'none',
                          background: affordable ? '#8B6914' : '#F0F4F8',
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

      {/* ── Exclusive ────────────────────────────────────────────────────────── */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4" style={{ color: '#8B6914' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>Exclusive</h3>
        </div>
        {partnerVouchers.filter(v => v.category === 'exclusive').map((item) => (
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
                <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: '#8B6914' }}>
                  <Zap className="w-3 h-3" />{item.xpCost.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Gain More CTA ────────────────────────────────────────────────────── */}
      <div className="px-6">
        <div
          style={{
            background: '#FFF3D6',
            borderRadius: 20,
            border: '1.5px solid #F0DFA8',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <Gift className="w-10 h-10 mx-auto mb-3" style={{ color: '#8B6914' }} strokeWidth={1.5} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 800, color: '#4A3200', marginBottom: 8 }}>
            Want more XP?
          </h3>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#6B4800', marginBottom: 20 }}>
            Complete quests to gain XP and unlock rewards
          </p>
          <button
            onClick={() => navigate('/contributor/quests')}
            style={{
              background: '#8B6914', color: '#FFFFFF',
              padding: '12px 32px', borderRadius: 999,
              fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Browse Quests
          </button>
        </div>
      </div>
    </div>
  );
}