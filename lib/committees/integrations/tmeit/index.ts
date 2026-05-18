import { env } from "@/env";
import { CommitteeIntegration } from "..";
import { mapTmeitEvent, TmeitEvent } from "./types";

export const tmeitIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const res = await fetch(`${env.TMEIT_BASE_URL}/events/tmeit/json`);
      const data: TmeitEvent[] = await res.json();

      return data
        .map(mapTmeitEvent)
        .sort(
          (a, b) =>
            a.start.getTime() - b.start.getTime() ||
            a.title.localeCompare(b.title),
        );
    } catch (error) {
      console.error("Error listing TMEIT events", error);
      return [];
    }
  },
  getEvent: async (id: string) => {
    try {
      const res = await fetch(`${env.TMEIT_BASE_URL}/events/tmeit/json`);
      const data: TmeitEvent[] = await res.json();

      const event = data.find((event) => event.id === id);

      return event ? mapTmeitEvent(event) : undefined;
    } catch (error) {
      console.error(`Error getting TMEIT event (id: ${id})`, error);
      return undefined;
    }
  },
};
