"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";

/* ============================================================================
   Background layers for the three pinned feature sections.
   Each receives section progress 0→1 and renders a purely declarative scene —
   no per-frame React state, so the pinned text stays smooth.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   1. Kinetic media — parallax layers + media cross-fade
   ------------------------------------------------------------------------- */
const MEDIA = [
  { label: "aerial-orbit.mp4", from: "#1E1B4B", to: "#0A0B0E", accent: "#6366F1" },
  { label: "product-loop.webm", from: "#064E3B", to: "#0A0B0E", accent: "#10B981" },
  { label: "city-timelapse.mp4", from: "#4C1D95", to: "#0A0B0E", accent: "#8B5CF6" },
];

export function KineticMediaLayer({ progress }: { progress: number }) {
  const n = MEDIA.length;
  const activeIndex = Math.min(n - 1, Math.floor(progress * n));

  return (
    <div className="absolute inset-0 overflow-hidden bg-obsidian">
      {MEDIA.map((m, i) => {
        const local = Math.min(1, Math.max(0, progress * n - i));
        return (
          <div
            key={m.label}
            className="absolute inset-0 will-3d"
            style={{
              opacity: i === activeIndex ? 1 - Math.abs(local - 0.5) * 1.2 : 0.25,
              transform: `scale(${1.08 + i * 0.06 + local * 0.08}) translate3d(${(0.5 - local) * 5}%, 0, 0)`,
              transition: "opacity 120ms linear",
            }}
          >
            {/* Layered gradient stand-in for hosted high-res media */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 90% at ${18 + i * 22}% 32%, ${m.from} 0%, ${m.to} 62%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                background: `radial-gradient(60% 60% at 72% 68%, ${m.accent}66 0%, transparent 70%)`,
              }}
            />
          </div>
        );
      })}

      {/* Floating frame chrome — sells the "embedded media" idea */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div
        className="absolute left-[8%] top-[16%] hidden w-56 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md md:block"
        style={{ transform: `translateY(${progress * -70}px)` }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-glow/70" />
        </div>
        <p className="mt-2.5 font-mono text-[10px] text-muted">
          {MEDIA[activeIndex].label} · 4K · 60fps
        </p>
      </div>
      <div
        className="absolute bottom-[18%] right-[10%] hidden w-64 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md md:block"
        style={{ transform: `translateY(${progress * 60}px)` }}
      >
        <div className="flex items-center justify-between">
          <span className="tag-mono">layer 0{activeIndex + 1}</span>
          <span className="font-mono text-[10px] text-indigo-glow">
            {(progress * 100).toFixed(0)}%
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-glow to-violet-glow"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   2. Charts — bars build up, map nodes connect as the reader scrolls
   ------------------------------------------------------------------------- */
const BARS = [
  { label: "Q1", value: 0.42 },
  { label: "Q2", value: 0.66 },
  { label: "Q3", value: 0.54 },
  { label: "Q4", value: 0.88 },
  { label: "Q5", value: 0.73 },
  { label: "Q6", value: 0.96 },
];

const NODES = [
  { x: 12, y: 68, name: "SF" },
  { x: 26, y: 40, name: "NYC" },
  { x: 44, y: 54, name: "LDN" },
  { x: 58, y: 30, name: "BER" },
  { x: 72, y: 58, name: "SGP" },
  { x: 88, y: 36, name: "TYO" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [4, 5],
  [1, 4],
];

export function ChartsLayer({ progress }: { progress: number }) {
  // Bars animate through the first 60% of the section; links draw through 55–95%.
  const barProgress = Math.min(1, progress / 0.6);
  const linkProgress = Math.min(1, Math.max(0, (progress - 0.45) / 0.5));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-canvas via-obsidian to-canvas">
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Radial accent bloom that tracks progress */}
      <div
        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background: `radial-gradient(circle, rgba(16,185,129,${0.1 + progress * 0.16}) 0%, transparent 62%)`,
        }}
      />

      {/* ---- Bar chart ---- */}
      <div className="absolute bottom-[12%] right-[6%] hidden h-[42%] w-[42%] items-end gap-3 md:flex">
        {BARS.map((b, i) => {
          const local = Math.min(1, Math.max(0, barProgress * BARS.length - i));
          const h = b.value * local * 100;
          return (
            <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-emerald-glow tabular-nums">
                {(b.value * local * 100).toFixed(0)}
              </span>
              <div className="relative flex h-full w-full items-end overflow-hidden rounded-t-md bg-white/4">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-glow/30 via-emerald-glow to-emerald-glow/80"
                  style={{
                    height: `${h}%`,
                    boxShadow: h > 12 ? "0 0 22px -4px rgba(16,185,129,0.8)" : "none",
                  }}
                />
              </div>
              <span className="tag-mono">{b.label}</span>
            </div>
          );
        })}
      </div>

      {/* ---- Map with connecting nodes ---- */}
      <div className="absolute left-[5%] top-[16%] h-[46%] w-[62%] md:left-[6%] md:w-[48%]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const local = Math.min(1, Math.max(0, linkProgress * EDGES.length - i));
            const n1 = NODES[a];
            const n2 = NODES[b];
            const x = n1.x + (n2.x - n1.x) * local;
            const y = n1.y + (n2.y - n1.y) * local;
            return (
              <line
                key={i}
                x1={n1.x}
                y1={n1.y}
                x2={x}
                y2={y}
                stroke="url(#edge-grad)"
                strokeWidth={0.4}
                strokeLinecap="round"
                opacity={0.85}
              />
            );
          })}
          {NODES.map((node, i) => {
            const local = Math.min(1, Math.max(0, linkProgress * NODES.length * 1.3 - i));
            return (
              <g key={node.name} opacity={local}>
                <circle cx={node.x} cy={node.y} r={2.6 * local} fill="#10B981" opacity={0.22} />
                <circle cx={node.x} cy={node.y} r={1.1 * local} fill="#F9FAFB" />
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="absolute bottom-[13%] left-[6%] hidden max-w-xs rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md md:block">
        <p className="tag-mono mb-1">Live dataset</p>
        <p className="font-mono text-lg font-semibold text-offwhite tabular-nums">
          {(12840 * barProgress).toFixed(0)}
          <span className="ml-1 text-xs font-normal text-muted">datapoints rendered</span>
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   3. Three.js scene — dynamically imported, client-only
   ------------------------------------------------------------------------- */
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-obsidian">
      <div className="flex flex-col items-center gap-3">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-glow/30 border-t-indigo-glow" />
        <span className="tag-mono">Compiling WebGL scene…</span>
      </div>
    </div>
  ),
});

export function ThreeLayer({
  progress,
  cameraAngle,
  className,
}: {
  progress: number;
  cameraAngle?: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <ThreeScene progress={progress} cameraAngle={cameraAngle} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
    </div>
  );
}
