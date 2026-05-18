import { CalendarEvent } from "@/types";

export type ItkEvent = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  start: string;
  end: string;
  description: string;
  location?: string;
};

export const mapItkEvent = (itkEvent: ItkEvent): CalendarEvent => ({
  id: `itk-${itkEvent.id}`,
  title: itkEvent.title,
  description: itkEvent.description || undefined,
  start: new Date(itkEvent.start),
  end: new Date(itkEvent.end),
  location: itkEvent.location,
  imageUrl: "/assets/img/events/itk.webp",
  committeeSlug: "itk",
});
