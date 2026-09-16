import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { Check, Clock, X, Lock, Mic, ArrowRight, Play, Pause, Volume2 } from 'lucide-react';
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

/* ─── Card — base surface ──────────────────────────────────
   Defaults are the ORDINARY card: --r-md (14) + e-1 + hairline border.

   It previously defaulted to radius --r-lg (24) — which is the ONE-HERO-
   PER-SCREEN radius. So any screen that used <Card> for three cards
   silently created three heroes, exactly what the design system forbids.
   Rather than violate the rule, every screen hand-rolled its own div:
   Card had 0 usages while 362 containers were built by hand.

   A component whose default contradicts the system's own rule will lose
   to a raw div every time. `hero` is now the explicit, auditable way to
   declare the one hero (--r-lg + e-2), and the metrics gate counts it. */

type CardElevation = 'flat' | 'card' | 'glass' | 'floating';
const elevationShadow: Record<CardElevation, string> = {
  flat:     'none',
  card:     'var(--e-1)',
  glass:    'var(--e-3)',
  floating: 'var(--e-2)',
};

export function Card({
  children, padding = 'var(--space-9)', radius, hero = false, elevation,
  borderColor = 'var(--border-subtle)', borderLeft,
  background = 'var(--surface-raised)', onClick, style,
}: {
  children: ReactNode;
  padding?: string | number;
  radius?: string | number;
  /** The ONE hero object for this screen: --r-lg + e-2. Max one per view. */
  hero?: boolean;
  elevation?: CardElevation;
  /** Pass null for a borderless surface (tonal separation only). */
  borderColor?: string | null;
  borderLeft?: { color: string; width?: number };
  background?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    background,
    borderRadius: radius ?? (hero ? 'var(--r-lg)' : 'var(--r-md)'),
    padding,
    border: borderColor === null ? 'none' : `1px solid ${borderColor}`,
    boxShadow: elevationShadow[elevation ?? (hero ? 'floating' : 'card')],
    cursor: onClick ? 'pointer' : 'default',
    ...(borderLeft ? { borderLeft: `${borderLeft.width ?? 1}px solid ${borderLeft.color}` } : {}),
    ...style,
  };
  if (!onClick) return <div style={base}>{children}</div>;
  /* A clickable Card is a BUTTON, not a div with onClick. Without role,
     tabIndex and the key handler, it is unreachable by keyboard — and this
     repo has 117 hand-rolled buttons precisely because that was easy. */
  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileTap={whileTap.card}
      transition={springs.tap}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      }}
      style={base}
    >
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
        fontFamily: 'var(--font-number)', fontSize: valueSize, fontWeight: 700,
        color, lineHeight: 1, letterSpacing: '-0.01em',
      }}>
        {value}
      </p>
      <p style={{
        fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)',
        letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 'var(--space-3)',
      }}>
        {label}
      </p>
    </div>
  );
}

/* ─── EarningFigure — currency + caption ─────────────────── */

export function EarningFigure({
  amount, caption, size = 'md', color = 'var(--action-primary)', align = 'right',
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
        fontFamily: 'var(--font-number)', fontSize: figureSize, fontWeight: 700,
        color, lineHeight: 1,
      }}>
        ₹{amount}
      </p>
      {caption && (
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* ─── TagPill — neutral pill (use StatusBadge for semantic) ─ */

export function TagPill({ children, tone = 'neutral' }: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'inverted';
}) {
  const tones = {
    neutral:  { bg: 'var(--t-bone-100)', text: 'var(--text-secondary)' },
    accent:   { bg: 'var(--t-terracotta-100)',  text: 'var(--action-primary)' },
    inverted: { bg: 'var(--surface-studio)',        text: 'var(--t-bone-100)' },
  } as const;
  const t = tones[tone];
  return (
    <span style={{
      fontSize: 'var(--fs-caption)', fontWeight: 700, padding: 'var(--space-1) var(--space-5)', borderRadius: 'var(--r-full)',
      background: t.bg, color: t.text, letterSpacing: '0.02em',
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── StatusPill — REMOVED (Wave 0.4).
   It rendered `var(--status-*-bg/-text)`, tokens that never existed in
   theme.css, and nothing ever imported it. Use StatusBadge (icon + label)
   for every semantic status instead — colour alone is never enough. ─── */

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
      fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800,
      color: 'var(--text-primary)', letterSpacing: '-0.02em',
    },
    body: {
      fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-subhead)', fontWeight: 700,
      color: 'var(--text-primary)',
    },
    eyebrow: {
      fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-caption)', fontWeight: 700,
      color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
    },
  };
  return (
    <div style={{
      display: 'flex', alignItems: action ? 'center' : 'flex-end',
      justifyContent: 'space-between', marginBottom: 'var(--space-6)', gap: 'var(--space-6)',
    }}>
      <div>
        <h3 style={styles[variant]}>{children}</h3>
        {subtitle && (
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
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
  children, onClick, padding = '14px var(--space-9)', divider = true, style,
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
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
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
      <span style={{ fontSize: size * 0.62, marginRight: 'var(--space-0)', fontWeight: weight }}>₹</span>
      {whole.toLocaleString('en-IN')}
      {paise > 0 && (
        <span style={{ fontSize: size * 0.55, opacity: 0.55, marginLeft: 'var(--space-0)'}}>
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
      padding: 'var(--space-3) 0',
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
      padding: 'var(--space-5) var(--space-7)', border: '1px solid var(--border-subtle)',
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
  settled: { icon: Check, bg: 'var(--state-settled-container)', fg: 'var(--state-settled-deep)', label: 'Settled' },
  pending: { icon: Clock, bg: 'var(--state-pending-container)',     fg: 'var(--state-pending-deep)',     label: 'In review' },
  failed:  { icon: X,     bg: 'var(--state-failed-container)',   fg: 'var(--state-failed-text)',   label: 'Rejected' },
};

export function StatusBadge({ kind, label }: { kind: StatusKind; label?: string }) {
  const m = statusMeta[kind];
  const Icon = m.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
      fontSize: 'var(--fs-caption)', fontWeight: 700, padding: 'var(--space-2) var(--space-5) var(--space-2) var(--space-4)',
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
      borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', display: 'flex',
      flexDirection: 'column', gap: 'var(--space-3)',
    }}>
      <span style={{
        fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>{label}</span>
      <span className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: valueColor, lineHeight: 1 }}>
        {value}
      </span>
      {delta && <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-secondary)' }}>{delta}</span>}
    </div>
  );
}

/* ─── ProgressPill — segmented [▮▮▮░░] 3/5 ───────────────── */

export function ProgressPill({ done, total, label }: { done: number; total: number; label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)'}}>
      <div style={{ display: 'flex', gap: 'var(--space-1)', flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            height: 6, flex: 1, borderRadius: 'var(--r-full)',
            background: i < done ? 'var(--action-primary)' : 'var(--border-subtle)',
            transition: 'background var(--duration-base) var(--ease-standard)',
          }} />
        ))}
      </div>
      <span className="tabular" style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--text-secondary)' }}>
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

/* ─── OtpInput — 6 boxes, 3+3 split, error + locked states ─
   idle border-strong · filled action-primary · failed crimson.
   Paste fills all six; first box advertises one-time-code autofill. ── */

export function OtpInput({
  value, onChange, error = false, disabled = false, autoFocus = true,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '');

  useEffect(() => {
    if (autoFocus && !disabled) refs.current[0]?.focus();
  }, [autoFocus, disabled]);

  const setDigit = (i: number, raw: string) => {
    const clean = raw.replace(/\D/g, '');
    if (!clean) {
      onChange(value.slice(0, i) + value.slice(i + 1));
      return;
    }
    // Typing (or pasting) into a box may carry several digits — fill forward.
    const next = (value.slice(0, i) + clean).slice(0, 6).padEnd(Math.max(value.length, i + 1), ' ').replace(/ /g, '');
    onChange(next.slice(0, 6));
    refs.current[Math.min(i + clean.length, 5)]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
      onChange(value.slice(0, i - 1));
      e.preventDefault();
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text) { onChange(text); refs.current[Math.min(text.length, 5)]?.focus(); }
    e.preventDefault();
  };

  const box = (i: number) => {
    const filled = digits[i] !== '';
    const borderColor = error ? 'var(--state-failed)' : filled ? 'var(--action-primary)' : 'var(--border-strong)';
    return (
      <input
        key={i}
        ref={(el) => { refs.current[i] = el; }}
        value={digits[i]}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        disabled={disabled}
        aria-label={`Digit ${i + 1} of 6`}
        onChange={(e) => setDigit(i, e.target.value)}
        onKeyDown={(e) => onKeyDown(i, e)}
        onPaste={onPaste}
        className="tabular"
        style={{
          flex: 1, minWidth: 0, maxWidth: 60, height: 68, textAlign: 'center',
          fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)',
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-raised)',
          border: `1px solid ${borderColor}`, borderRadius: 'var(--r-md)', outline: 'none',
        }}
      />
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)'}} onPaste={onPaste}>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>{[0, 1, 2].map(box)}</div>
      <div style={{ width: 12, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{ width: 10, height: 2, background: 'var(--border-strong)', borderRadius: 'var(--r-full)' }} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>{[3, 4, 5].map(box)}</div>
    </div>
  );
}

/* ─── ListenChip — 44px pill that plays REAL audio via device speech.
   Used for language samples, consent audio, brief sample reads. Never a
   fake timer: state tracks the utterance lifecycle and resets on end. ── */

export function ListenChip({
  text, lang = 'en-IN', label, playingLabel = 'Playing…', sunk = true, speaker = false,
}: {
  text: string;
  lang?: string;
  label: string;
  playingLabel?: string;
  sunk?: boolean;
  speaker?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); }, [supported]);

  if (!supported) return null;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[""]/g, ''));
    u.lang = lang;
    u.rate = 0.95;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={playing}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', minHeight: 44, padding: '0 var(--space-8) 0 var(--space-7)',
        borderRadius: 'var(--r-full)', border: '1px solid var(--border-subtle)',
        background: sunk ? 'var(--surface-sunken)' : 'var(--surface-raised)',
        color: playing ? 'var(--action-primary)' : 'var(--text-secondary)', cursor: 'pointer',
        fontSize: 'var(--fs-secondary)', fontWeight: 700,
      }}
    >
      {playing ? <Pause size={16} /> : speaker ? <Volume2 size={16} /> : <Play size={16} />}
      {playing ? playingLabel : label}
    </button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
      <div style={{
        height: 8, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          style={{ height: '100%', background: 'var(--action-primary)', borderRadius: 'var(--r-full)' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-caption)', fontWeight: 600 }}>
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
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-6)',
      borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)',
    }}>
      <span style={{ display: 'inline-flex', gap: 'var(--space-1)'}}>
        {Array.from({ length: dots }).map((_, i) => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: 'var(--r-full)',
            background: i < level ? 'var(--action-primary)' : 'var(--border-strong)',
          }} />
        ))}
      </span>
      <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--text-primary)' }}>{name}</span>
    </span>
  );
}

/* ─── CraftBar — skill per format×language ───────────────── */

export function CraftBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-secondary)', fontWeight: 600 }}>
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

/* ─── Button — flat, no gradient, no glow ──────────────────
   `disabled` uses aria-disabled rather than the native attribute so the
   control stays focusable and screen readers can announce it alongside the
   reason text ("₹X more to withdraw"). Native `disabled` removes it from
   the tab order entirely, which hides the reason from keyboard users. ── */

export function Button({
  children, onClick, variant = 'primary', size = 'md', full, disabled, icon, style,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  style?: CSSProperties;
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
      type="button"
      whileTap={disabled ? undefined : whileTap.button}
      transition={springs.tap}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      style={{
        height: heights[size], minHeight: heights[size], width: full ? '100%' : undefined,
        padding: '0 var(--space-9)',
        borderRadius: size === 'lg' ? 'var(--cta-r)' : 'var(--r-full)',
        fontSize: 'var(--fs-body)', fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: variant === 'primary' && !disabled ? 'inset 0 1px 0 rgba(var(--bone-0-rgb),.18)' : 'none',
        /* Disabled is a real state, not opacity: sunken fill + faint ink + dashed
           edge. Contrast of the label still ≥3:1 against the fill (HG-6). */
        ...(disabled
          ? { background: 'var(--surface-sunken)', color: 'var(--text-faint)', border: '1px dashed var(--border-strong)', boxShadow: 'none' }
          : {}),
        ...variants[variant],
        ...style,
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
        display: 'flex', gap: 'var(--space-6)', padding: 'var(--space-8)', alignItems: 'stretch',
        background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-md)', cursor: locked ? 'default' : onClick ? 'pointer' : 'default',
        opacity: locked ? 0.72 : 1, position: 'relative',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)'}}>
          <span style={{
            fontSize: 'var(--fs-caption)', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase',
            color: 'var(--action-primary)',
          }}>{fm.short}</span>
          <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)' }}>· {quest.client}</span>
        </div>
        <p className="font-script" style={{
          fontSize: 'var(--fs-subhead)', fontWeight: 500, color: 'var(--text-primary)', margin: '0',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{quest.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {quest.duration} · {quest.clips} clip{quest.clips > 1 ? 's' : ''} · {quest.language}
          </span>
          {quest.coverageMult > 1 && (
            <span style={{
              fontSize: 'var(--fs-caption)', fontWeight: 800, padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--r-full)',
              background: 'var(--action-primary-soft)', color: 'var(--action-primary)',
            }}>× {quest.coverageMult.toFixed(1)} coverage</span>
          )}
        </div>
        {locked && unlockHint && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--fs-caption)', fontWeight: 600,
            color: 'var(--text-muted)', marginTop: 'var(--space-1)',
          }}>
            <Lock size={12} /> {unlockHint}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 'var(--space-1)'}}>
        <Amount value={total} size={22} />
        {!locked && onClick && <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginTop: 'var(--space-2)'}} />}
      </div>
    </motion.div>
  );
}

/* ─── TierGate — aspirational lock with exact unlock path ── */

export function TierGate({ title, unlockHint }: { title: string; unlockHint: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-8)',
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
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-secondary)', margin: '0'}}>{title}</p>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{unlockHint}</p>
      </div>
    </div>
  );
}

/* ─── ScriptDisplay — Studio only, 20–28px ≥10:1 ─────────── */

export function ScriptDisplay({ text, size = 24 }: { text: string; size?: number }) {
  return (
    <p className="font-script" style={{
      fontSize: size, fontWeight: 500, color: 'var(--text-on-studio)',
      lineHeight: 'var(--lh-deva)', letterSpacing: 0, margin: '0',
    }}>{text}</p>
  );
}

/* ─── LevelMeter — real mic input (0–1), frame-synced ────── */

export function LevelMeter({ level, bars = 5, onStudio = true }: { level: number; bars?: number; onStudio?: boolean }) {
  const active = Math.round(level * bars);
  const on = 'var(--action-accent)';
  const off = onStudio ? 'rgba(var(--terracotta-50-rgb),0.16)' : 'var(--border-subtle)';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-2)', height: 28 }}>
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
        '0 0 0 1px rgba(var(--terracotta-500-rgb),.12), 0 8px 32px rgba(var(--terracotta-500-rgb),.28)',
        '0 0 0 1px rgba(var(--terracotta-500-rgb),.20), 0 8px 40px rgba(var(--terracotta-500-rgb),.42)',
        '0 0 0 1px rgba(var(--terracotta-500-rgb),.12), 0 8px 32px rgba(var(--terracotta-500-rgb),.28)',
      ] } : { boxShadow: 'var(--e-glow)' }}
      style={{
        width: 84, height: 84, borderRadius: 'var(--r-full)', border: 'none',
        background: 'var(--action-accent)', color: 'var(--text-on-accent)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      aria-label={recording ? 'Recording — tap to stop' : 'Tap to record'}
    >
      {recording && reducedMotion
        ? <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700 }}>REC</span>
        : recording
          ? <span style={{ width: 26, height: 26, borderRadius: 'var(--r-xs)', background: 'var(--text-on-accent)' }} />
          : <Mic size={32} strokeWidth={2} />}
    </motion.button>
  );
}

/* ─── MoneyState — pending vs settled inline (Wise pattern) ─ */

export function MoneyState({ value, kind }: { value: number; kind: StatusKind }) {
  const color = kind === 'settled' ? 'var(--money-positive)'
    : kind === 'pending' ? 'var(--money-pending)' : 'var(--text-muted)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)'}}>
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
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-7) var(--space-2)',
        borderBottom: '1px solid var(--divider)', cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-primary)', margin: '0',
          textDecoration: struck ? 'line-through' : 'none',
          opacity: struck ? 0.6 : 1,
        }}>{title}</p>
        {sub && <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{sub}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)'}}>
        <span className="tabular" style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color, textDecoration: struck ? 'line-through' : 'none' }}>
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
       boxShadow: 'var(--e-2)',
      padding: 'var(--space-9) var(--space-10)',
    }}>
      <span style={{
        fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>{caption}</span>
      <div style={{ marginTop: 'var(--space-4)'}}>
        <Amount value={amount} size={48} />
      </div>
      {children && <div style={{ marginTop: 'var(--space-8)'}}>{children}</div>}
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
          boxShadow: 'var(--e-3)', padding: 'var(--space-5) var(--space-9) var(--space-10)', maxHeight: '86%', overflowY: 'auto',
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)',
          margin: '4px auto 14px',
        }} />
        {title && <h3 style={{ marginBottom: 'var(--space-6)'}}>{title}</h3>}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── ReceiptCard — perforated payout receipt (Wise/NPCI pattern) ──
   Perforated ticket edges (side notches), a dashed tear rule, a mono UTR,
   an NPCI timestamp, From/To, the amount, and a Share-for-WhatsApp action.
   The single source for every settled withdrawal proof — used by Payout
   success and the Wallet settled-detail sheet. The notch colour is the
   app ground so the cut-outs read as punched through to the surface. ── */

export function ReceiptCard({
  refNum, to, amount, date, onShare,
}: { refNum: string; to: string; amount: number; date: string; onShare?: () => void }) {
  const notch: CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 18, height: 18, borderRadius: 'var(--r-full)', background: 'var(--surface-ground)',
  };
  return (
    <div style={{
      position: 'relative', background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', overflow: 'hidden',
    }}>
      <span aria-hidden style={{ ...notch, left: -9 }} />
      <span aria-hidden style={{ ...notch, right: -9 }} />
      <div style={{ padding: 'var(--space-7) var(--space-8) var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>Payment receipt</span>
          <StatusBadge kind="settled" />
        </div>
        <p style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>NPCI · {date}</p>
      </div>
      <div style={{ height: 0, borderTop: '1px dashed var(--border-strong)', margin: '0 var(--space-8)' }} />
      <div style={{ padding: 'var(--space-7) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>UTR</span>
          <span className="tabular" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>{refNum}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>From</span>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>Payout account</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>To</span>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{to}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-6)' }}>
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>Amount</span>
          <Amount value={amount} size={20} />
        </div>
      </div>
      {onShare && (
        <div style={{ padding: '0 var(--space-8) var(--space-8)' }}>
          <Button full size="sm" variant="secondary" onClick={onShare}>Share receipt</Button>
        </div>
      )}
    </div>
  );
}

/* ─── IconButton — the 44px touch floor, owned in one place ────────────
   Icon-only controls are the easiest way to break the 44px floor, and this
   app had 19 of them hand-rolled between 30px and 40px across 14 screens.
   Each screen re-invented its own back chevron, which is how a floor rots.
   One primitive now owns it: `size` is clamped to `--tap` (44) and can only
   grow, so no screen can quietly ship a 32px close button again.

   `label` is REQUIRED. An icon-only control with no accessible name is
   unusable with a screen reader, and this app never lets a control's
   meaning live only in a glyph. ─────────────────────────────────────── */

export type IconButtonVariant = 'surface' | 'plain' | 'accent-soft' | 'studio';

const ICON_BUTTON_VARIANTS: Record<IconButtonVariant, CSSProperties> = {
  surface:       { background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' },
  plain:         { background: 'transparent', border: '1px solid transparent', color: 'var(--text-primary)' },
  'accent-soft': { background: 'var(--action-primary-soft)', border: '1px solid transparent', color: 'var(--action-primary)' },
  studio:        { background: 'rgba(var(--bone-50-rgb),0.10)', border: '1px solid transparent', color: 'var(--text-on-dark)' },
};

export function IconButton({
  label, onClick, children, variant = 'surface', size = 44, disabled, style,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: IconButtonVariant;
  size?: number;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const px = Math.max(size, 44);
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={springs.tap}
      style={{
        width: px, height: px, minWidth: px, minHeight: px,
        borderRadius: 'var(--r-full)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        flexShrink: 0,
        opacity: disabled ? 0.45 : 1,
        ...ICON_BUTTON_VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── AppBar — optional back control, brand slot + title, right slot ─── */

export function AppBar({
  brand, title, right, onBack, backLabel = 'Go back', onBackVariant = 'plain',
}: {
  brand?: ReactNode;
  title?: string;
  right?: ReactNode;
  /** Renders a compliant 44px back control before the brand slot. */
  onBack?: () => void;
  backLabel?: string;
  onBackVariant?: IconButtonVariant;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 'var(--space-6) var(--space-9)', gap: 'var(--space-6)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', minWidth: 0 }}>
        {onBack && (
          <IconButton label={backLabel} onClick={onBack} variant={onBackVariant} style={{ marginLeft: -10 }}>
            <ArrowRight size={20} strokeWidth={2.25} style={{ transform: 'rotate(180deg)' }} aria-hidden />
          </IconButton>
        )}
        {brand}
        {title && <span style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>}
      </div>
      {right}
    </div>
  );
}
