import { describe, expect, it } from "vitest";
import { claims, facts } from "./dmePaperFacts";

describe("locked DME paper facts", () => {
  it("preserves principal pressure result and decay series", () => {
    expect(facts.results.pressure).toBe(0.908);
    expect(facts.results.pressureDecay).toEqual([
      0.908, 0.783, 0.704, 0.588, 0.55,
    ]);
    expect(facts.results.delays).toHaveLength(5);
  });
  it("keeps the scope limitation explicitly classified", () => {
    expect(claims.limitation.kind).toBe("limitation");
    expect(claims.conclusion.kind).toBe("interpretation");
  });
  it("uses the paper preset particle count and grid", () => {
    expect(facts.model.particles).toBe(72);
    expect(facts.model.grid).toBe(6);
  });
});
