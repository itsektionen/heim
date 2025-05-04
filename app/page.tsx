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
import Link from "next/link";

export const revalidate = 86400;

export default async function Home() {
  // const scraper = new FacebookScraper();
  // const chapterEvents = await scraper.listEvents("itsektionenkth");

  return (
    <>
      <Hero className="grid grid-cols-2">
        <HeroContent className="text-white p-6 sm:p-4">
          <div className="max-w-[32ch]">
            <p className="text-2xl font-medium mb-1 text-primary">Welcome!</p>
            <span>
              As one of the largest chapters within the Tekniska Högskolans
              Studentkår (THS Student Union) at KTH in Stockholm, we are
              thrilled to have you here!
            </span>
          </div>
        </HeroContent>
        <HeroImage src="/assets/img/header.avif" alt="Header Image" />
      </Hero>

      <section className="flex flex-col md:flex-row gap-4 [&>div]:grow [&>div]:w-full -mt-11 mb-14 [&>div]:z-5">
        <Card>
          <CardHeader>
            <CardTitle>
              <GraduationCapIcon />
              New student
            </CardTitle>
            <CardDescription>
              Are you a newly admitted student?{" "}
              <Link
                className="hover:underline underline-offset-2 text-primary"
                href="https://mottagningen.nu"
                target="_blank"
              >
                mottagningen.nu
              </Link>{" "}
              has all the information you need to find your way around KTH and
              the IT Chapter.
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
              The Education
            </CardTitle>
            <CardDescription>
              There are 3 programmes mapped to the IT Chapter: CINTE, TIDAB and
              TCOMK. The Chapter exists to ensure that our members get the best
              education possible.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button asChild variant="ghost">
                <Link href="/education">
                  Read more <ArrowRightIcon />
                </Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <ZapIcon />
              The Chapter
            </CardTitle>
            <CardDescription>
              Aside from study quality assurance, the chapter provides a
              plethora of extracurricular activities such as pubs, board game
              nights, sports events and LAN parties.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button variant="ghost">
                Read more <ArrowRightIcon />
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
