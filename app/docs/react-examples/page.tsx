import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";

export const metadata = {
  title: "React Examples — Xpectrum SDK Docs",
};

export default function ReactExamplesPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">React Examples</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Complete, copy-paste React components for chat and voice. Built for
        Vite + TypeScript but works with any React setup.
      </p>

      <Callout type="info" title="Setup">
        Make sure you&apos;ve installed the SDK and set up environment variables. See
        the <a href="/docs/getting-started" className="underline" style={{ color: "var(--accent)" }}>Getting Started</a> guide.
      </Callout>

      {/* ── Environment ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="env">
          Environment Variables
        </h2>
        <CodeBlock
          filename=".env"
          language="env"
          code={`VITE_CHAT_BASE_URL=https://app.yourserver.com/api/v1
VITE_CHAT_API_KEY=app-xxxxxxxxxxxx
VITE_VOICE_BASE_URL=https://api-dev.xpectrum-ai.com/
VITE_VOICE_API_KEY=xpectrum_ai_sk_xxxxxxxxxxxx
VITE_VOICE_AGENT_NAME=your-agent-uuid-here`}
        />
      </section>

      {/* ── useXpectrumChat hook ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="use-chat-hook">
          1. Custom Hook: useXpectrumChat
        </h2>
        <p className="mb-4 leading-relaxed">
          This reusable hook encapsulates all chat logic. Use it in any
          component.
        </p>
        <CodeBlock
          filename="src/hooks/useXpectrumChat.ts"
          code={`import { useEffect, useRef, useState, useCallback } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export function useXpectrumChat() {
  const chatRef = useRef<XpectrumChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [conversationId, setConversationId] = useState<string>();

  // Initialize once
  useEffect(() => {
    chatRef.current = new XpectrumChat({
      baseUrl: import.meta.env.VITE_CHAT_BASE_URL,
      apiKey: import.meta.env.VITE_CHAT_API_KEY,
      user: 'demo-user',
    });
    return () => chatRef.current?.destroy();
  }, []);

  // Send a message
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading || !chatRef.current) return;

    setError(undefined);
    setLoading(true);

    // Add user message + empty assistant placeholder
    const userMsg: Message = { id: \`user-\${Date.now()}\`, role: 'user', text };
    const assistantMsg: Message = { id: \`asst-\${Date.now()}\`, role: 'assistant', text: '' };
    setMessages(prev => [...prev, userMsg, assistantMsg]);

    await chatRef.current.sendMessage(text, {
      conversationId,

      onMessage: (responseText, messageId, convId) => {
        setConversationId(convId);
        setMessages(prev => {
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
        setLoading(false);
      },

      onCompleted: () => {
        setLoading(false);
      },
    });
  }, [conversationId, loading]);

  // Start a new conversation
  const newConversation = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(undefined);
  }, []);

  return { messages, loading, error, conversationId, sendMessage, newConversation };
}`}
        />
      </section>

      {/* ── Simple Chat Component ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="simple-chat">
          2. Simple Chat Component
        </h2>
        <p className="mb-4 leading-relaxed">
          The most basic chat UI using the hook above. Copy this into your
          project and it works.
        </p>
        <CodeBlock
          filename="src/components/SimpleChat.tsx"
          code={`import { useState } from 'react';
import { useXpectrumChat } from '../hooks/useXpectrumChat';

export default function SimpleChat() {
  const { messages, loading, error, sendMessage, newConversation } = useXpectrumChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Chat</h2>
        <button onClick={newConversation}>New Chat</button>
      </div>

      {/* Messages */}
      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        minHeight: 300,
        maxHeight: 500,
        overflowY: 'auto',
        marginBottom: 16,
      }}>
        {messages.length === 0 && (
          <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: 80 }}>
            Send a message to start chatting
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: 12,
                background: msg.role === 'user' ? '#7c3aed' : '#f3f4f6',
                color: msg.role === 'user' ? '#fff' : '#111',
                fontSize: 14,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text || '...'}
            </div>
          </div>
        ))}

        {loading && (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>AI is typing...</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 8 }}>
          Error: {error}
        </p>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: '#7c3aed',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}`}
        />
      </section>

      {/* ── Chat with Conversation List ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-with-sidebar">
          3. Chat with Conversation History
        </h2>
        <p className="mb-4 leading-relaxed">
          A more complete example that shows a sidebar with past conversations
          and lets you switch between them.
        </p>
        <CodeBlock
          filename="src/components/ChatWithHistory.tsx"
          code={`import { useEffect, useRef, useState, useCallback } from 'react';
import { XpectrumChat } from '@xpectrum/sdk';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface Conversation {
  id: string;
  name: string;
  created_at: number;
}

export default function ChatWithHistory() {
  const chatRef = useRef<XpectrumChat | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize
  useEffect(() => {
    chatRef.current = new XpectrumChat({
      baseUrl: import.meta.env.VITE_CHAT_BASE_URL,
      apiKey: import.meta.env.VITE_CHAT_API_KEY,
      user: 'demo-user',
    });
    loadConversations();
    return () => chatRef.current?.destroy();
  }, []);

  // Load conversation list
  const loadConversations = async () => {
    if (!chatRef.current) return;
    try {
      const { data } = await chatRef.current.getConversations({ limit: 50 });
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  // Load messages for a conversation
  const loadConversation = async (convId: string) => {
    if (!chatRef.current) return;
    setActiveConvId(convId);
    const { data } = await chatRef.current.getMessages(convId, { limit: 50 });
    // Convert server messages to our format
    const msgs: Message[] = [];
    for (const msg of data) {
      msgs.push({ id: \`q-\${msg.id}\`, role: 'user', text: msg.query });
      msgs.push({ id: msg.id, role: 'assistant', text: msg.answer });
    }
    setMessages(msgs);
  };

  // Send message
  const handleSend = useCallback(async () => {
    if (!input.trim() || loading || !chatRef.current) return;
    const query = input;
    setInput('');
    setLoading(true);

    const userMsg: Message = { id: \`u-\${Date.now()}\`, role: 'user', text: query };
    const assistantMsg: Message = { id: \`a-\${Date.now()}\`, role: 'assistant', text: '' };
    setMessages(prev => [...prev, userMsg, assistantMsg]);

    await chatRef.current.sendMessage(query, {
      conversationId: activeConvId,
      onMessage: (text, messageId, convId) => {
        if (!activeConvId) setActiveConvId(convId);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { id: messageId, role: 'assistant', text };
          return updated;
        });
      },
      onCompleted: () => {
        setLoading(false);
        loadConversations(); // Refresh sidebar
      },
      onError: () => setLoading(false),
    });
  }, [input, loading, activeConvId]);

  // New conversation
  const newChat = () => {
    setActiveConvId(undefined);
    setMessages([]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: 260,
        borderRight: '1px solid #e5e7eb',
        padding: 16,
        overflowY: 'auto',
      }}>
        <button
          onClick={newChat}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            background: '#7c3aed',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          + New Chat
        </button>

        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => loadConversation(conv.id)}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              marginBottom: 4,
              cursor: 'pointer',
              background: activeConvId === conv.id ? '#ede9fe' : 'transparent',
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {conv.name || 'Untitled'}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: msg.role === 'user' ? '#7c3aed' : '#f3f4f6',
                  color: msg.role === 'user' ? '#fff' : '#111',
                  fontSize: 14,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text || '...'}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            disabled={loading}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 8,
              border: '1px solid #e5e7eb', fontSize: 14,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: '10px 20px', borderRadius: 8, background: '#7c3aed',
              color: '#fff', border: 'none', cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}`}
        />
      </section>

      {/* ── useXpectrumVoice hook ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="use-voice-hook">
          4. Custom Hook: useXpectrumVoice
        </h2>
        <CodeBlock
          filename="src/hooks/useXpectrumVoice.ts"
          code={`import { useEffect, useRef, useState, useCallback } from 'react';
import { XpectrumVoice } from '@xpectrum/sdk';
import type { TranscriptionSegment } from '@xpectrum/sdk';

export function useXpectrumVoice() {
  const voiceRef = useRef<XpectrumVoice | null>(null);
  const [state, setState] = useState<string>('disconnected');
  const [micEnabled, setMicEnabled] = useState(true);
  const [transcripts, setTranscripts] = useState<TranscriptionSegment[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    voiceRef.current = new XpectrumVoice({
      baseUrl: import.meta.env.VITE_VOICE_BASE_URL,
      apiKey: import.meta.env.VITE_VOICE_API_KEY,
      agentName: import.meta.env.VITE_VOICE_AGENT_NAME,
    });
    return () => voiceRef.current?.destroy();
  }, []);

  const connect = useCallback(async () => {
    if (!voiceRef.current) return;
    setError(undefined);
    setTranscripts([]);

    await voiceRef.current.connect({
      onConnected: () => setState('connected'),
      onDisconnected: () => setState('disconnected'),
      onConnectionStateChanged: (s) => setState(s),
      onTranscription: (seg) => {
        setTranscripts(prev => {
          const idx = prev.findIndex(t => t.id === seg.id);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = seg;
            return updated;
          }
          return [...prev, seg];
        });
      },
      onError: (err) => setError(err.message),
    });
  }, []);

  const disconnect = useCallback(async () => {
    await voiceRef.current?.disconnect();
  }, []);

  const toggleMic = useCallback(async () => {
    const next = !micEnabled;
    await voiceRef.current?.setMicEnabled(next);
    setMicEnabled(next);
  }, [micEnabled]);

  return {
    state,
    micEnabled,
    transcripts,
    error,
    connect,
    disconnect,
    toggleMic,
    isConnected: state === 'connected',
  };
}`}
        />
      </section>

      {/* ── Simple Voice Component ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="simple-voice">
          5. Simple Voice Call Component
        </h2>
        <CodeBlock
          filename="src/components/SimpleVoiceCall.tsx"
          code={`import { useXpectrumVoice } from '../hooks/useXpectrumVoice';

export default function SimpleVoiceCall() {
  const {
    state,
    micEnabled,
    transcripts,
    error,
    connect,
    disconnect,
    toggleMic,
    isConnected,
  } = useXpectrumVoice();

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h2>Voice Call</h2>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: isConnected ? '#10b981' : state === 'connecting' ? '#f59e0b' : '#9ca3af',
        }} />
        <span style={{ fontSize: 14, textTransform: 'capitalize' }}>{state}</span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {!isConnected ? (
          <button
            onClick={connect}
            disabled={state === 'connecting'}
            style={{
              padding: '12px 24px', borderRadius: 8, background: '#10b981',
              color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14,
            }}
          >
            {state === 'connecting' ? 'Connecting...' : 'Start Call'}
          </button>
        ) : (
          <>
            <button
              onClick={disconnect}
              style={{
                padding: '12px 24px', borderRadius: 8, background: '#ef4444',
                color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14,
              }}
            >
              End Call
            </button>
            <button
              onClick={toggleMic}
              style={{
                padding: '12px 24px', borderRadius: 8,
                background: micEnabled ? '#6b7280' : '#f59e0b',
                color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14,
              }}
            >
              {micEnabled ? 'Mute' : 'Unmute'}
            </button>
          </>
        )}
      </div>

      {/* Error */}
      {error && <p style={{ color: '#ef4444', fontSize: 14 }}>Error: {error}</p>}

      {/* Transcription */}
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 12,
        padding: 16, minHeight: 200, maxHeight: 400, overflowY: 'auto',
      }}>
        {transcripts.length === 0 && (
          <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: 60 }}>
            Transcription will appear here during the call
          </p>
        )}
        {transcripts.map((t) => (
          <p key={t.id} style={{ margin: '6px 0', fontSize: 14, opacity: t.isFinal ? 1 : 0.5 }}>
            <strong style={{ color: t.speaker === 'user' ? '#7c3aed' : '#10b981' }}>
              {t.speaker}:
            </strong>{' '}
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}`}
        />
      </section>

      {/* ── App.tsx ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="app-entry">
          6. Putting It Together — App.tsx
        </h2>
        <CodeBlock
          filename="src/App.tsx"
          code={`import SimpleChat from './components/SimpleChat';
import SimpleVoiceCall from './components/SimpleVoiceCall';
import { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState<'chat' | 'voice'>('chat');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Tab switcher */}
      <div style={{
        display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb',
        maxWidth: 600, margin: '0 auto',
      }}>
        <button
          onClick={() => setTab('chat')}
          style={{
            flex: 1, padding: '12px', border: 'none', cursor: 'pointer',
            background: 'transparent', fontSize: 14, fontWeight: 600,
            borderBottom: tab === 'chat' ? '2px solid #7c3aed' : '2px solid transparent',
            color: tab === 'chat' ? '#7c3aed' : '#6b7280',
          }}
        >
          Chat
        </button>
        <button
          onClick={() => setTab('voice')}
          style={{
            flex: 1, padding: '12px', border: 'none', cursor: 'pointer',
            background: 'transparent', fontSize: 14, fontWeight: 600,
            borderBottom: tab === 'voice' ? '2px solid #7c3aed' : '2px solid transparent',
            color: tab === 'voice' ? '#7c3aed' : '#6b7280',
          }}
        >
          Voice
        </button>
      </div>

      {/* Content */}
      {tab === 'chat' ? <SimpleChat /> : <SimpleVoiceCall />}
    </div>
  );
}`}
        />
      </section>
    </article>
  );
}
