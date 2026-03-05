import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "Chat Module — Xpectrum SDK Docs",
};

export default function ChatGuidePage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Chat Module</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Add AI-powered streaming chat to your app. This guide covers every
        feature from basic messaging to conversation management.
      </p>

      {/* ── Overview ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="overview">
          Overview
        </h2>
        <p className="mb-4 leading-relaxed">
          <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>XpectrumChat</code> is the main class for all chat features. It handles:
        </p>
        <ul className="list-disc list-inside space-y-2 leading-relaxed">
          <li>Sending messages to an AI agent</li>
          <li>Receiving streamed responses in real-time (word by word)</li>
          <li>Managing conversation history (list, rename, delete, pin)</li>
          <li>File uploads, feedback, speech-to-text, and more</li>
        </ul>
        <Callout type="info" title="Key concept: Streaming">
          Messages stream back via <strong>Server-Sent Events (SSE)</strong>. You get the AI&apos;s response word by word — not all at once. This creates a &quot;typing&quot; effect like ChatGPT.
        </Callout>
      </section>

      {/* ── Setup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="setup">
          1. Setup
        </h2>
        <CodeBlock
          code={`import { XpectrumChat } from '@xpectrum/sdk';

const chat = new XpectrumChat({
  baseUrl: 'https://app.yourserver.com/api/v1',  // Your Xpectrum API URL
  apiKey: 'app-xxxxxxxxxxxx',                      // Your API key
  user: 'user-123',                                // Optional: unique user ID
  inputs: {},                                       // Optional: default variables
});`}
        />
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "Your Xpectrum Chat API endpoint. Always ends with something like /api/v1." },
            { name: "apiKey", type: "string", required: true, description: "Your API key from the Xpectrum admin panel. Sent as Bearer token." },
            { name: "user", type: "string", default: "'sdk-user'", description: "Unique ID for the current user. Tracks separate conversation histories per user." },
            { name: "inputs", type: "Record<string, any>", default: "{}", description: "Default variables passed with every message. Useful if your AI agent expects variables (like user name)." },
          ]}
        />
        <Callout type="warning" title="Where to create the instance">
          <strong>React/Next.js:</strong> Inside a <code className="text-xs font-mono">useEffect</code> or <code className="text-xs font-mono">useRef</code> — never in the render body, or a new instance is created on every render.
        </Callout>
      </section>

      {/* ── Send First Message ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="send-message">
          2. Send Your First Message
        </h2>
        <CodeBlock
          code={`await chat.sendMessage('Hello, what can you help me with?', {
  onMessage: (text, messageId, conversationId) => {
    console.log('AI says:', text);
  },
});`}
        />
        <p className="mb-4 leading-relaxed">
          That&apos;s it! The <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>onMessage</code> callback fires every time a new text chunk arrives. The <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>text</code> parameter <strong>accumulates</strong> — it always contains the full response so far.
        </p>

        <h3 className="text-lg font-semibold mb-2">What onMessage receives</h3>
        <PropsTable
          props={[
            { name: "text", type: "string", required: true, description: "The full accumulated response text so far. Each call has more text than the previous one." },
            { name: "messageId", type: "string", required: true, description: "Unique ID for this message (useful for feedback, suggested questions)." },
            { name: "conversationId", type: "string", required: true, description: "The conversation this message belongs to. Save this to continue the conversation later." },
          ]}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">How text accumulates</h3>
        <CodeBlock
          language="text"
          code={`Call 1: text = "Hello"
Call 2: text = "Hello!"
Call 3: text = "Hello! I"
Call 4: text = "Hello! I can"
Call 5: text = "Hello! I can help"
...
Call N: text = "Hello! I can help you with many things."`}
        />
        <p className="leading-relaxed">
          Since <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>text</code> always has the complete response, you can set it directly as your UI content — no need to concatenate.
        </p>
      </section>

      {/* ── All Callbacks ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="callbacks">
          3. All Message Callbacks
        </h2>
        <p className="mb-4 leading-relaxed">
          <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>sendMessage</code> accepts many optional callbacks. Here&apos;s every one:
        </p>
        <CodeBlock
          code={`const taskId = await chat.sendMessage('Your question', {
  // Resume an existing conversation (optional)
  conversationId: 'conv-abc-123',

  // Override default inputs for this message (optional)
  inputs: { userName: 'Alice' },

  // Attach files (optional — see "Sending Images" below)
  files: [],

  // ─── CALLBACKS (all optional) ───

  // Text chunks — text accumulates the full answer
  onMessage: (text, messageId, conversationId) => {
    updateUI(text);
  },

  // Agent reasoning steps (for agent-type apps)
  onThought: (thought) => {
    // thought.thought     — what the agent is thinking
    // thought.tool        — tool name being used (if any)
    // thought.tool_input  — input passed to the tool
    // thought.observation  — result from the tool
  },

  // File attachments from the agent
  onFile: (file) => {
    // file.url  — URL to download the file
    // file.type — MIME type
  },

  // Response complete — includes token usage, sources
  onMessageEnd: (metadata) => {
    // metadata.conversation_id
    // metadata.message_id
    // metadata.metadata.usage       — { prompt_tokens, completion_tokens, total_tokens }
    // metadata.metadata.retriever_resources — RAG source documents
  },

  // Content moderation replaced the answer
  onMessageReplace: (text, messageId) => {
    updateUI(text);
  },

  // TTS audio chunks (base64 encoded)
  onTTSChunk: (messageId, audioBase64) => {
    // Decode and queue for playback
  },

  // TTS complete
  onTTSEnd: (messageId, audioBase64) => {
    // Final audio chunk
  },

  // Error during streaming
  onError: (error) => {
    // error.message — human-readable error
    // error.code    — error code string
  },

  // Stream closed (fires regardless of success/failure)
  onCompleted: () => {
    setLoading(false);
  },

  // Get the AbortController for manual cancellation
  getAbortController: (controller) => {
    // Save controller to abort later if needed
  },
});`}
        />

        <Callout type="info" title="Which callbacks do I actually need?">
          <p>For a basic chat app, just use <strong>onMessage</strong>. For a polished app, add <strong>onError</strong> and <strong>onMessageEnd</strong>.</p>
        </Callout>
      </section>

      {/* ── Conversations ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="conversations">
          4. Conversations
        </h2>
        <p className="mb-4 leading-relaxed">
          A <strong>conversation</strong> is a thread of messages between a user and the AI — like a chat thread in WhatsApp. Each has a unique <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>conversationId</code> returned in callbacks.
        </p>

        <h3 className="text-lg font-semibold mb-2">Resume a conversation</h3>
        <CodeBlock
          code={`// First message — new conversation created automatically
let conversationId: string;

await chat.sendMessage('What are your business hours?', {
  onMessage: (text, msgId, convId) => {
    conversationId = convId;  // Save this!
    setAnswer(text);
  },
});

// Second message — pass conversationId so AI remembers context
await chat.sendMessage('Are you open on weekends?', {
  conversationId,
  onMessage: (text) => setAnswer(text),
});`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">List conversations</h3>
        <CodeBlock
          code={`const { data: conversations, has_more } = await chat.getConversations({
  limit: 20,       // How many to fetch (default 20)
  pinned: false,    // Filter by pinned status
});

// conversations = [
//   { id: 'conv-abc', name: 'Business Hours', created_at: 1234567890, ... },
//   { id: 'conv-def', name: 'Pricing Questions', created_at: 1234567891, ... },
// ]`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Pagination (load more)</h3>
        <CodeBlock
          code={`// First page
const page1 = await chat.getConversations({ limit: 20 });

// Next page
if (page1.has_more) {
  const page2 = await chat.getConversations({
    limit: 20,
    lastId: page1.data[page1.data.length - 1].id,
  });
}`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Get messages in a conversation</h3>
        <CodeBlock
          code={`const { data: messages } = await chat.getMessages('conv-abc-123', {
  limit: 20,
});

// Each message has:
//   .query    — user's question
//   .answer   — AI's response
//   .feedback — { rating: 'like' | 'dislike' | null }
//   .agent_thoughts — reasoning steps
//   .retriever_resources — RAG sources`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Rename / Pin / Delete</h3>
        <CodeBlock
          code={`// Manual rename
await chat.renameConversation('conv-abc-123', 'My Custom Name');

// Auto-generate name from content
const updated = await chat.generateConversationName('conv-abc-123');
console.log(updated.name); // "Business Hours Discussion"

// Pin / Unpin / Delete
await chat.pinConversation('conv-abc-123');
await chat.unpinConversation('conv-abc-123');
await chat.deleteConversation('conv-abc-123');`}
        />
      </section>

      {/* ── Images ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="images">
          5. Sending Images
        </h2>

        <h3 className="text-lg font-semibold mb-2">Remote URL</h3>
        <CodeBlock
          code={`await chat.sendMessage('What is in this image?', {
  files: [{
    type: 'image',
    transfer_method: 'remote_url',
    url: 'https://example.com/photo.jpg',
  }],
  onMessage: (text) => console.log(text),
});`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Uploaded file ID</h3>
        <CodeBlock
          code={`await chat.sendMessage('Describe this photo', {
  files: [{
    type: 'image',
    transfer_method: 'local_file',
    upload_file_id: 'file-xyz-123',
  }],
  onMessage: (text) => console.log(text),
});`}
        />
      </section>

      {/* ── Stop Response ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="stop-response">
          6. Stop a Response Mid-Stream
        </h2>
        <CodeBlock
          code={`// sendMessage returns a taskId
const taskId = await chat.sendMessage('Write a very long essay...', {
  onMessage: (text) => setAnswer(text),
});

// Later, stop the generation:
if (taskId) {
  await chat.stopResponse(taskId);
  // The stream stops and onCompleted fires
}`}
        />
      </section>

      {/* ── App Info ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="app-info">
          7. Get App Info &amp; Settings
        </h2>
        <CodeBlock
          code={`// App display info
const info = await chat.getAppInfo();
// { app_id, title, description, icon, icon_type, icon_background, icon_url }

// App configuration (features, opening message, etc.)
const params = await chat.getAppParams();
// {
//   opening_statement: 'Hi! How can I help?',
//   suggested_questions: ['What are your hours?', 'Tell me about pricing'],
//   speech_to_text: { enabled: true },
//   text_to_speech: { enabled: true, voice: 'alloy', language: 'en-US' },
//   file_upload: { image: { enabled: true, number_limits: 3 } },
//   ...
// }`}
        />
        <p className="leading-relaxed">
          Use <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>getAppParams()</code> to configure your UI — show suggested questions, enable voice input, etc.
        </p>
      </section>

      {/* ── Feedback ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="feedback">
          8. Feedback &amp; Suggested Questions
        </h2>
        <CodeBlock
          code={`// Like / Dislike / Remove feedback
await chat.submitFeedback('msg-xyz-123', 'like');
await chat.submitFeedback('msg-xyz-123', 'dislike');
await chat.submitFeedback('msg-xyz-123', null);     // Remove

// Get suggested follow-up questions
const suggestions = await chat.getSuggestedQuestions('msg-xyz-123');
// ['What about pricing?', 'Can I schedule a demo?']`}
        />
      </section>

      {/* ── Speech to Text ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="speech-to-text">
          9. Speech-to-Text
        </h2>
        <CodeBlock
          code={`// From a file input
const fileInput = document.getElementById('audioInput') as HTMLInputElement;
const audioFile = fileInput.files![0];

const transcription = await chat.speechToText(audioFile);
console.log(transcription); // "What are your business hours?"`}
        />
      </section>

      {/* ── TTS ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="tts">
          10. Text-to-Speech (TTS)
        </h2>
        <p className="mb-4 leading-relaxed">
          If TTS is enabled on your app, audio chunks arrive via callbacks:
        </p>
        <CodeBlock
          code={`const audioChunks: string[] = [];

await chat.sendMessage('Tell me a story', {
  onMessage: (text) => setAnswer(text),

  onTTSChunk: (messageId, audioBase64) => {
    audioChunks.push(audioBase64);
  },

  onTTSEnd: (messageId, audioBase64) => {
    audioChunks.push(audioBase64);
    const fullAudio = audioChunks.join('');
    const audio = new Audio(\`data:audio/mp3;base64,\${fullAudio}\`);
    audio.play();
  },
});`}
        />
      </section>

      {/* ── Cleanup ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="cleanup">
          11. Cleanup
        </h2>
        <CodeBlock
          code={`// Always destroy when done (aborts all active streams)
chat.destroy();

// In React / Next.js:
useEffect(() => {
  const chat = new XpectrumChat({ ... });
  chatRef.current = chat;
  return () => chat.destroy();  // Cleanup on unmount
}, []);`}
        />
      </section>

      {/* ── Error Handling ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="errors">
          12. Error Handling
        </h2>

        <h3 className="text-lg font-semibold mb-2">REST API errors</h3>
        <p className="mb-2 leading-relaxed">
          Methods like <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>getConversations()</code>, <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>getAppInfo()</code>, etc. throw on failure:
        </p>
        <CodeBlock
          code={`import { XpectrumApiError } from '@xpectrum/sdk';

try {
  const conversations = await chat.getConversations();
} catch (error) {
  if (error instanceof XpectrumApiError) {
    console.error(error.message); // Human-readable
    console.error(error.status);  // 401, 403, 404, 429, 500
    console.error(error.code);    // 'unauthorized', etc.
  }
}`}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Streaming errors</h3>
        <p className="mb-2 leading-relaxed">
          Streaming errors come through the <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>onError</code> callback — they don&apos;t throw:
        </p>
        <CodeBlock
          code={`await chat.sendMessage('Hello', {
  onMessage: (text) => setAnswer(text),
  onError: (err) => {
    showError(err.message);
    // The chat instance is still usable for the next message
  },
});`}
        />
      </section>
    </article>
  );
}
