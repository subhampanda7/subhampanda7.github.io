import { ArrowUpRight, Award, Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { RotatingText } from "@/components/ui/RotatingText";
import { heroPhrases, site, socials } from "@/content/site";
import { HeroPortrait } from "./HeroPortrait";
import { ScrollCue } from "./ScrollCue";
import { TechMarquee } from "./TechMarquee";

/** Entrance stagger, expressed as a CSS custom property. */
const at = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

const CHAR_STAGGER = 0.028;
const NAME_START = 0.14;

function AnimatedName({ name }: { name: string }) {
  let index = 0;

  return (
    <h1
      aria-label={name}
      className="font-display text-[clamp(2.75rem,9vw,5.25rem)] leading-[0.95] font-semibold"
    >
      {name.split(" ").map((word) => (
        <span
          key={word}
          aria-hidden
          className="mr-[0.22em] inline-block last:mr-0"
        >
          {[...word].map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              className="hero-char"
              style={at(NAME_START + index++ * CHAR_STAGGER)}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 sm:pt-32 short:pt-24 shorter:pt-20"
    >
      <div className="mx-auto flex w-full max-w-[78rem] flex-1 items-center px-5 py-10 sm:px-8 lg:px-12 short:py-4">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="order-1 lg:order-2">
            <HeroPortrait />
          </div>

          <div className="order-2 lg:order-1">
            <div
              className="hero-rise flex flex-wrap items-center gap-3"
              style={at(0.04)}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-2.5 text-xs text-fg-muted">
                <span
                  aria-hidden
                  className="animate-status size-2 rounded-full bg-brand-mint"
                />
                {site.availability}
              </span>
              <span className="font-mono text-[0.7rem] tracking-[0.16em] text-fg-subtle uppercase">
                {site.location}
              </span>
            </div>

            <div className="mt-6 short:mt-4">
              <AnimatedName name={site.name} />
            </div>

            <p
              className="hero-rise font-display mt-3 text-[clamp(1.35rem,3.6vw,2.1rem)] leading-tight font-medium"
              style={at(0.48)}
            >
              <span className="text-gradient">{site.role}</span>
            </p>

            <div
              className="hero-rise mt-4 flex items-center gap-2.5 font-mono text-[0.78rem] text-fg-subtle sm:text-sm"
              style={at(0.56)}
            >
              <span aria-hidden className="shrink-0 text-brand-cyan">
                ~/
              </span>
              <RotatingText
                phrases={heroPhrases}
                className="min-w-0 flex-1 leading-6"
              />
            </div>

            <p
              className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg short:mt-5"
              style={at(0.63)}
            >
              {site.intro}
            </p>

            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-3 short:mt-6"
              style={at(0.7)}
            >
              <Button href={site.resumeUrl} external size="lg" magnetic>
                View Resume
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button variant="secondary" size="lg" scrollTo="contact">
                <Mail className="size-4" />
                Get in touch
              </Button>
            </div>

            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 short:mt-5"
              style={at(0.77)}
            >
              <ul className="flex items-center gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="glass grid size-11 place-items-center rounded-2xl text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/[0.07] hover:text-fg"
                    >
                      <Icon className="size-[1.05rem]" strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={site.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07] py-2 pr-3.5 pl-3 text-xs text-fg-muted transition-colors duration-300 hover:border-brand-gold/45 hover:text-fg"
              >
                <Award
                  className="size-4 text-brand-gold"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span>
                  Paytm R&amp;R
                  <span className="hidden sm:inline"> — March 2026</span>
                </span>
                <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-rise" style={at(0.95)}>
        <ScrollCue />
        <TechMarquee />
      </div>
    </section>
  );
}
