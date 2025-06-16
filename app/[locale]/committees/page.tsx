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
import committees, { type Committee } from "@/data/committees";
import { cn, getContrastingColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CommitteeCard = ({ committee }: { committee: Committee }) => {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div
        style={{
          backgroundColor: committee.img
            ? committee.color
            : (committee.color || "#cc99ff") + "66",
        }}
        className={cn(
          "overflow-hidden h-[180px] flex",
          committee.img
            ? "items-center justify-center"
            : "items-center justify-start -ml-2",
        )}
      >
        {committee.img ? (
          <Image
            alt={`${committee.name} logo`}
            className="w-50"
            src={committee.img}
            width={1280}
            height={720}
          />
        ) : (
          <ItBolt
            primary={(committee.color || "#cc99ff") + "66"}
            secondary={(committee.color || "#cc99ff") + "99"}
            size={240}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-poppins">{committee.name}</CardTitle>
        <CardDescription>{committee.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end hover:opacity-80 transition-opacity">
        <Button
          asChild
          style={{
            backgroundColor: committee.color || "#cc99ff",
            color: getContrastingColor(committee.color ?? "#cc99ff"),
          }}
        >
          <Link href={`/committees/${committee.slug}`}>Read more</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const CommitteesPage = () => {
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle className="mb-4">Committees</HeroTitle>
          <p className="max-w-prose text-balance text-white text-center text-sm">
            The committees are the backbone of the IT Chapter. They organize
            events, ensure a high study quality, and provide valuable resources
            to the members.
          </p>
        </HeroContent>
        <HeroImage src="/assets/img/kistan-bar.avif" alt="Header Image" />
      </Hero>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((committee) => (
          <CommitteeCard key={committee.slug} committee={committee} />
        ))}
      </div>
    </>
  );
};

export default CommitteesPage;
