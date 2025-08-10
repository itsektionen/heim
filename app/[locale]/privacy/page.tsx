import { getScopedI18n, getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import ELink from "@/components/ui/elink";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("PrivacyPage");
  const commonT = await getScopedI18n("Common");

  const thsEmailLink = (
    <ELink href="mailto:kommunikation@ths.kth.se">
      kommunikation@ths.kth.se
    </ELink>
  );
  const privacyEmailLink = (
    <ELink href="mailto:privacy@kth.it">privacy@kth.it</ELink>
  );
  const googleLink = (
    <ELink external>https://policies.google.com/privacy</ELink>
  );
  const githubLink = (
    <ELink external>
      https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement
    </ELink>
  );
  const kthLink = <ELink external>{t("third-parties.kth-link")}</ELink>;

  return (
    <>
      <Hero>
        <HeroContent className="text-white p-6 sm:p-4">
          <HeroTitle className="mb-4">{t("title")}</HeroTitle>
        </HeroContent>
        <HeroImage
          className="brightness-50"
          src="/assets/img/ljusgangen.jpg"
          alt={t("hero-image-alt")}
        />
      </Hero>
      <article className="max-w-prose mx-auto [&>section>p]:text-muted-foreground">
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("collect.title")}</h3>
          <p className="mb-3">{t("collect.content.0")}</p>
          <p className="mb-3">{t("collect.content.1")}</p>
          <p className="mb-3">{t("collect.content.2")}</p>
          <p className="mb-3">{t("collect.content.3")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("use.title")}</h3>
          <p className="mb-3">{t("use.content.0")}</p>
          <p className="mb-3">{t("use.content.1")}</p>
          <p className="mb-3">{t("use.content.2")}</p>
          <p className="mb-3">{t("use.content.3")}</p>
          <p className="mb-3">{t("use.content.4")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("retention.title")}</h3>
          <p className="mb-3">{t("retention.content.0")}</p>
          <p className="mb-3">{t("retention.content.1")}</p>
          <p className="mb-3">{t("retention.content.2")}</p>
          <p className="mb-3">{t("retention.content.3")}</p>
          <p className="mb-3">{t("retention.content.4")}</p>
          <p className="mb-3">{t("retention.content.5")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("storage.title")}</h3>
          <p className="mb-3">{t("storage.content.0")}</p>
          <p className="mb-3">{t("storage.content.1")}</p>
          <p className="mb-3">{t("storage.content.2")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("cookies.title")}</h3>
          <p className="mb-3">{t("cookies.content")}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">
            {t("third-parties.title")}
          </h3>
          <p className="mb-3">
            {commonT("kth") + " - "}
            {t("third-parties.kth", { kthLink })}
          </p>
          <p className="mb-3">{t("third-parties.google", { googleLink })} </p>
          <p className="mb-3">{t("third-parties.github", { githubLink })} </p>
          <p className="mb-3">
            {commonT("ths") + " - "}
            {t("third-parties.ths", { thsEmailLink })}
          </p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("rights.title")}</h3>
          <p className="mb-3">{t("rights.content")}</p>
          <p className="mb-3">{t("contact", { privacyEmailLink })}</p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-medium mb-2">{t("update.title")}</h3>
          <p className="mb-3">{t("update.notice")}</p>
          <p className="mb-3">{t("update.last") + ": 2025-08-11"}</p>
        </section>
      </article>
    </>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
