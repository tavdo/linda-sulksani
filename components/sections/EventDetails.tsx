"use client";

import { motion } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

export function EventDetails() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const { ceremony, reception } = wedding.venue;

  return (
    <section
      id="events"
      className="section-padding section-ambient relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(196,165,116,0.35), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(184,149,149,0.2), transparent 45%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeader
          title={t("events", "title")}
          subtitle={t("events", "subtitle")}
        />

        {/* Single venue showcase */}
        <GlassCard delay={0} className="relative mb-16 overflow-hidden text-center md:mb-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-champagne/8 blur-[60px]" />
          <p className="text-editorial mb-4 text-champagne/70">
            {t("events", "location")}
          </p>
          <h3 className="text-cinematic mb-3 text-3xl text-warm-white md:text-5xl">
            {ceremony.name}
          </h3>
          <p className="mx-auto mb-8 max-w-lg text-sm font-light leading-relaxed text-warm-white/55 md:text-base">
            {ceremony.description}
          </p>

          <div className="ornament mb-8">
            <span className="ornament-diamond" aria-hidden />
          </div>

          <div className="mx-auto grid max-w-md gap-8 sm:grid-cols-2">
            <div>
              <p className="text-editorial mb-2 text-champagne/50">
                {t("events", "ceremony")}
              </p>
              <p className="text-cinematic text-3xl tracking-widest text-champagne">
                {ceremony.time}
              </p>
            </div>
            <div>
              <p className="text-editorial mb-2 text-champagne/50">
                {t("events", "reception")}
              </p>
              <p className="text-cinematic text-3xl tracking-widest text-champagne">
                {reception.time}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-champagne/12 pt-8">
            <p className="text-sm leading-relaxed tracking-wide text-warm-white/50">
              {ceremony.address}
              <br />
              {ceremony.city}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${ceremony.name}, ${ceremony.address}, ${ceremony.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-editorial mt-6 inline-block border-b border-champagne/35 pb-1 text-champagne transition-colors hover:border-champagne hover:text-champagne-light"
            >
              {t("events", "viewMap")}
            </a>
          </div>
        </GlassCard>

        {/* Schedule */}
        <motion.div variants={fadeUpVariants} className="mb-16">
          <h3 className="text-cinematic mb-12 text-center text-2xl text-warm-white md:text-3xl">
            {t("events", "schedule")}
          </h3>
          <div className="relative mx-auto max-w-xl">
            <div className="absolute left-[0.55rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-champagne/25 to-transparent md:left-1/2 md:-translate-x-1/2" />
            {wedding.schedule.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative mb-10 flex items-start gap-6 pl-10 last:mb-0 md:pl-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-champagne/80 bg-background shadow-[0_0_12px_rgba(196,165,116,0.35)] md:left-1/2 md:-translate-x-1/2" />
                <div
                  className={`w-full md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  <p className="mb-1 text-sm tracking-[0.2em] text-champagne">
                    {item.time}
                  </p>
                  <h4 className="text-cinematic text-xl text-warm-white">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm font-light text-warm-white/45">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="text-center">
          <p className="text-editorial mb-4 text-champagne/55">
            {t("events", "dressCode")}
          </p>
          <p className="font-handwritten mx-auto max-w-lg text-2xl leading-snug text-champagne-light md:text-3xl">
            {wedding.dressCode}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
