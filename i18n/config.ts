export type Locale = (typeof locales)[number];

export const locales = ["en", "sv"] as const;
export const defaultLocale: Locale = "en";
