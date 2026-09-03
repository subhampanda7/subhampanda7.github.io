"use client";

import { ArrowDown } from "lucide-react";
import { scrollToId } from "@/lib/smooth-scroll";

export function ScrollCue() {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-[78rem] justify-center px-5 sm:px-8 lg:px-12">
      <a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          scrollToId("about");
        }}
        className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-fg-subtle uppercase transition-colors hover:text-fg-muted"
      >
        Scroll
        <ArrowDown
          className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
          aria-hidden
        />
      </a>
    </div>
  );
}
