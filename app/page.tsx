// import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero, HeroContent, HeroImage } from "@/components/ui/hero";
// import { FacebookScraper } from "@/lib/scrapers/facebook";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  SchoolIcon,
  ZapIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const revalidate = 86400;

export default async function Home() {
  // const scraper = new FacebookScraper();
  // const chapterEvents = await scraper.listEvents("itsektionenkth");
  const t = await getTranslations("HomePage");
  const commonT = await getTranslations("Common");

  return (
    <>
      <Hero className="grid grid-cols-2">
        <HeroContent className="text-white p-6 sm:p-4">
          <div className="max-w-[32ch]">
            <p className="text-2xl font-medium mb-1 text-primary">
              {t("title")}
            </p>
            <span>{t("tagline")}</span>
          </div>
        </HeroContent>
        <HeroImage src="/assets/img/header.avif" alt="Header Image" />
      </Hero>

      <section className="flex flex-col md:flex-row gap-4 [&>div]:grow [&>div]:w-full -mt-11 mb-14 [&>div]:z-5">
        <Card>
          <CardHeader>
            <CardTitle>
              <GraduationCapIcon />
              {t("Cards.NewStudent.title")}
            </CardTitle>
            <CardDescription>
              {t.rich("Cards.NewStudent.content", {
                link: (chunks) => (
                  <Link
                    className="hover:underline underline-offset-2 text-primary"
                    href="https://mottagningen.nu"
                    target="_blank"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button asChild variant="ghost">
                <Link target="_blank" href="https://mottagningen.nu">
                  mottagningen.nu <ExternalLinkIcon />
                </Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <SchoolIcon />
              {t("Cards.Education.title")}
            </CardTitle>
            <CardDescription>{t("Cards.Education.content")}</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button asChild variant="ghost">
                <Link href="/education">
                  {commonT("read-more")} <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <ZapIcon />
              {t("Cards.Chapter.title")}
            </CardTitle>
            <CardDescription>{t("Cards.Chapter.content")}</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button variant="ghost">
                {commonT("read-more")} <ArrowRightIcon />
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-3">Upcoming events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* {chapterEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))} */}
        </div>
      </section>
    </>
  );
}
