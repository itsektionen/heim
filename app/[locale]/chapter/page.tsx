import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { notFound } from "next/navigation";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  try {
    const Content = (await import(`./${locale}.mdx`)).default;
    return <Content />;
  } catch {
    notFound();
  }
}

export function generateStaticParams() {
  return getStaticParams();
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Chapter.About");
  const description = t("NavBar.Chapter.About.description");

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
};
