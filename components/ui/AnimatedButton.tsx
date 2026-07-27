"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { luxuryEasing } from "@/components/animations/variants";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = "primary",
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary:
      "bg-champagne/90 text-matte-black border border-champagne/35 shadow-[0_0_40px_rgba(196,165,116,0.18)]",
    secondary:
      "bg-transparent text-warm-white border border-champagne/45 hover:bg-champagne/10 hover:border-champagne/70",
    ghost: "bg-transparent text-accent border-none",
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden px-9 py-4 text-editorial tracking-[0.28em] transition-colors duration-700",
        "rounded-sm font-sans text-xs uppercase",
        variants[variant],
        className
      )}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 55px rgba(196, 165, 116, 0.28)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: luxuryEasing.smooth }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-light/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: luxuryEasing.smooth }}
      />
    </motion.button>
  );
}
