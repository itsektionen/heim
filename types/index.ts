import { CommitteeSlug } from "@/data/committees";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  location?: string;
  imageUrl?: string;
  url?: string;
  committeeSlug?: CommitteeSlug;
};

export type Protocol = {
  id: number;
  name: string;
  date: Date;
  url: string;
};
