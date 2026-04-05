import { Metadata } from "next";
import { getOgImageUrl } from "./og";

export interface SiteConfig {
  name: string;
  description: string;
  shortDescription: string;
  url: string;
  ogImage: string;
  locale: string;
  alternateLocale: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  locale?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  index?: boolean;
  canonical?: string;
}

export const siteConfig: Record<string, SiteConfig> = {
  en: {
    name: "IT-Chapter",
    description:
      "The Chapter for Information Technology at KTH - One of the largest chapters within the Tekniska Högskolans Studentkår (THS Student Union) in Stockholm.",
    shortDescription: "The Chapter for Information Technology at KTH",
    url: process.env.URL!,
    ogImage:
      "/api/og?title=IT-Chapter&description=The Chapter for Information Technology",
    locale: "en_US",
    alternateLocale: "sv_SE",
  },
  sv: {
    name: "IT-Sektionen",
    description:
      "Kongliga Sektionen för Informationsteknik på KTH - En av de största sektionerna inom Tekniska Högskolans Studentkår (THS) i Stockholm.",
    shortDescription: "Kongliga Sektionen för Informationsteknik på KTH",
    url: process.env.URL!,
    ogImage:
      "/api/og?title=IT-Sektionen&description=Kongliga Sektionen för Informationsteknik",
    locale: "sv_SE",
    alternateLocale: "en_US",
  },
};

export function generatePageMetadata({
  title,
  description,
  locale = "sv",
  keywords = [],
  image,
  imageAlt,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  index = true,
  canonical,
}: PageMetadata): Metadata {
  const config = siteConfig[locale] || siteConfig.sv;
  const fullTitle = title === config.name ? title : `${title} | ${config.name}`;
  const ogImage = image || getOgImageUrl(title, description);
  const fullImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${config.url}${ogImage}`;
  const imageDescription = imageAlt || `${title} - ${config.name}`;

  const defaultKeywords = [
    "Kongliga Sektionen för Informationsteknik",
    "Sektionen för Informationsteknik",
    "Chapter for Information Technology",
    "Kongliga IT-Sektionen",
    "IT-Sektionen",
    "IT-Chapter",
    "KTH",
    "THS",
    "Stockholm",
  ];

  const canonicalUrl = canonical || `${config.url}/${locale}${url}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: config.name }],
    creator: config.name,
    publisher: config.name,
    metadataBase: new URL(config.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${config.url}/en${url}`,
        "sv-SE": `${config.url}/sv${url}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: config.name,
      locale: config.locale,
      alternateLocale: config.alternateLocale,
      type: type as "website" | "article" | "profile",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: imageDescription,
          type: "image/png",
        },
      ],
      ...(type === "article" &&
        publishedTime && {
          publishedTime,
          modifiedTime,
          authors,
          section,
          tags,
        }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: index,
      follow: index,
      googleBot: {
        index: index,
        follow: index,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "ykQiC2JEegV9rVGsSXOB2o_7uIQAeX_RLX_7qX2o104",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: fullTitle,
    },
    other: {
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  };

  return metadata;
}

export function generateArticleMetadata({
  title,
  description,
  locale = "sv",
  publishedTime,
  modifiedTime,
  authors = [],
  section,
  tags = [],
  image,
  imageAlt,
  url,
}: Omit<PageMetadata, "type"> & {
  publishedTime: string;
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    locale,
    type: "article",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    image,
    imageAlt,
    url,
  });
}
