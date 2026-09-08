import { useState, type ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Class applied to the wrapping element (controls aspect ratio, rounding, etc). */
  wrapperClassName?: string;
}

/**
 * Drop-in <img> replacement that shows a skeleton placeholder until the
 * image has actually loaded, then cross-fades it in. Plain `useState` +
 * the native `onLoad`/`onError` events — no extra libraries needed.
 */
export function ImageWithSkeleton({
  wrapperClassName,
  className,
  onLoad,
  onError,
  alt,
  ...imgProps
}: ImageWithSkeletonProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {status !== "loaded" && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      {status !== "error" && (
        <img
          {...imgProps}
          alt={alt}
          onLoad={(e) => {
            setStatus("loaded");
            onLoad?.(e);
          }}
          onError={(e) => {
            setStatus("error");
            onError?.(e);
          }}
          className={cn(
            "h-full w-full transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </div>
  );
}
