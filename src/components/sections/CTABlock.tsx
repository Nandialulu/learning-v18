"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CTABlock() {
  const t = useTranslations("cta");
  const reduced = useReducedMotion();

  return (
    <section className="w-full px-6 py-20 lg:px-[60px] lg:py-24">
      <FadeIn>
        <div className="mx-auto max-w-[1000px] rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-lg opacity-90">
            {t("subtitle")}
          </p>
          <motion.div
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="mt-8 inline-block"
          >
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-primary shadow-md"
            >
              {t("button")}
            </Link>
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}
