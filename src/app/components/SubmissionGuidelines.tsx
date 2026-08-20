import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Volume2, Mic2, Timer, ThumbsUp, X, Check, ChevronRight, Wand2, ChevronLeft } from 'lucide-react';
import { Waveform } from './ui/Waveform';

const doItems = [
  {
    icon: Volume2,
    title: 'Find a quiet space',
    desc: 'Background noise is the #1 rejection reason. Step away from TVs, fans, or street traffic.',
  },
  {
    icon: Mic2,
    title: 'Hold phone at chest height',
    desc: 'About 15–20 cm from your mouth. Don\'t cover the mic and avoid whispering into it.',
  },
  {
    icon: Timer,
    title: 'Speak at your natural pace',
    desc: 'Not too fast, not artificially slow. Read the prompt exactly as written — don\'t paraphrase.',
  },
  {
    icon: ThumbsUp,
    title: 'Full sentence, clear ending',
    desc: 'Say the complete prompt. Clip off at the start or end = rejected. A natural pause at the end is fine.',
  },
];

const dontItems = [
  'Recording while commuting or outdoors',
  'Yelling, whispering, or doing accents',
  'Pausing mid-sentence for more than 1 second',
  'Skipping or adding words to the prompt',
];

const qualityBadges = [
  { label: 'Clear audio', bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
  { label: 'No clipping', bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
  { label: 'Natural pace', bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
];

export function SubmissionGuidelines() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-0">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 10 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        {/* Step pill */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--status-accent-bg)', borderRadius: 999,
            padding: '5px 14px', marginBottom: 16,
          }}
        >
          <Wand2 style={{ width: 11, height: 11, color: 'var(--accent-primary-deep)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary-deep)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Recording Tips
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800,
            color: 'var(--text-primary)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8,
          }}
        >
          How to record<br />for top quality
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 6 }}>
          Clips that meet these standards get approved instantly. Rejected clips still earn 10% effort credit.
        </p>
      </div>

      {/* Quality badge strip */}
      <div className="flex gap-2 px-6 mt-3 mb-6">
        {qualityBadges.map((b) => (
          <span
            key={b.label}
            style={{
              fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999,
              background: b.bg, color: b.text,
            }}
          >
            ✓ {b.label}
          </span>
        ))}
      </div>

      <div className="flex-1 px-5 overflow-auto pb-4">

        {/* Do's — card */}
        <div
          style={{
            background: '#FFFFFF', borderRadius: 20,
            border: '1px solid #E8EDF3', marginBottom: 14, overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 20px 10px',
              borderBottom: '1px solid #F0EDE6',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--status-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check style={{ width: 13, height: 13, color: 'var(--color-success)' }} strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Do this
            </p>
          </div>

          {doItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 + 0.1, duration: 0.3 }}
                style={{
                  padding: '16px 20px',
                  borderBottom: idx < doItems.length - 1 ? '1px solid #F5F5F5' : 'none',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: 'var(--status-accent-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: 17, height: 17, color: 'var(--accent-primary-deep)' }} strokeWidth={2} />
                </div>
                <div style={{ paddingTop: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Don'ts — compact list */}
        <div
          style={{
            background: '#FFF8F8', borderRadius: 20,
            border: '1px solid #F5C5C5', marginBottom: 14, overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 20px 10px',
              borderBottom: '1px solid #F5E5E5',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--status-error-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X style={{ width: 13, height: 13, color: '#C0392B' }} strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Avoid this
            </p>
          </div>

          <div style={{ padding: '6px 0' }}>
            {dontItems.map((item, idx) => (
              <div
                key={item}
                style={{
                  padding: '11px 20px',
                  borderBottom: idx < dontItems.length - 1 ? '1px solid #F5EFEF' : 'none',
                  display: 'flex', gap: 12, alignItems: 'center',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C0392B', flexShrink: 0 }} />
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Waveform example — what good audio looks like */}
        <div
          style={{
            background: 'var(--navy)', borderRadius: 16, padding: '18px 20px', marginBottom: 4,
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 18px 18px', opacity: 0.10 }}>
            <Waveform color="#FFFFFF" opacity={1} height={56} />
          </div>
          <div className="relative z-10">
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              What approved audio looks like
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 44 }}>
              {[3,5,8,12,18,24,28,30,28,24,20,16,12,9,6,8,12,18,24,28,30,26,20,14,9,6,4,6,10,16,22,26,28,24,18,12].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1, borderRadius: 3, minWidth: 3,
                    background: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-primary-deep)',
                    height: `${Math.min(100, h * 2.8)}%`,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
              Consistent amplitude · No clipping · Clear start and end
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-10 pt-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/voice-calibration')}
          style={{
            width: '100%', height: 58, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 6px 24px rgba(var(--accent-deep-rgb),0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Mic2 style={{ width: 18, height: 18 }} />
          I'm Ready — Start Recording
          <ChevronRight style={{ width: 18, height: 18 }} />
        </motion.button>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          5 short clips · ~2 minutes total · Earn ₹50
        </p>
      </div>
    </div>
  );
}
