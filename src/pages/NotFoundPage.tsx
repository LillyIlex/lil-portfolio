import { ArrowRight, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/lib/routes";
import { Eyebrow } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";
import { Section } from "@/components/base/Section";

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-3";

/** Client-side 404 — reached when someone hits a route that doesn't match
 *  any of the app's pages (typo'd link, an old bookmark, etc). */
export function NotFoundPage() {
  return (
    <Section width="md" className="flex min-h-[70vh] items-center pt-14 sm:pt-16">
      <div className="mx-auto text-center">
        <Eyebrow>404</Eyebrow>
        <Title className="mt-2">Page not found</Title>
        <Paragraph variant="lg" className="mx-auto mt-4 max-w-md">
          The page you're looking for doesn't exist or may have moved.
        </Paragraph>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to={ROUTES.home}
            className={`${pillBase} bg-primary text-primary-foreground hover:scale-105 glow-primary`}
          >
            <HomeIcon className="h-4 w-4 shrink-0" aria-hidden />
            Back home
          </Link>
          <Link
            to={ROUTES.projects}
            className={`${pillBase} border border-border bg-card/50 text-foreground backdrop-blur-sm hover:border-primary/50 hover:bg-card`}
          >
            See my projects
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default NotFoundPage;