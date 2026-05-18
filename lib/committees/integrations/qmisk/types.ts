import { CalendarEvent } from "@/types";
import { Protocol } from "@/types";

export type QmiskEvent = {
  id: number;
  name: string;
  type: string;
  image: string;
  start: string;
  end: string;
  info: string;
};

export const mapQmiskEvent = (qmiskEvent: QmiskEvent): CalendarEvent => ({
  id: `qmisk-${qmiskEvent.id}`,
  title: qmiskEvent.name,
  start: new Date(qmiskEvent.start),
  end: new Date(qmiskEvent.end),
  description: qmiskEvent.info,
  location: "Kistan 2.0",
  imageUrl: qmiskEvent.image == "" ? undefined : qmiskEvent.image,
  committeeSlug: "qmisk",
});

export type QmiskProtocol = {
  id: number;
  name: string;
  upload_date: string;
  actions: {
    view_pdf: string;
  };
};

export const mapQmiskProtocol = (qmiskProtocol: QmiskProtocol): Protocol => ({
  id: qmiskProtocol.id,
  name: qmiskProtocol.name,
  date: new Date(qmiskProtocol.upload_date),
  url: qmiskProtocol.actions.view_pdf,
});
