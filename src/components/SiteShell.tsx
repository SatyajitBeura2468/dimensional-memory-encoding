import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function SiteShell({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["/", "Story"],
    ["/lab", "Lab"],
    ["/evidence", "Evidence"],
    ["/paper", "Paper"],
  ] as const;
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "The Box That Remembers | Dimensional Memory Encoding",
      "/lab": "Interactive DME Laboratory | The Box That Remembers",
      "/evidence": "DME Evidence and Controls | The Box That Remembers",
      "/paper": "DME Version 3 Paper | The Box That Remembers",
    };
    document.title = titles[path] ?? titles["/"];
    window.scrollTo(0, 0);
    setOpen(false);
  }, [path]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="/" className="brand" onClick={() => setOpen(false)}>
          The Box That Remembers
        </a>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          {nav.map(([to, label]) => (
            <a
              key={to}
              href={to}
              className={path === to ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer>
        <span>Dimensional Memory Encoding</span>
        <span>© 2026 Satyajit Beura</span>
      </footer>
    </>
  );
}
