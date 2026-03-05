interface Prop {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: "var(--table-header-bg)" }}>
            <th
              className="text-left p-3 font-semibold border-b"
              style={{ borderColor: "var(--table-border)" }}
            >
              Property
            </th>
            <th
              className="text-left p-3 font-semibold border-b"
              style={{ borderColor: "var(--table-border)" }}
            >
              Type
            </th>
            <th
              className="text-left p-3 font-semibold border-b"
              style={{ borderColor: "var(--table-border)" }}
            >
              Required
            </th>
            <th
              className="text-left p-3 font-semibold border-b"
              style={{ borderColor: "var(--table-border)" }}
            >
              Default
            </th>
            <th
              className="text-left p-3 font-semibold border-b"
              style={{ borderColor: "var(--table-border)" }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td
                className="p-3 border-b font-mono text-xs"
                style={{
                  borderColor: "var(--table-border)",
                  color: "var(--accent)",
                }}
              >
                {prop.name}
              </td>
              <td
                className="p-3 border-b font-mono text-xs"
                style={{
                  borderColor: "var(--table-border)",
                  color: "var(--muted)",
                }}
              >
                {prop.type}
              </td>
              <td
                className="p-3 border-b"
                style={{ borderColor: "var(--table-border)" }}
              >
                {prop.required ? (
                  <span className="text-xs font-medium text-red-500">Yes</span>
                ) : (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    No
                  </span>
                )}
              </td>
              <td
                className="p-3 border-b font-mono text-xs"
                style={{
                  borderColor: "var(--table-border)",
                  color: "var(--muted)",
                }}
              >
                {prop.default || "—"}
              </td>
              <td
                className="p-3 border-b text-sm"
                style={{ borderColor: "var(--table-border)" }}
              >
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
