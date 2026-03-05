import Link from "next/link";

const CARDS = [
  {
    title: "Getting Started",
    description: "Install the SDK, configure credentials, and verify your setup in under 5 minutes.",
    href: "/docs/getting-started",
    icon: "📦",
  },
  {
    title: "Chat Module",
    description: "Add AI-powered streaming chat to your app. Send messages, manage conversations, handle files.",
    href: "/docs/chat",
    icon: "💬",
  },
  {
    title: "Voice Module",
    description: "Real-time AI voice calls with WebRTC. Transcription, mic control, agent speaking detection.",
    href: "/docs/voice",
    icon: "🎙️",
  },
  {
    title: "React Examples",
    description: "Complete, copy-paste React components for chat and voice. Built with Vite + TypeScript.",
    href: "/docs/react-examples",
    icon: "⚛️",
  },
  {
    title: "Next.js Examples",
    description: "Full Next.js App Router examples with environment variables, client components, and hooks.",
    href: "/docs/nextjs-examples",
    icon: "▲",
  },
  {
    title: "Widgets",
    description: "Drop-in floating chat and voice widgets. Zero UI code needed — just configure and go.",
    href: "/docs/widgets",
    icon: "🧩",
  },
  {
    title: "API Reference",
    description: "Every class, method, type, event, and config option documented in detail.",
    href: "/docs/api-reference",
    icon: "📖",
  },
  {
    title: "Troubleshooting",
    description: "Common errors, debugging tips, and solutions for known issues.",
    href: "/docs/troubleshooting",
    icon: "🔧",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header
        className="border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: "var(--accent)" }}
            >
              X
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            @xpectrum/sdk
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Add AI Chat &amp; Voice to any React or Next.js app. Install once, configure with your
            server URL + API key, and build your own AI-powered frontend.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/docs/getting-started"
              className="px-6 py-3 rounded-lg text-white font-medium no-underline text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Get Started
            </Link>
            <Link
              href="/docs/api-reference"
              className="px-6 py-3 rounded-lg font-medium no-underline text-sm border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              API Reference
            </Link>
          </div>

          {/* Quick install */}
          <div
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-lg font-mono text-sm"
            style={{ background: "var(--code-bg)", color: "var(--code-text)" }}
          >
            <span style={{ color: "var(--muted)" }}>$</span>
            npm install @xpectrum/sdk
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2
            className="text-sm font-semibold uppercase tracking-wider mb-8"
            style={{ color: "var(--muted)" }}
          >
            Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block p-6 rounded-xl border no-underline transition-all hover:shadow-md"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                  color: "var(--foreground)",
                }}
              >
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <h3 className="font-semibold text-base mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8 text-center text-sm"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <p>@xpectrum/sdk v0.1.0 — MIT License</p>
      </footer>
    </div>
  );
}
