/**
 * Brand placeholder slot - intentionally empty (00-MAKE-CONTEXT.md).
 * 28x28 r-sm bone-100 geometric mark. Never renders a name.
 */
const PLACEHOLDER_STYLE: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  gap: 'var(--space-4)', background: 'var(--surface-sunken)',
  border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)',
  color: 'var(--text-faint)',
};

/** Warm-paper placeholder used wherever owner art is pending. Honest by
    design (R-23): a tinted tile + acoustic-line glyph + a caption that says
    what goes here. Never a bare grey dot. */
function ArtPlaceholder({ width, height, label }: { width?: number | string; height?: number | string; label?: string }) {
  return (
    <div aria-hidden style={{ ...PLACEHOLDER_STYLE, width, height }}>
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-hidden>
        {[4, 12, 20, 28, 36].map((x, i) => (
          <rect key={x} x={x} y={13 - [4, 8, 12, 8, 4][i] / 2} width="2.5" height={[4, 8, 12, 8, 4][i]} rx="1.25" fill="var(--border-strong)" />
        ))}
      </svg>
      {label && (
        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>
      )}
    </div>
  );
}

export function BrandSlot({ size = 28 }: { size?: number }) {
  return (
    <div
      aria-label="Product placeholder"
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--r-xs)',
        background: 'var(--surface-sunken)',
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
          background: 'var(--text-faint)',
        }}
      />
    </div>
  );
}

/**
 * IllustrationSlot — the RESERVED onboarding image slot.
 *
 * Phase 1 ships a reserved frame, not artwork. The handoff is explicit:
 * "owner supplies image later — build with `BrandSlot` + layout slot
 * reserved, do not block Phase 1 on it" (08-REDESIGN-HANDOFF-README).
 *
 * Spec (08-PHASE-1 / 08-VISUAL-REFERENCE-MAP):
 *   · 120–140px tall — one per screen, max
 *   · flat warm-paper, never a mascot / stock / 3D render
 *   · the slot is reserved, so it stays visually quiet: a dashed bone
 *     frame plus one muted caption. It must never render a brand name.
 *
 * When the real asset lands: replace the inner mark with an `<img>` and
 * give it a meaningful `alt`. Until then this is decorative scaffolding,
 * so it exposes no landmark to assistive tech beyond its placeholder name.
 */
export function IllustrationSlot({ height = 128 }: { height?: number }) {
  return (
    <div
      role="img"
      aria-label="Illustration placeholder"
      style={{
        width: '100%',
        maxWidth: 280,
        height,
        borderRadius: 'var(--r-md)',
        background: 'var(--surface-raised)',
        border: '1px dashed var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-5)',
        flexShrink: 0,
      }}
    >
      {/* Designed placeholder: acoustic waveform glyph on warm paper. Reads as
          intentional art direction for a voice-recording product, not as a
          missing asset. Replaced 1:1 by the owner's <img> when art lands. */}
      <svg width="72" height="40" viewBox="0 0 72 40" fill="none" aria-hidden>
        {[6, 16, 26, 36, 46, 56, 66].map((x, i) => {
          const h = [10, 20, 32, 38, 32, 20, 10][i];
          return <rect key={x} x={x} y={20 - h / 2} width="4" height={h} rx="2" fill="var(--border-strong)" />;
        })}
      </svg>
      <span
        style={{
          fontSize: 'var(--fs-caption)',
          fontWeight: 600,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-ui)',
          letterSpacing: '0.02em',
        }}
      >
        Illustration reserved
      </span>
    </div>
  );
}
