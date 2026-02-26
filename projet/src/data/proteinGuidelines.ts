export const PROTEIN_GUIDELINES = {
  sedentary: { label: "Sédentaire", min: 0.8, max: 1.0 },
  endurance: { label: "Endurance", min: 1.2, max: 1.6 },
  maintenance: { label: "Conservation de la masse musculaire", min: 1.6, max: 1.8 },
  muscleGain: { label: "Prise de masse musculaire", min: 1.8, max: 2.2 },
} as const;

export type Goal = keyof typeof PROTEIN_GUIDELINES;