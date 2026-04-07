import { Button } from "@/components/ui/button";
import { Hero, HeroImage } from "@/components/ui/hero";
import { getCommittee } from "@/lib/committees";
import {
  getCommitteeEvent,
  listAllCommitteeEvents,
} from "@/lib/committees/events";
import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { type Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: string; locale: string }>;
}) => {
  const { eventId, locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();

  const event = await getCommitteeEvent(eventId);

  if (!event) {
    return notFound();
  }

  const startTimeString = event.start.toLocaleDateString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTimeString = event.end?.toLocaleDateString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const committeeData = getCommittee(event.committeeSlug!);

  return (
    <>
      <Hero>
        <HeroImage
          alt={event.title}
          src={event.imageUrl || "/assets/img/placeholder.png"}
        />
        <Button
          className="absolute top-2 left-1 opacity-50 text-foreground"
          asChild
          variant="link">
          <Link href="/events">
            <ArrowLeftIcon /> {t("CommitteesPage.single.back")}
          </Link>
        </Button>
      </Hero>
      <div className="flex flex-col-reverse lg:flex-row gap-8 justify-between">
        <div>
          <h2 className="text-3xl font-medium mb-2">{event.title}</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {event.description || "No description provided."}
          </p>
        </div>
        <div className="bg-muted py-4 px-5 space-y-4 rounded-md border shrink-0 h-fit lg:sticky lg:top-[calc(64px+var(--spacing)*6)]">
          <div className="flex items-center gap-4">
            <CalendarClockIcon className="text-muted-foreground size-4" />
            {`${startTimeString} ${endTimeString && "- " + endTimeString}`}
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon className="text-muted-foreground size-4" />
            {event.location}
          </div>
          {committeeData && (
            <div className="flex items-center gap-4">
              <UsersIcon className="text-muted-foreground size-4" />
              <Link
                className="hover:underline underline-offset-4 text-primary"
                href={`/committees/${committeeData.data.committee.slug}`}>
                {committeeData.data.committee.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export async function generateStaticParams() {
  const events = await listAllCommitteeEvents();
  return getStaticParams().map((locale) => {
    return events.map((event) => ({
      locale: locale,
      eventId: event.id,
    }));
  });
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ eventId: string; locale: string }>;
}): Promise<Metadata> => {
  const { eventId, locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();

  const event = await getCommitteeEvent(eventId);

  const title = t("Common.chapter");
  const subtitle = event ? event.title : t("NavBar.Chapter.Events");

  // TODO: Change this ternary mess to something more readable
  const description = event
    ? event.description
      ? event.description
      : t("NavBar.Chapter.Events.description")
    : t("NavBar.Chapter.Events.description");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: `/events/${eventId}`,
    image: getOgImageUrl(title, subtitle),
  });
};

export default EventPage;
