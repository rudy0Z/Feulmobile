import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, AlertTriangle, Coins, Mic, Swords, ChevronLeft } from 'lucide-react';
import { SpoofingVerificationHold } from './SpoofingVerificationHold';
import { DPDPConsentRevocation } from './DPDPConsentRevocation';
import { SilverTierReserveDrawer } from './SilverTierReserveDrawer';
import { AcousticNoisePause } from './AcousticNoisePause';
import { RoleCollisionLockout } from './RoleCollisionLockout';

type OverlayId = 'spoof' | 'dpdp' | 'reserve' | 'noise' | 'collision' | null;

const overlays = [
  {
    id: 'spoof' as OverlayId,
    label: 'Spoofing Verification Hold',
    description: 'Hold-to-record biometric check during payout',
    icon: ShieldAlert,
    where: 'Payout → Step 2',
    accentBg: 'var(--accent-50)',
    accentText: 'var(--accent-primary-deep)',
    accentBorder: 'rgba(var(--accent-glow-rgb),0.18)',
  },
  {
    id: 'dpdp' as OverlayId,
    label: 'DPDP Consent Revocation',
    description: 'Permanent data deletion with financial deduction',
    icon: AlertTriangle,
    where: 'Profile → Revoke Consent',
    accentBg: 'var(--status-error-bg)',
    accentText: 'var(--status-error-text)',
    accentBorder: 'rgba(220,38,38,0.15)',
  },
  {
    id: 'reserve' as OverlayId,
    label: 'Silver Tier Reserve Drawer',
    description: 'Withdrawal eligibility & milestone progress',
    icon: Coins,
    where: 'Wallet → Withdraw Funds',
    accentBg: 'var(--warning-50)',
    accentText: '#B8860B',
    accentBorder: 'rgba(184,134,11,0.18)',
  },
  {
    id: 'noise' as OverlayId,
    label: 'Acoustic Noise Pause',
    description: 'Live noise detection during voice recording',
    icon: Mic,
    where: 'Recording → auto after 3s',
    accentBg: 'rgba(250,204,21,0.10)',
    accentText: '#A16207',
    accentBorder: 'rgba(250,204,21,0.25)',
  },
  {
    id: 'collision' as OverlayId,
    label: 'Role Collision Lockout',
    description: 'Policy violation block when grading own clips',
    icon: Swords,
    where: 'Grading → Clip 3 → Flag',
    accentBg: 'var(--status-error-bg)',
    accentText: 'var(--status-error-text)',
    accentBorder: 'rgba(220,38,38,0.15)',
  },
];

export function DebugGallery() {
  const navigate = useNavigate();
  const [active, setActive] = useState<OverlayId>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '56px 24px 20px',
          background: 'var(--navy)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 0',
            marginBottom: 20,
            position: 'relative',
          }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} />
          Back
        </button>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(var(--accent-glow-rgb),0.18)',
              border: '1px solid rgba(var(--accent-glow-rgb),0.3)',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 800,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              DEV ONLY
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 6px',
            }}
          >
            Overlay Gallery
          </h1>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
            }}
          >
            {overlays.length} failure-state modals · tap to preview
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {overlays.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.button
              key={o.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => setActive(o.id)}
              style={{
                width: '100%',
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid var(--card-border)',
                boxShadow: '0px 4px 16px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.7)',
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: o.accentBg,
                  border: `1px solid ${o.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon style={{ width: 22, height: 22, color: o.accentText }} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 3,
                    lineHeight: 1.3,
                  }}
                >
                  {o.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: 6,
                  }}
                >
                  {o.description}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'var(--neutral-100)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {o.where}
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--neutral-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Overlay renders ── */}
      <AnimatePresence>
        {active === 'spoof' && (
          <SpoofingVerificationHold
            key="spoof"
            onClose={() => setActive(null)}
            onVerified={() => setActive(null)}
          />
        )}
        {active === 'dpdp' && (
          <DPDPConsentRevocation
            key="dpdp"
            onClose={() => setActive(null)}
            onRevoked={() => setActive(null)}
          />
        )}
        {active === 'reserve' && (
          <SilverTierReserveDrawer
            key="reserve"
            onClose={() => setActive(null)}
            onStartQuests={() => setActive(null)}
          />
        )}
        {active === 'noise' && (
          <AcousticNoisePause
            key="noise"
            onClose={() => setActive(null)}
            onResume={() => setActive(null)}
          />
        )}
        {active === 'collision' && (
          <RoleCollisionLockout
            key="collision"
            onClose={() => setActive(null)}
            onSwitchRole={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
