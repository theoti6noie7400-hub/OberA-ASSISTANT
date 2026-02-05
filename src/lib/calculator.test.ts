import { describe, expect, it } from "vitest";
import { calcMonoSaturation, parseNumberLoose, statusFromSaturation } from "./calculator";

describe("calculator", () => {
  it("parse les virgules", () => {
    expect(parseNumberLoose("8,30")).toBeCloseTo(8.3);
  });

  it("calcule la saturation mono", () => {
    const result = calcMonoSaturation(1.2, 5.8, 0.35);
    expect(result.capaciteMaxKg).toBeCloseTo(2.03);
    expect(result.saturationPct).toBeCloseTo(59.1133, 3);
  });

  it("retourne le statut de seuil", () => {
    expect(statusFromSaturation(65)).toBe("OK");
    expect(statusFromSaturation(72)).toBe("À surveiller");
    expect(statusFromSaturation(80)).toBe("À remplacer");
    expect(statusFromSaturation(101)).toBe("Saturé");
  });
});
