import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StarfieldProps {
  density?: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
}

export function Starfield({ density = 100 }: StarfieldProps) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number; duration: number }>>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: density }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);

    // Generate shooting stars
    const newShootingStars = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 30,
      delay: i * 8 + Math.random() * 5
    }));
    setShootingStars(newShootingStars);
  }, [density]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Regular twinkling stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, star.opacity, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 15
          }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-white"
            style={{
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 4px rgba(255, 215, 0, 0.4)"
            }}
            animate={{
              x: [0, 200],
              y: [0, 150]
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 15,
              ease: "easeIn"
            }}
          />
          {/* Tail */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-0.5 origin-left"
            style={{
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent)",
              transform: "rotate(37deg)"
            }}
            animate={{
              x: [0, 200],
              y: [0, 150],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 15,
              ease: "easeIn"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}