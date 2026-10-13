"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStoryStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import TimelinePanel from "@/components/TimelinePanel";
import StudioCanvas from "@/components/StudioCanvas";
import InspectorPanel from "@/components/InspectorPanel";
import { BrandMark, Monitor, Tablet, Phone, Eye, Share, ArrowRight, Bolt } from "@/components/Icons";
import { Button, ButtonLink } from "@/components/Button";

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Phone },
] as const;

/**
 * Scrolly Studio workspace — split-screen layout:
 *   left  → story timeline / block outline
 *   center→ live scroll-bound viewport
 *   right → inspector + media library
 */
export default function StudioWorkspace() {
  const device = useStoryStore((s) => s.device);
  const setDevice = useStoryStore((s) => s.setDevice);
  const previewing = useStoryStore((s) => s.previewing);
  const togglePreview = useStoryStore((s) => s.togglePreview);
  const globalProgress = useStoryStore((s) => s.globalProgress);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-obsidian">
      {/* ===================== TOP ACTION BAR ===================== */}
      <header className="z-30 flex shrink-0 items-center justify-between gap-4 border-b border-line/60 bg-canvas/60 px-4 py-2.5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark size={26} />
            <span className="hidden font-display text-[15px] font-extrabold sm:block">
              Scrollytelling<span className="text-indigo-glow">.ai</span>
            </span>
          </Link>
          <span className="hidden h-5 w-px bg-line md:block" />
          <div className="hidden items-center gap-2 md:flex">
            <span className="font-mono text-[11px] text-muted">untitled-story.scrolly</span>
            <span className="rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-emerald-glow">
              draft
            </span>
          </div>
        </div>

        {/* Device toggle */}
        <div className="flex items-center gap-1 rounded-full border border-line/70 bg-obsidian/50 p-1">
          {DEVICES.map((d) => {
            const active = device === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDevice(d.id)}
                aria-label={d.label}
                aria-pressed={active}
                className={cn(
                  "relative grid h-8 w-9 place-items-center rounded-full transition-colors",
                  active ? "text-offwhite" : "text-faint hover:text-muted",
                )}
              >
                <d.icon width={15} height={15} />
                {active && (
                  <motion.span
                    layoutId="device-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/12"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <progress
            value={globalProgress * 100}
            max={100}
            className="hidden h-1 w-20 overflow-hidden rounded-full md:block"
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={togglePreview}
            icon={<Eye width={14} height={14} />}
            className="!h-9"
          >
            <span className="hidden sm:inline">{previewing ? "Exit preview" : "Preview"}</span>
          </Button>
          <Button
            size="sm"
            className="!h-9"
            icon={<Share width={14} height={14} />}
          >
            Publish
          </Button>
        </div>
      </header>

      {/* ===================== SPLIT SCREEN ===================== */}
      <div className="flex min-h-0 flex-1">
        {/* Left — timeline */}
        <aside className="hidden w-[19rem] shrink-0 flex-col border-r border-line/60 bg-canvas/30 lg:flex xl:w-[21rem]">
          <TimelinePanel />
        </aside>

        {/* Center — canvas */}
        <main className="min-w-0 flex-1">
          <StudioCanvas />
        </main>

        {/* Right — inspector */}
        <aside className="hidden w-[18rem] shrink-0 flex-col border-l border-line/60 bg-canvas/30 xl:flex">
          <InspectorPanel />
        </aside>
      </div>

      {/* ===================== STATUS BAR ===================== */}
      <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-line/60 bg-canvas/60 px-4 py-2 backdrop-blur-xl">
        <div className="flex items-center gap-4 font-mono text-[10.5px] text-faint">
          <span className="flex items-center gap-1.5">
            <Bolt width={12} height={12} className="text-emerald-glow" />
            60 fps
          </span>
          <span className="hidden sm:inline">GSAP ScrollTrigger · r3f</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10.5px] text-faint tabular-nums">
            {(globalProgress * 100).toFixed(0)}%
          </span>
          <ButtonLink href="/docs" size="sm" variant="ghost" className="!h-7 !px-3 text-[11.5px]">
            Export guide
            <ArrowRight width={13} height={13} />
          </ButtonLink>
        </div>
      </footer>
    </div>
  );
}
