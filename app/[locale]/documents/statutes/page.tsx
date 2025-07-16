import { Markdown } from "@/lib/md";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdWrapper from "./md-wrapper";

import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { env } from "@/env";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import "./style.css";

export const revalidate = 2592000;

export default async function StatutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const res = await fetch(
    locale === "sv" ? env.STATUTES_URL_SV : env.STATUTES_URL_EN,
  );
  const markdown = await res.text();
  const cleanedMarkdown = new Markdown(markdown).clean().getSource();

  return (
    <MdWrapper markdown={markdown}>
      <div className="md">
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
          source={cleanedMarkdown}
        />
      </div>
    </MdWrapper>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const title = t("Common.chapter");
  const subtitle = t("NavBar.Documents.StatutesBylaws");
  const description = t("NavBar.Documents.StatutesBylaws.description");

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
