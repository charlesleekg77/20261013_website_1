"use client";

import { SectionHeading } from "@/components/Reveal";
import Reveal from "@/components/Reveal";
import { Layers, Chart, Cube, Code, Grid } from "@/components/Icons";

const MODULES = [
  {
    icon: Layers,
    title: "Pinned Text & Dynamic Media",
    body: "Hold copy in place while background images and video transition smoothly as a function of scroll distance — the classic scrollytelling spine.",
    tag: "pin · parallax",
    accent: "#6366F1",
  },
  {
    icon: Chart,
    title: "Data Visualization & Charts",
    body: "Scroll-triggered charts that build as the reader descends: bars rise, map nodes connect, and counters resolve in step with progress.",
    tag: "charts · maps",
    accent: "#10B981",
  },
  {
    icon: Cube,
    title: "3D Model Explosion / Rotation",
    body: "Bind a WebGL scene's rotation and shard spread directly to scrollProgress 0 → 1. No timeline math, no keyframe babysitting.",
    tag: "webgl · r3f",
    accent: "#8B5CF6",
  },
  {
    icon: Code,
    title: "Export Anywhere",
    body: "Ship as an embeddable <scrolly-embed> web component, a React useScrollStep hook, or a standalone HTML/CSS/JS bundle.",
    tag: "embed · react · html",
    accent: "#6366F1",
  },
  {
    icon: Grid,
    title: "No-Code Studio",
    body: "A split-screen timeline, live canvas and inspector. Drag scenes, set triggers, tune easing curves — publish without opening an editor.",
    tag: "studio · timeline",
    accent: "#10B981",
  },
  {
    icon: Layers,
    title: "Responsive & Touch-Ready",
    body: "Every pinned section degrades to a swipe-driven fallback on mobile, so the narrative reads the same on a phone as on a 5K display.",
    tag: "mobile · a11y",
    accent: "#8B5CF6",
  },
];

export default function PlatformModules() {
  return (
    <section id="modules" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Scrollytelling modules"
        title={
          <>
            Everything a scroll story needs,
            <br className="hidden sm:block" /> <span className="text-gradient">composed in layers.</span>
          </>
        }
        body="Drop in a module, bind it to a scroll trigger, and it stays perfectly in sync with the reader — on any device."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.07}>
            <article className="border-glow group relative h-full overflow-hidden rounded-3xl border border-line/70 bg-canvas/50 p-6 transition-colors duration-300 hover:border-transparent">
              <div
                className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/8"
                style={{ background: `${m.accent}1a`, color: m.accent }}
              >
                <m.icon width={20} height={20} />
              </div>
              <h3 className="font-display text-[17px] font-bold leading-snug text-offwhite">
                {m.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{m.body}</p>
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: m.accent }}>
                {m.tag}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
