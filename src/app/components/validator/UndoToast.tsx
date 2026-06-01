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
              borderRadius: 999,
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0px 12px 32px rgba(28,36,52,0.25)',
              margin: '0 auto',
              width: 'max-content',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
              Graded: {gradeLabel}
            </span>
            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
            <button
              onClick={onUndo}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 4,
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
