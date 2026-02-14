import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  startY: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 100 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 2 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(255, 107, 157, 0.8), rgba(255, 215, 0, 0.4))`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 107, 157, 0.5)`
          }}
          initial={{ y: `${particle.startY}vh`, opacity: 0 }}
          animate={{
            y: `-${20 + Math.random() * 10}vh`,
            opacity: [0, 0.8, 0],
            x: `${Math.sin(particle.id) * 50}px`
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
