import { ArrowLeft, ArrowRight } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="route-page not-found-page">
      <section className="route-hero">
        <p className="micro">404 · Boundary condition</p>
        <h1 aria-label="Page not found">
          Page not
          <br />
          <em>found.</em>
        </h1>
        <p>
          The requested route is outside the published DME interface. Return to
          the story or choose a research surface below.
        </p>
        <a className="button primary" href="/">
          <ArrowLeft size={16} /> Return to Story
        </a>
      </section>
      <nav className="not-found-nav" aria-label="Research surfaces">
        <a href="/">
          <span>Story</span>
          <ArrowRight size={16} />
        </a>
        <a href="/lab">
          <span>Laboratory</span>
          <ArrowRight size={16} />
        </a>
        <a href="/evidence">
          <span>Evidence</span>
          <ArrowRight size={16} />
        </a>
        <a href="/paper">
          <span>Paper</span>
          <ArrowRight size={16} />
        </a>
      </nav>
    </div>
  );
}
