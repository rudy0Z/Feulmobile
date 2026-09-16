import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DPDPConsentRevocation } from './DPDPConsentRevocation';
import { Award, Settings, LogOut, ChevronRight, Shield, Trash2, ShieldCheck, Repeat2, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { RoleSwitcher } from './ui/RoleSwitcher';
import { tierName, nextTierName } from '../lib/tier';
import { useSession } from '../lib/session';

const dataVaultItems = [
  { id: 'ds-1', dataset: 'Customer Service Dataset 1', submitted: '2 weeks ago', clips: 42, status: 'Active' },
];

const menuItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout',   label: 'Log Out',  icon: LogOut   },
];

export function Profile() {
  const navigate = useNavigate();
  const { profile } = useSession();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [showRevokeSheet, setShowRevokeSheet]   = useState(false);

  const standingLevel = profile?.standing?.level ?? 1;
  const reliability   = profile?.standing?.reliability ?? 0;

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      <RoleSwitcher
        isOpen={roleSwitcherOpen}
        currentRole="contributor"
        onClose={() => setRoleSwitcherOpen(false)}
      />

      {/* Profile Header — avatar left, name dominant */}
      <div className="flex items-center gap-4 px-6 pt-16 pb-6">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 68, height: 68, borderRadius: '50%',
            /* Flat accent fill, not a gradient — a decorative wash here was
               both a banned gradient and competing with the Standing hero
               below it for attention. The avatar is identity, not the hero. */
            background: 'var(--action-primary)',
            boxShadow: 'var(--e-1)',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-on-accent)', letterSpacing: '-0.02em' }}>
            {profile?.initials || '·'}
          </span>
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--surface-raised)',
            border: '2px solid var(--surface-ground)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldCheck className="w-3 h-3" style={{ color: 'var(--state-settled)' }} strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-1)'}}>
            {profile?.name || 'Your profile'}
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>{profile?.email ?? ''}</p>
        </div>
      </div>

      {/* Stats — THIS MONTH, derived from the session (never hardcoded figures) */}
      <div className="px-6 mb-6">
        <div
          className="flex items-center justify-between"
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-1)',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>₹{Math.round(profile?.walletBalance ?? 0)}</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'var(--space-3)'}}>Earned</p>
          </div>
          <div style={{ width: 1, height: 36, background: 'var(--divider)' }} />
          <div className="text-center flex-1">
            <p style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{Math.round(reliability)}%</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'var(--space-3)'}}>Reliability</p>
          </div>
          <div style={{ width: 1, height: 36, background: 'var(--divider)' }} />
          <div className="text-center flex-1">
            <p style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'var(--font-number)' }}>{tierName(standingLevel).split(' ')[0]}</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'var(--space-3)'}}>Standing</p>
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
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            padding: 'var(--space-7) var(--space-9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--e-1)',
            cursor: 'pointer',
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--r-xs)',
              background: 'var(--action-primary-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Repeat2 className="w-4 h-4" style={{ color: 'var(--action-primary)' }} />
            </div>
            <div className="text-left">
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>Switch App Role</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>Currently: Contributor</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
        </motion.button>
      </div>

      {/* Standing Block — reliability, not reputation-as-currency */}
      <div className="px-6 mb-6">
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-2)',
            padding: 'var(--space-10)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--r-xs)',
                background: 'var(--action-primary-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ShieldCheck className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)' }}>Standing</span>
            </div>
            <span
              style={{
                background: 'var(--action-primary-soft)',
                borderRadius: 'var(--r-full)',
                padding: 'var(--space-2) var(--space-7)',
                fontSize: 'var(--fs-caption)',
                fontWeight: 700,
                color: 'var(--action-primary)',
              }}
            >
              {tierName(standingLevel)}
            </span>
          </div>

          {/* Reliability meter — the honest signal, not a spendable number */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)'}}>
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)' }}>Reliability</span>
            <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>{reliability}%</span>
          </div>
          <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-full)', height: 10, marginBottom: 'var(--space-8)', overflow: 'hidden' }}>
            <div
              style={{
                background: 'var(--state-settled)',
                borderRadius: 'var(--r-full)',
                height: 10,
                width: `${Math.max(4, reliability)}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          {/* Unlock preview */}
          <div
            style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}
          >
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Keep your work on-time and accepted to reach{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{nextTierName(standingLevel)}</strong> — it unlocks{' '}
              <strong style={{ color: 'var(--action-primary)' }}>earlier access to campaigns</strong> &amp;{' '}
              <strong style={{ color: 'var(--text-primary)' }}>faster reviews</strong>. Standing is not money.
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
            width: '100%', background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 'var(--space-7) var(--space-8)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-6)', cursor: 'pointer', textAlign: 'left',
            boxShadow: 'var(--e-1)',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--r-xs)',
            background: 'var(--surface-sunken)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>Performance Dashboard</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>Acceptance, quality &amp; consistency scores</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        </motion.button>
      </div>

      {/* Recognition — perks & badges, no XP currency */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.985, y: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={() => navigate('/contributor/rewards')}
          style={{
            width: '100%', background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)', padding: 'var(--space-8) var(--space-8)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-6)', cursor: 'pointer',
            textAlign: 'left', boxShadow: 'var(--e-1)',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--r-xs)',
            background: 'var(--action-primary-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Award className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={1.9} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>Recognition</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>
              Perks and badges you&apos;ve unlocked through your standing
            </p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        </motion.button>
      </div>

      {/* Data Vault & Consent */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5" style={{ color: 'var(--action-primary)' }} />
          <h3 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>
            Data Vault &amp; Consent
          </h3>
        </div>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--space-7)', lineHeight: 1.55 }}>
          You own your voice data. Review and manage consent for every dataset.
        </p>
        <div className="space-y-3">
          {dataVaultItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--surface-raised)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border-subtle)',
                padding: 'var(--space-8)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>{item.dataset}</p>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>
                    Submitted {item.submitted} · {item.clips} clips
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 'var(--fs-caption)', fontWeight: 700,
                    padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--r-full)',
                    background: 'var(--action-primary-soft)', color: 'var(--state-settled)', flexShrink: 0,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <button
                onClick={() => setShowRevokeSheet(true)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
                  padding: 'var(--space-5)', borderRadius: 'var(--r-full)',
                  border: '1.5px solid var(--border-subtle)', background: 'var(--surface-ground)', color: 'var(--state-failed)',
                  fontSize: 'var(--fs-secondary)', fontWeight: 600, cursor: 'pointer',
                }}
              >
                <Trash2 className="w-4 h-4" />
                Revoke Consent &amp; Delete Data
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pro Roles ── */}
      <div className="px-6 mb-8">
        <h3 style={{ fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)', letterSpacing: '-0.01em' }}>
          Pro Roles
        </h3>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 'var(--space-8)'}}>
          Take on new roles as your standing grows.
        </p>

        <div className="space-y-4">
          {/* Become a Validator */}
          <motion.button
            whileTap={{ scale: 0.985, y: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={() => navigate('/validator-apply')}
            style={{
              width: '100%', background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',
              border: '1px solid var(--border-subtle)', padding: 'var(--space-9)',
              display: 'flex', alignItems: 'center', gap: 'var(--space-8)', cursor: 'pointer',
              textAlign: 'left',
              boxShadow: 'var(--e-1)',
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 'var(--r-md)',
              background: 'var(--surface-sunken)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <ShieldCheck className="w-6 h-6" style={{ color: 'var(--state-settled)' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>Validator Tier</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Review audio quality and earn ₹2 per clip graded. Restricted to top 5% of contributors.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          </motion.button>
        </div>
      </div>

      {/* Menu — naked dividers */}
      <div className="px-6 mb-12">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              key={item.id}
              className="flex items-center justify-between w-full"
              style={{
                padding: 'var(--space-8) 0',
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
                <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
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
