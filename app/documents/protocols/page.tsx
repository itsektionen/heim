import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { listAllMeetings } from "@/lib/drive";
import {
  ExternalLinkIcon,
  FileQuestionIcon,
  FileTextIcon,
  FolderIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 604800;

const YearHeader = ({ year }: { year: string }) => {
  return (
    <div className="border-y bg-muted/90 backdrop-blur z-0 flex sticky top-[calc(4rem)] px-6 py-3">
      <p className="text-sm font-medium">{year}</p>
    </div>
  );
};

const ProtocolsPage = async () => {
  const allMeetings = await listAllMeetings();
  const earliestMeeting = allMeetings.find(
    (m) =>
      Number(m.year!) === Math.min(...allMeetings.map((m) => Number(m.year!))),
  );

  return (
    <div className="-ml-6 -mt-6 -mr-6 -mb-42 flex flex-col min-h-[700px]">
      <div className="px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <FileTextIcon className="size-4 text-primary" />
          <p className="font-medium">Protocols</p>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          Here you can find all protocols from our chapter meetings (SM) and
          board meetings (StyM) since {earliestMeeting?.year}.
        </p>
      </div>
      <section>
        {allMeetings.map((meeting) => (
          <div key={meeting.id}>
            <YearHeader key={meeting.id} year={meeting.year!} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              {meeting.files?.map((file) => (
                <Card key={file.id} className="flex flex-row overflow-hidden">
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
                        View <ExternalLinkIcon />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* <div className="border-r h-full grow w-[260px]">
        {protocols.map((file) => (
          <FileListItem key={file.id} file={file} />
        ))}
      </div> */}
    </div>
  );
};

export default ProtocolsPage;
