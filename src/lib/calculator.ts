export const FILTER_REFERENCES = {
  EPUREX_1000: { id: "EPUREX_1000", label: "CHARBON EPUREX 1000", poidsNeufBrutKg: 7.1, poidsCharbonNetKg: 5.8 },
  EPUREX_MIXTE_HEPA_CH: { id: "EPUREX_MIXTE_HEPA_CH", label: "CHARBON EPUREX 1000 MIXTE", poidsNeufBrutKg: 7.3, poidsCharbonNetKg: 3.0 },
  EPUREX_5000_CHARBON: { id: "EPUREX_5000_CHARBON", label: "CHARBON EPUREX 5000", poidsNeufBrutKg: 18.7, poidsCharbonNetKg: 12.0 },
  CAN_1500: { id: "CAN_1500", label: "CAN 1500", poidsNeufBrutKg: 2, poidsCharbonNetKg: 1.2 },
  PURPLE_1500: { id: "PURPLE_1500", label: "CAN 1500 PURPLE", poidsNeufBrutKg: 3, poidsCharbonNetKg: 2.2 }
} as const;

export type FilterRef = (typeof FILTER_REFERENCES)[keyof typeof FILTER_REFERENCES];
export type GroupKey = "1" | "2" | "3" | "4";

export const GROUPS: Record<GroupKey, { label: string; avg: number }> = {
  "1": { label: "Groupe 1 - Très haute adsorption", avg: 0.35 },
  "2": { label: "Groupe 2 - Forte adsorption", avg: 0.17 },
  "3": { label: "Groupe 3 - Faible adsorption", avg: 0.07 },
  "4": { label: "Groupe 4 - Mauvaise adsorption", avg: 0.0 }
};

export const POLLUANTS = [
  { id: "toluene_g1", label: "Toluène (C7H8)", group: "1" as GroupKey },
  { id: "benzene_g1", label: "Benzène (C6H6)", group: "1" as GroupKey },
  { id: "formaldehyde_g2", label: "Formaldéhyde", group: "2" as GroupKey },
  { id: "chlorine_g2", label: "Chlore (Cl2)", group: "2" as GroupKey },
  { id: "h2s_g3", label: "Hydrogène sulfuré (H2S)", group: "3" as GroupKey },
  { id: "nh3_g4", label: "Ammoniac (NH3)", group: "4" as GroupKey }
];

export function parseNumberLoose(value: string): number {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function calcMonoSaturation(gainKg: number, charbonNetKg: number, groupAvg: number) {
  const capaciteMaxKg = charbonNetKg * groupAvg;
  if (!Number.isFinite(gainKg) || !Number.isFinite(capaciteMaxKg) || capaciteMaxKg <= 0) {
    return { capaciteMaxKg, saturationPct: Number.NaN };
  }

  return { capaciteMaxKg, saturationPct: (gainKg / capaciteMaxKg) * 100 };
}

export function statusFromSaturation(saturation: number) {
  if (!Number.isFinite(saturation)) return "-";
  if (saturation >= 100) return "Saturé";
  if (saturation >= 75) return "À remplacer";
  if (saturation >= 70) return "À surveiller";
  return "OK";
}
