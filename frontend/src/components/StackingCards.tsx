"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Shield, Users, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Rocket,
    title: "Remote-Native Agility",
    description:
      "Our structure allows for lower overheads and higher speed, passing value directly to clients. We move fast without breaking things.",
    gradient: "from-cyan-500 to-blue-600",
    accent: "#06b6d4",
    stat: "3x",
    statLabel: "Faster Delivery",
  },
  {
    icon: Shield,
    title: "Future-Proof Code",
    description:
      "We use modern stacks built for scalability and long-term maintenance. Your codebase grows with your ambitions.",
    gradient: "from-blue-500 to-violet-600",
    accent: "#3b82f6",
    stat: "99%",
    statLabel: "Uptime Guarantee",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Transparent, direct access to the dev team to ensure nothing is lost in translation. You are always in the loop.",
    gradient: "from-violet-500 to-pink-600",
    accent: "#8b5cf6",
    stat: "24/7",
    statLabel: "Support Available",
  },
  {
    icon: Layers,
    title: "End-to-End Delivery",
    description:
      "We handle the entire lifecycle, from the first wireframe to final deployment. One team, zero gaps.",
    gradient: "from-pink-500 to-orange-500",
    accent: "#ec4899",
    stat: "150+",
    statLabel: "Projects Shipped",
  },
];

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const sticky = stickyRef.current;
    if (!section || !heading || !sticky) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading.querySelectorAll(".reveal-text"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      const cardElements = cardsRef.current.filter(Boolean);
      const totalCards = cardElements.length;

      // Each card (except the last) scales down and dims only when the NEXT card overlaps it
      cardElements.forEach((card, i) => {
        if (i < totalCards - 1) {
          gsap.to(card.querySelector(".card-body"), {
            scale: 0.95,
            opacity: 0,
            scrollTrigger: {
              trigger: cardElements[i + 1],
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ marginBottom: "4rem" }}
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center pt-24 lg:pt-32 pb-16 px-4">
        <p className="section-label reveal-text">Why Us</p>
        <h2 className="section-title reveal-text">
          Why Partner With Infiniton Tech?
        </h2>
        <p className="section-description mx-auto reveal-text">
          We don&apos;t just deliver projects. We deliver results that
          transform businesses.
        </p>
      </div>

      {/* Sticky card stack area */}
      <div
        ref={stickyRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="sticky"
            style={{ top: `${80 + i * 10}px` }}
          >
            <div
              className="card-body relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a18] will-change-transform origin-top mb-8"
              style={{
                boxShadow: `0 -10px 30px 10px #0a0a18, 0 4px 30px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient}`}
              />

              <div className="p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0`}
                  style={{ boxShadow: `0 8px 30px ${card.accent}25` }}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-2 text-white">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Stat */}
                <div className="flex-shrink-0 sm:text-right">
                  <p
                    className={`text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent leading-none`}
                  >
                    {card.stat}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                    {card.statLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
