'use client';

import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

interface Props {
  onVerify: () => void;
  onHome: () => void;
}

export function RoleCollisionLockout({ onVerify, onHome }: Props) {
  const fingerprintDetails = [
    { color: 'var(--state-failed)', label: 'Device fingerprint: matched' },
    { color: 'var(--state-failed)', label: 'IP network: same session' },
    { color: 'var(--money-pending)', label: 'Account overlap: under review' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(var(--carbon-rgb),0.97)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          margin: 'auto',
          padding: 'var(--space-12) var(--space-10)',
          maxWidth: 340,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'rgba(var(--crimson-rgb),0.12)',
            border: '1px solid rgba(var(--crimson-rgb),0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <ShieldAlert size={64} style={{ color: 'var(--state-failed)' }} />
        </div>

        {/* Policy violation badge */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            display: 'inline-block',
            background: 'rgba(var(--crimson-rgb),0.15)',
            border: '1px solid rgba(var(--crimson-rgb),0.3)',
            borderRadius: 'var(--r-full)',
            padding: 'var(--space-2) var(--space-7)',
            fontSize: 'var(--fs-caption)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'var(--state-failed)',
            textTransform: 'uppercase',
            marginTop: 'var(--space-8)',
          }}
        >
          POLICY VIOLATION
        </motion.div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-title)',
            fontWeight: 800,
            color: 'var(--text-on-dark)',
            marginTop: 'var(--space-9)',
            marginBottom: '0',
            lineHeight: 1.2,
          }}
        >
          Role Collision Detected
        </h1>

        {/* Sub */}
        <div
          style={{
            fontSize: 'var(--fs-secondary)',
            fontWeight: 600,
            color: 'var(--state-failed)',
            marginTop: 'var(--space-2)',
          }}
        >
          Session Suspended
        </div>

        {/* Explanation card */}
        <div
          style={{
            background: 'rgba(var(--bone-0-rgb),0.04)',
            border: '1px solid rgba(var(--bone-0-rgb),0.07)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--space-9)',
            marginTop: 'var(--space-10)',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 'var(--fs-secondary)',
              lineHeight: 1.65,
              color: 'rgba(var(--bone-0-rgb),0.6)',
              margin: '0',
            }}
          >
            Our system has detected that this grading session was assigned to audio clips
            originating from your Contributor account on this device.
          </p>

          {/* Divider */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              borderTop: '1px solid rgba(var(--bone-0-rgb),0.07)',
            }}
          />

          <p
            style={{
              fontSize: 'var(--fs-secondary)',
              lineHeight: 1.65,
              color: 'rgba(var(--bone-0-rgb),0.6)',
              margin: '0',
            }}
          >
            Concurrent Contributor + Validator roles on the same device and IP network fingerprint
            violate the marketplace integrity rules.
          </p>

          {/* Fingerprint detail rows */}
          <div style={{ marginTop: 'var(--space-6)'}}>
            {fingerprintDetails.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginTop: i === 0 ? 0 : 6,
                  fontSize: 'var(--fs-caption)',
                  fontWeight: 600,
                  color: 'rgba(var(--bone-0-rgb),0.5)',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 'var(--space-11)'}}>
          <button
            onClick={onVerify}
            style={{
              width: '100%',
              height: 58,
              borderRadius: 'var(--r-full)',
              background: 'var(--state-failed)',
              color: 'var(--text-on-dark)',
              fontSize: 'var(--fs-body)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 8px 24px rgba(var(--crimson-rgb),0.35)',
            }}
          >
            Verify Validator Identity
          </button>

          <button
            onClick={onHome}
            style={{
              width: '100%',
              marginTop: 'var(--space-6)',
              background: 'none',
              border: 'none',
              fontSize: 'var(--fs-secondary)',
              fontWeight: 700,
              color: 'rgba(var(--bone-0-rgb),0.45)',
              cursor: 'pointer',
              padding: 'var(--space-4) 0',
            }}
          >
            Return to Home
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 'var(--fs-caption)',
            color: 'rgba(var(--bone-0-rgb),0.2)',
            marginTop: 'var(--space-9)',
            fontFamily: 'var(--font-number)',
          }}
        >
          Session ID: FSN-2847-VIOLATION · Case logged
        </div>
      </div>
    </div>
  );
}
