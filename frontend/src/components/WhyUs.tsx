"use client";

import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { Rocket, Shield, Users, Layers } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Remote-Native Agility",
    description:
      "Our structure allows for lower overheads and higher speed, passing value directly to clients.",
    gradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: Shield,
    title: "Future-Proof Code",
    description:
      "We use modern stacks built for scalability and long-term maintenance.",
    gradient: "from-blue-500/10 to-violet-500/10",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Transparent, direct access to the dev team to ensure nothing is lost in translation.",
    gradient: "from-violet-500/10 to-pink-500/10",
  },
  {
    icon: Layers,
    title: "End-to-End Delivery",
    description:
      "We handle the entire lifecycle, from the first wireframe to final deployment.",
    gradient: "from-pink-500/10 to-cyan-500/10",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50/80 dark:bg-[#0a0a20]">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label">Why Us</p>
          <h2 className="section-title">
            Why Partner With Infiniton Tech?
          </h2>
          <p className="section-description mx-auto">
            We don&apos;t just deliver projects. We deliver results that
            transform businesses.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className={`flex items-start space-x-6 p-7 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-slate-200/50 dark:border-white/5 backdrop-blur-sm`}
              >
                <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900/80 shadow-sm flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
