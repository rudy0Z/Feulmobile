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
    waveColor: '#E06C3A',
  },
  {
    title: "Share Your Voice",
    subtitle: "Train the future",
    description:
      "Record short audio clips to help train cutting-edge AI models. Every contribution makes a difference.",
    waveColor: '#E06C3A',
  },
  {
    title: "Earn ₹ Instantly",
    subtitle: "Your voice = real cash",
    description:
      "Complete quests to earn cash in INR — credited directly to your wallet. Gain XP to unlock multipliers and perks.",
    waveColor: '#E06C3A',
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
      style={{ background: 'linear-gradient(170deg, #FAF6F0 0%, #F5EFE6 100%)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Skip */}
      <div className="absolute top-14 right-6 z-10">
        <button
          onClick={handleSkip}
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#8896A7',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

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
                color: '#1C2434',
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
                color: '#E06C3A',
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
                color: '#4A5568',
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
        style={{ background: 'linear-gradient(to top, #FAF6F0 70%, transparent)' }}
      >
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              style={{
                height: 6,
                borderRadius: 999,
                background: index === currentStep ? '#E06C3A' : 'rgba(224,108,58,0.2)',
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
            background: 'linear-gradient(160deg, #E8743F 0%, #C4622D 100%)',
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
      </div>
    </div>
  );
}