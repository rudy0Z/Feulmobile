import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BrandSlot } from './ui/BrandSlot';
import { Waveform } from './ui/Waveform';
import { durations } from '../lib/motion';

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
    borderColor: 'var(--state-settled)', // muted sage
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
        <Waveform color="var(--text-on-dark)" opacity={0.04} height={100} />
      </div>

      {/* Logo placeholder */}
      <div className="px-6 pt-16 mb-10">
        <BrandSlot size={36} />
      </div>

      {/* Headline */}
      <div className="px-6 mb-12 relative z-10">
        <h1
          style={{
            fontSize: 'var(--fs-display)',
            fontWeight: 800,
            color: 'var(--text-on-dark)',
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
            transition={{ delay: index * 0.08, duration: durations.enter }}
            onClick={() => navigate(role.path)}
            style={{
              width: '100%',
              background: 'rgba(var(--bone-0-rgb),0.06)',
              borderRadius: 'var(--r-md)',
              border: '1px solid rgba(var(--bone-0-rgb),0.08)',
              borderLeft: `4px solid ${role.borderColor}`,
              padding: 'var(--space-9) var(--space-9)',
              textAlign: 'left',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--fs-subhead)',
                fontWeight: 700,
                color: 'var(--text-on-dark)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {role.title}
            </h3>
            <p
              style={{
                fontSize: 'var(--fs-secondary)',
                fontWeight: 700,
                color: role.borderColor,
                marginBottom: 'var(--space-4)',
              }}
            >
              {role.tagline}
            </p>
            <p
              style={{
                fontSize: 'var(--fs-secondary)',
                fontWeight: 400,
                color: 'rgba(var(--bone-0-rgb),0.55)',
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
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.35)' }}>
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