import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface StarProps {
  x: number;
  y: number;
  size?: "small" | "medium" | "large";
  label?: string;
  isCenter?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function Star({ x, y, size = "medium", label, isCenter = false, onClick, delay = 0 }: StarProps) {
  const sizeMap = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-6 h-6"
  };

  const glowSize = {
    small: "0 0 10px rgba(255, 215, 0, 0.5)",
    medium: "0 0 15px rgba(255, 215, 0, 0.6)",
    large: "0 0 30px rgba(255, 107, 157, 0.8)"
  };

  if (isCenter) {
    return (
      <motion.div
        className="absolute"
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay }}
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--gold)]"
            style={{ boxShadow: "0 0 60px rgba(255, 107, 157, 0.9)" }}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 60px rgba(255, 107, 157, 0.9)",
                "0 0 80px rgba(255, 215, 0, 0.9)",
                "0 0 60px rgba(255, 107, 157, 0.9)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {label && (
            <motion.p
              className="absolute -bottom-8 text-[var(--off-white)] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
            >
              {label}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1.3 }}
      onClick={onClick}
    >
      <div className="relative">
        <motion.div
          className={`${sizeMap[size]} rounded-full bg-[var(--gold)]`}
          style={{ boxShadow: glowSize[size] }}
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
        />
        <Sparkles 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--pink)] pointer-events-none"
          size={16}
        />
        {/* Touch target for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 -m-6 md:hidden" />
      </div>
    </motion.div>
  );
}