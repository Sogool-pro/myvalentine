import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Play, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

interface Memory {
  id: number;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  video?: string;
  audio?: string;
}

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageSlides = useMemo(() => {
    if (!memory) return [];
    if (memory.images && memory.images.length > 0) return memory.images;
    if (memory.image) return [memory.image];
    return [];
  }, [memory]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (memory) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [memory, onClose]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [memory?.id]);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);
    carouselApi.on("reInit", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
      carouselApi.off("reInit", updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <AnimatePresence>
      {memory && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(45deg, var(--pink), var(--gold), var(--pink))",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-[2px] rounded-3xl bg-[var(--deep-navy)]/95 backdrop-blur-xl" />
            </motion.div>

            <div className="relative p-8">
              {/* Decorative sparkles */}
              <motion.div
                className="absolute top-4 left-4 text-[var(--gold)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-[var(--pink)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} />
              </motion.div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[var(--off-white)] hover:text-[var(--pink)] transition-colors z-10 p-2 rounded-full hover:bg-[var(--pink)]/10"
              >
                <X size={24} />
              </button>

              <motion.h2
                className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink)] to-[var(--gold)] pr-8"
                style={{ fontFamily: 'var(--font-serif)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {memory.title}
              </motion.h2>

              {memory.video && (
                <motion.div
                  className="w-full h-56 bg-gradient-to-br from-[var(--navy-light)] to-[var(--midnight)] rounded-2xl mb-4 overflow-hidden border border-[var(--pink)]/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {memory.video === "placeholder" ? (
                    <div className="w-full h-full flex items-center justify-center text-[var(--pink)]/30 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--pink)]/10 to-transparent" />
                      <span style={{ fontFamily: 'var(--font-serif)' }}>[Memory Video]</span>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                    >
                      <source src={memory.video} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </motion.div>
              )}

              {!memory.video && imageSlides.length > 0 && (
                <motion.div
                  className="relative w-full bg-gradient-to-br from-[var(--navy-light)] to-[var(--midnight)] rounded-2xl mb-4 overflow-hidden border border-[var(--pink)]/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Carousel
                    className="w-full touch-pan-y"
                    setApi={setCarouselApi}
                    opts={{ loop: imageSlides.length > 1 }}
                  >
                    <CarouselContent className="!ml-0">
                      {imageSlides.map((imageSrc, index) => (
                        <CarouselItem
                          key={`${memory.id}-image-${index}`}
                          className="!pl-0 bg-black/25"
                        >
                          {imageSrc === "placeholder" ? (
                            <div className="w-full h-[60vh] max-h-[60vh] min-h-72 flex items-center justify-center text-[var(--pink)]/30 relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--pink)]/10 to-transparent" />
                              <span style={{ fontFamily: "var(--font-serif)" }}>
                                [Memory Photo {index + 1}]
                              </span>
                            </div>
                          ) : (
                            <div className="w-full h-[60vh] max-h-[60vh] min-h-72 flex items-center justify-center">
                              <ImageWithFallback
                                src={imageSrc}
                                alt={`${memory.title} photo ${index + 1}`}
                                className="max-h-full max-w-full w-auto h-auto object-contain"
                              />
                            </div>
                          )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {imageSlides.length > 1 && (
                    <>
                      <button
                        onClick={() => carouselApi?.scrollPrev()}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/35 text-[var(--off-white)] hover:bg-black/55 transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => carouselApi?.scrollNext()}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/35 text-[var(--off-white)] hover:bg-black/55 transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-full">
                        {imageSlides.map((_, index) => (
                          <button
                            key={`dot-${memory.id}-${index}`}
                            aria-label={`Go to photo ${index + 1}`}
                            onClick={() => carouselApi?.scrollTo(index)}
                            className={`h-2 w-2 rounded-full transition-all ${
                              currentSlide === index
                                ? "bg-[var(--gold)] w-4"
                                : "bg-[var(--off-white)]/60"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              <motion.p
                className="text-[var(--off-white)] leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {memory.description.split('. ').map((sentence, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {sentence}{index < memory.description.split('. ').length - 1 ? '. ' : ''}
                  </motion.span>
                ))}
              </motion.p>

              {memory.audio && (
                <motion.div
                  className="rounded-2xl p-4 bg-gradient-to-r from-[var(--pink)]/10 to-[var(--gold)]/10 border border-[var(--pink)]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 text-[var(--pink)] mb-3">
                    <Play size={16} />
                    <span style={{ fontFamily: 'var(--font-sans)' }}>Voice Recording</span>
                  </div>
                  <audio className="w-full" controls preload="metadata">
                    <source src={memory.audio} />
                    Your browser does not support audio playback.
                  </audio>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
