// components/portfolio/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export function CodeBlock({ code, language, description }: CodeBlockProps) {
  const prismLanguage = LANGUAGE_MAP[language] ?? "tsx";

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

      <SyntaxHighlighter
        language={prismLanguage}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          margin: 0,
          background: "#000000",
          padding: "1.25rem",
          fontSize: "0.8rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono, monospace)" } }}
      >
        {code}
      </SyntaxHighlighter>

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