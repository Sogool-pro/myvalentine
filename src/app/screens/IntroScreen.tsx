import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Starfield } from "../components/Starfield";
import { FloatingParticles } from "../components/FloatingParticles";
import { MusicToggle } from "../components/MusicToggle";
import { Button } from "../components/Button";

export function IntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] flex items-center justify-center overflow-hidden relative">
      <Starfield density={150} />
      <FloatingParticles />
      <MusicToggle />
      
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink)] to-[var(--gold)] mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          In a universe of billions…
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[var(--off-white)] mb-12"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          There's only one that matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <Button onClick={() => navigate("/galaxy")}>
            Enter My Universe
          </Button>
        </motion.div>
      </div>
    </div>
  );
}