"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import {
  Globe,
  Smartphone,
  Cloud,
  ShoppingCart,
  Brain,
  MessageSquare,
  Bot,
  Zap,
  GitBranch,
  ArrowLeftRight,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const serviceCategories = [
  {
    id: "web",
    label: "Web & Mobile Engineering",
    icon: Globe,
    description:
      "Full-stack web and cross-platform mobile applications built with modern architectures for performance, scalability, and exceptional user experience.",
    services: [
      {
        icon: Globe,
        title: "Custom Web Development",
        description:
          "Full-stack solutions using MERN, Next.js, and Laravel tailored to your business logic. We build responsive, performant, and SEO-optimized web applications that scale.",
      },
      {
        icon: Smartphone,
        title: "Mobile App Development",
        description:
          "Cross-platform applications built with Flutter and React Native that deliver seamless experiences on iOS and Android with native-like performance.",
      },
      {
        icon: Cloud,
        title: "SaaS Development",
        description:
          "Scalable Software-as-a-Service platforms engineered for high performance, security, and multi-tenancy with subscription management and analytics.",
      },
      {
        icon: ShoppingCart,
        title: "E-commerce Solutions",
        description:
          "Robust online stores with custom payment gateway integrations, inventory management, and conversion-optimized checkout flows that drive revenue.",
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Next-Gen Tech",
    icon: Brain,
    description:
      "Harness the power of artificial intelligence to transform your business operations, automate decision-making, and unlock data-driven insights.",
    services: [
      {
        icon: Bot,
        title: "AI Agent Development",
        description:
          "Building autonomous agents that execute complex tasks, handle customer support, manage data analysis, and make decisions without human intervention.",
      },
      {
        icon: Brain,
        title: "LLM Integration",
        description:
          "Integrating Large Language Models like GPT-4, Claude, and Gemini into your existing business applications for smarter data processing and generation.",
      },
      {
        icon: MessageSquare,
        title: "Chatbot Engineering",
        description:
          "Intelligent, context-aware conversational bots for sales and support that understand natural language and provide meaningful, helpful interactions.",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation & Digital Transformation",
    icon: Zap,
    description:
      "Streamline operations, eliminate inefficiencies, and connect your systems with custom automation solutions and robust API integrations.",
    services: [
      {
        icon: Settings,
        title: "Business Process Automation",
        description:
          "Streamlining repetitive tasks using custom scripts, Python, and tools like Zapier and Make to save hundreds of hours and reduce human error.",
      },
      {
        icon: GitBranch,
        title: "Workflow Optimization",
        description:
          "Auditing your current digital infrastructure and implementing tools and processes to save time, reduce overhead, and increase operational efficiency.",
      },
      {
        icon: ArrowLeftRight,
        title: "API Development & Integration",
        description:
          "Connecting disparate software systems with robust, documented APIs to ensure data flows smoothly across your entire organization.",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div
          className="absolute top-20 left-0 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label">Our Services</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              What We <span className="text-cyan-500">Build</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              End-to-end digital product development categorized into three main
              pillars of expertise.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-24 lg:py-32 ${
            catIndex % 2 === 1 ? "bg-slate-50/80 dark:bg-[#0a0a20]" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-16">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <p className="section-label !mb-0">{category.label}</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                {category.label}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </AnimatedSection>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {category.services.map((service, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <GlowCard className="h-full">
                    <div className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
                        <service.icon className="w-6 h-6 text-cyan-500" />
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-blue-500/[0.08] to-violet-500/[0.05]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Let&apos;s discuss how we can bring your vision to life with our
              expertise.
            </p>
            <Link
              href="/consultation"
              className="group inline-flex items-center px-10 py-5 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              Start a Conversation
              <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
