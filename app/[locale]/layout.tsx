import { CommandMenu } from "@/components/cmd-menu";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { VimNavigation } from "@/components/vim-navigation";
import type { Metadata } from "next";
import { I18nProviderClient } from "../../locales/client";

import "@/app/globals.css";
import { getOgImageUrl } from "@/lib/og";
import { getI18n } from "@/locales/server";

export default async function PublicLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      <Navbar />
      <main className="container mx-auto p-6 sm:border-x pb-42">
        {children}
      </main>
      <Footer />
      <CommandMenu />
      <VimNavigation />
    </I18nProviderClient>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = "Sektionen för alla";

  return {
    title,
    description: subtitle,
    openGraph: {
      images: [getOgImageUrl(title, subtitle)],
    },
    twitter: {
      images: [getOgImageUrl(title, subtitle)],
    },
  };
}
