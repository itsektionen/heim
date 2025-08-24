import { env } from "@/env";
import { CalendarEvent } from ".";

type ReceptionEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
};

type ReceptionEventsResponse = ReceptionEvent[];

const mapReceptionEvent = (receptionEvent: ReceptionEvent): CalendarEvent => {
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

export const getReceptionEvent = async (
  eventId: string,
): Promise<CalendarEvent | undefined> => {
  try {
    const res = await fetch(
      env.RECEPTION_BASE_URL +
        "/api/v1/events/" +
        eventId.split("reception-event-")[1],
    );
    const data: ReceptionEvent = await res.json();

    return mapReceptionEvent(data);
  } catch (error) {
    console.error(`Error fetching event (${eventId})`, error);
    return undefined;
  }
};

export const listReceptionEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const res = await fetch(env.RECEPTION_BASE_URL + "/api/v1/events");
    const data: ReceptionEventsResponse = await res.json();

    return data.map((receptionEvent) => mapReceptionEvent(receptionEvent));
  } catch (error) {
    console.error(`Error listing events`, error);
    return [];
  }
};

export const getCarouselReceptionEvents = async (): Promise<
  CalendarEvent[]
> => {
  const allEvents = await listReceptionEvents();

  const now = new Date();
  const startDate = new Date(now);
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + 7);

  return allEvents.filter((e) => e.start <= endDate && e.start >= startDate);
};
