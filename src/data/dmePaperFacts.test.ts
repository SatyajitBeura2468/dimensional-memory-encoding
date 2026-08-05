import { describe, expect, it } from "vitest";
import { claims, facts, siteConfig, zenodoRecord } from "./dmePaperFacts";

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
  it("contains verified non-placeholder research links", () => {
    const required = [
      siteConfig.productionUrl,
      siteConfig.githubUrl,
      siteConfig.zenodoRecordUrl,
      siteConfig.doiUrl,
      siteConfig.paperDownloadUrl,
      siteConfig.replicationDownloadUrl,
      siteConfig.orcidUrl,
      siteConfig.issueUrl,
      siteConfig.licenseUrl,
      siteConfig.citationFileUrl,
      siteConfig.versionHistoryUrl,
    ];
    expect(required.every((url) => url.startsWith("https://"))).toBe(true);
    expect(required.join(" ").toLowerCase()).not.toContain("to be added");
    expect(siteConfig.doiUrl).toMatch(
      /^https:\/\/doi\.org\/10\.5281\/zenodo\.\d+$/,
    );
  });
  it("keeps the exploratory Zenodo record distinct from Version 3", () => {
    expect(zenodoRecord.status.toLowerCase()).toContain("exploratory");
    expect(zenodoRecord.file.name).toBe(
      "Transient Memory Research Paper SB.pdf",
    );
    expect(zenodoRecord.file.checksum).toBe(
      "md5:1742de274c5e30e751073031e96f8942",
    );
    expect(siteConfig.githubReleaseUrl).toContain("/releases/tag/v3.0.0");
  });
});
