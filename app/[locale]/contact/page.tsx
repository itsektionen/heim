import { ItChip } from "@/components/it-chip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { boardTrustees } from "@/data/trustees";
import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n, getStaticParams } from "@/locales/server";
import { MailIcon, MapPin, PiggyBankIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";

const contactCards: {
  title: string;
  info: {
    [key: string]: string;
  };
  icon: React.ReactNode;
}[] = [
  {
    title: "The Chapter",
    icon: <ItChip primary="var(--primary)" />,
    info: {
      Name: "Chapter for Information Technology",
      Students: "~2000",
      "Organization number": "802431-2442",
      "Legal form": "Non-profit organization",
      "Permit unit's restaurant number": "61 80 1301",
    },
  },
  {
    title: "Bank",
    icon: <PiggyBankIcon />,
    info: {
      Office: "SEB, Mall of Scandinavia",
      "Account Number": "5287 100 3300",
      Bankgiro: "5120-7280",
      "IBAN-number": "SE65 5000 0000 0528 7100 3300",
      "SWIFT/BIC-code": "ESSE SESS",
    },
  },
  {
    title: "Addresses",
    icon: <MapPin />,
    info: {
      "Visting Address": "Electrum, Kistagången 16, 164 40 Kista",
      "Delivery Address":
        "KTH Service Center Electrum, Kistagången 16, 164 40 Kista",
      "Billing Address":
        "Sektionen för Informationsteknik, Electrum 210, 164 40 Kista",
      "Chapter Locale": "Kistan 2.0, Kistagången 14, 164 40 Kista",
    },
  },
];

const ContactPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("ContactPage");
  const commonT = await getI18n();

  const president = boardTrustees.find((t) => t.mail?.startsWith("ord"));
  const brc = boardTrustees.find((t) => t.mail?.startsWith("naringsliv"));
  const komma = boardTrustees.find((t) => t.mail?.startsWith("komma"));

  const trusteeLink = (
    <Link className="underline underline-offset-4" href="/trustees">
      {t("trustees-page")}
    </Link>
  );

  return (
    <>
      <Hero>
        <HeroImage
          className="brightness-70 saturate-75 -hue-rotate-15"
          src="/assets/img/couches.png"
          alt={t("hero-image-alt")}
        />
        <HeroContent>
          <HeroTitle>{t("title")}</HeroTitle>
        </HeroContent>
      </Hero>
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("president")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>{president?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <MailIcon className="size-4 text-muted-foreground" />
                <Link
                  className="hover:underline underline-offset-4 text-primary"
                  href="mailto:ordf@kth.it"
                >
                  ordf@kth.it
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("brc")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>{brc?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <MailIcon className="size-4 text-muted-foreground" />
                <Link
                  className="hover:underline underline-offset-4 text-primary"
                  href="mailto:naringsliv@kth.it"
                >
                  naringsliv@kth.it
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("komma")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>{komma?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <MailIcon className="size-4 text-muted-foreground" />
                <Link
                  className="hover:underline underline-offset-4 text-primary"
                  href="mailto:komma@kth.it"
                >
                  komma@kth.it
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("council-of-safety")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <Link
                  className="hover:underline underline-offset-4"
                  href="/committees/sso"
                >
                  {commonT("Common.read-more")}
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <MailIcon className="size-4 text-muted-foreground" />
                <Link
                  className="hover:underline underline-offset-4 text-primary"
                  href="mailto:sso@kth.it"
                >
                  sso@kth.it
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-sm max-w-prose text-center mx-auto text-muted-foreground">
          {t("other-note", { trusteeLink })}
        </p>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {contactCards.map((card, i) => (
            <Card key={`contact.card.${i}`}>
              <CardHeader>
                <CardTitle>
                  {card.icon}
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {Object.keys(card.info).map((key, j) => (
                    <p key={`contact.card.${i}.${key}.${j}`}>
                      {`${key}: `}
                      <span className="text-foreground">{card.info[key]}</span>
                    </p>
                  ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Contact");
  const description = t("NavBar.Contact");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: "/contact",
    image: getOgImageUrl(title, subtitle),
  });
}

export default ContactPage;
