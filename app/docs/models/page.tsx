import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Models — Xpectrum API Docs",
};

export default function ModelsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Models</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        The OpenAI-compatible model list. An API key belongs to exactly one app,
        so the list always contains one model — that app.
      </p>

      <Endpoint method="GET" path="/v1/models" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="example">
          Example
        </h2>
        <CodeBlock
          language="bash"
          code={`curl https://cloud.xpectrum.dev/v1/models \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX"`}
        />
        <CodeBlock
          language="json"
          code={`{
  "object": "list",
  "data": [
    {
      "id": "my-app",
      "object": "model",
      "created": 1750000000,
      "owned_by": "xpectrum"
    }
  ]
}`}
        />
        <p className="mb-4 leading-relaxed">
          The model <InlineCode>id</InlineCode> is a slug derived from the
          app&apos;s name and is what comes back on every chat completion&apos;s{" "}
          <InlineCode>model</InlineCode> field.
        </p>
        <p className="mb-4 leading-relaxed">With the Xpectrum SDK:</p>
        <CodeBlock
          language="typescript"
          code={`import { XpectrumCompletions } from "xpectrum";

const ai = new XpectrumCompletions({
  baseUrl: "https://cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX",
});

const models = await ai.listModels(); // -> [{ id: "my-app", ... }]`}
        />
        <Callout type="info" title="model is informational">
          Because the API key already selects the app, the{" "}
          <InlineCode>model</InlineCode> value you send to{" "}
          <InlineCode>/chat/completions</InlineCode> is not used for routing —
          any string works. This endpoint exists so OpenAI SDKs and tools that
          list models keep working unmodified.
        </Callout>
      </section>
    </article>
  );
}
