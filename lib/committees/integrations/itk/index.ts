import { env } from "@/env";
import { CommitteeIntegration } from "..";
import { ItkEvent, mapItkEvent } from "./types";

export const itkIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const res = await fetch(`${env.ITK_BASE_URL}/events/json`);
      const data: ItkEvent[] = await res.json();

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
      const res = await fetch(`${env.ITK_BASE_URL}/events/json`);
      const data: ItkEvent[] = await res.json();

      const event = data.find((event) => event.id === id);

      return event ? mapItkEvent(event) : undefined;
    } catch (error) {
      console.error(`Error getting ITK event (id: ${id})`, error);
      return undefined;
    }
  },
};
