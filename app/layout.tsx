import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});


const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"]
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Next Burrito Club",
  description: "Lunch Planning & Reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
