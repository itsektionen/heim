import { CommitteeSlug } from "@/data/committees";
import { env } from "@/env";
import { Protocol } from "@/types/committee";
import { QmiskProtocol } from "@/types/committee/qmisk/protocol";

const listQmiskProtocols = async (): Promise<Protocol[]> => {
  const res = await fetch(env.QMISK_PROTOCOLS_URL);
  const data: QmiskProtocol[] = await res.json();

  return data
    .map((qmiskProtocol) => ({
      id: qmiskProtocol.id,
      name: qmiskProtocol.name,
      date: new Date(qmiskProtocol.upload_date),
      url: qmiskProtocol.actions.view_pdf,
    }))

    .sort(
      (a, b) =>
        b.date.getTime() - a.date.getTime() || b.name.localeCompare(a.name),
    );
};

export const listProtocols = async (
  slug: CommitteeSlug,
): Promise<Protocol[] | null> => {
  switch (slug) {
    case "qmisk":
      return listQmiskProtocols();

    default:
      return null;
  }
};
