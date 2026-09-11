import { ArrowDown, Mail } from "lucide-react";

import { hero } from "@/data/content";
import { ActionButton } from "@/components/base/Button";
import { Eyebrow } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";

const actionIcons = [ArrowDown, Mail];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 sm:min-h-screen"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-mint/5 blur-[80px] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <Eyebrow className="mb-4 animate-fade-in-up">{hero.eyebrow}</Eyebrow>
        <Title as="h1" variant="xl" className="animate-fade-in-up">
          {hero.nameStart}
          <span className="text-gradient">{hero.nameHighlight}</span>
          {hero.nameEnd}
        </Title>
        <Paragraph variant="lg" className="mx-auto mt-6 max-w-2xl animate-fade-in-up">
          {hero.intro}
        </Paragraph>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up sm:mt-10 sm:gap-4"
          style={{ animationDelay: "0.2s" }}
        >
          {hero.actions.map((action, index) => (
            <ActionButton
              key={action.href}
              href={action.href}
              variant={action.variant}
              icon={actionIcons[index]}
              iconPosition="iconRight"
            >
              {action.label}
            </ActionButton>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: "0.6s" }}
      >
        <a
          href="#projects"
          className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="tracking-widest uppercase">Scroll</span>
          <div className="h-10 w-px bg-linear-to-b from-primary to-transparent" />
        </a>
      </div>
    </section>
  );
}
