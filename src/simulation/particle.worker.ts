type Particle = { x: number; y: number; vx: number; vy: number };
type Message =
  | { type: "reset"; seed: number; history: "LR" | "RL" }
  | { type: "playing"; value: boolean }
  | { type: "speed"; value: number }
  | { type: "pointer"; x: number; y: number; active: boolean };

let particles: Particle[] = [];
let playing = true;
let speed = 1;
let pointer = { x: 0.5, y: 0.5, active: false };
let random = seededRandom(120);

function seededRandom(seed: number) {
  let state = seed;
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646;
}

function reset(seed: number, history: "LR" | "RL") {
  random = seededRandom(seed);
  const bias = history === "LR" ? -0.016 : 0.016;
  particles = Array.from({ length: 72 }, (_, index) => ({
    x: (random() + (index % 6 < 3 ? bias : -bias) + 1) % 1,
    y: random(),
    vx: (random() - 0.5) * 0.002,
    vy: (random() - 0.5) * 0.002,
  }));
}

function tick() {
  if (playing) {
    for (const particle of particles) {
      particle.vx = particle.vx * 0.91 + (random() - 0.5) * 0.0009 * speed;
      particle.vy = particle.vy * 0.91 + (random() - 0.5) * 0.0009 * speed;
      if (pointer.active) {
        let dx = particle.x - pointer.x;
        let dy = particle.y - pointer.y;
        dx -= Math.round(dx);
        dy -= Math.round(dy);
        const distance2 = dx * dx + dy * dy;
        if (distance2 < 0.018 && distance2 > 0.0001) {
          const force = (0.018 - distance2) * 0.012;
          particle.vx += (dx / Math.sqrt(distance2)) * force;
          particle.vy += (dy / Math.sqrt(distance2)) * force;
        }
      }
      particle.x = (particle.x + particle.vx * speed + 1) % 1;
      particle.y = (particle.y + particle.vy * speed + 1) % 1;
    }
  }
  postMessage({ type: "frame", particles });
}

self.onmessage = (event: MessageEvent<Message>) => {
  const message = event.data;
  if (message.type === "reset") reset(message.seed, message.history);
  if (message.type === "playing") playing = message.value;
  if (message.type === "speed") speed = message.value;
  if (message.type === "pointer") pointer = message;
};

reset(120, "LR");
setInterval(tick, 32);
