import { useNavigate } from 'react-router';
import { CheckCircle2, Mic, ArrowRight } from 'lucide-react';

// C-19 — Validator queue is empty (no clips to grade right now). Roles cross-subsidize:
// instead of a dead end, offer the validator contributor work. Honest: the queue really is
// empty, and recording pays into the same wallet. Rendered inline by ValidatorTasks when the
// grading queue has nothing left, and reachable on its own route.

export function ValidatorQueueEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center px-8" style={{ minHeight: '60vh' }}>
      <div style={{ width: 72, height: 72, borderRadius: 'var(--r-full)', background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-9)'}}>
        <CheckCircle2 className="w-9 h-9" style={{ color: 'var(--state-settled-deep)' }} strokeWidth={1.8} />
      </div>

      <h2 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 'var(--space-4)'}}>
        Queue’s all caught up
      </h2>
      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 'var(--space-11)', maxWidth: 300 }}>
        There are no clips to grade right now — you’ve cleared them. We’ll notify you the moment
        a new batch lands.
      </p>

      {/* Cross-subsidy: contributor work pays into the same wallet */}
      <div style={{
        width: '100%', maxWidth: 340,
        background: 'var(--surface-raised)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--e-2)',
        padding: 'var(--space-9)',
        textAlign: 'left',
      }}>
        <div className="flex items-center gap-3 mb-3">
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--action-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Mic className="w-5 h-5" style={{ color: 'var(--action-primary)' }} strokeWidth={1.9} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>Earn while you wait</p>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>Record a few clips — it pays into the same wallet.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/contributor/quests')}
          style={{
            width: '100%', height: 48, borderRadius: 'var(--r-full)',
            background: 'var(--action-primary)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--fs-secondary)', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
          }}
        >
          Browse recording quests <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => navigate('/validator')}
        style={{ marginTop: 'var(--space-9)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-secondary)' }}
      >
        Back to dashboard
      </button>
    </div>
  );
}
