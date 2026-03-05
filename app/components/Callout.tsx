interface CalloutProps {
  type?: "info" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
}

const STYLES = {
  info: { bg: "var(--info-bg)", border: "var(--info-border)", icon: "i" },
  warning: { bg: "var(--warning-bg)", border: "var(--warning-border)", icon: "!" },
  success: { bg: "var(--success-bg)", border: "var(--success-border)", icon: "✓" },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const s = STYLES[type];
  return (
    <div
      className="rounded-lg p-4 my-4 border-l-4"
      style={{ background: s.bg, borderLeftColor: s.border }}
    >
      {title && (
        <p className="font-semibold text-sm mb-1" style={{ color: s.border }}>
          {s.icon === "✓" ? "✓ " : s.icon === "!" ? "⚠ " : "ℹ "}
          {title}
        </p>
      )}
      <div className="text-sm" style={{ color: "var(--foreground)" }}>
        {children}
      </div>
    </div>
  );
}
