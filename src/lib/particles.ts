interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  size: number;
  opacity: number;
}

interface MouseTarget {
  x: number;
  y: number;
}

const PARTICLE_COUNT = 120;
const MOBILE_PARTICLE_COUNT = 60;
const MOUSE_FORCE = 0.0003;
const DAMPING = 0.96;
const MAX_SPEED = 0.6;
const MAX_DT = 50;

export function createParticleSystem(
  canvas: HTMLCanvasElement,
  isMobile: boolean = false
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Cannot get 2d context");

  const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
  const particles: Particle[] = [];
  let mouseTarget: MouseTarget | null = null;
  let animId: number | null = null;
  let lastTime: number | null = null;

  // Initialize particles
  function init() {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const isCool = Math.random() > 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        hue: isCool
          ? 200 + Math.random() * 20 // cool blue
          : 35 + Math.random() * 10, // warm gold
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }
  }

  function update(dt: number) {
    const clampedDt = Math.min(dt, MAX_DT);

    for (const p of particles) {
      // Brownian motion
      p.vx += (Math.random() - 0.5) * 0.02;
      p.vy += (Math.random() - 0.5) * 0.02;

      // Mouse attraction
      if (mouseTarget) {
        const dx = mouseTarget.x - p.x;
        const dy = mouseTarget.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
          p.vx += (dx / dist) * MOUSE_FORCE * clampedDt;
          p.vy += (dy / dist) * MOUSE_FORCE * clampedDt;
        }
      }

      // Damping
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      // Speed clamp
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > MAX_SPEED) {
        p.vx = (p.vx / speed) * MAX_SPEED;
        p.vy = (p.vy / speed) * MAX_SPEED;
      }

      // Move
      p.x += p.vx * clampedDt;
      p.y += p.vy * clampedDt;

      // Edge wrapping
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
      ctx.fill();
    }
  }

  function loop(time: number) {
    if (lastTime !== null) {
      const dt = time - lastTime;
      update(dt);
      draw();
    }
    lastTime = time;
    animId = requestAnimationFrame(loop);
  }

  function start() {
    init();
    lastTime = null;
    animId = requestAnimationFrame(loop);
  }

  function stop() {
    if (animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function setMouseTarget(target: MouseTarget | null) {
    mouseTarget = target;
  }

  return { start, stop, setMouseTarget };
}
