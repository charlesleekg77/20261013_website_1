import Link from "next/link";
import { FOOTER_COLUMNS, SOCIALS } from "@/lib/data";
import { BrandMark, SocialIcon, ArrowRight } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-obsidian">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-indigo-glow/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-12 pt-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark size={30} />
              <span className="font-display text-[17px] font-extrabold">
                Scrollytelling<span className="text-indigo-glow">.ai</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Turn static content into scroll-driven immersive stories. Combine text, 3D graphics,
              data visualizations and media into seamless interactive web experiences — no code
              required.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass-panel grid h-10 w-10 place-items-center rounded-xl text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-offwhite hover:border-indigo-glow/40"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-offwhite"
                    >
                      {link.label}
                      <ArrowRight
                        width={13}
                        height={13}
                        className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line/60 pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} Scrollytelling.ai — All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint">
            <Link href="#" className="transition-colors hover:text-muted">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-muted">Terms</Link>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-glow" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
