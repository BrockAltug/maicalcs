import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MaiCalcs - Ultimate Calculator Hub",
  description:
    "MaiCalcs is the ultimate destination for 135+ calculators, generators, and tools across finance, math, time, construction, sports, and more — featuring an AI Solver with photo recognition and text utilities.",
  generator: "MaiCalcs",
  keywords: [
    "calculators",
    "math tools",
    "financial calculators",
    "AI solver",
    "random generators",
    "text tools",
    "MaiCalcs"
  ],
  authors: [{ name: "MaiCalcs" }],
  openGraph: {
    title: "MaiCalcs - Ultimate Calculator Hub",
    description:
      "Access 135+ free calculators, generators, and tools. Trusted by 500k+ users worldwide with 99.9% accuracy.",
    url: "https://maicalcs.com",
    siteName: "MaiCalcs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MaiCalcs - Ultimate Calculator Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
