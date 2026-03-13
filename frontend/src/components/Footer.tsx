"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Web Development", href: "/services#web" },
    { label: "AI Solutions", href: "/services#ai" },
    { label: "Automation", href: "/services#automation" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-white/5 bg-slate-50/80 dark:bg-[#030308]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white font-heading font-bold text-xl">
                  ∞
                </span>
              </div>
              <span className="font-heading font-bold text-xl">
                Infiniton<span className="text-cyan-500">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xs leading-relaxed">
              Premier software development and digital solutions firm. Building
              digital ecosystems for the future.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:saminul.amin@gmail.com"
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  saminul.amin@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801326874247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  +880 1326 874 247
                </a>
              </li>
              <li>
                <span className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Infiniton Tech. All rights
            reserved.
          </p>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center text-sm text-slate-500 hover:text-cyan-500 transition-colors"
          >
            Back to top
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
