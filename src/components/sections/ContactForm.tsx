"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ContactForm() {
  const t = useTranslations("contact");
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[640px] rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={t("namePlaceholder")}
            required
            className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            required
            className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-card-foreground">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            required
            className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <motion.button
          type="submit"
          disabled={submitted}
          whileHover={reduced ? {} : { scale: 1.02 }}
          whileTap={reduced ? {} : { scale: 0.98 }}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground disabled:opacity-70"
        >
          {submitted ? "Sent" : t("submit")}
        </motion.button>
      </div>
    </form>
  );
}
