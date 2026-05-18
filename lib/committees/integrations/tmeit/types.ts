import { CalendarEvent } from "@/types";

export type TmeitEvent = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  start: string;
  end: string;
  description: string;
  location?: string;
};

export const mapTmeitEvent = (tmeitEvent: TmeitEvent): CalendarEvent => ({
  id: `tmeit-${tmeitEvent.id}`,
  title: tmeitEvent.title,
  description: tmeitEvent.description || undefined,
  start: new Date(tmeitEvent.start),
  end: new Date(tmeitEvent.end),
  location: tmeitEvent.location,
  imageUrl: "/assets/img/events/tmeit.webp",
  committeeSlug: "tmeit",
});
