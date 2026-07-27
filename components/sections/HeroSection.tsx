"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { RevealText } from "@/components/ui/RevealText";
import { luxuryEasing } from "@/components/animations/variants";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    gsap.to(bg, {
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const scrollToStory = () => {
    document.querySelector("#wax-seal")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
    >
      <motion.div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        initial={{ scale: 1.22, filter: "blur(10px)" }}
        animate={{ scale: 1.08, filter: "blur(0px)" }}
        transition={{ duration: 2.8, ease: luxuryEasing.cinematic, delay: 3.2 }}
      >
        <Image
          src={wedding.images.hero}
          alt="ლინდა და სულხანის ქორწილის ატმოსფერო"
          fill
          priority
          className="object-cover object-[center_22%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-matte-black/75 via-matte-black/45 to-matte-black/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 3 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,11,10,0.55)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.2 }}
      />
      <motion.div
        className="film-grain absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      />

      <div className="animate-light-leak pointer-events-none absolute -left-1/4 top-1/4 h-[28rem] w-[28rem] rounded-full bg-champagne/12 blur-[110px]" />
      <motion.div
        className="pointer-events-none absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-muted-rose/10 blur-[90px]"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingParticles count={22} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          className="text-editorial mb-6 text-champagne/75"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1.1, ease: luxuryEasing.reveal }}
        >
          {t("hero", "subtitle")}
        </motion.p>

        <RevealText
          text={`${wedding.couple.partner1} & ${wedding.couple.partner2}`}
          as="h1"
          className="text-cinematic mb-8 text-5xl leading-[1.05] text-warm-white sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          delay={4}
          splitBy="char"
        />

        <motion.div
          className="ornament mb-8"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 4.6, duration: 1 }}
        >
          <span className="ornament-diamond" aria-hidden />
        </motion.div>

        <motion.p
          className="font-handwritten mb-3 text-2xl text-champagne-light md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.9, duration: 1.4 }}
        >
          {wedding.dateFormatted}
        </motion.p>

        <motion.p
          className="mx-auto mb-12 max-w-sm text-sm font-light tracking-[0.22em] text-warm-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2, duration: 1 }}
        >
          {wedding.couple.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1, ease: luxuryEasing.reveal }}
        >
          <AnimatedButton onClick={scrollToStory} variant="secondary">
            {t("hero", "cta")}
          </AnimatedButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
      >
        <span className="text-editorial text-warm-white/35">{t("hero", "scroll")}</span>
        <div className="animate-scroll-pulse h-14 w-px bg-gradient-to-b from-champagne/55 to-transparent" />
      </motion.div>
    </section>
  );
}
