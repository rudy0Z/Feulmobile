import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Waveform } from './ui/Waveform';

const onboardingSteps = [
  {
    title: "You are the source.",
    subtitle: "Feul is your refinery.",
    description:
      "Your data is the invisible engine behind AI's growth. Feul turns that invisible force into tangible rewards because you built this future.",
    waveColor: 'var(--accent-primary)',
  },
  {
    title: "Share Your Voice",
    subtitle: "Train the future",
    description:
      "Record short audio clips to help train cutting-edge AI models. Every contribution makes a difference.",
    waveColor: 'var(--accent-primary)',
  },
  {
    title: "Earn ₹ Instantly",
    subtitle: "Your voice = real cash",
    description:
      "Complete quests to earn cash in INR — credited directly to your wallet. Build reputation to unlock higher-paying campaigns.",
    waveColor: 'var(--accent-primary)',
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/first-earning');
    }
  };

  const handleSkip = () => {
    navigate('/first-earning');
  };

  const step = onboardingSteps[currentStep];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(170deg, var(--accent-50) 0%, color-mix(in oklch, var(--accent-100) 40%, white) 100%)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md flex flex-col items-center text-center"
          >
            {/* Waveform signature element */}
            <div className="mb-10 w-full" style={{ maxWidth: 280 }}>
              <Waveform color={step.waveColor} opacity={1} height={70} />
            </div>

            {/* Title — 36px weight 800 */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 36,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 10,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {step.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--accent-primary)',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {step.subtitle}
            </p>

            {/* Description */}
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: 300,
                textAlign: 'center',
              }}
            >
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 py-8"
        style={{ background: 'linear-gradient(to top, var(--accent-50) 70%, transparent)' }}
      >
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              style={{
                height: 6,
                borderRadius: 999,
                background: index === currentStep ? 'var(--accent-primary)' : 'var(--accent-200)',
                width: index === currentStep ? 28 : 6,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Full-width 56px orange pill CTA */}
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0px 10px 28px rgba(224,108,58,0.35), inset 0px 1px 0px rgba(255,255,255,0.18)',
          }}
        >
          {currentStep < onboardingSteps.length - 1 ? 'Continue' : 'Get Started'}
        </button>

        {/* Returning user shortcut — explicit, intentional, not a hidden "skip" */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <button
            onClick={handleSkip}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Returning user?{' '}
            <span style={{ color: 'var(--accent-primary-deep)', fontWeight: 700 }}>Sign in</span>
          </button>
        </div>
      </div>
    </div>
  );
}