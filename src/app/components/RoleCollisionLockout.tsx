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
          padding: '32px 24px',
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
            borderRadius: 999,
            padding: '4px 14px',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'var(--state-failed)',
            textTransform: 'uppercase',
            marginTop: 16,
          }}
        >
          POLICY VIOLATION
        </motion.div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 24,
            fontWeight: 800,
            color: 'var(--t-bone-0)',
            marginTop: 20,
            marginBottom: 0,
            lineHeight: 1.2,
          }}
        >
          Role Collision Detected
        </h1>

        {/* Sub */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--state-failed)',
            marginTop: 4,
          }}
        >
          Session Suspended
        </div>

        {/* Explanation card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: 20,
            marginTop: 24,
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
            }}
          >
            Our system has detected that this grading session was assigned to audio clips
            originating from your Contributor account on this device.
          </p>

          {/* Divider */}
          <div
            style={{
              marginTop: 12,
              marginBottom: 12,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          />

          <p
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
            }}
          >
            Concurrent Contributor + Validator roles on the same device and IP network fingerprint
            violate Feul's marketplace integrity rules.
          </p>

          {/* Fingerprint detail rows */}
          <div style={{ marginTop: 12 }}>
            {fingerprintDetails.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: i === 0 ? 0 : 6,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
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
        <div style={{ marginTop: 28 }}>
          <button
            onClick={onVerify}
            style={{
              width: '100%',
              height: 58,
              borderRadius: 999,
              background: 'var(--state-failed)',
              color: 'var(--t-bone-0)',
              fontSize: 16,
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
              marginTop: 12,
              background: 'none',
              border: 'none',
              fontSize: 14,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              padding: '8px 0',
            }}
          >
            Return to Home
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.2)',
            marginTop: 20,
            fontFamily: 'var(--font-number)',
          }}
        >
          Session ID: FSN-2847-VIOLATION · Case logged
        </div>
      </div>
    </div>
  );
}
