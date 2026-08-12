"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs/getting-started" },
      { label: "JavaScript Guide", href: "/docs/javascript-guide" },
    ],
  },
  {
    title: "Chat",
    items: [
      { label: "Chat Completions", href: "/docs/chat-completions" },
      { label: "Models", href: "/docs/models" },
      { label: "Threads & Messages", href: "/docs/threads" },
    ],
  },
  {
    title: "Voice",
    items: [
      { label: "Voice Module", href: "/docs/voice" },
    ],
  },
  {
    title: "SDK",
    items: [
      { label: "Widgets", href: "/docs/widgets" },
    ],
  },
  {
    title: "Workflows",
    items: [
      { label: "Runs", href: "/docs/runs" },
      { label: "Cancel Tasks", href: "/docs/tasks" },
    ],
  },
  {
    title: "Knowledge",
    items: [
      { label: "Knowledge Search", href: "/docs/knowledge-search" },
    ],
  },
  {
    title: "App",
    items: [
      { label: "App Config", href: "/docs/config" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Errors", href: "/docs/errors" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 overflow-y-auto border-r p-6"
      style={{
        background: "var(--sidebar-bg)",
        borderColor: "var(--sidebar-border)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 no-underline"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: "var(--accent)" }}
        >
          X
        </div>
        <span className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>
          Xpectrum API
        </span>
      </Link>

      <nav className="flex flex-col gap-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--muted)" }}
            >
              {section.title}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-1.5 rounded-md text-sm no-underline transition-colors"
                      style={{
                        background: isActive ? "var(--accent-light)" : "transparent",
                        color: isActive ? "var(--accent)" : "var(--foreground)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div
        className="mt-8 pt-4 border-t text-xs"
        style={{ borderColor: "var(--sidebar-border)", color: "var(--muted)" }}
      >
        <p>API v1</p>
        <p className="mt-1">api.cloud.xpectrum.dev</p>
      </div>
    </aside>
  );
}
