"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2.5",
};

const variants: Record<Variant, string> = {
  primary: "btn-shimmer text-white font-semibold",
  secondary: "glass-panel text-offwhite hover:border-white/20 hover:bg-white/8",
  outline:
    "border border-indigo-glow/40 text-offwhite hover:border-indigo-glow hover:bg-indigo-glow/10",
  ghost: "text-muted hover:text-offwhite hover:bg-white/5",
};

interface ButtonBaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const baseClasses =
  "group relative inline-flex items-center justify-center rounded-full whitespace-nowrap transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconRight,
  ...rest
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(baseClasses, sizes[size], variants[variant], className)} {...rest}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconRight,
}: ButtonBaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(baseClasses, sizes[size], variants[variant], className)}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </Link>
  );
}
