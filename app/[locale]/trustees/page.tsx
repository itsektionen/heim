import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import {
  boardTrustees,
  committeeTrustees,
  type Trustee,
} from "@/data/trustees";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

const TrusteeCard = ({ trustee }: { trustee: Trustee }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <Avatar className="size-52 border mb-4 text-6xl">
        <AvatarFallback>
          {trustee.name.split(" ")[0][0] + trustee.name.split(" ")[1][0]}
        </AvatarFallback>
        <AvatarImage className="object-cover" src={trustee.image} />
      </Avatar>
      <p className="text-lg font-medium -mb-0.5">{trustee.name}</p>
      <p className="mb-1 text-sm">{trustee.role}</p>
      {trustee.mail && (
        <Link
          className="hover:underline underline-offset-4 text-muted-foreground text-sm"
          href={`mailto:${trustee.mail}`}
          >
          {`${trustee.mail}`}
        </Link>
      )}
    </div>
  );
};

const TrusteesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return (
    <div>
      <Hero>
        <HeroContent>
          <HeroTitle className="mb-4">{t("NavBar.Chapter.Trustees")}</HeroTitle>
          <p className="max-w-prose text-balance text-white text-center text-sm">
            {t("NavBar.Chapter.Trustees.description")}
          </p>
        </HeroContent>
        <HeroImage src="/assets/img/kistan-galler.avif" alt="Header Image" />
      </Hero>
      <h3 className="text-lg font-medium">{t("Trustees.Board")}</h3>
      <p className="text-muted-foreground max-w-prose mb-8 text-sm">
        {t("Trustees.Board.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
        {boardTrustees.map((trustee, index) => (
          <TrusteeCard key={`board.trustee.${index}`} trustee={trustee} />
        ))}
      </div>
      <h3 className="text-lg font-medium">{t("Trustees.Committees")}</h3>
      <p className="text-muted-foreground max-w-prose mb-8 text-sm">
        {t("Trustees.Committees.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {committeeTrustees.map((trustee, index) => (
          <TrusteeCard key={`board.trustee.${index}`} trustee={trustee} />
        ))}
      </div>
    </div>
  );
};

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Chapter.Trustees");
  const description = t("NavBar.Chapter.Trustees.description");

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

export default TrusteesPage;
