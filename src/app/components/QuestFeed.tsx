import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../lib/DevContext';
import { motion } from 'motion/react';
import { Star, ArrowUpRight, Flame, Users, Users2 } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { QuestCardSkeleton } from './ui/FeulSkeleton';
import { QuestCard } from './ui/QuestCard';
import { SectionHeading } from './ui/Primitives';
import { quests, formatMeta, type QuestFormat } from '../lib/quests';
import { springs, whileTap } from '../lib/motion';

const filters: { id: 'all' | QuestFormat | 'high-reward'; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'lines',       label: 'Lines' },
  { id: 'scenario',    label: 'Scenario' },
  { id: 'group',       label: 'Group' },
  { id: 'high-reward', label: 'Top Pay' },
];

function EmptyQuestFeed() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 relative" style={{ minHeight: '50vh' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: '80%' }}>
          <Waveform color="var(--accent-primary)" opacity={0.12} height={100} />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
          color: 'var(--text-primary)', textAlign: 'center', marginBottom: 12, lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          New quests dropping soon
        </h2>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.65, maxWidth: 280, marginBottom: 8 }}>
          High-demand scenarios in <strong style={{ color: 'var(--text-primary)' }}>Hindi</strong> and{' '}
          <strong style={{ color: 'var(--text-primary)' }}>Marathi</strong> are coming. You'll be first to know.
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 32 }}>
          Turn on notifications to never miss a high-paying quest
        </p>
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            background: 'transparent', color: 'var(--accent-primary-deep)', borderRadius: 999,
            padding: '13px 28px', fontSize: 14, fontWeight: 700,
            border: '1.5px solid var(--accent-primary-deep)', cursor: 'pointer',
          }}
        >
          Update Language Preferences
        </button>
      </div>
    </div>
  );
}

export function QuestFeed() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]['id']>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(id);
  }, []);

  const featured = quests.find(q => q.format === 'group') ?? quests[0];
  const groupQuests = quests.filter(q => q.format === 'group');
  const scenarioQuests = quests.filter(q => q.format === 'scenario');
  const lineQuests = quests.filter(q => q.format === 'lines');

  const filteredList = (() => {
    if (activeFilter === 'all') return quests.filter(q => q.id !== featured.id);
    if (activeFilter === 'high-reward') return [...quests].sort((a, b) => b.cashPayout - a.cashPayout);
    return quests.filter(q => q.format === activeFilter);
  })();

  if (dev.questsEmpty) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
        <div className="px-6 pt-16 pb-4">
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
          }}>Available Quests</h1>
        </div>
        <EmptyQuestFeed />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-16 pb-2 flex items-center justify-between">
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
          color: 'var(--text-primary)', letterSpacing: '-0.02em',
        }}>
          Available Quests
        </h1>
      </div>

      <div className="px-6 pt-1 pb-4">
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>
          Quick lines, deeper scenarios, or full group sessions.
        </p>
      </div>

      {/* Filter chips — right-edge fade hints at horizontal scroll */}
      <div style={{ position: 'relative' }}>
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {filters.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={whileTap.button}
              transition={springs.tap}
              onClick={() => setActiveFilter(cat.id)}
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                whiteSpace: 'nowrap', border: '1.5px solid',
                background: isActive ? 'var(--accent-primary)' : 'var(--surface)',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--card-border)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: isActive ? 'var(--shadow-card)' : 'none',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>
      {/* Right-edge fade overlay */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 48, pointerEvents: 'none', background: 'linear-gradient(to right, transparent, var(--background))' }} />
      </div>

      {/* Featured — premium navy hero featuring a group session */}
      {activeFilter === 'all' && (
        <div className="px-6 mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} fill="currentColor" />
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
              color: 'var(--text-primary)', letterSpacing: '-0.02em',
            }}>
              Premium Session
            </h3>
          </div>
          <motion.div
            whileTap={whileTap.card}
            transition={springs.tap}
            onClick={() => navigate(`/recording/${featured.id}`)}
            style={{
              background: 'radial-gradient(ellipse at 80% 0%, rgba(224,108,58,0.22) 0%, transparent 55%), var(--navy)',
              borderRadius: 22, padding: '22px',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--shadow-floating)',
            }}
          >
            {/* Waveform anchored to bottom — clears all text content above */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: '0 0 22px 22px' }}
              animate={{ opacity: [0.07, 0.11, 0.07] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Waveform color="#FAD4BC" opacity={1} height={34} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span style={{
                  background: 'var(--accent-primary-deep)', color: '#FFFFFF',
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                  letterSpacing: '0.06em',
                }}>
                  GROUP · {featured.speakers} SPEAKERS
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                  <Flame className="w-3 h-3" /> Premium tier
                </span>
                {featured.slotsLeft != null && (
                  <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary-light)' }}>
                    <Users className="w-3 h-3" /> {featured.slotsLeft} slots left
                  </span>
                )}
              </div>

              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                color: '#FFFFFF', marginBottom: 6, letterSpacing: '-0.01em',
              }}>
                {featured.title}
              </h4>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, marginBottom: 14 }}>
                {featured.description}
              </p>

              {/* Scene preview */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '12px 14px',
                marginBottom: 16,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 4,
                }}>
                  Scene
                </p>
                <p style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700,
                    color: 'var(--accent-primary-light)', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                  }}>
                    ₹{featured.cashPayout}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                    {featured.sessionAt ?? `in ${featured.duration}`}
                  </p>
                </div>
                <button style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'var(--accent-primary)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0px 4px 12px rgba(224,108,58,0.4)',
                }}>
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sectioned lists when on 'all' filter */}
      {activeFilter === 'all' ? (
        <>
          {/* Solo Scenarios */}
          <div className="px-6 mb-6">
            <SectionHeading variant="display" subtitle="Multi-turn scripts with context — pay scales with depth">
              Solo Scenarios
            </SectionHeading>
            <div className="space-y-3">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <QuestCardSkeleton key={`sk-s-${i}`} />)
                : scenarioQuests.map(q => (
                    <QuestCard key={q.id} quest={q} onClick={() => navigate(`/recording/${q.id}`)} />
                  ))}
            </div>
          </div>

          {/* Group Sessions */}
          <div className="px-6 mb-6">
            <SectionHeading
              variant="display"
              subtitle="Scheduled multi-speaker sessions"
              action={
                <span className="flex items-center gap-1" style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--accent-primary-deep)',
                  background: 'var(--accent-50)', padding: '4px 10px', borderRadius: 999,
                }}>
                  <Users2 className="w-3 h-3" /> Premium
                </span>
              }
            >
              Group Sessions
            </SectionHeading>
            <div className="space-y-3">
              {loading
                ? <QuestCardSkeleton />
                : groupQuests.filter(q => q.id !== featured.id).map(q => (
                    <QuestCard key={q.id} quest={q} onClick={() => navigate(`/recording/${q.id}`)} />
                  ))}
            </div>
          </div>

          {/* Quick Lines */}
          <div className="px-6">
            <SectionHeading variant="display" subtitle="Fast 1–2 line clips for quick wins">
              Quick Lines
            </SectionHeading>
            <div className="space-y-3">
              {loading
                ? <QuestCardSkeleton />
                : lineQuests.map(q => (
                    <QuestCard key={q.id} quest={q} onClick={() => navigate(`/recording/${q.id}`)} />
                  ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-6">
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
            color: 'var(--text-muted)', marginBottom: 12,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {filters.find(f => f.id === activeFilter)?.label} · {filteredList.length}
          </h3>
          <div className="space-y-3">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <QuestCardSkeleton key={`skel-${i}`} />)
              : filteredList.map(q => (
                  <QuestCard key={q.id} quest={q} onClick={() => navigate(`/recording/${q.id}`)} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
