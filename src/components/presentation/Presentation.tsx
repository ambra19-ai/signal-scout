import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Slide1Title,
  Slide2Problem,
  Slide3Business,
  // Slide4Question,
  Slide5Solution,
  Slide6HowItWorks,
  // Slide7TechStack,
  // Slide8Slack,
  // Slide9Impact,
  Slide11WhyNow,
  Slide10Scales,
  // Slide12CTA,
} from "./slides";

const TOTAL_SLIDES = 7;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const Presentation: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    if (current < TOTAL_SLIDES - 1) { setDirection(1); setCurrent(c => c + 1); }
  }, [current]);

  const prev = useCallback(() => {
    if (current > 0) { setDirection(-1); setCurrent(c => c - 1); }
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slides = [
    Slide1Title, Slide2Problem, Slide3Business, 
    // Slide4Question,
    Slide5Solution, Slide6HowItWorks, // Slide7TechStack, 
    // Slide8Slack,
    // Slide9Impact, 
    Slide11WhyNow,
    Slide10Scales
    // Slide12CTA,
  ];

  const CurrentSlide = slides[current];

  return (
    <div className="fixed inset-0 bg-background overflow-hidden flex flex-col">
      {/* Progress bar */}
      <Progress
        value={((current + 1) / TOTAL_SLIDES) * 100}
        className="h-1 rounded-none bg-muted/30 fixed top-0 left-0 right-0 z-50"
      />

      {/* Slide area */}
      <div className="flex-1 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 py-4 bg-gradient-to-t from-background to-transparent">
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-2 rounded-full glass text-foreground disabled:opacity-20 hover:bg-muted/40 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={current === TOTAL_SLIDES - 1}
          className="p-2 rounded-full glass text-foreground disabled:opacity-20 hover:bg-muted/40 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
