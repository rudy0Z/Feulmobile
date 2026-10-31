import logoImg from "figma:asset/7a4150af4a1e9ed7a5ff663987ed6e9b57b74925.png";

/**
 * Feul app logo — dark rounded square, 36×36.
 * Use ONLY on home screens and onboarding — never on inner tab screens.
 */
export function FeulLogo({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: 'var(--t-carbon-900)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <img
        src={logoImg}
        alt="Feul"
        style={{
          width: size * 0.68,
          height: 'auto',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
