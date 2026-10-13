"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Code, Layers, Sparkle, Cube, Check, ArrowRight } from "@/components/Icons";

/* ============================================================================
   Interactive developer guide — three export targets, each with a live tabbed
   code sample. Copy buttons are wired so the snippets are usable immediately.
   ========================================================================== */

type Export = "embed" | "hooks" | "bundle";

const EXPORTS: { id: Export; label: string; blurb: string; icon: typeof Code }[] = [
  {
    id: "embed",
    label: "<scrolly-embed>",
    blurb: "Drop a web component into any CMS, newsletter or static page.",
    icon: Layers,
  },
  {
    id: "hooks",
    label: "useScrollStep",
    blurb: "Drive your own React components from the story's scroll state.",
    icon: Sparkle,
  },
  {
    id: "bundle",
    label: "Standalone bundle",
    blurb: "A single HTML/CSS/JS folder you can host anywhere.",
    icon: Cube,
  },
];

const SNIPPETS: Record<Export, { file: string; lang: string; code: string }[]> = {
  embed: [
    {
      file: "index.html",
      lang: "html",
      code: `<!-- 1. Load the embed once, anywhere on the page -->
<script type="module"
  src="https://cdn.scrollytelling.ai/embed/v3/scrolly-embed.js"></script>

<!-- 2. Place the story. Everything is driven by the story id. -->
<scrolly-embed
  story-id="tpl-climate"
  height="100vh"
  progress-rail="right"
  theme="obsidian"
  mobile-fallback="swipe"
></scrolly-embed>`,
    },
    {
      file: "custom-element.d.ts",
      lang: "ts",
      code: `declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "scrolly-embed": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "story-id": string;
          height?: string;
          "progress-rail"?: "left" | "right" | "none";
          theme?: "obsidian" | "canvas" | "light";
          "mobile-fallback"?: "swipe" | "static";
        },
        HTMLElement
      >;
    }
  }
}`,
    },
  ],
  hooks: [
    {
      file: "useScrollStep.ts",
      lang: "ts",
      code: `import { useEffect, useState } from "react";

export interface ScrollStepState {
  /** Active scene index within the story, 0-based. */
  step: number;
  /** Progress through the whole story, 0 → 1. */
  progress: number;
  /** Progress through the currently pinned scene, 0 → 1. */
  sectionProgress: number;
}

/**
 * Subscribes to the scroll state of a mounted <scrolly-embed> and re-renders
 * your component whenever the reader crosses a scene boundary.
 */
export function useScrollStep(storyId: string): ScrollStepState {
  const [state, setState] = useState<ScrollStepState>({
    step: 0,
    progress: 0,
    sectionProgress: 0,
  });

  useEffect(() => {
    const el = document.querySelector(\`scrolly-embed[story-id="\${storyId}"]\`);
    if (!el) return;

    const onStep = (e: Event) => {
      const detail = (e as CustomEvent<ScrollStepState>).detail;
      setState(detail);
    };

    el.addEventListener("scrolly:step", onStep);
    return () => el.removeEventListener("scrolly:step", onStep);
  }, [storyId]);

  return state;
}`,
    },
    {
      file: "LiveCounter.tsx",
      lang: "tsx",
      code: `"use client";

import { useScrollStep } from "./useScrollStep";

/** A headline figure that resolves as the reader scrolls the story. */
export function LiveCounter() {
  const { progress, step } = useScrollStep("tpl-climate");
  const value = Math.round(12840 * progress);

  return (
    <div className="fixed bottom-6 left-6 font-mono text-xs">
      <div className="text-offwhite tabular-nums">{value.toLocaleString()}</div>
      <div className="text-muted">scene {step + 1} · {(progress * 100).toFixed(0)}%</div>
    </div>
  );
}`,
    },
  ],
  bundle: [
    {
      file: "story.json",
      lang: "json",
      code: `{
  "id": "tpl-climate",
  "theme": "obsidian",
  "steps": [
    {
      "id": "step-01",
      "title": "The Warming Line",
      "trigger": 0.0,
      "pinDuration": 1.5,
      "easing": "power2.out",
      "media": { "kind": "video", "src": "media/glacier.mp4" }
    },
    {
      "id": "step-02",
      "title": "Ninety Years of Data",
      "trigger": 0.35,
      "pinDuration": 1,
      "easing": "expo.out",
      "media": { "kind": "chart", "src": "data/temperature.json" }
    }
  ]
}`,
    },
    {
      file: "embed.html",
      lang: "html",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./scrolly.css" />
  </head>
  <body>
    <!-- The runtime reads story.json and builds the pinned tracks. -->
    <div id="scrolly-root" data-story="./story.json"></div>
    <script type="module" src="./scrolly.js"></script>
  </body>
</html>`,
    },
  ],
};

export default function DocsGuide() {
  const [active, setActive] = useState<Export>("embed");
  const [tabIndex, setTabIndex] = useState(0);
  const snippet = SNIPPETS[active][Math.min(tabIndex, SNIPPETS[active].length - 1)];

  const pick = (id: Export) => {
    setActive(id);
    setTabIndex(0);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-8">
      {/* ---------------- Export target selector ---------------- */}
      <div className="grid gap-4 md:grid-cols-3">
        {EXPORTS.map((e) => {
          const isActive = active === e.id;
          return (
            <button
              key={e.id}
              type="button"
              id={e.id}
              onClick={() => pick(e.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                isActive
                  ? "border-indigo-glow/50 bg-indigo-glow/8"
                  : "border-line/70 bg-canvas/40 hover:border-white/15",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                    isActive ? "bg-indigo-glow/20 text-indigo-glow" : "bg-white/6 text-muted",
                  )}
                >
                  <e.icon width={17} height={17} />
                </span>
                {isActive && <Check width={15} height={15} className="text-indigo-glow" />}
              </div>
              <h3 className="mt-4 font-mono text-[13px] font-semibold text-offwhite">{e.label}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{e.blurb}</p>
            </button>
          );
        })}
      </div>

      {/* ---------------- Code panel ---------------- */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-line/70 bg-canvas/50">
        {/* tab bar */}
        <div className="flex items-center justify-between gap-4 border-b border-line/60 bg-obsidian/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            {SNIPPETS[active].map((s, i) => (
              <button
                key={s.file}
                type="button"
                onClick={() => setTabIndex(i)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-mono text-[11.5px] transition-colors",
                  snippet.file === s.file
                    ? "bg-white/8 text-offwhite"
                    : "text-faint hover:text-muted",
                )}
              >
                {s.file}
              </button>
            ))}
          </div>
          <CopyButton text={snippet.code} />
        </div>

        {/* code */}
        <AnimatePresence mode="wait">
          <motion.pre
            key={snippet.file}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="no-scrollbar overflow-x-auto p-5"
          >
            <code className="block font-mono text-[12.5px] leading-relaxed">
              {snippet.code.split("\n").map((line, i) => (
                <span key={i} className="flex">
                  <span className="mr-5 w-6 shrink-0 select-none text-right text-faint/60">
                    {i + 1}
                  </span>
                  <span className={highlightClass(line)}>{line || " "}</span>
                </span>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>

        {/* footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 bg-obsidian/40 px-5 py-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {snippet.lang} · scrollytelling api v3
          </span>
          <span className="flex items-center gap-2 font-mono text-[10.5px] text-emerald-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow" />
            works with Next.js, Astro, SvelteKit, plain HTML
          </span>
        </div>
      </div>
    </div>
  );
}

/** Extremely light token tinting — enough to read, no syntax-highlighter dep. */
function highlightClass(line: string) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("<!--") || trimmed.startsWith("*")) {
    return "text-faint italic";
  }
  if (trimmed.startsWith("import") || trimmed.startsWith("export") || trimmed.startsWith("declare")) {
    return "text-violet-glow";
  }
  if (trimmed.startsWith("<")) return "text-indigo-glow/90";
  return "text-offwhite/85";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable — silently ignore */
        }
      }}
      className="flex items-center gap-1.5 rounded-lg border border-line/70 px-2.5 py-1.5 font-mono text-[10.5px] text-muted transition-colors hover:border-indigo-glow/40 hover:text-offwhite"
    >
      {copied ? (
        <>
          <Check width={12} height={12} className="text-emerald-glow" /> copied
        </>
      ) : (
        <>
          <Code width={12} height={12} /> copy
        </>
      )}
    </button>
  );
}

/* Re-exported for the surrounding page so it can render anchors. */
export function DocAnchor({ id, children }: { id: string; children: ReactNode }) {
  return <span id={id}>{children}</span>;
}

export { ArrowRight };
