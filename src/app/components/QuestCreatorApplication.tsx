import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Building2, CheckCircle2, Globe, Users, Database, ChevronLeft } from 'lucide-react';
import { Waveform } from './ui/Waveform';

export function QuestCreatorApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'submitted'>('form');

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, [navigate]);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [dataNeeds, setDataNeeds] = useState('');
  const [volume, setVolume] = useState('');

  const canSubmit = companyName.trim() !== '' && email.trim() !== '';

  if (step === 'submitted') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--neutral-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
          }}>
            <Building2 className="w-11 h-11" style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
            We'll be in touch
          </h1>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, marginBottom: 8 }}>
            Our team will reach out within 24 hours to discuss your audio data requirements and set up your campaign.
          </p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 32 }}>
            Check {email} for a confirmation.
          </p>
          <button
            onClick={() => navigate('/contributor')}
            style={{
              height: 56, borderRadius: 999, padding: '0 40px',
              background: 'var(--accent-primary-deep)', color: '#FFFFFF',
              fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196,98,45,0.28)',
            }}
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Create Campaigns</p>
      </div>

      {/* Hero */}
      <div className="px-6 mb-6">
        <div style={{
          background: 'var(--navy)', borderRadius: 22,
          padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 22px 22px', opacity: 0.10 }}>
            <Waveform color="#FFFFFF" opacity={1} height={80} variant="data" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5" style={{ color: '#6B7394' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7394', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                For Companies
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
              Need audio data for your AI models?
            </h2>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Access thousands of verified contributors across <span style={{ color: '#FFFFFF', fontWeight: 600 }}>13+ languages</span>. Get production-quality datasets with built-in validation.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          {[
            { icon: Users, value: '5,000+', label: 'Contributors' },
            { icon: Globe, value: '13+', label: 'Languages' },
            { icon: Database, value: '98%', label: 'Data Quality' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{
                flex: 1, background: '#FFFFFF', borderRadius: 14,
                border: '1px solid #E8EDF3', padding: '14px 10px', textAlign: 'center',
              }}>
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="px-6 space-y-5">
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
            Company Name *
          </label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
            style={{
              width: '100%', height: 48, borderRadius: 14,
              border: '1.5px solid #E8EDF3', padding: '0 16px',
              fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
              outline: 'none', fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
            Work Email *
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
            style={{
              width: '100%', height: 48, borderRadius: 14,
              border: '1.5px solid #E8EDF3', padding: '0 16px',
              fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
              outline: 'none', fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
            Website <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>(optional)</span>
          </label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.com"
            style={{
              width: '100%', height: 48, borderRadius: 14,
              border: '1.5px solid #E8EDF3', padding: '0 16px',
              fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
              outline: 'none', fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        {/* Volume */}
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'block' }}>
            Expected data volume
          </label>
          <div className="flex gap-2 flex-wrap">
            {['< 1,000 clips', '1K–10K clips', '10K–100K clips', '100K+ clips'].map((opt) => (
              <button
                key={opt}
                onClick={() => setVolume(opt)}
                style={{
                  padding: '10px 16px', borderRadius: 12,
                  fontSize: 12, fontWeight: 600,
                  border: '1.5px solid',
                  background: volume === opt ? 'var(--text-primary)' : '#FFFFFF',
                  borderColor: volume === opt ? 'var(--text-primary)' : 'var(--card-border)',
                  color: volume === opt ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Data needs */}
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
            Tell us about your data needs <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>(optional)</span>
          </label>
          <textarea
            value={dataNeeds}
            onChange={(e) => setDataNeeds(e.target.value)}
            placeholder="What kind of audio data do you need? Languages, use cases, quality requirements..."
            rows={3}
            style={{
              width: '100%', borderRadius: 14,
              border: '1.5px solid #E8EDF3', padding: '14px 16px',
              fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
              resize: 'none', outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="px-6 mt-8">
        <button
          onClick={() => canSubmit && setStep('submitted')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: canSubmit ? 'var(--accent-primary-deep)' : 'var(--card-border)',
            color: canSubmit ? '#FFFFFF' : 'var(--text-muted)',
            fontSize: 16, fontWeight: 700, border: 'none',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            boxShadow: canSubmit ? '0px 4px 16px rgba(196,98,45,0.28)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          Connect With Us
        </button>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          Free consultation · No commitment required
        </p>
      </div>
    </div>
  );
}
