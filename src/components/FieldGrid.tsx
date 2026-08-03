import { useMemo } from "react";

const lr = [
  0.08, 0.16, 0.27, 0.46, 0.68, 0.82, 0.12, 0.23, 0.42, 0.65, 0.85, 0.96, 0.09,
  0.3, 0.56, 0.83, 0.94, 0.75, 0.05, 0.19, 0.47, 0.74, 0.89, 0.65, 0.04, 0.17,
  0.32, 0.54, 0.7, 0.48, 0.06, 0.12, 0.25, 0.39, 0.5, 0.31,
];
const rl = [...lr].map((v, i) =>
  Math.max(0.03, Math.min(1, v + (i % 6 < 3 ? 0.17 : -0.17))),
);
const palette = (v: number) =>
  `hsl(${220 - v * 165} ${45 + v * 35}% ${18 + v * 66}%)`;
export function FieldGrid({
  history = "LR",
  shuffled = false,
  density = false,
  label = true,
}: {
  history?: "LR" | "RL";
  shuffled?: boolean;
  density?: boolean;
  label?: boolean;
}) {
  const values = useMemo(() => {
    const base = history === "LR" ? lr : rl;
    const arranged = shuffled
      ? [...base].sort((a, b) => Math.sin(a * 89) - Math.sin(b * 89))
      : base;
    return density
      ? arranged.map((v, i) =>
          Math.max(0.05, Math.min(0.95, v * 0.76 + (i % 2) * 0.12)),
        )
      : arranged;
  }, [history, shuffled, density]);
  return (
    <figure className="field-figure">
      <div
        className="field-grid"
        aria-label={`${density ? "Density" : "Interaction pressure"} 6 by 6 field, ${shuffled ? "locations shuffled" : ""}`}
      >
        {values.map((v, i) => (
          <span
            key={i}
            style={{
              backgroundColor: density
                ? `hsl(255 20% ${20 + v * 55}%)`
                : palette(v),
            }}
          >
            <b>{v.toFixed(2)}</b>
          </span>
        ))}
      </div>
      {label && (
        <figcaption>
          <span>{density ? "Density" : "Interaction pressure"} · 6 × 6</span>
          <div className="legend">
            <i />
            <span>lower</span>
            <span>higher</span>
          </div>
        </figcaption>
      )}
    </figure>
  );
}
