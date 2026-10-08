import { generatePageMetadata } from "@/lib/metadata";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { getBooks } from "@/app/[locale]/education/bookshelf/bookshelf";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Education.Bookshelf");
  const description = t("NavBar.Education.Bookshelf.description");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: "/education/bookshelf",
    image: getOgImageUrl(title, subtitle),
  });
}

const BookshelfPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("BookshelfPage");
  const books = await getBooks();

  return (
    <div>
      <h1 className="text-lg font-medium">{t("title")}</h1>
      <p className="text-muted-foreground max-w-prose mb-8 text-sm">
        {t("description")}
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, i) => (
          <li key={`${book.isbn}-${i}`}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="leading-5">{book.title}</CardTitle>
                {book.author && (
                  <CardDescription>
                    {" "}
                    {t("author", { author: book.author })}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="grow">
                <dl className="grid grid-cols[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  {book.edition && (
                    <>
                      <dt className="text-muted-foreground">
                        {t("edition", { edition: book.edition })}
                      </dt>
                    </>
                  )}
                  {book.isbn && (
                    <>
                      <dt className="text-muted-foreground">
                        ISBN {book.isbn}
                      </dt>
                    </>
                  )}
                </dl>
              </CardContent>

              <CardFooter className="border-t">
                <Badge variant={book.available > 0 ? "default" : "secondary"}>
                  {t("available", {
                    available: book.available,
                    quantity: book.quantity,
                  })}
                </Badge>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookshelfPage;
