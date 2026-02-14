import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Starfield } from "../components/Starfield";
import { Star } from "../components/Star";
import { MemoryModal } from "../components/MemoryModal";
import { Button } from "../components/Button";
import { BackButton } from "../components/BackButton";
import { ConstellationLines } from "../components/ConstellationLines";
import { ProgressIndicator } from "../components/ProgressIndicator";

interface Memory {
  id: number;
  title: string;
  description: string;
  images?: string[];
  audio?: string;
  video?: string;
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
    title: "Chikas",
    description:
      "Halinat sumama makinig sa ating mga chika, minamahal kong binibini.",
    x: 30,
    y: 25,
    audio: `${import.meta.env.BASE_URL}audio/examwk.mp3`,
  },
  {
    id: 2,
    title: "The kaboengs and trippings",
    description:
      "The chikas and trippings and kaboengs na mapapa I wish we're together nagyud babyyy para makumotan na taka kag ma kissan, hayyysssttt, pero daw nakuha nagyud nimo kung unsaon ko sunlogon/paugtason ani babee.",
    x: 70,
    y: 30,
    audio: `${import.meta.env.BASE_URL}audio/chikas.mp3`,
  },
  {
    id: 3,
    title: "Midnight Conversations",
    description:
      "Those late-night talks where hours felt like minutes. You understand me in ways I never thought possible. Every word, every silence between us feels like home.",
    x: 25,
    y: 65,
    audio: `${import.meta.env.BASE_URL}audio/katawa.mp3`,
  },
  {
    id: 4,
    title: "Our first video call",
    description:
      "I can't contain my smile as we finally have our first video call, grabe gyud ang smile ni janjan talaga, ginakilig2 pagyud na pag ayo babee, nami gyud kaayo imong smile kag you're soooo damnnn perfect and prettyy talaga my babyyy!.",
    x: 75,
    y: 70,
    video: `${import.meta.env.BASE_URL}video/fvideos.mp4`,
  },
  {
    id: 5,
    title: "Oh Sige Moments",
    description:
      "Talagaa namannn, woman of culture talaga ang babyyy ko na to.",
    x: 85,
    y: 50,
    video: `${import.meta.env.BASE_URL}video/sige.mp4`,
  },
  {
    id: 6,
    title: "Our cutie moments together",
    description:
      "Most favourite part of the day, ang makita ang aking super duperr prettyyy babyyy loveyy, ka cuteee nalang gyud, can't help myself to take screenshots babii, hihi I love youuuuuuuuuuuuuu!! .",
    x: 15,
    y: 45,
    images: [
      `${import.meta.env.BASE_URL}images/img1.jpg`,
      `${import.meta.env.BASE_URL}images/img2.jpg`,
      `${import.meta.env.BASE_URL}images/img3.jpg`,
      `${import.meta.env.BASE_URL}images/img4.jpg`,
      `${import.meta.env.BASE_URL}images/img5.jpg`,
      `${import.meta.env.BASE_URL}images/img6.jpg`,
      `${import.meta.env.BASE_URL}images/img7.jpg`,
      `${import.meta.env.BASE_URL}images/img8.jpg`,
      `${import.meta.env.BASE_URL}images/img9.jpg`,
      `${import.meta.env.BASE_URL}images/img10.jpg`,
      `${import.meta.env.BASE_URL}images/img11.jpg`,
      `${import.meta.env.BASE_URL}images/img12.jpg`,
      `${import.meta.env.BASE_URL}images/img13.jpg`,
      `${import.meta.env.BASE_URL}images/img14.jpg`,
      `${import.meta.env.BASE_URL}images/img16.jpg`,
      `${import.meta.env.BASE_URL}images/img17.jpg`,
      `${import.meta.env.BASE_URL}images/img18.jpg`,
      `${import.meta.env.BASE_URL}images/img19.jpg`,
      `${import.meta.env.BASE_URL}images/img20.jpg`,
      `${import.meta.env.BASE_URL}images/img21.jpg`,
      `${import.meta.env.BASE_URL}images/img22.jpg`,
    ],
  },
];

export function GalaxyScreen() {
  const navigate = useNavigate();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewedMemories, setViewedMemories] = useState<Set<number>>(new Set());
  const partnerName = "Ma. Krisa Eros Rendon Pama";

  const handleStarClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setViewedMemories((prev) => new Set([...prev, memory.id]));
  };

  const allMemoriesViewed = viewedMemories.size === memories.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight)] to-[var(--deep-navy)] relative overflow-hidden">
      <Starfield density={120} />
      <BackButton to="/" />
      <ProgressIndicator
        current={viewedMemories.size}
        total={memories.length}
      />

      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-4xl text-[var(--off-white)] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our Galaxy of Memories
          </h2>
          <p
            className="text-[var(--pink-light)]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Click a star to explore a memory
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl aspect-square constellation-container">
          {/* Constellation lines */}
          <ConstellationLines
            memories={memories}
            viewedMemories={viewedMemories}
            centerX={50}
            centerY={50}
          />

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
              isViewed={viewedMemories.has(memory.id)}
            />
          ))}
        </div>

        {allMemoriesViewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col items-center"
          >
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
