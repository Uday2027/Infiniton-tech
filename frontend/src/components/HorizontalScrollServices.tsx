"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Brain,
  Zap,
  Code2,
  Smartphone,
  Database,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description:
      "Full-stack solutions (MERN, Next.js, Laravel) tailored to your business logic. Blazing fast, SEO optimized.",
    gradient: "from-cyan-500 to-blue-600",
    accent: "#06b6d4",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform applications (Flutter/React Native) that offer seamless experiences on iOS and Android.",
    gradient: "from-blue-500 to-indigo-600",
    accent: "#3b82f6",
  },
  {
    icon: Brain,
    title: "AI Agent Development",
    description:
      "Building autonomous agents that execute complex tasks, handle customer support, or manage data analysis.",
    gradient: "from-violet-500 to-purple-600",
    accent: "#8b5cf6",
  },
  {
    icon: Database,
    title: "LLM Integration",
    description:
      "Integrating Large Language Models (GPT-4, Claude, Gemini) into your existing business applications.",
    gradient: "from-pink-500 to-rose-600",
    accent: "#ec4899",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description:
      "Streamlining repetitive tasks using custom scripts, Python, or tools like Zapier/Make for maximum efficiency.",
    gradient: "from-orange-500 to-amber-600",
    accent: "#f97316",
  },
  {
    icon: Code2,
    title: "API & Integration",
    description:
      "Connecting disparate software systems to ensure data flows smoothly across your entire organization.",
    gradient: "from-emerald-500 to-teal-600",
    accent: "#10b981",
  },
];

export default function HorizontalScrollServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    if (!section || !track || !heading) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading.querySelectorAll(".reveal-text"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Calculate scroll distance
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Horizontal scroll
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Animate each card as it enters
      const cards = track.querySelectorAll<HTMLElement>(".service-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.88, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 55%",
              scrub: 1,
            },
          }
        );

        // Inner elements stagger
        const els = card.querySelectorAll(".s-icon, .s-title, .s-desc, .s-bottom");
        gsap.fromTo(
          els,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 75%",
              end: "left 45%",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* Section heading */}
        <div ref={headingRef} className="px-8 sm:px-16 mb-8 pt-16 flex-shrink-0">
          <p className="section-label reveal-text">What We Do</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold reveal-text">
            Our <span className="text-cyan-500">Services</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-md reveal-text">
            Scroll to explore our full range of digital solutions.
          </p>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={trackRef}
          className="flex flex-1 items-center gap-6 sm:gap-8 px-8 sm:px-16 pb-8 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw]"
            >
              <div className="group relative min-h-[360px] sm:min-h-[400px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-white/[0.15]">
                {/* Accent glow on hover */}
                <div
                  className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none"
                  style={{ backgroundColor: service.accent }}
                />

                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} opacity-60`}
                />

                {/* Card content */}
                <div className="relative h-full flex flex-col justify-between p-6 sm:p-9">
                  <div>
                    {/* Number + Icon row */}
                    <div className="flex items-start justify-between mb-6 sm:mb-8">
                      <div
                        className={`s-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 12px 40px ${service.accent}25` }}
                      >
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-6xl font-heading font-bold text-white/[0.04] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="s-title text-xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 text-white leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="s-desc text-sm sm:text-lg text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="s-bottom flex items-center justify-between pt-6 border-t border-white/[0.06]">
                    <span className="text-sm text-slate-500 font-mono">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(services.length).padStart(2, "0")}
                    </span>
                    <div
                      className="flex items-center gap-2 text-sm font-medium transition-all duration-500 group-hover:gap-3"
                      style={{ color: service.accent }}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer so last card is fully visible */}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
      </div>
    </section>
  );
}
