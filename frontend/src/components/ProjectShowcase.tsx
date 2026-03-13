"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  ShoppingCart,
  HeartPulse,
  Workflow,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MoveHorizontal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI-Powered Analytics Platform",
    category: "AI & Machine Learning",
    description:
      "We built an intelligent analytics dashboard that processes millions of data points in real-time. Using GPT-4 and custom-trained ML models, the platform auto-generates insights, detects anomalies, and predicts trends — turning raw data into strategic decisions for enterprise clients.",
    challenge:
      "The client needed to process 12M+ data points daily while maintaining sub-3s query response times across distributed data sources.",
    result:
      "99.2% prediction accuracy with 2.4s average response time. Reduced manual reporting effort by 90%.",
    tech: ["Next.js", "Python", "GPT-4", "PostgreSQL", "Redis", "Docker"],
    icon: Brain,
    gradient: "from-cyan-500 to-blue-600",
    accent: "#06b6d4",
    year: "2024",
    duration: "6 months",
  },
  {
    title: "E-Commerce Ecosystem",
    category: "Web Development",
    description:
      "A full-scale multi-vendor marketplace handling thousands of daily transactions. Features include real-time inventory sync across 500+ vendors, integrated payment gateways, and an AI-powered recommendation engine that boosted average order value by 35%.",
    challenge:
      "Building a platform that could handle 8K+ daily orders with zero downtime while syncing inventory across hundreds of vendors in real-time.",
    result:
      "99.9% uptime, 500+ active vendors, 35% increase in average order value through AI recommendations.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "GraphQL"],
    icon: ShoppingCart,
    gradient: "from-violet-500 to-purple-600",
    accent: "#8b5cf6",
    year: "2024",
    duration: "8 months",
  },
  {
    title: "Healthcare Mobile App",
    category: "Mobile Development",
    description:
      "A cross-platform telemedicine application connecting patients with healthcare providers through HD video consultations. Includes prescription management, health vitals tracking, appointment scheduling, and HIPAA-compliant medical record storage.",
    challenge:
      "Ensuring HIPAA compliance while delivering a seamless video consultation experience with low latency across varying network conditions.",
    result:
      "120K+ active users, 50K+ successful consultations, 4.9★ app store rating. Reduced patient wait times by 70%.",
    tech: ["Flutter", "Firebase", "WebRTC", "Node.js", "FHIR", "AWS"],
    icon: HeartPulse,
    gradient: "from-emerald-500 to-teal-600",
    accent: "#10b981",
    year: "2023",
    duration: "10 months",
  },
  {
    title: "Workflow Automation Suite",
    category: "Automation",
    description:
      "An enterprise-grade automation platform that eliminated 80% of manual business processes. Connects with 50+ third-party APIs and uses intelligent routing to handle complex multi-step workflows with conditional logic, error recovery, and real-time monitoring.",
    challenge:
      "Integrating 50+ APIs with different auth methods, rate limits, and data formats while ensuring reliable execution of mission-critical workflows.",
    result:
      "$2.1M saved annually, 80% reduction in manual processes, 50+ API integrations with 99.7% execution success rate.",
    tech: ["Python", "FastAPI", "Redis", "Docker", "Kafka", "Terraform"],
    icon: Workflow,
    gradient: "from-orange-500 to-red-600",
    accent: "#f97316",
    year: "2023",
    duration: "5 months",
  },
];

type Project = (typeof projects)[number];

/* ── Render helpers ── */

function LeftPage({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <div className="relative w-full h-full flex flex-col justify-end p-8 sm:p-10 lg:p-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-8 right-8 sm:top-10 sm:right-10 opacity-20">
        <Icon className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-white" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
            {project.year}
          </span>
          <span className="text-xs text-white/70 font-medium">
            {project.duration}
          </span>
        </div>
        <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mt-2 leading-tight">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t, j) => (
            <span
              key={j}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white/15 text-white backdrop-blur-sm border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RightPage({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="relative page-cream p-8 sm:p-10 lg:p-12 flex flex-col justify-between w-full h-full paper-texture">
      <div className="relative z-10 flex-1">
        <div className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            About the Project
          </h4>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            The Challenge
          </h4>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            {project.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            The Result
          </h4>
          <p
            className="text-sm sm:text-base font-medium leading-relaxed"
            style={{ color: project.accent }}
          >
            {project.result}
          </p>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-slate-200/60 dark:border-white/[0.06]">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2">
            Case Study
          </span>
          <div
            className="w-6 h-0.5 rounded-full"
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const rightLeafRef = useRef<HTMLDivElement>(null);
  const leftLeafRef = useRef<HTMLDivElement>(null);
  const foldShadowRef = useRef<HTMLDivElement>(null);
  const mobileLeftRef = useRef<HTMLDivElement>(null);
  const mobileRightRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flipDirection, setFlipDirection] = useState<
    "next" | "prev" | null
  >(null);
  const [showHint, setShowHint] = useState(true);

  const current = projects[activeIdx];
  const target = nextIdx !== null ? projects[nextIdx] : null;
  const t = target || current;

  /* ── Content routing ── */

  // Static pages (behind the leaves, revealed during flip)
  const staticLeftProj =
    flipDirection === "prev" ? t : current;
  const staticRightProj =
    flipDirection === "next" ? t : current;
  const staticRightIdx =
    flipDirection === "next" && nextIdx !== null ? nextIdx : activeIdx;

  // Right leaf (for NEXT flip): front = current right, back = target left
  const rightFrontProj = current;
  const rightFrontIdx = activeIdx;
  const rightBackProj = flipDirection === "next" ? t : current;

  // Left leaf (for PREV flip): front = current left, back = target right
  const leftFrontProj = current;
  const leftBackProj = flipDirection === "prev" ? t : current;
  const leftBackIdx =
    flipDirection === "prev" && nextIdx !== null ? nextIdx : activeIdx;

  /* ── Flip animation ── */

  const flipTo = useCallback(
    (idx: number) => {
      if (isAnimating || idx === activeIdx) return;
      setIsAnimating(true);
      setShowHint(false);

      // Determine direction
      let dir: "next" | "prev";
      if (idx > activeIdx) {
        dir = "next";
      } else if (idx < activeIdx) {
        dir = "prev";
      } else {
        dir = "next";
      }
      // Wrap-around edges
      if (activeIdx === projects.length - 1 && idx === 0) dir = "next";
      if (activeIdx === 0 && idx === projects.length - 1) dir = "prev";

      setFlipDirection(dir);
      setNextIdx(idx);

      const isMobile = window.innerWidth < 1024;

      /* ── Mobile: cross-fade ── */
      if (isMobile) {
        const leftEl = mobileLeftRef.current;
        const rightEl = mobileRightRef.current;
        if (!leftEl || !rightEl) {
          setIsAnimating(false);
          setFlipDirection(null);
          setNextIdx(null);
          return;
        }

        // Kill any in-flight tweens on these elements to prevent stuck state
        gsap.killTweensOf([leftEl, rightEl]);

        // Fade out, swap content, fade in
        gsap.to([leftEl, rightEl], {
          opacity: 0,
          y: dir === "next" ? -20 : 20,
          duration: 0.25,
          ease: "power2.in",
          stagger: 0.03,
          onComplete: () => {
            // Swap content at the invisible midpoint
            setActiveIdx(idx);
            // Wait two frames for React to render the new content
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                gsap.set([leftEl, rightEl], { y: dir === "next" ? 20 : -20 });
                gsap.to([leftEl, rightEl], {
                  opacity: 1,
                  y: 0,
                  duration: 0.35,
                  ease: "power2.out",
                  stagger: 0.05,
                  onComplete: () => {
                    setNextIdx(null);
                    setFlipDirection(null);
                    requestAnimationFrame(() => {
                      setIsAnimating(false);
                    });
                  },
                });
              });
            });
          },
        });
        return;
      }

      /* ── Desktop: 3D page flip ── */
      const foldShadow = foldShadowRef.current;

      const resetAll = () => {
        // Hide the animated leaves BEFORE clearing props so the snap back is invisible.
        // The static pages underneath already show the correct target content.
        if (rightLeafRef.current) {
          rightLeafRef.current.style.visibility = "hidden";
        }
        if (leftLeafRef.current) {
          leftLeafRef.current.style.visibility = "hidden";
        }
        if (foldShadow) {
          foldShadow.style.opacity = "0";
          foldShadow.style.background = "none";
        }

        // Update state — React will re-render with new content
        setActiveIdx(idx);
        setNextIdx(null);
        setFlipDirection(null);

        // After React renders new content, clear GSAP props and reveal the leaves
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (rightLeafRef.current) {
              gsap.set(rightLeafRef.current, { clearProps: "all" });
              rightLeafRef.current.style.zIndex = "5";
              rightLeafRef.current.style.visibility = "visible";
            }
            if (leftLeafRef.current) {
              gsap.set(leftLeafRef.current, { clearProps: "all" });
              leftLeafRef.current.style.zIndex = "5";
              leftLeafRef.current.style.visibility = "visible";
            }
            setIsAnimating(false);
          });
        });
      };

      if (dir === "next") {
        /* FORWARD: right leaf flips left (rotateY 0 → -180) */
        const leaf = rightLeafRef.current;
        if (!leaf) { resetAll(); return; }

        gsap.set(leaf, { clearProps: "all" });
        leaf.style.zIndex = "15";
        if (foldShadow) foldShadow.style.opacity = "0";

        const proxy = { p: 0 };
        gsap.timeline({ onComplete: resetAll }).to(proxy, {
          p: 1,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            const p = proxy.p;
            const sinP = Math.sin(p * Math.PI);
            const angle = -180 * p;
            leaf.style.transform = `rotateY(${angle}deg)`;

            // Fold shadow sweeping from right → spine
            if (foldShadow) {
              const sPos = 50 + (1 - p) * 50;
              foldShadow.style.opacity = sinP > 0.02 ? "1" : "0";
              foldShadow.style.background = `linear-gradient(90deg, transparent ${sPos - 10}%, rgba(0,0,0,${sinP * 0.25}) ${sPos}%, transparent ${sPos + 4}%)`;
            }
          },
        });
      } else {
        /* BACKWARD: left leaf flips right (rotateY 0 → 180) */
        const leaf = leftLeafRef.current;
        if (!leaf) { resetAll(); return; }

        gsap.set(leaf, { clearProps: "all" });
        leaf.style.zIndex = "15";
        if (foldShadow) foldShadow.style.opacity = "0";

        const proxy = { p: 0 };
        gsap.timeline({ onComplete: resetAll }).to(proxy, {
          p: 1,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            const p = proxy.p;
            const sinP = Math.sin(p * Math.PI);
            const angle = 180 * p;

            leaf.style.transform = `rotateY(${angle}deg)`;

            // Fold shadow sweeping from left → spine
            if (foldShadow) {
              const sPos = p * 50;
              foldShadow.style.opacity = sinP > 0.02 ? "1" : "0";
              foldShadow.style.background = `linear-gradient(90deg, transparent ${sPos - 4}%, rgba(0,0,0,${sinP * 0.25}) ${sPos}%, transparent ${sPos + 10}%)`;
            }
          },
        });
      }
    },
    [activeIdx, isAnimating]
  );

  const goNext = useCallback(() => {
    flipTo((activeIdx + 1) % projects.length);
  }, [activeIdx, flipTo]);

  const goPrev = useCallback(() => {
    flipTo((activeIdx - 1 + projects.length) % projects.length);
  }, [activeIdx, flipTo]);

  // Touch swipe support for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only trigger if horizontal swipe is dominant and long enough
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  // Scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading.querySelectorAll(".reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      if (bookRef.current) {
        gsap.fromTo(
          bookRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bookRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-[#0a0a20]" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 lg:mb-18">
          <p className="section-label reveal">Our Work</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold reveal">
            Featured <span className="text-cyan-500">Projects</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-5 max-w-2xl mx-auto reveal">
            Real solutions we&apos;ve built for real businesses
          </p>
        </div>

        {/* ══ THE BOOK ══ */}
        <div ref={bookRef} className="max-w-6xl mx-auto">
          {/* Book table shadow */}
          <div className="absolute -inset-6 bg-black/[0.06] dark:bg-black/30 rounded-[2rem] blur-3xl pointer-events-none" />

          {/* Hardcover frame */}
          <div className="relative book-cover rounded-xl p-[6px] lg:p-2">
            {/* Cover inner edge */}
            <div className="absolute inset-[5px] lg:inset-[7px] rounded-lg border border-white/[0.06] pointer-events-none z-40" />

            {/* ═══ DESKTOP LAYOUT ═══ */}
            <div className="hidden lg:block relative rounded-lg">
              {/* Perspective wrapper — direct parent of 3D content */}
              <div style={{ perspective: "2000px", perspectiveOrigin: "50% 50%" }}>
                <div
                  className="relative book-3d"
                  style={{ minHeight: "560px" }}
                >
                  {/* ── Static left page (behind left leaf) ── */}
                  <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden rounded-l-lg z-0">
                    <LeftPage project={staticLeftProj} />
                    <div className="absolute top-0 right-0 w-8 h-full gutter-shadow-left pointer-events-none" />
                  </div>

                  {/* ── Static right page (behind right leaf) ── */}
                  <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-r-lg z-0">
                    <RightPage
                      project={staticRightProj}
                      index={staticRightIdx}
                    />
                    <div className="absolute top-0 left-0 w-8 h-full gutter-shadow-right pointer-events-none" />
                  </div>

                  {/* ── Fold shadow (sweeps across during flip) ── */}
                  <div
                    ref={foldShadowRef}
                    className="absolute inset-0 z-[4] pointer-events-none rounded-lg"
                    style={{ opacity: 0 }}
                  />

                  {/* ── LEFT LEAF (for backward/prev flip) ── */}
                  <div
                    ref={leftLeafRef}
                    className="absolute top-0 left-0 w-1/2 h-full book-leaf-left cursor-pointer"
                    style={{ zIndex: 5 }}
                    onClick={goPrev}
                  >
                    {/* Front: current left page */}
                    <div className="absolute inset-0 book-page-face overflow-hidden rounded-l-lg">
                      <LeftPage project={leftFrontProj} />
                      <div className="absolute top-0 right-0 w-8 h-full gutter-shadow-left pointer-events-none z-10" />
                    </div>
                    {/* Back: target right page (revealed after flipping right) */}
                    <div className="absolute inset-0 book-page-back overflow-hidden rounded-r-lg">
                      <RightPage
                        project={leftBackProj}
                        index={leftBackIdx}
                      />
                      <div className="absolute top-0 left-0 w-8 h-full gutter-shadow-right pointer-events-none z-10" />
                    </div>
                  </div>

                  {/* ── RIGHT LEAF (for forward/next flip) ── */}
                  <div
                    ref={rightLeafRef}
                    className="absolute top-0 right-0 w-1/2 h-full book-leaf-right cursor-pointer"
                    style={{ zIndex: 5 }}
                    onClick={goNext}
                  >
                    {/* Front: current right page */}
                    <div className="absolute inset-0 book-page-face overflow-hidden rounded-r-lg">
                      <RightPage
                        project={rightFrontProj}
                        index={rightFrontIdx}
                      />
                      <div className="absolute top-0 left-0 w-8 h-full gutter-shadow-right pointer-events-none z-10" />

                      {/* Corner fold hint */}
                      {showHint && (
                        <div
                          className="absolute bottom-0 right-0 w-9 h-9 pointer-events-none z-20"
                          style={{
                            background:
                              "linear-gradient(315deg, #cbd5e1 0%, #cbd5e1 42%, transparent 50%)",
                            borderTopLeftRadius: "4px",
                          }}
                        />
                      )}
                    </div>
                    {/* Back: target left page (revealed after flipping left) */}
                    <div className="absolute inset-0 book-page-back overflow-hidden rounded-l-lg">
                      <LeftPage project={rightBackProj} />
                      <div className="absolute top-0 right-0 w-8 h-full gutter-shadow-left pointer-events-none z-10" />
                    </div>
                  </div>

                  {/* ── SPINE ── */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 z-[20] pointer-events-none">
                    <div className="w-full h-full book-spine" />
                    <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 flex flex-col justify-between items-center">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-[3px] h-[3px] rounded-full bg-white/[0.08]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── PAGE EDGES (right side) ── */}
                  <div className="absolute top-2 bottom-2 -right-[10px] w-[10px] z-0 pointer-events-none rounded-r-sm overflow-hidden page-edges" />
                  <div
                    className="absolute top-2 bottom-2 -right-[10px] w-[10px] z-[1] pointer-events-none rounded-r-sm"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Visual hints: Left, Right, and Bottom (desktop only) */}
              {showHint && (
                <>
                  {/* Left edge hint */}
                  <div className="absolute top-1/2 -left-14 -translate-y-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg shadow-black/10 dark:shadow-black/30 border border-slate-200/60 dark:border-white/10 flip-hint-fade">
                    <ChevronLeft className="w-3.5 h-3.5 text-cyan-500 shrink-0 flip-hint-bob-left" />
                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      Prev
                    </span>
                  </div>

                  {/* Right edge hint */}
                  <div className="absolute top-1/2 -right-14 -translate-y-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg shadow-black/10 dark:shadow-black/30 border border-slate-200/60 dark:border-white/10 flip-hint-fade">
                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      Next
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 flip-hint-bob" />
                  </div>

                  {/* Bottom hint badge */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg shadow-black/10 dark:shadow-black/30 border border-slate-200/60 dark:border-white/10 flip-hint-fade">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      Click on a page to flip
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 flip-hint-bob" />
                  </div>
                </>
              )}
            </div>

            {/* ═══ MOBILE LAYOUT ═══ */}
            <div
              className="lg:hidden relative rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={mobileLeftRef}
                className="relative min-h-[380px] overflow-hidden rounded-t-lg"
              >
                <LeftPage project={current} />
              </div>
              <div className="h-px bg-slate-200 dark:bg-white/[0.06]" />
              <div
                ref={mobileRightRef}
                className="relative min-h-[380px] overflow-hidden rounded-b-lg"
              >
                <RightPage project={current} index={activeIdx} />
              </div>

              {/* Mobile swipe hints — top and bottom */}
              {showHint && (
                <>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg shadow-black/10 dark:shadow-black/30 border border-slate-200/60 dark:border-white/10 animate-pulse">
                    <MoveHorizontal className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      Swipe to explore projects
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg shadow-black/10 dark:shadow-black/30 border border-slate-200/60 dark:border-white/10 animate-pulse">
                    <MoveHorizontal className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      Swipe to explore projects
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── NAVIGATION ── */}
          <div className="relative z-10 flex items-center justify-between mt-8 lg:mt-14">
            <button
              onClick={goPrev}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-white/[0.04] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.06] transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            <div className="flex items-center gap-2.5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => flipTo(i)}
                  disabled={isAnimating}
                  className="group relative p-1.5"
                  aria-label={`Go to project ${i + 1}`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        i === activeIdx ? current.accent : undefined,
                      transform:
                        i === activeIdx ? "scale(1.3)" : "scale(1)",
                      boxShadow:
                        i === activeIdx
                          ? `0 0 8px ${current.accent}60`
                          : "none",
                    }}
                  >
                    {i !== activeIdx && (
                      <div className="w-full h-full rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500 transition-colors" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-white/[0.04] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.06] transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
