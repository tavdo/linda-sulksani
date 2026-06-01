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
          scrolled ? "glass-strong py-3" : "bg-transparent py-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.5, duration: 1, ease: luxuryEasing.reveal }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-cinematic text-xl text-champagne tracking-[0.15em] transition-opacity hover:opacity-70"
            aria-label={t("common", "scrollTop")}
          >
            {wedding.couple.initials}
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-editorial text-warm-white/70 transition-all duration-500 hover:text-champagne hover:tracking-[0.35em]"
                >
                  {t("nav", item.key)}
                </button>
              </li>
            ))}
          </ul>

          <motion.div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-warm-white/50 transition-colors hover:text-champagne"
              aria-label={t("common", "toggleTheme")}
            >
              {theme === "dark" ? "☀" : "☾"}
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
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center glass-strong md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-cinematic text-3xl text-warm-white tracking-[0.1em]"
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
