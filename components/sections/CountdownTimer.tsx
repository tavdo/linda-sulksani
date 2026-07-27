"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { useCountdown } from "@/hooks/useCountdown";
import { padNumber } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

const units = ["days", "hours", "minutes", "seconds"] as const;

function CountdownUnit({
  unit,
  value,
  label,
  mounted,
}: {
  unit: (typeof units)[number];
  value: number;
  label: string;
  mounted: boolean;
}) {
  const display = mounted
    ? unit === "days"
      ? String(value)
      : padNumber(value)
    : unit === "days"
      ? "0"
      : "00";

  return (
    <div className="glass flex min-w-[4.75rem] flex-col items-center rounded-sm px-4 py-5 md:min-w-[7rem] md:px-6 md:py-7">
      <div className="relative mb-3 h-[2.75rem] overflow-hidden md:h-[3.75rem]">
        {mounted ? (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              className="text-cinematic block text-4xl leading-none text-champagne md:text-5xl lg:text-6xl"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="text-cinematic block text-4xl leading-none text-champagne/25 md:text-5xl lg:text-6xl">
            00
          </span>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-[0.32em] text-warm-white/40 md:text-[11px]">
        {label}
      </p>
    </div>
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
            "radial-gradient(ellipse at center, rgba(196,165,116,0.07) 0%, transparent 60%)",
        }}
      />
      <FloatingParticles count={14} color="rgba(196, 165, 116, 0.18)" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeader
          title={t("countdown", "title")}
          subtitle={t("countdown", "subtitle")}
          className="mb-12 md:mb-14"
        />

        <motion.div
          variants={fadeUpVariants}
          className="mx-auto flex max-w-3xl flex-wrap items-stretch justify-center gap-3 md:gap-4"
        >
          {units.map((unit) => (
            <CountdownUnit
              key={unit}
              unit={unit}
              value={values[unit]}
              label={t("countdown", unit)}
              mounted={mounted}
            />
          ))}
        </motion.div>

        <motion.div variants={fadeUpVariants} className="mx-auto mt-14 max-w-md md:mt-16">
          <div className="ornament mb-6">
            <span className="ornament-diamond" aria-hidden />
          </div>
          <p className="text-cinematic text-lg tracking-[0.1em] text-champagne/85 md:text-xl">
            {wedding.dateFormatted}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
