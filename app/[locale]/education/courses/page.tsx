import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { ProgrammeBrowserView } from "./programme-browser-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Education.Courses");
  const description = t("NavBar.Education.Courses.description");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: "/education/courses",
    image: getOgImageUrl(title, subtitle),
  });
}

const ProgrammesPage = () => {
  return <ProgrammeBrowserView />;
};

export default ProgrammesPage;
