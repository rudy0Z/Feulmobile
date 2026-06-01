import { motion } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';
import { springs, whileTap } from '../../lib/motion';

/* ─── Card — base surface ────────────────────────────────── */

type CardElevation = 'flat' | 'card' | 'glass' | 'floating';
const elevationShadow: Record<CardElevation, string> = {
  flat:     'none',
  card:     'var(--shadow-card)',
  glass:    'var(--shadow-glass)',
  floating: 'var(--shadow-floating)',
};

export function Card({
  children, padding = 'var(--space-5)', radius = 'var(--radius-lg)',
  elevation = 'card', borderColor = 'var(--card-border)', borderLeft,
  background = 'var(--surface)', onClick, style,
}: {
  children: ReactNode;
  padding?: string | number;
  radius?: string | number;
  elevation?: CardElevation;
  borderColor?: string;
  borderLeft?: { color: string; width?: number };
  background?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    background, borderRadius: radius, padding,
    border: `1px solid ${borderColor}`,
    boxShadow: elevationShadow[elevation],
    cursor: onClick ? 'pointer' : 'default',
    ...(borderLeft ? { borderLeft: `${borderLeft.width ?? 3}px solid ${borderLeft.color}` } : {}),
    ...style,
  };
  if (!onClick) return <div style={base}>{children}</div>;
  return (
    <motion.div whileTap={whileTap.card} transition={springs.tap} onClick={onClick} style={base}>
      {children}
    </motion.div>
  );
}

/* ─── StatBlock — mono number + uppercase eyebrow ────────── */

export function StatBlock({
  value, label, color = 'var(--text-primary)', size = 'md', align = 'left',
}: {
  value: ReactNode;
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
}) {
  const valueSize = size === 'lg' ? 28 : size === 'sm' ? 18 : 22;
  return (
    <div style={{ textAlign: align }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: valueSize, fontWeight: 700,
        color, lineHeight: 1, letterSpacing: '-0.01em',
      }}>
        {value}
      </p>
      <p style={{
        fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)',
        letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6,
      }}>
        {label}
      </p>
    </div>
  );
}

/* ─── EarningFigure — currency + caption ─────────────────── */

export function EarningFigure({
  amount, caption, size = 'md', color = 'var(--accent-primary)', align = 'right',
}: {
  amount: number | string;
  caption?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  align?: 'left' | 'center' | 'right';
}) {
  const figureSize = size === 'lg' ? 28 : size === 'sm' ? 16 : 20;
  return (
    <div style={{ textAlign: align }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: figureSize, fontWeight: 700,
        color, lineHeight: 1,
      }}>
        ₹{amount}
      </p>
      {caption && (
        <p style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-muted)', marginTop: 3 }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* ─── TagPill — neutral pill (use StatusPill for semantic) ─ */

export function TagPill({ children, tone = 'neutral' }: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'inverted';
}) {
  const tones = {
    neutral:  { bg: 'var(--neutral-100)', text: 'var(--text-secondary)' },
    accent:   { bg: 'var(--accent-100)',  text: 'var(--accent-900)' },
    inverted: { bg: 'var(--navy)',        text: 'var(--neutral-100)' },
  } as const;
  const t = tones[tone];
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)',
      background: t.bg, color: t.text, letterSpacing: '0.02em',
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── StatusPill — semantic status (success/warn/error/info) */

export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'accent';

export function StatusPill({ children, tone, icon }: {
  children: ReactNode;
  tone: StatusTone;
  icon?: ReactNode;
}) {
  return (
    <span style={{
      fontSize: 10.5, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-full)',
      background: `var(--status-${tone}-bg)`, color: `var(--status-${tone}-text)`,
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
    }}>
      {icon}
      {children}
    </span>
  );
}

/* ─── SectionHeading — display | eyebrow | body ──────────── */

export function SectionHeading({
  children, variant = 'body', subtitle, action,
}: {
  children: ReactNode;
  variant?: 'display' | 'body' | 'eyebrow';
  subtitle?: string;
  action?: ReactNode;
}) {
  const styles: Record<typeof variant, CSSProperties> = {
    display: {
      fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
      color: 'var(--text-primary)', letterSpacing: '-0.02em',
    },
    body: {
      fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
      color: 'var(--text-primary)',
    },
    eyebrow: {
      fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
      color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
    },
  };
  return (
    <div style={{
      display: 'flex', alignItems: action ? 'center' : 'flex-end',
      justifyContent: 'space-between', marginBottom: 'var(--space-3)', gap: 12,
    }}>
      <div>
        <h3 style={styles[variant]}>{children}</h3>
        {subtitle && (
          <p style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ─── TouchableRow — list row w/ built-in press feedback ── */

export function TouchableRow({
  children, onClick, padding = '14px var(--space-5)', divider = true, style,
}: {
  children: ReactNode;
  onClick?: () => void;
  padding?: string | number;
  divider?: boolean;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      whileTap={onClick ? whileTap.row : undefined}
      transition={springs.tap}
      onClick={onClick}
      style={{
        padding,
        borderBottom: divider ? '1px solid var(--divider)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
