const parseDiscordMarkdown = (content: string): string => {
  return (
    content
      // underlines: __text__ -> <u>text</u>
      .replace(/(?<!_)__(?!_)(.+?)(?<!_)__(?!_)/gs, "<u>$1</u>")
      // subtext: lines starting with -# followed by space
      .replace(/^-#\s+(.*)$/gm, "<small>$1</small>")
  );
};

const parseDiscordCustomEmojis = (content: string): string => {
  return content.replace(
    /<(a)?:([a-zA-Z0-9_]{2,32}):([0-9]{17,21})>/g,
    (_match, animated, name, id) => {
      const ext = animated ? "gif" : "png";
      const url = `https://cdn.discordapp.com/emojis/${id}.${ext}?size=48&quality=lossless`;
      return `<img src="${url}" alt=":${name}:" title=":${name}:" className="discord-emoji" />`;
    },
  );
};

const cleanDiscordMarkdown = (content: string): string => {
  return (
    content
      // remove Discord custom emojis (<:name:id> and <a:name:id>)
      .replace(/<(a)?:[a-zA-Z0-9_]{2,32}:[0-9]{17,21}>/g, "")
      // TODO: convert to unicode
      // remove emoji shortcodes like :smile:, :fire:, :thumbsup:
      .replace(/:[a-zA-Z0-9_+-]+:/g, "")
      // remove subtext prefix "-# "
      .replace(/^-#\s+/gm, "")
      // remove blockquotes "> "
      .replace(/^>\s+/gm, "")
      // remove headings (#, ##, ###)
      .replace(/^#{1,6}\s+/gm, "")
      // remove bold, italics, underlines, strikethrough, spoilers (***, **, *, __, ~~, ||)
      .replace(/(\*{1,3}|_{1,2}|~~|\|\|)(.*?)\1/g, "$2")
      // ronvert markdown links [Label](url) -> Label
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // remove inline code `code`
      .replace(/`([^`]+)`/g, "$1")
      // remove code blocks ```lang ... ```
      .replace(/```[\s\S]*?```/g, "")
      // collapse extra spaces and linebreaks into a single space
      .replace(/\s+/g, " ")
      .trim()
  );
};

export { parseDiscordMarkdown, parseDiscordCustomEmojis, cleanDiscordMarkdown };
