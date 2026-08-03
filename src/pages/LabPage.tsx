import { ArrowRight, Info, RotateCcw, Shuffle } from "lucide-react";
import { useState } from "react";
import { FieldGrid } from "../components/FieldGrid";
import { ParticleBox } from "../components/ParticleBox";
import { facts } from "../data/dmePaperFacts";

export function LabPage() {
  const [history, setHistory] = useState<"LR" | "RL">("LR"),
    [layer, setLayer] = useState<"particles" | "pressure" | "density">(
      "particles",
    ),
    [probe, setProbe] = useState<"left" | "right" | null>(null),
    [delayIndex, setDelayIndex] = useState(0),
    [shuffled, setShuffled] = useState(false),
    [resetKey, setResetKey] = useState(0);
  const response = probe
    ? probe === "left"
      ? history === "LR"
        ? facts.results.probe80.leftRight
        : facts.results.probe80.rightLeft
      : history === "LR"
        ? facts.results.probe80.rightLeft
        : facts.results.probe80.leftRight
    : null;
  return (
    <div className="route-page lab-page">
      <section className="route-hero">
        <p className="micro">Laboratory · Interactive reconstruction</p>
        <h1>
          Read the trace.
          <br />
          <em>Change one thing at a time.</em>
        </h1>
        <p>
          This live browser reconstruction is an educational model. It does not
          claim to reproduce archived trajectories or classifier statistics.
        </p>
      </section>
      <section className="lab-shell">
        <aside className="lab-rail">
          <div>
            <h2>Protocol</h2>
            <button
              className={history === "LR" ? "selected cyan-border" : ""}
              onClick={() => setHistory("LR")}
            >
              Left <ArrowRight size={14} /> Right
            </button>
            <button
              className={history === "RL" ? "selected amber-border" : ""}
              onClick={() => setHistory("RL")}
            >
              Right <ArrowRight size={14} /> Left
            </button>
          </div>
          <div>
            <h2>View layer</h2>
            {(["particles", "pressure", "density"] as const).map((item) => (
              <button
                key={item}
                className={layer === item ? "selected" : ""}
                onClick={() => setLayer(item)}
              >
                {item === "particles"
                  ? "Particle world"
                  : item === "pressure"
                    ? "Interaction pressure"
                    : "Density field"}
              </button>
            ))}
          </div>
          <div className="paper-preset">
            <h2>
              Paper preset <Info size={15} />
            </h2>
            <dl>
              <dt>Particles</dt>
              <dd>72</dd>
              <dt>Area fraction</dt>
              <dd>0.68</dd>
              <dt>kBT</dt>
              <dd>0.15</dd>
              <dt>Grid</dt>
              <dd>6 × 6</dd>
              <dt>Time step</dt>
              <dd>0.0025</dd>
            </dl>
            <button
              className="reset"
              onClick={() => {
                setHistory("LR");
                setLayer("particles");
                setProbe(null);
                setDelayIndex(0);
                setShuffled(false);
                setResetKey((value) => value + 1);
              }}
            >
              <RotateCcw size={14} /> Reset to paper preset
            </button>
          </div>
        </aside>
        <div className="lab-main">
          <div className="lab-stage">
            {layer === "particles" ? (
              <ParticleBox key={resetKey} history={history} showControls />
            ) : (
              <div className="field-stage">
                <FieldGrid
                  history={history}
                  density={layer === "density"}
                  shuffled={shuffled}
                />
                <p>
                  {layer === "pressure"
                    ? "Interaction pressure estimates local contact forces."
                    : "Density estimates local particle crowding."}
                </p>
              </div>
            )}
          </div>
          <div className="lab-meta">
            <span>Interactive reconstruction</span>
            <span>
              History:{" "}
              <b>{history === "LR" ? "Left → Right" : "Right → Left"}</b>
            </span>
            <span>
              Drive: <b>removed</b>
            </span>
            <span>
              Delay: <b>{facts.results.delays[delayIndex]} steps</b>
            </span>
          </div>
          <div className="lab-test-strip">
            <label htmlFor="lab-delay">Observation delay</label>
            <input
              id="lab-delay"
              type="range"
              min="0"
              max="4"
              step="1"
              value={delayIndex}
              onChange={(event) => setDelayIndex(Number(event.target.value))}
            />
            <output>
              {(facts.results.pressureDecay[delayIndex] * 100).toFixed(1)}%
              published pressure decoding
            </output>
            <button
              onClick={() => setShuffled((value) => !value)}
              disabled={layer === "particles"}
            >
              <Shuffle size={14} />{" "}
              {shuffled ? "Restore cells" : "Shuffle cells"}
            </button>
          </div>
          <section className="probe-console">
            <div>
              <p className="micro">Weak probe</p>
              <h2>Ask the box gently.</h2>
              <p>
                Apply a later weak mechanical probe to compare history-dependent
                response.
              </p>
            </div>
            <div className="probe-actions">
              <button
                className={probe === "left" ? "selected" : ""}
                onClick={() => setProbe("left")}
              >
                Probe left
              </button>
              <button
                className={probe === "right" ? "selected" : ""}
                onClick={() => setProbe("right")}
              >
                Probe right
              </button>
            </div>
            {response !== null && (
              <output aria-live="polite" className="probe-output">
                Response:{" "}
                <b>
                  {response > 0 ? "+" : ""}
                  {response.toFixed(4)}
                </b>
                <small>
                  Illustrating the published delay-80 directionality.
                </small>
              </output>
            )}
          </section>
        </div>
      </section>
      <section className="criteria">
        <p className="micro">Six DME criteria</p>
        <ol>
          <li>Matched histories differ only in temporal order.</li>
          <li>External forcing fully ends before observation.</li>
          <li>Bulk controls do not reliably decode order.</li>
          <li>Local fields support held-out decoding.</li>
          <li>Spatial shuffle destroys that decoding.</li>
          <li>A later weak probe responds differently.</li>
        </ol>
      </section>
    </div>
  );
}
