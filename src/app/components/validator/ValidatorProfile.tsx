import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Award, Settings, LogOut, ChevronRight, Zap, ShieldCheck, TrendingUp, Wallet, Gift, Repeat2 } from 'lucide-react';

import { Waveform } from '../ui/Waveform';
import { RoleSwitcher } from '../ui/RoleSwitcher';

const stats = [
  { label: 'Cash Earned',  value: '₹568',  mono: true  },
  { label: 'Clips Graded', value: '456',   mono: false },
  { label: 'Accuracy',     value: '94.8%', mono: true  },
  { label: 'Days Active',  value: '24',    mono: false },
];

const badges = [
  { id: 1, name: 'Quality First', emoji: '🎯', description: '95%+ accuracy',            unlocked: false },
  { id: 2, name: 'Speed Demon',   emoji: '⚡', description: 'Grade 100 clips in a day', unlocked: false },
  { id: 3, name: 'Consistent',    emoji: '🔥', description: '7-day streak',              unlocked: true  },
  { id: 4, name: 'Expert',        emoji: '👑', description: 'Grade 500+ clips',          unlocked: true  },
];

const menuItems = [
  { id: 'wallet',   label: 'Earnings & Payouts', icon: Wallet,   path: '/validator/wallet'  },
  { id: 'rewards',  label: 'XP Rewards Hub',     icon: Gift,     path: '/validator/rewards' },
  { id: 'settings', label: 'Settings',            icon: Settings, path: null                 },
  { id: 'logout',   label: 'Log Out',             icon: LogOut,   path: null                 },
];

export function ValidatorProfile() {
  const navigate = useNavigate();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      <RoleSwitcher
        isOpen={roleSwitcherOpen}
        currentRole="validator"
        onClose={() => setRoleSwitcherOpen(false)}
      />

      {/* ── Profile Header ── */}
      <div className="flex items-center gap-4 px-6 pt-16 pb-6">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 68, height: 68, borderRadius: '50%',
            background: '#F0F4F8', border: '2.5px solid #E8EDF3',
          }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434' }}>JD</span>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em', marginBottom: 3 }}>
            Jordan Davis
          </h1>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#5A7B6D' }} strokeWidth={2} />
            <p style={{ fontSize: 13, fontWeight: 600, color: '#4A5568' }}>Validator since Jan 2025</p>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="px-6 mb-6">
        <div
          className="grid grid-cols-4 gap-0"
          style={{
            background: '#FFFFFF',
            borderRadius: 16, border: '1px solid #E8EDF3', overflow: 'hidden',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                padding: '14px 6px',
                borderRight: idx < stats.length - 1 ? '1px solid #E8EDF3' : 'none',
              }}
            >
              <p style={{
                fontSize: 18, fontWeight: 700, color: '#1C2434',
                fontFamily: stat.mono ? 'var(--font-mono)' : 'var(--font-serif)',
                marginBottom: 3,
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 9, fontWeight: 600, color: '#8896A7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {stat.label}
              </p>
            </div>
          ))}
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
              <Repeat2 className="w-4 h-4" style={{ color: '#E06C3A' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Switch App Role</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Currently: Validator</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </button>
      </div>

      {/* ── XP Hero Card — ink-navy (unified) ── */}
      <div className="px-6 mb-6">
        <div style={{ background: '#1A1F2E', borderRadius: 20, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
            <Waveform color="#FFFFFF" opacity={1} height={72} variant="precision" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Validator XP
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  2,840 XP
                </p>
              </div>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>

            {/* Level progress bar */}
            <div style={{ marginBottom: 8 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#C4622D' }}>Level 4 Validator</p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>→ Lv 5 at 3,500 XP</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 5 }}>
                <div style={{
                  background: '#C4622D',
                  borderRadius: 999, height: 5, width: '81%',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Accuracy Banner ── */}
      <div className="px-6 mb-6">
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16, border: '1px solid #E8EDF3',
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: '#F0F4F8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#1C2434' }} strokeWidth={1.75} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>Top 10% Validator</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>Based on 456 graded clips</p>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#2D7A4F' }}>94.8%</p>
        </div>
      </div>

      {/* ── Badges ── */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: '#1C2434', marginBottom: 14 }}>
          Badges Earned
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={{
                borderRadius: 16, padding: '18px 14px', textAlign: 'center',
                ...(badge.unlocked
                  ? { background: '#1A1F2E', boxShadow: '0px 4px 16px rgba(26,31,46,0.25)' }
                  : { background: '#F0F4F8' }),
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: badge.unlocked ? 'rgba(255,255,255,0.08)' : '#E8EDF3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px', fontSize: 22,
              }}>
                {badge.unlocked
                  ? badge.emoji
                  : <Award className="w-5 h-5" style={{ color: '#8896A7' }} strokeWidth={1.75} />}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: badge.unlocked ? '#FFFFFF' : '#1C2434', marginBottom: 3 }}>
                {badge.name}
              </p>
              <p style={{ fontSize: 11, fontWeight: 500, color: badge.unlocked ? 'rgba(255,255,255,0.65)' : '#8896A7', lineHeight: 1.4 }}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Menu ── */}
      <div className="px-6">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => item.path && navigate(item.path)}
              className="flex items-center justify-between w-full"
              style={{
                padding: '16px 0', background: 'transparent', cursor: 'pointer', border: 'none',
                borderBottom: idx < menuItems.length - 1 ? '1px solid #E8EDF3' : 'none',
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
    </div>
  );
}