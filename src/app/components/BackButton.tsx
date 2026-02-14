import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 left-6 z-50 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[var(--off-white)]/20 backdrop-blur-md border border-[var(--off-white)]/30 whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.2 }}
        >
          <span 
            className="text-[var(--off-white)] text-xs"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          >
            Go back
          </span>
        </motion.div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--off-white)]/10 backdrop-blur-md border border-[var(--off-white)]/20 hover:bg-[var(--off-white)]/15 transition-all duration-300 shadow-lg">
          <motion.div
            animate={{ x: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft 
              className="text-[var(--pink-light)] group-hover:text-[var(--pink)] transition-colors duration-300" 
              size={20} 
            />
          </motion.div>
          <span 
            className="text-[var(--off-white)] group-hover:text-[var(--pink-light)] transition-colors duration-300 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          >
            Back
          </span>
        </div>
      </div>
    </motion.button>
  );
}