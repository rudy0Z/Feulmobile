import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, AlertTriangle } from 'lucide-react';

type Coaching = 'too-quiet' | 'ideal' | 'clipping';

interface VoiceVisualizerProps {
  active: boolean;
  height?: number;
  /**
   * In the sandbox environment microphone access is not reliable, so the
   * visualizer uses a deterministic-yet-organic simulated signal. When the
   * Web Audio API is available and permission has been granted elsewhere
   * the component will still render a believable coaching surface.
   */
  bars?: number;
}

const BAR_COUNT_DEFAULT = 28;

// Smooths a target value toward `next` with given rate
const ease = (current: number, target: number, rate: number) =>
  current + (target - current) * rate;

export function VoiceVisualizer({ active, height = 110, bars = BAR_COUNT_DEFAULT }: VoiceVisualizerProps) {
  const [levels, setLevels] = useState<number[]>(() => Array(bars).fill(0.12));
  const [coaching, setCoaching] = useState<Coaching>('ideal');
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef(0);
  const driftRef = useRef(0.55);

  useEffect(() => {
    if (!active) {
      setLevels(Array(bars).fill(0.08));
      setCoaching('ideal');
      return;
    }

    const loop = () => {
      tickRef.current += 1;
      const t = tickRef.current;

      // Slow drift between speaking, quiet, and peak phases so coaching cycles
      // through all three states organically.
      driftRef.current = ease(driftRef.current, 0.4 + 0.35 * Math.sin(t / 90), 0.04);
      const base = driftRef.current;

      // Occasional clipping spikes
      const spike = Math.sin(t / 7) > 0.92 ? 0.25 : 0;

      setLevels((prev) =>
        prev.map((v, i) => {
          const wave =
            base +
            0.18 * Math.sin(t / 6 + i * 0.45) +
            0.10 * Math.sin(t / 11 + i * 0.18) +
            spike * (i % 3 === 0 ? 1 : 0.4);
          const jitter = (Math.random() - 0.5) * 0.08;
          const target = Math.min(1, Math.max(0.05, wave + jitter));
          return ease(v, target, 0.35);
        })
      );

      // Derive coaching state from the running average
      const avg = base + spike * 0.4;
      const next: Coaching = avg < 0.32 ? 'too-quiet' : avg > 0.82 ? 'clipping' : 'ideal';
      setCoaching((prev) => (prev === next ? prev : next));

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, bars]);

  const coachingMeta: Record<Coaching, { label: string; sub: string; color: string; bg: string; Icon: typeof Volume2 }> = {
    'too-quiet': {
      label: 'Speak up a little',
      sub: 'We can barely hear you',
      color: 'var(--t-ochre-700)',
      bg: 'rgba(var(--ochre-rgb),0.14)',
      Icon: VolumeX,
    },
    'ideal': {
      label: 'Sounds great',
      sub: 'Ideal room level',
      color: 'var(--t-verdigris-500)',
      bg: 'rgba(var(--verdigris-rgb),0.14)',
      Icon: Volume2,
    },
    'clipping': {
      label: 'A bit too loud',
      sub: 'Pull back from the mic',
      color: 'var(--t-crimson-500)',
      bg: 'rgba(var(--crimson-rgb),0.14)',
      Icon: AlertTriangle,
    },
  };

  const meta = coachingMeta[coaching];
  const Icon = meta.Icon;

  return (
    <div style={{ width: '100%' }}>
      {/* Bar canvas */}
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          padding: '0 4px',
        }}
      >
        {levels.map((v, i) => {
          const h = Math.max(6, v * (height - 16));
          const isPeak = v > 0.82;
          const isQuiet = v < 0.32;
          const color = isPeak ? 'var(--t-crimson-500)' : isQuiet ? 'var(--text-muted)' : 'var(--accent-primary-deep)';
          return (
            <div
              key={i}
              style={{
                width: 4,
                height: h,
                borderRadius: 4,
                background: color,
                opacity: active ? 0.95 : 0.35,
                transition: 'height 0.08s linear, background 0.18s linear',
                boxShadow: active && !isQuiet ? `0 0 6px ${color}55` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Coaching pill */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={coaching}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              borderRadius: 999,
              background: meta.bg,
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Icon style={{ width: 14, height: 14, color: meta.color }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{meta.label}</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: meta.color, opacity: 0.75 }}>
                {meta.sub}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
