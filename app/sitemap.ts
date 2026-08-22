import type { MetadataRoute } from "next";
import { TREATMENT_DATA } from "./treatments/treatments-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dentelopebengalore.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...TREATMENT_DATA.map((treatment) => ({
      url: `${siteUrl}/treatments/${treatment.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: treatment.popular ? 0.8 : 0.6,
    })),
  ];
}
