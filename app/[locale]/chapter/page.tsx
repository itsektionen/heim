import ELink from "@/components/ui/elink";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

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
    <ELink href="https://thskth.se" external>
      {commonT("ths")}
    </ELink>
  );
  const thsMemberLink = (
    <ELink href={t("member.link")} external>
      {commonT("ths")}
    </ELink>
  );
  const kthLink = (
    <ELink href="https://kth.se" external>
      {commonT("kth")}
    </ELink>
  );
  const receptionLink = (
    <ELink href="https://mottagningen.se" external>
      {t("intro.reception")}
    </ELink>
  );
  const songbookLink = (
    <ELink href="https://sangbok.kth.it" external>
      sangbok.kth.it
    </ELink>
  );
  const songlistRepoLink = (
    <ELink href="https://github.com/itsektionen/songlist" external>
      songlist repository
    </ELink>
  );
  const songbookRepoLink = (
    <ELink href="https://github.com/itsektionen/songbook-2.0" external>
      songbook-2.0 repository
    </ELink>
  );
  const educationLink = (
    <ELink href="/education">{t("intro.education-page")}</ELink>
  );
  const committeesLink = (
    <ELink href="/committees">{t("structure.committees-page")}</ELink>
  );
  const trusteesLink = (
    <ELink href="/trustees">{t("structure.trustees-page")}</ELink>
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

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Chapter.About");
  const description = t("NavBar.Chapter.About.description");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: "/chapter",
    image: getOgImageUrl(title, subtitle),
  });
};
