import { CalendarEvent } from "@/types";
import { Protocol } from "@/types";
import qmiskIntegration from "./qmisk";
import { itkIntegration } from "./itk";
import { tmeitIntegration } from "./tmeit";
import { CommitteeSlug } from "@/data/committees";
import { receptionIntegration } from "./reception";

export interface CommitteeIntegration {
  listEvents: () => Promise<CalendarEvent[]>;
  getEvent: (id: string) => Promise<CalendarEvent | undefined>;
  listProtocols?: () => Promise<Protocol[]>;
}

export const committeeIntegrations: Partial<
  Record<CommitteeSlug, CommitteeIntegration>
> = {
  qmisk: qmiskIntegration,
  tmeit: tmeitIntegration,
  itk: itkIntegration,
};

export const committeeIntegrationSlugs = Object.keys(
  committeeIntegrations,
) as CommitteeSlug[];

// only integrations with listprotocols
export const committeeIntegrationProtocolSlugs =
  committeeIntegrationSlugs.filter(
    (slug) => committeeIntegrations[slug]?.listProtocols !== undefined,
  );

export const getCommitteeIntegration = (
  slug: CommitteeSlug,
): CommitteeIntegration | undefined => {
  return committeeIntegrations[slug as CommitteeSlug];
};
