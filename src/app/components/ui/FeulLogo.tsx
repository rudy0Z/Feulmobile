/**
 * Feul logo placeholder — 40×40px reserved space in top-left nav.
 * Will be replaced with actual wordmark/logo asset.
 */
export function FeulLogo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const bg = variant === 'light' ? 'rgba(255,255,255,0.15)' : '#E8EDF3';
  const text = variant === 'light' ? 'rgba(255,255,255,0.6)' : '#8896A7';

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 8, fontWeight: 800, color: text, letterSpacing: '0.05em' }}>
        [LOGO]
      </span>
    </div>
  );
}
