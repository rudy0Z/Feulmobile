import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DPDPConsentRevocation } from './DPDPConsentRevocation';
import { Award, Settings, LogOut, ChevronRight, Shield, Trash2, Zap, ShieldCheck, Building2, Repeat2, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
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
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [showRevokeSheet, setShowRevokeSheet]   = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

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
            width: 68, height: 68, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            boxShadow: '0px 8px 22px rgba(224,108,58,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
            position: 'relative',
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>AJ</span>
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--navy)',
            border: '2px solid var(--background)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldCheck className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 2 }}>
            Alex Johnson
          </h1>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>alex.johnson@email.com</p>
        </div>
      </div>

      {/* Stats — card with elevation, larger figures */}
      <div className="px-6 mb-6">
        <div
          className="flex items-center justify-between"
          style={{
            background: 'var(--surface)',
            borderRadius: 18,
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-glass)',
            padding: '18px 8px',
          }}
        >
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>₹1,250</p>
            <p style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 6 }}>Earned</p>
          </div>
          <div style={{ width: 1, height: 36, background: 'var(--divider)' }} />
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>23</p>
            <p style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 6 }}>Quests</p>
          </div>
          <div style={{ width: 1, height: 36, background: 'var(--divider)' }} />
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>94%</p>
            <p style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 6 }}>Acceptance</p>
          </div>
        </div>
      </div>

      {/* Role Switcher Action */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.985, y: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={() => setRoleSwitcherOpen(true)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--neutral-800) 0%, var(--navy) 100%)',
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
              <Repeat2 className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Switch App Role</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Currently: Contributor</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </motion.button>
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
              <ShieldCheck className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Trust Tier</span>
            </div>
            <span
              style={{
                background: 'rgba(224,108,58,0.15)',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--accent-primary)',
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
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-400))',
                borderRadius: 999,
                height: 10,
                width: '65%',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <div className="flex items-center justify-end">
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>470 to {nextTierName(3)}</span>
          </div>

          {/* Unlock preview */}
          <div
            className="mt-5 px-4 py-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Reach <strong style={{ color: '#FFFFFF' }}>{nextTierName(3)}</strong> to unlock{' '}
              <strong style={{ color: 'var(--accent-primary)' }}>higher-paying campaigns</strong> &amp;{' '}
              <strong style={{ color: '#FFFFFF' }}>instant approvals</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Performance dashboard link */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.985, y: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={() => navigate('/contributor/performance')}
          style={{
            width: '100%', background: '#FFFFFF', borderRadius: 16,
            border: '1px solid var(--card-border)', padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--surface-sunken)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Performance Dashboard</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Acceptance, quality &amp; consistency scores</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        </motion.button>
      </div>

      {/* XP Rewards — single link card, no duplication with Rewards screen */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.985, y: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={() => navigate('/contributor/rewards')}
          style={{
            width: '100%', background: 'var(--surface)', borderRadius: 16,
            border: '1px solid var(--card-border)', padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            textAlign: 'left', boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--warning-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Zap className="w-5 h-5" style={{ color: 'var(--warning-700)' }} fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>XP Rewards Hub</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
              1,530 XP · redeem vouchers &amp; unlock perks
            </p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        </motion.button>
      </div>

      {/* Achievements — 64×64 cards */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Achievements</h3>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>
            {achievements.filter(a => a.unlocked).length} / {achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a) => (
            <motion.div
              key={a.id}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                borderRadius: 18,
                padding: '14px 8px 12px',
                textAlign: 'center',
                background: 'var(--surface)',
                border: '1px solid var(--card-border)',
                boxShadow: a.unlocked ? '0px 6px 18px rgba(224,108,58,0.12)' : 'var(--shadow-card)',
                cursor: 'pointer',
              }}
            >
              {/* Hex-style framed badge */}
              <div style={{ position: 'relative', width: 52, height: 52, margin: '0 auto 8px' }}>
                {/* outer tier ring */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: a.unlocked
                    ? 'conic-gradient(from 180deg, var(--accent-primary-light), var(--accent-primary), var(--accent-primary-deep), var(--accent-primary-light))'
                    : 'var(--divider)',
                  padding: 2,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: a.unlocked ? 'var(--navy)' : 'var(--neutral-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                    boxShadow: a.unlocked ? 'inset 0 0 10px rgba(224,108,58,0.35)' : 'none',
                  }}>
                    {a.unlocked
                      ? <span style={{ filter: 'saturate(1.1)' }}>{a.emoji}</span>
                      : <Award className="w-5 h-5" style={{ color: 'var(--text-muted)' }} strokeWidth={1.75} />}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2, lineHeight: 1.2 }}>
                {a.name}
              </p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.35 }}>
                {a.unlocked ? 'Unlocked' : a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Vault & Consent — amber background, amber left-border */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5" style={{ color: 'var(--warning-700)' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
            Data Vault &amp; Consent
          </h3>
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.55 }}>
          You own your voice data. Review and manage consent for every dataset.
        </p>
        <div className="space-y-3">
          {dataVaultItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--warning-50)',
                borderRadius: 16,
                border: '1px solid var(--warning-100)',
                padding: '18px',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{item.dataset}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                    Submitted {item.submitted} · {item.clips} clips
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 11, fontWeight: 700,
                    padding: '4px 12px', borderRadius: 999,
                    background: 'var(--status-success-bg)', color: 'var(--status-success-text)', flexShrink: 0,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <button
                onClick={() => setShowRevokeSheet(true)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '10px', borderRadius: 999,
                  border: '1.5px solid var(--error-200)', background: 'var(--status-error-bg)', color: 'var(--status-error-text)',
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 3, letterSpacing: '-0.01em' }}>
          Grow with Feul
        </h3>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 16 }}>
          Unlock exclusive roles and maximize your earning potential.
        </p>

        <div className="space-y-4">
          {/* Become a Validator */}
          <motion.button
            whileTap={{ scale: 0.985, y: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={() => navigate('/validator-apply')}
            style={{
              width: '100%', background: 'var(--surface)', borderRadius: 20,
              border: '1px solid var(--card-border)', padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0px 4px 12px rgba(90, 123, 109, 0.08)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'var(--success-50)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <ShieldCheck className="w-6 h-6" style={{ color: 'var(--success-700)' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Validator Tier</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Review audio quality and earn ₹2 per clip graded. Restricted to top 5% of contributors.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          </motion.button>

          {/* Company — Quest Creator */}
          <motion.button
            whileTap={{ scale: 0.985, y: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={() => navigate('/quest-creator-apply')}
            style={{
              width: '100%', background: 'var(--surface)', borderRadius: 20,
              border: '1px solid var(--card-border)', padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0px 4px 12px rgba(107, 115, 148, 0.08)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'var(--info-50)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Building2 className="w-6 h-6" style={{ color: 'var(--info-700)' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Quest Creator</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Create campaigns and manage large-scale data collection. Business account required.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          </motion.button>
        </div>
      </div>

      {/* Menu — naked dividers, no card wrappers */}
      <div className="px-6 mb-12">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              whileTap={{ scale: 0.985, backgroundColor: 'rgba(28,36,52,0.03)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              key={item.id}
              className="flex items-center justify-between w-full"
              style={{
                padding: '16px 0',
                borderBottom: idx < menuItems.length - 1 ? '1px solid var(--divider)' : 'none',
                background: 'transparent',
                cursor: 'pointer',
                border: 'none',
                borderBottomStyle: idx < menuItems.length - 1 ? 'solid' : 'none',
                borderBottomWidth: idx < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: 'var(--divider)',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.75} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </motion.button>
          );
        })}
      </div>

      {showRevokeSheet && (
        <DPDPConsentRevocation
          onClose={() => setShowRevokeSheet(false)}
          onRevoked={() => setShowRevokeSheet(false)}
        />
      )}
    </div>
  );
}