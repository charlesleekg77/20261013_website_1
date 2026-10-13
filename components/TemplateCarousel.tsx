"use client";

import { useRef } from "react";
import { TEMPLATES } from "@/lib/data";
import TemplateCard from "@/components/TemplateCard";
import { ArrowRight } from "@/components/Icons";

/** Horizontal snap carousel of template cards with prev/next controls. */
export default function TemplateCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {TEMPLATES.map((t, i) => (
          <TemplateCard key={t.id} template={t} index={i} compact />
        ))}
        {/* trailing spacer so the last card can snap comfortably */}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      <div className="mt-7 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Drag or swipe · {TEMPLATES.length} formats
        </p>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous templates"
            className="glass-panel grid h-10 w-10 place-items-center rounded-full text-muted transition-all hover:text-offwhite hover:border-indigo-glow/40"
          >
            <ArrowRight width={16} height={16} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next templates"
            className="glass-panel grid h-10 w-10 place-items-center rounded-full text-muted transition-all hover:text-offwhite hover:border-indigo-glow/40"
          >
            <ArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
