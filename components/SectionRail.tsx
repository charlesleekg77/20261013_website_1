"use client";

import { useStoryStore } from "@/lib/store";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "platform", label: "Pinned text & media" },
  { id: "dataviz", label: "Data visualization" },
  { id: "models", label: "3D scenes" },
  { id: "templates", label: "Templates" },
  { id: "pricing", label: "Pricing" },
];

/**
 * Fixed chapter rail on the right edge. Highlights the pinned section the
 * reader is currently inside (driven by the Zustand store) and shows live
 * scroll-% in monospace — a small nod to the studio's keyframe readout.
 */
export default function SectionRail() {
  const activeSection = useStoryStore((s) => s.activeSection);
  const globalProgress = useStoryStore((s) => s.globalProgress);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex">
      <span className="font-mono text-[10px] tabular-nums tracking-widest text-faint">
        {(globalProgress * 100).toFixed(0).padStart(3, "0")}%
      </span>
      <div className="flex flex-col items-end gap-3.5">
        {SECTIONS.map((s, i) => {
          const active = i === activeSection;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-label={s.label}
              aria-current={active ? "true" : undefined}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={cn(
                  "whitespace-nowrap font-mono text-[10px] uppercase tracking-wider transition-all duration-300",
                  active
                    ? "translate-x-0 text-offwhite opacity-100"
                    : "translate-x-2 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                {s.label}
              </span>
              <span className="relative grid place-items-center">
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    active
                      ? "h-7 w-[3px] bg-gradient-to-b from-indigo-glow to-violet-glow shadow-[0_0_14px_0_rgba(139,92,246,0.9)]"
                      : "h-1.5 w-1.5 bg-line group-hover:bg-muted",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
