import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Award, Settings, LogOut, ChevronRight, Shield, Trash2, Zap, ChevronDown, ShieldCheck, Building2, Repeat2, BarChart3 } from 'lucide-react';
import { RoleSwitcher } from './ui/RoleSwitcher';
import { tierName, nextTierName } from '../lib/tier';

const achievements = [
  { id: 1, name: 'First Steps',  emoji: '🎯', description: 'Complete your first quest',    unlocked: true  },
  { id: 2, name: 'Week Warrior', emoji: '🔥', description: 'Record for 7 days in a row',   unlocked: true  },
  { id: 3, name: 'Voice Master', emoji: '🎙️', description: 'Record 50 clips',              unlocked: false },
  { id: 4, name: 'Reputation Builder', emoji: '⚡', description: 'Reach 5,000 reputation',   unlocked: false },
  { id: 5, name: 'Dedicated',    emoji: '💪', description: 'Record for 30 days in a row',  unlocked: false },
  { id: 6, name: 'Elite',        emoji: '👑', description: 'Complete 100 quests',          unlocked: false },
];

const dataVaultItems = [
  { id: 'ds-1', dataset: 'Customer Service Dataset 1', submitted: 'Jan 12, 2026', clips: 42, status: 'Active' },
];

const menuItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout',   label: 'Log Out',  icon: LogOut   },
];

export function Profile() {
  const navigate = useNavigate();
  const [perksExpanded, setPerksExpanded] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      <RoleSwitcher
        isOpen={roleSwitcherOpen}
        currentRole="contributor"
        onClose={() => setRoleSwitcherOpen(false)}
      />

      {/* Profile Header — avatar left, name/level dominant */}
      <div className="flex items-center gap-4 px-6 pt-16 pb-6">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#FFF0E8',
            border: '2px solid #FFD8C4',
          }}
        >
          <User className="w-8 h-8" style={{ color: 'oklch(0.63 0.25 34)' }} strokeWidth={1.5} />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em', marginBottom: 2 }}>
            Alex Johnson
          </h1>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#8896A7' }}>alex.johnson@email.com</p>
        </div>
      </div>

      {/* Stats — naked type + dividers (no cards) */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #E8EDF3', borderBottom: '1px solid #E8EDF3' }}>
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>₹1,250</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>Earned</p>
          </div>
          <div style={{ width: 1, height: 32, background: '#E8EDF3' }} />
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>23</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>Quests</p>
          </div>
          <div style={{ width: 1, height: 32, background: '#E8EDF3' }} />
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>94%</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>Acceptance</p>
          </div>
        </div>
      </div>

      {/* Role Switcher Action */}
      <div className="px-6 mb-6">
        <button
          onClick={() => setRoleSwitcherOpen(true)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #1C2434 0%, #0A0C10 100%)',
            borderRadius: 16,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 12px rgba(10,12,16,0.12)',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Repeat2 className="w-4 h-4" style={{ color: 'oklch(0.63 0.25 34)' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Switch App Role</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Currently: Contributor</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </button>
      </div>

      {/* Trust Tier Block — NAVY background, white text, orange progress */}
      <div className="px-6 mb-6">
        <div
          style={{
            background: 'radial-gradient(ellipse at 20% 40%, rgba(224,108,58,0.18) 0%, transparent 55%), linear-gradient(150deg, #0F1822 0%, #0A0C10 100%)',
            borderRadius: 24,
            padding: '24px 24px',
            boxShadow: '0px 10px 32px rgba(0,0,0,0.20), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" style={{ color: 'oklch(0.63 0.25 34)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Trust Tier</span>
            </div>
            <span
              style={{
                background: 'rgba(224,108,58,0.15)',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: 'oklch(0.63 0.25 34)',
              }}
            >
              {tierName(3)}
            </span>
          </div>

          {/* Reputation number — hero element */}
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: 4 }}>
            1,530
          </p>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Reputation
          </p>

          {/* Progress bar */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 10, marginBottom: 10 }}>
            <div
              style={{
                background: 'linear-gradient(90deg, oklch(0.63 0.25 34), oklch(0.74 0.18 39))',
                borderRadius: 999,
                height: 10,
                width: '65%',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>1,530</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>2,000 to {nextTierName(3)}</span>
          </div>

          {/* Unlock preview */}
          <div
            className="mt-5 px-4 py-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Reach <strong style={{ color: '#FFFFFF' }}>{nextTierName(3)}</strong> to unlock{' '}
              <strong style={{ color: 'oklch(0.63 0.25 34)' }}>higher-paying campaigns</strong> &amp;{' '}
              <strong style={{ color: '#FFFFFF' }}>instant approvals</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Performance dashboard link */}
      <div className="px-6 mb-6">
        <button
          onClick={() => navigate('/contributor/performance')}
          style={{
            width: '100%', background: '#FFFFFF', borderRadius: 16,
            border: '1px solid #E8EDF3', padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#F0F4F8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <BarChart3 className="w-5 h-5" style={{ color: '#1C2434' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434' }}>Performance Dashboard</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>Acceptance, quality &amp; consistency scores</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#8896A7' }} />
        </button>
      </div>

      {/* Perks & Multipliers — collapsible */}
      <div className="px-6 mb-6">
        <button
          onClick={() => setPerksExpanded(!perksExpanded)}
          style={{
            background: '#FFFFFF',
            borderRadius: perksExpanded ? '16px 16px 0 0' : 16,
            border: '1px solid #E8EDF3',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
            padding: '16px 18px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFF3D6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap className="w-5 h-5" style={{ color: '#8B6914' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>Perks &amp; Multipliers</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>Milestone vouchers &amp; contributor perks</p>
            </div>
          </div>
          <ChevronDown
            className="w-4 h-4 transition-transform"
            style={{ color: '#8B6914', transform: perksExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {perksExpanded && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8EDF3',
              borderTop: 'none',
              borderRadius: '0 0 16px 16px',
              padding: '16px',
            }}
          >
            {[
              { emoji: '🍔', name: '₹500 Swiggy Voucher',    xp: 5000, affordable: false },
              { emoji: '🛒', name: '₹200 Amazon Gift Card',   xp: 2000, affordable: false },
              { emoji: '🎬', name: '₹100 BookMyShow',         xp: 1000, affordable: true  },
              { emoji: '⚡', name: 'Priority Queue (7 days)',  xp: 800,  affordable: true  },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: '1px solid #F0F4F8' }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1C2434' }}>{item.name}</p>
                  <p className="flex items-center gap-0.5" style={{ fontSize: 11, fontWeight: 500, color: '#8B6914' }}>
                    <Zap className="w-3 h-3 inline" />{item.xp.toLocaleString()} XP
                  </p>
                </div>
                <button
                  disabled={!item.affordable}
                  style={{
                    fontSize: 11, fontWeight: 600, padding: '5px 14px', borderRadius: 999, border: 'none',
                    background: item.affordable ? '#8B6914' : '#F0F4F8',
                    color: item.affordable ? '#FFFFFF' : '#8896A7',
                    cursor: item.affordable ? 'pointer' : 'not-allowed', flexShrink: 0,
                  }}
                >
                  {item.affordable ? 'Redeem' : 'Need more XP'}
                </button>
              </div>
            ))}
            <button
              onClick={() => navigate('/contributor/rewards')}
              style={{
                width: '100%', marginTop: 12, padding: '10px', borderRadius: 999,
                background: '#FFF3D6', border: 'none', color: '#6B4800', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              View All Rewards →
            </button>
          </div>
        )}
      </div>

      {/* Achievements — 64×64 cards */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434' }}>Achievements</h3>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#8896A7' }}>
            {achievements.filter(a => a.unlocked).length} / {achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              style={{
                borderRadius: 16,
                padding: '16px 10px',
                textAlign: 'center',
                ...(a.unlocked
                  ? {
                      background: '#C4622D',
                      boxShadow: '0px 4px 16px rgba(196,98,45,0.25)',
                    }
                  : {
                      background: '#F0F4F8',
                    }),
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: a.unlocked ? 'rgba(255,255,255,0.2)' : '#E8EDF3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', fontSize: 22,
                  ...(a.unlocked ? { boxShadow: '0px 0px 12px rgba(196,98,45,0.4)' } : {}),
                }}
              >
                {a.unlocked ? a.emoji : <Award className="w-5 h-5" style={{ color: '#8896A7' }} strokeWidth={1.75} />}
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: a.unlocked ? '#FFFFFF' : '#1C2434', marginBottom: 2 }}>
                {a.name}
              </p>
              <p style={{ fontSize: 10, fontWeight: 500, color: a.unlocked ? 'rgba(255,255,255,0.75)' : '#8896A7', lineHeight: 1.4 }}>
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Vault & Consent — amber background, amber left-border */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5" style={{ color: '#B8860B' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434' }}>
            Data Vault &amp; Consent
          </h3>
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', marginBottom: 14, lineHeight: 1.55 }}>
          You own your voice data. Review and manage consent for every dataset.
        </p>
        <div className="space-y-3">
          {dataVaultItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#FDF8E8',
                borderRadius: 16,
                borderLeft: '4px solid #B8860B',
                padding: '18px',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>{item.dataset}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                    Submitted {item.submitted} · {item.clips} clips
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 11, fontWeight: 700,
                    padding: '4px 12px', borderRadius: 999,
                    background: '#E6F4EC', color: '#1A5C35', flexShrink: 0,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <button
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '10px', borderRadius: 999,
                  border: '1.5px solid #F5C5C5', background: '#FDE8E8', color: '#8B0000',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <Trash2 className="w-4 h-4" />
                Revoke Consent &amp; Delete Data
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Grow with Feul — Pro Roles ── */}
      <div className="px-6 mb-8">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>
          Grow with Feul
        </h3>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#8896A7', marginBottom: 16 }}>
          Unlock exclusive roles and maximize your earning potential.
        </p>

        <div className="space-y-4">
          {/* Become a Validator */}
          <button
            onClick={() => navigate('/validator-apply')}
            style={{
              width: '100%', background: '#FFFFFF', borderRadius: 20,
              border: '1px solid #E8EDF3', padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0px 4px 12px rgba(90, 123, 109, 0.08)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: '#F0F7F4',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <ShieldCheck className="w-6 h-6" style={{ color: '#5A7B6D' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>Validator Tier</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', lineHeight: 1.5 }}>
                Review audio quality and earn ₹2 per clip graded. Restricted to top 5% of contributors.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: '#8896A7' }} />
          </button>

          {/* Company — Quest Creator */}
          <button
            onClick={() => navigate('/quest-creator-apply')}
            style={{
              width: '100%', background: '#FFFFFF', borderRadius: 20,
              border: '1px solid #E8EDF3', padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0px 4px 12px rgba(107, 115, 148, 0.08)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: '#F4F5F8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Building2 className="w-6 h-6" style={{ color: '#6B7394' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>Quest Creator</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', lineHeight: 1.5 }}>
                Create campaigns and manage large-scale data collection. Business account required.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: '#8896A7' }} />
          </button>
        </div>
      </div>

      {/* Menu — naked dividers, no card wrappers */}
      <div className="px-6 mb-12">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="flex items-center justify-between w-full"
              style={{
                padding: '16px 0',
                borderBottom: idx < menuItems.length - 1 ? '1px solid #E8EDF3' : 'none',
                background: 'transparent',
                cursor: 'pointer',
                border: 'none',
                borderBottomStyle: idx < menuItems.length - 1 ? 'solid' : 'none',
                borderBottomWidth: idx < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: '#E8EDF3',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" style={{ color: '#4A5568' }} strokeWidth={1.75} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1C2434' }}>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#8896A7' }} />
            </button>
          );
        })}
      </div>

      {/* Legacy/Dev Link */}
      <div className="px-6 pb-12 text-center">
        <button
          onClick={() => navigate('/role-selection')}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#CBD5E0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Access Role Selection (Legacy)
        </button>
      </div>
    </div>
  );
}