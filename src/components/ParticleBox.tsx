import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  history?: "LR" | "RL";
  showControls?: boolean;
  className?: string;
};
type Dot = { x: number; y: number; vx: number; vy: number; r: number };
const seeded = (n: number) => {
  let s = n;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
};

export function ParticleBox({
  history = "LR",
  showControls = false,
  className = "",
}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(true);
  const [contacts, setContacts] = useState(false);
  const dots = useRef<Dot[]>([]);
  useEffect(() => {
    const random = seeded(history === "LR" ? 120 : 210);
    dots.current = Array.from({ length: 72 }, () => ({
      x: random(),
      y: random(),
      vx: (random() - 0.5) * 0.0017,
      vy: (random() - 0.5) * 0.0017,
      r: 0.012 + random() * 0.004,
    }));
  }, [history]);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const draw = () => {
      const rect = c.getBoundingClientRect(),
        dpr = Math.min(devicePixelRatio, 2);
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const w = rect.width,
        h = rect.height;
      ctx.fillStyle = "#080d11";
      ctx.fillRect(0, 0, w, h);
      const grad = ctx.createRadialGradient(
        history === "LR" ? w * 0.22 : w * 0.78,
        h * 0.5,
        0,
        history === "LR" ? w * 0.22 : w * 0.78,
        h * 0.5,
        w * 0.38,
      );
      grad.addColorStop(
        0,
        history === "LR" ? "rgba(38,202,218,.20)" : "rgba(246,171,56,.20)",
      );
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      const ds = dots.current;
      if (playing)
        ds.forEach((p) => {
          p.vx += (Math.random() - 0.5) * 0.0002;
          p.vy += (Math.random() - 0.5) * 0.0002;
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.x = (p.x + p.vx + 1) % 1;
          p.y = (p.y + p.vy + 1) % 1;
        });
      if (contacts) {
        ctx.strokeStyle = "rgba(156,199,204,.18)";
        ctx.lineWidth = 1;
        for (let i = 0; i < ds.length; i++)
          for (let j = i + 1; j < ds.length; j++) {
            const dx = ds[i].x - ds[j].x,
              dy = ds[i].y - ds[j].y;
            if (dx * dx + dy * dy < 0.012) {
              ctx.beginPath();
              ctx.moveTo(ds[i].x * w, ds[i].y * h);
              ctx.lineTo(ds[j].x * w, ds[j].y * h);
              ctx.stroke();
            }
          }
      }
      ds.forEach((p, i) => {
        ctx.beginPath();
        ctx.fillStyle =
          i % 7 === 0 ? (history === "LR" ? "#73e2ec" : "#ffc362") : "#e8eadf";
        ctx.arc(p.x * w, p.y * h, p.r * w, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [contacts, history, playing]);
  return (
    <div className={`particle-box ${className}`}>
      <canvas
        ref={canvas}
        aria-label={`Interactive reconstruction: ${history === "LR" ? "Left then Right" : "Right then Left"} particle world`}
      />
      <div className="particle-caption">
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
        <div className="canvas-controls">
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause motion" : "Play motion"}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className={contacts ? "selected" : ""}
            onClick={() => setContacts(!contacts)}
          >
            Contacts
          </button>
          <button onClick={() => setPlaying(false)}>
            <RotateCcw size={15} /> Freeze
          </button>
        </div>
      )}
    </div>
  );
}
