import Link from "next/link";
import { BrandMark, ArrowRight } from "@/components/Icons";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute left-1/2 top-1/3 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-glow/12 blur-[130px]" />
      </div>

      <div className="text-center">
        <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-2.5">
          <BrandMark size={32} />
          <span className="font-display text-[17px] font-extrabold">
            Scrollytelling<span className="text-indigo-glow">.ai</span>
          </span>
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-glow">
          error 404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] font-extrabold tracking-tight">
          This scene never <span className="text-gradient">pinned.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          The page you were scrolling toward doesn't exist. Head back to the landing page or jump
          straight into the Studio.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <ButtonLink href="/" size="lg" iconRight={<ArrowRight width={18} height={18} />}>
            Back to home
          </ButtonLink>
          <ButtonLink href="/editor" variant="secondary" size="lg">
            Open Studio
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
