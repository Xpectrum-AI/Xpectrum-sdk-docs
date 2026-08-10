import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Errors — Xpectrum API Docs",
};

export default function ErrorsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Errors</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Errors use the OpenAI error envelope, so OpenAI SDKs raise their normal
        typed exceptions.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="shape">
          Error shape
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "error": {
    "message": "Conversation does not exist.",
    "type": "invalid_request_error",
    "param": null,
    "code": "conversation_not_found"
  }
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="codes">
          Common errors
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>HTTP</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>type / code</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>When</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["400", "invalid_request_error", "Malformed JSON, missing messages/inputs, bad UUID, invalid timezone, malformed base64 image, or an ended conversation."],
                ["401", "unauthorized", "Missing or invalid API key."],
                ["404", "model_not_found", "The API key's app does not support this endpoint (e.g. calling /runs with an AI Chatbot app key)."],
                ["404", "conversation_not_found", "The conversation_id does not exist (or belongs to another user)."],
                ["429", "rate_limit_exceeded", "Too many concurrent requests for the app."],
                ["429", "insufficient_quota", "The model provider's quota is exhausted."],
                ["500", "provider_not_initialized", "No model provider credentials are configured for the app."],
                ["500", "server_error", "Model invocation failed or an unexpected internal error occurred."],
              ].map(([status, code, when]) => (
                <tr key={status + code}>
                  <td className="p-3 border-b font-mono text-xs font-semibold" style={{ borderColor: "var(--table-border)" }}>{status}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{code}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="streaming-errors">
          Errors mid-stream
        </h2>
        <p className="mb-4 leading-relaxed">
          Once a stream has started the HTTP status is already 200, so a failure
          arrives as a final error event followed by{" "}
          <InlineCode>data: [DONE]</InlineCode>:
        </p>
        <CodeBlock
          language="text"
          code={`data: {"error":{"message":"Generation failed.","type":"server_error","param":null,"code":null}}

data: [DONE]`}
        />
        <Callout type="info" title="Handle both places">
          Check for an <InlineCode>error</InlineCode> key on stream events as
          well as non-2xx responses — a request can validate fine and still fail
          during generation.
        </Callout>
      </section>
    </article>
  );
}
