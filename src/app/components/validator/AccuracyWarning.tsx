import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ShieldAlert, Clock, ArrowRight, BookOpen } from 'lucide-react';

// C-18 — Gold-standard agreement drops (validator rubber-stamps; the secret 5–10%
// pre-graded injection agreement collapses). The system NEVER accuses. It shows a private,
// non-punitive "let's recalibrate" warning, quietly throttles the queue, and only suspends
// if agreement keeps falling. No score, no percentage shaming, no "you cheated" language.

export function AccuracyWarning() {
  const navigate = useNavigate();

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, [navigate]);

  return (
    <div className="theme-verdigris min-h-screen pb-10" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: 'var(--space-2) 0', marginBottom: 'var(--space-3)'}}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
      </div>

      {/* Warning hero — ochre (a pause, not a punishment) */}
      <div className="px-6 mb-4">
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--e-2)',
          padding: 'var(--space-10)',
          borderTop: '4px solid var(--state-pending)',
        }}>
          <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'var(--state-pending-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-8)'}}>
            <ShieldAlert className="w-7 h-7" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
          </div>
          <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 'var(--space-4)', lineHeight: 1.25 }}>
            Let’s recalibrate together
          </h1>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Your recent grades have drifted from what other trusted reviewers decided on the same
            clips. It happens — fatigue, a tricky batch, a rubric that needs a refresher. We’ve
            slowed your queue for a bit so you can grade a little more carefully. No penalty, no
            mark on your record.
          </p>
        </div>
      </div>

      {/* Throttle state — honest about what changed */}
      <div className="px-6 mb-4">
        <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)',  boxShadow: 'var(--e-1)', padding: '18px 20px' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} strokeWidth={1.9} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>Queue temporarily slowed</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)', lineHeight: 1.45 }}>
                Fewer clips at a time for now. Steady agreement over your next batches lifts it
                back automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions: recalibrate via the rubric, then continue slowly */}
      <div className="px-6 space-y-3">
        <button
          onClick={() => navigate('/validator/tasks')}
          style={{
            width: '100%', height: 52, borderRadius: 'var(--r-full)',
            background: 'var(--state-settled-deep)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--fs-body)', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
          }}
        >
          Review the grading rubric <BookOpen className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/validator/tasks')}
          style={{
            width: '100%', height: 52, borderRadius: 'var(--r-full)',
            background: 'transparent', color: 'var(--text-secondary)',
            border: '1.5px solid var(--border-strong)', cursor: 'pointer', fontSize: 'var(--fs-body)', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)',
          }}
        >
          Continue grading <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
