const getOgImageUrl = (title: string, subtitle: string) => {
  const baseUrl = process.env.SITE_URL || "https://kth.it";
  return `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(subtitle)}`;
};

export { getOgImageUrl };
