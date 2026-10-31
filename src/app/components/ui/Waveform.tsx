/**
 * Feul Signature Waveform — decorative audio waveform element.
 * Used as background texture on hero sections throughout the app.
 *
 * variant:
 *   'audio'     → organic sine pattern (Contributor screens)
 *   'precision' → uniform, staircase-like bars (Validator screens)
 *   'data'      → spiky data-chart bars (Quest Creator screens)
 */
export function Waveform({
  color = 'var(--action-primary)',
  opacity = 0.08,
  height = 60,
  className = '',
  variant = 'audio',
}: {
  color?: string;
  opacity?: number;
  height?: number;
  className?: string;
  variant?: 'audio' | 'precision' | 'data';
}) {
  const bars = variant === 'data' ? 38 : variant === 'precision' ? 52 : 48;
  const barWidth = 100 / bars;

  const getBarHeight = (i: number): number => {
    switch (variant) {
      case 'precision':
        // Even, measured bars — quality/accuracy feel
        return (
          Math.abs(Math.sin(i * 0.28) * 0.52 + Math.cos(i * 0.14) * 0.48) *
            (height * 0.80) +
          height * 0.12
        );
      case 'data':
        // Spiky asymmetric peaks — analytics/data chart feel
        return (
          Math.abs(Math.sin(i * 0.72) * 0.78 + Math.sin(i * 1.5) * 0.22) *
            (height * 0.90) +
          height * 0.05
        );
      default: // 'audio'
        // Organic sine — natural voice/audio feel
        return (
          Math.abs(Math.sin(i * 0.45) * 0.7 + Math.sin(i * 0.22) * 0.3) *
            (height * 0.85) +
          height * 0.08
        );
    }
  };

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height, opacity }}
      preserveAspectRatio="none"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const h = getBarHeight(i);
        const x = i * barWidth + barWidth * 0.15;
        const w = barWidth * (variant === 'data' ? 0.62 : variant === 'precision' ? 0.50 : 0.55);
        const y = (height - h) / 2;
        const rx = variant === 'precision' ? w * 0.25 : w / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={rx}
            fill={color}
          />
        );
      })}
    </svg>
  );
}

/**
 * Prominent waveform used on recording / grading screens
 */
export function WaveformProminent({
  color = 'var(--action-primary)',
  height = 80,
  className = '',
  variant = 'audio',
}: {
  color?: string;
  height?: number;
  className?: string;
  variant?: 'audio' | 'precision' | 'data';
}) {
  return (
    <Waveform
      color={color}
      opacity={0.35}
      height={height}
      className={className}
      variant={variant}
    />
  );
}
