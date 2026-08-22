import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dentelopebengalore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/dentelope.svg", type: "image/svg+xml" }],
    shortcut: ["/dentelope.svg"],
    apple: [{ url: "/dentelope.svg", type: "image/svg+xml" }],
  },
  title: {
    default: "Dentelope | Best Dental Clinic in Whitefield, Bengaluru",
    template: "%s | Dentelope Dental Care",
  },
  description:
    "Dentelope Advanced Dental Care is a specialist dental clinic in Whitefield, Bengaluru offering pain-free dentistry, dental implants, braces, root canal treatment, kids dentistry and smile makeovers.",
  keywords: [
    "dentist in Whitefield",
    "best dental clinic in Whitefield",
    "dental clinic in Bengaluru",
    "dentist near Nallurhalli",
    "pain-free dentistry",
    "dental implants Bengaluru",
    "kids dentist Whitefield",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Dentelope Advanced Dental Care",
    title: "Dentelope | Specialist Dental Care in Whitefield, Bengaluru",
    description:
      "Specialist-led, pain-free dental care for families in Whitefield, Bengaluru.",
    images: [
      {
        url: "/dentelope_tagline.png",
        width: 1200,
        height: 630,
        alt: "Dentelope Advanced Dental Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentelope | Specialist Dental Care in Whitefield, Bengaluru",
    description:
      "Specialist-led, pain-free dental care for families in Whitefield, Bengaluru.",
    images: ["/dentelope_tagline.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  name: "Dentelope Advanced Dental Care",
  url: siteUrl,
  logo: `${siteUrl}/dentelope.svg`,
  image: `${siteUrl}/dentelope_tagline.png`,
  telephone: "+91-6364609627",
  email: "care@dentelope.in",
  priceRange: "₹₹",
  medicalSpecialty: "Dentistry",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "3 Tsn Babu, Opposite to SBB Sapphire, Victorian View Layout, Nallurhalli",
    addressLocality: "Whitefield, Bengaluru",
    postalCode: "560066",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  areaServed: ["Whitefield", "Nallurhalli", "Bengaluru"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
