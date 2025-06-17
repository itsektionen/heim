import { getI18n } from "@/locales/server";
import { Metadata } from "next";

export async function generateOgImages({
  title,
  description,
}: {
  title?: string;
  description?: string;
}): Promise<Metadata> {
  const t = await getI18n();
  const ogTitle = title || t("Common.chapter");
  const ogDescription = description || t("Common.tagline");
  return {
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            ogTitle,
          )}&description=${encodeURIComponent(ogDescription)}`,
        },
      ],
    },
  };
}
