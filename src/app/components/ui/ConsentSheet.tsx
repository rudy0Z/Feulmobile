import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronDown, Mic, Eye, Clock, Trash2 } from 'lucide-react';
import { SwipeButton } from './SwipeButton';
import { recordConsent } from '../../lib/session';

const facts = [
  { icon: Mic,    title: 'What gets recorded', desc: 'Only your voice during active recording — nothing ambient, nothing in the background.' },
  { icon: Eye,    title: 'Who sees it',        desc: 'Research teams who commission datasets. Your name is never shared — only anonymised clips.' },
  { icon: Clock,  title: 'How long',           desc: 'Up to 24 months. You can request deletion any time from Profile → Data Vault.' },
  { icon: Trash2, title: 'Your right to delete', desc: 'Withdraw consent whenever you like; deletion is processed within 30 days.' },
];

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

/**
 * Consent as a swipe sheet (§ Pass 1) — 2 lines + expand, DPDP facts kept.
 * Triggered lazily before the first submit, not as a pre-Home wall.
 */
export function ConsentSheet({ onComplete, onCancel }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleConsent = () => {
    recordConsent();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="consent-scrim"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onCancel}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(28,36,52,0.45)', backdropFilter: 'blur(2px)' }}
      />
      <motion.div
        key="consent-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301,
          background: 'var(--surface)', borderRadius: '24px 24px 0 0',
          padding: '10px 20px 32px', boxShadow: '0px -12px 40px rgba(28,36,52,0.18)',
        }}
      >
        {/* Grabber */}
        <div style={{ width: 40, height: 4, borderRadius: 999, background: 'var(--card-border)', margin: '0 auto 20px' }} />

        <div className="flex items-start gap-3 mb-3">
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--status-accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck style={{ width: 20, height: 20, color: 'var(--accent-primary-deep)' }} strokeWidth={2} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Your voice, your rights
            </h2>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 3 }}>
              Before your first submission — here's exactly what happens to your audio.
            </p>
          </div>
        </div>

        {/* Expand for full DPDP facts */}
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--accent-primary-deep)', fontSize: 13, fontWeight: 700,
            padding: '8px 0', marginBottom: 4,
          }}
        >
          {expanded ? 'Hide details' : 'Read the 4 details'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex' }}>
            <ChevronDown style={{ width: 15, height: 15 }} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'var(--background)', borderRadius: 16, border: '1px solid var(--card-border)', overflow: 'hidden', marginBottom: 8 }}>
                {facts.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} style={{ padding: '14px 16px', borderBottom: i < facts.length - 1 ? '1px solid var(--card-border)' : 'none', display: 'flex', gap: 12 }}>
                      <Icon style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} strokeWidth={2} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{f.title}</p>
                        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                Feul complies with the <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Digital Personal Data Protection Act, 2023</span>. Audio is processed under explicit consent.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3">
          <SwipeButton
            label="Swipe to consent & record"
            completeLabel="Consent recorded"
            onComplete={handleConsent}
          />
        </div>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          Revoke anytime in Profile → Data Vault
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
