import { Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { claims, facts, siteConfig } from "../data/dmePaperFacts";

export function PaperPage() {
  const [copied, setCopied] = useState(false);
  const citation = `Beura, S. (${facts.paper.date.slice(-4)}). Dimensional Memory Encoding. Version 3.0.`;
  const copy = async () => {
    await navigator.clipboard?.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="route-page paper-page">
      <section className="paper-masthead">
        <p className="micro">Research paper · {facts.paper.version}</p>
        <h1>
          Dimensional
          <br />
          <em>Memory Encoding</em>
        </h1>
        <p className="formal-subtitle">
          Temporal order, spatial interaction pressure, and mechanically
          readable distributed traces in a driven Brownian soft-particle system
        </p>
        <p>
          {facts.paper.author}
          <br />
          {facts.paper.affiliation}
          <br />
          {facts.paper.date}
        </p>
      </section>
      <section className="abstract">
        <p className="micro">Abstract</p>
        <h2>Can a transient spatial pattern retain a specific past?</h2>
        <p>
          We compare two protocols that apply matched localized compressions in
          opposite order to a two-dimensional Brownian soft-particle system.
          After all driving ends, global controls do not reliably identify the
          history, while local interaction-pressure fields do. Spatial shuffling
          removes the signal, and a later weak probe responds differently
          depending on the earlier order.
        </p>
        <p className="claim-line">{claims.conclusion.text}</p>
      </section>
      <section className="paper-columns">
        <div>
          <p className="micro">Methodology map</p>
          <ol className="method-map">
            <li>
              <b>Prepare</b>
              <span>120 paired initial configurations</span>
            </li>
            <li>
              <b>Train</b>
              <span>Two matched compression sites, opposite order</span>
            </li>
            <li>
              <b>Wait</b>
              <span>Observe after full drive removal</span>
            </li>
            <li>
              <b>Read</b>
              <span>Measure 6 × 6 local fields</span>
            </li>
            <li>
              <b>Challenge</b>
              <span>Shuffle space, swap labels, probe mechanically</span>
            </li>
          </ol>
        </div>
        <div>
          <p className="micro">Glossary</p>
          <dl className="glossary">
            <dt>Dimensional</dt>
            <dd>
              Distributed across locations in a spatial field; not extra
              dimensions.
            </dd>
            <dt>Interaction pressure</dt>
            <dd>A local contact-force-based measure.</dd>
            <dt>Balanced accuracy</dt>
            <dd>Accuracy averaged fairly across both histories.</dd>
            <dt>Interactive reconstruction</dt>
            <dd>A browser educational model, not archived paper data.</dd>
          </dl>
        </div>
      </section>
      <section className="paper-actions">
        <div>
          <p className="micro">Citation</p>
          <code>{citation}</code>
          <button onClick={copy}>
            <Copy size={16} />
            {copied ? "Copied" : "Copy citation"}
          </button>
        </div>
        <div>
          <p className="micro">Resources</p>
          {siteConfig.paperUrl ? (
            <a href={siteConfig.paperUrl}>
              <Download size={16} />
              Download paper
            </a>
          ) : (
            <span className="disabled">
              <Download size={16} />
              Paper link to be added
            </span>
          )}
          {siteConfig.replicationUrl ? (
            <a href={siteConfig.replicationUrl}>
              <ExternalLink size={16} />
              Replication package
            </a>
          ) : (
            <span className="disabled">
              <ExternalLink size={16} />
              Replication link to be added
            </span>
          )}
        </div>
      </section>
      <section className="repro">
        <p className="micro">Reproducibility notes</p>
        <h2>What this site can and cannot show</h2>
        <p>
          This website is a public-facing interactive explanation of the DME
          Version 3 computational paper. Browser simulations are educational
          reconstructions unless explicitly identified as archived research
          outputs.
        </p>
        <ul className="repro-list">
          <li>
            <span>Locked model and protocol parameters</span>
            <b>included</b>
          </li>
          <li>
            <span>Exact published result tables</span>
            <b>included</b>
          </li>
          <li>
            <span>Deterministic browser reconstruction</span>
            <b>included</b>
          </li>
          <li>
            <span>Archived trajectory maps</span>
            <b>not yet linked</b>
          </li>
          <li>
            <span>Replication package</span>
            <b>not yet linked</b>
          </li>
        </ul>
        <p className="muted">
          The data layer is intentionally separated from the visual components
          so archived maps and replication files can replace reconstructed
          examples without redesigning the experience.
        </p>
      </section>
    </div>
  );
}
