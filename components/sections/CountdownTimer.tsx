"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { useCountdown } from "@/hooks/useCountdown";
import { padNumber } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

const units = ["days", "hours", "minutes", "seconds"] as const;

function CountdownUnit({
  unit,
  value,
  label,
  mounted,
  showDivider,
}: {
  unit: (typeof units)[number];
  value: number;
  label: string;
  mounted: boolean;
  showDivider: boolean;
}) {
  const display = mounted
    ? unit === "days"
      ? String(value)
      : padNumber(value)
    : unit === "days"
      ? "0"
      : "00";

  return (
    <>
      <div className="flex min-w-[4.5rem] flex-col items-center px-4 md:min-w-[6rem] md:px-8">
        <div className="relative mb-2 h-[3.5rem] overflow-hidden md:h-[4.5rem]">
          {mounted ? (
            <AnimatePresence mode="popLayout">
              <motion.span
                key={display}
                className="text-cinematic block text-4xl leading-none text-champagne md:text-6xl"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {display}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="text-cinematic block text-4xl leading-none text-champagne/30 md:text-6xl">
              00
            </span>
          )}
        </div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-warm-white/45 md:text-xs">
          {label}
        </p>
      </div>
      {showDivider && (
        <div
          className="hidden h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-champagne/35 to-transparent md:block"
          aria-hidden
        />
      )}
    </>
  );
}

export function CountdownTimer() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const [mounted, setMounted] = useState(false);
  const timeLeft = useCountdown(wedding.date);

  useEffect(() => {
    setMounted(true);
  }, []);

  const values = {
    days: timeLeft.days,
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
  };

  return (
    <section className="section-padding relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,98,0.05) 0%, transparent 65%)",
        }}
      />
      <FloatingParticles count={16} color="rgba(201, 169, 98, 0.2)" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <RevealText
          text={t("countdown", "title")}
          as="h2"
          className="text-cinematic mb-3 text-4xl text-warm-white md:text-5xl"
        />
        <motion.p
          variants={fadeUpVariants}
          className="text-editorial mb-14 text-sm tracking-[0.2em] text-champagne/55 md:mb-16"
        >
          {t("countdown", "subtitle")}
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center"
        >
          {units.map((unit, i) => (
            <CountdownUnit
              key={unit}
              unit={unit}
              value={values[unit]}
              label={t("countdown", unit)}
              mounted={mounted}
              showDivider={i < units.length - 1}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="mx-auto mt-14 max-w-md md:mt-16"
        >
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
          <p className="text-cinematic text-lg tracking-[0.12em] text-champagne/90 md:text-xl">
            {wedding.dateFormatted}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
