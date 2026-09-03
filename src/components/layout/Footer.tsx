"use client";

import { ArrowUp } from "lucide-react";
import { site, socials } from "@/content/site";
import { scrollToTop } from "@/lib/smooth-scroll";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[78rem] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-fg-subtle">
              {site.role} · {site.location}
            </p>
          </div>

          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="glass grid size-10 place-items-center rounded-2xl text-fg-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] text-fg-subtle">
            © {new Date().getFullYear()} {site.name}. Built with Next.js,
            Tailwind CSS and Motion.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 self-start font-mono text-[0.7rem] tracking-[0.16em] text-fg-subtle uppercase transition-colors hover:text-fg sm:self-auto"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
