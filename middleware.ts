import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "sv"],
  defaultLocale: "sv",
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  const response = I18nMiddleware(request);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|static|assets|.*\\..*|_next|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
