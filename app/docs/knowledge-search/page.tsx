import CodeBlock from "../../components/CodeBlock";
import Callout from "../../components/Callout";
import PropsTable from "../../components/PropsTable";
import Endpoint from "../../components/Endpoint";
import InlineCode from "../../components/InlineCode";

export const metadata = {
  title: "Knowledge Search — Xpectrum API Docs",
};

export default function KnowledgeSearchPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Knowledge Search</h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Query a knowledge base directly and get back the matching chunks with
        relevance scores — the same retrieval your apps use, exposed for your
        own RAG pipelines.
      </p>

      <Endpoint method="POST" path="/v1/knowledge/{knowledge_id}/search" />

      <Callout type="warning" title="Different key">
        This endpoint authenticates with a <strong>knowledge API key</strong>{" "}
        (workspace-scoped), not an app key. Create one in the console under{" "}
        <em>Knowledge → API Access</em>.
      </Callout>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="request">
          Request body
        </h2>
        <PropsTable
          props={[
            {
              name: "query",
              type: "string",
              required: true,
              description: "The search query.",
            },
            {
              name: "limit",
              type: "integer",
              default: "10",
              description: "Maximum matches to return (capped at 100).",
            },
          ]}
        />
        <CodeBlock
          language="bash"
          code={`curl https://api.cloud.xpectrum.dev/v1/knowledge/3bffeb63-c68f-4ea3-a117-bdb0e47ed8eb/search \\
  -H "Authorization: Bearer YOUR_KNOWLEDGE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "refund policy", "limit": 5 }'`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="response">
          Response
        </h2>
        <CodeBlock
          language="json"
          code={`{
  "object": "list",
  "query": "refund policy",
  "data": [
    {
      "object": "match",
      "score": 0.8731,
      "content": "Refunds are issued within 14 days of purchase...",
      "document_id": "b47ac10b-58cc-4372-a567-0e02b2c3d479",
      "chunk_id": "9e107d9d-372b-4b6e-9855-2f2f95f72bd1",
      "position": 3
    }
  ]
}`}
        />
        <p className="mb-4 leading-relaxed">
          Matches are ordered by relevance. <InlineCode>score</InlineCode> is
          the similarity score, <InlineCode>document_id</InlineCode> identifies
          the source document, and <InlineCode>position</InlineCode> is the
          chunk&apos;s position within it.
        </p>
      </section>
    </article>
  );
}
