"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useMutation } from "@apollo/client/react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEmailAuth } from "@/lib/auth/useEmailAuth";
import {
  CLIENT_PORTAL_USER_REGISTER,
  type ClientPortalUserRegisterData,
} from "@/graphql/auth/mutations/register";
import CodeForm from "@/components/auth/CodeForm";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function RegisterContent() {
  const t = useTranslations("auth");
  const reduced = useReducedMotion();
  const { sendCode } = useEmailAuth();
  const [register, { loading: registering }] =
    useMutation<ClientPortalUserRegisterData>(CLIENT_PORTAL_USER_REGISTER);

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [nextPath, setNextPath] = useState("/");

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/")) setNextPath(next);
  }, []);

  const startCodeStep = async (address: string) => {
    try {
      await sendCode(address);
      setStep("code");
    } catch {
      setError(t("error"));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setError(t("invalidEmail"));
      return;
    }
    try {
      await register({
        variables: {
          email: address,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          userType: "customer",
        },
      });
      await startCodeStep(address);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (/exist|already/i.test(message)) {
        await startCodeStep(address);
      } else {
        setError(t("error"));
      }
    }
  };

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[560px]">
        <FadeIn>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {t("registerTitle")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-[440px] text-center text-lg text-muted-foreground">
            {t("registerSubtitle")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            {step === "email" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-card-foreground">
                      {t("lastName")}
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("lastNamePlaceholder")}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-card-foreground">
                      {t("firstName")}
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder={t("firstNamePlaceholder")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

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
                  disabled={registering}
                  whileHover={reduced ? {} : { scale: 1.02 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground disabled:opacity-70"
                >
                  {registering ? t("creating") : t("createAccount")}
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
              {t("hasAccount")}{" "}
              <Link
                href={`/login${nextPath !== "/" ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                className="font-semibold text-primary hover:underline"
              >
                {t("toLogin")}
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
