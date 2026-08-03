export type ClaimClass =
  "direct-result" | "interpretation" | "prediction" | "analogy" | "limitation";

export const facts = {
  paper: {
    version: "Version 3.0",
    date: "3 August 2026",
    author: "Satyajit Beura",
    affiliation: "Independent Student Researcher · Bhawanipatna, Odisha, India",
  },
  model: {
    description: "2D overdamped Brownian soft-particle simulation",
    particles: 72,
    areaFraction: 0.68,
    boxLength: 9.1192,
    stiffness: 25,
    kBT: 0.15,
    mobility: 1,
    diameter: 1,
    energyScale: 1,
    timestep: 0.0025,
    initialSteps: 1000,
    configurations: 120,
    trajectories: 240,
    records: 1200,
    grid: 6,
  },
  protocol: {
    leftSite: 0.25,
    rightSite: 0.75,
    amplitude: 2.2,
    width: 1.1,
    rampUp: 60,
    hold: 100,
    rampDown: 60,
    pulse: 220,
    gap: 80,
    total: 520,
  },
  results: {
    bulk: 0.483,
    bulkInterval: [0.417, 0.55],
    density: 0.863,
    pressure: 0.908,
    pressureInterval: [0.873, 0.942],
    auc: 0.981,
    combined: 0.921,
    informationBits: 0.736,
    beyondDensity: 0.1198,
    beyondDensityInterval: [0.0682, 0.1694],
    delays: [0, 80, 200, 400, 700],
    pressureDecay: [0.908, 0.783, 0.704, 0.588, 0.55],
    densityDecay: [0.863, 0.833, 0.746, 0.625, 0.554],
    shuffle: {
      observed0: 0.908,
      mean0: 0.5,
      standardDeviation0: 0.041,
      percentile95: 0.567,
      observed200: 0.704,
      mean200: 0.496,
      randomizations: 499,
      pValue: 0.002,
    },
    labelSwap: { datasets: 499, mean: 0.5, pValue: 0.002 },
    probe80: {
      leftRight: 0.1763,
      rightLeft: -0.2173,
      difference: -0.3936,
      accuracy: 0.758,
      auc: 0.855,
    },
    probe200: {
      leftRight: 0.1053,
      rightLeft: -0.1374,
      difference: -0.2427,
      accuracy: 0.683,
      auc: 0.735,
    },
    work: 16.516,
    betaWork: 110.1,
    robustness: {
      conditions: 9,
      minimum: 0.783,
      maximum: 1,
      decoders: 6,
      assignments: 100,
      folds: 6,
      particles: [50, 72, 98],
      grids: [5, 6, 7],
    },
  },
} as const;

export const claims: Record<string, { text: string; kind: ClaimClass }> = {
  conclusion: {
    text: "Local interaction-pressure geometry can act as a transient, distributed, and mechanically readable carrier of temporal-order information in a driven Brownian soft-particle system.",
    kind: "interpretation",
  },
  limitation: {
    text: "Scalar local pressure did not successfully predict the complete noisy future local-flow field.",
    kind: "limitation",
  },
  reconstruction: {
    text: "This browser simulation is an interactive reconstruction, not archived research output.",
    kind: "limitation",
  },
  analogy: {
    text: "A memory is a past that can still be read.",
    kind: "analogy",
  },
  prediction: {
    text: "A controlled physical realization should lose temporal-order decoding when its local interaction field is spatially randomized.",
    kind: "prediction",
  },
};

export const siteConfig = {
  productionUrl: "https://dimensional-memory-encoding.vercel.app",
  paperUrl: "",
  replicationUrl: "",
} as const;
