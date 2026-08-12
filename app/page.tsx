import Link from "next/link";

const CARDS = [
  {
    title: "Getting Started",
    description: "Base URL, authentication, the user identifier, and your first request in under 5 minutes.",
    href: "/docs/getting-started",
    icon: "📦",
  },
  {
    title: "JavaScript Guide",
    description: "Step-by-step with plain fetch or xpectrum: browser-only setup, the secret-key server proxy, and styling your chat UI.",
    href: "/docs/javascript-guide",
    icon: "🛠️",
  },
  {
    title: "Chat Completions",
    description: "POST /chat/completions — OpenAI-compatible chat with streaming, vision, and server-side memory.",
    href: "/docs/chat-completions",
    icon: "💬",
  },
  {
    title: "Models",
    description: "GET /models — the OpenAI-compatible model list for your API key.",
    href: "/docs/models",
    icon: "🧠",
  },
  {
    title: "Threads & Messages",
    description: "GET /threads — list a user's conversations and fetch full transcripts with citations.",
    href: "/docs/threads",
    icon: "🧵",
  },
  {
    title: "Voice Module",
    description: "Real-time AI voice calls over WebRTC — live transcription, mic control, and call lifecycle events.",
    href: "/docs/voice",
    icon: "🎙️",
  },
  {
    title: "Widgets",
    description: "Drop-in chat window, voice-call orb, or both — one script tag, fully brandable, no UI code.",
    href: "/docs/widgets",
    icon: "🧩",
  },
  {
    title: "Runs",
    description: "POST /runs — execute Workflow apps, blocking or with streamed step-by-step progress.",
    href: "/docs/runs",
    icon: "⚙️",
  },
  {
    title: "Cancel Tasks",
    description: "POST /tasks/{task_id}/cancel — stop an in-flight generation or workflow run.",
    href: "/docs/tasks",
    icon: "🛑",
  },
  {
    title: "Knowledge Search",
    description: "POST /knowledge/{id}/search — query a knowledge base and get scored matching chunks.",
    href: "/docs/knowledge-search",
    icon: "🔎",
  },
  {
    title: "App Config",
    description: "GET /config — greeting, starter questions, input fields, feature flags, and branding in one call.",
    href: "/docs/config",
    icon: "🎛️",
  },
  {
    title: "Errors",
    description: "The OpenAI-style error envelope, status codes, and how failures arrive mid-stream.",
    href: "/docs/errors",
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
            Xpectrum API
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            One API for AI chat, real-time voice calls, workflows, and
            knowledge retrieval. OpenAI-compatible where it counts — use any
            HTTP client or OpenAI SDK — with drop-in widgets when you&apos;d
            rather not build UI at all.
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
              href="/docs/chat-completions"
              className="px-6 py-3 rounded-lg font-medium no-underline text-sm border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              Chat Completions
            </Link>
          </div>

          {/* Base URL */}
          <div
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-lg font-mono text-sm"
            style={{ background: "var(--code-bg)", color: "var(--code-text)" }}
          >
            <span style={{ color: "var(--muted)" }}>Base URL</span>
            https://cloud.xpectrum.dev/v1
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
            API Reference
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
        <p>Xpectrum API · v1</p>
      </footer>
    </div>
  );
}
