"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Award, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RichText } from "@/components/ui/RichText";
import { TechPill } from "@/components/ui/TechPill";
import type { Experience } from "@/content/experience";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

export function ExperienceItem({
  experience,
  isLast,
}: {
  experience: Experience;
  isLast: boolean;
}) {
  const [start, end] = experience.period.split(" — ");

  return (
    <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 lg:grid-cols-[8.5rem_1.5rem_minmax(0,1fr)] lg:gap-x-6">
      <div className="hidden pt-1.5 text-right lg:block">
        <p className="font-mono text-[0.78rem] text-fg">{start}</p>
        <p className="font-mono text-[0.78rem] text-fg-subtle">— {end}</p>
        <p className="mt-3 inline-flex items-center gap-1 text-[0.7rem] text-fg-subtle">
          <MapPin className="size-3" aria-hidden />
          {experience.location}
        </p>
      </div>

      {/* Rail + marker */}
      <div aria-hidden className="relative flex justify-center">
        <span
          className={cn(
            "absolute top-2 w-px bg-line",
            isLast ? "bottom-0" : "-bottom-12",
          )}
        />
        <motion.span
          className={cn(
            "absolute top-2 w-px origin-top bg-[image:var(--gradient-brand)] opacity-70",
            isLast ? "bottom-0" : "-bottom-12",
          )}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.span
          className="relative mt-1 grid size-3.5 place-items-center rounded-full border border-line-strong bg-ink"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              experience.current
                ? "animate-status bg-brand-mint"
                : "bg-brand-iris",
            )}
          />
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.75, ease: EASE }}
        className={cn(isLast ? "" : "pb-12")}
      >
        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {experience.company}
                </h3>
                {experience.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-mint/25 bg-brand-mint/10 px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wide text-brand-mint uppercase">
                    <span className="animate-status size-1.5 rounded-full bg-brand-mint" />
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-fg-muted">
                {experience.role}
                <span className="mx-2 text-fg-subtle">·</span>
                <span className="text-fg-subtle">{experience.location}</span>
              </p>
            </div>

            <span className="glass rounded-full px-3 py-1.5 font-mono text-[0.7rem] text-fg-muted lg:hidden">
              {experience.period}
            </span>
          </div>

          <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted">
            {experience.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-white/[0.04] sm:grid-cols-4">
            {experience.impact.map((chip) => (
              <div key={chip.label} className="bg-ink-raised px-4 py-3.5">
                <p className="numeric font-display text-base font-semibold text-gradient sm:text-lg">
                  {chip.value}
                </p>
                <p className="mt-1 text-[0.72rem] text-fg-subtle">{chip.label}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-3.5">
            {experience.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                className="flex gap-3 text-[0.92rem] leading-relaxed text-fg-muted"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
              >
                <span
                  aria-hidden
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-brand-iris/70"
                />
                <RichText text={highlight} />
              </motion.li>
            ))}
          </ul>

          {experience.award && (
            <a
              href={experience.award.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 flex items-center gap-4 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.05] p-4 transition-colors duration-300 hover:border-brand-gold/40 hover:bg-brand-gold/[0.09]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                <Award className="size-[1.15rem]" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-fg">
                  {experience.award.title}
                </span>
                <span className="mt-0.5 block text-[0.8rem] text-fg-subtle">
                  {experience.award.description}
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-fg-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-gold"
                aria-hidden
              />
            </a>
          )}

          <div className="mt-7 flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>
        </Card>
      </motion.div>
    </li>
  );
}
