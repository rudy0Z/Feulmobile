import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDevContext } from '../../lib/DevContext';
import { Play, Clock, Languages, ShieldCheck } from 'lucide-react';
import { Waveform } from '../ui/Waveform';
import { ValidatorQueueEmpty } from './ValidatorQueueEmpty';

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
  High:   { bg: 'var(--action-primary-soft)', text: 'var(--action-primary-pressed)', bar: 'var(--action-primary)' },
  Medium: { bg: 'var(--t-bone-100)', text: 'var(--text-secondary)', bar: 'var(--text-muted)' },
  Low:    { bg: 'var(--t-bone-100)', text: 'var(--text-muted)', bar: 'var(--border-strong)' },
};

export function ValidatorTasks() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const [activeCategory, setActiveCategory] = useState('All Tasks');

  const filtered = activeCategory === 'All Tasks'
    ? tasks
    : activeCategory === 'High Priority'
    ? tasks.filter(t => t.priority === 'High')
    : tasks.filter(t => t.language === activeCategory || t.category === activeCategory);

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-16 pb-2 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5" style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
        <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Available Tasks
        </h1>
      </div>

      <div className="px-6 pb-4">
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>Choose a batch and start grading</p>
        <div style={{ marginTop: 'var(--space-5)', opacity: 0.08 }}>
          <Waveform color="var(--surface-studio)" opacity={1} height={24} variant="precision" />
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--r-full)',
              fontSize: 'var(--fs-secondary)', fontWeight: 600, whiteSpace: 'nowrap',
              border: '1.5px solid',
              background: activeCategory === cat ? 'var(--action-primary)' : 'var(--surface-raised)',
              borderColor: activeCategory === cat ? 'var(--action-primary)' : 'var(--border-subtle)',
              color: activeCategory === cat ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              boxShadow: activeCategory === cat ? '0px 6px 14px rgba(var(--terracotta-500-rgb),0.22)' : 'none',
              transition: 'background-color 0.15s ease-out, border-color 0.15s ease-out, color 0.15s ease-out, transform 0.15s ease-out',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Empty State — C-19 cross-subsidy: offer contributor work when the queue is empty ── */}
      {dev.validatorTasksEmpty ? (
        <ValidatorQueueEmpty />
      ) : (
        <div className="px-6 space-y-2.5">
          {filtered.map((task) => {
            const pCfg = priorityConfig[task.priority];
            return (
              <div
                key={task.id}
                onClick={() => navigate(`/validator/grading/${task.id}`)}
                style={{
                  background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-8)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-7)',
                }}
              >
                <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 'var(--r-full)', background: pCfg.bar, flexShrink: 0, minHeight: 52 }} />
                <div className="flex-1">
                  <h4 style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)'}}>{task.title}</h4>
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>{task.clips} clips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>{task.language}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--action-primary-pressed)' }}>₹{task.payout}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--r-full)', background: pCfg.bg, color: pCfg.text }}>
                      {task.priority} Priority
                    </span>
                    <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', color: 'var(--text-secondary)' }}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: task.priority === 'High' ? 'var(--action-primary-pressed)' : 'var(--surface-sunken)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: task.priority === 'High' ? '0px 4px 12px rgba(var(--terracotta-600-rgb),0.25)' : 'none',
                }}>
                  <Play className="w-5 h-5" style={{ color: task.priority === 'High' ? 'var(--text-on-accent)' : 'var(--text-primary)' }} fill={task.priority === 'High' ? 'var(--text-on-accent)' : 'var(--text-primary)'} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
