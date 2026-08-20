import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { signIn } from '../lib/session';

/**
 * Screen 1 = product + auth, in one light screen (§ Pass 1).
 * One sentence, one number, three stubbed sign-in methods → Home-first.
 * The 3 marketing slides + the navy /first-earning hook are collapsed away.
 */
export function Onboarding() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);

  const handleAuth = (method: 'google' | 'email' | 'phone') => {
    if (busy) return;
    setBusy(method);
    signIn(method);
    // Stubbed auth "resolves", then Home-first — no funnel.
    setTimeout(() => navigate('/contributor'), 420);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          'linear-gradient(175deg, var(--accent-50) 0%, color-mix(in oklch, var(--accent-100) 45%, white) 42%, var(--background) 100%)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Product */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center"
          style={{ maxWidth: 360 }}
        >
          <div className="mb-10 w-full" style={{ maxWidth: 260 }}>
            <Waveform color="var(--accent-primary)" opacity={1} height={64} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 34,
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Record your voice.<br />Get paid in rupees.
          </h1>

          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 300,
            }}
          >
            Contributors earn <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary-deep)' }}>₹10–220</span> per quest.
            Cash lands in your wallet after review.
          </p>
        </motion.div>
      </div>

      {/* Auth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="px-6 pb-10 pt-2"
        style={{ background: 'linear-gradient(to top, var(--background) 60%, transparent)' }}
      >
        {/* Google (primary) */}
        <button
          onClick={() => handleAuth('google')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: '#FFFFFF',
            fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            opacity: busy && busy !== 'google' ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          <GoogleG />
          {busy === 'google' ? 'Signing in…' : 'Continue with Google'}
        </button>

        {/* Email / Phone (secondary, muted) */}
        <div className="flex gap-3 mt-3">
          {([
            { id: 'email', label: 'Email', Icon: Mail },
            { id: 'phone', label: 'Phone', Icon: Phone },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => handleAuth(id)}
              style={{
                flex: 1, height: 52, borderRadius: 999,
                background: 'var(--surface)', color: 'var(--text-secondary)',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                border: '1.5px solid var(--card-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: busy && busy !== id ? 0.5 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <Icon style={{ width: 16, height: 16 }} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
          New here or returning — same button. We'll set you up in seconds.
        </p>
      </motion.div>
    </div>
  );
}

function GoogleG() {
  return (
    <span
      style={{
        width: 20, height: 20, borderRadius: '50%', background: '#FFFFFF',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800,
        color: 'var(--accent-primary-deep)',
      }}
    >
      G
    </span>
  );
}
