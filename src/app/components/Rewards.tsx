import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Gift, Award, Sparkles, Lock, Check, Zap, ShoppingBag, ChevronLeft } from 'lucide-react';

const rewardCategories: { id: string; label: string }[] = [
  { id: 'all',       label: 'All'       },
  { id: 'vouchers',  label: 'Vouchers'  },
  { id: 'perks',     label: 'Perks'     },
  { id: 'exclusive', label: 'Exclusive' },
];

const partnerVouchers = [
  { id: 'v-1', name: '₹500 Swiggy Voucher',   description: 'Food delivery credit',                             xpCost: 5000, emoji: '🍔', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-2', name: '₹200 Amazon Gift Card',  description: 'Shop anything on Amazon',                          xpCost: 2000, emoji: '🛒', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-3', name: '₹100 BookMyShow',        description: 'Movie tickets & events',                           xpCost: 1000, emoji: '🎬', category: 'vouchers',  available: true,  redeemed: false },
  { id: 'v-4', name: '₹300 Flipkart Voucher',  description: 'Electronics & fashion deals',                      xpCost: 3000, emoji: '🛍️', category: 'vouchers', available: true,  redeemed: false },
  { id: 'p-1', name: 'Premium Badge',          description: 'Exclusive gold badge on profile',                  xpCost:  500, emoji: '🏆', category: 'perks',     available: true,  redeemed: true  },
  { id: 'p-2', name: 'Early Access Pass',      description: 'Get early access to high-paying quests',           xpCost: 1500, emoji: '🎫', category: 'perks',     available: true,  redeemed: false },
  { id: 'p-3', name: 'Priority Queue',         description: 'Skip the wait on popular quests for 7 days',       xpCost:  800, emoji: '⚡', category: 'perks',     available: true,  redeemed: false },
  { id: 'e-1', name: 'Custom Voice Avatar',    description: 'Personalised AI voice avatar (Level 5+)',          xpCost: 8000, emoji: '🎭', category: 'exclusive', available: false, redeemed: false },
];

const userXP = 1530;

export function Rewards() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const canAfford = (xp: number) => userXP >= xp;

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend',   onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend',   onEnd);
    };
  }, [navigate]);

  const handleRedeem = (voucher: typeof partnerVouchers[0]) => {
    navigate('/contributor/rewards/claim', {
      state: {
        reward: {
          id: voucher.id, name: voucher.name, description: voucher.description,
          xpCost: voucher.xpCost, emoji: voucher.emoji, category: voucher.category,
        },
      },
    });
  };

  const showVouchers  = activeCategory === 'all' || activeCategory === 'vouchers';
  const showPerks     = activeCategory === 'all' || activeCategory === 'perks';
  const showExclusive = activeCategory === 'all' || activeCategory === 'exclusive';

  const cardBase: React.CSSProperties = {
    background: 'var(--surface)',
    borderRadius: 16,
    border: '1px solid var(--card-border)',
    boxShadow: 'var(--shadow-glass)',
  };

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 6 }}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 2 }}>
          XP Rewards Hub
        </h1>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Spend your XP on vouchers, perks &amp; more</p>
      </div>

      {/* XP Balance */}
      <div className="px-6 mb-6">
        <div style={{
          ...cardBase, padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderLeft: '4px solid var(--warning-700)',
        }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Your XP Balance
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: 'var(--warning-900)', lineHeight: 1 }}>
              {userXP.toLocaleString()} XP
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 6 }}>
              Gained by completing quests · never expires
            </p>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--warning-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap className="w-7 h-7" style={{ color: 'var(--warning-700)' }} />
          </div>
        </div>
      </div>

      {/* Category Filter — with right-edge fade hint */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div className="flex gap-2 overflow-x-auto px-6 pb-4" style={{ scrollbarWidth: 'none' }}>
          {rewardCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '7px 18px', borderRadius: 999,
                  fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', border: '1.5px solid',
                  background:   isActive ? 'var(--warning-700)' : 'var(--surface)',
                  borderColor:  isActive ? 'var(--warning-700)' : 'var(--card-border)',
                  color:        isActive ? '#FFFFFF'            : 'var(--text-secondary)',
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                  cursor: 'pointer',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        {/* Scroll fade hint */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent, var(--background))',
        }} />
      </div>

      {/* ── Partner Vouchers ── */}
      {showVouchers && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-4 h-4" style={{ color: 'var(--warning-700)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              Partner Vouchers
            </h3>
          </div>
          <div className="space-y-3">
            {partnerVouchers.filter(v => v.category === 'vouchers').map((voucher) => {
              const affordable = canAfford(voucher.xpCost);
              return (
                <div
                  key={voucher.id}
                  style={{
                    ...cardBase, padding: '16px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    borderColor: affordable ? 'var(--warning-200)' : 'var(--card-border)',
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--warning-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {voucher.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{voucher.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{voucher.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning-700)' }}>
                      <Zap className="w-3 h-3" />{voucher.xpCost.toLocaleString()}
                    </span>
                    <button
                      disabled={!affordable}
                      onClick={() => affordable && handleRedeem(voucher)}
                      style={{
                        fontSize: 12, fontWeight: 700,
                        padding: '5px 14px', borderRadius: 999, border: 'none',
                        background: affordable ? 'var(--warning-700)' : 'var(--neutral-100)',
                        color:      affordable ? '#FFFFFF'            : 'var(--text-muted)',
                        cursor:     affordable ? 'pointer'            : 'not-allowed',
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

      {/* ── Perks & Boosts ── */}
      {showPerks && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--warning-700)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              Perks &amp; Boosts
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {partnerVouchers.filter(v => v.category === 'perks').map((perk) => {
              const affordable = canAfford(perk.xpCost);
              const { redeemed } = perk;
              return (
                <div
                  key={perk.id}
                  style={{
                    ...cardBase, padding: '16px',
                    opacity: redeemed ? 0.65 : 1,
                    borderColor: redeemed ? 'var(--card-border)' : affordable ? 'var(--warning-200)' : 'var(--card-border)',
                    background: redeemed ? 'var(--surface-sunken)' : 'var(--surface)',
                  }}
                >
                  {redeemed && (
                    <div className="flex justify-end mb-2">
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--status-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check className="w-3 h-3" style={{ color: 'var(--color-success)' }} />
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 10 }}>{perk.emoji}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{perk.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.45 }}>{perk.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning-700)' }}>
                      <Zap className="w-3 h-3" />{perk.xpCost.toLocaleString()}
                    </span>
                    {redeemed
                      ? <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-success)' }}>Redeemed</span>
                      : (
                        <button
                          disabled={!affordable}
                          onClick={() => affordable && handleRedeem(perk)}
                          style={{
                            fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: 'none',
                            background: affordable ? 'var(--warning-700)' : 'var(--neutral-100)',
                            color:      affordable ? '#FFFFFF'            : 'var(--text-muted)',
                            cursor:     affordable ? 'pointer'            : 'not-allowed',
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
      {showExclusive && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4" style={{ color: 'var(--warning-700)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Exclusive</h3>
          </div>
          {partnerVouchers.filter(v => v.category === 'exclusive').map((item) => (
            <div key={item.id} style={{ ...cardBase, padding: '18px', opacity: 0.7 }}>
              <div className="flex items-center gap-4">
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</p>
                    <Lock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>{item.description}</p>
                  <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning-700)' }}>
                    <Zap className="w-3 h-3" />{item.xpCost.toLocaleString()} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Gain More CTA ── */}
      <div className="px-6">
        <div style={{
          background: 'var(--warning-50)',
          borderRadius: 20,
          border: '1.5px solid var(--warning-200)',
          padding: '24px',
          textAlign: 'center',
        }}>
          <Gift className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--warning-700)' }} strokeWidth={1.5} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 800, color: 'var(--warning-900)', marginBottom: 8 }}>
            Want more XP?
          </h3>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 20 }}>
            Complete quests to gain XP and unlock rewards
          </p>
          <button
            onClick={() => navigate('/contributor/quests')}
            style={{
              background: 'var(--warning-700)', color: '#FFFFFF',
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
