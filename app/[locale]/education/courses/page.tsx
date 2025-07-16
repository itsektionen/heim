import { getOgImageUrl } from "@/lib/og";
import { getI18n } from "@/locales/server";
import { Metadata } from "next";
import { ProgrammeBrowserView } from "./programme-browser-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Education.Courses");
  const description = t("NavBar.Education.Courses.description");

  return {
    title: `${subtitle} – ${title}`,
    description,
    openGraph: {
      images: [getOgImageUrl(title, subtitle)],
    },
    twitter: {
      images: [getOgImageUrl(title, subtitle)],
    },
  };
}

const ProgrammesPage = () => {
  return <ProgrammeBrowserView />;
};

export default ProgrammesPage;
