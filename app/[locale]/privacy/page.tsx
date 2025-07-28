import { getStaticParams } from "@/locales/server";
  import { setStaticParamsLocale } from "next-international/server";
  import { notFound } from "next/navigation";

  export default async function PrivacyPage({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    setStaticParamsLocale(locale);

    try {
      const Content = (await import(`./${locale}.mdx`)).default;
      return <Content />;
    } catch {
      notFound();
    }
  }

  export function generateStaticParams() {
    return getStaticParams();
  }