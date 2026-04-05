const getOgImageUrl = (title: string, subtitle: string) => {
  const baseUrl = process.env.URL;
  return `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(subtitle)}`;
};

export { getOgImageUrl };
