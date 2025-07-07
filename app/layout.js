import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Senpai Central | Latest Anime Updates",
  description:
    "Stay updated with the newest anime news, updates, and trailers. Built for otakus, by otakus.",
  keywords: [
    "anime news",
    "latest anime",
    "manga updates",
    "anime episodes",
    "otaku",
    "anime blog",
    "anime reviews",
    "anime recommendations",
    "anime community",
    "anime trends",
    "anime culture",
    "anime events",
    "anime merchandise",
    "anime streaming",
    "anime conventions",
    "anime fanbase",
    "anime fandom",
  ],
  metadataBase: new URL("https://senpai-central.vercel.app/og-image.jpg"),
  authors: [
    {
      name: "Senpai Central",
      url: "https://senpai-central.vercel.app/og-image.jpg",
    },
  ],
  creator: "Senpai Central",
  publisher: "Senpai Central",
  openGraph: {
    title: "Senpai Central | Latest Anime Updates",
    description:
       "Stay updated with the newest anime news, updates, and trailers. Built for otakus, by otakus.",
    url: "https://senpai-central.vercel.app/og-image.jpg",
    siteName: "Senpai Central",
    images: [
      {
        url: "https://senpai-central.vercel.app/og-image.jpg/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Senpai Central Banner",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senpai Central | Latest Anime Updates",
    description:
       "Stay updated with the newest anime news, updates, and trailers. Built for otakus, by otakus.",
    images: ["https://senpai-central.vercel.app/og-image.jpg/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};
export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
