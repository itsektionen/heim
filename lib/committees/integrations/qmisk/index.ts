import { env } from "@/env";
import { CommitteeIntegration } from "..";
import {
  mapQmiskEvent,
  mapQmiskProtocol,
  QmiskEvent,
  QmiskProtocol,
} from "./types";

const qmiskIntegration: CommitteeIntegration = {
  listEvents: async () => {
    try {
      const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
      const data: QmiskEvent[] = await res.json();

      return data
        .map(mapQmiskEvent)
        .sort(
          (a, b) =>
            a.start.getTime() - b.start.getTime() ||
            a.title.localeCompare(b.title),
        );
    } catch (error) {
      console.error("Error listing Qmisk events", error);
      return [];
    }
  },
  getEvent: async (id: string) => {
    try {
      const res = await fetch(`${env.QMISK_BASE_URL}/event/pubs/public/json`);
      const data: QmiskEvent[] = await res.json();

      const event = data.find((event) => event.id === Number(id));

      return event ? mapQmiskEvent(event) : undefined;
    } catch (error) {
      console.error(`Error getting Qmisk event (id: ${id})`, error);
      return undefined;
    }
  },
  listProtocols: async () => {
    try {
      const res = await fetch(`${env.QMISK_BASE_URL}/protocol/view`);
      const data: QmiskProtocol[] = await res.json();

      const protocols = data
        .map(mapQmiskProtocol)
        .sort(
          (a, b) =>
            b.date.getTime() - a.date.getTime() || b.name.localeCompare(a.name),
        );

      return protocols;
    } catch (error) {
      console.error("Error listing Qmisk protocols", error);
      return [];
    }
  },
};

export default qmiskIntegration;
