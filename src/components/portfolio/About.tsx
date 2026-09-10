import { interests } from "@/data/interests";
import { certifications,  } from "@/data/certifications";
import { techStack } from "@/data/techStack";
import { aboutParagraphs, sections } from "@/data/content";
import { Reveal } from "@/components/base/Reveal";
import { Section } from "@/components/base/Section";
import { Eyebrow } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";

export function About() {
  return (
    <Section width="md">
      <Reveal>
        <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-12 lg:p-16">
          <Eyebrow>{sections.about.eyebrow}</Eyebrow>
          <Title className="mt-2" variant="md">
            {sections.about.title}
          </Title>

          {aboutParagraphs.map((paragraph, index) => (
            <Paragraph key={paragraph} variant="lg" className={index === 0 ? "mt-6" : "mt-4"}>
              {paragraph}
            </Paragraph>
          ))}

          <div className="mt-8 sm:mt-10">
            <Eyebrow>Technical Skills</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:px-4 sm:py-2 sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
            <div>
              <Eyebrow>Certifications</Eyebrow>
              <ul className="mt-4 space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="text-sm text-muted-foreground">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Outside of Code</Eyebrow>
              <ul className="mt-4 space-y-2">
                {interests.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default About;
