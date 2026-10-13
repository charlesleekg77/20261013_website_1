"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers ScrollTrigger exactly once on the client. Importing this module is
 * safe during SSR — GSAP only touches `window` when a trigger is created, which
 * happens inside effects / callbacks that run in the browser.
 */
let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined") return false;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return true;
}

export { gsap, ScrollTrigger };

/**
 * usePinProgress — wires a tall scroll track to a pinned viewport and reports
 * `progress` (0→1) through the pinned range. This is the primitive behind every
 * pinned text-over-media block on the site.
 *
 * Layout contract:
 *   <section ref={trackRef} style={{ height: `${seconds * 100}vh` }}>
 *     <div ref={pinRef} className="pin-viewport">…</div>
 *   </section>
 */
export function usePinProgress<T extends HTMLElement = HTMLDivElement>(
  onProgress: (progress: number) => void,
  options: { end?: string; scrub?: number | boolean; enabled?: boolean } = {},
) {
  const trackRef = useRef<T | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    if (!ensureGsap()) return;
    if (options.enabled === false) return;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: options.end ?? "bottom bottom",
        scrub: options.scrub ?? true,
        pin,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
          cb.current(self.progress);
        },
      });
    }, track);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.end, options.scrub, options.enabled]);

  return { trackRef, pinRef, progress };
}
