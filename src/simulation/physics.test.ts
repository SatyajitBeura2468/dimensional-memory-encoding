import { describe, expect, it } from "vitest";
import {
  createSeededRandom,
  gridCounts,
  harmonicContactForce,
  minimumImageDistance,
  shufflePreservingValues,
} from "./physics";

describe("DME reconstruction helpers", () => {
  it("creates deterministic random sequences", () => {
    const first = createSeededRandom(72);
    const second = createSeededRandom(72);
    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });
  it("uses periodic minimum-image distances", () => {
    expect(minimumImageDistance(0.8)).toBeCloseTo(-0.2);
    expect(minimumImageDistance(-0.8)).toBeCloseTo(0.2);
  });
  it("applies harmonic force only during overlap", () => {
    expect(harmonicContactForce(0.8)).toBeCloseTo(5);
    expect(harmonicContactForce(1.2)).toBe(0);
  });
  it("bins points and preserves totals", () => {
    const counts = gridCounts([
      { x: 0.1, y: 0.1 },
      { x: 0.99, y: 0.99 },
    ]);
    expect(counts.reduce((sum, value) => sum + value, 0)).toBe(2);
    expect(counts).toHaveLength(36);
  });
  it("shuffles locations without changing values", () => {
    const values = [0.1, 0.2, 0.3, 0.4];
    const shuffled = shufflePreservingValues(values);
    expect(shuffled).not.toEqual(values);
    expect([...shuffled].sort()).toEqual(values);
  });
});
