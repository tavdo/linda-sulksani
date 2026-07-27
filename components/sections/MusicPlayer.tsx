"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 1 }}
      >
        <div className="glass flex items-center gap-4 rounded-full px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Vinyl-inspired disc */}
          <motion.button
            onClick={togglePlay}
            className="relative flex h-10 w-10 items-center justify-center"
            aria-label={isPlaying ? t("common", "pauseMusic") : t("common", "playMusic")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              style={{
                background:
                  "radial-gradient(circle, #1a1816 30%, #2a2826 31%, #1a1816 32%, #2a2826 50%, #1a1816 51%)",
              }}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 4,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            />
            <span className="relative z-10 text-[8px] text-accent">
              {isPlaying ? "❚❚" : "▶"}
            </span>
          </motion.button>

          {/* Track info */}
          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
              {wedding.music.title}
            </p>
            <p className="text-[9px] text-copy-muted">{wedding.music.artist}</p>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-0.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full bg-accent/60"
                animate={
                  isPlaying
                    ? {
                        height: [4, 12 + (i % 3) * 4, 4],
                      }
                    : { height: 4 }
                }
                transition={{
                  duration: 0.8 + i * 0.1,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Mute */}
          <motion.button
            onClick={toggleMute}
            className={cn(
              "text-sm transition-colors",
              isMuted ? "text-copy-muted" : "text-accent/80 hover:text-accent"
            )}
            aria-label={isMuted ? t("common", "unmute") : t("common", "mute")}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
