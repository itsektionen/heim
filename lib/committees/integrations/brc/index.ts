import { env } from "@/env";
import { CommitteeIntegration } from "..";
import {
  mapBrcEvent,
  BrcEvent,
} from "./types";

const brcAuthHeaders = {
  Authorization: `Bearer ${env.BRC_API_KEY}`,
};

const brcIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const res = await fetch(`${env.BRC_BASE_URL}/rest/eventsCustom`, {
        headers: brcAuthHeaders,
      });

      const jsonResponse = await res.json();
      const eventsList = jsonResponse?.data?.eventsCustom || [];

      return eventsList
        .filter((event: BrcEvent) => event.published === true)
        .map(mapBrcEvent)
    } catch (error) {
      console.error("Error listing BRC events", error);
      return [];
    }
  },
  getEvent: async (id: string) => {
    try {
      const res = await fetch(`${env.BRC_BASE_URL}/rest/eventsCustom`, {
        headers: brcAuthHeaders,
      });
      const jsonResponse = await res.json();
      const eventsList = (jsonResponse?.data?.eventsCustom || []) as BrcEvent[];
      const event = eventsList.find((event: BrcEvent) => {
      const eventIdStr = String(event.id);  
      return eventIdStr === id || eventIdStr.startsWith(id);
      });

      return event ? mapBrcEvent(event) : undefined;
    } catch (error) {
      console.error(`Error getting BRC event (id: ${id})`, error);
      return undefined;
    }
  },
};
export default brcIntegration;