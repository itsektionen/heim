import { CommandMenu } from "@/components/cmd-menu";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { VimNavigation } from "@/components/vim-navigation";
import type { Metadata } from "next";
import { I18nProviderClient } from "../../locales/client";
import { generatePageMetadata, siteConfig } from "@/lib/metadata";
import { JsonLd, generatePageSchemas } from "@/lib/schema";

import "@/app/globals.css";

export default async function PublicLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const schemas = generatePageSchemas({ locale });

  return (
    <I18nProviderClient locale={locale}>
      <JsonLd data={schemas} />
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = siteConfig[locale] || siteConfig.sv;

  return generatePageMetadata({
    title: "",
    description: config.description,
    locale,
    url: "",
  });
}
