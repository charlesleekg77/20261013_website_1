"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "@/lib/scroll";
import { useStoryStore } from "@/lib/store";

/**
 * Mounts once per page. Tracks global document scroll (0→1) into the Zustand
 * store so the navbar progress bar, the section rail and the studio timeline all
 * stay in lockstep. Also refreshes ScrollTrigger on resize / font load.
 */
export default function ScrollTracker() {
  const setGlobalProgress = useStoryStore((s) => s.setGlobalProgress);

  useEffect(() => {
    if (!ensureGsap()) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.ticker.lagSmoothing(0);
        setGlobalProgress(self.progress);
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [setGlobalProgress]);

  return null;
}
