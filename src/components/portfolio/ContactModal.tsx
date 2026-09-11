import { sections } from "@/data/content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ContactContent } from "@/components/portfolio/ContactContent";

export interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Quick-access duplicate of the footer Contact section, opened from the nav
 * when the person is on a route other than Home — so they don't have to
 * navigate away from what they're looking at just to get in touch.
 */
export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-16 border-border bg-background/95 backdrop-blur-md sm:max-w-xl">
        {/* Visually hidden — ContactContent renders its own visible heading below. */}
        <DialogTitle className="sr-only">{sections.contact.title}</DialogTitle>
        <ContactContent compact />
      </DialogContent>
    </Dialog>
  );
}
