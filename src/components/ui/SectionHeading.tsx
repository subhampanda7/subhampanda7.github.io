"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  /** Trailing words rendered in the brand gradient. */
  titleAccent?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  titleAccent,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-xs text-brand-iris">{index}</span>
        <span className="font-mono text-[0.7rem] tracking-[0.22em] text-fg-subtle uppercase">
          {eyebrow}
        </span>
        <motion.span
          aria-hidden
          className="h-px flex-1 origin-left bg-[linear-gradient(90deg,var(--color-line-strong),transparent)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <motion.h2
        className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
        {titleAccent && <span className="text-gradient"> {titleAccent}</span>}
      </motion.h2>

      {description && (
        <motion.p
          className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
