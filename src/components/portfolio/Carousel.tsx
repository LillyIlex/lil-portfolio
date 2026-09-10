// components/portfolio/Carousel.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/types";

const AUTOPLAY_INTERVAL = 8000;

interface CarouselProps {
  shots: Screenshot[];
  fallbackImage?: string;
  alt: string;
}

export function Carousel({ shots, fallbackImage, alt }: CarouselProps) {
  const images = shots?.length ? shots : fallbackImage ? [{ url: fallbackImage, caption: alt }] : [];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isCarousel = images.length > 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!isCarousel) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL);
  }, [clearTimer, isCarousel, images.length]);

  useEffect(() => {
    if (!isHovered) startTimer();
    return clearTimer;
  }, [isHovered, startTimer, clearTimer]);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    // Manual interaction resets the autoplay clock
    startTimer();
  };

  if (images.length === 0) return null;

  // Single image
  if (!isCarousel) {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <img
          src={images[0].url}
          alt={images[0].caption || alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className="group/carousel relative mt-4 overflow-hidden rounded-xl border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full">
        {images.map((shot, i) => (
          <img
            key={shot.url}
            src={shot.url}
            alt={shot.caption || alt}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous screenshot"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5
          text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200
          group-hover/carousel:opacity-100 hover:bg-background focus-visible:opacity-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next screenshot"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5
          text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200
          group-hover/carousel:opacity-100 hover:bg-background focus-visible:opacity-100"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((shot, i) => (
          <button
            key={shot.url}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className={cn(
              "h-1.5 w-4 rounded-full transition-all duration-300",
              i === index ? "bg-primary" : " bg-primary/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}