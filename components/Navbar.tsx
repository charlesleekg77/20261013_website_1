"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/cn";
import { BrandMark, Menu, XMark, ArrowRight } from "@/components/Icons";
import { ButtonLink } from "@/components/Button";
import { useStoryStore } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const globalProgress = useStoryStore((s) => s.globalProgress);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-500",
            scrolled
              ? "glass-strong mt-3 rounded-2xl px-4 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] sm:mx-4 md:mx-6 md:px-5"
              : "mt-0 rounded-none border-transparent bg-transparent px-4 py-4 sm:px-6 md:px-8",
          )}
        >
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Scrollytelling.ai home">
            <span className="relative">
              <BrandMark size={30} className="transition-transform duration-500 group-hover:rotate-[-6deg]" />
              <span className="absolute inset-0 -z-10 rounded-full bg-indigo-glow/40 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="font-display text-[17px] font-extrabold tracking-tight">
              Scrollytelling<span className="text-indigo-glow">.ai</span>
            </span>
          </Link>

          {/* Center links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === pathname ||
                (link.href !== "/" && !link.href.includes("#") && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200",
                    active ? "text-offwhite" : "text-muted hover:text-offwhite",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/7 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/#login"
              className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:text-offwhite sm:block"
            >
              Log In
            </Link>
            <ButtonLink
              href="/editor"
              size="sm"
              className="pl-4 pr-3.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              iconRight={<ArrowRight width={16} height={16} />}
            >
              Create Scrolly
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="glass-panel grid h-9 w-9 place-items-center rounded-full text-offwhite lg:hidden"
            >
              {open ? <XMark width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="relative h-[2px] w-full overflow-hidden bg-white/5">
          <div
            className="h-full origin-left bg-gradient-to-r from-indigo-glow via-violet-glow to-emerald-glow"
            style={{ transform: `scaleX(${globalProgress})`, transition: "transform 90ms linear" }}
          />
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mt-24 flex flex-col gap-1 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/5 py-4 font-display text-2xl font-bold text-offwhite/90"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/#login" variant="secondary" size="lg">
                  Log In
                </ButtonLink>
                <ButtonLink href="/editor" size="lg" iconRight={<ArrowRight width={18} height={18} />}>
                  Create Scrolly
                </ButtonLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
