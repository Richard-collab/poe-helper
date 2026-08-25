import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  drift: number;
  driftSpd: number;
  alpha: number;
  flicker: number;
}

export function EmbersCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const canvas = cv;
    const context = ctx;

    let W = 0;
    let H = 0;
    let parts: Particle[] = [];
    let rafId = 0;
    const COUNT = 90;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.width = canvas.offsetWidth * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
    }

    function spawn(init: boolean): Particle {
      const dpr = window.devicePixelRatio || 1;
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : H + 10,
        r: (Math.random() * 1.8 + 0.5) * dpr,
        vy: (Math.random() * 0.35 + 0.12) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        drift: Math.random() * Math.PI * 2,
        driftSpd: Math.random() * 0.012 + 0.004,
        alpha: Math.random() * 0.55 + 0.15,
        flicker: Math.random() * Math.PI * 2,
      };
    }

    function tick() {
      const dpr = window.devicePixelRatio || 1;
      context.clearRect(0, 0, W, H);

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.drift += p.driftSpd;
        p.flicker += 0.05;
        p.x += p.vx + Math.sin(p.drift) * 0.3 * dpr;
        p.y -= p.vy;

        if (p.y < -12 || p.x < -12 || p.x > W + 12) {
          parts[i] = spawn(false);
        }

        const a = p.alpha * (0.72 + 0.28 * Math.sin(p.flicker));
        const g = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(252,199,54,${a})`);
        g.addColorStop(0.4, `rgba(244,203,128,${a * 0.45})`);
        g.addColorStop(1, "rgba(244,203,128,0)");
        context.fillStyle = g;
        context.beginPath();
        context.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        context.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    resize();
    for (let i = 0; i < COUNT; i++) parts.push(spawn(true));
    tick();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="embers" className="embers-canvas" />;
}
