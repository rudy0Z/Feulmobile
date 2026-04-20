import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, Mic, Eye, Clock, Trash2, ChevronRight, Lock, AlertCircle } from 'lucide-react';

const consentPoints = [
  {
    icon: Mic,
    iconBg: '#FEF0E8',
    iconColor: '#C4622D',
    title: 'What gets recorded',
    desc: 'Only your voice audio during active recording sessions. No ambient sound, no background listening. Recording starts and stops exactly when you tap.',
  },
  {
    icon: Eye,
    iconBg: '#EEF2FF',
    iconColor: '#4F46E5',
    title: 'Who sees your data',
    desc: 'AI companies and research teams who commission datasets through Feul. Your name and personal details are never shared — only anonymised audio clips.',
  },
  {
    icon: Clock,
    iconBg: '#FEF7E6',
    iconColor: '#8B6914',
    title: 'How long it\'s stored',
    desc: 'Audio clips are retained for up to 24 months from submission. You can request deletion at any time from your Profile \u2192 Data Vault.',
  },
  {
    icon: Trash2,
    iconBg: '#E6F4EC',
    iconColor: '#2D7A4F',
    title: 'Your right to delete',
    desc: 'You can withdraw consent and request deletion of all your contributed audio at any time. Deletion is processed within 30 days.',
  },
];

export function DataConsent() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    navigate('/submission-guidelines');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#FAF6F0', fontFamily: 'var(--font-sans)' }}
    >
      {/* Hero band — navy, same gravity as wallet card */}
      <div
        style={{
          background: '#1A1F2E',
          padding: '64px 24px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle shield pattern */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.04, pointerEvents: 'none',
          }}
        >
          <ShieldCheck style={{ width: 240, height: 240, color: '#FFFFFF' }} strokeWidth={0.5} />
        </div>

        <div className="relative z-10">
          {/* Step pill */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(196,98,45,0.18)', borderRadius: 999,
              padding: '5px 14px', marginBottom: 20,
            }}
          >
            <Lock style={{ width: 11, height: 11, color: '#E06C3A' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E06C3A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Data & Consent
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 800,
              color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 12,
            }}
          >
            Your voice,<br />your rights.
          </h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 300 }}>
            Before we record anything, here's exactly what happens to your audio — no fine print.
          </p>
        </div>
      </div>

      {/* Consent points */}
      <div className="flex-1 px-5 pt-5 pb-4">
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #EDE9E1',
            overflow: 'hidden',
          }}
        >
          {consentPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 + 0.1, duration: 0.35 }}
                style={{
                  padding: '18px 20px',
                  borderBottom: idx < consentPoints.length - 1 ? '1px solid #F0EDE6' : 'none',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: point.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: 18, height: 18, color: point.iconColor }} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 4 }}>
                    {point.title}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.6 }}>
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legal note */}
        <div
          style={{
            background: '#FEF7E6', borderRadius: 14, border: '1px solid #F5E4B8',
            padding: '14px 16px', marginTop: 16,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}
        >
          <ShieldCheck style={{ width: 16, height: 16, color: '#8B6914', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B4800', lineHeight: 1.55 }}>
            Feul complies with the{' '}
            <span style={{ fontWeight: 700, color: '#1C2434' }}>Digital Personal Data Protection Act, 2023</span>.
            Your audio is processed under explicit consent — you're in control.
          </p>
        </div>

        {/* Consent checkbox */}
        <motion.div
          style={{
            marginTop: 20, padding: '16px', borderRadius: 14,
            border: showError && !agreed ? '1.5px solid #C0392B' : '1.5px solid #E8EDF3',
            background: agreed ? '#F0FAF4' : '#FFFFFF',
            display: 'flex', gap: 12, alignItems: 'flex-start',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onClick={() => { setAgreed(!agreed); setShowError(false); }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
              border: agreed ? 'none' : '2px solid #CBD5E0',
              background: agreed ? '#2D7A4F' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {agreed && (
              <motion.svg
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
              >
                <path d="M2 6L5 9L10 3" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1C2434', lineHeight: 1.55 }}>
            I understand how my voice data will be recorded, used, and that I can delete it at any time.
          </p>
        </motion.div>

        {/* Inline error */}
        {showError && !agreed && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 px-1"
          >
            <AlertCircle style={{ width: 13, height: 13, color: '#C0392B', flexShrink: 0 }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B' }}>
              Please check the box above to continue
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA — fixed above safe area */}
      <div className="px-5 pb-10 pt-2" style={{ background: 'linear-gradient(transparent, #FAF6F0 20%)' }}>
        <button
          onClick={handleContinue}
          style={{
            width: '100%', height: 58, borderRadius: 999,
            background: agreed ? '#C4622D' : '#D4BAB0',
            color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: agreed ? '0px 6px 24px rgba(196,98,45,0.30)' : 'none',
            transition: 'all 0.25s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          I Agree — Continue
          <ChevronRight style={{ width: 18, height: 18 }} />
        </button>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#A89880', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          You can review and revoke consent anytime in Profile → Data Vault
        </p>
      </div>
    </div>
  );
}