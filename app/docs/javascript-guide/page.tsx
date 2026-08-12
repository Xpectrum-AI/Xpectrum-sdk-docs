import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "JavaScript Guide — Xpectrum API Docs",
};

export default function JavaScriptGuidePage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">JavaScript Guide</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Step-by-step: call the API from the browser only, or keep your key
        secret behind your own server — then build and style your own chat UI.
      </p>

      <Callout type="info" title="Which option do I need?">
        <strong>Option A (client-side only)</strong> is the fastest way to try
        the API — everything runs in the browser, but the API key is visible to
        anyone who opens DevTools. <strong>Option B (client + server)</strong>{" "}
        is what you ship to production: the browser talks to <em>your</em>{" "}
        server, and only your server knows the key. In both options the{" "}
        <InlineCode>xpectrum</InlineCode> package is the recommended way —
        plain-fetch versions follow for projects that can&apos;t use it.
      </Callout>

      {/* ════════ OPTION A ════════ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="client-only">
          Option A — Client-side JavaScript only
        </h2>

        <Callout type="warning" title="The key is exposed">
          Anything in browser code is public. Before shipping a key to the
          browser, restrict it in the app&apos;s publish settings — switch{" "}
          <em>Conversation history over API</em> off (and <em>Voice calls</em>{" "}
          off where unused) so an exposed key can chat but cannot read
          transcripts. If the key needs history access, keep it on your server
          and use Option B.
        </Callout>

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 1 — Get your app key</h3>
        <p className="mb-4 leading-relaxed">
          In the Xpectrum console, open your app → <em>API Access</em> → create
          an API key. It looks like <InlineCode>app-XXXXXXXXXXXXXXXX</InlineCode>.
        </p>

        <Callout type="info" title="Who is 'user'?">
          <InlineCode>user</InlineCode> decides whose conversation history a
          request belongs to. If your site has login, use your logged-in
          user&apos;s id. If not, generate a random id once per browser and
          reuse it — each visitor gets their own private history and can never
          see another visitor&apos;s conversations:
        </Callout>
        <CodeBlock
          language="javascript"
          code={`// One id per browser, created on first visit and reused after that
let userId = localStorage.getItem("xp_user_id");
if (!userId) {
  userId = "anon-" + crypto.randomUUID();
  localStorage.setItem("xp_user_id", userId);
}`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 2 — Use the SDK (recommended)</h3>
        <p className="mb-4 leading-relaxed">
          The SDK streams by default and handles SSE parsing, conversation
          tracking, errors, and aborts for you:
        </p>
        <CodeBlock language="bash" code={`npm install xpectrum`} />
        <CodeBlock
          language="typescript"
          code={`import { XpectrumCompletions } from "xpectrum";

const ai = new XpectrumCompletions({
  baseUrl: "https://api.cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX", // still visible in the browser — prototypes only
  user: userId,                   // from Step 1
});

let conversationId: string | undefined;

async function send(question: string) {
  const result = await ai.stream(question, {
    conversationId,               // continues the same conversation
    onToken: (delta, full) => {
      // called for every token — render the reply as it arrives
      document.getElementById("answer")!.textContent = full;
    },
  });
  conversationId = result.conversationId; // save for the next message
}`}
        />
        <p className="mb-4 leading-relaxed">
          That&apos;s the whole integration — streaming replies with multi-turn
          memory. The rest of this option is only for pages that can&apos;t use
          npm packages.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-2">
          Step 3 — No build tools? Plain fetch + SSE
        </h3>
        <p className="mb-4 leading-relaxed">
          The same thing with zero dependencies — save as{" "}
          <InlineCode>index.html</InlineCode> and open it in a browser. The
          reply streams in word by word:
        </p>
        <CodeBlock
          language="html"
          filename="index.html"
          code={`<!DOCTYPE html>
<html>
<body>
  <input id="q" placeholder="Ask something..." />
  <button onclick="send()">Send</button>
  <p id="answer"></p>

  <script>
    const API_KEY = "app-XXXXXXXXXXXXXXXX"; // visible to users! prototypes only

    let userId = localStorage.getItem("xp_user_id");
    if (!userId) {
      userId = "anon-" + crypto.randomUUID();
      localStorage.setItem("xp_user_id", userId);
    }

    let conversationId = null; // keeps multi-turn memory

    async function send() {
      const question = document.getElementById("q").value;
      const answerEl = document.getElementById("answer");
      answerEl.textContent = "";

      const res = await fetch("https://api.cloud.xpectrum.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: question }],
          user: userId,
          conversation_id: conversationId,
          stream: true,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by a blank line
        const events = buffer.split("\\n\\n");
        buffer = events.pop(); // keep the incomplete tail

        for (const event of events) {
          if (!event.startsWith("data: ")) continue;   // skips ": ping" comments
          const payload = event.slice(6);
          if (payload === "[DONE]") return;

          const chunk = JSON.parse(payload);
          conversationId = chunk.conversation_id || conversationId;
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) answerEl.textContent += delta;
        }
      }
    }
  </script>
</body>
</html>`}
        />
      </section>

      {/* ════════ OPTION B ════════ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="client-server">
          Option B — Client + server (key stays secret)
        </h2>
        <p className="mb-4 leading-relaxed">
          The browser calls <em>your</em> endpoint (<InlineCode>/api/chat</InlineCode>);
          your server adds the API key and forwards the request to Xpectrum. The
          key never leaves the server.
        </p>
        <CodeBlock
          language="text"
          code={`Browser  ──►  YOUR server (/api/chat, key lives here)  ──►  api.cloud.xpectrum.dev`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 1 — Put the key in an environment variable</h3>
        <CodeBlock language="bash" filename=".env" code={`XPECTRUM_API_KEY=app-XXXXXXXXXXXXXXXX`} />
        <p className="mb-4 leading-relaxed">
          Add <InlineCode>.env</InlineCode> to <InlineCode>.gitignore</InlineCode>{" "}
          so the key is never committed.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 2 — Proxy with the SDK (simplest)</h3>
        <p className="mb-4 leading-relaxed">
          The SDK runs in Node too. This route streams from Xpectrum internally
          and returns the finished reply as JSON, which keeps the client
          trivial:
        </p>
        <CodeBlock
          language="typescript"
          filename="app/api/chat/route.ts"
          code={`import { XpectrumCompletions } from "xpectrum";

const ai = new XpectrumCompletions({
  baseUrl: "https://api.cloud.xpectrum.dev/v1",
  apiKey: process.env.XPECTRUM_API_KEY!, // secret, server-only
  user: "user-123", // from your auth session / cookie — not from the request body
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = await ai.create(body.messages, {
    conversationId: body.conversation_id,
  });

  return Response.json({
    content: result.content,
    conversation_id: result.conversationId,
  });
}`}
        />
        <p className="mb-4 leading-relaxed">
          The browser then calls it with a plain fetch — no key anywhere in
          client code:
        </p>
        <CodeBlock
          language="javascript"
          code={`const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: question }],
    conversation_id: conversationId,
  }),
});
const data = await res.json();
conversationId = data.conversation_id;
answerEl.textContent = data.content;`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">
          Step 3 — Want token-by-token streaming in the browser? Pass the stream through
        </h3>
        <p className="mb-4 leading-relaxed">
          To show the reply word by word, the proxy must forward the SSE stream
          untouched — a raw-fetch pass-through does that in a few lines:
        </p>
        <CodeBlock
          language="typescript"
          filename="app/api/chat/route.ts"
          code={`export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch("https://api.cloud.xpectrum.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.XPECTRUM_API_KEY}\`, // no NEXT_PUBLIC_ prefix!
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: body.messages,
      conversation_id: body.conversation_id,
      stream: true,
      user: "user-123", // from your auth session / cookie — not from the request body
    }),
  });

  // Forwards the SSE stream to the browser untouched
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  });
}`}
        />
        <p className="mb-4 leading-relaxed">Or the same proxy with Node.js + Express:</p>
        <CodeBlock
          language="javascript"
          filename="server.js"
          code={`require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public")); // serves your index.html

app.post("/api/chat", async (req, res) => {
  const upstream = await fetch("https://api.cloud.xpectrum.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.XPECTRUM_API_KEY, // secret, server-only
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: req.body.messages,
      conversation_id: req.body.conversation_id,
      stream: true,
      // With login: your session's user id. Without login: an id from a
      // session cookie you set. Never trust an id sent by the browser —
      // that would let one visitor read another visitor's history.
      user: "user-123",
    }),
  });

  res.status(upstream.status);
  res.set("Content-Type", upstream.headers.get("content-type"));
  const reader = upstream.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
});

app.listen(3000, () => console.log("http://localhost:3000"));`}
        />
        <p className="mb-4 leading-relaxed">
          The browser reads the streamed response exactly like Option A, Step 3
          — same SSE parsing, just with your URL (<InlineCode>/api/chat</InlineCode>)
          and no <InlineCode>Authorization</InlineCode> header.
        </p>
        <Callout type="warning" title="Never NEXT_PUBLIC_">
          In Next.js, any env var prefixed <InlineCode>NEXT_PUBLIC_</InlineCode>{" "}
          is bundled into browser code. Keep the key as{" "}
          <InlineCode>XPECTRUM_API_KEY</InlineCode> and read it only in the
          route handler.
        </Callout>
      </section>

      {/* ════════ STYLING ════════ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: "var(--border)" }} id="styling">
          Style your chat UI — fonts, colors &amp; branding
        </h2>

        <h3 className="text-lg font-semibold mt-8 mb-2">
          Easiest — the SDK&apos;s drop-in ChatWidget
        </h3>
        <p className="mb-4 leading-relaxed">
          If you don&apos;t want to build a UI at all,{" "}
          <InlineCode>xpectrum</InlineCode> ships a ready-made floating
          chat bubble. One call gives you the button, the chat window,
          streaming replies, and conversation memory — you just pick where it
          sits and what colors it uses:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { ChatWidget } from "xpectrum";

const widget = new ChatWidget({
  baseUrl: "https://api.cloud.xpectrum.dev/v1",
  apiKey: "app-XXXXXXXXXXXXXXXX",
  user: userId,                    // same rules as above: login id or per-browser id

  position: "bottom-right",        // or "bottom-left"
  buttonColor: "#2563eb",          // your brand color
  buttonSize: 56,                  // px
  theme: "auto",                   // "light" | "dark" | "auto"
  windowWidth: 400,                // px
  windowHeight: 600,               // px
  welcomeMessage: "Hi! How can I help?",
});

// widget.open(); widget.close(); widget.destroy();`}
        />
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Option</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Default</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Controls</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["position", '"bottom-right"', "Which corner of the page the bubble sits in"],
                ["buttonColor", '"#7C3AED"', "Trigger button (and accent) color"],
                ["buttonSize", "48", "Trigger button diameter in px"],
                ["theme", '"light"', "Light, dark, or follow the visitor's system"],
                ["windowWidth / windowHeight", "400 / 600", "Chat window size in px"],
                ["welcomeMessage", "app's greeting", "First message shown; falls back to the greeting configured on the app"],
                ["container", "document.body", "Mount the widget inside a specific element instead of the page corner"],
              ].map(([option, def, controls]) => (
                <tr key={option}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{option}</td>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--muted)" }}>{def}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{controls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" title="Key handling still applies">
          The widget runs in the browser, so putting the app key in its config
          exposes it. Two safe ways to ship it: restrict the key in the
          app&apos;s publish settings (history off — the widget never needs it),
          or point <InlineCode>baseUrl</InlineCode> at your Option B proxy and
          keep the real key on the server.
        </Callout>

        <h3 className="text-lg font-semibold mt-10 mb-2">
          Full control — build your own UI
        </h3>
        <p className="mb-4 leading-relaxed">
          Need fonts, layouts, or branding beyond the widget&apos;s options? The
          API returns plain data, so the look of your chat is 100% your CSS.
          The pattern below puts every visual choice in CSS variables — change a
          font or color in one place and the whole UI follows.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 1 — A minimal chat UI</h3>
        <CodeBlock
          language="html"
          filename="chat.html"
          code={`<style>
  :root {
    /* ── change these to restyle everything ── */
    --chat-font: "Inter", system-ui, sans-serif;
    --chat-font-size: 15px;
    --chat-bg: #ffffff;
    --chat-text: #111827;
    --user-bubble-bg: #2563eb;   /* your brand color */
    --user-bubble-text: #ffffff;
    --bot-bubble-bg: #f3f4f6;
    --bot-bubble-text: #111827;
    --bubble-radius: 16px;
  }

  .chat {
    font-family: var(--chat-font);
    font-size: var(--chat-font-size);
    background: var(--chat-bg);
    color: var(--chat-text);
    max-width: 420px;
    height: 560px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }
  .messages { flex: 1; overflow-y: auto; padding: 16px; }
  .bubble {
    max-width: 80%;
    padding: 10px 14px;
    margin-bottom: 8px;
    border-radius: var(--bubble-radius);
    line-height: 1.5;
    white-space: pre-wrap;
  }
  .bubble.user {
    background: var(--user-bubble-bg);
    color: var(--user-bubble-text);
    margin-left: auto;
  }
  .bubble.bot {
    background: var(--bot-bubble-bg);
    color: var(--bot-bubble-text);
  }
  .composer { display: flex; gap: 8px; padding: 12px; border-top: 1px solid #e5e7eb; }
  .composer input { flex: 1; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; font: inherit; }
  .composer button { padding: 10px 16px; border: 0; border-radius: 8px; background: var(--user-bubble-bg); color: #fff; cursor: pointer; }
</style>

<div class="chat">
  <div class="messages" id="messages"></div>
  <div class="composer">
    <input id="q" placeholder="Type a message..." />
    <button onclick="send()">Send</button>
  </div>
</div>

<script>
  let conversationId = null;

  function addBubble(role, text) {
    const el = document.createElement("div");
    el.className = "bubble " + role;
    el.textContent = text;
    document.getElementById("messages").appendChild(el);
    el.scrollIntoView();
    return el;
  }

  async function send() {
    const input = document.getElementById("q");
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    addBubble("user", question);
    const botEl = addBubble("bot", "…");

    const res = await fetch("/api/chat", {   // Option B endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: question }],
        conversation_id: conversationId,
        stream: true,
      }),
    });

    botEl.textContent = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\\n\\n");
      buffer = events.pop();
      for (const event of events) {
        if (!event.startsWith("data: ")) continue;
        const payload = event.slice(6);
        if (payload === "[DONE]") return;
        const chunk = JSON.parse(payload);
        conversationId = chunk.conversation_id || conversationId;
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) { botEl.textContent += delta; botEl.scrollIntoView(); }
      }
    }
  }
</script>`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 2 — Change the font</h3>
        <p className="mb-4 leading-relaxed">
          Load any font (e.g. from Google Fonts) and point{" "}
          <InlineCode>--chat-font</InlineCode> at it:
        </p>
        <CodeBlock
          language="html"
          code={`<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

<style>
  :root {
    --chat-font: "Poppins", sans-serif;
    --chat-font-size: 16px;   /* bigger text */
  }
</style>`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 3 — Change the colors</h3>
        <p className="mb-4 leading-relaxed">Every color is one variable:</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Variable</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Controls</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--chat-font / --chat-font-size", "Font family and size for the whole widget"],
                ["--chat-bg / --chat-text", "Chat window background and default text color"],
                ["--user-bubble-bg / --user-bubble-text", "Your user's messages and the Send button"],
                ["--bot-bubble-bg / --bot-bubble-text", "The assistant's messages"],
                ["--bubble-radius", "How rounded the message bubbles are"],
              ].map(([variable, controls]) => (
                <tr key={variable}>
                  <td className="p-3 border-b font-mono text-xs" style={{ borderColor: "var(--table-border)", color: "var(--accent)" }}>{variable}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{controls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          language="css"
          code={`/* dark theme example */
:root {
  --chat-bg: #0b1220;
  --chat-text: #e5e7eb;
  --user-bubble-bg: #7c3aed;
  --user-bubble-text: #ffffff;
  --bot-bubble-bg: #1f2937;
  --bot-bubble-text: #e5e7eb;
  --bubble-radius: 8px;
}`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-2">Step 4 — Pull branding from the app itself</h3>
        <p className="mb-4 leading-relaxed">
          <InlineCode>GET /config</InlineCode> returns the app&apos;s name,
          greeting, starter questions, and appearance settings — use it so the
          UI updates when the app&apos;s config changes, with no redeploy:
        </p>
        <CodeBlock
          language="javascript"
          code={`const config = await (await fetch("/api/config")).json(); // proxy GET /config the same way

document.querySelector(".chat-title").textContent = config.appearance.title || config.name;
if (config.greeting) addBubble("bot", config.greeting);
for (const q of config.starter_questions) addStarterChip(q);`}
        />
      </section>
    </article>
  );
}
