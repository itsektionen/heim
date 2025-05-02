import createMDX from "@next/mdx";
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
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
