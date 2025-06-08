import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin"
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  pageExtensions: ["mdx", "md", "tsx", "ts", "jsx", "js"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

const withIntl = createNextIntlPlugin();
export default withIntl(withMDX(nextConfig));
