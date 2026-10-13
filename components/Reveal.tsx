"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade + rise on first scroll into view. Used for every non-pinned block. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cnLocal(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cnLocal(
            "glass-panel mb-5 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 border-indigo-glow/25",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-glow shadow-[0_0_16px_0_rgba(99,102,241,0.9)]" />
          <span className="tag-mono">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p className={cnLocal("mt-5 text-[15.5px] leading-relaxed text-muted", align === "center" && "mx-auto")}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function cnLocal(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}
