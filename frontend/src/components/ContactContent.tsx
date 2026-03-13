"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Globe2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactContent() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      setSubmitStatus("success");
      formRef.current.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    "w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-label">Contact</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Let&apos;s Build Something
              <br />
              <span className="text-cyan-500">Infinite</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Ready to digitize your vision? Get in touch and let&apos;s discuss
              your next project.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-black/[0.03] dark:shadow-none">
                <h2 className="text-2xl font-heading font-bold mb-8">
                  Send us a message
                </h2>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        className={inputStyles}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        className={inputStyles}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className={inputStyles}
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className={`${inputStyles} resize-none`}
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-green-600 dark:text-green-400 p-4 rounded-xl bg-green-50 dark:bg-green-500/10"
                    >
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      Message sent successfully! We&apos;ll get back to you
                      soon.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-red-600 dark:text-red-400 p-4 rounded-xl bg-red-50 dark:bg-red-500/10"
                    >
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      Something went wrong. Please try again or email us
                      directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    Contact Information
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Reach out through any of these channels. We typically respond
                    within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "saminul.amin@gmail.com",
                      href: "mailto:saminul.amin@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: "+880 1326 874 247",
                      href: "https://wa.me/8801326874247",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Dhaka, Bangladesh",
                      href: null,
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="font-medium hover:text-cyan-500 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Global operations note */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/[0.05] to-blue-500/[0.05] border border-cyan-500/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe2 className="w-5 h-5 text-cyan-500" />
                    <p className="font-heading font-bold text-sm">
                      Global Operations
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Based in Dhaka, Bangladesh, we serve clients worldwide with
                    our remote-first approach. No matter your timezone,
                    we&apos;re here to collaborate.
                  </p>
                </div>

                {/* Quick response guarantee */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/[0.05] to-emerald-500/[0.05] border border-green-500/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="font-heading font-bold text-sm">
                      Quick Response
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We value your time. Expect a detailed response within 24
                    hours of your inquiry. For urgent projects, reach us
                    directly via WhatsApp.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
