import { CommitteeSlug } from "@/data/committees";
import { env } from "@/env";
import { Protocol } from "@/types/committee";
import { mapQmiskProtocol, QmiskProtocol } from "@/types/committee/qmisk";

const listQmiskProtocols = async (): Promise<Protocol[]> => {
  const res = await fetch(`${env.QMISK_BASE_URL}/protocol/view`);
  const data: QmiskProtocol[] = await res.json();

  return data
    .map(mapQmiskProtocol)
    .sort(
      (a, b) =>
        b.date.getTime() - a.date.getTime() || b.name.localeCompare(a.name),
    );
};

export const listCommitteeProtocols = async (
  slug: CommitteeSlug,
): Promise<Protocol[] | null> => {
  switch (slug) {
    case "qmisk":
      return listQmiskProtocols();

    default:
      return null;
  }
};
