"use client";

import { motion } from "framer-motion";
import type { VenueInfo } from "@/types";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealText } from "@/components/ui/RevealText";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

function VenueCard({
  label,
  venue,
  delay,
}: {
  label: string;
  venue: VenueInfo;
  delay: number;
}) {
  return (
    <GlassCard delay={delay} className="flex h-full flex-col">
      <p className="text-editorial mb-3 text-xs uppercase tracking-[0.35em] text-champagne">
        {label}
      </p>
      <h3 className="text-cinematic mb-4 text-xl leading-snug text-warm-white md:text-2xl">
        {venue.name}
      </h3>
      <p className="mb-6 min-h-[4.5rem] flex-1 text-sm font-light leading-relaxed text-warm-white/55 line-clamp-4">
        {venue.description}
      </p>
      <div className="mt-auto space-y-2 border-t border-champagne/15 pt-5">
        <p className="text-cinematic text-2xl tracking-widest text-champagne">{venue.time}</p>
        <p className="text-sm leading-relaxed text-warm-white/45">
          {venue.address}
          <br />
          {venue.city}
        </p>
      </div>
    </GlassCard>
  );
}

export function EventDetails() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const { ceremony, reception } = wedding.venue;

  return (
    <section id="events" className="section-padding relative overflow-hidden bg-matte-black/30">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1465497426031-b4251a645b41?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div className="mb-16 text-center md:mb-20">
          <RevealText
            text={t("events", "title")}
            as="h2"
            className="text-cinematic mb-4 text-4xl text-warm-white md:text-6xl"
          />
          <motion.p variants={fadeUpVariants} className="text-editorial text-champagne/60">
            {t("events", "subtitle")}
          </motion.p>
        </motion.div>

        <div className="mb-20 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          <VenueCard label={t("events", "ceremony")} venue={ceremony} delay={0} />
          <VenueCard label={t("events", "reception")} venue={reception} delay={0.15} />
        </div>

        <motion.div variants={fadeUpVariants} className="mb-16">
          <h3 className="text-cinematic mb-10 text-center text-2xl text-warm-white">
            {t("events", "schedule")}
          </h3>
          <motion.div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 h-full w-px bg-champagne/20 md:left-1/2 md:-translate-x-1/2" />
            {wedding.schedule.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative mb-8 flex items-start gap-6 pl-12 md:pl-0"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border border-champagne bg-background md:left-1/2 md:-translate-x-1/2" />
                <motion.div className="md:w-1/2 md:pr-12 md:text-right">
                  <p className="text-sm tracking-widest text-champagne">{item.time}</p>
                </motion.div>
                <div className="md:w-1/2 md:pl-12">
                  <h4 className="text-cinematic text-lg text-warm-white">{item.title}</h4>
                  <p className="text-sm text-warm-white/50">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="text-center">
          <p className="text-editorial mb-3 text-champagne/60">{t("events", "dressCode")}</p>
          <p className="font-handwritten text-2xl text-champagne-light md:text-3xl">
            {wedding.dressCode}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="glass mt-16 overflow-hidden rounded-sm"
        >
          <div className="relative flex h-64 items-center justify-center md:h-80">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-matte-black/50" />
            <div className="relative z-10 text-center">
              <p className="text-editorial mb-2 text-champagne">{t("events", "location")}</p>
              <p className="text-cinematic text-2xl text-warm-white">{ceremony.city}</p>
              <p className="mt-2 text-sm text-warm-white/50">{ceremony.name}</p>
              <a
                href={`https://maps.google.com/?q=${ceremony.coordinates.lat},${ceremony.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial mt-6 inline-block border-b border-champagne/40 pb-1 text-champagne transition-colors hover:border-champagne"
              >
                {t("events", "viewMap")}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
