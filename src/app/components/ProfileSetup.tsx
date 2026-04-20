import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { User, Languages, CreditCard, ChevronRight, Check, ArrowLeft, Wallet } from 'lucide-react';

const LANGUAGES = [
  'Hindi', 'English', 'Marathi', 'Tamil', 'Telugu',
  'Bengali', 'Gujarati', 'Kannada', 'Punjabi', 'Malayalam',
  'Odia', 'Assamese',
];

const UPI_SUFFIXES = ['@okaxis', '@oksbi', '@okicici', '@ybl', '@paytm', '@upi'];

const steps = [
  { id: 1, label: 'Your Name',  icon: User       },
  { id: 2, label: 'Languages',  icon: Languages  },
  { id: 3, label: 'Get Paid',   icon: CreditCard },
];

function getInitials(name: string) {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

export function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep]               = useState(1);
  const [name, setName]               = useState('');
  const [nameError, setNameError]     = useState('');
  const [selectedLangs, setLangs]     = useState<string[]>([]);
  const [langError, setLangError]     = useState('');
  const [upiId, setUpiId]             = useState('');
  const [upiError, setUpiError]       = useState('');

  const initials = getInitials(name);

  /* ── helpers ── */
  const toggleLang = (lang: string) => {
    setLangError('');
    setLangs(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const saveAndFinish = (skipUpi = false) => {
    const profile = {
      name: name.trim(),
      initials: getInitials(name),
      languages: selectedLangs,
      upiId: skipUpi ? '' : upiId.trim(),
      setupComplete: true,
      walletBalance: 50,
      upiLinked: !skipUpi && upiId.trim().length > 0,
    };
    localStorage.setItem('feul_profile', JSON.stringify(profile));
    navigate('/contributor');
  };

  /* ── step validators ── */
  const handleStep1Next = () => {
    if (!name.trim() || name.trim().length < 2) {
      setNameError('Please enter your name (at least 2 characters)');
      return;
    }
    setNameError('');
    setStep(2);
  };

  const handleStep2Next = () => {
    if (selectedLangs.length === 0) {
      setLangError('Select at least one language');
      return;
    }
    setLangError('');
    setStep(3);
  };

  const handleStep3Finish = () => {
    if (!upiId.trim()) {
      setUpiError('Enter your UPI ID to receive ₹50');
      return;
    }
    if (!upiId.includes('@')) {
      setUpiError('UPI ID must include @ (e.g. name@upi)');
      return;
    }
    saveAndFinish(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}
    >
      {/* ── Progress header ── */}
      <div
        style={{
          background: '#1A1F2E',
          padding: '48px 24px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Back button */}
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              position: 'absolute', top: 52, left: 24,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.6)' }} />
          </button>
        )}

        {/* Step progress dots */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s) => (
            <div
              key={s.id}
              style={{
                height: 4, borderRadius: 999,
                background: s.id <= step ? '#C4622D' : 'rgba(255,255,255,0.12)',
                flex: 1,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Step label */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(196,98,45,0.18)', borderRadius: 999,
            padding: '5px 14px', marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E06C3A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Step {step} of {steps.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 6 }}>
                  What should<br />we call you?
                </h1>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                  Your name appears on your contributor profile
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 6 }}>
                  Which languages<br />do you speak?
                </h1>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                  We'll match you with quests in your languages
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#C4622D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wallet style={{ width: 20, height: 20, color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#E06C3A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ready to transfer</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>₹50.00</p>
                  </div>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 6 }}>
                  Where should we<br />send your money?
                </h1>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                  Your first earning is waiting — add UPI to receive it
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Step content ── */}
      <div className="flex-1 px-5 pt-6 pb-4 overflow-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1 — Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            >
              {/* Avatar preview */}
              <div className="flex justify-center mb-8">
                <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: initials ? '#C4622D' : '#F0F4F8',
                  border: initials ? '3px solid rgba(196,98,45,0.3)' : '3px dashed #CBD5E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: initials ? '0px 8px 24px rgba(196,98,45,0.25)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  {initials ? (
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>
                      {initials}
                    </span>
                  ) : (
                    <User style={{ width: 28, height: 28, color: '#CBD5E0' }} strokeWidth={1.5} />
                  )}
                </div>
              </div>

              {/* Name input */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setNameError(''); }}
                  placeholder="e.g. Priya Sharma"
                  autoFocus
                  style={{
                    width: '100%', height: 54, borderRadius: 14,
                    border: nameError ? '1.5px solid #C0392B' : '1.5px solid #E8EDF3',
                    background: '#FFFFFF', padding: '0 18px',
                    fontSize: 16, fontWeight: 600, color: '#1C2434',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                />
                {nameError && (
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B', marginTop: 6 }}>{nameError}</p>
                )}
              </div>

              <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 10 }}>
                This is how you'll appear to quest creators. You can update it later.
              </p>
            </motion.div>
          )}

          {/* STEP 2 — Languages */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            >
              <div style={{ marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
                  Tap to select — pick all that apply
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(lang => {
                    const selected = selectedLangs.includes(lang);
                    return (
                      <motion.button
                        key={lang}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => toggleLang(lang)}
                        style={{
                          padding: '10px 18px', borderRadius: 999,
                          fontSize: 14, fontWeight: 600,
                          border: selected ? 'none' : '1.5px solid #E8EDF3',
                          background: selected ? '#C4622D' : '#FFFFFF',
                          color: selected ? '#FFFFFF' : '#4A5568',
                          cursor: 'pointer',
                          boxShadow: selected ? '0px 4px 12px rgba(196,98,45,0.25)' : 'none',
                          transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        {selected && <Check style={{ width: 13, height: 13 }} strokeWidth={2.5} />}
                        {lang}
                      </motion.button>
                    );
                  })}
                </div>
                {langError && (
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B', marginTop: 10 }}>{langError}</p>
                )}
              </div>

              {selectedLangs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 20, padding: '12px 16px', borderRadius: 12,
                    background: '#E6F4EC', border: '1px solid #C5E1D0',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <Check style={{ width: 15, height: 15, color: '#2D7A4F', flexShrink: 0 }} strokeWidth={2.5} />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1A5C35' }}>
                    {selectedLangs.length} language{selectedLangs.length > 1 ? 's' : ''} selected —
                    quests in {selectedLangs.slice(0, 2).join(', ')}{selectedLangs.length > 2 ? ` +${selectedLangs.length - 2} more` : ''} will be prioritised for you
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3 — UPI */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            >
              {/* UPI input */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => { setUpiId(e.target.value); setUpiError(''); }}
                  placeholder="yourname@upi"
                  autoFocus
                  style={{
                    width: '100%', height: 54, borderRadius: 14,
                    border: upiError ? '1.5px solid #C0392B' : '1.5px solid #E8EDF3',
                    background: '#FFFFFF', padding: '0 18px',
                    fontSize: 16, fontWeight: 600, color: '#1C2434',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                />
                {upiError && (
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#C0392B', marginTop: 6 }}>{upiError}</p>
                )}
              </div>

              {/* Common UPI handles */}
              <div className="flex gap-2 flex-wrap mt-3 mb-6">
                {UPI_SUFFIXES.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      const base = upiId.split('@')[0];
                      setUpiId(base + s);
                      setUpiError('');
                    }}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 999,
                      background: '#F0F4F8', color: '#4A5568',
                      border: '1px solid #E8EDF3', cursor: 'pointer',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Payout info */}
              <div
                style={{
                  background: '#FEF7E6', borderRadius: 14, border: '1px solid #F5E4B8',
                  padding: '14px 16px', marginBottom: 16,
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: '#6B4800', lineHeight: 1.55 }}>
                  💳 Payouts are processed every Monday. Minimum withdrawal ₹50.
                  Your ₹50 will be transferred in the next cycle.
                </p>
              </div>

              {/* TDS note */}
              <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', lineHeight: 1.55 }}>
                10% TDS applies on annual earnings above ₹30,000 as per Indian tax law.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom CTAs ── */}
      <div className="px-5 pb-10 pt-2">
        {step === 1 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStep1Next}
            style={{
              width: '100%', height: 58, borderRadius: 999,
              background: name.trim().length >= 2 ? '#C4622D' : '#D4BAB0',
              color: '#FFFFFF', fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: name.trim().length >= 2 ? '0px 6px 24px rgba(196,98,45,0.30)' : 'none',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            Continue
            <ChevronRight style={{ width: 18, height: 18 }} />
          </motion.button>
        )}

        {step === 2 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStep2Next}
            style={{
              width: '100%', height: 58, borderRadius: 999,
              background: selectedLangs.length > 0 ? '#C4622D' : '#D4BAB0',
              color: '#FFFFFF', fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: selectedLangs.length > 0 ? '0px 6px 24px rgba(196,98,45,0.30)' : 'none',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            Continue
            <ChevronRight style={{ width: 18, height: 18 }} />
          </motion.button>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleStep3Finish}
              style={{
                width: '100%', height: 58, borderRadius: 999,
                background: '#C4622D', color: '#FFFFFF',
                fontSize: 16, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                boxShadow: '0px 6px 24px rgba(196,98,45,0.30)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <CreditCard style={{ width: 18, height: 18 }} />
              Set Up My Account
            </motion.button>
            <button
              onClick={() => saveAndFinish(true)}
              style={{
                width: '100%', padding: '15px', background: 'transparent',
                color: '#8896A7', fontSize: 14, fontWeight: 600,
                border: 'none', cursor: 'pointer',
              }}
            >
              Skip for now — I'll add UPI later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
