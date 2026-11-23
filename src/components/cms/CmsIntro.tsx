"use client";

import { useLocale } from "next-intl";
import { useCmsPage } from "./CmsProvider";
import { cmsBody } from "@/lib/cms";

export default function CmsIntro({ slug, children, showTitle = true }: {
  slug: string;
  children?: React.ReactNode;
  showTitle?: boolean;
}) {
  const page = useCmsPage(slug);
  const locale = useLocale();
  if (!page) return <>{children}</>;
  const body = cmsBody(page, locale);
  if (!body && !page.name) return <>{children}</>;
  const summary = page.content && page.description && !/<\/?[a-z][\s\S]*>/i.test(page.description)
    ? page.description : null;
  return (
    <div data-cms-page={slug}>
      {showTitle && page.name && (
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">{page.name}</h1>
      )}
      {summary && <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground">{summary}</p>}
      {body && <div className="cms-content mx-auto mt-6 max-w-[800px] text-lg leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: body }} />}
    </div>
  );
}
