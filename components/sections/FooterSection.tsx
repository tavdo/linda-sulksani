"use client";

import { motion } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

export function FooterSection() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const currentYear = new Date().getFullYear();

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${wedding.couple.partner1} & ${wedding.couple.partner2}`,
        text: t("footer", "shareText"),
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <footer className="relative border-t border-champagne/10 bg-matte-black py-16 text-warm-white">
      <motion.div
        className="mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={fadeUpVariants}
          className="mb-12 flex flex-col items-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/20">
            <span className="text-cinematic text-lg text-champagne tracking-[0.1em]">
              {wedding.couple.initials}
            </span>
          </div>

          <nav className="mb-8 flex flex-wrap justify-center gap-8">
            {["story", "events", "gallery", "rsvp"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-editorial text-warm-white/40 transition-all duration-500 hover:text-champagne hover:tracking-[0.35em]"
                whileHover={{ y: -2 }}
              >
                {t("nav", item)}
              </motion.a>
            ))}
          </nav>

          <motion.div className="mb-8 flex gap-6">
            {wedding.social.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                className="text-sm tracking-widest text-warm-white/30 transition-colors hover:text-champagne"
                whileHover={{ y: -2 }}
                aria-label={link.label}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            onClick={handleShare}
            className="text-editorial border-b border-champagne/30 pb-1 text-champagne/60 transition-colors hover:border-champagne hover:text-champagne"
            whileHover={{ y: -1 }}
          >
            {t("footer", "share")}
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col items-center gap-4 border-t border-champagne/5 pt-8"
        >
          <motion.div
            className="h-px w-24 bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <p className="text-xs tracking-[0.3em] text-warm-white/25">
            © {currentYear} · {t("footer", "copyright")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
