import { committeeIntegrations } from "../committees/integrations";

export const listEvents = async (limit: number = 0) => {
  const committeeEvents = await Promise.all(
    Object.values(committeeIntegrations).map((i) => i.listEvents()),
  );

  const allEvents = [...committeeEvents.flat()];

  return allEvents
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, limit === 0 ? undefined : limit);
};
