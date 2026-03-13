"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";
import { Globe, Brain, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Web & Mobile Engineering",
    description:
      "Full-stack web and cross-platform mobile applications built with modern architectures for performance and scalability.",
    items: [
      "Custom Web Development",
      "Mobile App Development",
      "SaaS Platforms",
      "E-commerce Solutions",
    ],
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
  },
  {
    icon: Brain,
    title: "AI & Next-Gen Tech",
    description:
      "Harness the power of artificial intelligence with autonomous agents, LLM integrations, and intelligent chatbots.",
    items: [
      "AI Agent Development",
      "LLM Integration",
      "Chatbot Engineering",
      "Smart Data Processing",
    ],
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Automation & Digital Transformation",
    description:
      "Streamline operations and eliminate inefficiencies with custom automation solutions and API integrations.",
    items: [
      "Process Automation",
      "Workflow Optimization",
      "API Development",
      "System Integration",
    ],
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function ServicesOverview() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">End-to-End Digital Solutions</h2>
          <p className="section-description mx-auto">
            Three pillars of expertise that cover every aspect of your digital
            transformation journey.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlowCard className="h-full">
                <div className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}
                  >
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium transition-colors group"
          >
            View all services
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
