import { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface CodeBlockProps {
  code: string;
  language: string;
}

/** Terminal-styled code block with copy-to-clipboard. */
export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary/30 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/30 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30 sm:h-3 sm:w-3" />
          </div>
          <span className="ml-2 text-[11px] font-semibold text-primary sm:ml-3 sm:text-xs">
            {language}
          </span>
        </div>
        <button
          onClick={copy}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="max-h-[22rem] overflow-auto p-3 text-[11px] leading-relaxed sm:max-h-none sm:p-5 sm:text-[13px]">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}