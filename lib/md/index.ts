export const cleanMarkdown = (markdown: string) => {
  const markdownLintCommentRegex = /<!--.*?-->/g;
  const markdownPageBreakRegex = /\\pagebreak\s*[\s\S]*?\s*\\pagebreak/g;

  return markdown
    .replace(markdownLintCommentRegex, "")
    .replace(markdownPageBreakRegex, "")
    .trim();
};

export const getHeadings = (source: string) => {
  const regex = /#+\s+(.*)/g;

  if (source.match(regex)) {
    return source.match(regex)?.map((heading) => {
      const headingText = heading.replace(/^#+\s*/, "").trim();
      const level = heading.match(/^#+/)?.[0].length || 2;
      const link =
        "#" +
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
  }

  return [];
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
