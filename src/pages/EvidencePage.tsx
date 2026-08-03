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
      <section className="limitation">
        <span className="classification">limitation</span>
        <h2>Pressure is not a complete crystal ball.</h2>
        <p>
          Scalar local pressure did not successfully predict the complete noisy
          future local-flow field. It is a useful history-bearing coordinate,
          not a complete description of every aspect of future motion.
        </p>
      </section>
    </div>
  );
}
