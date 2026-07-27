"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { luxuryEasing } from "@/components/animations/variants";

export function WaxSealIntro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();

  const handleBreak = () => {
    if (isOpen || isBreaking) return;
    setIsBreaking(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsBreaking(false);
    }, 1200);
  };

  return (
    <section
      id="wax-seal"
      className="section-padding relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Ambient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(201,169,98,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="seal"
              className="flex flex-col items-center"
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-editorial mb-12 text-accent/75">
                {t("waxSeal", "instruction")}
              </p>

              {/* Wax seal */}
              <motion.button
                onClick={handleBreak}
                className="group relative cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={t("common", "breakSeal")}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute -inset-8 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,169,98,0.3) 0%, transparent 70%)",
                  }}
                />

                {/* Seal body */}
                <motion.div
                  className="relative flex h-44 w-44 items-center justify-center md:h-52 md:w-52"
                  animate={
                    isBreaking
                      ? {
                          scale: [1, 1.1, 0],
                          rotate: [0, 5, -5, 0],
                          filter: ["blur(0px)", "blur(2px)", "blur(20px)"],
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, ease: luxuryEasing.cinematic }}
                >
                  {/* Wax texture */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 30%, #8b2020 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 60%, #6b1515 0%, transparent 40%),
                        radial-gradient(circle, #7a1a1a 0%, #4a0f0f 60%, #2a0808 100%)
                      `,
                      boxShadow: `
                        inset 0 2px 20px rgba(255,200,200,0.15),
                        inset 0 -4px 20px rgba(0,0,0,0.4),
                        0 8px 32px rgba(0,0,0,0.5),
                        0 0 60px rgba(139,32,32,0.2)
                      `,
                    }}
                  />

                  {/* Wax edge irregularity */}
                  <motion.div
                    className="absolute inset-[-4px] rounded-full border-2 border-red-900/30"
                    style={{ borderRadius: "48% 52% 51% 49% / 52% 48% 52% 48%" }}
                  />

                  {/* Initials emboss */}
                  <span
                    className="relative z-10 text-cinematic text-3xl text-red-200/80 md:text-4xl"
                    style={{
                      textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 -1px 1px rgba(255,255,255,0.1)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {wedding.couple.initials}
                  </span>

                  {/* Ribbon underneath */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 h-16 w-3 -translate-x-1/2 bg-gradient-to-b from-champagne/60 to-champagne/20"
                    style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}
                    animate={isBreaking ? { opacity: 0, y: 20 } : {}}
                  />
                </motion.div>

                {/* Crack lines on break */}
                {isBreaking && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-px w-20 origin-left bg-red-300/40"
                        style={{ rotate: `${i * 60}deg` }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                      />
                    ))}
                  </>
                )}
              </motion.button>

              <motion.p
                className="text-editorial mt-12 text-copy-muted"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {t("waxSeal", "tap")}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              className="flex max-w-2xl flex-col items-center"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: luxuryEasing.reveal }}
            >
              <p className="text-editorial mb-6 text-accent">{t("waxSeal", "revealed")}</p>
              <h2 className="text-cinematic mb-6 text-4xl text-copy md:text-6xl">
                {t("waxSeal", "invitedTitle")}
              </h2>
              <div className="ornament mb-10">
                <span className="ornament-diamond" aria-hidden />
              </div>
              <motion.div className="glass relative overflow-hidden rounded-sm p-10 md:p-14">
                <div className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-champagne/10 blur-[50px]" />
                <p className="font-handwritten mb-6 text-2xl text-accent-soft md:text-3xl">
                  {t("waxSeal", "dearGuest")}
                </p>
                <p className="mb-8 text-base font-light leading-[1.9] tracking-wide text-copy-soft md:text-lg">
                  {t("waxSeal", "invitationBody")
                    .replace("{partner1}", wedding.couple.partner1)
                    .replace("{partner2}", wedding.couple.partner2)
                    .replace("{date}", wedding.dateFormatted)
                    .replace("{venue}", wedding.venue.ceremony.name)}
                </p>
                <div className="ornament mb-6">
                  <span className="ornament-diamond" aria-hidden />
                </div>
                <p className="text-sm tracking-[0.2em] text-accent/70">
                  {wedding.venue.ceremony.address}
                  <br />
                  {wedding.venue.ceremony.city}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
