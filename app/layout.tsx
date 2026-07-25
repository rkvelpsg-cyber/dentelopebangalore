import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentelope – Best Dental Clinic in Whitefield, Bengaluru",
  description:
    "Find top dental services in Whitefield, Bengaluru with Dentelope, offering easy appointment scheduling and comprehensive care information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
