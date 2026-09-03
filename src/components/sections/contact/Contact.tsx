import { ArrowUpRight, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site, socials } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <Card
          className="relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-20"
          spotlight={false}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(closest-side,rgba(109,125,255,0.22),transparent)]"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-2.5 text-xs text-fg-muted">
              <span
                aria-hidden
                className="animate-status size-2 rounded-full bg-brand-mint"
              />
              {site.availability}
            </span>

            <h2 className="mt-7 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
              Let&apos;s build something
              <span className="text-gradient"> worth keeping up</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              I&apos;m open to backend and distributed-systems roles, and always
              happy to talk shop about Kafka, workflow engines or a design
              you&apos;re stuck on. The inbox is genuinely open.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={`mailto:${site.email}`} size="lg" magnetic>
                <Send className="size-4" aria-hidden />
                Say hello
              </Button>
              <CopyEmail />
            </div>
          </div>
        </Card>
      </Reveal>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
        {socials.map(({ label, href, handle, icon: Icon }) => (
          <StaggerItem key={label} className="h-full">
            <a
              href={href}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group block h-full"
            >
              <Card className="flex h-full items-center gap-4 p-5 group-hover:-translate-y-1">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-fg-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg">
                  <Icon className="size-[1.1rem]" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-fg">
                    {label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[0.72rem] text-fg-subtle">
                    {handle}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-fg-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                  aria-hidden
                />
              </Card>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-4">
        <Card className="flex items-center gap-4 p-5" spotlight={false}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-fg-muted">
            <MapPin className="size-[1.1rem]" strokeWidth={1.75} aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-medium text-fg">Based in</span>
            <span className="mt-0.5 block font-mono text-[0.72rem] text-fg-subtle">
              {site.location} · open to relocation & remote
            </span>
          </span>
        </Card>
      </Reveal>
    </Section>
  );
}
