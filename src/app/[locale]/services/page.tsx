"use client";

import CmsIntro from "@/components/cms/CmsIntro";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Layers, Zap, TrendingUp } from "lucide-react";

const ICONS = [Layers, Zap, TrendingUp];
const DOTS = ["bg-primary", "bg-secondary", "bg-accent"];
const KEYS = ["flashcards", "quiz", "progress"];

export default function ServicesPage() {
  const t = useTranslations("features");
  const tp = useTranslations("services");
  const reduced = useReducedMotion();

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <CmsIntro slug="services">
          <FadeIn>
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {tp("pageTitle")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-lg text-muted-foreground">
              {tp("subtitle")}
            </p>
          </FadeIn>

          <div className="mt-16 flex flex-col gap-6">
            {KEYS.map((key, index) => {
              const Icon = ICONS[index];
              return (
                <FadeIn key={key} delay={0.1 + index * 0.1}>
                  <motion.div
                    whileHover={reduced ? {} : { y: -2 }}
                    className="rounded-3xl border border-border bg-card p-8 md:p-10"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${DOTS[index]} text-foreground`}>
                        <Icon size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground md:text-3xl">
                          {t(`${key}Title`)}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                          {t(`${key}Desc`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </CmsIntro>
      </div>
    </div>
  );
}
