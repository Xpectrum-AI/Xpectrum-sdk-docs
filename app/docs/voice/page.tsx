import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "Voice Module — Xpectrum SDK Docs",
};

export default function VoiceGuidePage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Voice Module</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Add real-time AI voice calls to your app. Talk to an AI agent, get
        live transcription, and control the microphone — all through WebRTC.
      </p>

      {/* ── Overview ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="overview">
          Overview
        </h2>
        <p className="mb-4 leading-relaxed">
          <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>XpectrumVoice</code> lets users have a real-time voice conversation with an AI agent. Under the hood it uses <strong>LiveKit</strong> (WebRTC) for low-latency audio streaming.
        </p>
        <Callout type="info" title="How it works">
          <ol className="list-decimal list-inside space-y-1 mt-1">
            <li>Your app calls <code className="text-xs font-mono">voice.connect()</code></li>
            <li>SDK requests a LiveKit token from your voice server</li>
            <li>SDK connects to a LiveKit room via WebRTC</li>
            <li>User&apos;s microphone is enabled (browser permission prompt)</li>
            <li>Agent audio plays automatically, transcriptions stream in real-time</li>
            <li>On disconnect, SDK notifies the server to end the call</li>
          </ol>
        </Callout>
      </section>

      {/* ── Setup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="setup">
          1. Setup
        </h2>
        <CodeBlock
          code={`import { XpectrumVoice } from '@xpectrum/sdk';

const voice = new XpectrumVoice({
  baseUrl: 'https://api-dev.xpectrum-ai.com/',   // Your voice server URL
  apiKey: 'xpectrum_ai_sk_...',                    // API key (x-api-key header)
  agentName: '6b00c03f-f848-47ce-...',             // Agent UUID to connect to
});`}
        />
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "Your FastAPI voice server URL." },
            { name: "apiKey", type: "string", required: true, description: "API key for voice auth. Sent as x-api-key header." },
            { name: "agentName", type: "string", required: true, description: "Agent UUID or name to connect to for voice calls." },
          ]}
        />
      </section>

      {/* ── Start a Call ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="connect">
          2. Start a Voice Call
        </h2>
        <p className="mb-4 leading-relaxed">
          Call <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>voice.connect()</code> with callbacks to handle events:
        </p>
        <CodeBlock
          code={`await voice.connect({
  // Called when connection is established
  onConnected: (roomName) => {
    console.log('Call started! Room:', roomName);
    showCallUI();
  },

  // Called for every transcription update
  onTranscription: (segment) => {
    // segment.id      — unique ID (interim results share same ID)
    // segment.text    — transcribed text
    // segment.isFinal — true when transcription is finalized
    // segment.speaker — 'user' or 'agent'
    console.log(\`\${segment.speaker}: \${segment.text}\`);
  },

  // Called when agent starts/stops speaking
  onAgentSpeaking: (isSpeaking) => {
    updateStatus(isSpeaking ? 'Agent speaking...' : 'Listening...');
  },

  // Called when call ends
  onDisconnected: (reason) => {
    console.log('Call ended:', reason);
    hideCallUI();
  },

  // Called when connection state changes
  onConnectionStateChanged: (state) => {
    // 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'failed'
    console.log('State:', state);
  },

  // Network reconnection events
  onReconnecting: () => showStatus('Reconnecting...'),
  onReconnected: () => showStatus('Reconnected!'),

  // Error handler
  onError: (err) => {
    console.error('Voice error:', err.message);
  },
});`}
        />

        <Callout type="warning" title="Browser permission">
          The browser will prompt the user for microphone permission when <code className="text-xs font-mono">connect()</code> is called. This must be triggered by a user interaction (e.g. button click) — it can&apos;t happen automatically on page load.
        </Callout>
      </section>

      {/* ── Transcription ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="transcription">
          3. Understanding Transcription
        </h2>
        <p className="mb-4 leading-relaxed">
          The <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>onTranscription</code> callback receives a <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>TranscriptionSegment</code>:
        </p>
        <PropsTable
          props={[
            { name: "id", type: "string", required: true, description: "Segment ID. Interim results update the same ID, so you can replace in-place." },
            { name: "text", type: "string", required: true, description: "The transcribed text." },
            { name: "isFinal", type: "boolean", required: true, description: "true when the transcription is finalized and won't change." },
            { name: "speaker", type: "'user' | 'agent'", required: true, description: "Who said this — the user or the AI agent." },
          ]}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">How interim results work</h3>
        <CodeBlock
          language="text"
          code={`onTranscription: { id: "seg-1", text: "What",           isFinal: false, speaker: "user" }
onTranscription: { id: "seg-1", text: "What are your",   isFinal: false, speaker: "user" }
onTranscription: { id: "seg-1", text: "What are your hours?", isFinal: true, speaker: "user" }`}
        />
        <p className="leading-relaxed">
          Notice the same <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>id</code> is reused for interim updates. When building your UI, find the existing segment by ID and replace it — don&apos;t append duplicates.
        </p>

        <h3 className="text-lg font-semibold mb-2 mt-6">React pattern for transcription</h3>
        <CodeBlock
          code={`const [transcripts, setTranscripts] = useState<TranscriptionSegment[]>([]);

// In your connect callbacks:
onTranscription: (segment) => {
  setTranscripts(prev => {
    const idx = prev.findIndex(t => t.id === segment.id);
    if (idx >= 0) {
      // Update existing segment (interim → final)
      const updated = [...prev];
      updated[idx] = segment;
      return updated;
    }
    // New segment
    return [...prev, segment];
  });
},`}
        />
      </section>

      {/* ── Mic Control ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="mic">
          4. Microphone Control
        </h2>
        <CodeBlock
          code={`// Mute the mic
await voice.setMicEnabled(false);

// Unmute the mic
await voice.setMicEnabled(true);

// Check current state
const isMuted = !voice.isMicEnabled();`}
        />
      </section>

      {/* ── Disconnect ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="disconnect">
          5. End a Call
        </h2>
        <CodeBlock
          code={`await voice.disconnect();
// This:
//  1. Disconnects from the LiveKit room
//  2. Stops the microphone
//  3. Cleans up audio elements
//  4. Notifies the server via POST /call-control/end-call`}
        />
      </section>

      {/* ── Connection State ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="state">
          6. Connection State
        </h2>
        <CodeBlock
          code={`// Get current state
const state = voice.getConnectionState();
// 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'failed'

// Quick check
if (voice.isConnected()) {
  console.log('Currently in a call');
}

// Get room name
const roomName = voice.getRoomName(); // string | null`}
        />

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>State</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["disconnected", "No active call"],
                ["connecting", "Requesting token and joining LiveKit room"],
                ["connected", "In an active voice call"],
                ["reconnecting", "Temporary network issue, trying to reconnect"],
                ["failed", "Connection failed permanently"],
              ].map(([state, desc]) => (
                <tr key={state}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{state}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Event Emitter ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="events">
          7. Event Emitter (Alternative to Callbacks)
        </h2>
        <p className="mb-4 leading-relaxed">
          Besides passing callbacks to <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>connect()</code>, you can subscribe to events directly:
        </p>
        <CodeBlock
          code={`// Subscribe — returns an unsubscribe function
const unsub = voice.on('transcription', (segment) => {
  console.log(\`\${segment.speaker}: \${segment.text}\`);
});

// Later: unsubscribe
unsub();

// Or use off()
const handler = (segment) => { ... };
voice.on('transcription', handler);
voice.off('transcription', handler);

// Remove all listeners
voice.removeAllListeners();`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">All events</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Event</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Payload</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["connected", "{ roomName: string }", "Call connected"],
                ["disconnected", "{ reason: string }", "Call ended"],
                ["transcription", "TranscriptionSegment", "Speech transcribed"],
                ["agentSpeaking", "{ isSpeaking: boolean }", "Agent started/stopped speaking"],
                ["connectionStateChanged", "{ state: VoiceConnectionState }", "State transition"],
                ["reconnecting", "{}", "Network reconnecting"],
                ["reconnected", "{}", "Network reconnected"],
                ["error", "{ message: string; code?: string }", "Error occurred"],
                ["microphoneChanged", "{ enabled: boolean }", "Mic toggled"],
              ].map(([event, payload, desc]) => (
                <tr key={event}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{event}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{payload}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Cleanup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="cleanup">
          8. Cleanup
        </h2>
        <CodeBlock
          code={`// Disconnect + remove all event listeners
voice.destroy();

// In React / Next.js:
useEffect(() => {
  const voice = new XpectrumVoice({ ... });
  voiceRef.current = voice;
  return () => voice.destroy();
}, []);`}
        />
      </section>

      {/* ── Minimal Example ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="full-example">
          Full Working Example
        </h2>
        <CodeBlock
          filename="VoiceCall.tsx"
          code={`'use client';

import { useEffect, useRef, useState } from 'react';
import { XpectrumVoice } from '@xpectrum/sdk';
import type { TranscriptionSegment } from '@xpectrum/sdk';

export default function VoiceCall() {
  const voiceRef = useRef<XpectrumVoice | null>(null);
  const [state, setState] = useState<string>('disconnected');
  const [micOn, setMicOn] = useState(true);
  const [transcripts, setTranscripts] = useState<TranscriptionSegment[]>([]);

  useEffect(() => {
    voiceRef.current = new XpectrumVoice({
      baseUrl: process.env.NEXT_PUBLIC_VOICE_BASE_URL!,
      apiKey: process.env.NEXT_PUBLIC_VOICE_API_KEY!,
      agentName: process.env.NEXT_PUBLIC_VOICE_AGENT_NAME!,
    });
    return () => voiceRef.current?.destroy();
  }, []);

  const startCall = async () => {
    setTranscripts([]);
    await voiceRef.current?.connect({
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
      onError: (err) => console.error(err.message),
    });
  };

  const endCall = async () => {
    await voiceRef.current?.disconnect();
  };

  const toggleMic = async () => {
    const next = !micOn;
    await voiceRef.current?.setMicEnabled(next);
    setMicOn(next);
  };

  const isConnected = state === 'connected';

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>Voice Call</h1>
      <p>Status: <strong>{state}</strong></p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {!isConnected ? (
          <button onClick={startCall}>Start Call</button>
        ) : (
          <>
            <button onClick={endCall}>End Call</button>
            <button onClick={toggleMic}>
              {micOn ? 'Mute' : 'Unmute'}
            </button>
          </>
        )}
      </div>

      <div>
        {transcripts.map((t) => (
          <p key={t.id} style={{ opacity: t.isFinal ? 1 : 0.6 }}>
            <strong>{t.speaker}:</strong> {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}`}
        />
      </section>
    </article>
  );
}
