import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "BOOKBUCKS - Earn Money Reading Books",
  description:
    "Transform your reading habit into earnings. Read quality content, expand your knowledge, and get rewarded for every page you complete.",
  generator: "BOOKBUCKS",
  keywords: "reading, books, earn money, education, rewards, Nigeria",
  authors: [{ name: "BOOKBUCKS Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4caf50" />
      </head>
      <body>{children}</body>
    </html>
  )
}
