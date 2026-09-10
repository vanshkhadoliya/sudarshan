import { useEffect, useRef } from "react";

// Ocean depth colour keyframes: sunlit surface -> Mariana Trench
const STOPS = [
  { p: 0.0, top: [171, 206, 226], bot: [141, 187, 213] },
  { p: 0.14, top: [110, 165, 203], bot: [74, 130, 178] },
  { p: 0.32, top: [74, 128, 178], bot: [44, 94, 148] },
  { p: 0.5, top: [40, 82, 132], bot: [20, 50, 92] },
  { p: 0.66, top: [17, 40, 74], bot: [9, 24, 48] },
  { p: 0.82, top: [9, 21, 40], bot: [4, 11, 23] },
  { p: 1.0, top: [3, 8, 16], bot: [1, 4, 10] },
];

const lerp = (a, b, t) => a + (b - a) * t;

function colorAt(p) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p);
      return {
        top: a.top.map((v, j) => Math.round(lerp(v, b.top[j], t))),
        bot: a.bot.map((v, j) => Math.round(lerp(v, b.bot[j], t))),
      };
    }
  }
  const last = STOPS[STOPS.length - 1];
  return { top: last.top, bot: last.bot };
}

export default function OceanBackground() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const blades = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      h: 130 + Math.random() * 260,
      w: 9 + Math.random() * 15,
      phase: Math.random() * Math.PI * 2,
      lean: (Math.random() - 0.5) * 1.1,
    }));
    const fish = Array.from({ length: 22 }, () => ({
      x: Math.random(),
      y: 0.08 + Math.random() * 0.6,
      s: 3 + Math.random() * 5,
      v: 0.006 + Math.random() * 0.014,
      phase: Math.random() * Math.PI * 2,
    }));
    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.7,
      phase: Math.random() * Math.PI * 2,
    }));

    const t0 = performance.now();

    const draw = (now) => {
      const t = (now - t0) / 1000;
      const p = scrollRef.current;
      const { top, bot } = colorAt(p);

      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, `rgb(${top[0]},${top[1]},${top[2]})`);
      g.addColorStop(1, `rgb(${bot[0]},${bot[1]},${bot[2]})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // sunlight rays
      const light = Math.max(0, 1 - p * 1.65);
      if (light > 0.01) {
        for (let i = 0; i < 7; i++) {
          const bx = ((i + 0.5) / 7) * w + Math.sin(t * 0.12 + i * 1.7) * 40;
          const rayW = 70 + (i % 3) * 60;
          const grad = ctx.createLinearGradient(0, 0, 0, h);
          grad.addColorStop(0, `rgba(255,255,255,${0.13 * light})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(bx - rayW / 2, -10);
          ctx.lineTo(bx + rayW / 2, -10);
          ctx.lineTo(bx + rayW / 2 - 170, h);
          ctx.lineTo(bx - rayW / 2 - 170, h);
          ctx.closePath();
          ctx.fill();
        }
      }

      // glowing teal orb near the surface
      const orbA = Math.max(0, 1 - p * 1.5);
      if (orbA > 0.02) {
        const ox = w * 0.74;
        const oy = h * 0.46 + Math.sin(t * 0.5) * 10;
        const orad = 150;
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, orad);
        og.addColorStop(0, `rgba(45,212,191,${0.5 * orbA})`);
        og.addColorStop(0.45, `rgba(45,212,191,${0.16 * orbA})`);
        og.addColorStop(1, "rgba(45,212,191,0)");
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(ox, oy, orad, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(94,234,212,${0.85 * orbA})`;
        ctx.beginPath();
        ctx.arc(ox, oy, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      // drifting submarine silhouette
      const subX = ((t * 16) % (w + 520)) - 260;
      const subY = h * 0.55 + Math.sin(t * 0.4) * 10;
      const subA = 0.28 + 0.2 * Math.max(0, 1 - p * 1.4);
      ctx.save();
      ctx.translate(subX, subY);
      ctx.fillStyle = `rgba(7,22,42,${subA})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, 92, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-22, -38, 32, 18);
      ctx.beginPath();
      ctx.ellipse(-6, -38, 16, 6, 0, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-90, 0);
      ctx.lineTo(-122, -16);
      ctx.lineTo(-122, 16);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-14, -54, 4, 16);
      ctx.fillRect(-14, -54, 14, 4);
      ctx.restore();

      // fish silhouettes near the sunlit zones
      const fishA = Math.max(0, 0.55 - p * 0.55);
      if (fishA > 0.02) {
        ctx.fillStyle = `rgba(225,242,250,${fishA})`;
        for (const f of fish) {
          const fx = ((((f.x - t * f.v) % 1) + 1) % 1) * w;
          const fy = f.y * h + Math.sin(t * 0.9 + f.phase) * 7;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx - f.s * 2.1, fy - f.s);
          ctx.lineTo(fx - f.s * 2.1, fy + f.s);
          ctx.closePath();
          ctx.fill();
        }
      }

      // plankton / bioluminescence (grows with depth)
      for (const d of dots) {
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + d.phase);
        const a = Math.min(0.75, (0.1 + p * 0.55) * tw);
        if (a < 0.03) continue;
        ctx.fillStyle = `rgba(94,234,212,${a})`;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // swaying seaweed along the seabed
      for (const b of blades) {
        const bx = b.x * w;
        const sway = Math.sin(t * 0.8 + b.phase) * 22;
        const sr = Math.round(bot[0] * 0.22);
        const sg = Math.round(bot[1] * 0.38);
        const sb = Math.round(bot[2] * 0.44);
        ctx.strokeStyle = `rgba(${sr},${sg},${sb},0.85)`;
        ctx.lineWidth = b.w;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(bx, h + 12);
        ctx.quadraticCurveTo(bx + b.lean * 60, h - b.h * 0.55, bx + b.lean * 110 + sway, h - b.h);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />;
}
