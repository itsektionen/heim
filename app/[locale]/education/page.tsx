import { Button } from "@/components/ui/button";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("EducationPage");
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle className="mb-4">{t("title")}</HeroTitle>
        </HeroContent>
        <HeroImage
          className="brightness-50"
          src="/assets/img/electrum-lab.png"
          alt={t("hero-image-alt")}
        />
      </Hero>
      <section className="max-w-prose mx-auto [&>p]:text-muted-foreground">
        <p className="mb-12">{t("intro")}</p>
        <h3 className="text-2xl font-medium mb-2">
          {t("program.CINTE.title")}
        </h3>
        <p className="mb-3">{t("program.CINTE.content.0")}</p>
        <p className="mb-3">{t("program.CINTE.content.1")}</p>
        <p className="mb-3">{t("program.CINTE.content.2")}</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/courses?p=CINTE">{t("browse-courses")}</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/CINTE?l=en"
              target="_blank"
              rel="noopener">
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-2xl font-medium mb-2 mt-12">
          {t("program.TIDAB.title")}
        </h3>
        <p className="mb-3">{t("program.TIDAB.content.0")}</p>
        <p className="mb-3">{t("program.TIDAB.content.1")}</p>
        <p className="mb-3">{t("program.TIDAB.content.2")}</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/courses?p=TIDAB">{t("browse-courses")}</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/TIDAB?l=en"
              target="_blank"
              rel="noopener">
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-2xl font-medium mb-2 mt-12">
          {t("program.TCOMK.title")}
        </h3>
        <p className="mb-3">{t("program.TCOMK.content.0")}</p>
        <p className="mb-3">{t("program.TCOMK.content.1")}</p>
        <p className="mb-3">{t("program.TCOMK.content.2")}</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/education/courses?p=TCOMK">{t("browse-courses")}</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://www.kth.se/student/kurser/program/TCOMK?l=en"
              target="_blank"
              rel="noopener">
              kth.se <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Education");
  const description = t("NavBar.Education.Programmes.description");

  return {
    title: `${subtitle} – ${title}`,
    description: description,
    openGraph: {
      images: [getOgImageUrl(title, subtitle)],
    },
    twitter: {
      images: [getOgImageUrl(title, subtitle)],
    },
  };
}
