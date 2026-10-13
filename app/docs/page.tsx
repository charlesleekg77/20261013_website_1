import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";
import DocsGuide from "@/components/DocsGuide";
import ScrollySection, { type ScrollyStep } from "@/components/ScrollySection";
import Reveal, { SectionHeading } from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { Code, Bolt, Globe, Lock, ArrowRight, Layers } from "@/components/Icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Documentation & API Guide",
  description:
    "Export scrollytelling stories as embeddable web components, React useScrollStep hooks, or standalone HTML/CSS/JS bundles.",
};

const TOC = [
  { id: "quickstart", label: "Quickstart" },
  { id: "embed", label: "<scrolly-embed>" },
  { id: "hooks", label: "useScrollStep" },
  { id: "bundle", label: "Standalone bundle" },
  { id: "story-schema", label: "Story schema" },
  { id: "scrolly-live", label: "Live example" },
  { id: "changelog", label: "Changelog" },
];

const QUICKSTART = [
  {
    n: "01",
    title: "Design in the Studio",
    body: "Compose your scenes on the split-screen timeline, bind each to a scroll trigger, and preview it in-frame.",
    cmd: "studio → publish",
  },
  {
    n: "02",
    title: "Choose an export target",
    body: "Web component for CMSs, a React hook for app-scale control, or a self-contained bundle for any host.",
    cmd: "embed | hooks | bundle",
  },
  {
    n: "03",
    title: "Paste one line",
    body: "Every target ships as a single copy-pasteable snippet. No build step, no bundler config, no runtime deps.",
    cmd: "npx scrolly init",
  },
];

const SCHEMA_ROWS = [
  { field: "id", type: "string", desc: "Stable identifier for the step, used in events." },
  { field: "title", type: "string", desc: "Pinned headline rendered inside the scene." },
  { field: "trigger", type: "number", desc: "Offset 0–1 across the pinned track where the step activates." },
  { field: "pinDuration", type: "number", desc: "Viewport heights the scene stays pinned for." },
  { field: "easing", type: "string", desc: "GSAP easing token, e.g. power2.out, expo.out." },
  { field: "media.kind", type: "enum", desc: "video | image | chart | three | lottie." },
  { field: "media.src", type: "string", desc: "Asset URL, resolved against your media host." },
];

const STEPS: ScrollyStep[] = [
  {
    tag: "docs live demo",
    title: "This section is a real StoryStep array.",
    body: "The array literal you just read in the schema table is what renders this pinned block — text held in place while the backdrop tracks scrollProgress.",
  },
  {
    tag: "step 02",
    title: "Every export target reads the same object.",
    body: "Whether you ship a web component, a React hook or a static bundle, the runtime consumes one normalized story document.",
  },
  {
    tag: "step 03",
    title: "Scroll percentage is a first-class API value.",
    body: "Bind counters, chapter rails and analytics to scrollProgress and they stay frame-accurate on every device.",
  },
];

export default function DocsPage() {
  return (
    <>
      <ScrollTracker />
      <Navbar />

      <main className="relative pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]">
          <div className="absolute left-1/4 top-0 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-glow/12 blur-[140px]" />
          <div className="absolute right-1/4 top-10 h-[22rem] w-[32rem] rounded-full bg-indigo-glow/12 blur-[140px]" />
          <div className="absolute inset-0 bg-grid opacity-25" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-14 md:px-8">
          <SectionHeading
            eyebrow="Documentation & API"
            title={
              <>
                Export once. Ship it
                <br className="hidden sm:block" /> <span className="text-gradient">anywhere.</span>
              </>
            }
            body="Three first-class export targets, one scroll engine. Copy a snippet, drop it in, and your story runs at 60fps with the same pinned mechanics you authored in the Studio."
          />
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 md:px-8 lg:grid-cols-[15rem_1fr]">
          {/* ---------------- Sidebar TOC ---------------- */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="tag-mono mb-4">On this page</p>
              <ul className="space-y-1 border-l border-line/60">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`#${t.id}`}
                      className="group flex items-center gap-2 border-l-2 border-transparent py-1.5 pl-4 -ml-px text-[13px] text-muted transition-all hover:border-indigo-glow hover:text-offwhite"
                    >
                      <span className="font-mono text-[10px] text-faint group-hover:text-indigo-glow">
                        #
                      </span>
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="glass-panel mt-8 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Bolt width={14} height={14} className="text-emerald-glow" />
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">
                    API status
                  </span>
                </div>
                <p className="mt-2.5 text-[12px] leading-relaxed text-muted">
                  v3 stable · 99.99% uptime · edge-cached CDN
                </p>
                <Link
                  href="/showcase"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] text-indigo-glow hover:underline"
                >
                  Browse templates <ArrowRight width={13} height={13} />
                </Link>
              </div>
            </nav>
          </aside>

          {/* ---------------- Content ---------------- */}
          <div className="min-w-0">
            {/* Quickstart */}
            <section id="quickstart" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-bold">Quickstart</h2>
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                From a blank timeline to a published story in about five minutes.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {QUICKSTART.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.07}>
                    <div className="h-full rounded-2xl border border-line/70 bg-canvas/40 p-5">
                      <span className="font-mono text-[11px] text-indigo-glow">{s.n}</span>
                      <h3 className="mt-3 font-display text-[15px] font-bold">{s.title}</h3>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{s.body}</p>
                      <code className="mt-4 block rounded-lg bg-obsidian/70 px-2.5 py-2 font-mono text-[10.5px] text-emerald-glow">
                        {s.cmd}
                      </code>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Export targets */}
            <section id="exports" className="mt-16 scroll-mt-32">
              <h2 className="font-display text-2xl font-bold">Export targets</h2>
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Pick a target, copy the snippet, and wire it up. Interactive samples below — click a
                tab to switch files.
              </p>
              <div className="mt-7">
                <DocsGuide />
              </div>
            </section>

            {/* Story schema */}
            <section id="story-schema" className="mt-16 scroll-mt-32">
              <h2 className="font-display text-2xl font-bold">Story schema</h2>
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Every export target consumes the same normalized document. A step maps to one pinned
                scene on the timeline.
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-line/70">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-obsidian/50">
                      <th className="px-4 py-3 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                        Field
                      </th>
                      <th className="px-4 py-3 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                        Type
                      </th>
                      <th className="hidden px-4 py-3 font-mono text-[10.5px] uppercase tracking-wider text-faint sm:table-cell">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEMA_ROWS.map((r, i) => (
                      <tr
                        key={r.field}
                        className={cn(
                          "border-t border-line/50",
                          i % 2 === 1 && "bg-canvas/30",
                        )}
                      >
                        <td className="px-4 py-3 font-mono text-[12px] text-indigo-glow">
                          {r.field}
                        </td>
                        <td className="px-4 py-3 font-mono text-[12px] text-emerald-glow">
                          {r.type}
                        </td>
                        <td className="hidden px-4 py-3 text-[12.5px] text-muted sm:table-cell">
                          {r.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Globe, label: "Edge-hosted media", value: "120 PoPs" },
                  { icon: Lock, label: "Signed embeds", value: "HMAC-SHA256" },
                  { icon: Layers, label: "Bundle size", value: "38 KB gzip" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 rounded-xl border border-line/70 bg-canvas/40 p-4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/6 text-indigo-glow">
                      <f.icon width={16} height={16} />
                    </span>
                    <span>
                      <span className="block font-mono text-[12px] text-offwhite">{f.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        {f.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ---------------- Live scrolly example ---------------- */}
        <div id="scrolly-live" className="mt-20 scroll-mt-24">
          <div className="mx-auto max-w-[1400px] px-6 pb-10 md:px-8">
            <SectionHeading
              eyebrow="Live example"
              title={
                <>
                  Scroll it. <span className="text-gradient">That's the API.</span>
                </>
              }
              body="This is a real pinned track built from a StoryStep array — the same primitive every export target renders."
            />
          </div>
          <ScrollySection
            id="docs-live-track"
            index={0}
            eyebrow="<scrolly-embed> · live"
            steps={STEPS}
            accent="violet"
            mediaKind="charts"
          />
        </div>

        {/* Changelog */}
        <section id="changelog" className="mx-auto mt-20 max-w-[1400px] scroll-mt-32 px-6 md:px-8">
          <h2 className="font-display text-2xl font-bold">Changelog</h2>
          <ul className="mt-6 space-y-4">
            {[
              { v: "3.0.0", date: "this release", note: "Unified story schema across all three export targets; mobile swipe fallback." },
              { v: "2.6.0", date: "prior", note: "Lottie asset pipeline and per-step easing tokens." },
              { v: "2.0.0", date: "prior", note: "react-three-fiber scenes bound directly to scrollProgress." },
            ].map((c) => (
              <li
                key={c.v}
                className="flex flex-col gap-2 rounded-xl border border-line/70 bg-canvas/40 p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="font-mono text-[12px] font-semibold text-indigo-glow">v{c.v}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint sm:w-24">
                  {c.date}
                </span>
                <span className="text-[13px] text-muted">{c.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <CTABand
          eyebrow="Ready to export?"
          title="Ship your first embed this afternoon."
          body="Open the Studio, publish a story, and paste the snippet into any page you own."
        />
      </main>

      <Footer />
    </>
  );
}
