import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Starfield } from "../components/Starfield";
import { FloatingParticles } from "../components/FloatingParticles";
import { Button } from "../components/Button";
import { Sparkles } from "lucide-react";

export function IntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] flex items-center justify-center overflow-hidden relative">
      <Starfield density={150} />
      <FloatingParticles />
      
      <div className="relative z-10 text-center px-4">
        {/* Decorative sparkles */}
        <motion.div
          className="absolute top-0 left-1/4 text-[var(--gold)]"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-1/4 text-[var(--pink)]"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
            rotate: [360, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Sparkles size={20} />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink)] to-[var(--gold)] mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          In a universe of billions...
        </motion.h1>

        {/* Animated subtitle with word reveal */}
        <motion.div
          className="text-xl md:text-2xl text-[var(--off-white)] mb-12"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {["There's", "only", "one", "that", "matters."].map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mx-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1 + index * 0.15
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Pulsing glow effect behind button */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255, 107, 157, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="relative"
        >
          <Button onClick={() => navigate("/galaxy")}>
            Enter My Universe
          </Button>
        </motion.div>
      </div>
    </div>
  );
}