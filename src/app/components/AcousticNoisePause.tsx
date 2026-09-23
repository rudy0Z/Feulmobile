'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Lightbulb } from 'lucide-react';

interface Props {
  onClose: () => void;
  onRecalibrate: () => void;
}

export function AcousticNoisePause({ onClose, onRecalibrate }: Props) {
  const [gainValue, setGainValue] = useState(42);

  const waveBarCount = 24;
  const chaosScales = [
    [0.3, 0.9, 0.1, 0.7, 0.4, 1.0, 0.2],
    [0.7, 0.2, 1.0, 0.4, 0.8, 0.1, 0.6],
    [0.1, 0.8, 0.3, 1.0, 0.2, 0.9, 0.5],
    [0.6, 0.1, 0.7, 0.3, 1.0, 0.4, 0.8],
    [0.4, 1.0, 0.2, 0.8, 0.1, 0.6, 0.3],
    [0.9, 0.3, 0.6, 0.1, 0.7, 0.5, 1.0],
  ];
  const chaosdurations = [0.35, 0.42, 0.31, 0.55, 0.38, 0.48, 0.33, 0.51, 0.36, 0.44, 0.29, 0.57, 0.40, 0.45, 0.32, 0.53, 0.37, 0.47, 0.34, 0.50, 0.39, 0.43, 0.30, 0.56];

  const tips = [
    'Move away from background music',
    'Close windows and doors',
    'Use a quiet indoor space',
  ];

  const sliderFillPct = (gainValue / 80) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(var(--carbon-rgb),0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--surface-studio)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--space-10)',
          margin: 'var(--space-10)',
          width: '100%',
          maxWidth: 390,
          boxSizing: 'border-box',
        }}
      >
        {/* Top: icon + title */}
        <div style={{ textAlign: 'center' }}>
          <Volume2 size={28} style={{ color: 'var(--money-pending)' }} />
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--fs-title)',
              fontWeight: 800,
              color: 'var(--text-on-dark)',
              margin: 'var(--space-6) 0 0',
            }}
          >
            Recording Paused
          </h2>
          <div
            style={{
              fontSize: 'var(--fs-secondary)',
              fontWeight: 600,
              color: 'var(--money-pending)',
              marginTop: 'var(--space-2)',
            }}
          >
            Environment Too Noisy
          </div>
        </div>

        {/* Chaotic waveform */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 'var(--space-1)',
            height: 50,
            justifyContent: 'center',
            marginTop: 'var(--space-9)',
            marginBottom: 'var(--space-9)',
          }}
        >
          {Array.from({ length: waveBarCount }).map((_, i) => {
            const scaleSet = chaosScales[i % chaosScales.length];
            return (
              <motion.div
                key={i}
                style={{
                  width: 3,
                  height: 24,
                  background: 'var(--money-pending)',
                  borderRadius: 'var(--r-full)',
                  originY: 1,
                }}
                animate={{ scaleY: scaleSet }}
                transition={{
                  duration: chaosdurations[i],
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.04,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>

        {/* Telemetry gauges */}
        <div style={{ display: 'flex', gap: 'var(--space-6)'}}>
          {/* Current — warning */}
          <div
            style={{
              flex: 1,
              background: 'rgba(var(--bone-0-rgb),0.05)',
              borderRadius: 'var(--r-md)',
              padding: 'var(--space-7)',
              border: '1px solid rgba(var(--ochre-rgb),0.2)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--fs-caption)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(var(--bone-0-rgb),0.4)',
              }}
            >
              CURRENT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-number)',
                fontSize: 'var(--fs-display)',
                fontWeight: 700,
                color: 'var(--money-pending)',
                marginTop: 'var(--space-2)',
              }}
            >
              42 dB
            </div>
            <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--money-pending)', marginTop: 'var(--space-1)'}}>
              Too Loud
            </div>
          </div>

          {/* Target — success */}
          <div
            style={{
              flex: 1,
              background: 'rgba(var(--bone-0-rgb),0.05)',
              borderRadius: 'var(--r-md)',
              padding: 'var(--space-7)',
              border: '1px solid rgba(var(--verdigris-rgb),0.2)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--fs-caption)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(var(--bone-0-rgb),0.4)',
              }}
            >
              TARGET
            </div>
            <div
              style={{
                fontFamily: 'var(--font-number)',
                fontSize: 'var(--fs-display)',
                fontWeight: 700,
                color: 'var(--state-settled)',
                marginTop: 'var(--space-2)',
              }}
            >
              &lt; 12 dB
            </div>
            <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--state-settled)', marginTop: 'var(--space-1)'}}>
              Quiet Zone
            </div>
          </div>
        </div>

        {/* Gain adjustment slider */}
        <div style={{ marginTop: 'var(--space-9)'}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--fs-caption)',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            <span>Gain Adjustment</span>
            <span style={{ fontFamily: 'var(--font-number)' }}>{gainValue} dB</span>
          </div>
          <input
            type="range"
            min={0}
            max={80}
            value={gainValue}
            onChange={(e) => setGainValue(Number(e.target.value))}
            style={{
              width: '100%',
              appearance: 'none',
              height: 6,
              borderRadius: 'var(--r-full)',
              background: `linear-gradient(to right, var(--action-primary) ${sliderFillPct}%, rgba(var(--bone-0-rgb),0.1) ${sliderFillPct}%)`,
              outline: 'none',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'var(--space-2)',
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-muted)',
            }}
          >
            <span>Quiet</span>
            <span>Loud</span>
          </div>
        </div>

        {/* Tips */}
        <div
          style={{
            marginTop: 'var(--space-8)',
            background: 'rgba(var(--bone-0-rgb),0.04)',
            borderRadius: 'var(--r-sm)',
            padding: 'var(--space-6) var(--space-7)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontSize: 'var(--fs-caption)',
              fontWeight: 700,
              color: 'rgba(var(--bone-0-rgb),0.5)',
              marginBottom: 'var(--space-2)',
            }}
          >
            <Lightbulb size={12} style={{ flexShrink: 0 }} />
            Tips to reduce noise
          </div>
          {tips.map((tip, i) => (
            <div
              key={i}
              style={{
                fontSize: 'var(--fs-caption)',
                color: 'rgba(var(--bone-0-rgb),0.4)',
                marginTop: 'var(--space-2)',
              }}
            >
              • {tip}
            </div>
          ))}
        </div>

        {/* Recalibrate button */}
        <button
          onClick={onRecalibrate}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 'var(--r-full)',
            background:
              'linear-gradient(160deg, var(--action-accent), var(--action-primary-pressed))',
            color: 'var(--text-on-dark)',
            fontSize: 'var(--fs-body)',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            marginTop: 'var(--space-9)',
          }}
        >
          Recalibrate &amp; Resume
        </button>

        {/* Cancel */}
        <div
          onClick={onClose}
          style={{
            fontSize: 'var(--fs-caption)',
            color: 'rgba(var(--bone-0-rgb),0.3)',
            textAlign: 'center',
            marginTop: 'var(--space-6)',
            cursor: 'pointer',
          }}
        >
          Abandon Recording Session
        </div>
      </div>
    </div>
  );
}
