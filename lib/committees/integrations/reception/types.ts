import { CalendarEvent } from "@/types";

export type ReceptionEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
};

export const mapReceptionEvent = (
  receptionEvent: ReceptionEvent,
): CalendarEvent => {
  return {
    id: `reception-event-${receptionEvent.id}`,
    title: receptionEvent.title,
    description: receptionEvent.description,
    start: new Date(receptionEvent.start),
    end: new Date(receptionEvent.end),
    location: receptionEvent.location,
    imageUrl: undefined,
    url: undefined,
  };
};
