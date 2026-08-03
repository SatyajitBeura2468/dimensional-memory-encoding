import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["/", "Story"],
    ["/lab", "Lab"],
    ["/evidence", "Evidence"],
    ["/paper", "Paper"],
  ] as const;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            □
          </span>
          The Box That Remembers
        </NavLink>
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
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
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
