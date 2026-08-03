import "@testing-library/jest-dom/vitest";

const context = {
  scale: () => undefined,
  fillRect: () => undefined,
  createRadialGradient: () => ({ addColorStop: () => undefined }),
  beginPath: () => undefined,
  moveTo: () => undefined,
  lineTo: () => undefined,
  stroke: () => undefined,
  arc: () => undefined,
  fill: () => undefined,
  set fillStyle(_value: string) {},
  set strokeStyle(_value: string) {},
  set lineWidth(_value: number) {},
};

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => context,
});
Object.defineProperty(window, "requestAnimationFrame", { value: () => 0 });
Object.defineProperty(window, "cancelAnimationFrame", {
  value: () => undefined,
});
