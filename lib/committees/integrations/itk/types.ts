import { CalendarEvent } from "@/types";

export type ItkEvent = {
  id: string;
  title: string;
  type: string;
  start: string;
  end: string;
  description: string;
  location?: string;
  imageUrl?: string;
};

const defaultImageUrl = "/assets/img/events/itk.webp";
const itkImageBaseUrl = "https://img.itk.gg/";

export const mapItkEvent = (itkEvent: ItkEvent): CalendarEvent => ({
  id: `itk-${itkEvent.id}`,
  title: itkEvent.title,
  description: itkEvent.description || undefined,
  start: new Date(itkEvent.start),
  end: new Date(itkEvent.end),
  location: itkEvent.location,
  imageUrl: itkEvent.imageUrl?.startsWith(itkImageBaseUrl)
    ? itkEvent.imageUrl
    : defaultImageUrl,
  committeeSlug: "itk",
});
