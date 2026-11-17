import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Log in | Learning",
  description: "Log in with your email. A verification code will be sent to your inbox.",
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LoginContent />;
}
