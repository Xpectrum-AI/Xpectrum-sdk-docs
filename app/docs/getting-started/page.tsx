import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Introduction — Xpectrum API Docs",
};

export default function GettingStartedPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Introduction</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Everything you need to make your first request to the Xpectrum API.
      </p>

      {/* ── Base URL ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="base-url">
          Base URL
        </h2>
        <CodeBlock language="text" code={`https://api.cloud.xpectrum.dev/v1`} />
        <p className="mb-4 leading-relaxed">
          All endpoints in these docs are relative to this base URL. The chat
          endpoints are <strong>OpenAI-compatible</strong>, so any OpenAI SDK
          works by pointing its <InlineCode>base_url</InlineCode> here.
        </p>
      </section>

      {/* ── Authentication ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="authentication">
          Authentication
        </h2>
        <p className="mb-4 leading-relaxed">
          Every request is authenticated with a Bearer token in the{" "}
          <InlineCode>Authorization</InlineCode> header:
        </p>
        <CodeBlock language="text" code={`Authorization: Bearer app-XXXXXXXXXXXXXXXX`} />
        <p className="mb-4 leading-relaxed">There are two kinds of keys:</p>
        <ul className="list-disc pl-6 mb-4 leading-relaxed flex flex-col gap-2">
          <li>
            <strong>App API key</strong> (<InlineCode>app-...</InlineCode>) —
            scoped to a single app. Used by every endpoint except knowledge
            search. Create one in the Xpectrum console under your app&apos;s{" "}
            <em>API Access</em> page.
          </li>
          <li>
            <strong>Knowledge API key</strong> — workspace-scoped, used only by{" "}
            <InlineCode>POST /knowledge/{"{id}"}/search</InlineCode>.
          </li>
        </ul>
        <Callout type="warning" title="Keep keys server-side">
          API keys grant full access to the app they belong to. Call this API
          from your backend — never embed a key in browser or mobile code.
        </Callout>
      </section>

      {/* ── The user identifier ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="user">
          The <InlineCode>user</InlineCode> identifier
        </h2>
        <p className="mb-4 leading-relaxed">
          Most endpoints accept a <InlineCode>user</InlineCode> field — a stable
          identifier <em>you</em> choose for your end user (for example your own
          user ID). Conversations (threads) are stored per{" "}
          <InlineCode>user</InlineCode>, so passing the same value on every
          request is what makes history and multi-turn memory line up. Chat
          endpoints take it in the JSON body; thread listing takes it as a query
          parameter.
        </p>
        <p className="mb-4 leading-relaxed">How to pick the value:</p>
        <ul className="list-disc pl-6 mb-4 leading-relaxed flex flex-col gap-2">
          <li>
            <strong>Your app has login</strong> — use the logged-in user&apos;s
            id from your own system. Their conversation history follows them
            across devices.
          </li>
          <li>
            <strong>No login (anonymous visitors)</strong> — generate a random
            id once per browser and reuse it (e.g. store it in{" "}
            <InlineCode>localStorage</InlineCode>). Each visitor then has their
            own private history, and nobody can see anyone else&apos;s
            conversations.
          </li>
        </ul>
      </section>

      {/* ── Quick start ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="quick-start">
          Quick start
        </h2>
        <p className="mb-4 leading-relaxed">Send your first message with curl:</p>
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/chat/completions \\
  -H "Authorization: Bearer app-XXXXXXXXXXXXXXXX" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [{ "role": "user", "content": "Hello!" }],
    "user": "user-123"
  }'`}
        />
        <p className="mb-4 leading-relaxed">
          Or use the official OpenAI SDK — only the base URL and key change:
        </p>
        <CodeBlock
          language="python"
          filename="quickstart.py"
          code={`from openai import OpenAI

client = OpenAI(
    base_url="https://api.cloud.xpectrum.dev/v1",
    api_key="app-XXXXXXXXXXXXXXXX",
)

response = client.chat.completions.create(
    model="my-app",  # any string; the key already selects the app
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`}
        />
        <CodeBlock
          language="typescript"
          filename="quickstart.ts"
          code={`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX",
});

const response = await client.chat.completions.create({
  model: "my-app",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(response.choices[0].message.content);`}
        />
        <p className="mb-4 leading-relaxed">
          Or use the Xpectrum SDK, which speaks this API natively and handles
          streaming and conversation state for you:
        </p>
        <CodeBlock
          language="bash"
          code={`npm install @xpectrum/sdk`}
        />
        <CodeBlock
          language="typescript"
          filename="quickstart-sdk.ts"
          code={`import { XpectrumCompletions } from "@xpectrum/sdk";

const ai = new XpectrumCompletions({
  baseUrl: "https://api.cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX",
  user: "user-123",
});

const res = await ai.create("Hello!");
console.log(res.content);`}
        />
        <Callout type="info" title="Building a web UI?">
          The <a href="/docs/javascript-guide" style={{ color: "var(--accent)" }}>JavaScript Guide</a>{" "}
          walks through both setups step by step — calling the API from the
          browser only, and the client + server pattern that keeps your key
          secret — plus how to style your chat UI (fonts, colors, branding).
        </Callout>
      </section>

      {/* ── Endpoint overview ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="endpoints">
          Endpoints at a glance
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Method</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Endpoint</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["POST", "/chat/completions", "Talk to an AI Chatbot, Autonomous Agent, or Agent Flow app (OpenAI-compatible)"],
                ["GET", "/models", "The model exposed by your API key (OpenAI-compatible)"],
                ["GET", "/threads", "List a user's conversations"],
                ["GET", "/threads/{thread_id}/messages", "Fetch one conversation's transcript"],
                ["POST", "/runs", "Execute a Workflow app"],
                ["POST", "/tasks/{task_id}/cancel", "Stop an in-flight generation or run"],
                ["POST", "/knowledge/{knowledge_id}/search", "Search a knowledge base for matching chunks"],
                ["GET", "/config", "Everything a client needs to render the app"],
              ].map(([method, endpoint, purpose]) => (
                <tr key={endpoint}>
                  <td className="p-3 border-b font-mono text-xs font-semibold" style={{ borderColor: "var(--table-border)" }}>{method}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{endpoint}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" title="App modes">
          An API key belongs to one app, and the app&apos;s type decides which
          endpoints work: <strong>AI Chatbot</strong>,{" "}
          <strong>Autonomous Agent</strong>, and <strong>Agent Flow</strong>{" "}
          apps use the chat and thread endpoints; <strong>Workflow</strong>{" "}
          apps use <InlineCode>/runs</InlineCode>. Calling the wrong one
          returns a 404 with code <InlineCode>model_not_found</InlineCode>.
        </Callout>
      </section>
    </article>
  );
}
