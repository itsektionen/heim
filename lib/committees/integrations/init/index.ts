import { env } from "@/env";
import { CommitteeIntegration } from "..";
import {
  mapInitProtocol,
  InitDocuments,
} from "./types";

const initIntegration: CommitteeIntegration = {
  // Required to exist, but init currently doesn't have an event calendar API (or even events to begin with)
  listEvents: async () => { return []; },
  getEvent: async () => { return undefined; },

  listProtocols: async () => {
    try {
      const response = await fetch(`${env.INIT_BASE_URL}/documents.json`);
      const data: InitDocuments = await response.json();

      const protocols = data.protocols
        .map(mapInitProtocol)
        .sort(
          (a, b) =>
            b.date.getTime() - a.date.getTime() || b.name.localeCompare(a.name),
        );

      return protocols;
    } catch (error) {
      console.error("Error listing Init protocols", error);
      return [];
    }
  },
};

export default initIntegration;
