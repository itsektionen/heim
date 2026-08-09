import { committeeIntegrations } from "../committees/integrations";
import { receptionIntegration } from "../committees/integrations/reception";

export const listEvents = async (limit: number = 0) => {
  // FIXME: TEMPORARY FOR RECEPTION TO AVOID DUPLICATE EVENTS
  // const committeeEvents = await Promise.all(
  //   Object.values(committeeIntegrations).map((i) => i.listEvents()),
  // );

  const committeeEvents = await receptionIntegration.listEvents();

  const allEvents = [...committeeEvents.flat()];

  return allEvents
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, limit === 0 ? undefined : limit);
};
