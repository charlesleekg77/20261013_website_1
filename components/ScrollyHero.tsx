"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowDown, Play, Sparkle } from "@/components/Icons";
import { ButtonLink, Button } from "@/components/Button";
import { cn } from "@/lib/cn";

/* ============================================================================
   Hero — headline + a live scroll-preview widget.
   The widget is a miniature scrollytelling story: it tracks the hero's own
   scroll progress and morphs its media, text and chart layers so a first-time
   visitor can *feel* the mechanic before they even reach the feature sections.
   ========================================================================== */

const ROTATING = ["Immersive Stories.", "Data Narratives.", "3D Product Tours.", "Living Reports."];

export default function ScrollyHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const headlineY = useTransform(progress, [0, 1], [0, -120]);
  const headlineOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const previewY = useTransform(progress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* ---------- Ambient backdrop ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.4]" />
        <motion.div
          style={{ y: headlineY }}
          className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-indigo-glow/18 blur-[140px]"
        />
        <motion.div
          style={{ y: useTransform(progress, [0, 1], [0, 90]) }}
          className="absolute right-[6%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-glow/16 blur-[130px]"
        />
        <div className="absolute bottom-0 left-[10%] h-[26rem] w-[26rem] rounded-full bg-emerald-glow/12 blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/0 via-transparent to-obsidian" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* ---------- Copy ---------- */}
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="relative z-10">
          <div className="glass-panel mb-7 inline-flex items-center gap-2.5 rounded-full border-indigo-glow/25 py-1.5 pl-2 pr-4">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-glow/20">
              <Sparkle width={13} height={13} className="text-indigo-glow" />
            </span>
            <span className="tag-mono">Scroll-native storytelling · v3.0</span>
          </div>

          <h1 className="font-display text-[clamp(2.6rem,5.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            Turn Static Content
            <br />
            into Scroll-Driven
            <br />
            <span className="text-gradient">Immersive Stories.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-muted">
            Combine text, 3D graphics, data visualizations, and media into seamless, interactive
            web experiences —{" "}
            <span className="font-medium text-offwhite">no code required</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              href="/editor"
              size="lg"
              iconRight={<ArrowRight width={18} height={18} />}
            >
              Create Scrolly
            </ButtonLink>
            <ButtonLink
              href="/showcase"
              variant="secondary"
              size="lg"
              icon={<Play width={15} height={15} />}
            >
              Watch a story
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              { k: "31k+", v: "Stories published" },
              { k: "60fps", v: "Scroll-linked render" },
              { k: "0 LOC", v: "To go live" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-xl font-bold text-offwhite">{s.k}</div>
                <div className="tag-mono">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---------- Live scroll preview widget ---------- */}
        <motion.div style={{ y: previewY }} className="relative z-10">
          <HeroPreview progress={progress} />
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Live preview widget — a self-contained mini scrolly story
   ------------------------------------------------------------------------- */
function HeroPreview({ progress }: { progress: MotionValue<number> }) {
  const frameRotate = useTransform(progress, [0, 1], [-6, 6]);
  const gridShift = useTransform(progress, [0, 1], ["0%", "-6%"]);
  const bar1 = useTransform(progress, [0.05, 0.35], ["8%", "62%"]);
  const bar2 = useTransform(progress, [0.15, 0.5], ["8%", "88%"]);
  const bar3 = useTransform(progress, [0.25, 0.6], ["8%", "46%"]);
  const scanY = useTransform(progress, [0, 1], ["0%", "100%"]);
  const orbScale = useTransform(progress, [0, 0.6, 1], [0.85, 1.15, 0.95]);
  const orbY = useTransform(progress, [0, 1], [14, -26]);

  return (
    <motion.div
      style={{ rotate: frameRotate }}
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div className="glass-strong relative overflow-hidden rounded-4xl p-3 shadow-[0_40px_120px_-30px_rgba(99,102,241,0.5)]">
        {/* window chrome */}
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-glow/70" />
          </div>
          <span className="font-mono text-[10px] text-faint">
            scrollytelling.ai/preview
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-glow" />
            <span className="font-mono text-[10px] text-emerald-glow">LIVE</span>
          </span>
        </div>

        {/* viewport */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-obsidian">
          {/* morphing media backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(110% 90% at 25% 25%, #1E1B4B 0%, #0A0B0E 62%)",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
              background:
                "radial-gradient(50% 50% at 78% 30%, rgba(139,92,246,0.55) 0%, transparent 68%)",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-grid opacity-30"
            style={{ backgroundPositionX: gridShift }}
          />

          {/* 3D orb stand-in (morphs with scroll) */}
          <motion.div
            style={{ scale: orbScale, y: orbY }}
            className="absolute right-[14%] top-[20%] h-28 w-28 rounded-full bg-gradient-to-br from-indigo-glow via-violet-glow to-emerald-glow blur-[1px]"
          >
            <div className="absolute inset-2 rounded-full bg-obsidian/70 backdrop-blur-sm" />
            <div className="absolute inset-6 rounded-full border border-white/20" />
          </motion.div>

          {/* pinned text block */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-7">
            <div className="tag-mono mb-2 text-indigo-glow">pin 01 / 04</div>
            <h4 className="max-w-[15rem] font-display text-[19px] leading-tight font-bold text-offwhite">
              Copy stays pinned while the media breathes.
            </h4>
          </div>

          {/* mini chart */}
          <div className="absolute bottom-5 left-7 flex h-20 items-end gap-2.5">
            {[bar1, bar2, bar3].map((h, i) => (
              <motion.div
                key={i}
                className="w-3 rounded-t-sm bg-gradient-to-t from-emerald-glow/40 to-emerald-glow"
                style={{ height: h }}
              />
            ))}
          </div>

          {/* scroll scan line */}
          <motion.div
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-indigo-glow/12 to-transparent"
            style={{ top: scanY }}
          />

          {/* progress readout */}
          <div className="absolute bottom-5 right-5 rounded-lg border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md">
            <ProgressReadout progress={progress} />
          </div>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        style={{ y: useTransform(progress, [0, 1], [0, -40]) }}
        className="glass-panel absolute -left-6 top-16 hidden items-center gap-2 rounded-xl px-3 py-2 md:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-glow" />
        <span className="font-mono text-[10px] text-muted">ScrollTrigger</span>
      </motion.div>
      <motion.div
        style={{ y: useTransform(progress, [0, 1], [0, 34]) }}
        className="glass-panel absolute -right-5 bottom-24 hidden items-center gap-2 rounded-xl px-3 py-2 md:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow" />
        <span className="font-mono text-[10px] text-muted">r3f · useFrame</span>
      </motion.div>
    </motion.div>
  );
}

function ProgressReadout({ progress }: { progress: MotionValue<number> }) {
  const text = useTransform(progress, (v) => `${(v * 100).toFixed(0)}%`);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">progress</span>
      <motion.span className="font-mono text-xs font-semibold text-offwhite tabular-nums">
        {text}
      </motion.span>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7 }}
      className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2.5"
    >
      <span className="tag-mono">Scroll to preview the mechanic</span>
      <motion.span
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
        className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-muted"
      >
        <ArrowDown width={16} height={16} />
      </motion.span>
    </motion.div>
  );
}
