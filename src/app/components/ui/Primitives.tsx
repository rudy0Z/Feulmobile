import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { Check, Clock, X, Lock, Mic, ArrowRight } from 'lucide-react';
import { springs, whileTap } from '../../lib/motion';
import { formatMeta, questTotal, type Quest } from '../../lib/quests';

/* ─── useCountUp — animate money from the PREVIOUS live value to the
   next, never restarting from 0. Honours reduced-motion (jumps). ── */
export function useCountUp(target: number, ms = 650): number {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    if (reduce) { setDisplay(target); fromRef.current = target; return; }
    const from = fromRef.current;
    if (from === target) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduce]);
  return display;
}

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

/* ══════════════════════════════════════════════════════════════════
   WARM DESIGN SYSTEM — spec-compliant primitives (01-DESIGN-SYSTEM §6).
   Semantic tokens only. Money figure is INK; terracotta marks action.
   ══════════════════════════════════════════════════════════════════ */

/* ─── Amount — tabular ₹, de-emphasized decimals ─────────── */

export function Amount({
  value, size = 30, color = 'var(--money-figure)', weight = 700, align = 'left',
}: {
  value: number;
  size?: number;
  color?: string;
  weight?: number;
  align?: 'left' | 'center' | 'right';
}) {
  const whole = Math.trunc(value);
  const paise = Math.round((value - whole) * 100);
  return (
    <span
      className="tabular"
      style={{
        color, fontWeight: weight, fontSize: size, lineHeight: 1,
        letterSpacing: size >= 48 ? '-0.03em' : '-0.02em',
        display: 'inline-flex', alignItems: 'baseline', justifyContent: align,
      }}
    >
      <span style={{ fontSize: size * 0.62, marginRight: 1, fontWeight: weight }}>₹</span>
      {whole.toLocaleString('en-IN')}
      {paise > 0 && (
        <span style={{ fontSize: size * 0.55, opacity: 0.55, marginLeft: 1 }}>
          .{String(paise).padStart(2, '0')}
        </span>
      )}
    </span>
  );
}

/* ─── AmountBreakdown — base × coverage + bonus = total ──── */

export function AmountBreakdown({
  basePay, coverageMult, bonus,
}: { basePay: number; coverageMult: number; bonus: number }) {
  const total = questTotal({ basePay, coverageMult, bonus });
  const row = (label: string, val: ReactNode, strong = false) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0',
    }}>
      <span style={{
        fontSize: strong ? 14 : 13, fontWeight: strong ? 700 : 500,
        color: strong ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}>{label}</span>
      <span className="tabular" style={{
        fontSize: strong ? 18 : 14, fontWeight: strong ? 700 : 600,
        color: strong ? 'var(--money-figure)' : 'var(--text-secondary)',
      }}>{val}</span>
    </div>
  );
  return (
    <div style={{
      background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)',
      padding: '10px 14px', border: '1px solid var(--border-subtle)',
    }}>
      {row('Base', `₹${basePay}`)}
      {coverageMult !== 1 && row(
        'Coverage',
        <span style={{ color: 'var(--action-primary)' }}>× {coverageMult.toFixed(1)}</span>,
      )}
      {bonus > 0 && row('Quality bonus', `+ ₹${bonus}`)}
      <div style={{ height: 1, background: 'var(--divider)', margin: '4px 0' }} />
      {row('You earn', `₹${total}`, true)}
    </div>
  );
}

/* ─── StatusBadge — icon + color + label, ALWAYS all three ── */

export type StatusKind = 'settled' | 'pending' | 'failed';
const statusMeta: Record<StatusKind, { icon: typeof Check; bg: string; fg: string; label: string }> = {
  settled: { icon: Check, bg: 'var(--t-verdigris-50)', fg: 'var(--t-verdigris-700)', label: 'Settled' },
  pending: { icon: Clock, bg: 'var(--t-ochre-50)',     fg: 'var(--t-ochre-700)',     label: 'In review' },
  failed:  { icon: X,     bg: 'var(--t-crimson-50)',   fg: 'var(--t-crimson-700)',   label: 'Rejected' },
};

export function StatusBadge({ kind, label }: { kind: StatusKind; label?: string }) {
  const m = statusMeta[kind];
  const Icon = m.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 12, fontWeight: 700, padding: '4px 10px 4px 8px',
      borderRadius: 'var(--r-full)', background: m.bg, color: m.fg, whiteSpace: 'nowrap',
    }}>
      <Icon size={13} strokeWidth={2.5} />
      {label ?? m.label}
    </span>
  );
}

/* ─── StatTile — wallet bento cell ───────────────────────── */

export function StatTile({
  label, value, delta, tone = 'neutral',
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  tone?: 'neutral' | 'positive' | 'pending';
}) {
  const valueColor = tone === 'positive' ? 'var(--money-positive)'
    : tone === 'pending' ? 'var(--money-pending)' : 'var(--money-figure)';
  return (
    <div style={{
      background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex',
      flexDirection: 'column', gap: 6,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>{label}</span>
      <span className="tabular" style={{ fontSize: 24, fontWeight: 700, color: valueColor, lineHeight: 1 }}>
        {value}
      </span>
      {delta && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{delta}</span>}
    </div>
  );
}

/* ─── ProgressPill — segmented [▮▮▮░░] 3/5 ───────────────── */

export function ProgressPill({ done, total, label }: { done: number; total: number; label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', gap: 3, flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            height: 6, flex: 1, borderRadius: 'var(--r-full)',
            background: i < done ? 'var(--action-primary)' : 'var(--border-subtle)',
            transition: 'background var(--d-base) var(--ease)',
          }} />
        ))}
      </div>
      <span className="tabular" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
        {label ?? `${done}/${total}`}
      </span>
    </div>
  );
}

/* ─── ProgressRing — critically-damped SVG fill ──────────── */

export function ProgressRing({
  pct, size = 56, stroke = 5, color = 'var(--action-primary)', children,
}: {
  pct: number; size?: number; stroke?: number; color?: string; children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--border-subtle)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * clamped) / 100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </svg>
      {children && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{children}</div>
      )}
    </div>
  );
}

/* ─── CoverageMeter — fill + remaining need stated in text ── */

export function CoverageMeter({
  pct, clipsToClose, districtsNeeded,
}: { pct: number; clipsToClose?: number; districtsNeeded?: number }) {
  const need: string[] = [];
  if (clipsToClose != null) need.push(`${clipsToClose} clips left`);
  if (districtsNeeded != null) need.push(`${districtsNeeded} districts`);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        height: 8, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          style={{ height: '100%', background: 'var(--action-primary)', borderRadius: 'var(--r-full)' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{pct}% covered</span>
        {need.length > 0 && <span style={{ color: 'var(--text-muted)' }}>{need.join(' · ')}</span>}
      </div>
    </div>
  );
}

/* ─── StandingBadge — reliability tier chip ──────────────── */

export function StandingBadge({ level, name }: { level: number; name: string }) {
  const dots = 4;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px',
      borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)',
    }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {Array.from({ length: dots }).map((_, i) => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: 'var(--r-full)',
            background: i < level ? 'var(--action-primary)' : 'var(--border-strong)',
          }} />
        ))}
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{name}</span>
    </span>
  );
}

/* ─── CraftBar — skill per format×language ───────────────── */

export function CraftBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="tabular" style={{ color: 'var(--text-primary)' }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${Math.min(100, value)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          style={{ height: '100%', background: 'var(--state-settled)', borderRadius: 'var(--r-full)' }}
        />
      </div>
    </div>
  );
}

/* ─── Button — flat, no gradient, no glow ────────────────── */

export function Button({
  children, onClick, variant = 'primary', size = 'md', full, disabled, icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}) {
  const heights = { sm: 44, md: 52, lg: 56 } as const;
  const variants: Record<string, CSSProperties> = {
    primary:     { background: 'var(--action-primary)', color: 'var(--text-on-accent)', border: 'none' },
    secondary:   { background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
    ghost:       { background: 'transparent', color: 'var(--action-primary)', border: 'none' },
    destructive: { background: 'transparent', color: 'var(--state-failed)', border: 'none' },
  };
  return (
    <motion.button
      whileTap={disabled ? undefined : whileTap.button}
      transition={springs.tap}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        height: heights[size], width: full ? '100%' : undefined,
        padding: '0 22px', borderRadius: 'var(--r-full)', fontSize: 16, fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        boxShadow: variant === 'primary' && !disabled ? 'inset 0 1px 0 rgba(255,255,255,.18)' : 'none',
        ...variants[variant],
      }}
    >
      {children}
      {icon}
    </motion.button>
  );
}

/* ─── QuestRow — ROW, script excerpt in native font ──────── */

export function QuestRow({
  quest, locked, unlockHint, onClick,
}: {
  quest: Quest;
  locked?: boolean;
  unlockHint?: string;
  onClick?: () => void;
}) {
  const fm = formatMeta[quest.format];
  const total = questTotal(quest);
  return (
    <motion.div
      whileTap={locked || !onClick ? undefined : whileTap.card}
      transition={springs.tap}
      onClick={locked ? undefined : onClick}
      style={{
        display: 'flex', gap: 12, padding: 16, alignItems: 'stretch',
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-md)', cursor: locked ? 'default' : onClick ? 'pointer' : 'default',
        opacity: locked ? 0.72 : 1, position: 'relative',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10.5, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase',
            color: 'var(--action-primary)',
          }}>{fm.short}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>· {quest.client}</span>
        </div>
        <p className="font-script" style={{
          fontSize: 17, fontWeight: 500, color: 'var(--text-primary)', margin: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{quest.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            {quest.duration} · {quest.clips} clip{quest.clips > 1 ? 's' : ''} · {quest.language}
          </span>
          {quest.coverageMult > 1 && (
            <span style={{
              fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 'var(--r-full)',
              background: 'var(--t-terracotta-50)', color: 'var(--t-terracotta-800)',
            }}>× {quest.coverageMult.toFixed(1)} coverage</span>
          )}
        </div>
        {locked && unlockHint && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600,
            color: 'var(--text-muted)', marginTop: 2,
          }}>
            <Lock size={12} /> {unlockHint}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
        <Amount value={total} size={22} />
        {!locked && onClick && <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginTop: 4 }} />}
      </div>
    </motion.div>
  );
}

/* ─── TierGate — aspirational lock with exact unlock path ── */

export function TierGate({ title, unlockHint }: { title: string; unlockHint: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: 16,
      background: 'var(--surface-sunken)', border: '1px dashed var(--border-strong)',
      borderRadius: 'var(--r-md)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-full)', flexShrink: 0,
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Lock size={18} style={{ color: 'var(--text-muted)' }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>{title}</p>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{unlockHint}</p>
      </div>
    </div>
  );
}

/* ─── ScriptDisplay — Studio only, 20–28px ≥10:1 ─────────── */

export function ScriptDisplay({ text, size = 24 }: { text: string; size?: number }) {
  return (
    <p className="font-script" style={{
      fontSize: size, fontWeight: 500, color: 'var(--text-on-studio)',
      lineHeight: 'var(--lh-deva)', letterSpacing: 0, margin: 0,
    }}>{text}</p>
  );
}

/* ─── LevelMeter — real mic input (0–1), frame-synced ────── */

export function LevelMeter({ level, bars = 5, onStudio = true }: { level: number; bars?: number; onStudio?: boolean }) {
  const active = Math.round(level * bars);
  const on = 'var(--t-terracotta-500)';
  const off = onStudio ? 'rgba(251,239,228,0.16)' : 'var(--border-subtle)';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 28 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{
          width: 5, borderRadius: 'var(--r-full)',
          height: `${30 + (i / bars) * 70}%`,
          background: i < active ? on : off,
          transition: 'background 60ms linear',
        }} />
      ))}
    </div>
  );
}

/* ─── RecordTrigger — the ONLY glowing element, Studio only ─ */

export function RecordTrigger({
  recording, onPress, reducedMotion,
}: { recording: boolean; onPress?: () => void; reducedMotion?: boolean }) {
  return (
    <motion.button
      onPointerDown={onPress}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      animate={recording && !reducedMotion ? { boxShadow: [
        '0 0 0 1px rgba(var(--accent-glow-rgb),.12), 0 8px 32px rgba(var(--accent-glow-rgb),.28)',
        '0 0 0 1px rgba(var(--accent-glow-rgb),.20), 0 8px 40px rgba(var(--accent-glow-rgb),.42)',
        '0 0 0 1px rgba(var(--accent-glow-rgb),.12), 0 8px 32px rgba(var(--accent-glow-rgb),.28)',
      ] } : { boxShadow: 'var(--e-glow)' }}
      style={{
        width: 84, height: 84, borderRadius: 'var(--r-full)', border: 'none',
        background: 'var(--t-terracotta-500)', color: 'var(--text-on-accent)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      aria-label={recording ? 'Recording — tap to stop' : 'Tap to record'}
    >
      {recording && reducedMotion
        ? <span style={{ fontSize: 12, fontWeight: 700 }}>REC</span>
        : recording
          ? <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--text-on-accent)' }} />
          : <Mic size={32} strokeWidth={2} />}
    </motion.button>
  );
}

/* ─── MoneyState — pending vs settled inline (Wise pattern) ─ */

export function MoneyState({ value, kind }: { value: number; kind: StatusKind }) {
  const color = kind === 'settled' ? 'var(--money-positive)'
    : kind === 'pending' ? 'var(--money-pending)' : 'var(--text-muted)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Amount value={value} size={16} color={color} weight={700} />
      <StatusBadge kind={kind} />
    </div>
  );
}

/* ─── LedgerRow — one ledger entry ───────────────────────── */

export function LedgerRow({
  title, sub, amount, kind, onClick, struck, debit, statusLabel,
}: {
  title: string; sub?: string; amount: number; kind: StatusKind;
  onClick?: () => void; struck?: boolean; debit?: boolean; statusLabel?: string;
}) {
  const sign = debit ? '−' : kind === 'failed' ? '' : '+';
  const color = debit ? 'var(--money-figure)'
    : kind === 'settled' ? 'var(--money-positive)'
    : kind === 'pending' ? 'var(--money-pending)' : 'var(--text-muted)';
  return (
    <motion.div
      whileTap={onClick ? whileTap.row : undefined}
      transition={springs.tap}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 4px',
        borderBottom: '1px solid var(--divider)', cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0,
          textDecoration: struck ? 'line-through' : 'none',
          opacity: struck ? 0.6 : 1,
        }}>{title}</p>
        {sub && <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{sub}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <span className="tabular" style={{ fontSize: 16, fontWeight: 700, color, textDecoration: struck ? 'line-through' : 'none' }}>
          {sign}₹{amount}
        </span>
        <StatusBadge kind={kind} label={statusLabel} />
      </div>
    </motion.div>
  );
}

/* ─── BalanceBlock — Home hero money object (one --r-lg) ─── */

export function BalanceBlock({
  amount, caption, children,
}: { amount: number; caption: string; children?: ReactNode }) {
  return (
    <div style={{
      background: 'var(--surface-raised)', borderRadius: 'var(--r-lg)',
      border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-2)',
      padding: '22px 24px',
    }}>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>{caption}</span>
      <div style={{ marginTop: 8 }}>
        <Amount value={amount} size={48} />
      </div>
      {children && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  );
}

/* ─── Sheet — translucent blurred bottom sheet, interruptible */

export function Sheet({
  open, onClose, children, title,
}: { open: boolean; onClose?: () => void; children: ReactNode; title?: string }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(var(--carbon-rgb),0.32)', backdropFilter: 'blur(2px)' }}
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: 'color-mix(in srgb, var(--surface-raised) 88%, transparent)',
          backdropFilter: 'blur(20px) saturate(140%)',
          borderTopLeftRadius: 'var(--r-lg)', borderTopRightRadius: 'var(--r-lg)',
          boxShadow: 'var(--e-3)', padding: '10px 20px 24px', maxHeight: '86%', overflowY: 'auto',
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)',
          margin: '4px auto 14px',
        }} />
        {title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── AppBar — brand slot (FeulLogo mount point) + title ─── */

export function AppBar({
  brand, title, right,
}: { brand?: ReactNode; title?: string; right?: ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {brand}
        {title && <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>}
      </div>
      {right}
    </div>
  );
}
