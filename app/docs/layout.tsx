import Sidebar from "../components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 max-w-4xl px-8 py-12 lg:px-12">
        {children}
      </main>
    </div>
  );
}
