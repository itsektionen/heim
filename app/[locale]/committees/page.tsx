import { ItBolt } from "@/components/it-bolt";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { type Committee } from "@/data/committees";
import { backgroundColor, listCommittees } from "@/lib/committees";
import { getOgImageUrl } from "@/lib/og";
import { cn } from "@/lib/utils";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import Link from "next/link";

const CommitteeCard = async ({ committee }: { committee: Committee }) => {
  const t = await getI18n();

  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div
        style={{
          backgroundColor: backgroundColor(committee),
        }}
        className={cn(
          "overflow-hidden h-[180px] flex",
          committee.img
            ? "items-center justify-center"
            : "items-center justify-start -ml-2"
        )}>
        {committee.img ? (
          <Image
            alt={`${committee.name} logo`}
            className="w-40"
            src={committee.img}
            width={1280}
            height={720}
          />
        ) : (
          <ItBolt
            primary={committee.color + "66"}
            secondary={committee.color + "99"}
            size={260}
          />
        )}
      </div>
      <CardHeader className="pt-2">
        <CardTitle className="font-poppins">{committee.name}</CardTitle>
        <CardDescription>
          {committee.description.length > 100
            ? committee.description.slice(0, 100).trim() + "..."
            : committee.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end hover:opacity-80 transition-opacity">
        <Button
          asChild
          style={{
            backgroundColor: committee.color,
            color: committee.textColor,
          }}>
          <Link href={`/committees/${committee.slug}`}>
            {t("Common.read-more")}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const CommitteesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const committees = listCommittees();

  const t = await getScopedI18n("CommitteesPage");

  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle className="mb-4">{t("title")}</HeroTitle>
        </HeroContent>
        <HeroImage
          src="/assets/img/kistan-bar.avif"
          alt={t("hero-image-alt")}
        />
      </Hero>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((committee) => (
          <CommitteeCard key={committee.slug} committee={committee} />
        ))}
      </div>
    </>
  );
};

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Chapter.Committees");
  const description = t("NavBar.Chapter.Committees.description");

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

export default CommitteesPage;
