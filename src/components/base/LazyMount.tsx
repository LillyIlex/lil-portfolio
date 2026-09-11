import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

import { registerLazySection } from "@/lib/lazy-mount-registry";

export interface LazyMountProps {
  children: ReactNode;
  /** Anchor id, so nav links and scroll-spy work before the section mounts. */
  id?: string | undefined;
  /** Reserved height so nothing jumps when the section mounts. */
  minHeight?: number;
  fallback?: ReactNode;
}

export function LazyMount({ children, id, minHeight = 480, fallback }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const unregister = id ? registerLazySection(id, () => setShow(true)) : undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => {
      unregister?.();
      observer.disconnect();
    };
  }, [id]);

  return (
    <div id={id} ref={ref} className="scroll-mt-16" style={show ? undefined : { minHeight }}>
      {show && <Suspense fallback={fallback ?? <SectionSkeleton />}>{children}</Suspense>}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8" aria-hidden>
      <div className="mx-auto max-w-5xl animate-pulse space-y-4">
        <div className="mx-auto h-4 w-24 rounded-full bg-card" />
        <div className="mx-auto h-8 w-2/3 rounded-full bg-card" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="h-40 rounded-2xl bg-card" />
          <div className="h-40 rounded-2xl bg-card" />
        </div>
      </div>
    </div>
  );
}
