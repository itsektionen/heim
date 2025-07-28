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
          Here you can find all protocols and statutes from the chapter's
          committees.
        </p>
      </div>
      <section>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={false}
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
          defaultOpen={false}
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
          defaultOpen={false}
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
      <div className="px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <FileTextIcon className="size-4 text-primary" />
          <p className="font-medium">{t("Documents.Forms")}</p>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          Here you can find other important documents for the chapter and from
          KTH.
        </p>
      </div>
      <section>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={false}
          key={3}>
          <CollapsibleTrigger asChild>
            <Header key={3} year={"Chapter Forms"} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              <Button variant="secondary" asChild>
                <Link
                  href="https://github.com/itsektionen/blanketter"
                  target="_blank">
                  All Forms <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://github.com/itsektionen/blanketter/blob/master/%C3%84skande%20blankett%2020150224.pdf"
                  target="_blank">
                  Receipt Report <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://github.com/itsektionen/blanketter/blob/master/%C3%84skande%20blankett%2020150224.pdf"
                  target="_blank">
                  Demand Report <ExternalLinkIcon />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          className="data-[state='open']:[&>*>svg]:rotate-180"
          defaultOpen={false}
          key={3}>
          <CollapsibleTrigger asChild>
            <Header key={3} year={"KTH Forms"} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/administration/blanketter/student"
                  target="_blank">
                  All Forms <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/polopoly_fs/1.1380525.1737357395!/Tillgodor%C3%A4knande%20SV%20utl%C3%A4ndskt%20l%C3%A4ros%C3%A4te%20250116.pdf"
                  target="_blank">
                  Credit Transfer (Foreign University) <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/polopoly_fs/1.1380526.1739276123!/Tillgodor%C3%A4knande%20SV%20l%C3%A4ros%C3%A4te%20i%20Sverige%20250211.pdf"
                  target="_blank">
                  Credit Transfer (Swedish University) <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/polopoly_fs/1.760460.1682422312!/Checklista%20f%C3%B6r%20egenkontroll%20brand%20inf%C3%B6r%20fest%20och%20event.pdf"
                  target="_blank">
                  Fire Self Inspection <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/polopoly_fs/1.299019.1741269373!/Ans%C3%B6kan%20om%20sammankomst%20f%C3%B6r%20student.pdf"
                  target="_blank">
                  Party Application <ExternalLinkIcon />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link
                  href="https://intra.kth.se/polopoly_fs/1.1013916.1747993533!/Ans%C3%B6kan%20om%20tillf%C3%A4lligt%20och%20tillf%C3%A4lligt%20ut%C3%B6kat%20serveringstillst%C3%A5nd%20%281%29.pdf"
                  target="_blank">
                  Extended Serving Permit <ExternalLinkIcon />
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
