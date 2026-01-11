import { CalendarEvent } from "@/lib/events";

export type ItkEvent = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  start: string;
  end: string;
  info: string;
  location?: string;
};

export const mapItkEvent = (itkEvent: ItkEvent): CalendarEvent => ({
  id: `itk-${itkEvent.id}`,
  title: itkEvent.title,
  description: itkEvent.info || undefined,
  start: new Date(itkEvent.start),
  end: new Date(itkEvent.end),
  location: itkEvent.location,
  imageUrl: undefined,
  committeeSlug: "itk",
});
