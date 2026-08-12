import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import InlineCode from "../../components/InlineCode";
import PropsTable from "../../components/PropsTable";

export const metadata = {
  title: "Widgets — Xpectrum API Docs",
};

export default function WidgetsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Widgets</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Drop-in chat and voice UI for any website — a floating chat window, a
        voice-call orb, or one launcher offering both. No UI code required.
      </p>

      {/* ── Install ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="install">
          Installation
        </h2>
        <p className="mb-4 leading-relaxed">
          Via npm for apps with a build step:
        </p>
        <CodeBlock language="bash" code={`npm install xpectrum`} />
        <p className="mb-4 leading-relaxed">
          Or with no build step at all — one script tag (see{" "}
          <a href="#embed" style={{ color: "var(--accent)" }}>Embed scripts</a> below).
        </p>
        <Callout type="info" title="One key does everything">
          Every widget takes the same two values: your API base URL and the
          app&apos;s API key. The key determines which agent answers — for chat
          and voice alike.
        </Callout>
      </section>

      {/* ── Chat widget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat-widget">
          1. ChatWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          A floating launcher that opens a chat window: streaming replies,
          Markdown rendering, and a greeting from your app&apos;s configured
          opening statement. It opens straight into a fresh conversation —
          no history is shown or loaded, so it is safe to use with a key that
          has history access disabled.
        </p>
        <CodeBlock
          code={`import { ChatWidget } from 'xpectrum';

new ChatWidget({
  baseUrl: 'https://app.yourserver.com/v1',
  apiKey: 'app-...',
  welcomeMessage: 'Hi! How can I help?',
  logo: 'https://yoursite.com/logo.png',
  title: 'Acme Support',
  primaryColor: '#7C3AED',
});`}
        />
        <h3 className="text-lg font-semibold mb-2 mt-6">Branding & identity</h3>
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "Xpectrum API base URL." },
            { name: "apiKey", type: "string", required: true, description: "The app's API key." },
            { name: "logo", type: "string", required: false, description: "Image URL or data: URI shown in the header." },
            { name: "title", type: "string", required: false, description: "Header title. Falls back to the app's configured title." },
            { name: "welcomeMessage", type: "string", required: false, description: "Greeting for a new conversation. Falls back to the app's opening statement." },
            { name: "inputPlaceholder", type: "string", required: false, description: "Placeholder text in the message box." },
            { name: "user", type: "string", required: false, description: "Conversation owner. Omit it and each visitor gets a stable anonymous id automatically." },
            { name: "anonymousTtlDays", type: "number", required: false, default: "30", description: "Days an auto-generated anonymous id survives." },
          ]}
        />
        <h3 className="text-lg font-semibold mb-2 mt-6">Theme & layout</h3>
        <PropsTable
          props={[
            { name: "theme", type: "'light' | 'dark' | 'auto'", required: false, default: "'light'", description: "Colour scheme; 'auto' follows the visitor's OS setting." },
            { name: "primaryColor", type: "string", required: false, default: "'#7C3AED'", description: "Brand colour — launcher, header, user bubbles, send button." },
            { name: "onPrimaryColor", type: "string", required: false, default: "'#ffffff'", description: "Text colour on top of primaryColor." },
            { name: "backgroundColor", type: "string", required: false, description: "Window background." },
            { name: "textColor", type: "string", required: false, description: "Body text colour." },
            { name: "fontFamily", type: "string", required: false, description: "Any CSS font stack." },
            { name: "fontSize", type: "number", required: false, default: "14", description: "Base font size in px — everything scales from it." },
            { name: "borderRadius", type: "number", required: false, default: "12", description: "Corner rounding in px." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", required: false, default: "'bottom-right'", description: "Screen corner for the launcher." },
            { name: "buttonSize", type: "number", required: false, default: "48", description: "Launcher diameter in px." },
            { name: "windowWidth", type: "number", required: false, default: "400", description: "Window width in px." },
            { name: "windowHeight", type: "number", required: false, default: "600", description: "Window height in px." },
            { name: "zIndex", type: "number", required: false, description: "Stack order on the host page." },
            { name: "container", type: "HTMLElement", required: false, description: "Mount point. Defaults to document.body." },
          ]}
        />
        <Callout type="info" title="Style isolation">
          Widgets render inside a Shadow DOM — your page&apos;s CSS cannot leak
          in, and the widget&apos;s cannot leak out. All theming happens through
          the config above.
        </Callout>
      </section>

      {/* ── Voice widget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice-widget">
          2. VoiceWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          A voice-assistant call card, not a chat window: a floating launcher
          opens a compact card with an animated orb. Tap the orb to start the
          call. While the agent speaks, a live analyser reads its audio and
          drives the orb and the coloured waves around it, so the motion
          follows the actual sound. Status text (&quot;Listening… /
          Speaking…&quot;), a call timer, a one-line caption of what was last
          said, and round mute / end-call controls complete the card.
        </p>
        <CodeBlock
          code={`import { VoiceWidget } from 'xpectrum';

new VoiceWidget({
  baseUrl: 'https://app.yourserver.com/v1',
  apiKey: 'app-...',
  position: 'bottom-right',
  buttonColor: '#7C3AED',
});`}
        />
        <PropsTable
          props={[
            { name: "baseUrl", type: "string", required: true, description: "Xpectrum API base URL — same one used for chat." },
            { name: "apiKey", type: "string", required: true, description: "The app's API key. The voice agent is determined by this key." },
            { name: "buttonColor", type: "string", required: false, default: "'#7C3AED'", description: "Accent colour — the orb, launcher and glow." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", required: false, default: "'bottom-right'", description: "Screen corner for the launcher." },
            { name: "buttonSize", type: "number", required: false, default: "56", description: "Launcher diameter in px." },
            { name: "windowWidth", type: "number", required: false, default: "240", description: "Call-card width in px (height fits the content)." },
            { name: "zIndex", type: "number", required: false, description: "Stack order on the host page." },
            { name: "container", type: "HTMLElement", required: false, description: "Mount point. Defaults to document.body." },
            { name: "onTranscription", type: "(segment) => void", required: false, description: "Called for each live transcription segment." },
            { name: "onStateChange", type: "(state) => void", required: false, description: "Called on call state changes (connecting, connected, …)." },
          ]}
        />
        <Callout type="warning" title="livekit-client is a peer dependency">
          Voice calls need <InlineCode>livekit-client</InlineCode>. With npm,
          install it alongside the SDK:{" "}
          <InlineCode>npm install livekit-client</InlineCode>. Without a
          bundler, add an import map so the browser can resolve it from a CDN.
          It is loaded only when a call starts — chat-only pages never download
          it.
        </Callout>
      </section>

      {/* ── Omnichannel widget ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="omnichannel-widget">
          3. OmnichannelWidget
        </h2>
        <p className="mb-4 leading-relaxed">
          One launcher for both channels. Clicking it opens a small menu —
          <strong> Chat</strong> and <strong>Voice Call</strong> — and each
          option opens the matching widget. Use it when a page should offer
          both ways to talk without two floating buttons.
        </p>
        <CodeBlock
          code={`import { OmnichannelWidget } from 'xpectrum';

new OmnichannelWidget({
  chatBaseUrl: 'https://app.yourserver.com/v1',
  chatApiKey: 'app-...',
  voiceBaseUrl: 'https://app.yourserver.com/v1',
  apiKey: 'app-...',
  position: 'bottom-right',
  buttonColor: '#7C3AED',
});`}
        />
        <PropsTable
          props={[
            { name: "chatBaseUrl", type: "string", required: true, description: "API base URL for chat." },
            { name: "chatApiKey", type: "string", required: true, description: "API key used by the chat widget." },
            { name: "voiceBaseUrl", type: "string", required: true, description: "API base URL for voice (same as chat)." },
            { name: "apiKey", type: "string", required: true, description: "API key used by the voice widget." },
            { name: "position", type: "'bottom-right' | 'bottom-left'", required: false, default: "'bottom-right'", description: "Screen corner for the launcher." },
            { name: "buttonColor", type: "string", required: false, default: "'#7C3AED'", description: "Accent colour for the launcher and menu." },
            { name: "user", type: "string", required: false, description: "Conversation owner, passed to the chat widget." },
            { name: "chat", type: "Partial<ChatWidgetConfig>", required: false, description: "Extra options forwarded to the chat widget." },
            { name: "voice", type: "Partial<VoiceWidgetConfig>", required: false, description: "Extra options forwarded to the voice widget." },
          ]}
        />
      </section>

      {/* ── Methods ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="methods">
          4. Methods
        </h2>
        <p className="mb-4 leading-relaxed">
          Every widget instance exposes the same small API:
        </p>
        <CodeBlock
          code={`const widget = new ChatWidget({ ... });

widget.open();     // open the window / card
widget.close();    // close it (a live voice call is hung up cleanly)
widget.toggle();   // flip between open and closed
widget.destroy();  // remove the widget from the page entirely`}
        />
      </section>

      {/* ── Embed scripts ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="embed">
          5. Embed scripts — no build step
        </h2>
        <p className="mb-4 leading-relaxed">
          For WordPress, Shopify, or any plain HTML site: define a small config
          object, include one script tag, done. The script loads the SDK and
          mounts the widget by itself.
        </p>
        <h3 className="text-lg font-semibold mb-2 mt-6">Chat</h3>
        <CodeBlock
          language="html"
          code={`<script>
  window.XpectrumChatConfig = {
    apiKey: 'app-...',
    baseUrl: 'https://app.yourserver.com/v1',
    // Optional branding:
    logo: 'https://yoursite.com/logo.png',
    title: 'Acme Support',
    welcomeMessage: 'Hi! How can I help?',
    primaryColor: '#7C3AED',
    theme: 'light',
  };
</script>
<script src="https://unpkg.com/xpectrum@1.0.0/dist/chat-embed.min.js" defer></script>`}
        />
        <h3 className="text-lg font-semibold mb-2 mt-6">Voice</h3>
        <CodeBlock
          language="html"
          code={`<script>
  window.XpectrumVoiceConfig = {
    apiKey: 'app-...',
    baseUrl: 'https://app.yourserver.com/v1',
    buttonColor: '#7C3AED',
  };
</script>
<script src="https://unpkg.com/xpectrum@1.0.0/dist/voice-embed.min.js" defer></script>`}
        />
        <p className="mb-4 leading-relaxed">
          Every option from the widget tables above can be set on the config
          object — logo, colours, fonts, position, all of it.
        </p>
        <Callout type="warning" title="Pin the version">
          Always keep the <InlineCode>@1.0.0</InlineCode> in the script URL. An
          unpinned URL resolves to whatever is latest, so a future release
          would reach your live site without you upgrading deliberately.
        </Callout>
      </section>

      {/* ── Key safety ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="key-safety">
          6. Your API key in a widget
        </h2>
        <p className="mb-4 leading-relaxed">
          A widget runs in the visitor&apos;s browser, so the API key is
          visible to anyone who opens developer tools — that is inherent to
          every client-side widget. Limit what an exposed key can do in your
          app&apos;s publish settings:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>
            Keep <strong>Conversation history over API</strong> switched
            <strong> off</strong> — the widget never needs it, and an exposed
            key then cannot read any transcripts.
          </li>
          <li>
            Switch <strong>Voice calls</strong> off for apps that only chat.
          </li>
        </ul>
        <p className="leading-relaxed">
          The widgets are built for this: chat opens fresh conversations
          without touching history endpoints, and the voice agent is fixed by
          the key itself — a caller cannot pick a different agent.
        </p>
      </section>
    </article>
  );
}
