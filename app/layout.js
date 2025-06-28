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
    "Stay updated with the newest anime episodes, manga chapters, and fan-favorite trends. Built for otakus, by otakus.",
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
  authors: [
    {
      name: "Senpai Central",
      url: "https://www.senpaicentral.com",
    },
  ],
  creator: "Senpai Central",
  metedataBase: "https://www.senpaicentral.com",
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
