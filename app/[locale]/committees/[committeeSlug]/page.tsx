import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Hero, HeroContent } from "@/components/ui/hero";
import {
  defaultCommitteeColor,
  getCommittee,
  listCommittees,
} from "@/lib/committees";
import { getOgImageUrl } from "@/lib/og";
import { getContrastingColor } from "@/lib/utils";
import { getI18n, getStaticParams } from "@/locales/server";
import {
  ArrowLeftIcon,
  CircleAlertIcon,
  ExternalLinkIcon,
  MailIcon,
} from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const CommitteePage = async ({
  params,
}: {
  params: Promise<{ committeeSlug: string; locale: string }>;
}) => {
  const { committeeSlug, locale } = await params;
  const response = getCommittee(committeeSlug);
  setStaticParamsLocale(locale);

  if (!response) {
    return notFound();
  }

  const { committee, trustees } = response.data;

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
          }}
        >
          <Button
            className="absolute top-2 left-1 opacity-50"
            style={{
              color: getContrastingColor(committee.color!),
            }}
            asChild
            variant="link"
          >
            <Link href="/committees">
              <ArrowLeftIcon /> Go back
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
      <section className="flex gap-12 mx-">
        <div className="w-full space-y-3">
          <p className="text-muted-foreground text-sm font-medium">About</p>
          <p>{committee.description}</p>
        </div>
        <div className="space-y-3 shrink-0 min-w-[300px]">
          <p className="text-muted-foreground text-sm font-medium">Trustees</p>
          {trustees.length > 0 ? (
            trustees.map((trustee, i) => (
              <div key={`trustee.${i}`} className="flex gap-3 items-center">
                <Avatar className="size-12">
                  <AvatarFallback>
                    {trustee.name.split(" ")[0][0] +
                      trustee.name.split(" ")[1][0]}
                  </AvatarFallback>
                  <AvatarImage className="object-cover" src={trustee.image} />
                </Avatar>

                <div className="mr-8">
                  <p>{trustee.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {trustee.role}
                  </p>
                </div>
                <Button className="ml-auto" variant="ghost" size="icon">
                  <MailIcon className="text-muted-foreground" />
                </Button>
              </div>
            ))
          ) : (
            <p className="bg-muted px-3 py-2 rounded-md border text-muted-foreground flex items-center gap-2">
              <CircleAlertIcon className="size-4" />
              No trustees found
            </p>
          )}
          {committee.website && (
            <>
              <p className="text-muted-foreground text-sm font-medium mt-8">
                Website
              </p>
              <Link
                className="text-sm text-primary hover:underline underline-offset-4 flex [&>svg]:size-4 gap-2"
                href={committee.website}
                target="_blank"
              >
                {committee.website}
                <ExternalLinkIcon />
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export function generateStaticParams() {
  return getStaticParams().map((locale) => {
    return listCommittees().map((committtee) => ({
      locale: locale,
      committeeSlug: committtee.slug,
    }));
  });
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ committeeSlug: string }>;
}): Promise<Metadata> => {
  const t = await getI18n();
  const { committeeSlug } = await params;
  const {
    data: { committee },
  } = getCommittee(committeeSlug)!;

  const title = t("Common.chapter");
  const subtitle = committee.name;
  const description = committee.description;

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
};

export default CommitteePage;
