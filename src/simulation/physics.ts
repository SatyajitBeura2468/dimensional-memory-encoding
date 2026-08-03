export function createSeededRandom(seed: number) {
  let state = seed;
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646;
}

export function minimumImageDistance(delta: number, boxLength = 1) {
  return delta - boxLength * Math.round(delta / boxLength);
}

export function harmonicContactForce(
  distance: number,
  stiffness = 25,
  diameter = 1,
) {
  return distance < diameter ? stiffness * (diameter - distance) : 0;
}

export function gridCounts(
  points: readonly { x: number; y: number }[],
  size = 6,
) {
  const cells = Array<number>(size * size).fill(0);
  for (const point of points) {
    const x = Math.min(size - 1, Math.max(0, Math.floor(point.x * size)));
    const y = Math.min(size - 1, Math.max(0, Math.floor(point.y * size)));
    cells[y * size + x] += 1;
  }
  return cells;
}

export function shufflePreservingValues(values: readonly number[], seed = 499) {
  const output = [...values];
  const random = createSeededRandom(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}
