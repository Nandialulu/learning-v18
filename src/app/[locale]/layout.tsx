import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import messagesMn from "@/../messages/mn.json";
import messagesEn from "@/../messages/en.json";
import messagesKo from "@/../messages/ko.json";
import messagesJa from "@/../messages/ja.json";

const messagesByLocale: Record<string, any> = {
  mn: messagesMn,
  en: messagesEn,
  ko: messagesKo,
  ja: messagesJa,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://learning.vercel.app"),
  title: "Learning — Study More in Less Time",
  description:
    "Flashcards and quizzes for students. Learn one concept at a time, get instant feedback, and track your progress.",
  openGraph: {
    title: "Learning — Study More in Less Time",
    description:
      "Flashcards and quizzes for students. Learn one concept at a time, get instant feedback, and track your progress.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export function generateStaticParams() {
  return [{ locale: "mn" }, { locale: "en" }, { locale: "ko" }, { locale: "ja" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = messagesByLocale[locale] ?? messagesMn;

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ApolloClientProvider>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer />
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
