import { cn } from "@/lib/cn";

const ITEMS = [
  "GSAP ScrollTrigger",
  "react-three-fiber",
  "Framer Motion",
  "Lottie",
  "WebGL Shaders",
  "D3 Charts",
  "Pinned Sections",
  "Scroll Progress",
  "Custom Domains",
  "Embeddable Components",
];

/** Infinite logo/tech marquee — runs under the hero to signal the toolchain. */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line/50 bg-canvas/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-12">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-12" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <span
                key={item + dup}
                className={cn(
                  "flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-faint",
                )}
              >
                <span className="h-1 w-1 rounded-full bg-indigo-glow/70" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
