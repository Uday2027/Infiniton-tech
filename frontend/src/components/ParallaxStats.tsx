"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!section || !pin || !line1 || !line2) return;

    // Pin the section so users scroll through both words fully
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=150%",
      pin: pin,
      pinSpacing: true,
      id: "parallax-text-pin",
    });

    // Line 1 starts with TECH off-right, scrolls left to reveal full text then continues
    gsap.fromTo(
      line1,
      { xPercent: 15 },
      {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      }
    );

    // Line 2 starts with INFINITON off-left, scrolls right to reveal full text then continues
    gsap.fromTo(
      line2,
      { xPercent: -30 },
      {
        xPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      }
    );

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div
        ref={pinRef}
        className="relative min-h-screen flex flex-col items-center justify-center"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.03] via-blue-500/[0.05] to-violet-500/[0.03]" />

        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Line 1: filled gradient text */}
        <div
          ref={line1Ref}
          className="whitespace-nowrap select-none pointer-events-none mb-2"
        >
          <span className="text-[7rem] sm:text-[10rem] lg:text-[14rem] font-heading font-bold leading-none bg-gradient-to-r from-cyan-400/60 via-blue-500/50 to-violet-500/60 bg-clip-text text-transparent">
            INFINITON TECH
          </span>
        </div>

        {/* Line 2: outlined stroke text */}
        <div
          ref={line2Ref}
          className="whitespace-nowrap select-none pointer-events-none"
        >
          <span className="text-[7rem] sm:text-[10rem] lg:text-[14rem] font-heading font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(6,182,212,0.4)]">
            INFINITON TECH
          </span>
        </div>

        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </section>
  );
}
