import committees from "@/data/committees";
import { listAllCommitteeEvents } from "@/lib/committees/events";
import { protocolCommitteeSlugs } from "@/lib/committees/protocols";
import type { MetadataRoute } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const revalidate = 86400;

const siteUrl = process.env.URL!.replace(/\/$/, "");

const discoverStaticRoutes = async (): Promise<string[]> => {
  const localeRoot = path.join(process.cwd(), "app", "[locale]");
  const routes = new Set<string>([""]);

  const walk = async (currentDir: string, segments: string[] = []) => {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await walk(path.join(currentDir, entry.name), [
          ...segments,
          entry.name,
        ]);
        continue;
      }

      if (!entry.isFile() || entry.name !== "page.tsx") {
        continue;
      }

      const hasDynamicSegment = segments.some((segment) =>
        segment.includes("["),
      );
      if (hasDynamicSegment) {
        continue;
      }

      const pathname = segments.length === 0 ? "" : `/${segments.join("/")}`;
      routes.add(pathname);
    }
  };

  await walk(localeRoot);
  return [...routes].sort();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split("T")[0];
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes = await discoverStaticRoutes();

  for (const route of staticRoutes) {
    const isLowPriority =
      route.includes("documents") || route.includes("privacy");
    entries.push({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: isLowPriority ? 0.3 : 0.8,
      alternates: {
        languages: {
          "sv-SE": `${siteUrl}/sv${route}`,
          "en-US": `${siteUrl}/en${route}`,
        },
      },
    });
  }

  for (const committee of committees) {
    entries.push({
      url: `${siteUrl}/committees/${committee.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "sv-SE": `${siteUrl}/sv/committees/${committee.slug}`,
          "en-US": `${siteUrl}/en/committees/${committee.slug}`,
        },
      },
    });
  }

  for (const slug of protocolCommitteeSlugs) {
    entries.push({
      url: `${siteUrl}/committees/${slug}/protocols`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
      alternates: {
        languages: {
          "sv-SE": `${siteUrl}/sv/committees/${slug}/protocols`,
          "en-US": `${siteUrl}/en/committees/${slug}/protocols`,
        },
      },
    });
  }

  try {
    const events = await listAllCommitteeEvents();
    for (const event of events) {
      const eventDate = new Date(event.start).toISOString().split("T")[0];
      entries.push({
        url: `${siteUrl}/events/${event.id}`,
        lastModified: eventDate,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            "sv-SE": `${siteUrl}/sv/events/${event.id}`,
            "en-US": `${siteUrl}/en/events/${event.id}`,
          },
        },
      });
    }
  } catch {}

  return entries;
}
