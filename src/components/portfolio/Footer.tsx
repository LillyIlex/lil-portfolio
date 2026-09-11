import { footer } from "@/data/content";
import { Paragraph } from "@/components/base/Paragraph";
import { Reveal } from "@/components/base/Reveal";
import { Section } from "@/components/base/Section";
import { ContactContent } from "@/components/portfolio/ContactContent";

/** Contact lives here so it's always reachable at the bottom of every page, not just Home. */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Section id="contact" width="md" className="relative">
        <Reveal>
          <ContactContent />
        </Reveal>
      </Section>

      <div className="border-t border-border px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <Paragraph variant="sm">
            © {new Date().getFullYear()} {footer.owner} — {footer.note}
          </Paragraph>
          <Paragraph variant="sm" tone="primary" className="font-semibold">
            {footer.role}
          </Paragraph>
        </div>
      </div>
    </footer>
  );
}
