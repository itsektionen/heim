import { env } from "@/env";
import { CommitteeIntegration } from "..";
import { ItkEvent, mapItkEvent } from "./types";

const fetchItkEvents = async (): Promise<ItkEvent[]> => {
  const res = await fetch(`${env.ITK_BASE_URL}/events/export/heim`);
  if (!res.ok) {
    throw new Error(`ITK responded with ${res.status}`);
  }
  return res.json();
};

export const itkIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const data = await fetchItkEvents();

      return data
        .map(mapItkEvent)
        .sort(
          (a, b) =>
            a.start.getTime() - b.start.getTime() ||
            a.title.localeCompare(b.title),
        );
    } catch (error) {
      console.error("Error listing ITK events", error);
      return [];
    }
  },
  getEvent: async (id: string) => {
    try {
      const data = await fetchItkEvents();

      const event = data.find((event) => event.id === id);

      return event ? mapItkEvent(event) : undefined;
    } catch (error) {
      console.error(`Error getting ITK event (id: ${id})`, error);
      return undefined;
    }
  },
};
