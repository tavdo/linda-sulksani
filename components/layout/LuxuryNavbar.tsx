"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useWeddingData } from "@/hooks/useWeddingData";
import { luxuryEasing } from "@/components/animations/variants";

const navItems = [
  { key: "story", href: "#story" },
  { key: "events", href: "#events" },
  { key: "gallery", href: "#gallery" },
  { key: "rsvp", href: "#rsvp" },
];

export function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: wedding } = useWeddingData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "glass-strong border-b border-champagne/10 py-3.5"
            : "bg-transparent py-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.5, duration: 1, ease: luxuryEasing.reveal }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-cinematic text-xl tracking-[0.18em] text-champagne transition-opacity hover:opacity-70"
            aria-label={t("common", "scrollTop")}
          >
            {wedding.couple.initials}
          </button>

          <ul className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-editorial group relative text-warm-white/65 transition-colors duration-500 hover:text-champagne"
                >
                  {t("nav", item.key)}
                  <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-champagne/70 transition-all duration-500 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="text-warm-white/45 transition-colors hover:text-champagne"
              aria-label={t("common", "toggleTheme")}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
                </svg>
              )}
            </button>
            <button
              className="flex flex-col gap-1.5 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("common", "toggleMenu")}
            >
              <span
                className={cn(
                  "block h-px w-6 bg-champagne transition-all duration-500",
                  menuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-champagne transition-all duration-500",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-champagne transition-all duration-500",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="glass-strong fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ul className="flex flex-col items-center gap-9">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-cinematic text-3xl tracking-[0.08em] text-warm-white"
                  >
                    {t("nav", item.key)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
