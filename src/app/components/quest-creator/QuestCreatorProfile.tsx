import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Mail, Calendar, TrendingUp, IndianRupee, FolderKanban, Settings, LogOut, ChevronRight, Globe, Shield, Repeat2 } from 'lucide-react';

import { Waveform } from '../ui/Waveform';
import { RoleSwitcher } from '../ui/RoleSwitcher';

const stats = [
  { label: 'Campaigns', value: '4',     icon: FolderKanban },
  { label: 'Clips',     value: '1,855', icon: TrendingUp   },
  { label: 'Spent',     value: '₹1.8L', icon: IndianRupee  },
];

const companyInfo = [
  { label: 'Company',      value: 'TechVoice AI',         icon: Building2 },
  { label: 'Email',        value: 'contact@techvoice.ai', icon: Mail      },
  { label: 'Website',      value: 'techvoice.ai',         icon: Globe     },
  { label: 'Member Since', value: 'December 2024',        icon: Calendar  },
];

const menuItems = [
  { id: 'settings', label: 'Account Settings', icon: Settings },
  { id: 'logout',   label: 'Log Out',           icon: LogOut   },
];

export function QuestCreatorProfile() {
  const navigate = useNavigate();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

      <RoleSwitcher
        isOpen={roleSwitcherOpen}
        currentRole="quest-creator"
        onClose={() => setRoleSwitcherOpen(false)}
      />

      {/* ── Profile Header ── */}
      <div className="flex flex-col items-center px-6 pt-16 pb-6">
        <div
          className="flex items-center justify-center mb-5"
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--neutral-100)',
            border: '2.5px solid #E8EDF3',
          }}
        >
          <Building2 className="w-11 h-11" style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
          TechVoice AI
        </h1>
        <div className="flex items-center gap-2">
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#6B7394',
          }} />
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Quest Creator Account</p>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="px-6 mb-6">
        <div
          className="grid grid-cols-3 gap-0"
          style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3', overflow: 'hidden' }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{
                  padding: '16px 10px', textAlign: 'center',
                  borderRight: idx < stats.length - 1 ? '1px solid #E8EDF3' : 'none',
                }}
              >
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} strokeWidth={1.75} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Switcher Action */}
      <div className="px-6 mb-6">
        <button
          onClick={() => setRoleSwitcherOpen(true)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #1C2434 0%, var(--surface-hero-elevated) 100%)',
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
              width: 36, height: 36, borderRadius: 12,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Repeat2 className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Switch App Role</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Currently: Quest Creator</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </button>
      </div>

      {/* ── Company Information ── */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>
          Company Information
        </h3>
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3', overflow: 'hidden' }}>
          {companyInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div
                key={info.label}
                className="flex items-center gap-3"
                style={{
                  padding: '14px 18px',
                  borderBottom: idx < companyInfo.length - 1 ? '1px solid #E8EDF3' : 'none',
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: 'var(--neutral-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Enterprise Plan Card — ink-navy (unified surface) ── */}
      <div className="px-6 mb-6">
        <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 20px 20px', opacity: 0.10 }}>
            <Waveform color="#FFFFFF" opacity={1} height={72} variant="data" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#FFFFFF' }}>
                Enterprise Plan
              </h3>
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: 18, lineHeight: 1.5 }}>
              Unlimited campaigns · Priority support · Advanced analytics
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Renews on</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>March 15, 2026</p>
              </div>
              <button style={{
                padding: '9px 20px', borderRadius: 999,
                background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                fontSize: 13, fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
              }}>
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Usage Stats ── */}
      <div className="px-6 mb-6">
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3', padding: '18px' }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
            This Month's Usage
          </h4>
          <div className="space-y-4">
            {[
              { label: 'API Calls', used: '8,542',  total: '25,000', pct: 34 },
              { label: 'Storage',   used: '12.4 GB', total: '100 GB', pct: 12 },
            ].map((u) => (
              <div key={u.label}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{u.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{u.used} / {u.total}</span>
                </div>
                <div style={{ background: 'var(--neutral-100)', borderRadius: 999, height: 5 }}>
                  <div style={{
                    background: 'var(--accent-primary-deep)',
                    borderRadius: 999, height: 5, width: `${u.pct}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu ── */}
      <div className="px-6 space-y-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              style={{
                background: '#FFFFFF', borderRadius: 16,
                border: '1px solid #E8EDF3',
                width: '100%', padding: '16px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.75} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
