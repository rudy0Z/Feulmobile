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
          background: 'rgba(var(--scrim-rgb),0.5)',
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
          borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
          padding: 'var(--space-11) var(--space-10) var(--space-13)',
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
            borderRadius: 'var(--r-full)',
            background: 'var(--surface-sunken)',
            margin: '0 auto 20px',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', marginBottom: 'var(--space-4)'}}>
          <AlertTriangle
            size={20}
            style={{ color: 'var(--state-failed)', flexShrink: 0, marginTop: 'var(--space-1)'}}
          />
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--fs-section)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0',
              }}
            >
              Revoke Data Consent
            </h2>
          </div>
        </div>
        <p
          style={{
            fontSize: 'var(--fs-secondary)',
            color: 'var(--text-muted)',
            margin: '0 0 var(--space-9)',
          }}
        >
          This action is permanent and cannot be undone.
        </p>

        {/* Red caution card */}
        <div
          style={{
            background: 'var(--state-failed-container)',
            border: '1px solid rgba(var(--crimson-rgb),0.2)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <Shield size={14} style={{ color: 'var(--state-failed)' }} />
            <span
              style={{
                fontSize: 'var(--fs-caption)',
                fontWeight: 700,
                color: 'var(--state-failed)',
              }}
            >
              Data Deletion Warning
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--fs-secondary)',
              lineHeight: 1.6,
              color: 'var(--state-failed)',
              margin: '0',
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
            borderRadius: 'var(--r-sm)',
            padding: 'var(--space-6) var(--space-8)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-9)',
          }}
        >
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Clips still in review</div>
          <div
            style={{
              fontFamily: 'var(--font-number)',
              fontSize: 'var(--fs-title)',
              fontWeight: 700,
              color: 'var(--state-failed)',
              marginTop: 'var(--space-1)',
            }}
          >
            -₹60.00
          </div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 'var(--space-2)'}}>
            These clips can't be reviewed once you withdraw consent. Your ₹127.50 of settled earnings stays yours.
          </div>
        </div>

        {/* Confirmation input */}
        <div style={{ marginBottom: 'var(--space-10)'}}>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--fs-caption)',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 'var(--space-4)',
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
              padding: 'var(--space-6) var(--space-8)',
              borderRadius: 'var(--r-sm)',
              border: `2px solid ${isConfirmed ? 'var(--state-failed)' : 'var(--border-subtle)'}`,
              fontFamily: 'var(--font-number)',
              fontSize: 'var(--fs-body)',
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
            borderRadius: 'var(--r-full)',
            background: isConfirmed ? 'var(--state-failed)' : 'var(--surface-sunken)',
            color: isConfirmed ? 'var(--text-on-dark)' : 'var(--text-muted)',
            border: 'none',
            fontSize: 'var(--fs-body)',
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
            fontSize: 'var(--fs-secondary)',
            marginTop: 'var(--space-6)',
            cursor: 'pointer',
            padding: 'var(--space-4) 0',
          }}
        >
          Keep My Data &amp; Keep Earning
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
