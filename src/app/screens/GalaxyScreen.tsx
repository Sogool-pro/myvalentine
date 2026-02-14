import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Starfield } from "../components/Starfield";
import { Star } from "../components/Star";
import { MemoryModal } from "../components/MemoryModal";
import { EditableName } from "../components/EditableName";
import { Button } from "../components/Button";

interface Memory {
  id: number;
  title: string;
  description: string;
  image?: string;
  hasAudio?: boolean;
  x: number;
  y: number;
}

/**
 * CUSTOMIZATION GUIDE:
 * 
 * 1. Change the center star label (line 130) to your partner's name
 * 2. Edit the memories array below to add your own personal memories
 * 3. Each memory needs:
 *    - id: unique number
 *    - title: short title for the memory
 *    - description: heartfelt description (2-3 sentences)
 *    - x, y: position on screen (0-100, with 50,50 being center)
 *    - image: optional, set to "placeholder" or remove
 *    - hasAudio: optional, set to true if you want audio button
 * 
 * Feel free to add or remove memories!
 */

// Sample memories - can be customized
const memories: Memory[] = [
  {
    id: 1,
    title: "Our First Date",
    description: "I remember the way you smiled when I nervously ordered the wrong coffee. That moment, I knew you were special. Your laugh made everything feel right.",
    x: 30,
    y: 25,
    hasAudio: true
  },
  {
    id: 2,
    title: "Dancing in the Rain",
    description: "We were supposed to be upset about the ruined picnic, but instead we danced. Your joy is contagious, and that day proved nothing could dampen our spirits when we're together.",
    x: 70,
    y: 30,
    image: "placeholder"
  },
  {
    id: 3,
    title: "Midnight Conversations",
    description: "Those late-night talks where hours felt like minutes. You understand me in ways I never thought possible. Every word, every silence between us feels like home.",
    x: 25,
    y: 65,
    hasAudio: true
  },
  {
    id: 4,
    title: "Your Birthday Surprise",
    description: "The look on your face when you saw what I'd planned. Making you happy is my favorite thing in the world. Your happiness is my universe.",
    x: 75,
    y: 70,
    image: "placeholder"
  },
  {
    id: 5,
    title: "Sunday Mornings",
    description: "Lazy mornings with coffee and your head on my shoulder. These simple moments mean everything. There's nowhere else I'd rather be.",
    x: 85,
    y: 50,
  },
  {
    id: 6,
    title: "That Inside Joke",
    description: "The one that makes us burst out laughing in public. Our own little world that only we understand. I love having secrets that are just ours.",
    x: 15,
    y: 45,
  }
];

export function GalaxyScreen() {
  const navigate = useNavigate();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewedMemories, setViewedMemories] = useState<Set<number>>(new Set());
  const [partnerName, setPartnerName] = useState(() => {
    return localStorage.getItem('partnerName') || 'Sarah';
  });

  useEffect(() => {
    localStorage.setItem('partnerName', partnerName);
  }, [partnerName]);

  const handleStarClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setViewedMemories(prev => new Set([...prev, memory.id]));
  };

  const allMemoriesViewed = viewedMemories.size === memories.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] relative overflow-hidden">
      <Starfield density={120} />

      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl text-[var(--off-white)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Our Galaxy of Memories
          </h2>
          <p className="text-[var(--pink-light)]" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
            Click a star to explore a memory
          </p>
          {viewedMemories.size > 0 && viewedMemories.size < memories.length && (
            <motion.p
              className="text-[var(--gold)]/80 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {viewedMemories.size} of {memories.length} memories discovered
            </motion.p>
          )}
        </motion.div>

        <div className="relative w-full max-w-4xl aspect-square">
          {/* Center star with her name */}
          <Star
            x={50}
            y={50}
            size="large"
            label={partnerName}
            isCenter
            delay={0.3}
          />

          {/* Memory stars */}
          {memories.map((memory, index) => (
            <Star
              key={memory.id}
              x={memory.x}
              y={memory.y}
              size="medium"
              onClick={() => handleStarClick(memory)}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>

        {allMemoriesViewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className="text-[var(--off-white)] text-sm mb-2">
              Customize the name:
            </div>
            <EditableName
              initialName={partnerName}
              onNameChange={setPartnerName}
            />
            <Button onClick={() => navigate("/final")}>
              Continue to Final Message
            </Button>
          </motion.div>
        )}
      </div>

      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </div>
  );
}