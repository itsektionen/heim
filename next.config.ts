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
      {
        hostname: "minio.qmisk.com",
      },
      {
        hostname: 'crm.kth.it',
      },
    ],
  },
  redirects: async () => [
    {
      source: "/privacypolicy",
      destination: "/privacy",
      permanent: true,
    },
    {
      source: "/:lang(en)?/sektionen",
      destination: "/chapter",
      permanent: true,
    },
    {
      source: "/:lang(en)?/sektionsorgan",
      destination: "/committees",
      permanent: true,
    },
    {
      source: "/:lang(en)?/fortroendevalda",
      destination: "/trustees",
      permanent: true,
    },
    {
      source: "/:lang(en)?/f%C3%B6rtroendevalda",
      destination: "/trustees",
      permanent: true,
    },
    {
      source: "/:lang(en)?/dokument",
      destination: "/documents/protocols",
      permanent: true,
    },
    {
      source: "/:lang(en)?/aktuellt",
      destination: "/events",
      permanent: true,
    },
    {
      source: "/:lang(en)?/utbildning",
      destination: "/education",
      permanent: true,
    },
    {
      source: "/:lang(en)?/kontakt",
      destination: "/contact",
      permanent: true,
    },
  ],
  pageExtensions: ["mdx", "md", "tsx", "ts", "jsx", "js"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remarkGfm"],
  },
});

export default withMDX(nextConfig);
