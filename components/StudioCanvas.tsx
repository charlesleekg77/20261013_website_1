"use client";

import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { KineticMediaLayer, ChartsLayer, ThreeLayer } from "@/components/MediaLayers";
import { ArrowDown, Play, Eye } from "@/components/Icons";

const DEVICE_W: Record<string, string> = {
  desktop: "100%",
  tablet: "820px",
  mobile: "400px",
};

/**
 * Center canvas — a live viewport that mirrors the real scroll-bound animation.
 * The canvas has its own internal scroll container so the author can scrub the
 * story without the studio chrome moving.
 */
export default function StudioCanvas() {
  const steps = useStoryStore((s) => s.steps);
  const activeStepIndex = useStoryStore((s) => s.activeStepIndex);
  const setActiveStep = useStoryStore((s) => s.setActiveStep);
  const setSectionProgress = useStoryStore((s) => s.setSectionProgress);
  const device = useStoryStore((s) => s.device);
  const inspector = useStoryStore((s) => s.inspector);

  const scroller = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Reset the scrub when the device frame changes.
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [device]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    setProgress(p);
    setSectionProgress(p);
    setActiveStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
  };

  const active = steps[activeStepIndex] ?? steps[0];

  return (
    <div className="relative flex h-full flex-col bg-obsidian">
      {/* viewport toolbar */}
      <div className="flex items-center justify-between border-b border-line/60 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[10.5px] text-faint">
          <Eye width={13} height={13} />
          live viewport · {device}
        </span>
        <span className="flex items-center gap-2 font-mono text-[10.5px] text-emerald-glow">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-glow" />
          synced
        </span>
      </div>

      {/* device frame */}
      <div className="flex flex-1 items-stretch justify-center overflow-hidden p-4">
        <div
          className="relative flex-1 overflow-hidden rounded-2xl border border-line/70 bg-canvas shadow-[0_30px_80px_-40px_rgba(0,0,0,1)] transition-all duration-500"
          style={{ maxWidth: DEVICE_W[device], margin: "0 auto" }}
        >
          {/* internal scroller */}
          <div
            ref={scroller}
            onScroll={onScroll}
            className="no-scrollbar relative h-full overflow-y-auto overscroll-contain"
          >
            {/* pinned scene */}
            <div className="sticky top-0 h-full overflow-hidden">
              <div className="absolute inset-0">
                {activeStepIndex % 3 === 0 && <KineticMediaLayer progress={progress} />}
                {activeStepIndex % 3 === 1 && <ChartsLayer progress={progress} />}
                {activeStepIndex % 3 === 2 && (
                  <ThreeLayer progress={progress} cameraAngle={inspector.cameraAngle} />
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
              {inspector.showGrid && (
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
              )}

              {/* pinned copy, styled from inspector values */}
              <div className="relative z-10 flex h-full items-end p-7">
                <div className="w-full">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-glow/30 bg-black/40 px-3 py-1 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-glow" />
                    <span className="tag-mono">
                      {active?.tag ?? `scene ${activeStepIndex + 1}`}
                    </span>
                  </div>
                  <h3
                    className="font-display leading-[1.06] text-offwhite"
                    style={{
                      fontSize: `${inspector.fontSize * 1.9}px`,
                      fontWeight: inspector.fontWeight,
                    }}
                  >
                    {active?.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted">
                    {active?.body}
                  </p>

                  {/* mini progress readout */}
                  <div className="mt-5 flex items-center gap-3 font-mono text-[10px] text-faint">
                    <span className="tabular-nums">
                      progress <span className="text-indigo-glow">{progress.toFixed(2)}</span>
                    </span>
                    <span className="h-3 w-px bg-line" />
                    <span>
                      easing <span className="text-violet-glow">{active?.easing}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* scroll spacer — drives the scrub */}
            <div style={{ height: "300%" }} aria-hidden />

            {/* scene markers for context while scrubbing */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex flex-col justify-center gap-2">
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all",
                    i === activeStepIndex ? "scale-150 bg-indigo-glow" : "bg-white/20",
                  )}
                />
              ))}
            </div>
          </div>

          {/* scrub hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[10px] text-muted backdrop-blur-md">
              <ArrowDown width={12} height={12} /> scroll inside the frame to scrub
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
