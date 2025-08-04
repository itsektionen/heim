import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("ChapterPage");
  const commonT = await getScopedI18n("Common");
  const thsLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://thskth.se"
      target="_blank"
      rel="noopener">
      {commonT("ths")}
    </Link>
  );
  const thsMemberLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href={t("member.link")}
      target="_blank"
      rel="noopener">
      {commonT("ths")}
    </Link>
  );
  const kthLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://kth.se"
      target="_blank"
      rel="noopener">
      {commonT("kth")}
    </Link>
  );
  const receptionLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://mottagningen.se"
      target="_blank"
      rel="noopener">
      {t("intro.reception")}
    </Link>
  );
  const songbookLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://sangbok.kth.it"
      target="_blank"
      rel="noopener">
      sangbok.kth.it
    </Link>
  );
  const songlistRepoLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://github.com/itsektionen/songlist"
      target="_blank"
      rel="noopener">
      songlist repository
    </Link>
  );
  const songbookRepoLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="https://github.com/itsektionen/songbook-2.0"
      target="_blank"
      rel="noopener">
      songbook-2.0 repository
    </Link>
  );
  const educationLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="/education">
      {t("intro.education-page")}
    </Link>
  );
  const committeesLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="/committees">
      {t("structure.committees-page")}
    </Link>
  );
  const trusteesLink = (
    <Link
      className="text-primary hover:underline underline-offset-4"
      href="/trustees">
      {t("structure.trustees-page")}
    </Link>
  );

  return (
    <>
      <Hero>
        <HeroContent className="text-white p-6 sm:p-4">
          <HeroTitle className="mb-4">{t("title")}</HeroTitle>
        </HeroContent>
        <HeroImage
          className="brightness-70"
          src="/assets/img/bouleplan.png"
          alt={t("hero-image-alt")}
        />
      </Hero>
      <article className="max-w-prose mx-auto [&>section>p]:text-muted-foreground">
        <section className="mb-12">
          <p className="mb-3">{t("intro.content.0", { thsLink, kthLink })}</p>
          <p className="mb-3">{t("intro.content.1")}</p>
          <p className="mb-3">{t("intro.content.2")}</p>
          <p className="mb-3">{t("intro.content.3", { receptionLink })}</p>
          <p className="mb-3">{t("intro.content.4", { educationLink })}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("structure.title")}</h3>
          <p className="mb-3">
            {t("structure.content.0", { committeesLink, trusteesLink })}
          </p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("meetings.title")}</h3>
          <p className="mb-3">{t("meetings.content.0")}</p>
          <p className="mb-3">{t("meetings.content.1")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("member.title")}</h3>
          <p className="mb-3">{t("member.content.0", { thsMemberLink })}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("kistan.title")}</h3>
          <p className="mb-3">{t("kistan.content.0")}</p>
          <p className="mb-3">{t("kistan.content.1")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("ovve.title")}</h3>
          <p className="mb-3">{t("ovve.content.0")}</p>
          <p className="mb-3 italic">{t("ovve.content.1")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("songbook.title")}</h3>
          <p className="mb-3">{t("songbook.content.0", { songbookLink })}</p>
          <p className="mb-3 italic">
            {t("songbook.content.1", { songlistRepoLink, songbookRepoLink })}
          </p>
        </section>
      </article>
    </>
  );
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
