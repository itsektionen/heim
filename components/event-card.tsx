"use client";

import { getCommittee } from "@/lib/committees";
import { CalendarEvent } from "@/types";
import { useI18n } from "@/locales/client";
import { ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const EventCard = ({ event }: { event: CalendarEvent }) => {
  const t = useI18n();

  const committeeData = getCommittee(event.committeeSlug!);

  return (
    <Card className="pt-0 px-0 overflow-hidden h-full">
      <CardHeader className="px-0">
        <div className="relative h-48 w-full border-b mb-6 bg-secondary">
          <Image
            className="object-cover"
            src={event.imageUrl ?? "/assets/img/placeholder.png"}
            alt={event.title}
            fill
          />
        </div>
        <div className="px-6">
          <CardTitle className="mb-1.5 line-clamp-2">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2 max-w-full break-all">
            {event.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-1.5">
          <li className="flex items-center gap-2 truncate">
            <MapPinIcon className="size-4 text-muted-foreground shrink-0" />
            {event.location}
          </li>
          <li className="flex items-center gap-2 truncate">
            <ClockIcon className="size-4 text-muted-foreground shrink-0" />
            {event.start.toLocaleDateString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </li>
          {committeeData && (
            <li className="flex items-center gap-2 truncate">
              <UsersIcon className="size-4 text-muted-foreground shrink-0" />
              <Link
                className="text-primary hover:underline underline-offset-4"
                href={`/committees/${committeeData.data.committee.slug}`}
              >
                {committeeData.data.committee.name}
              </Link>
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <CardAction>
          <Button variant="secondary" asChild>
            <Link href={`/events/${event.id}`}>{t("Common.read-more")}</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export { EventCard };
