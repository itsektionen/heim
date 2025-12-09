import { EventCard } from "@/components/event-card";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { listAllCommitteeEvents } from "@/lib/committees/events";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import { type Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

const EventsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const events = await listAllCommitteeEvents();
  const t = await getI18n();

  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle className="mb-4">{t("NavBar.Chapter.Events")}</HeroTitle>
          <p className="max-w-prose text-balance text-white text-center text-sm">
            {t("NavBar.Chapter.Events.description")}
          </p>
        </HeroContent>
        <HeroImage
          src="/assets/img/working-bar.jpg"
          alt={t("NavBar.Chapter.Events")}
        />
      </Hero>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events
          .sort((a, b) => b.start.getDate() - a.start.getDate())
          .map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
      </div>
    </>
  );
};

export function generateStaticParams() {
  return getStaticParams();
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Chapter.Events");
  const description = t("NavBar.Chapter.Events.description");

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

export default EventsPage;
