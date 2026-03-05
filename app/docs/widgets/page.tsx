import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "Widgets — Xpectrum SDK Docs",
};

export default function WidgetsGuidePage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Widgets</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Drop-in floating UI components for chat and voice. Zero custom UI code
        needed — just configure and go.
      </p>

      <Callout type="info" title="When to use widgets vs. custom UI">
        <p>
          <strong>Widgets</strong> are pre-built floating UIs (chat bubble, voice
          button) — great for quickly adding AI to any page. If you need full
          control over the design, use the <code className="text-xs font-mono">XpectrumChat</code> / <code className="text-xs font-mono">XpectrumVoice</code> classes directly and build your own UI.
        </p>
      </Callout>

      {/* ── ChatWidget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-widget">
          1. ChatWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          A floating chat bubble that opens into a full chat window. Uses Shadow
          DOM for style isolation — it won&apos;t conflict with your existing CSS.
        </p>

        <h3 className="text-lg font-semibold mb-2">Basic usage</h3>
        <CodeBlock
          code={`import { ChatWidget } from '@xpectrum/sdk';

const widget = new ChatWidget({
  apiKey: 'app-xxxxxxxxxxxx',
  baseUrl: 'https://app.yourserver.com/api/v1',
});

// Control programmatically
widget.open();
widget.close();
widget.toggle();
widget.destroy(); // Remove completely`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">All config options</h3>
        <PropsTable
          props={[
            { name: "apiKey", type: "string", required: true, description: "Bearer token for chat API." },
            { name: "baseUrl", type: "string", required: true, description: "Chat API endpoint URL." },
            { name: "container", type: "HTMLElement", default: "document.body", description: "DOM element to mount the widget into." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: "Where the floating button appears." },
            { name: "buttonColor", type: "string", default: "#7C3AED", description: "Hex color for the floating button." },
            { name: "buttonSize", type: "number", default: "48", description: "Button diameter in pixels." },
            { name: "theme", type: "'light' | 'dark' | 'auto'", default: "'light'", description: "Color theme for the chat window." },
            { name: "zIndex", type: "number", default: "2147483647", description: "CSS z-index for the widget." },
            { name: "welcomeMessage", type: "string", description: "Initial message shown when chat opens." },
            { name: "user", type: "string", description: "Unique user identifier for conversation history." },
            { name: "windowWidth", type: "number", default: "400", description: "Chat window width in pixels." },
            { name: "windowHeight", type: "number", default: "600", description: "Chat window height in pixels." },
          ]}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Customized example</h3>
        <CodeBlock
          code={`const widget = new ChatWidget({
  apiKey: 'app-xxxxxxxxxxxx',
  baseUrl: 'https://app.yourserver.com/api/v1',
  position: 'bottom-left',
  buttonColor: '#10b981',
  buttonSize: 56,
  theme: 'dark',
  welcomeMessage: 'Hi there! How can I help you today?',
  user: 'user-123',
  windowWidth: 450,
  windowHeight: 650,
});`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Features</h3>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>Shadow DOM for complete style isolation</li>
          <li>Auto-resizing textarea for message input</li>
          <li>Real-time message streaming with typing indicator</li>
          <li>Conversation persistence across sessions</li>
          <li>ESC key to close, Enter to send (Shift+Enter for newline)</li>
          <li>Loads app parameters (opening statement, suggested questions) on first open</li>
        </ul>
      </section>

      {/* ── VoiceWidget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice-widget">
          2. VoiceWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          A floating button that opens a voice call interface with live
          transcription.
        </p>

        <h3 className="text-lg font-semibold mb-2">Basic usage</h3>
        <CodeBlock
          code={`import { VoiceWidget } from '@xpectrum/sdk';

const widget = new VoiceWidget({
  apiKey: 'xpectrum_ai_sk_...',
  agentName: '6b00c03f-...',
  baseUrl: 'https://api-dev.xpectrum-ai.com/',
});

widget.open();
widget.close();
widget.toggle();
widget.destroy();`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">All config options</h3>
        <PropsTable
          props={[
            { name: "apiKey", type: "string", required: true, description: "API key for voice auth (x-api-key header)." },
            { name: "agentName", type: "string", required: true, description: "Agent UUID or name to connect to." },
            { name: "baseUrl", type: "string", required: true, description: "Voice server URL." },
            { name: "container", type: "HTMLElement", default: "document.body", description: "DOM element to mount into." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: "Floating button position." },
            { name: "buttonColor", type: "string", default: "#7C3AED", description: "Hex color for the button." },
            { name: "buttonSize", type: "number", default: "48", description: "Button diameter in pixels." },
            { name: "zIndex", type: "number", default: "2147483647", description: "CSS z-index." },
            { name: "windowWidth", type: "number", default: "360", description: "Voice window width in pixels." },
            { name: "windowHeight", type: "number", default: "480", description: "Voice window height in pixels." },
            { name: "onTranscription", type: "(segment) => void", description: "External callback for transcription events." },
            { name: "onStateChange", type: "(state) => void", description: "External callback for connection state changes." },
          ]}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Features</h3>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>Start/hang up call buttons</li>
          <li>Mute/unmute microphone button</li>
          <li>Real-time transcription display (last 50 segments)</li>
          <li>Color-coded connection status (gray=disconnected, amber=connecting, green=connected, red=failed)</li>
          <li>Auto-disconnect when widget closes</li>
        </ul>
      </section>

      {/* ── OmnichannelWidget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="omnichannel">
          3. OmnichannelWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          A single floating button that offers both Chat and Voice options
          in a menu. Manages both widgets internally.
        </p>

        <CodeBlock
          code={`import { OmnichannelWidget } from '@xpectrum/sdk';

const widget = new OmnichannelWidget({
  // Chat config
  chatBaseUrl: 'https://app.yourserver.com/api/v1',
  chatApiKey: 'app-xxxxxxxxxxxx',

  // Voice config
  voiceBaseUrl: 'https://api-dev.xpectrum-ai.com/',
  apiKey: 'xpectrum_ai_sk_...',
  agentName: '6b00c03f-...',

  // Shared options
  position: 'bottom-right',
  buttonColor: '#7C3AED',
  user: 'user-123',
});

// Programmatic control
widget.openChat();
widget.openVoice();
widget.close();
widget.destroy();`}
        />

        <PropsTable
          props={[
            { name: "chatBaseUrl", type: "string", required: true, description: "Chat API endpoint URL." },
            { name: "chatApiKey", type: "string", required: true, description: "Chat API key (Bearer token)." },
            { name: "voiceBaseUrl", type: "string", required: true, description: "Voice server URL." },
            { name: "apiKey", type: "string", required: true, description: "Voice API key (x-api-key)." },
            { name: "agentName", type: "string", required: true, description: "Voice agent UUID." },
            { name: "container", type: "HTMLElement", default: "document.body", description: "Mount point." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: "Button position." },
            { name: "buttonColor", type: "string", description: "Hex color for the main button." },
            { name: "zIndex", type: "number", description: "CSS z-index." },
            { name: "user", type: "string", description: "User ID for chat history." },
            { name: "chat", type: "Partial<ChatWidgetConfig>", description: "Override any ChatWidget config." },
            { name: "voice", type: "Partial<VoiceWidgetConfig>", description: "Override any VoiceWidget config." },
          ]}
        />
      </section>

      {/* ── Embed Scripts ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="embed">
          4. Embed via Script Tag (No Build Step)
        </h2>
        <p className="mb-4 leading-relaxed">
          For plain HTML pages, you can add widgets with just a script tag — no
          npm install or build step needed.
        </p>

        <h3 className="text-lg font-semibold mb-2">Chat embed</h3>
        <CodeBlock
          language="html"
          code={`<script>
  window.XpectrumChatConfig = {
    apiKey: 'app-xxxxxxxxxxxx',
    baseUrl: 'https://app.yourserver.com/api/v1',
    position: 'bottom-right',
    buttonColor: '#7C3AED',
    theme: 'light',
    welcomeMessage: 'Hi! How can I help?',
  };
</script>
<script src="https://unpkg.com/@xpectrum/sdk/dist/chat-embed.min.js" defer></script>`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Voice embed</h3>
        <CodeBlock
          language="html"
          code={`<script>
  window.XpectrumVoiceConfig = {
    token: 'xpectrum_ai_sk_...',
    baseUrl: 'https://api-dev.xpectrum-ai.com/',
    position: 'bottom-right',
    buttonColor: '#7C3AED',
  };
</script>
<script src="https://unpkg.com/@xpectrum/sdk/dist/voice-embed.min.js" defer></script>`}
        />
      </section>

      {/* ── React / Next.js usage ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="react-usage">
          5. Using Widgets in React / Next.js
        </h2>
        <Callout type="warning" title="Client component required">
          Widgets manipulate the DOM, so they must run in a client component.
          Add <code className="text-xs font-mono">&apos;use client&apos;</code> at the top of
          your file in Next.js App Router.
        </Callout>

        <CodeBlock
          filename="components/ChatBubble.tsx"
          code={`'use client';

import { useEffect, useRef } from 'react';
import { ChatWidget } from '@xpectrum/sdk';

export default function ChatBubble() {
  const widgetRef = useRef<ChatWidget | null>(null);

  useEffect(() => {
    widgetRef.current = new ChatWidget({
      apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY!,
      baseUrl: process.env.NEXT_PUBLIC_CHAT_BASE_URL!,
      position: 'bottom-right',
      buttonColor: '#7C3AED',
      theme: 'auto',
      welcomeMessage: 'Hello! How can I help you today?',
    });

    return () => widgetRef.current?.destroy();
  }, []);

  return null; // Widget manages its own DOM
}`}
        />
        <p className="leading-relaxed">
          Then use it in any page or layout:
        </p>
        <CodeBlock
          filename="app/layout.tsx"
          code={`import ChatBubble from './components/ChatBubble';

export default function RootLayout({ children }) {
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
    </article>
  );
}
