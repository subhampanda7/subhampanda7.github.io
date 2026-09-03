"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section owns the viewport. Uses a band just under the header so
 * the highlighted nav item matches what the reader is actually looking at.
 */
export function useActiveSection(ids: readonly string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = offset + 1;
      let current = "";

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }

      // Near the very bottom the last section may never cross the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
