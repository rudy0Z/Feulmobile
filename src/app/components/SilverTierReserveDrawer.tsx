'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mic, CheckCircle2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  onStartQuests: () => void;
}

export function SilverTierReserveDrawer({ onClose, onStartQuests }: Props) {
  const unlocksAtSilver = [
    'Full reserve released — ₹120',
    '1.25× earnings multiplier',
    'Priority quest access',
  ];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="reserve-backdrop"
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

      {/* Bottom drawer */}
      <motion.div
        key="reserve-drawer"
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
          background: 'var(--background)',
          borderRadius: '24px 24px 0 0',
          padding: '24px 24px 36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 999,
            background: 'var(--neutral-100)',
            margin: '0 auto 20px',
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Lock size={20} style={{ color: 'var(--warning-700)', flexShrink: 0 }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Locked Reserve Balance
          </h2>
        </div>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            margin: '0 0 24px',
          }}
        >
          Your Bronze tier holds a portion of earnings until Silver is reached.
        </p>

        {/* Balance display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 12,
          }}
        >
          {/* Left: locked */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 36,
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              ₹120
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>locked</div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 40,
              background: 'var(--divider)',
              flexShrink: 0,
            }}
          />

          {/* Right: total reserve */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 36,
                fontWeight: 700,
                color: 'var(--text-muted)',
                lineHeight: 1,
              }}
            >
              ₹200
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              total reserve
            </div>
          </div>
        </div>

        {/* Available now badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <div
            style={{
              background: 'var(--color-success)',
              color: '#FFFFFF',
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-block',
            }}
          >
            ₹80.00 available now
          </div>
        </div>

        {/* Progress bar section */}
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            <span>Reserve Progress</span>
            <span>65%</span>
          </div>
          {/* Track */}
          <div
            style={{
              background: 'var(--neutral-100)',
              borderRadius: 999,
              height: 10,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{
                height: 10,
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-400))',
                borderRadius: 999,
              }}
            />
          </div>
        </div>

        {/* Milestone row */}
        <div
          style={{
            marginTop: 20,
            background: 'var(--surface)',
            border: '1px solid var(--card-border)',
            borderRadius: 16,
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mic size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              18 more verified clips to unlock
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginTop: 4,
            }}
          >
            Complete Silver Quest tier to release ₹120 and earn 1.25× payout multiplier
          </div>
        </div>

        {/* What unlocks at Silver */}
        <div style={{ marginTop: 16 }}>
          {unlocksAtSilver.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                paddingTop: i === 0 ? 0 : 8,
              }}
            >
              <CheckCircle2 size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Primary button */}
        <button
          onClick={onStartQuests}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 999,
            background:
              'linear-gradient(160deg, var(--accent-primary-light), var(--accent-primary-deep))',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.35)',
            marginTop: 24,
          }}
        >
          Complete Silver Quests
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginTop: 12,
            cursor: 'pointer',
            padding: '8px 0',
          }}
        >
          Withdraw Available ₹80.00 Now
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
