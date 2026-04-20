import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, ShieldCheck, Target, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export type Role = 'contributor' | 'validator' | 'quest-creator';

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
    color: '#E06C3A',
    bg: 'linear-gradient(135deg, #FFF0E8 0%, #FFE8D8 100%)',
    borderColor: 'rgba(224,108,58,0.2)',
    path: '/contributor',
    unlocked: true,
  },
  {
    id: 'validator',
    label: 'Validator',
    descriptor: 'Grade & approve audio clips',
    icon: ShieldCheck,
    color: '#2D7A4F',
    bg: 'linear-gradient(135deg, #EAF5EF 0%, #D8EEE3 100%)',
    borderColor: 'rgba(45,122,79,0.2)',
    path: '/validator',
    unlocked: true,
  },
  {
    id: 'quest-creator',
    label: 'Quest Creator',
    descriptor: 'Build AI training datasets at scale',
    icon: Target,
    color: '#5058A4',
    bg: 'linear-gradient(135deg, #EEEFFE 0%, #E0E2FF 100%)',
    borderColor: 'rgba(80,88,164,0.2)',
    path: '/quest-creator',
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
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(10,12,16,0.6)',
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
              background: '#FFFFFF',
              borderRadius: '28px 28px 0 0',
              padding: '12px 20px 40px',
              boxShadow: '0px -8px 40px rgba(0,0,0,0.18)',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: 36, height: 4, borderRadius: 999,
              background: '#DDE2EA', margin: '0 auto 20px',
            }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.3px' }}>
                  Switch Role
                </h2>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 2 }}>
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
                      background: isActive ? role.bg : '#F8F9FA',
                      border: `1.5px solid ${isActive ? role.borderColor : '#EDF0F5'}`,
                      borderRadius: 20,
                      padding: '16px 18px',
                      display: 'flex', alignItems: 'center', gap: 14,
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
                        borderRadius: 20,
                        boxShadow: `inset 0 0 0 1.5px ${role.color}40`,
                        pointerEvents: 'none',
                      }} />
                    )}

                    {/* Icon tile */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: isActive
                        ? `${role.color}18`
                        : isLocked ? '#F0F4F8' : '#ECEEF2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isLocked
                        ? <Lock className="w-5 h-5" style={{ color: '#B0BBCA' }} />
                        : <Icon className="w-5 h-5" style={{ color: isActive ? role.color : '#8896A7' }} strokeWidth={isActive ? 2.2 : 1.75} />
                      }
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p style={{
                          fontSize: 15, fontWeight: 700,
                          color: isLocked ? '#B0BBCA' : '#1C2434',
                        }}>
                          {role.label}
                        </p>
                        {isActive && (
                          <span style={{
                            fontSize: 10, fontWeight: 700,
                            background: role.color, color: '#FFFFFF',
                            padding: '2px 8px', borderRadius: 999,
                          }}>
                            Active
                          </span>
                        )}
                        {isLocked && (
                          <span style={{
                            fontSize: 10, fontWeight: 700,
                            background: '#F0F4F8', color: '#8896A7',
                            padding: '2px 8px', borderRadius: 999,
                          }}>
                            Locked
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: 12, fontWeight: 500,
                        color: isLocked ? '#C0CBDA' : '#8896A7',
                        marginTop: 2, lineHeight: 1.4,
                      }}>
                        {isLocked ? 'Apply from your Contributor profile' : role.descriptor}
                      </p>
                    </div>

                    {/* Right chevron */}
                    {!isActive && !isLocked && (
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#C0CBDA' }} />
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
                marginTop: 16, width: '100%', height: 52, borderRadius: 999,
                background: '#F0F4F8', border: 'none', cursor: 'pointer',
                fontSize: 15, fontWeight: 700, color: '#4A5568',
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
