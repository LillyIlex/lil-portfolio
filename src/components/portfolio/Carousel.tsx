// components/portfolio/Carousel.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/types";

import placeholderImg from "@/assets/project-placeholder.png"

const AUTOPLAY_INTERVAL = 8000;

interface CarouselProps {
  shots: Screenshot[];
  fallbackImage?: string;
  alt: string;
}

export function Carousel({ shots, fallbackImage = placeholderImg, alt }: CarouselProps) {
  const images = shots?.length ? shots : fallbackImage ? [{ url: fallbackImage, caption: alt }] : [];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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
    if (!isCarousel || isLightboxOpen) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL);
  }, [clearTimer, isCarousel, isLightboxOpen, images.length]);

  useEffect(() => {
    if (!isHovered) startTimer();
    return clearTimer;
  }, [isHovered, startTimer, clearTimer]);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    startTimer();
  };

  // Lock body scroll + esc-to-close while lightbox is open
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
    };
  }, [isLightboxOpen, index]);

  if (images.length === 0) return null;

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
            <img
              src={images[index].url}
              alt={images[index].caption || alt}
              className="h-full w-full object-contain"
            />
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
                {images.map((shot, i) => (
                  <button
                    key={`lb-${shot}-${i}`}
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

  // Single image
  if (!isCarousel) {
    return (
      <>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <img
            src={images[0].url}
            alt={images[0].caption || alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full cursor-zoom-in object-cover object-top"
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <div
        className="group/carousel relative mt-4 overflow-hidden rounded-xl border border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] w-full">
          {images.map((shot, i) => (
            <img
              key={`image-${i}`}
              src={shot.url}
              alt={shot.caption || alt}
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full cursor-zoom-in object-cover object-top transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0"
              )}
              onClick={() => setIsLightboxOpen(true)}
            />
          ))}
        </div>

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

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((shot, i) => (
            <button
              key={`${shot}-${i}`}
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
      {lightbox}
    </>
  );
}