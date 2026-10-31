import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../lib/DevContext';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Inbox } from 'lucide-react';
import { QuestRow, TierGate, Sheet, Button } from './ui/Primitives';
import { quests, questTotal, formatMeta, type Quest, type QuestFormat } from '../lib/quests';
import { tierName } from '../lib/tier';
import { useSession } from '../lib/session';
import { springs, whileTap } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * Quests marketplace — ROWS, not tiles (§2D). Native-script excerpt lives
 * in the row; pay is right-aligned INK; coverage multiplier is a chip.
 * Locked rows are aspirational TierGates that state the exact unlock path.
 * A LINES row is guaranteed open at every standing (same-work-same-pay).
 * ───────────────────────────────────────────────────────────────────── */

type FilterId = 'all' | QuestFormat | 'top-pay';
const filters: { id: FilterId; label: string }[] = [
  { id: 'all',       label: 'All' },
  { id: 'lines',     label: 'Lines' },
  { id: 'scenario',  label: 'Scenario' },
  { id: 'interview', label: 'Interview' },
  { id: 'room',      label: 'Room' },
  { id: 'top-pay',   label: 'Top pay' },
];

const SECTION_ORDER: { format: QuestFormat; blurb: string }[] = [
  { format: 'lines',     blurb: 'Fast one- and two-line clips — quick wins.' },
  { format: 'scenario',  blurb: 'Scripted roles, multi-turn. Pay scales with depth.' },
  { format: 'interview', blurb: 'Answer a pre-recorded question track, turn by turn.' },
  { format: 'room',      blurb: 'Everyone in one room, one phone, one continuous take.' },
];

function unlockHint(q: Quest, level: number): string {
  const need = q.minTier ?? 1;
  return `Unlocks at ${tierName(need)} standing · you're ${tierName(level)}`;
}

export function QuestFeed() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { profile } = useSession();
  const level = profile?.standing.level ?? 1;

  const [filter, setFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(id);
  }, []);

  const matches = (q: Quest) => {
    if (!query.trim()) return true;
    const hay = `${q.title} ${q.client} ${q.language} ${q.excerpt}`.toLowerCase();
    return hay.includes(query.trim().toLowerCase());
  };

  const isLocked = (q: Quest) => (q.minTier ?? 1) > level;

  const visible = useMemo(() => quests.filter(matches), [query]);

  /* ROOM takes record multiple people — DPDP requires on-tape consent from each
     before recording, so a room quest routes through the consent roll-call first
     (C-01/C-10). Every other format goes straight to recording. */
  const open = (q: Quest) =>
    navigate(q.format === 'room' ? '/contributor/room-consent' : `/recording/${q.id}`);

  const goToRow = (q: Quest) =>
    isLocked(q)
      ? <TierGate key={q.id} title={`${formatMeta[q.format].label} · ${q.title}`} unlockHint={unlockHint(q, level)} />
      : <QuestRow key={q.id} quest={q} onClick={() => open(q)} />;

  /* ── DevPanel forced-empty ── */
  if (dev.questsEmpty) {
    return (
      <Shell>
        <EmptyState
          title="No Marathi Scenario tasks right now"
          body="12 contributors are waiting ahead of you for this coverage. New Marathi and Hindi campaigns are being prepared — turn on alerts and you'll be first in when they open."
          cta="Notify me when they open"
          onCta={() => navigate('/contributor/profile')}
        />
      </Shell>
    );
  }

  const filtered = (() => {
    if (filter === 'top-pay') return [...visible].sort((a, b) => questTotal(b) - questTotal(a));
    if (filter !== 'all') return visible.filter((q) => q.format === filter);
    return visible;
  })();

  return (
    <Shell>
      {/* Search */}
      <div className="px-5 pb-3">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 14px',
          background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--r-full)',
        }}>
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quests, clients, languages"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
            }}
          />
        </div>
      </div>

      {/* Filter chips + sheet trigger */}
      <div style={{ position: 'relative' }}>
        <div className="flex gap-2 overflow-x-auto px-5 pb-4" style={{ scrollbarWidth: 'none' }}>
          <motion.button
            whileTap={whileTap.button} transition={springs.tap}
            onClick={() => setFilterOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, height: 38, padding: '0 14px',
              borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)',
              background: 'var(--surface-raised)', color: 'var(--text-secondary)',
              fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer',
            }}
          >
            <SlidersHorizontal size={15} /> Filter
          </motion.button>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <motion.button
                key={f.id}
                whileTap={whileTap.button} transition={springs.tap}
                onClick={() => setFilter(f.id)}
                style={{
                  height: 38, padding: '0 16px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 700,
                  whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer',
                  border: `1px solid ${active ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
                  background: active ? 'var(--action-primary)' : 'var(--surface-raised)',
                  color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                }}
              >
                {f.label}
              </motion.button>
            );
          })}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, pointerEvents: 'none', background: 'linear-gradient(to right, transparent, var(--surface-ground))' }} />
      </div>

      {loading ? (
        <div className="px-5" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing matches that"
          body={query ? `No open quests match "${query}". Try a different language or clear the search.` : 'No quests in this filter yet.'}
          cta={query ? 'Clear search' : 'Show all'}
          onCta={() => { setQuery(''); setFilter('all'); }}
        />
      ) : filter === 'all' ? (
        <div className="px-5" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {SECTION_ORDER.map(({ format, blurb }) => {
            const rows = filtered.filter((q) => q.format === format);
            if (rows.length === 0) return null;
            /* Open rows first; cap aspirational locked rows to a 2-row teaser
               so a fully-locked format doesn't become a wall of gates. */
            const openRows   = rows.filter((q) => !isLocked(q));
            const lockedRows = rows.filter(isLocked);
            const LOCK_CAP = 2;
            const shownLocked = lockedRows.slice(0, LOCK_CAP);
            const hiddenLocked = lockedRows.slice(LOCK_CAP);
            /* Lowest standing that would open the hidden ones. */
            const hiddenUnlockTier = hiddenLocked.length
              ? tierName(Math.min(...hiddenLocked.map((q) => q.minTier ?? 1)))
              : '';
            return (
              <section key={format}>
                <div style={{ marginBottom: 12 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {formatMeta[format].label}
                  </h2>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{blurb}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[...openRows, ...shownLocked].map(goToRow)}
                  {hiddenLocked.length > 0 && (
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', margin: '2px 0 0' }}>
                      {hiddenLocked.length} more unlock at {hiddenUnlockTier} standing
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="px-5" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 2px' }}>
            {filters.find((f) => f.id === filter)?.label} · {filtered.length}
          </p>
          {filtered.map(goToRow)}
        </div>
      )}

      {/* Filter sheet — same options, deliberate surface */}
      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter quests">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setFilterOpen(false); }}
                style={{
                  height: 48, borderRadius: 'var(--r-md)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${active ? 'var(--action-primary)' : 'var(--border-subtle)'}`,
                  background: active ? 'var(--t-terracotta-50)' : 'var(--surface-raised)',
                  color: active ? 'var(--t-terracotta-800)' : 'var(--text-secondary)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <Button full onClick={() => setFilterOpen(false)}>Show results</Button>
      </Sheet>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-5 pt-16 pb-4">
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em', margin: 0 }}>
          Quests
        </h1>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Same work, same pay. Standing changes what opens and how fast it settles.
        </p>
      </div>
      {children}
    </div>
  );
}

function RowSkeleton() {
  return (
    <div style={{
      height: 96, borderRadius: 'var(--r-md)', background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)', overflow: 'hidden', position: 'relative',
    }}>
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}
        style={{ position: 'absolute', inset: 16, borderRadius: 6, background: 'var(--surface-sunken)' }}
      />
    </div>
  );
}

function EmptyState({ title, body, cta, onCta }: { title: string; body: string; cta: string; onCta: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 text-center" style={{ minHeight: '46vh' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <Inbox size={28} style={{ color: 'var(--text-muted)' }} />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{title}</h2>
      <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: 300, margin: '0 0 22px' }}>{body}</p>
      <Button variant="secondary" onClick={onCta}>{cta}</Button>
    </div>
  );
}
