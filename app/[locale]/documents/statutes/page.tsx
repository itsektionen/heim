import { fetchPmDocs, getHeadings, Markdown, rehypeHeadingIds } from "@/lib/md";
import { generatePageMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import DocSection from "./doc-section";
import MdWrapper, { type TocDoc } from "./md-wrapper";

import remarkGfm from "remark-gfm";

import { env } from "@/env";
import { getOgImageUrl } from "@/lib/og";
import { getI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import "./style.css";

export const revalidate = 2592000;

const STATUTES_SLUG = "statutes";

const mdxOptions = (prefix: string) => ({
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHeadingIds, prefix] as [typeof rehypeHeadingIds, string],
    ],
  },
});

const stripTitle = (markdown: string) =>
  markdown.replace(/^#\s+.*$/m, "").trimStart();

export default async function StatutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();

  const res = await fetch(
    locale === "sv" ? env.STATUTES_URL_SV : env.STATUTES_URL_EN,
  );
  const cleanedStatutes = new Markdown(await res.text()).clean().getSource();
  const statutesTitle =
    cleanedStatutes.match(/^#\s+(.*)$/m)?.[1].trim() ?? t("Statutes.title");
  const statutesBody = stripTitle(cleanedStatutes);

  const memoSections = (await fetchPmDocs(locale)).map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    body: new Markdown(doc.markdown).clean().getSource(),
  }));

  const statutesDoc: TocDoc = {
    slug: STATUTES_SLUG,
    title: statutesTitle,
    headings: getHeadings(statutesBody, `${STATUTES_SLUG}--`),
  };

  const memoDocs: TocDoc[] = memoSections.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    headings: getHeadings(doc.body, `${doc.slug}--`),
  }));

  return (
    <MdWrapper statutes={statutesDoc} memos={memoDocs}>
      <DocSection slug={STATUTES_SLUG} title={statutesTitle}>
        <MDXRemote
          options={mdxOptions(`${STATUTES_SLUG}--`)}
          source={statutesBody}
        />
      </DocSection>

      {memoSections.map((doc) => (
        <DocSection key={doc.slug} slug={doc.slug} title={doc.title}>
          <MDXRemote options={mdxOptions(`${doc.slug}--`)} source={doc.body} />
        </DocSection>
      ))}
    </MdWrapper>
  );
}

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
  const subtitle = t("NavBar.Documents.StatutesBylaws");
  const description = t("NavBar.Documents.StatutesBylaws.description");

  return generatePageMetadata({
    title: subtitle,
    description,
    locale,
    url: "/documents/statutes",
    image: getOgImageUrl(title, subtitle),
  });
}
