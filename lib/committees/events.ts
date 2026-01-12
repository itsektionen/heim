import committees, { CommitteeSlug } from "@/data/committees";
import { env } from "@/env";
import { ItkEvent, mapItkEvent } from "@/types/committee/itk";
import { mapQmiskEvent, QmiskEvent } from "@/types/committee/qmisk";
import { mapTmeitEvent, TmeitEvent } from "@/types/committee/tmeit";
import { CalendarEvent } from "../events";

const listQmiskEvents = async (): Promise<CalendarEvent[]> => {
  const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
  const data: QmiskEvent[] = await res.json();

  return data
    .map(mapQmiskEvent)
    .sort(
      (a, b) =>
        a.start.getTime() - b.start.getTime() || a.title.localeCompare(b.title)
    );
};

const getQmiskEvent = async (id: number): Promise<CalendarEvent | null> => {
  const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
  const data: QmiskEvent[] = await res.json();

  const event = data.find((event) => event.id === id);

  return event ? mapQmiskEvent(event) : null;
};

const listItkEvents = async (): Promise<CalendarEvent[]> => {
  const res = await fetch(`${env.ITK_BASE_URL}/events/json`);
  const data: ItkEvent[] = await res.json();

  return data
    .map(mapItkEvent)
    .sort(
      (a, b) =>
        a.start.getTime() - b.start.getTime() || a.title.localeCompare(b.title)
    );
};

const getItkEvent = async (id: string): Promise<CalendarEvent | null> => {
  const res = await fetch(`${env.ITK_BASE_URL}/events/json`);
  const data: ItkEvent[] = await res.json();

  const event = data.find((event) => event.id === id);

  return event ? mapItkEvent(event) : null;
};

const listTmeitEvents = async (): Promise<CalendarEvent[]> => {
  const res = await fetch(`${env.TMEIT_BASE_URL}/events/tmeit/json`);
  const data: TmeitEvent[] = await res.json();

  return data
    .map(mapTmeitEvent)
    .sort(
      (a, b) =>
        a.start.getTime() - b.start.getTime() || a.title.localeCompare(b.title)
    );
};

const getTmeitEvent = async (id: string): Promise<CalendarEvent | null> => {
  const res = await fetch(`${env.TMEIT_BASE_URL}/events/tmeit/json`);
  const data: TmeitEvent[] = await res.json();

  const event = data.find((event) => event.id === id);

  return event ? mapTmeitEvent(event) : null;
};

export const getCommitteeEvent = async (
  id: string
): Promise<CalendarEvent | null> => {
  const slug = id.split("-")[0] as CommitteeSlug;
  switch (slug) {
    case "qmisk":
      const qmiskId = parseInt(id.split("-")[1]);
      return getQmiskEvent(qmiskId);

    case "itk":
      const itkId = id.split("-")[1];
      return getItkEvent(itkId);

    case "tmeit":
      const tmeitId = id.split("-")[1];
      return getTmeitEvent(tmeitId);

    default:
      return null;
  }
};

export const listCommitteeEvents = async (
  slug: CommitteeSlug
): Promise<CalendarEvent[] | null> => {
  switch (slug) {
    case "qmisk":
      return listQmiskEvents();

    case "itk":
      return listItkEvents();

    case "tmeit":
      return listTmeitEvents();

    default:
      return null;
  }
};

export const listAllCommitteeEvents = async (): Promise<CalendarEvent[]> => {
  const events = await Promise.all(
    Object.values(committees).map(async (committee) => {
      const events = await listCommitteeEvents(committee.slug);
      return events || [];
    })
  );

  return events
    .flat()
    .sort(
      (a, b) =>
        a.start.getTime() - b.start.getTime() || a.title.localeCompare(b.title)
    );
};
