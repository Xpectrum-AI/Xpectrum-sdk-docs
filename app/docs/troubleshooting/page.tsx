import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";

export const metadata = {
  title: "Troubleshooting — Xpectrum SDK Docs",
};

export default function TroubleshootingPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Troubleshooting</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Common errors, debugging tips, and solutions for known issues.
      </p>

      {/* ── Installation Issues ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="installation">
          Installation Issues
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Module not found: @xpectrum/sdk
          </h3>
          <p className="mb-2 leading-relaxed">The SDK is not installed or not resolvable.</p>
          <p className="font-semibold mb-1">Fix:</p>
          <CodeBlock language="bash" code={`npm install @xpectrum/sdk`} />
          <p className="leading-relaxed">
            If using a monorepo, make sure you&apos;re installing in the correct
            workspace. Check that <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>@xpectrum/sdk</code> appears in your <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>package.json</code> dependencies.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            TypeError: Cannot read properties of undefined (reading &apos;Room&apos;)
          </h3>
          <p className="mb-2 leading-relaxed">
            The <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>livekit-client</code> dependency is missing or not properly installed.
          </p>
          <p className="font-semibold mb-1">Fix:</p>
          <CodeBlock language="bash" code={`npm install livekit-client`} />
        </div>
      </section>

      {/* ── Auth Errors ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="auth-errors">
          Authentication Errors
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            401 Unauthorized
          </h3>
          <p className="mb-2 leading-relaxed">Your API key is invalid, expired, or missing.</p>
          <p className="font-semibold mb-1">Checklist:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Is the API key correct? Copy it fresh from the admin panel.</li>
            <li>Is the environment variable name correct? (<code className="text-xs font-mono">NEXT_PUBLIC_</code> prefix for Next.js, <code className="text-xs font-mono">VITE_</code> for Vite)</li>
            <li>Did you restart the dev server after changing <code className="text-xs font-mono">.env.local</code>?</li>
            <li>Is the key for the right module? (Chat uses Bearer token, Voice uses x-api-key)</li>
          </ul>
          <Callout type="warning" title="Common mistake">
            Environment variable changes require a dev server restart. Just saving the file is not enough.
          </Callout>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            403 Forbidden
          </h3>
          <p className="mb-2 leading-relaxed">The app is disabled or your key lacks permissions.</p>
          <p className="font-semibold mb-1">Fix:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Check the app settings in the Xpectrum admin panel</li>
            <li>Make sure the app is active/enabled</li>
            <li>Verify the API key has the correct permissions</li>
          </ul>
        </div>
      </section>

      {/* ── Network Errors ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="network">
          Network Errors
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            TypeError: Failed to fetch / NetworkError
          </h3>
          <p className="mb-2 leading-relaxed">The SDK can&apos;t reach your server.</p>
          <p className="font-semibold mb-1">Checklist:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Is the <code className="text-xs font-mono">baseUrl</code> correct? Try opening it in a browser.</li>
            <li>Is the server running?</li>
            <li>Are there CORS issues? Check the browser console for CORS errors.</li>
            <li>Is there a trailing slash issue? Try with and without <code className="text-xs font-mono">/</code></li>
            <li>Is a VPN or firewall blocking the connection?</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            CORS Error: No &apos;Access-Control-Allow-Origin&apos; header
          </h3>
          <p className="mb-2 leading-relaxed">
            Your server needs to allow requests from your frontend domain.
          </p>
          <p className="font-semibold mb-1">Fix:</p>
          <p className="leading-relaxed">
            This is a server-side configuration issue. The Xpectrum server must
            include your domain in its CORS allow list. Contact your server
            administrator.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Request timeout (30s)
          </h3>
          <p className="mb-2 leading-relaxed">The SDK has a 30-second timeout by default.</p>
          <p className="font-semibold mb-1">Possible causes:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Server is overloaded or slow to respond</li>
            <li>Network latency is very high</li>
            <li>The AI model is taking too long to start generating</li>
          </ul>
        </div>
      </section>

      {/* ── Next.js Specific ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="nextjs">
          Next.js Issues
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Error: Cannot use import statement outside a module / window is not defined
          </h3>
          <p className="mb-2 leading-relaxed">
            You&apos;re trying to use the SDK in a Server Component. The SDK requires
            browser APIs and must run client-side.
          </p>
          <p className="font-semibold mb-1">Fix:</p>
          <p className="mb-2 leading-relaxed">
            Add <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>&apos;use client&apos;</code> at the very top of any file that imports from <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>@xpectrum/sdk</code>:
          </p>
          <CodeBlock
            code={`'use client'; // <-- This line is required!

import { XpectrumChat } from '@xpectrum/sdk';`}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Environment variables are undefined
          </h3>
          <p className="mb-2 leading-relaxed">
            Next.js env vars must start with <code className="text-xs font-mono">NEXT_PUBLIC_</code> to be
            available in the browser.
          </p>
          <p className="font-semibold mb-1">Wrong:</p>
          <CodeBlock
            language="env"
            code={`# These are NOT available in the browser!
CHAT_BASE_URL=https://...
CHAT_API_KEY=app-...`}
          />
          <p className="font-semibold mb-1">Correct:</p>
          <CodeBlock
            language="env"
            code={`# These ARE available in the browser
NEXT_PUBLIC_CHAT_BASE_URL=https://...
NEXT_PUBLIC_CHAT_API_KEY=app-...`}
          />
          <Callout type="warning" title="Restart required">
            After changing <code className="text-xs font-mono">.env.local</code>, you must restart the Next.js dev server for changes to take effect.
          </Callout>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Hydration mismatch warnings
          </h3>
          <p className="mb-2 leading-relaxed">
            The SDK creates DOM elements that don&apos;t exist during server-side rendering.
          </p>
          <p className="font-semibold mb-1">Fix:</p>
          <p className="leading-relaxed">
            Always initialize the SDK inside a <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>useEffect</code> hook, which only runs client-side. Never create SDK instances at the module level or during render.
          </p>
        </div>
      </section>

      {/* ── Voice Specific ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="voice">
          Voice Issues
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Microphone permission denied
          </h3>
          <p className="mb-2 leading-relaxed">
            The browser blocked microphone access.
          </p>
          <p className="font-semibold mb-1">Checklist:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>The user must explicitly click a button to start the call (browser requirement)</li>
            <li>The page must be served over HTTPS (or localhost)</li>
            <li>Check browser settings — the mic may be blocked for your site</li>
            <li>Try a different browser to rule out browser-specific issues</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            No audio from agent
          </h3>
          <p className="mb-2 leading-relaxed">
            The call connects but you can&apos;t hear the AI agent.
          </p>
          <p className="font-semibold mb-1">Checklist:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Check your system volume and audio output device</li>
            <li>Some browsers require a user interaction before playing audio — make sure the call is started from a button click</li>
            <li>Check if the agent is actually connected to the room (look for &apos;connected&apos; event)</li>
            <li>Check the browser console for WebRTC errors</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            404 on /tokens/generate
          </h3>
          <p className="mb-2 leading-relaxed">
            The agent name is not found on the voice server.
          </p>
          <p className="font-semibold mb-1">Fix:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Double-check the <code className="text-xs font-mono">agentName</code> value</li>
            <li>Make sure the agent exists on your voice server</li>
            <li>Check if the <code className="text-xs font-mono">baseUrl</code> is pointing to the correct voice server</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Connection state stuck on &apos;connecting&apos;
          </h3>
          <p className="mb-2 leading-relaxed">
            The SDK got a token but can&apos;t establish the WebRTC connection.
          </p>
          <p className="font-semibold mb-1">Possible causes:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Firewall blocking WebRTC connections</li>
            <li>The LiveKit server URL returned by your voice server is unreachable</li>
            <li>Network restrictions (corporate proxy, etc.)</li>
          </ul>
        </div>
      </section>

      {/* ── Chat Specific ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="chat">
          Chat Issues
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            onMessage never fires
          </h3>
          <p className="mb-2 leading-relaxed">You called <code className="text-xs font-mono">sendMessage()</code> but nothing happens.</p>
          <p className="font-semibold mb-1">Checklist:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Did you provide the <code className="text-xs font-mono">onMessage</code> callback in the options?</li>
            <li>Check the <code className="text-xs font-mono">onError</code> callback — there may be a silent error</li>
            <li>Is the chat instance properly initialized? (Check <code className="text-xs font-mono">baseUrl</code> and <code className="text-xs font-mono">apiKey</code>)</li>
            <li>Open the browser Network tab and look for the <code className="text-xs font-mono">chat-messages</code> request</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            429 Rate Limited
          </h3>
          <p className="mb-2 leading-relaxed">Too many requests in a short period.</p>
          <p className="font-semibold mb-1">Fix:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Add a loading state to prevent double-sends</li>
            <li>Disable the send button while a response is streaming</li>
            <li>Contact your admin if you need higher rate limits</li>
          </ul>
        </div>
      </section>

      {/* ── Debugging Tips ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="debugging">
          Debugging Tips
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">1. Check the browser console</h3>
          <p className="leading-relaxed">
            Open DevTools (F12) and look at the Console tab. The SDK logs
            errors with useful context (status codes, error messages).
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">2. Inspect network requests</h3>
          <p className="mb-2 leading-relaxed">
            Open the Network tab in DevTools. Filter by &quot;Fetch/XHR&quot; or &quot;EventStream&quot; to see SDK requests:
          </p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Look at the request headers — is the auth header present?</li>
            <li>Check the response status and body for error details</li>
            <li>For SSE streams, look at &quot;EventStream&quot; type requests</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">3. Verify credentials in isolation</h3>
          <p className="mb-2 leading-relaxed">
            Test your API key directly with curl to rule out SDK issues:
          </p>
          <CodeBlock
            language="bash"
            code={`# Test Chat API
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://app.yourserver.com/api/v1/site

# Test Voice API
curl -H "x-api-key: YOUR_API_KEY" \\
  -X POST "https://api-dev.xpectrum-ai.com/tokens/generate?agent_name=YOUR_AGENT"`}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">4. Use the onError callback</h3>
          <p className="mb-2 leading-relaxed">
            Always provide <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "var(--inline-code-bg)", color: "var(--inline-code-text)" }}>onError</code> to catch streaming errors that don&apos;t throw:
          </p>
          <CodeBlock
            code={`await chat.sendMessage('test', {
  onMessage: (text) => console.log('Message:', text),
  onError: (err) => console.error('Stream error:', err),
  onCompleted: () => console.log('Stream ended'),
});`}
          />
        </div>
      </section>

      {/* ── Browser Support ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="browser-support">
          Browser Support
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Browser</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Chat</th>
                <th className="text-left p-3 font-semibold border-b" style={{ borderColor: "var(--table-border)" }}>Voice</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Chrome 80+", "Yes", "Yes"],
                ["Firefox 80+", "Yes", "Yes"],
                ["Safari 14+", "Yes", "Yes"],
                ["Edge 80+", "Yes", "Yes"],
                ["Mobile Chrome", "Yes", "Yes (with mic permission)"],
                ["Mobile Safari", "Yes", "Limited (iOS WebRTC constraints)"],
              ].map(([browser, chat, voice]) => (
                <tr key={browser}>
                  <td className="p-3 border-b font-semibold" style={{ borderColor: "var(--table-border)" }}>{browser}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{chat}</td>
                  <td className="p-3 border-b" style={{ borderColor: "var(--table-border)" }}>{voice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" title="Voice requires WebRTC">
          Voice calls need <code className="text-xs font-mono">getUserMedia</code> support. The page must be served over HTTPS (or localhost).
        </Callout>
      </section>
    </article>
  );
}
