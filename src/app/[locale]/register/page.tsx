import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import RegisterContent from "./RegisterContent";

export const metadata: Metadata = {
  title: "Sign up | Learning",
  description: "Create an account with your email. A verification code will be sent to your inbox.",
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RegisterContent />;
}
