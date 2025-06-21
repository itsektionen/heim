import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Hero, HeroContent } from "@/components/ui/hero";
import { getCommittee } from "@/lib/committees";
import { getContrastingColor } from "@/lib/utils";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const CommitteePage = async ({
  params,
}: {
  params: Promise<{ committeeSlug: string }>;
}) => {
  const { committeeSlug } = await params;
  const committee = getCommittee(committeeSlug);

  if (!committee) {
    return notFound();
  }

  return (
    <>
      <Hero>
        <HeroContent
          style={{
            backgroundColor: committee.color,
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
          <h2 className="text-6xl font-medium">{committee.name}</h2>
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
        <div className="space-y-3 shrink-0">
          <p className="text-muted-foreground text-sm font-medium">Trustees</p>
          <div className="flex gap-3 items-center">
            <Avatar className="size-12">
              <AvatarFallback className="font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="mr-8">
              <p>John Doe</p>
              <p className="text-sm text-muted-foreground">President</p>
            </div>
            <Button className="ml-auto" variant="ghost">
              <MailIcon className="text-muted-foreground" />
              ordf@kth.it
            </Button>
          </div>
          <div className="flex gap-3 items-center">
            <Avatar className="size-12">
              <AvatarFallback className="font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="mr-8">
              <p>John Doe</p>
              <p className="text-sm text-muted-foreground">vice President</p>
            </div>
            <Button className="ml-auto" variant="ghost">
              <MailIcon className="text-muted-foreground" />
              vordf@kth.it
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommitteePage;
