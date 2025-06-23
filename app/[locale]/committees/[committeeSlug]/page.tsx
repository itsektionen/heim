import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Hero, HeroContent } from "@/components/ui/hero";
import {
  defaultCommitteeColor,
  getCommittee,
  listCommittees,
} from "@/lib/committees";
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

  return {
    title: committee.name + " - " + t("Common.chapter"),
  };
};

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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
            nisi vel nibh eleifend cursus.
          </p>
          <p>
            Cras pharetra laoreet dignissim. Nulla ut arcu nec magna semper
            iaculis. Pellentesque vitae sem mauris. Fusce quis nisl sed ligula
            tristique consequat.
          </p>
          <p>
            Aenean auctor quis dui eu ultricies. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Sed
            iaculis iaculis quam, eu egestas metus congue et. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.
          </p>
          <p>Suspendisse posuere pellentesque tincidunt.</p>
        </div>
        <div className="space-y-3 shrink-0 min-w-[300px]">
          <p className="text-muted-foreground text-sm font-medium">Trustees</p>
          {trustees.length > 0 ? (
            trustees.map((t, i) => (
              <div key={`trustee.${i}`} className="flex gap-3 items-center">
                <Avatar className="size-12">
                  <AvatarFallback className="font-medium">{`${t.name.split(" ")[0][0]}${t.name.split(" ")[1][0]}`}</AvatarFallback>
                </Avatar>
                <div className="mr-8">
                  <p>{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
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

export default CommitteePage;
