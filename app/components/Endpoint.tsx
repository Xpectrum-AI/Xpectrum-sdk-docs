const METHOD_COLORS: Record<string, string> = {
  GET: "#2563eb",
  POST: "#059669",
  DELETE: "#dc2626",
  PATCH: "#d97706",
};

export default function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border px-4 py-3 my-4 overflow-x-auto"
      style={{ background: "var(--code-bg)", borderColor: "var(--code-border)" }}
    >
      <span
        className="text-xs font-bold px-2 py-1 rounded text-white shrink-0"
        style={{ background: METHOD_COLORS[method] || "var(--accent)" }}
      >
        {method}
      </span>
      <span className="font-mono text-sm" style={{ color: "var(--code-text)" }}>
        {path}
      </span>
    </div>
  );
}
