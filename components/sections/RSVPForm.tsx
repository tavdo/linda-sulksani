"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, luxuryEasing } from "@/components/animations/variants";
import type { RSVPFormData } from "@/types";

const initialForm: RSVPFormData = {
  name: "",
  email: "",
  guestCount: 1,
  attending: "yes",
  dietaryPreferences: "",
  message: "",
};

export function RSVPForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<RSVPFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = t("rsvp", "errorRequired");
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = t("rsvp", "errorEmail");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setSubmitted(true);
  };

  const updateField = <K extends keyof RSVPFormData>(key: K, value: RSVPFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url(/uploads/couple-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
        }}
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,165,116,0.08), transparent 55%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeader
          title={t("rsvp", "title")}
          subtitle={t("rsvp", "subtitle")}
          className="mb-12"
          titleClassName="md:text-5xl"
        />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass-strong space-y-8 rounded-sm p-8 md:p-12"
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6 }}
            >
              <FloatingInput
                label={t("rsvp", "name")}
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
                required
              />
              <FloatingInput
                label={t("rsvp", "email")}
                type="email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
                required
              />

              <div>
                <label className="text-editorial mb-4 block text-champagne/60">
                  {t("rsvp", "attending")}
                </label>
                <motion.div className="flex flex-wrap gap-3">
                  {(["yes", "no", "maybe"] as const).map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => updateField("attending", option)}
                      className={`px-5 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                        form.attending === option
                          ? "border border-champagne bg-champagne/10 text-champagne"
                          : "border border-warm-white/10 text-warm-white/50 hover:border-champagne/30"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("rsvp", option)}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <div>
                <label className="text-editorial mb-4 block text-champagne/60">
                  {t("rsvp", "guests")}
                </label>
                <div className="flex items-center gap-6">
                  <motion.button
                    type="button"
                    onClick={() => updateField("guestCount", Math.max(1, form.guestCount - 1))}
                    className="flex h-10 w-10 items-center justify-center border border-champagne/30 text-champagne transition-colors hover:bg-champagne/10"
                    whileTap={{ scale: 0.9 }}
                  >
                    −
                  </motion.button>
                  <span className="text-cinematic text-3xl text-warm-white">{form.guestCount}</span>
                  <motion.button
                    type="button"
                    onClick={() => updateField("guestCount", Math.min(6, form.guestCount + 1))}
                    className="flex h-10 w-10 items-center justify-center border border-champagne/30 text-champagne transition-colors hover:bg-champagne/10"
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <FloatingInput
                label={t("rsvp", "dietary")}
                value={form.dietaryPreferences}
                onChange={(v) => updateField("dietaryPreferences", v)}
              />

              <FloatingTextarea
                label={t("rsvp", "message")}
                value={form.message}
                onChange={(v) => updateField("message", v)}
              />

              <AnimatedButton type="submit" className="w-full" disabled={saving}>
                {saving ? "..." : t("rsvp", "submit")}
              </AnimatedButton>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass-strong flex flex-col items-center rounded-sm p-12 text-center"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: luxuryEasing.reveal }}
            >
              <motion.div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-champagne"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <span className="text-2xl text-champagne">✓</span>
              </motion.div>
              <h3 className="text-cinematic mb-3 text-3xl text-warm-white">
                {t("rsvp", "success")}
              </h3>
              <p className="text-sm tracking-wide text-warm-white/60">
                {t("rsvp", "successMessage")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        className={`pointer-events-none absolute left-0 transition-all duration-500 ${
          active
            ? "-top-6 text-xs tracking-[0.2em] text-champagne"
            : "top-3 text-sm text-warm-white/40"
        }`}
        animate={{ y: active ? 0 : 0 }}
      >
        {label}
        {required && <span className="text-muted-rose"> *</span>}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border-b bg-transparent py-3 text-warm-white outline-none transition-colors duration-500 ${
          error ? "border-muted-rose" : "border-warm-white/20 focus:border-champagne"
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-xs text-muted-rose"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <motion.div className="relative">
      <label
        className={`pointer-events-none absolute left-0 transition-all duration-500 ${
          active
            ? "-top-6 text-xs tracking-[0.2em] text-champagne"
            : "top-3 text-sm text-warm-white/40"
        }`}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className="w-full resize-none border-b border-warm-white/20 bg-transparent py-3 text-warm-white outline-none transition-colors duration-500 focus:border-champagne"
      />
    </motion.div>
  );
}
