import { motion } from "motion/react";
import { Starfield } from "../components/Starfield";
import { FloatingParticles } from "../components/FloatingParticles";
import { Heart } from "lucide-react";
import { Button } from "../components/Button";
import { BackButton } from "../components/BackButton";

export function FinalScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] flex items-center justify-center overflow-hidden relative">
      <Starfield density={200} />
      <FloatingParticles />
      <BackButton to="/galaxy" />

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
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: "200px",
                height: "200px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Heart
              size={120}
              className="text-[var(--pink)] fill-[var(--pink)] relative z-10"
              style={{
                filter: "drop-shadow(0 0 40px rgba(255, 107, 157, 0.8))",
              }}
            />

            {/* Orbiting particles with trails */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos(angle) * 90],
                    y: [0, Math.sin(angle) * 90],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-[var(--gold)]"
                    style={{
                      boxShadow: "0 0 10px var(--gold)",
                      filter: "blur(0.5px)",
                    }}
                  />
                  {/* Particle trail */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: "20px",
                      height: "2px",
                      background:
                        "linear-gradient(to right, var(--gold), transparent)",
                      transformOrigin: "left center",
                      transform: `rotate(${(angle * 180) / Math.PI + 180}deg)`,
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Heart pulse rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "120px",
                  height: "120px",
                  border: "2px solid var(--pink)",
                  borderRadius: "50%",
                }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
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
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              filter: "drop-shadow(0 0 20px rgba(255, 107, 157, 0.4))",
            }}
          >
            Everything in my universe
          </h1>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--pink)] mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))",
            }}
          >
            orbits you.
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-[var(--off-white)] mb-12 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Mon cœur, tu es mon âme sœur. You are my world, my everything, the
          light in my darkest hours, the one I couldn't live without, ma chérie,
          every moment with you brings another star, even a constellation of
          joy, hope, memories, love, and infinite possibilities, I love you,
          mahal kita, je aime toi my pretty babyyy!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Button onClick={() => window.location.reload()}>
            Happy Valentine's Day
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-[var(--pink-light)] mt-8"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
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
