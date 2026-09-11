// components/portfolio/Carousel.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/types";

import placeholderImg from "@/assets/project-placeholder.webp"

// const AUTOPLAY_INTERVAL = 8000; // autoplay disabled for now

interface CarouselProps {
  shots: Screenshot[];
  fallbackImage?: string;
  alt: string;
}

export function Carousel({ shots, fallbackImage = placeholderImg, alt }: CarouselProps) {
  const images = shots?.length ? shots : fallbackImage ? [{ url: fallbackImage, caption: alt }] : [];
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false); // was only used to pause autoplay
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isCarousel = images.length > 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // --- Autoplay disabled for now ---
  // const startTimer = useCallback(() => {
  //   clearTimer();
  //   if (!isCarousel || !isLightboxOpen) return;
  //   timerRef.current = setInterval(() => {
  //     setIndex((current) => (current + 1) % images.length);
  //   }, AUTOPLAY_INTERVAL);
  // }, [clearTimer, isCarousel, isLightboxOpen, images.length]);

  // useEffect(() => {
  //   startTimer();
  //   return clearTimer;
  // }, [startTimer, clearTimer]);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    // startTimer();
  };

  const openLightbox = () => {
    setIndex(0);
    setIsLightboxOpen(true);
  };

  // Lock body scroll + esc/arrow-key nav while lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      clearTimer();
    };
  }, [isLightboxOpen, index]);

  if (images.length === 0) return null;

  // Lightbox only mounts (and therefore only loads its images) once opened.
  const lightbox = isLightboxOpen
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-4/3 w-full bg-muted">
              {/* Only the active + lazily-loaded images render here, once the lightbox is open */}
              {images.map((shot, i) => (
                <img
                  key={`lb-image-${i}`}
                  src={shot.url}
                  alt={shot.caption || alt}
                  loading={i === index ? "eager" : "lazy"}
                  decoding="async"
                  className={cn(
                    "absolute inset-0 h-full w-full object-contain transition-opacity duration-500",
                    i === index ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>

            {images[index].caption && (
              <div className="border-t border-border px-4 py-2 text-sm text-muted-foreground">
                {images[index].caption}
              </div>
            )}

            {isCarousel && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-[calc(50%-1.25rem)] -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm hover:bg-background"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next screenshot"
                  className="absolute right-2 top-[calc(50%-1.25rem)] -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm hover:bg-background"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={`lb-dot-${i}`}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      className={cn(
                        "h-1.5 w-4 rounded-full transition-all duration-300",
                        i === index ? "bg-primary" : "bg-primary/20"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  // Main view: always a single static image (first shot only), regardless of how many exist.
  return (
    <>
      <div
        className="group/carousel relative mt-4 overflow-hidden rounded-xl border border-border cursor-pointer"
        onClick={openLightbox}
      >
        <img
          src={images[0].url}
          alt={images[0].caption || alt}
          loading="lazy"
          decoding="async"
          className="aspect-4/3 w-full object-cover object-top transition-transform duration-300 group-hover/carousel:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover/carousel:bg-black/20 group-hover/carousel:opacity-100">
          <ZoomIn className="h-6 w-6 text-white drop-shadow" />
        </div>
      </div>
      {lightbox}
    </>
  );
}