const getOgImageUrl = (title: string, subtitle: string) => {
  const basePath = "/api/og";
  return `${basePath}?title=${title}&description=${subtitle}`;
};

export { getOgImageUrl };
