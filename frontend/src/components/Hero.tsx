"use client";

import { useEffect, useRef } from "react";
import {
  ChevronDown,
  Globe,
  Smartphone,
  Brain,
  Database,
  Zap,
  Code2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const planets = [
  {
    icon: Globe,
    label: "Web Dev",
    accent: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Smartphone,
    label: "Mobile",
    accent: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Brain,
    label: "AI Agents",
    accent: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Database,
    label: "LLM",
    accent: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Zap,
    label: "Automation",
    accent: "#f97316",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: Code2,
    label: "API",
    accent: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const ORBIT_SIZE = 80; // % of container
const ORBIT_DURATION = 60; // seconds for one full rotation

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const solarSystemRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const orbitRingRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const master = gsap.timeline({ delay: 1.6 });

      // 1. Background grid fades in
      if (gridRef.current) {
        gsap.set(gridRef.current, { opacity: 0 });
        master.to(
          gridRef.current,
          { opacity: 1, duration: 1.5, ease: "power1.in" },
          0
        );
      }

      // 2. Center glow pulses in
      if (glowRef.current) {
        gsap.set(glowRef.current, { scale: 0, opacity: 0 });
        master.to(
          glowRef.current,
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          0.1
        );
      }

      // 3. Sun scales in with bounce
      if (sunRef.current) {
        gsap.set(sunRef.current, { scale: 0, opacity: 0 });
        master.to(
          sunRef.current,
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" },
          0.3
        );
      }

      // 4. Orbit ring expands
      if (orbitRingRef.current) {
        gsap.set(orbitRingRef.current, { scale: 0, opacity: 0 });
        master.to(
          orbitRingRef.current,
          { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
          0.5
        );
      }

      // 5. Planets pop in, staggered
      planetsRef.current.forEach((planet, i) => {
        if (!planet) return;
        gsap.set(planet, { opacity: 0, scale: 0 });
        master.to(
          planet,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          0.7 + i * 0.1
        );
      });

      // 6. Scroll indicator fades in last
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 });
        master.to(
          scrollRef.current,
          { opacity: 1, duration: 0.8, ease: "power1.in" },
          1.8
        );
        gsap.to(scrollRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
          delay: 3.6,
        });
      }

      // Scroll parallax: solar system scales away
      if (solarSystemRef.current) {
        gsap.to(solarSystemRef.current, {
          y: -150,
          opacity: 0,
          scale: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Background orbs parallax
      if (orbsRef.current) {
        gsap.to(orbsRef.current, {
          y: 120,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100/50 dark:from-navy-950 dark:via-[#080820] dark:to-navy-950" />

      {/* Ambient background orbs */}
      <div
        ref={orbsRef}
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/[0.07] dark:bg-cyan-500/[0.04] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/[0.07] dark:bg-blue-500/[0.04] rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Center glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      {/* Visually hidden heading for accessibility/SEO */}
      <h1 className="sr-only">
        Infiniton Tech — Web Development, Mobile Apps, AI Agents, LLM
        Integration, Process Automation, API Integration
      </h1>

      {/* ── SOLAR SYSTEM ── */}
      <div
        ref={solarSystemRef}
        className="relative z-10 flex-shrink-0"
        style={{
          width: "min(85vw, 75vh, 700px)",
          height: "min(85vw, 75vh, 700px)",
        }}
        aria-hidden="true"
      >
        {/* ── SUN ── */}
        <div
          ref={sunRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          {/* Outer glow rings */}
          <div className="absolute -inset-5 rounded-full bg-cyan-500/10 blur-xl animate-pulse-slow" />
          <div className="absolute -inset-2 rounded-full bg-cyan-400/15 blur-md" />

          {/* Sun body */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-sun-pulse">
            <span className="text-white font-heading font-bold text-3xl sm:text-4xl md:text-5xl select-none">
              ∞
            </span>
          </div>

          {/* Company name under sun */}
          <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-heading font-bold tracking-tight whitespace-nowrap text-slate-500 dark:text-slate-400">
            Infiniton<span className="text-cyan-500">Tech</span>
          </p>
        </div>

        {/* ── SINGLE ORBIT RING (visible path) ── */}
        <div
          ref={orbitRingRef}
          className="orbit-ring"
          style={{
            width: `${ORBIT_SIZE}%`,
            height: `${ORBIT_SIZE}%`,
          }}
        />

        {/* ── ROTATING WRAPPER (carries all planets) ── */}
        <div
          className="orbit-rotator"
          style={{
            width: `${ORBIT_SIZE}%`,
            height: `${ORBIT_SIZE}%`,
            animationDuration: `${ORBIT_DURATION}s`,
          }}
        >
          {/* 6 planets, evenly spaced at 60° intervals */}
          {planets.map((planet, i) => {
            const angle = (i * 360) / planets.length;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 50 * Math.sin(rad);
            const y = 50 - 50 * Math.cos(rad);

            return (
              <div
                key={planet.label}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  ref={(el) => {
                    planetsRef.current[i] = el;
                  }}
                >
                  <div
                    className="planet-counter-rotate flex flex-col items-center"
                    style={{
                      animationDuration: `${ORBIT_DURATION}s`,
                    }}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${planet.gradient} flex items-center justify-center shadow-lg`}
                      style={{
                        boxShadow: `0 0 20px ${planet.accent}40, 0 4px 12px ${planet.accent}25`,
                      }}
                    >
                      <planet.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="mt-1.5 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {planet.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 dark:text-slate-600"
      >
        <span className="text-xs font-medium mb-2 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
