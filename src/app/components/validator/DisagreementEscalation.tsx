import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Users, ArrowRight, Clock, Info } from 'lucide-react';

// C-17 — Two validators disagree on the same clip.
// Honest version of a loading state: the clip escalates to a third reviewer, and the
// contributor sees a truthful "under extended review" pending state — never a fake
// "approved". No blame is assigned to either grader; disagreement is normal.

export function DisagreementEscalation() {
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
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0', marginBottom: 6 }}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Sent to a third reviewer
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          You and another validator graded this clip differently. That’s normal — a third
          reviewer will settle it. Nothing here counts against you.
        </p>
      </div>

      {/* The clip in question — hero card */}
      <div className="px-6 mb-4">
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
          padding: '20px',
        }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Lines · Tamil</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>· Clip #4821</span>
          </div>
          <p className="font-script" style={{ fontSize: 22, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 'var(--lh-taml)' }}>
            காலை உணவு சாப்பிட்டீர்களா?
          </p>

          {/* Two conflicting grades, anonymised, no winner implied */}
          <div className="flex gap-3 mt-5">
            <div style={{ flex: 1, background: 'var(--t-verdigris-50)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Reviewer A</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--t-verdigris-700)' }}>Approved</p>
            </div>
            <div style={{ flex: 1, background: 'var(--t-crimson-50)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Reviewer B</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--t-crimson-700)' }}>Rejected · background noise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status timeline */}
      <div className="px-6 mb-4">
        <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--e-1)', padding: '18px 20px' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--r-full)', background: 'var(--t-ochre-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users className="w-5 h-5" style={{ color: 'var(--state-pending)' }} strokeWidth={1.9} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Escalated to a third reviewer</p>
              <p className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 500, color: 'var(--money-pending)', marginTop: 2 }}>
                <Clock className="w-3.5 h-3.5" />Usually resolves within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What the contributor sees — honesty mirror */}
      <div className="px-6 mb-6">
        <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', padding: '16px 18px' }}>
          <p className="flex items-center gap-2" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
            <Info className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />What the contributor sees
          </p>
          <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-subtle)', padding: '12px 14px' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--money-pending)' }}>Under extended review</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.5 }}>
              Reviewers disagreed, so we’re taking a closer look. Your ₹ is held, not lost — it
              settles the moment this resolves.
            </p>
          </div>
        </div>
      </div>

      {/* Continue */}
      <div className="px-6">
        <button
          onClick={() => navigate('/validator/tasks')}
          style={{
            width: '100%', height: 52, borderRadius: 'var(--r-full)',
            background: 'var(--t-verdigris-700)', color: 'var(--text-on-accent)',
            border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Back to grading <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
