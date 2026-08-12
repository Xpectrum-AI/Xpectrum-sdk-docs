import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Chat Completions — Xpectrum API Docs",
};

export default function ChatCompletionsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Chat Completions</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Send a message to an AI Chatbot, Autonomous Agent, or Agent Flow app and
        get the reply — blocking or streamed. Drop-in compatible with OpenAI
        clients.
      </p>

      <Endpoint method="POST" path="/v1/chat/completions" />

      <Callout type="info" title="App modes">
        Works for <strong>AI Chatbot</strong>, <strong>Autonomous Agent</strong>,
        and <strong>Agent Flow</strong> apps. For Workflow apps use{" "}
        <InlineCode>POST /runs</InlineCode> instead.
      </Callout>

      {/* ── Request ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="request">
          Request body
        </h2>
        <PropsTable
          props={[
            {
              name: "messages",
              type: "array",
              required: true,
              description:
                "OpenAI-style message array. The content of the LAST user message becomes the query; string and multimodal (list-of-parts) content are supported.",
            },
            {
              name: "stream",
              type: "boolean",
              default: "false",
              description: "Stream the answer as server-sent events instead of one JSON response.",
            },
            {
              name: "user",
              type: "string",
              description: "Stable end-user identifier. Threads and memory are scoped to it.",
            },
            {
              name: "conversation_id",
              type: "string (UUID)",
              description:
                "Continue an existing conversation. Omit to start a new one; the id is returned on every response.",
            },
            {
              name: "inputs",
              type: "object",
              description: "Values for the app's input fields (see GET /config → input_fields).",
            },
            {
              name: "files",
              type: "array",
              description:
                'File attachments, e.g. { "type": "image", "transfer_method": "remote_url", "url": "https://..." }.',
            },
            {
              name: "channel",
              type: "string",
              default: '"chat"',
              description: "Which channel this message originates from (e.g. chat, whatsapp, voice).",
            },
            {
              name: "channel_metadata",
              type: "object",
              description: "Free-form metadata stored with the message for the given channel.",
            },
            {
              name: "timezone",
              type: "string",
              description: 'IANA timezone for the end user, e.g. "Asia/Kolkata" or "America/New_York".',
            },
          ]}
        />
        <Callout type="warning" title="Server-side memory, not client history">
          Only the <em>last user message</em> is read from{" "}
          <InlineCode>messages</InlineCode> — earlier entries are ignored.
          Multi-turn context comes from passing{" "}
          <InlineCode>conversation_id</InlineCode> back on the next request, not
          from resending the transcript.
        </Callout>
      </section>

      {/* ── Blocking example ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="blocking">
          Blocking request
        </h2>
        <Callout type="warning" title="Not for Autonomous Agent apps">
          Blocking mode works for Chatbot and Agent Flow apps. Autonomous
          Agent apps reject it with{" "}
          <InlineCode>Agent Chat App does not support blocking mode</InlineCode>{" "}
          — use a streaming request for those.
        </Callout>
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/chat/completions \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [{ "role": "user", "content": "What are your opening hours?" }],
    "user": "user-123"
  }'`}
        />
        <p className="mb-4 leading-relaxed">Response — the OpenAI shape plus Xpectrum extension fields:</p>
        <CodeBlock
          language="json"
          code={`{
  "id": "chatcmpl-0b1e0f4a-9a7e-4c2f-b0d5-2f6a8f4f1c11",
  "object": "chat.completion",
  "created": 1754900000,
  "model": "my-app",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "We are open 9am-6pm, Monday to Friday." },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 412, "completion_tokens": 28, "total_tokens": 440 },

  "conversation_id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f",
  "task_id": "d3adbeef-0000-4000-8000-000000000000",
  "mode": "chat",
  "retriever_resources": [ ... ]
}`}
        />
        <p className="mb-4 leading-relaxed">
          <InlineCode>conversation_id</InlineCode>, <InlineCode>task_id</InlineCode>,{" "}
          <InlineCode>mode</InlineCode> and <InlineCode>retriever_resources</InlineCode>{" "}
          (citations, present when the app has them enabled) are Xpectrum
          extensions — standard OpenAI clients simply ignore them.
        </p>
      </section>

      {/* ── Multi-turn ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="multi-turn">
          Multi-turn conversations
        </h2>
        <CodeBlock
          language="python"
          code={`first = client.chat.completions.create(
    model="my-app",
    messages=[{"role": "user", "content": "My name is Ada."}],
    extra_body={"user": "user-123"},
)

followup = client.chat.completions.create(
    model="my-app",
    messages=[{"role": "user", "content": "What is my name?"}],
    extra_body={
        "user": "user-123",
        "conversation_id": first.model_extra["conversation_id"],
    },
)  # -> "Your name is Ada."`}
        />
      </section>

      {/* ── Streaming ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="streaming">
          Streaming
        </h2>
        <p className="mb-4 leading-relaxed">
          With <InlineCode>&quot;stream&quot;: true</InlineCode> the response is{" "}
          <InlineCode>text/event-stream</InlineCode>: OpenAI-style{" "}
          <InlineCode>chat.completion.chunk</InlineCode> events terminated by{" "}
          <InlineCode>data: [DONE]</InlineCode>. Keep-alive pings arrive as SSE
          comments (<InlineCode>: ping</InlineCode>), which clients ignore.
        </p>
        <CodeBlock
          language="text"
          code={`data: {"id":"chatcmpl-...","object":"chat.completion.chunk","model":"my-app","conversation_id":"5f0c...","task_id":"d3ad...","choices":[{"index":0,"delta":{"role":"assistant","content":"We"},"finish_reason":null}]}

data: {"id":"chatcmpl-...","object":"chat.completion.chunk","model":"my-app","conversation_id":"5f0c...","task_id":"d3ad...","choices":[{"index":0,"delta":{"content":" are open"},"finish_reason":null}]}

data: {"id":"chatcmpl-...","object":"chat.completion.chunk","model":"my-app","conversation_id":"5f0c...","task_id":"d3ad...","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":412,"completion_tokens":28,"total_tokens":440}}

data: [DONE]`}
        />
        <p className="mb-4 leading-relaxed">
          Every chunk carries <InlineCode>conversation_id</InlineCode> and{" "}
          <InlineCode>task_id</InlineCode> — save the task id if you want to be
          able to <InlineCode>POST /tasks/{"{task_id}"}/cancel</InlineCode> the
          generation.
        </p>
        <CodeBlock
          language="python"
          code={`stream = client.chat.completions.create(
    model="my-app",
    messages=[{"role": "user", "content": "Tell me a story."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`}
        />
      </section>

      {/* ── SDK ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="sdk">
          Using the Xpectrum SDK
        </h2>
        <p className="mb-4 leading-relaxed">
          <InlineCode>xpectrum</InlineCode> wraps this endpoint —{" "}
          <InlineCode>create()</InlineCode> resolves with the finished reply and{" "}
          <InlineCode>stream()</InlineCode> delivers tokens as they arrive, with
          SSE parsing, errors, and aborts handled for you:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { XpectrumCompletions } from "xpectrum";

const ai = new XpectrumCompletions({
  baseUrl: "https://api.cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX",
  user: "user-123",
});

// Whole reply at once
const first = await ai.create("My name is Ada.");
console.log(first.content);

// Multi-turn: pass the conversationId back
const followup = await ai.create("What is my name?", {
  conversationId: first.conversationId,
}); // -> "Your name is Ada."

// Token by token
await ai.stream("Tell me a story.", {
  conversationId: first.conversationId,
  onToken: (delta, full) => render(full),
  onDone: (result) => console.log("usage:", result.usage),
});`}
        />
        <p className="mb-4 leading-relaxed">
          Results expose the same extension fields as the raw API —{" "}
          <InlineCode>conversationId</InlineCode>, <InlineCode>taskId</InlineCode>,{" "}
          <InlineCode>usage</InlineCode>, and{" "}
          <InlineCode>retrieverResources</InlineCode> — and options accept{" "}
          <InlineCode>inputs</InlineCode>, <InlineCode>files</InlineCode>,{" "}
          <InlineCode>channel</InlineCode>, and <InlineCode>timezone</InlineCode>.
        </p>
      </section>

      {/* ── Vision ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="vision">
          Images (vision)
        </h2>
        <p className="mb-4 leading-relaxed">
          OpenAI-style <InlineCode>image_url</InlineCode> parts in the last user
          message are forwarded to the app&apos;s file pipeline. Both remote{" "}
          <InlineCode>https://</InlineCode> URLs and base64{" "}
          <InlineCode>data:</InlineCode> URIs work (the app must have file
          upload / vision enabled).
        </p>
        <CodeBlock
          language="json"
          code={`{
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "What is in this picture?" },
        { "type": "image_url", "image_url": { "url": "https://example.com/photo.jpg" } }
      ]
    }
  ],
  "user": "user-123"
}`}
        />
      </section>
    </article>
  );
}
