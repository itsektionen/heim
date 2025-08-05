import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { listAllMeetings } from "@/lib/drive";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FileQuestionIcon,
  FileTextIcon,
  FolderIcon,
} from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 604800;

const YearHeader = ({ year }: { year: string }) => {
  return (
    <div className="border-b sm:border-y bg-muted/90 cursor-pointer hover:bg-accent transition-colors backdrop-blur z-0 flex sticky top-0 sm:top-16 px-6 py-3 items-center justify-between">
      <p className="text-sm font-medium select-none">{year}</p>
      <ChevronDownIcon className="size-4 text-muted-foreground transition-transform" />
    </div>
  );
};

const ProtocolsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("DocumentsPage.protocols");
  const commonT = await getI18n();

  const allMeetings = await listAllMeetings();
  const earliestMeeting = allMeetings.find(
    (m) =>
      Number(m.year!) === Math.min(...allMeetings.map((m) => Number(m.year!)))
  );
  const year = earliestMeeting?.year;

  return (
    <div className="-ml-6 -mt-6 -mr-6 -mb-42 flex flex-col min-h-[700px]">
      <div className="px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <FileTextIcon className="size-4 text-primary" />
          <p className="font-medium">{t("title")}</p>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          {t("description", { year })}
        </p>
      </div>
      <section>
        {allMeetings.map((meeting, i) => (
          <Collapsible
            className="data-[state='open']:[&>*>svg]:rotate-180"
            defaultOpen={i === 0}
            key={meeting.id}>
            <CollapsibleTrigger asChild>
              <YearHeader key={meeting.id} year={meeting.year!} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
                {meeting.files?.map((file) => (
                  <Card
                    key={file.id}
                    className="flex select-none flex-row overflow-hidden">
                    {file.hasThumbnail ? (
                      <Image
                        height={138}
                        width={100}
                        src={file.thumbnailLink!}
                        alt={file.name!}
                        className="w-25 border-r -my-6 -mr-6"
                      />
                    ) : (
                      <div className="w-25 border-r -my-6 -mr-6 bg-muted p-3 flex items-center justify-center text-muted-foreground">
                        {file.mimeType ===
                        "application/vnd.google-apps.folder" ? (
                          <FolderIcon />
                        ) : (
                          <FileQuestionIcon />
                        )}
                      </div>
                    )}
                    <CardHeader className="grow whitespace-pre-wrap break-all overflow-hidden">
                      <CardTitle className="leading-5">
                        {file.name!.split(".pdf")[0]}
                      </CardTitle>
                      <Button variant="secondary" className="mt-auto" asChild>
                        <Link href={file.webViewLink!} target="_blank">
                          {commonT("Common.view")} <ExternalLinkIcon />
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </section>
    </div>
  );
};

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("DocumentsPage.protocols.title");
  const description = t("NavBar.Documents.Protocols.description");

  return {
    title: `${subtitle} – ${title}`,
    description,
    openGraph: {
      images: [getOgImageUrl(title, subtitle)],
    },
    twitter: {
      images: [getOgImageUrl(title, subtitle)],
    },
  };
}

export default ProtocolsPage;
