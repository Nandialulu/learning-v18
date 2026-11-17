import { setRequestLocale } from "next-intl/server";
import PortfolioSubjects from "@/components/sections/PortfolioSubjects";
import { getSubjectCounts } from "@/lib/content-counts";

const PORTFOLIO_SUBJECTS = [
  "finance-basics",
  "economics",
  "finance-management",
  "investment-management",
  "corporate-finance",
  "bank-management",
  "bank-accounting",
];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const counts = await getSubjectCounts(locale, PORTFOLIO_SUBJECTS);
  return <PortfolioSubjects counts={counts} />;
}
