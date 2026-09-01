import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, ClipboardCheck, Wallet, User, Repeat2 } from 'lucide-react';
import { motion } from 'motion/react';
import { RoleSwitcher } from '../ui/RoleSwitcher';

const navItems = [
  { path: '/validator',          label: 'Home',    icon: Home           },
  { path: '/validator/tasks',    label: 'Tasks',   icon: ClipboardCheck },
  { path: '/validator/wallet',   label: 'Wallet',  icon: Wallet         },
  { path: '/validator/profile',  label: 'Profile', icon: User           },
];

export function ValidatorApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/validator') return location.pathname === '/validator';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="theme-verdigris min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'var(--surface-raised)',
          borderTop: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
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
                      layoutId="validator-nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'color-mix(in oklch, var(--accent-primary) 14%, transparent)',
                        borderRadius: 999,
                      }}
                    />
                  )}
                  <Icon
                    style={{ color: active ? 'var(--accent-primary)' : 'var(--text-muted)', position: 'relative', zIndex: 1 }}
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
