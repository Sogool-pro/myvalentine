import { motion } from "motion/react";
import { Starfield } from "../components/Starfield";
import { FloatingParticles } from "../components/FloatingParticles";
import { Heart } from "lucide-react";
import { Button } from "../components/Button";

export function FinalScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] flex items-center justify-center overflow-hidden relative">
      <Starfield density={200} />
      <FloatingParticles />
      
      <div className="relative z-10 text-center px-4">
        {/* Animated heart with stars forming it */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart
              size={120}
              className="text-[var(--pink)] fill-[var(--pink)]"
              style={{
                filter: "drop-shadow(0 0 40px rgba(255, 107, 157, 0.8))"
              }}
            />
            
            {/* Orbiting particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[var(--gold)]"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i / 12) * Math.PI * 2) * 80],
                  y: [0, Math.sin((i / 12) * Math.PI * 2) * 80],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink)] via-[var(--pink-light)] to-[var(--gold)] mb-6"
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontWeight: 300,
              filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.4))'
            }}
          >
            Everything in my universe
          </h1>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--pink)] mb-8"
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontWeight: 300,
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
            }}
          >
            orbits you.
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-[var(--off-white)] mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          You are the center of my world, the light in my darkness, and the reason my universe exists.
          Every moment with you is a constellation of joy, love, and infinite possibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Button onClick={() => window.location.reload()}>
            Happy Valentine's Day ❤️
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-[var(--pink-light)] mt-8"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Forever yours
        </motion.p>
      </div>
    </div>
  );
}