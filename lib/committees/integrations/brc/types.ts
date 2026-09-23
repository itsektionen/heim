import { CalendarEvent } from "@/types";

export type BrcLocation = {
  addressStreet1: string;
};

export type BrcImage = {
  url: string;
};

export type BrcEvent = {
  id: string;
  name: string;
  type: string;
  image: BrcImage[];
  date: string;
  info: string; 
  location: BrcLocation;
  published: boolean;
};

export const mapBrcEvent = (BrcEvent: BrcEvent): CalendarEvent => {
  const imageUrl = Array.isArray(BrcEvent.image)
    ? BrcEvent.image[0]?.url
    : undefined;

  return {
    id: `brc-${BrcEvent.id}`,
    title: BrcEvent.name,
    start: new Date(BrcEvent.date),
    description: BrcEvent.info,
    location: BrcEvent.location?.addressStreet1,
    imageUrl,
    committeeSlug: "brc",
  };
};