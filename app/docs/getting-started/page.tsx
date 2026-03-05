import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "Getting Started — Xpectrum SDK Docs",
};

export default function GettingStartedPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Install the SDK, set up your project, and verify everything works — in
        under 5 minutes.
      </p>

      {/* ── What is Xpectrum SDK ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="what-is-xpectrum">
          What is Xpectrum SDK?
        </h2>
        <p className="mb-4 leading-relaxed">
          <code
            className="px-1.5 py-0.5 rounded text-sm font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            @xpectrum/sdk
          </code>{" "}
          is a JavaScript/TypeScript library that lets you add{" "}
          <strong>AI-powered chat</strong> and <strong>AI voice calls</strong> to
          any website or app. Think of it as a bridge between your frontend and
          Xpectrum&apos;s AI servers.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Module
                </th>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  What it does
                </th>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Import
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="p-3 border-b font-semibold"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Chat
                </td>
                <td
                  className="p-3 border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Send messages, get streaming AI responses, manage
                  conversations
                </td>
                <td
                  className="p-3 border-b font-mono text-xs"
                  style={{
                    borderColor: "var(--table-border)",
                    color: "var(--accent)",
                  }}
                >
                  @xpectrum/sdk/chat
                </td>
              </tr>
              <tr>
                <td
                  className="p-3 border-b font-semibold"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Voice
                </td>
                <td
                  className="p-3 border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Real-time voice calls with AI agents via WebRTC
                </td>
                <td
                  className="p-3 border-b font-mono text-xs"
                  style={{
                    borderColor: "var(--table-border)",
                    color: "var(--accent)",
                  }}
                >
                  @xpectrum/sdk/voice
                </td>
              </tr>
              <tr>
                <td
                  className="p-3 border-b font-semibold"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Widgets
                </td>
                <td
                  className="p-3 border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Pre-built floating UI (chat bubble, voice button)
                </td>
                <td
                  className="p-3 border-b font-mono text-xs"
                  style={{
                    borderColor: "var(--table-border)",
                    color: "var(--accent)",
                  }}
                >
                  @xpectrum/sdk/widgets
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="leading-relaxed">
          You can use any module independently — you don&apos;t need Voice to use
          Chat, and vice versa.
        </p>
      </section>

      {/* ── Architecture ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="how-it-works">
          How It Works
        </h2>
        <CodeBlock
          language="text"
          code={`Your App (Frontend)                     Xpectrum Server (Backend)
┌────────────────────┐                 ┌─────────────────────────┐
│                    │                 │                         │
│  import { ... }    │   HTTP + SSE    │  Chat API               │
│  from '@xpectrum/  │ ──────────────> │  POST /chat-messages    │
│        sdk'        │                 │  GET  /conversations    │
│                    │                 │                         │
│  XpectrumChat()    │   WebRTC        │  Voice Server           │
│  XpectrumVoice()   │ ──────────────> │  POST /tokens/generate  │
│                    │                 │  LiveKit (audio)        │
└────────────────────┘                 └─────────────────────────┘`}
        />
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>You install the SDK in your frontend project</li>
          <li>You provide your API key and server URL</li>
          <li>The SDK handles all communication with Xpectrum servers</li>
          <li>You receive callbacks/events with AI responses in real-time</li>
        </ol>
      </section>

      {/* ── Prerequisites ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="prerequisites">
          Prerequisites
        </h2>
        <ul className="list-disc list-inside space-y-2 leading-relaxed">
          <li>
            <strong>Node.js 18+</strong> installed
          </li>
          <li>
            <strong>npm</strong>, <strong>yarn</strong>, or{" "}
            <strong>pnpm</strong>
          </li>
          <li>
            A <strong>Xpectrum account</strong> with:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                A <strong>Chat API key</strong> (looks like{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-xs font-mono"
                  style={{
                    background: "var(--inline-code-bg)",
                    color: "var(--inline-code-text)",
                  }}
                >
                  app-xxxxxxxxxxxx
                </code>
                )
              </li>
              <li>
                A <strong>Chat base URL</strong> (like{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-xs font-mono"
                  style={{
                    background: "var(--inline-code-bg)",
                    color: "var(--inline-code-text)",
                  }}
                >
                  https://app.yourserver.com/api/v1
                </code>
                )
              </li>
              <li>
                <em>(For voice)</em> A <strong>Voice API key</strong>,{" "}
                <strong>Voice base URL</strong>, and{" "}
                <strong>Agent name/UUID</strong>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      {/* ── Installation ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="installation">
          Installation
        </h2>

        <h3 className="text-lg font-semibold mb-2">
          npm / yarn / pnpm
        </h3>
        <CodeBlock language="bash" code={`# npm\nnpm install @xpectrum/sdk\n\n# yarn\nyarn add @xpectrum/sdk\n\n# pnpm\npnpm add @xpectrum/sdk`} />

        <Callout type="info" title="Peer dependency">
          <code className="text-xs font-mono">livekit-client</code> (required
          for voice) is included automatically as a dependency. No extra install
          needed.
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          CDN (Script Tag)
        </h3>
        <p className="mb-2 leading-relaxed">
          For plain HTML pages without a build step:
        </p>
        <CodeBlock
          language="html"
          code={`<script src="https://unpkg.com/@xpectrum/sdk/dist/xpectrum-sdk.umd.min.js"></script>
<script>
  // Everything is available on window.XpectrumSDK
  const chat = new XpectrumSDK.XpectrumChat({ ... });
  const voice = new XpectrumSDK.XpectrumVoice({ ... });
</script>`}
        />
      </section>

      {/* ── React (Vite) setup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="setup-react">
          Project Setup — React (Vite)
        </h2>
        <CodeBlock
          language="bash"
          code={`# 1. Create a new Vite + React + TypeScript project
npm create vite@latest my-xpectrum-app -- --template react-ts
cd my-xpectrum-app

# 2. Install dependencies
npm install

# 3. Install the Xpectrum SDK
npm install @xpectrum/sdk

# 4. Create your environment file
touch .env`}
        />

        <p className="mb-2 leading-relaxed">
          Add your credentials to{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            .env
          </code>
          :
        </p>
        <CodeBlock
          language="env"
          filename=".env"
          code={`VITE_CHAT_BASE_URL=https://app.yourserver.com/api/v1
VITE_CHAT_API_KEY=app-xxxxxxxxxxxx
VITE_VOICE_BASE_URL=https://api-dev.xpectrum-ai.com/
VITE_VOICE_API_KEY=xpectrum_ai_sk_xxxxxxxxxxxx
VITE_VOICE_AGENT_NAME=your-agent-uuid-here`}
        />

        <Callout type="warning" title="Why VITE_ prefix?">
          Vite only exposes environment variables that start with{" "}
          <code className="text-xs font-mono">VITE_</code> to the browser. This
          is a security feature — variables without the prefix are server-only.
        </Callout>
      </section>

      {/* ── Next.js setup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="setup-nextjs">
          Project Setup — Next.js (App Router)
        </h2>
        <CodeBlock
          language="bash"
          code={`# 1. Create a new Next.js project
npx create-next-app@latest my-xpectrum-app --typescript --app --tailwind
cd my-xpectrum-app

# 2. Install the Xpectrum SDK
npm install @xpectrum/sdk

# 3. Create your environment file
touch .env.local`}
        />

        <p className="mb-2 leading-relaxed">
          Add your credentials to{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            .env.local
          </code>
          :
        </p>
        <CodeBlock
          language="env"
          filename=".env.local"
          code={`NEXT_PUBLIC_CHAT_BASE_URL=https://app.yourserver.com/api/v1
NEXT_PUBLIC_CHAT_API_KEY=app-xxxxxxxxxxxx
NEXT_PUBLIC_VOICE_BASE_URL=https://api-dev.xpectrum-ai.com/
NEXT_PUBLIC_VOICE_API_KEY=xpectrum_ai_sk_xxxxxxxxxxxx
NEXT_PUBLIC_VOICE_AGENT_NAME=your-agent-uuid-here`}
        />

        <Callout type="warning" title="Why NEXT_PUBLIC_ prefix?">
          Next.js only exposes env vars starting with{" "}
          <code className="text-xs font-mono">NEXT_PUBLIC_</code> to the
          browser. Without this prefix, the variable is only available on the
          server side.
        </Callout>

        <Callout type="warning" title="Security">
          Add <code className="text-xs font-mono">.env.local</code> to your{" "}
          <code className="text-xs font-mono">.gitignore</code>! Never commit
          API keys to version control.
        </Callout>
      </section>

      {/* ── Environment Variables Reference ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="env-vars">
          Environment Variables Reference
        </h2>
        <PropsTable
          props={[
            {
              name: "*_CHAT_BASE_URL",
              type: "string",
              required: true,
              description:
                "Your Xpectrum Chat API endpoint (e.g. https://app.yourserver.com/api/v1)",
            },
            {
              name: "*_CHAT_API_KEY",
              type: "string",
              required: true,
              description:
                "Bearer token for chat auth. From your Xpectrum admin panel.",
            },
            {
              name: "*_VOICE_BASE_URL",
              type: "string",
              description:
                "Your Voice server (FastAPI) endpoint. Required for voice only.",
            },
            {
              name: "*_VOICE_API_KEY",
              type: "string",
              description:
                "API key for voice auth (x-api-key header). Required for voice only.",
            },
            {
              name: "*_VOICE_AGENT_NAME",
              type: "string",
              description:
                "Agent UUID or name to connect to. Required for voice only.",
            },
          ]}
        />
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
          Replace <code className="text-xs font-mono">*</code> with your
          framework prefix:{" "}
          <code className="text-xs font-mono">VITE_</code> (Vite),{" "}
          <code className="text-xs font-mono">NEXT_PUBLIC_</code> (Next.js),{" "}
          <code className="text-xs font-mono">REACT_APP_</code> (CRA).
        </p>
      </section>

      {/* ── Authentication ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="auth">
          Authentication
        </h2>
        <p className="mb-4 leading-relaxed">
          No token exchange or OAuth flow needed. You just provide your keys at
          init time and the SDK includes them on every request:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Module</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Header Sent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b font-semibold" style={{ borderColor: "var(--table-border)" }}>Chat</td>
                <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)" }}>
                  Authorization: Bearer &#123;apiKey&#125;
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b font-semibold" style={{ borderColor: "var(--table-border)" }}>Voice</td>
                <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)" }}>
                  x-api-key: &#123;apiKey&#125;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Verify Setup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="verify">
          Verify Your Setup
        </h2>
        <p className="mb-4 leading-relaxed">
          Here&apos;s a minimal test to verify the SDK is installed and your credentials
          work. Create this component:
        </p>

        <h3 className="text-lg font-semibold mb-2">
          Next.js (App Router)
        </h3>
        <CodeBlock
          filename="app/page.tsx"
          code={`'use client';

import { useEffect, useState } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

export default function Home() {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    const chat = new XpectrumChat({
      baseUrl: process.env.NEXT_PUBLIC_CHAT_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY!,
    });

    chat.getAppInfo()
      .then((info) => setStatus(\`Connected! App: "\${info.title}"\`))
      .catch((err) => setStatus(\`Error: \${err.message}\`));

    return () => chat.destroy();
  }, []);

  return <div style={{ padding: 40, fontSize: 18 }}>{status}</div>;
}`}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">
          React (Vite)
        </h3>
        <CodeBlock
          filename="src/App.tsx"
          code={`import { useEffect, useState } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

function App() {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    const chat = new XpectrumChat({
      baseUrl: import.meta.env.VITE_CHAT_BASE_URL,
      apiKey: import.meta.env.VITE_CHAT_API_KEY,
    });

    chat.getAppInfo()
      .then((info) => setStatus(\`Connected! App: "\${info.title}"\`))
      .catch((err) => setStatus(\`Error: \${err.message}\`));

    return () => chat.destroy();
  }, []);

  return <div style={{ padding: 40, fontSize: 18 }}>{status}</div>;
}

export default App;`}
        />

        <Callout type="success" title="Success">
          If you see <strong>&quot;Connected! App: ...&quot;</strong> — you&apos;re all
          set! Move on to the Chat or Voice guides.
        </Callout>

        <Callout type="warning" title="Got an error?">
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              <code className="text-xs font-mono">401</code> — Check your API
              key
            </li>
            <li>
              <code className="text-xs font-mono">Network Error</code> — Check
              your base URL
            </li>
            <li>
              <code className="text-xs font-mono">Module not found</code> — Run{" "}
              <code className="text-xs font-mono">
                npm install @xpectrum/sdk
              </code>
            </li>
          </ul>
        </Callout>
      </section>
    </article>
  );
}
