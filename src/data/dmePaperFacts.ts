export type ClaimClass =
  "direct-result" | "interpretation" | "prediction" | "analogy" | "limitation";

export const facts = {
  paper: {
    version: "Version 3.0",
    date: "3 August 2026",
    author: "Satyajit Beura",
    affiliation: "Independent Student Researcher · Bhawanipatna, Odisha, India",
    title:
      "Dimensional Memory Encoding: Temporal Order, Spatial Interaction Pressure, and Mechanically Readable Distributed Traces in a Driven Brownian Soft-Particle System",
    subtitle:
      "Temporal order, spatial interaction pressure, and mechanically readable distributed traces in a driven Brownian soft-particle system",
    publicationType: "Version 3 computational research revision",
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

export const researchQuestion =
  "Can the spatial geometry of local interaction pressure, measured after external driving has ceased, retain statistically decodable information about the temporal order of matched perturbations beyond bulk observables and local density, and can that information be recovered through a later weak physical probe?";

export const version3Abstract =
  "We study whether a driven Brownian soft-particle system can retain a readable record of the temporal order of matched perturbations after external driving has ceased. Two protocols apply the same localized compressions in opposite order to a two-dimensional system of 72 soft particles. At the first post-drive observation, global observables remain near chance at 48.3% balanced accuracy, while local density and interaction-pressure fields decode the histories at 86.3% and 90.8%, respectively. The pressure interval is 87.3%–94.2% with AUC 0.981; combining density and pressure reaches 92.1%. Spatial shuffling collapses the spatial signal (p = 0.002), and paired label swaps produce the same null-test value. A later weak mechanical probe reads the fading asymmetry at delays 80 and 200. The operational conclusion is restricted: local interaction-pressure geometry can act as a transient, distributed, and mechanically readable carrier of temporal-order information in this driven Brownian soft-particle system. This website presents locked Version 3 facts alongside clearly labelled interactive reconstructions; it does not claim archived trajectories, laboratory validation, consciousness, quantum storage, extra dimensions, or a universal memory property of matter.";

export const operationalCriteria = [
  "Post-drive retention",
  "Bulk-state exclusion",
  "Information beyond density",
  "Spatial specificity",
  "Physical readout",
  "Transient decay",
] as const;

export const references = [
  [
    "Keim, N. C., Paulsen, J. D., Zeravcic, Z., Sastry, S., & Nagel, S. R. (2019). Memory formation in matter. Reviews of Modern Physics, 91, 035002.",
    "https://doi.org/10.1103/RevModPhys.91.035002",
  ],
  [
    "Keim, N. C., & Nagel, S. R. (2011). Generic transient memory formation in disordered systems with noise. Physical Review Letters, 107, 010603.",
    "https://doi.org/10.1103/PhysRevLett.107.010603",
  ],
  [
    "Schreiber, T. (2000). Measuring information transfer. Physical Review Letters, 85, 461–464.",
    "https://doi.org/10.1103/PhysRevLett.85.461",
  ],
  [
    "Ermak, D. L., & McCammon, J. A. (1978). Brownian dynamics with hydrodynamic interactions. The Journal of Chemical Physics, 69, 1352.",
    "https://doi.org/10.1063/1.436761",
  ],
  [
    "Irving, J. H., & Kirkwood, J. G. (1950). The statistical mechanical theory of transport processes. IV. The equations of hydrodynamics. The Journal of Chemical Physics, 18, 817.",
    "https://doi.org/10.1063/1.1747782",
  ],
  [
    "Jarzynski, C. (1997). Nonequilibrium equality for free energy differences. Physical Review Letters, 78, 2690–2693.",
    "https://doi.org/10.1103/PhysRevLett.78.2690",
  ],
  [
    "Crooks, G. E. (1999). Entropy production fluctuation theorem and the nonequilibrium work relation for free energy differences. Physical Review E, 60, 2721.",
    "https://doi.org/10.1103/PhysRevE.60.2721",
  ],
  [
    "Landauer, R. (1961). Irreversibility and heat generation in the computing process. IBM Journal of Research and Development, 5, 183–191.",
    "https://doi.org/10.1147/rd.53.0183",
  ],
] as const;

export const zenodoRecord = {
  recordUrl: "https://zenodo.org/records/17943112",
  metadataUrl: "https://zenodo.org/api/records/17943112",
  doiUrl: "https://doi.org/10.5281/zenodo.17943112",
  conceptDoiUrl: "https://doi.org/10.5281/zenodo.17943111",
  title:
    "Transient Memory via Local Pressure Heterogeneity in Non-Equilibrium Systems",
  publicationDate: "2025-12-15",
  resourceType: "Preprint",
  license: "CC BY 4.0",
  status: "Exploratory preprint; not the Version 3 release",
  creator: "Beura, Satyajit",
  orcidUrl: "https://orcid.org/0009-0006-4471-2845",
  file: {
    name: "Transient Memory Research Paper SB.pdf",
    size: 161268,
    checksum: "md5:1742de274c5e30e751073031e96f8942",
    downloadUrl:
      "https://zenodo.org/api/records/17943112/files/Transient%20Memory%20Research%20Paper%20SB.pdf/content",
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
  githubUrl: "https://github.com/SatyajitBeura2468/dimensional-memory-encoding",
  githubReleaseUrl:
    "https://github.com/SatyajitBeura2468/dimensional-memory-encoding/releases/tag/v3.0.0",
  zenodoRecordUrl: zenodoRecord.recordUrl,
  doiUrl: zenodoRecord.doiUrl,
  orcidUrl: zenodoRecord.orcidUrl,
  issueUrl:
    "https://github.com/SatyajitBeura2468/dimensional-memory-encoding/issues",
  licenseUrl: "https://opensource.org/license/mit",
  citationFileUrl:
    "https://github.com/SatyajitBeura2468/dimensional-memory-encoding/blob/main/CITATION.cff",
  versionHistoryUrl: "https://dimensional-memory-encoding.vercel.app/history",
  paperUrl: zenodoRecord.file.downloadUrl,
  replicationUrl:
    "https://github.com/SatyajitBeura2468/dimensional-memory-encoding/releases/tag/v3.0.0",
  paperDownloadUrl: zenodoRecord.file.downloadUrl,
  replicationDownloadUrl:
    "https://github.com/SatyajitBeura2468/dimensional-memory-encoding/releases/tag/v3.0.0",
} as const;
