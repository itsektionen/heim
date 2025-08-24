import { Button } from "@/components/ui/button";
import { Hero, HeroContent, HeroImage } from "@/components/ui/hero";
import { getReceptionEvent } from "@/lib/events/reception";
import { getI18n } from "@/locales/server";
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  ClockIcon,
  MapPinIcon,
} from "lucide-react";
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

  const event = await getReceptionEvent(eventId);

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
          variant="link"
        >
          <Link href="/events">
            <ArrowLeftIcon /> {t("CommitteesPage.single.back")}
          </Link>
        </Button>
      </Hero>
      <div className="flex gap-8 justify-between">
        <div>
          <h2 className="text-3xl font-medium mb-2">{event.title}</h2>
          <p className="text-muted-foreground">
            {event.description || "No description provided."}
          </p>
        </div>
        <div className="bg-muted py-4 px-5 space-y-4 rounded-md border shrink-0">
          <div className="flex items-center gap-2">
            <CalendarClockIcon className="text-muted-foreground size-5" />
            {`${startTimeString} ${endTimeString && "- " + endTimeString}`}
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-muted-foreground size-5" />
            {event.location}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
