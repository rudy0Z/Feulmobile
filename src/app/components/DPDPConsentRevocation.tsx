'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Shield } from 'lucide-react';

interface Props {
  onClose: () => void;
  onRevoked: () => void;
}

export function DPDPConsentRevocation({ onClose, onRevoked }: Props) {
  const [confirmText, setConfirmText] = useState('');

  const isConfirmed = confirmText === 'DELETE';

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="dpdp-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          background: 'rgba(0,0,0,0.5)',
        }}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <motion.div
        key="dpdp-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 51,
          background: 'var(--surface-ground)',
          borderRadius: '24px 24px 0 0',
          padding: '28px 24px 40px',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 999,
            background: 'var(--t-bone-100)',
            margin: '0 auto 20px',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <AlertTriangle
            size={20}
            style={{ color: 'var(--state-failed)', flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Revoke Data Consent
            </h2>
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            margin: '0 0 20px',
          }}
        >
          This action is permanent and cannot be undone.
        </p>

        {/* Red caution card */}
        <div
          style={{
            background: 'var(--t-crimson-50)',
            border: '1px solid rgba(var(--crimson-rgb),0.2)',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <Shield size={14} style={{ color: 'var(--state-failed)' }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--state-failed)',
              }}
            >
              Data Deletion Warning
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--state-failed)',
              margin: 0,
            }}
          >
            Revoking consent will permanently delete 42 clips from active AI training runs. This
            data cannot be recovered.
          </p>
        </div>

        {/* Financial deduction row */}
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 12,
            padding: '12px 16px',
            border: '1px solid var(--border-subtle)',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Clips still in review</div>
          <div
            style={{
              fontFamily: 'var(--font-number)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--state-failed)',
              marginTop: 2,
            }}
          >
            -₹60.00
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            These clips can't be reviewed once you withdraw consent. Your ₹127.50 of settled earnings stays yours.
          </div>
        </div>

        {/* Confirmation input */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 8,
            }}
          >
            Type DELETE to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
            placeholder="DELETE"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: `2px solid ${isConfirmed ? 'var(--state-failed)' : 'var(--border-subtle)'}`,
              fontFamily: 'var(--font-number)',
              fontSize: 16,
              fontWeight: 700,
              background: 'var(--surface-raised)',
              color: 'var(--text-primary)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Primary button */}
        <button
          onClick={onRevoked}
          disabled={!isConfirmed}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 999,
            background: isConfirmed ? 'var(--state-failed)' : 'var(--t-bone-100)',
            color: isConfirmed ? 'var(--t-bone-0)' : 'var(--text-muted)',
            border: 'none',
            fontSize: 15,
            fontWeight: 700,
            cursor: isConfirmed ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Permanently Delete Data
        </button>

        {/* Secondary button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'var(--surface-studio)',
            fontWeight: 700,
            fontSize: 14,
            marginTop: 12,
            cursor: 'pointer',
            padding: '8px 0',
          }}
        >
          Keep My Data &amp; Keep Earning
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
