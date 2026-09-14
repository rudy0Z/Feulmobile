/**
 * Brand placeholder slot - intentionally empty (00-MAKE-CONTEXT.md).
 * 28x28 r-sm bone-100 geometric mark. Never renders a name.
 */
export function BrandSlot({ size = 28 }: { size?: number }) {
  return (
    <div
      aria-label="Product placeholder"
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--r-sm)',
        background: 'var(--t-bone-100)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: 'var(--r-full)',
          background: 'var(--t-carbon-300)',
        }}
      />
    </div>
  );
}
