import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, Languages, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Waveform } from './ui/Waveform';

const languageOptions = ['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali', 'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Spanish', 'French', 'Mandarin'];

export function ValidatorApplication() {
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [motivation, setMotivation] = useState('');

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const canSubmit = selectedLanguages.length > 0 && hoursPerWeek !== '';

  if (step === 'submitted') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--t-verdigris-50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
          }}>
            <CheckCircle2 className="w-11 h-11" style={{ color: 'var(--color-success)' }} strokeWidth={1.5} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
            Application Submitted
          </h1>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, marginBottom: 8 }}>
            We'll review your profile and notify you within 48 hours. Top contributors get priority access.
          </p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 32 }}>
            Keep recording to strengthen your application.
          </p>
          <button
            onClick={() => navigate('/contributor')}
            style={{
              height: 56, borderRadius: 999, padding: '0 40px',
              background: 'var(--action-primary-pressed)', color: 'var(--t-bone-0)',
              fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196, 98, 45,0.28)',
            }}
          >
            Back to Earning
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: '4px 0', marginBottom: 6 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Apply to Validate</p>
      </div>

      {/* Hero */}
      <div className="px-6 mb-6">
        <div style={{
          background: 'var(--surface-studio)', borderRadius: 24,
          padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 22px 22px', opacity: 0.10 }}>
            <Waveform color="var(--t-bone-0)" opacity={1} height={80} variant="precision" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5" style={{ color: 'var(--money-positive)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--money-positive)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Validator Program
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 24, fontWeight: 800, color: 'var(--t-bone-0)', marginBottom: 8, lineHeight: 1.2 }}>
              Earn more by reviewing audio quality
            </h2>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Validators earn <span style={{ color: 'var(--action-primary-pressed)', fontWeight: 700 }}>₹2 per clip reviewed</span>. Grade submissions from contributors and help maintain dataset quality.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements preview */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          {[
            { icon: CheckCircle2, label: '50+ clips recorded', met: true },
            { icon: Clock, label: '5+ hrs availability/week', met: false },
            { icon: Languages, label: '2+ languages fluent', met: false },
          ].map((req) => {
            const Icon = req.icon;
            return (
              <div key={req.label} style={{
                flex: 1, background: 'var(--t-bone-0)', borderRadius: 16,
                border: '1px solid var(--border-subtle)', padding: '14px 10px', textAlign: 'center',
              }}>
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: req.met ? 'var(--color-success)' : 'var(--text-muted)' }} />
                <p style={{ fontSize: 11, fontWeight: 600, color: req.met ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: 1.4 }}>
                  {req.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="px-6 space-y-6">
        {/* Languages */}
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'block' }}>
            Languages you can grade
          </label>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 12 }}>
            Select all languages you're fluent in
          </p>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                style={{
                  padding: '8px 16px', borderRadius: 999,
                  fontSize: 13, fontWeight: 600,
                  border: '1.5px solid',
                  background: selectedLanguages.includes(lang) ? 'var(--text-primary)' : 'var(--t-bone-0)',
                  borderColor: selectedLanguages.includes(lang) ? 'var(--text-primary)' : 'var(--border-subtle)',
                  color: selectedLanguages.includes(lang) ? 'var(--t-bone-0)' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Hours per week */}
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'block' }}>
            Hours available per week
          </label>
          <div className="flex gap-2">
            {['2–5 hrs', '5–10 hrs', '10–20 hrs', '20+ hrs'].map((opt) => (
              <button
                key={opt}
                onClick={() => setHoursPerWeek(opt)}
                style={{
                  flex: 1, padding: '12px 8px', borderRadius: 12,
                  fontSize: 12, fontWeight: 600, textAlign: 'center',
                  border: '1.5px solid',
                  background: hoursPerWeek === opt ? 'var(--text-primary)' : 'var(--t-bone-0)',
                  borderColor: hoursPerWeek === opt ? 'var(--text-primary)' : 'var(--border-subtle)',
                  color: hoursPerWeek === opt ? 'var(--t-bone-0)' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'block' }}>
            Why do you want to validate? <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>(optional)</span>
          </label>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Tell us about your experience with language quality..."
            rows={3}
            style={{
              width: '100%', borderRadius: 16,
              border: '1.5px solid var(--border-subtle)', padding: '14px 16px',
              fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
              resize: 'none', outline: 'none',
              fontFamily: 'var(--font-ui)',
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
            background: canSubmit ? 'var(--action-primary-pressed)' : 'var(--border-subtle)',
            color: canSubmit ? 'var(--t-bone-0)' : 'var(--text-muted)',
            fontSize: 16, fontWeight: 700, border: 'none',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            boxShadow: canSubmit ? '0px 4px 16px rgba(196, 98, 45,0.28)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
