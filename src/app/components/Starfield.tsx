import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StarfieldProps {
  density?: number;
}

export function Starfield({ density = 100 }: StarfieldProps) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number; duration: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: density }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, [density]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
    </div>
  );
}
