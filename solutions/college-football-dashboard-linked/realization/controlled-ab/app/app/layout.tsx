import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "Saturday Signal",
    description:
      "A trustworthy college-football watchlist dashboard using clearly labeled deterministic fixture data.",
    applicationName: "Saturday Signal",
    openGraph: {
      title: "Saturday Signal",
      description:
        "Four programs. One trustworthy fixture-data view of the season.",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
          alt: "Saturday Signal technical college-football dashboard preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Saturday Signal",
      description:
        "Four programs. One trustworthy fixture-data view of the season.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
