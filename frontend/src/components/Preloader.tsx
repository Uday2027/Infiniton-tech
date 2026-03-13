"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const animateOut = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        barRef.current,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(logoRef.current, {
        scale: 12,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        preloaderRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    if (!preloaderRef.current || !logoRef.current) return;

    const tl = gsap.timeline();

    // Initial entrance
    tl.set(preloaderRef.current, {
      clipPath: "circle(150% at 50% 50%)",
    })
      .fromTo(
        logoRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      )
      .fromTo(
        ringRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        barRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

    // Counter animation
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current)
          counterRef.current.textContent = `${Math.floor(counter.value)}%`;
      },
    });

    // Continuous ring spin
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
    });

    // Loading bar progress
    const progressBar =
      barRef.current?.querySelector<HTMLDivElement>(".progress-fill");
    if (progressBar) {
      gsap.fromTo(
        progressBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power2.inOut",
          transformOrigin: "left",
        }
      );
    }

    // Exit after loading
    const timer = setTimeout(animateOut, 1800);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [animateOut]);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-navy-950"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center relative">
        {/* Animated logo */}
        <div className="relative mb-8">
          <div
            ref={logoRef}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
          >
            <span className="text-white font-heading font-bold text-4xl">
              ∞
            </span>
          </div>

          {/* Orbiting ring */}
          <div
            ref={ringRef}
            className="absolute -inset-4 rounded-2xl border-2 border-transparent"
            style={{
              borderTopColor: "rgb(6, 182, 212)",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
              borderRadius: "1.25rem",
            }}
          />
        </div>

        {/* Company name */}
        <p
          ref={textRef}
          className="font-heading font-bold text-xl tracking-tight mb-4"
        >
          Infiniton<span className="text-cyan-500">Tech</span>
        </p>

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-4xl font-heading font-bold text-cyan-500 mb-6 tabular-nums"
        >
          0%
        </span>

        {/* Loading bar */}
        <div
          ref={barRef}
          className="w-56 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
        >
          <div className="progress-fill h-full w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left" />
        </div>
      </div>
    </div>
  );
}
