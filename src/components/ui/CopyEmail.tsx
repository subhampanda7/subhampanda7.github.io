"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the mailto link beside this is the fallback.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="glass inline-flex h-13 items-center gap-2.5 rounded-full px-6 text-[0.95rem] font-medium text-fg transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.07]"
    >
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute"
            >
              <Check className="size-4 text-brand-mint" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute"
            >
              <Copy className="size-4" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {copied ? "Email copied" : "Copy email"}
      <span className="sr-only">{site.email}</span>
    </button>
  );
}
