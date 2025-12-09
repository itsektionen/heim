import { CommitteeSlug } from "@/data/committees";
import { getCommittee } from "@/lib/committees";
import { listCommitteeProtocols } from "@/lib/committees/protocols";
import { getScopedI18n } from "@/locales/server";
import { FileTextIcon } from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

const CommitteeProtocolsPage = async ({
  params,
}: {
  params: Promise<{ committeeSlug: string }>;
}) => {
  const { committeeSlug } = await params;

  const response = getCommittee(committeeSlug);

  const protocols = await listCommitteeProtocols(
    committeeSlug as CommitteeSlug,
  );

  const t = await getScopedI18n("CommitteesPage");

  if (!response || !protocols) {
    return notFound();
  }

  const { committee } = response.data;

  return (
    <div>
      {protocols && (
        <>
          <p className="text-muted-foreground text-sm font-medium mb-3">
            {t("single.protocols")}
          </p>
          <p className="mb-4">
            {t("protocols", { committeName: committee.name })}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {protocols.map((protocol) => (
              <Link
                href={protocol.url}
                target="_blank "
                className="flex items-center gap-4 px-4 py-2 hover:bg-muted rounded-md transition-colors"
                key={protocol.id}
              >
                <FileTextIcon className="text-muted-foreground" />
                <div>
                  <p>{protocol.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {protocol.date.toLocaleDateString("sv-SE")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommitteeProtocolsPage;
