import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Flag, X, Check, Trash2, AlertCircle } from 'lucide-react';

interface BinaryFlagProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  onFlag: (tag: string) => void;
  gradeOptions: { id: number; label: string; color: string }[];
}

const TAGS = [
  'Wrong Language', 'AI Generated', 'Fraud Attempt', 'Needs Context', 'Ambiguous Quality'
];

export function BinaryFlag({ selectedGrade, onGrade, onFlag, gradeOptions }: BinaryFlagProps) {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="w-full">
      <div className="flex gap-3 mb-4 h-20">
        <button
          onClick={() => onGrade(1)} // Mapping Reject to 1
          style={{
            flex: 1, borderRadius: 24,
            background: selectedGrade === 1 ? '#C0392B' : '#FDE8E8',
            color: selectedGrade === 1 ? '#FFFFFF' : '#C0392B',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selectedGrade === 1 ? '0px 8px 16px rgba(192,57,43,0.3)' : 'none',
          }}
        >
          <Trash2 className="w-6 h-6 mb-1" />
          <span style={{ fontSize: 16, fontWeight: 800 }}>Reject</span>
        </button>

        <button
          onClick={() => onGrade(5)} // Mapping Accept to 5
          style={{
            flex: 1, borderRadius: 24,
            background: selectedGrade === 5 ? '#2D7A4F' : '#ECFDF5',
            color: selectedGrade === 5 ? '#FFFFFF' : '#2D7A4F',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selectedGrade === 5 ? '0px 8px 16px rgba(45,122,79,0.3)' : 'none',
          }}
        >
          <Check className="w-6 h-6 mb-1" />
          <span style={{ fontSize: 16, fontWeight: 800 }}>Accept</span>
        </button>
      </div>

      <button
        onClick={() => setShowTags(true)}
        style={{
          width: '100%', padding: '14px', borderRadius: 999,
          background: 'transparent',
          border: '2px dashed #CBD5E0',
          color: '#8896A7', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        <Flag className="w-4 h-4" />
        Flag for Senior Review
      </button>

      <AnimatePresence>
        {showTags && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-2xl bg-white border border-[#E8EDF3] shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>Select Reason</span>
              <button onClick={() => setShowTags(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X className="w-4 h-4" style={{ color: '#8896A7' }} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onFlag(tag)}
                  style={{
                    padding: '8px 16px', borderRadius: 999,
                    background: '#F8F9FA', border: '1px solid #E8EDF3',
                    fontSize: 12, fontWeight: 600, color: '#4A5568',
                    cursor: 'pointer', transition: 'all 0.1s',
                  }}
                  className="hover:border-orange-200 hover:bg-orange-50 active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
