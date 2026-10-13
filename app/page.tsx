import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SectionRail from "@/components/SectionRail";
import ScrollTracker from "@/components/ScrollTracker";
import ScrollyHero from "@/components/ScrollyHero";
import ScrollySection, { type ScrollyStep } from "@/components/ScrollySection";
import PlatformModules from "@/components/PlatformModules";
import TemplateCarousel from "@/components/TemplateCarousel";
import PricingMatrix from "@/components/PricingMatrix";
import CTABand from "@/components/CTABand";
import Reveal, { SectionHeading } from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

/* --------------------------------------------------------------------------
   Sticky section copy
   -------------------------------------------------------------------------- */
const MEDIA_STEPS: ScrollyStep[] = [
  {
    tag: "pin 01",
    title: "Copy holds still. The world moves behind it.",
    body: "Pinned text blocks stay anchored to the viewport while hosted images and video cross-fade underneath — driven purely by scroll distance, never by a timer.",
  },
  {
    tag: "pin 02",
    title: "Depth through layered parallax.",
    body: "Foreground, midground and background media move at different rates. The reader's scroll becomes the camera dolly through a flat page.",
  },
  {
    tag: "pin 03",
    title: "Every layer, scrubbed to the pixel.",
    body: "ScrollTrigger drives opacity, scale and transform in lockstep. Frame-accurate on a 120Hz display, still crisp when the reader slams the trackpad.",
  },
];

const CHART_STEPS: ScrollyStep[] = [
  {
    tag: "step 01",
    title: "Charts that build themselves as you read.",
    body: "Bars rise from the baseline once their trigger enters the viewport, easing into place just behind the reveal of the caption.",
  },
  {
    tag: "step 02",
    title: "Map nodes connect in sequence.",
    body: "Each edge draws a path from its origin node to the next, letting geography tell the story before a single label is read.",
  },
  {
    tag: "step 03",
    title: "Numbers that resolve with progress.",
    body: "Live counters, annotations and unit labels animate on the same scroll clock — so the data and the prose never drift apart.",
  },
];

const MODEL_STEPS: ScrollyStep[] = [
  {
    tag: "scrollProgress 0.00",
    title: "A scene bound to the scrollbar.",
    body: "Feed scrollProgress straight into a react-three-fiber useFrame loop. Rotation, tilt and camera dolly all read from a single normalised value.",
  },
  {
    tag: "scrollProgress 0.50",
    title: "Rotate, orbit, expose the detail.",
    body: "The core spins through a full turn while a wireframe shell counter-rotates — an exploded-product-view you can scrub back and forth.",
  },
  {
    tag: "scrollProgress 1.00",
    title: "Shards scatter. Story lands.",
    body: "Approaching the end of the track, the outer geometry bursts outward and the narrative resolves into a call to action.",
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollTracker />
      <Navbar />
      <SectionRail />

      <main className="relative">
        {/* ================= HERO ================= */}
        <ScrollyHero />
        <Marquee />

        {/* ================= PLATFORM — PINNED SECTIONS ================= */}
        <section id="platform" className="relative">
          <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-10 md:px-8 md:pt-32">
            <SectionHeading
              eyebrow="The platform"
              title={
                <>
                  Three pinned mechanics.
                  <br className="hidden sm:block" />{" "}
                  <span className="text-gradient">One continuous scroll.</span>
                </>
              }
              body="Scroll through the next three chapters. Each one is a live, production-grade module — the same code you'd export from the Studio."
            />
          </div>

          {/* Sticky Section 1 — Pinned text & dynamic media */}
          <ScrollySection
            id="pinned-media"
            index={0}
            eyebrow="Module 01 · Pinned Text & Dynamic Media"
            accent="indigo"
            steps={MEDIA_STEPS}
            mediaKind="kinetic"
          />

          {/* Sticky Section 2 — Data visualization & charts */}
          <ScrollySection
            id="dataviz"
            index={1}
            eyebrow="Module 02 · Data Visualization & Charts"
            accent="emerald"
            steps={CHART_STEPS}
            mediaKind="charts"
          />

          {/* Sticky Section 3 — 3D model explosion / rotation */}
          <ScrollySection
            id="models"
            index={2}
            eyebrow="Module 03 · 3D Rotation & Explosion"
            accent="violet"
            steps={MODEL_STEPS}
            mediaKind="three"
            cameraAngle={24}
          />
        </section>

        {/* ================= MODULES GRID ================= */}
        <PlatformModules />

        {/* ================= TEMPLATES CAROUSEL ================= */}
        <section id="templates" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Templates & examples"
              title={
                <>
                  Start from a format that
                  <br className="hidden sm:block" /> <span className="text-gradient">already tells a story.</span>
                </>
              }
              body="Pre-built scrollytelling formats — data journalism, launch keynotes, case studies, annual reports and educational timelines. Remix any one in the Studio."
            />
            <Reveal>
              <Link
                href="/showcase"
                className="group inline-flex items-center gap-2 rounded-full border border-line/80 px-5 py-2.5 text-sm text-muted transition-colors hover:border-indigo-glow/40 hover:text-offwhite"
              >
                Browse the gallery
                <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14">
            <TemplateCarousel />
          </div>
        </section>

        {/* ================= SHOWCASE STRIP ================= */}
        <section id="showcase" className="relative border-y border-line/50 bg-canvas/30">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-28">
            <SectionHeading
              align="center"
              eyebrow="Showcase"
              title={
                <>
                  Stories our community <span className="text-gradient">published this week.</span>
                </>
              }
              body="Real scroll stories, built and shipped from the Studio — no custom engineering required."
            />

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                {
                  outlet: "The Meridian",
                  title: "60 Years of Migration, One Scroll",
                  metric: "4.2M reads",
                  accent: "#10B981",
                },
                {
                  outlet: "Northwind Labs",
                  title: "Inside the Nova Hardware Reveal",
                  metric: "38% CTR",
                  accent: "#6366F1",
                },
                {
                  outlet: "Atlas University",
                  title: "The Anatomy of a Glacier",
                  metric: "92% completion",
                  accent: "#8B5CF6",
                },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <article className="glass-panel group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-glow/30">
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                      style={{ color: s.accent }}
                    >
                      {s.outlet}
                    </span>
                    <h3 className="mt-4 font-display text-[20px] font-bold leading-snug text-offwhite">
                      {s.title}
                    </h3>
                    <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-5">
                      <span className="font-mono text-xs text-faint">{s.metric}</span>
                      <ArrowRight
                        width={16}
                        height={16}
                        className="text-muted transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section id="pricing" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={
              <>
                Start free. Scale when the
                <br className="hidden sm:block" /> <span className="text-gradient">story earns it.</span>
              </>
            }
            body="Every plan includes the full scroll engine — pinning, charts, 3D and export. Upgrade for domain, hosting and team features."
          />
          <div className="mt-16">
            <PricingMatrix />
          </div>

          <Reveal>
            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              All plans include a 14-day Pro trial · Cancel anytime
            </p>
          </Reveal>
        </section>

        {/* ================= CTA ================= */}
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
