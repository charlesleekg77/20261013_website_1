"use client";

import { useState } from "react";
import { useStoryStore, type EasingCurve } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Cube, Code, Layers, Sparkle, Chart, Plus, Check } from "@/components/Icons";

const EASINGS: EasingCurve[] = ["linear", "power2.out", "power3.inOut", "expo.out", "back.out"];

const MEDIA = [
  { name: "aerial-orbit.mp4", type: "video", size: "48.2 MB" },
  { name: "product-loop.webm", type: "video", size: "22.9 MB" },
  { name: "market-growth.lottie.json", type: "lottie", size: "412 KB" },
  { name: "turbine.glb", type: "three", size: "6.1 MB" },
  { name: "hero-poster.webp", type: "image", size: "1.8 MB" },
];

const MEDIA_ICON: Record<string, typeof Layers> = {
  video: Layers,
  lottie: Sparkle,
  three: Cube,
  image: Chart,
};

/** Right panel — inspector controls for camera, easing, type and assets. */
export default function InspectorPanel() {
  const inspector = useStoryStore((s) => s.inspector);
  const setInspector = useStoryStore((s) => s.setInspector);
  const [tab, setTab] = useState<"inspector" | "media">("inspector");

  return (
    <div className="flex h-full flex-col">
      {/* tabs */}
      <div className="grid grid-cols-2 gap-1 border-b border-line/60 p-2">
        {(["inspector", "media"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-3 py-2 text-[12.5px] font-medium capitalize transition-colors",
              tab === t ? "bg-white/8 text-offwhite" : "text-faint hover:text-muted",
            )}
          >
            {t === "inspector" ? "Inspector" : "Media Library"}
          </button>
        ))}
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto p-4">
        {tab === "inspector" ? (
          <div className="space-y-5">
            <Group title="Camera" icon={Cube}>
              <Slider
                label="Angle"
                value={inspector.cameraAngle}
                min={0}
                max={80}
                step={1}
                suffix="°"
                onChange={(v) => setInspector({ cameraAngle: v })}
              />
              <Slider
                label="Parallax depth"
                value={inspector.parallaxDepth}
                min={0}
                max={1}
                step={0.05}
                onChange={(v) => setInspector({ parallaxDepth: v })}
              />
            </Group>

            <Group title="Transition" icon={Sparkle}>
              <span className="tag-mono">Easing curve</span>
              <div className="mt-2 grid grid-cols-1 gap-1.5">
                {EASINGS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setInspector({ transitionEasing: e })}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[11px] transition-colors",
                      inspector.transitionEasing === e
                        ? "border-indigo-glow/50 bg-indigo-glow/10 text-offwhite"
                        : "border-line/60 text-muted hover:border-white/15 hover:text-offwhite",
                    )}
                  >
                    {e}
                    {inspector.transitionEasing === e && (
                      <Check width={13} height={13} className="text-indigo-glow" />
                    )}
                  </button>
                ))}
              </div>
            </Group>

            <Group title="Typography" icon={Code}>
              <Slider
                label="Base size"
                value={inspector.fontSize}
                min={12}
                max={24}
                step={1}
                suffix="px"
                onChange={(v) => setInspector({ fontSize: v })}
              />
              <Slider
                label="Heading weight"
                value={inspector.fontWeight}
                min={400}
                max={800}
                step={100}
                onChange={(v) => setInspector({ fontWeight: v })}
              />
            </Group>

            <Group title="Overlays" icon={Layers}>
              <Toggle
                label="Show layout grid"
                checked={inspector.showGrid}
                onChange={(v) => setInspector({ showGrid: v })}
              />
              <Toggle
                label="Scene lighting"
                checked={inspector.lightsEnabled}
                onChange={(v) => setInspector({ lightsEnabled: v })}
              />
            </Group>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line/80 py-7 transition-colors hover:border-indigo-glow/50 hover:bg-indigo-glow/5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/6 text-muted transition-colors group-hover:text-indigo-glow">
                <Plus width={16} height={16} />
              </span>
              <span className="text-[12.5px] font-medium text-muted group-hover:text-offwhite">
                Upload media
              </span>
              <span className="font-mono text-[10px] text-faint">
                MP4 · WebM · Lottie JSON · GLB · WebP
              </span>
            </button>

            <div>
              <span className="tag-mono">Project assets</span>
              <ul className="mt-2.5 space-y-1.5">
                {MEDIA.map((m) => {
                  const Icon = MEDIA_ICON[m.type] ?? Layers;
                  return (
                    <li
                      key={m.name}
                      className="group flex items-center gap-3 rounded-lg border border-line/60 bg-canvas/40 px-3 py-2.5 transition-colors hover:border-white/15"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-md bg-white/6 text-muted group-hover:text-indigo-glow">
                        <Icon width={14} height={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-mono text-[11px] text-offwhite">
                          {m.name}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-faint">
                          {m.type} · {m.size}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-xl border border-line/60 bg-canvas/40 p-3.5">
              <span className="tag-mono">Three.js / Lottie settings</span>
              <div className="mt-3 space-y-3">
                <Toggle
                  label="HDR environment"
                  checked={inspector.lightsEnabled}
                  onChange={(v) => setInspector({ lightsEnabled: v })}
                />
                <Toggle
                  label="Lottie autoplay on pin"
                  checked
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ pieces */
function Group({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Layers;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line/60 bg-canvas/40 p-3.5">
      <header className="mb-3 flex items-center gap-2">
        <Icon width={14} height={14} className="text-indigo-glow" />
        <h4 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
          {title}
        </h4>
      </header>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="text-[12px] text-muted">{label}</span>
        <span className="font-mono text-[10.5px] text-indigo-glow tabular-nums">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-indigo-glow"
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-[12px] text-muted">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          checked ? "bg-gradient-to-r from-indigo-glow to-violet-glow" : "bg-white/12",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  );
}
