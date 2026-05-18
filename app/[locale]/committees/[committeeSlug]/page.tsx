import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommitteeSlug } from "@/data/committees";
import { getCommittee, listCommittees } from "@/lib/committees";
import { getCommitteeIntegration } from "@/lib/committees/integrations";

import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import {
  CircleAlertIcon,
  ExternalLinkIcon,
  FacebookIcon,
  FileTextIcon,
  InstagramIcon,
  MailIcon,
} from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
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
  const t = await getScopedI18n("CommitteesPage");

  const ci = getCommitteeIntegration(committeeSlug as CommitteeSlug);

  const protocols = await ci?.listProtocols?.();

  return (
    <>
      <section className="flex flex-col lg:flex-row gap-12 mx-auto">
        <div className="w-full space-y-3">
          <p className="text-muted-foreground text-sm font-medium">
            {t("single.about")}
          </p>
          <p>{committee.description}</p>
          {protocols && (
            <Button className="mt-4" variant="secondary" asChild>
              <Link href={`/committees/${committee.slug}/protocols`}>
                <FileTextIcon />
                {t("single.protocols")}
              </Link>
            </Button>
          )}
        </div>
        <div className="space-y-3 shrink-0 min-w-[300px]">
          <p className="text-muted-foreground text-sm font-medium">
            {t("single.trustees")}
          </p>
          {trustees.length > 0 ? (
            trustees.map((trustee, i) => (
              <div key={`trustee.${i}`} className="flex gap-3 items-center">
                <Avatar className="size-12">
                  <AvatarFallback>
                    {trustee.name.split(" ")[0][0] +
                      (trustee.name.split(" ").length > 1
                        ? trustee.name.split(" ")[1][0]
                        : "")}
                  </AvatarFallback>
                  <AvatarImage className="object-cover" src={trustee.image} />
                </Avatar>

                <div className="mr-8">
                  <p>{trustee.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {trustee.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {trustee.mail}
                  </p>
                </div>
                <Button className="ml-auto" variant="ghost" size="icon" asChild>
                  <Link target="_blank" href={`mailto:${trustee.mail}`}>
                    <MailIcon className="text-muted-foreground" />
                  </Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="bg-muted px-3 py-2 rounded-md border text-muted-foreground flex items-center gap-2">
              <CircleAlertIcon className="size-4" />
              {t("single.no-trustees")}
            </p>
          )}
          {committee.website && (
            <>
              <p className="text-muted-foreground text-sm font-medium mt-8">
                {t("single.website")}
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
          {(committee.instagram || committee.facebook) && (
            <>
              <p className="text-muted-foreground text-sm font-medium mt-8">
                {t("single.social-media")}
              </p>
              <div className="flex gap-2">
                {committee.instagram && (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={committee.instagram} target="_blank">
                      <InstagramIcon />
                    </Link>
                  </Button>
                )}
                {committee.facebook && (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={committee.facebook} target="_blank">
                      <FacebookIcon />
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
          {committee.links && (
            <>
              <p className="text-muted-foreground text-sm font-medium mt-8">
                {t("single.links")}
              </p>
              {Object.entries(committee.links).map(([label, url]) => (
                <Link
                  key={url}
                  className="text-sm text-primary hover:underline underline-offset-4 flex [&>svg]:size-4 gap-2"
                  href={url}
                  target="_blank"
                >
                  {label}
                  <ExternalLinkIcon />
                </Link>
              ))}
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

export default CommitteePage;
