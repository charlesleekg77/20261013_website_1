"use client";

import { useState } from "react";
import { Reorder, motion } from "framer-motion";
import { useStoryStore, formatTrigger, type EasingCurve } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Grip, Plus, Trash, Lock, Eye } from "@/components/Icons";

const EASINGS: EasingCurve[] = ["linear", "power2.out", "power3.inOut", "expo.out", "back.out"];

/**
 * Left panel — the story timeline. Scenes are reorderable; selecting one drives
 * the inspector, and editing its trigger / pin duration updates the store the
 * canvas reads from.
 */
export default function TimelinePanel() {
  const steps = useStoryStore((s) => s.steps);
  const activeStepIndex = useStoryStore((s) => s.activeStepIndex);
  const setActiveStep = useStoryStore((s) => s.setActiveStep);
  const updateStep = useStoryStore((s) => s.updateStep);
  const removeStep = useStoryStore((s) => s.removeStep);
  const addStep = useStoryStore((s) => s.addStep);
  const reorderSteps = useStoryStore((s) => s.reorderSteps);
  const sectionProgress = useStoryStore((s) => s.sectionProgress);
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id ?? null);

  const active = steps[activeStepIndex];

  return (
    <div className="flex h-full flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div>
          <h3 className="font-display text-[13.5px] font-bold text-offwhite">Story Timeline</h3>
          <p className="tag-mono mt-0.5">{steps.length} scenes · block outline</p>
        </div>
        <button
          type="button"
          onClick={() => addStep()}
          className="glass-panel grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:text-offwhite hover:border-indigo-glow/40"
          aria-label="Add scene"
        >
          <Plus width={15} height={15} />
        </button>
      </div>

      {/* Scroll ruler */}
      <div className="relative border-b border-line/60 px-4 py-3">
        <div className="flex items-center justify-between font-mono text-[9.5px] text-faint">
          {["0%", "25%", "50%", "75%", "100%"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="relative mt-2 h-8 rounded-lg bg-obsidian/70 ring-1 ring-inset ring-white/5">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(steps.indexOf(s))}
              title={`${s.title} @ ${formatTrigger(s.trigger)}`}
              className={cn(
                "absolute top-1 h-6 rounded-md px-1.5 text-left font-mono text-[9px] transition-all",
                active?.id === s.id
                  ? "bg-gradient-to-r from-indigo-glow to-violet-glow text-white shadow-[0_0_18px_-4px_rgba(139,92,246,0.9)]"
                  : "bg-white/8 text-muted hover:bg-white/14",
              )}
              style={{
                left: `calc(${s.trigger * 100}% + 2px)`,
                width: `calc(${Math.min(30, s.pinDuration * 18)}% - 4px)`,
              }}
            >
              {formatTrigger(s.trigger)}
            </button>
          ))}
          {/* playhead */}
          <div
            className="pointer-events-none absolute -top-1 bottom-[-0.25rem] w-px bg-emerald-glow shadow-[0_0_10px_0_rgba(16,185,129,0.9)]"
            style={{ left: `${sectionProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Scene list */}
      <Reorder.Group
        axis="y"
        values={steps}
        onReorder={(next) => {
          const from = steps.findIndex((s) => s.id === next[0]?.id);
          if (from >= 0) reorderSteps(from, next.indexOf(steps[0]));
        }}
        className="no-scrollbar flex-1 overflow-y-auto p-3"
      >
        {steps.map((step, i) => {
          const isActive = i === activeStepIndex;
          const expanded = openId === step.id;
          return (
            <Reorder.Item
              key={step.id}
              value={step}
              className={cn(
                "group mb-2 rounded-xl border transition-colors",
                isActive
                  ? "border-indigo-glow/45 bg-indigo-glow/8"
                  : "border-line/60 bg-canvas/40 hover:border-white/15",
              )}
            >
              <div className="flex items-center gap-2 p-2.5">
                <span className="cursor-grab text-faint active:cursor-grabbing">
                  <Grip width={14} height={14} />
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className="flex-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-[13px] font-medium",
                        isActive ? "text-offwhite" : "text-muted",
                      )}
                    >
                      {step.title}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2.5 font-mono text-[9.5px] text-faint">
                    <span>trigger {formatTrigger(step.trigger)}</span>
                    <span className="h-2.5 w-px bg-line" />
                    <span>pin {step.pinDuration}vh</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenId(expanded ? null : step.id)}
                  aria-label="Toggle step settings"
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-md text-faint transition-colors hover:text-offwhite",
                    expanded && "bg-white/8 text-offwhite",
                  )}
                >
                  <span className="text-[15px] leading-none">{expanded ? "−" : "+"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  aria-label={`Delete ${step.title}`}
                  className="grid h-6 w-6 place-items-center rounded-md text-faint opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash width={13} height={13} />
                </button>
              </div>

              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden border-t border-line/50 px-3 pb-3 pt-2.5"
                >
                  <label className="block">
                    <span className="tag-mono">Trigger offset</span>
                    <input
                      type="range"
                      min={0}
                      max={0.95}
                      step={0.05}
                      value={step.trigger}
                      onChange={(e) =>
                        updateStep(step.id, { trigger: parseFloat(e.target.value) })
                      }
                      className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-indigo-glow"
                    />
                    <span className="mt-1 block text-right font-mono text-[10px] text-indigo-glow">
                      {formatTrigger(step.trigger)}
                    </span>
                  </label>

                  <label className="mt-3 block">
                    <span className="tag-mono">Pin duration ({step.pinDuration}vh)</span>
                    <input
                      type="range"
                      min={0.5}
                      max={3}
                      step={0.5}
                      value={step.pinDuration}
                      onChange={(e) =>
                        updateStep(step.id, { pinDuration: parseFloat(e.target.value) })
                      }
                      className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-glow"
                    />
                  </label>

                  <div className="mt-3">
                    <span className="tag-mono">Easing</span>
                    <select
                      value={step.easing}
                      onChange={(e) =>
                        updateStep(step.id, { easing: e.target.value as EasingCurve })
                      }
                      className="mt-2 w-full rounded-lg border border-line/70 bg-obsidian/70 px-2.5 py-2 font-mono text-[11px] text-offwhite outline-none focus:border-indigo-glow/50"
                    >
                      {EASINGS.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {/* Footer hint */}
      <div className="flex items-center gap-2 border-t border-line/60 px-4 py-3">
        <Lock width={13} height={13} className="text-faint" />
        <span className="font-mono text-[10px] text-faint">
          Draft autosaved · scroll triggers locked to track
        </span>
      </div>
    </div>
  );
}
