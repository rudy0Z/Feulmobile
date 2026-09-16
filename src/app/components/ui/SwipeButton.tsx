import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ChevronRight, Check } from 'lucide-react';

interface SwipeButtonProps {
  label?: string;
  completeLabel?: string;
  onComplete: () => void;
  disabled?: boolean;
  /** Hex for the fill that reveals as user drags. Defaults to brand orange. */
  fillColor?: string;
  /** Hex for the success fill once the swipe completes. */
  successColor?: string;
  height?: number;
}

export function SwipeButton({
  label = 'Swipe to confirm',
  completeLabel = 'Confirmed',
  onComplete,
  disabled = false,
  fillColor = 'var(--action-primary-pressed)',
  successColor = 'var(--state-settled)',
  height = 58,
}: SwipeButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [completed, setCompleted] = useState(false);
  const x = useMotionValue(0);

  // Knob is the same diameter as the track height; max-drag = trackWidth - knobSize
  const maxDrag = Math.max(trackWidth - height, 0);

  // Reveal-fill width grows with knob position
  const fillWidth = useTransform(x, (v) => v + height);
  // Label fades out as user drags
  const labelOpacity = useTransform(x, [0, maxDrag * 0.6], [1, 0]);
  // Subtle scale pulse on the knob as it approaches the threshold
  const knobShadow = useTransform(
    x,
    [0, maxDrag],
    [
      '0px 6px 18px rgba(var(--carbon-rgb),0.18)',
      `0px 6px 24px ${successColor}66`,
    ]
  );

  const measure = (el: HTMLDivElement | null) => {
    trackRef.current = el;
    if (el) setTrackWidth(el.getBoundingClientRect().width);
  };

  const handleDragEnd = () => {
    if (disabled) return;
    const current = x.get();
    if (current >= maxDrag * 0.95) {
      animate(x, maxDrag, { type: 'spring', stiffness: 380, damping: 30 });
      setCompleted(true);
      // Light haptic where supported
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { (navigator as Navigator).vibrate?.(18); } catch {}
      }
      setTimeout(onComplete, 260);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 480, damping: 32 });
    }
  };

  return (
    <div
      ref={measure}
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 'var(--r-full)',
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'inset 0px 1px 2px rgba(var(--carbon-rgb),0.05)',
        overflow: 'hidden',
        opacity: disabled ? 0.55 : 1,
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Reveal fill */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: fillWidth,
          background: completed
            ? `linear-gradient(90deg, ${successColor} 0%, ${successColor} 100%)`
            : `linear-gradient(90deg, ${fillColor}cc 0%, ${fillColor} 100%)`,
          borderRadius: 'var(--r-full)',
        }}
      />

      {/* Label */}
      <motion.span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--fs-body)',
          fontWeight: 700,
          color: completed ? 'var(--surface-raised)' : 'var(--text-primary)',
          letterSpacing: '0.01em',
          opacity: completed ? 1 : labelOpacity,
          pointerEvents: 'none',
        }}
      >
        {completed ? completeLabel : label}
      </motion.span>

      {/* Knob */}
      <motion.div
        drag={!disabled && !completed ? 'x' : false}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.04}
        dragMomentum={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: height,
          height,
          borderRadius: '50%',
          background: 'var(--surface-raised)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          x,
          boxShadow: knobShadow,
          cursor: disabled ? 'default' : 'grab',
        }}
        whileTap={{ cursor: 'grabbing' }}
        onDragEnd={handleDragEnd}
      >
        {completed ? (
          <Check style={{ width: 22, height: 22, color: successColor }} strokeWidth={2.6} />
        ) : (
          <ChevronRight style={{ width: 22, height: 22, color: fillColor }} strokeWidth={2.6} />
        )}
      </motion.div>
    </div>
  );
}
