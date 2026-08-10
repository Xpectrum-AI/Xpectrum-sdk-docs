export default function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-sm font-mono"
      style={{
        background: "var(--inline-code-bg)",
        color: "var(--inline-code-text)",
      }}
    >
      {children}
    </code>
  );
}
