import { Markdown } from "@/lib/md";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdWrapper from "./md-wrapper";

import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { env } from "@/env";
import { getUserLocale } from "@/services/locale";
import "./style.css";

export const revalidate = 2592000;

export default async function StatutesPage() {
  const locale = await getUserLocale();
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const res = await fetch(
    locale == "sv" ? env.STATUTES_URL_SV : env.STATUTES_URL_EN,
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
