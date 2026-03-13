"use client";

import AnimatedSection from "./AnimatedSection";
import Counter from "./Counter";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 lg:py-24">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.03] via-blue-500/[0.05] to-violet-500/[0.03]" />
      <div className="absolute inset-0 border-y border-slate-200/50 dark:border-white/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-cyan-500 mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
