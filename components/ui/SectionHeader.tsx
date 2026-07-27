"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { fadeUpVariants } from "@/components/animations/variants";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div className={cn("mb-16 text-center md:mb-20", className)}>
      <div className="ornament mb-8">
        <span className="ornament-diamond" aria-hidden />
      </div>
      <RevealText
        text={title}
        as="h2"
        className={cn(
          "text-cinematic mb-5 text-4xl text-warm-white md:text-6xl",
          titleClassName
        )}
      />
      {subtitle && (
        <motion.p
          variants={fadeUpVariants}
          className="text-editorial text-champagne/55"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
