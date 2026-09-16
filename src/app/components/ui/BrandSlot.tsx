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
      {/* Quiet geometric mark — same primitive as BrandSlot, no glyph, no logo. */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 'var(--r-xs)',
          background: 'var(--surface-sunken)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 'var(--r-full)',
            background: 'var(--text-faint)',
          }}
        />
      </div>
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
