import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Runs — Xpectrum API Docs",
};

export default function RunsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Runs</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Execute a <strong>Workflow</strong> app: send its input variables, get
        the outputs back — as one blocking response or as a stream of progress
        events.
      </p>

      <Endpoint method="POST" path="/v1/runs" />

      <Callout type="info" title="Workflow apps only">
        Only Workflow apps start a run directly. Agent Flow apps also execute
        flows internally, but they are driven through{" "}
        <InlineCode>POST /chat/completions</InlineCode>.
      </Callout>

      {/* ── Request ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="request">
          Request body
        </h2>
        <PropsTable
          props={[
            {
              name: "inputs",
              type: "object",
              required: true,
              description: "The workflow's input variables, keyed by variable name.",
            },
            {
              name: "user",
              type: "string",
              required: true,
              description: "Stable end-user identifier the run is attributed to.",
            },
            {
              name: "stream",
              type: "boolean",
              default: "false",
              description: "Stream progress events instead of waiting for the finished run.",
            },
            {
              name: "files",
              type: "array",
              description: "Optional file attachments, same shape as in /chat/completions.",
            },
          ]}
        />
      </section>

      {/* ── Blocking ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="blocking">
          Blocking run
        </h2>
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/runs \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX" \\
  -H "Content-Type: application/json" \\
  -d '{
    "inputs": { "topic": "quarterly report" },
    "user": "user-123"
  }'`}
        />
        <p className="mb-4 leading-relaxed">The response is a run object:</p>
        <CodeBlock
          language="json"
          code={`{
  "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "object": "run",
  "status": "succeeded",
  "inputs": { "topic": "quarterly report" },
  "outputs": { "summary": "..." },
  "error": null,
  "steps": 4,
  "tokens": 1832,
  "elapsed_seconds": 6.42,
  "created_at": 1754900000,
  "finished_at": 1754900006
}`}
        />
      </section>

      {/* ── Streaming ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="streaming">
          Streaming run
        </h2>
        <p className="mb-4 leading-relaxed">
          With <InlineCode>&quot;stream&quot;: true</InlineCode> the response is
          a server-sent event stream of progress events, terminated by{" "}
          <InlineCode>data: [DONE]</InlineCode>:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Event</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["run.started", "The run began; carries the run id."],
                ["step.started", "A workflow step (node) began: title, type, index."],
                ["step.completed", "The step finished: status, outputs, error, elapsed_seconds."],
                ["run.completed", "The finished run object (same shape as the blocking response)."],
              ].map(([event, meaning]) => (
                <tr key={event}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{event}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          language="text"
          code={`data: {"id":"7c9e...","object":"run.started","created_at":1754900000}

data: {"id":"3b1f...","object":"step.started","title":"Retrieve","type":"knowledge-retrieval","index":1,"created_at":1754900000}

data: {"id":"3b1f...","object":"step.completed","title":"Retrieve","type":"knowledge-retrieval","index":1,"status":"succeeded","outputs":{...},"error":null,"elapsed_seconds":0.8,"created_at":1754900000}

data: {"id":"7c9e...","object":"run.completed","status":"succeeded","outputs":{"summary":"..."},"steps":4,"tokens":1832,"elapsed_seconds":6.42,...}

data: [DONE]`}
        />
        <p className="mb-4 leading-relaxed">
          Keep-alive pings arrive as SSE comments (<InlineCode>: ping</InlineCode>).
          To stop a run in progress, call{" "}
          <InlineCode>POST /tasks/{"{task_id}"}/cancel</InlineCode>.
        </p>
      </section>
    </article>
  );
}
