import { Architecture } from "@/components/portfolio/Architecture";
import { MoreWork } from "@/components/portfolio/MoreWork";

/** "How I build" — the approach block plus the wider body of work, kept off
 *  Home so visitors only pay for this page's content when they ask for it. */
export function DevelopmentPage() {
  return (
    <div className="pt-14 sm:pt-16">
      <Architecture />
      <MoreWork />
    </div>
  );
}

export default DevelopmentPage;
