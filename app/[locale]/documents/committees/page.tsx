import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { ChevronDownIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

const Header = ({ year }: { year: string }) => {
  return (
    <div className="border-b sm:border-y bg-muted/90 cursor-pointer hover:bg-accent transition-colors backdrop-blur z-0 flex sticky top-0 sm:top-16 px-6 py-3 items-center justify-between">
      <p className="text-sm font-medium select-none">{year}</p>
      <ChevronDownIcon className="size-4 text-muted-foreground transition-transform" />
    </div>
  );
};

const CommitteesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("NavBar");
  const commonT = await getI18n();
  return (
    <div className="-ml-6 -mt-6 -mr-6 -mb-42 flex flex-col min-h-[500px]">
      <div className="px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <FileTextIcon className="size-4 text-primary" />
          <p className="font-medium">{t("Documents.Committees")}</p>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          Here you can find all protocols and statues from the chapter's
          committees.
        </p>
      </div>
      <section>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={true}
          key={0}>
          <CollapsibleTrigger asChild>
            <Header key={0} year={"ITK"} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1rk2swqe9j9rNHOeq_-ecG1u9MAxovbBw"
                  target="_blank">
                  Board Meeting Protocols <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1kNb_4wIIVlyLK2kQgKxMuN21NDc_CLj1"
                  target="_blank">
                  Committee Meeting Protocols <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1Vv7tMtpT4aji-RJg3VfVRbLiUmBgAzFK"
                  target="_blank">
                  Statutes <ExternalLinkIcon />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={true}
          key={1}>
          <CollapsibleTrigger asChild>
            <Header key={1} year={"QMISK"} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              <Button variant="secondary" asChild>
                <Link href="https://qmisk.com/protokoll.php" target="_blank">
                  Protocols <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://qmisk.com/div/reglemente.pdf"
                  target="_blank">
                  Statutes <ExternalLinkIcon />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={true}
          key={2}>
          <CollapsibleTrigger asChild>
            <Header key={2} year={"TMEIT"} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1Udg2g9kUpIN8MK0oKORMOlxlYT3djZBt"
                  target="_blank">
                  Mästarråd Protocols <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1rovdsX1tHQX34TYRHulkP6vwxpaVqgnU"
                  target="_blank">
                  Öråd Protocols <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://drive.google.com/drive/folders/1qqRiRirwdMP_8BwqLtcFxwbw_b69_m97"
                  target="_blank">
                  Statutes <ExternalLinkIcon />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
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
  const subtitle = t("NavBar.Documents.Committees");

  return {
    title: `${subtitle} – ${title}`,
    description: subtitle,
    openGraph: {
      images: [getOgImageUrl(title, subtitle)],
    },
    twitter: {
      images: [getOgImageUrl(title, subtitle)],
    },
  };
}

export default CommitteesPage;
