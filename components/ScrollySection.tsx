"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, ensureGsap } from "@/lib/scroll";
import { useStoryStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { ChartsLayer, KineticMediaLayer, ThreeLayer } from "@/components/MediaLayers";

export interface ScrollyStep {
  /** Short label shown in the monospaced step tag, e.g. "PIN 01". */
  tag?: string;
  title: string;
  body: string;
}

/** Which built-in background module to render behind the pinned text. */
export type MediaKind = "kinetic" | "charts" | "three";

interface ScrollySectionProps {
  id: string;
  /** Zero-based position of this section among the page's pinned sections. */
  index: number;
  eyebrow: string;
  steps: ScrollyStep[];
  /** Accent used for the progress rail / tags. */
  accent?: "indigo" | "violet" | "emerald";
  /** Built-in background module. Kept serializable so server pages can use it. */
  mediaKind: MediaKind;
  /** Base tilt (degrees) for the 3D module. */
  cameraAngle?: number;
  /** Horizontal alignment of the pinned text column. */
  align?: "left" | "center";
  /** Extra classes on the pinned viewport. */
  className?: string;
}

const ACCENTS = {
  indigo: {
    text: "text-indigo-glow",
    ring: "border-indigo-glow/40",
    bg: "bg-indigo-glow",
    glow: "shadow-[0_0_24px_-2px_rgba(99,102,241,0.9)]",
    grad: "from-indigo-glow to-violet-glow",
  },
  violet: {
    text: "text-violet-glow",
    ring: "border-violet-glow/40",
    bg: "bg-violet-glow",
    glow: "shadow-[0_0_24px_-2px_rgba(139,92,246,0.9)]",
    grad: "from-violet-glow to-indigo-glow",
  },
  emerald: {
    text: "text-emerald-glow",
    ring: "border-emerald-glow/40",
    bg: "bg-emerald-glow",
    glow: "shadow-[0_0_24px_-2px_rgba(16,185,129,0.9)]",
    grad: "from-emerald-glow to-indigo-glow",
  },
} as const;

/**
 * Opacity ramp for a step inside a pinned track: fades in over the first 28%
 * of the step's scroll window, holds, then fades out over the final 28%.
 */
function stepOpacity(progress: number, i: number, n: number) {
  const w = 1 / n;
  const t = (progress - i * w) / w;
  if (t < 0 || t > 1) return 0;
  const fade = 0.28;
  if (t < fade) return t / fade;
  if (t > 1 - fade) return (1 - t) / fade;
  return 1;
}

export default function ScrollySection({
  id,
  index,
  eyebrow,
  steps,
  accent = "indigo",
  mediaKind,
  cameraAngle = 24,
  align = "left",
  className,
}: ScrollySectionProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const lastProgress = useRef(0);
  const setActiveSection = useStoryStore((s) => s.setActiveSection);
  const setSectionProgress = useStoryStore((s) => s.setSectionProgress);
  const setActiveStep = useStoryStore((s) => s.setActiveStep);
  const a = ACCENTS[accent];

  useEffect(() => {
    if (!ensureGsap()) return;
    const track = trackRef.current;
    if (!track) return;

    // CSS `position: sticky` handles the pinning; ScrollTrigger only reports
    // progress so the text/media layers can react without layout thrash.
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Only push React state when a repaint would actually differ — keeps
        // the pinned text/media layers jank-free on long tracks.
        if (Math.abs(self.progress - lastProgress.current) < 0.0015) return;
        lastProgress.current = self.progress;
        setProgress(self.progress);
        setSectionProgress(self.progress);
        setActiveSection(index);
        setActiveStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
      },
      onToggle: (self) => {
        if (self.isActive) setActiveSection(index);
      },
    });
    return () => st.kill();
  }, [index, steps.length, setActiveSection, setSectionProgress, setActiveStep]);

  const n = steps.length;
  const activeIndex = Math.min(n - 1, Math.floor(progress * n));

  return (
    <section
      ref={trackRef}
      id={id}
      data-section-index={index}
      style={{ height: `${n * 100}vh` }}
      className="relative"
    >
      <div className={cn("pin-viewport will-3d", className)}>
        {/* ---------- Background media layer ---------- */}
        <div className="absolute inset-0">
          {mediaKind === "kinetic" && <KineticMediaLayer progress={progress} />}
          {mediaKind === "charts" && <ChartsLayer progress={progress} />}
          {mediaKind === "three" && (
            <ThreeLayer progress={progress} cameraAngle={cameraAngle} />
          )}
        </div>

        {/* ---------- Vignette + grid ---------- */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent md:via-obsidian/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />

        {/* ---------- Pinned text column ---------- */}
        <div className="relative z-10 flex h-full items-center">
          <div
            className={cn(
              "mx-auto w-full max-w-[1400px] px-6 md:px-8",
              align === "center" && "text-center",
            )}
          >
            <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
              <div
                className={cn(
                  "mb-5 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5",
                  "glass-panel",
                  a.ring,
                  align === "center" && "mx-auto",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", a.bg, a.glow)} />
                <span className="tag-mono">{eyebrow}</span>
              </div>

              {/* Steps are absolutely stacked so they cross-fade in place. */}
              <div className="relative min-h-[19rem] sm:min-h-[16rem]">
                {steps.map((step, i) => {
                  const o = stepOpacity(progress, i, n);
                  const w = 1 / n;
                  const t = Math.min(1, Math.max(0, (progress - i * w) / w));
                  const y = (1 - t) * 44 - (t > 0.72 ? (t - 0.72) * 120 : 0);
                  return (
                    <div
                      key={step.title}
                      aria-hidden={o < 0.35}
                      className="absolute inset-0 will-3d"
                      style={{
                        opacity: o,
                        transform: `translate3d(0, ${y}px, 0)`,
                        filter: `blur(${(1 - o) * 6}px)`,
                        pointerEvents: o > 0.6 ? "auto" : "none",
                      }}
                    >
                      {step.tag && (
                        <div className={cn("tag-mono mb-3", a.text)}>{step.tag}</div>
                      )}
                      <h3 className="font-display text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.03] font-extrabold tracking-tight text-offwhite">
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base",
                          align === "center" && "mx-auto",
                        )}
                      >
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Monospaced readout */}
              <div
                className={cn(
                  "mt-8 flex items-center gap-4 font-mono text-xs text-faint",
                  align === "center" && "justify-center",
                )}
              >
                <span className="tabular-nums">
                  scrollProgress:{" "}
                  <span className={cn("font-semibold", a.text)}>{progress.toFixed(2)}</span>
                </span>
                <span className="h-3 w-px bg-line" />
                <span className="tabular-nums">
                  step <span className="text-offwhite">{activeIndex + 1}</span>/{n}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Vertical step rail ---------- */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex md:right-8">
          {steps.map((step, i) => {
            const active = i === activeIndex;
            return (
              <div key={step.title} className="group flex items-center gap-3">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest transition-all duration-300",
                    active ? "text-offwhite opacity-100" : "text-faint opacity-0 group-hover:opacity-100",
                  )}
                >
                  {step.tag ?? `0${i + 1}`}
                </span>
                <span className="relative grid place-items-center">
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      active ? cn("h-2 w-2", a.bg, a.glow) : "h-1.5 w-1.5 bg-line",
                    )}
                  />
                  {active && (
                    <span
                      className={cn(
                        "absolute h-2 w-2 animate-pulse-ring rounded-full",
                        a.bg,
                      )}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* ---------- Bottom progress line ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-white/5">
          <div
            className={cn("h-full origin-left bg-gradient-to-r", a.grad)}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
