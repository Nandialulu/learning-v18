import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Learning",
  description: "Have a question or want a new subject? Send us a message.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
