import { Button } from "@/components/ui/button";
import { Hero, HeroContent } from "@/components/ui/hero";
import { defaultCommitteeColor, getCommittee } from "@/lib/committees";
import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getContrastingColor } from "@/lib/utils";
import { getI18n, getScopedI18n } from "@/locales/server";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const CommitteeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ committeeSlug: string; locale: string }>;
}) => {
  const { committeeSlug, locale } = await params;
  const response = getCommittee(committeeSlug);
  setStaticParamsLocale(locale);

  if (!response) {
    return notFound();
  }

  const t = await getScopedI18n("CommitteesPage");

  const { committee } = response.data;

  return (
    <>
      <Hero>
        <HeroContent
          style={{
            backgroundColor:
              committee.img && committee.color === defaultCommitteeColor
                ? committee.color + "66"
                : committee.color,
            color: committee.textColor,
          }}>
          <Button
            className="absolute top-2 left-1 opacity-50"
            style={{
              color: getContrastingColor(committee.color!),
            }}
            asChild
            variant="link">
            <Link href="/committees">
              <ArrowLeftIcon /> {t("single.back")}
            </Link>
          </Button>
          {committee.img ? (
            <Image
              src={committee.img}
              height={300}
              width={300}
              alt={committee.name}
            />
          ) : (
            <h2 className="text-6xl font-medium">{committee.name}</h2>
          )}
        </HeroContent>
      </Hero>
      <>{children}</>
    </>
  );
};

export default CommitteeLayout;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ committeeSlug: string; locale: string }>;
}): Promise<Metadata> => {
  const { committeeSlug, locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const {
    data: { committee },
  } = getCommittee(committeeSlug)!;

  const title = t("Common.chapter");
  const subtitle = committee.name;
  const description = committee.description;

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: `/committees/${committeeSlug}`,
    image: getOgImageUrl(title, subtitle),
  });
};
