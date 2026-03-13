"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const text = children;
    container.innerHTML = "";

    const words = text.split(" ");
    const innerSpans: HTMLElement[] = [];

    words.forEach((word, wordIdx) => {
      // Outer span clips the overflow
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";

      // Inner span slides up
      const inner = document.createElement("span");
      inner.textContent = word;
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(110%)";
      innerSpans.push(inner);

      outer.appendChild(inner);
      container.appendChild(outer);

      if (wordIdx < words.length - 1) {
        const space = document.createTextNode("\u00A0");
        container.appendChild(space);
      }
    });

    gsap.to(innerSpans, {
      y: "0%",
      duration: 0.9,
      stagger: 0.06,
      ease: "power3.out",
      delay,
    });

    return () => {
      gsap.killTweensOf(innerSpans);
    };
  }, [children, delay]);

  return (
    <div ref={containerRef} className={className} aria-label={children}>
      {/* Children text shown before JS hydration for SEO */}
      {children}
    </div>
  );
}
