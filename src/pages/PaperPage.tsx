import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  GitBranch,
  Link2,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  claims,
  facts,
  operationalCriteria,
  references,
  researchQuestion,
  siteConfig,
  version3Abstract,
  zenodoRecord,
} from "../data/dmePaperFacts";

type CitationFormat =
  "APA" | "IEEE" | "Chicago" | "BibTeX" | "RIS" | "Plain text";

function Equation({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <figure className="equation" aria-labelledby={`${label}-label`}>
      <div className="equation-display" role="img" aria-label={description}>
        {children}
      </div>
      <figcaption id={`${label}-label`}>{label}</figcaption>
    </figure>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="paper-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

export function PaperPage() {
  const [format, setFormat] = useState<CitationFormat>("APA");
  const [copied, setCopied] = useState(false);
  const citation = useMemo(() => {
    const title = facts.paper.title;
    const year = "2026";
    switch (format) {
      case "IEEE":
        return `S. Beura, “${title},” Version 3.0, GitHub, 2026. [Online]. Available: ${siteConfig.productionUrl}/paper`;
      case "Chicago":
        return `Beura, Satyajit. “${title}.” Version 3.0. GitHub, 2026. ${siteConfig.productionUrl}/paper.`;
      case "BibTeX":
        return `@software{beura_dme_v3,\n  author = {Beura, Satyajit},\n  title = {${title}},\n  version = {3.0.0},\n  year = {${year}},\n  url = {${siteConfig.productionUrl}/paper},\n  repository = {${siteConfig.githubUrl}}\n}`;
      case "RIS":
        return `TY  - COMP\nAU  - Beura, Satyajit\nTI  - ${title}\nPY  - ${year}\nVL  - 3.0\nUR  - ${siteConfig.productionUrl}/paper\nDO  - ${siteConfig.doiUrl}\nER  -`;
      case "Plain text":
        return `Beura, Satyajit (2026). ${title}. Version 3.0. GitHub research release. ${siteConfig.productionUrl}/paper`;
      default:
        return `Beura, S. (2026). ${title} (Version 3.0). GitHub research release. ${siteConfig.productionUrl}/paper`;
    }
  }, [format]);

  const copyCitation = async () => {
    await navigator.clipboard?.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="route-page paper-page">
      <section className="paper-masthead">
        <p className="micro">Research landing page · Version 3.0</p>
        <h1>
          Dimensional
          <br />
          <em>Memory Encoding</em>
        </h1>
        <p className="formal-subtitle">{facts.paper.subtitle}</p>
        <p className="paper-byline">
          {facts.paper.author} · {facts.paper.affiliation}
          <br />
          Released {facts.paper.date} · {facts.paper.publicationType}
        </p>
        <div className="paper-identity-rail" aria-label="Paper identity">
          <span>Version 3.0</span>
          <span>MIT licence</span>
          <a href={siteConfig.orcidUrl} target="_blank" rel="noreferrer">
            ORCID 0009-0006-4471-2845 <ExternalLink size={13} />
          </a>
          <a
            href={siteConfig.githubReleaseUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub release <ExternalLink size={13} />
          </a>
        </div>
      </section>

      <section className="paper-resource-panel">
        <div>
          <p className="micro">Publication record</p>
          <h2>One verified DOI, two clearly separated stages.</h2>
          <p>
            Zenodo record 17943112 is the earlier exploratory preprint. It is
            retained here as publication history, not relabelled as Version 3.
            Version 3 is the operational research revision represented by this
            repository and its GitHub release.
          </p>
        </div>
        <div className="resource-actions">
          <a href={siteConfig.zenodoRecordUrl} target="_blank" rel="noreferrer">
            <Link2 size={16} /> Read exploratory record{" "}
            <ExternalLink size={13} />
          </a>
          <a
            href={siteConfig.paperDownloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={16} /> Download exploratory PDF{" "}
            <ExternalLink size={13} />
          </a>
          <a
            href={siteConfig.githubReleaseUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} /> View Version 3 release{" "}
            <ExternalLink size={13} />
          </a>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            <GitBranch size={16} /> View repository <ExternalLink size={13} />
          </a>
          <a
            href={siteConfig.githubReleaseUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Check size={16} /> Verify release checksums{" "}
            <ExternalLink size={13} />
          </a>
          <a href={siteConfig.issueUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Report a scientific issue{" "}
            <ExternalLink size={13} />
          </a>
        </div>
      </section>

      <section className="abstract paper-section">
        <p className="micro">Version 3 research abstract</p>
        <h2>Can a transient spatial pattern retain a specific past?</h2>
        <p className="abstract-copy">{version3Abstract}</p>
        <p className="claim-line">
          <strong>Restricted conclusion · interpretation</strong>
          {claims.conclusion.text}
        </p>
      </section>

      <section className="question-panel paper-section">
        <p className="micro">Scientific question · direct formulation</p>
        <p>{researchQuestion}</p>
      </section>

      <section className="definition-panel paper-section">
        <div>
          <p className="micro">Operational definition</p>
          <h2>Dimensional means spatial, not speculative.</h2>
          <p>
            Here, “dimensional” means that information is distributed across
            spatial degrees of freedom in an ordinary field. It does not mean
            extra spacetime dimensions, consciousness, quantum storage,
            information outside matter, or a new force.
          </p>
        </div>
        <ol className="criteria-list">
          {operationalCriteria.map((criterion, index) => (
            <li key={criterion}>
              <b>0{index + 1}</b>
              <span>{criterion}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="model-panel paper-section">
        <div>
          <p className="micro">Model and protocol</p>
          <h2>A small world, fully specified.</h2>
          <p>
            The interactive layer is a reconstruction. The locked values below
            are the Version 3 computational model and protocol parameters.
          </p>
        </div>
        <table className="model-table">
          <caption>Locked Version 3 model and dataset dimensions</caption>
          <tbody>
            <tr>
              <th>Particles</th>
              <td>72</td>
              <th>Area fraction</th>
              <td>0.68</td>
            </tr>
            <tr>
              <th>Box length</th>
              <td>9.1192</td>
              <th>Stiffness</th>
              <td>25</td>
            </tr>
            <tr>
              <th>kBT</th>
              <td>0.15</td>
              <th>Mobility</th>
              <td>1</td>
            </tr>
            <tr>
              <th>Diameter</th>
              <td>1</td>
              <th>Timestep</th>
              <td>0.0025</td>
            </tr>
            <tr>
              <th>Equilibration</th>
              <td>1,000 steps</td>
              <th>Paired configurations</th>
              <td>120</td>
            </tr>
            <tr>
              <th>Trajectories</th>
              <td>240</td>
              <th>Recorded states</th>
              <td>1,200</td>
            </tr>
            <tr>
              <th>Field grid</th>
              <td>6 × 6</td>
              <th>Histories</th>
              <td>Left → Right / Right → Left</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="equations-panel paper-section">
        <p className="micro">Core equations · accessible notation</p>
        <div className="equation-grid">
          <Equation
            label="(1) Overdamped Langevin dynamics"
            description="d r sub i equals mobility times internal force plus external force times d t plus square root of two D d t times xi sub i."
          >
            <i>d</i>
            <b>r</b>
            <sub>i</sub> = μ[<b>F</b>
            <sup>int</sup>
            <sub>i</sub> + <b>F</b>
            <sup>ext</sup>
            <sub>i</sub>(t)]<i>dt</i> + √(2D<i>dt</i>) ξ<sub>i</sub>
          </Equation>
          <Equation
            label="(2) Harmonic interaction potential"
            description="U of r i j equals k over 2 times sigma minus r i j squared when r i j is less than sigma, and zero otherwise."
          >
            U(<i>r</i>
            <sub>ij</sub>) ={" "}
            <span>
              <sup>k</sup>⁄<sub>2</sub>
            </span>
            (σ − <i>r</i>
            <sub>ij</sub>)², &nbsp;<i>r</i>
            <sub>ij</sub> &lt; σ; &nbsp; U = 0 otherwise
          </Equation>
          <Equation
            label="(3) Local density"
            description="rho sub c equals N sub c divided by A sub c."
          >
            ρ<sub>c</sub> = N<sub>c</sub>⁄A<sub>c</sub>
          </Equation>
          <Equation
            label="(4) Local virial-pressure estimator"
            description="p virial sub c equals one over four A sub c times the sum over pairs of r i j dot F i j times the cell indicators."
          >
            p<sup>vir</sup>
            <sub>c</sub> ={" "}
            <span>
              <sup>1</sup>⁄
              <sub>
                4A<sub>c</sub>
              </sub>
            </span>{" "}
            Σ<sub>i&lt;j</sub>(<b>r</b>
            <sub>ij</sub> · <b>F</b>
            <sub>ij</sub>)[1(i∈c)+1(j∈c)]
          </Equation>
          <Equation
            label="(5) Complete local pressure"
            description="p sub c equals k B T rho sub c plus p virial sub c."
          >
            p<sub>c</sub> = k<sub>B</sub>Tρ<sub>c</sub> + p<sup>vir</sup>
            <sub>c</sub>
          </Equation>
          <Equation
            label="(6) Decoder information lower bound"
            description="I lower bound of H and X equals the maximum of zero and natural log of two minus cross entropy loss."
          >
            I<sub>LB</sub>(H;X) = max[0, ln 2 − L<sub>CE</sub>]
          </Equation>
          <Equation
            label="(7) Increment beyond density"
            description="Delta I pressure given density equals cross entropy loss for density minus cross entropy loss for density and pressure."
          >
            ΔI<sub>(P|ρ)</sub> = L<sub>CE</sub>(ρ) − L<sub>CE</sub>(ρ,P)
          </Equation>
          <Equation
            label="(8) Protocol work"
            description="W equals the sum over time and sites of delta lambda times the average of the potential at consecutive states."
          >
            W = Σ<sub>t,s</sub> Δλ<sub>s</sub>(t) [V<sub>s</sub>(X<sub>t</sub>)
            + V<sub>s</sub>(X<sub>t+1</sub>)]⁄2
          </Equation>
        </div>
      </section>

      <section className="results-panel paper-section">
        <p className="micro">Results overview · locked facts</p>
        <h2>The signal is local, specific, and fading.</h2>
        <div className="paper-metrics">
          <Metric
            label="Global balanced accuracy"
            value={`${(facts.results.bulk * 100).toFixed(1)}%`}
            note="near chance"
          />
          <Metric
            label="Density"
            value={`${(facts.results.density * 100).toFixed(1)}%`}
            note="local density field"
          />
          <Metric
            label="Pressure"
            value={`${(facts.results.pressure * 100).toFixed(1)}%`}
            note="87.3–94.2% interval"
          />
          <Metric
            label="AUC"
            value={facts.results.auc.toFixed(3)}
            note="pressure decoder"
          />
          <Metric
            label="Density + pressure"
            value={`${(facts.results.combined * 100).toFixed(1)}%`}
            note="combined decoder"
          />
          <Metric
            label="Information lower bound"
            value={`${facts.results.informationBits.toFixed(3)} bits`}
            note="decoder-associated"
          />
          <Metric
            label="Pressure beyond density"
            value={`+${facts.results.beyondDensity.toFixed(4)} nats`}
            note="increment"
          />
          <Metric
            label="Spatial shuffle"
            value={`p = ${facts.results.shuffle.pValue.toFixed(3)}`}
            note="location null"
          />
        </div>
        <p className="results-note">
          Weak probe: delay 80 = 75.8% balanced accuracy, AUC 0.855; delay 200 =
          68.3%, AUC 0.735. Robustness spans 9 temperature–amplitude conditions,
          6 decoders, repeated grouped folds, timestep checks, particle counts
          50/72/98, and grids 5×5/6×6/7×7.
        </p>
      </section>

      <section className="energy-panel paper-section">
        <div>
          <p className="micro">Energetic Cost of Encoding</p>
          <h2>Preparation has a measurable cost.</h2>
          <p>
            Mean preparation work is 16.516 reduced energy units and β⟨W⟩ is
            110.1. The decoder-associated lower bound is 0.736 bits.
          </p>
        </div>
        <div className="energy-readout">
          <strong>16.516</strong>
          <span>mean preparation work</span>
          <small>
            Work per decodable bit is descriptive for this protocol. This is not
            a Landauer erasure experiment: no logical bit reset or logically
            irreversible erasure operation was defined.
          </small>
        </div>
      </section>

      <section className="scope-panel paper-section">
        <p className="micro">Scope and boundary · limitation</p>
        <h2>Pressure is a history-bearing coordinate, not a complete state.</h2>
        <p>{claims.limitation.text}</p>
        <p className="claim-line">
          <strong>Conclusion · interpretation</strong>
          {claims.conclusion.text}
        </p>
      </section>

      <section className="citation-panel paper-section">
        <div className="citation-head">
          <p className="micro">Citation support</p>
          <h2>Copy the project in the format you need.</h2>
        </div>
        <div
          className="citation-tabs"
          role="tablist"
          aria-label="Citation format"
        >
          {(
            [
              "APA",
              "IEEE",
              "Chicago",
              "BibTeX",
              "RIS",
              "Plain text",
            ] as CitationFormat[]
          ).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={format === item}
              className={format === item ? "selected" : ""}
              onClick={() => setFormat(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="citation-output">
          <code>{citation}</code>
          <button className="button secondary" onClick={copyCitation}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy citation"}
          </button>
        </div>
      </section>

      <section className="references-panel paper-section">
        <p className="micro">Key references</p>
        <ol>
          {references.map(([citationText, url]) => (
            <li key={url}>
              <span>{citationText}</span>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open DOI for ${citationText}`}
              >
                <ExternalLink size={14} />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="provenance-panel paper-section">
        <p className="micro">Provenance ledger</p>
        <h2>The record is explicit about what it contains.</h2>
        <dl>
          <div>
            <dt>Zenodo record</dt>
            <dd>
              <a href={zenodoRecord.recordUrl}>{zenodoRecord.recordUrl}</a>
            </dd>
          </div>
          <div>
            <dt>Record title</dt>
            <dd>{zenodoRecord.title}</dd>
          </div>
          <div>
            <dt>Record type</dt>
            <dd>
              {zenodoRecord.resourceType} · {zenodoRecord.status}
            </dd>
          </div>
          <div>
            <dt>Attached file</dt>
            <dd>
              {zenodoRecord.file.name} ·{" "}
              {zenodoRecord.file.size.toLocaleString()} bytes ·{" "}
              {zenodoRecord.file.checksum}
            </dd>
          </div>
          <div>
            <dt>Version 3 source</dt>
            <dd>
              Repository facts and GitHub release; no verified V3 Zenodo
              attachment was found.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
