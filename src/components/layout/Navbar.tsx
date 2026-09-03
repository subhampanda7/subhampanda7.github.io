"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { navSections, site, socials } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { getLenis, scrollToId, scrollToTop } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const SECTION_IDS = navSections.map((s) => s.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const go = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.preventDefault();
      closeMenu();
      // Wait for the overlay to release the scroll lock before animating.
      requestAnimationFrame(() => scrollToId(id));
    },
    [closeMenu],
  );

  // Freeze the page behind the mobile sheet.
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-2.5" : "py-4 sm:py-5",
        )}
      >
        {/* Softens whatever scrolls beneath the floating bar: a masked blur so
            the effect fades out instead of ending on a visible edge. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-28 backdrop-blur-md transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,var(--color-ink)_38%,transparent)] transition-opacity duration-500",
            scrolled ? "opacity-95" : "opacity-0",
          )}
        />

        <div className="relative mx-auto flex w-full max-w-[78rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 justify-start">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                scrollToTop();
              }}
              aria-label={`${site.name} — back to top`}
              className="glass group grid size-10 place-items-center rounded-2xl transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.07]"
            >
              <span className="font-display text-[0.8rem] font-semibold tracking-tight text-fg transition-colors group-hover:text-white">
                SP
              </span>
            </a>
          </div>

          <nav
            aria-label="Primary"
            className={cn(
              "hidden items-center gap-0.5 rounded-full border p-1.5 transition-all duration-500 lg:flex",
              scrolled
                ? "glass shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]"
                : "border-transparent bg-transparent",
            )}
          >
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => go(e, section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-line bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{section.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass hidden h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.07] hover:text-white lg:inline-flex"
            >
              Resume
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="glass relative z-50 grid size-10 place-items-center rounded-2xl text-fg transition-colors duration-300 hover:border-line-strong lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -70 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 70 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 70 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -70 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div
              className="absolute inset-0 bg-ink/90 backdrop-blur-2xl"
              onClick={closeMenu}
            />

            <nav
              aria-label="Mobile"
              className="relative flex h-full flex-col justify-center gap-1 px-7 pt-20 pb-10 sm:px-10"
            >
              {navSections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => go(e, section.id)}
                  className="group flex items-baseline gap-4 border-b border-line py-4"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{
                    delay: 0.06 * index + 0.08,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="font-mono text-xs text-brand-iris">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl",
                      active === section.id ? "text-gradient" : "text-fg",
                    )}
                  >
                    {section.label}
                  </span>
                </motion.a>
              ))}

              <motion.div
                className="mt-8 flex flex-col items-start gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
              >
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 text-sm font-medium text-white"
                >
                  View Resume
                  <ArrowUpRight className="size-4" />
                </a>

                <ul className="flex items-center gap-3">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="glass grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:text-fg"
                      >
                        <Icon className="size-[1.05rem]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
