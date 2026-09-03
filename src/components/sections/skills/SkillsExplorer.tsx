"use client";

import { motion, type Variants } from "motion/react";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TechPill } from "@/components/ui/TechPill";
import { skillGroups } from "@/content/skills";
import { accentStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export function SkillsExplorer() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !back) return;

    event.preventDefault();
    const next =
      (index + (forward ? 1 : -1) + skillGroups.length) % skillGroups.length;
    setActiveId(skillGroups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-6">
      <div
        role="tablist"
        aria-label="Skill categories"
        aria-orientation="vertical"
        className="fade-edge-r -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none]"
      >
        {skillGroups.map((group, index) => {
          const isActive = group.id === activeId;
          const Icon = group.icon;

          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`skill-tab-${group.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`skill-panel-${group.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              style={accentStyle(group.accent)}
              className={cn(
                "group relative flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300",
                isActive ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-tab-indicator"
                  aria-hidden
                  className="absolute inset-0 rounded-2xl border border-line bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}

              <span
                className={cn(
                  "relative grid size-8 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
                  isActive
                    ? "text-[var(--accent)]"
                    : "border-line text-fg-subtle group-hover:text-fg-muted",
                )}
                style={
                  isActive
                    ? {
                        borderColor:
                          "color-mix(in oklab, var(--accent) 32%, transparent)",
                        backgroundColor:
                          "color-mix(in oklab, var(--accent) 14%, transparent)",
                      }
                    : undefined
                }
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
              </span>

              <span className="relative text-sm font-medium whitespace-nowrap">
                {group.title}
              </span>

              <span className="relative ml-auto hidden font-mono text-[0.65rem] text-fg-subtle lg:block">
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <Card className="flex min-h-[19rem] flex-col p-6 sm:p-8">
        {skillGroups.map((group) => {
          const isActive = group.id === activeId;
          const Icon = group.icon;

          return (
            <div
              key={group.id}
              id={`skill-panel-${group.id}`}
              role="tabpanel"
              aria-labelledby={`skill-tab-${group.id}`}
              className={isActive ? "flex flex-1 flex-col" : "hidden"}
            >
              <motion.div
                style={accentStyle(group.accent)}
                className="flex flex-1 flex-col"
                initial={{ opacity: 0, y: 12 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-2xl border text-[var(--accent)]"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--accent) 30%, transparent)",
                      backgroundColor:
                        "color-mix(in oklab, var(--accent) 12%, transparent)",
                    }}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {group.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-fg-muted">
                      {group.blurb}
                    </p>
                  </div>
                </div>

                <motion.ul
                  className="mt-7 mb-8 flex flex-wrap gap-2.5"
                  variants={listVariants}
                  initial="hidden"
                  animate={isActive ? "show" : "hidden"}
                >
                  {group.skills.map((skill) => (
                    <motion.li key={skill.name} variants={pillVariants}>
                      <TechPill label={skill.name} core={skill.core} size="md" />
                    </motion.li>
                  ))}
                </motion.ul>

                <p
                  className="mt-auto rounded-2xl border-l-2 bg-white/[0.02] py-3.5 pr-4 pl-5 text-[0.88rem] leading-relaxed text-fg-muted"
                  style={{ borderLeftColor: "var(--accent)" }}
                >
                  {group.highlight}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[0.68rem] text-fg-subtle">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-[image:var(--gradient-brand)]"
                    />
                    Used most days
                  </span>
                  <span>
                    {group.skills.length} technologies ·{" "}
                    {group.skills.filter((s) => s.core).length} core
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
