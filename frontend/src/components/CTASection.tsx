"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-blue-500/[0.08] to-violet-500/[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Ready to digitize
            <br />
            your vision?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s build something infinite. Partner with us and transform
            your ideas into powerful digital realities.
          </p>
          <Link
            href="/consultation"
            className="group relative inline-flex items-center px-10 py-5 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-1"
          >
            Let&apos;s Talk
            <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
