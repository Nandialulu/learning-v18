import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/Features";
import SubjectsSection from "@/components/sections/Subjects";
import CTABlock from "@/components/sections/CTABlock";
import { getSubjectCounts } from "@/lib/content-counts";

const HOME_SUBJECTS = [
  "finance-basics",
  "economics",
  "finance-management",
  "investment-management",
  "bank-management",
  "bank-accounting",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const counts = await getSubjectCounts(locale, HOME_SUBJECTS);
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection counts={counts} />
      <CTABlock />
    </>
  );
}
