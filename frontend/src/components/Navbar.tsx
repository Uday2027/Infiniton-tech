"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Command,
  Search,
  Home,
  User,
  Layers,
  Mail,
  ArrowUpRight,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home, keywords: "home landing main" },
  { href: "/about", label: "About", icon: User, keywords: "about us team who" },
  {
    href: "/services",
    label: "Services",
    icon: Layers,
    keywords: "services offerings what we do",
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    keywords: "contact get in touch email",
  },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    setIsPastHero(y > vh * 0.4);
    if (y > lastScrollY && y > vh) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(y);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close palette on route change
  useEffect(() => {
    setPaletteOpen(false);
    setQuery("");
  }, [pathname]);

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when palette opens
  useEffect(() => {
    if (paletteOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [paletteOpen]);

  // Filter items by query
  const filtered = navItems.filter(
    (item) =>
      query === "" ||
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const handleNavigate = (href: string) => {
    setPaletteOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {/* ── MINIMAL TOP BAR ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: isHidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <div
            className={`max-w-7xl mx-auto flex items-center justify-between h-12 px-4 rounded-2xl transition-all duration-500 ${
              isPastHero
                ? "bg-white/70 dark:bg-navy-950/70 backdrop-blur-2xl border border-slate-200/50 dark:border-white/[0.06] shadow-lg shadow-black/[0.03] dark:shadow-black/20"
                : "bg-transparent"
            }`}
          >
            {/* Logo — fades in after scrolling past hero */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="flex items-center gap-2 transition-all duration-500 ease-out"
                style={{
                  opacity: isPastHero ? 1 : 0,
                  transform: isPastHero
                    ? "translateY(0)"
                    : "translateY(-8px)",
                  pointerEvents: isPastHero ? "auto" : "none",
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/15 group-hover:shadow-cyan-500/30 transition-shadow">
                  <span className="text-white font-heading font-bold text-base leading-none">
                    ∞
                  </span>
                </div>
                <span className="hidden sm:inline font-heading font-bold text-sm tracking-tight">
                  Infiniton<span className="text-cyan-500">Tech</span>
                </span>
              </div>
            </Link>

            {/* Right side — command trigger + theme */}
            <div className="flex items-center gap-2">
              {/* Command palette trigger */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-colors border border-slate-200/60 dark:border-white/[0.06]"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">Navigate...</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.06] rounded border border-slate-200/80 dark:border-white/[0.06]">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-colors"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ y: -12, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 12, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── COMMAND PALETTE ── */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setPaletteOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d0d24] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 h-14 border-b border-slate-200/60 dark:border-white/[0.06]">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSelectedIdx((i) =>
                        i < filtered.length - 1 ? i + 1 : 0
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSelectedIdx((i) =>
                        i > 0 ? i - 1 : filtered.length - 1
                      );
                    } else if (e.key === "Enter" && filtered[selectedIdx]) {
                      e.preventDefault();
                      handleNavigate(filtered[selectedIdx].href);
                    }
                  }}
                  placeholder="Where do you want to go?"
                  className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                />
                <button
                  onClick={() => setPaletteOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Results */}
              <div className="p-2 max-h-[320px] overflow-y-auto">
                {/* Navigation section */}
                <div className="px-3 py-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Navigation
                  </span>
                </div>
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigate(item.href)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                        pathname === item.href
                          ? "bg-cyan-500/10 dark:bg-cyan-400/10"
                          : idx === selectedIdx
                            ? "bg-slate-100 dark:bg-white/[0.04]"
                            : "hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          pathname === item.href
                            ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-white"
                            : "bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-sm font-medium ${
                            pathname === item.href
                              ? "text-cyan-600 dark:text-cyan-400"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {pathname === item.href && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                      )}
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        ↵
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                    No results found
                  </div>
                )}

                {/* Quick actions */}
                <div className="px-3 py-1.5 mt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Quick Actions
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate("/contact")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 dark:from-cyan-400/10 dark:to-blue-600/10 flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Get in Touch
                  </span>
                </button>
                {mounted && (
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setPaletteOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Moon className="w-4 h-4 text-indigo-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                    </span>
                  </button>
                )}
              </div>

              {/* Footer hints */}
              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-white/[0.06] rounded border border-slate-200/80 dark:border-white/[0.06]">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-white/[0.06] rounded border border-slate-200/80 dark:border-white/[0.06]">
                    ↵
                  </kbd>
                  Open
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-white/[0.06] rounded border border-slate-200/80 dark:border-white/[0.06]">
                    Esc
                  </kbd>
                  Close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
