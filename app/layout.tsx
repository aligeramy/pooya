import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pooya Pirayeshakbari | Luxury Real Estate",
  description: "Specializing in luxury properties and investment opportunities in the Greater Toronto Area.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable}`}>{children}</body>
    </html>
  )
}
