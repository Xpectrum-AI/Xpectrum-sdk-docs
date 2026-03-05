"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-lg overflow-hidden my-4 border"
      style={{ background: "var(--code-bg)", borderColor: "var(--code-border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "var(--code-border)" }}
      >
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {filename}
            </span>
          )}
          {!filename && (
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {language}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className="text-xs px-2 py-1 rounded transition-colors cursor-pointer"
          style={{
            color: copied ? "#10b981" : "var(--muted)",
            background: "transparent",
            border: "none",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed m-0">
        <code style={{ color: "var(--code-text)" }}>{code}</code>
      </pre>
    </div>
  );
}
