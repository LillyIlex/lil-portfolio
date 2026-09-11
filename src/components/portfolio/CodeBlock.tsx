// components/portfolio/CodeBlock.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  description?: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  "TypeScript (TSX)": "tsx",
  "React (JavaScript)": "jsx",
  "React Native": "jsx",
  JavaScript: "javascript",
  TypeScript: "typescript",
};

// ~10 lines at 1.6 line-height + top/bottom padding (1.25rem each)
const COLLAPSED_HEIGHT = "16rem";
const CLAMP_LINE_COUNT = 10;

export function CodeBlock({ code, language, description }: CodeBlockProps) {
  const prismLanguage = LANGUAGE_MAP[language] ?? "tsx";
  const [isExpanded, setIsExpanded] = useState(false);

  const lineCount = code.split("\n").length;
  const needsClamp = lineCount > CLAMP_LINE_COUNT;
  const isCollapsed = needsClamp && !isExpanded;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-black px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span
          className="font-mono text-xs font-medium"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {language}
        </span>
      </div>

      <div className="relative">
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight: isCollapsed ? COLLAPSED_HEIGHT : "9999px" }}
        >
          {/* mobile gets a slightly smaller font so more code is visible per screen */}
          <div className="text-[0.7rem] leading-[1.6] sm:text-[0.8rem]">
            <SyntaxHighlighter
              language={prismLanguage}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                margin: 0,
                background: "#000000",
                padding: "1.25rem",
              }}
              codeTagProps={{ style: { fontFamily: "var(--font-mono, monospace)" } }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>

        {isCollapsed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-black to-transparent" />
        )}
      </div>

      {needsClamp && (
        <div className="flex justify-center border-t border-white/10 bg-black py-2">
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1 font-mono text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            {isExpanded ? "Hide" : "Show more"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </div>
      )}

      {description && (
        <div className="border-t border-white/10 bg-black px-4 py-3">
          <p className="font-mono text-xs leading-relaxed text-white">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}