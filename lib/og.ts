const getOgImageUrl = (title: string, subtitle: string) => {
  return `${process.env.URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(subtitle)}`;
};

export { getOgImageUrl };
