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
    <EnhancedLink href="https://thskth.se" external>
      {commonT("ths")}
    </EnhancedLink>
  );
  const thsMemberLink = (
    <EnhancedLink href={t("member.link")} external>
      {commonT("ths")}
    </EnhancedLink>
  );
  const kthLink = (
    <EnhancedLink href="https://kth.se" external>
      {commonT("kth")}
    </EnhancedLink>
  );
  const receptionLink = (
    <EnhancedLink href="https://mottagningen.se" external>
      {t("intro.reception")}
    </EnhancedLink>
  );
  const songbookLink = (
    <EnhancedLink href="https://sangbok.kth.it" external>
      sangbok.kth.it
    </EnhancedLink>
  );
  const songlistRepoLink = (
    <EnhancedLink href="https://github.com/itsektionen/songlist" external>
      songlist repository
    </EnhancedLink>
  );
  const songbookRepoLink = (
    <EnhancedLink href="https://github.com/itsektionen/songbook-2.0" external>
      songbook-2.0 repository
    </EnhancedLink>
  );
  const educationLink = (
    <EnhancedLink href="/education">{t("intro.education-page")}</EnhancedLink>
  );
  const committeesLink = (
    <EnhancedLink href="/committees">
      {t("structure.committees-page")}
    </EnhancedLink>
  );
  const trusteesLink = (
    <EnhancedLink href="/trustees">{t("structure.trustees-page")}</EnhancedLink>
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

function EnhancedLink({
  href,
  children,
  external = false,
  primary = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  primary?: boolean;
}) {
  return (
    <Link
      className={
        primary
          ? "text-primary"
          : undefined + " hover:underline underline-offset-4"
      }
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}>
      {children}
    </Link>
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
