import { ChevronDown, Table2 } from "lucide-react";
import { useState } from "react";
import { DecayChart } from "../components/DecayChart";
import { facts } from "../data/dmePaperFacts";

function Result({
  label,
  value,
  note,
  kind = "direct-result",
}: {
  label: string;
  value: string;
  note: string;
  kind?: string;
}) {
  return (
    <article className="evidence-result">
      <span className="classification">{kind}</span>
      <h3>{label}</h3>
      <strong>{value}</strong>
      <p>{note}</p>
      <details>
        <summary>
          Technical interpretation <ChevronDown size={15} />
        </summary>
        <p>
          Published result from the DME Version 3 computational study. Values
          are rendered directly from the locked paper-facts source.
        </p>
      </details>
    </article>
  );
}
export function EvidencePage() {
  const [table, setTable] = useState(false);
  const data = facts.results;
  return (
    <div className="route-page evidence-page">
      <section className="route-hero">
        <p className="micro">Evidence · Exact published values</p>
        <h1>
          The claim survives
          <br />
          <em>its own attacks.</em>
        </h1>
        <p>
          Every chart and result on this page is bound to a single source of
          locked Version 3 facts. Interactive maps elsewhere are clearly marked
          reconstructions.
        </p>
      </section>
      <section className="central-result">
        <div>
          <span className="classification">direct result</span>
          <p className="micro">Central result · Delay 0</p>
          <strong>90.8%</strong>
          <h2>pressure-based balanced accuracy</h2>
          <p>95% interval: 87.3%–94.2% · AUC: 0.981 · chance: 50%</p>
        </div>
        <p>
          Spatial interaction-pressure patterns distinguished the two matched
          histories after external driving ended.
        </p>
      </section>
      <section className="evidence-grid">
        <Result
          label="Whole-box controls"
          value="48.3%"
          note="Bulk observables stayed near chance, so the global state did not reliably reveal the sequence."
        />
        <Result
          label="Density field"
          value="86.3%"
          note="Crowding carries history information, but pressure performed more strongly at the earliest delay."
        />
        <Result
          label="Pressure beyond density"
          value="+0.1198 nats"
          note="Early pressure carried information not captured by the selected density measure."
        />
        <Result
          label="Spatial shuffle"
          value="p = 0.002"
          note="Shuffling locations while retaining all field values reduced mean accuracy to 50.0%."
        />
      </section>
      <section className="evidence-chart">
        <div>
          <p className="micro">Decay across delays</p>
          <h2>Forgetting is part of the evidence.</h2>
          <p>
            Pressure decoding begins at 90.8% immediately after drive removal
            and approaches chance by delay 700.
          </p>
          <button
            className={table ? "selected" : ""}
            onClick={() => setTable(!table)}
          >
            <Table2 size={16} />{" "}
            {table ? "Show chart" : "Show accessible table"}
          </button>
        </div>
        {table ? (
          <table>
            <caption>
              Pressure and density decoding across post-drive delays
            </caption>
            <thead>
              <tr>
                <th>Delay</th>
                <th>Pressure</th>
                <th>Density</th>
              </tr>
            </thead>
            <tbody>
              {data.delays.map((d, i) => (
                <tr key={d}>
                  <td>{d}</td>
                  <td>{(data.pressureDecay[i] * 100).toFixed(1)}%</td>
                  <td>{(data.densityDecay[i] * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DecayChart />
        )}
      </section>
      <section className="evidence-grid wide">
        <Result
          label="Paired label-swap null"
          value="p = 0.002"
          note="Across 499 null datasets, the expected mean was approximately chance."
        />
        <Result
          label="Weak mechanical probe · delay 80"
          value="75.8%"
          note="A later physical probe classified prior order with AUC 0.855 and a paired difference of −0.3936."
        />
        <Result
          label="Robustness"
          value="9 conditions"
          note="Immediate pressure decoding survived tested temperature-amplitude combinations, particle counts, grids, decoders, and timestep checks."
        />
      </section>
      <section className="evidence-ledger">
        <div>
          <p className="micro">Stress tests · direct results</p>
          <h2>Try to make the signal disappear.</h2>
          <p>
            The published checks change the decoder, integration step, system
            size, grid size, temperature, and pulse amplitude.
          </p>
        </div>
        <dl>
          <div>
            <dt>Pressure lower-bound information</dt>
            <dd>{data.informationBits.toFixed(3)} bits</dd>
          </div>
          <div>
            <dt>Density + pressure</dt>
            <dd>{(data.combined * 100).toFixed(1)}%</dd>
          </div>
          <div>
            <dt>Temperature–amplitude combinations</dt>
            <dd>{data.robustness.conditions}</dd>
          </div>
          <div>
            <dt>Immediate decoding range</dt>
            <dd>
              {(data.robustness.minimum * 100).toFixed(1)}–
              {(data.robustness.maximum * 100).toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt>Grouped decoder assignments</dt>
            <dd>
              {data.robustness.assignments} × {data.robustness.folds}-fold
            </dd>
          </div>
          <div>
            <dt>Particle counts</dt>
            <dd>{data.robustness.particles.join(" · ")}</dd>
          </div>
          <div>
            <dt>Size-scaled grids</dt>
            <dd>
              {data.robustness.grids
                .map((grid) => `${grid}×${grid}`)
                .join(" · ")}
            </dd>
          </div>
          <div>
            <dt>Preparation work</dt>
            <dd>{data.work.toFixed(3)} reduced units</dd>
          </div>
        </dl>
      </section>
      <section className="probe-evidence">
        <div>
          <p className="micro">Mechanical readout</p>
          <h2>The later probe reads a fading asymmetry.</h2>
        </div>
        <table>
          <caption>Published weak-probe results by observation delay</caption>
          <thead>
            <tr>
              <th>Delay</th>
              <th>Left → Right</th>
              <th>Right → Left</th>
              <th>Paired difference</th>
              <th>Balanced accuracy</th>
              <th>AUC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>80</td>
              <td>+0.1763</td>
              <td>−0.2173</td>
              <td>−0.3936</td>
              <td>75.8%</td>
              <td>0.855</td>
            </tr>
            <tr>
              <td>200</td>
              <td>+0.1053</td>
              <td>−0.1374</td>
              <td>−0.2427</td>
              <td>68.3%</td>
              <td>0.735</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="limitation">
        <span className="classification">limitation</span>
        <h2>Pressure is not a complete crystal ball.</h2>
        <p>
          Scalar local pressure did not successfully predict the complete noisy
          future local-flow field. It is a useful history-bearing coordinate,
          not a complete description of every aspect of future motion.
        </p>
      </section>
      <section className="predictions">
        <span className="classification">prediction</span>
        <h2>What would challenge the interpretation?</h2>
        <p>
          If a controlled realization preserved history decoding after its local
          pressure geometry was genuinely randomized, the spatial-carrier
          interpretation would need revision. This is a falsifiable prediction,
          not an achieved experiment.
        </p>
      </section>
    </div>
  );
}
