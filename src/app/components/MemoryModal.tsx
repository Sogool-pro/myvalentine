import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { useEffect } from "react";

interface Memory {
  id: number;
  title: string;
  description: string;
  image?: string;
  hasAudio?: boolean;
}

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryModal({ memory, onClose }: MemoryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (memory) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [memory, onClose]);

  return (
    <AnimatePresence>
      {memory && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative bg-[var(--deep-navy)]/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--pink)]/30 shadow-[0_0_60px_rgba(255,107,157,0.3)]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[var(--off-white)] hover:text-[var(--pink)] transition-colors"
              >
                <X size={24} />
              </button>

              <motion.h2
                className="text-3xl mb-4 text-[var(--pink)]"
                style={{ fontFamily: 'var(--font-serif)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {memory.title}
              </motion.h2>

              {memory.image && (
                <motion.div
                  className="w-full h-48 bg-[var(--navy-light)] rounded-2xl mb-4 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-[var(--pink)]/30">
                    [Memory Photo]
                  </div>
                </motion.div>
              )}

              <motion.p
                className="text-[var(--off-white)] leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {memory.description}
              </motion.p>

              {memory.hasAudio && (
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--pink)]/20 border border-[var(--pink)]/50 text-[var(--pink)] hover:bg-[var(--pink)]/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} />
                  <span>Play Audio Message</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}