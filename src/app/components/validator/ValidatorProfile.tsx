import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Award, Settings, LogOut, ChevronRight, ShieldCheck, TrendingUp, Wallet, Repeat2, Target, Zap, Crosshair, Crown } from 'lucide-react';

import { Waveform } from '../ui/Waveform';
import { RoleSwitcher } from '../ui/RoleSwitcher';

const stats = [
  { label: 'Cash Earned',  value: '₹568',  mono: true  },
  { label: 'Clips Graded', value: '456',   mono: false },
  { label: 'Accuracy',     value: '94.8%', mono: true  },
  { label: 'Days Active',  value: '24',    mono: false },
];

const badges = [
  { id: 1, name: 'Quality First', icon: Target,    description: '95%+ accuracy',            unlocked: false },
  { id: 2, name: 'Speed Demon',   icon: Zap,       description: 'Grade 100 clips in a day', unlocked: false },
  { id: 3, name: 'Precise',       icon: Crosshair, description: 'Held 95%+ accuracy',        unlocked: true  },
  { id: 4, name: 'Expert',        icon: Crown,     description: 'Grade 500+ clips',          unlocked: true  },
];

const menuItems = [
  { id: 'wallet',   label: 'Earnings & Payouts', icon: Wallet,   path: '/validator/wallet'  },
  { id: 'rewards',  label: 'Recognition',        icon: Award,    path: '/validator/rewards' },
  { id: 'settings', label: 'Settings',            icon: Settings, path: null                 },
  { id: 'logout',   label: 'Log Out',             icon: LogOut,   path: null                 },
];

export function ValidatorProfile() {
  const navigate = useNavigate();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

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
            background: 'var(--surface-sunken)', border: '2.5px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)' }}>JD</span>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-1)'}}>
            Jordan Davis
          </h1>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--money-positive)' }} strokeWidth={2} />
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Validator since Jan 2025</p>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="px-6 mb-6">
        <div
          className="grid grid-cols-4 gap-0"
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                padding: 'var(--space-7) var(--space-3)',
                borderRight: idx < stats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <p style={{
                fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)',
                fontFamily: stat.mono ? 'var(--font-number)' : 'var(--font-ui)',
                marginBottom: 'var(--space-1)',
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
            /* Flat studio ground — the decorative gradient wash was both a
               banned gradient and a second light source competing with the
               banner's own elevation. This banner is the screen's one hero. */
            background: 'var(--surface-studio)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--space-7) var(--space-9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--e-2)',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--r-md)',
              background: 'rgba(var(--bone-0-rgb),0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Repeat2 className="w-4 h-4" style={{ color: 'var(--action-primary)' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-on-studio)' }}>Switch App Role</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.5)' }}>Currently: Validator</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'rgba(var(--bone-0-rgb),0.3)' }} />
        </button>
      </div>

      {/* ── Standing Hero — competence, not currency. Clips validated + tier + volume gate. ── */}
      <div className="px-6 mb-6">
        <div style={{ background: 'var(--surface-studio)', borderRadius: 'var(--r-lg)', padding: 'var(--space-9) var(--space-10)', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 var(--r-lg) var(--r-lg)', opacity: 0.10 }}>
            <Waveform color="var(--text-on-studio)" opacity={1} height={72} variant="precision" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'rgba(var(--bone-0-rgb),0.4)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Clips validated
                </p>
                <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-on-studio)', lineHeight: 1 }}>
                  2,840
                </p>
              </div>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'rgba(var(--bone-0-rgb),0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ShieldCheck className="w-6 h-6" style={{ color: 'rgba(var(--bone-0-rgb),0.5)' }} />
              </div>
            </div>

            {/* Standing progress — volume-gated, no points/currency */}
            <div style={{ marginBottom: 'var(--space-4)'}}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-3)'}}>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--state-settled-on-studio)' }}>Trusted Validator</p>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.35)' }}>660 clips to Senior Validator</p>
              </div>
              <div style={{ background: 'rgba(var(--bone-0-rgb),0.08)', borderRadius: 'var(--r-full)', height: 5 }}>
                <div style={{
                  background: 'var(--state-settled-on-studio)',
                  borderRadius: 'var(--r-full)', height: 5, width: '81%',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Accuracy Banner ── */}
      <div className="px-6 mb-6">
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)',
          padding: 'var(--space-8) var(--space-8)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--r-md)',
              background: 'var(--surface-sunken)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--text-primary)' }} strokeWidth={1.75} />
            </div>
            <div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>Top 10% Validator</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>Based on 456 graded clips</p>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--color-success)' }}>94.8%</p>
        </div>
      </div>

      {/* ── Badges ── */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-7)'}}>
          Badges Earned
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const BadgeIcon = badge.unlocked ? badge.icon : Award;
            return (
            <div
              key={badge.id}
              style={{
                borderRadius: 'var(--r-md)', padding: 'var(--space-8) var(--space-7)', textAlign: 'center',
                  /* Unlocked badges sit on the dark ground but are NOT heroes —
                     a grid of e-2 tiles meant N hero shadows on one viewport. */
                  ...(badge.unlocked
                    ? { background: 'var(--surface-studio)', boxShadow: 'var(--e-1)' }
                    : { background: 'var(--surface-sunken)' }),
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--r-md)',
                background: badge.unlocked ? 'rgba(var(--bone-0-rgb),0.08)' : 'var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px',
              }}>
                <BadgeIcon className="w-5 h-5" strokeWidth={1.9}
                  style={{ color: badge.unlocked ? 'var(--state-settled-on-studio)' : 'var(--text-muted)' }} />
              </div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: badge.unlocked ? 'var(--text-on-studio)' : 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>
                {badge.name}
              </p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: badge.unlocked ? 'rgba(var(--bone-0-rgb),0.65)' : 'var(--text-muted)', lineHeight: 1.4 }}>
                {badge.description}
              </p>
            </div>
          );
          })}
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
                padding: 'var(--space-8) 0', background: 'transparent', cursor: 'pointer', border: 'none',
                borderBottom: idx < menuItems.length - 1 ? '1px solid var(--divider)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.75} />
                <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}