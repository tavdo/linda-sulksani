"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { luxuryEasing } from "@/components/animations/variants";

export function FinaleSection() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-110"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1.05 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: luxuryEasing.cinematic }}
      >
        <Image
          src={wedding.images.finale}
          alt="რომანტიკული ფინალი"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-matte-black/65 via-matte-black/72 to-matte-black/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(12,11,10,0.55)_100%)]" />
      <div className="film-grain absolute inset-0" />
      <FloatingParticles count={30} color="rgba(255, 220, 180, 0.28)" />

      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-36 w-36 rounded-full bg-champagne/12 blur-[70px]"
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/3 h-44 w-44 rounded-full bg-muted-rose/10 blur-[80px]"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: luxuryEasing.reveal }}
      >
        <div className="ornament mb-10">
          <span className="ornament-diamond" aria-hidden />
        </div>

        <motion.blockquote
          className="text-cinematic mb-10 text-3xl leading-relaxed text-warm-white/90 md:text-5xl md:leading-snug"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          &ldquo;{wedding.quote.text}&rdquo;
        </motion.blockquote>

        <motion.p
          className="text-editorial mb-16 text-champagne/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          — {wedding.quote.author}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1.2 }}
        >
          <p className="font-handwritten mb-4 text-3xl text-champagne-light md:text-4xl">
            {t("finale", "thankYou")}
          </p>
          <p className="text-cinematic text-2xl text-warm-white md:text-4xl">
            {wedding.couple.partner1} & {wedding.couple.partner2}
          </p>
          <div className="ornament my-8">
            <span className="ornament-diamond" aria-hidden />
          </div>
          <p className="text-editorial text-warm-white/40">
            {t("finale", "message")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
