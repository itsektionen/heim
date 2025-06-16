import { ItChip } from "@/components/it-chip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero, HeroContent, HeroImage, HeroTitle } from "@/components/ui/hero";
import { MailIcon, PiggyBankIcon, UserIcon } from "lucide-react";
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
      Name: "Chapter for Information- and Nanotechnology",
      Students: "~2000",
      "Organization number": " 802431-2442",
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
];

const ContactPage = () => {
  return (
    <>
      <Hero>
        <HeroImage
          className="brightness-70 saturate-75 -hue-rotate-15"
          src="/assets/img/couches.png"
          alt="Couches"
        />
        <HeroContent>
          <HeroTitle>Contact</HeroTitle>
        </HeroContent>
      </Hero>
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>President</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>Hannah Veit</p>
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
              <CardTitle>Business Relations</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>Alexander Lapin Pashchenko</p>
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
              <CardTitle>Communications</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>Elina Wang</p>
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
              <CardTitle>Council of Safety</CardTitle>
            </CardHeader>
            <CardContent className="text-sm -mt-3">
              <div className="flex gap-2 items-center">
                <UserIcon className="size-4 text-muted-foreground" />
                <p>Read more</p>
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
          If you need to contact someone else or a specific committee, you can
          find all the trustee elected and responsible members along with their
          contact information on the page{" "}
          <Link className="underline underline-offset-4" href="/trustees">
            Trustee Elected.
          </Link>
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

export default ContactPage;
