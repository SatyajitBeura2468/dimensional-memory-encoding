import { Eye, Gauge, Pause, Play, RotateCcw, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  history?: "LR" | "RL";
  showControls?: boolean;
  className?: string;
  phase?: "rest" | "left" | "right" | "released";
};
type Dot = { x: number; y: number; vx: number; vy: number };

export function ParticleBox({
  history = "LR",
  showControls = false,
  className = "",
  phase = "released",
}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const worker = useRef<Worker | null>(null);
  const particles = useRef<Dot[]>([]);
  const trails = useRef<{ x: number; y: number; a: number }[]>([]);
  const [playing, setPlaying] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [showTrails, setShowTrails] = useState(false);
  const [speed, setSpeed] = useState(1);
  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  useEffect(() => {
    if (typeof Worker === "undefined") return;
    const simulation = new Worker(
      new URL("../simulation/particle.worker.ts", import.meta.url),
      { type: "module" },
    );
    worker.current = simulation;
    simulation.onmessage = (event: MessageEvent<{ particles: Dot[] }>) => {
      particles.current = event.data.particles;
    };
    simulation.postMessage({
      type: "reset",
      seed: history === "LR" ? 120 : 210,
      history,
    });
    simulation.postMessage({
      type: "playing",
      value: !reducedMotion,
    });
    return () => simulation.terminate();
  }, [history, reducedMotion]);

  useEffect(() => {
    worker.current?.postMessage({ type: "playing", value: playing });
  }, [playing]);
  useEffect(() => {
    worker.current?.postMessage({ type: "speed", value: speed });
  }, [speed]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      if (c.width !== Math.round(rect.width * dpr)) {
        c.width = Math.round(rect.width * dpr);
        c.height = Math.round(rect.height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      ctx.fillStyle = "#080d11";
      ctx.fillRect(0, 0, w, h);

      const pulseX =
        phase === "left"
          ? 0.25
          : phase === "right"
            ? 0.75
            : history === "LR"
              ? 0.28
              : 0.72;
      const pulseColor =
        phase === "right" || (phase === "released" && history === "RL")
          ? "246,179,71"
          : "98,220,231";
      const glow = ctx.createRadialGradient(
        pulseX * w,
        h * 0.5,
        0,
        pulseX * w,
        h * 0.5,
        w * 0.42,
      );
      glow.addColorStop(
        0,
        `rgba(${pulseColor},${phase === "rest" ? 0.05 : 0.19})`,
      );
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const dots = particles.current;
      if (showTrails && playing) {
        dots.forEach((dot, index) => {
          if (index % 5 === 0)
            trails.current.push({ x: dot.x, y: dot.y, a: 1 });
        });
        trails.current = trails.current.slice(-180);
      }
      for (const trail of trails.current) {
        ctx.fillStyle = `rgba(98,220,231,${trail.a * 0.16})`;
        ctx.fillRect(trail.x * w, trail.y * h, 1.4, 1.4);
        trail.a *= 0.965;
      }

      if (contacts) {
        for (let i = 0; i < dots.length; i += 1) {
          for (let j = i + 1; j < dots.length; j += 1) {
            let dx = dots[i].x - dots[j].x;
            let dy = dots[i].y - dots[j].y;
            dx -= Math.round(dx);
            dy -= Math.round(dy);
            const distance = Math.hypot(dx, dy);
            if (distance < 0.075) {
              ctx.strokeStyle = `rgba(245,236,160,${Math.max(0.08, (0.075 - distance) * 8)})`;
              ctx.lineWidth = Math.max(0.6, (0.075 - distance) * 25);
              ctx.beginPath();
              ctx.moveTo(dots[i].x * w, dots[i].y * h);
              ctx.lineTo(dots[j].x * w, dots[j].y * h);
              ctx.stroke();
            }
          }
        }
      }
      dots.forEach((dot, index) => {
        const radius = Math.max(3.8, w * 0.0115);
        ctx.beginPath();
        ctx.fillStyle =
          index % 11 === 0
            ? history === "LR"
              ? "#62dce7"
              : "#f5b347"
            : "#e9e7dc";
        ctx.arc(dot.x * w, dot.y * h, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.22)";
        ctx.lineWidth = 0.65;
        ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [contacts, history, phase, playing, showTrails]);

  const pointer = (
    event: React.PointerEvent<HTMLCanvasElement>,
    active: boolean,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    worker.current?.postMessage({
      type: "pointer",
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active,
    });
  };
  const reset = () => {
    trails.current = [];
    worker.current?.postMessage({
      type: "reset",
      seed: history === "LR" ? 120 : 210,
      history,
    });
  };

  return (
    <div className={`particle-box ${className}`}>
      <canvas
        ref={canvas}
        onPointerMove={(event) => pointer(event, true)}
        onPointerLeave={(event) => pointer(event, false)}
        aria-label={`Interactive reconstruction with exactly 72 particles: ${history === "LR" ? "Left then Right" : "Right then Left"} history`}
      />
      <div className="particle-caption" aria-hidden="true">
        <span>
          <i className="dot cyan" />
          left site
        </span>
        <span>
          <i className="dot amber" />
          right site
        </span>
        <span>72 soft particles</span>
      </div>
      {showControls && (
        <div
          className="canvas-controls"
          role="group"
          aria-label="Particle display controls"
        >
          <button onClick={() => setPlaying(!playing)} aria-pressed={playing}>
            {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className={contacts ? "selected" : ""}
            onClick={() => setContacts(!contacts)}
            aria-pressed={contacts}
          >
            <Gauge size={15} /> Contacts
          </button>
          <button
            className={showTrails ? "selected" : ""}
            onClick={() => setShowTrails(!showTrails)}
            aria-pressed={showTrails}
          >
            <Waves size={15} /> Trails
          </button>
          <button
            onClick={() => setSpeed(speed === 1 ? 0.35 : 1)}
            aria-label="Toggle slow motion"
          >
            <Eye size={15} /> {speed === 1 ? "Slow" : "Normal"}
          </button>
          <button onClick={reset}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      )}
    </div>
  );
}
