"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TemplateCard from "@/components/TemplateCard";
import { SHOWCASE_FILTERS, TEMPLATES, type TemplateCategory } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Grid, Layers } from "@/components/Icons";
import { ButtonLink } from "@/components/Button";

type Filter = TemplateCategory | "All";

const SORTS = ["Most remixed", "Newest", "Longest read"] as const;

export default function ShowcaseGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Most remixed");

  const filtered = useMemo(() => {
    const list = filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);
    if (sort === "Newest") return [...list].reverse();
    if (sort === "Longest read") {
      return [...list].sort(
        (a, b) => parseInt(b.duration, 10) - parseInt(a.duration, 10),
      );
    }
    return [...list].sort((a, b) => b.scenes - a.scenes);
  }, [filter, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-8">
      {/* ---------- Filter bar ---------- */}
      <div className="glass-panel sticky top-24 z-20 mb-10 flex flex-col gap-4 rounded-2xl p-3.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="ml-1.5 mr-2 hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint sm:flex">
            <Grid width={13} height={13} /> Filter
          </span>
          {SHOWCASE_FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200",
                  active ? "text-white" : "text-muted hover:text-offwhite",
                )}
              >
                {f.label}
                {active && (
                  <motion.span
                    layoutId="showcase-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-glow to-violet-glow shadow-[0_0_24px_-6px_rgba(99,102,241,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="tag-mono hidden sm:inline">Sort</span>
          <div className="flex items-center gap-1.5 rounded-full border border-line/70 bg-obsidian/40 p-1">
            {SORTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  sort === s ? "bg-white/8 text-offwhite" : "text-faint hover:text-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Result meta ---------- */}
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-xs text-faint">
          <span className="text-offwhite">{filtered.length}</span> templates
          {filter !== "All" && <> in <span className="text-indigo-glow">{filter}</span></>}
        </p>
        <p className="hidden font-mono text-xs text-faint md:block">
          Hover a card to preview its scroll behaviour
        </p>
      </div>

      {/* ---------- Card grid ---------- */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <TemplateCard template={t} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="glass-panel grid place-items-center rounded-3xl py-24 text-center">
          <Layers width={28} height={28} className="mb-4 text-faint" />
          <p className="font-display text-lg font-bold">No templates in this category yet</p>
          <p className="mt-2 text-sm text-muted">Try another filter, or start from scratch.</p>
          <ButtonLink href="/editor" className="mt-6" size="sm">
            Open Studio
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
