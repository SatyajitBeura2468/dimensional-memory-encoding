import { facts } from "../data/dmePaperFacts";

export function DecayChart({ compact = false }: { compact?: boolean }) {
  const { delays, pressureDecay, densityDecay } = facts.results;
  const width = 640,
    height = compact ? 220 : 300,
    x = (i: number) => 55 + (i * (width - 95)) / 4,
    y = (v: number) => height - 35 - ((v - 0.45) / 0.55) * (height - 75);
  const path = (v: readonly number[]) =>
    v.map((n, i) => `${i ? "L" : "M"}${x(i)},${y(n)}`).join(" ");
  return (
    <div className="chart-wrap">
      <svg
        className="decay-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Pressure-based history decoding begins at 90.8 percent and falls to 55.0 percent at delay 700, near chance."
      >
        <line
          x1="55"
          x2={width - 40}
          y1={y(0.5)}
          y2={y(0.5)}
          className="chance"
        />
        <text x={width - 37} y={y(0.5) - 5}>
          50% chance
        </text>
        <path d={path(pressureDecay)} className="pressure-line" />
        <path d={path(densityDecay)} className="density-line" />
        {pressureDecay.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="5" className="pressure-point" />
            <text x={x(i)} y={y(v) - 12} textAnchor="middle">
              {(v * 100).toFixed(1)}
            </text>
            <text x={x(i)} y={height - 12} textAnchor="middle">
              {delays[i]}
            </text>
          </g>
        ))}
        <text x="8" y="22">
          accuracy
        </text>
      </svg>
      <div className="chart-key">
        <span>
          <i className="line pressure" />
          pressure
        </span>
        <span>
          <i className="line density" />
          density
        </span>
      </div>
    </div>
  );
}
