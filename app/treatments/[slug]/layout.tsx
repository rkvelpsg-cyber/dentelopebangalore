import type { Metadata } from "next";
import { getTreatmentBySlug } from "../treatments-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dentelopebengalore.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) return {};

  const url = `/treatments/${treatment.slug}`;

  return {
    title: `${treatment.label} in Whitefield, Bengaluru`,
    description: treatment.heroDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${treatment.label} | Dentelope Advanced Dental Care`,
      description: treatment.heroDesc,
      images: [
        {
          url: treatment.heroImage,
          alt: `${treatment.label} at Dentelope Advanced Dental Care`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${treatment.label} | Dentelope Advanced Dental Care`,
      description: treatment.heroDesc,
      images: [treatment.heroImage],
    },
    metadataBase: new URL(siteUrl),
  };
}

export default function TreatmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
