import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";
import PricingMatrix from "@/components/PricingMatrix";
import CTABand from "@/components/CTABand";
import Reveal, { SectionHeading } from "@/components/Reveal";
import { Check, Lock, Globe, Bolt, Code } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free / Creator, Pro at $29/mo, and Enterprise. Unlimited stories, custom domain export, high-res media hosting and API access.",
};

const COMPARISON = [
  { feature: "Public scrolly stories", free: "3", pro: "Unlimited", ent: "Unlimited" },
  { feature: "Scrollytelling watermark", free: "Included", pro: "Removed", ent: "Removed" },
  { feature: "Custom domain export", free: "—", pro: "Yes", ent: "Yes" },
  { feature: "High-res media hosting", free: "720p", pro: "4K / 60fps", ent: "4K / 60fps + CDN" },
  { feature: "3D / WebGL integration", free: "Standard", pro: "Advanced", ent: "Custom" },
  { feature: "Analytics", free: "Standard", pro: "Funnels + cohorts", ent: "Warehouse export" },
  { feature: "API access", free: "—", pro: "Read", ent: "Full" },
  { feature: "Team collaboration", free: "—", pro: "3 seats", ent: "Unlimited + roles" },
  { feature: "Onboarding", free: "Docs", pro: "Priority support", ent: "White-glove" },
];

const FAQ = [
  {
    q: "What counts as a story?",
    a: "One published scrollytelling document with its own URL, scroll track and pinned scenes. Drafts are unlimited on every plan.",
  },
  {
    q: "Does the watermark appear on Pro?",
    a: "No. Pro removes the Scrollytelling badge from the progress rail, the end card and the embed chrome.",
  },
  {
    q: "Can I export and self-host?",
    a: "Yes — Pro and Enterprise can export a standalone HTML/CSS/JS bundle or a web component and host it wherever they like.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes a 14-day Pro trial. No credit card required to start.",
  },
];

export default function PricingPage() {
  return (
    <>
      <ScrollTracker />
      <Navbar />

      <main className="relative pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]">
          <div className="absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-indigo-glow/14 blur-[140px]" />
          <div className="absolute inset-0 bg-grid opacity-25" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={
              <>
                Simple plans for
                <br className="hidden sm:block" /> <span className="text-gradient">every scroll story.</span>
              </>
            }
            body="Start free and publish up to three stories. Upgrade when you need a custom domain, high-res hosting, API access or a team."
          />

          <div className="mt-16">
            <PricingMatrix />
          </div>

          {/* ---------------- Comparison table ---------------- */}
          <section className="mt-24">
            <h2 className="font-display text-2xl font-bold">Compare plans</h2>
            <div className="mt-7 overflow-x-auto rounded-2xl border border-line/70">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="bg-obsidian/50">
                    <th className="px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                      Feature
                    </th>
                    <th className="px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                      Free
                    </th>
                    <th className="px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-wider text-indigo-glow">
                      Pro
                    </th>
                    <th className="px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-wider text-faint">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 1 ? "bg-canvas/30" : ""}>
                      <td className="border-t border-line/50 px-4 py-3.5 text-[13px] text-muted">
                        {row.feature}
                      </td>
                      <td className="border-t border-line/50 px-4 py-3.5 font-mono text-[12px] text-offwhite/80">
                        {row.free}
                      </td>
                      <td className="border-t border-line/50 bg-indigo-glow/4 px-4 py-3.5 font-mono text-[12px] text-offwhite">
                        {row.pro}
                      </td>
                      <td className="border-t border-line/50 px-4 py-3.5 font-mono text-[12px] text-offwhite/80">
                        {row.ent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ---------------- Trust strip ---------------- */}
          <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Bolt, label: "Edge rendering", value: "<80ms TTFB" },
              { icon: Globe, label: "Media CDN", value: "120 PoPs" },
              { icon: Lock, label: "Compliance", value: "SOC 2 · GDPR" },
              { icon: Code, label: "Uptime", value: "99.99%" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-canvas/40 p-4">
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
              </Reveal>
            ))}
          </section>

          {/* ---------------- FAQ ---------------- */}
          <section className="mt-24">
            <h2 className="font-display text-2xl font-bold">Questions</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} delay={(i % 2) * 0.06}>
                  <div className="h-full rounded-2xl border border-line/70 bg-canvas/40 p-5">
                    <h3 className="flex items-start gap-2.5 font-display text-[15px] font-bold text-offwhite">
                      <Check width={15} height={15} className="mt-0.5 shrink-0 text-emerald-glow" />
                      {f.q}
                    </h3>
                    <p className="mt-2.5 pl-6 text-[13px] leading-relaxed text-muted">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        <CTABand
          eyebrow="Start free"
          title="Three stories. No credit card."
          body="Publish your first scrollytelling piece today and upgrade only when the audience shows up."
        />
      </main>

      <Footer />
    </>
  );
}
