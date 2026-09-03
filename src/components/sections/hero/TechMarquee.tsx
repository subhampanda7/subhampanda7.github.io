import { techMarquee } from "@/content/site";

/** Duplicated once so the -50% translation loops seamlessly. */
const items = [...techMarquee, ...techMarquee];

export function TechMarquee() {
  return (
    <div className="fade-edges-x relative border-y border-line py-4">
      <div
        className="animate-marquee flex w-max items-center gap-8 sm:gap-12"
        style={{ "--marquee-duration": "52s" } as React.CSSProperties}
      >
        {items.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="flex items-center gap-8 font-mono text-xs tracking-tight whitespace-nowrap text-fg-subtle sm:gap-12 sm:text-[0.8rem]"
            aria-hidden={index >= techMarquee.length}
          >
            {tech}
            <span className="size-1 rounded-full bg-white/20" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
