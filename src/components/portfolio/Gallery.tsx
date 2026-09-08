import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Screenshot } from "@/data/types";
import { Paragraph } from "@/components/base/Paragraph";
import { ImageWithSkeleton } from "@/components/base/ImageWithSkeleton";

function Lightbox({
  shots,
  index,
  onClose,
  onIndexChange,
}: {
  shots: Screenshot[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const shot = shots[index]!;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + shots.length) % shots.length);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, shots.length, onClose, onIndexChange]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <ImageWithSkeleton
          src={shot.url}
          alt={shot.caption}
          wrapperClassName="max-h-[75vh] w-full rounded-2xl border border-border"
          className="max-h-[75vh] object-contain"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            onClick={() => onIndexChange((index - 1 + shots.length) % shots.length)}
            aria-label="Previous screenshot"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <Paragraph variant="sm" className="flex-1 text-center">
            {shot.caption}{" "}
            <span className="text-primary">
              ({index + 1}/{shots.length})
            </span>
          </Paragraph>
          <button
            onClick={() => onIndexChange((index + 1) % shots.length)}
            aria-label="Next screenshot"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export interface GalleryProps {
  shots: Screenshot[];
}

/** Collapsible screenshot grid with a full-screen lightbox. */
export function Gallery({ shots }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-5 border-t border-border pt-4">
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
          Screens ({shots.length})
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          expanded ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-3 gap-2">
            {shots.map((shot, i) => (
              <button
                key={shot.url}
                onClick={() => setOpen(i)}
                tabIndex={expanded ? 0 : -1}
                className="overflow-hidden rounded-lg border border-border transition-all duration-300 hover:border-primary/50"
                aria-label={`View screenshot: ${shot.caption}`}
              >
                <ImageWithSkeleton
                  src={shot.url}
                  alt={shot.caption}
                  loading="lazy"
                  decoding="async"
                  wrapperClassName="aspect-[16/10] w-full"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {open !== null && (
        <Lightbox
          shots={shots}
          index={open}
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </div>
  );
}
