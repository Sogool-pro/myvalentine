import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle() {
  const bgRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = bgRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
      return;
    }

    const startPlayback = async () => {
      try {
        await audio.play();
      } catch {
        setIsMuted(true);
      }
    };

    void startPlayback();
  }, [isMuted]);

  useEffect(() => {
    const audio = bgRef.current;
    if (!audio) return;
    audio.volume = 0.35;
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setIsMuted((prev) => !prev)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[var(--deep-navy)]/80 backdrop-blur-md border border-[var(--pink)]/30 flex items-center justify-center text-[var(--pink)] hover:text-[var(--gold)] transition-colors shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        title={isMuted ? "Enable background music" : "Disable background music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
      <audio
        ref={bgRef}
        loop
        preload="auto"
        playsInline
        src={`${import.meta.env.BASE_URL}audio/background.mp3`}
      />
    </>
  );
}
