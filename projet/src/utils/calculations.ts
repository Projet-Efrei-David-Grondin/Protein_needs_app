export function generateWeights(
  min: number,
  max: number,
  rows: number
): number[] {
  if (rows <= 1) return [min];

  const step = (max - min) / (rows - 1);

  return Array.from({ length: rows }, (_, i) =>
    Math.round(min + i * step)
  );
}

export function calculateProteinRange(
  weight: number,
  minPerKg: number,
  maxPerKg: number
) {
  return {
    min: weight * minPerKg,
    max: weight * maxPerKg,
  };
}

export function formatProteinRange(min: number, max: number): string {
  return `${min} – ${max} g/jour`;
}