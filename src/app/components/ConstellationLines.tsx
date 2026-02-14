import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Memory {
  id: number;
  x: number;
  y: number;
}

interface ConstellationLinesProps {
  memories: Memory[];
  viewedMemories: Set<number>;
  centerX: number;
  centerY: number;
}

export function ConstellationLines({ memories, viewedMemories, centerX, centerY }: ConstellationLinesProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.constellation-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!dimensions.width) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none constellation-svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="var(--pink)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {memories.map((memory) => {
        if (!viewedMemories.has(memory.id)) return null;

        const x1 = (centerX / 100) * dimensions.width;
        const y1 = (centerY / 100) * dimensions.height;
        const x2 = (memory.x / 100) * dimensions.width;
        const y2 = (memory.y / 100) * dimensions.height;

        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        return (
          <motion.line
            key={memory.id}
            x1={x1}
            y1={y1}
            x2={x1}
            y2={y1}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ x2: x1, y2: y1 }}
            animate={{ x2, y2 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2
            }}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="8"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.line>
        );
      })}

      {/* Particles traveling along the lines */}
      {memories.map((memory) => {
        if (!viewedMemories.has(memory.id)) return null;

        const x1 = (centerX / 100) * dimensions.width;
        const y1 = (centerY / 100) * dimensions.height;
        const x2 = (memory.x / 100) * dimensions.width;
        const y2 = (memory.y / 100) * dimensions.height;

        return (
          <motion.circle
            key={`particle-${memory.id}`}
            r="2"
            fill="var(--pink)"
            style={{ filter: "drop-shadow(0 0 4px var(--pink))" }}
            initial={{ cx: x1, cy: y1 }}
            animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: memory.id * 0.5
            }}
          />
        );
      })}
    </svg>
  );
}
