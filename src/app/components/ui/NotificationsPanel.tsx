import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, AlertCircle, CheckCircle2, Zap, Wallet,
  ShieldCheck, Mic, Bell, ArrowRight,
} from 'lucide-react';
import { durations } from '../../lib/motion';
import { IconButton } from './Primitives';

type NotifType =
  | 'rejected'
  | 'approved'
  | 'xp_level'
  | 'payout'
  | 'validator_approved'
  | 'quest_new'
  | 'campaign_alert';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  group: 'today' | 'yesterday' | 'earlier';
  unread: boolean;
  actionLabel?: string;
  actionPath?: string;
}

const allNotifications: Notification[] = [
  {
    id: 'n1', type: 'rejected', group: 'today', unread: true,
    title: 'Recording Rejected',
    body: '"Conversational Dialogue" — Background noise detected.',
    time: '9:45 AM',
    actionLabel: 'Re-record now',
  },
  {
    id: 'n2', type: 'approved', group: 'today', unread: true,
    title: '₹15 Approved & Credited',
    body: '"Morning News Reading" passed quality review.',
    time: '9:30 AM',
  },
  {
    id: 'n3', type: 'xp_level', group: 'today', unread: true,
    title: 'You are now a Trusted Contributor',
    body: 'Unlocked higher-paying campaigns & faster reviews.',
    time: '8:00 AM',
    actionLabel: 'View rewards',
  },
  {
    id: 'n4', type: 'quest_new', group: 'today', unread: false,
    title: 'New job: Marathi Reviews',
    body: '₹25 · 10 clips · Only 5 slots left. Expiring soon.',
    time: '7:15 AM',
    actionLabel: 'Start now',
  },
  {
    id: 'n5', type: 'payout', group: 'yesterday', unread: false,
    title: 'Payout Sent — ₹250',
    body: 'Transferred to your UPI ID ending in @okaxis.',
    time: 'Mon',
  },
  {
    id: 'n6', type: 'validator_approved', group: 'yesterday', unread: false,
    title: 'Validator Status Approved',
    body: 'Welcome to the Validator program. Start grading batches now.',
    time: 'Mon',
    actionLabel: 'Open Validator',
  },
  {
    id: 'n7', type: 'approved', group: 'earlier', unread: false,
    title: '₹30 Approved & Credited',
    body: '"Tech Support Dialogue" — 96% accuracy score.',
    time: 'Sun',
  },
  {
    id: 'n8', type: 'quest_new', group: 'earlier', unread: false,
    title: 'Bonus Active: +20% on all jobs',
    body: 'Limited-time earnings boost. Complete jobs before it expires.',
    time: 'Sat',
  },
];

const notifConfig: Record<NotifType, {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  dot: string;
}> = {
  rejected:           { icon: AlertCircle,      iconColor: 'var(--color-error)', iconBg: 'var(--state-failed-container)', dot: 'var(--color-error)' },
  approved:           { icon: CheckCircle2,     iconColor: 'var(--color-success)', iconBg: 'var(--state-settled-container)', dot: 'var(--color-success)' },
  xp_level:          { icon: Zap,              iconColor: 'var(--money-pending)', iconBg: 'var(--state-pending-container)', dot: 'var(--state-pending)' },
  payout:             { icon: Wallet,           iconColor: 'var(--text-secondary)', iconBg: 'var(--surface-sunken)', dot: 'var(--text-muted)' },
  validator_approved: { icon: ShieldCheck,      iconColor: 'var(--color-success)', iconBg: 'var(--state-settled-container)', dot: 'var(--color-success)' },
  quest_new:          { icon: Mic,              iconColor: 'var(--action-primary)', iconBg: 'var(--action-primary-soft)', dot: 'var(--action-primary)' },
  campaign_alert:     { icon: AlertCircle,      iconColor: 'var(--money-pending)', iconBg: 'var(--state-pending-container)', dot: 'var(--state-pending)' },
};

const groupLabels: Record<string, string> = {
  today:     'Today',
  yesterday: 'Yesterday',
  earlier:   'Earlier',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: Props) {
  const [notifs, setNotifs] = useState(allNotifications);

  const unreadCount = notifs.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const groups: Array<'today' | 'yesterday' | 'earlier'> = ['today', 'yesterday', 'earlier'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="notif-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.base }}
            onClick={onClose}
           style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(var(--carbon-rgb),0.55)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel — slides up as a tall sheet */}
          <motion.div
            key="notif-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
           style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              zIndex: 101,
              height: '88%',
              background: 'var(--surface-ground)',
              borderRadius: 'var(--sheet-top) var(--sheet-top) 0 0',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0px -8px 40px rgba(var(--scrim-rgb),0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: 36, height: 4, borderRadius: 'var(--r-full)',
              background: 'var(--border-subtle)', margin: '12px auto 0', flexShrink: 0,
            }} />

            {/* Header */}
            <div
             style={{
                padding: 'var(--space-8) var(--space-9) var(--space-7)',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--surface-raised)',
                flexShrink: 0,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div style={{ position: 'relative' }}>
                    <Bell className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                    {unreadCount > 0 && (
                      <span style={{
                        position: 'absolute', top: -5, right: -6,
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'var(--action-primary)', border: '2px solid var(--text-on-dark)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 'var(--fs-caption)', fontWeight: 800, color: 'var(--text-on-dark)',
                      }}>
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                    Notifications
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                     style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--action-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  )}
                  <IconButton label="Close notifications" onClick={onClose} variant="surface">
        <X style={{ color: 'var(--text-secondary)' }} />
      </IconButton>
                </div>
              </div>
            </div>

            {/* Scrollable list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0 32px' }}>
              {groups.map((group) => {
                const items = notifs.filter(n => n.group === group);
                if (!items.length) return null;

                return (
                  <div key={group}>
                    {/* Group label */}
                    <div style={{ padding: '16px 20px 8px' }}>
                      <p style={{
                        fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-muted)',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        {groupLabels[group]}
                      </p>
                    </div>

                    {/* Cards */}
                    <div className="px-4 space-y-2">
                      {items.map((notif, i) => {
                        const cfg = notifConfig[notif.type];
                        const Icon = cfg.icon;

                        return (
                          <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: durations.base, delay: i * 0.04 }}
                            onClick={() => markRead(notif.id)}
                           style={{
                              background: 'var(--surface-raised)',
                              borderRadius: 'var(--r-md)',
                              padding: 'var(--space-7) var(--space-8)',
                              border: notif.unread
                                ? `1.5px solid ${cfg.dot}30`
                                : '1.5px solid var(--border-subtle)',
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Unread tint bar */}
                            {notif.unread && (
                              <div style={{
                                position: 'absolute', top: 0, left: 0, bottom: 0,
                                width: 3, background: cfg.dot, borderRadius: 'var(--r-md) 0 0 var(--r-md)',
                              }} />
                            )}

                            <div className="flex items-start gap-3" style={{ paddingLeft: notif.unread ? 4 : 0 }}>
                              {/* Icon */}
                              <div style={{
                                width: 40, height: 40, borderRadius: 'var(--r-sm)', flexShrink: 0,
                                background: cfg.iconBg,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <Icon className="w-4.5 h-4.5" style={{ color: cfg.iconColor, width: 18, height: 18 }} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p style={{
                                    fontSize: 'var(--fs-secondary)', fontWeight: notif.unread ? 700 : 600,
                                    color: 'var(--text-primary)', lineHeight: 1.35,
                                  }}>
                                    {notif.title}
                                  </p>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {notif.unread && (
                                      <div style={{
                                        width: 7, height: 7, borderRadius: '50%',
                                        background: cfg.dot, flexShrink: 0,
                                      }} />
                                    )}
                                    <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                                      {notif.time}
                                    </p>
                                  </div>
                                </div>

                                <p style={{
                                  fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)',
                                  lineHeight: 1.5, marginTop: 'var(--space-1)',
                                }}>
                                  {notif.body}
                                </p>

                                {notif.actionLabel && (
                                  <button
                                   style={{
                                      marginTop: 'var(--space-4)',
                                      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                                      fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--action-primary)',
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      padding: '0',
                                    }}
                                  >
                                    {notif.actionLabel}
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Empty state */}
              {notifs.length === 0 && (
                <div className="flex flex-col items-center justify-center" style={{ paddingTop: 'var(--space-15)'}}>
                  <Bell className="w-12 h-12" style={{ color: 'var(--border-subtle)', marginBottom: 'var(--space-8)'}} />
                  <p style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)'}}>All caught up</p>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}>No new notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Bell icon with badge — for use in headers */
interface BellButtonProps {
  unreadCount: number;
  onClick: () => void;
}
export function BellButton({ unreadCount, onClick }: BellButtonProps) {
  return (
    <IconButton label="Notifications" onClick={onClick} variant="surface" style={{ position: 'relative' }}>
        <Bell style={{ color: 'var(--text-primary)' }} />
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute', top: -2, right: -2,
          minWidth: 16, height: 16, borderRadius: 'var(--r-full)',
          background: 'var(--action-primary)', border: '2px solid var(--surface-ground)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--fs-caption)', fontWeight: 800, color: 'var(--text-on-dark)', padding: '0 var(--space-1)',
        }}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
      </IconButton>
  );
}
