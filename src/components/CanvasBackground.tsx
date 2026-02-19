import { useRef, useEffect } from 'react';

/**
 * Renders a subtle canvas of soft gradient orbs for section backgrounds.
 * Adds depth and a premium feel without distracting from content.
 */
export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(w, h);
    };

    const draw = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const t = Date.now() / 12000;
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Soft orbs with very slow movement
      const orbs = [
        { x: cx + Math.cos(t) * w * 0.2, y: cy * 0.6 + Math.sin(t * 0.7) * h * 0.1, r: w * 0.5, color: [58, 110, 255, 0.06] as const },
        { x: cx - Math.sin(t * 0.8) * w * 0.25, y: cy * 1.2 + Math.cos(t * 0.6) * h * 0.08, r: w * 0.45, color: [148, 163, 184, 0.08] as const },
        { x: cx * 0.3 + Math.cos(t * 0.5) * w * 0.15, y: cy * 0.8, r: w * 0.4, color: [58, 110, 255, 0.05] as const },
      ];

      orbs.forEach((orb) => {
        const rad = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.r
        );
        rad.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${orb.color[3]})`);
        rad.addColorStop(0.6, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${orb.color[3] * 0.5})`);
        rad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, w, h);
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const interval = setInterval(() => {
      if (canvas.offsetWidth && canvas.offsetHeight) {
        draw(canvas.offsetWidth, canvas.offsetHeight);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
