import { env } from "@/env";
import { CommitteeIntegration } from "..";
import { mapReceptionEvent, ReceptionEvent } from "./types";

export const receptionIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const res = await fetch(env.RECEPTION_BASE_URL + "/api/v1/events");
      const data: ReceptionEvent[] = await res.json();

      return data.map((receptionEvent) => mapReceptionEvent(receptionEvent));
    } catch (error) {
      console.error("Error listing Reception events", error);
      return [];
    }
  },
  getEvent: async (id: string) => {
    try {
      const res = await fetch(
        env.RECEPTION_BASE_URL +
          "/api/v1/events/" +
          id.split("reception-event-")[1],
      );
      const data: ReceptionEvent = await res.json();

      return mapReceptionEvent(data);
    } catch (error) {
      console.error(`Error fetching Reception event (id: ${id})`, error);
      return undefined;
    }
  },
};
