import { ArrowRight, BrandMark, Sparkle } from "@/components/Icons";
import { ButtonLink } from "@/components/Button";
import Reveal from "@/components/Reveal";

/** Closing call-to-action band used at the foot of every marketing page. */
export default function CTABand({
  eyebrow = "Start building",
  title = "Your next story scrolls itself.",
  body = "Publish your first scrollytelling piece in an afternoon. Bring the narrative — Studio brings the motion.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl border border-indigo-glow/25 bg-gradient-to-br from-indigo-glow/12 via-canvas/60 to-violet-glow/12 px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-glow/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-emerald-glow/18 blur-[110px]" />

          <div className="relative">
            <div className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-obsidian/60 backdrop-blur-md">
              <BrandMark size={30} />
            </div>
            <div className="glass-panel mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border-indigo-glow/25 px-3.5 py-1.5">
              <Sparkle width={12} height={12} className="text-indigo-glow" />
              <span className="tag-mono">{eyebrow}</span>
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">{body}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <ButtonLink href="/editor" size="lg" iconRight={<ArrowRight width={18} height={18} />}>
                Create Scrolly
              </ButtonLink>
              <ButtonLink href="/docs" variant="secondary" size="lg">
                Read the docs
              </ButtonLink>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Free forever plan · No credit card · 3 stories included
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
