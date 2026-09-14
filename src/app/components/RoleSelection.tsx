import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';

const roles = [
  {
    id: 'contributor',
    title: 'Contributor',
    tagline: 'Record & Earn Cash',
    description: 'Share your voice to train AI models. Get paid per clip in INR.',
    path: '/contributor',
    borderColor: 'var(--action-primary)',
  },
  {
    id: 'validator',
    title: 'Validator',
    tagline: 'Review & Grade Quality',
    description: 'Ensure dataset quality by grading audio submissions. Earn per batch.',
    path: '/validator',
    borderColor: 'var(--t-verdigris-500)', // muted sage
  },
];

export function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--surface-studio)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Waveform background texture */}
      <div className="absolute top-24 left-0 right-0 pointer-events-none">
        <Waveform color="var(--t-bone-0)" opacity={0.04} height={100} />
      </div>

      {/* Logo placeholder */}
      <div className="px-6 pt-16 mb-10">
        <FeulLogo variant="light" />
      </div>

      {/* Headline */}
      <div className="px-6 mb-12 relative z-10">
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: 'var(--t-bone-0)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            textAlign: 'center',
          }}
        >
          How will you
          <br />
          shape AI?
        </h1>
      </div>

      {/* Role Cards */}
      <div className="px-6 space-y-3 mb-8 relative z-10">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onClick={() => navigate(role.path)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: `4px solid ${role.borderColor}`,
              padding: '20px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--t-bone-0)',
                marginBottom: 4,
              }}
            >
              {role.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: role.borderColor,
                marginBottom: 8,
              }}
            >
              {role.tagline}
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.55,
              }}
            >
              {role.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-10 text-center relative z-10">
        <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
          Already have an account?{' '}
          <button
            style={{
              color: 'var(--action-primary)',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}