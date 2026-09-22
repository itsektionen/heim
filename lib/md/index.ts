import { env } from "@/env";

export const cleanMarkdown = (markdown: string) => {
  const markdownLintCommentRegex = /<!--[\s\S]*?-->/g;
  const markdownPageBreakRegex = /\\pagebreak\s*[\s\S]*?\s*\\pagebreak/g;
  const pandocAttributeRegex = /\{[^{}\n]*\}/g;
  const relativeImageRegex = /\]\(\.{0,2}\/?(img\/[^)\s]+)\)/g;

  return markdown
    .replace(markdownLintCommentRegex, "")
    .replace(markdownPageBreakRegex, "")
    .replace(pandocAttributeRegex, "")
    .replace(relativeImageRegex, `](${env.BYLAWS_RAW_URL}/$1)`)
    .trim();
};

export type PmDoc = {
  title: string;
  slug: string;
  markdown: string;
};

export const fetchPmDocs = async (locale: string): Promise<PmDoc[]> => {
  const folder = locale === "sv" ? "swe" : "eng";

  const listRes = await fetch(`${env.MEMO_API_URL}/${folder}`);

  if (!listRes.ok) return [];

  const files: { name: string; download_url: string | null; type: string }[] =
    await listRes.json();

  const mdFiles = files
    .filter((f) => f.type === "file" && f.name.endsWith(".md"))
    .sort((a, b) => a.name.localeCompare(b.name));

  return Promise.all(
    mdFiles.map(async (f) => {
      const raw = await fetch(f.download_url!).then((r) => r.text());
      const title = raw.match(/^#\s+(.*)$/m)?.[1].trim() ?? f.name;
      const markdown = raw.replace(/^#\s+.*$/m, "").trimStart();

      return { title, slug: f.name.replace(/\.md$/, ""), markdown };
    }),
  );
};

export type Heading = { text: string; link: string; level: number };

export const getHeadings = (source: string, prefix = ""): Heading[] => {
  const regex = /#+\s+(.*)/g;
  const matches = source.match(regex);

  if (!matches) return [];

  return matches.map((heading) => {
    const headingText = heading.replace(/^#+\s*/, "").trim();
    const level = heading.match(/^#+/)?.[0].length || 2;
    const link =
      "#" +
      prefix +
      headingText
        .replace(/ /g, "-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9åäöÅÄÖ-]/g, "");

    return {
      text: headingText,
      link,
      level: level - 2,
    };
  });
};

export class Markdown {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  public clean() {
    this.source = cleanMarkdown(this.source);
    return this;
  }

  public getSource() {
    return this.source;
  }
}
