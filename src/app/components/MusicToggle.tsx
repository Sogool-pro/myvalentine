import { useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[var(--deep-navy)]/80 backdrop-blur-md border border-[var(--pink)]/30 flex items-center justify-center text-[var(--pink)] hover:text-[var(--gold)] transition-colors shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      title={isMuted ? "Enable background music" : "Disable background music"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      {/* Background music would be implemented here with an audio element */}
    </motion.button>
  );
}
