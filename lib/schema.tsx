import type { Organization, WebSite, WithContext, Article } from "schema-dts";

export function generateOrganizationSchema(
  locale: string = "sv",
): WithContext<Organization> {
  const baseUrl = process.env.URL!;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name:
      locale === "sv"
        ? "Kongliga Sektionen för Informationsteknik"
        : "Chapter for Information Technology",
    alternateName: locale === "sv" ? "IT-Sektionen" : "IT-Chapter",
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    description:
      locale === "sv"
        ? "Kongliga Sektionen för Informationsteknik på KTH - En av de största sektionerna inom Tekniska Högskolans Studentkår (THS) i Stockholm."
        : "The Chapter for Information Technology at KTH - One of the largest chapters within the Tekniska Högskolans Studentkår (THS Student Union) in Stockholm.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kistagången 16",
      addressLocality: "Stockholm",
      postalCode: "164 40",
      addressCountry: "SE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general inquiry",
      availableLanguage: ["Swedish", "English"],
    },
    sameAs: [
      "https://instagram.com/itsektionenkth",
      "https://linkedin.com/company/itsektionen",
      "https://facebook.com/itsektionenkth",
      "https://github.com/itsektionen",
    ],
  };
}

export function generateWebsiteSchema(
  locale: string = "sv",
): WithContext<WebSite> {
  const baseUrl = process.env.SITE_URL || "https://kth.it";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: locale === "sv" ? "IT-Sektionen" : "IT-Chapter",
    description:
      locale === "sv"
        ? "Kongliga Sektionen för Informationsteknik på KTH - En av de största sektionerna inom Tekniska Högskolans Studentkår (THS) i Stockholm."
        : "The Chapter for Information Technology at KTH - One of the largest chapters within the Tekniska Högskolans Studentkår (THS Student Union) in Stockholm.",
    inLanguage: locale === "sv" ? "sv-SE" : "en-US",
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "IT-Sektionen",
  locale = "en",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  locale?: string;
}): WithContext<Article> {
  const baseUrl = process.env.URL!;
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const imageUrl = image?.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    inLanguage: locale === "sv" ? "sv-SE" : "en-US",
  };
}

export function JsonLd({
  data,
}: {
  data:
    | WithContext<Organization | WebSite | Article>
    | WithContext<Organization | WebSite | Article>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : data),
      }}
    />
  );
}

export function generatePageSchemas({
  locale = "en",
}: {
  locale?: string;
}): (WithContext<Organization> | WithContext<WebSite>)[] {
  const schemas: (WithContext<Organization> | WithContext<WebSite>)[] = [
    generateOrganizationSchema(locale),
    generateWebsiteSchema(locale),
  ];

  return schemas;
}
