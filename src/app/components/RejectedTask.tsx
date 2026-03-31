import { useNavigate } from 'react-router';
import { ArrowLeft, Mic, SkipForward, AlertCircle, FileText } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const rejectedSubmission = {
  questName:    'Customer Service Dialogue',
  submittedAt:  'Feb 24, 2026 at 2:45 PM',
  primaryReason: 'Background traffic noise detected',
  reason:       'Excessive background traffic noise was detected throughout the recording. The signal-to-noise ratio fell below the minimum acceptable threshold for dataset quality.',
  prompt:
    'Please read the following text clearly: "Thank you for calling Sunrise Telecom. My name is Priya, and I\'ll be happy to assist you with your account today. Could you please verify the last four digits of your registered mobile number?"',
  payout:       20.00,
  effortCredit: 1.50,
};

const rejectionTags = ['Too short', 'Background noise', 'Clipping detected'];

// ─── Component ────────────────────────────────────────────────────────────────

export function RejectedTask() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-10 pb-2 flex items-center gap-4">
        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FFFFFF', border: '1px solid #E8EDF3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 4px 12px rgba(28,36,52,0.04)', cursor: 'pointer',
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
        </button>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434' }}>
          Submission Review
        </h1>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-auto">

        {/* Rejection Card */}
        <div
          style={{
            background: '#FFF8F8',
            borderRadius: 16,
            borderLeft: '3px solid #C0392B',
            border: '1px solid #F5C5C5',
            borderLeftWidth: 3,
            borderLeftColor: '#C0392B',
            boxShadow: '0px 4px 12px rgba(192,57,43,0.06)',
            overflow: 'hidden',
          }}
        >
          <div className="px-5 py-5">
            <div className="flex items-start gap-3 mb-4">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FDE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle className="w-5 h-5" style={{ color: '#C0392B' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 800, color: '#1C2434', marginBottom: 2 }}>
                  This clip wasn't accepted
                </h2>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>{rejectedSubmission.submittedAt}</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', marginBottom: 4 }}>Reason</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434' }}>{rejectedSubmission.primaryReason}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', marginTop: 4, lineHeight: 1.5 }}>{rejectedSubmission.reason}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {rejectionTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12, fontWeight: 700,
                    padding: '5px 12px', borderRadius: 999,
                    background: '#FDE8E8', color: '#8B0000',
                    border: '1px solid #F5C5C5',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Partial Payout Notice */}
        <div
          style={{
            background: '#FEF7E6', borderRadius: 12,
            border: '1px solid #F5E0A8',
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>💳</span>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#4A3800', lineHeight: 1.5 }}>
            You'll receive{' '}
            <strong style={{ color: '#8B6914', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ₹{rejectedSubmission.effortCredit.toFixed(2)}
            </strong>{' '}
            effort credit (10%) for this attempt.
          </p>
        </div>

        <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', textAlign: 'center', lineHeight: 1.5 }}>
          ✓ Re-recording doesn't affect your streak or level
        </p>

        {/* Quest Info */}
        <div
          style={{
            background: '#FFFFFF', borderRadius: 16,
            border: '1px solid #E8EDF3',
            boxShadow: '0px 4px 12px rgba(28,36,52,0.04)',
            padding: '18px',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4" style={{ color: '#8896A7' }} />
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>Original prompt</p>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.65 }}>{rejectedSubmission.prompt}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <button
            onClick={() => navigate('/recording/rejected-redo')}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: '#C4622D', color: '#FFFFFF',
              fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196,98,45,0.30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Mic className="w-5 h-5" />
            Re-record This Clip
          </button>
          {/* Secondary — text only, no border */}
          <button
            onClick={() => navigate('/contributor')}
            style={{
              width: '100%', padding: '15px', borderRadius: 999,
              background: 'transparent', color: '#8896A7',
              fontSize: 15, fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <SkipForward className="w-5 h-5" />
            Skip &amp; Find Another Quest
          </button>
        </div>
      </div>
    </div>
  );
}