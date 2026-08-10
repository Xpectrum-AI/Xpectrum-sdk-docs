import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "App Config — Xpectrum API Docs",
};

export default function ConfigPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">App Config</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Everything a client needs to render itself — greeting, starter
        questions, input fields, feature flags, upload limits, and branding — in
        one request.
      </p>

      <Endpoint method="GET" path="/v1/config" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="example">
          Example
        </h2>
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/config \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX"`}
        />
        <CodeBlock
          language="json"
          code={`{
  "object": "config",
  "name": "Support Assistant",
  "description": "Answers questions about our product.",
  "greeting": "Hi! How can I help you today?",
  "starter_questions": [
    "What are your opening hours?",
    "How do refunds work?"
  ],
  "input_fields": [
    {
      "text-input": {
        "label": "Order number",
        "variable": "order_no",
        "required": false,
        "max_length": 48
      }
    }
  ],
  "features": {
    "speech_to_text": false,
    "text_to_speech": false,
    "file_upload": true,
    "citations": true,
    "suggested_questions_after_answer": true
  },
  "limits": {
    "file_upload": { "image": { "enabled": true, "number_limits": 3, "transfer_methods": ["remote_url", "local_file"] } },
    "system": { "file_size_limit": 15, "image_file_size_limit": 10 }
  },
  "appearance": {
    "title": "Support Assistant",
    "icon_type": "emoji",
    "icon": "🤖",
    "icon_background": "#FFEAD5",
    "default_language": "en-US",
    "copyright": null,
    "privacy_policy": null,
    "custom_disclaimer": null
  }
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="fields">
          Fields
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Field</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["name / description", "The app's name and description."],
                ["greeting", "Opening message to show before the first user message."],
                ["starter_questions", "Suggested prompts to display on an empty conversation."],
                ["input_fields", "Form fields the app expects; send the values as `inputs` on /chat/completions."],
                ["features", "Booleans: speech_to_text, text_to_speech, file_upload, citations, suggested_questions_after_answer."],
                ["limits", "Upload constraints: per-type file rules and system size limits."],
                ["appearance", "Branding: title, icon, language, copyright, privacy policy, disclaimer. Empty object if not configured."],
              ].map(([field, description]) => (
                <tr key={field}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{field}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" title="One call instead of four">
          Fetch this once at startup, render the greeting and starter questions,
          build your input form from <InlineCode>input_fields</InlineCode>, and
          gate UI affordances on <InlineCode>features</InlineCode>.
        </Callout>
      </section>
    </article>
  );
}
