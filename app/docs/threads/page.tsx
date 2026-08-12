import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Threads & Messages — Xpectrum API Docs",
};

export default function ThreadsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Threads &amp; Messages</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        A thread is one conversation with the app. Threads are created
        implicitly by <InlineCode>POST /chat/completions</InlineCode> (each
        response returns its <InlineCode>conversation_id</InlineCode>, which is
        the thread id) and are scoped to the <InlineCode>user</InlineCode> that
        started them.
      </p>

      <Callout type="warning" title="Requires history access">
        These endpoints work only when <em>Conversation history over API</em>{" "}
        is enabled in the app&apos;s publish settings. When it is off — the
        recommended state for keys used in browser widgets — they return{" "}
        <InlineCode>403 Forbidden</InlineCode>. Chat itself is unaffected.
      </Callout>

      {/* ── List threads ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="list-threads">
          List threads
        </h2>
        <Endpoint method="GET" path="/v1/threads" />
        <h3 className="text-lg font-semibold mt-6 mb-2">Query parameters</h3>
        <PropsTable
          props={[
            {
              name: "user",
              type: "string",
              description: "The end-user identifier whose threads to list.",
            },
            {
              name: "limit",
              type: "integer (1–100)",
              default: "20",
              description: "Page size.",
            },
            {
              name: "after",
              type: "string (UUID)",
              description: "Cursor: pass the previous page's last_id to fetch the next page.",
            },
          ]}
        />
        <CodeBlock
          language="bash"
          code={`curl "https://api.cloud.xpectrum.dev/v1/threads?user=user-123&limit=20" \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX"`}
        />
        <CodeBlock
          language="json"
          code={`{
  "object": "list",
  "data": [
    {
      "id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f",
      "object": "thread",
      "title": "Opening hours",
      "created_at": 1754899000,
      "updated_at": 1754900000
    }
  ],
  "has_more": false,
  "limit": 20,
  "first_id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f",
  "last_id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f"
}`}
        />
        <p className="mb-4 leading-relaxed">
          Threads are ordered by most recently updated first. While{" "}
          <InlineCode>has_more</InlineCode> is true, request the next page with{" "}
          <InlineCode>after=&lt;last_id&gt;</InlineCode>.
        </p>
      </section>

      {/* ── List messages ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="list-messages">
          Get a thread&apos;s messages
        </h2>
        <Endpoint method="GET" path="/v1/threads/{thread_id}/messages" />
        <h3 className="text-lg font-semibold mt-6 mb-2">Query parameters</h3>
        <PropsTable
          props={[
            {
              name: "user",
              type: "string",
              description: "The end-user identifier the thread belongs to.",
            },
            {
              name: "limit",
              type: "integer (1–100)",
              default: "20",
              description: "Number of stored exchanges per page.",
            },
            {
              name: "before",
              type: "string (UUID)",
              description: "Cursor: pass the previous page's first_id to walk further back in history.",
            },
          ]}
        />
        <CodeBlock
          language="bash"
          code={`curl "https://api.cloud.xpectrum.dev/v1/threads/5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f/messages?user=user-123" \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX"`}
        />
        <CodeBlock
          language="json"
          code={`{
  "object": "list",
  "data": [
    {
      "id": "a1b2c3d4-...-user",
      "object": "message",
      "thread_id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f",
      "role": "user",
      "content": "What are your opening hours?",
      "created_at": 1754900000
    },
    {
      "id": "a1b2c3d4-...",
      "object": "message",
      "thread_id": "5f0c7e0e-6b0a-4f7d-9f1e-8a2b3c4d5e6f",
      "role": "assistant",
      "content": "We are open 9am-6pm, Monday to Friday.",
      "created_at": 1754900000,
      "citations": [ ... ]
    }
  ],
  "has_more": false,
  "limit": 20,
  "first_id": "a1b2c3d4-...",
  "last_id": "e5f6a7b8-..."
}`}
        />
        <p className="mb-4 leading-relaxed">
          Messages come back oldest first, ready to render as a transcript.
          Assistant messages may carry <InlineCode>citations</InlineCode>{" "}
          (knowledge-retrieval sources) and, if generation failed, an{" "}
          <InlineCode>error</InlineCode> string explaining the empty reply.
        </p>
        <Callout type="warning" title="Pagination cursors are exchange ids">
          <InlineCode>first_id</InlineCode> / <InlineCode>last_id</InlineCode>{" "}
          identify stored <em>exchanges</em> (a user + assistant pair), not the
          individual message ids inside <InlineCode>data</InlineCode>. Pass{" "}
          <InlineCode>first_id</InlineCode> back as{" "}
          <InlineCode>before</InlineCode> — don&apos;t use an id ending in{" "}
          <InlineCode>-user</InlineCode>.
        </Callout>
      </section>
    </article>
  );
}
