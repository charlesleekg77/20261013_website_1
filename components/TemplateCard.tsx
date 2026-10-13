"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Template } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Remix, ArrowRight, Clock, Layers } from "@/components/Icons";
import { Button } from "@/components/Button";

/**
 * TemplateCard — hover mounts a lightweight CSS/canvas preview that mimics the
 * template's scroll behaviour, plus a "Remix / Edit in Studio" action.
 */
export default function TemplateCard({
  template,
  index = 0,
  compact = false,
}: {
  template: Template;
  index?: number;
  compact?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-canvas/60",
        "transition-colors duration-300 hover:border-indigo-glow/35",
        compact && "w-[19rem] shrink-0 snap-start",
      )}
    >
      {/* ---------- Preview surface ---------- */}
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian">
        <div className={cn("absolute inset-0 bg-gradient-to-br", template.gradient)} />
        <div className="absolute inset-0 bg-grid opacity-30" />

        {hover ? (
          <ScrollPreview kind={template.preview} accent={template.accent} />
        ) : (
          <StaticPreview kind={template.preview} accent={template.accent} />
        )}

        {/* chrome */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-glow/60" />
        </div>
        <span
          className="absolute right-3 top-3 rounded-full border border-white/12 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md"
          style={{ color: template.accent }}
        >
          {template.category}
        </span>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[17px] font-bold leading-snug text-offwhite">
            {template.title}
          </h3>
        </div>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
          {template.blurb}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Layers width={12} height={12} /> {template.scenes} scenes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock width={12} height={12} /> {template.duration}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2.5 border-t border-line/60 pt-4">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 !h-9 text-[12.5px]"
            icon={<Remix width={14} height={14} />}
          >
            Remix / Edit in Studio
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="!h-9 !px-3"
            aria-label={`Open ${template.title}`}
          >
            <ArrowRight width={15} height={15} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------------------------
   Static preview — shows the template's "poster" state
   ------------------------------------------------------------------------- */
function StaticPreview({ kind, accent }: { kind: Template["preview"]; accent: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center opacity-90">
      <div className="w-[70%]">
        <div className="mb-3 h-2 w-2/3 rounded-full bg-white/25" />
        <div className="mb-1.5 h-1.5 w-full rounded-full bg-white/12" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
        <PreviewGlyph kind={kind} accent={accent} animate={false} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Scroll preview — animates on hover as if the reader were scrolling
   ------------------------------------------------------------------------- */
function ScrollPreview({ kind, accent }: { kind: Template["preview"]; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      {/* simulated scroll scan */}
      <motion.div
        className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-white/6 to-transparent"
        animate={{ top: ["-20%", "110%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-[72%]">
          <motion.div
            className="mb-2.5 h-2 rounded-full"
            style={{ background: accent }}
            animate={{ width: ["38%", "72%", "52%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full bg-white/14"
                animate={{ opacity: [0.25, 0.85, 0.25], width: ["60%", "100%", "74%"] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
              />
            ))}
          </div>
          <PreviewGlyph kind={kind} accent={accent} animate />
        </div>
      </div>
    </motion.div>
  );
}

function PreviewGlyph({
  kind,
  accent,
  animate,
}: {
  kind: Template["preview"];
  accent: string;
  animate: boolean;
}) {
  const t = animate
    ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }
    : undefined;

  if (kind === "bars") {
    return (
      <div className="mt-3.5 flex h-10 items-end gap-1.5">
        {[0.45, 0.75, 0.55, 0.95, 0.7].map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: `linear-gradient(to top, ${accent}44, ${accent})` }}
            animate={animate ? { scaleY: [0.25, h, 0.4] } : { scaleY: h }}
            transition={animate ? { ...t, delay: i * 0.12 } : undefined}
            initial={{ scaleY: 0.2 }}
            whileInView={{ scaleY: h }}
            transformTemplate={({ scaleY }) => `scaleY(${scaleY})`}
            viewport={{ once: true }}
          />
        ))}
      </div>
    );
  }

  if (kind === "map") {
    const pts: [number, number][] = [
      [10, 30],
      [32, 14],
      [55, 26],
      [78, 10],
      [92, 24],
    ];
    const edges = pts.slice(0, -1).map((p, i) => [p, pts[i + 1]] as const);
    return (
      <svg viewBox="0 0 100 40" className="mt-3 h-10 w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            stroke={accent}
            strokeWidth={0.8}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            animate={animate ? { pathLength: [0, 1] } : undefined}
            transition={animate ? { ...t, delay: i * 0.18 } : { duration: 0.8 }}
          />
        ))}
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r={2}
            fill={accent}
            animate={animate ? { r: [1, 2.6, 1.8] } : undefined}
            transition={animate ? { ...t, delay: i * 0.18 } : undefined}
          />
        ))}
      </svg>
    );
  }

  if (kind === "orbit") {
    return (
      <div className="mt-3.5 grid h-12 place-items-center">
        <motion.div
          className="relative h-9 w-9 rounded-full"
          style={{ background: `radial-gradient(circle at 35% 30%, ${accent}, #0A0B0E 78%)` }}
          animate={animate ? { rotate: 360, scale: [1, 1.15, 1] } : undefined}
          transition={animate ? { rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: t } : undefined}
        >
          <div className="absolute -inset-3 rounded-full border border-dashed border-white/20" />
        </motion.div>
      </div>
    );
  }

  // timeline
  return (
    <div className="mt-3.5 flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-1 items-center gap-2">
          <motion.span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: accent }}
            animate={animate ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.25, 0.8] } : undefined}
            transition={animate ? { ...t, delay: i * 0.3 } : undefined}
          />
          {i < 3 && <span className="h-[1.5px] flex-1 bg-white/15" />}
        </div>
      ))}
    </div>
  );
}
