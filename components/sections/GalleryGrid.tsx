"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LightboxViewer } from "@/components/sections/LightboxViewer";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

export function GalleryGrid() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding section-ambient relative overflow-hidden">
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeader
          title={t("gallery", "title")}
          subtitle={t("gallery", "subtitle")}
        />

        <div className="masonry-grid">
          {wedding.gallery.map((image, index) => (
            <motion.div
              key={image.id}
              className="masonry-item group relative cursor-pointer overflow-hidden rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              variants={fadeUpVariants}
              transition={{ delay: index * 0.08 }}
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(index)}
              aria-label={`${t("gallery", "view")} ${image.alt}`}
            >
              <motion.div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${image.width}/${image.height}` }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-[1.6s] group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span className="text-editorial border border-champagne/45 bg-matte-black/30 px-6 py-3 text-champagne backdrop-blur-sm">
                    {t("gallery", "view")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {lightboxIndex !== null && (
        <LightboxViewer
          images={wedding.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
