import cvAsset from "@/assets/cv.pdf";

import { contactPhone, getContactActions, sections } from "@/data/content";
import { ActionButton } from "@/components/base/Button";
import { Reveal } from "@/components/base/Reveal";
import { Section } from "@/components/base/Section";
import { Eyebrow } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";

const contactActions = getContactActions(cvAsset);

export function Contact() {
  return (
    <Section width="md" className="relative">
      <Reveal className="text-center">
        <Eyebrow>{sections.contact.eyebrow}</Eyebrow>
        <Title className="mt-2">{sections.contact.title}</Title>
        <Paragraph variant="lg" className="mx-auto mt-4 max-w-2xl">
          {sections.contact.description}
        </Paragraph>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          {contactActions.map((action) => (
            <ActionButton
              key={action.label}
              href={action.href}
              variant={action.variant}
              icon={action.icon}
              iconPosition="iconLeft"
              external={action.external}
              download={action.download}
            >
              {action.label}
            </ActionButton>
          ))}
        </div>

        <Paragraph variant="sm" className="mt-4">
          Or call me on{" "}
          <a href={contactPhone.href} className="text-primary hover:underline">
            {contactPhone.label}
          </a>
        </Paragraph>
      </Reveal>
    </Section>
  );
}

export default Contact;
