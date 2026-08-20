import { motion } from 'motion/react';
import { Clock, Mic, Languages, Users, Quote, CalendarClock } from 'lucide-react';
import type { Quest } from '../../lib/quests';
import { formatMeta } from '../../lib/quests';
import { springs, whileTap } from '../../lib/motion';

const tagToneClass: Record<string, { bg: string; text: string }> = {
  'high-demand': { bg: 'var(--status-accent-bg)',  text: 'var(--status-accent-text)' },
  'bonus':       { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
  'expiring':    { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
  'limited':     { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
  'new':         { bg: 'var(--status-info-bg)',    text: 'var(--status-info-text)' },
};

const formatTokens: Record<Quest['format'], { dot: string; eyebrow: string; chipBg: string; chipText: string }> = {
  lines: {
    dot: 'var(--neutral-400)',
    eyebrow: 'var(--text-muted)',
    chipBg: 'var(--neutral-100)',
    chipText: 'var(--text-secondary)',
  },
  scenario: {
    dot: 'var(--accent-primary)',
    eyebrow: 'var(--accent-primary-deep)',
    chipBg: 'var(--accent-50)',
    chipText: 'var(--accent-900)',
  },
  interview: {
    dot: 'var(--accent-primary)',
    eyebrow: 'var(--accent-primary-deep)',
    chipBg: 'var(--accent-50)',
    chipText: 'var(--accent-900)',
  },
  room: {
    dot: 'var(--navy)',
    eyebrow: 'var(--text-primary)',
    chipBg: 'var(--navy)',
    chipText: '#FFFFFF',
  },
};

export function QuestCard({
  quest, onClick, compact = false,
}: { quest: Quest; onClick?: () => void; compact?: boolean }) {
  const fm = formatMeta[quest.format];
  const ft = formatTokens[quest.format];
  const Icon = quest.Icon;
  const tag = quest.tag ? tagToneClass[quest.tag] : null;

  return (
    <motion.div
      whileTap={onClick ? whileTap.card : undefined}
      transition={springs.tap}
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-card)',
        padding: compact ? '14px 16px' : '16px 18px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Format eyebrow — tiny dot + uppercase label. Replaces the chunky left border. */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: ft.dot, display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
            color: ft.eyebrow, letterSpacing: '0.10em', textTransform: 'uppercase',
          }}>
            {fm.label}
          </span>
          {quest.format === 'scenario' && quest.turns && (
            <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 6 }}>
              · {quest.turns} turns
            </span>
          )}
          {quest.format === 'room' && quest.speakers && (
            <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 6 }}>
              · {quest.speakers} people
            </span>
          )}
          {quest.format === 'interview' && quest.questions && (
            <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 6 }}>
              · {quest.questions} questions
            </span>
          )}
        </div>

        {tag && quest.tagLabel && (
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999,
            background: tag.bg, color: tag.text, letterSpacing: '0.02em', whiteSpace: 'nowrap',
          }}>
            {quest.tagLabel}
          </span>
        )}
      </div>

      {/* Title row — icon + title */}
      <div className="flex items-start gap-3 mb-2.5">
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: ft.chipBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon className="w-5 h-5" style={{ color: ft.chipText }} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
            color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 2,
          }}>
            {quest.title}
          </h4>
          {quest.available === false && (
            <p className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
              <CalendarClock className="w-3 h-3" /> Waiting for prompts
            </p>
          )}
        </div>
      </div>

      {/* Script preview — the heart of the redesign. A subtle quoted block
          shows the actual content, not just metadata. */}
      <div style={{
        background: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 12px 10px 14px',
        position: 'relative',
        marginBottom: 12,
      }}>
        <Quote
          className="absolute"
          style={{ top: 8, left: -1, width: 14, height: 14, color: ft.dot, opacity: 0.45 }}
          strokeWidth={2.5}
        />
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
          color: 'var(--text-secondary)', lineHeight: 1.55, whiteSpace: 'pre-line',
          paddingLeft: 8,
          display: '-webkit-box',
          WebkitLineClamp: quest.format === 'lines' ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {quest.excerpt}
        </p>
      </div>

      {/* Bottom row: meta + earning.
          items-center (not items-end) keeps the payout balanced against the
          meta whether it stays on one line or wraps to two — otherwise the
          two-line payout block floats upward when meta wraps. */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-x-3 gap-y-1 flex-wrap">
          <span className="flex items-center gap-1" style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-muted)' }}>
            <Clock className="w-3.5 h-3.5" /> {quest.duration}
          </span>
          <span className="flex items-center gap-1" style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-muted)' }}>
            <Mic className="w-3.5 h-3.5" /> {quest.clips}
          </span>
          <span className="flex items-center gap-1" style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-muted)' }}>
            <Languages className="w-3.5 h-3.5" /> {quest.language}
          </span>
          {quest.slotsLeft != null && (
            <span className="flex items-center gap-1" style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--status-warning-text)' }}>
              <Users className="w-3.5 h-3.5" /> {quest.slotsLeft} left
            </span>
          )}
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700,
            color: 'var(--accent-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          }}>
            ₹{quest.cashPayout}
          </p>
          <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginTop: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {quest.format === 'room' ? 'per take' : 'per quest'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
