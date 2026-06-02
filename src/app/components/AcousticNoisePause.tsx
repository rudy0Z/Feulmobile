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
        background: 'rgba(10,12,16,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--navy)',
          borderRadius: 24,
          padding: 24,
          margin: 24,
          width: '100%',
          maxWidth: 390,
          boxSizing: 'border-box',
        }}
      >
        {/* Top: icon + title */}
        <div style={{ textAlign: 'center' }}>
          <Volume2 size={28} style={{ color: 'var(--warning-700)' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '12px 0 0',
            }}
          >
            Recording Paused
          </h2>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--warning-700)',
              marginTop: 4,
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
            gap: 2,
            height: 50,
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 20,
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
                  background: 'var(--warning-700)',
                  borderRadius: 999,
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
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Current — warning */}
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 14,
              padding: 14,
              border: '1px solid rgba(255,165,0,0.2)',
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              CURRENT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--warning-700)',
                marginTop: 4,
              }}
            >
              42 dB
            </div>
            <div style={{ fontSize: 10, color: 'var(--warning-700)', marginTop: 2 }}>
              Too Loud
            </div>
          </div>

          {/* Target — success */}
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 14,
              padding: 14,
              border: '1px solid rgba(45,200,100,0.2)',
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              TARGET
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--success-500)',
                marginTop: 4,
              }}
            >
              &lt; 12 dB
            </div>
            <div style={{ fontSize: 10, color: 'var(--success-500)', marginTop: 2 }}>
              Quiet Zone
            </div>
          </div>
        </div>

        {/* Gain adjustment slider */}
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
            <span>Gain Adjustment</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{gainValue} dB</span>
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
              borderRadius: 999,
              background: `linear-gradient(to right, var(--accent-primary) ${sliderFillPct}%, rgba(255,255,255,0.1) ${sliderFillPct}%)`,
              outline: 'none',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4,
              fontSize: 10,
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
            marginTop: 16,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 4,
            }}
          >
            <Lightbulb size={12} style={{ flexShrink: 0 }} />
            Tips to reduce noise
          </div>
          {tips.map((tip, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                marginTop: 4,
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
            borderRadius: 999,
            background:
              'linear-gradient(160deg, var(--accent-primary-light), var(--accent-primary-deep))',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            marginTop: 20,
          }}
        >
          Recalibrate &amp; Resume
        </button>

        {/* Cancel */}
        <div
          onClick={onClose}
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            marginTop: 12,
            cursor: 'pointer',
          }}
        >
          Abandon Recording Session
        </div>
      </div>
    </div>
  );
}
