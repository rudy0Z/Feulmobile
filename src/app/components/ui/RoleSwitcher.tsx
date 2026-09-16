import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { durations } from '../../lib/motion';

export type Role = 'contributor' | 'validator';

interface RoleConfig {
  id: Role;
  label: string;
  descriptor: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  borderColor: string;
  path: string;
  unlocked: boolean;
}

const roles: RoleConfig[] = [
  {
    id: 'contributor',
    label: 'Contributor',
    descriptor: 'Earn by recording your voice for AI',
    icon: Mic,
    color: 'var(--action-primary)',
    bg: 'linear-gradient(135deg, var(--action-primary-soft) 0%, var(--t-terracotta-100) 100%)',
    borderColor: 'rgba(var(--terracotta-500-rgb),0.2)',
    path: '/contributor',
    unlocked: true,
  },
  {
    id: 'validator',
    label: 'Validator',
    descriptor: 'Grade & approve audio clips',
    icon: ShieldCheck,
    color: 'var(--color-success)',
    bg: 'linear-gradient(135deg, var(--state-settled-container) 0%, var(--state-settled-container) 100%)',
    borderColor: 'rgba(var(--verdigris-rgb),0.2)',
    path: '/validator',
    unlocked: true,
  },
];

interface Props {
  isOpen: boolean;
  currentRole: Role;
  onClose: () => void;
}

export function RoleSwitcher({ isOpen, currentRole, onClose }: Props) {
  const navigate = useNavigate();

  const handleSwitch = (role: RoleConfig) => {
    if (!role.unlocked || role.id === currentRole) return;
    onClose();
    setTimeout(() => navigate(role.path), 180);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.base }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(var(--carbon-rgb),0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              zIndex: 101,
              background: 'var(--surface-raised)',
              borderRadius: 'var(--sheet-top) var(--sheet-top) 0 0',
              padding: 'var(--space-6) var(--space-9) var(--space-13)',
              boxShadow: '0px -8px 40px rgba(var(--scrim-rgb),0.18)',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: 36, height: 4, borderRadius: 'var(--r-full)',
              background: 'var(--border-subtle)', margin: '0 auto 20px',
            }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontSize: 'var(--fs-section)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Switch Role
                </h2>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-1)'}}>
                  You have access to {roles.filter(r => r.unlocked).length} roles
                </p>
              </div>
            </div>

            {/* Role cards */}
            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = role.id === currentRole;
                const isLocked = !role.unlocked;

                return (
                  <motion.button
                    key={role.id}
                    whileTap={!isActive && !isLocked ? { scale: 0.98 } : undefined}
                    onClick={() => handleSwitch(role)}
                    disabled={isActive || isLocked}
                    style={{
                      width: '100%',
                      background: isActive ? role.bg : 'var(--surface-ground)',
                      border: `1.5px solid ${isActive ? role.borderColor : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--r-md)',
                      padding: 'var(--space-8) var(--space-8)',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-7)',
                      cursor: isActive || isLocked ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s, border-color 0.15s',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Active glow ring */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        borderRadius: 'var(--r-md)',
                        boxShadow: `inset 0 0 0 1.5px ${role.color}40`,
                        pointerEvents: 'none',
                      }} />
                    )}

                    {/* Icon tile */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 'var(--r-md)', flexShrink: 0,
                      background: isActive
                        ? `${role.color}18`
                        : isLocked ? 'var(--t-bone-100)' : 'var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isLocked
                        ? <Lock className="w-5 h-5" style={{ color: 'var(--text-faint)' }} />
                        : <Icon className="w-5 h-5" style={{ color: isActive ? role.color : 'var(--text-muted)' }} strokeWidth={isActive ? 2.2 : 1.75} />
                      }
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p style={{
                          fontSize: 'var(--fs-body)', fontWeight: 700,
                          color: isLocked ? 'var(--text-faint)' : 'var(--text-primary)',
                        }}>
                          {role.label}
                        </p>
                        {isActive && (
                          <span style={{
                            fontSize: 'var(--fs-caption)', fontWeight: 700,
                            background: role.color, color: 'var(--text-on-dark)',
                            padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--r-full)',
                          }}>
                            Active
                          </span>
                        )}
                        {isLocked && (
                          <span style={{
                            fontSize: 'var(--fs-caption)', fontWeight: 700,
                            background: 'var(--surface-sunken)', color: 'var(--text-muted)',
                            padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--r-full)',
                          }}>
                            Locked
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: 'var(--fs-secondary)', fontWeight: 500,
                        color: isLocked ? 'var(--text-faint)' : 'var(--text-muted)',
                        marginTop: 'var(--space-1)', lineHeight: 1.4,
                      }}>
                        {isLocked ? 'Apply from your Contributor profile' : role.descriptor}
                      </p>
                    </div>

                    {/* Right chevron */}
                    {!isActive && !isLocked && (
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                    )}
                    {isActive && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: role.color }} />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Cancel */}
            <button
              onClick={onClose}
              style={{
                marginTop: 'var(--space-8)', width: '100%', height: 52, borderRadius: 'var(--r-full)',
                background: 'var(--surface-sunken)', border: 'none', cursor: 'pointer',
                fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-secondary)',
              }}
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
