"use client";

import { motion } from "framer-motion";
import { PRICING } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Check, Bolt, ArrowRight } from "@/components/Icons";
import { ButtonLink } from "@/components/Button";

export default function PricingMatrix() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PRICING.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "border-glow relative flex flex-col overflow-hidden rounded-3xl border p-7",
            tier.featured
              ? "border-indigo-glow/45 bg-gradient-to-b from-indigo-glow/10 via-canvas/70 to-canvas/40 shadow-[0_30px_90px_-40px_rgba(99,102,241,0.85)] lg:-mt-4 lg:mb-4"
              : "border-line/70 bg-canvas/50",
          )}
        >
          {tier.featured && (
            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-glow to-violet-glow px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
              <Bolt width={11} height={11} /> Most popular
            </span>
          )}

          <h3 className="font-display text-lg font-bold text-offwhite">{tier.name}</h3>
          <p className="mt-1.5 min-h-[2.5rem] text-[13px] leading-relaxed text-muted">
            {tier.tagline}
          </p>

          <div className="mt-6 flex items-end gap-1.5">
            <span
              className={cn(
                "font-display text-[2.75rem] font-extrabold leading-none tracking-tight",
                tier.featured ? "text-gradient-accent" : "text-offwhite",
              )}
            >
              {tier.price}
            </span>
            {tier.cadence && (
              <span className="pb-1 font-mono text-xs text-faint">{tier.cadence}</span>
            )}
          </div>

          <ul className="mt-7 flex-1 space-y-3.5">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[13.5px] leading-snug text-muted">
                <span
                  className={cn(
                    "mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full",
                    tier.featured ? "bg-indigo-glow/20 text-indigo-glow" : "bg-white/6 text-emerald-glow",
                  )}
                  style={{ width: "1.125rem", height: "1.125rem" }}
                >
                  <Check width={11} height={11} strokeWidth={2.4} />
                </span>
                <span className={cn(f.includes("Zero watermark") || f.includes("white-glove") ? "text-offwhite" : "")}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink
            href="/editor"
            variant={tier.featured ? "primary" : "secondary"}
            size="md"
            className="mt-8 w-full"
            iconRight={<ArrowRight width={16} height={16} />}
          >
            {tier.cta}
          </ButtonLink>
        </motion.div>
      ))}
    </div>
  );
}
