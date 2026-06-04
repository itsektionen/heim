import { env } from "@/env";
import { CommitteeIntegration } from "..";
import {
  mapInitProtocol,
  InitDocuments,
} from "./types";
import { Protocol } from "@/types";

const initIntegration: CommitteeIntegration = {
  // Required to exist, but init currently doesn't have an event calendar API (or even events to begin with)
  listEvents: async () => { return []; },
  getEvent: async () => { return undefined; },

  listProtocols: async () => {
    try {
      const response = await fetch(`${env.INIT_BASE_URL}/documents.json`);
      const data: InitDocuments = await response.json();

      const datedProtocols: Protocol[] = [];
      for (const initProtocol of data.protocols) {
        const protocol = mapInitProtocol(initProtocol);
        if (!protocol.date) {
          console.warn(`Init protocol ${protocol.name} is missing a valid date, skipping.`);
          continue;
        }
        datedProtocols.push({ ...protocol, date: protocol.date } satisfies Protocol);
      }
      return datedProtocols.sort((a, b) => b.date.getTime() - a.date.getTime() || b.name.localeCompare(a.name));
    } catch (error) {
      console.error("Error listing Init protocols", error);
      return [];
    }
  },
};

export default initIntegration;
