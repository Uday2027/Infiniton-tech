"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "Web Development",
  "AI Agents",
  "Mobile Apps",
  "LLM Integration",
  "Automation",
  "SaaS",
  "Cloud",
  "DevOps",
];

function MarqueeTrack({
  direction,
  variant,
  trackRef,
}: {
  direction: "left" | "right";
  variant: "filled" | "outlined";
  trackRef: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
}) {
  // We render two identical copies side by side; animate one full copy width
  return (
    <div className="overflow-hidden">
      <div ref={trackRef as React.RefObject<HTMLDivElement>} className="flex whitespace-nowrap w-fit">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex whitespace-nowrap">
            {words.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className="inline-flex items-center mx-5 text-5xl sm:text-6xl lg:text-7xl font-heading font-bold"
              >
                {variant === "filled" ? (
                  <span className="text-slate-300 dark:text-slate-500">
                    {word}
                  </span>
                ) : (
                  <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(6,182,212,0.35)]">
                    {word}
                  </span>
                )}
                <span
                  className={`w-3 h-3 rounded-full mx-7 flex-shrink-0 ${
                    variant === "filled"
                      ? "bg-cyan-500"
                      : "border-2 border-cyan-500/40"
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeText() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!marquee || !track1 || !track2) return;

    // Measure the width of one copy (half the track) for seamless loop
    const track1Width = track1.scrollWidth / 2;
    const track2Width = track2.scrollWidth / 2;

    // Track 1: moves left seamlessly
    const tween1 = gsap.to(track1, {
      x: -track1Width,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    // Track 2: starts offset, moves right seamlessly
    gsap.set(track2, { x: -track2Width });
    const tween2 = gsap.to(track2, {
      x: 0,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    // Scroll velocity skew effect
    ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const skew = gsap.utils.clamp(-2, 2, velocity / 600);
        gsap.to(marquee, {
          skewX: skew,
          duration: 0.3,
          ease: "power2.out",
        });
      },
      id: "marquee-skew",
    });

    return () => {
      tween1.kill();
      tween2.kill();
      ScrollTrigger.getById("marquee-skew")?.kill();
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative py-14 overflow-hidden bg-slate-50/80 dark:bg-[#0a0a20] border-y border-slate-200/30 dark:border-white/5"
    >
      <div className="space-y-4">
        <MarqueeTrack direction="left" variant="filled" trackRef={track1Ref} />
        <MarqueeTrack direction="right" variant="outlined" trackRef={track2Ref} />
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0a0a20] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0a0a20] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
