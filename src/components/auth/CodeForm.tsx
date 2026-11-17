"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEmailAuth } from "@/lib/auth/useEmailAuth";

export default function CodeForm({
  email,
  nextPath,
  onBack,
}: {
  email: string;
  nextPath: string;
  onBack: () => void;
}) {
  const t = useTranslations("auth");
  const reduced = useReducedMotion();
  const router = useRouter();
  const { verifyCode, sendCode, verifying, sending } = useEmailAuth();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await verifyCode(email, code);
      router.push(nextPath);
    } catch {
      setError(t("error"));
    }
  };

  const handleResend = async () => {
    setError("");
    setResent(false);
    try {
      await sendCode(email);
      setResent(true);
    } catch {
      setError(t("error"));
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {t.rich("codeSent", {
          email: () => (
            <span className="font-semibold text-foreground">{email}</span>
          ),
        })}
      </p>

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-card-foreground">
            {t("codeLabel")}
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder={t("codePlaceholder")}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {resent && <p className="text-sm text-success">{t("codeResent")}</p>}

        <motion.button
          type="submit"
          disabled={verifying || code.trim().length === 0}
          whileHover={reduced ? {} : { scale: 1.02 }}
          whileTap={reduced ? {} : { scale: 0.98 }}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground disabled:opacity-70"
        >
          {verifying ? t("verifying") : t("verifyLogin")}
        </motion.button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={handleResend}
          disabled={sending}
          className="font-medium text-primary hover:underline disabled:opacity-60"
        >
          {sending ? t("sending") : t("resend")}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          {t("changeEmail")}
        </button>
      </div>
    </div>
  );
}
