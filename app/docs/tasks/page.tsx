import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Cancel Tasks — Xpectrum API Docs",
};

export default function TasksPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Cancel Tasks</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Stop an in-flight chat generation or workflow run.
      </p>

      <Endpoint method="POST" path="/v1/tasks/{task_id}/cancel" />

      <Callout type="warning" title="Closing the stream is not enough">
        Aborting the HTTP connection client-side only stops you from{" "}
        <em>reading</em> the output — the model keeps generating (and keeps
        consuming tokens) on the server. Call this endpoint to actually stop the
        work.
      </Callout>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="usage">
          Usage
        </h2>
        <p className="mb-4 leading-relaxed">
          The <InlineCode>task_id</InlineCode> is returned on every streamed
          chunk from <InlineCode>POST /chat/completions</InlineCode> and{" "}
          <InlineCode>POST /runs</InlineCode>, and on blocking chat responses.
          One endpoint serves both — cancelling is the same call for chat and
          workflow tasks.
        </p>
        <h3 className="text-lg font-semibold mt-6 mb-2">Request body</h3>
        <PropsTable
          props={[
            {
              name: "user",
              type: "string",
              required: true,
              description: "The same end-user identifier that started the task.",
            },
          ]}
        />
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/tasks/d3adbeef-0000-4000-8000-000000000000/cancel \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX" \\
  -H "Content-Type: application/json" \\
  -d '{ "user": "user-123" }'`}
        />
        <CodeBlock
          language="json"
          code={`{
  "id": "d3adbeef-0000-4000-8000-000000000000",
  "object": "task.cancelled"
}`}
        />
      </section>
    </article>
  );
}
