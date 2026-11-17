"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactContent() {
  const t = useTranslations("contact");

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <FadeIn>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-12">
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
