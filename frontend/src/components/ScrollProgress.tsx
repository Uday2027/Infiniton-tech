"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
