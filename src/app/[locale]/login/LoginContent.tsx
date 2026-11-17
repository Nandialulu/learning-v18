"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEmailAuth } from "@/lib/auth/useEmailAuth";
import CodeForm from "@/components/auth/CodeForm";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function LoginContent() {
  const t = useTranslations("auth");
  const reduced = useReducedMotion();
  const { sendCode, sending } = useEmailAuth();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [nextPath, setNextPath] = useState("/");

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/")) setNextPath(next);
  }, []);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email.trim())) {
      setError(t("invalidEmail"));
      return;
    }
    try {
      await sendCode(email.trim());
      setStep("code");
    } catch {
      setError(t("error"));
    }
  };

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[560px]">
        <FadeIn>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {t("loginTitle")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-[440px] text-center text-lg text-muted-foreground">
            {t("loginSubtitle")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            {step === "email" ? (
              <form onSubmit={handleSend} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                    {t("emailLabel")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={reduced ? {} : { scale: 1.02 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground disabled:opacity-70"
                >
                  {sending ? t("sending") : t("sendCode")}
                </motion.button>
              </form>
            ) : (
              <CodeForm
                email={email.trim()}
                nextPath={nextPath}
                onBack={() => {
                  setStep("email");
                  setError("");
                }}
              />
            )}

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("noAccount")}{" "}
              <Link
                href={`/register${nextPath !== "/" ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                className="font-semibold text-primary hover:underline"
              >
                {t("toRegister")}
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
