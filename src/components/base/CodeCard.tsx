import type { Snippet } from "@/data/types";
import { CodeBlock } from "@/components/portfolio/CodeBlock";

/**
 * Split out from Card.tsx on purpose: this is the only variant that needs
 * react-syntax-highlighter, which is ~9MB of source (Prism + language
 * grammars). Card.tsx lazy-loads this file so the home page's bundle
 * (which only ever renders "project" cards) never pays for it.
 */
export default function CodeCard({ snippet }: { snippet: Snippet }) {
  return (
    <CodeBlock
      code={snippet.code}
      language={snippet.language}
      description={snippet.description}
    />
  );
}
