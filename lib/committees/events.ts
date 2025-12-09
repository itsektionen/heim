import { mapQmiskEvent, QmiskEvent } from "@/types/committee/qmisk";
import { CalendarEvent } from "../events";
import { env } from "@/env";
import committees, { CommitteeSlug } from "@/data/committees";

const listQmiskEvents = async (): Promise<CalendarEvent[]> => {
  const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
  const data: QmiskEvent[] = await res.json();

  return data
    .map(mapQmiskEvent)
    .sort(
      (a, b) =>
        b.start.getTime() - a.start.getTime() || b.title.localeCompare(a.title),
    );
};

const getQmiskEvent = async (id: number): Promise<CalendarEvent | null> => {
  const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
  const data: QmiskEvent[] = await res.json();

  const event = data.find((event) => event.id === id);

  return event ? mapQmiskEvent(event) : null;
};

export const getCommitteeEvent = async (
  id: string,
): Promise<CalendarEvent | null> => {
  const slug = id.split("-")[0] as CommitteeSlug;
  switch (slug) {
    case "qmisk":
      const qmiskId = parseInt(id.split("-")[1]);
      return getQmiskEvent(qmiskId);

    default:
      return null;
  }
};

export const listCommitteeEvents = async (
  slug: CommitteeSlug,
): Promise<CalendarEvent[] | null> => {
  switch (slug) {
    case "qmisk":
      return listQmiskEvents();

    default:
      return null;
  }
};

export const listAllCommitteeEvents = async (): Promise<CalendarEvent[]> => {
  const events = await Promise.all(
    Object.values(committees).map(async (committee) => {
      const events = await listCommitteeEvents(committee.slug);
      return events || [];
    }),
  );

  return events
    .flat()
    .sort(
      (a, b) =>
        b.start.getTime() - a.start.getTime() || b.title.localeCompare(a.title),
    );
};
