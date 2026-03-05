import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";

export const metadata = {
  title: "create-xpectrum-app — Xpectrum SDK Docs",
};

export default function CreateXpectrumAppPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">create-xpectrum-app</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        The fastest way to start building with @xpectrum/sdk. One command gives
        you a fully configured Next.js app with chat and voice demos ready to
        go.
      </p>

      {/* ── Quick Start ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="quick-start">
          Quick Start
        </h2>
        <CodeBlock
          language="bash"
          code={`npx create-xpectrum-app my-app
cd my-app
# Add your API keys to .env.local
npm run dev`}
        />
        <p className="mt-4 leading-relaxed">
          That&apos;s it. Open{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            http://localhost:3000
          </code>{" "}
          and you&apos;ll see your app.
        </p>
      </section>

      {/* ── What You Get ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="what-you-get">
          What You Get
        </h2>
        <p className="mb-4 leading-relaxed">
          The scaffolded app includes everything you need to start building:
        </p>
        <CodeBlock
          language="text"
          code={`my-app/
├── app/
│   ├── layout.tsx               # Root layout with Geist fonts
│   ├── page.tsx                 # Welcome page with links to demos
│   ├── globals.css              # Tailwind CSS + light/dark theme
│   ├── chat/
│   │   └── page.tsx             # Chat demo route
│   └── voice/
│       └── page.tsx             # Voice demo route
├── components/
│   ├── xpectrum-chat.tsx        # Fully working chat component
│   └── xpectrum-voice.tsx       # Fully working voice component
├── .env.local                   # Placeholder API keys (edit this!)
├── package.json                 # Next.js 15, React 19, @xpectrum/sdk
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs`}
        />

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Included
                </th>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Version
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Next.js", "15.5.7"],
                ["React", "19"],
                ["@xpectrum/sdk", "latest"],
                ["Tailwind CSS", "4"],
                ["TypeScript", "5"],
              ].map(([name, version]) => (
                <tr key={name}>
                  <td
                    className="p-3 border-b font-mono text-xs"
                    style={{
                      borderColor: "var(--table-border)",
                      color: "var(--accent)",
                    }}
                  >
                    {name}
                  </td>
                  <td
                    className="p-3 border-b"
                    style={{ borderColor: "var(--table-border)" }}
                  >
                    {version}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="usage">
          Usage
        </h2>

        <h3 className="text-lg font-semibold mb-2">With a custom name</h3>
        <CodeBlock
          language="bash"
          code={`npx create-xpectrum-app my-cool-app`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">
          With the default name
        </h3>
        <CodeBlock
          language="bash"
          code={`npx create-xpectrum-app
# Creates a folder called "my-xpectrum-app"`}
        />

        <Callout type="info" title="What happens under the hood">
          <ol className="list-decimal list-inside space-y-1 mt-1">
            <li>Creates the project directory</li>
            <li>Copies the template files</li>
            <li>
              Renames{" "}
              <code className="text-xs font-mono">_env.local</code> to{" "}
              <code className="text-xs font-mono">.env.local</code> and{" "}
              <code className="text-xs font-mono">_gitignore</code> to{" "}
              <code className="text-xs font-mono">.gitignore</code>
            </li>
            <li>
              Updates <code className="text-xs font-mono">package.json</code>{" "}
              name to your project name
            </li>
            <li>
              Runs <code className="text-xs font-mono">npm install</code>
            </li>
          </ol>
        </Callout>
      </section>

      {/* ── Configure ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="configure">
          Configure Your API Keys
        </h2>
        <p className="mb-4 leading-relaxed">
          Open{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            .env.local
          </code>{" "}
          and replace the placeholder values with your real keys:
        </p>
        <CodeBlock
          filename=".env.local"
          language="env"
          code={`# Chat Configuration
NEXT_PUBLIC_CHAT_BASE_URL=https://app.yourserver.com/api/v1
NEXT_PUBLIC_CHAT_API_KEY=app-xxxxxxxxxxxx

# Voice Configuration
NEXT_PUBLIC_VOICE_BASE_URL=https://api-dev.xpectrum-ai.com/
NEXT_PUBLIC_VOICE_API_KEY=xpectrum_ai_sk_xxxxxxxxxxxx
NEXT_PUBLIC_VOICE_AGENT_NAME=your-agent-uuid-here`}
        />
        <Callout type="warning" title="Don't commit .env.local">
          The{" "}
          <code className="text-xs font-mono">.gitignore</code> already
          excludes <code className="text-xs font-mono">.env*</code> files, so
          your API keys won&apos;t be committed to git.
        </Callout>
      </section>

      {/* ── Routes ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="routes">
          Available Routes
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Route
                </th>
                <th
                  className="text-left p-3 font-semibold border-b"
                  style={{ borderColor: "var(--table-border)" }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["/", "Welcome page with quick start instructions"],
                ["/chat", "Chat demo — streaming AI conversation"],
                ["/voice", "Voice demo — real-time voice call with transcription"],
              ].map(([route, desc]) => (
                <tr key={route}>
                  <td
                    className="p-3 border-b font-mono text-xs"
                    style={{
                      borderColor: "var(--table-border)",
                      color: "var(--accent)",
                    }}
                  >
                    {route}
                  </td>
                  <td
                    className="p-3 border-b"
                    style={{ borderColor: "var(--table-border)" }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Chat Component ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-component">
          Chat Component
        </h2>
        <p className="mb-4 leading-relaxed">
          The starter app includes a self-contained chat component at{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            components/xpectrum-chat.tsx
          </code>
          . Everything is in one file — no custom hooks or abstractions.
        </p>
        <CodeBlock
          filename="components/xpectrum-chat.tsx"
          code={`'use client';

import { useState, useRef, useEffect } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function XpectrumChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>();

  const chatRef = useRef<XpectrumChat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize the SDK once
  useEffect(() => {
    chatRef.current = new XpectrumChat({
      baseUrl: process.env.NEXT_PUBLIC_CHAT_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY!,
    });
    return () => { chatRef.current?.destroy(); };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = {
      id: \`user-\${Date.now()}\`,
      role: 'user',
      text: input,
    };
    const assistantMessage: Message = {
      id: \`asst-\${Date.now()}\`,
      role: 'assistant',
      text: '',
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      await chatRef.current.sendMessage(input, {
        conversationId,
        onMessage: (responseText, messageId, convId) => {
          setConversationId(convId);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              id: messageId,
              role: 'assistant',
              text: responseText,
            };
            return updated;
          });
        },
        onError: (err) => setError(err.message),
        onCompleted: () => setIsLoading(false),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* Header, Messages, Input ... */}
    </div>
  );
}`}
        />
      </section>

      {/* ── Voice Component ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice-component">
          Voice Component
        </h2>
        <p className="mb-4 leading-relaxed">
          The voice component at{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "var(--inline-code-bg)",
              color: "var(--inline-code-text)",
            }}
          >
            components/xpectrum-voice.tsx
          </code>{" "}
          gives you a working voice call interface with live transcription.
        </p>
        <CodeBlock
          filename="components/xpectrum-voice.tsx"
          code={`'use client';

import { useState, useRef, useEffect } from 'react';
import { XpectrumVoice } from '@xpectrum/sdk';
import type { TranscriptionSegment } from '@xpectrum/sdk';

export default function XpectrumVoiceDemo() {
  const [connectionState, setConnectionState] = useState('disconnected');
  const [micEnabled, setMicEnabled] = useState(true);
  const [transcripts, setTranscripts] = useState<TranscriptionSegment[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voiceRef = useRef<XpectrumVoice | null>(null);

  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';

  // Initialize the SDK once
  useEffect(() => {
    voiceRef.current = new XpectrumVoice({
      baseUrl: process.env.NEXT_PUBLIC_VOICE_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_VOICE_API_KEY!,
      agentName: process.env.NEXT_PUBLIC_VOICE_AGENT_NAME!,
    });
    return () => { voiceRef.current?.destroy(); };
  }, []);

  async function handleConnect() {
    if (!voiceRef.current) return;
    setError(null);
    setTranscripts([]);

    try {
      await voiceRef.current.connect({
        onConnected: () => setConnectionState('connected'),
        onDisconnected: () => {
          setConnectionState('disconnected');
          setAgentSpeaking(false);
        },
        onConnectionStateChanged: (state) => setConnectionState(state),
        onAgentSpeaking: (isSpeaking) => setAgentSpeaking(isSpeaking),
        onTranscription: (segment) => {
          setTranscripts((prev) => {
            const idx = prev.findIndex((t) => t.id === segment.id);
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = segment;
              return updated;
            }
            return [...prev, segment];
          });
        },
        onError: (err) => setError(err.message),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setConnectionState('failed');
    }
  }

  async function handleDisconnect() {
    await voiceRef.current?.disconnect();
  }

  async function handleToggleMic() {
    if (!voiceRef.current) return;
    const next = !micEnabled;
    await voiceRef.current.setMicEnabled(next);
    setMicEnabled(next);
  }

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      {/* Status, Controls, Transcription ... */}
    </div>
  );
}`}
        />

        <Callout type="warning" title="Browser permission required">
          The browser will prompt for microphone access when the user clicks
          &quot;Start Call&quot;. This must be triggered by a user click — it
          can&apos;t happen automatically on page load.
        </Callout>
      </section>

      {/* ── Customizing ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="customizing">
          Customizing
        </h2>
        <p className="mb-4 leading-relaxed">
          The starter app is meant to be modified. Here are some common next
          steps:
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Change the theme</strong>
            {" — "}edit CSS variables in{" "}
            <code className="text-xs font-mono">app/globals.css</code>
          </li>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Add a chat widget</strong>
            {" — "}see the{" "}
            <a
              href="/docs/widgets"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Widgets docs
            </a>{" "}
            to add a floating chat bubble
          </li>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Extract hooks</strong>
            {" — "}as your app grows, move the SDK logic into custom hooks.
            See the{" "}
            <a
              href="/docs/nextjs-examples"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Next.js examples
            </a>{" "}
            for patterns
          </li>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Add conversation history</strong>
            {" — "}use{" "}
            <code className="text-xs font-mono">chatRef.current.getConversations()</code>{" "}
            and{" "}
            <code className="text-xs font-mono">chatRef.current.getMessages()</code>.
            See the{" "}
            <a
              href="/docs/chat"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Chat docs
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
