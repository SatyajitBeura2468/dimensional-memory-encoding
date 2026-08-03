import { ArrowDown, ArrowRight, Eye, Shuffle, Sparkles } from "lucide-react";
import { useState } from "react";
import { DecayChart } from "../components/DecayChart";
import { FieldGrid } from "../components/FieldGrid";
import { ParticleBox } from "../components/ParticleBox";
import { facts } from "../data/dmePaperFacts";

export function HomePage() {
  const [history, setHistory] = useState<"LR" | "RL">("LR"),
    [shuffled, setShuffled] = useState(false),
    [delay, setDelay] = useState(0);
  const selected = history === "LR" ? "Left → Right" : "Right → Left";
  const accuracy = (facts.results.pressureDecay[delay] * 100).toFixed(1);
  return (
    <div className="story">
      <section className="hero">
        <div className="hero-copy">
          <p className="micro">Dimensional Memory Encoding</p>
          <h1>
            This box has no brain.
            <br />
            <em>Can it still remember?</em>
          </h1>
          <p className="lede">
            A small physical world is given the same two pushes. Only their
            order changes.
          </p>
          <a className="button primary" href="#experiment">
            Begin the experiment <ArrowDown size={17} />
          </a>
        </div>
        <ParticleBox className="hero-box" />
        <p className="hero-whisper">
          A memory is a past that can still be read.
        </p>
      </section>
      <section className="chapter intro" id="experiment">
        <p className="micro">01 · What counts as memory?</p>
        <h2>A memory is a past that can still be read.</h2>
        <p>
          Something fading is not automatically a memory. To call it one, a
          specific earlier event must remain recoverable through a defined later
          measurement.
        </p>
        <div className="rule">
          <span>Delayed response</span>
          <ArrowRight />
          <strong>Recoverable record</strong>
        </div>
      </section>
      <section className="chapter system">
        <div>
          <p className="micro">02 · Meet the system</p>
          <h2>
            72 soft particles.
            <br />
            One small world.
          </h2>
          <p>
            They jiggle from thermal motion. When they overlap slightly, they
            push each other apart. The reconstruction is interactive; published
            results are identified separately.
          </p>
          <details>
            <summary>Paper details</summary>
            <p>
              2D overdamped Brownian soft-particle simulation · area fraction{" "}
              {facts.model.areaFraction} · kBT {facts.model.kBT} · stiffness{" "}
              {facts.model.stiffness} · periodic square box.
            </p>
          </details>
        </div>
        <ParticleBox showControls />
      </section>
      <section className="chapter histories">
        <p className="micro">03 · Protocol</p>
        <h2>Same pushes. Different order.</h2>
        <p className="wide-copy">
          Both histories use the same sites, amplitude, width, duration, ramps
          and total schedule. One thing changes: which site comes first.
        </p>
        <div
          className="history-select"
          role="group"
          aria-label="Select protocol history"
        >
          <button
            className={history === "LR" ? "selected cyan-border" : ""}
            onClick={() => setHistory("LR")}
          >
            Left <ArrowRight size={16} /> Right
          </button>
          <button
            className={history === "RL" ? "selected amber-border" : ""}
            onClick={() => setHistory("RL")}
          >
            Right <ArrowRight size={16} /> Left
          </button>
        </div>
        <div className="protocol">
          <span>
            Ramp up
            <br />
            <b>60</b>
          </span>
          <span>
            Hold
            <br />
            <b>100</b>
          </span>
          <span>
            Ramp down
            <br />
            <b>60</b>
          </span>
          <span>
            Rest
            <br />
            <b>80</b>
          </span>
          <span>
            Second pulse
            <br />
            <b>220</b>
          </span>
          <span>
            Drive removed
            <br />
            <b>0</b>
          </span>
        </div>
        <div className="history-stage">
          <ParticleBox history={history} />
          <aside>
            <span className="status">
              <i />
              External drive: 0
            </span>
            <h3>Now the pushes are gone.</h3>
            <p>
              Nothing outside the box is telling us which happened first. If the
              order can still be recovered, the system retained a record.
            </p>
            <strong>{selected}</strong>
          </aside>
        </div>
      </section>
      <section className="chapter local">
        <div>
          <p className="micro">04 · The decisive measurement</p>
          <h2>
            Stop averaging
            <br />
            everything away.
          </h2>
          <p>
            Whole-box measures do not reliably reveal the order: published bulk
            balanced accuracy was <b>48.3%</b>, near chance.
          </p>
          <p>
            But a field retains where interactions were concentrated. Here,
            “dimensional” means spread across locations in an ordinary spatial
            field — not extra dimensions.
          </p>
        </div>
        <div className="field-pair">
          <FieldGrid history={history} density />
          <FieldGrid history={history} />
        </div>
      </section>
      <section className="chapter fingerprint">
        <div className="fingerprint-head">
          <p className="micro">05 · Spatial fingerprint</p>
          <h2>The order left a spatial fingerprint.</h2>
          <p>
            The displayed map is an illustrative reconstruction. The published
            test used individual held-out maps.
          </p>
        </div>
        <div className="fingerprint-layout">
          <FieldGrid history={history} shuffled={shuffled} />
          <div className="result">
            <span className="classification">direct result</span>
            <strong>{shuffled ? "50.0%" : "90.8%"}</strong>
            <span>balanced accuracy</span>
            <p>
              {shuffled
                ? "The values remain; their locations do not. The information collapses toward chance."
                : "Across unseen simulated states, pressure patterns distinguished the histories about 91% of the time."}
            </p>
            <button
              className="button secondary"
              onClick={() => setShuffled(!shuffled)}
            >
              <Shuffle size={16} />
              {shuffled ? "Restore locations" : "Shuffle locations"}
            </button>
          </div>
        </div>
      </section>
      <section className="chapter decay">
        <div>
          <p className="micro">06 · Relaxation</p>
          <h2>Forgetting is part of the evidence.</h2>
          <p>
            The signal fades toward chance after the drive is removed. That
            fading is expected from a transient physical record.
          </p>
          <div className="delay-controls">
            {facts.results.delays.map((d, i) => (
              <button
                key={d}
                className={delay === i ? "selected" : ""}
                onClick={() => setDelay(i)}
              >
                delay {d}
              </button>
            ))}
          </div>
          <p className="live-readout" aria-live="polite">
            Pressure decoding at delay {facts.results.delays[delay]}:{" "}
            <b>{accuracy}%</b>
          </p>
        </div>
        <DecayChart />
      </section>
      <section className="chapter probe">
        <div>
          <Sparkles size={22} />
          <p className="micro">07 · Weak mechanical probe</p>
          <h2>The memory changes a later physical response.</h2>
        </div>
        <div>
          <p>
            A gentle later probe responds differently depending on which side
            was compressed first. At delay 80, the two histories differ by{" "}
            <b>−0.3936</b> in paired response.
          </p>
          <div className="probe-rail">
            <span>
              Left → Right <b>+0.1763</b>
            </span>
            <span>
              Right → Left <b>−0.2173</b>
            </span>
          </div>
          <p className="muted">
            The particles are not thinking. This is a transient, distributed,
            mechanically readable physical record.
          </p>
        </div>
      </section>
      <section className="chapter final">
        <Eye />
        <h2>Can matter remember what happened to it?</h2>
        <p>
          In this system, local interaction-pressure geometry carries a fading,
          readable trace of temporal order.
        </p>
        <a className="button primary" href="/lab">
          Enter the laboratory <ArrowRight size={17} />
        </a>
      </section>
    </div>
  );
}
