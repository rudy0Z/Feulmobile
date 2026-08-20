import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, AlertCircle, Check, FileText, Lightbulb, Volume2, ChevronLeft } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOTAL_PROMPTS = 10;
const FLAGGED_PROMPTS = [4];

const rejectedSubmission = {
  questName:    'Customer Service Dialogue',
  submittedAt:  'Feb 24, 2026 at 2:45 PM',
  primaryReason: 'Background traffic noise detected on prompt 4',
  category:     'Background noise',
  improvementTip: 'Move to a quieter room and keep the mic 6–8 inches from your mouth. Even soft traffic doubles in pitch on a phone mic.',
  prompt4:
    '"Thank you for calling Sunrise Telecom. My name is Priya, and I\'ll be happy to assist you with your account today."',
  pendingPayout: 25.00,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function RejectedTask() {
  const navigate = useNavigate();
  const validCount = TOTAL_PROMPTS - FLAGGED_PROMPTS.length;
  const firstFlagged = FLAGGED_PROMPTS[0];

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>
          Repair Studio
        </h1>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-auto">

        {/* Hero — preserved-effort framing */}
        <div
          style={{
            background: 'linear-gradient(160deg, var(--surface-hero) 0%, var(--surface-hero-elevated) 100%)',
            borderRadius: 20,
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          <div className="relative z-10">
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Almost there
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 10 }}>
              {validCount} of {TOTAL_PROMPTS} clips passed.<br />Just fix 1 to unlock{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
                ₹{rejectedSubmission.pendingPayout.toFixed(2)}
              </span>
            </h2>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>
              Your other recordings are safe. Re-record only the flagged prompt to release the full payout.
            </p>
          </div>
        </div>

        {/* Prompt Matrix */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E8EDF3',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
            padding: '20px',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Your clips</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>
              {validCount} valid · {FLAGGED_PROMPTS.length} to fix
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {Array.from({ length: TOTAL_PROMPTS }).map((_, idx) => {
              const promptNum = idx + 1;
              const flagged = FLAGGED_PROMPTS.includes(promptNum);
              return (
                <motion.div
                  key={promptNum}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 12,
                    background: flagged ? 'var(--status-error-bg)' : 'var(--status-success-bg)',
                    border: flagged ? '1.5px solid #F5C5C5' : '1px solid #C8E6D5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: flagged
                      ? '0px 4px 12px rgba(192,57,43,0.10), inset 0px 1px 0px rgba(255,255,255,0.6)'
                      : 'inset 0px 1px 0px rgba(255,255,255,0.6)',
                  }}
                >
                  {flagged ? (
                    <AlertCircle style={{ width: 16, height: 16, color: 'var(--color-error)' }} />
                  ) : (
                    <Check style={{ width: 16, height: 16, color: 'var(--color-success)' }} strokeWidth={2.6} />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      color: flagged ? 'var(--status-error-text)' : 'var(--status-success-text)',
                      marginTop: 4,
                    }}
                  >
                    {String(promptNum).padStart(2, '0')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Flagged prompt detail */}
        <div
          style={{
            background: '#FFF8F8',
            borderRadius: 16,
            border: '1px solid #F5C5C5',
            borderLeft: '3px solid #B8860B',
            padding: '18px',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                padding: '3px 9px', borderRadius: 999,
                background: 'var(--status-error-bg)', color: 'var(--status-error-text)', border: '1px solid #F5C5C5',
              }}
            >
              PROMPT {String(firstFlagged).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--status-error-text)' }}>
              Background noise
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              What to re-record
            </p>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.65 }}>
            {rejectedSubmission.prompt4}
          </p>
        </div>

        {/* Skill development tip */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E8EDF3',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
            padding: '16px 18px',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'var(--status-accent-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Volume2 className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary-deep)' }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Category · {rejectedSubmission.category}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B8860B' }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                How to improve next time
              </p>
              <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {rejectedSubmission.improvementTip}
              </p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
          ✓ Re-recording doesn't affect your streak or level
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button
            onClick={() => navigate('/recording/q-scen-3')}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              color: '#FFFFFF',
              fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 8px 24px rgba(var(--accent-deep-rgb),0.38), inset 0px 1px 0px rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Mic className="w-5 h-5" />
            Re-record prompt {String(firstFlagged).padStart(2, '0')} (₹{rejectedSubmission.pendingPayout.toFixed(2)} pending)
          </button>
          <button
            onClick={() => navigate('/contributor')}
            style={{
              width: '100%', padding: '15px', borderRadius: 999,
              background: 'transparent', color: 'var(--text-muted)',
              fontSize: 14, fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            I'll come back to this later
          </button>
        </div>
      </div>
    </div>
  );
}
