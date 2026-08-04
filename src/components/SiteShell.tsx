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

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const available = root.scrollHeight - window.innerHeight;
      const progress = available > 0 ? window.scrollY / available : 0;
      root.style.setProperty("--scroll-progress", String(progress));
      root.style.setProperty(
        "--scroll-shift",
        `${Math.min(window.scrollY, 900)}px`,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const selectors = [
      ".chapter",
      ".route-hero",
      ".lab-shell",
      ".criteria",
      ".central-result",
      ".evidence-grid",
      ".evidence-chart",
      ".evidence-ledger",
      ".probe-evidence",
      ".predictions",
      ".limitation",
      ".paper-masthead",
      ".abstract",
      ".paper-columns",
      ".paper-actions",
      ".repro",
    ];
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(",")),
    );
    blocks.forEach((block) => block.classList.add("motion-block"));

    if (!("IntersectionObserver" in window)) {
      blocks.forEach((block) => block.classList.add("motion-in", "is-visible"));
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-in", "is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -11%", threshold: 0.06 },
    );
    blocks.forEach((block) => observer.observe(block));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [path]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
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
