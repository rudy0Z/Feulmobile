import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface UndoToastProps {
  gradeLabel: string;
  onUndo: () => void;
  onDismiss: () => void;
  visible: boolean;
}

export function UndoToast({ gradeLabel, onUndo, onDismiss, visible }: UndoToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[132px] left-0 right-0 px-6 z-[150]"
        >
          <div
            style={{
              background: 'var(--text-primary)',
              borderRadius: 'var(--r-full)',
              padding: 'var(--space-5) var(--space-9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-6)',
              boxShadow: 'var(--e-3)',
              margin: '0 auto',
              width: 'max-content',
            }}
          >
            <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-on-studio)' }}>
              Graded: {gradeLabel}
            </span>
            <div style={{ width: 1, height: 12, background: 'rgba(var(--bone-0-rgb),0.2)' }} />
            <button
              onClick={onUndo}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--action-primary)',
                fontSize: 'var(--fs-secondary)',
                fontWeight: 800,
                cursor: 'pointer',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--r-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Undo
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
