import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Mic2, Activity, Languages, CheckCircle2, ChevronLeft } from 'lucide-react';
import { tierName } from '../lib/tier';

const metrics = [
  {
    id: 'acceptance',
    label: 'Acceptance Rate',
    value: '94%',
    delta: '+3% vs last month',
    deltaPositive: true,
    description: 'Share of submissions approved by validators',
    icon: CheckCircle2,
    tint: 'var(--surface-sunken)',
    iconColor: 'var(--state-settled)',
  },
  {
    id: 'quality',
    label: 'Audio Quality Score',
    value: '8.6 / 10',
    delta: '+0.4 vs last month',
    deltaPositive: true,
    description: 'Signal clarity, noise floor, mic technique',
    icon: Mic2,
    tint: 'var(--t-terracotta-50)',
    iconColor: 'var(--action-primary)',
  },
  {
    id: 'consistency',
    label: 'Consistency Score',
    value: '7.9 / 10',
    delta: 'Steady',
    deltaPositive: true,
    description: 'Reliability across recent submissions',
    icon: Activity,
    tint: 'var(--surface-sunken)',
    iconColor: 'var(--text-secondary)',
  },
];

const languageExpertise = [
  { language: 'Hindi',   accepted: 142, level: 'Expert',     bar: 0.92 },
  { language: 'Marathi', accepted:  47, level: 'Proficient', bar: 0.62 },
  { language: 'English', accepted:  18, level: 'Developing', bar: 0.28 },
];

const cardBase: React.CSSProperties = {
  background: 'var(--surface-raised)',
  borderRadius: 'var(--r-md)',
  border: '1px solid var(--border-subtle)',
  boxShadow: 'var(--e-1)',
};

export function Performance() {
  const navigate = useNavigate();

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend',   onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend',   onEnd);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0', marginBottom: 6 }}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
          Performance
        </h1>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>How you compare to last month</p>
      </div>

      {/* Hero — trust tier + total accepted */}
      <div className="px-6 mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '22px 22px',
            boxShadow: 'var(--e-2)',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Total Accepted Contributions
          </p>
          <p style={{ fontFamily: 'var(--font-number)', fontSize: 44, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>
            207
          </p>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            clips contributed to live datasets as a{' '}
            <span style={{ color: 'var(--action-primary)', fontWeight: 700 }}>{tierName(3)}</span>
          </p>
        </motion.div>
      </div>

      {/* Metric cards */}
      <div className="px-6 space-y-3 mb-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + idx * 0.06 }}
              style={{ ...cardBase, padding: '18px' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: m.tint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: m.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{m.label}</p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.45 }}>{m.description}</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p style={{ fontFamily: 'var(--font-number)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {m.value}
                </p>
                <span className="flex items-center gap-1" style={{
                  fontSize: 11, fontWeight: 700,
                  color: m.deltaPositive ? 'var(--state-settled)' : 'var(--state-failed)',
                }}>
                  <TrendingUp className="w-3 h-3" />
                  {m.delta}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Language expertise */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-3">
          <Languages className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
            Language Expertise
          </h2>
        </div>
        <div style={{ ...cardBase, padding: '18px' }}>
          {languageExpertise.map((lang, idx) => (
            <div
              key={lang.language}
              style={{
                paddingTop: idx === 0 ? 0 : 14,
                paddingBottom: idx === languageExpertise.length - 1 ? 0 : 14,
                borderBottom: idx < languageExpertise.length - 1 ? '1px solid var(--divider)' : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{lang.language}</p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>{lang.accepted} accepted clips</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: '4px 12px', borderRadius: 'var(--r-full)',
                  background: lang.bar > 0.5 ? 'var(--t-terracotta-50)' : 'var(--surface-sunken)',
                  color:      lang.bar > 0.8 ? 'var(--state-settled)' : lang.bar > 0.5 ? 'var(--action-primary)' : 'var(--text-secondary)',
                }}>
                  {lang.level}
                </span>
              </div>
              <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-full)', height: 6 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.bar * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + idx * 0.1 }}
                  style={{
                    background: 'var(--action-primary)',
                    borderRadius: 'var(--r-full)', height: 6,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
          Expertise grows with every accepted clip in a given language.
        </p>
      </div>
    </div>
  );
}
