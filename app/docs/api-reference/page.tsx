import CodeBlock from "../../components/CodeBlock";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "API Reference — Xpectrum SDK Docs",
};

export default function ApiReferencePage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">API Reference</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Complete reference for every class, method, type, and event in the SDK.
      </p>

      {/* ── XpectrumChat ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="xpectrum-chat">
          XpectrumChat
        </h2>
        <CodeBlock code={`import { XpectrumChat } from '@xpectrum/sdk';`} />

        <h3 className="text-lg font-semibold mt-6 mb-2">Constructor</h3>
        <CodeBlock
          code={`const chat = new XpectrumChat(config: XpectrumChatConfig);`}
        />
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "Chat API base URL (e.g. https://app.yourserver.com/api/v1)" },
            { name: "apiKey", type: "string", required: true, description: "API key — sent as Authorization: Bearer {apiKey}" },
            { name: "user", type: "string", default: "'sdk-user'", description: "User identifier for conversation history" },
            { name: "inputs", type: "Record<string, any>", default: "{}", description: "Default input variables for every message" },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Methods</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Method</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Returns</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["sendMessage(query, options?)", "Promise<string | undefined>", "Send a message and stream response. Returns taskId."],
                ["stopResponse(taskId)", "Promise<void>", "Stop a response mid-generation."],
                ["getConversations(opts?)", "Promise<{ data, has_more }>", "List conversations. opts: { limit?, lastId?, pinned? }"],
                ["getMessages(convId, opts?)", "Promise<{ data, has_more }>", "Get messages in a conversation. opts: { limit?, lastId? }"],
                ["deleteConversation(id)", "Promise<void>", "Delete a conversation."],
                ["renameConversation(id, name)", "Promise<void>", "Rename a conversation."],
                ["generateConversationName(id)", "Promise<Conversation>", "Auto-generate a name based on content."],
                ["pinConversation(id)", "Promise<void>", "Pin a conversation."],
                ["unpinConversation(id)", "Promise<void>", "Unpin a conversation."],
                ["getAppInfo()", "Promise<AppInfo>", "Get app title, icon, description."],
                ["getAppParams()", "Promise<AppParams>", "Get opening statement, features, config."],
                ["submitFeedback(msgId, rating)", "Promise<void>", "Like/dislike/clear feedback. rating: 'like' | 'dislike' | null"],
                ["getSuggestedQuestions(msgId)", "Promise<string[]>", "Get AI-suggested follow-up questions."],
                ["speechToText(audioFile)", "Promise<string>", "Convert audio File to text."],
                ["destroy()", "void", "Abort all streams, clean up."],
              ].map(([method, returns, desc]) => (
                <tr key={method}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{method}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{returns}</td>
                  <td className="p-3 border-b text-sm" style={{ borderColor: "var(--table-border)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-2">SendMessageOptions</h3>
        <PropsTable
          props={[
            { name: "conversationId", type: "string", description: "Resume an existing conversation." },
            { name: "inputs", type: "Record<string, any>", description: "Override default inputs for this message." },
            { name: "files", type: "MessageFile[]", description: "Attached files (images)." },
            { name: "onMessage", type: "(text, messageId, conversationId) => void", description: "Text chunks — text accumulates the full answer." },
            { name: "onThought", type: "(thought: ThoughtEvent) => void", description: "Agent reasoning steps." },
            { name: "onFile", type: "(file: FileEvent) => void", description: "File attachments from the agent." },
            { name: "onMessageEnd", type: "(metadata: MessageEndEvent) => void", description: "Response complete with metadata." },
            { name: "onMessageReplace", type: "(text, messageId) => void", description: "Content moderation replaced the answer." },
            { name: "onTTSChunk", type: "(messageId, audioBase64) => void", description: "TTS audio chunk (base64)." },
            { name: "onTTSEnd", type: "(messageId, audioBase64) => void", description: "TTS complete." },
            { name: "onError", type: "(error: ErrorEvent) => void", description: "Error during streaming." },
            { name: "onCompleted", type: "() => void", description: "Stream closed." },
            { name: "getAbortController", type: "(controller) => void", description: "Access the AbortController." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">MessageFile</h3>
        <PropsTable
          props={[
            { name: "type", type: "'image'", required: true, description: "File type." },
            { name: "transfer_method", type: "'remote_url' | 'local_file'", required: true, description: "How the file is provided." },
            { name: "url", type: "string", description: "URL for remote_url method." },
            { name: "upload_file_id", type: "string", description: "File ID for local_file method." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">ThoughtEvent</h3>
        <PropsTable
          props={[
            { name: "id", type: "string", required: true, description: "Thought ID." },
            { name: "thought", type: "string", required: true, description: "What the agent is thinking." },
            { name: "observation", type: "string", description: "Result from a tool." },
            { name: "tool", type: "string", description: "Tool name being used." },
            { name: "tool_input", type: "string", description: "Input passed to the tool." },
            { name: "message_id", type: "string", required: true, description: "Parent message ID." },
            { name: "position", type: "number", required: true, description: "Order in the sequence." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">MessageEndEvent</h3>
        <PropsTable
          props={[
            { name: "task_id", type: "string", required: true, description: "Task identifier." },
            { name: "message_id", type: "string", required: true, description: "Message identifier." },
            { name: "conversation_id", type: "string", required: true, description: "Conversation identifier." },
            { name: "metadata.usage", type: "{ prompt_tokens, completion_tokens, total_tokens, total_price, currency }", description: "Token usage stats." },
            { name: "metadata.retriever_resources", type: "Array<{ dataset_name, document_name, content, score, ... }>", description: "RAG source documents." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Conversation</h3>
        <PropsTable
          props={[
            { name: "id", type: "string", required: true, description: "Conversation ID." },
            { name: "name", type: "string", required: true, description: "Conversation name/title." },
            { name: "inputs", type: "Record<string, any>", required: true, description: "Input variables used." },
            { name: "status", type: "string", required: true, description: "Conversation status." },
            { name: "introduction", type: "string", required: true, description: "Opening statement." },
            { name: "created_at", type: "number", required: true, description: "Unix timestamp." },
            { name: "updated_at", type: "number", required: true, description: "Unix timestamp." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Message</h3>
        <PropsTable
          props={[
            { name: "id", type: "string", required: true, description: "Message ID." },
            { name: "conversation_id", type: "string", required: true, description: "Parent conversation." },
            { name: "query", type: "string", required: true, description: "User's question." },
            { name: "answer", type: "string", required: true, description: "AI's response." },
            { name: "message_files", type: "Array<{ id, type, url, belongs_to }>", required: true, description: "Attached files." },
            { name: "feedback", type: "{ rating: 'like' | 'dislike' | null } | null", required: true, description: "User feedback." },
            { name: "retriever_resources", type: "Array<{ dataset_name, document_name, content, score }>", required: true, description: "RAG sources." },
            { name: "agent_thoughts", type: "ThoughtEvent[]", required: true, description: "Reasoning steps." },
            { name: "created_at", type: "number", required: true, description: "Unix timestamp." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">AppInfo</h3>
        <PropsTable
          props={[
            { name: "app_id", type: "string", required: true, description: "App identifier." },
            { name: "title", type: "string", required: true, description: "App display title." },
            { name: "description", type: "string", required: true, description: "App description." },
            { name: "icon_type", type: "string", required: true, description: "Icon type (emoji, url, etc.)." },
            { name: "icon", type: "string", required: true, description: "Icon value." },
            { name: "icon_background", type: "string", required: true, description: "Icon background color." },
            { name: "icon_url", type: "string | null", required: true, description: "Icon image URL if applicable." },
          ]}
        />
      </section>

      {/* ── XpectrumVoice ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="xpectrum-voice">
          XpectrumVoice
        </h2>
        <CodeBlock code={`import { XpectrumVoice } from '@xpectrum/sdk';`} />

        <h3 className="text-lg font-semibold mt-6 mb-2">Constructor</h3>
        <CodeBlock code={`const voice = new XpectrumVoice(config: XpectrumVoiceConfig);`} />
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "FastAPI voice server URL." },
            { name: "apiKey", type: "string", required: true, description: "API key — sent as x-api-key header." },
            { name: "agentName", type: "string", required: true, description: "Agent UUID or name to connect to." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Methods</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Method</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Returns</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["connect(callbacks?)", "Promise<void>", "Start a voice call. Callbacks are optional (can use events instead)."],
                ["disconnect()", "Promise<void>", "End the call, clean up audio, notify server."],
                ["setMicEnabled(enabled)", "Promise<void>", "Mute (false) or unmute (true) the microphone."],
                ["isMicEnabled()", "boolean", "Check if mic is currently enabled."],
                ["getConnectionState()", "VoiceConnectionState", "Get current state: 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'failed'"],
                ["getRoomName()", "string | null", "Get LiveKit room name (null if not connected)."],
                ["isConnected()", "boolean", "Shorthand for getConnectionState() === 'connected'."],
                ["on(event, handler)", "() => void", "Subscribe to event. Returns unsubscribe function."],
                ["off(event, handler)", "void", "Unsubscribe from event."],
                ["removeAllListeners(event?)", "void", "Remove all listeners (optionally for specific event)."],
                ["destroy()", "void", "Disconnect + remove all listeners."],
              ].map(([method, returns, desc]) => (
                <tr key={method}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{method}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{returns}</td>
                  <td className="p-3 border-b text-sm" style={{ borderColor: "var(--table-border)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-2">VoiceConnectCallbacks</h3>
        <PropsTable
          props={[
            { name: "onConnected", type: "(roomName: string) => void", description: "Call connected." },
            { name: "onDisconnected", type: "(reason: string) => void", description: "Call ended." },
            { name: "onTranscription", type: "(segment: TranscriptionSegment) => void", description: "Speech transcribed." },
            { name: "onAgentSpeaking", type: "(isSpeaking: boolean) => void", description: "Agent started/stopped speaking." },
            { name: "onConnectionStateChanged", type: "(state: VoiceConnectionState) => void", description: "State transition." },
            { name: "onReconnecting", type: "() => void", description: "Network reconnecting." },
            { name: "onReconnected", type: "() => void", description: "Network reconnected." },
            { name: "onError", type: "(error: { message, code? }) => void", description: "Error occurred." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">TranscriptionSegment</h3>
        <PropsTable
          props={[
            { name: "id", type: "string", required: true, description: "Segment ID. Interim results share the same ID." },
            { name: "text", type: "string", required: true, description: "Transcribed text." },
            { name: "isFinal", type: "boolean", required: true, description: "true when finalized." },
            { name: "speaker", type: "'user' | 'agent'", required: true, description: "Who spoke." },
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Voice Events</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Event</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["'connected'", "{ roomName: string }"],
                ["'disconnected'", "{ reason: string }"],
                ["'transcription'", "TranscriptionSegment"],
                ["'agentSpeaking'", "{ isSpeaking: boolean }"],
                ["'connectionStateChanged'", "{ state: VoiceConnectionState }"],
                ["'reconnecting'", "{}"],
                ["'reconnected'", "{}"],
                ["'error'", "{ message: string; code?: string }"],
                ["'microphoneChanged'", "{ enabled: boolean }"],
              ].map(([event, payload]) => (
                <tr key={event}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{event}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{payload}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── XpectrumApiError ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="api-error">
          XpectrumApiError
        </h2>
        <CodeBlock code={`import { XpectrumApiError } from '@xpectrum/sdk';`} />
        <PropsTable
          props={[
            { name: "name", type: "'XpectrumApiError'", required: true, description: "Error name (always 'XpectrumApiError')." },
            { name: "message", type: "string", required: true, description: "Human-readable error message." },
            { name: "code", type: "string", required: true, description: "Error code string." },
            { name: "status", type: "number", required: true, description: "HTTP status code (401, 403, 404, 429, 500, etc.)." },
          ]}
        />
      </section>

      {/* ── Widgets ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="widgets-ref">
          Widgets
        </h2>

        <h3 className="text-lg font-semibold mt-6 mb-2">ChatWidget</h3>
        <CodeBlock code={`import { ChatWidget } from '@xpectrum/sdk';`} />
        <p className="mb-2">Methods: <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>open()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>close()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>toggle()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>destroy()</code></p>

        <h3 className="text-lg font-semibold mt-6 mb-2">VoiceWidget</h3>
        <CodeBlock code={`import { VoiceWidget } from '@xpectrum/sdk';`} />
        <p className="mb-2">Methods: <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>open()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>close()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>toggle()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>destroy()</code></p>

        <h3 className="text-lg font-semibold mt-6 mb-2">OmnichannelWidget</h3>
        <CodeBlock code={`import { OmnichannelWidget } from '@xpectrum/sdk';`} />
        <p className="mb-2">Methods: <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>openChat()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>openVoice()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>close()</code>, <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>destroy()</code></p>

        <p className="mt-4 leading-relaxed">
          See the <a href="/docs/widgets" className="underline" style={{ color: "var(--accent)" }}>Widgets Guide</a> for full config options and examples.
        </p>
      </section>

      {/* ── TypeScript Imports ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="types">
          TypeScript Type Imports
        </h2>
        <CodeBlock
          code={`import type {
  // Chat
  XpectrumChatConfig,
  SendMessageOptions,
  MessageFile,
  ThoughtEvent,
  FileEvent,
  MessageEndEvent,
  ErrorEvent,
  Conversation,
  ConversationListResponse,
  Message,
  MessageListResponse,
  AppInfo,
  AppParams,

  // Voice
  XpectrumVoiceConfig,
  TokenResponse,
  VoiceConnectionState,
  VoiceEventMap,
  VoiceConnectCallbacks,
  TranscriptionSegment,

  // Core
  RequestOptions,
  ApiError,
  SSEEvent,
  SSEMessageData,
  EventHandler,
  UnsubscribeFn,

  // Widgets
  ChatWidgetConfig,
  VoiceWidgetConfig,
  OmnichannelWidgetConfig,
} from '@xpectrum/sdk';`}
        />
      </section>

      {/* ── API Endpoints ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="endpoints">
          Internal API Endpoints
        </h2>
        <p className="mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          These are the HTTP endpoints the SDK calls internally. You don&apos;t call
          them directly — this is for reference/debugging.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Chat</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Method</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Endpoint</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>SDK Method</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["POST", "/chat-messages", "sendMessage()"],
                ["POST", "/chat-messages/{taskId}/stop", "stopResponse()"],
                ["GET", "/conversations", "getConversations()"],
                ["GET", "/messages?conversation_id={id}", "getMessages()"],
                ["DELETE", "/conversations/{id}", "deleteConversation()"],
                ["POST", "/conversations/{id}/name", "renameConversation() / generateConversationName()"],
                ["PATCH", "/conversations/{id}/pin", "pinConversation()"],
                ["PATCH", "/conversations/{id}/unpin", "unpinConversation()"],
                ["GET", "/site", "getAppInfo()"],
                ["GET", "/parameters", "getAppParams()"],
                ["POST", "/messages/{id}/feedbacks", "submitFeedback()"],
                ["GET", "/messages/{id}/suggested-questions", "getSuggestedQuestions()"],
                ["POST", "/audio-to-text", "speechToText()"],
              ].map(([method, endpoint, sdk]) => (
                <tr key={endpoint + method}>
                  <td className="p-3 border-b font-mono text-xs font-semibold" style={{ borderColor: "var(--table-border)" }}>{method}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{endpoint}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{sdk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Voice</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Method</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Endpoint</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>SDK Method</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["POST", "/tokens/generate?agent_name={name}", "connect()"],
                ["POST", "/call-control/end-call", "disconnect()"],
              ].map(([method, endpoint, sdk]) => (
                <tr key={endpoint}>
                  <td className="p-3 border-b font-mono text-xs font-semibold" style={{ borderColor: "var(--table-border)" }}>{method}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{endpoint}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{sdk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
