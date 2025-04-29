export interface EventScraper {
  listEvents(
    ...args: (string | number | boolean | object)[]
  ): Promise<CalendarEvent[]>;
}

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end?: Date;
  location: string;
  imageUrl?: string;
  url: string;
};
