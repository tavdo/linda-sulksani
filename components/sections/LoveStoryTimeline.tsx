"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { WeddingData } from "@/types";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/components/animations/useScrollReveal";
import { staggerContainer } from "@/components/animations/variants";

export function LoveStoryTimeline() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();

  return (
    <section id="story" className="section-padding section-ambient relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 15% 40%, rgba(184,149,149,0.08) 0%, transparent 50%), radial-gradient(ellipse at 85% 70%, rgba(196,165,116,0.05) 0%, transparent 45%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader
          title={t("story", "title")}
          subtitle={t("story", "subtitle")}
          className="mb-20"
        />

        <motion.div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne/30 to-transparent md:block" />

          {wedding.loveStory.map((chapter, index) => (
            <StoryChapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function StoryChapter({
  chapter,
  index,
}: {
  chapter: WeddingData["loveStory"][0];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const textRef = useScrollReveal<HTMLDivElement>({ y: 50, delay: 0.1 });
  const imageRef = useScrollReveal<HTMLDivElement>({ y: 60, delay: 0.2 });

  return (
    <div
      className={`relative mb-24 flex flex-col gap-10 md:mb-32 md:flex-row md:items-center md:gap-16 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Year marker */}
      <motion.div
        className="absolute left-1/2 top-0 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-champagne bg-background md:block"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      <div ref={imageRef} className="relative flex-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover transition-transform duration-[2s] hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/50 via-transparent to-matte-black/10" />
        </div>
        {chapter.accent && (
          <span className="font-handwritten absolute -bottom-3 left-5 text-xl text-accent md:left-auto md:right-5">
            {chapter.accent}
          </span>
        )}
      </div>

      <motion.div ref={textRef} className="relative flex-1 px-2 md:px-8">
        <span className="text-cinematic mb-1 block text-5xl text-accent/25 md:text-7xl">
          {chapter.year}
        </span>
        <h3 className="text-cinematic mb-5 text-3xl text-copy md:text-4xl">
          {chapter.title}
        </h3>
        <p className="max-w-md text-base font-light leading-[1.85] tracking-wide text-copy-soft md:text-lg">
          {chapter.content}
        </p>
      </motion.div>
    </div>
  );
}
