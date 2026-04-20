import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Volume2, Mic2, Timer, ThumbsUp, X, Check, ChevronRight, Wand2 } from 'lucide-react';
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
  { label: 'Clear audio', bg: '#E6F4EC', text: '#1A5C35' },
  { label: 'No clipping', bg: '#E6F4EC', text: '#1A5C35' },
  { label: 'Natural pace', bg: '#E6F4EC', text: '#1A5C35' },
];

export function SubmissionGuidelines() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-0">
        {/* Step pill */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#FEF0E8', borderRadius: 999,
            padding: '5px 14px', marginBottom: 16,
          }}
        >
          <Wand2 style={{ width: 11, height: 11, color: '#C4622D' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#C4622D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Recording Tips
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 800,
            color: '#1C2434', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8,
          }}
        >
          How to record<br />for top quality
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', lineHeight: 1.6, marginBottom: 6 }}>
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
            <div style={{ width: 22, height: 22, borderRadius: 6, background: '#E6F4EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check style={{ width: 13, height: 13, color: '#2D7A4F' }} strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#1C2434', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                    width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                    background: '#FEF0E8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: 17, height: 17, color: '#C4622D' }} strokeWidth={2} />
                </div>
                <div style={{ paddingTop: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.55 }}>
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
            <div style={{ width: 22, height: 22, borderRadius: 6, background: '#FDE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X style={{ width: 13, height: 13, color: '#C0392B' }} strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#1C2434', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Waveform example — what good audio looks like */}
        <div
          style={{
            background: '#1A1F2E', borderRadius: 18, padding: '18px 20px', marginBottom: 4,
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.08 }}>
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
                    background: i % 2 === 0 ? '#E06C3A' : '#C4622D',
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
            background: '#C4622D', color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 6px 24px rgba(196,98,45,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Mic2 style={{ width: 18, height: 18 }} />
          I'm Ready — Start Recording
          <ChevronRight style={{ width: 18, height: 18 }} />
        </motion.button>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', textAlign: 'center', marginTop: 12 }}>
          5 short clips · ~2 minutes total · Earn ₹50
        </p>
      </div>
    </div>
  );
}
