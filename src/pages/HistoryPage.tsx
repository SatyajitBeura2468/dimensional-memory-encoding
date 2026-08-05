import { ArrowRight } from "lucide-react";

export function HistoryPage() {
  return (
    <div className="route-page history-page">
      <section className="route-hero">
        <p className="micro">Publication history · DME</p>
        <h1>
          A careful
          <br />
          <em>change of question.</em>
        </h1>
        <p>
          Dimensional Memory Encoding developed from an exploratory idea into a
          narrower operational framework. This history keeps those stages
          distinct so readers can cite the right one.
        </p>
      </section>
      <section className="history-timeline" aria-label="DME version history">
        <article>
          <span className="history-index">01</span>
          <div>
            <p className="micro">Exploratory stage</p>
            <h2>Delayed pressure-flow correlation</h2>
            <p>
              The earliest DME work asked whether local pressure structure could
              correlate with later flow. It was exploratory and should not be
              read as the Version 3 operational claim.
            </p>
          </div>
        </article>
        <article>
          <span className="history-index">02</span>
          <div>
            <p className="micro">Version 3 revision</p>
            <h2>Matched histories, independent controls</h2>
            <p>
              Version 3 replaces that test with post-drive decoding, matched
              temporal histories, bulk and density controls, spatial null tests,
              a later physical readout, and explicit transient decay.
            </p>
          </div>
        </article>
        <article>
          <span className="history-index">03</span>
          <div>
            <p className="micro">Supersession boundary</p>
            <h2>What Version 3 does not claim</h2>
            <p>
              Older speculative language about dimensional boundaries,
              consciousness, or quantum memory is not part of Version 3. The
              current conclusion is restricted to this driven soft-particle
              system.
            </p>
            <a className="text-link" href="/paper">
              Read the Version 3 research landing page <ArrowRight size={15} />
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
