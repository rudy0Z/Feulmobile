import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { BarChart3, FolderKanban, UserCircle, Repeat2 } from 'lucide-react';
import { motion } from 'motion/react';
import { RoleSwitcher } from '../ui/RoleSwitcher';

const navItems = [
  { path: '/quest-creator',           label: 'Dashboard', icon: BarChart3    },
  { path: '/quest-creator/campaigns', label: 'Campaigns', icon: FolderKanban },
  { path: '/quest-creator/profile',   label: 'Profile',   icon: UserCircle   },
];

export function QuestCreatorApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/quest-creator') return location.pathname === '/quest-creator';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.94)',
          borderTop: '1px solid rgba(232,237,243,0.8)',
          boxShadow: '0px -4px 20px rgba(28,36,52,0.07)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto" style={{ height: 64 }}>
          {navItems.map((item) => {
            const Icon   = item.icon;
            const active = isActive(item.path);
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5"
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <div className="relative flex items-center justify-center" style={{ width: 44, height: 28 }}>
                  {active && (
                    <motion.div
                      layoutId="qc-nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'color-mix(in oklch, var(--accent-primary) 14%, transparent)',
                        borderRadius: 999,
                      }}
                    />
                  )}
                  <Icon
                    style={{ color: active ? 'var(--accent-primary)' : '#8896A7', position: 'relative', zIndex: 1 }}
                    className="w-[22px] h-[22px]"
                    strokeWidth={active ? 2.4 : 1.75}
                    fill={active ? 'color-mix(in oklch, var(--accent-primary) 18%, transparent)' : 'none'}
                  />
                </div>
                {active && (
                  <motion.span
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px]"
                    style={{ color: 'var(--accent-primary)', fontWeight: 700 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
