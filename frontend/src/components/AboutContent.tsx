"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Target,
  Globe2,
  Users,
  Lightbulb,
  Shield,
  Heart,
  Code2,
  Sparkles,
} from "lucide-react";

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div
          className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label">About Us</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              We Build Digital
              <br />
              <span className="text-cyan-500">Ecosystems</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              A premier software development and digital solutions firm rooted
              in Bangladesh, serving a global clientele.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-label">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                A Collective of Elite Developers, Designers &amp; AI Specialists
              </h2>
              <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Infiniton Tech is a{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    remote-first organization
                  </strong>{" "}
                  comprising a collective of elite developers, creative
                  designers, and AI specialists.
                </p>
                <p>
                  We do not just write code; we build{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    digital ecosystems
                  </strong>
                  . In an era where efficiency is the currency of business,
                  Infiniton Tech bridges the gap between complex problems and
                  elegant, automated solutions.
                </p>
                <p>
                  Whether you are a startup looking for an MVP or an enterprise
                  seeking to integrate AI agents into your workflow, we are your{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    strategic technology partner
                  </strong>
                  .
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Globe2,
                    label: "Global Operations",
                    value: "12+ Countries",
                  },
                  {
                    icon: Users,
                    label: "Remote-First Team",
                    value: "Elite Talent",
                  },
                  {
                    icon: Target,
                    label: "Client Success",
                    value: "99% Satisfaction",
                  },
                  {
                    icon: Lightbulb,
                    label: "Innovation First",
                    value: "Cutting-Edge",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5"
                  >
                    <item.icon className="w-8 h-8 text-cyan-500 mb-3" />
                    <p className="font-heading font-bold text-lg mb-1">
                      {item.value}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32 bg-slate-50/80 dark:bg-[#0a0a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <p className="section-label">Our Mission</p>
            <h2 className="section-title">
              Empowering Businesses with Limitless Digital Capabilities
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              To empower businesses with{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                limitless digital capabilities
              </strong>{" "}
              by democratizing access to high-end software development,
              intelligent automation, and cutting-edge artificial intelligence.
              We believe every business, regardless of size, deserves access to
              world-class technology solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label">Our Values</p>
            <h2 className="section-title">What Drives Us</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "We constantly push boundaries, exploring new technologies and methodologies to deliver cutting-edge solutions.",
              },
              {
                icon: Shield,
                title: "Quality",
                description:
                  "Every line of code is crafted with precision. We build for performance, security, and scalability.",
              },
              {
                icon: Heart,
                title: "Partnership",
                description:
                  "We don't just build for you — we build with you. Your success is our success.",
              },
              {
                icon: Code2,
                title: "Transparency",
                description:
                  "Direct access to the dev team, clear communication, and honest timelines throughout every project.",
              },
            ].map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="text-center p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 h-full"
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Approach */}
      <section className="py-24 lg:py-32 bg-slate-50/80 dark:bg-[#0a0a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-label">Our Approach</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                Modern Tech, Infinite Possibilities
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                We leverage the latest frameworks and tools to build solutions
                that are not just functional today, but ready for tomorrow. Our
                tech-agnostic approach means we always choose the right tool for
                your specific needs.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Next.js",
                  "React Native",
                  "Flutter",
                  "Node.js",
                  "Python",
                  "Laravel",
                  "GPT-4 / Claude",
                  "MongoDB",
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />
                    {tech}
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/[0.05] to-blue-500/[0.05] border border-cyan-500/10">
                  <div className="space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Discover",
                        desc: "We deeply understand your business goals and technical requirements.",
                      },
                      {
                        step: "02",
                        title: "Design",
                        desc: "Wireframes, prototypes, and architecture planning tailored to your vision.",
                      },
                      {
                        step: "03",
                        title: "Develop",
                        desc: "Agile development with regular updates and transparent communication.",
                      },
                      {
                        step: "04",
                        title: "Deploy",
                        desc: "Rigorous testing, seamless deployment, and ongoing support.",
                      },
                    ].map((phase, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4"
                      >
                        <span className="text-2xl font-heading font-bold text-cyan-500/50">
                          {phase.step}
                        </span>
                        <div>
                          <h4 className="font-heading font-bold mb-1">
                            {phase.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {phase.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
