import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, AlertCircle, Check, FileText, Lightbulb, ChevronLeft } from 'lucide-react';
import { rejectionReason, type RejectionReasonId } from '../lib/rejectionTaxonomy';

// ─── Data ─────────────────────────────────────────────────────────────────────
// Partial rejection (C-12): most clips pass, one is flagged with a shared-taxonomy
// reason. Accepted clips are preserved; only the flagged prompt is re-recorded.

const TOTAL_PROMPTS = 10;
const FLAGGED_PROMPTS = [4];

const rejectedSubmission = {
  questName:     'Customer Service Dialogue',
  submittedAt:   'Feb 24, 2026 at 2:45 PM',
  reasonId:      'noise' as RejectionReasonId,
  prompt4:
    '"Thank you for calling Sunrise Telecom. My name is Priya, and I\'ll be happy to assist you with your account today."',
  pendingPayout: 25.00,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function RejectedTask() {
  const navigate = useNavigate();
  const validCount = TOTAL_PROMPTS - FLAGGED_PROMPTS.length;
  const firstFlagged = FLAGGED_PROMPTS[0];
  const reason = rejectionReason(rejectedSubmission.reasonId);
  const ReasonIcon = reason.icon;

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Repair Studio
        </h1>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-auto">

        {/* Hero — preserved-effort framing */}
        <div
          style={{
            background: 'var(--surface-studio)',
            borderRadius: 'var(--r-lg)',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--e-3)',
          }}
        >
          <div className="relative z-10">
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--action-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Almost there
            </p>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 24, fontWeight: 800, color: 'var(--text-on-studio)', lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.02em' }}>
              {validCount} of {TOTAL_PROMPTS} clips passed.<br />Just fix 1 to unlock{' '}
              <span style={{ fontFamily: 'var(--font-number)', color: 'var(--action-primary)' }}>
                ₹{rejectedSubmission.pendingPayout.toFixed(2)}
              </span>
            </h2>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(var(--carbon-rgb),0.0)', lineHeight: 1.55 }}>
              <span style={{ color: 'var(--text-on-studio)', opacity: 0.6 }}>
                Your other recordings are safe. Re-record only the flagged prompt to release the full payout.
              </span>
            </p>
          </div>
        </div>

        {/* Prompt Matrix */}
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-1)',
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
                    borderRadius: 'var(--r-sm)',
                    background: flagged ? 'var(--status-error-bg)' : 'var(--status-success-bg)',
                    border: flagged ? '1.5px solid var(--state-failed)' : '1px solid var(--state-settled)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {flagged ? (
                    <AlertCircle style={{ width: 16, height: 16, color: 'var(--state-failed)' }} />
                  ) : (
                    <Check style={{ width: 16, height: 16, color: 'var(--state-settled)' }} strokeWidth={2.6} />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-number)',
                      fontSize: 11,
                      fontWeight: 700,
                      color: flagged ? 'var(--state-failed)' : 'var(--state-settled)',
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

        {/* Flagged prompt detail — shared taxonomy: sentence + why + fix */}
        <div
          style={{
            background: 'var(--status-error-bg)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--state-failed)',
            borderLeft: '3px solid var(--state-failed)',
            padding: '18px',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{
                fontFamily: 'var(--font-number)', fontSize: 11, fontWeight: 700,
                padding: '3px 9px', borderRadius: 'var(--r-full)',
                background: 'var(--surface-raised)', color: 'var(--state-failed)', border: '1px solid var(--state-failed)',
              }}
            >
              PROMPT {String(firstFlagged).padStart(2, '0')}
            </span>
            <span className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 700, color: 'var(--state-failed)' }}>
              <ReasonIcon className="w-3.5 h-3.5" />
              {reason.label}
            </span>
          </div>

          {/* one clear sentence */}
          <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 8 }}>
            {reason.sentence}
          </p>
          {/* why */}
          <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 12 }}>
            {reason.why}
          </p>

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

        {/* Corrective tip from the taxonomy */}
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-1)',
            padding: '16px 18px',
          }}
        >
          <div className="flex items-start gap-2">
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--r-sm)', flexShrink: 0,
              background: 'var(--status-accent-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lightbulb className="w-3.5 h-3.5" style={{ color: 'var(--action-primary)' }} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                How to fix it
              </p>
              <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {reason.fix}
              </p>
            </div>
          </div>
        </div>

        <p className="flex items-center justify-center gap-1.5" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
          <Check className="w-3.5 h-3.5" style={{ color: 'var(--state-settled)' }} strokeWidth={2.5} />
          Re-recording doesn&apos;t affect your standing
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button
            onClick={() => navigate('/recording/q-scen-3')}
            style={{
              width: '100%', height: 56, borderRadius: 'var(--r-full)',
              background: 'var(--action-primary)',
              color: 'var(--text-on-accent)',
              fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: 'var(--e-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Mic className="w-5 h-5" />
            Re-record prompt {String(firstFlagged).padStart(2, '0')} (₹{rejectedSubmission.pendingPayout.toFixed(2)} pending)
          </button>
          <button
            onClick={() => navigate('/contributor')}
            style={{
              width: '100%', padding: '15px', borderRadius: 'var(--r-full)',
              background: 'transparent', color: 'var(--text-muted)',
              fontSize: 14, fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            I&apos;ll come back to this later
          </button>
        </div>
      </div>
    </div>
  );
}
