import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, Mic, Eye, Clock, Trash2, Lock } from 'lucide-react';
import { SwipeButton } from './ui/SwipeButton';

const consentPoints = [
  {
    icon: Mic,
    iconBg: 'var(--status-accent-bg)',
    iconColor: 'var(--accent-primary-deep)',
    title: 'What gets recorded',
    desc: 'Only your voice audio during active recording sessions. No ambient sound, no background listening. Recording starts and stops exactly when you tap.',
  },
  {
    icon: Eye,
    iconBg: '#EEF2FF',
    iconColor: 'var(--text-secondary)',
    title: 'Who sees your data',
    desc: 'AI companies and research teams who commission datasets through Feul. Your name and personal details are never shared — only anonymised audio clips.',
  },
  {
    icon: Clock,
    iconBg: 'var(--warning-50)',
    iconColor: 'var(--warning-700)',
    title: 'How long it\'s stored',
    desc: 'Audio clips are retained for up to 24 months from submission. You can request deletion at any time from your Profile \u2192 Data Vault.',
  },
  {
    icon: Trash2,
    iconBg: 'var(--status-success-bg)',
    iconColor: 'var(--color-success)',
    title: 'Your right to delete',
    desc: 'You can withdraw consent and request deletion of all your contributed audio at any time. Deletion is processed within 30 days.',
  },
];

export function DataConsent() {
  const navigate = useNavigate();

  const handleConsent = () => {
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
          background: 'var(--navy)',
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
              background: 'rgba(var(--accent-deep-rgb),0.18)', borderRadius: 999,
              padding: '5px 14px', marginBottom: 20,
            }}
          >
            <Lock style={{ width: 11, height: 11, color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Data & Consent
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800,
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
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {point.title}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
            background: 'var(--warning-50)', borderRadius: 16, border: '1px solid #F5E4B8',
            padding: '14px 16px', marginTop: 16,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}
        >
          <ShieldCheck style={{ width: 16, height: 16, color: 'var(--warning-700)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--status-warning-text)', lineHeight: 1.55 }}>
            Feul complies with the{' '}
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Digital Personal Data Protection Act, 2023</span>.
            Your audio is processed under explicit consent — you're in control.
          </p>
        </div>

        {/* Consent affirmation copy — swipe replaces the checkbox */}
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 18, textAlign: 'center' }}>
          By swiping below, you confirm you understand how your voice data is recorded, used,
          and that you can delete it at any time.
        </p>
      </div>

      {/* Bottom Swipe-to-Consent — fixed above safe area */}
      <div className="px-5 pb-10 pt-2" style={{ background: 'linear-gradient(transparent, #FAF6F0 20%)' }}>
        <SwipeButton
          label="Swipe to consent & continue"
          completeLabel="Consent recorded"
          onComplete={handleConsent}
        />
        <p style={{ fontSize: 12, fontWeight: 500, color: '#A89880', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          You can review and revoke consent anytime in Profile → Data Vault
        </p>
      </div>
    </div>
  );
}