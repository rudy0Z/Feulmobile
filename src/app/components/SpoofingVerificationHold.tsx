'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, UserCircle2, X, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
  onVerified: () => void;
}

export function SpoofingVerificationHold({ onClose, onVerified }: Props) {
  const [holdProgress, setHoldProgress] = useState(0);
  const [verified, setVerified] = useState(false);
  const [holding, setHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  const startHold = () => {
    if (verified) return;
    setHolding(true);
    intervalRef.current = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + 2, 100);
      setHoldProgress(progressRef.current);
      if (progressRef.current >= 100) {
        clearInterval(intervalRef.current!);
        setVerified(true);
        setTimeout(() => onVerified(), 600);
      }
    }, 40);
  };

  const stopHold = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHolding(false);
    if (!verified) {
      progressRef.current = 0;
      setHoldProgress(0);
    }
  };

  const waveBarHeights = [
    16, 24, 12, 28, 20, 32, 14, 22, 18, 26,
    12, 30, 16, 24, 10, 28, 20, 14, 22, 18,
  ];

  // SVG dimensions for the camera ring
  const cx = 60;
  const cy = 60;
  const r = 48;
  const circumference = 2 * Math.PI * r;
  const arcDegrees = 220;
  const arcLength = (arcDegrees / 360) * circumference;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(var(--carbon-rgb),0.92)',
      }}
    >
      {/* Card */}
      <div
        style={{
          background: 'var(--surface-studio)',
          borderRadius: 24,
          padding: 28,
          maxWidth: 340,
          width: '100%',
          margin: '0 auto',
          boxShadow: 'var(--e-2)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            padding: 0,
          }}
        >
          <X size={16} />
        </button>

        {/* Camera verification ring */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width={120}
              height={120}
              viewBox="0 0 120 120"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Outer dashed ring */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={3}
                strokeDasharray="6 4"
              />
            </svg>
            {/* Animated inner arc */}
            <motion.svg
              width={120}
              height={120}
              viewBox="0 0 120 120"
              style={{ position: 'absolute', top: 0, left: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="var(--action-primary)"
                strokeWidth={2.5}
                strokeDasharray={`${arcLength} ${circumference - arcLength}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </motion.svg>
            {/* User silhouette */}
            <UserCircle2
              size={36}
              style={{ color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}
            />
          </div>

          {/* LIVE badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 10,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--state-failed)',
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* Waveform */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
            height: 40,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {waveBarHeights.map((maxH, i) => (
            <motion.div
              key={i}
              style={{
                width: 3,
                background: 'var(--action-primary)',
                borderRadius: 999,
                originY: 1,
              }}
              animate={{ scaleY: [0.2, 1, 0.2] }}
              transition={{
                duration: 0.8 + (i % 5) * 0.15,
                repeat: Infinity,
                delay: i * 0.07,
                ease: 'easeInOut',
              }}
              initial={{ height: maxH }}
            />
          ))}
        </div>

        {/* Prompt card */}
        <div
          style={{
            background: 'var(--t-ochre-50)',
            border: '1px solid var(--t-ochre-50)',
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--money-pending)',
              marginBottom: 6,
            }}
          >
            READ ALOUD
          </div>
          <div
            style={{
              fontFamily: 'var(--font-number)',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >
            "The quick blue jay flew over the tall green pine tree."
          </div>
        </div>

        {/* Hold button */}
        <div style={{ position: 'relative', width: '100%' }}>
          <button
            onPointerDown={startHold}
            onPointerUp={stopHold}
            onPointerLeave={stopHold}
            style={{
              position: 'relative',
              width: '100%',
              height: 58,
              borderRadius: 999,
              background:
                'linear-gradient(160deg, var(--t-terracotta-500), var(--action-primary-pressed))',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--t-bone-0)',
              overflow: 'hidden',
            }}
          >
            {/* Progress fill overlay */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${holdProgress}%`,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 999,
                transition: 'none',
                pointerEvents: 'none',
              }}
            />
            {!verified && !holding && <Mic size={18} style={{ position: 'relative', zIndex: 1 }} />}
            {verified && <Check size={18} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {holding
                ? `Verifying… ${holdProgress}%`
                : verified
                ? 'Identity Verified'
                : 'Hold to Record & Verify'}
            </span>
          </button>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          Your audio is processed locally and never stored
        </div>
      </div>
    </div>
  );
}
