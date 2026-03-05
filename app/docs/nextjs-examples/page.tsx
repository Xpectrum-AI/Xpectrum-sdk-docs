import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";

export const metadata = {
  title: "Next.js Examples — Xpectrum SDK Docs",
};

export default function NextjsExamplesPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Next.js Examples</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Complete Next.js App Router examples with environment variables, client
        components, and custom hooks. All examples use TypeScript.
      </p>

      <Callout type="warning" title="'use client' is required">
        The Xpectrum SDK uses browser APIs (DOM, WebRTC, fetch streaming).
        All components that use the SDK must have <code className="text-xs font-mono">&apos;use client&apos;</code> at the top
        of the file. The SDK cannot be used in Server Components.
      </Callout>

      {/* ── Env vars ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="env">
          Environment Variables
        </h2>
        <CodeBlock
          filename=".env.local"
          language="env"
          code={`NEXT_PUBLIC_CHAT_BASE_URL=https://app.yourserver.com/api/v1
NEXT_PUBLIC_CHAT_API_KEY=app-xxxxxxxxxxxx
NEXT_PUBLIC_VOICE_BASE_URL=https://api-dev.xpectrum-ai.com/
NEXT_PUBLIC_VOICE_API_KEY=xpectrum_ai_sk_xxxxxxxxxxxx
NEXT_PUBLIC_VOICE_AGENT_NAME=your-agent-uuid-here`}
        />
      </section>

      {/* ── Chat hook ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-hook">
          1. Custom Hook: useChat
        </h2>
        <p className="mb-4 leading-relaxed">
          A reusable hook that wraps <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>XpectrumChat</code>. Handles initialization,
          message sending, streaming, and cleanup automatically.
        </p>
        <CodeBlock
          filename="hooks/use-chat.ts"
          code={`'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export function useChat() {
  const chatRef = useRef<XpectrumChat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>();

  useEffect(() => {
    chatRef.current = new XpectrumChat({
      baseUrl: process.env.NEXT_PUBLIC_CHAT_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY!,
      user: 'nextjs-user',
    });
    return () => {
      chatRef.current?.destroy();
    };
  }, []);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !chatRef.current) return;

    setError(null);
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: \`user-\${Date.now()}\`,
      role: 'user',
      text,
    };
    const assistantMsg: ChatMessage = {
      id: \`asst-\${Date.now()}\`,
      role: 'assistant',
      text: '',
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    try {
      await chatRef.current.sendMessage(text, {
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

        onError: (err) => {
          setError(err.message);
        },

        onCompleted: () => {
          setIsLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    }
  }, [conversationId, isLoading]);

  const reset = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return { messages, isLoading, error, conversationId, send, reset };
}`}
        />
      </section>

      {/* ── Simple Chat Page ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-page">
          2. Simple Chat Page
        </h2>
        <p className="mb-4 leading-relaxed">
          A complete chat page you can drop into your Next.js app. Just create
          the file and it works.
        </p>
        <CodeBlock
          filename="app/chat/page.tsx"
          code={`'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';

export default function ChatPage() {
  const { messages, isLoading, error, send, reset } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    send(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <button
          onClick={reset}
          className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50"
        >
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            Send a message to start chatting
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div
              className={\`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap \${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }\`}
            >
              {msg.text || (
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 mb-2 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-violet-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-violet-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}`}
        />
      </section>

      {/* ── Voice hook ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice-hook">
          3. Custom Hook: useVoice
        </h2>
        <CodeBlock
          filename="hooks/use-voice.ts"
          code={`'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { XpectrumVoice } from '@xpectrum/sdk';
import type { TranscriptionSegment } from '@xpectrum/sdk';

export function useVoice() {
  const voiceRef = useRef<XpectrumVoice | null>(null);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [micEnabled, setMicEnabled] = useState(true);
  const [transcripts, setTranscripts] = useState<TranscriptionSegment[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    voiceRef.current = new XpectrumVoice({
      baseUrl: process.env.NEXT_PUBLIC_VOICE_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_VOICE_API_KEY!,
      agentName: process.env.NEXT_PUBLIC_VOICE_AGENT_NAME!,
    });
    return () => {
      voiceRef.current?.destroy();
    };
  }, []);

  const connect = useCallback(async () => {
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
  }, []);

  const disconnect = useCallback(async () => {
    await voiceRef.current?.disconnect();
  }, []);

  const toggleMic = useCallback(async () => {
    if (!voiceRef.current) return;
    const next = !micEnabled;
    await voiceRef.current.setMicEnabled(next);
    setMicEnabled(next);
  }, [micEnabled]);

  return {
    connectionState,
    isConnected: connectionState === 'connected',
    isConnecting: connectionState === 'connecting',
    micEnabled,
    transcripts,
    agentSpeaking,
    error,
    connect,
    disconnect,
    toggleMic,
  };
}`}
        />
      </section>

      {/* ── Voice Page ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice-page">
          4. Voice Call Page
        </h2>
        <CodeBlock
          filename="app/voice/page.tsx"
          code={`'use client';

import { useRef, useEffect } from 'react';
import { useVoice } from '@/hooks/use-voice';

export default function VoicePage() {
  const {
    connectionState,
    isConnected,
    isConnecting,
    micEnabled,
    transcripts,
    agentSpeaking,
    error,
    connect,
    disconnect,
    toggleMic,
  } = useVoice();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [transcripts]);

  const statusColor =
    isConnected ? '#10b981' :
    isConnecting ? '#f59e0b' :
    connectionState === 'failed' ? '#ef4444' : '#9ca3af';

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="text-center pb-6">
        <h1 className="text-xl font-bold mb-2">AI Voice Call</h1>
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: statusColor }}
          />
          <span className="text-sm capitalize" style={{ color: 'var(--muted)' }}>
            {connectionState}
            {agentSpeaking && ' — Agent speaking'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        {!isConnected ? (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="px-6 py-3 rounded-full bg-green-500 text-white font-medium text-sm hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            {isConnecting ? 'Connecting...' : 'Start Call'}
          </button>
        ) : (
          <>
            <button
              onClick={disconnect}
              className="px-6 py-3 rounded-full bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
            >
              End Call
            </button>
            <button
              onClick={toggleMic}
              className={\`px-6 py-3 rounded-full font-medium text-sm text-white transition-colors \${
                micEnabled
                  ? 'bg-gray-500 hover:bg-gray-600'
                  : 'bg-amber-500 hover:bg-amber-600'
              }\`}
            >
              {micEnabled ? 'Mute Mic' : 'Unmute Mic'}
            </button>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Transcription */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto border rounded-xl p-4"
        style={{ borderColor: 'var(--border)' }}
      >
        {transcripts.length === 0 && (
          <p className="text-center mt-20 text-sm" style={{ color: 'var(--muted)' }}>
            {isConnected
              ? 'Start speaking — transcription will appear here'
              : 'Start a call to begin'}
          </p>
        )}

        {transcripts.map((t) => (
          <div
            key={t.id}
            className="mb-2 text-sm"
            style={{ opacity: t.isFinal ? 1 : 0.5 }}
          >
            <span
              className="font-semibold"
              style={{ color: t.speaker === 'user' ? '#7c3aed' : '#10b981' }}
            >
              {t.speaker === 'user' ? 'You' : 'Agent'}:
            </span>{' '}
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}`}
        />
      </section>

      {/* ── Widget in Layout ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="widget-layout">
          5. Adding a Chat Widget to Your Layout
        </h2>
        <p className="mb-4 leading-relaxed">
          Want a floating chat bubble on every page? Create a client component
          and add it to your root layout.
        </p>

        <CodeBlock
          filename="components/chat-bubble.tsx"
          code={`'use client';

import { useEffect, useRef } from 'react';
import { ChatWidget } from '@xpectrum/sdk';

export default function ChatBubble() {
  const widgetRef = useRef<ChatWidget | null>(null);

  useEffect(() => {
    // Only create in browser
    widgetRef.current = new ChatWidget({
      apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY!,
      baseUrl: process.env.NEXT_PUBLIC_CHAT_BASE_URL!,
      position: 'bottom-right',
      buttonColor: '#7c3aed',
      theme: 'auto',
      welcomeMessage: 'Hi! How can I help you?',
    });

    return () => {
      widgetRef.current?.destroy();
    };
  }, []);

  return null; // Widget manages its own DOM via Shadow DOM
}`}
        />

        <CodeBlock
          filename="app/layout.tsx"
          code={`import ChatBubble from '@/components/chat-bubble';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBubble />
      </body>
    </html>
  );
}`}
        />
      </section>

      {/* ── File structure ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="structure">
          6. Recommended File Structure
        </h2>
        <CodeBlock
          language="text"
          code={`my-nextjs-app/
├── app/
│   ├── layout.tsx           # Root layout (add ChatBubble here for global widget)
│   ├── page.tsx             # Home page
│   ├── chat/
│   │   └── page.tsx         # Full chat page ('use client')
│   └── voice/
│       └── page.tsx         # Voice call page ('use client')
├── components/
│   └── chat-bubble.tsx      # Widget wrapper ('use client')
├── hooks/
│   ├── use-chat.ts          # Chat hook ('use client')
│   └── use-voice.ts         # Voice hook ('use client')
├── .env.local               # Environment variables (DO NOT COMMIT)
└── package.json`}
        />
      </section>
    </article>
  );
}
