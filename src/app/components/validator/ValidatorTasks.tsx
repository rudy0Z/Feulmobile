import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Play, Clock, Languages, CheckCircle2, PlusCircle, ShieldCheck } from 'lucide-react';
import { Waveform } from '../ui/Waveform';

const tasks = [
  { id: 'task-1', title: 'Hindi — Waiter Scenario',      clips: 45, language: 'Hindi',    priority: 'High',   category: 'Dialogue', payout: 90  },
  { id: 'task-2', title: 'English — Product Reviews',     clips: 32, language: 'English',  priority: 'Medium', category: 'Reviews',  payout: 64  },
  { id: 'task-3', title: 'Spanish — Customer Service',    clips: 28, language: 'Spanish',  priority: 'Medium', category: 'Service',  payout: 56  },
  { id: 'task-4', title: 'French — Travel Phrases',       clips: 50, language: 'French',   priority: 'Low',    category: 'Phrases',  payout: 100 },
  { id: 'task-5', title: 'English — News Reading',        clips: 38, language: 'English',  priority: 'High',   category: 'Reading',  payout: 76  },
  { id: 'task-6', title: 'Mandarin — Shopping Dialogue',  clips: 42, language: 'Mandarin', priority: 'Medium', category: 'Dialogue', payout: 84  },
];

const categories = ['All Tasks', 'High Priority', 'English', 'Dialogue'];

const priorityConfig: Record<string, { bg: string; text: string; bar: string }> = {
  High:   { bg: '#FEF0E8', text: '#8B4513', bar: '#C4622D' },
  Medium: { bg: '#F0F4F8', text: '#4A5568', bar: '#8896A7' },
  Low:    { bg: '#F0F4F8', text: '#8896A7', bar: '#D0D8E0' },
};

export function ValidatorTasks() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Tasks');
  const [showEmpty, setShowEmpty]           = useState(false);

  const filtered = activeCategory === 'All Tasks'
    ? tasks
    : activeCategory === 'High Priority'
    ? tasks.filter(t => t.priority === 'High')
    : tasks.filter(t => t.language === activeCategory || t.category === activeCategory);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header — title + debug toggle, no logo ── */}
      <div className="px-6 pt-16 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" style={{ color: '#1C2434' }} strokeWidth={2} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>
            Available Tasks
          </h1>
        </div>
        <button
          onClick={() => setShowEmpty(!showEmpty)}
          style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
        >
          {showEmpty ? 'Show tasks' : 'Empty state'}
        </button>
      </div>

      <div className="px-6 pb-4">
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568' }}>Choose a batch and start grading</p>
        <div style={{ marginTop: 10, opacity: 0.08 }}>
          <Waveform color="#1C2434" opacity={1} height={24} variant="precision" />
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 18px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
              border: '1.5px solid',
              background: activeCategory === cat ? '#1C2434' : '#FFFFFF',
              borderColor: activeCategory === cat ? '#1C2434' : '#E8EDF3',
              color: activeCategory === cat ? '#FFFFFF' : '#4A5568',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Empty State ── */}
      {showEmpty ? (
        <div className="flex flex-col items-center px-8 py-16" style={{ textAlign: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: '#F0F4F8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
          }}>
            <CheckCircle2 className="w-12 h-12" style={{ color: '#2D7A4F' }} strokeWidth={1.5} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434', marginBottom: 10 }}>
            You're all caught up
          </h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', lineHeight: 1.65, maxWidth: 272, marginBottom: 20 }}>
            No clips waiting in your assigned languages. Check back in a few hours or pick up a new language batch.
          </p>
          <div style={{
            background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3',
            padding: '16px 28px', marginBottom: 28,
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#8896A7' }}>Your accuracy this week</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 700, color: '#2D7A4F' }}>94.8%</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>Above top-10% of validators</p>
          </div>
          <button style={{
            background: '#FFFFFF', border: '1.5px solid #C4622D',
            color: '#C4622D', borderRadius: 999,
            padding: '13px 28px', fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          }}>
            <PlusCircle className="w-4 h-4" />
            Add Another Language
          </button>
        </div>
      ) : (
        <div className="px-6 space-y-2.5">
          {filtered.map((task) => {
            const pCfg = priorityConfig[task.priority];
            return (
              <div
                key={task.id}
                onClick={() => navigate(`/validator/grading/${task.id}`)}
                style={{
                  background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8EDF3',
                  padding: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 99, background: pCfg.bar, flexShrink: 0, minHeight: 52 }} />
                <div className="flex-1">
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1C2434', marginBottom: 7 }}>{task.title}</h4>
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" style={{ color: '#8896A7' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{task.clips} clips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5" style={{ color: '#8896A7' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{task.language}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#C4622D' }}>₹{task.payout}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: pCfg.bg, color: pCfg.text }}>
                      {task.priority} Priority
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999, background: '#F0F4F8', color: '#4A5568' }}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: task.priority === 'High' ? '#C4622D' : '#F0F4F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: task.priority === 'High' ? '0px 4px 12px rgba(196,98,45,0.25)' : 'none',
                }}>
                  <Play className="w-5 h-5" style={{ color: task.priority === 'High' ? '#FFFFFF' : '#1C2434' }} fill={task.priority === 'High' ? '#FFFFFF' : '#1C2434'} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
