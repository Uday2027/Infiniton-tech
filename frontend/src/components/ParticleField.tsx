"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile
      ? 30
      : Math.min(70, Math.floor(window.innerWidth / 20));

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const connectionDistance = isMobile ? 100 : 140;
    const mouseDistance = 180;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = resolvedTheme === "dark";
      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(6, 182, 212, ${p.opacity})`
          : `rgba(0, 119, 182, ${p.opacity * 0.7})`;
        ctx.fill();
      });

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${opacity})`
              : `rgba(0, 119, 182, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        const mdx = particles[i].x - mouseRef.current.x;
        const mdy = particles[i].y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseDistance) {
          const opacity = (1 - mDist / mouseDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, ${opacity})`
            : `rgba(0, 119, 182, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
